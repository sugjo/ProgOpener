import { addListener,TypedAddListener } from "@reduxjs/toolkit";

export const addAppListener = addListener as TypedAddListener<
	RootState,
	AppDispatch
>;
