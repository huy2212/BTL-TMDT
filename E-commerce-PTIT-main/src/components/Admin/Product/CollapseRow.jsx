import { IconButton, TableCell, TableRow, Typography, TableBody, TableHead, Table, Box, Collapse, Button } from '@mui/material'
import React, { useState } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AddProductDetails from './AddProductDetails';
import { useDispatch } from 'react-redux';
import { deleteProduct, deleteProductDetails, getProductById, getProductDetailsById } from '../../../redux/reducer/ProductSlice';
import { Confirm } from '../Confirm';
const CollapseRow = (props) => {
    const dispatch = useDispatch()
    const { row, category, itemDetails, setDisplayAddProduct, productId } = props
    const [open, setOpen] = useState(false)
    const [displayAddProductDetails, setDisplayAddProductDetails] = useState(false)
    const [deleteProductId, setDeleteProductId] = useState(0)
    const [openConfirmProduct, setOpenConfirmProduct] = useState(false)
    const [deleteProductDetailId, setDeleteProductDetailId] = useState(0)
    const [openConfirmProductDetail, setOpenConfirmProductDetail] = useState(false)
    const [details,setDetails] = useState([])
    const handleOpenEditProductScreen = (id) => {
        dispatch(getProductById(id))
        setDisplayAddProduct(true)
    }
    const getImportantRow = () => {
        const first = itemDetails[0]
        let attr = []
        first.forEach((item) => {
            if (item.important === 1) attr.push(item.name)
        })
        return attr
    }

    const handleDeleteProduct = (id) => {
        setDeleteProductId(id)
        setOpenConfirmProduct(true)
    }
    const doDeleteProduct = (id) => {
        dispatch(deleteProduct(id))
        setOpenConfirmProduct(false)
        setDeleteProductId(0)
    }

    const handleOpenEditProductDetails = (value) => {
        setDetails(value)
        setDisplayAddProductDetails(true)
    }

    const handleOpenAddProductDetails = () => {
        setDetails([])
        setDisplayAddProductDetails(true)
    }

    const handleDeleteProductDetails = (id) => {
        setDeleteProductDetailId(id)
        setOpenConfirmProductDetail(true)
    }

    const doDeleteProductDetail = (id) => {
        dispatch(deleteProductDetails({ productId : productId, productItemId:id }))
        setOpenConfirmProductDetail(false)
        setDeleteProductDetailId(0)
    }
    const inStock =(sold,in_stock) =>{
        if(sold>in_stock) return 0
        return in_stock-sold
    }

    return (
        <React.Fragment>
            <TableRow>
                <TableCell>
                    <IconButton
                        aria-label='expand row'
                        size='small'
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope='row' align='center'>{row.productId}</TableCell>
                <TableCell align='center'>{row.name}</TableCell>
                <TableCell align='center'>{row.category.name}</TableCell>
                <TableCell align='center'>
                    <IconButton
                        onClick={() => handleOpenEditProductScreen(row.productId)}
                    >
                        <BorderColorOutlinedIcon color='info' />
                    </IconButton>
                    <IconButton
                        onClick={() => handleDeleteProduct(row.productId)}
                    >
                        <DeleteOutlinedIcon color='error' />
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={2}>
                            <Box sx={{
                                justifyContent: itemDetails.length !== 0 ? "space-between" : "normal",
                                display: itemDetails.length !== 0 ? "flex" : "block",

                            }}>
                                {itemDetails.length !== 0 && <Typography variant="h6" gutterBottom component="div">
                                    Mẫu sản phẩm
                                </Typography>}
                                {itemDetails.length === 0 && <Box sx={{ textAlign: "center", mb: 1 }}>Chưa có mẫu sản phẩm vui lòng thêm mới</Box>}
                                <Box
                                    sx={{
                                        display: "flex", justifyContent: "center"
                                    }}
                                >
                                    <Button onClick={() => handleOpenAddProductDetails()} variant='outlined' color="error" size='small' >Thêm mẫu sản phẩm</Button>
                                </Box>
                            </Box>
                            {itemDetails.length !== 0 && <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        {
                                            getImportantRow().map((field) => (
                                                <TableCell align='center'>{field}</TableCell>
                                            ))
                                        }
                                        <TableCell align='center'>Giá bán</TableCell>
                                        <TableCell align='center'>Đã bán</TableCell>
                                        <TableCell align='center'>Số lượng tồn kho</TableCell>
                                        <TableCell align='center'>Tác vụ</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody width="100">
                                    {itemDetails.map((items) => {
                                        const otherAttr = items.at(-1)
                                        return (
                                            <TableRow key={otherAttr.productItemId} >
                                                {items.map((attr) => {
                                                    if (attr.important === 1) return (
                                                        <TableCell align='center'>{attr.value}</TableCell>
                                                    )
                                                })}
                                                <TableCell align='center'>{otherAttr.price??0}</TableCell>
                                                <TableCell align='center'>{otherAttr.quantity_sold??0}</TableCell>
                                                <TableCell align='center'>{inStock(otherAttr.quantity_sold,otherAttr.quantity_stock)}</TableCell>
                                                <TableCell align='center'>
                                                    <IconButton
                                                        onClick={() => handleOpenEditProductDetails(items)}
                                                    >
                                                        <BorderColorOutlinedIcon color='info' />
                                                    </IconButton>
                                                    <IconButton
                                                        onClick={() => handleDeleteProductDetails(otherAttr.productItemId)}
                                                    >
                                                        <DeleteOutlinedIcon color='error' />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}

                                </TableBody>
                            </Table>}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
            {displayAddProductDetails && <AddProductDetails itemDetails={details} setDisplayAddProduct={setDisplayAddProductDetails} category={category} productId={productId} />}
            {openConfirmProduct && <Confirm name="PRODUCT" noAction={() => setOpenConfirmProduct(false)} yesAction={() => doDeleteProduct(deleteProductId)} />}
            {openConfirmProductDetail && <Confirm name="PRODUCT DETAIL" noAction={() => setOpenConfirmProductDetail(false)} yesAction={() => doDeleteProductDetail(deleteProductDetailId)} />}

        </React.Fragment >
    )
}

export default CollapseRow