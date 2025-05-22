import { configureStore } from "@reduxjs/toolkit";

import { logger } from "../middlewares/logger";

import userReducer from "./slices/Users.slice";

const store = configureStore({
  reducer: {
    users: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
