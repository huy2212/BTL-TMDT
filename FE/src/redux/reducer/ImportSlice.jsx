import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { IP } from "../../config/const";
const getUser = () => {
  const user = JSON.parse(localStorage.getItem("authorization"))
  return user
}
const ImportSlice = createSlice({
  name: "import",
  initialState: {
    itemInvoices: [],
    invoices: [],
    invoiceDetails:{}
  },
  reducers: {
    resetAlert: (state, action) => {
      state.alert = action.payload
    },
    addToInvoice: (state, action) => {
      state.itemInvoices.push(action.payload)
    },
    deleteFromInvoice:(state, action) => {
      const items = current(state.itemInvoices)
      state.itemInvoices = items.filter((item)=> item.id!==action.payload)
    },
    editInvoice:(state, action) => {
      const items = current(state.itemInvoices)
      state.itemInvoices = items.map((item)=> {
        if(item.id === action.payload.id) return action.payload
        return item
      })
      
    }
  },
  extraReducers:(buider)=>{
    buider
    .addCase(importSupply.fulfilled,(state,action)=>{
      state.itemInvoices = []
      const arrResult = action.payload
      const check = !arrResult.some((result) => result.code ==0)
      if(check) state.alert ={
        code: 1,
        message: "Nhập hàng thành công"
      } 
    })
    .addCase(fetchInvoices.fulfilled,(state,action)=>{
      state.invoices = action.payload.reverse()
    })
    .addCase(getInvoiceById.fulfilled,(state,action)=>{
      state.invoiceDetails = action.payload
    })
  }
});
export const importSupply = createAsyncThunk('import/importSupply', 
  async (importInfo)=>{
  const token = getUser().token
    const res = await fetch(`${IP}/api/item/import`, {
      method:"PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(importInfo)
    });
    const data = await res.json();
    console.log(data)
    return data;
})
export const fetchInvoices = createAsyncThunk('import/fetchInvoices',
  async()=>{
    const token = getUser().token
    const res = await fetch(`${IP}/api/invoices`,{
      method:"POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({start:"",end:""})
    })
    const data = await res.json()
    return data
  }
)
export const getInvoiceById = createAsyncThunk('import/getInvoiceById',
  async(id)=>{
      const token = getUser().token
      const res = await fetch(`${IP}/api/invoice?invoiceId=${id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": 'application/json'
        },
      })
      const data = await res.json()
      return data
  }
)
export default ImportSlice;
