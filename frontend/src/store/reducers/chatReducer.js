import api from "../../api/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const add_friend = createAsyncThunk(
    'chat/add_friend',
    async(info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const {data} = await api.post('/chat/customer/add-customer-friend', info);
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
 
export const chatReducer = createSlice({
    name: 'chat',
    initialState:{
        my_friends: [],
        fb_messages : [],
        currentFd: "",
        errorMessage : '',
        successMessage: '', 
    },
    reducers : {
        messageClear : (state,_) => {
            state.errorMessage = ""
            state.successMessage = ""
        }
    },
    extraReducers: (builder) => {
       
    }
})

export const {messageClear} = chatReducer.actions;
export default chatReducer.reducer;