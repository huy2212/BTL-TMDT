import { Box, IconButton, Grid, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { useSelector } from 'react-redux';
import { formatCurrency } from '../../basicFunction';
function InvoiceDetails({ setDisplayInvoiceDetails }) {
    const invoiceDetails = useSelector(state => state.import.invoiceDetails)
    const handleCloseBillDetails = () => {
        setDisplayInvoiceDetails(false)
    }
    const renderName = (item) => {
        let attrString = ""
        item.product.map((attr) => {
            if (attr.important) attrString += `/ ${attr.value} `
        })
        attrString = attrString.substring(1, attrString.length)
        console.log(item)
        return `${item.product.at(-1).nameProduct} ( ${attrString} )`
    }
    return (
        <Box sx={style.coverer}>
            <Box sx={style.addUserModal}>
                <Box style={{ display: 'flex', justifyContent: "flex-end" }}>
                    <IconButton
                        onClick={handleCloseBillDetails}
                    >
                        <CancelOutlinedIcon color='error' />
                    </IconButton>
                </Box>
                <Typography variant='h5' textAlign="center">Chi tiết hóa đơn nhập hàng</Typography>
                <Grid sx={style.form} container rowSpacing={2} columnSpacing={2}>
                    <Grid xs={12} sm={12} md={7}>
                        <Grid item xs={12} sm={12} md={12} sx={style.infoContainer}>
                            <Box sx={style.infoContainer.infoCustomer} >
                                <Box sx={style.infoLabel}>
                                    <Box sx={style.infoLabel.infoCustomerLabelText} >Tên nhà cung cấp: </Box>
                                </Box>
                                <Box sx={style.infoText} >{invoiceDetails?.supplier?.name}</Box>
                            </Box>
                            <Box sx={style.infoContainer.infoCustomer} >
                                <Box sx={style.infoLabel}>
                                    <Box sx={style.infoLabel.infoCustomerLabelText} >Số điện thoại: </Box>
                                </Box>
                                <Box sx={style.infoText} >{invoiceDetails?.supplier?.phoneNumber}</Box>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid xs={0} sm={0} md={1}></Grid>
                    <Grid xs={12} sm={12} md={4}>
                        <Grid item xs={12} sm={12} md={12} sx={style.infoContainer}>
                            <Box sx={style.infoContainer.infoBill} >
                                <Box sx={style.infoLabel}>
                                    <Box sx={style.infoLabel.infoBillLabelText} >Mã hóa đơn: </Box>
                                </Box>
                                <Box sx={style.infoText}>{invoiceDetails?.id}</Box>
                            </Box>
                            <Box sx={style.infoContainer.infoBill} >
                                <Box sx={style.infoLabel}>
                                    <Box sx={style.infoLabel.infoBillLabelText} >Ngày tạo: </Box>
                                </Box>
                                <Box sx={style.infoText}>{invoiceDetails?.createDate}</Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <TableContainer style={{ padding: "16px" }}>
                    <Table padding='normal'>
                        <TableHead>
                            <TableRow>
                                <TableCell size='small' align='center'>#No</TableCell>
                                <TableCell size='small' align='center'>Tên sản phẩm</TableCell>
                                <TableCell size='small' align='center'>Giá nhập</TableCell>
                                <TableCell size='small' align='center'>Số lượng</TableCell>
                                <TableCell size='small' align='center'>Thành tiền</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                invoiceDetails?.productItemInvoices && invoiceDetails.productItemInvoices.map((item, index) => {
                                    return (<TableRow key={item.id}>
                                        <TableCell size='small' align='center'>{index + 1}</TableCell>
                                        <TableCell size='small' align='center'>{renderName(item)}</TableCell>
                                        <TableCell size='small' align='center'>{formatCurrency(item.cost)}</TableCell>
                                        <TableCell size='small' align='center'>{item.quantity}</TableCell>
                                        <TableCell size='small' align='center'>{formatCurrency(item.cost * item.quantity)}</TableCell>
                                    </TableRow>)
                                }

                                )
                            }
                            <TableRow>
                                <TableCell size='small' colSpan={4} style={{ fontWeight: "600" }} >Tổng tiền</TableCell>
                                <TableCell size='small' align='center'>{formatCurrency(invoiceDetails?.totalPrice)}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    )
}
/** @type {import("@mui/material").SxProps} */
const style = {
    coverer: {
        position: "fixed",
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1111,
        background: "rgba(0, 0, 0, 0.5)"
    },
    addUserModal: {
        backgroundColor: "white",
        width: "70%",
        position: 'absolute',
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        boxShadow: 5,
        padding: '10px',
        maxHeight: "70%",
        overflowY: "scroll"
    },
    form: {
        padding: 4
    },
    inputsContainer: {
        display: 'flex'
    },
    infoContainer: {
        infoBill: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
        },
        infoCustomer: {
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start"
        }
    },
    infoLabel: {
        display: "flex",
        alignItems: "center",
        infoBillLabelText: {
            fontWeight: "600"
        },
        infoCustomerLabelText: {
            fontWeight: "600",
            marginRight: "10px"
        }
    },
    infoText: {
        fontSize: "0.9em"
    }


}
export default InvoiceDetails;
