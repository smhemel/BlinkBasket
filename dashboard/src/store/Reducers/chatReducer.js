import api from "../../api/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const get_customers = createAsyncThunk(
    'chat/get_customers',
    async(sellerId, {rejectWithValue, fulfillWithValue}) => {
        try {
            const {data} = await api.get(`/chat/seller/get-customers/${sellerId}`, {withCredentials: true});
            return fulfillWithValue(data);
        } catch (error) { 
            return rejectWithValue(error.response.data);
        }
    }
)

export const get_customer_message = createAsyncThunk(
    'chat/get_customer_message',
    async(customerId, {rejectWithValue, fulfillWithValue}) => {
        try {
            const {data} = await api.get(`/chat/seller/get-customer-message/${customerId}`, {withCredentials: true});
            return fulfillWithValue(data);
        } catch (error) { 
            return rejectWithValue(error.response.data);
        }
    }
)
 
export const chatReducer = createSlice({
    name: 'chat',
    initialState:{
        successMessage:  '',
        errorMessage: '',
        activeAdmin: '',
        friends: [],
        sellers: [],
        messages: [],
        customers: [],
        activeSeller: [],
        activeCustomer: [],
        seller_admin_message: [],
        currentCustomer: {},
        currentSeller: {},
    },
    reducers : {
        messageClear : (state,_) => {
            state.errorMessage = "";
            state.successMessage = "";
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(get_customers.fulfilled, (state, { payload }) => { 
            state.customers = payload.customers;
        })
        .addCase(get_customer_message.fulfilled, (state, { payload }) => { 
            state.messages = payload.messages 
            state.currentCustomer = payload.currentCustomer 
        }) 
    }
})

export const {messageClear} = chatReducer.actions;
export default chatReducer.reducer;