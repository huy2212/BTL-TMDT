import { Box, Button, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useDispatch, useSelector } from 'react-redux';
import AddSupplier from '../../components/Admin/Supplier/AddSupplier';
import supplierSlice, { deleteSupplier, fetchSupplier, getSupplierById } from '../../redux/reducer/SupplierSlice';
import { notify } from '../../components/Admin/notify';
import { Confirm } from '../../components/Admin/Confirm';
function Supplier() {
    const dispatch = useDispatch()
    const [displayAddSupplier, setDisplayAddSupplier] = useState(false)
    const [deleteId, setDeleteId] = useState(0)
    const [openConfirm, setOpenConfirm] = useState(false)
    var suppliers = useSelector((state) => state.supplier.suppliers)
    var message = useSelector((state) => state.supplier.alert)
    useEffect(() => {
        if (message !== undefined) notify(message.message, message.code)
        return () => {
            dispatch(supplierSlice.actions.resetAlert(undefined))
        }
    }, [message, dispatch])
    const [supplierList, setSupplierList] = useState([])
    useEffect(() => {
        dispatch(fetchSupplier())
    }, [dispatch])
    useEffect(() => {
        setSupplierList(suppliers)
    }, [suppliers])
    const columns = [
        {
            field: 'supplierName',
            headerName: 'Tên nhà cung cấp',
            minWidth: '300',
            hideable: false

        },
        {
            field: 'description',
            headerName: "Mã mô tả",
            minWidth: '600'
        },
        {
            field: 'phoneNumber',
            headerName: "Số điện thoại",
            minWidth: '300'
        },
        {
            field: 'action',
            headerName: 'Tác vụ',
            minWidth: '150',
            sortable: false,
            headerAlign: 'center',
            renderCell: (params) => {
                return <Box >
                    <IconButton size="medium" sx={{ m: 1 }} onClick={() => { handleOpenDisplayAddSupplier(params.row.id) }} >
                        <ModeEditIcon />
                    </IconButton>
                    <IconButton size="medium" sx={{ m: 1 }}
                        onClick={() => handleDeleteSupplier(params.row.id)}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Box>
            }
        }

    ]
    const supplierRows = supplierList.map((supplier) => {
        return {
            id: supplier.id,
            supplierName: supplier.name,
            description: supplier.description,
            phoneNumber: supplier.phoneNumber,
        };
    });
    const handleOpenDisplayAddSupplier = (id) => {
        dispatch(getSupplierById(id));
        setDisplayAddSupplier(true);
    };
    const handleDeleteSupplier = (id) => {
        setDeleteId(id)
        setOpenConfirm(true)
    }
    const doDelete = (id) => {
        dispatch(deleteSupplier(id))
        setOpenConfirm(false)
        setDeleteId(0)
    }
    return (
        <div>
            <Box>
                <Typography sx={style.pageTitle} variant='h5'>Quản lý nhà cung cấp</Typography>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Box>
                        <Button variant='contained' onClick={() => { handleOpenDisplayAddSupplier(-1) }}>
                            <AddBoxOutlinedIcon fontSize='small' />
                            <Box ml={1}>Thêm nhà cung cấp</Box>
                        </Button>
                    </Box>
                    <DataGrid
                        sx={{ boxShadow: 2, mt: 2 }}
                        columns={columns}
                        rows={supplierRows}
                        slots={{
                            toolbar: GridToolbar,
                        }}
                        initialState={{
                            pagination: { paginationModel: { pageSize: 5 } }
                        }}
                        pageSizeOptions={[5, 10, 25]}
                    ></DataGrid>
                </Box>
            </Box>
            {displayAddSupplier && <AddSupplier setDisplayAddSupplier={setDisplayAddSupplier} />}
            {openConfirm && <Confirm name="SUPPLIER" noAction={() => setOpenConfirm(false)} yesAction={() => doDelete(deleteId)} />}
        </div>
    )
}
/** @type {import("@mui/material").SxProps} */
const style = {
    pageTitle: {
        mb: 2
    }
}
export default Supplier