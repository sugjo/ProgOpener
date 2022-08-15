const { contextBridge, ipcRenderer, app } = require('electron');
const storage = require('./utils/storagePromisify.cjs');
const { exec } = require('mz/child_process.js');
const ospath = require("ospath");
const path = require('path');
const { setDataPath } = require('electron-json-storage');
const { version } = require("../../package.json")

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

    setSettings: (name, data) => storage.set(name, data),
    getSettings: (name) => storage.get(name),
    removeSettings: (name) => storage.remove(name),
    clearSettings: () => storage.clear(),

    load: () => ipcRenderer.send("load"),

    version,
})