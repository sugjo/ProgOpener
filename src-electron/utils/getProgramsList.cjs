const fs = require("mz/fs");

module.exports = async function (paths) {
    if (!paths) return;

    let findedFiles = [];

    for await (const { path, disabled } of paths) {
        if (disabled) return
        const files = await fs.readdir(path)
        findedFiles.push(...files.map((e) => { return { name: e, path } }));
    }

    return findedFiles
}