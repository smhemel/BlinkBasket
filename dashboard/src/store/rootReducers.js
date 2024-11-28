import authReducer from "./Reducers/authReducer";
import chatReducer from "./Reducers/chatReducer";
import orderReducer from "./Reducers/orderReducer";
import bannerReducer from "./Reducers/bannerReducer";
import sellerReducer from "./Reducers/sellerReducer";
import paymentReducer from "./Reducers/paymentReducer";
import productReducer from "./Reducers/productReducer";
import categoryReducer from "./Reducers/categoryReducer";
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
    banner: bannerReducer
};

export default rootReducer;