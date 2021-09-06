import { combineReducers } from "redux";
import { ProductReducer } from "../reducers/product";

const rootReducer = combineReducers({
  product: ProductReducer,
});

export default rootReducer;
