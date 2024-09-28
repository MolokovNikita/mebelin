import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

import MainPage from "./pages/MainPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import CatalogPage from "./pages/CatalogPage.jsx";
import SalesPage from "./pages/SalesPage.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
import FavoritesPage from "./pages/FavoritesPage.jsx";
import BasketPage from "./pages/BasketPage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";

import "./styles/App.css";
import ModalAuth from "./components/authModal/ModalAuth.jsx";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const handleModalClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <Header setIsOpen={setIsOpen} />
      <ModalAuth isOpen={isOpen} onClose={handleModalClose} />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/sales" element={<SalesPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/basket" element={<BasketPage />} />
        <Route path="/catalog/:category" element={<ProductsPage />} />
        <Route path="/catalog/:category/:productID" element={<ProductPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
