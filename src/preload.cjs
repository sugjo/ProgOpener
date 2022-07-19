const { contextBridge, ipcRenderer } = require('electron')
const { exec } = require('mz/child_process.js')
const init = require('./lib/utils/init.cjs')

contextBridge.exposeInMainWorld(
    'api', {
    send: (channel, data) => {
        ipcRenderer.send(channel, data)
    },
    sendSync: (channel, data) => {
        ipcRenderer.sendSync(channel, data)
    },
    receive: (channel, func) => {
        ipcRenderer.on(channel, (event, ...args) => func(...args))
    },
    hide: () => ipcRenderer.send("hide"),
    init: (settings) => init(settings),
    exec: (command) => exec(command)
})