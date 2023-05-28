import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, persistStore, PURGE, REGISTER, REHYDRATE  } from "redux-persist";

import { promptModel } from "@/entities/prompt";
import { settingsModel } from "@/entities/settings";
import { listenerMiddleware } from "@/shared/lib/listener-middleware";

const reducerBlacklist = [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER];

const defaultMiddlewareConfig = {
	serializableCheck: {
		ignoredActions: reducerBlacklist,
	}
};

const reducer = combineReducers({
	settings: settingsModel.reducer,
	prompt: promptModel.reducer,
});

export const store = configureStore({
	reducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware(defaultMiddlewareConfig)
			.concat(listenerMiddleware.middleware),
	devTools: true,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
