import { Box, FormControl, FormHelperText, FormLabel, Grid, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import productSlice from '../../../redux/reducer/ProductSlice'
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import ApiOutlinedIcon from '@mui/icons-material/ApiOutlined';
export const VariationsOption = ({ variationsOption,setVariationOptions }) => {
    const dispatch = useDispatch()
    // const variationsObjArr = useSelector((state) => state.product.variationsObjArr)
    const getVariationValue = (id) => {
        const result = variationsOption.find((item) => item.id_variation_option === id)
        if (result) return result.value
        return ""
    }
    const handleOnChangeVariations= (id,value)=>{
        let result = variationsOption.map((item)=>{
            if(item.id_variation_option === id){
                return {
                    ...item,
                    value: value
                }
            }
            return item
        })
        setVariationOptions(result)
    }
    return (
        <React.Fragment>
            <Grid item xs={12} sm={12} md={12} sx={style.inputContainer}>
                <Box sx={style.formLabel}>
                    <ApiOutlinedIcon sx={style.formLabel.formLabelIcon} />
                    <Box sx={{ fontSize: "large" }}>Các thuộc tính chung</Box>
                </Box>
            </Grid>
            {variationsOption.map((option, index) => {
                if (option.important === 0)
                    return (
                        <Grid key={option.id_variation_option} item xs={12} sm={6} md={6} sx={style.inputContainer}>
                            <FormControl fullWidth={true} >
                                <FormLabel sx={style.formLabel} >
                                    <Box>{option.name}</Box>
                                </FormLabel>
                                <TextField fullWidth={true} variant='outlined'
                                    value={getVariationValue(option.id_variation_option)}
                                    onChange={(e) => {
                                        handleOnChangeVariations(option.id_variation_option, e.target.value)
                                    }} 
                                    />
                                <FormHelperText></FormHelperText>
                            </FormControl>
                        </Grid>
                    )
            })}
            <Grid item xs={12} sm={12} md={12} sx={style.inputContainer}>
                <Box sx={style.formLabel}>
                    <GradeOutlinedIcon sx={style.formLabel.formLabelIcon} />
                    <Box sx={{ fontSize: "large" }}>Các thuộc tính riêng</Box>
                </Box>
            </Grid>
            {variationsOption.map((option, index) => {
                if (option.important === 1)
                    return (
                        <Grid key={option.id_variation_option} item xs={12} sm={6} md={6} sx={style.inputContainer}>
                            <FormControl fullWidth={true} >
                                <FormLabel sx={style.formLabel} >
                                    <Box>{option.name}</Box>
                                </FormLabel>
                                <TextField fullWidth={true} variant='outlined'
                                    value={getVariationValue(option.id_variation_option)}
                                    onChange={(e) => {
                                        handleOnChangeVariations(option.id_variation_option, e.target.value)
                                    }} 
                                    />
                                <FormHelperText></FormHelperText>
                            </FormControl>
                        </Grid>
                    )
            })}
        </React.Fragment>
    )
}
/** @type {import("@mui/material").SxProps} */
const style = {
    inputContainer: {
        display: "flex",
        alignItems: "end"
    },

    formLabel: {
        display: "flex",
        alignItems: "center",
        marginBottom: "8px",
        formLabelIcon: {
            marginRight: '5px',
            marginBottom: '5px'
        }
    }
}
