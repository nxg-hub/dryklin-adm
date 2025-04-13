import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import userReducer from "./UserSlice";
import walletReducer from "./WalletSlice";
import orderReducer from "./OrderMangementSlice";
import selectedOrder from "./OrderSlice";
import adminReducer from "./LoggedInAdminSlice";
import subadminReducer from "./Sub-adminSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "selectedOrder", "wallet", "admin", "subadmin"],
};

const rootReducer = combineReducers({
  user: userReducer,
  wallet: walletReducer,
  admin: adminReducer,
  orderManagement: orderReducer,
  selectedOrder,
  subadmin: subadminReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;
