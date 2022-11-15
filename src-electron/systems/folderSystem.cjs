const { dialog, ipcMain } = require('electron');
const { fs } = require("mz");
const { set } = require("../utils/storagePromisify.cjs");
const storage = require('../utils/storagePromisify.cjs');
const path = require('path');

let files = {};
let watchers = {};
let folders = new Set();
let updateFolderSystem = () => { }
let options = {
    properties: ['openDirectory']
};

module.exports.createFolderSystem = async function (cb) {
    updateFolderSystem = () => cb(Object.values(files).flat(1));
    folders = new Set((await storage.get("folderSystem")).folders || []);
    for await (const folder of folders) {
        if (!folder.path) return;
        await fileGrubber(folder.path, folder.disabled);
        createWatcher(folder.path);
    }
    ipcMain.emit("folderSystem: paths", Array.from(folders));
    updateFolderSystem();
}

module.exports.closeFolderSystem = function () {
    for (const watcher in watchers) {
        if (!Object.hasOwnProperty.call(watchers, watcher)) return
        watchers[watcher].close();
    }
}

ipcMain.handle('folderSystem: addFolder', async () => {
    const result = await dialog.showOpenDialog(options);
    if (result.canceled) { return; }
    folders.add({ path: result.filePaths[0], disabled: false })
    console.log(folders);
    set("folderSystem", { folders: Array.from(folders) })
    createWatcher(result.filePaths[0]);
    await fileGrubber(result.filePaths[0]);
    updateFolderSystem();
    ipcMain.emit("folderSystem: paths", Array.from(folders));
})

ipcMain.handle('folderSystem: removeFolder', async () => {
    const result = await dialog.showOpenDialog(options);
    if (result.canceled) { return; }
    return result.filePaths;
})

ipcMain.handle('folderSystem: changeFolder', async () => {
    const result = await dialog.showOpenDialog(options);
    if (result.canceled) { return; }
    return result.filePaths;
})

ipcMain.handle('folderSystem: toggleFolder', async (e, pathToToggle, disabled) => {
    const result = await dialog.showOpenDialog(options);
    if (result.canceled) { return; }
    return result.filePaths;
})

async function createWatcher(folder) {
    watchers[path] = fs.watch(folder, async () => {
        await fileGrubber(folder);
        updateFolderSystem()
    })
}

async function fileGrubber(folder, disabled = false) {
    try {
        if (disabled) return;
        const foundFiles = await fs.readdir(folder);
        files[folder] = foundFiles.map((foundFile) => path.join(folder, foundFile));
    } catch (error) {
        throw error;
    }
}