import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { notify } from "../../components/Admin/notify";
import styled from "styled-components";
import ProductCollapseTable from "../../components/Employee/Product/ProductCollapseTable";
import { formatCurrency } from "../../components/basicFunction";
import ImportSlice, { importSupply } from "../../redux/reducer/ImportSlice";
import AddImport from "../../components/Employee/Product/AddImport";
import { fetchSupplier } from "../../redux/reducer/SupplierSlice";
import { Confirm } from "../../components/Employee/Confirm";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function Import() {
  const dispatch = useDispatch();
  var message = useSelector((state) => state.import.alert);
  const invoice = useSelector((state) => state.import.itemInvoices)
  const totalImport = invoice.reduce((total, item) => total + item.importPrice * item.importQuantity, 0)
  const suppliers = useSelector(state => state.supplier.suppliers)
  const [openConfirm, setOpenConfirm] = useState(false)
  const [supplier, setSupplier] = useState(null)
  const [editItemInvoice, setEditItemInvoice] = useState(null)
  useEffect(() => {
    dispatch(fetchSupplier())
  }, [dispatch])
  useEffect(() => {
    if (message != undefined) notify(message.message, message.code)
    dispatch(ImportSlice.actions.resetAlert(undefined))
  }, [message])
  const [displayImport, setDisplayImport] = useState(false);

  const deleteFromInvoice = (id) => {
    dispatch(ImportSlice.actions.deleteFromInvoice(id))
  }
  const openEditScreen = (item) => {
    setEditItemInvoice(item)
    setDisplayImport(true)
  }
  const handleChangeSupplier = (event) => {
    setSupplier(event.target.value);
  };
  const handleImportSupply = () => {
    const productItems = invoice.map((item) => ({
      id: item.id,
      soldPrice: item.soldPrice,
      importPrice: item.importPrice,
      importQuantity: item.importQuantity
    }))
    const importInfo = {
      productItems: productItems,
      supplierId: supplier
    }
    console.log(importInfo)
    if (importInfo.supplierId === null) {
      notify("Chưa chọn nhà cung cấp", 3)
      setOpenConfirm(false)
      return
    }
    if (productItems.length === 0) {
      notify("Danh sách nhập trống", 3)
      setOpenConfirm(false)

      return
    }
    dispatch(importSupply(importInfo))
    setOpenConfirm(false)
  }
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: "white",
    },
    '&:nth-of-type(even)': {
      backgroundColor: "#f5f5f5",
    },
  }));
  return (
    <div>
      <Box >
        <Typography sx={style.pageTitle} variant="h5">
          Nhập hàng
        </Typography>
        <FormControl variant="standard" sx={{ mb: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">Nhà cung cấp</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={supplier}
            label="Chọn nhà cung cấp"
            onChange={handleChangeSupplier}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {suppliers.map((supplier) =>
              (<MenuItem value={supplier.id}>{supplier.name}</MenuItem>)
            )
            }
          </Select>
        </FormControl>
        <Box border={2} >
          <Box maxHeight={300} overflow="scroll" >
            <TableContainer>
              <Table>
                <TableHead sx={{ background: "#0288d1" }} >
                  <TableRow  >
                    <TableCell align="center" sx={{ color: "#fffbfe" }}>MÃ SẢN PHẨM</TableCell>
                    <TableCell align="center" sx={{ color: "#fffbfe" }}>TÊN SẢN PHẨM</TableCell>
                    <TableCell align="center" sx={{ color: "#fffbfe" }}>GIÁ BÁN</TableCell>
                    <TableCell align="center" sx={{ color: "#fffbfe" }}>GIÁ NHẬP</TableCell>
                    <TableCell align="center" sx={{ color: "#fffbfe" }}>SỐ LƯỢNG</TableCell>
                    <TableCell align="center" sx={{ color: "#fffbfe" }}>THÀNH TIỀN</TableCell>
                    <TableCell align="center" sx={{ color: "#fffbfe" }}>THAO TÁC</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    invoice.map((item) => (
                      <StyledTableRow>
                        <TableCell align="center" size="small">{item.id}</TableCell>
                        <TableCell align="center" size="small">{item.itemName}</TableCell>
                        <TableCell align="center" size="small">{formatCurrency(item.soldPrice)}</TableCell>
                        <TableCell align="center" size="small">{formatCurrency(item.importPrice)}</TableCell>
                        <TableCell align="center" size="small">{item.importQuantity}</TableCell>
                        <TableCell align="center" size="small">{formatCurrency(item.importPrice * item.importQuantity)}</TableCell>
                        <TableCell align="center" size="small" sx={{ display: "flex", justifyContent: "space-around" }}>
                          <Box sx={{ cursor: "pointer" }} >
                            <div
                              onClick={() => openEditScreen(item)}
                            >
                              <BorderColorOutlinedIcon fontSize="small" color='info' />
                            </div>
                          </Box>
                          <Box sx={{ cursor: "pointer" }}  >
                            <div
                              onClick={() => deleteFromInvoice(item.id)}
                            >
                              <DeleteOutlinedIcon fontSize="small" color='error' />
                            </div>
                          </Box>
                        </TableCell>
                      </StyledTableRow>
                    ))
                  }
                  <StyledTableRow>
                    <TableCell align="center" size="small" colSpan={7} >
                      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Box>Tổng tiền nhập</Box>
                        <Box>{formatCurrency(totalImport)}</Box>
                      </Box>
                    </TableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
        {invoice.length != 0 && <Box display="flex" justifyContent="flex-end" py={1}>
          <Button variant="contained" color="info" onClick={() => setOpenConfirm(true)}>Nhập hàng</Button>
        </Box>}
      </Box>
      <Box mt={2}>
        <Typography sx={style.pageTitle} variant="h5">
          Danh sách sản phẩm
        </Typography>
        <ProductCollapseTable />
      </Box>
      {displayImport && (
        <AddImport setDisplayImport={setDisplayImport} itemInvoices={editItemInvoice} />
      )}
      {openConfirm && <Confirm noAction={() => setOpenConfirm(false)} yesAction={() => handleImportSupply()} />}
      <ToastContainer />
    </div>
  );
}
/** @type {import("@mui/material").SxProps} */
const style = {
  pageTitle: {
    mb: 2,
  },
};
export default Import;
