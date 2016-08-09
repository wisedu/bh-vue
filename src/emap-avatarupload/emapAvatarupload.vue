<template>
    <div></div>
</template>

<script>
    /**
     * 头像裁剪上传[EMAP]
     * @module EmapAvatarupload
     *
     * @fires submit -文件提交时触发，参数为 token，未上传时token为undefined
     *
     * @example
     *     <caption>html</caption>
     *     <emap-avatarupload ftype='png'></emap-avatarupload>
     */
    export default {
        /**
         * @property {String} contextPath 请求上下文路径
         * @property {String} [token] 授权token，已有头像传入
         * @property {String} [storeId=file] 存储id
         * @property {String/Array} [ftype] 上传文件的类型限制
         * @property {Number} [size=2048] 文件大小限制（单位为 Kb）
         * @property {Number} [width=100] 头像容器宽度
         * @property {Number} [ratio=1] 头像宽高比
         * @property {String} defaultAvatar 默认头像路径，上传新头像时必填
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
            'width': {
                type: Number,
                default: 100
            },
            'ratio': {
                type: Number,
                default: 1
            },
            defaultAvatar: String
        },
        methods: {
            /**
             * 获取token
             * @return {String} token
             */
            getFileToken () {
                return $(this.$el).emapAvatarUpload('getFileToken');
            },
            /**
             * 返回token下已有的正式文件的url数组
             * @return {Array} 文件url数组
             */
            getFileUrl () {
                return $(this.$el).emapAvatarUpload('getFileUrl');
            },
            /**
             * 保存文件
             * @return {String} 已保存文件的token
             */
            saveTempFile () {
                return $(this.$el).emapAvatarUpload('saveTempFile');
            },
            /**
             * 销毁
             */
            destroy () {
                $(this.$el).emapAvatarUpload('destroy');
            }
        },
        ready () {
            var vm = this;
            var el = $(this.$el);

            var type = $.isArray(this.ftype) ? this.ftype : [this.ftype];

            el.emapAvatarUpload({
                contextPath: this.contextPath,
                storeId: this.storeId,
                type: type,
                token: this.token,
                size: this.size,
                ratio: this.ratio,
                width: this.width,
                defaultAvatar: this.defaultAvatar,
                onSubmit (token) {
                    vm.$dispatch('submit', token);
                }
            });
        },
        beforeDestroy () {
            this.destroy();
        }
    };
</script>
