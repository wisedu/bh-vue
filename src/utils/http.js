/**
 * 通用 http 请求方法
 * @module http
 */

let http = Vue.http;

// 封装一些通用处理，更方便的解析返回数据格式
// 只需要判断返回结果是否正常
let _code = (data) => {
    if (data && data.code === 0) {
        return data;
    } else {
        throw (data && data.code);
    }
};

// 一般是emap返回的数据格式
let _rows = (data) => {
    if (data && data.datas && data.datas.rows) {
        return data.datas.rows;
    } else {
        return [];
    }
};

// 列表数据
let _datas = (data) => {
    if (data && data.datas) {
        return data.datas;
    } else {
        return [];
    }
};

// 一般用来获取emap表单数据
let _firstRow = (data) => {
    if (data && data.datas && data.datas.rows) {
        return data.datas.rows[0];
    } else {
        return null;
    }
};

/**
 * @memberof module:http
 * 简化一下ajax调用，基于 [vue resource]
 */
export const postJson = (url, params, processFunc) => {
    return http.post(url, params).then((response) => {
        return processFunc ? processFunc(response.data) : response.data;
    });
};

/**
 * @memberof module:http
 * 简化一下ajax调用，基于 [vue resource]，使用form-urlencoded方式
 */
export const postForm = (url, params, processFunc) => {
    // 需要jquery设置 traditional 处理参数格式给后端处理
    return http.post(url, $.param(params, true), {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then((response) => {
        return processFunc ? processFunc(response.data) : response.data;
    });
};

/**
 * @memberof module:http
 * 简化一下ajax调用，基于 [vue resource]，使用get方式发送请求
 */
export const getJson = (url, params, processFunc) => {
    return http.get(url, params).then((response) => {
        return processFunc ? processFunc(response.data) : response.data;
    });
};

/**
 * @memberof module:http
 * 简化一下ajax调用，基于bh_util中封装的方法
 */
export const promiseReq = (url, params, processFunc) => {
    return new Promise((resolve, reject) => {
        BH_UTILS.doAjax(url, params, 'POST').done((response) => {
            if (processFunc) {
                try {
                    resolve(processFunc(response));
                } catch (e) {
                    reject();
                }
            } else {
                resolve(response);
            }
        }).fail((...args) => {
            reject(args);
        });
    });
};

export const handler = {
    CODE: _code,
    ROWS: _rows,
    DATAS: _datas,
    FIRST_ROW: _firstRow
};
