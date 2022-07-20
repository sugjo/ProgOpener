const getProgrammsList = require("./getProgrammsList.cjs");
const getIcons = require("./getIcons.cjs");
const { app } = require("electron");
const path = require('path');
const { fs } = require("mz");

module.exports = async function (settings) {
    const programmsList = await getProgrammsList(settings.paths);
    getIcons(programmsList);
    return programmsList
}