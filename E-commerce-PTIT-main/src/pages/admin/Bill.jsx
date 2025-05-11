import { Box, Button, IconButton, Tab, Tabs, Typography } from '@mui/material'
import React, { useState } from 'react'
import TabPanel from '../../components/Admin/TabPanel'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import BillDetails from '../../components/Admin/Bill/BillDetails';
import { useDispatch, useSelector } from 'react-redux';
import { formatCurrency } from '../../components/basicFunction';
import { getOrderById, updateOrderStatus } from '../../redux/reducer/OrderSlice';
import { getInvoiceById } from '../../redux/reducer/ImportSlice';
import InvoiceDetails from '../../components/Admin/Bill/InvoiceDetails';

function Bill() {
  const dispatch = useDispatch()
  const orders = useSelector((state) => state.order.orders)
  const invoices = useSelector((state) => state.import.invoices)
  const columnsOrder = [
    {
      field: 'billcode',
      headerName: 'Mã hóa đơn',
      minWidth: '200',
      hideable: false

    },
    {
      field: 'createAt',
      headerName: "Ngày tạo",
      minWidth: '150'
    },
    {
      field: 'status',
      headerName: "Tình trạng",
      minWidth: '200'
    },
    {
      field: 'paymentMethod',
      headerName: "Phương thức thanh toán",
      minWidth: '200'
    },
    {
      field: 'shippingMethod',
      headerName: "Phương thức giao hàng",
      minWidth: '300'
    },
    {
      field: 'total',
      headerName: "Tổng tiền",
      minWidth: '150'
    },
    {
      field: 'action',
      headerName: 'Xem chi tiết',
      minWidth: '140',
      sortable: false,
      headerAlign: 'center',
      renderCell: (params) => {
        return <Box style={{ display: 'flex', justifyContent: 'center', width: "100%" }} >
          <IconButton size="medium" sx={{ m: 1 }} onClick={() => {
            console.log(params.row.billcode)
            dispatch(getOrderById(params.row.billcode))
            setDisplayBillDetails(true)
          }} >
            <InfoOutlinedIcon />
          </IconButton>
        </Box>
      }
    }
  ]
  const columnsInvoice = [
    {
      field: 'billcode',
      headerName: 'Mã hóa đơn',
      minWidth: '300',
      hideable: false

    },
    {
      field: 'createAt',
      headerName: "Ngày tạo",
      minWidth: '250'
    },
    {
      field: 'supplier',
      headerName: "Nhà cung cấp",
      minWidth: '300'
    },
    {
      field: 'total',
      headerName: "Tổng tiền",
      minWidth: '300'
    },
    {
      field: 'action',
      headerName: 'Xem chi tiết',
      minWidth: '140',
      sortable: false,
      headerAlign: 'center',
      renderCell: (params) => {
        return <Box style={{ display: 'flex', justifyContent: 'center', width: "100%" }} >
          <IconButton size="medium" sx={{ m: 1 }} onClick={() => {
            dispatch(getInvoiceById(params.row.billcode))
            setDisplayInvoiceDetails(true)
          }} >
            <InfoOutlinedIcon />
          </IconButton>
        </Box>
      }
    }
  ]
  const rowsOrder = orders.map((order) => (
    {
      id: order.id,
      billcode: order.id,
      createAt: order.createDate,
      status: order.statusOrder,
      paymentMethod: order.payment.name,
      shippingMethod: `${order.shipment.name} (${order.shipment.description})`,
      total: formatCurrency(order.totalPrice)
    }
  ))
  const rowsInvoice = invoices.map((invoice) => (
    {
      id: invoice.id,
      billcode: invoice.id,
      createAt: invoice.createDate,
      supplier: invoice.supplier.name,
      total: formatCurrency(invoice.totalPrice)

    }
  ))

  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const [displayBillDetails, setDisplayBillDetails] = useState(false)
  const [displayInvoiceDetails, setDisplayInvoiceDetails] = useState(false)
  return (
    <div>
      <Box>
        <Typography sx={style.pageTitle} variant='h5'>Quản lý hóa đơn</Typography>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label='Hóa đơn bán' id="tab-0" />
            <Tab label='Hóa đơn nhập' id="tab-1" />
          </Tabs>
          <TabPanel value={value} index={0}>
            <DataGrid
              sx={{ boxShadow: 2, mt: 2 }}
              columns={columnsOrder}
              rows={rowsOrder}
              slots={{
                toolbar: GridToolbar,
              }}
              initialState={{
                pagination: { paginationModel: { pageSize: 5 } }
              }}
              pageSizeOptions={[5, 10, 25]}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <DataGrid
              columns={columnsInvoice}
              rows={rowsInvoice}
              slots={{
                toolbar: GridToolbar,
              }}
              sx={{ boxShadow: 2, mt: 2 }}
              initialState={{
                pagination: { paginationModel: { pageSize: 5 } }
              }}
              pageSizeOptions={[5, 10, 25]}
            ></DataGrid>
          </TabPanel>
        </Box>
      </Box>
      {displayBillDetails && <BillDetails setDisplayBillDetails={setDisplayBillDetails} typeBill={value} />}
      {displayInvoiceDetails && <InvoiceDetails setDisplayInvoiceDetails={setDisplayInvoiceDetails} />}
    </div>
  )
}
/** @type {import("@mui/material").SxProps} */
const style = {
  pageTitle: {
    mb: 2
  }
}
export default Bill