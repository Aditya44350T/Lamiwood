import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useMemo,
  useCallback,
  type ReactNode,
} from "react";
import type { Product } from "@/types";
import type { WishlistContextType } from "@/types/wishlist";
import { products as allProducts } from "@/data/products";

type Action =
  | { type: "ADD"; product: Product }
  | { type: "REMOVE"; productId: string };

function reducer(state: Product[], action: Action): Product[] {
  switch (action.type) {
    case "ADD":
      if (state.some((p) => p.id === action.product.id)) return state;
      return [...state, action.product];
    case "REMOVE":
      return state.filter((p) => p.id !== action.productId);
  }
}

function loadWishlist(): Product[] {
  try {
    const raw = localStorage.getItem("lamiwood-wishlist");
    if (!raw) return [];
    const ids: string[] = JSON.parse(raw);
    return ids
      .map((id) => allProducts.find((p) => p.id === id))
      .filter(Boolean) as Product[];
  } catch {
    return [];
  }
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(reducer, [], loadWishlist);

  useEffect(() => {
    localStorage.setItem(
      "lamiwood-wishlist",
      JSON.stringify(items.map((p) => p.id)),
    );
  }, [items]);

  const isInWishlist = useCallback(
    (productId: string) => items.some((p) => p.id === productId),
    [items],
  );

  const value = useMemo<WishlistContextType>(
    () => ({
      items,
      addItem: (product) => dispatch({ type: "ADD", product }),
      removeItem: (productId) => dispatch({ type: "REMOVE", productId }),
      isInWishlist,
      totalItems: items.length,
    }),
    [items, isInWishlist],
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist(): WishlistContextType {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
