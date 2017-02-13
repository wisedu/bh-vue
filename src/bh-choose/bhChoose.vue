<template>
    <div class='bh-choose'>
        <div class="side left bh-pull-left" :style='{width: leftWidth}'>
            <bh-search ref='searchBox' :show-button='false' :placeholder='placeholder' @search='search' class='bh-mb-8'></bh-search>
            <div class="left-list">
                <bh-datatable
                    ref=bhchooselefttable
                    :id='id'
                    :checkable='true'
                    :height='height'
                    :show-header='showHeader'
                    :url='leftSourceUrl'
                    :page-number-field='pageNumberField'
                    :page-size-field='pageSizeField'
                    selection-mode='default'
                    :root='leftSourceAction'
                    :columns='columns'
                    :query-type='type'
                    :query-params='queryParams'
                    class='transparentGrid'
                    @rendered='leftListRendered'
                    @check-change='onCheckChange'
                    :callbacks='callbacks'>
                </bh-datatable>
            </div>
        </div>
        <div class="side right bh-pull-left" :style='{width: rightWidth}'>
            <div class="before"></div>
            <div class="title">{{rightTitle}}</div>
            <div class="right-list" :style='{height: height + "px"}'>
                <bh-datatable
                    ref=bhchooserighttable
                    :id='id'
                    :url='rightSourceUrl'
                    :localdata='localdata'
                    :pageable='false'
                    :show-header='showHeader'
                    :root='rightSourceAction'
                    :columns='rcolumns'
                    :query-type='type'
                    :query-params='rightParams'
                    :operations='operations'
                    class='transparentGrid'
                    @del='uncheck'
                    @rendered='rightListRendered'>
                </bh-datatable>
            </div>
            <div class="after"></div>
        </div>
    </div>
</template>

<script>
    /**
     * 列表选择控件
     * @module BhChoose
     *
     * @fires left-ready - 左侧表格渲染完成时触发，此处可添加对渲染元素的自定义处理
     *
     * @example
     *     <caption>html</caption>
     *     <bh-choose ref=choose1
     *         left-source-url='/mock/datatable.json' :leftcells-renderer='leftcellsRenderer'
     *         right-source-url='/mock/datatable2.json' :rightcells-renderer='leftcellsRenderer'>
     *     </bh-choose>
     *     <div class="bh-btn bh-btn-primary bh-mb-16" @click='getChecked'>获取选择项</div>
     * @example
     *     <caption>javascript</caption>
     *     import BhChoose from 'components/bh-choose/bhChoose'
     *     export default {
     *         data () {
     *             return {
     *                 leftcellsRenderer: function(row, column, value, rowData) {
     *                     var html = '<div>';
     *                     html += '<div row="' + row + '" class="bh-col-md-2"></div>';
     *                     html += '<div class="bh-col-md-8">' + rowData.name + '</div>';
     *                     html += '<div class="bh-col-md-2">' + rowData.calories + '</div>';
     *                     html += '</div>';
     *                     return html;
     *                 }
     *             }
     *         },
     *         methods: {
     *             getChecked () {
     *                 console.log(this.$refs.choose1.getChecked());
     *             }
     *         },
     *         components: {BhChoose}
     *     }
     */
    import BhSearch from '../bh-search/bhSearch';
    import BhDatatable from '../bh-datatable/bhDatatable';

    export default {
        data () {
            return {
                // checkedRows: [],
                operations: {
                    title: '操作',
                    width: 100,
                    items: [{
                        title: '删除',
                        name: 'del',
                        type: 'link'
                    }]
                }
            };
        },
        computed: {
            queryParams () {
                var params = this.leftParams || {};
                params[this.localSearchField] = this.$refs.searchBox.getValue();
                return params;
            },
            columns () {
                var vm = this;
                return vm.leftCols ? vm.leftCols : [{
                    dataField: 'onlineDate',
                    cellsRenderer: (row, column, value, rowData) => {
                        if (!vm.leftcellsRenderer) {
                            console.error('no leftcellsRenderer defined for bhChoose !');
                            return '';
                        }

                        var html = $(vm.leftcellsRenderer(row, column, value, rowData));
                        $(html.children()[0]).addClass('gm-member-user');
                        return html.prop('outerHTML');
                    }
                }];
            },
            rcolumns () {
                var vm = this;
                return vm.rightCols ? vm.rightCols : [{
                    dataField: 'onlineDate',
                    cellsRenderer: (row, column, value, rowData) => {
                        if (!vm.rightcellsRenderer) {
                            console.error('no rightcellsRenderer defined for bhChoose !');
                            return '';
                        }

                        var html = $(vm.rightcellsRenderer(row, column, value, rowData));
                        $(html.children()[0]).addClass('gm-member-user');
                        return html.prop('outerHTML');
                    }
                }];
            }
        },
        /**
         * @property {String} [id=id] 主键名称
         * @property {String} [leftWidth=50%] 左侧区域宽度
         * @property {String} [rightWidth=50%] 右侧区域宽度
         * @property {String/Number} [height=313] 高度
         * @property {String} [localSearchField=keyword] 搜索框参数名称
         * @property {String} [placeholder=输入关键字] 搜索框提示文字
         * @property {String} [pageNumberField=pageNumber] 分页查询的page number参数名称
         * @property {String} [pageSizeField=pageSize] 分页查询的page size参数名称
         * @property {String} [rightTitle=已选择] 右侧标题
         * @property {String} leftSourceUrl 左侧数据源地址
         * @property {Array} leftCols 左侧的自定义列，如果设置此属性则不需要leftcellsRenderer，参考BhDatatable的列定义
         * @property {String} rightSourceUrl 右侧数据源地址
         * @property {Array} localdata 右侧使用本地数组作为数据源代替rightSourceUrl
         * @property {String} leftSourceAction 左侧数据源获取path，如 'datas>rows'
         * @property {String} rightSourceAction 右侧数据源获取path，如 'datas>rows'
         * @property {Array} rightCols 右侧的自定义列，如果设置此属性则不需要rightcellsRenderer，参考BhDatatable的列定义
         * @property {String} leftParams 左侧请求附加参数
         * @property {String} rightParams 右侧请求附加参数
         * @property {String} [type=post] 请求类型
         * @property {Boolean} [showHeader=false] 是否显示列头
         * @property {Function} leftcellsRenderer 左侧单元格渲染方法
         * @property {Function} rightcellsRenderer 右侧单元格渲染方法
         * @property {Boolean} [nicescroll=true] 是否优化滚动条样式
         * @property {Object} [callbacks] 数据请求过程中的一些回调方法
         * @property {Function} callbacks.downloadComplete 请求数据结束时触发，参数为 data
         * @property {Function} callbacks.beforeSend 发送请求之前触发，参数为 xhr
         * @property {Function} callbacks.loadError 请求失败触发，参数为status
         */
        props: {
            id: {
                default: 'id'
            },
            height: {
                default: 313
            },
            leftWidth: {
                default: '50%'
            },
            rightWidth: {
                default: '50%'
            },
            localSearchField: {
                default: 'keyword'
            },
            pageNumberField: {
                default: 'pageNumber'
            },
            pageSizeField: {
                default: 'pageSize'
            },
            placeholder: {
                default: '输入关键字'
            },
            rightTitle: {
                default: '已选择'
            },
            leftSourceUrl: String,
            leftSourceAction: String,
            leftCols: Array,
            rightSourceUrl: String,
            localdata: Array,
            rightSourceAction: String,
            rightCols: Array,
            leftParams: Object,
            rightParams: Object,
            type: {
                type: String,
                default: 'post'
            },
            showHeader: {
                type: Boolean,
                default: false
            },
            showSelectedTip: {
                type: Boolean,
                default: true
            },
            leftcellsRenderer: Function,
            rightcellsRenderer: Function,
            nicescroll: {
                type: Boolean,
                default: true
            },
            callbacks: Object
        },
        methods: {
            /**
             * 重新加载（重新生成）
             * @param {String} side 指定要重新加载左侧还是右侧的列表（'left'/'right'），参数为空则全部加载
             */
            reload (side) {
                (side !== 'left') && this.$refs.bhchooserighttable.render();
                (side !== 'right') && this.$refs.bhchooselefttable.render();
            },
            /**
             * 选择发生变化的处理
             * @inner
             */
            onCheckChange (checked, rowData) {
                if (!rowData) {
                    return;
                }

                var vm = this;

                if (!checked) {
                    vm.$refs.bhchooserighttable.deleteRowById(rowData[this.id]);
                } else {
                    vm.$refs.bhchooserighttable.addRow(rowData);
                }

                this.$emit('change');
            },
            /**
             * 左侧列表渲染完成事件
             * @inner
             */
            leftListRendered () {
                var vm = this;
                vm.$emit('left-ready');
                setTimeout(() => {
                    vm.$refs.bhchooselefttable.setChecked(vm.$refs.bhchooserighttable.getTotalRecords(), vm.id);
                }, 0);
            },
            /**
             * 右侧列表渲染完成事件
             * @inner
             */
            rightListRendered () {
                if (this.nicescroll) {
                    $(this.$el).find('.right-list').niceScroll();
                }
            },
            /**
             * 执行查询
             * @inner
             */
            search () {
                this.$refs.bhchooselefttable.render();
            },
            /**
             * 获取选择项
             * @return {Array} 选择项数组
             */
            getChecked () {
                return this.$refs.bhchooserighttable.getTotalRecords();
            },
            /**
             * 根据主键id选中一行
             * @param  {String} id 指定的主键id
             */
            checkById (id) {
                return this.$refs.bhchooselefttable.checkById(id);
            },
            /**
             * 删除某一项
             * @inner
             */
            uncheck (rowData) {
                this.uncheckById(rowData[this.id]);
            },
            /**
             * 根据主键id反选一行
             * @param  {String} id 指定的主键id
             */
            uncheckById (id) {
                return this.$refs.bhchooselefttable.uncheckById(id);
            },
            /**
             * 左侧列表增加一项
             * @param {Object} rowData 行数据
             */
            addItem (rowData) {
                return this.$refs.bhchooselefttable.addRow(rowData);
            },
            /**
             * 左侧列表增加一项并选中新增的数据
             * @param {Object} rowData 行数据
             */
            addAndCheck (rowData) {
                this.addItem(rowData);
                this.$refs.bhchooselefttable.refresh();
                this.checkById(rowData[this.id]);
            }
        },
        components: {BhSearch, BhDatatable}
    };
</script>

<style lang='less'>
    @border-color: #d8dcf0;
    @bgc-dark: rgba(63,81,181,.04);
    @bgc-split: #fff;

    .bh-choose {
        width: 100%;
        overflow: hidden;
        border: 1px solid @border-color;

        .side {
            padding: 5px;
            display: inline-block;

            &.left {
                border-right: none;
                .search-box {
                    background: @bgc-dark;
                    input, i{
                        border: none;
                    }
                }
            }

            &.right {
                background: @bgc-dark;
                position: relative;
                border-left: 1px solid @border-color;
                .title {
                    padding: 4px 0;
                    text-indent: 5px;
                    border-bottom: none;
                }

                .before {
                    border: 44px solid transparent;
                    border-left: 14px solid @border-color;
                    position: absolute;
                    top: 128px;
                    left: 0;
                }

                .after {
                    border: 44px solid transparent;
                    border-left: 14px solid @bgc-split;
                    position: absolute;
                    top: 128px;
                    left: -1px;
                }

                .right-list {
                    overflow: auto;
                }
            }
        }
    }
</style>
