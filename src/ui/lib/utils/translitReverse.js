export default (searchStr) => {
    const isEnStr = !!searchStr.match(new RegExp(`^\\w+`, 'gi'));
    const replacer = {
        "q": "й", "w": "ц", "e": "у", "r": "к", "t": "е", "y": "н", "u": "г",
        "i": "ш", "o": "щ", "p": "з", "[": "х", "]": "ъ", "a": "ф", "s": "ы",
        "d": "в", "f": "а", "g": "п", "h": "р", "j": "о", "k": "л", "l": "д",
        ";": "ж", "'": "э", "z": "я", "x": "ч", "c": "с", "v": "м", "b": "и",
        "n": "т", "m": "ь", ",": "б", ".": "ю", "/": ".",
    }

    if (isEnStr) return searchStr.split("").map((e) => replacer[e]).join("");
    else return searchStr.split("").map((e) => getKeyByValue(replacer, e)).join("");
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}