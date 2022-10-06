const AutoLaunch = require('auto-launch');

const autoLauncher = new AutoLaunch({
    name: "ProgOpener"
});

module.exports.enable = autoLauncher.enable;
module.exports.disable = autoLauncher.disable;
module.exports.isEnabled = autoLauncher.isEnabled();