import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import * as pathApi from "./path/api";
import { pathSlice } from "./path/model";

export const reducer = persistReducer({ key: "settings", storage }, combineReducers({
	path: pathSlice.reducer,
}));

export const settingsModel = {
	reducer,
	actions: {
		path: {...pathSlice.actions, ...pathApi},
	}
};
