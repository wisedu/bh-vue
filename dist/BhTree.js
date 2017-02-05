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

	module.exports = __webpack_require__(219);


/***/ },

/***/ 4:
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

/***/ 5:
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

/***/ 219:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(220)
	__vue_script__ = __webpack_require__(222)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\bh-tree\\bhTree.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(223)
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
	  var id = "_v-08202aa1/bhTree.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 220:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(221);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/.0.23.1@css-loader/index.js!./../../node_modules/.8.5.4@vue-loader/lib/style-rewriter.js!./../../node_modules/.2.2.3@less-loader/index.js!./../../node_modules/.8.5.4@vue-loader/lib/selector.js?type=style&index=0!./bhTree.vue", function() {
				var newContent = require("!!./../../node_modules/.0.23.1@css-loader/index.js!./../../node_modules/.8.5.4@vue-loader/lib/style-rewriter.js!./../../node_modules/.2.2.3@less-loader/index.js!./../../node_modules/.8.5.4@vue-loader/lib/selector.js?type=style&index=0!./bhTree.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 221:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, ".jqx-tree.has-opt .jqx-tree-item-li .opt-panel {\n  padding: 3px;\n}\n.jqx-tree.has-opt .jqx-tree-item-li .opt-panel .opt-btn {\n  cursor: pointer;\n}\n", ""]);

	// exports


/***/ },

/***/ 222:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _getAll = function _getAll(el) {
	    return el.jqxTree('getItems');
	};
	var _getSelectedItem = function _getSelectedItem(el) {
	    return el.jqxTree('getSelectedItem');
	};

	var getCheckedItems = function getCheckedItems(el) {
	    return el.jqxTree('getCheckedItems');
	};

	var getItem = function getItem(el, element) {
	    return el.jqxTree('getItem', element);
	};

	var selectItem = function selectItem(el, item) {
	    return el.jqxTree('selectItem', item);
	};

	var _checkAll = function _checkAll(el) {
	    return el.jqxTree('checkAll');
	};

	var _uncheckAll = function _uncheckAll(el) {
	    return el.jqxTree('uncheckAll');
	};

	var _addChild = function _addChild(el, child, parent) {
	    if (!child) {
	        console.log('add child failed, invalid inupt');
	        return false;
	    }

	    if (!$.isArray(child)) {
	        child = [child];
	    }

	    $.each(child, function (i, item) {
	        el.jqxTree('addTo', item, parent, false);
	    });

	    el.jqxTree('render');

	    return true;
	};

	var _remove = function _remove(el, item) {
	    if (!item) {
	        console.log('remove item failed, invalid inupt');
	        return false;
	    }

	    if (!$.isArray(item)) {
	        item = [item];
	    }

	    $.each(item, function (i, node) {
	        el.jqxTree('removeItem', node);
	    });

	    el.jqxTree('render');
	};

	var addEvents = function addEvents(vm) {
	    var self = vm;
	    var el = $(self.$el);

	    el.on('select', function (event) {
	        var args = event.args;
	        var item = getItem(el, args.element);

	        self.selectedItem = item;

	        el.find('li').removeClass('edit-tree-li-select');
	        $(item.element).addClass('edit-tree-li-select');
	        self.$dispatch('select', item);
	    });

	    el.on('checkChange', function (event) {
	        var args = event.args;

	        self.checkedItems = getCheckedItems(el);
	        var item = getItem(el, args.element);

	        if (!item) {
	            return;
	        }

	        self.$dispatch('check-change', {
	            item: item,
	            checked: args.checked
	        });
	    });
	};

	var addDefaultSelectEvents = function addDefaultSelectEvents(vm) {
	    var self = vm;
	    var el = $(vm.$els.treeroot);

	    if (!vm.defaultSelect) {
	        return;
	    }

	    vm.$nextTick(function () {
	        var items = _getAll(el);
	        if (!items.length > 0) {
	            return;
	        }
	        selectItem(el, items[0]);

	        self.selectedItem = items[0];
	        self.$dispatch('select', items[0]);
	        self.$dispatch('initialized');
	    });
	};

	var _addOperations = function _addOperations(vm) {
	    var operations = vm.operations;
	    if (!operations) {
	        return;
	    }

	    var root = $(vm.$el);
	    root.addClass('has-opt').on('mouseenter', '.jqx-tree-item', function (event) {
	        root.find('.opt-panel').remove();
	        var target = $(event.target);
	        var li = target.parent();
	        li.addClass('edit-tree-item-hover');
	        var item = getItem(root, li[0]);
	        var opts = null;
	        if (typeof operations === 'function') {
	            opts = operations(item) || [];
	        } else {
	            opts = operations;
	        }

	        var rootOffset = root.offset();
	        var liOffset = target.offset();

	        var optHtml = $('<div>').addClass('opt-panel').css({
	            top: liOffset.top - rootOffset.top,
	            right: 0,
	            position: 'absolute'
	        });

	        opts.forEach(function (opt) {
	            $('<a>').text(opt.title).data('action', opt.name).data('item', item).addClass('opt-btn bh-mh-4').appendTo(optHtml);
	        });

	        li.append(optHtml);

	        var targetDiv = root.find('.opt-panel').parent().find('.jqx-tree-item');
	        var useWidth = $('.opt-panel').width();
	        var originWidth = targetDiv.width();
	        var desc = targetDiv.text();
	        targetDiv.css('padding-right', useWidth + 'px').addClass('bh-str-cut').attr('title', desc);
	    }).on('mouseleave', '.jqx-tree-item-li', function (event) {
	        root.find('.opt-panel').parent().find('.jqx-tree-item').css('padding-right', '').removeClass('bh-str-cut');
	        root.find('.opt-panel').remove();
	    }).on('click', '.opt-btn', function (event) {
	        var target = $(event.target);
	        vm.$dispatch(target.data('action'), target.data('item'));
	    });
	};

	var _removeOperations = function _removeOperations(vm) {
	    var root = $(vm.$els.treeroot);
	    root.off('mouseenter').off('mouseleave').off('click');
	    root.find('.opt-panel').remove();
	};

	var createTree = function createTree(vm, options) {
	    _removeOperations(vm);
	    var el = $(vm.$els.treeroot);

	    vm.jqxObj = el.jqxTree(options);
	    addDefaultSelectEvents(vm);
	    vm.selectedItem = _getSelectedItem(el);
	    vm.checkedItems = getCheckedItems(el);

	    _addOperations(vm);

	    return vm.jqxObj;
	};

	var prepareSource = function prepareSource(vm) {
	    var fields = vm.fields;

	    if ($.isEmptyObject(fields)) {
	        return vm.source;
	    }

	    var params = $.extend({}, vm.defaultFields, fields);

	    var mapper = [];
	    var dataFields = [];
	    $.each(fields, function (key, val) {
	        if ($.isArray(val)) {
	            mapper.push({ name: val[0], map: key });
	            dataFields.push({ name: val[0], type: val[1] });
	        } else {
	            if ($.inArray(val, ['expanded', 'selected']) > -1) {
	                dataFields.push({ name: val, type: 'bool' });
	            } else {
	                dataFields.push({ name: val });
	            }

	            mapper.push({ name: val, map: key });
	        }
	    });

	    var source = {
	        datatype: 'array',
	        id: params.id,
	        datafields: dataFields,
	        localdata: vm.source
	    };
	    var dataAdapter = new $.jqx.dataAdapter(source);
	    dataAdapter.dataBind();
	    var ret = dataAdapter.getRecordsHierarchy(params.id, params.pid, 'items', mapper);

	    mapper = null;
	    source = null;

	    return ret || [];
	};

	exports.default = {
	    data: function data() {
	        return {
	            jqxObj: null,
	            defaultOpts: {
	                hasThreeStates: false,
	                checkboxes: false
	            },
	            defaultFields: {
	                id: 'id',
	                pid: 'parentid',
	                label: 'label'
	            }
	        };
	    },

	    props: {
	        options: Object,
	        selectedItem: Object,
	        checkedItems: Array,
	        fields: Object,
	        operations: [Array, Function],
	        source: {
	            type: Array,
	            default: function _default() {
	                return [];
	            }
	        },
	        defaultSelect: {
	            type: Boolean,
	            default: false
	        }
	    },
	    methods: {
	        getAll: function getAll() {
	            return _getAll($(this.$el));
	        },
	        checkAll: function checkAll() {
	            return _checkAll($(this.$el));
	        },
	        uncheckAll: function uncheckAll() {
	            return _uncheckAll($(this.$el));
	        },
	        addChild: function addChild(child, parent) {
	            return _addChild($(this.$el), child, parent);
	        },
	        addBefore: function addBefore(item, elem) {
	            return $(this.$el).jqxTree('addBefore', item, elem);
	        },
	        addTo: function addTo(item, elem) {
	            return $(this.$el).jqxTree('addTo', item, elem, false);
	        },
	        addAfter: function addAfter(item, elem) {
	            return $(this.$el).jqxTree('addAfter', item, elem);
	        },
	        remove: function remove(item) {
	            return _remove($(this.$el), item);
	        },
	        collapseItem: function collapseItem(item) {
	            return $(this.$el).jqxTree('collapseItem', item);
	        },
	        expandItem: function expandItem(item) {
	            return $(this.$el).jqxTree('expandItem', item);
	        },
	        selectItem: function selectItem(item) {
	            return $(this.$el).jqxTree('selectItem', item);
	        },
	        getSelectedItem: function getSelectedItem() {
	            return _getSelectedItem($(this.$el));
	        },
	        updateItem: function updateItem(item, newItem) {
	            return $(this.$el).jqxTree('updateItem', item, newItem);
	        }
	    },
	    ready: function ready() {
	        var self = this;

	        var options = self.options = $.extend(self.defaultOpts, self.options);
	        options.source = prepareSource(self);

	        createTree(self, options);

	        addEvents(this);

	        self.$watch('source', function (newVal) {
	            createTree(self, { source: prepareSource(self) });
	        });
	    },
	    beforeDestroy: function beforeDestroy() {
	        _removeOperations(this);
	        var el = $(this.$el);
	        el.off('checkChange');
	        el.off('select');
	        el.off('itemClick');
	        el.jqxTree('destroy');
	    }
	};

/***/ },

/***/ 223:
/***/ function(module, exports) {

	module.exports = "\n<div v-el:treeroot></div>\n";

/***/ }

/******/ });