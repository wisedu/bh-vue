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

	module.exports = __webpack_require__(211);


/***/ },

/***/ 211:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(212)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\bh-toggle\\bhToggle.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(213)
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
	  var id = "_v-bc8c1a3e/bhToggle.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 212:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    data: function data() {
	        return {
	            jqxObj: null
	        };
	    },

	    computed: {
	        val: function val() {
	            return this.toggled ? this.onText : this.offText;
	        }
	    },

	    props: {
	        onText: {
	            default: '开'
	        },
	        offText: {
	            default: '关'
	        },
	        w: {
	            default: 'auto' },
	        toggled: {
	            default: true,
	            type: Boolean
	        },
	        disabled: {
	            default: false,
	            type: Boolean
	        }
	    },
	    methods: {
	        isToggled: function isToggled() {
	            return this.jqxObj.jqxToggleButton('toggled');
	        },
	        toggle: function toggle() {
	            this.toggled = this.jqxObj.jqxToggleButton('toggled');
	            this.$dispatch('toggle', this.toggled);
	        }
	    },
	    ready: function ready() {
	        var self = this;
	        var el = $(this.$el);

	        this.jqxObj = el.jqxToggleButton({
	            width: this.w,
	            toggled: this.toggled,
	            disabled: this.disabled
	        });

	        el.on('click', function () {
	            self.toggle();
	        });
	    },
	    beforeDestroy: function beforeDestroy() {
	        $(this.$el).off('click');
	        $(this.$el).jqxButton('destroy');
	    }
	};

/***/ },

/***/ 213:
/***/ function(module, exports) {

	module.exports = "\n<input type=\"button\" v-model=\"val\" class='bh-btn bh-btn-primary bh-btn-small' />\n";

/***/ }

/******/ });