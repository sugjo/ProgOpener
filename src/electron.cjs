const { app, BrowserWindow, ipcMain, globalShortcut, protocol } = require("electron");
const ospath = require("ospath");
const path = require('path');
const getIcons = require("./lib/utils/getIcons.cjs");
const getProgrammsList = require("./lib/utils/getProgrammsList.cjs");
const storage = require('./lib/utils/storagePromisify.cjs');
const { setDataPath } = require('electron-json-storage');

try { require("electron-reloader")(module); } catch { }

setDataPath(path.join(ospath.data(), "ProgOpener"));
protocol.registerSchemesAsPrivileged([{ scheme: 'atom', privileges: { bypassCSP: true } }])

const port = process.env.PORT || 3000;
const isdev = !app.isPackaged || (process.env.NODE_ENV == "development");
const lockApp = app.requestSingleInstanceLock();
let mainWindow;
let settingsWindow;

if (!lockApp) {
  app.quit();
}

function createMainWindow() {

  let isShowing = false;

  protocol.registerFileProtocol('atom', (request, callback) => {
    const url = request.url.substr(7)
    callback({ path: path.normalize(`./icons/${url}`) })
  })

  mainWindow = new BrowserWindow({
    show: true,
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
      devTools: true,
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.cjs'),
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

  mainWindow.webContents.openDevTools();

  mainWindow.once("close", () => { mainWindow = null; });

  if (isdev) {
    mainWindow.loadURL(`http://127.0.0.1:${port}/src/search.html`)
  } else {
    mainWindow.loadFile(`src/search.html`)
  }
}

function createSettingsWindow() {

  settingsWindow = new BrowserWindow({
    webPreferences: {
      devTools: true,
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.cjs'),
    },
  });

  settingsWindow.webContents.openDevTools();
  if (isdev) {
    settingsWindow.loadURL(`http://127.0.0.1:${port}/src/settings.html`)
  } else {
    settingsWindow.loadFile(`src/settings.html`)
  }

}

ipcMain.on("openSettings", createSettingsWindow);

app.once("ready", createMainWindow);
app.on("activate", () => { if (!mainwindow) createMainWindow(); });
app.on("window-all-closed", () => { if (process.platform !== "darwin") app.quit(); });
