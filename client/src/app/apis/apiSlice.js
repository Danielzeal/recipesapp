/* eslint-disable no-unused-vars */

import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/constant";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    return headers;
  },
  credentials: "include",
});

const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Recipe", "User"],
  endpoints: (builder) => ({}),
});

export default apiSlice;
