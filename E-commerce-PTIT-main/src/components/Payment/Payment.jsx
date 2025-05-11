import { Box, Grid, Tooltip, Tab, RadioGroup, Typography, Radio } from '@mui/material'
import React from 'react'
import { SiNow } from "react-icons/si";
import { BiSolidPackage } from "react-icons/bi";
import { FaShippingFast } from "react-icons/fa";
import Book from '../../assets/testproduct/dacnhantam.jpg'
import { IoIosArrowForward } from "react-icons/io";
import { MdOutlinePayments } from "react-icons/md";
import { MdPayment } from "react-icons/md";
const Payment = () => {
    return (
        <Box sx={style.paymentContainer}>
            <Typography fontWeight={500} >Chọn hình thức giao hàng</Typography>
            <RadioGroup defaultValue="save" >
                <Box sx={style.shipmentType}>
                    <Box sx={style.shipmentType.shipment}>
                        <Radio size='small' value="fast" />
                        <Box sx={style.shipmentType.shipment.name} >
                            <SiNow
                                style={{
                                    color: "#fc0303",
                                    fontSize: "xx-large",
                                    marginRight: "7px"
                                }}
                            />
                            Giao siêu tốc 2h
                        </Box>
                    </Box>
                    <Box sx={style.shipmentType.shipment}>
                        <Radio size='small' value="save" />
                        <Box sx={style.shipmentType.shipment.name} >
                            Giao hàng tiết kiệm
                        </Box>
                    </Box>
                </Box>
            </RadioGroup>
            <Box sx={style.supplyContainer}>
                <Box sx={style.supplyContainer.title}>
                    <Box>
                        <BiSolidPackage
                            style={{ marginRight: "5px" }}
                        />
                    </Box>
                    <Box> Gói : Giao siêu tốc 2h, trước 10h ngày mai</Box>
                </Box>
                <Box sx={style.supplyContainer.shipInfo}>
                    <Box sx={style.supplyContainer.shipInfo.shipment}>
                        <Box sx={style.supplyContainer.shipInfo.shipment.shipmentType}>
                            <SiNow
                                style={{
                                    color: "#fc0303",
                                    fontSize: "xx-large",
                                    marginRight: "7px"
                                }}
                            />
                            <Box>Giao siêu tốc 2h</Box>
                        </Box>
                        <Box>25.000 vnd</Box>
                    </Box>
                    <Box sx={style.supplyContainer.shipInfo.shipper} >
                        <FaShippingFast
                            style={{
                                fontSize: "x-large",
                                marginRight: "5px"
                            }} />
                        <Box sx={style.supplyContainer.shipInfo.shipper.text} >Được giao bởi TIKINOW SMART Logistics</Box>
                    </Box>
                </Box>
                <Box sx={style.supplyContainer.supplyBox}>
                    <Box sx={style.supplyContainer.supplyBox.supplyHolder}>
                        <Box sx={style.supplyContainer.supplyBox.supplyHolder.supply}>
                            <Box sx={style.supplyContainer.supplyBox.supplyHolder.supply.image}>
                                <img src={Book}></img>
                            </Box>
                            <Box sx={style.supplyContainer.supplyBox.supplyHolder.supply.info} >
                                <Tooltip title="Chế độ ăn trườnasdasdasdasdasdasdasdasdasdasdaasdasg thọ">
                                    <Box sx={style.supplyContainer.supplyBox.supplyHolder.supply.name}>Chế độ ăn trườnasdasdasdasdasdasdasdasdasdasdaasdasg thọ</Box>
                                </Tooltip>
                                <Box>SL : 1</Box>
                            </Box>
                        </Box>
                        <Box>25.000 vnd</Box>
                    </Box>
                    <Box sx={style.supplyContainer.supplyBox.supplyHolder}>
                        <Box sx={style.supplyContainer.supplyBox.supplyHolder.supply}>
                            <Box sx={style.supplyContainer.supplyBox.supplyHolder.supply.image}>
                                <img src={Book}></img>
                            </Box>
                            <Box sx={style.supplyContainer.supplyBox.supplyHolder.supply.info} >
                                <Tooltip title="Chế độ ăn trườnasdasdasdasdasdasdasdasdasdasdaasdasg thọ">
                                    <Box sx={style.supplyContainer.supplyBox.supplyHolder.supply.name}>Chế độ ăn trườnasdasdasdasdasdasdasdasdasdasdaasdasg thọ</Box>
                                </Tooltip>
                                <Box>SL : 1</Box>
                            </Box>
                        </Box>
                        <Box>25.000 vnd</Box>
                    </Box>
                    <Box sx={style.supplyContainer.supplyBox.supplyHolder}>
                        <Box sx={style.supplyContainer.supplyBox.supplyHolder.supply}>
                            <Box sx={style.supplyContainer.supplyBox.supplyHolder.supply.image}>
                                <img src={Book}></img>
                            </Box>
                            <Box sx={style.supplyContainer.supplyBox.supplyHolder.supply.info} >
                                <Tooltip title="Chế độ ăn trườnasdasdasdasdasdasdasdasdasdasdaasdasg thọ">
                                    <Box sx={style.supplyContainer.supplyBox.supplyHolder.supply.name}>Chế độ ăn trườnasdasdasdasdasdasdasdasdasdasdaasdasg thọ</Box>
                                </Tooltip>
                                <Box>SL : 1</Box>
                            </Box>
                        </Box>
                        <Box>25.000 vnd</Box>
                    </Box>
                </Box>
            </Box>
            <Box sx={style.voucher}>
                <Box>Shop khuyến mãi</Box>
                <Box sx={style.voucher.chooseVoucher} >Nhập hoặc chọn mã <IoIosArrowForward /></Box>
            </Box>
            <Typography fontWeight={500} >Chọn hình thức thanh toán</Typography>
            <RadioGroup defaultValue="save" >
                <Box sx={style.paymentType}>
                    <Box sx={style.paymentType.payment}>
                        <Radio size='small' value="fast" />
                        <Box sx={style.paymentType.payment.name} >
                            <MdOutlinePayments
                                style={{
                                    color: "#009800",
                                    fontSize: "x-large",
                                    marginRight: "7px"
                                }}
                            />
                            Thanh toán khi nhận hàng
                        </Box>
                    </Box>
                    <Box sx={style.paymentType.payment}>
                        <Radio size='small' value="save" />
                        <Box sx={style.paymentType.payment.name} >
                            <MdPayment
                                style={{
                                    color: "#000000",
                                    fontSize: "x-large",
                                    marginRight: "7px"
                                }}
                            />
                            Thanh toán qua thẻ ngân hàng
                        </Box>
                    </Box>
                </Box>
            </RadioGroup>
        </Box>
    )
}

/** @type {import("@mui/material").SxProps} */
const style = {
    paymentContainer: {
        padding: "20px",
        width: "100%"
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
            mb:1,
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
            mb:1,
            name: {
                display: "flex",
                alignItems: "center"
            }
        }
    },

}
export default Payment