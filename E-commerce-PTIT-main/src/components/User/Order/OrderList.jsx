import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";

import { OrderComponent } from './OrderComponent';


const OrderList = (props) => {
    const {orders} = props
    const [search, setSearch] = useState('')


    return (
        <div className='mt-3'>
            {/* search bar */}
            <div className='flex w-full items-center rounded border-[1px] border-solid border-[rgb(196_196_207)] overflow-hidden bg-white'>
                <FaSearch className='ml-2' />
                <input type="text" className='flex-1 px-5 py-1 outline-none' placeholder='Tìm theo mã đơn hàng' value={search} onChange={(e) => setSearch(e.target.value)} />
                <button className={`pr-2 ${search.length === 0 ? `hidden` : `block`}`} onClick={() => setSearch('')}>
                    <MdOutlineCancel />
                </button>
                <div className='w-[1px] h-[19px] bg-black'></div>
                <div className='py-1 px-4 outline-none cursor-pointer'>Tìm đơn hàng</div>
            </div>
            <div className="">
                {
                    orders.map((order)=>{
                        return (<OrderComponent order={order} />)
                    })
                }

            </div>
        </div>
    );
};

export default OrderList;