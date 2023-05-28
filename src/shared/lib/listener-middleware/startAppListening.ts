import { listenerMiddleware } from "./listenerMiddleware";
import { AppStartListening } from "./types";

export const startAppListening =
	listenerMiddleware.startListening as AppStartListening;
