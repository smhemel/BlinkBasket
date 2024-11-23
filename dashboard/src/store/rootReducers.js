import authReducer from "./Reducers/authReducer";
import chatReducer from "./Reducers/chatReducer";
import sellerReducer from "./Reducers/sellerReducer";
import productReducer from "./Reducers/productReducer";
import categoryReducer from "./Reducers/categoryReducer";

const rootReducer = {
    auth: authReducer,
    category: categoryReducer,
    product: productReducer,
    seller: sellerReducer,
    chat: chatReducer
};

export default rootReducer;