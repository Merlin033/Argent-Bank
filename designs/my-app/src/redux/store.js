import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import authReducer from './Reducers/AuthReducer'
import ProfileUserReducer from './Reducers/ProfileUserReducer'
import { apiSlice } from '../service/apiSlice'

// persisting the store
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  auth: authReducer,
  profile: ProfileUserReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
});
