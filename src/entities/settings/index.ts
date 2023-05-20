import { combineReducers } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import { withReduxStateSync } from "redux-state-sync";

import * as pathApi from "./path/api";
import {pathSlice} from "./path/model";

export const reducer = persistReducer({ key: "settings", storage }, withReduxStateSync(combineReducers({
	path: pathSlice.reducer
})));

export const settingsModel = {
	reducer,
	actions: {
		[pathSlice.name]: {...pathSlice.actions, ...pathApi},
	}
};
