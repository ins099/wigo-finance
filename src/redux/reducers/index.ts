import { combineReducers } from "redux";
import userSlice from "./user";
import { authAPIs } from "../apis/auth";
import { generalAPIS } from "../apis/general";

export const allReducers = combineReducers({
  user: userSlice,
  [authAPIs.reducerPath]: authAPIs.reducer,
  [generalAPIS.reducerPath]: generalAPIS.reducer,
});
