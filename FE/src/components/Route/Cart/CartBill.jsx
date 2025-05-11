import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../basicFunction';
import { notify } from '../../Admin/notify';
import cartSlice from '../../../redux/reducer/CartSlice';
const CartBill = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cartItem = useSelector(state => state.cart.preOrder)
    const discountVoucher = useSelector(state => state.voucher.usingVoucher)
    const [discount,setDiscount] = useState(0)
    const [total, setTotal] = useState(0)
    useEffect(()=>{
        dispatch(cartSlice.actions.resetPreOrder())
    },[])
    useEffect(() => {
        if (cartItem) {
            let total = cartItem.reduce((cucl, item) => {
                return parseInt(cucl) + parseInt(item.totalPrice)
            }, 0)
            setTotal(total)
            if(discountVoucher) {
                let tmp = (total*discountVoucher.discount)/100
                tmp = tmp>discountVoucher.discountConditions?discountVoucher.discountConditions:tmp
                setDiscount(tmp)
                console.log(tmp)
            }
        }
    }, [dispatch,cartItem,discountVoucher])
    const handleCheckout = (e) => {
        const preOrder = JSON.parse(sessionStorage.getItem("preOrder"))
        console.log(preOrder)
        if(!preOrder || preOrder.length===0) notify("Bạn chưa chọn sản phẩm mua hàng",3)
        else navigate('/checkout') 
    }
    return (
        <div className="sticky top-[77px]">
            <div className="p-4 bg-white mb-3 rounded">
                <div className="flex justify-between">
                    <div className="font-normal text-[rgb(51_51_51)] mb-3">
                        Tạm tính
                    </div>
                    <div className="font-medium">
                        {formatCurrency(total)}
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="font-normal text-[rgb(51_51_51)] mb-3">
                        Giảm giá
                    </div>
                    <div className="font-medium">
                        - {formatCurrency(discount)}
                    </div>
                </div>
                <div className="flex justify-between pt-5 border-solid border-t-[1px] border-t-black">
                    <div className="font-normal text-[rgb(51_51_51)] mb-3">
                        Tổng tiền
                    </div>
                    <div className="font-medium text-2xl text-[rgb(254_56_52)]">
                        {formatCurrency(total-discount)}
                    </div>
                </div>
                <div className="text-right text-sm text-[rgb(120_120_120)]">
                    (Đã bao gồm VAT)
                </div>
            </div>

            <button className="w-full bg-[rgb(254_56_52)] py-[13px] px-[10px] text-white text-base mt-[10px] rounded outline-none"
                onClick={handleCheckout}>
                Mua hàng <span>({cartItem.length})</span>
            </button>
            <div className="mt-[10px]">
                <div className="overflow-hidden rounded-[5px] hidden lg:block">
                    <img className="w-full" src="/static/images/cart/slider.webp" alt="" />
                </div>
            </div>
        </div>
    );
};

export default CartBill;