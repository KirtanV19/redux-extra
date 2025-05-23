import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/Users.slice";
import { postApi } from "../API/postapi";

const rootReducer = combineReducers({
  users: userReducer,
  [postApi.reducerPath]: postApi.reducer,
});

export default rootReducer;
