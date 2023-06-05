use tauri::{
    api, AppHandle, CustomMenuItem, Manager, SystemTray, SystemTrayEvent, SystemTrayMenu,
    SystemTrayMenuItem,
};

pub fn tray_menu() -> SystemTray {
    let tray_menu = SystemTrayMenu::new()
        .add_item(CustomMenuItem::new("settings", "Settings"))
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(CustomMenuItem::new("quit", "Quit"));
    SystemTray::new().with_menu(tray_menu)
}

pub fn on_system_tray_event(app: &AppHandle, event: SystemTrayEvent) {
    match event {
        SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
            "quit" => {
                api::process::kill_children();
                app.exit(0);
                std::process::exit(0);
            }
            "settings" => {
                if let Some(window) = app.get_window("main") {
                    window.unminimize().unwrap();
                    window.show().unwrap();
                    window.set_focus().unwrap();
                    return;
                }

                tauri::window::WindowBuilder::new(
                    app,
                    "settings",
                    tauri::WindowUrl::App("settings".into()),
                )
                .title("Settings")
                .inner_size(500.0, 600.0)
                .resizable(false)
                .center()
                .build()
                .unwrap();
            }
            _ => {}
        },
        _ => {}
    }
}
