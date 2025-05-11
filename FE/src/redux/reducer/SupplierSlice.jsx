import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IP } from "../../config/const";
const getUser = () => {
  const user = JSON.parse(localStorage.getItem("authorization"))
  return user
}
const supplierSlice = createSlice({
  name: "supplier",
  initialState: {
    suppliers: [],
    currentSetSupplier: {
      id: "",
      name: "",
      description: "",
      phoneNumber:""
    }
  },
  reducers: {
    resetAlert: (state, action) => {
      state.alert = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSupplier.fulfilled, (state, action) => {
        state.suppliers = action.payload;
      })
      .addCase(getSupplierById.fulfilled, (state, action) => {
        console.log(action.payload)
        state.currentSetSupplier = action.payload;
      })
      .addCase(addSupplier.fulfilled, (state, action) => {
        state.alert = action.payload;
        state.suppliers.push(action.payload.supplier)
      })
      .addCase(editSupplier.fulfilled, (state, action) => {
        state.alert = action.payload.data;
        state.suppliers = state.suppliers.map((supplier) => {
          if (supplier.id === action.payload.newSupplier.id) {
            return action.payload.newSupplier;
          }
          return supplier;
        });
      })
      .addCase(deleteSupplier.fulfilled, (state, action) => {
        state.alert = action.payload.data;
        state.suppliers = state.suppliers.filter(
          (supplier) => supplier.id !== action.payload.id
        );
      });
  },
});

export const fetchSupplier = createAsyncThunk(
  "supplier/fetchSupplier",
  async () => {
    const token = getUser().token
    const res = await fetch(IP + "/api/suppliers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data;
  }
);
export const getSupplierById = createAsyncThunk(
  "supplier/getSupplierById",
  async (id) => {
    const token = getUser().token
    if (id === -1)
      return {
        id: "",
        name: "",
        description: "",
        phoneNumber:""
      };
    const res = await fetch(IP + `/api/supplier?id=` + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log(data)
    return data;
  }
);
export const addSupplier = createAsyncThunk(
  "supplier/addSupplier",
  async (newSupplier) => {
    const token = getUser().token
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSupplier),
    };
    const res = await fetch(IP + `/api/supplier`, options);
    const data = await res.json();
    return data;
  }
);
export const editSupplier = createAsyncThunk(
  "supplier/editSupplier",
  async (newSupplier) => {
    const token = getUser().token
    const options = {
      method: "PUT",
      body: JSON.stringify(newSupplier),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(IP + `/api/supplier`, options);
    const data = await res.json();
    return {
      newSupplier: newSupplier,
      data: data,
    };
  }
);
export const deleteSupplier = createAsyncThunk(
  "supplier/deleteSupplier",
  async (id) => {
    const token = getUser().token
    console.log(id);
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await fetch(IP + `/api/supplier?id=` + id, options);
    const data = await res.json();
    return {
      id: id,
      data: data,
    };
  }
);
export default supplierSlice;
