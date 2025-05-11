import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  Select,
  MenuItem,
  InputLabel,
  FormGroup,
  Grid,
  TextField,
  NativeSelect,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import AbcIcon from "@mui/icons-material/Abc";
import PercentOutlinedIcon from "@mui/icons-material/PercentOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, editCategory, getCategoryById } from "../../../redux/reducer/CategorySlice";
const AddCategory = ({ setDisplayAddCategory }) => {
  const dispatch = useDispatch();
  const [currentSetCategory, setCurrentSetCategory] = useState({
    id: "",
    name: "",
    description: "",
  });
  const category = useSelector((state) => state.category.currentSetCategory);

  useEffect(() => {
    setCurrentSetCategory(category);
  }, [category]);
  const handleCloseAddCategory = () => {
    setDisplayAddCategory(false);
    dispatch(getCategoryById(-1))
  };
  const handleOnChangeProperties = (field, value) => {
    setCurrentSetCategory((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleSaveCategory = () => {
    console.log(currentSetCategory)
    if (currentSetCategory.id === null || currentSetCategory.id === "") {
      dispatch(addCategory(currentSetCategory))
    }
    else {
      dispatch(editCategory(currentSetCategory))
    }
    handleCloseAddCategory()
  }

  return (
    <Box sx={style.coverer}>
      <Box sx={style.addUserModal}>
        <Box style={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton onClick={handleCloseAddCategory}>
            <CancelOutlinedIcon color="error" />
          </IconButton>
        </Box>
        <form>
          <Grid sx={style.form} container rowSpacing={2} columnSpacing={2}>
            <Grid item xs={12} sm={12} md={12} sx={style.inputContainer}>
              <FormControl fullWidth={true}>
                <FormLabel sx={style.formLabel}>
                  <CategoryOutlinedIcon sx={style.formLabel.formLabelIcon} />
                  <Box>Tên danh mục</Box>
                </FormLabel>
                <TextField
                  fullWidth={true}
                  variant="outlined"
                  value={currentSetCategory.name}
                  onChange={(e) =>
                    handleOnChangeProperties("name", e.target.value)
                  }
                />
                <FormHelperText></FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={12} sx={style.inputContainer}>
              <FormControl fullWidth={true}>
                <FormLabel sx={style.formLabel}>
                  <AbcIcon sx={style.formLabel.formLabelIcon} />
                  <Box>Mô tả danh mục</Box>
                </FormLabel>
                <TextField
                  fullWidth={true}
                  variant="outlined"
                  value={currentSetCategory.description}
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
            onClick={handleSaveCategory} >
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
export default AddCategory;
