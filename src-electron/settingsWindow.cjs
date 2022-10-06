const { isAppQuitting } = require("./utils/appState.cjs");
const { BrowserWindow, dialog, ipcMain } = require("electron");
const { isDev, port } = require("./utils/index.cjs");
const path = require('path');

let settingsWindow;

function createSettingsWindow() {
    settingsWindow = new BrowserWindow({
        autoHideMenuBar: true,
        show: false,
        webPreferences: {
            devTools: true,
            preload: path.join(__dirname, 'preload.cjs'),
        },
    });

    settingsWindow.on("closed", () => {
        settingsWindow = null;
    });

    settingsWindow.on('close', (e) => {
        if (!isAppQuitting()) {
            e.preventDefault();
            settingsWindow.hide();
        }

        return false;
    });
    ipcMain.handle('dialog: openDirectorySelect', async () => {
        let options = {
            properties: ['openDirectory']
        };

        const result = await dialog.showOpenDialog(settingsWindow, options);
        if (result.canceled) { return; }
        return result.filePaths;
    })

    const uiUrl = isDev
        ? `http://127.0.0.1:${port}/src/routes/settings.html`
        : `file://${path.join(__dirname, "../src/routes/settings.html")}`;

    settingsWindow.loadURL(uiUrl)
}

module.exports.createSettingsWindow = createSettingsWindow;
module.exports.getSettingsWindow = function () {
    return settingsWindow;
};