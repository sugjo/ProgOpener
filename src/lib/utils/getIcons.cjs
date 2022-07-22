const fileIcon = require("extract-file-icon");
const path = require('path');
const fs = require("mz/fs");

module.exports = async function (programmsList) {

    const iconPath = process.env.NODE_ENV == "development" ? "./static/icons" : "./resources/app/icons";

    try {
        await fs.access(iconPath)
    } catch (error) {
        if (error && error.code === 'ENOENT') fs.mkdir(iconPath);
    }

    const icons = await fs.readdir(iconPath);
    const iconsWithoutExtension = icons.map((icon) => icon.substr(0, icon.lastIndexOf(".")))
    const programmsListNames = programmsList.map((program) => program.name)

    for (const programms of programmsList) {
        if (programms.name.match(/\.[0-9a-z]+$/i)[0] == ".url") continue;
        if (iconsWithoutExtension.includes(programms.name)) continue;
        const icon = fileIcon(path.join(programms.path, programms.name), 32);
        fs.writeFile(`${iconPath}/${programms.name}.png`, icon, { encoding: 'binary' });
    }

    for (const iconFile of iconsWithoutExtension) {
        if (programmsListNames.includes(iconFile)) continue
        fs.rm(path.join(iconPath, `${iconFile}.png`), (err) => {
            if (err) return console.error(err.message);
        })
    }
}