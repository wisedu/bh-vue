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

	module.exports = __webpack_require__(196);


/***/ },

/***/ 196:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(197)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\bh-step-wizard\\bhStepWizard.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(198)
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
	  var id = "_v-25472ffe/bhStepWizard.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 197:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});


	var pushAfterCheck = function pushAfterCheck(item, arr) {
	    if (!arr || !item) {
	        return;
	    }

	    if ($.inArray(item, arr) === -1) {
	        arr.push(item);
	    }
	};

	exports.default = {
	    props: {
	        items: Array,
	        current: String,
	        container: Object,
	        finished: {
	            type: Array,
	            default: function _default() {
	                return [];
	            }
	        },
	        clickable: {
	            type: Boolean,
	            default: true
	        }
	    },
	    methods: {
	        prev: function prev() {
	            $(this.$el).bhStepWizard('activePrevItem');
	        },
	        next: function next() {
	            $(this.$el).bhStepWizard('activeNextItem');
	        },
	        activate: function activate(stepId) {
	            $(this.$el).bhStepWizard('changeToActive', stepId);
	        },
	        finish: function finish(stepId) {
	            $(this.$el).bhStepWizard('changeToFinished', stepId);
	            pushAfterCheck(stepId, this.finished);
	        },
	        isLast: function isLast() {
	            return $(this.$el).bhStepWizard('isLastStep');
	        }
	    },
	    ready: function ready() {
	        var self = this;
	        var el = $(this.$el);

	        el.bhStepWizard({
	            items: self.items,
	            active: self.current,
	            container: self.container,
	            finished: self.finished,
	            isAddClickEvent: self.clickable,
	            change: function change(step) {
	                self.current = step.stepId;
	                self.$dispatch('change', step);
	            }
	        });
	    }
	};

/***/ },

/***/ 198:
/***/ function(module, exports) {

	module.exports = "\n<div></div>\n";

/***/ }

/******/ });