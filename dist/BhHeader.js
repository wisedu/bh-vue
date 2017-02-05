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

	module.exports = __webpack_require__(129);


/***/ },

/***/ 129:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(130)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\bh-header\\bhHeader.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(131)
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
	  var id = "_v-734af301/bhHeader.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 130:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});


	var _init = function _init(vm) {
	    var el = $(vm.$el);
	    el.bhHeader({
	        'showAsideNav': vm.hasSidemenu,
	        'logo': vm.logo,
	        'title': vm.slogon,
	        'isNavHide': vm.hideNav,
	        'icons': vm.icons,
	        'nav': vm.navItems,
	        'dropMenu': vm.dropMenus,
	        'userImage': vm.userInfo.image,
	        'userInfo': vm.userInfo
	    });

	    el.on('headerRoleChange', function (e, text, $dom) {
	        vm.$dispatch('role-change', e, text, $dom);
	    });
	};

	exports.default = {
	    props: {
	        'hasSidemenu': Boolean,
	        'logo': String,
	        'slogon': String,
	        'hideNav': {
	            default: false
	        },
	        'navItems': Array,
	        'sideMenus': Object,
	        'dropMenus': Array,
	        'icons': Array,
	        'userInfo': {
	            default: function _default() {
	                return {
	                    image: 'http://res.wisedu.com/scenes/public/images/demo/user1.png'
	                };
	            }
	        }
	    },
	    ready: function ready() {
	        var _this = this;

	        _init(this);

	        this.$watch('sideMenus', function (newVal, oldVal) {
	            $.bhAsideNav.init(_this.sideMenus);
	        });
	    }
	};

/***/ },

/***/ 131:
/***/ function(module, exports) {

	module.exports = "\n<header></header>\n";

/***/ }

/******/ });