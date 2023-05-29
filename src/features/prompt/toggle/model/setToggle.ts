import { invoke } from "@tauri-apps/api";

export const setToggle = (value: boolean) => invoke("set_prompt_toggle", { value });
