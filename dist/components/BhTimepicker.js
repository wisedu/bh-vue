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

	module.exports = __webpack_require__(208);


/***/ },

/***/ 208:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(209)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\bh-timepicker\\bhTimepicker.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(210)
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
	  var id = "_v-5a821041/bhTimepicker.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 209:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _init = function _init(vm) {
	    var opts = {
	        defaultType: vm.type,
	        format: vm.format,
	        isDisable: vm.disabled,
	        ready: function ready() {
	            vm.$dispatch('ready');
	        },
	        selectedTime: function selectedTime(startTimeStr, endTimeStr) {
	            vm.$dispatch('change', startTimeStr, endTimeStr);
	        }
	    };

	    if (vm.max || vm.min) {
	        opts.range = {
	            max: vm.max,
	            min: vm.min
	        };
	    }

	    if (vm.start || vm.end) {
	        opts.time = {
	            start: vm.start,
	            end: vm.end
	        };
	    }

	    $(vm.$el).bhTimePicker(opts);
	};

	var _addWatch = function _addWatch(vm) {
	    vm.$watch('start', function (newVal) {
	        vm.setValue({ startTime: newVal });
	    });

	    vm.$watch('end', function (newVal) {
	        vm.setValue({ endTime: newVal });
	    });

	    vm.$watch('disabled', function (newVal) {
	        vm.setDisable(newVal);
	    });
	};

	exports.default = {
	    props: {
	        format: {
	            default: 'YYYY-MM-DD',
	            type: String
	        },
	        max: Date,
	        min: Date,
	        start: Date,
	        end: Date,
	        disabled: {
	            default: false,
	            type: Boolean
	        },
	        type: {
	            type: String,
	            default: 'all'
	        }
	    },
	    methods: {
	        getValue: function getValue() {
	            return $(this.$el).bhTimePicker('getValue');
	        },
	        setValue: function setValue(data) {
	            return $(this.$el).bhTimePicker('setValue', data);
	        },
	        setDisable: function setDisable(isDisable) {
	            var method = isDisable ? 'setDisable' : 'setEnable';
	            return $(this.$el).bhTimePicker(method);
	        }
	    },
	    ready: function ready() {
	        _init(this);
	        _addWatch(this);
	    }
	};

/***/ },

/***/ 210:
/***/ function(module, exports) {

	module.exports = "\n<div></div>\n";

/***/ }

/******/ });