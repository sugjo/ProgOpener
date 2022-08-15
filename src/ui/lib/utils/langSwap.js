import { writable } from 'svelte/store';

async function createLangSwap() {
    const langOnStart = await window.api.getSettings("lang")
    // const { subscribe, set } = writable(langOnStart.length ? langOnStart : (await window.api.osLang()).split("-")[0])
    const { subscribe, set } = writable("ru")

    return {
        subscribe,
        set: (lang) => {
            set(lang);
            window.api.setSettings("lang", lang)
        },
    }
}

export const lang = await createLangSwap();
