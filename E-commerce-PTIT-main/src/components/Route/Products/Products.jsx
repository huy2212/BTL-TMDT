import React from "react";
import Accessory from "./Accessory.jsx";
import Laptop from "./Laptop.jsx";
import Phone from "./Phone.jsx";
const Products = () => {
  return (
    <div>
      <Laptop/>
      <Phone />
      <Accessory />
    </div>
  );
};

export default Products;
