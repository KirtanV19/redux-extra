import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/Users.slice";
const rootReducer = combineReducers({
  users: userReducer,
});

export default rootReducer;
