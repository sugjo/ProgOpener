let isQuitting = false;

module.exports.setIsAppQuitting = function (quitting) {
    isQuitting = quitting;
}

module.exports.isAppQuitting = function () {
    return isQuitting;
}