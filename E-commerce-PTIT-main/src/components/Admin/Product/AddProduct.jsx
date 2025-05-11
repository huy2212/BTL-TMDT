import { Box, FormControl, FormHelperText, FormLabel, IconButton, Input, Select, MenuItem, InputLabel, FormGroup, Grid, TextField, NativeSelect, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import NotesOutlinedIcon from '@mui/icons-material/NotesOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined';
import DragDropImage from '../DragDropImage';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, editProduct, fetchBrand, getProdcutById, getProductById, getVariationByCategory } from '../../../redux/reducer/ProductSlice';
import { Variations } from './Variations';

const AddProduct = ({ setDisplayAddProduct }) => {
    const dispatch = useDispatch()
    const [currentSetProduct, setCurrentSetProduct] = useState(null)
    const [category, setCategory] = useState(1)
    const [brand, setBrand] = useState(1)
    const [addImages, setAddImages] = useState([])
    const imgProductUrl = '/static/images/product/'
    const categories = useSelector((state) => state.category.categories)
    const currentProduct = useSelector((state) => state.product.currentSetProduct)
    const variations = useSelector((state) => state.product.variations)
    const variationsObjArr = useSelector((state) => state.product.variationsObjArr)
    const [productName, setProductName] = useState("")
    const [description, setDesciption] = useState("")
    useEffect(() => {
        if (currentProduct !== undefined) {
            dispatch(fetchBrand)
            setCurrentSetProduct(currentProduct)
            setCategory(currentProduct.category.id)
            if (currentProduct.brand) setBrand(currentProduct.brand.id)
            setProductName(currentProduct.name)
            console.log(currentProduct)
            setDesciption(currentProduct.description)
            currentProduct.productId !== -1 ? setAddImages(currentProduct.images) : setAddImages(currentProduct.product.images)
        }
    }, [dispatch, currentProduct])
    const brands = useSelector((state) => state.product.brand)
    useEffect(() => {
        dispatch(fetchBrand())
    }, [])
    useEffect(() => {
        dispatch(getVariationByCategory(category))
    }, [category])
    const handleCloseAddProduct = () => {
        setDisplayAddProduct(false)
        dispatch(getProductById(-1))
    }
    const handleChangeCategory = (e) => {
        setCategory(e.target.value)
    }
    const handleChangeBrand = (e) => {
        setBrand(e.target.value)
        handleOnChangeProperties("brand", e.target.value)
    }
    const handleOnChangeProperties = (field, value) => {
        setCurrentSetProduct((prev) => ({
            ...prev,
            product: {
                ...prev.product,
                [field]: value
            }
        }));
    };
    const handleImageData = (categoryId) => {
        let category = categoryId == 1 ? "laptop/" : categoryId == 2 ? "dienthoai/" : "phukien/"
        let prePath = imgProductUrl + category
        let productImages = []

        addImages.map((img) => {
            if (img.id === undefined) productImages.push({
                "id": null,
                "path": prePath + img.name
            })
            else {
                productImages.push({
                    "id": img.id,
                    "path": img.url
                })
            }
        })
        return productImages
    }


    const handleSaveProduct = () => {
        let product = currentSetProduct
        let newProduct = {}
        if (currentSetProduct.productId === -1) {
            newProduct = {
                category: {
                    id: category,
                    variations: variationsObjArr
                },
                product: {
                    ...product.product,
                    name: productName,
                    images: handleImageData(category),
                    description: description
                }
            }
        }
        else {
            newProduct = {
                ...currentSetProduct,
                name: productName,
                images: handleImageData(category),
                description: description,
                id: currentSetProduct.productId
            }
        }
        console.log(newProduct)
        if (currentSetProduct.productId === -1) dispatch(addProduct({ newProduct: newProduct, brandId: brand }))
        else dispatch(editProduct({ newProduct, brand }))
        handleCloseAddProduct()
    }
    return (
        <div>
            <Box sx={style.coverer}>
                <Box sx={style.addUserModal}>
                    <Box style={{ display: 'flex', justifyContent: "flex-end" }}>
                        <IconButton
                            onClick={handleCloseAddProduct}
                        >
                            <CancelOutlinedIcon color='error' />
                        </IconButton>
                    </Box>
                    <form>
                        <Grid sx={style.form} container rowSpacing={2} columnSpacing={2}>
                            {/* Ảnh sản phẩm  */}
                            <Grid item xs={12} sm={12} md={12} sx={style.inputContainer}>
                                <FormControl fullWidth={true} >
                                    <FormLabel sx={style.formLabel}>
                                        <ImageOutlinedIcon sx={style.formLabel.formLabelIcon} />
                                        <Box>Ảnh sản phẩm</Box>
                                    </FormLabel>
                                    <DragDropImage setAddImages={setAddImages} initImages={currentSetProduct === null ? [] : currentSetProduct.images} />
                                    <FormHelperText></FormHelperText>
                                </FormControl>
                            </Grid>
                            {/* Tên sản phẩm  */}
                            <Grid item xs={12} sm={12} md={12} sx={style.inputContainer}>
                                <FormControl fullWidth={true} >
                                    <FormLabel sx={style.formLabel}>
                                        <Inventory2OutlinedIcon sx={style.formLabel.formLabelIcon} />
                                        <Box>Tên sản phẩm</Box>
                                    </FormLabel>
                                    <TextField fullWidth={true} variant='outlined'
                                        value={productName}
                                        onChange={(e) => {
                                            setProductName(e.target.value)
                                        }}
                                    />
                                    <FormHelperText></FormHelperText>
                                </FormControl>
                            </Grid>
                            {/* Danh mục sản phẩm  */}
                            <Grid item xs={12} sm={12} md={6} sx={style.inputContainer} >
                                <FormControl fullWidth={true}>
                                    <FormLabel sx={style.formLabel} >
                                        <CategoryOutlinedIcon sx={style.formLabel.formLabelIcon} />
                                        <Box>Danh mục</Box>
                                    </FormLabel>
                                    <Select
                                        sx={style.select}
                                        value={category}
                                        disabled={currentSetProduct && currentSetProduct.productId !== -1}
                                        onChange={handleChangeCategory}
                                    >
                                        {
                                            categories.map((category) => {
                                                return <MenuItem key={category.id} value={category.id} >{category.name}</MenuItem>

                                            })
                                        }
                                    </Select>
                                    <FormHelperText></FormHelperText>
                                </FormControl>
                            </Grid>
                            {/* Hãng sản xuất */}
                            <Grid item xs={12} sm={12} md={6} sx={style.inputContainer} >
                                <FormControl fullWidth={true}>
                                    <FormLabel sx={style.formLabel} >
                                        <WarehouseOutlinedIcon sx={style.formLabel.formLabelIcon} />
                                        <Box>Hãng sản xuất</Box>
                                    </FormLabel>
                                    <Select
                                        sx={style.select}
                                        disabled={currentSetProduct && currentSetProduct.productId !== -1}
                                        value={brand}
                                        onChange={handleChangeBrand}
                                    >
                                        {
                                            brands.map((brand) => {
                                                return <MenuItem key={brand.id} value={brand.id} >{brand.name}</MenuItem>
                                            })
                                        }
                                    </Select>
                                    <FormHelperText></FormHelperText>
                                </FormControl>
                            </Grid>
                            {/* Các thuộc tính */}
                            {
                                (currentSetProduct && currentSetProduct.productId == -1) && <Variations variations={variations} />
                            }
                            <Grid item xs={12} sm={12} md={12} sx={style.inputContainer}>
                                <FormControl fullWidth={true} >
                                    <FormLabel sx={style.formLabel} >
                                        <NotesOutlinedIcon sx={style.formLabel.formLabelIcon} />
                                        <Box>Mô tả sản phẩm</Box>
                                    </FormLabel>
                                    <TextareaAutosize value={description}
                                        style={{ border: "1px solid gray" }}
                                        minRows={10}
                                        maxRows={20}
                                        onChange={(e) => {
                                            setDesciption(e.target.value)
                                        }}
                                    />
                                    <FormHelperText></FormHelperText>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </form>
                    <Box style={{ display: 'flex', justifyContent: "flex-end" }}>
                        <Button onClick={() => handleSaveProduct()} variant='contained' color='success'>Save</Button>
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
export default AddProduct