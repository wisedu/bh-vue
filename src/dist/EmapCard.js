!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.EmapCard=t():e.EmapCard=t()}(this,function(){return function(e){function t(r){if(o[r])return o[r].exports;var n=o[r]={exports:{},id:r,loaded:!1};return e[r].call(n.exports,n,n.exports,t),n.loaded=!0,n.exports}var o={};return t.m=e,t.c=o,t.p="",t(0)}({0:function(e,t,o){e.exports=o(288)},288:function(e,t,o){var r,n,p={};r=o(289),n=o(290),e.exports=r||{},e.exports.__esModule&&(e.exports=e.exports.default);var s="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;n&&(s.template=n),s.computed||(s.computed={}),Object.keys(p).forEach(function(e){var t=p[e];s.computed[e]=function(){return t}})},289:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:{options:Object},ready:function(){var e=this,t=$(e.$el);t.emapCard(e.options)},methods:{reload:function(e){$(this.$el).emapCard("reload",e)},reloadFirstPage:function(e){$(this.$el).emapCard("reloadFirstPage",e)},getTotalRecords:function(){return $(this.$el).emapCard("getTotalRecords")}}}},290:function(e,t){e.exports=" <div></div> "}})});