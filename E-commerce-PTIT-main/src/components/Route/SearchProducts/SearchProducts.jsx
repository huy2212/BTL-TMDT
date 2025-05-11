import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../../../redux/reducer/ProductSlice';
import { SearchedProductList } from './SearchedProductList';

const SearchProducts = (props) => {
    const query = props.query
    const dispatch = useDispatch()
    const foundProduct = useSelector(state=> state.product.products)
    useEffect(()=>{
        console.log(query)
        dispatch(fetchProduct({ brandId: "", categoryId: "", key: query }))
    },[query])

    return (
        <div className='mt-[53px] px-[62px] pt-2.5 pb-4'>
            <div className="flex justify-between gap-x-5">
                <div className="pt-2 pb-2">
                    <ul className="flex list-none flex-wrap">
                        <li><Link to="/">Trang chủ / </Link></li>
                        <li>Tìm kiếm</li>
                    </ul>
                </div>
            </div>
            <div className="text-lg ">
                <div>TÌM THẤY <span className='font-bold'>{foundProduct.length}</span> SẢN PHẨM PHÙ HỢP VỚI TỪ KHOÁ "{query}"</div>
            </div>
            <div className="grid grid-cols-5 gap-5 relative pt-5">
                <SearchedProductList foundProduct={foundProduct} />
            </div>
        </div>

    );
};

export default SearchProducts;