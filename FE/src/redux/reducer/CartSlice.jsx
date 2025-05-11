import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { IP } from "../../config/const";

const getUser = () => {
    const user = JSON.parse(localStorage.getItem("authorization"))
    return user
}
const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [],
        preOrder: JSON.parse(sessionStorage.getItem("preOrder"))??[]
    },
    reducers: {
        resetAlert: (state, action) => {
            state.alert = action.payload
        },
        resetPreOrder: (state, action) => {
            state.preOrder = []
        },
        updatePreOrder: (state,action) =>{
            const cartItemId = action.payload.cartItemId
            let order = JSON.parse(sessionStorage.getItem("preOrder"))??[]
            const check = order.find((item)=> item.cartItemId === cartItemId)
            if(check){
                order = order.filter((item) => item.cartItemId!==cartItemId)
            }
            else order.push(action.payload)
            console.log(order)
            state.preOrder = order
            sessionStorage.setItem("preOrder",JSON.stringify(order))
        },
        updateQuantityPreOrder:(state,action)=>{
            const cartItemId = action.payload.cartItemId
            console.log(action.payload)
            let order = [...current(state.preOrder)]
            order = order.map((item)=>{
                if(item.cartItemId===cartItemId) {
                    console.log(item)
                    return {...item,quantity:action.payload.quantity,totalPrice:action.payload.price * action.payload.quantity}
                }
                else return item
            })
            state.preOrder = order
            sessionStorage.setItem("preOrder",JSON.stringify(order))
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartItem.fulfilled, (state, action) => {
                const cartItems = action.payload
                
                state.cartItems = cartItems.map(item => {
                    let tmpStructure = {
                        cartItemId: item.id,
                        quantity: item.quantity,
                        totalPrice: item.totalPrice,
                        name: item.productName,
                        image: item.images[0].path,
                        price: item.productItemDetail.at(-1).price,
                        details: item.productItemDetail,
                        itemId: item.productItemDetail.at(-1).productItemId
                    }
                    return tmpStructure
                })
            })
            .addCase(addItemToCart.fulfilled, (state, action) => {
                const item = action.payload.itemInfo
                console.log(item)
                let cartItem = {
                    cartItemId: item.id,
                    quantity: item.quantity,
                    totalPrice: item.totalPrice,
                    name: item.productName,
                    image: item.images[0].path,
                    price: item.productItemDetail.at(-1).price,
                    details: item.productItemDetail,
                    itemId: item.productItemDetail.at(-1).productItemId
                }
                const cartItems = current(state.cartItems)
                const index =cartItems.find(item => item.itemId === cartItem.itemId)
                if (!index) state.cartItems.push(cartItem)
                else {
                    state.cartItems = cartItems.map(item => {
                        if (item.itemId === cartItem.itemId) return cartItem
                        return item
                    })
                }
                state.alert = action.payload.alert
            })
            .addCase(updateCartItem.fulfilled, (state, action) => {
                const item = action.payload.itemInfo
                let cartItem = {
                    cartItemId: item.id,
                    quantity: item.quantity,
                    totalPrice: item.totalPrice,
                    name: item.productName,
                    image: item.images[0].path,
                    price: item.productItemDetail.at(-1).price,
                    details: item.productItemDetail,
                    itemId: item.productItemDetail.at(-1).productItemId
                }
                state.cartItems= state.cartItems.map(item => {
                    if (item.cartItemId === cartItem.cartItemId) return cartItem
                    return item
                })
            })
            .addCase(deleteCartItem.fulfilled, (state, action) => {
                state.cartItems = state.cartItems.filter(item => item.cartItemId !== action.payload.id)
            })

    }
})

export const fetchCartItem = createAsyncThunk("cart/fetchCartItem", async () => {
    const token = getUser().token
    const options = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    const res = await fetch(`${IP}/api/carts`, options)
    const data = await res.json()
    return data
})
export const addItemToCart = createAsyncThunk("cart/addItemToCart", async (cartItem) => {
    const token = getUser().token
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cartItem)
    }
    const res = await fetch(`${IP}/customer/api/cart`, options)
    const data = await res.json()
    return {
        alert: {
            code: data.code,
            message: data.message
        },
        itemInfo: data.cartItem
    }
})
export const updateCartItem = createAsyncThunk("cart/updateCartItem", async (cartItem) => {
    const token = getUser().token
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }
    const res = await fetch(`${IP}/customer/api/cart?cartItemId=${cartItem.cartItemId}&quantity=${cartItem.quantity}`, options)
    const data = await res.json()
    return {
        alert: {
            code: data.code,
            message: data.message
        },
        itemInfo: data.cartItem
    }
})
export const deleteCartItem = createAsyncThunk("cart/deleteCartItem", async (id) => {
    const token = getUser().token
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }
    const res = await fetch(`${IP}/customer/api/cart?cartItemId=${id}`, options)
    const data = await res.json()
    return {
        alert: data,
        id: id
    }
})
export default cartSlice