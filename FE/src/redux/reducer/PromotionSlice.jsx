import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IP } from "../../config/const";
const getUser = () => {
    const user = JSON.parse(localStorage.getItem("authorization"))
    return user
}
const promotionSlice = createSlice({
    name: "promotion",
    initialState: {
        promotions: [],
        currentSetPromotion: {
            "id": null,
            "content": "",
            "dateStart": "",
            "dateEnd": "",
            "discount": 0,
            "deleted": 0,
            "pathImage": "",
            "idItems": [],
            "idItemsRemove": [],
            "items": []
        },
    },
    reducers: {
        saveTmp: (state,action)=>{
            state.currentSetPromotion = action.payload
        },
        resetAlert: (state, action) => {
            state.alert = action.payload
          },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPromotion.fulfilled, (state, action) => {
                state.promotions = action.payload;
            })
            .addCase(getPromtionById.fulfilled, (state, action) => {
                state.currentSetPromotion = action.payload;
            })
            .addCase(addPromotion.fulfilled, (state, action) => {
                state.alert = {
                    code: action.payload.code,
                    message: action.payload.message
                }
                state.promotions.push(action.payload.promotion)
            })
            .addCase(editPromotion.fulfilled, (state, action) => {
                console.log(action.payload)
                state.alert = {
                    code: action.payload.code,
                    message: action.payload.message
                }
                state.promotions = state.promotions.map((promotion) => {
                    if (promotion.id === action.payload.promotion.id) {
                        return action.payload.promotion;
                    }
                    return promotion;
                });
            })
            .addCase(deletePromotion.fulfilled, (state, action) => {
                state.alert = action.payload.data;
                state.promotions = state.promotions.filter(
                    (promotion) => promotion.id !== action.payload.id
                );
            });
    },
});

export const fetchPromotion = createAsyncThunk(
    "promotion/fetchPromotion",
    async () => {
        const token = getUser().token
        const res = await fetch(IP + "/admin/api/promotions", {
            method:"GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        const data = await res.json();
        console.log(data)
        return data;
    }
);
export const getPromtionById = createAsyncThunk(
    "promotion/getPromtionById",
    async (id) => {
        const token = getUser().token
        if (id === -1)
            return {
                "id": null,
                "content": "",
                "dateStart": "",
                "dateEnd": "",
                "discount": 0,
                "deleted": 0,
                "pathImage": "",
                "idItems": [],
                "idItemsRemove": [],
                "items": []
            };
        const res = await fetch(IP + `/admin/api/promotion?id=` + id, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await res.json();
        return data.message;
    }
);
export const addPromotion = createAsyncThunk(
    "promotion/addPromotion",
    async (newPromotion) => {
        const token = getUser().token
        const options = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPromotion),
        };
        const res = await fetch(IP + `/admin/api/promotion`, options);
        const data = await res.json();
        return data;
    }
);
export const editPromotion = createAsyncThunk(
    "promotion/editPromotion",
    async (newPromotion) => {
        const token = getUser().token
        const options = {
            method: "PUT",
            body: JSON.stringify(newPromotion),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        };
        const res = await fetch(IP + `/admin/api/promotion`, options);
        const data = await res.json();
        return data
    }
);
export const deletePromotion = createAsyncThunk(
    "promotion/deletePromotion",
    async (id) => {
        console.log(id);
        const token = getUser().token
        const options = {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const res = await fetch(IP + `/admin/api/promotion?id=` + id, options);
        const data = await res.json();
        return {
            id: id,
            data: data,
        };
    }
);
export default promotionSlice;
