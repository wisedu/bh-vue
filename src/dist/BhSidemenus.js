!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.BhSidemenus=t():e.BhSidemenus=t()}(this,function(){return function(e){function t(n){if(o[n])return o[n].exports;var r=o[n]={exports:{},id:n,loaded:!1};return e[n].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var o={};return t.m=e,t.c=o,t.p="",t(0)}({0:function(e,t,o){e.exports=o(203)},203:function(e,t,o){var n,r,s={};n=o(204),r=o(205),e.exports=n||{},e.exports.__esModule&&(e.exports=e.exports.default);var u="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;r&&(u.template=r),u.computed||(u.computed={}),Object.keys(s).forEach(function(e){var t=s[e];u.computed[e]=function(){return t}})},204:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(e){$.bhAsideNav.init(e)};t.default={props:["source"],ready:function(){o(this.source),this.$watch("source",function(e){o(e)})}}},205:function(e,t){e.exports=" <div></div> "}})});