const { createSettingsWindow, getSettingsWindow } = require("./settingsWindow.cjs");
const { createSearchWindow, getSearchWindow } = require("./searchWindow.cjs");
const { app, globalShortcut, protocol, ipcMain, session } = require("electron");
const { createTray } = require("./tray.cjs");
const { createFolderSystem, closeFolderSystem } = require("./systems/folderSystem.cjs");

const path = require('path');
const { isDev } = require("./utils/index.cjs");

try { require("electron-reloader")(module); } catch { }

const lockApp = app.requestSingleInstanceLock();
if (!lockApp) app.quit();

protocol.registerSchemesAsPrivileged([
  { scheme: "icons", privileges: { bypassCSP: true } },
  { scheme: "public", privileges: { bypassCSP: true } }
])

ipcMain.on("load", async () => {
  createFolderSystem((files) => {
    console.log("update");
    getSearchWindow().webContents.send('loaded', {
      programsList: files,
    });
  });
});

ipcMain.on("openSettings", () => getSettingsWindow().show());

function init() {
  const ses = session.fromPartition('persist:app')

  ses.protocol.registerFileProtocol('icons', (request, callback) => {
    const url = request.url.slice(7);
    callback({ path: path.join("./icons", url) });
  });

  ses.protocol.registerFileProtocol('public', (request, callback) => {
    const url = request.url.slice(7);
    callback({ path: path.join(__dirname, isDev ? "../public/" : "../", url) });
  });
  createSearchWindow();
  createSettingsWindow();
  createTray();
}

app.on('before-quit', (e) => {
  closeFolderSystem();
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