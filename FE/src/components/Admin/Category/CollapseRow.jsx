import { IconButton, TableCell, TableRow, Typography, TableBody, TableHead, Table, Box, Collapse, Button } from '@mui/material'
import React, { useState } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useDispatch } from 'react-redux';
import { Confirm } from '../Confirm';
import AddVariation from './AddVariation';
import categorySlice, { deleteCategory, getCategoryById, removeVariation } from '../../../redux/reducer/CategorySlice';
const CollapseRow = (props) => {
    const dispatch = useDispatch()
    const { row, category, variations, setDisplayAddCategory } = props
    const [open, setOpen] = useState(false)
    const [displayAddVariation, setDisplayAddVariation] = useState(false)
    const [deleteCategoryId, setDeleteCategoryId] = useState(0)
    const [openConfirmCategory, setOpenConfirmCategory] = useState(false)
    const [deleteVariation, setDeleteVariation] = useState(0)
    const [openConfirmVariation, setOpenConfirmVariation] = useState(false)
    const handleOpenEditCategory= (id) => {
        dispatch(getCategoryById(id))
        setDisplayAddCategory(true)
    }

    const handleDeleteCategory = (id) => {
        setDeleteCategoryId(id)
        setOpenConfirmCategory(true)
    }


    const doDeleteCategory = (id) => {
        dispatch(deleteCategory(id))
        setOpenConfirmCategory(false)
        setDeleteCategoryId(0)
    }
    const handleOpenEditVariation = (id) => {
        dispatch(categorySlice.actions.getVariationById({id,category}))
        setDisplayAddVariation(true)
    }

    const handleOpenAddVariation = () => {
        dispatch(categorySlice.actions.getVariationById({id:null,category}))
        setDisplayAddVariation(true)
    }

    const handleDeleteVariation = (id) => {
        setDeleteVariation(id)
        setOpenConfirmVariation(true)
    }

    const doDeleteVariation = (id) => {
        console.log({ variationId:id, category:category })
        dispatch(removeVariation({ variationId:id, category:category }))
        setOpenConfirmVariation(false)
        setDeleteVariation(0)

    }


    return (
        <React.Fragment>
            <TableRow>
                <TableCell>
                    <IconButton
                        aria-label='expand row'
                        size='small'
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope='row' align='center'>{row.id}</TableCell>
                <TableCell align='left'>{row.name}</TableCell>
                <TableCell align='center'>{row.code}</TableCell>
                <TableCell align='center'>{row.description}</TableCell>
                <TableCell align='center'>
                    <IconButton
                        onClick={() => handleOpenEditCategory(row.id)}
                    >
                        <BorderColorOutlinedIcon color='info' />
                    </IconButton>
                    <IconButton
                        onClick={() => handleDeleteCategory(row.id)}
                    >
                        <DeleteOutlinedIcon color='error' />
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={2}>
                            <Box sx={{
                                justifyContent: (variations&&variations.length!==0) ? "space-between" : "normal",
                                display: (variations&&variations.length!==0) ? "flex" : "block",

                            }}>
                                {variations && <Typography variant="h6" gutterBottom component="div">
                                    Thuộc tính
                                </Typography>}
                                {!(variations&&variations.length!==0) && <Box sx={{ textAlign: "center", mb: 1 }}>Chưa có thuộc tính vui lòng thêm mới</Box>}
                                <Box
                                    sx={{
                                        display: "flex", justifyContent: "center"
                                    }}
                                >
                                    <Button onClick={() => handleOpenAddVariation()} variant='outlined' color="error" size='small' >Thêm thuộc tính</Button>
                                </Box>
                            </Box>
                            { (variations&&variations.length!==0) && <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align='center'>Tên thuộc tính</TableCell>
                                        <TableCell align='center'>Mã thuộc tính</TableCell>
                                        <TableCell align='center'>Tác vụ</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody width="100">
                                    {variations.map((items) => (
                                        <TableRow key={items.id} >
                                            <TableCell align='center' >{items.nameVie}</TableCell>
                                            <TableCell align='center'>{items.name}</TableCell>
                                            <TableCell align='center'>
                                                <IconButton
                                                    onClick={() => handleOpenEditVariation(items.id)}
                                                >
                                                    <BorderColorOutlinedIcon color='info' />
                                                </IconButton>
                                                <IconButton
                                                    onClick={() => handleDeleteVariation(items.id)}
                                                >
                                                    <DeleteOutlinedIcon color='error' />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
            {displayAddVariation && <AddVariation setDisplayAddVariation={setDisplayAddVariation} category={category} />}
            {openConfirmCategory && <Confirm name="CATEGORY" noAction={() => setOpenConfirmCategory(false)} yesAction={() => doDeleteCategory(deleteCategoryId)} />}
            {openConfirmVariation && <Confirm name="VARIATION" noAction={() => setOpenConfirmVariation(false)} yesAction={() => doDeleteVariation(deleteVariation)} />}

        </React.Fragment >
    )
}

export default CollapseRow