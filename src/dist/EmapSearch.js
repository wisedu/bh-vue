!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.EmapSearch=t():e.EmapSearch=t()}(this,function(){return function(e){function t(a){if(o[a])return o[a].exports;var r=o[a]={exports:{},id:a,loaded:!1};return e[a].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var o={};return t.m=e,t.c=o,t.p="",t(0)}({0:function(e,t,o){e.exports=o(301)},301:function(e,t,o){var a,r,n={};a=o(302),r=o(303),e.exports=a||{},e.exports.__esModule&&(e.exports=e.exports.default);var l="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;r&&(l.template=r),l.computed||(l.computed={}),Object.keys(n).forEach(function(e){var t=n[e];l.computed[e]=function(){return t}})},302:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:{modelUrl:String,modelName:String,searchModel:{type:String,default:"easy"},schema:{type:Boolean,default:!1},defaultItem:Object,allowAllOption:{type:Boolean,default:!0},showTotalNum:{type:Boolean,default:!1}},ready:function(){var e=this,t=$(e.$el),o=WIS_EMAP_SERV.getModel(e.modelUrl,e.modelName,"search");t.emapAdvancedQuery({data:o,searchModel:this.searchModel,schema:this.schema,defaultItem:this.defaultItem,allowAllOption:this.allowAllOption,showTotalNum:this.showTotalNum}),t.on("search",function(t,o,a){e.$dispatch("search",o)})},methods:{getValue:function(){return $(this.$el).emapAdvancedQuery("getValue")},setValue:function(e){$(this.$el).emapAdvancedQuery("setValue",e)},clear:function(){$(this.$el).emapAdvancedQuery("clear")},updateTotalNum:function(){$(this.$el).emapAdvancedQuery("num")}},beforeDestroy:function(){var e=this,t=$(e.$el);t.off("search")}}},303:function(e,t){e.exports=" <div></div> "}})});