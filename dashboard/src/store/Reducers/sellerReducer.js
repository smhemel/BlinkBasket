import api from "../../api/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
 
export const get_seller_request = createAsyncThunk(
    'seller/get_seller_request',
    async({parPage, page, searchValue}, {rejectWithValue, fulfillWithValue}) => {
        try {
            const {data} = await api.get(`/request-seller-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,{withCredentials: true});

            return fulfillWithValue(data);
        } catch (error) {

            return rejectWithValue(error.response.data);
        }
    }
)
 
export const sellerReducer = createSlice({
    name: 'seller',
    initialState:{
        successMessage :  '',
        errorMessage : '',
        loader: false,
        sellers : [], 
        totalSeller: 0
    },
    reducers : {
        messageClear : (state,_) => {
            state.errorMessage = ""
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(get_seller_request.fulfilled, (state, { payload }) => {
            state.sellers = payload.sellers;
            state.totalSeller = payload.totalSeller;
        })
    }
})

export const {messageClear} = sellerReducer.actions;
export default sellerReducer.reducer;