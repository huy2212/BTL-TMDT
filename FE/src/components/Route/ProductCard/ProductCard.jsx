import React, { useEffect, useState } from "react";
import { FaHeart, FaStar,FaStarHalfAlt } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getProductById } from "../../../redux/reducer/ProductSlice";
import { addToWillist } from "../../../redux/reducer/WillistSlice";

const ProductCard = ({ details }) => {
    const [productInfo, setProductInfo] = useState(details)
    const dispatch = useDispatch()
    useEffect(() => {
        let priceArray = details.itemDetails.map(item => {
            return item.at(-1).price
        })

        let productDetail = {
            name: details.name,
            img: details.images[0].path,
            minPrice: formatCurrency(Math.min(...priceArray)),
            maxPrice: formatCurrency(Math.max(...priceArray)),
            rating: details.rating,
            numberRating : details.number_rating
        }
        setProductInfo(productDetail)
        console.log(details)
    }, [])

    const formatCurrency = (value) => {
        if (typeof value !== 'number') {
            return value; // Trả về giá trị gốc nếu không phải là số
        }

        const formatter = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        });

        const formattedValue = formatter.format(value);

        return formattedValue.replace(/₫/g, 'đ');
    }
    return (
        <div className="relative group bg-white rounded-[10px] shadow-[0px_2px_10px_#00000014] transition-all duration-300 ease-in-out hover:translate-y-[-5px] hover:shadow-[0px_8px_16px_#0000002f]">
            <Link onClick={()=>dispatch(getProductById(details.productId))} to={`/san-pham/${details.productId}`}>
                <div className="relative">
                    <div className="p-2.5">
                        <img src={productInfo.img} 
                            alt="" />
                    </div>
                    {/* <div className="absolute top-0 h-[31px] w-20 left-[-5px]"
                        style={{
                            background: "url('/static/discount.png') center no-repeat",
                            backgroundSize: "contain"
                        }}>
                        <p className="text-xs font-bold text-center text-white my-[5px]">Giảm 12%</p>

                    </div> */}

                </div>
                <div className="px-2.5 pb-3">
                    <div className="group-hover:text-green-600 line-clamp-3">{productInfo.name}</div>
                    <div className="pb-[5px]">
                        <div className="inline-block font-medium text-green-600">
                            {productInfo.minPrice}
                        </div>
                        {(productInfo.minPrice !== productInfo.maxPrice) && <div className="inline-block font-medium text-green-600">
                            - {productInfo.maxPrice}
                        </div>}
                    </div>
                    <div className="flex justify-between flex-[2] flex-wrap">
                        <div className="flex justify-around gap-x-1">
                            {
                                Array.from({ length: parseInt(productInfo.rating) }, (_, index) => (
                                    <FaStar key={index} color="#ffa534" />
                                ))
                            }
                            {
                                (productInfo.rating - parseInt(productInfo.rating) >= 0.5 ? <FaStarHalfAlt color="#ffa534" /> : '')
                            }
                            {
                                Array.from({ length: 5 - Math.round(productInfo.rating) }, (_, index) => (
                                    <FaStar key={index} color="rgb(209,209,211)" />
                                ))
                            }
                        </div>
                        <div className="pl-2 text-[13px]">( {productInfo.numberRating} đánh giá)</div>
                    </div>
                </div>
            </Link>
            <div className="absolute top-1/3 right-0 opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-300">
                <Link onClick={()=>dispatch(getProductById(details.productId))} to={`/san-pham/${details.productId}`}>
                    <div className="mr-2 p-1.5 rounded-full border-2 border-solid border-red cursor-pointer text-[#f66315] hover:text-white hover:bg-[#f66315] transition-all duration-300 ease-in-out">
                        <FaCartPlus size={20} />
                    </div>
                </Link>
                <div
                onClick={()=> dispatch(addToWillist(details))}
                className="mt-2 mr-2 p-1.5 rounded-full border-2 border-solid border-red cursor-pointer text-[#f66315] hover:text-red-600 hover:bg-gray-200 transition-all duration-300 ease-in-out">
                    <FaHeart size={20} />
                </div>
            </div>
        </div>
    )
}

export default ProductCard;