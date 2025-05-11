import React, { useEffect } from "react";
import { FaTrash } from "react-icons/fa";

import ViewedProduct from "../ViewedProducts/ViewedProducts";
import DeliveryAddress from "../../Delivery/DeliveryAddress";
import CheckoutItems from "./CheckoutItems";
import CheckoutBill from "./CheckoutBill";
import { useDispatch } from "react-redux";
import { fetchShipment } from "../../../redux/reducer/ShipmentSlice";
import { fetchPayment } from "../../../redux/reducer/PaymentSlice";


const Checkout = (props) => {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchShipment())
        dispatch(fetchPayment())
    },[])
    return (
        <div className="p-5 bg-[#efefef] mt-[53px]">
            <div className="font-Roboto font-bold mb-5">
                <h1> ĐƠN HÀNG</h1>
            </div>
            <div className='grid gap-5 grid-cols-1 lg:grid-cols-4'>
                <div className="col-span-1 lg:col-span-3">
                    <CheckoutItems/>
                </div>
                <div className="col-span-1">
                    <DeliveryAddress />
                    <CheckoutBill/>
                </div>
            </div>

        </div>
    );
};

export default Checkout;