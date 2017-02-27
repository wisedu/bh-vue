module.exports = function (url, params, pageConf) {
    //pageConf.pagenum, pageConf.pagesize
    let page = {
        pageNumber: pageConf.pageNum + 1,
        pageSize: pageConf.pageSize || 10
    };

    let queryParams = $.extend({}, params);
    if(pageConf.enable) {
        queryParams = $.extend({}, page, params);
    }

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
