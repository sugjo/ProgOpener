import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { withReduxStateSync } from "redux-state-sync";

import { pathSlice } from "./pathSlice";

export const reducer = persistReducer({ key: "settings", storage }, withReduxStateSync(combineReducers({
	path: pathSlice.reducer
})));

export const actions = {
	path: pathSlice.actions
};
