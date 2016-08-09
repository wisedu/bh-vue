<template>
    <div></div>
</template>

<script>
    /**
     * 普通多条件搜索
     * @module EmapSearch
     *
     * @fires search - 执行查询时触发，参数为查询的params对象
     *
     * @example
     *     <caption>html</caption>
     *     <emap-search model-url='http://res.wisedu.com/fe_components/mock/advencedQueryModel.json' @search='search'></emap-search>
     * @example
     *     <caption>javascript</caption>
     *     export default {
     *         methods: {
     *             search: function(params) {
     *                 console.log(params);
     *             }
     *         },
     *         components: {EmapSearch}
     *     }
     */
    export default {
        /**
         * @property {String} modelUrl 数据模型请求地址
         * @property {String} modelName 模型名称
         * @property {String} [searchModel=easy] 默认的搜索模式，支持 'easy'/'advanced'
         * @property {Boolean} [schema=false] 是否开启保存方案功能
         * @property {Object} [defaultItem] 高级搜索模式的默认值，如 {"XM" : "11", "XH" : "123"}
         * @property {Boolean} [allowAllOption=true] 是否显示快速搜索模式下buttonlist的“全部”选项按钮
         * @property {Boolean} [showTotalNum=false] 与表格联动时，是否在高级搜索控件下方显示查询结果的总条数
         */
        props: {
            modelUrl: String,
            modelName: String,
            searchModel: {
                type: String,
                default: 'easy'
            },
            schema: {
                type: Boolean,
                default: false
            },
            defaultItem: Object,
            allowAllOption: {
                type: Boolean,
                default: true
            },
            showTotalNum: {
                type: Boolean,
                default: false
            }
        },
        ready () {
            var vm = this;
            var el = $(vm.$el);

            var searchData = WIS_EMAP_SERV.getModel(vm.modelUrl, vm.modelName, 'search');
            el.emapAdvancedQuery({
                data: searchData,
                searchModel: this.searchModel,
                schema: this.schema,
                defaultItem: this.defaultItem,
                allowAllOption: this.allowAllOption,
                showTotalNum: this.showTotalNum
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
             * 赋值搜索条件（只能在高级搜索模式下使用）
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
            },
            /**
             * 刷新数据总条数显示（需要配置showTotalNum参数）
             */
            updateTotalNum () {
                $(this.$el).emapAdvancedQuery('num');
            }
        },
        beforeDestroy () {
            var vm = this;
            var el = $(vm.$el);

            el.off('search');
        }
    };
</script>
