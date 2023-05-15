import { combineReducers } from "@reduxjs/toolkit";

import { promptSlice } from "./promptSlice";

export const reducer = combineReducers({
	prompt: promptSlice.reducer
});

export const actions = {
	search: promptSlice.actions
};
