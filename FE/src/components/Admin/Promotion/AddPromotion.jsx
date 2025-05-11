import { Box, FormControl, FormHelperText, FormLabel, IconButton, Input, Select, MenuItem, InputLabel, FormGroup, Grid, TextField, NativeSelect, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import NotesOutlinedIcon from '@mui/icons-material/NotesOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import PercentOutlinedIcon from '@mui/icons-material/PercentOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import BasicDatePicker from '../BasicDatePicker';
import DragDropImage from '../DragDropImage';
import AddProductToPromotion from './AddProductToPromotion';
import { useDispatch, useSelector } from 'react-redux';
import promotionSlice, { getPromtionById } from '../../../redux/reducer/PromotionSlice';
import { fetchProduct } from '../../../redux/reducer/ProductSlice';
const AddPromotion = ({ setDisplayAddPromotion }) => {
    const dispatch = useDispatch()
    const [addProductToPromotion, setAddProductToPromotion] = useState(false)
    const [addImages, setAddImages] = useState([])
    const [currentSetPromotion, setCurrentSetPromotion] = useState({})
    const currentPromotion = useSelector((state) => state.promotion.currentSetPromotion)
    const imgProductUrl = '/static/images/promotion/'
    useEffect(() => {
        setCurrentSetPromotion(currentPromotion)
        dispatch(fetchProduct({brandId:"",categoryId:"",key:""}))
        console.log(currentPromotion)
    }, [dispatch, currentPromotion])
    const handleCloseAddPromotion = () => {
        dispatch(getPromtionById(-1))
        setDisplayAddPromotion(false)
    }
    const handleFowardToAddProductToPromotion = () => {
        setAddProductToPromotion(!addProductToPromotion)
        let dataTmp = {...currentSetPromotion}
        console.log(addImages[0].name)
        if(addImages[0]!==undefined) {
            dataTmp= {
            ...currentSetPromotion,
            pathImage: imgProductUrl + addImages[0].name
        }}
        dispatch(promotionSlice.actions.saveTmp(dataTmp))
    }
    const handleOnChangeProperties = (field, value) => {
        setCurrentSetPromotion((prev) => ({
            ...prev,
            [field]: value,
        }));
    };
    return (
        <Box sx={style.coverer}>
            <Box sx={style.addUserModal}>
                {!addProductToPromotion && <Box>
                    <Box style={{ display: 'flex', justifyContent: "flex-end" }}>
                        <IconButton
                            onClick={handleCloseAddPromotion}
                        >
                            <CancelOutlinedIcon color='error' />
                        </IconButton>
                    </Box>
                    <form>
                        <Grid sx={style.form} container rowSpacing={2} columnSpacing={2}>
                            <Grid item xs={12} sm={12} md={12} sx={style.inputContainer}>
                                <FormControl fullWidth={true} >
                                    <FormLabel sx={style.formLabel}>
                                        <ImageOutlinedIcon sx={style.formLabel.formLabelIcon} />
                                        <Box>Ảnh khuyến mãi</Box>
                                    </FormLabel>
                                    <DragDropImage setAddImages={setAddImages} initImages={currentSetPromotion.pathImage} />
                                    <FormHelperText></FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} sx={style.inputContainer}>
                                <FormControl fullWidth={true} >
                                    <FormLabel sx={style.formLabel}>
                                        <MonetizationOnOutlinedIcon sx={style.formLabel.formLabelIcon} />
                                        <Box>Nội dung khuyến mãi</Box>
                                    </FormLabel>
                                    <TextareaAutosize value={currentSetPromotion.name}
                                        style={{ border: "1px solid gray" }}
                                        minRows={7}
                                        maxRows={15}
                                        onResize={() => { console.log(1) }}
                                        onChange={(e) => { handleOnChangeProperties("name", e.target.value) }}
                                    />
                                    <FormHelperText></FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3} sx={style.inputContainer} >
                                <FormControl fullWidth={true}>
                                    <FormLabel sx={style.formLabel} >
                                        <EventOutlinedIcon sx={style.formLabel.formLabelIcon} />
                                        <Box>Ngày bắt đầu</Box>
                                    </FormLabel>
                                    <BasicDatePicker value={currentSetPromotion.dateStart}
                                        onChangeFunction={handleOnChangeProperties} field="dateStart"
                                    />
                                    <FormHelperText></FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3} sx={style.inputContainer} >
                                <FormControl fullWidth={true}>
                                    <FormLabel sx={style.formLabel} >
                                        <EventOutlinedIcon sx={style.formLabel.formLabelIcon} />
                                        <Box>Ngày kết thúc</Box>
                                    </FormLabel>
                                    <BasicDatePicker value={currentSetPromotion.dateEnd}
                                        onChangeFunction={handleOnChangeProperties} field="dateEnd"
                                    />
                                    <FormHelperText></FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} sx={style.inputContainer}>
                                <FormControl fullWidth={true} >
                                    <FormLabel sx={style.formLabel} >
                                        <PercentOutlinedIcon sx={style.formLabel.formLabelIcon} />
                                        <Box>Chiết khấu (%)</Box>
                                    </FormLabel>
                                    <TextField fullWidth={true} variant='outlined'
                                        value={currentSetPromotion.discount}
                                        onChange={(e) => { handleOnChangeProperties("discount", e.target.value) }}
                                    />
                                    <FormHelperText></FormHelperText>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </form>
                    <Box style={{ display: 'flex', justifyContent: "flex-end" }}>
                        <Button variant='contained' color='info'
                            onClick={handleFowardToAddProductToPromotion}
                        >Next</Button>
                    </Box>
                </Box>}
                {
                    addProductToPromotion && <AddProductToPromotion setAddProductToPromotion={setAddProductToPromotion} setDisplayAddPromotion={setDisplayAddPromotion} currentSetPromotion={currentSetPromotion} />
                }
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
        width: "75%",
        position: 'absolute',
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        boxShadow: 5,
        padding: '10px',
        maxHeight: "80%",
        overflowY: "auto",
        height: "80%"
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
export default AddPromotion