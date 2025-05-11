import {
    Box, FormControl, FormHelperText, FormLabel, IconButton, Input, Select, MenuItem, InputLabel, FormGroup, Grid, TextField, NativeSelect, Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import PersonPinOutlinedIcon from "@mui/icons-material/PersonPinOutlined";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import ContactPhoneOutlinedIcon from "@mui/icons-material/ContactPhoneOutlined";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import BasicDatePicker from "../BasicDatePicker";
import { useDispatch, useSelector } from "react-redux";
import {
    addUser,
    editUser,
    getUserById,
} from "../../../redux/reducer/UserSlice";

function AddUser({ setDisplayAddUser, typeUser }) {
    const dispatch = useDispatch();
    const [position, setPosition] = useState("USER");
    const [currentUserOb, setCurrentUserOb] = useState({
        id: null,
        username: null,
        name: null,
        email: null,
        password: null,
        address: null,
        createDate: null,
        modifiedDate: null,
        roles: null,
        phoneNumber: null,
        dob: null,
    });
    var user = useSelector((state) => state.users.currentSetUser);
    var alert = useSelector((state) => state.users.alert);
    useEffect(() => {
        console.log(user);
        if (user !== undefined) setCurrentUserOb(user);
        if (typeUser == 1) setPosition(user.roles);
        else setPosition("USER");
    }, [user]);
    const handleChangePosition = (event) => {
        setPosition(event.target.value);
        handleOnChangeProperties("roles", event.target.value);
    };
    const handleCloseAddUser = () => {
        setDisplayAddUser(false);
        dispatch(getUserById(-1));
    };
    const handleOnChangeProperties = (field, value) => {
        setCurrentUserOb((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSaveUser = () => {
        console.log(position);
        if (currentUserOb.id === null || currentUserOb.id === "") {
            console.log(currentUserOb)
            // dispatch(addUser(currentUserOb));
        } else {
            console.log(currentUserOb)
            // dispatch(editUser(currentUserOb));
        }
        handleCloseAddUser();
    };
    return (
        <Box sx={style.coverer} >
            <Box sx={style.addUserModal} >
                <Box style={{ display: "flex", justifyContent: "flex-end" }} >
                    <IconButton onClick={handleCloseAddUser} >
                        <CancelOutlinedIcon color="error" />
                    </IconButton>
                </Box>
                <form>
                    <Grid sx={style.form}
                        container rowSpacing={2}
                        columnSpacing={2} >
                        <Grid item xs={12}
                            sm={12}
                            md={6}
                            sx={style.inputContainer} >
                            <FormControl fullWidth={true} >
                                <FormLabel sx={style.formLabel} >
                                    <PermIdentityIcon sx={style.formLabel.formLabelIcon} />
                                    <Box > Tài khoản đăng nhập </Box>
                                </FormLabel>
                                <TextField fullWidth={true}
                                    variant="outlined"
                                    value={currentUserOb.username}
                                    onChange={
                                        (e) => {
                                            handleOnChangeProperties("username", e.target.value);
                                        }
                                    }
                                />
                                <FormHelperText ></FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}
                            sm={12}
                            md={6}
                            sx={style.inputContainer} >
                            <FormControl fullWidth={true} >
                                <FormLabel sx={style.formLabel} >
                                    <PersonPinOutlinedIcon sx={style.formLabel.formLabelIcon} />
                                    <Box > {typeUser === 0 ? "Tên khách hàng" : "Tên nhân viên"} </Box>
                                </FormLabel>
                                <TextField fullWidth={true}
                                    variant="outlined"
                                    value={currentUserOb.name}
                                    onChange={
                                        (e) => {
                                            handleOnChangeProperties("name", e.target.value);
                                        }
                                    }
                                />
                                <FormHelperText></FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}
                            sm={12}
                            md={3}
                            sx={style.inputContainer} >
                            <FormControl fullWidth={true} >
                                <FormLabel sx={style.formLabel} >
                                    <CakeOutlinedIcon sx={style.formLabel.formLabelIcon} />
                                    <Box> Ngày sinh </Box>
                                </FormLabel>
                                <BasicDatePicker value={currentUserOb.dob} onChangeFunction={handleOnChangeProperties} field="dob" />
                                <FormHelperText > </FormHelperText>
                            </FormControl>
                        </Grid>
                        {
                            typeUser === 1 && (<Grid item xs={12}
                                sm={6}
                                md={3}
                                sx={style.inputContainer} >
                                <FormControl fullWidth={true} >
                                    <FormLabel sx={style.formLabel} >
                                        <BusinessCenterOutlinedIcon sx={style.formLabel.formLabelIcon} />
                                        <Box > Vị trí </Box>
                                    </FormLabel>
                                    <Select sx={style.select}
                                        value={position}
                                        onChange={handleChangePosition} >
                                        <MenuItem value="EMPLOYEE" > Nhân viên </MenuItem>
                                        <MenuItem value="ADMIN" > Quản trị viên </MenuItem>
                                    </Select>
                                    <FormHelperText > </FormHelperText>
                                </FormControl>
                            </Grid>
                            )
                        }
                        <Grid item xs={12}
                            sm={12}
                            md={typeUser == 1 ? 4 : 6}
                            sx={style.inputContainer} >
                            <FormControl fullWidth={true} >
                                <FormLabel sx={style.formLabel} >
                                    <MailOutlineOutlinedIcon sx={style.formLabel.formLabelIcon} />
                                    <Box > Email </Box>
                                </FormLabel>
                                <TextField fullWidth={true}
                                    variant="outlined"
                                    value={currentUserOb.email}
                                    onChange={
                                        (e) => {
                                            handleOnChangeProperties("email", e.target.value);
                                        }
                                    }
                                />
                                <FormHelperText > </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}
                            sm={12}
                            md={typeUser == 1 ? 2 : 3}
                            sx={style.inputContainer} >
                            <FormControl fullWidth={true} >
                                <FormLabel sx={style.formLabel} >
                                    <ContactPhoneOutlinedIcon sx={style.formLabel.formLabelIcon} />
                                    <Box > Số điện thoại </Box>
                                </FormLabel>
                                <TextField fullWidth={true}
                                    variant="outlined"
                                    value={currentUserOb.phoneNumber}
                                    onChange={
                                        (e) => {
                                            handleOnChangeProperties("phoneNumber", e.target.value);
                                        }
                                    }
                                />
                                <FormHelperText > </FormHelperText>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}
                            sm={12}
                            md={12}
                            sx={style.inputContainer} >
                            <FormControl fullWidth={true} >
                                <FormLabel sx={style.formLabel} >
                                    <HomeWorkOutlinedIcon sx={style.formLabel.formLabelIcon} />
                                    <Box > Địa chỉ </Box>
                                </FormLabel>
                                <TextField fullWidth={true}
                                    variant="outlined"
                                    value={currentUserOb.address}
                                    onChange={
                                        (e) => {
                                            handleOnChangeProperties("address", e.target.value);
                                        }
                                    }
                                />
                                <FormHelperText > </FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>
                </form>
                <Box style={
                    { display: "flex", justifyContent: "flex-end" }} >
                    <Button variant="contained"
                        color="success"
                        onClick={handleSaveUser} >
                        Save </Button>
                </Box>
            </Box>
        </Box>
    );
}
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
        width: "75%",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        boxShadow: 5,
        padding: "10px",
        maxHeight: "70%",
        overflowY: "scroll",
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
export default AddUser;