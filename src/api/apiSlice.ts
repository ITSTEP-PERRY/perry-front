import { createApi } from "@reduxjs/toolkit/query/react";
import {fetchBaseQuery} from "@reduxjs/toolkit/query";
// import {baseQueryWithReauth} from "./baseQuery.ts";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: '/' }), //baseQueryWithReauth,
    endpoints: () => ({}),
});