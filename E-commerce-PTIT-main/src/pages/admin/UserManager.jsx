import { Box, Button, IconButton, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import TabPanel from "../../components/Admin/TabPanel";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import AddUser from "../../components/Admin/UserManager/AddUser";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteUser,
  fetchUser,
  getUserById,
} from "../../redux/reducer/UserSlice";
import { notify } from "../../components/Admin/notify";
import { Confirm } from "../../components/Admin/Confirm";

function UserManager() {
  const dispatch = useDispatch();
  var message = useSelector((state) => state.users.alert);
  var users = useSelector((state) => state.users.users);
  const [customers, setCustomers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [openConfirm, setOpenConfirm] = useState(false)
  const [deleteId, setDeleteId] = useState(0)
  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch]);
  useEffect(() => {
    let customers = [],
      employees = [];
    users.forEach((user) => {
      if (user.roles.includes("USER")) customers.push(user);
      else employees.push(user);
    });
    setCustomers(customers);
    setEmployees(employees);
  }, [users]);
  useEffect(() => {
    console.log(message)
    if (message != undefined) notify(message.message, message.code)
  }, [message])
  const columnsCustomer = [
    {
      field: "username",
      headerName: "Tên đăng nhập",
      minWidth: "200",
      hideable: false,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: "300",
    },
    {
      field: "fullname",
      headerName: "Họ tên",
      minWidth: "200",
    },
    {
      field: "dob",
      headerName: "Ngày sinh",
      minWidth: "200",
    },
    {
      field: "phone",
      headerName: "Số điện thoại",
      minWidth: "200",
    },
    {
      field: "address",
      headerName: "Địa chỉ",
      minWidth: "200",
    },
    {
      field: "createDate",
      headerName: "Ngày tạo",
      minWidth: "100",
    },
    {
      field: "action",
      headerName: "Tác vụ",
      minWidth: "150",
      sortable: false,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Box>
            <IconButton

              size="medium"
              sx={{ m: 1 }}
              onClick={() => {
                handleOpenDisplayAddUser(params.row.id);
              }}
            >
              <ModeEditIcon color="info" />
            </IconButton>
            <IconButton
              size="medium"
              sx={{ m: 1 }}
              onClick={() => {
                handleDeleteUser(params.row.id);
              }}
            >
              <DeleteIcon color="error" />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  const columnsEmployee = [
    {
      field: "username",
      headerName: "Tên đăng nhập",
      minWidth: "200",
      hideable: false,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: "300",
    },
    {
      field: "fullname",
      headerName: "Họ tên",
      minWidth: "200",
    },
    {
      field: "dob",
      headerName: "Ngày sinh",
      minWidth: "200",
    },
    {
      field: "phone",
      headerName: "Số điện thoại",
      minWidth: "200",
    },
    {
      field: "address",
      headerName: "Địa chỉ",
      minWidth: "200",
    },
    {
      field: "roles",
      headerName: "Chức vụ",
      minWidth: "100",
    },
    {
      field: "action",
      headerName: "Tác vụ",
      minWidth: "150",
      sortable: false,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Box>
            <IconButton
              size="medium"
              sx={{ m: 1 }}
              onClick={() => {
                handleOpenDisplayAddUser(params.row.id);
              }}
            >
              <ModeEditIcon color="info" />
            </IconButton>
            <IconButton
              size="medium"
              sx={{ m: 1 }}
              onClick={() => {
                handleDeleteUser(params.row.id);
              }}
            >
              <DeleteIcon color="error" />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  const customersRows = customers.map((customer) => {
    return {
      id: customer.id,
      username: customer.username,
      email: customer.email,
      fullname: customer.name,
      dob: customer.dob,
      address: customer.address,
      phone: customer.phoneNumber,
      createDate: customer.createDate,
    };
  });

  const employeesRows = employees.map((employee) => {
    return {
      id: employee.id,
      username: employee.username,
      email: employee.email,
      fullname: employee.name,
      dob: employee.dob,
      phone: employee.phoneNumber,
      address: employee.address,
      roles: employee.roles === "ADMIN" ? "Quản trị viên" : "Nhân viên",
    };
  });

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [displayAddUser, setDisplayAddUser] = useState(false);
  const handleOpenDisplayAddUser = (id) => {
    dispatch(getUserById(id));
    setTimeout(setDisplayAddUser(true), 1000);
  };
  const handleDeleteUser = (id) => {
    setDeleteId(id)
    setOpenConfirm(true)
  };
  const doDelete = (id) => {
    dispatch(deleteUser(id));
    setOpenConfirm(false)
    setDeleteId(0)
  }
  return (
    <div>
      <Box>
        <Typography sx={style.pageTitle} variant="h5">
          Quản lý người dùng
        </Typography>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Khách hàng" id="tab-0" />
            <Tab label="Nhân viên" id="tab-1" />
          </Tabs>
          <TabPanel value={value} index={0}>
            <Box>
              <Button
                variant="contained"
                onClick={() => {
                  handleOpenDisplayAddUser(-1);
                }}
              >
                <PersonAddAlt1Icon fontSize="small" />
                <Box ml={1}>Thêm mới khách hàng</Box>
              </Button>
            </Box>
            <DataGrid
              sx={{ boxShadow: 2, mt: 2 }}
              columns={columnsCustomer}
              rows={customersRows}
              slots={{
                toolbar: GridToolbar,
              }}
              initialState={{
                pagination: { paginationModel: { pageSize: 5 } }
              }}
              pageSizeOptions={[5, 10, 25]}
            ></DataGrid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Box>
              <Button
                variant="contained"
                onClick={() => {
                  setDisplayAddUser(true);
                }}
              >
                <PersonAddAlt1Icon fontSize="small" />
                <Box ml={1}>Thêm mới nhân viên</Box>
              </Button>
            </Box>
            <DataGrid
              columns={columnsEmployee}
              rows={employeesRows}
              slots={{
                toolbar: GridToolbar,
              }}
              sx={{ boxShadow: 2, mt: 2 }}
              initialState={{
                pagination: { paginationModel: { pageSize: 5 } }
              }}
              pageSizeOptions={[5, 10, 25]}
            />
          </TabPanel>
        </Box>
      </Box>
      {displayAddUser && (
        <AddUser setDisplayAddUser={setDisplayAddUser} typeUser={value} />
      )}
      {openConfirm && <Confirm noAction={() => setOpenConfirm(false)} yesAction={() => doDelete(deleteId)} name="USER" />}

    </div>
  );
}
/** @type {import("@mui/material").SxProps} */
const style = {
  pageTitle: {
    mb: 2,
  },
};
export default UserManager;
