use tauri::{AppHandle, GlobalShortcutManager, Manager, Window};

pub fn init(app: AppHandle) {
    let window = app.get_window("prompt").unwrap();
    app.global_shortcut_manager()
        .register("Alt + Space", move || toggle(&window))
        .unwrap();
}

fn toggle(window: &Window) {
    let is_visible = window.is_visible().unwrap();

    if is_visible {
        window.hide().unwrap();
    } else {
        window.show().unwrap();
        window.set_focus().unwrap();
    }

    let is_visible = window.is_visible().unwrap();

    window.emit("prompt_toggled", is_visible).unwrap();
}

pub fn set_toggle(window: &Window, value: bool) {
    let is_visible = window.is_visible().unwrap();

    if is_visible == value {
        return;
    } else {
        toggle(window);
    }
}
