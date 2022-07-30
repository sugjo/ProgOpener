const fileIcon = require("extract-file-icon");
const path = require('path');
const fs = require("mz/fs");

module.exports = async function (programsList) {

    if (!programsList) return

    const iconPath = "./icons";

    try {
        await fs.access(iconPath)
    } catch (error) {
        if (error && error.code === 'ENOENT') fs.mkdir(iconPath);
    }

    const icons = await fs.readdir(iconPath);
    const iconsWithoutExtension = icons.map((icon) => icon.substr(0, icon.lastIndexOf(".")))
    const programsListNames = programsList.map((program) => program.name)

    for (const programs of programsList) {
        if (programs.name.match(/\.[0-9a-z]+$/i)[0] == ".url") continue;
        if (iconsWithoutExtension.includes(programs.name)) continue;
        const icon = fileIcon(path.join(programs.path, programs.name), 32);
        fs.writeFile(`${iconPath}/${programs.name}.png`, icon, { encoding: 'binary' });
    }

    for (const iconFile of iconsWithoutExtension) {
        if (programsListNames.includes(iconFile)) continue
        fs.rm(path.join(iconPath, `${iconFile}.png`), (err) => {
            if (err) return console.error(err.message);
        })
    }
}