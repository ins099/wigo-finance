// Need to use the React-specific entry point to import createApi
import { createApi } from "@reduxjs/toolkit/query/react";
import { customFetchBaseQuery } from "./basequery";

export const authAPIs = createApi({
  reducerPath: "authAPIs",
  baseQuery: customFetchBaseQuery,
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (body) => ({
        url: `/Mobile/Register`,
        method: "POST",
        body,
      }),
    }),
    signIn: builder.mutation({
      query: (body) => ({
        url: `/Mobile/login`,
        method: "POST",
        body,
      }),
    }),
    verifyEmail: builder.query({
      query: (params) => ({
        url: `/Account/verify-email`,
        method: "GET",
        params,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: "Mobile/forgot-password",
        method: "POST",
        body,
      }),
    }),
    changePassword: builder.mutation({
      query: (body) => ({
        url: "Account/change-password",
        method: "PUT",
        body,
      }),
    }),
    updateWallet: builder.mutation({
      query: (body) => ({
        url: "/v1/fiat/walletinfo",
        method: "PUT",
        body,
      }),
    }),
    getWallet: builder.query({
      query: (params) => ({
        url: "/v1/fiat/walletinfo",
        method: "GET",
        params,
      }),
    }),
    getUserWallets: builder.query({
      query: (params) => ({
        url: "/v1/fiat/wallet/paging",
        method: "GET",
        params,
      }),
    }),
    changePinCode: builder.mutation({
      query: (body) => ({
        url: "/Mobile/pincode",
        method: "PATCH",
        body,
      }),
    }),
    sendFund: builder.mutation({
      query: (body) => ({
        url: "/fiat/send",
        method: 'POST',
        body,
      })
    })
  }),
});

export const {
  useSignupMutation,
  useLazyVerifyEmailQuery,
  useSignInMutation,
  useForgotPasswordMutation,
  useChangePasswordMutation,
  useUpdateWalletMutation,
  useGetWalletQuery,
  useChangePinCodeMutation,
  useGetUserWalletsQuery,
  useSendFundMutation,
} = authAPIs;
