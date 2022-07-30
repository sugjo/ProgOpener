const { app, BrowserWindow, ipcMain, globalShortcut, protocol, screen } = require("electron");
const { setDataPath } = require('electron-json-storage');
const path = require('path');
const ospath = require("ospath");
const { createTray } = require("./tray.cjs");
const { isAppQuitting } = require("./utils/appState.cjs")
const getIcons = require("./utils/getIcons.cjs");
const storage = require('./utils/storagePromisify.cjs');
const getProgramsList = require("./utils/getProgramsList.cjs");

try { require("electron-reloader")(module); } catch { }

const lockApp = app.requestSingleInstanceLock();
const port = process.env.PORT || 3000;
const isDev = !app.isPackaged || (process.env.NODE_ENV == "development");

if (!lockApp) app.quit()
setDataPath(path.join(ospath.data(), "ProgOpener"));
protocol.registerSchemesAsPrivileged([{ scheme: 'atom', privileges: { bypassCSP: true } }])

let mainWindow;
let settingsWindow;

function createMainWindow() {
  const size = screen.getPrimaryDisplay().workAreaSize;

  let isShowing = false;

  mainWindow = new BrowserWindow({
    width: size.width - 1,
    height: size.height - 1,
    show: true,
    alwaysOnTop: true,
    resizable: false,
    transparent: true,
    frame: false,
    autoHideMenuBar: true,
    skipTaskbar: true,
    closable: false,
    movable: false,
    center: true,
    backgroundColor: 000000,

    webPreferences: {
      devTools: true,
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.cjs'),
    }
  });

  mainWindow.setBackgroundColor("#00000000");
  mainWindow.webContents.setFrameRate(60);
  mainWindow.minimize();
  mainWindow.setFullScreen(true);

  globalShortcut.register('Alt+Space', () => {
    isShowing ? hide() : show();
  })

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  function hide() {
    mainWindow.webContents.send('hide');
    mainWindow.minimize();
    isShowing = false;
  }

  function show() {
    mainWindow.webContents.send('show');
    mainWindow.restore()
    isShowing = true;
  }

  !isDev && mainWindow.on("blur", hide);
  ipcMain.on("hide", hide);
  ipcMain.on("load", load);
  ipcMain.on("openSettings", () => settingsWindow.show());

  mainWindow.on('close', (e) => {
    if (!isAppQuitting()) {
      e.preventDefault();
      hide();
    }

    return false;
  });

  if (isDev) {
    mainWindow.loadURL(`http://127.0.0.1:${port}/src/ui/routes/search.html`)
  } else {
    mainWindow.loadFile(`src/ui/routes/search.html`)
  }
}

function createSettingsWindow() {
  settingsWindow = new BrowserWindow({
    parent: mainWindow,
    modal: true,
    show: false,
    webPreferences: {
      devTools: true,
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.cjs'),
    },
  });

  settingsWindow.on("closed", () => {
    mainWindow = null;
  });

  settingsWindow.on('close', (e) => {
    if (!isAppQuitting()) {
      e.preventDefault();
      settingsWindow.hide();
    }

    return false;
  });

  if (isDev) {
    settingsWindow.loadURL(`http://127.0.0.1:${port}/src/ui/routes/settings.html`)
  } else {
    settingsWindow.loadFile(`src/ui/routes/settings.html`)
  }
}

async function init() {
  createSettingsWindow();
  createMainWindow();
  createTray();
  protocol.registerFileProtocol('atom', (request, callback) => {
    const url = request.url.substr(7);
    callback({ path: path.normalize(`./icons/${url}`) });
  });
}

async function load() {
  const paths = (await storage.get('settings')).paths;
  const programsList = await getProgramsList(paths);
  getIcons(programsList);
  mainWindow.webContents.send('loadData', {
    programsList,
  });
}

app.on('before-quit', (e) => {
  mainWindow.removeAllListeners('close');
  settingsWindow.removeAllListeners('close');
  mainWindow.destroy();
  settingsWindow.destroy();
});

app.on("will-quit", () => {
  globalShortcut.unregisterAll();
  protocol.unregisterAll();
});

app.once("ready", init);