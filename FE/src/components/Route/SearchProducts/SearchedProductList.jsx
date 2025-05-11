import React, { useEffect, useState } from 'react'
import ProductCard from '../ProductCard/ProductCard'
import { useSelector } from 'react-redux'

export const SearchedProductList = ({foundProduct}) => {
    // const foundProduct = useSelector(state=> state.product.products)
    // const [products,setProducts] = useState([])
    // useEffect(()=>{
    //     setProducts(foundProduct)
    //     console.log(foundProduct)
    // },[foundProduct])
    return (
        foundProduct.map(item => {
            return <ProductCard details={item} key={item.productId} />
        })
    )
}
