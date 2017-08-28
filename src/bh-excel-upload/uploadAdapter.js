/**
 * 全局唯一 Adapter，所以必须实现为无状态对象！！！
 */
const _checkFileType = function (fileName, types) {
    if (!fileName || !types || types.length === 0) {
        return true;
    }

    var m = fileName.match(/\.\w+$/);
    if (m && m.length !== 1) {
        return false;
    }

    var ext = m[0];
    return $.inArray(ext, types) > -1;
};

const noop = () => {};

module.exports = {
    init: function (view, options, downTplData) {
        // view related callbacks
        var onUploading = options.onUploading;
        var onUploaded = options.onUploaded;
        var onChecking = options.onChecking;
        var onChecked = options.onChecked;

        // user defined callbacks
        var onError = options.onError;
        var onFileUploaded = options.onFileUploaded;
        var doCheck = options.doCheck; // Promise
        var beforeSubmit = options.beforeSubmit;
        var filetype = options.filetype || ['.xls', '.xlsx'];

        var url = options.url;

        if (!url) {
            console.error('[excel import] no upload url specified !');
            return;
        }

        if (!doCheck) {
            console.error('[excel import] need a doCheck function !');
            return;
        }

        var input = view.find('input[type=file]');

        function check (data) {
            onChecking();

            doCheck(data).then(function (res) {
                // 校验成功，返回 res 包含条数：{success: 2}
                onChecked($.extend({isSuccess: true}, res));
            }).catch(function (res) {
                // 校验失败，返回 res 包含条数，如 {success: 1, total: 2}
                onChecked($.extend({isSuccess: false}, res));
            });
        }

        options = {
            url: url,
            autoUpload: true,
            dataType: 'json',
            add: function (e, data) {
                onUploading(data.files && data.files[0], data);

                // 校验文件类型
                if (filetype && filetype.length > 0 && data.files && data.files.length > 0) {
                    if (!_checkFileType(data.files[0].name, filetype)) {
                        onError && onError({data: data, etype: 'format', msg: '不支持的文件格式'});
                        // TODO: emapImport2 需要提供此方法入口
                        view.renderUploadFormatError && view.renderUploadFormatError();
                        return;
                    }
                }

                // 若前置校验显示返回 false，则不进行提交操作
                if (beforeSubmit && (beforeSubmit(e, data) === false)) {
                    return;
                }

                data.submit();
            },
            done: function (e, data) {
                onUploaded({isSuccess: true, data: data, e: e});
                onFileUploaded && onFileUploaded(e, data);
                check(data);
            },
            fail: function (e, data) {
                onUploaded({isSuccess: false});
                onError && onError({data: data, etype: 'upload', msg: '上传失败'});
            }
        };

        input.fileupload(options);
    },
    // 导入数据
    importData: function (e, opt, downTplData, options) {
        this.import(e, opt, downTplData, options);
    },
    // 只导入正确数据
    importRightData: function (e, opt, downTplData, options) {
        this.import(e, opt, downTplData, options);
    },
    // 下载包含导入错误的文件
    downErrorData: function (e, opt, downTplData, options) {
        var downloadErrorFile = opt.downloadErrorFile;
        downloadErrorFile && downloadErrorFile(e, opt, downTplData, options);
    },
    // 下载导入模板
    downImportTpl: function (e, opt, downTplData, options) {
        var downloadTmplFile = opt.downloadTmplFile;
        downloadTmplFile && downloadTmplFile(e, opt, downTplData, options);
    },
    import: function (e, opt, downTplData, options) {
        var onFileImporting = options.onFileImporting || noop;
        var onFileImported = options.onFileImported || noop;

        var doImport = opt.doImport; // Promise

        if (!doImport) {
            console.error('[excel import] need doImport callback!');
            return;
        }

        onFileImporting();
        doImport(e, opt, downTplData, options).then(function (res) {
            // 导入成功，结果包含条数: {count: 2}
            onFileImported(res);
        }).catch(function (e) {
            onFileImported({count: 0});
        });
    }
};
