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

	module.exports = __webpack_require__(258);


/***/ },

/***/ 258:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(259)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\emap-avatarupload\\emapAvatarupload.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(260)
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
	  var id = "_v-e92b537a/emapAvatarupload.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 259:
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
	        'width': {
	            type: Number,
	            default: 100
	        },
	        'ratio': {
	            type: Number,
	            default: 1
	        },
	        defaultAvatar: String
	    },
	    methods: {
	        getFileToken: function getFileToken() {
	            return $(this.$el).emapAvatarUpload('getFileToken');
	        },
	        getFileUrl: function getFileUrl() {
	            return $(this.$el).emapAvatarUpload('getFileUrl');
	        },
	        saveTempFile: function saveTempFile() {
	            return $(this.$el).emapAvatarUpload('saveTempFile');
	        },
	        destroy: function destroy() {
	            $(this.$el).emapAvatarUpload('destroy');
	        }
	    },
	    ready: function ready() {
	        var vm = this;
	        var el = $(this.$el);

	        var type = $.isArray(this.ftype) ? this.ftype : [this.ftype];

	        el.emapAvatarUpload({
	            contextPath: this.contextPath,
	            storeId: this.storeId,
	            type: type,
	            token: this.token,
	            size: this.size,
	            ratio: this.ratio,
	            width: this.width,
	            defaultAvatar: this.defaultAvatar,
	            onSubmit: function onSubmit(token) {
	                vm.$dispatch('submit', token);
	            }
	        });
	    },
	    beforeDestroy: function beforeDestroy() {
	        this.destroy();
	    }
	};

/***/ },

/***/ 260:
/***/ function(module, exports) {

	module.exports = "\n<div></div>\n";

/***/ }

/******/ });