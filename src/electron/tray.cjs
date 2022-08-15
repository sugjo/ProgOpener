const { app, remote, nativeImage, Tray, Menu } = require("electron");
const { setIsAppQuitting } = require("./utils/appState.cjs")
const { getSettingsWindow } = require("./settingsWindow.cjs");
const path = require('path');

const iconPath = path.resolve(__dirname, "..", "ui/public/favicon.png");

const icon = nativeImage
    .createFromPath(iconPath)
    .resize({ width: 16, height: 16 });

let tray;

module.exports.createTray = function () {
    tray = new Tray(icon);

    const trayContextMenu = Menu.buildFromTemplate([
        {
            label: "Settings",
            click() {
                getSettingsWindow().show();
            },
        },
        {
            label: "Quit",
            click() {
                setIsAppQuitting(true);
                app.quit();
            },
        },
    ]);

    tray.setToolTip("ProgOpener");
    tray.setContextMenu(trayContextMenu);

    return tray;
}

module.exports.showMessage = function (content = "", title = "ProgOpener") {
    tray.displayBalloon({ title, content });
}