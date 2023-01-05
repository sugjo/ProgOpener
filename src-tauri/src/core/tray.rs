use tauri::{
    api, AppHandle, CustomMenuItem, Manager, SystemTray, SystemTrayEvent, SystemTrayMenu,
    SystemTrayMenuItem,
};

pub struct Tray {}

impl Tray {
    pub fn tray_menu() -> SystemTray {
        let tray_menu = SystemTrayMenu::new()
            .add_item(CustomMenuItem::new("settings", "Settings"))
            .add_native_item(SystemTrayMenuItem::Separator)
            .add_item(CustomMenuItem::new("quit", "Quit"));
        SystemTray::new().with_menu(tray_menu)
    }

    pub fn on_system_tray_event(app_handle: &AppHandle, event: SystemTrayEvent) {
        match event {
            SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
                "quit" => {
                    api::process::kill_children();
                    app_handle.exit(0);
                    std::process::exit(0);
                }
                "settings" => {
                    let window = app_handle.get_window("settings").unwrap();
                    window.show().unwrap();
                }
                _ => {}
            },
            _ => {}
        }
    }
}
