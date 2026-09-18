import {configureStore} from "@reduxjs/toolkit";
import {api} from "../api/apiSlice.ts";
import {authSlice} from "./slices/authSlice.ts";
export const store = configureStore({
        reducer: {
            auth: authSlice.reducer,
            [api.reducerPath]: api.reducer,
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware()
            .concat(
                api.middleware,
            ),  // Add new middleware as parameters
    }
)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;