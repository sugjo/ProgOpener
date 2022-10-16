import settingsStore from '@/stores/settingsStore';

const addSettingItem = (settingName, newSettingItem) => {
    settingsStore.update((settings) => {
        console.log(settings);
        if (isItemAlreadyExist(settings[settingName], newSettingItem)) return settings
        return { ...settings, [settingName]: [...(settings[settingName] || []), newSettingItem] }
    });
};

const removeSettingItem = (settingName, itemFilter) => {
    settingsStore.update((settings) => {
        return { ...settings, [settingName]: settings[settingName].filter(itemFilter) }
    })
};

const changeSettingItem = (settingName, itemFilter, newSettingItem) => {
    settingsStore.update((settings) => {
        if (isItemAlreadyExist(settings[settingName], newSettingItem)) return settings
        let indexToChange = settings[settingName].indexOf(settings[settingName].find(itemFilter))
        settings[settingName][indexToChange] = newSettingItem;
        return settings
    });
};

const isItemAlreadyExist = (arrayToCheck, itemToCheck) => {
    return arrayToCheck?.find((item) =>
        JSON.stringify(item) == JSON.stringify(itemToCheck)
    )
}

export {
    addSettingItem,
    removeSettingItem,
    changeSettingItem,
}