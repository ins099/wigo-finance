import {
  BaseQueryApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query";
import { RootState } from "../store";

export const BASE_URL = "https://betaapi.xbk365.com";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, api) => {
    let token = (api.getState() as RootState).user.accessToken;
    console.log({token})

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const customFetchBaseQuery = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error?.status == 401) {
    console.log("UN AUTH ACTION", JSON.stringify(result, null, 1));
    throw Error('Un authorized')
  }
  return result;
};
