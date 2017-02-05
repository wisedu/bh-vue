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

	module.exports = __webpack_require__(202);


/***/ },

/***/ 202:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(203)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\bh-tabs\\bhTabs.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(204)
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
	  var id = "_v-20f08ea1/bhTabs.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 203:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    props: {
	        width: {
	            default: '100%'
	        },
	        height: {
	            default: 'auto'
	        },
	        position: {
	            default: 'top'
	        }
	    },
	    methods: {
	        select: function select(index) {
	            $(this.$el).jqxTabs('select', index);
	        },
	        add: function add(index, title, content) {
	            $(this.$el).jqxTabs('addAt', index, title, content);
	        },
	        remove: function remove(index) {
	            $(this.$el).jqxTabs('removeAt', index);
	        }
	    },
	    ready: function ready() {
	        var self = this;
	        var el = $(self.$el);

	        el.jqxTabs({
	            width: self.width,
	            height: self.height,
	            position: self.position
	        });

	        el.on('selected', function (event) {
	            var selectedTab = event.args.item;
	            self.$dispatch('selected', selectedTab);
	        });

	        el.on('unselected', function (event) {
	            var selectedTab = event.args.item;
	            self.$dispatch('unselected', selectedTab);
	        });
	    },
	    beforeDestroy: function beforeDestroy() {
	        var el = $(this.$el);
	        el.off('unselected');
	        el.off('selected');
	        el.jqxTabs('destroy');
	    }
	};

/***/ },

/***/ 204:
/***/ function(module, exports) {

	module.exports = "\n<div class='bh-tabs'>\n    <slot></slot>\n</div>\n";

/***/ }

/******/ });