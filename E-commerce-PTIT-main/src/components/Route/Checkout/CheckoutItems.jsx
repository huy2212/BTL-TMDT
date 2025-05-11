import { Box, Grid, Tooltip, Tab, RadioGroup, Typography, Radio } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { SiNow } from "react-icons/si";
import { BiSolidPackage } from "react-icons/bi";
import { FaShippingFast } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { MdOutlinePayments } from "react-icons/md";
import { MdPayment } from "react-icons/md";
import { CheckoutItemsDetails } from './CheckoutItemsDetails';
import { useDispatch, useSelector } from 'react-redux';
import { formatCurrency } from '../../basicFunction';
import shipmentSlice from '../../../redux/reducer/ShipmentSlice';
import paymentSlice from '../../../redux/reducer/PaymentSlice';
const CheckoutItems = () => {
    const dispatch = useDispatch()
    const cartItems = useSelector(state => state.cart.preOrder)
    const shipmentType = useSelector(state => state.shipment.shipments)
    const paymentType = useSelector(state => state.payment.payments)
    const [shipment, setShipment] = useState(JSON.parse(sessionStorage.getItem("choosenShipment")))
    const [payment, setPayment] = useState(JSON.parse(sessionStorage.getItem("choosenPayment")))
    const [total, setTotal] = useState(0)
    useEffect(() => {
        console.log(cartItems)
        if (cartItems) {
            let total = cartItems.reduce((cucl, item) => {
                return parseInt(cucl) + parseInt(item.totalPrice)
            }, 0)
            setTotal(total)
        }
    }, [cartItems,shipmentType,paymentType])
    const handleSetShipment = (item)=>{
        dispatch(shipmentSlice.actions.updateShipment(item))
        setShipment(item)
    }
    const handleSetPayment = (item)=>{
        dispatch(paymentSlice.actions.updatePayment(item))
        setPayment(item)
    }
    return (
        <Box sx={style.paymentContainer}>
            <Typography fontWeight={500} >Chọn hình thức giao hàng</Typography>
            <RadioGroup defaultValue="save" >
                <Box sx={style.shipmentType}>
                    {
                        shipmentType.map(item => (
                            <Box sx={style.shipmentType.shipment}>
                                <Radio size='small' value={item.id} checked={shipment!==null?item.id===shipment.id:false} onClick={() => handleSetShipment(item)} />
                                <Box sx={style.shipmentType.shipment.name} >
                                    {item.description}
                                </Box>
                                <Box
                                    style={{ marginLeft: "5px", color: "#009800" }}
                                >{`- Phí ship: ${formatCurrency(item.price)}`}</Box>
                            </Box>
                        ))
                    }
                </Box>
            </RadioGroup>
            <Box sx={style.supplyContainer}>
                <Box sx={style.supplyContainer.title}>
                    <Box>
                        <BiSolidPackage
                            style={{ marginRight: "5px" }}
                        />
                    </Box>
                    {shipment && <Box> Gói : {shipment.name + " " + shipment.description}</Box>}
                </Box>
                <Box sx={style.supplyContainer.shipInfo}>
                    <Box sx={style.supplyContainer.shipInfo.shipment}>
                        <Box sx={style.supplyContainer.shipInfo.shipment.shipmentType}>
                            <Box>{shipment && shipment.description}</Box>
                        </Box>
                        <Box>{formatCurrency(total)}</Box>
                    </Box>
                    {shipment && <Box sx={style.supplyContainer.shipInfo.shipper} >
                        <FaShippingFast
                            style={{
                                fontSize: "x-large",
                                marginRight: "5px"
                            }} />
                        <Box sx={style.supplyContainer.shipInfo.shipper.text} >Được giao bởi {shipment.shippingUnit}</Box>
                    </Box>}
                </Box>
                <Box sx={style.supplyContainer.supplyBox}>
                    {cartItems.map(item => (
                        <CheckoutItemsDetails item={item} key={item.id} />
                    ))}
                </Box>
            </Box>
            <Typography fontWeight={500} >Chọn hình thức thanh toán</Typography>
            <RadioGroup defaultValue="save" >
                <Box sx={style.paymentType}>
                    {
                        paymentType.map(item => (
                            <Box sx={style.paymentType.payment}>
                                <Radio size='small' value={item.id} checked={payment!==null?item.id===payment.id:false} onClick={() => handleSetPayment(item)} />
                                <Box sx={style.paymentType.payment.name} >
                                    {item.name.includes("VNPay") ? (<MdPayment
                                        style={{
                                            color: "#000000",
                                            fontSize: "x-large",
                                            marginRight: "7px"
                                        }}
                                    />) : (<MdOutlinePayments
                                        style={{
                                            color: "#009800",
                                            fontSize: "x-large",
                                            marginRight: "7px"
                                        }}
                                    />)}
                                    {item.description}
                                </Box>
                            </Box>

                        ))
                    }
                </Box>
            </RadioGroup>
        </Box>
    )
}

/** @type {import("@mui/material").SxProps} */
const style = {
    paymentContainer: {
        padding: "20px",
        width: "100%",
        background: "white",
        borderRadius: "4px"
    },
    shipmentType: {
        px: 2,
        py: 1,
        mt: 2,
        mb: 4,
        backgroundColor: "#f0f8ff",
        borderRadius: "10px",
        width: "70%",
        border: "2px solid #c6e3ff",
        shipment: {
            display: "flex",
            alignItems: "center",
            mb: 1,
            name: {
                display: "flex",
                alignItems: "center"
            }
        }
    },
    supplyContainer: {
        border: "solid 1px #dedee4",
        borderRadius: "10px",
        position: "relative",
        width: "100%",
        px: 2,
        py: 1,
        mb: 2,
        title: {
            color: "#009800",
            display: "flex",
            alignItems: "center",
            position: "absolute",
            top: "-14px",
            left: "14px",
            backgroundColor: "white",
            px: 1
        },
        shipInfo: {
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
            shipment: {
                my: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "65%",
                shipmentType: {
                    display: "flex",
                    alignItems: "center",
                    width: "60%"
                }
            },
            shipper: {
                width: "30%",
                backgroundColor: "#f5f5fa",
                borderRadius: "5px",
                px: 2,
                py: 1,
                display: "flex",
                text: {
                    fontSize: "0.9em"
                }
            }
        },
        supplyBox: {
            maxHeight: "200px",
            overflowY: "scroll",
            paddingRight: "1.5%",
            width: "67%",
            my: 1,
            supplyHolder: {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2,
                supply: {
                    display: "flex",
                    alignItems: "center",
                    width: "70%",
                    image: {
                        minWidth: "12%",
                        width: "12%",
                        mr: 2
                    },
                    info: {
                        textWrap: "nowrap",
                        textOverflow: "ellipsis",
                        overflowX: "hidden",
                        maxWidth: "88%",
                        color: "#777779"
                    },
                    name: {
                        textWrap: "nowrap",
                        textOverflow: "ellipsis",
                        overflowX: "hidden",
                    }
                },
            }
        },
    },
    voucher: {
        display: "flex",
        alignItems: "self-end",
        mb: 2,
        chooseVoucher: {
            fontSize: "0.9em",
            ml: 1,
            color: "#777779",
            display: "flex",
            alignItems: "center",
            cursor: "pointer"
        }
    },
    paymentType: {
        px: 2,
        py: 1,
        mt: 2,
        mb: 4,
        width: "70%",
        payment: {
            display: "flex",
            alignItems: "center",
            mb: 1,
            name: {
                display: "flex",
                alignItems: "center"
            }
        }
    },

}
export default CheckoutItems;