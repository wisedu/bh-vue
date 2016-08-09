<template>
    <div></div>
</template>

<script>
    /**
     * 高级表格控件，可以切换'列表'与'卡片'两种展现方式，参数配置方式可以参考 {@link module:EmapDatatable EmapDatatable} 和 {@link module:EmapCard EmapCard}
     * @module EmapGrid
     *
     * @example
     *     <caption>html</caption>
     *     <emap-grid :options='options'></emap-grid>
     * @example
     *     <caption>javascript</caption>
     *     import EmapGrid from 'components/emap-grid/emapGrid.vue'
     *     var getCustomColumns = function() {
     *         var customColumns = [{
     *             colIndex: 0,
     *             showCheckAll: true,
     *             type: 'checkbox',
     *             width: 50
     *         }, {
     *             colField: 'status',
     *             type: 'tpl',
     *             column: {
     *                 cellsRenderer: function(row, column, value, rowData) {
     *                     return value ? '正常' : '异常'
     *                 }
     *             },
     *             width: 50
     *         }];
     *         return customColumns;
     *     };
     *     export default {
     *         data: function() {
     *             return {
     *                 options: {
     *                     pagePath: 'http://localhost:3000/mock/emap/major-model.json',
     *                     action: 'TABLE',
     *                     template: require('./cardTpl.html'),
     *                     customColumns: getCustomColumns(),
     *                     sortable: true
     *                 }
     *             }
     *         },
     *         components: {EmapGrid}
     *     }
     */
    var defaultOpts = {
        minLineNum: 12,
        height: null
    };

    export default {
        props: {
            options: Object
        },
        ready () {
            var self = this;
            var el = $(self.$el);

            var opts = $.extend({}, defaultOpts, this.options);

            el.emapGrid(opts);
        },
        methods: {
            /**
             * 刷新表格数据
             *
             * @param  {Object} params 刷新表格时需要传递的参数
             */
            reload (params) {
                var self = this;
                var el = $(self.$el);
                el.emapGrid('reload', params);
            },
            /**
             * 获取表格元素
             * @return {Object} 表格元素的jquery对象
             */
            getTable () {
                return $(this.$el).emapGrid('getTable');
            },
            /**
             * 获取卡片元素
             * @return {Object} 卡片元素的jquery对象
             */
            getCard () {
                return $(this.$el).emapGrid('getCard');
            },
            /**
             * 获取当前显示的类型
             * @return {String} 当前显示的类型('table'/'card')
             */
            getType () {
                return $(this.$el).emapGrid('getType');
            }
        }
    };
</script>
