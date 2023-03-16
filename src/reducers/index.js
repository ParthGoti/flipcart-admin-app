import { combineReducers } from "redux";
import authReducers from "./auth.reducers";
import userReducers from "./user.reducers";
import categoryReducers from "./category.reducers";
import productReducers from "./product.reducers";
import orderReducders from "./order.reducers";
import pageReducders from "./page.reducers";

const rootReducer = combineReducers({
  auth: authReducers,
  user: userReducers,
  product: productReducers,
  category: categoryReducers,
  page: pageReducders,
  order: orderReducders,
});

export default rootReducer;
