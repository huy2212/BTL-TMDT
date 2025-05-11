import React, { useEffect } from "react";
import { FaTrash } from "react-icons/fa";

import ViewedProduct from "../ViewedProducts/ViewedProducts";
import CartItem from "./CartItem";
import DeliveryAddress from "../../Delivery/DeliveryAddress";
import CartVoucher from "./CartVoucher";
import CartBill from "./CartBill";
import { useDispatch, useSelector } from "react-redux";
import voucherSlice, { fetchUserVoucher } from "../../../redux/reducer/VoucherSlice";
import { getOwnInformation } from "../../../redux/reducer/UserSlice";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import orderSlice from "../../../redux/reducer/OrderSlice";
import cartSlice from "../../../redux/reducer/CartSlice";
const Cart = () => {
    const dispatch = useDispatch()
    const cartItem = useSelector(state => state.cart.cartItems)
    useEffect(() => {
        dispatch(fetchUserVoucher())
        sessionStorage.clear("preOrder")
    }, [])
    return (
        <div className="p-5 bg-[#efefef] mt-11">
            <div className="font-Roboto font-bold mb-5">
                <h1> GIỎ HÀNG</h1>
            </div>
            <div className='grid gap-5 grid-cols-1 lg:grid-cols-4'>
                <div className="col-span-1 lg:col-span-3">
                    <div className="mb-5">
                        <div className="text-sm md:text-base grid grid-cols-[repeat(5,1fr)_0.5fr] lg:grid-cols-[auto_180px_120px_120px_20px] gap-x-6 rounded items-center py-2 px-4 sticky top-[77px] bg-white 
                        before:contents-[''] before:bg-[#efefef] before:absolute before:w-full before:h-5 before:top-[-20px]
                        after:contents-[''] after:bg-[#efefef] after:absolute after:w-full after:h-[10px] after:bottom-[-10px]">
                            <div className="flex items-center gap-x-3 col-span-2 lg:col-span-1">
                                <input type="checkbox" name="" id="all-cart" />
                                <label for="all-cart">Tất cả (x sản phẩm)</label>
                            </div>
                            <span>Đơn giá</span>
                            <span>Số lượng</span>
                            <span>Thành tiền</span>
                            <span>
                                <FaTrash />
                            </span>
                        </div>
                        {cartItem.length !== 0 ? (
                            <div className="bg-white rounded mt-6 border-b border-gray-200">
                                {cartItem.length !== 0 &&
                                    cartItem.map((item) => <CartItem key={item.cartItemId} itemInfo={item} />)}
                            </div>
                        ) : (
                            <div className="mt-2 text-center">Chưa có sản phẩm nào trong giỏ hàng</div>
                        )}
                    </div>
                </div>
                <div className="col-span-1">
                    <DeliveryAddress />
                    <CartVoucher />
                    <CartBill />
                </div>
                <div className="col-span-1 lg:col-span-3">
                    <ViewedProduct quantity={4} />
                </div>
            </div>
            <ToastContainer></ToastContainer>     
        </div>
    )

}
export default Cart;