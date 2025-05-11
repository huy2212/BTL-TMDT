import React from 'react'
import { RecommendProduct } from './RecommendProduct'
import { useSelector } from 'react-redux'

export const Recommender = ({ searchValue,setSearchValue }) => {
    const products = useSelector(state => state.product.fullProducts)
    const listProduct = products.filter((item)=> item.name.toLowerCase().includes(searchValue.toLowerCase())).slice(0, 5)
    console.log(products)
    return (
        listProduct.length!==0?(listProduct.map((item)=>{
            return(
                <div onClick={()=>setSearchValue("")}>
                    <RecommendProduct details={item} />
                </div>
            )
        })):(<div className='my-8 text-center'>Không có sản phẩm khớp</div>)
    )
}
