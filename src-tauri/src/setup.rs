use tauri::{App, AppHandle, GlobalShortcutManager, Manager, Window};

#[cfg(target_os = "windows")]
pub fn init(app: &mut App) -> std::result::Result<(), Box<dyn std::error::Error>> {
    let window = app.get_window("search").unwrap();
    search_toggle_register(app.app_handle());

    window.emit("files_update", "files").unwrap();

    Ok(())
}

fn search_toggle_register(app: AppHandle) {
    let window = app.get_window("search").unwrap();

    app.global_shortcut_manager()
        .register("Alt + Space", move || {
            let is_visible = window.is_visible().unwrap();
            if is_visible {
                hide_search(&window)
            } else {
                show_search(&window)
            }
        })
        .unwrap();
}

fn show_search(window: &Window) {
    window.show().unwrap();
    window.set_focus().unwrap();
}

fn hide_search(window: &Window) {
    window.hide().unwrap();
}
