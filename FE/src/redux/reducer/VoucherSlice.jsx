import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IP } from "../../config/const";
const getUser = () => {
  const user = JSON.parse(localStorage.getItem("authorization"))
  return user
}
const voucherSlice = createSlice({
  name: "voucher",
  initialState: {
    vouchers: [],
    currentSetVoucher: {
      id: "",
      name: "",
      description: "",
      discount: 0,
      discountConditions: 0,
      numberVoucher: 0,
      startDate: "2024-09-05",
      endDate: "2024-11-05"
    },
    usingVoucher: JSON.parse(sessionStorage.getItem("usingVoucher"))??null
  },
  reducers: {
    resetAlert: (state, action) => {
      state.alert = action.payload
    },
    setUsingVoucher: (state, action) => {
      const voucher = action.payload
      state.usingVoucher = action.payload
      sessionStorage.setItem("usingVoucher", JSON.stringify(voucher))

    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVoucherForUser.fulfilled, (state, action) => {
        state.vouchers = action.payload;
      })
      .addCase(fetchVoucherForAdmin.fulfilled, (state, action) => {
        state.vouchers = action.payload;
      })
      .addCase(fetchUserVoucher.fulfilled, (state, action) => {
        state.vouchers = action.payload;
      })
      .addCase(saveUserVoucher.fulfilled, (state, action) => {
        state.alert = action.payload;

      })
      .addCase(getVoucherById.fulfilled, (state, action) => {
        state.currentSetVoucher = action.payload;
      })
      .addCase(addVoucher.fulfilled, (state, action) => {
        state.alert = action.payload;
        state.vouchers.push(action.payload.voucher)
      })
      .addCase(editVoucher.fulfilled, (state, action) => {
        state.alert = action.payload.data;
        state.vouchers = state.vouchers.map((voucher) => {
          if (voucher.id === action.payload.newVoucher.id) {
            return action.payload.newVoucher;
          }
          return voucher;
        });
      })
      .addCase(deleteVoucher.fulfilled, (state, action) => {
        state.alert = action.payload.data;
        state.vouchers = state.vouchers.filter(
          (voucher) => voucher.id !== action.payload.id
        );

      });
  },
});

export const fetchVoucherForUser = createAsyncThunk(
  "voucher/fetchVoucherForUser",
  async () => {
    const token = getUser().token
    const res = await fetch(IP + "/customer/api/vouchers", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    const data = await res.json();
    return data;
  }
);
export const fetchVoucherForAdmin = createAsyncThunk(
  "voucher/fetchVoucherForAdmin",
  async () => {
    const token = getUser().token
    const res = await fetch(IP + "/admin/api/vouchers", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    const data = await res.json();
    return data;
  }
);
export const getVoucherById = createAsyncThunk(
  "voucher/getVoucherById",
  async (id) => {
    const token = getUser().token
    if (id === -1)
      return {
        "id": "",
        "name": "",
        "description": "",
        "discount": 0,
        "discountConditions": 0,
        "numberVoucher": 0,
        "startDate": "",
        "endDate": ""
      };
    const res = await fetch(IP + `/admin/api/voucher?id=` + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data.message;
  }
);
export const addVoucher = createAsyncThunk(
  "voucher/addCategory",
  async (newVoucher) => {
    const token = getUser().token
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVoucher),
    };
    const res = await fetch(IP + `/admin/api/voucher`, options);
    const data = await res.json();
    return data;
  }
);
export const editVoucher = createAsyncThunk(
  "voucher/editVoucher",
  async (newVoucher) => {
    const token = getUser().token
    const options = {
      method: "PUT",
      body: JSON.stringify(newVoucher),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(IP + `/admin/api/category`, options);
    const data = await res.json();
    return {
      newVoucher: newVoucher,
      data: data,
    };
  }
);
export const deleteVoucher = createAsyncThunk(
  "voucher/deleteVoucher",
  async (id) => {
    const token = getUser().token
    console.log(id);
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await fetch(IP + `/admin/api/voucher?id=` + id, options);
    const data = await res.json();
    console.log(data)
    return {
      id: id,
      data: data,
    };
  }
);
export const saveUserVoucher = createAsyncThunk(
  "voucher/saveUserVoucher",
  async (id) => {
    const token = getUser().token
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await fetch(IP + `/api/user/voucher?idVoucher=${id}`, options);
    const data = await res.json();
    return data;
  }
);
export const fetchUserVoucher = createAsyncThunk(
  "voucher/fetchUserVoucher",
  async () => {
    const token = getUser().token
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await fetch(IP + `/api/user/vouchers`, options);
    const data = await res.json();
    console.log(data)
    return data;
  }
);

export default voucherSlice;
