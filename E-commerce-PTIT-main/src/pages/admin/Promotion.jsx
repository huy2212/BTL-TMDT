import { Box, Button, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AddPromotion from '../../components/Admin/Promotion/AddPromotion';
import { useDispatch, useSelector } from 'react-redux';
import promotionSlice, { deletePromotion, fetchPromotion, getPromtionById } from '../../redux/reducer/PromotionSlice';
import { notify } from '../../components/Admin/notify';
import { Confirm } from '../../components/Admin/Confirm';
function Promotion() {
  const dispatch = useDispatch()
  const [deleteId,setDeleteId] = useState(0)
  const [openConfirm,setOpenConfirm] = useState(false)
  const columns = [
    {
      field: 'content',
      headerName: "Nội dung khuyến mãi",
      minWidth: '550'
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
      headerName: "Chiết khấu",
      minWidth: '100'
    },
    {
      field: 'numberOfProduct',
      headerName: "Số lượng mặt hàng áp dụng",
      minWidth: '200'
    },
    {
      field: 'action',
      headerName: 'Tác vụ',
      minWidth: '150',
      sortable: false,
      headerAlign: 'center',
      renderCell: (params) => {
        return <Box >
          <IconButton size="medium" sx={{ m: 1 }} onClick={() => { handleDisplayAddPromotion(params.row.id) }} >
            <ModeEditIcon color="info" />
          </IconButton>
          <IconButton size="medium" sx={{ m: 1 }} onClick={()=>{handleDeletePromotion(params.row.id)}}>
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      }
    }

  ]
  var message = useSelector((state)=> state.promotion.alert)
  var promotions = useSelector((state) => state.promotion.promotions)
  const [displayAddPromotion, setDisplayAddPromotion] = useState(false)
  useEffect(() => {
    dispatch(fetchPromotion())
  }, [])
  useEffect(() => {
    if (message !== undefined) notify(message.message, message.code)
    return () => {
      dispatch(promotionSlice.actions.resetAlert(undefined))
    }
  }, [message, dispatch])
  const rows = promotions.map((promotion) => {
    return {
      id: promotion.id,
      content: promotion.name,
      startDate: promotion.dateStart,
      endDate: promotion.dateEnd,
      percent: promotion.discount,
      numberOfProduct: promotion.products?[...new Set(promotion.products.map(item => item.productId))].length:0
    }
  })
  const handleDeletePromotion = (id)=>{
    setDeleteId(id)
    setOpenConfirm(true)
  }
  const doDelete= (id) =>{
    dispatch(deletePromotion(id))
    setOpenConfirm(false)
    setDeleteId(0)
  }
  const handleDisplayAddPromotion = async (id) => {
    setTimeout(() => {
      // Gọi dispatch bằng cách truyền một callback function
      dispatch(getPromtionById(id));
  
      // Sau khi dispatch hoàn thành, set state mới
      setDisplayAddPromotion(true);
    }, 200);
  }
  return (
    <div>
      <Box>
        <Typography sx={style.pageTitle} variant='h5'>Quản lý khuyến mại</Typography>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Box>
            <Button variant='contained' onClick={() => { handleDisplayAddPromotion(-1) }}>
              <AddBoxOutlinedIcon fontSize='small' />
              <Box ml={1}>Thêm khuyến mại</Box>
            </Button>
          </Box>
          <DataGrid
            sx={{ boxShadow: 2, mt: 2 }}
            columns={columns}
            rows={rows}
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
      {displayAddPromotion && <AddPromotion setDisplayAddPromotion={setDisplayAddPromotion} />}
      {openConfirm && <Confirm name="PROMOTION" noAction={()=>setOpenConfirm(false)} yesAction={()=>doDelete(deleteId)} />}
    </div>
  )
}
/** @type {import("@mui/material").SxProps} */
const style = {
  pageTitle: {
    mb: 2
  }
}
export default Promotion