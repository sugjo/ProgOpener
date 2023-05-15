import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, persistStore,PURGE, REGISTER, REHYDRATE } from "redux-persist";
import { createStateSyncMiddleware } from "redux-state-sync";

import { promptModel } from "@/entities/prompt";
import { settingsModel } from "@/entities/settings";

const reducerBlacklist = [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER];

const defaultMiddlewareConfig = {
	serializableCheck: {
		ignoredActions: reducerBlacklist,
	}
};

const stateSyncMiddlewareConfig = {
	blacklist: reducerBlacklist
};

const reducer = combineReducers({
	settings: settingsModel.reducer,
	prompt: promptModel.reducer
});

export const store = configureStore({
	reducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware(defaultMiddlewareConfig)
			.prepend(createStateSyncMiddleware(stateSyncMiddlewareConfig)),
	devTools: true
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
