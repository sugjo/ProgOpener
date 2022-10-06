import translitReverse from "./translitReverse";

export default (searchStr, files) => {
    if (!files) return;
    const regex = new RegExp(`${searchStr}`, 'gi');
    const reversedRegex = new RegExp(`^${translitReverse(searchStr)}`, 'gi');

    let filteredFiles = files
        .filter(file => removeFileExtension(file.name).match(regex))
        .sort((a, b) => sortByRegexp(new RegExp(`^${searchStr}`, 'i'), a, b))
        .reverse();

    let filteredReversedFiles = files
        .filter(file => removeFileExtension(file.name).match(reversedRegex))
        .sort((a, b) => sortByRegexp(new RegExp(`^${translitReverse(searchStr)}`, 'i'), a, b))
        .reverse();

    return filteredFiles.concat(filteredReversedFiles)

    function sortByRegexp(regexp, a, b) {
        if (a.name.match(regexp)) {
            if (a.name > b.name) return 1;
            if (a.name == b.name) return 0;
        }
        return -1;
    }

    function removeFileExtension(file) {
        return window.path.basename(file).replace(window.path.extname(file), "");
    }
}