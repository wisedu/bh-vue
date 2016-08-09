<template>
    <div></div>
</template>

<script>
    /**
     * 富文本编辑器 【目前支撑的EMAP组件不好扩展callbacks】
     * @module EmapEditor
     *
     * @example
     *     <caption>html</caption>
     *     <emap-editor :options='options'></emap-editor>
     * @example
     *     <caption>javascript</caption>
     *     export default {
     *         data: function() {
     *             return {
     *                 options: {
     *                     contextPath: 'mock'
     *                 }
     *             }
     *         },
     *         ready: function() {
     *         },
     *         components: {EmapEditor}
     *    }
     */

    export default {
        /**
         * @property {Object} options 初始化参数配置
         * @property {String} options.contextPath 支持上传的服务器地址
         * @property {String} [options.placeholder] 输入提示文字
         * @property {Boolean} [options.fullFilePath=false] 保存文件和图片的绝对路径
         * @property {Boolean} [options.dialogsInBody=false] 弹出框是否显示在页面body区域，而非编辑器区域
         * @property {Boolean} [options.disableDragAndDrop=true] 是否禁止拖放
         */
        props: {
            options: Object
        },
        methods: {
            /**
             * 获取编辑器内容
             * @return {String} 编辑器内容
             */
            getValue () {
                return $(this.$el).emapEditor('getValue');
            },
            /**
             * 设置编辑器内容
             * @param {String} text 要设置的编辑器内容
             */
            setValue (text) {
                $(this.$el).emapEditor('setValue', text);
            },
            /**
             * 启用
             */
            enable () {
                $(this.$el).emapEditor('enable');
            },
            /**
             * 禁用
             */
            disable () {
                $(this.$el).emapEditor('disable');
            },
            /**
             * 清空
             */
            clear () {
                $(this.$el).emapEditor('clear');
            },
            /**
             * 内容是否为空
             * @return {Boolean} 为空则返回true，否则返回false
             */
            isEmpty () {
                return $(this.$el).emapEditor('isEmpty');
            }
        },
        ready () {
            $(this.$el).emapEditor(this.options);
        },
        beforeDestroy () {
            $(this.$el).emapEditor('destroy');
        }
    };
</script>

<style>
    .note-editor.panel-default > .panel-heading {
        color: #333;
        background-color: #f5f5f5;
        border-color: #ddd;
    }
    .note-editor .panel-heading {
        border-bottom: 1px solid transparent;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
    }
</style>
