import { createSlice } from "@reduxjs/toolkit";

const rsaSlice = createSlice({
  name: "rsa",
  initialState: {
    privateKey: "",
    publicKey: "",
  },
  reducers: {
    generateKey(state, action) {},
    setUser(state, action) {
      state = { ...action.payload };
      return state;
    },
    removeUser(state) {
      return {};
    },
  },
});

export default rsaSlice.reducer;

export const { setUser, removeUser } = rsaSlice.actions;

export const rsaSelector = (state) => state.rsa;
