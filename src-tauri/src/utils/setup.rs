use tauri::{App, AppHandle, GlobalShortcutManager, Manager, Window};

#[cfg(target_os = "windows")]
pub fn init(app: &mut App) -> std::result::Result<(), Box<dyn std::error::Error>> {
    search_toggle_register(app.app_handle());

    Ok(())
}

fn search_toggle_register(app: AppHandle) {
    let window = app.get_window("search").unwrap();
    app.global_shortcut_manager()
        .register("Alt + Space", move || toggle_search(&window))
        .unwrap();
}

pub fn toggle_search(window: &Window) {
    let is_visible = window.is_visible().unwrap();

    if is_visible {
        window.hide().unwrap();
    } else {
        window.show().unwrap();
        window.set_focus().unwrap();
    }

    window.emit("search_toggled", !is_visible).unwrap();
}
