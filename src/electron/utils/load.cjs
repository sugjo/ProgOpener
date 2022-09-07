const { getSearchWindow } = require("../searchWindow.cjs");
const getProgramsList = require("./getProgramsList.cjs");
const storage = require('./storagePromisify.cjs');
const getIcons = require("./getIcons.cjs");


module.exports = async function () {
    const paths = (await storage.get('settings')).paths;
    const programsList = await getProgramsList(paths);
    getIcons(programsList);
    getSearchWindow().webContents.send('loaded', {
        programsList,
    });
}