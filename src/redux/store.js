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

/*
🧠 What is Serializable Middleware?
Serializable Middleware (specifically serializableCheck) is part of the default middleware that Redux Toolkit provides.

Its job is to:

Warn you if you put non-serializable values in your Redux actions or state.

Why? Because Redux expects:

Actions = plain JS objects (serializable)

State = serializable JSON-like data

⚠️ Why is this important?
If your action or state includes things like:

Date objects

class instances

Map, Set

window, localStorage, etc.

You might:

Break time-travel debugging

Break Redux dev tools

Corrupt state on rehydration (e.g., with redux-persist)

So serializableCheck helps you catch these bugs early.
*/
