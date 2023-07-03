import { createSlice } from "@reduxjs/toolkit";
import JSEncrypt from "jsencrypt";

const rsaSlice = createSlice({
	name: "rsa",
	initialState: {
		privateKey: "",
		publicKey: "",
	},
	reducers: {
		generateKey(state, action) {
			let crypt = new JSEncrypt({ default_key_size: action.payload });

			state.publicKey = crypt.getPublicKey();
			state.privateKey = crypt.getPrivateKey();
		},
	},
});

export default rsaSlice.reducer;

export const { generateKey } = rsaSlice.actions;

export const rsaSelector = (state) => state.rsa;
