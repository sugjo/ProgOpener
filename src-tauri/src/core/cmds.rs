use tauri::Window;

use crate::utils::setup;

#[tauri::command]
pub fn toggle_search(window: Window){
    setup::toggle_search(&window);
}