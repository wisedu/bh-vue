<template>
    <footer></footer>
</template>

<script>
    /**
     * 页脚
     * @module BhFooter
     *
     * @example
     *     <caption>html</caption>
     *     <bh-footer copyright='powered by xxx.yy.z'></bh-footer>
     */
    export default {
        /**
         * @property {String} copyright 版权信息
         */
        props: ['copyright'],
        mounted () {
            this.$nextTick(() => {
                $(this.$el).bhFooter({
                    text: this.copyright // 必填，显示的文本
                });
            });
            // console.log('footer ready');
            // BH_UTILS.setContentMinHeight($("main"), "noHeader");
        }
    };
</script>
