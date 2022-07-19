const fileIcon = require("extract-file-icon");
const fs = require("mz/fs");

module.exports = async function (programmsList) {
    const icons = await fs.readdir("./static/icons");
    const iconsWithoutExtension = icons.map((icon) => icon.substr(0, icon.lastIndexOf(".")))
    const programmsListNames = programmsList.map((program) => program.name)

    for (const { name, path } of programmsList) {
        if (name.match(/\.[0-9a-z]+$/i)[0] == ".url") continue;
        if (iconsWithoutExtension.includes(name)) continue;
        const icon = fileIcon(`${path}\\${name}`, 32);
        fs.writeFile(`./static/icons/${name}.png`, icon, { encoding: 'binary' });
    }

    for (const iconFile of iconsWithoutExtension) {
        if (programmsListNames.includes(iconFile)) continue
        fs.rm(`./static/icons/${iconFile}.png`)
    }
}