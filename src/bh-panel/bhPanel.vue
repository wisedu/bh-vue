<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
    /**
     * 面板组件
     * @module BhPanel
     *
     * @example
     * <caption>html</caption>
     * <bh-panel title='用户信息' caption='个人隐私，请勿泄漏' tag='隐私'>
     *     <div>
     *         <p>个人信息面板内容</p>
     *         <p>个人信息面板内容</p>
     *         <p>个人信息面板内容</p>
     *         <p>个人信息面板内容</p>
     *     </div>
     * </bh-panel>
     */
    export default {
        /**
         * @property {String} title 大标题内容，可以是传纯文本或html
         * @property {String} [caption] 小标题内容，可以是传纯文本或html
         * @property {Boolean} [hasBorder=true] 是否显示边框
         * @property {String} [tag] 标签 html
         * @property {String} [toolbar] 标签 html
         * @property {Function} [beforeExpand] 展开面板前的回调
         * @property {Function} [afterExpand] 展开面板后的回调
         * @property {Function} [beforeCollapse] 收缩面板前的回调
         * @property {Function} [afterCollapse] 收缩面板后的回调
         */
        props: {
            title: String,
            caption: String,
            tag: String,
            toolbar: String,
            hasBorder: {
                type: Boolean,
                default: true
            },
            beforeExpand: Function,
            afterExpand: Function,
            beforeCollapse: Function,
            afterCollapse: Function
        },
        mounted () {
            var self = this;

            self.$nextTick(() => {
                var el = $(this.$el);

                el.bhCollapsiblePanel({
                    title: self.title,
                    caption: self.caption,
                    hasBorder: self.hasBorder,
                    tag: self.tag,
                    toolbar: self.toolbar,
                    beforeExpand: self.beforeExpand,
                    afterExpand: self.afterExpand,
                    beforeCollapse: self.beforeCollapse,
                    afterCollapse: self.afterCollapse
                });
            });
        }
    };
</script>
