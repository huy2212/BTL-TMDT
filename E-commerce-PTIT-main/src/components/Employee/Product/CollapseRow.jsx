import { IconButton, TableCell, TableRow, Typography, TableBody, TableHead, Table, Box, Collapse, Button } from '@mui/material'
import React, { useState } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import AddBusinessOutlinedIcon from '@mui/icons-material/AddBusinessOutlined';
import { useDispatch } from 'react-redux';
import { deleteProduct, deleteProductDetails, getProductById, getProductDetailsById } from '../../../redux/reducer/ProductSlice';
import AddImport from './AddImport';
const CollapseRow = (props) => {
    const dispatch = useDispatch()
    const { row, category, itemDetails, setDisplayAddProduct, productId } = props
    const [open, setOpen] = useState(false)
    const [displayImport, setDisplayImport] = useState(false)
    const [productDetail,setProductDetail] = useState(null)
    const getImportantRow = () => {
        const first = itemDetails[0]
        let attr = []
        first.forEach((item) => {
            if (item.important === 1) attr.push(item.name)
        })
        return attr
    }

    const handleOpenEditProductDetails = (items) => {
        setProductDetail(items)
        setDisplayImport(true)
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
                                                        <AddBusinessOutlinedIcon color='info' />
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
            {
                displayImport && <AddImport setDisplayImport={setDisplayImport} itemDetails={productDetail} row={row}  /> 
            }
        </React.Fragment >
    )
}

export default CollapseRow