import ErrorBoundary from "@/components/shared/ErrorBoundary";
import Preloader from "@/components/shared/Preloader";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { QuickViewProvider } from "@/contexts/QuickViewContext";
import AppRouter from "@/router";

export default function App() {
  return (
    <>
      <Preloader />
      <ErrorBoundary>
        <ThemeProvider>
          <CartProvider>
            <WishlistProvider>
              <QuickViewProvider>
                <AppRouter />
              </QuickViewProvider>
            </WishlistProvider>
          </CartProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </>
  );
}
