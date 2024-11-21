import api from "../../api/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const place_order = createAsyncThunk(
    'card/place_order',
    async({price, products, shipping_fee, items, shippingInfo, userId, navigate}) => {
        try {
            const { data } = await api.post('/home/order/place-order', {
                price, products, shipping_fee, items, shippingInfo, userId, navigate
            });

            navigate('/payment', {
                state: {
                    price: price + shipping_fee,
                    items,
                    orderId: data.orderId 
                }
            });
        } catch (error) {
            
        }
        
    }
)

 
export const orderReducer = createSlice({
    name: 'order',
    initialState:{
        myOrders : [], 
        errorMessage : '',
        successMessage: '',  
        myOrder : {},
    },
    reducers : {
        messageClear : (state, _) => {
            state.errorMessage = "";
            state.successMessage = "";
        }
 
    },
    extraReducers: (builder) => {
        
        
    }
})

export const {messageClear} = orderReducer.actions;
export default orderReducer.reducer;