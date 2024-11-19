import api from "../../api/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const get_category = createAsyncThunk(
    'product/get_category',
    async(_, { fulfillWithValue }) => {
        try {
            const {data} = await api.get('/home/get-categories');

            return fulfillWithValue(data);
        } catch (error) {
            
        }
    }
)

export const get_products = createAsyncThunk(
    'product/get_products',
    async(_, { fulfillWithValue }) => {
        try {
            const {data} = await api.get('/home/get-products');

            return fulfillWithValue(data);
        } catch (error) {

        }
    }
)

export const homeReducer = createSlice({
    name: 'home',
    initialState:{
        categories: [],
        products : [],
        latest_product : [],
        topRated_product : [],
        discount_product : []
    },
    reducers: {
 
    },
    extraReducers: (builder) => {
        builder
        .addCase(get_category.fulfilled, (state, { payload }) => {
            state.categories = payload.categories;
        })
        .addCase(get_products.fulfilled, (state, { payload }) => {
            state.products = payload.products;
            state.latest_product = payload.latest_product;
            state.topRated_product = payload.topRated_product;
            state.discount_product = payload.discount_product;
        })
    }
})

export default homeReducer.reducer;