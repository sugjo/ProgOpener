const { BrowserWindow, screen, globalShortcut, ipcMain, protocol, session } = require("electron");
const { isAppQuitting } = require("./utils/appState.cjs")
const { isDev, port, shortcutRegister } = require("./utils/index.cjs");
const path = require('path');

let searchWindow;

function createSearchWindow() {
    const size = screen.getPrimaryDisplay().workAreaSize;

    let isShowing = false;

    searchWindow = new BrowserWindow({
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

        webPreferences: {
            partition: 'persist:app',
            devTools: true,
            preload: path.join(__dirname, 'preload.cjs'),
        }
    });

    searchWindow.setBackgroundColor("#00000000");
    searchWindow.webContents.setFrameRate(60);
    searchWindow.minimize();
    searchWindow.setFullScreen(true);

    shortcutRegister(100, 'Alt+Space', () => {
        isShowing ? hide() : show();
    });

    searchWindow.on("closed", () => {
        searchWindow = null;
    });

    function hide() {
        searchWindow.webContents.send('hide');
        searchWindow.setOpacity(0);
        searchWindow.minimize();
        isShowing = false;
    }

    function show() {
        searchWindow.webContents.send('show');
        searchWindow.restore()
        isShowing = true;
        setTimeout(() => {
            searchWindow.setOpacity(1);
        }, 60);
    }

    !isDev && searchWindow.on("blur", hide);
    ipcMain.on("hide", hide);

    searchWindow.on('close', (e) => {
        if (!isAppQuitting()) {
            e.preventDefault();
            hide();
        }

        return false;
    });

    const uiUrl = isDev
        ? `http://127.0.0.1:${port}/src/pages/search.html`
        : `file://${path.join(__dirname, "../src/pages/search.html")}`;

    searchWindow.loadURL(uiUrl)
}

module.exports.createSearchWindow = createSearchWindow;
module.exports.getSearchWindow = function () {
    return searchWindow;
};