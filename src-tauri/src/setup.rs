use tauri::{App, Manager};

use crate::core::prompt;

#[cfg(target_os = "windows")]
pub fn init(app: &mut App) -> std::result::Result<(), Box<dyn std::error::Error>> {
    prompt::init(app.app_handle());

    Ok(())
}
