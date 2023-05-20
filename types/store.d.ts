declare global {
	/**
	 * ⚠️ FSD
	 *
	 * Its hack way to export redux infering types from @/app
	 * and use it in @/shared/lib/store
	 */
	declare type RootState = import("../src/app/store").RootState;
	declare type AppDispatch = import("../src/app/store").AppDispatch;
}

export {};
