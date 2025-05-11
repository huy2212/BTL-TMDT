import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import AbcIcon from "@mui/icons-material/Abc";
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import MoveToInboxOutlinedIcon from '@mui/icons-material/MoveToInboxOutlined';
import { useDispatch, useSelector } from "react-redux";
import ImportSlice from "../../../redux/reducer/ImportSlice";
import { hasEmptyOrNullField } from "../../basicFunction";
import { notify } from "../../Admin/notify";
const AddImport = ({ setDisplayImport,itemDetails,row,itemInvoices }) => {
  const dispatch = useDispatch();
  const [sellPrice,setSellPrice] = useState(itemInvoices?.soldPrice??itemDetails.at(-1).price)
  const [importPrice,setImportPrice] = useState(itemInvoices?.importPrice??null)
  const [importQuantity,setImportQuantity] = useState(itemInvoices?.importQuantity??null)
  const handleCloseImport = () => {
    setDisplayImport(false)
  }
  const renderName = () => {
    let attrString = ""
    itemDetails.map((attr) => {
        if (attr.important) attrString += `/${attr.value}`
    })
    attrString = attrString.substring(1, attrString.length)
    return `${row.name} ( ${attrString} )`
}
  const handleSaveImport = () => {
    let itemInvoice ={
      id: itemInvoices?itemInvoices?.id:itemDetails.at(-1).productItemId,
      itemName:itemInvoices?itemInvoices?.itemName: renderName(),
      soldPrice:Number(sellPrice),
      importPrice:Number(importPrice),
      importQuantity:importQuantity
    }
    if(hasEmptyOrNullField(itemInvoice)){
      notify("Điền chưa đủ thông tin",3)
      return;
    }

    if(!itemInvoices) dispatch(ImportSlice.actions.addToInvoice(itemInvoice))
    else dispatch(ImportSlice.actions.editInvoice(itemInvoice))
    setDisplayImport(false)
  }

  return (
    <Box sx={style.coverer}>
      <Box sx={style.addUserModal}>
        <Box style={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton onClick={handleCloseImport}>
            <CancelOutlinedIcon color="error" />
          </IconButton>
        </Box>
        <form>
          <Grid sx={style.form} container rowSpacing={2} columnSpacing={2}>
            <Grid item xs={12} sm={12} md={12} sx={style.inputContainer}>
              <FormControl fullWidth={true}>
                <FormLabel sx={style.formLabel}>
                  <LocalAtmOutlinedIcon sx={style.formLabel.formLabelIcon} />
                  <Box>Giá bán</Box>
                </FormLabel>
                <TextField
                  fullWidth={true}
                  variant="outlined"
                  value={sellPrice}
                  onChange={(e)=> setSellPrice(e.target.value)}
                />
                <FormHelperText></FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={12} sx={style.inputContainer}>
              <FormControl fullWidth={true}>
                <FormLabel sx={style.formLabel}>
                  <PaymentsOutlinedIcon sx={style.formLabel.formLabelIcon} />
                  <Box>Giá nhập</Box>
                </FormLabel>
                <TextField
                  fullWidth={true}
                  variant="outlined"
                  value={importPrice}
                  onChange={(e)=> setImportPrice(e.target.value)}
                />
                <FormHelperText></FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={12} sx={style.inputContainer}>
              <FormControl fullWidth={true}>
                <FormLabel sx={style.formLabel}>
                  <MoveToInboxOutlinedIcon sx={style.formLabel.formLabelIcon} />
                  <Box>Số lượng nhập</Box>
                </FormLabel>
                <TextField
                  fullWidth={true}
                  variant="outlined"
                  value={importQuantity}
                  onChange={(e)=> setImportQuantity(e.target.value)}
                />
                <FormHelperText></FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
        </form>
        <Box style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" color="success"
            onClick={handleSaveImport} >
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
/** @type {import("@mui/material").SxProps} */
const style = {
  coverer: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    zIndex: 1111,
    background: "rgba(0, 0, 0, 0.5)",
  },
  addUserModal: {
    backgroundColor: "white",
    width: "50%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    boxShadow: 5,
    padding: "10px",
    maxHeight: "70%",
    overflowY: "auto",
  },
  form: {
    padding: 4,
  },
  inputsContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "space-evenly",
  },
  inputContainer: {
    display: "flex",
    alignItems: "end",
  },
  select: {
    // marginTop:"8px"
  },
  formLabel: {
    display: "flex",
    alignItems: "center",
    marginBottom: "8px",
    formLabelIcon: {
      marginRight: "5px",
      marginBottom: "5px",
    },
  },
};
export default AddImport;
