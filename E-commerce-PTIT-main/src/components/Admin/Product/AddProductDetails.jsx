import { Box, FormControl, FormHelperText, FormLabel, IconButton, Input, Select, MenuItem, InputLabel, FormGroup, Grid, TextField, NativeSelect, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import LaptopWindowsOutlinedIcon from '@mui/icons-material/LaptopWindowsOutlined';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';

import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';

import { useDispatch, useSelector } from 'react-redux';
import { addProductDetails, editProductDetails, getProductDetailsById, getVariationByCategory } from '../../../redux/reducer/ProductSlice';
import { Variations } from './Variations';
import { VariationsOption } from './VariationsOption';
import { AddVariations } from './AddVariations';


const AddProductDetails = ({ itemDetails, setDisplayAddProduct, category, productId }) => {
    const dispatch = useDispatch()
    const variations = useSelector(state => state.product.variations)
    const variationsObjArr = useSelector((state) => state.product.variationsObjArr)
    const [variationsOptions, setVariationOptions] = useState(itemDetails)

    useEffect(() => {
        dispatch(getVariationByCategory(category))
    }, [category])

    const handleCloseAddProductDetails = () => {
        setDisplayAddProduct(false)
    }

    const handleSaveProductDetails = () => {
        if (itemDetails.length === 0) {
            const variations = variationsObjArr.filter((item) => item.variationOptionValue!=='')
            let newDetails = {
                variations: variations
            }
            dispatch(addProductDetails({ variationsOption: newDetails, productId: productId }))
        }
        else {
            let newDetails = {
                variationOptions: variationsOptions
            }
            dispatch(editProductDetails({newProductDetails:newDetails,productId:productId}))
        }
        handleCloseAddProductDetails()

    }


    return (
        <div>
            <Box sx={style.coverer}>
                <Box sx={style.addUserModal}>
                    <Box style={{ display: 'flex', justifyContent: "flex-end" }}>
                        <IconButton
                            onClick={handleCloseAddProductDetails}
                        >
                            <CancelOutlinedIcon color='error' />
                        </IconButton>
                    </Box>
                    <Typography variant='h5' ml={5}>Loại sản phẩm</Typography>
                    <form>
                        <Grid sx={style.form} container rowSpacing={2} columnSpacing={2}>
                            {itemDetails.length === 0 ?
                                (<AddVariations variations={variations} />) : (<VariationsOption variationsOption={variationsOptions} setVariationOptions={setVariationOptions} />)
                            }
                        </Grid>
                    </form>
                    <Box style={{ display: 'flex', justifyContent: "flex-end" }}>
                        <Button
                            onClick={() => handleSaveProductDetails()}

                            variant='contained' color='success'>Save</Button>
                    </Box>
                </Box>
            </Box>
        </div>
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
        width: "80%",
        position: 'absolute',
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        boxShadow: 5,
        padding: '10px',
        maxHeight: "80%",
        overflowY: "auto"
    },
    form: {
        padding: 4
    },
    inputsContainer: {
        display: 'flex',
        width: "100%",
        justifyContent: "space-evenly"
    },
    inputContainer: {
        display: "flex",
        alignItems: "end"
    },
    select: {
        // marginTop:"8px"
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
export default AddProductDetails