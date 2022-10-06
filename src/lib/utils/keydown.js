import { emulateKey } from 'emulate-key-in-browser';

export default function (element, callbackFunction) {
    function onKeydown(e) {
        let wrongKey = ['Tab', 'Space', 'Enter', 'Shift'];
        for (const key of wrongKey) if (e.key == key) return;

        if (e.key == 'ArrowUp') {
            e.preventDefault();
            return emulateKey.shiftTab();
        }

        if (e.key == 'ArrowDown') {
            e.preventDefault();
            return emulateKey.tab();
        }

        callbackFunction()
    }


    window.addEventListener('keydown', onKeydown);

    return {
        update(newCallbackFunction) {
            callbackFunction = newCallbackFunction;
        },
        destroy() {
            window.removeEventListener('keypress', onKeydown);
        }
    }
}