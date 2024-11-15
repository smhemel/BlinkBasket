import authReducer from "./Reducers/authReducer";
import sellerReducer from "./Reducers/sellerReducer";
import productReducer from "./Reducers/productReducer";
import categoryReducer from "./Reducers/categoryReducer";

const rootReducer = {
    auth: authReducer,
    category: categoryReducer,
    product: productReducer,
    seller: sellerReducer
};

export default rootReducer;