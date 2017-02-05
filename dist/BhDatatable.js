/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(26);


/***/ },

/***/ 26:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(27)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\bh-datatable\\bhDatatable.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(31)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-6674c825/bhDatatable.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 27:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _stringify = __webpack_require__(28);

	var _stringify2 = _interopRequireDefault(_stringify);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var checkBoxWidth = 34;

	var createAdapter = function createAdapter(vm) {
	    var callbacks = vm.callbacks;

	    var source = {
	        dataType: 'json',
	        type: vm.queryType,
	        id: vm.id
	    };

	    if (vm.url) {
	        source.url = vm.url;
	        source.root = vm.root;
	    } else {
	        source.localdata = vm.localdata || [];
	    }

	    return new $.jqx.dataAdapter(source, {
	        contentType: vm.contentType,
	        formatData: function formatData(data) {
	            if (vm.pageable) {
	                data[vm.pageNumberField] = data.pagenum + 1;
	                data[vm.pageSizeField] = data.pagesize;
	            }

	            if (vm.pageNumberField !== 'pagenum') {
	                delete data.pagenum;
	            }
	            if (vm.pageSizeField !== 'pagesize') {
	                delete data.pagesize;
	            }

	            $.extend(data, vm.queryParams);
	            return (0, _stringify2.default)(data);
	        },
	        beforeSend: function beforeSend(xhr) {
	            callbacks && callbacks.beforeSend && callbacks.beforeSend(xhr);
	        },
	        downloadComplete: function downloadComplete(data, status, xhr) {
	            callbacks && callbacks.downloadComplete && callbacks.downloadComplete(data, status, source);
	        },
	        loadError: function loadError(xhr, status, error) {
	            callbacks && callbacks.loadError && callbacks.loadError(status, error);
	            throw new Error('loadError:' + error.toString());
	        }
	    });
	};

	var getCheckColumn = function getCheckColumn(vm) {
	    var $table = $(vm.$el);

	    return {
	        text: 'checkbox', dataField: 'checkbox', width: checkBoxWidth + 'px',
	        renderer: function renderer(text, align, height) {
	            var checkBox = '<div class="selectAllCheckboxFlag bh-checkbox bh-mh-8"><label><input type="checkbox" value=""><i class="bh-choice-helper"></i></label>';
	            return checkBox;
	        },
	        rendered: function rendered(element, align, height) {
	            var _this2 = this;

	            element.on('click', 'input', function (e) {
	                var $tableContent = $table.find('table');
	                var $checkboxList = $tableContent.find('div.bh-checkbox');

	                var $input = $(_this2);
	                if ($input.hasClass('selectFlag')) {
	                    $input.prop('checked', false).removeClass('selectFlag');
	                    $checkboxList.each(function () {
	                        $(this).find('input').prop('checked', false);
	                    });
	                } else {
	                    $input.prop('checked', true).addClass('selectFlag');
	                    $checkboxList.each(function () {
	                        $(this).find('input').prop('checked', true);
	                    });
	                }
	                e.stopPropagation();
	            });
	            return true;
	        },
	        cellsRenderer: function cellsRenderer(row, column, value, rowData) {
	            var checkBox = '<div class="bh-checkbox"><label><input type="checkbox" @checked value="" data-id="@dataId" data-row=@dataRow><i class="bh-choice-helper"></i></label>';

	            checkBox = checkBox.replace('@dataId', rowData[vm.id]).replace('@dataRow', row);

	            if (rowData.checkbox) {
	                checkBox = checkBox.replace('@checked', 'checked');
	            } else {
	                checkBox = checkBox.replace('@checked', '');
	            }

	            return checkBox;
	        }
	    };
	};

	var scenesTableContentCheckboxClick = function scenesTableContentCheckboxClick($input, $table) {
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

	var getOptItem = function getOptItem(row, item) {
	    if (item.type === 'button') {
	        return "<button data-name='" + item.name + "' data-row='" + row + "' class='opt-button'> style='padding: 0 5px;'" + item.title + '</button>';
	    } else {
	        return "<a href='javascript:void(0)' data-name='" + item.name + "' data-row='" + row + "' class='opt-button' style='padding: 0 5px;'>" + item.title + '</a>';
	    }
	};

	var getOptColumn = function getOptColumn(vm) {
	    var opts = vm.operations;
	    var title = opts.title;

	    return {
	        text: title,
	        cellsAlign: 'center',
	        align: 'center',
	        columnType: 'none',
	        editable: false,
	        sortable: false,
	        dataField: null,
	        cellsRenderer: function cellsRenderer(row, column, value) {
	            var items = opts.items;
	            var html = '';
	            $.each(items, function (i, item) {
	                html += getOptItem(row, item);
	            });
	            return html;
	        }
	    };
	};

	var getSelection = function getSelection(el) {
	    return el.jqxDataTable('getSelection');
	};

	var getAll = function getAll(el) {
	    return el.jqxDataTable('getRows');
	};

	var setCheckStatus = function setCheckStatus(vm) {
	    if (vm.checkable) {
	        $(vm.$el).find('div.bh-checkbox input[data-id]').each(function () {
	            var _this = $(this);
	            _this[0].checked = $.inArray(_this.attr('data-id'), vm.checkedIds) > -1;
	        });
	    }
	};

	exports.default = {
	    data: function data() {
	        return {
	            checkedIds: []
	        };
	    },

	    props: {
	        'id': {
	            default: 'id'
	        },
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
	            default: function _default() {
	                return {};
	            }
	        }
	    },
	    methods: {
	        render: function render() {
	            $(this.$el).jqxDataTable('render');
	        },
	        refresh: function refresh() {
	            $(this.$el).jqxDataTable('refresh');
	        },
	        getTotalRecords: function getTotalRecords() {
	            return $(this.$el).jqxDataTable('getRows');
	        },
	        getRowById: function getRowById(id) {
	            var keyId = this.id;
	            var rows = this.getTotalRecords();
	            for (var i = 0, len = rows.length; i < len; i++) {
	                if (rows[i][keyId] == id) {
	                    return rows[i];
	                }
	            }

	            return null;
	        },
	        getChecked: function getChecked() {
	            return this.checkedRows;
	        },
	        setChecked: function setChecked(checkedItems, itemId) {
	            this.checkedRows = $.extend(true, [], checkedItems);

	            var checkedIds = this.checkedIds = [];

	            $.each(checkedItems, function (i, item) {
	                return checkedIds.push(item[itemId]);
	            });

	            setCheckStatus(this);
	        },
	        selectRow: function selectRow(index) {
	            var el = $(this.$el);
	            el.jqxDataTable('selectRow', index);
	        },
	        addRow: function addRow(rowData) {
	            $(this.$el).jqxDataTable('addRow', null, rowData);
	        },
	        deleteRowById: function deleteRowById(rowId) {
	            var keyId = this.id;
	            var el = $(this.$el);
	            var viewRows = getAll(el);
	            $.each(viewRows, function (i, rowData) {
	                if (rowData[keyId] == rowId) {
	                    el.jqxDataTable('deleteRow', i);
	                    return false;
	                }
	            });
	        },
	        checkById: function checkById(id) {
	            var vm = this;
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
	        uncheckById: function uncheckById(id) {
	            var vm = this;
	            var keyId = this.id;

	            if ($.inArray(id, vm.checkedIds) === -1) {
	                var params = {};
	                params[keyId] = id;
	                vm.$dispatch('check-change', false, params);
	                return;
	            }

	            $.each(vm.checkedRows, function (i, item) {
	                if (item[keyId] == id) {
	                    var rowData = vm.checkedRows.splice(i, 1)[0];
	                    vm.checkedIds.splice(i, 1);
	                    setCheckStatus(vm);
	                    vm.$dispatch('check-change', false, rowData);
	                    return false;
	                }
	            });
	        },
	        clear: function clear() {
	            var el = $(this.$el);
	            el.jqxDataTable('clear');
	        }
	    },
	    ready: function ready() {
	        var vm = this;
	        var el = $(vm.$el);

	        if (vm.checkable) {
	            vm.columns.unshift(getCheckColumn(vm));
	        }

	        if (vm.operations && vm.operations.items && vm.operations.items.length > 0) {
	            vm.columns.push(getOptColumn(vm));
	        }

	        vm.jqxObj = el.jqxDataTable({
	            width: vm.width,
	            height: vm.height,
	            showHeader: vm.showHeader,
	            pageable: vm.pageable,
	            sortable: vm.sortable,
	            columnsReorder: vm.reorder,
	            columnsResize: vm.resize,
	            enableBrowserSelection: vm.enableBrowserSelection,
	            selectionMode: vm.selectionMode,
	            pagerMode: vm.pagerMode,
	            source: createAdapter(vm),
	            columns: vm.columns,
	            serverProcessing: true,
	            rendered: function rendered() {
	                setCheckStatus(vm);

	                vm.$dispatch('rendered');
	            },
	            ready: function ready() {
	                var $table = el;
	                var $tableContent = $table.find('table');

	                if (vm.checkable) {
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
	                });

	                el.on('click', '.opt-button', function () {
	                    var _this = $(this);
	                    var row = _this.attr('data-row');
	                    var name = _this.attr('data-name');

	                    var viewRows = getAll(el);
	                    vm.$dispatch(name, viewRows[row]);
	                });

	                vm.$dispatch('ready');
	            }
	        });
	    },

	    destory: function destory() {
	        var el = $(this.$el);
	        el.off('click', 'div.bh-checkbox');
	        el.off('rowSelect');
	        el.off('click', '.opt-button');
	        el.jqxDataTable('destroy');
	    }
	};

/***/ },

/***/ 28:
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(29), __esModule: true };

/***/ },

/***/ 29:
/***/ function(module, exports, __webpack_require__) {

	var core  = __webpack_require__(30)
	  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};

/***/ },

/***/ 30:
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },

/***/ 31:
/***/ function(module, exports) {

	module.exports = "\n<div class='bh-datatable'></div>\n";

/***/ }

/******/ });