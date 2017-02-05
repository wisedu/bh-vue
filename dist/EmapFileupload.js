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

	module.exports = __webpack_require__(278);


/***/ },

/***/ 278:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(279)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\emap-fileupload\\emapFileupload.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(280)
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
	  var id = "_v-575d5a23/emapFileupload.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 279:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    props: {
	        'contextPath': {
	            type: String,
	            default: ''
	        },
	        'token': {
	            type: String,
	            default: ''
	        },
	        'storeId': {
	            type: String,
	            default: 'file'
	        },
	        'ftype': {
	            type: [Array, String],
	            default: function _default() {
	                return [];
	            }
	        },
	        'size': {
	            type: Number,
	            default: 2048
	        },
	        'newToken': {
	            type: Boolean,
	            default: true
	        }
	    },
	    methods: {
	        getFileToken: function getFileToken() {
	            return $(this.$el).emapFileUpload('getFileToken');
	        },
	        getFileUrl: function getFileUrl() {
	            return $(this.$el).emapFileUpload('getFileUrl');
	        },
	        getFileData: function getFileData() {
	            return $(this.$el).emapFileUpload('getFileData');
	        },
	        saveTempFile: function saveTempFile() {
	            return $(this.$el).emapFileUpload('saveTempFile');
	        },
	        getFileNum: function getFileNum() {
	            return $(this.$el).emapFileUpload('getFileNum');
	        },
	        destroy: function destroy() {
	            return $(this.$el).emapFileUpload('destroy');
	        }
	    },
	    ready: function ready() {
	        var vm = this;
	        var el = $(this.$el);

	        var type = $.isArray(this.ftype) ? this.ftype : [this.ftype];

	        el.emapFileUpload({
	            contextPath: this.contextPath,
	            storeId: this.storeId,
	            type: type,
	            token: this.token,
	            size: this.size,
	            newToken: this.newToken,
	            add: function add(e, data) {
	                vm.$dispatch('add', data);
	            },
	            submit: function submit(e, data) {
	                vm.$dispatch('submit', data);
	            },
	            done: function done(e, data) {
	                vm.$dispatch('done', data);
	            },
	            fail: function fail(e, data) {
	                vm.$dispatch('fail', data);
	            }
	        });
	    },
	    beforeDestroy: function beforeDestroy() {
	        this.destroy();
	    }
	};

/***/ },

/***/ 280:
/***/ function(module, exports) {

	module.exports = "\n<div></div>\n";

/***/ }

/******/ });