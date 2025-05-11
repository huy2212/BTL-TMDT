import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { IP } from "../../config/const";
import { notify } from "../../components/Admin/notify";
const getUser = () => {
  const user = JSON.parse(localStorage.getItem("authorization"))
  return user
}
const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    orderDetails: {}
  },
  reducers: {
  
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderStatus = action.payload.data
        console.log(action.payload.data)
        if (action.payload.paymentId === 1) {
          if(action.payload.data.code ===1 ) window.location.href = "http://localhost:3000/orderSuccess"
          else notify(action.payload.data.message,action.payload.data.code)
        }
        
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.orders = action.payload
        console.log(action.payload.reverse())
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.orderDetails = action.payload
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const result = action.payload
        state.alert = result.data
        let newOrders = current(state.orders)
        console.log(result)
        if (result.data.code == 1) {
          state.orders = newOrders.map((order) => {
            if (order.id === result.orderId) return {
              ...order,
              statusOrder: result.newStatus
            }
            return order
          })
        }
      })
  },
});

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async ({ orderParams, orderBody }) => {
    console.log(orderBody)
    const token = getUser().token
    const res = await fetch(`${IP}/api/order?vnp_BankTranNo=${orderParams.payment === 1 ? `shipcode` : orderParams.vnp_BankTranNo}&vnp_OrderInfo=${orderParams.vnp_OrderInfo ?? ""}&vnp_ResponseCode=${orderParams.vnp_ResponseCode ?? ""}&vnp_TransactionStatus=${orderParams.vnp_TransactionStatus ?? ""}&shipmentId=${parseInt(orderParams.shipment)}&paymentId=${orderParams.payment}&voucherId=${orderParams.voucher ?? ""}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(orderBody)
    });
    const data = await res.json();
    console.log(data)
    return {
      paymentId: orderParams.payment,
      data: data
    };
  }
);

export const fetchOrder = createAsyncThunk(
  "order/fetchOrderOfUser",
  async (status) => {
    const token = getUser().token
    const res = await fetch(`${IP}/api/orders?status=${status?status:""}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": 'application/json'
      },
    });
    const data = await res.json();
    return data;
  }
);
export const getOrderById = createAsyncThunk(
  "order/getOrderById",
  async (orderId) => {
    const token = getUser().token
    const res = await fetch(`${IP}/api/order?orderId=${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": 'application/json'
      },
    });
    const data = await res.json();
    return data;
  }
);

export const updateOrderStatus = createAsyncThunk('order/updateOrderStatus',
  async ({ status, cancel, orderId }) => {
    const token = getUser().token
    const res = await fetch(`${IP}/api/order?status=${status}&cancel=${cancel}&orderId=${orderId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": 'application/json'
      },
    });
    const data = await res.json();
    console.log(data)
    return {
      orderId: orderId,
      newStatus: getStatus(status),
      data: data
    }
  }
)

const getStatus = (statusNumber) => {
  switch (statusNumber) {
    case 0:
      return "Đang xử lý";
    case 1:
      return "Đã nhận đơn";
    case 2:
      return "Đang vận chuyển";
    case 3:
      return "Đã nhận hàng";
    case 4:
      return "Đã hủy đơn";
  }
}
export default orderSlice;
