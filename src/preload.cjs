const { contextBridge, ipcRenderer } = require('electron');
const storage = require('./lib/utils/storagePromisify.cjs');
const { exec } = require('mz/child_process.js');
const ospath = require("ospath");
const path = require('path');
const { setDataPath } = require('electron-json-storage');

setDataPath(path.join(ospath.data(), "ProgOpener"));

contextBridge.exposeInMainWorld(
    'api', {
    send: (channel, data) => {
        ipcRenderer.send(channel, data)
    },
    receive: (channel, func) => {
        ipcRenderer.on(channel, (event, ...args) => func(...args))
    },
    hide: () => ipcRenderer.send("hide"),
    exec: (command) => exec(command),
    setSettings: (data) => storage.set("settings", data),
    getSettings: () => storage.get("settings"),
    removeSettings: () => storage.remove("settings"),
    clearSettings: () => storage.clear(),

    load: () => ipcRenderer.send("load")
})
