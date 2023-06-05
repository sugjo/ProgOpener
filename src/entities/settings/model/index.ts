import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import * as pathApi from "../api";
import { pathSlice } from "./pathSlice";

export const reducer = persistReducer({ key: "settings", storage }, combineReducers({
	path: pathSlice.reducer,
}));

export const actions = {
	path: {...pathSlice.actions, ...pathApi},
};
