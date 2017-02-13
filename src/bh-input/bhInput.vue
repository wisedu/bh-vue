<template>
    <input type="text" v-model='value' :disabled='disabled'>
</template>

<script>
    /**
     * 输入框
     * @module BhInput
     *
     * @example
     *     <caption>html</caption>
     *     <bh-input placeholder='请输入问题'></bh-input>
     */
    export default {
        data () {
            return {
                jqxObj: null
            };
        },
        /**
         * @property {String} value 输入值
         * @property {String} [placeholder] 提示文字
         * @property {Array} [source] 自动完成的提示列表
         * @property {Boolean} [disabled=false] 是否禁用
         */
        props: ['value', 'placeholder', 'source', 'disabled'],
        methods: {
            /**
             * 获取输入值
             * @return {String} 输入的字符串
             */
            getValue () {
                return this.value;
            }
        },
        mounted () {
            var self = this;

            self.$nextTick(() => {
                var el = $(self.$el);

                self.jqxObj = el.jqxInput({
                    placeHolder: self.placeholder,
                    source: self.source ? self.source : [],
                    disabled: self.disabled
                });

                self.$watch('disabled', (newVal) => {
                    if(newVal) {
                        self.jqxObj.jqxInput({disabled: true});
                    }else {
                        self.jqxObj.jqxInput({disabled: false});
                    }
                });
            });
        },
        beforeDestroy () {
            var el = $(this.$el);
            el.jqxInput('destroy');
        }
    };
</script>

<style scoped>
    input {
        width: 100%;
    }
</style>
