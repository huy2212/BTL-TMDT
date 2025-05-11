
import { Box, Button, IconButton, Tab, Tabs, Typography } from '@mui/material'
import React, { useState,useEffect } from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AddProduct from '../../components/Admin/Product/AddProduct';
import ProductCollapseTable from '../../components/Admin/Product/ProductCollapseTable';
import { useDispatch, useSelector } from 'react-redux';
import productSlice, {  fetchBrand, fetchProduct, getProductById, getVariationByCategory } from '../../redux/reducer/ProductSlice';
import { notify } from '../../components/Admin/notify';
import { fetchSupplier } from '../../redux/reducer/SupplierSlice';
const ProductManager = () => {
  const dispatch = useDispatch()
  const [displayAddProduct, setDisplayAddProduct] = useState(false)
  
  var message = useSelector((state)=> state.product.alert)
  useEffect(()=>{
    if(message!==undefined) notify(message.message,message.code)
    return ()=>{
      dispatch(fetchBrand())
      dispatch(fetchProduct())
      dispatch(productSlice.actions.resetAlert(undefined))
    }
  },[message,dispatch])
  const handleOpenAddProduct = () => {
    setDisplayAddProduct(true)
    dispatch(getProductById(-1))
    dispatch(getVariationByCategory(1))
  }

  return (
    <div>
      <Box>
        <Typography sx={style.pageTitle} variant='h5'>Quản lý sản phẩm</Typography>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Box>
            <Button variant='contained' onClick={() => { handleOpenAddProduct() }}>
              <AddBoxOutlinedIcon fontSize='small' />
              <Box ml={1}>Thêm sản phẩm</Box>
            </Button>
          </Box>
          <ProductCollapseTable setDisplayAddProduct={setDisplayAddProduct} />
        </Box>
      </Box>
      {displayAddProduct && <AddProduct setDisplayAddProduct={setDisplayAddProduct} />}
    </div>
  )
}
/** @type {import("@mui/material").SxProps} */
const style = {
  pageTitle: {
    mb: 2
  }
}
export default ProductManager