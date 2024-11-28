import api from "../../api/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
 
export const get_seller_payment_details = createAsyncThunk(
    'payment/get_seller_payment_details',
    async(sellerId, {rejectWithValue, fulfillWithValue}) => { 
        try { 
            const {data} = await api.get(`/payment/seller-payment-details/${sellerId}`, {withCredentials: true});
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
 
 
export const paymentReducer = createSlice({
    name: 'payment',
    initialState:{
        successMessage :  '',
        errorMessage : '',
        loader: false,
        pendingWithdrows : [], 
        successWithdrows: [], 
        totalAmount: 0,
        withdrowAmount: 0,
        pendingAmount: 0,
        availableAmount: 0,
    },
    reducers : {
        messageClear : (state,_) => {
            state.errorMessage = "";
            state.successMessage = "";
        }
    },
    extraReducers: (builder) => {
       builder
       .addCase(get_seller_payment_details.fulfilled, (state, { payload }) => {
        state.pendingWithdrows = payload.pendingWithdrows;
        state.successWithdrows = payload.successWithdrows;
        state.totalAmount = payload.totalAmount;
        state.availableAmount = payload.availableAmount;
        state.withdrowAmount = payload.withdrowAmount;
        state.pendingAmount = payload.availableAmount; 
    })
    }
})

export const {messageClear} = paymentReducer.actions;
export default paymentReducer.reducer;