import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ProductCard from '../ProductCard/ProductCard'

export const Willist = () => {
    const willist = useSelector(state => state.willist.willist)
    return (
        <div className='mt-[53px] px-[62px] pt-2.5 pb-4'>
            <div className="flex justify-between gap-x-5">
                <div className="pt-2 pb-2">
                    <ul className="flex list-none flex-wrap">
                        <li><Link to="/">Trang chủ / </Link></li>
                        <li> Danh sách yêu thích</li>
                    </ul>
                </div>
            </div>
            <div className="text-lg ">
                <div>DANH SÁCH YÊU THÍCH CỦA BẠN CÓ <span className='font-bold'>{}</span> SẢN PHẨM</div>
            </div>
            <div className="grid grid-cols-5 gap-5 relative pt-5">
                {/* <SearchedProductList foundProduct={foundProduct} /> */}

                {
                    willist.map((item)=>{
                        return (
                            <ProductCard details={item} key={item.productId} />
                        )
                    })
                }
            </div>
        </div>
    )
}
