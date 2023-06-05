import { createSlice,PayloadAction } from "@reduxjs/toolkit";

import { addThunk } from "../api";
import { Path, Paths } from "./types";

const initialState: Paths = {
	pathsMap: {},
	pathsIds: [],
};

export const pathSlice = createSlice({
	name: "settings/path",
	initialState,
	reducers: {
		remove: (state, action: PayloadAction<string>) => {
			delete state.pathsMap[action.payload];
			state.pathsIds = state.pathsIds.filter((id) => id !== action.payload);
		},
		update: (state, action: PayloadAction<{id: string, newPath: Partial<Path>}>) => {
			const { id, newPath } = action.payload;
			state.pathsMap[id] = { ...state.pathsMap[id], ...newPath };
		},
		toggle: (
			{ pathsMap },
			{ payload: { id, value } }: PayloadAction<{ id: string, value: boolean | undefined }>
		) => {
			if (value) {
				pathsMap[id].isActive = value;
			} else {
				pathsMap[id].isActive = !pathsMap[id].isActive;
			}
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(addThunk.fulfilled, (state, { payload }) => {
				if (!payload) return;

				const id = crypto.randomUUID();
				state.pathsIds.push(id);
				state.pathsMap[id] = { path: payload, isActive: true };
			});
	},
});
