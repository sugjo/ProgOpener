#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::fs::read;

use tauri::api::path::{resolve_path, BaseDirectory};
use tauri::http::{Request, ResponseBuilder};
use tauri::{AppHandle, Manager};
mod core;
mod utils;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

fn main() {
    tauri::Builder::default()
        .setup(utils::setup::init)
        .system_tray(core::tray::tray_menu())
        .on_system_tray_event(core::tray::on_system_tray_event)
        .on_window_event(|event| match event.event() {
            tauri::WindowEvent::CloseRequested { api, .. } => {
                if event.window().label() != "search" {
                    return;
                };
                event.window().hide().unwrap();
                api.prevent_close();
            }
            _ => {}
        })
        .invoke_handler(tauri::generate_handler![core::cmds::toggle_search])
        .register_uri_scheme_protocol("ocular", icon_protocol)
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn icon_protocol(
    app: &AppHandle,
    request: &Request,
) -> Result<tauri::http::Response, Box<(dyn std::error::Error + 'static)>> {
    let icon_name = request
        .uri()
        .replace("ocular://icons/", "")
        .replace("%20", " ");
    let path = resolve_path(
        &app.config(),
        &app.package_info(),
        &app.env(),
        "icons",
        Some(BaseDirectory::AppData),
    )?;
    println!("{:?}, {:?}", path.join(&icon_name), request.uri());
    let local_img = read(path.join(icon_name))?;
    ResponseBuilder::new().mimetype("image/png").body(local_img)
}
