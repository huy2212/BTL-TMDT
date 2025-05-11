import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IP } from "../../config/const";
import { notify } from "../../components/Admin/notify";
const getUser = () => {
  const user = JSON.parse(localStorage.getItem("authorization"))
  return user
}
const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    payments: [],
    choosenPayment: JSON.parse(sessionStorage.getItem("choosenPayment")) ?? null
  },
  reducers: {
    updatePayment: (state, action) => {
      const payment = action.payload
      state.choosenPayment = action.payload
      sessionStorage.setItem("choosenPayment",JSON.stringify(payment))
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayment.fulfilled, (state, action) => {
        state.payments = action.payload;
      })
      .addCase(getVNPay.fulfilled,(state,action) =>{
        if(action.payload.code===1) window.location.href = action.payload.url
        else {
          console.log(action.payload)
        }
      }) 
  },
});

export const fetchPayment = createAsyncThunk(
  "payment/fetchPayment",
  async () => {
    const res = await fetch(IP + "/customer/api/payments");
    const data = await res.json();
    return data;
  }
);
export const getVNPay = createAsyncThunk("payment/getVNPay",
  async (billInfo)=>{
    console.log(billInfo)
    const token = getUser().token
    console.log(IP + "/api/payment/online")
    const res = await fetch(IP + "/api/payment/online", {
      method:"POST",
      mode:"cors",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type":"application/json;charset=utf-8"
      },
      body: JSON.stringify(billInfo)
    });
    const data = await res.json()
    return data
  }
)
export default paymentSlice;
