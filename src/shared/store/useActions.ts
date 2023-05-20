/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionCreatorsMapObject,AsyncThunk,bindActionCreators } from "@reduxjs/toolkit";
import { useMemo } from "react";

import { useAppDispatch } from "./useAppDispatch";

export const useActionCreators = <Actions extends ActionCreatorsMapObject>(
	actions: Actions
): BoundActions<Actions> => {
	const dispatch = useAppDispatch();

	return useMemo(() => bindActionCreators(actions, dispatch), [actions, dispatch]);
};

type BoundActions<Actions extends ActionCreatorsMapObject> = {
	[key in keyof Actions]: Actions[key] extends AsyncThunk<unknown, unknown, any>
		? BoundAsyncThunk<Actions[key]>
		: Actions[key]
}

type BoundAsyncThunk<Thunk extends AsyncThunk<unknown, unknown, any>> = (...args: Parameters<Thunk>) => ReturnType<ReturnType<Thunk>>;
