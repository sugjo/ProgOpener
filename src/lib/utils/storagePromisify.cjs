const storage = require('electron-json-storage');

module.exports.set = (key, data) => new Promise((resolve, reject) => {
    storage.set(key, data, (error) => {
        if (error) reject(error);
        resolve();
    });
});

module.exports.get = (key) => new Promise((resolve, reject) => {
    storage.get(key, (error, data) => {
        if (error) reject(error);
        resolve(data);
    });
});

module.exports.getMany = (keys) => new Promise((resolve, reject) => {
    storage.getMany(keys, (error, data) => {
        if (error) reject(error);
        resolve(data);
    });
});

module.exports.getAll = (key) => new Promise((resolve, reject) => {
    storage.getAll((error, data) => {
        if (error) reject(error);
        resolve(data);
    });
});

module.exports.has = (key) => new Promise((resolve, reject) => {
    storage.has(key, (error, hasKey) => {
        if (error) reject(error);
        resolve(hasKey);
    });
});

module.exports.remove = (key) => new Promise((resolve, reject) => {
    storage.remove(key, (error) => {
        if (error) reject(error);
        resolve();
    });
});

module.exports.clear = () => new Promise((resolve, reject) => {
    storage.clear((error) => {
        if (error) reject(error);
        resolve();
    });
});