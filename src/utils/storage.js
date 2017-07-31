/**
 * 简单的store，支持本地localstorage、memory两种方式，
 * 如果感觉vuex使用麻烦或需要localstorage可以此替代。
 * @module utils/storage
 *
 * @example
 * <caption>javascript</caption>
 * import storage from 'storage'
 * storage.setItem('user', {name: 'qq', age: 12}); // save in memory
 * storage.setItem('user', {name: 'qq', age: 12}, true); // save in local storage
 * console.log(storage.getItem('user')) // get from memory
 * console.log(storage.getItem('user', true)) // get from local storage
 * storage.remove('user'[, true]); // remove data with key 'user'
 * storage.has('user'[, true]); // check whether key 'user' exists
 * storage.clear([true]) // clear all saved data
 */
import store from './store2';

const _localStore = store; // 本地存储

const _memStore = (function() {
    let _state = {};

    return { // TODO: 各种参数校验
        set (key, value) {
            _state[key] = value;
        },
        get (key) {
            return _state[key];
        },
        remove (key) {
            delete _state[key];
        },
        has (key) {
            return key in _state;
        },
        clear () {
            _state = {};
        }
    };
})();

const _getStore = (local) => {
    return local ? _localStore : _memStore;
};

const _validKey = (key) => {
    return key !== undefined && key !== null;
};

/**
 * 存储值或对象
 * @param {String} key 键
 * @param {Number/String/Object} value 值
 * @param {Boolean} [local=false] 是否为本地存储
 */
export const setItem = (key, value, local) => {
    if (!_validKey(key)) { // 主键检查
        return false;
    }

    _getStore(local).set(key, value);

    return true;
};

/**
 * 获取存储的值或对象
 * @param  {String} key   键
 * @param  {Boolean} [local=false] 是否为本地存储
 * @return {Object/String}  存储的值
 */
export const getItem = (key, local) => {
    if (!_validKey(key)) { // 主键检查
        return undefined;
    }

    return _getStore(local).get(key);
};

/**
 * 根据 key 删除存储
 * @param  {String} key   键
 * @param  {Boolean} [local=false] 是否为本地存储
 */
export const remove = (key, local) => {
    if (!_validKey(key)) {
        return false;
    }

    _getStore(local).remove(key);
    return true;
};

/**
 * 判断存储中是否存在 key
 * @param  {String} key   键
 * @param  {Boolean} [local=false] 是否为本地存储
 */
export const has = (key, local) => {
    if (!_validKey(key)) {
        return false;
    }

    return _getStore(local).has(key);
};

/**
 * 清空存储
 * @param  {Boolean} [local=false] 是否为本地存储
 */
export const clear = (local) => {
    return _getStore(local).clear();
};

export default {
    setItem,
    getItem,
    remove,
    has,
    clear
};
