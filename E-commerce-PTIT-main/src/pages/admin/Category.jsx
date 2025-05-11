import { Box, Button, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import AddCategory from '../../components/Admin/Category/AddCategory';
import { useDispatch, useSelector } from 'react-redux';
import categorySlice, {  fetchCategory, getCategoryById } from '../../redux/reducer/CategorySlice';
import { notify } from '../../components/Admin/notify';
import CategoryCollapseTable from '../../components/Admin/Category/CategoryCollapseTable';
function Category() {
  const dispatch = useDispatch()
  var categories = useSelector((state) => state.category.categories)

  var message = useSelector((state) => state.category.alert)
  useEffect(() => {
    if (message !== undefined) notify(message.message, message.code)
    return () => {
      dispatch(categorySlice.actions.resetAlert(undefined))
    }
  }, [message, dispatch])
  const [categoryList, setCategoryList] = useState([])
  useEffect(() => {
    dispatch(fetchCategory())
  }, [dispatch])
  useEffect(() => {
    setCategoryList(categories)
  }, [categories])

  const [displayAddCategory, setDisplayAddCategory] = useState(false)
  const handleOpenDisplayAddCategory = () => {
    dispatch(getCategoryById(-1));
    setDisplayAddCategory(true);
  };

  return (
    <div>
      <Box>
        <Typography sx={style.pageTitle} variant='h5'>Quản lý danh mục</Typography>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Box>
            <Button variant='contained' onClick={()=>handleOpenDisplayAddCategory() }>
              <AddBoxOutlinedIcon fontSize='small' />
              <Box ml={1}>Thêm danh mục</Box>
            </Button>
          </Box>
          <CategoryCollapseTable setDisplayAddCategory={handleOpenDisplayAddCategory} />
        </Box>
      </Box>
      {displayAddCategory && <AddCategory setDisplayAddCategory={setDisplayAddCategory} />}
    </div>
  )
}
/** @type {import("@mui/material").SxProps} */
const style = {
  pageTitle: {
    mb: 2
  }
}
export default Category