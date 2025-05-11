import { Box, Button, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AddVoucher from '../../components/Admin/Voucher/AddVoucher';
import { useDispatch, useSelector } from 'react-redux';
import voucherSlice, { deleteVoucher, fetchVoucherForAdmin, fetchVoucherForUser, getVoucherById } from '../../redux/reducer/VoucherSlice';
import { notify } from '../../components/Admin/notify';
import { Confirm } from '../../components/Admin/Confirm';
const Voucher = () => {
  const dispatch = useDispatch()
  const [displayAddVoucher, setDisplayAddVoucher] = useState(false)
  const [voucherList, setVoucherList] = useState([])
  const [openConfirm, setOpenConfirm] = useState(false)
  const [deleteId, setDeleteId] = useState(0)
  var vouchers = useSelector((state) => state.voucher.vouchers)
  useEffect(() => {
    dispatch(fetchVoucherForAdmin())
  }, [dispatch])
  useEffect(() => {
    console.log(vouchers)
    setVoucherList(vouchers)
  }, [vouchers])
  var message = useSelector((state) => state.voucher.alert)
  useEffect(() => {
    if (message !== undefined) notify(message.message, message.code)
    return () => {
      dispatch(voucherSlice.actions.resetAlert(undefined))
    }
  }, [message, dispatch])


  const columns = [
    {
      field: 'voucherName',
      headerName: 'Tên voucher',
      minWidth: '200',
      hideable: false

    },
    {
      field: 'content',
      headerName: "Nội dung khuyến mãi",
      minWidth: '300'
    },
    {
      field: 'startDate',
      headerName: "Ngày bắt đầu",
      minWidth: '200'
    },
    {
      field: 'endDate',
      headerName: "Ngày kết thúc",
      minWidth: '200'
    },
    {
      field: 'percent',
      headerName: "Chiết khấu (%)",
      minWidth: '200'
    },
    {
      field: 'limit',
      headerName: "Giới hạn (VND)",
      minWidth: '200'
    },
    {
      field: 'numberOfVoucher',
      headerName: "Tổng số lượng ",
      minWidth: '200'
    },
    {
      field: 'numberOfVoucherLeft',
      headerName: "Số lượng còn lại ",
      minWidth: '200'
    }
    ,
    {
      field: 'action',
      headerName: 'Tác vụ',
      minWidth: '150',
      sortable: false,
      headerAlign: 'center',
      renderCell: (params) => {
        return <Box >
          <IconButton size="medium" sx={{ m: 1 }} onClick={() => { handleOpenAddVoucher(params.row.id) }} >
            <ModeEditIcon color="info" />
          </IconButton>
          <IconButton size="medium" sx={{ m: 1 }} onClick={() => { handleDeleteVoucher(params.row.id) }}>
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      }
    }

  ]
  const voucherRows = voucherList.map((voucher) => {
    return {
      id: voucher.id,
      voucherName: voucher.name,
      content: voucher.description,
      startDate: voucher.startDate,
      endDate: voucher.endDate,
      percent: voucher.discount,
      limit: voucher.discountConditions * 1000,
      numberOfVoucher: voucher.numberVoucher,
      numberOfVoucherLeft: voucher.numberVoucher
    }
  }
  )
  const handleOpenAddVoucher = (id) => {
    dispatch(getVoucherById(id))
    setDisplayAddVoucher(true)
  }
  const handleDeleteVoucher = (id) => {
    setDeleteId(id)
    setOpenConfirm(true)
  }
  const doDelete = (id) => {
    dispatch(deleteVoucher(id))
    setOpenConfirm(false)
    setDeleteId(0)
  }
  return (
    <div>
      <Box>
        <Typography sx={style.pageTitle} variant='h5'>Quản lý voucher</Typography>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Box>
            <Button variant='contained' onClick={() => { setDisplayAddVoucher(true) }}>
              <AddBoxOutlinedIcon fontSize='small' />
              <Box ml={1}>Thêm voucher</Box>
            </Button>
          </Box>
          <DataGrid
            sx={{ boxShadow: 2, mt: 2 }}
            columns={columns}
            rows={voucherRows}
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
      {displayAddVoucher && <AddVoucher setDisplayAddVoucher={setDisplayAddVoucher} />}
      {openConfirm && <Confirm noAction={() => setOpenConfirm(false)} yesAction={() => doDelete(deleteId)} name="VOUCHER" />}
    </div>
  )
}
/** @type {import("@mui/material").SxProps} */
const style = {
  pageTitle: {
    mb: 2
  }
}
export default Voucher
