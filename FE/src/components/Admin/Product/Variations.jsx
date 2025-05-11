import { Box, FormControl, FormHelperText, FormLabel, Grid, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import productSlice from '../../../redux/reducer/ProductSlice'
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import ApiOutlinedIcon from '@mui/icons-material/ApiOutlined';
export const Variations = ({ variations }) => {
    const dispatch = useDispatch()
    const variationsObjArr = useSelector((state) => state.product.variationsObjArr)
    const getVariationValue = (id) => {
        const result = variationsObjArr.find((item) => item.id === id)
        if (result) return result.variationOptionValue
        return ""
    }
    const handleOnChangeVariations = (id, variationOptionValue) => {
        dispatch(productSlice.actions.changeVariationArr({ id, variationOptionValue }))
    }
    return (
        <React.Fragment>
            <Grid item xs={12} sm={12} md={12} sx={style.inputContainer}>
                <Box sx={style.formLabel}>
                    <ApiOutlinedIcon sx={style.formLabel.formLabelIcon} />
                    <Box sx={{fontSize:"large"}}>Các thuộc tính chung</Box>
                </Box>
            </Grid>
            {variations.map((variation, index) => {
                if(variation.important==0)
                return (
                    <Grid key={variation.id} item xs={12} sm={6} md={6} sx={style.inputContainer}>
                        <FormControl fullWidth={true} >
                            <FormLabel sx={style.formLabel} >
                                <Box>{variation.nameVie}</Box>
                            </FormLabel>
                            <TextField fullWidth={true} variant='outlined'
                                value={getVariationValue(variation.id)}
                                onChange={(e) => {
                                    handleOnChangeVariations(variation.id, e.target.value)
                                }} />
                            <FormHelperText></FormHelperText>
                        </FormControl>
                    </Grid>
                )
            })}
            <Grid item xs={12} sm={12} md={12} sx={style.inputContainer}>
                <Box sx={style.formLabel}>
                    <GradeOutlinedIcon sx={style.formLabel.formLabelIcon} />
                    <Box sx={{fontSize:"large"}}>Các thuộc tính riêng</Box>
                </Box>
            </Grid>
            {variations.map((variation, index) => {
                if(variation.important===1)
                return (
                    <Grid key={variation.id} item xs={12} sm={6} md={6} sx={style.inputContainer}>
                        <FormControl fullWidth={true} >
                            <FormLabel sx={style.formLabel} >
                                <Box>{variation.nameVie}</Box>
                            </FormLabel>
                            <TextField fullWidth={true} variant='outlined'
                                value={getVariationValue(variation.id)}
                                onChange={(e) => {
                                    handleOnChangeVariations(variation.id, e.target.value)
                                }} />
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
