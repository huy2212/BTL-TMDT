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
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import RecentActorsOutlinedIcon from '@mui/icons-material/RecentActorsOutlined';
import { useDispatch, useSelector } from "react-redux";
import { addSupplier, editSupplier, getSupplierById } from "../../../redux/reducer/SupplierSlice";
const AddSupplier = ({ setDisplayAddSupplier }) => {
  const dispatch = useDispatch();
  const [currentSetSupplier, setCurrentSetSupplier] = useState({
    id: "",
    name: "",
    description: "",
    phoneNumber:""
  });
  var supplier = useSelector((state) => state.supplier.currentSetSupplier);
  useEffect(() => {
    setCurrentSetSupplier(supplier);
    console.log(supplier)
  }, [dispatch,supplier]);
  const handleCloseAddSupplier = () => {
    setDisplayAddSupplier(false);
    dispatch(getSupplierById(-1))
  };
  const handleOnChangeProperties = (field, value) => {
    setCurrentSetSupplier((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleSaveSupplier = () => {
    console.log(currentSetSupplier)
    if (currentSetSupplier.id === null || currentSetSupplier.id === "") {
      dispatch(addSupplier(currentSetSupplier))
    }
    else {
      dispatch(editSupplier(currentSetSupplier))
    }
    handleCloseAddSupplier()
  }

  return (
    <Box sx={style.coverer}>
      <Box sx={style.addUserModal}>
        <Box style={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton onClick={handleCloseAddSupplier}>
            <CancelOutlinedIcon color="error" />
          </IconButton>
        </Box>
        <form>
          <Grid sx={style.form} container rowSpacing={2} columnSpacing={2}>
            <Grid item xs={12} sm={12} md={6} sx={style.inputContainer}>
              <FormControl fullWidth={true}>
                <FormLabel sx={style.formLabel}>
                  <LocalShippingOutlinedIcon sx={style.formLabel.formLabelIcon} />
                  <Box>Tên nhà cung cấp</Box>
                </FormLabel>
                <TextField
                  fullWidth={true}
                  variant="outlined"
                  value={currentSetSupplier.name}
                  onChange={(e) =>
                    handleOnChangeProperties("name", e.target.value)
                  }
                />
                <FormHelperText></FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={6} sx={style.inputContainer}>
              <FormControl fullWidth={true}>
                <FormLabel sx={style.formLabel}>
                  <RecentActorsOutlinedIcon sx={style.formLabel.formLabelIcon} />
                  <Box>Số điện thoại</Box>
                </FormLabel>
                <TextField
                  fullWidth={true}
                  variant="outlined"
                  value={currentSetSupplier.phoneNumber}
                  onChange={(e) =>
                    handleOnChangeProperties("phoneNumber", e.target.value)
                  }
                />
                <FormHelperText></FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={12} sx={style.inputContainer}>
              <FormControl fullWidth={true}>
                <FormLabel sx={style.formLabel}>
                  <AbcIcon sx={style.formLabel.formLabelIcon} />
                  <Box>Mô tả</Box>
                </FormLabel>
                <TextField
                  fullWidth={true}
                  variant="outlined"
                  value={currentSetSupplier.description}
                  onChange={(e) =>
                    handleOnChangeProperties("description", e.target.value)
                  }
                />
                <FormHelperText></FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
        </form>
        <Box style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" color="success"
            onClick={handleSaveSupplier} >
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
export default AddSupplier;
