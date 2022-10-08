export default function (element, callbackFunction) {
    let isDrag = false;
    function onClick(event) {
        if (!element.contains(event.target) && !isDrag) {
            callbackFunction();
        }
        isDrag = false;
    }

    document.body.addEventListener('click', onClick);
    element.addEventListener('mousedown', () => (isDrag = true));
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