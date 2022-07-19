export default (searchStr, files) => {
    const regex = new RegExp(`\\b${searchStr}`, 'gi');
    return files
        .filter(file => removeFileExtension(file.name).match(regex))
        .sort(sortByRegex)
        .reverse();

    function sortByRegex(a, b) {
        const regexStartWith = new RegExp(`^${searchStr}`, 'i');
        if (a.name.match(regexStartWith)) {
            if (a.name > b.name) return 1;
            if (a.name == b.name) return 0;
        }
        return -1;
    }

    function removeFileExtension(file) {
        return file.substr(0, file.lastIndexOf("."))
    }
}