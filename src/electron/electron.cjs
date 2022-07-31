const { createSettingsWindow, getSettingsWindow } = require("./settingsWindow.cjs");
const { createSearchWindow, getSearchWindow } = require("./searchWindow.cjs");
const { app, globalShortcut, protocol, ipcMain } = require("electron");
const { createTray } = require("./tray.cjs");
const load = require("./utils/load.cjs");

const path = require('path');

try { require("electron-reloader")(module); } catch { }

const lockApp = app.requestSingleInstanceLock();
if (!lockApp) app.quit()

ipcMain.on("load", load);
ipcMain.on("openSettings", () => getSettingsWindow().show());

async function init() {
  createSearchWindow();
  createSettingsWindow();
  createTray();
  load();
  protocol.registerFileProtocol('atom', (request, callback) => {
    const url = request.url.substr(7);
    callback({ path: path.normalize(`./icons/${url}`) });
  });
}

app.on('before-quit', (e) => {
  getSearchWindow().removeAllListeners('close');
  getSettingsWindow().removeAllListeners('close');
  getSearchWindow().destroy();
  getSettingsWindow().destroy();
});

app.on("will-quit", () => {
  globalShortcut.unregisterAll();
  protocol.unregisterAll();
});

app.once("ready", init);

app.commandLine.appendSwitch('wm-window-animations-disabled');