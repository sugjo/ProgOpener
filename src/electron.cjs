const { app, BrowserWindow, ipcMain, globalShortcut } = require("electron");
const serve = require("electron-serve");
const ws = require("electron-window-state");
const path = require('path');
try { require("electron-reloader")(module); } catch { }

const loadURL = serve({ directory: "." });
const port = process.env.PORT || 3000;
const isdev = !app.isPackaged || (process.env.NODE_ENV == "development");
let mainWindow;
let settingsWindow;

function loadVite(port) {
  mainWindow.loadURL(`http://127.0.0.1:${port}`).catch((err) => {
    setTimeout(() => { loadVite(port); }, 200);
  });
}

function createMainWindow() {

  let isShowing = false;


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
      preload: path.join(__dirname, "preload.cjs")
    }
  });

  globalShortcut.register('Alt+Space', () => {
    isShowing ? hide() : show();
  })

  ipcMain.on("hide", hide);
  mainWindow.on("blur", hide)

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
