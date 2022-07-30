export default function (element, callbackFunction) {
    function onClick(event) {
        if (!element.contains(event.target)) {
            callbackFunction();
        }
    }

    document.body.addEventListener('click', onClick);
    document.body.addEventListener('contextmenu', onClick);
    document.body.addEventListener('auxclick', onClick);

    return {
        update(newCallbackFunction) {
            callbackFunction = newCallbackFunction;
        },
        destroy() {
            document.body.removeEventListener('click', onClick);
            document.body.removeEventListener('contextmenu', onClick);
            document.body.removeEventListener('auxclick', onClick);
        }
    }
}