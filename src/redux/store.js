import { configureStore } from "@reduxjs/toolkit";

import { logger } from "../middlewares/logger";

import userReducer from "./slices/Users.slice";

const store = configureStore({
  reducer: {
    users: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ["users.nonSerializable"], // pass that v=error in array which shown in console in `` that
      },
    }).concat(logger),
});

export default store;
