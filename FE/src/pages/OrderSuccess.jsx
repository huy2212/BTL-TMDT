import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../redux/reducer/OrderSlice';
import cartSlice from '../redux/reducer/CartSlice';

const OrderSuccess = () => {
    const dispatch = useDispatch()
    const orderStatus = useSelector(state => state.order.orderStatus)
    const [status,setStatus] = useState({
        code:1
    })
    useEffect(() => {
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

    return (
        <div className='flex justify-center items-center flex-col h-[100vh] gap-y-10'>
            <img className='h-1/3'
            src={!status?"":`/static/images/web-images/order${status.code===1?"Success":"Fail"}.gif`}
            alt="ok"  />
            <div className='text-2xl text-[#4caf50] font-weight-500'>{`Đặt hàng ${status.code===1?"Thành công":"Thất bại"}`}</div>
            <div>
                {status.code===1 && <Link to={'/order-status/1'} className='rounded p-3 text-white mx-5 bg-[#4caf50] font-medium text-black hover:bg-[rgba(76,175,80,0.7)]'>Xem đơn hàng</Link>}
                <Link to={'/'} className='rounded p-3 text-white mx-5 bg-[#4caf50] font-medium text-black hover:bg-[rgba(76,175,80,0.7)]'>Về trang chủ</Link>
            </div>
        </div>
    );
};

export default OrderSuccess;