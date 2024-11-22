import authReducer from "./reducers/authReducer";
import homeReducer from "./reducers/homeReducer";
import cardReducer from "./reducers/cardReducer";
import chatReducer from "./reducers/chatReducer";
import orderReducer from "./reducers/orderReducer";
import dashboardReducer from "./reducers/dashboardReducer";

const rootReducer = {
    home: homeReducer,
    auth: authReducer,
    card: cardReducer,
    order: orderReducer,
    dashboard: dashboardReducer,
    chat: chatReducer
}

export default rootReducer;