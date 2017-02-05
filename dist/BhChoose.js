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
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(17);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if (media) {
			styleElement.setAttribute("media", media);
		}

		if (sourceMap) {
			// https://developer.chrome.com/devtools/docs/javascript-debugging
			// this makes source maps inside style tags work properly in Chrome
			css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */';
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(18)
	__vue_script__ = __webpack_require__(20)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\bh-choose\\bhChoose.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(32)
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
	  var id = "_v-4bb7ae41/bhChoose.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(19);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/.0.23.1@css-loader/index.js!./../../node_modules/.8.5.4@vue-loader/lib/style-rewriter.js!./../../node_modules/.2.2.3@less-loader/index.js!./../../node_modules/.8.5.4@vue-loader/lib/selector.js?type=style&index=0!./bhChoose.vue", function() {
				var newContent = require("!!./../../node_modules/.0.23.1@css-loader/index.js!./../../node_modules/.8.5.4@vue-loader/lib/style-rewriter.js!./../../node_modules/.2.2.3@less-loader/index.js!./../../node_modules/.8.5.4@vue-loader/lib/selector.js?type=style&index=0!./bhChoose.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, ".bh-choose {\n  width: 100%;\n  overflow: hidden;\n  border: 1px solid #d8dcf0;\n}\n.bh-choose .side {\n  padding: 5px;\n  display: inline-block;\n}\n.bh-choose .side.left {\n  border-right: none;\n}\n.bh-choose .side.left .search-box {\n  background: rgba(63, 81, 181, 0.04);\n}\n.bh-choose .side.left .search-box input,\n.bh-choose .side.left .search-box i {\n  border: none;\n}\n.bh-choose .side.right {\n  background: rgba(63, 81, 181, 0.04);\n  position: relative;\n  border-left: 1px solid #d8dcf0;\n}\n.bh-choose .side.right .title {\n  padding: 4px 0;\n  text-indent: 5px;\n  border-bottom: none;\n}\n.bh-choose .side.right .before {\n  border: 44px solid transparent;\n  border-left: 14px solid #d8dcf0;\n  position: absolute;\n  top: 128px;\n  left: 0;\n}\n.bh-choose .side.right .after {\n  border: 44px solid transparent;\n  border-left: 14px solid #fff;\n  position: absolute;\n  top: 128px;\n  left: -1px;\n}\n.bh-choose .side.right .right-list {\n  overflow: auto;\n}\n", ""]);

	// exports


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _bhSearch = __webpack_require__(21);

	var _bhSearch2 = _interopRequireDefault(_bhSearch);

	var _bhDatatable = __webpack_require__(26);

	var _bhDatatable2 = _interopRequireDefault(_bhDatatable);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    data: function data() {
	        return {
	            checkedRows: [],
	            searchVal: '',
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
	        queryParams: function queryParams() {
	            var params = this.leftParams || {};
	            params[this.localSearchField] = this.searchVal;
	            return params;
	        },
	        columns: function columns() {
	            var vm = this;
	            return vm.leftCols ? vm.leftCols : [{
	                dataField: 'onlineDate',
	                cellsRenderer: function cellsRenderer(row, column, value, rowData) {
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
	        rcolumns: function rcolumns() {
	            var vm = this;
	            return vm.rightCols ? vm.rightCols : [{
	                dataField: 'onlineDate',
	                cellsRenderer: function cellsRenderer(row, column, value, rowData) {
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
	        reload: function reload(side) {
	            side !== 'left' && this.$refs.bhchooserighttable.render();
	            side !== 'right' && this.$refs.bhchooselefttable.render();
	        },
	        onCheckChange: function onCheckChange(checked, rowData) {
	            if (!rowData) {
	                return;
	            }

	            var vm = this;

	            if (!checked) {
	                vm.$refs.bhchooserighttable.deleteRowById(rowData[this.id]);
	            } else {
	                vm.$refs.bhchooserighttable.addRow(rowData);
	            }

	            this.$dispatch('change');
	        },
	        leftListRendered: function leftListRendered() {
	            var vm = this;
	            vm.$dispatch('left-ready');
	            setTimeout(function () {
	                vm.$refs.bhchooselefttable.setChecked(vm.$refs.bhchooserighttable.getTotalRecords(), vm.id);
	            }, 0);
	        },
	        rightListRendered: function rightListRendered() {
	            if (this.nicescroll) {
	                $(this.$el).find('.right-list').niceScroll();
	            }
	        },
	        search: function search() {
	            this.$refs.bhchooselefttable.render();
	        },
	        getChecked: function getChecked() {
	            return this.$refs.bhchooserighttable.getTotalRecords();
	        },
	        checkById: function checkById(id) {
	            return this.$refs.bhchooselefttable.checkById(id);
	        },
	        uncheck: function uncheck(rowData) {
	            this.uncheckById(rowData[this.id]);
	        },
	        uncheckById: function uncheckById(id) {
	            return this.$refs.bhchooselefttable.uncheckById(id);
	        },
	        addItem: function addItem(rowData) {
	            return this.$refs.bhchooselefttable.addRow(rowData);
	        },
	        addAndCheck: function addAndCheck(rowData) {
	            this.addItem(rowData);
	            this.$refs.bhchooselefttable.refresh();
	            this.checkById(rowData[this.id]);
	        }
	    },
	    components: { BhSearch: _bhSearch2.default, BhDatatable: _bhDatatable2.default }
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(22)
	__vue_script__ = __webpack_require__(24)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\bh-search\\bhSearch.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(25)
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
	  var id = "_v-78ff1161/bhSearch.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(23);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/.0.23.1@css-loader/index.js!./../../node_modules/.8.5.4@vue-loader/lib/style-rewriter.js?id=_v-78ff1161&scoped=true!./../../node_modules/.8.5.4@vue-loader/lib/selector.js?type=style&index=0!./bhSearch.vue", function() {
				var newContent = require("!!./../../node_modules/.0.23.1@css-loader/index.js!./../../node_modules/.8.5.4@vue-loader/lib/style-rewriter.js?id=_v-78ff1161&scoped=true!./../../node_modules/.8.5.4@vue-loader/lib/selector.js?type=style&index=0!./bhSearch.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n@icon-color: #999;\n\n.search-box[_v-78ff1161] {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    position: relative;\n}\n.search-box input[_v-78ff1161] {\n    text-indent: 33px;\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n    width: auto;\n}\n.search-box .icon-search[_v-78ff1161] {\n    left: 0;\n    position: absolute;\n    padding: 5px 6px;\n    color: @icon-color;\n}\n.search-box a[_v-78ff1161] {\n    border: none;\n    margin-left: -1px;\n}\n", ""]);

	// exports


/***/ },
/* 24 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _trim = function _trim(val) {
	    if (!val) {
	        return '';
	    }

	    return val.trim();
	};

	exports.default = {
	    data: function data() {
	        return {
	            jqxObj: null
	        };
	    },

	    props: {
	        'value': {
	            type: String,
	            default: ''
	        },
	        'showButton': {
	            type: Boolean,
	            default: true
	        },
	        'source': {
	            default: function _default() {
	                return [];
	            }
	        },
	        'placeholder': {
	            default: '输入要搜索的关键字'
	        },
	        'btnText': {
	            default: '搜索'
	        },
	        'maxlength': {
	            type: Number,
	            default: 20
	        },
	        'minlength': {
	            type: Number,
	            default: 0
	        }
	    },
	    methods: {
	        getValue: function getValue() {
	            return _trim(this.value);
	        },
	        search: function search() {
	            this.$dispatch('search', _trim(this.value));
	        }
	    },
	    ready: function ready() {
	        var el = $(this.$el);

	        this.jqxObj = el.jqxInput({
	            source: this.source
	        });

	        this.$nextTick(function () {
	            el.find('input.jqx-input-group-addon').css('border-right-width', '1px');
	        });
	    },
	    beforeDestroy: function beforeDestroy() {
	        var el = $(this.$el);
	        el.jqxInput('destroy');
	    }
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"search-box\" _v-78ff1161=\"\">\n    <input type=\"text\" v-model=\"value\" class=\"bh-form-control\" @keyup.enter=\"search\" :maxlength=\"maxlength\" :minlength=\"minlength\" :placeholder=\"placeholder\" _v-78ff1161=\"\">\n    <i class=\"iconfont icon-search\" _v-78ff1161=\"\"></i>\n    <a v-if=\"showButton\" class=\"bh-btn bh-btn-primary bh-btn-small j-search-btn\" href=\"javascript:void(0);\" @click=\"search\" _v-78ff1161=\"\">{{btnText}}</a>\n</div>\n";

/***/ },
/* 26 */
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
/* 27 */
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
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(29), __esModule: true };

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var core  = __webpack_require__(30)
	  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};

/***/ },
/* 30 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = "\n<div class='bh-datatable'></div>\n";

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = "\n<div class='bh-choose'>\n    <div class=\"side left bh-pull-left\" :style='{width: leftWidth}'>\n        <bh-search :show-button='false' :value.sync='searchVal' :placeholder='placeholder' @search='search' class='bh-mb-8'></bh-search>\n        <div class=\"left-list\">\n            <bh-datatable\n                v-ref:bhchooselefttable\n                :id='id'\n                :checkable='true'\n                :height='height'\n                :checked-rows.sync='checkedRows'\n                :show-header='showHeader'\n                :url='leftSourceUrl'\n                :page-number-field='pageNumberField'\n                :page-size-field='pageSizeField'\n                selection-mode='default'\n                :root='leftSourceAction'\n                :columns='columns'\n                :query-type='type'\n                :query-params='queryParams'\n                class='transparentGrid'\n                @rendered='leftListRendered'\n                @check-change='onCheckChange'\n                :callbacks='callbacks'>\n            </bh-datatable>\n        </div>\n    </div>\n    <div class=\"side right bh-pull-left\" :style='{width: rightWidth}'>\n        <div class=\"before\"></div>\n        <div class=\"title\">{{rightTitle}}</div>\n        <div class=\"right-list\" :style='{height: height + \"px\"}'>\n            <bh-datatable\n                v-ref:bhchooserighttable\n                :id='id'\n                :url='rightSourceUrl'\n                :localdata='localdata'\n                :pageable='false'\n                :show-header='showHeader'\n                :root='rightSourceAction'\n                :columns='rcolumns'\n                :query-type='type'\n                :query-params='rightParams'\n                :operations='operations'\n                class='transparentGrid'\n                @del='uncheck'\n                @rendered='rightListRendered'>\n            </bh-datatable>\n        </div>\n        <div class=\"after\"></div>\n    </div>\n</div>\n";

/***/ }
/******/ ]);