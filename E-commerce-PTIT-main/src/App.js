import "./App.css";
import React, { useState, useEffect } from "react";
import {
  HomePage,
  LoginPage,
  SignupPage,
  ShopsPage,
  ProductDetailPage,
  CartPage,
  ProductListPage,
  UserAccountPage
} from "./routes/Routes.js";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AdminHomePage from "./pages/admin/AdminHomePage.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import Payment from "./components/Payment/Payment.jsx";
import Supplier from "./pages/admin/Supplier.jsx";
import Voucher from "./components/Route/Voucher/Voucher.jsx";
import SearchProducts from "./pages/SearchProductsPage.jsx";
import SearchProductsPage from "./pages/SearchProductsPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import {getUser} from "./redux/reducer/UserSlice.jsx"
import PaymentSuccess from "./pages/PaymentSuccess.jsx";
import EmployeeHomePage from "./pages/employee/EmployeeHomePage.jsx";
import OrderSuccess from "./pages/OrderSuccess.jsx";
import { BuyedProducts } from "./components/User/Rating/BuyedProducts.jsx";
import { WillistPage } from "./pages/WillistPage.jsx";
import ChatPage from "./components/Chatbot/ChatAI.jsx";
import ChatAI from "./components/Chatbot/ChatAI.jsx";

const App = () => {
  const user = getUser();
  console.log(user )
  return (
    
    <Provider store={store}>
      <Routes> 
        {
          user !== null ? (
            <>
              <Route path="/" element={<HomePage />} />
              <Route path="/stores" element={<ShopsPage />} />
              <Route path="/san-pham/:id" element={<ProductDetailPage />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/supplier" element={<Supplier />} />
              <Route path="/category/:category" element={<ProductListPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/account" element={<UserAccountPage />} />
              <Route path="/order-status/:id" element={<UserAccountPage />} />
              <Route path="/search" element={<SearchProductsPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/test" element={<ChatPage />} />
              <Route path="/paymentSuccess" element={<PaymentSuccess />} />
              <Route path="/orderSuccess" element={<OrderSuccess />} />
              <Route path="/buyedProduct" element= {<BuyedProducts />} />
              <Route path="/willist" element= {<WillistPage />} />
              {
                user.role === 'ADMIN' && (
                  <Route path="/admin/*" element={<AdminHomePage />} />
                )
                
              }
              {
                user.role === 'EMPLOYEE' && (
                  <Route path="/employee/*" element={<EmployeeHomePage />} />
                )
                
              }
               <Route exact path='/*' element={<NotFoundPage />} />
            </>
          ) : (
            <>
              <Route path="/*" element={<LoginPage/>} />
              <Route exact path="/sign-up" element={<SignupPage />} />
            </>
          )
        }

      </Routes>
      {user !== null && user.role === 'USER' && <ChatAI/>}
    </Provider >
  );
};

export default App;
