import {createSlice} from "@reduxjs/toolkit";
import type {RootState} from "../store.ts";


export type AuthStatusType = "signIn" | "signUp" | "code" | "forgotPassword" | "finish" | "fullName" | "resetPassword";

export type AuthType = {
    status: AuthStatusType;
    prev?: AuthStatusType;
    next?: AuthStatusType;
}

const initialState: AuthType = {
    status: "signIn",
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthStatus: (state, action: {payload: AuthType, type: string}) => {
            state.prev = state.status;
            state.status = action.payload.status;
            state.next = action.payload.next;
        },
        switchToPrevAuthStatus: (state) => {
            state.status = state.prev ?? "signIn";
        },
        switchToNextAuthStatus: (state) => {
            state.status = state.next ?? "signIn";
        }
    }
})

export const {setAuthStatus, switchToPrevAuthStatus, switchToNextAuthStatus} = authSlice.actions;

export const selectAuthStatus = (state: RootState): AuthStatusType => state.auth.status;
export const selectAuthState = (state: RootState): AuthType => state.auth;

export default authSlice.reducer;