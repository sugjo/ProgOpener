use tauri::Window;

use super::prompt::set_toggle;

#[tauri::command]
pub fn set_prompt_toggle(window: Window, value: bool) {
    set_toggle(&window, value);
}
