import { createSlice,PayloadAction } from "@reduxjs/toolkit";

import { addThunk } from "./api";
import { Path, Paths } from "./types";

const initialState: Paths = {
	pathsMap: {},
	pathsIds: [],
};

export const pathSlice = createSlice({
	name: "path",
	initialState,
	reducers: {
		delete: (state, action: PayloadAction<string>) => {
			delete state.pathsMap[action.payload];
			state.pathsIds = state.pathsIds.filter((id) => id !== action.payload);
		},
		update: (state, action: PayloadAction<{id: string, newPath: Partial<Path>}>) => {
			const { id, newPath } = action.payload;
			state.pathsMap[id] = { ...state.pathsMap[id], ...newPath };
		},
		toggle: ({ pathsMap }, { payload: id }: PayloadAction<string>) => {
			const isError = pathsMap[id].status === "error";
			const isOn = pathsMap[id].status === "on";

			if(isError) return;

			pathsMap[id].status = isOn? "off" : "on";
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(addThunk.fulfilled, (state, { payload }) => {
				if (!payload) return;

				const id = crypto.randomUUID();
				state.pathsIds.push(id);
				state.pathsMap[id] = { path: payload, status: "on" };
			});
	},
});
