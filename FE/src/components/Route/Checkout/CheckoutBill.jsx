import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../basicFunction';
import { notify } from '../../Admin/notify';
import paymentSlice, { getVNPay } from '../../../redux/reducer/PaymentSlice';
import { createOrder } from '../../../redux/reducer/OrderSlice';
const CheckoutBill = (props) => {
    const dispatch = useDispatch()
    const cartItem = useSelector(state => state.cart.preOrder)
    const discountVoucher = useSelector(state => state.voucher.usingVoucher)
    const shipment = useSelector(state => state.shipment.choosenShipment)
    const orderItems = useSelector(state => state.cart.preOrder)
    const [discount, setDiscount] = useState(0)
    const [shipmentFee, setShipmentFee] = useState(0)
    const [total, setTotal] = useState(0)
    useEffect(() => {
        if (cartItem) {
            console.log(cartItem)
            let total = cartItem.reduce((cucl, item) => {
                return parseInt(cucl) + parseInt(item.totalPrice)
            }, 0)
            setTotal(total)
            if (discountVoucher) {
                let tmp = (total * discountVoucher.discount) / 100
                tmp = tmp > discountVoucher.discountConditions ? discountVoucher.discountConditions : tmp
                setDiscount(tmp)
                console.log(tmp)
            }
            console.log(1)
            if (shipment) {
                setShipmentFee(shipment.price)
            }
        }
    }, [dispatch, cartItem, discountVoucher, shipment])
    const handlePay = () => {
        const payment = JSON.parse(sessionStorage.getItem("choosenPayment"))
        const shipment = JSON.parse(sessionStorage.getItem("choosenShipment"))
        const address = sessionStorage.getItem("receiveAddress")
        if (!payment) {
            notify("Bạn chưa chọn phương thức thanh toán", 2)
            return;
        }
        if (!shipment) {
            notify("Bạn chưa chọn phương thức giao hàng", 2)
            return;
        }
        if (!address) {
            notify("Bạn chưa chọn địa chỉ nhận hàng", 2)
            return;
        }
        if (payment.name.includes("VNPay")) {
            let body = {
                totalPrice: total - discount + shipmentFee,
                itemOrders : orderItems.map((item)=> item.cartItemId) 
            }
            dispatch(getVNPay(body))
        }
        else {
            let body = {
                totalPrice: total - discount + shipmentFee,
                address: sessionStorage.getItem("receiveAddress") ,
                itemOrders : orderItems.map((item)=> item.cartItemId) 
            }
            const orderParams = {
                payment: 1,
                shipment: shipment.id,
                voucher: JSON.parse(sessionStorage.getItem("usingVoucher")) ? JSON.parse(sessionStorage.getItem("usingVoucher")).userVoucherId : null
                }
            console.log(body)
            dispatch(createOrder({ orderParams: orderParams, orderBody: body }))
        }
    }
    return (
        <div className="sticky top-[77px]">
            <div className="p-4 bg-white rounded">
                <div className="flex justify-between">
                    <div className="font-semibold text-[rgb(51_51_51)]">
                        Đơn hàng
                    </div>
                    <Link to={"/cart"} className="text-[rgb(11_116_229)]">
                        Thay đổi
                    </Link>
                </div>
                <div className='text-sm pb-2 border-solid border-b-[1px] border-b-[rgb(235,235,240)'>
                    {11} sản phẩm
                </div>
                <div className="flex justify-between mt-3">
                    <div className="font-normal text-[rgb(51_51_51)] mb-3">
                        Tạm tính
                    </div>
                    <div className="font-medium">
                        {formatCurrency(total)}
                    </div>
                </div>

                <div className="flex justify-between">
                    <div className="font-normal text-[rgb(51_51_51)] mb-3">
                        Phí vận chuyển
                    </div>
                    <div className="font-medium">
                        {formatCurrency(shipmentFee)}
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="font-normal text-[rgb(51_51_51)] mb-3">
                        Giảm giá
                    </div>
                    <div className="font-medium">
                        -{formatCurrency(discount)}
                    </div>
                </div>
                <div className="flex justify-between pt-5 border-solid border-t-[1px] border-t-[rgb(235,235,240)]">
                    <div className="font-normal text-[rgb(51_51_51)] mb-3">
                        Tổng tiền
                    </div>
                    <div className="font-medium text-2xl text-[rgb(254_56_52)]">
                        {formatCurrency(total - discount + shipmentFee)}
                    </div>
                </div>
                <div className="text-right text-sm text-[rgb(120_120_120)]">
                    (Giá này đã bao gồm thuế GTGT, <br /> phí đóng gói, phí vận chuyển và các chi phí phát sinh khác)
                </div>
            </div>

            <button className="w-full bg-[rgb(254_56_52)] py-[13px] px-[10px] text-white text-base mt-[10px] rounded outline-none"
                onClick={handlePay}>
                Đặt hàng <span>({cartItem.length})</span>
            </button>
        </div>
    );
};

export default CheckoutBill;