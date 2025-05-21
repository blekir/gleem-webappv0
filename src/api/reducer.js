import { Middleware } from "redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import global from "../state/global";
import auth from "../state/auth";

import { apiSlice } from "./apiSlice";

const persistConfig = {
  key: "root",
  storage,
  // Optionally, you can whitelist specific reducers to be persisted
  whitelist: ["authentication", "global"],
};

// const persistedReducer = persistReducer(
//   persistConfig,
//   combineReducers({
//     global,
//     authentication: auth,
//     generate: generate,
//     [apiSlice.reducerPath]: apiSlice.reducer,
//   })
// );

const rootReducer = combineReducers({
  global,
  authentication: auth,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const rootReducerWithReset = (state, action) => {
  if (action.type === "RESET_STATE") {
    state = undefined; // Clear the state completely
  }
  return rootReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducerWithReset);

const redirectMiddleware = (store) => (next) => (action) => {
  if (action.type === "RESET_STATE" || action.type === "LOGOUT") {
    console.log("RESET");
    // window.location.href = '/login'; // Force redirect to login page
  }

  return next(action);
};

export const STORE = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          REGISTER,
          "RESET_STATE",
          "LOGOUT",
        ],
      },
    }).concat(redirectMiddleware, apiSlice.middleware),
});

export const PERSISTOR = persistStore(STORE);
