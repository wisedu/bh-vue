<template>
    <div></div>
</template>

<script>
    /**
     * 表格控件（基于EMAP）
     * @module EmapDatatable
     *
     * @fires ready -列表渲染完成后触发此事件，参数为当前控件vm对象
     *
     * @example
     *     <caption>html</caption>
     *     <emap-datatable :options='options' @edit='edit' @del='del'></emap-datatable>
     * @example
     *     <caption>javascript</caption>
     *      import EmapDatatable from 'components/emap-datatable/emapDatatable.vue'
     *      // 自定义单元格渲染方式
     *      var getCustomColumns = function() {
     *          var customColumns = [{
     *              colField: 'status',
     *              type: 'tpl',
     *              width: 50,
     *              column: {
     *                  cellsRenderer: function(row, column, value, rowData) {
     *                      return value ? '有效' : '无效';
     *                  }
     *              }
     *          }, {
     *              colField: 'name',
     *              type: 'tpl',
     *              width: 300,
     *              column: {
     *                  cellsRenderer: function(row, column, value, rowData) {
     *                      return '<a href="#/bzxq" target="_blank" data-action="save-id" data-wid="' + rowData.WID + '">' + value + '</span>';
     *                  }
     *              }
     *          }];
     *          return customColumns;
     *      };
     *      export default {
     *          data: function() {
     *              return {
     *                  options: {
     *                      pagePath: 'http://localhost:3000/mock/emap/major-model.json',
     *                      action: 'TABLE',
     *                      customColumns: getCustomColumns(),
     *                      checkable: true,
     *                      sortable: true,
     *                      columnsReorder: true,
     *                      operations: {
     *                          title: '操作',
     *                          width: 100,
     *                          items: [{
     *                              title: '编辑',
     *                              name: 'edit',
     *                              type: 'link'
     *                          }, {
     *                              title: '删除',
     *                              name: 'del',
     *                              type: 'link'
     *                          }]
     *                      }
     *                  }
     *              }
     *          },
     *          methods: {
     *              edit: function(row) {
     *                  console.log('edit', row);
     *              },
     *              del: function(row) {
     *                  console.log('del', row);
     *              }
     *          }
     *          components: {EmapDatatable}
     *      }
     */

    var _defaultOpts = {
        height: null, // fix scrollbar defect
        checkable: false,
        operations: null
    };

    var _getOptItem = (row, item) => {
        if (item.type === 'button') {
            return "<button data-name='" + item.name + "' data-row='" + row + "' class='opt-button'> style='padding: 0 5px;'" + item.title + '</button>';
        } else {
            return "<a href='javascript:void(0)' data-name='" + item.name + "' data-row='" + row + "' class='opt-button' style='padding: 0 5px;'>" + item.title + '</a>';
        }
    };

    var _getOptColumn = (vm) => {
        return {
            colIndex: 'last',
            type: 'tpl',
            column: {
                width: vm.options.operations.width,
                text: vm.options.operations.title,
                align: 'center',
                cellsAlign: 'center',
                cellsRenderer (row, column, value, rowData) {
                    vm.cachedMap[row] = rowData;
                    var items = vm.options.operations.items;

                    if ($.isFunction(items)) {
                        items = items.call(vm, rowData);
                    }

                    var html = '';
                    $.each(items, (i, item) => {
                        html += _getOptItem(row, item);
                    });

                    return html;
                }
            }
        };
    };

    // 根据 hiddenColumns 设置隐藏某些列
    var _hideCols = (vm) => {
        var hiddenColumns = vm.hiddenColumns;
        var el = $(vm.$el);

        if (hiddenColumns && hiddenColumns.length > 0) {
            // 处理需要隐藏的列表
            hiddenColumns.forEach((colName) => {
                el.jqxDataTable('hideColumn', colName);
            });
        }
    };

    var _init = (vm) => {
        if (vm.inited) {
            return;
        }

        var el = $(vm.$el);

        var opts = $.extend({customColumns: []}, _defaultOpts, vm.options);
        var customColumns = opts.customColumns;
        var operations = opts.operations;

        vm.hiddenColumns = opts.hiddenColumns;
        opts.hiddenColumns = undefined;

        if (opts.checkable) { // 增加多选框列
            customColumns.unshift({
                colIndex: 0,
                showCheckAll: true,
                width: 32,
                type: 'checkbox'
            });
        }

        if (operations) { // 增加操作列
            customColumns.push(_getOptColumn(vm));
        }

        opts.checkable = undefined;
        opts.operations = undefined;
        opts.lazyInit = undefined;
        opts.ready = () => {
            _hideCols(vm); // 隐藏列
            vm.$dispatch(vm.readyName, vm);
        };

        opts.formatData = (data) => {
            return data && JSON.stringify(data);
        };

        el.emapdatatable(opts);

        el.on('click', '.opt-button', function (e) {
            var _this = $(this);
            var row = _this.attr('data-row');
            var name = _this.attr('data-name');

            vm.$dispatch(name, vm.cachedMap[row]);
        });

        vm.inited = true;
    };

    export default {
        data () {
            return {
                inited: false,
                readyName: 'ready',
                cachedMap: {},
                hiddenColumns: []
            };
        },
        /**
         * @property {Object} options 表格初始化参数
         * @property {String} [options.pk=WID] 主键名称
         * @property {String} [options.width=100%] 宽度
         * @property {String} [options.height] 高度
         * @property {String} [options.method=POST] 请求类型（数据请求）
         * @property {Boolean} [options.checkable=false] 是否显示复选框
         * @property {Boolean} [options.pageable=true] 是否显示分页
         * @property {String} [options.pagerMode=advanced] 分页模式，支持'simple'/'advanced'
         * @property {Boolean} [options.serverProcessing=true] 是否从服务器加载数据
         * @property {Array} [options.pageSizeOptions=['10', '20', '50', '100']] 分页大小选项
         * @property {String} [options.localization=zh-CN] 多语言设置
         * @property {Boolean} [options.sortable=false] 是否支持排序
         * @property {String} [options.selectionMode=custom] 行选择模式，支持 'multipleRows'/'singleRow'/'custom'
         * @property {Boolean} [options.enableBrowserSelection=true] 是否允许浏览器默认的文本选择功能
         * @property {Boolean} [options.columnsResize=true] 是否支持拖动列头改变大小
         * @property {Boolean} [options.colHasMinWidth=true] 列宽是否有默认最小值100px
         * @property {Function} [options.beforeSend] 发送数据请求之前触发的回调
         * @property {Boolean} [options.schema=true] 是否启用schema，为 true则必须定义contextPath;未定义contextPath时,schema 不生效
         * @property {String} options.contextPath 请求上下文
         * @property {Number} options.minLineNum 表格最小行数
         * @property {Array} [options.hiddenColumns=[]] 默认需要隐藏的字段, Emap组件暂时不支持此属性，所以新增此处理
         * @property {Array} [options.alwaysHide=['WID', 'TBRQ', 'TBLX', 'CZRQ', 'CZZ', 'CZZXM']] 自定义显示列的隐藏字段
         * @property {Object} [options.operations] 操作按钮列表，显示在最后一列
         * @property {String} options.operations.title 操作列头名称
         * @property {Object[]} options.operations.items 操作按钮列表，或者返回按钮列表的函数（参数为当前行的数据）
         * @property {String} options.operations.items.title 操作按钮显示名称
         * @property {String} options.operations.items.name 操作按钮标识，可在组件上监听此 dispatch 事件
         * @property {String} options.operations.items.type 操作按钮类型，指定'button'为按钮，否则为链接
         * @property {Boolean} options.lazyInit 是否延迟控件实例初始化，为true则需要使用init方法触发控件初始化。
         * @property {String} [options.readyName='ready'] 初始化完成后触发的事件名称
         */
        props: {
            options: Object
        },
        ready () {
            if (this.options.readyName) {
                this.readyName = this.options.readyName;
                this.options.readyName = undefined;
            }

            if (!this.options.lazyInit) {
                _init(this);
            }
        },
        methods: {
            /**
             * 初始化控件，若设置lazyInit参数为true则需要调用此方法进行初始化
             */
            init () {
                _init(this);
            },
            /**
             * 刷新表格数据
             * @param  {Object} params 刷新表格时需要传递的参数
             * @param {Function} [callback] 刷新后的回调函数
             */
            reload (params, callback) {
                $(this.$el).emapdatatable('reload', params, (...args) => {
                    _hideCols(this);
                    callback && callback(args);
                });
            },
            /**
             * 表格带checkbox时，可以调用该方法返回已经选中的记录
             *
             * @return {Array} 已经选中的记录
             */
            checkedRecords () {
                return $(this.$el).emapdatatable('checkedRecords');
            },
            /**
             * 默认刷新表格并回到首页
             * @param  {Object} params 刷新表格时需要传递的参数
             * @param {Function} [callback] 刷新后的回调函数
             */
            reloadFirstPage (params, callback) {
                return $(this.$el).emapdatatable('reloadFirstPage', params, (...args) => {
                    _hideCols(this);
                    callback && callback(args);
                });
            },
            /**
             * 获取数据条数
             * @return {Number} 数据条数
             */
            getTotalRecords () {
                return $(this.$el).emapdatatable('getTotalRecords');
            },
            /**
             * 获取数据定义模型（meta）
             * @return {Object} 数据定义模型
             */
            getModel () {
                return $(this.$el).emapdatatable('getModel');
            },
            /**
             * 获取服务器返回的数据对象
             * @return {Object} 服务器返回的数据对象
             */
            getResult () {
                return $(this.$el).emapdatatable('getResult');
            },
            /**
             * 导出表格数据，列为选择列
             * @param {Object} params 参数配置
             * @param {String} params.root 上下文路径
             * @param {String} params.app 调用导出的应用名称，必填
             * @param {String} params.module 调用导出的模块名，必填
             * @param {String} params.page 调用导出的页面，必填
             * @param {String} params.action 调用导出的动作，必填
             * @param {String} params.colnames 导出时自定义的字段，多个用逗号分隔，选填
             * @param {String} params.analyse 自定义的导出过程分析服务，实现IImportAnalyse，选填
             * @param {String} params.write 自定义的导出写文件服务，实现IExportWrite，选填
             * @param {String} params.filename 自定义的导出文件名，选填
             */
            selectColumnsExport (params) {
                let options = $.extend({type: 'export'}, params);
                return $(this.$el).emapdatatable('selectColumnsExport', options);
            },
            /**
             * 展开选择列窗口
             * @param  {Object} action 操作定义
             * @param {String} action.type=toggle 操作类型，支持'toggle'(显示选择的列，隐藏未选择的列)/'export'(导出表单， 支持选择列 )
             * @param {String} action.hanlder 操作具体执行函数
             * @param {String} action.param action执行所需的参数
             */
            selectToShowColumns (action) {
                return $(this.$el).emapdatatable('selectToShowColumns', action);
            },
            /**
             * 导出表格数据
             * @param  {Object} config 请求参数
             * @param {String} config.root 请求上下文路径
             */
            export (config) {
                return $(this.$el).emapdatatable('export', config);
            }
        },
        beforeDestroy () {
            this.inited = false;
            this.cachedMap = {};
        }
    };
</script>
