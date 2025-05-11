import { Box, Tooltip } from '@mui/material'
import React from 'react'
import { formatCurrency } from '../../basicFunction'

export const CheckoutItemsDetails = (props) => {
    const {item}= props

    const renderName = (name) => {
        let attrString = ""
        item.details.map((attr)=>{
            if(attr.important) attrString+=`/ ${attr.value} ` 
        })
        attrString= attrString.substring(1,attrString.length)
        return `${name} ( ${attrString} )`
    }
    return (
        <Box sx={style.supplyContainer.supplyBox.supplyHolder}>
            <Box sx={style.supplyContainer.supplyBox.supplyHolder.supply}>
                <Box sx={style.supplyContainer.supplyBox.supplyHolder.supply.image}>
                    <img src={item.image}></img>
                </Box>
                <Box sx={style.supplyContainer.supplyBox.supplyHolder.supply.info} >
                    <Tooltip title={renderName(item.name)}>
                        <Box sx={style.supplyContainer.supplyBox.supplyHolder.supply.name}>{renderName(item.name)}</Box>
                    </Tooltip>
                    <Box>SL : {item.quantity}</Box>
                </Box>
            </Box>
            <Box>{formatCurrency(item.quantity * item.price)}</Box>
        </Box>
    )
}
const style = {
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
    }
}
