const { app, BrowserWindow, ipcMain, globalShortcut } = require("electron");
const serve = require("electron-serve");
const ws = require("electron-window-state");
const path = require('path');
try { require("electron-reloader")(module); } catch { }

const loadURL = serve({ directory: "." });
const port = process.env.PORT || 3000;
const isdev = !app.isPackaged || (process.env.NODE_ENV == "development");
let mainwindow;
let settingsWindow;

function loadVite(port) {
  mainwindow.loadURL(`http://127.0.0.1:${port}`).catch((err) => {
    setTimeout(() => { loadVite(port); }, 200);
  });
}

function createMainWindow() {

  let isShowing = false;


  mainwindow = new BrowserWindow({
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
      preload: path.join(__dirname, "preload.cjs")
    }
  });

  globalShortcut.register('Alt+Space', () => {
    isShowing ? hide() : show();
  })

  ipcMain.on("hide", hide);

  function hide() {
    mainwindow.webContents.send('hide');
    mainwindow.hide();
    isShowing = false;
  }

  function show() {
    mainwindow.webContents.send('show');
    mainwindow.show()
    isShowing = true;
  }

  mainwindow.once("close", () => { mainwindow = null; });

  if (!isdev) mainwindow.removeMenu();
  else mainwindow.webContents.openDevTools();

  if (isdev) loadVite(port);
  else loadURL(mainwindow);
}

function settings() {

  settingsWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
    },
  });

  settingsWindow.loadURL(`http://127.0.0.1:${port}/test`);
}

ipcMain.on("openSettings", settings);
app.once("ready", createMainWindow);
app.on("activate", () => { if (!mainwindow) createMainWindow(); });
app.on("window-all-closed", () => { if (process.platform !== "darwin") app.quit(); });
