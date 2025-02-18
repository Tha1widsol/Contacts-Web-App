import {configureStore} from "@reduxjs/toolkit"
import {combineReducers} from "redux"
import contactsReducer from "./features/contactsSlice"
import storage from "redux-persist/lib/storage"
import {
    persistReducer
  } from "redux-persist"

  const persistConfig = {
    key: "root",
    version: 1,
    storage,
  }

  const reducers = combineReducers({
    contacts: contactsReducer
   })

   const persistedReducer = persistReducer(persistConfig, reducers)

   export const store = configureStore({
     reducer: persistedReducer,
     devTools: process.env.NODE_ENV !== "production",
     middleware: (getDefaultMiddleware) =>
     getDefaultMiddleware({
       immutableCheck: false,
       serializableCheck: false
     }),
   
   })
   
   export type RootState = ReturnType<typeof store.getState>
   export type AppDispatch = typeof store.dispatch

