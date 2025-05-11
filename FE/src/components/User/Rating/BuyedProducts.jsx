import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { BuyedProductCard } from './BuyedProductCard'
import { RatingProduct } from './RatingProduct'
import { CommentProduct } from './CommentProduct'

export const BuyedProducts = () => {
  const buyedProductId = JSON.parse(localStorage.getItem("authorization"))?.listProductBought || []
  const products = useSelector((state) => state.product.products)
  const buyedProductList = products.filter((item) => buyedProductId.includes(item.productId))
  const [displayRatingProduct, setDisplayRatingProduct] = useState(false)
  const [displayCommentProduct,setDisplayCommentProduct] = useState(false)
  const [ratingProduct ,setRatingProduct] = useState(null)
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
      {console.log(buyedProductList)}
      {buyedProductList !== undefined && buyedProductList.map((item) => (
        <BuyedProductCard details={item} setDisplayRatingProduct={setDisplayRatingProduct} setDisplayCommentProduct={setDisplayCommentProduct} setRatingProduct={setRatingProduct} />
      ))}
      {displayRatingProduct && <RatingProduct setDisplayRatingProduct={setDisplayRatingProduct} ratingProduct={ratingProduct} />}
      {displayCommentProduct && <CommentProduct setDisplayCommentProduct={setDisplayCommentProduct} ratingProduct={ratingProduct} />}
    </div>
  )
}
