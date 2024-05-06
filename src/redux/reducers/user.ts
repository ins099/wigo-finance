import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface UserState {
  authenticated: null | boolean;
  verificationStatus: null | boolean;
  created: null | string;
  expiration: null | string;
  accessToken: null | string;
  userName: null | string;
  name: null | string;
  id: null | string;
  refreshToken: null | string;
  expoToken: null | string;
  timeout: null | number;
}

// Define the initial state using that type
const initialState: UserState = {
  authenticated: null,
  verificationStatus: null,
  created: null,
  expiration: null,
  accessToken: null,
  userName: null,
  name: null,
  id: null,
  refreshToken: null,
  expoToken: null,
  timeout: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserAccessToken: (state, { payload }) => {
      state.accessToken = payload ?? "";
    },
    setAppUser: (state, { payload }) => {
      state.authenticated = payload.authenticated;
      state.verificationStatus = payload.verificationStatus;
      state.created = payload.created;
      state.expiration = payload.expiration;
      state.accessToken = payload.accessToken;
      state.userName = payload.userName;
      state.name = payload.name;
      state.id = payload.id;
      state.refreshToken = payload.refreshToken;
      state.expoToken = payload.expoToken;
      state.timeout = payload.timeout;
    },
  },
});

export const { setAppUser, setUserAccessToken } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default userSlice.reducer;
