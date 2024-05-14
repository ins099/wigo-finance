// Need to use the React-specific entry point to import createApi
import { createApi } from "@reduxjs/toolkit/query/react";
import { customFetchBaseQuery } from "./basequery";

export const reciepentsAPIs = createApi({
  reducerPath: "reciepentsAPIs",
  baseQuery: customFetchBaseQuery,
  tagTypes: ["Reciepents"],
  endpoints: (builder) => ({
    addReceipent: builder.mutation({
      query: (body) => ({
        url: `/v1/recipient`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Reciepents"],
    }),
    getReceipents: builder.query({
      query: (params) => ({
        url: `/v1/recipient/paging`,
        method: "GET",
        params,
      }),
      providesTags: ["Reciepents"],
    }),
  }),
});

export const { useAddReceipentMutation, useGetReceipentsQuery } =
  reciepentsAPIs;
