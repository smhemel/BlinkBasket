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

export const send_message = createAsyncThunk(
    'chat/send_message',
    async(info, {rejectWithValue, fulfillWithValue}) => {
        try {
            const {data} = await api.post(`/chat/seller/send-message-to-customer`, info, {withCredentials: true});
            return fulfillWithValue(data);
        } catch (error) { 
            return rejectWithValue(error.response.data);
        }
    }
)

export const get_sellers = createAsyncThunk(
    'chat/get_sellers',
    async(_, {rejectWithValue, fulfillWithValue}) => {
        try {
            const {data} = await api.get(`/chat/admin/get-sellers`, {withCredentials: true});
            return fulfillWithValue(data);
        } catch (error) { 
            return rejectWithValue(error.response.data);
        }
    }
)

export const send_message_seller_admin = createAsyncThunk(
    'chat/send_message_seller_admin',
    async(info, {rejectWithValue, fulfillWithValue}) => {
        try {
            const {data} = await api.post(`/chat/message-send-seller-admin`, info, {withCredentials: true});
            return fulfillWithValue(data);
        } catch (error) { 
            return rejectWithValue(error.response.data);
        }
    }
)

export const get_admin_message = createAsyncThunk(
    'chat/get_admin_message',
    async(receiverId, {rejectWithValue, fulfillWithValue}) => {
        try {
            const {data} = await api.get(`/chat/get-admin-messages/${receiverId}`, {withCredentials: true});
            return fulfillWithValue(data);
        } catch (error) { 
            return rejectWithValue(error.response.data);
        }
    }
)

export const get_seller_message = createAsyncThunk(
    'chat/get_seller_message',
    async(receiverId, {rejectWithValue, fulfillWithValue}) => {
        try {
            const {data} = await api.get(`/chat/get-seller-messages`, {withCredentials: true});
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
        },
        updateMessage: (state, {payload}) => {
            state.messages = [...state.messages, payload];
        },
        updateSellers: (state, {payload}) => {
            state.activeSeller = payload;
        },
        updateCustomer: (state, {payload}) => {
            state.activeCustomer = payload;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(get_customers.fulfilled, (state, { payload }) => { 
            state.customers = payload.customers;
        })
        .addCase(get_customer_message.fulfilled, (state, { payload }) => { 
            state.messages = payload.messages;
            state.currentCustomer = payload.currentCustomer;
        })
        .addCase(send_message.fulfilled, (state, { payload }) => { 
            let tempFriends = state.customers;
            let index = tempFriends.findIndex(f => f.fdId === payload.message.receiverId);
            while (index > 0) {
                let temp = tempFriends[index];
                tempFriends[index] = tempFriends[index - 1];
                tempFriends[index - 1] = temp;
                index--;
            }

            state.customers = tempFriends;
            state.messages = [...state.messages, payload.message];
            state.successMessage = 'Message Send Success';
        })
        .addCase(get_sellers.fulfilled, (state, { payload }) => { 
            state.sellers = payload.sellers;
        })
        .addCase(send_message_seller_admin.fulfilled, (state, { payload }) => { 
            state.seller_admin_message = [...state.seller_admin_message, payload.message];  
            state.successMessage = 'Message Send Success';
        })
        .addCase(get_admin_message.fulfilled, (state, { payload }) => { 
            state.seller_admin_message = payload.messages;
            state.currentSeller = payload.currentSeller;
        })
    }
})

export const {messageClear, updateMessage, updateSellers, updateCustomer} = chatReducer.actions;
export default chatReducer.reducer;