import React, { useState } from 'react'
import { RiForbid2Fill } from "react-icons/ri";
import { FaStore } from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";
import { GiConfirmed } from "react-icons/gi";
import { RiUserReceived2Fill } from "react-icons/ri";
import { TfiReload } from "react-icons/tfi";
import { formatCurrency } from '../../basicFunction';
import BillDetails from '../../Admin/Bill/BillDetails'
import { useDispatch } from 'react-redux';
import { getOrderById, updateOrderStatus } from '../../../redux/reducer/OrderSlice';
import { Confirm } from './Confirm';
export const OrderComponent = (props) => {
    const dispatch = useDispatch()
    const { order } = props
    const [displayBillDetails, setDisplayBillDetails] = useState(false)
    const [displayCancelConfirm, setDisplayCancelConfirm] = useState(false)
    const [displayRecievedConfirm, setDisplayRecievedConfirm] = useState(false)
    const hanldeViewOrderDetails = () => {
        dispatch(getOrderById(order.id))
        setDisplayBillDetails(true)
    }

    const handleCancelBill = () => {
        dispatch(updateOrderStatus({ status: 4, cancel: 1, orderId: order.id }))
        setDisplayCancelConfirm(false)
    }
    const handleReceivedBill = () => {
        const orderProduct = order.cartItems.map((item)=> item.productId)
        let localOb = JSON.parse(localStorage.getItem("authorization"))
        let buyedProduct = [...localOb.listProductBought]
        orderProduct.forEach((id)=>{
            if(buyedProduct.find((idP) => idP === id) ===undefined) buyedProduct.push(id)
        })
        let newAuthorization = {
            ...localOb,
            listProductBought: buyedProduct
        }
        localStorage.setItem("authorization",JSON.stringify(newAuthorization))
        dispatch(updateOrderStatus({ status: 3, cancel: "", orderId: order.id }))
        setDisplayRecievedConfirm(false)
    }
    const getIcon = (status) => {
        switch (status) {
            case "Đang xử lý":
                return <TfiReload />;
            case "Đã nhận đơn":
                return <GiConfirmed />;
            case "Đang vận chuyển":
                return <FaTruckFast />;
            case "Đã nhận hàng":
                return <RiUserReceived2Fill />;
            case "Đã hủy đơn":
                return <RiForbid2Fill />;
        }
    }
    return (
        <div className='mt-5 p-4 bg-white rounded-md'>
            <div className='flex items-center gap-x-3 pb-1 border-b-[1px] border-solid border-[rgb(235_235_240)]'>
                {getIcon(order.statusOrder)}
                <div>{order.statusOrder}</div>
            </div>
            <div className='[&>*:not(:last-child)]:border-b-[1px]'>
                <div className='flex justify-between py-4 border-b-[1px] border-solid border-[rgb(235_235_240)]'>
                    <div className='inline-flex gap-x-3 w-full justify-between'>
                        <div className='flex flex-col justify-evenly'>
                            <div className='flex'>
                                <div className='font-medium'>Mã đơn hàng :</div>
                                <div className='pl-3'>{`${order.id}`}</div>
                            </div>
                            <div className='flex mt-1'>
                                <div className=''>Ngày đặt hàng :</div>
                                <div className='pl-3'>{`${order.createDate}`}</div>
                            </div>
                            <div className='flex mt-1'>
                                <div className=''>Địa chỉ nhận hàng :</div>
                                <div className='pl-3'>{`${order.address}`}</div>
                            </div>
                        </div>
                        <div>
                            <div className='flex mt-1'>
                                <div className=''>Phương thức thanh toán :</div>
                                <div className='pl-3'>{`${order.payment.description}`}</div>
                            </div>
                            <div className='flex mt-1'>
                                <div className=''>Phương thức vận chuyển :</div>
                                <div className='pl-3'>{`${order.shipment.description}`}</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className='flex justify-end mt-3'>
                <div className='pr-3'>
                    <div className='flex justify-between gap-x-3 text-lg font-medium'>
                        <div className=' text-[rgb(128_128_137)]'>Tổng tiền: </div>
                        <div className=''>{formatCurrency(order.totalPrice)}</div>
                    </div>
                    <div className='flex gap-x-3 mt-3 justify-end'>
                        {(order.statusOrder === "Đang xử lý" || order.statusOrder === "Đã nhận đơn") &&
                            <button
                                onClick={() => setDisplayCancelConfirm(true)}
                                className='px-2 py-1 outline-none rounded-md text-[red] border-[1px] border-[red] hover:text-white hover:bg-[red]'>
                                Hủy đơn
                            </button>}
                        {(order.statusOrder === "Đang vận chuyển") &&
                            <button
                                onClick={() => setDisplayRecievedConfirm(true)}
                                className='px-2 py-1 outline-none rounded-md text-[#ffb900] border-[1px] border-[#ffb900] hover:text-white hover:bg-[#ffb900]'>
                                Đã nhận được hàng
                            </button>}
                        <button
                            onClick={() => hanldeViewOrderDetails()}
                            className='px-2 py-1 outline-none rounded-md text-[rgb(10_104_255)] border-[1px] border-[rgb(10_104_255)] hover:text-white hover:bg-[rgb(10_104_255)]'>
                            Xem chi tiết
                        </button>
                    </div>
                </div>
            </div>

            {displayBillDetails && <BillDetails setDisplayBillDetails={setDisplayBillDetails} />}
            {displayCancelConfirm && <Confirm action="cancel" content="Bạn có chắc chắn muốn hủy đơn hàng này ?" yesAction={() => handleCancelBill()} noAction={() => setDisplayCancelConfirm(false)} />}
            {displayRecievedConfirm && <Confirm action="received" content="Bạn đã nhận được đơn hàng này ?" yesAction={() => handleReceivedBill()} noAction={() => setDisplayRecievedConfirm(false)} />}
        </div>
    )
}
