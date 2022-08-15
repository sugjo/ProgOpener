import i18next from "i18next";
import { createI18nStore } from "svelte-i18next";
import { lang } from '../lib/utils/langSwap'
import HttpApi from 'i18next-http-backend';
import LanguageDetector from "i18next-browser-languagedetector";

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
        debug: true,
        backend: {
            loadPath: '../lang/{{lng}}.json'
        }
    });

lang.subscribe(async (value) => {
    i18next.changeLanguage(value)
})



export default createI18nStore(i18next);