import { configureStore } from "@reduxjs/toolkit";

import rsaReducer from "../features/rsaSlice";

export default configureStore({
	reducer: {
		rsa: rsaReducer,
	},
});
