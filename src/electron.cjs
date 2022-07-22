const { app, BrowserWindow, ipcMain, globalShortcut, protocol } = require("electron");
const serve = require("electron-serve");
const ospath = require("ospath");
const ws = require("electron-window-state");
const path = require('path');
const getIcons = require("./lib/utils/getIcons.cjs");
const getProgrammsList = require("./lib/utils/getProgrammsList.cjs");
const storage = require('./lib/utils/storagePromisify.cjs');
const { setDataPath } = require('electron-json-storage');

try { require("electron-reloader")(module); } catch { }

setDataPath(path.join(ospath.data(), "ProgOpener"));
const loadURL = serve({ directory: "." });
const port = process.env.PORT || 3000;
const isdev = !app.isPackaged || (process.env.NODE_ENV == "development");
const lockApp = app.requestSingleInstanceLock();
let mainWindow;
let settingsWindow;

if (!lockApp) {
  app.quit();
}

protocol.registerSchemesAsPrivileged([{ scheme: 'atom', privileges: { bypassCSP: true } }])

function loadVite(port) {
  mainWindow.loadURL(`http://127.0.0.1:${port}`).catch((err) => {
    setTimeout(() => { loadVite(port); }, 200);
  });
}

function createMainWindow() {

  let isShowing = false;

  protocol.registerFileProtocol('atom', (request, callback) => {
    const url = request.url.substr(7)
    callback({ path: path.normalize(`./icons/${url}`) })
  })

  mainWindow = new BrowserWindow({
    show: false,
    alwaysOnTop: true,
    resizable: false,
    transparent: true,
    frame: false,
    autoHideMenuBar: true,
    fullscreen: true,
    skipTaskbar: true,
    minimizable: false,
    maximizable: false,
    closable: false,
    movable: false,

    webPreferences: {
      devTools: isdev,
      enableRemoteModule: true,
      preload: path.join(__dirname, "preload.cjs"),
    }
  });

  globalShortcut.register('Alt+Space', () => {
    isShowing ? hide() : show();
  })

  ipcMain.on("hide", hide);
  isdev && mainWindow.on("blur", hide);

  function hide() {
    mainWindow.webContents.send('hide');
    mainWindow.hide();
    isShowing = false;
  }

  function show() {
    mainWindow.webContents.send('show');
    mainWindow.show()
    isShowing = true;
  }

  ipcMain.on("load", async () => {
    const paths = (await storage.get('settings')).paths;
    const programmsList = await getProgrammsList(paths);
    getIcons(programmsList);
    mainWindow.webContents.send('initialData', {
      programmsList,
    });
  });

  mainWindow.once("close", () => { mainWindow = null; });

  if (isdev) loadVite(port);
  else loadURL(mainWindow);
}

function createSettingsWindow() {

  settingsWindow = new BrowserWindow({
    webPreferences: {
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.cjs'),
    },
  });

  settingsWindow.loadURL(`http://127.0.0.1:${port}/test`);
}

ipcMain.on("openSettings", createSettingsWindow);

app.once("ready", createMainWindow);
app.on("activate", () => { if (!mainwindow) createMainWindow(); });
app.on("window-all-closed", () => { if (process.platform !== "darwin") app.quit(); });
