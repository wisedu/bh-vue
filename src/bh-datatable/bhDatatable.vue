<template>
    <div class='bh-datatable'></div>
</template>

<script>
    /**
     * 表格控件
     * @module BhDatatable
     *
     * @example
     *     <caption>html</caption>
     *     <bh-datatable root='a1' v-ref:dt1 :columns='columns' :pageable='true' :query-type='POST'
     *     :selected-rows.sync='selectedRows' :checked-rows.sync='checkedRows'
     *     :checkable='true' url='/mock/datatable.json' :query-params='queryParams'
     *     :operations='operations' @edit='edit' @del='del' :callbacks='callbacks'></bh-datatable>
     * @example
     *     <caption>javascript</caption>
     *     export default {
     *        data: function() {
     *          return {
     *              selectedRows: [],
     *              checkedRows: [],
     *              columns: [
     *                  { text: 'Name', dataField: 'name', width: 300},
     *                  { text: 'Beverage Type', dataField: 'type', width: 300 },
     *                  { text: 'Calories', dataField: 'calories', width: 180, cellsRenderer: function (row, column, value, rowData) {
     *                      return  value + 'g';
     *                  }},
     *                  { text: 'Total Fat', dataField: 'totalfat', width: 120 },
     *                  { text: 'Protein', dataField: 'protein' }
     *              ],
     *              queryParams: {
     *                  keyword: 'aaa'
     *              },
     *              operations: {
     *                  title: '操作',
     *                  items: [{
     *                      title: '编辑',
     *                      name: 'edit',
     *                      type: 'link'
     *                  }, {
     *                      title: '删除',
     *                      name: 'del',
     *                      type: 'link'
     *                  }]
     *              },
     *              callbacks: {
     *                  downloadComplete: function(data) {
     *                      console.log('download complete:', data);
     *                  }
     *              }
     *          }
     *      },
     *      methods: {
     *          edit: function(row, rowNum) {
     *              console.log('edit row:', row);
     *          },
     *          del: function(row, rowNum) {
     *              console.log('delete row:', row);
     *          },
     *          getCurrent: function() {
     *              console.log(this.selectedRows);
     *          },
     *          getChecked: function() {
     *              console.log(this.checkedRows);
     *          },
     *          search: function() {
     *              this.$refs.dt1.render();
     *          }
     *      },
     *      components: {BhDatatable, BhSearch}
     */

    var checkBoxWidth = 34;

    /**
     * 增加 options 处理，与emapDatatable统一，同时兼容之前分开定义配置项的写法
     */
    const OPT_NAMES = ['id', 'width', 'height', 'showHeader', 'checkable', 'pageable', 'enableBrowserSelection', 'selectionMode', 'pagerMode', 'pageNumberField', 'pageSizeField', 'sortable', 'reorder', 'resize', 'url', 'contentType', 'localdata', 'root', 'columns', 'queryType', 'queryParams', 'operations', 'callbacks', 'colHasMinWidth'];

    // jqxDatatable 不允许传入未预先定义的属性，需要做一次清理
    const EXTRA_OPT_NAMES = ['id', 'checkable', 'pageNumberField', 'pageSizeField', 'reorder', 'resize', 'url', 'contentType', 'localdata', 'root', 'queryType', 'queryParams', 'operations', 'callbacks', 'colHasMinWidth'];

    const DEFAULT_OPTS = {
        colHasMinWidth: true
    };

    var _makeOpts = (vm) => {
        let defOpts = $.extend({}, DEFAULT_OPTS);
        let options = vm.options ? $.extend(defOpts, vm.options) : defOpts;

        return $.extend(options, OPT_NAMES.reduce((ret, item) => {
            ret[item] = options[item] !== undefined ? options[item] : vm[item];
            return ret;
        }, {}));
    };

    var _isNumber = (n) => {
        return typeof n === 'number' || (typeof n === 'object' && Object.prototype.toString.call(n) === '[object Number]');
    };

    /**
     * 渲染之前替换掉单元格内容中的 '<', '>'
     */
    var _preventXss = (options) => {
        if (!options || !options.columns) {
            return options;
        }

        let columns = options.columns;
        columns.forEach(column => {
            let oldRenderer = column.cellsRenderer;
            column.cellsRenderer = (function (renderer) {
                return function (row, column, value, rowData) {
                    let result = value;
                    if (value && (typeof value === 'string')) {
                        result = value.replace(/</g, '&lt;').replace(/>/g, '&gt;');
                    }
                    if (renderer) {
                        result = renderer(row, column, result, rowData);
                    }

                    if (_isNumber(result)) {
                        result = result + '';
                    }
                    return result;
                };
            })(oldRenderer);
        });
    };

    /**
     * 创建 data adapter，为渲染做准备
     * @param  {Object} vm view modal
     */
    var createAdapter = (vm) => {
        var opts = vm.opts;
        var callbacks = opts.callbacks;

        var source = {
            dataType: 'json',
            type: opts.queryType,
            id: opts.id
        };

        if (opts.url) {
            source.url = opts.url;
            source.root = opts.root;
        } else {
            source.localdata = vm.localdata || opts.localdata || [];
        }

        return new $.jqx.dataAdapter(source, {
            contentType: opts.contentType,
            formatData: function (data) {
                if (opts.pageable) {
                    data[opts.pageNumberField] = data.pagenum + 1;
                    data[opts.pageSizeField] = data.pagesize;
                }

                if (opts.pageNumberField !== 'pagenum') {
                    delete data.pagenum;
                }
                if (opts.pageSizeField !== 'pagesize') {
                    delete data.pagesize;
                }

                // data.sortdatafield && data.sortorder --- 指定排序使用的参数
                $.extend(data, opts.queryParams);
                return JSON.stringify(data);
            },
            beforeSend: (xhr) => {
                callbacks && callbacks.beforeSend && callbacks.beforeSend(xhr);
            },
            downloadComplete: (data, status, xhr) => {
                callbacks && callbacks.downloadComplete && callbacks.downloadComplete(data, status, source);
            },
            loadError: function (xhr, status, error) {
                callbacks && callbacks.loadError && callbacks.loadError(status, error);
                throw new Error('loadError:' + error.toString());
            }
        });
    };

    var getCheckColumn = (vm) => {
        var $table = $(vm.$el);
        var opts = vm.opts;

        return {
            text: 'checkbox', dataField: 'checkbox', width: checkBoxWidth + 'px',
            renderer: function (text, align, height) {
                // 给table头部添加checkbox
                var checkBox = '<div class="selectAllCheckboxFlag bh-checkbox bh-mh-8"><label><input type="checkbox" value=""><i class="bh-choice-helper"></i></label>';
                return checkBox;
            },
            rendered: function (element, align, height) {
                // 头部的checkbox点击事件的绑定
                element.on('click', 'input', (e) => {
                    var $tableContent = $table.find('table');
                    var $checkboxList = $tableContent.find('div.bh-checkbox');

                    var $input = $(this);
                    if ($input.hasClass('selectFlag')) {
                        // 全部取消处理
                        $input.prop('checked', false).removeClass('selectFlag');
                        $checkboxList.each(function () {
                            $(this).find('input').prop('checked', false);
                        });
                    } else {
                        // 全部选中处理
                        $input.prop('checked', true).addClass('selectFlag');
                        $checkboxList.each(function () {
                            $(this).find('input').prop('checked', true);
                        });
                    }
                    e.stopPropagation();
                });
                return true;
            },
            cellsRenderer: function (row, column, value, rowData) {
                // 给table每一行添加checkbox
                var checkBox = '<div class="bh-checkbox"><label><input type="checkbox" @checked value="" data-id="@dataId" data-row=@dataRow><i class="bh-choice-helper"></i></label>';

                checkBox = checkBox.replace('@dataId', rowData[opts.id]).replace('@dataRow', row);

                if (rowData.checkbox) {
                    checkBox = checkBox.replace('@checked', 'checked');
                } else {
                    checkBox = checkBox.replace('@checked', '');
                }

                return checkBox;
            }
        };
    };

    /**
     * 点击tbody上的checkbox，处理头部的checkbox是否要勾选
     */
    var scenesTableContentCheckboxClick = ($input, $table) => {
        if (!$input.hasClass('selectAllCheckboxFlag')) {
            var $selectAllCheckbox = $table.find('div.selectAllCheckboxFlag').find('input');
            var $tableContent = $table.find('table');
            var $checkboxList = $tableContent.find('div.bh-checkbox');
            if ($input.prop('checked')) {
                var isSelectAllFlag = true;
                $checkboxList.find('input').each(function () {
                    if (!$(this).prop('checked')) {
                        isSelectAllFlag = false;
                    }
                });

                if (isSelectAllFlag) {
                    $selectAllCheckbox.prop('checked', true).addClass('selectFlag');
                } else {
                    $selectAllCheckbox.prop('checked', false).removeClass('selectFlag');
                }
            } else {
                $selectAllCheckbox.prop('checked', false).removeClass('selectFlag');
            }
        }
    };

    var getOptItem = (row, item) => {
        if (item.type === 'button') {
            return "<button data-name='" + item.name + "' data-row='" + row + "' class='opt-button'> style='padding: 0 5px;'" + item.title + '</button>';
        } else {
            return "<a href='javascript:void(0)' data-name='" + item.name + "' data-row='" + row + "' class='opt-button' style='padding: 0 5px;'>" + item.title + '</a>';
        }
    };

    var getOptColumn = (vm) => {
        var opts = vm.opts;
        var operations = opts.operations;
        var title = operations.title;

        return {
            width: operations.width,
            text: title,
            cellsAlign: 'center',
            align: 'center',
            columnType: 'none',
            editable: false,
            sortable: false,
            dataField: null,
            cellsRenderer: function (row, column, value) {
                // render custom column.
                var items = operations.items;
                var html = '';
                $.each(items, (i, item) => {
                    html += getOptItem(row, item);
                });
                return html;
            }
        };
    };

    var getSelection = (el) => {
        return el.jqxDataTable('getSelection');
    };

    var getAll = (el) => {
        return el.jqxDataTable('getRows');
    };

    var setCheckStatus = (vm) => {
        var opts = vm.opts;
        if (opts.checkable) {
            $(vm.$el).find('div.bh-checkbox input[data-id]').each(function () {
                var _this = $(this);
                _this[0].checked = ($.inArray(_this.attr('data-id'), vm.checkedIds) > -1);
            });
        }
    };

    // 默认中文设置
    var localization = null;

    export default {
        data () {
            return {
                checkedIds: [],
                opts: {} // 统一参数形式
            };
        },
        /**
         * @property {String} [id=id] 记录唯一标识名称
         * @property {Object} [options] 与emapDatatable保持统一，可以在此参数中设置所有其他参数如 width，优先级较高（比如同时设置 options.width 和 width，width 会被覆盖）
         * @property {String} [width='100%'] 表格宽度
         * @property {Boolean} [showHeader=true] 是否显示表头
         * @property {Boolean} [checkable=false] 是否显示第一列为复选框进行多选
         * @property {Boolean} [pageable=true] 是否支持分页
         * @property {Boolean} [enableBrowserSelection=true] 是否允许浏览器默认的选择文本功能
         * @property {Boolean} [selectionMode=singleRow] 行选择模式
         * @property {String} [pagerMode=advanced] 分页模式，可选 'advanced'/'default'
         * @property {String} [pageNumberField=pageNumber] 分页查询的page number参数名称
         * @property {String} [pageSizeField=pageSize] 分页查询的page size参数名称
         * @property {Boolean} [sortable=true] 是否支持点击列头进行排序
         * @property {Boolean} [reorder=false] 是否支持拖动列头排序
         * @property {Boolean} [resize=false] 是否支持拖动修改列头宽度
         * @property {String} [url] 数据资源url，与localdata必选其一
         * @property {String} [contentType=application/json] 请求类型设置
         * @property {Array} [localdata] 本地数据源，如果不指定 url则使用本地数据源
         * @property {String} root 请求返回的数据源中列表根节点名称，如果有多级节点，使用 'aa>bb' 的形式定义
         * @property {Array} columns 列定义
         * @property {String} [queryType=GET] 请求类型，支持"GET"/"POST"
         * @property {Object} [queryParams] 查询请求附加参数
         * @property {Array} [selectedRows] 选中的行（鼠标点击）
         * @property {Array} [checkedRows] 选中的行（复选框）
         * @property {Object} [operations] 操作按钮列表，显示在最后一列
         * @property {String} operations.title 操作列头名称
         * @property {Object[]} operations.items 操作按钮列表
         * @property {String} operations.items.title 操作按钮显示名称
         * @property {String} operations.items.name 操作按钮标识，可在组件上监听此 dispatch 事件，事件参数为当前行绑定的值和行号
         * @property {String} operations.items.type 操作按钮类型，指定'button'为按钮，否则为链接
         * @property {Object} [callbacks] 数据请求过程中的一些回调方法
         * @property {Function} callbacks.downloadComplete 请求数据结束时触发，参数为 data
         * @property {Function} callbacks.beforeSend 发送请求之前触发，参数为 xhr
         * @property {Function} callbacks.loadError 请求失败触发，参数为status
         */
        props: {
            'id': {
                default: 'id'
            },
            'options': Object,
            'width': {
                default: '100%'
            },
            'height': {
                default: 'auto'
            },
            'showHeader': {
                default: true,
                type: Boolean
            },
            'checkable': {
                default: false,
                type: Boolean
            },
            'pageable': {
                default: true,
                type: Boolean
            },
            'pageNumberField': {
                default: 'pageNumber'
            },
            'pageSizeField': {
                default: 'pageSize'
            },
            'sortable': {
                default: true,
                type: Boolean
            },
            'reorder': {
                default: false,
                type: Boolean
            },
            'resize': {
                default: false,
                type: Boolean
            },
            'url': String,
            'localdata': Array,
            'root': String,
            'columns': Array,
            'contentType': {
                default: 'application/json',
                type: String
            },
            'queryType': {
                default: 'GET',
                type: String
            },
            'enableBrowserSelection': {
                default: true
            },
            'selectionMode': {
                default: 'singleRow'
            },
            'pagerMode': {
                type: String,
                default: 'advanced'
            },
            'queryParams': Object,
            'selectedRows': Array,
            'checkedRows': Array,
            'operations': Object,
            'callbacks': {
                type: Object,
                default () {
                    return {};
                }
            }
        },
        methods: {
            /**
             * 重新渲染
             */
            render () {
                $(this.$el).jqxDataTable('render');
            },
            /**
             * 重新加载数据
             */
            reload () {
                $(this.$el).jqxDataTable('source', createAdapter(this));
            },
            /**
             * 刷新列表
             */
            refresh () {
                $(this.$el).jqxDataTable('refresh');
            },
            /**
             * 获取所有的数据
             * @return {Array} 数据列表
             */
            getTotalRecords () {
                return $(this.$el).jqxDataTable('getRows');
            },
            /**
             * 根据主键keyId获取对应的行数据
             * @param  {String} id 当前指定的主键id
             * @return {Object}    行数据
             */
            getRowById (id) {
                let opts = this.opts;
                var keyId = opts.id;
                var rows = this.getTotalRecords();
                for (var i = 0, len = rows.length; i < len; i++) {
                    if (rows[i][keyId] == id) {
                        return rows[i];
                    }
                }

                return null;
            },
            /**
             * 获取复选框选择的所有行
             * @return {Array} 复选框选择的所有行
             */
            getChecked () {
                return this.checkedRows;
            },
            setChecked (checkedItems, itemId) {
                this.checkedRows = $.extend(true, [], checkedItems);

                var checkedIds = this.checkedIds = [];

                $.each(checkedItems, (i, item) => checkedIds.push(item[itemId]));

                setCheckStatus(this);
            },
            /**
             * 选择某一行
             * @param  {Number} index 行号
             */
            selectRow (index) {
                var el = $(this.$el);
                el.jqxDataTable('selectRow', index);
            },
            /**
             * 增加一行
             * @param {Object} rowData 行数据
             */
            addRow (rowData) {
                $(this.$el).jqxDataTable('addRow', null, rowData);
            },
            /**
             * 根据主键id删除行
             * @param  {String} rowId 指定的主键id
             */
            deleteRowById (rowId) {
                let opts = this.opts;
                var keyId = opts.id;
                var el = $(this.$el);
                var viewRows = getAll(el);
                $.each(viewRows, (i, rowData) => {
                    if (rowData[keyId] == rowId) {
                        el.jqxDataTable('deleteRow', i);
                        return false;
                    }
                });
            },
            /**
             * 根据指定行的位置索引删除行
             * @param  {String} rowNum 指定行的位置索引
             */
            deleteByRowNum (rowNum) {
                $(this.$el).jqxDataTable('deleteRow', rowNum);
            },
            /**
             * 根据主键id选中一行
             * @param  {String} rowId 指定的主键id
             */
            checkById (id) {
                var vm = this;
                let opts = vm.opts;
                var rowData = vm.getRowById(id);

                if (!rowData) {
                    return null;
                }

                if ($.inArray(id, vm.checkedIds) > -1) {
                    return;
                }

                vm.checkedRows.push(rowData);
                vm.checkedIds.push(id);
                vm.$dispatch('check-change', true, rowData);
            },
            /**
             * 根据主键id反选一行
             * @param  {String} rowId 指定的主键id
             */
            uncheckById (id) {
                var vm = this;
                let opts = vm.opts;
                var keyId = opts.id;

                if ($.inArray(id, vm.checkedIds) === -1) {
                    var params = {};
                    params[keyId] = id;
                    vm.$dispatch('check-change', false, params);
                    return;
                }

                $.each(vm.checkedRows, (i, item) => {
                    if (item[keyId] == id) {
                        var rowData = vm.checkedRows.splice(i, 1)[0];
                        vm.checkedIds.splice(i, 1);
                        setCheckStatus(vm);
                        vm.$dispatch('check-change', false, rowData);
                        return false;
                    }
                });
            },
            /**
             * 清空表格
             */
            clear () {
                var el = $(this.$el);
                el.jqxDataTable('clear');
            }
        },
        ready () {
            // 由于当前框架的js引入时机问题，无法在js载入时成功设置，~退而求其次
            if (!localization && typeof Globalize != 'undefined') {
                localization = Globalize.culture("zh-CN");
            }

            var vm = this;
            var opts = vm.opts = _makeOpts(vm);
            _preventXss(opts);
            var el = $(vm.$el);

            if (opts.checkable) { // 复选框为一列
                opts.columns.unshift(getCheckColumn(vm));
            }

            if (opts.operations && opts.operations.items && (opts.operations.items.length > 0)) {
                opts.columns.push(getOptColumn(vm));
            }

            let tableOptions = $.extend({}, opts, {
                columnsReorder: opts.reorder,
                columnsResize: opts.resize,
                serverProcessing: true,
                source: createAdapter(vm),
                localization: localization,
                rendered () {
                    // 数据加载完成，读取各列的checkbox，判断头部的checkbox是否要勾选
                    setCheckStatus(vm);

                    // 渲染结束后给单元格增加 title，防止字符串被截断
                    el.find('.jqx-grid-cell').each(function () {
                        var cell = $(this);
                        cell.attr('title', cell.text());
                    });

                    vm.$dispatch('rendered');
                },
                ready () {
                    var $table = el;
                    var $tableContent = $table.find('table');

                    if (opts.checkable) {
                        var $checkboxList = $tableContent.find('div.bh-checkbox');
                        var isSelectAllFlag = true;
                        $checkboxList.each(function () {
                            var $itemCheckbox = $(this);
                            if ($itemCheckbox.find('input[checked]').length === 0) {
                                isSelectAllFlag = false;
                                return false;
                            }
                        });

                        var $selectAllCheckbox = $table.find('div.selectAllCheckboxFlag').find('input');
                        if (isSelectAllFlag) {
                            $selectAllCheckbox.prop('checked', true).addClass('selectFlag');
                        } else {
                            $selectAllCheckbox.prop('checked', false).removeClass('selectFlag');
                        }

                        // 初始化完成后，绑定checkbox的点击事件
                        el.on('click', 'div.bh-checkbox', function (e) {
                            var checkItem = $(e.currentTarget).find('input');
                            var id = checkItem.data('id') + '';
                            var isAdd = checkItem[0].checked;

                            scenesTableContentCheckboxClick($(this).find('input'), el);
                            if (isAdd) {
                                vm.checkById(id);
                            } else {
                                vm.uncheckById(id);
                            }
                        });
                    }

                    vm.selectedRows = getSelection(el);

                    el.on('rowSelect', function (event) {
                        vm.selectedRows = getSelection(el);
                        vm.$dispatch('row-select', vm.selectedRows);
                    });

                    el.on('click', '.opt-button', function () {
                        var _this = $(this);
                        var row = _this.attr('data-row');
                        var name = _this.attr('data-name');

                        var viewRows = getAll(el);
                        vm.$dispatch(name, viewRows[row], parseInt(row));
                    });

                    vm.$dispatch('ready');
                }
            });

            // 删除多余属性
            EXTRA_OPT_NAMES.forEach(item => {
                delete tableOptions[item];
            });

            vm.jqxObj = el.jqxDataTable(tableOptions);
        },
        destory: function () {
            var el = $(this.$el);
            el.off('click', 'div.bh-checkbox');
            el.off('rowSelect');
            el.off('click', '.opt-button');
            el.jqxDataTable('destroy');
        }
    };
</script>
