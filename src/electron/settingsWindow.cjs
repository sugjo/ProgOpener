const { getSearchWindow } = require("./searchWindow.cjs");
const { isAppQuitting } = require("./utils/appState.cjs");
const { isDev, port } = require("./utils/index.cjs");
const { BrowserWindow, protocol } = require("electron");
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

    const uiUrl = isDev
        ? `http://127.0.0.1:${port}/src/ui/routes/settings.html`
        : `file://${path.join(__dirname, "../ui/routes/settings.html")}`;

    settingsWindow.loadURL(uiUrl)
}

module.exports.createSettingsWindow = createSettingsWindow;
module.exports.getSettingsWindow = function () {
    return settingsWindow;
};