import { writable } from 'svelte/store';
import { createI18nStore } from "svelte-i18next";
import i18next from "i18next";
import HttpApi from 'i18next-http-backend';
import LanguageDetector from "i18next-browser-languagedetector";

let savedLang = await window.api.getStorage('lang')

function createLangSwap() {
    const { subscribe, set } = writable(savedLang || "ru")

    return {
        subscribe,
        set: (lang) => {
            set(lang);
            window.api.setStorage("lang", lang)
        },
    }
}

export const lang = createLangSwap();

i18next
    .use(LanguageDetector)
    .use(HttpApi)
    .init({
        supportedLngs: ['en', 'ru'],
        fallbackLng: "en",
        detection: {
            order: ['cookie', 'localStorage', 'htmlTag', 'path', 'subdomain'],
            caches: ['cookie']
        },
        debug: false,
        backend: {
            loadPath: `${window.api.getLangPath()}/{{lng}}.json`
        }
    });

lang.subscribe(async (value) => {
    i18next.changeLanguage(value)
})

export const i18n = createI18nStore(i18next);
