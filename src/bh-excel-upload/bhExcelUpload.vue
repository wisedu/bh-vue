<template>
    <div>
        <bh-button @click='doImport'>{{options.btnText}}</bh-button>
    </div>
</template>

<script>
    /**
     * 表格导入组件
     * @module BhExcelUpload
     *
     * @example
     * <caption>html</caption>
     * <bh-excel-upload :options='options'></bh-excel-upload>
     * 
     * @example
     * <caption>javascript</caption>
     * export default {
     *   data: () => ({
     *       options: {
     *           btnText: '导入Excel',
     *           filetype: ['.xls'], // 支持的文件类型，默认为 ['.xls', '.xlsx']
     *           url: 'http://172.16.7.75:8000/bh-vue/excelimport/upload', // 上传路径
     *           onFileUploaded (e, data) {
     *               console.log(data); // 可以在此处保存data返回的 token，假如有的话
     *           },
     *           doCheck (data) {
     *               // 模拟数据校验处理，可以自定义请求和返回格式，只要 resolve 按格式提供就行
     *               return new Promise(resolve => {
     *                   setTimeout(() => {
     *                       resolve({isSuccess: true, success: 10, total: 10});
     *                   }, 1000);
     *               });
     *               // 失败时返回成功条数
     *               // return Promise.resolve({isSuccess: false, success: 10, total: 20});
     *           },
     *           doImport (e, opt, downTplData, options) {
     *              // 模拟导入处理，可以自定义请求和返回格式，只要 resolve 按格式提供就行
     *              return new Promise(resolve => {
     *                  setTimeout(() => {
     *                      resolve({count: 10});
     *                  }, 1000);
     *              });
     *          }
     *       }
     *   })
     * }
    */
    import BhButton from '../bh-button/bhButton';
    import adapter from './uploadAdapter';

    const ADAPTER_NAME = '__BH_EXCEL_UPLOAD_ADAPTER__'; // emap必须全局注册插件，so ...

    window[ADAPTER_NAME] = window[ADAPTER_NAME] || adapter;

    export default {
        data () {
            return {
                iv: null // import view
            };
        },
        /**
         * @property {Object} options 上传参数配置
         * @property {String} url 文件上传请求路径
         * @property {String} [btnText=导入] 上传按钮文字
         * @property {String} [filetype=['.xls', '.xlsx']] 支持文件格式
         * @property {Function} [onFileUploaded] 文件上传后的回调
         * @property {Function} doCheck 文件校验处理，返回 promise，格式见示例
         * @property {Function} doImport 文件导入处理，返回 promise，格式见示例
         * @property {Function} downloadErrorFile 导入错误文件下载处理
         * @property {Function} downloadTmplFile 模板文件下载处理
         */
        props: {
            options: {
                type: Object,
                required: true,
                default () {
                    return {
                        btnText: '导入',
                        filetype: ['.xls', '.xlsx']
                    };
                }
            }
        },
        methods: {
            doImport () {
                let opts = $.extend({adaptor: ADAPTER_NAME}, this.options);
                const iv = $.emapImport2(opts);

                this.iv = iv;
            }
        },
        ready () {
        },
        beforeDestroy () {
            this.iv && this.iv.close();
        },
        components: {BhButton}
    };
</script>
