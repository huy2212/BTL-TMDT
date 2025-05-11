import { Box, FormControl, FormHelperText, FormLabel, IconButton, Input, Select, MenuItem, InputLabel, FormGroup, Grid, TextField, NativeSelect, Button, Typography, FormControlLabel, Checkbox } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { addVariation, editVariation } from '../../../redux/reducer/CategorySlice';


const AddVariation = ({ setDisplayAddVariation, category }) => {
    const dispatch = useDispatch()
    const [currentSetVariation, setCurrentSetVariation] = useState({})
    const [important,setImportant] = useState(false)
    var variation = useSelector((state) => state.category.currentSetVariation)
    useEffect(() => {
        setCurrentSetVariation(variation)
        setImportant(variation.important===1?true:false)
    }, [dispatch, variation])

    const handleCloseAddVariation = () => {
        setDisplayAddVariation(false)
    }
    const handleOnChangeProperties = (field, value) => {
        setCurrentSetVariation((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSaveProductDetails = () => {
        let newVariation = {
            categoryId: category,
            variation: {
                ...currentSetVariation,
                important:important===true?1:0
            }
        }
        if (currentSetVariation.id === null) dispatch(addVariation(newVariation))
        else dispatch(editVariation(newVariation))
        handleCloseAddVariation()

    }


    return (
        <div>
            <Box sx={style.coverer}>
                <Box sx={style.addUserModal}>
                    <Box style={{ display: 'flex', justifyContent: "flex-end" }}>
                        <IconButton
                            onClick={handleCloseAddVariation}
                        >
                            <CancelOutlinedIcon color='error' />
                        </IconButton>
                    </Box>
                    <Typography variant='h5' ml={5}>Thuộc tính</Typography>
                    <form>
                        <Grid sx={style.form} container rowSpacing={2} columnSpacing={2}>
                            <Grid item xs={12} sm={12} md={12} >
                                <FormControl fullWidth={true} >
                                    <FormControlLabel control={<Checkbox checked={important} onChange={()=> setImportant(!important)} />} label="Tick nếu là thuộc tính riêng" />
                                </FormControl>
                            </Grid>
                            {/* Tên thuộc tính  */}
                            <Grid item xs={12} sm={6} md={9} sx={style.inputContainer}>
                                <FormControl fullWidth={true} >
                                    <FormLabel sx={style.formLabel} >
                                        <TuneOutlinedIcon sx={style.formLabel.formLabelIcon} />
                                        <Box>Tên thuộc tính</Box>
                                    </FormLabel>
                                    <TextField
                                        value={currentSetVariation.nameVie}
                                        onChange={(e) => handleOnChangeProperties("nameVie", e.target.value)}
                                        fullWidth={true} variant='outlined'
                                    />
                                    <FormHelperText></FormHelperText>
                                </FormControl>
                            </Grid>
                            {/* Mã thuộc tính  */}
                            <Grid item xs={12} sm={6} md={3} sx={style.inputContainer}>
                                <FormControl fullWidth={true} >
                                    <FormLabel sx={style.formLabel} >
                                        <TuneOutlinedIcon sx={style.formLabel.formLabelIcon} />
                                        <Box>Mã thuộc tính</Box>
                                    </FormLabel>
                                    <TextField
                                        value={currentSetVariation.name}
                                        onChange={(e) => handleOnChangeProperties("name", e.target.value)}
                                        fullWidth={true} variant='outlined'
                                    />
                                    <FormHelperText></FormHelperText>
                                </FormControl>
                            </Grid>

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
export default AddVariation