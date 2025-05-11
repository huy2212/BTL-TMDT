import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../redux/reducer/OrderSlice';
import cartSlice from '../redux/reducer/CartSlice';

const PaymentSuccess = () => {
    const dispatch = useDispatch()
    const orderItems = useSelector(state => state.cart.preOrder)
    const orderStatus = useSelector(state => state.order.orderStatus)
    const [status,setStatus] = useState(null)
    useEffect(() => {
        let orderParams = getUrlParams()
        const address = sessionStorage.getItem("receiveAddress")
        console.log(orderParams)
        orderParams = {
            ...orderParams,
            shipment: JSON.parse(sessionStorage.getItem("choosenShipment")).id,
            payment: JSON.parse(sessionStorage.getItem("choosenPayment")).id,
            voucher: JSON.parse(sessionStorage.getItem("usingVoucher"))?JSON.parse(sessionStorage.getItem("usingVoucher")).userVoucherId:null
        }
        const orderItemList =  orderItems.map((item)=> item.cartItemId) 
        const orderBody = {
            address: address,
            itemOrders: orderItemList,
            totalPrice: Number(orderParams.vnp_Amount)/100
        }
        console.log(orderBody)
        if(!status) dispatch(createOrder({orderParams:orderParams,orderBody:orderBody}))
        return ()=>{
            sessionStorage.clear()
            dispatch(cartSlice.actions.resetPreOrder())
        }
    }, [])
    useEffect(()=>{
        if(orderStatus){
            setStatus(orderStatus)
            console.log(orderStatus)
        }
    },[orderStatus])

    const getUrlParams = () => {
        const url = document.URL
        const urlObj = new URL(url);
        // Use URLSearchParams to extract the query parameters
        const params = new URLSearchParams(urlObj.search);
        // Convert the parameters to an object
        const paramsObj = {};
        params.forEach((value, key) => {
            paramsObj[key] = value;
        });
        return paramsObj
    }
    return (
        <div className='flex justify-center items-center flex-col h-[100vh] gap-y-10'>
            <img 
            src={!status?"":`/static/images/web-images/payment${status.code===1?"Success":"Fail"}.gif`}
            alt="ok" height={100} />
            <div className='text-2xl text-[#4caf50] font-weight-500'>Thanh toán đơn hàng thành công</div>
            <div>
                <Link to={'/order-status/1'} className='rounded p-3 text-white mx-5 bg-[#4caf50] font-medium text-black hover:bg-[rgba(76,175,80,0.7)]'>Xem đơn hàng</Link>
                <Link to={'/'} className='rounded p-3 text-white mx-5 bg-[#4caf50] font-medium text-black hover:bg-[rgba(76,175,80,0.7)]'>Về trang chủ</Link>
            </div>
        </div>
    );
};

export default PaymentSuccess;