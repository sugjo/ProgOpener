import { open } from "@tauri-apps/api/dialog";

import { createTypedAsyncThunk } from "@/shared/lib/store";

export const add = createTypedAsyncThunk<string | null, void>(
	"path/add",
	async () => {
		return await open({
			directory: true,
			multiple: false
		}) as string | null;
	}
);
