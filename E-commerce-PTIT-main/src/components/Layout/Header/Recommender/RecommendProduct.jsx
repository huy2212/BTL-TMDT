import { Box } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { formatCurrency } from '../../../basicFunction'
import { getProductById } from '../../../../redux/reducer/ProductSlice'
import { useDispatch } from 'react-redux'

export const RecommendProduct = ({ details }) => {
    const dispatch = useDispatch()
    const priceArray = details.itemDetails.map(item => {
        return item.at(-1).price
    })
    const priceDisplay = ()=>{
        const minPrice = Math.min(...priceArray)
        const maxPrice = Math.max(...priceArray)
        if(minPrice !== maxPrice) return `${formatCurrency(minPrice)} - ${formatCurrency(maxPrice)}`
        return formatCurrency(maxPrice)
    }
    return (
        <Link onClick={()=>dispatch(getProductById(details.productId))} to={`/san-pham/${details.productId}`}>
            <div className='flex py-2 items-center cursor-pointer hover:bg-[#f3f3f3]'>
                <img src={details.images[0].path} className='w-1/6 mx-2' />
                <div className='pl-2'>
                    <div>{details.name}</div>
                    <div className='text-[red]'>{priceDisplay()}</div>
                </div>
            </div>
        </Link>
    )
}
