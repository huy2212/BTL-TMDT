import React, { useEffect } from "react";
import Header from "../components/Layout/Header/Header";
import Footer from "../components/Layout/Footer/Footer";
import Hero from "../components/Route/Hero/Hero";
import Services from "../components/Route/Services/Services";
import ProductCategories from "../components/Route/ProductCategories/ProductCategories";
import Products from "../components/Route/Products/Products";
import IntroBrands from "../components/Route/IntroBrands/IntroBrands";
import Consultation from "../components/Route/Consultation/Consultation";
import Vouchers from "../components/Route/Vouchers/Vouchers";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../redux/reducer/ProductSlice";
import { fetchCategory } from "../redux/reducer/CategorySlice";
import voucherSlice, { fetchVoucherForUser } from "../redux/reducer/VoucherSlice";
import willistSlice from "../redux/reducer/WillistSlice";
import { notify } from "../components/Admin/notify";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const HomePage = () => {
  const dispatch = useDispatch()
  const message = useSelector(state => state.willist.alert)
  useEffect(() => {
    dispatch(fetchCategory())
    dispatch(fetchProduct())
  }, [dispatch])
  useEffect(() => {
    if (message !== undefined) notify(message.message, message.code)
    dispatch(willistSlice.actions.resetAlert(undefined))
  }, [message])
  useEffect(() => {
    dispatch(fetchVoucherForUser())
    dispatch(voucherSlice.actions.setUsingVoucher(null))
    sessionStorage.clear()
  }, [dispatch])

  return (
    <div className="font-Roboto">
      <Header />
      <div className="bg-[#f6f6f6]">
        <Hero />
        <Vouchers />
        <Services />
        <ProductCategories />
        <Products />
        {/* <News /> */}
        <IntroBrands />
        <Consultation />
        <ToastContainer />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
