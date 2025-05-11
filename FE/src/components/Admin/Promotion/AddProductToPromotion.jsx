import { Box, Button, Chip, Divider, Grid, IconButton, Input, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { notify } from '../notify';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../../../redux/reducer/ProductSlice';
import { addPromotion, editPromotion, getPromtionById } from '../../../redux/reducer/PromotionSlice';
const AddProductToPromotion = ({ setDisplayAddPromotion, setAddProductToPromotion, currentSetPromotion }) => {
  const dispatch = useDispatch()

  const [notInPromotionProducts, setNotInPromotionProducts] = useState([])
  const [inPromotionProducts, setInPromotionProducts] = useState([])

  const [displayNotInPromotionProducts, setDisplayNotInPromotionProducts] = useState([...notInPromotionProducts])
  const [displayInPromotionProducts, setDisplayInPromotionProducts] = useState([...inPromotionProducts])

  var products = useSelector((state) => state.product.products)
  useEffect(() => {
    let productId = currentSetPromotion.products.map((item) => item.productId)
    let notIn = products.filter((item) => !productId.includes(item.productId))
    setNotInPromotionProducts(notIn)
    setDisplayNotInPromotionProducts(notIn)
    const inPromotion = Object.values(
      currentSetPromotion.products.reduce((acc, curr) => {
        if (!acc[curr.productId]) {
          acc[curr.productId] = curr;
        }
        return acc;
      }, {})
    ).map((item) => ({
      productId: item.productId,
      name: item.name
    }))
    console.log(inPromotion)
    setInPromotionProducts(inPromotion)
    setDisplayInPromotionProducts(inPromotion)

  }, [dispatch])
  const addToPromotionList = (item) => {
    setInPromotionProducts((prevList) => {
      return [...prevList, item]
    })
    setDisplayInPromotionProducts((prevList) => {
      return [...prevList, item]
    })
    setNotInPromotionProducts((prevList) => {
      let newList = prevList.filter(product => product.productId !== item.productId)
      return newList
    })
    setDisplayNotInPromotionProducts((prevList) => {
      let newList = prevList.filter(product => product.productId !== item.productId)
      return newList
    })
  }

  const removeFromPromotionList = (item) => {
    setInPromotionProducts((prevList) => {
      let newList = prevList.filter(product => product.productId !== item.productId)
      return newList
    })
    setDisplayInPromotionProducts((prevList) => {
      let newList = prevList.filter(product => product.productId !== item.productId)
      return newList
    })
    setNotInPromotionProducts((prevList) => {
      return [...prevList, item]
    })
    setDisplayNotInPromotionProducts((prevList) => {
      return [...prevList, item]
    })
  }
  const getItemsInAOnly = (arrA, arrB) => {
    return arrA.filter(item => !arrB.includes(item));
  }

  const handleOnchangeInputNotInPromotionProducts = (e) => {
    const keyword = e.target.value.toLocaleLowerCase()
    const list = notInPromotionProducts.filter(item => item.name.toLocaleLowerCase().includes(keyword))
    setDisplayNotInPromotionProducts(list)
  }

  const handleOnchangeInputInPromotionProducts = (e) => {
    const keyword = e.target.value.toLocaleLowerCase()
    const list = inPromotionProducts.filter(item => item.name.toLocaleLowerCase().includes(keyword))
    console.log(list)
    setDisplayInPromotionProducts(list)
  }

  const handleSavePromotion = () => {
    let productId = currentSetPromotion.products.map((item) => item.productId)
    let inPromotion = inPromotionProducts.map((item) => item.productId)
    let addList = getItemsInAOnly(inPromotion, productId)
    let removeList = getItemsInAOnly(productId, inPromotion)
    const newPromotion = {
      ...currentSetPromotion,
      "idItems": addList,
      "idItemsRemove": removeList
    }
    console.log(newPromotion)
    if (newPromotion.id === null) dispatch(addPromotion(newPromotion))
    else dispatch(editPromotion(newPromotion))
    dispatch(getPromtionById(-1))
    setDisplayAddPromotion(false)
  }
  return (
    <Box>
      <Box>
        <button onClick={() => setAddProductToPromotion(false)}>Back</button>
        <Grid container columnSpacing={3}>
          <Grid item xs={12} sm={12} md={6} sx={style.gridItem}>
            <Divider>
              <Chip sx={style.chip} color='info' label="Danh sách tất cả sản phẩm" size='medium' />
            </Divider>
            <Input fullWidth={true} placeholder='Nhập tên hoặc mã sản phẩm...' onChange={handleOnchangeInputNotInPromotionProducts} />
            <TableContainer sx={style.tableCotainer} >
              <Table padding='none' size='small' stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell align='center'>Stt</TableCell>
                    <TableCell align='center'>Tên sản phẩm</TableCell>
                    <TableCell align='center'></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {displayNotInPromotionProducts.map((item, index) => {
                    return (
                      <TableRow>
                        <TableCell align='center' >{index + 1}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell align='center'>
                          <IconButton onClick={() => addToPromotionList(item)}>
                            <AddCircleOutlineIcon color='success' />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
                <TableFooter></TableFooter>
              </Table>
            </TableContainer  >
          </Grid>
          <Grid item xs={12} sm={12} md={6} sx={style.gridItem} >
            <Divider>
              <Chip sx={style.chip} color='success' label="Danh sách sản phẩm áp dụng khuyến mãi" size='medium' />
            </Divider>
            <Input fullWidth={true} placeholder='Nhập tên hoặc mã sản phẩm...' onChange={handleOnchangeInputInPromotionProducts} />
            <TableContainer sx={style.tableCotainer} >
              <Table padding='none' size='small' stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell align='center'>Stt</TableCell>
                    <TableCell align='center'>Tên sản phẩm</TableCell>
                    <TableCell align='center'></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    displayInPromotionProducts.map((item, index) => {
                      return (
                        <TableRow>
                          <TableCell align='center'>{index + 1}</TableCell>
                          <TableCell>{item.name}</TableCell>
                          <TableCell align='center'>
                            <IconButton onClick={() => removeFromPromotionList(item)}>
                              <RemoveCircleOutlineIcon color='error' />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      )
                    })

                  }
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
      <Box style={{ display: 'flex', justifyContent: "flex-end" }}>
        <Button variant='contained' color='success'
          onClick={handleSavePromotion}
        >Save</Button>
      </Box>
    </Box>
  )
}
/** @type {import("@mui/material").SxProps} */
const style = {
  tableCotainer: {
    overflowY: "scroll",
    height: "80%",
    boxShadow: "2",
    marginTop: "10px"
  },
  gridItem: {
    mt: "20px",
    height: "500px"
  },
  chip: {
    marginBottom: "10px"
  }
}

export default AddProductToPromotion