!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.CompChoose=t():e.CompChoose=t()}(this,function(){return function(e){function t(r){if(o[r])return o[r].exports;var n=o[r]={exports:{},id:r,loaded:!1};return e[r].call(n.exports,n,n.exports,t),n.loaded=!0,n.exports}var o={};return t.m=e,t.c=o,t.p="",t(0)}({0:function(e,t,o){e.exports=o(250)},250:function(e,t,o){var r,n,s={};r=o(251),n=o(252),e.exports=r||{},e.exports.__esModule&&(e.exports=e.exports.default);var i="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;n&&(i.template=n),i.computed||(i.computed={}),Object.keys(s).forEach(function(e){var t=s[e];i.computed[e]=function(){return t}})},251:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:["options"],ready:function(){var e=this.options;this.win=$.bh_choose({insertContainer:$(this.$el),leftSourceUrl:e.leftSourceUrl,leftSourceAction:e.leftSourceAction,placeholder:e.placeholder||"搜索应用名称",id:e.id,type:e.type||"post",params:e.params,multiSelect:e.multiSelect,maxSelect:e.maxSelect,rightcellsRenderer:e.rightcellsRenderer,leftcellsRenderer:e.leftcellsRenderer}),this.win.show()},methods:{getSelectedRecords:function(){return this.win.getSelectedRecords()},reloadLeftTable:function(e){this.win.options.params=e,this.win.reloadLeftTable()}}}},252:function(e,t){e.exports=" <div></div> "}})});