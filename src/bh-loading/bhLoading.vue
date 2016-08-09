<template>
    <div></div>
</template>

<script>
    /**
     * 加载提示
     * @module BhLoading
     *
     * @example
     *     <caption>html</caption>
     *     <bh-loading :model='loading.model' :open='loading.open'></bh-loading>
     * @example
     *     <caption>javascript</caption>
     *     export default {
     *         data: function() {
     *             return {
     *                 loading: {
     *                     open: false,
     *                     model: true
     *                 }
     *             }
     *         },
     *         methods: {
     *             open: function() {
     *                 this.loading.open = true;
     *             },
     *             close: function() {
     *                 this.loading.open = false;
     *             }
     *         },
     *         components: {BhLoading}
     *    }
     */
    export default {
        data () {
            return {
                jqxObj: null
            };
        },
        /**
         * @property {Boolean} [open=true] 是否显示
         * @property {Boolean} [modal=false] 是否为模态框
         * @property {String} [text=加载中] 提示文字
         */
        props: {
            open: {
                default: true
            },
            model: {
                default: false
            },
            text: {
                default: '加载中'
            }
        },
        ready () {
            var self = this;
            var el = $(this.$el);

            this.jqxObj = el.jqxLoader({
                autoOpen: this.open,
                isModal: this.model,
                text: this.text
            });

            this.$watch('open', (isOpen) => {
                var method = isOpen ? 'open' : 'close';
                self.jqxObj.jqxLoader(method);
            });
        },
        beforeDestroy () {
            var el = $(this.$el);
            el.jqxLoader('destroy');
        }
    };
</script>

<style scoped>
    input {
        width: 100%;
    }
</style>
