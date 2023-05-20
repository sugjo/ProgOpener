import { createAsyncThunk } from "@reduxjs/toolkit";

import { AppDispatch, RootState } from "@/app/store";

export const createTypedAsyncThunk = createAsyncThunk.withTypes<{state: RootState; dispatch: AppDispatch;}>();
