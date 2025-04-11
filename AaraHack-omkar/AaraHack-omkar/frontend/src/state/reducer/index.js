import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import categorySlice from "./categorySlice";
import productSlice from "./productSlice";

const rootReducer = combineReducers({
  user: userSlice,
  category: categorySlice,
    product: productSlice,
});

export default rootReducer;