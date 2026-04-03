import type { RouteObject } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Wishlist from "@/pages/Wishlist";
import Quote from "@/pages/Quote";
import Compare from "@/pages/Compare";
import Gallery from "@/pages/Gallery";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/Blog/BlogPost";
import Calculator from "@/pages/Calculator";
import Consultation from "@/pages/Consultation";
import MaterialJourney from "@/pages/MaterialJourney";
import PatternDesigner from "@/pages/PatternDesigner";
import NotFound from "@/pages/NotFound";

export const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "products", element: <Products /> },
      { path: "products/:slug", element: <ProductDetail /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "wishlist", element: <Wishlist /> },
      { path: "quote", element: <Quote /> },
      { path: "compare", element: <Compare /> },
      { path: "projects", element: <Gallery /> },
      { path: "blog", element: <Blog /> },
      { path: "blog/:slug", element: <BlogPost /> },
      { path: "calculator", element: <Calculator /> },
      { path: "consultation", element: <Consultation /> },
      { path: "material-journey", element: <MaterialJourney /> },
      { path: "pattern-designer", element: <PatternDesigner /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];
