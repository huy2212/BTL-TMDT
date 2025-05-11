import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IP } from "../../config/const";
const getUser = () => {
  const user = JSON.parse(localStorage.getItem("authorization"))
  return user
}
const willistSlice = createSlice({
  name: "willist",
  initialState: {
    willist: [],
    viewed:[],
  },
  reducers: {
    resetAlert: (state, action) => {
      state.alert = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToWillist.fulfilled, (state, action) => {
        console.log(action.payload)
        state.alert = action.payload.data
      })
      .addCase(fetchWillist.fulfilled,(state,action)=>{
        state.willist = action.payload
      })
  },
});

export const fetchWillist = createAsyncThunk(
  "willist/fetchWillist",
  async () => {
    const token = getUser().token
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await fetch(IP + "/api/item/favorite/view?favorite=1&viewed=",options);
    const data = await res.json();
    return data;
  }
);
export const addToWillist = createAsyncThunk(
  "willist/addToWillist",
  async (item) => {
    const token = getUser().token
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await fetch(IP + "/api/item/favorite?itemId=" + item.productId,options);
    const data = await res.json();
    return {
      data: data,
      item: item
    };
  }
);
export default willistSlice