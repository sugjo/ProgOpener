const getProgrammsList = require("./getProgrammsList.cjs");
const getIcons = require("./getIcons.cjs");

module.exports = async function (settings) {
    const programmsList = await getProgrammsList(settings.paths);
    getIcons(programmsList);
    return programmsList
}