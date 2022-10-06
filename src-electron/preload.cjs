const { isDev } = require("./utils/index.cjs")
const { isEnabled, enable, disable } = require("./utils/auto-launch.cjs");
const { contextBridge, ipcRenderer, app } = require('electron');
const { setDataPath } = require('electron-json-storage');
const { version } = require("../package.json");
const { exec } = require('mz/child_process.js');
const storage = require('./utils/storagePromisify.cjs');
const ospath = require("ospath");
const path = require('path');

setDataPath(path.join(ospath.data(), "ProgOpener"));

contextBridge.exposeInMainWorld('api', {
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

contextBridge.exposeInMainWorld('startup', {
    isEnabled,
    enable,
    disable,
})

contextBridge.exposeInMainWorld('path', {
    normalize: (P) => isDev ? P : path.join(__dirname, "../", P),
    basename: (P) => path.basename(P),
    extname: (P) => path.extname(P),
})