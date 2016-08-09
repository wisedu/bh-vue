<template>
    <textarea v-model='value'></textarea>
</template>

<script>
    /**
     * 文本区域
     * @module BhTextarea
     *
     * @example
     * <caption>html</caption>
     * <bh-textarea placeholder='输点东东' :value.sync='val' :source='candidates' :disabled='true'></bh-textarea>
     */
    export default {
        data () {
            return {
                jqxObj: null
            };
        },
        /**
         * @property {String} value 输入的文本值
         * @property {String} [placeholder] 占位提示文字
         * @property {Array} [source] 输入自动提示
         * @property {Boolean} [disabled=false] 是否禁用
         */
        props: ['value', 'placeholder', 'source', 'disabled'],
        ready () {
            // var self = this;
            var el = $(this.$el);

            this.jqxObj = el.jqxTextArea({
                placeHolder: this.placeholder,
                source: this.source ? this.source : [],
                disabled: this.disabled
            });

            this.$watch('disabled', (val) => {
                el.jqxTextArea({disabled: val});
            });
        },
        beforeDestroy () {
            var el = $(this.$el);
            el.jqxTextArea('destroy');
        }
    };
</script>
