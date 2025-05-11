import React, { useEffect, useState } from 'react';
import OrderNav from './OrderNav';
import OrderList from './OrderList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrder } from '../../../redux/reducer/OrderSlice';

const Order = () => {
    const dispatch = useDispatch()
    const orders = useSelector(state => state.order.orders)
    useEffect(()=>{
        console.log(orders)
    },[orders])
    const orderTabs = {
        0: {
            code:"",
            name: 'Tất cả đơn',
        },
        1: {
            code:"0",
            name: 'Đang xử lý',
        },
        2: {
            code:"1",
            name: 'Đã nhận đơn',
        },
        3: {
            code:"2",
            name: 'Đang vận chuyển',
        },
        4: {
            code:"3",
            name: 'Đã nhận hàng',
        },
        5: {
            code:"4",
            name: 'Đã hủy',
        }
    }
    const [orderActiveTab, setOrderActiveTab] = useState(0)
    const [status,setStatus] = useState("")
    useEffect(()=>{
        dispatch(fetchOrder(status))
    },[status])
    return (
        <div>
            <OrderNav orderTabs={orderTabs} orderActiveTab={orderActiveTab} setOrderActiveTab={setOrderActiveTab} setStatus={setStatus}/>
            <OrderList  orders={orders}  orderActiveTab={orderActiveTab}/>
        </div>
    );
};

export default Order;