import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import type { Product } from "@/types";
import type { CartItem, CartContextType } from "@/types/cart";
import { products as allProducts } from "@/data/products";
import { trackEvent } from "@/hooks/useAnalytics";

type Action =
  | { type: "ADD_ITEM"; product: Product; quantity: number }
  | { type: "REMOVE_ITEM"; productId: string }
  | { type: "UPDATE_QUANTITY"; productId: string; quantity: number }
  | { type: "CLEAR" };

function reducer(state: CartItem[], action: Action): CartItem[] {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.find((i) => i.product.id === action.product.id);
      if (existing) {
        return state.map((i) =>
          i.product.id === action.product.id
            ? { ...i, quantity: i.quantity + action.quantity }
            : i,
        );
      }
      return [...state, { product: action.product, quantity: action.quantity }];
    }
    case "REMOVE_ITEM":
      return state.filter((i) => i.product.id !== action.productId);
    case "UPDATE_QUANTITY":
      if (action.quantity <= 0) {
        return state.filter((i) => i.product.id !== action.productId);
      }
      return state.map((i) =>
        i.product.id === action.productId
          ? { ...i, quantity: action.quantity }
          : i,
      );
    case "CLEAR":
      return [];
  }
}

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem("lamiwood-cart");
    if (!raw) return [];
    const stored: { productId: string; quantity: number }[] = JSON.parse(raw);
    return stored
      .map((s) => {
        const product = allProducts.find((p) => p.id === s.productId);
        return product ? { product, quantity: s.quantity } : null;
      })
      .filter(Boolean) as CartItem[];
  } catch {
    return [];
  }
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(reducer, [], loadCart);

  useEffect(() => {
    const data = items.map((i) => ({
      productId: i.product.id,
      quantity: i.quantity,
    }));
    localStorage.setItem("lamiwood-cart", JSON.stringify(data));
  }, [items]);

  const value = useMemo<CartContextType>(
    () => ({
      items,
      addItem: (product, quantity = 1) => {
        dispatch({ type: "ADD_ITEM", product, quantity });
        trackEvent("add_to_cart", "ecommerce", product.name, product.price);
      },
      removeItem: (productId) =>
        dispatch({ type: "REMOVE_ITEM", productId }),
      updateQuantity: (productId, quantity) =>
        dispatch({ type: "UPDATE_QUANTITY", productId, quantity }),
      clearCart: () => dispatch({ type: "CLEAR" }),
      totalItems: items.reduce((sum, i) => sum + i.quantity, 0),
      subtotal: items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    }),
    [items],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextType {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
