import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header/Header";
import Filter from "../components/Route/Filter/Filter";
import BreadScrumb from "../components/Route/BreadScrumb/BreadScrumb";
import ProductsGrid from "../components/Route/ProductsGrid/ProductsGrid";
import Footer from "../components/Layout/Footer/Footer";
import ViewedProduct from "../components/Route/ViewedProducts/ViewedProducts";
import { useParams } from "react-router-dom";

const ProductListPage = () => {
    const {category} = useParams()
    const [categoryId,setCategoryId] = useState(category)
    useEffect(()=>{
        console.log(category)
        setCategoryId(category=="laptop"?1:category=="dienthoai"?2:3)
    },[category])
    return (
        <div>
            <Header />
            <div className="px-[62px] pt-2.5 bg-[#f6f6f6]">
                <BreadScrumb />
                <div className="flex">
                    {/* <Filter /> */}
                    <ProductsGrid categoryId={categoryId} />
                </div>
                <div className="mt-5">
                    <div className="text-2xl font-bold">
                        Mô tả nhóm sản phẩm
                    </div>
                    <p className="pt-5"></p>
                </div>
                <ViewedProduct quantity={5} />
            </div>
            <Footer />

        </div>

    )
}
export default ProductListPage;