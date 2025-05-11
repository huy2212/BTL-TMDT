import React from "react";
import Header from "../components/Layout/Header/Header.jsx";
import Footer from "../components/Layout/Footer/Footer.jsx";
import ProductDetails from "../components/Products/ProductDetails.jsx";
import Consultation from "../components/Route/Consultation/Consultation.jsx";

const ProductDetailPage = () => {
  return (
    <div className="font-Roboto">
      <Header />
      <ProductDetails />
      <Consultation />
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
