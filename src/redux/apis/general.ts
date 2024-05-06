// https://betaapi.xbk365.com/Location

// Need to use the React-specific entry point to import createApi
import { createApi } from "@reduxjs/toolkit/query/react";
import { customFetchBaseQuery } from "./basequery";

export const generalAPIS = createApi({
  reducerPath: "generalAPIS",
  baseQuery: customFetchBaseQuery,
  endpoints: (builder) => ({
    getLocations: builder.query({
      query: (params) => ({
        url: `/Location`,
        method: "GET",
        params,
      }),
      transformResponse(baseQueryReturnValue, meta, arg) {
        return Array.isArray(baseQueryReturnValue)
          ? baseQueryReturnValue?.map((item, index) => ({
              ...item,
              label: item?.Name,
              value: item?.Id,
            }))
          : [];
      },
    }),
  }),
});

export const { useGetLocationsQuery } = generalAPIS;
