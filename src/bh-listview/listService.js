module.exports = function (url, params, pageNum, pageSize) {
    let page = {
        pageNumber: pageNum || 1,
        pageSize: pageSize || 10
    };

    let queryParams = $.extend({}, page, params);

    return new Promise((resolve, reject) => {
        BH_UTILS.doAjax(url, queryParams, 'POST').done((response) => {
            // TODO: 返回结果是否正确
            try {
                resolve(response);
            } catch (e) {
                reject();
            }
        }).fail((...args) => {
            reject(args);
        });
    });
};
