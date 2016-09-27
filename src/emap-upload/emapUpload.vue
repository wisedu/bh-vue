<template>
    <div></div>
</template>

<script>
    /**
     * 上传组件[EMAP]
     * @module EmapUpload
     *
     * @fires add -文件新增时触发，返回data（文件信息对象）
     * @fires submit -文件提交时触发，返回data（文件信息对象）
     * @fires done -文件提交成功后触发，返回data（文件信息对象）
     * @fires fail -文件提交失败时触发，返回data（文件信息对象）
     *
     * @example
     *     <caption>html</caption>
     *     <emap-upload :limit='3'></emap-upload>
     */
    export default {
        /**
         * @property {String} contextPath 请求上下文路径
         * @property {String} [token] 授权token
         * @property {String} [storeId=file] 上传文件的类型
         * @property {String/Array} [ftype=['jpg', 'png', 'jpeg']] 上传文件的类型限制
         * @property {Number} [size=2048] 文件大小限制(Kb)
         * @property {Number} [limit=5] 上传数量限制
         * @property {String/Number} [width=200] 展示图片的宽度
         * @property {String/Number} [height=150] 展示图片的高度
         * @property {Boolean} [multiple=false] 是否支持多文件
         * @property {Boolean} [outForm=false] - 是否是表单外用法
         * @property {String} outFormUploadUrl - 表单外用法时的上传url
         * @property {String} outFormPicUrl - 表单外用法时的显示已有图片的地址
         * @property {Function} outFormDelete - 表单外用法时删除图片的接口
         * @property {String} buttonType - 按钮类型，block和button
         * @property {String} displayType - 显示类型，file和image
         * @property {Object} params - 提交文件时附带的参数对象
         */
        props: {
            'contextPath': {
                type: String,
                default: ''
            },
            'token': {
                type: String,
                default: undefined
            },
            'storeId': {
                type: String,
                default: 'file'
            },
            'ftype': {
                type: [Array, String],
                default () {
                    return ['jpg', 'png', 'jpeg'];
                }
            },
            'width': {
                default: 200
            },
            'height': {
                default: 150
            },
            'limit': {
                type: Number,
                default: 5
            },
            'size': {
                type: Number,
                default: 2048
            },
            'multiple': {
                type: Boolean,
                default: false
            },
            'buttonType': {
                type: String,
                default: 'button'
            },
            'displayType': {
                type: String,
                default: 'image'
            },
            'outForm': {
                type: Boolean,
                default: false
            },
            'outFormUploadUrl': {
                type: String,
                default: ''
            },
            'outFormPicUrl': {
                type: String,
                default: ''
            },
            'outFormDelete': {
                type: Function,
                default: function() {
                    var dtd = $.Deferred();
                    dtd.resolve(token);
                }
            },
            'params': {
                type: Object,
                default: {}
            }
        },
        methods: {
            /**
             * 获取token
             * @return {String} token
             */
            getFileToken () {
                return $(this.$el).emapUpload('getFileToken');
            },
            /**
             * 返回token下已有的正式文件的url数组
             * @return {Array} 文件url数组
             */
            getFileUrl () {
                return $(this.$el).emapUpload('getFileUrl');
            },
            /**
             * 保存文件
             * @return {String} 已保存文件的token
             */
            saveTempFile () {
                return $(this.$el).emapUpload('saveTempFile');
            },
            /**
             * 销毁
             */
            destroy () {
                $(this.$el).emapUpload('destroy');
            }
        },
        ready () {
            var vm = this;
            var el = $(this.$el);

            var type = $.isArray(this.ftype) ? this.ftype : [this.ftype];

            el.emapUpload({
                contextPath: this.contextPath,
                storeId: this.storeId,
                type: type,
                token: this.token,
                size: this.size,
                limit: this.limit,
                width: this.width,
                height: this.height,
                multiple: this.multiple,
                displayType: this.displayType,
                buttonType: this.buttonType,
                params: this.params,
                outForm: this.outForm,
                outFormUploadUrl: this.outFormUploadUrl,
                outFormPicUrl: this.outFormPicUrl,
                outFormDelete: this.outFormDelete,
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
