import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./userSlice";
import addressReducer from "./addressRedux";

export const store = configureStore({
    reducer: {
        user: userReducer,
        address: addressReducer
    },
})

