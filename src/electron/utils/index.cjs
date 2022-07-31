const { setDataPath } = require('electron-json-storage');
const { app, globalShortcut } = require("electron");
const ospath = require("ospath");
const path = require('path');

setDataPath(path.join(ospath.data(), "ProgOpener"));

function shortcutRegister(cooldown, accelerator, cb) {
    let canUse = true;
    globalShortcut.register(accelerator, () => {
        if (!canUse) return
        canUse = false;
        cb()
        setTimeout(() => {
            canUse = true;
        }, cooldown);
    })
}

module.exports.isDev = !app.isPackaged || (process.env.NODE_ENV == "development");
module.exports.port = process.env.PORT || 3000;
module.exports.shortcutRegister = shortcutRegister;
