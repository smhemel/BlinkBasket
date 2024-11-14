import authReducer from "./Reducers/authReducer";
import productReducer from "./Reducers/productReducer";
import categoryReducer from "./Reducers/categoryReducer";

const rootReducer = {
    auth: authReducer,
    category: categoryReducer,
    product: productReducer
};

export default rootReducer;