import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../../../redux/reducer/ProductSlice";


const ProductsGrid = (props) => {
    const { categoryId } = props
    const dispatch = useDispatch()
    // const useProductsByCategory = (categoryId) => {
    //     const products = useSelector(state => {
    //         switch (categoryId) {
    //             case 1:
    //                 return state.product.laptop;
    //             case 2:
    //                 return state.product.phone;
    //             default:
    //                 return state.product.accessory;
    //         }
    //     });

    //     return products;
    // };

    const products = useSelector((state)=>{
        switch (parseInt(categoryId)) {
            case 1:
                return state.product.laptop;
            case 2:
                return state.product.phone;
            default:
                return state.product.accessory;
        }
    })
    const [productList,setProductList] = useState([])
    useEffect(()=>{
        setProductList(products)
    },[categoryId])
    const handleFunction = () => {

    }
    return (
        <div className="p-[25px] pt-[10px] flex-[4]">
            <div className="header__products">
                <h1 className="font-normal py-2.5 text-2xl">{categoryId===1?"Laptop":categoryId===2?"Điện thoại":"Phụ kiện"}</h1>
                <div className="flex items-center py-2.5">
                    <div className="flex gap-x-5">
                        Sắp xếp:
                        <button className="bg-transparent text-[#898989] text-sm hover:cursor-pointer hover:text-green-600 a_z" onClick={handleFunction()}>Tên A -{`>`} Z</button>
                        <button className="bg-transparent text-[#898989] text-sm hover:cursor-pointer hover:text-green-600 z_a" onClick={handleFunction()}>Tên Z -{`>`} A</button>
                        <button className="bg-transparent text-[#898989] text-sm hover:cursor-pointer hover:text-green-600 inc" onClick={handleFunction()}>Giá tăng dần</button>
                        <button className="bg-transparent text-[#898989] text-sm hover:cursor-pointer hover:text-green-600 dec" onClick={handleFunction()}>Giá giảm dần</button>
                        <button className="bg-transparent text-[#898989] text-sm hover:cursor-pointer hover:text-green-600 new-product" onClick={handleFunction()}>Hàng mới</button>
                    </div>
                </div>

            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 relative pt-5">
                {productList.map(item => {
                    return <ProductCard details={item} key={item.productId} />
                })
                }
            </div>
        </div>
    )
}

export default ProductsGrid;