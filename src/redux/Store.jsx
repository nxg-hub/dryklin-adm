import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import userReducer from './UserSlice'
import walletReducer from './WalletSlice'
const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    'user',
    'wallet'
  ],
};

const rootReducer = combineReducers({
  user: userReducer,
  wallet: walletReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;
