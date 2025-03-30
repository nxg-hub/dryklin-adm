import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import orderReducer from "./OrderMangementSlice";
import selectedOrder from "./OrderSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["selectedOrder"],
};

const rootReducer = combineReducers({
  orderManagement: orderReducer,
  selectedOrder,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
