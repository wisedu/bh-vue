<template>
    <div></div>
</template>

<script>
    /**
     * 文件上传[EMAP]
     * @module EmapFileupload
     *
     * @fires add -文件新增时触发，返回data（文件信息对象）
     * @fires submit -文件提交时触发，返回data（文件信息对象）
     * @fires done -文件提交成功后触发，返回data（文件信息对象）
     * @fires fail -文件提交失败时触发，返回data（文件信息对象）
     *
     * @example
     *     <caption>html</caption>
     *     <emap-fileupload ftype='png'></emap-fileupload>
     */
    export default {
        /**
         * @property {String} contextPath 请求上下文路径
         * @property {String} [token] 授权token
         * @property {String} [storeId=file] 上传文件的类型
         * @property {String/Array} ftype 上传文件的类型限制
         * @property {Number} [size=2048] 文件大小限制(Kb)
         * @property {Boolean} [newToken=true] 是否需要新的token
         */
        props: {
            'contextPath': {
                type: String,
                default: ''
            },
            'token': {
                type: String,
                default: ''
            },
            'storeId': {
                type: String,
                default: 'file'
            },
            'ftype': {
                type: [Array, String],
                default () {
                    return [];
                }
            },
            'size': {
                type: Number,
                default: 2048
            },
            'newToken': {
                type: Boolean,
                default: true
            }
        },
        methods: {
            /**
             * 获取token
             * @return {String} token
             */
            getFileToken () {
                return $(this.$el).emapFileUpload('getFileToken');
            },
            /**
             * 返回token下已有的正式文件的url数组
             * @return {Array} 文件url数组
             */
            getFileUrl () {
                return $(this.$el).emapFileUpload('getFileUrl');
            },
            /**
             * 返回token下已有的正式文件的信息
             * @return {Object} 文件信息
             */
            getFileData () {
                return $(this.$el).emapFileUpload('getFileData');
            },
            /**
             * 保存文件
             * @return {String} 已保存文件的token
             */
            saveTempFile () {
                return $(this.$el).emapFileUpload('saveTempFile');
            },
            /**
             * 获取文件数目
             * @return {Number} 文件数目
             */
            getFileNum () {
                return $(this.$el).emapFileUpload('getFileNum');
            },
            /**
             * 销毁
             */
            destroy () {
                return $(this.$el).emapFileUpload('destroy');
            }
        },
        ready () {
            var vm = this;
            var el = $(this.$el);

            var type = $.isArray(this.ftype) ? this.ftype : [this.ftype];

            el.emapFileUpload({
                contextPath: this.contextPath,
                storeId: this.storeId,
                type: type,
                token: this.token,
                size: this.size,
                newToken: this.newToken,
                add (e, data) {
                    vm.$dispatch('add', data);
                },
                submit (e, data) {
                    vm.$dispatch('submit', data);
                },
                done (e, data) {
                    vm.$dispatch('done', data);
                },
                fail (e, data) {
                    vm.$dispatch('fail', data);
                }
            });
        },
        beforeDestroy () {
            this.destroy();
        }
    };
</script>
