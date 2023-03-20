import reducer from "./reducer";
import { persistStore, persistReducer} from 'redux-persist';
import storage from "redux-persist/lib/storage";
import {configureStore} from "@reduxjs/toolkit";


const persistConfig ={
    key : 'root',
    storage
}

const persistedReducer= persistReducer(persistConfig, reducer)

export const store = configureStore({
    reducer: persistedReducer
})

export const persistor = persistStore(store)
