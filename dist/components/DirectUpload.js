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

	module.exports = __webpack_require__(255);


/***/ },

/***/ 255:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(256)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\direct-upload\\directUpload.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(257)
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
	  var id = "_v-7c09f7f2/directUpload.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 256:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    props: {
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
	        'storeId': {
	            type: String,
	            default: ''
	        },
	        'imagesUrl': {
	            type: Array,
	            default: []
	        },
	        'uploadUrl': {
	            type: String,
	            default: ''
	        },
	        'uploadParam': {
	            type: Object,
	            default: {}
	        },
	        'deleteUrl': {
	            type: String,
	            default: ''
	        },
	        'deleteParam': {
	            type: Object,
	            default: {}
	        }
	    },
	    methods: {
	        destroy: function destroy() {
	            $(this.$el).emapUpload('destroy');
	        }
	    },
	    ready: function ready() {
	        var vm = this;
	        var el = $(this.$el);

	        var type = $.isArray(this.ftype) ? this.ftype : [this.ftype];

	        el.directUpload({
	            type: type,
	            storeId: this.storeId,
	            size: this.size,
	            limit: this.limit,
	            width: this.width,
	            height: this.height,
	            multiple: this.multiple,
	            displayType: this.displayType,
	            buttonType: this.buttonType,
	            uploadUrl: this.uploadUrl,
	            uploadParam: this.uploadParam,
	            deleteUrl: this.deleteUrl,
	            deleteParam: this.deleteParam,
	            imagesUrl: this.imagesUrl,
	            add: function add(e, data) {
	                console.log('导入前触发事件');
	                console.log(data);
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

/***/ 257:
/***/ function(module, exports) {

	module.exports = "\n<div></div>\n";

/***/ }

/******/ });