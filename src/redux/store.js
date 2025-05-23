// import { configureStore } from "@reduxjs/toolkit";
// import { postApi } from "../API/postapi";

/*
const store = configureStore({
  reducer: {
    users: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ["users.nonSerializable"], // pass that error in array which shown in console in `` that
      },
    }).concat(logger),
});
*/
/*
const store = configureStore({
  reducer: {
    [postApi.reducerPath]: postApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postApi.middleware),
});
export default store;
*/
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

import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import rootReducer from "./rootReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["users"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

const persistor = persistStore(store);
export { store, persistor };
