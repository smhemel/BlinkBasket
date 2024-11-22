import api from "../../api/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
 
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