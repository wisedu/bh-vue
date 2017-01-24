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

	module.exports = __webpack_require__(301);


/***/ },

/***/ 301:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(302)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\emap-upload\\emapUpload.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(303)
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
	  var id = "_v-435fc2a3/emapUpload.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 302:
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
	            default: undefined
	        },
	        'storeId': {
	            type: String,
	            default: 'file'
	        },
	        'ftype': {
	            type: [Array, String],
	            default: function _default() {
	                return ['jpg', 'png', 'jpeg'];
	            }
	        },
	        'width': {
	            default: 200
	        },
	        'height': {
	            default: 150
	        },
	        'limit': {
	            type: Number,
	            default: 5
	        },
	        'size': {
	            type: Number,
	            default: 2048
	        },
	        'multiple': {
	            type: Boolean,
	            default: false
	        },
	        'buttonType': {
	            type: String,
	            default: 'button'
	        },
	        'displayType': {
	            type: String,
	            default: 'image'
	        },
	        'outForm': {
	            type: Boolean,
	            default: false
	        },
	        'outFormUploadUrl': {
	            type: String,
	            default: ''
	        },
	        'outFormPicUrl': {
	            type: String,
	            default: ''
	        },
	        'outFormDelete': {
	            type: Function,
	            default: function _default() {
	                var dtd = $.Deferred();
	                dtd.resolve(token);
	            }
	        },
	        'params': {
	            type: Object,
	            default: {}
	        }
	    },
	    methods: {
	        getFileToken: function getFileToken() {
	            return $(this.$el).emapUpload('getFileToken');
	        },
	        getFileUrl: function getFileUrl() {
	            return $(this.$el).emapUpload('getFileUrl');
	        },
	        saveTempFile: function saveTempFile() {
	            return $(this.$el).emapUpload('saveTempFile');
	        },
	        destroy: function destroy() {
	            $(this.$el).emapUpload('destroy');
	        }
	    },
	    ready: function ready() {
	        var vm = this;
	        var el = $(this.$el);

	        var type = $.isArray(this.ftype) ? this.ftype : [this.ftype];

	        el.emapUpload({
	            contextPath: this.contextPath,
	            storeId: this.storeId,
	            type: type,
	            token: this.token,
	            size: this.size,
	            limit: this.limit,
	            width: this.width,
	            height: this.height,
	            multiple: this.multiple,
	            displayType: this.displayType,
	            buttonType: this.buttonType,
	            params: this.params,
	            outForm: this.outForm,
	            outFormUploadUrl: this.outFormUploadUrl,
	            outFormPicUrl: this.outFormPicUrl,
	            outFormDelete: this.outFormDelete,
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

/***/ 303:
/***/ function(module, exports) {

	module.exports = "\n<div></div>\n";

/***/ }

/******/ });