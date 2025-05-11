import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IP } from "../../config/const";
const getUser = () => {
  const user = JSON.parse(localStorage.getItem("authorization"))
  return user
}
const shipmentSlice = createSlice({
  name: "shipment",
  initialState: {
    shipments: [],
    choosenShipment: JSON.parse(sessionStorage.getItem("choosenShipment")) ?? null
  },
  reducers: {
    updateShipment: (state, action) => {
      const shipment = action.payload
      state.choosenShipment = action.payload
      sessionStorage.setItem("choosenShipment",JSON.stringify(shipment))
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShipment.fulfilled, (state, action) => {
        state.shipments = action.payload;
      })
  },
});

export const fetchShipment = createAsyncThunk(
  "shipment/fetchShipment",
  async () => {
    const res = await fetch(IP + "/customer/api/shipments");
    const data = await res.json();
    return data;
  }
);
export default shipmentSlice;
