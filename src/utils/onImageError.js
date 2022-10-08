export default function (element, callbackFunction) {
    function setErrorIcon() {
        element.src = "public://images/empty.svg"
    }

    element.addEventListener('error', setErrorIcon);

    return {
        update(newCallbackFunction) {
            callbackFunction = newCallbackFunction;
        },
        destroy() {
            element.removeEventListener('error', setErrorIcon);
        }
    }
}