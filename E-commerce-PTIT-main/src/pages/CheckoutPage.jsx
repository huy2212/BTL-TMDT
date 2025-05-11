import React from 'react';
import Header from "../components/Layout/Header/Header";
import Footer from "../components/Layout/Footer/Footer";
import Checkout from "../components/Route/Checkout/Checkout"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const CheckoutPage = () => {
    return (
        <div>
            <Header/>
            <Checkout/>
            <Footer/>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default CheckoutPage;