import React, { useEffect, useState } from 'react';
import { TiTick } from "react-icons/ti";
import { FaTruckFast } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import cartSlice, { deleteCartItem, updateCartItem } from '../../../redux/reducer/CartSlice';
import { formatCurrency } from '../../basicFunction';
import { notify } from '../../Admin/notify';


const CartItem = (props) => {
    const { itemInfo } = props
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(itemInfo.quantity)
    const preOrder = useSelector(state => state.cart.preOrder)
    const [checked, setChecked] = useState(false)
    const renderName = (name) => {
        let attrString = ""
        itemInfo.details.map((attr) => {
            if (attr.important) attrString += `- ${attr.value} `
        })
        attrString = attrString.substring(1, attrString.length)
        return `${name} ( ${attrString} )`
    }
    const handleChangeQuantity = (value) => {
        if (quantity < 2 && value == 1) return
        let afterCount = quantity - value
        const productLeft = itemInfo.details.at(-1).quantity_stock - itemInfo.details.at(-1).quantity_sold
        if (afterCount > productLeft) {
            notify("Không còn sản phẩm trong kho để thêm", 2)
            return;
        }
        setQuantity(afterCount)
        let cartItem = {
            cartItemId: itemInfo.cartItemId,
            quantity: afterCount,
            price: itemInfo.details.price
        }
        dispatch(cartSlice.actions.updateQuantityPreOrder(cartItem))
        dispatch(updateCartItem(cartItem))
    }
    const handleRemoveCartItem = () => {
        dispatch(cartSlice.actions.updatePreOrder(itemInfo))
        dispatch(deleteCartItem(itemInfo.cartItemId))
    }
    const handleAddToPreOdrder = () => {
        setChecked(!checked)
        dispatch(cartSlice.actions.updatePreOrder(itemInfo))
    }

    return (
        <div className="text-sm md:text-base grid grid-cols-[repeat(5,1fr)_0.5fr] lg:grid-cols-[auto_180px_120px_120px_20px] gap-x-6 items-center p-4">
            <div className="block md:grid col-span-2 grid-cols-[18px_1fr_2fr] lg:col-span-1 lg:grid-cols-[18px_80px_1fr] items-center gap-x-3">
                <input type="checkbox" onChange={() => handleAddToPreOdrder()} checked={checked} />
                <div className="aspect-square max-w-20">
                    <img className="w-full h-full" src={itemInfo.image} alt="" />
                </div>
                <div className="item">
                    <div className="text-[rgb(10_104_255)] text-sm flex items-center">
                        <TiTick className="text-white bg-[rgb(10_104_255)] rounded-full mr-1" />
                        Chính hãng
                    </div>
                    <Link to={`/san-pham/${itemInfo.itemId}`} className="line-clamp-2">
                        {renderName(itemInfo.name)}
                    </Link>
                    {/* <div className="flex items-center gap-x-1">
                        <FaTruckFast />
                        <div className="text-xs">Giao thứ 7, 06/04</div>

                    </div> */}
                </div>
            </div>
            <div className="font-bold">{formatCurrency(itemInfo.price)}</div>
            <div className="flex justify-start">
                <button className="border-solid border-[1px] border-[rgb(200_200_200)] cursor-pointer rounded-tl-lg rounded-bl-lg px-[6px]"
                    onClick={() => handleChangeQuantity(1)}
                >-</button>
                <input type="text" value={quantity} className="w-8 h-[26px] text-center border-[1px] border-solid border-[rgb(200_200_200)] outline-none appearance-none" />
                <button className="border-solid border-[1px] border-[rgb(200_200_200)] cursor-pointer rounded-tr-lg rounded-br-lg px-[6px]"
                    onClick={() => handleChangeQuantity(-1)}
                >+</button>
            </div>
            <div className="font-bold text-[rgb(254_56-52)]">{formatCurrency(quantity * itemInfo.price)}</div>
            <button
                onClick={() => handleRemoveCartItem()}
            >
                <FaTrash />
            </button>
        </div>
    );
};

export default CartItem;