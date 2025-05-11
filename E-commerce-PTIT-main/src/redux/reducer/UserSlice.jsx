import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IP } from "../../config/const";
export const getUser = () => {
  const user = JSON.parse(localStorage.getItem("authorization"))
  return user
}
const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    currentSetUser: {
      id: "",
      username: "",
      name: "",
      email: "",
      password: "",
      address: "",
      createDate: "",
      modifiedDate: "",
      roles: "",
      phoneNumber: "",
      dob: "",
    },
  },
  reducers: {
    addUser: (state, action) => {
      state.customers.push(action.payload);
    },
    editUser: (state, action) => {
      const tmpUser = state.customers.map((user) => {
        if (user.id === action.payload.id) return action.payload;
        return user;
      });
      state.customers = tmpUser;
    },
    deleteUser: (state, action) => {
      const deletedArray = state.customers.filter(
        (user) => user.id !== action.payload
      );
      state.customers = deletedArray;
    },
    resetAlert: (state, action) => {
      state.alert = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.users = action.payload
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        console.log(action.payload)
        state.currentSetUser = action.payload;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.alert = action.payload

      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.alert = action.payload.data
        state.users = state.users.map((user) => {
          if (user.id === action.payload.newUser.id) {
            return action.payload.newUser
          }
          return user
        })
        if(action.payload.role==="USER") state.loginUser = action.payload.newUser
        
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.alert = action.payload.data
        state.users = state.users.filter((user) => user.id !== action.payload.id)
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload.code !== undefined) state.alert = action.payload
        else {
          const userLogin = action.payload
          localStorage.setItem("authorization", JSON.stringify(userLogin))
        }

      })
      .addCase(login.rejected, (state, action) => {
        state.alert = action.payload
      })
      .addCase(signupForUser.fulfilled, (state, action) => {
        state.alert = {
          code: action.payload.code,
          message: action.payload.message
        }
      })
      .addCase(getOwnInformation.fulfilled, (state, action) => {
        state.loginUser = action.payload
      })
  },
});

export const fetchUser = createAsyncThunk("users/fetchUser", async () => {
  const token = getUser().token
  const res = await fetch(IP + "/admin/api/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
});
export const getUserById = createAsyncThunk("users/getUserById", async (id) => {
  const token = getUser().token
  if (id === -1)
    return {
      id: null,
      username: "",
      name: "",
      email: "",
      password: "",
      address: "",
      createDate: "",
      modifiedDate: "",
      roles: "",
      phoneNumber: "",
      dob: "",
    };
  const res = await fetch(IP + `/admin/api/user/` + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data.message;
});
export const addUser = createAsyncThunk("user/addUser", async (newUser) => {
  // console.log(newUser)
  const token = getUser().token
  newUser = {
    ...newUser,
    password: "Matkhaumacdinh1@",
    roles: newUser.roles === "USER" ? "USER" : newUser.roles
  }
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newUser),
  };
  let tmpRole = newUser.roles === 'ADMIN' ? 1 : newUser.roles === "EMPLOYEE" ? 0 : 3
  const res = await fetch(IP + `/api/v1/signup?role=` + tmpRole, options);
  const data = await res.json();
  console.log(data)
  return data;
});
export const editUser = createAsyncThunk("user/editUser", async (newUser) => {
  if(!newUser.passwordOld) newUser.password = null
  const token = getUser().token
  const role = getUser().role
  const options = {
    method: "PUT",
    body: JSON.stringify(newUser),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
  };
  const res = await fetch(IP + `/api/user`, options);
  const data = await res.json();
  return {
    newUser: newUser,
    data: data,
    role: role
  };
});
export const deleteUser = createAsyncThunk("user/deleteUser", async (id) => {
  console.log(id)
  const token = getUser().token
  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await fetch(IP + `/admin/api/user?id=` + id, options);
  const data = await res.json();
  return {
    id: id,
    data: data
  };
});
export const login = createAsyncThunk("user/login", async ({ username, password }) => {
  const options = {
    method: "POST",
    headers: {
      'Content-Type': "application/json"
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  }
  const res = await fetch(IP + `/api/v1/login`, options)
  const data = await res.json()
  return data
})
export const signupForUser = createAsyncThunk("user/signupForUser", async (newUser) => {
  const options = {
    method: "POST",
    headers: {
      'Content-Type': "application/json"
    },
    body: JSON.stringify(newUser)
  }
  const res = await fetch(IP + `/api/v1/signup?role=3`, options)
  const data = await res.json()
  console.log(data)
  return data
})
export const getOwnInformation = createAsyncThunk("user/getOwnInformation",async()=>{
  const token = getUser().token
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }
  const res = await fetch(IP + `/api/user`, options)
  const data = await res.json()
  console.log(data.message)
  return data.message

})
export default userSlice;
