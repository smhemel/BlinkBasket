import authReducer from "./Reducers/authReducer";
import chatReducer from "./Reducers/chatReducer";
import orderReducer from "./Reducers/orderReducer";
import sellerReducer from "./Reducers/sellerReducer";
import productReducer from "./Reducers/productReducer";
import categoryReducer from "./Reducers/categoryReducer";
import paymentReducer from "./Reducers/paymentReducer";
import dashboardReducer from "./Reducers/dashboardReducer";

const rootReducer = {
    auth: authReducer,
    category: categoryReducer,
    product: productReducer,
    seller: sellerReducer,
    chat: chatReducer,
    order: orderReducer,
    payment: paymentReducer,
    dashboard: dashboardReducer,
};

export default rootReducer;