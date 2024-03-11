import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import ProductList from "./pages/ProductsList";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";

export default function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
