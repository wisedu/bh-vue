<template>
    <div></div>
</template>

<script>
    /**
     * 下拉表格
     * @module EmapDbTable
     *
     * @example
     *     <caption>html</caption>
     *     <emap-dd-table v-ref:ddt :options='options'></emap-dd-table>
     * @example
     *     <caption>javascript</caption>
     *     export default {
     *        data: function() {
     *            return {
     *                options: {
     *                    url: 'http://localhost:3000/mock/emap/code.json'
     *                }
     *            }
     *        },
     *        methods: {
     *            getVal: function() {
     *                console.log(this.$refs.ddt.getValue());
     *            }
     *        },
     *      components: {EmapDdTable}
     *     }
     */
    export default {
        /**
         * @property {Object} options 参数配置
         * @property {String} options.url 资源请求的url
         * @property {String} options.actionName 模型名称
         * @property {String} [options.valueMember=id] 主键名称
         * @property {String} [options.displayMember=name] 显示名称
         * @property {Array} [options.hideMember] 要隐藏的元素数组
         * @property {String} [options.width=300] 宽度设置
         * @property {Function} [options.formatData] 对请求参数做自定义处理，比如附加其他参数
         */
        props: {
            options: Object
        },
        methods: {
            /**
             * 获取选择值
             * @return {String} 选择项的 id
             */
            getValue () {
                return $(this.$el).emapDropdownTable('getValue');
            },
            /**
             * 设置选择值
             * @param {Array} val 格式为[value, descripton]，若value不存在则新增一项
             */
            setValue (val) {
                $(this.$el).emapDropdownTable('getValue', val);
            },
            /**
             * 销毁
             */
            destroy () {
                $(this.$el).emapDropdownTable('destroy');
            }
        },
        ready () {
            var self = this;
            var el = $(self.$el);

            el.emapDropdownTable(self.options);
        },
        beforeDestory () {
            this.destroy();
        }
    };
</script>
