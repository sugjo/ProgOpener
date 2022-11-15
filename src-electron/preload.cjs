const { isEnabled, enable, disable } = require("./utils/auto-launch.cjs");
const { contextBridge, ipcRenderer, app } = require('electron');
const { setDataPath } = require('electron-json-storage');
const { exec } = require('mz/child_process.js');
const { version } = require("../package.json");
const { isDev } = require("./utils/index.cjs")
const storage = require('./utils/storagePromisify.cjs');
const ospath = require("ospath");
const path = require('path');

setDataPath(path.join(ospath.data(), "ProgOpener"));

contextBridge.exposeInMainWorld('api', {
    getLangPath: () => isDev ? path.join("/lang") : path.join(__dirname, "../lang"),
    send: (channel, data) => {
        ipcRenderer.send(channel, data)
    },
    receive: (channel, func) => {
        ipcRenderer.on(channel, (event, ...args) => func(...args))
    },
    invoke: (channel, args) => {
        return ipcRenderer.invoke(channel, args);
    },

    hide: () => ipcRenderer.send("hide"),
    exec: (command) => exec(command),
    load: () => ipcRenderer.send("load"),

    setStorage: (name, data) => storage.set(name, data),
    getStorage: (name) => storage.get(name),
    removeStorage: (name) => storage.remove(name),
    clearStorage: () => storage.clear(),
    version,
})

contextBridge.exposeInMainWorld('folderSystem', {
    addFolder: () => ipcRenderer.invoke("folderSystem: addFolder"),
    removeFolder: (pathToRemove) => ipcRenderer.invoke("folderSystem: removeFolder", pathToRemove),
    changeFolder: (pathToChange) => ipcRenderer.invoke("folderSystem: changeFolder", pathToChange),
    toggleFolder: (pathToToggle, disabled) => ipcRenderer.invoke("folderSystem: toggleFolder", pathToToggle, disabled)
})

contextBridge.exposeInMainWorld('startup', {
    isEnabled,
    enable,
    disable,
})

contextBridge.exposeInMainWorld('path', {
    parse: (p) => path.parse(p),
    basename: (p) => path.basename(p),
    extname: (p) => path.extname(p),
})