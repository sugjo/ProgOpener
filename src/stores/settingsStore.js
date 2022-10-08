import { writable } from 'svelte/store';

const savedSettings = await window.api.getStorage('settings')

function createPathStore() {
    const { subscribe, update } = writable(savedSettings)

    return {
        subscribe,
        update: (func) => {
            update((oldSettings) => {
                const newSettings = func(oldSettings);
                window.api.setStorage('settings', newSettings).then(() => {
                    window.api.send("load")
                });
                return newSettings;
            })
        }
    }
}

export default createPathStore();