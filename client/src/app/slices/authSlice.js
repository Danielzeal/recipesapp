/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetail: localStorage.getItem("userDetail")
    ? JSON.parse(localStorage.getItem("userDetail"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userDetail = action.payload;
      localStorage.setItem("userDetail", JSON.stringify(action.payload));

      const expirationTime = new Date().getTime() + 7 * 24 * 60 * 60 * 1000; // 7 days
      localStorage.setItem("expirationTime", expirationTime);
    },
    logoutUser: (state, action) => {
      state.userDetail = null;
      localStorage.clear();
    },
  },
});

export const { setCredentials, logoutUser } = authSlice.actions;

export default authSlice.reducer;
