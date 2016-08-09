<template>
    <div></div>
</template>

<script>
    /**
     * 高级搜索，包含条件构造器
     * @module EmapSearchAdv
     *
     * @fires search - 执行查询时触发，参数为查询的params对象
     *
     * @example
     *     <caption>html</caption>
     *     <emap-search-adv model-url='http://res.wisedu.com/fe_components/mock/advencedQueryModel.json' @search='search'></emap-search-adv>
     * @example
     *     <caption>javascript</caption>
     *     export default {
     *         methods: {
     *             search: function(params) {
     *                 console.log(params);
     *             }
     *         },
     *         components: {EmapSearchAdv}
     *     }
     */
    export default {
        /**
         * @property {String} modelUrl 数据模型请求地址
         * @property {String} modelName 模型名称
         * @property {String} [searchModel=easy] 默认的搜索模式，支持 'easy'/'advanced'
         * @property {Object} [defaultItem] 高级搜索模式的默认值，如 {"XM" : "11", "XH" : "123"}
         * @property {Boolean} [allowAllOption=true] 是否显示快速搜索模式下buttonlist的“全部”选项按钮
         * @property {Boolean} [formType=false] 表单中使用的模式, 开启后,隐藏简单搜索的文本框与搜索按钮,隐藏高级模式的按钮
         */
        props: {
            modelUrl: String,
            modelName: String,
            searchModel: {
                type: String,
                default: 'easy'
            },
            defaultItem: Object,
            allowAllOption: {
                type: Boolean,
                default: true
            },
            formType: {
                type: Boolean,
                default: false
            }
        },
        ready () {
            var vm = this;
            var el = $(vm.$el);

            var searchData = WIS_EMAP_SERV.getModel(vm.modelUrl, vm.modelName, 'search');
            el.emapRulesConstructor({
                data: searchData,
                formType: this.formType,
                searchModel: this.searchModel,
                defaultItem: this.defaultItem,
                allowAllOption: this.allowAllOption
            });

            el.on('search', (e, params, data) => {
                vm.$dispatch('search', params);
            });
        },
        methods: {
            /**
             * 获取当前的搜索条件
             * @return {String} 序列化的搜索条件
             */
            getValue () {
                return $(this.$el).emapAdvancedQuery('getValue');
            },
            /**
             * 搜索条件赋值（只能在高级搜索模式下使用）
             * @param {Object} data 对象数组或者字符串
             */
            setValue (data) {
                $(this.$el).emapAdvancedQuery('setValue', data);
            },
            /**
             * 清空高级搜索组件中的条件
             */
            clear () {
                $(this.$el).emapAdvancedQuery('clear');
            }
        },
        beforeDestroy () {
            var vm = this;
            var el = $(vm.$el);

            el.off('search');
        }
    };
</script>
