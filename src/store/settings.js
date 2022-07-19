import { writable } from 'svelte-local-storage-store';

const settingsData = {
    paths: [
        "D:\\Links"
    ]
};

export const settings = writable('settings', settingsData);

export const settingsToDefault = () => settings.set(settingsData);