!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.EmapAvatarupload=e():t.EmapAvatarupload=e()}(this,function(){return function(t){function e(r){if(o[r])return o[r].exports;var i=o[r]={exports:{},id:r,loaded:!1};return t[r].call(i.exports,i,i.exports,e),i.loaded=!0,i.exports}var o={};return e.m=t,e.c=o,e.p="",e(0)}({0:function(t,e,o){t.exports=o(261)},261:function(t,e,o){var r,i,a={};r=o(262),i=o(263),t.exports=r||{},t.exports.__esModule&&(t.exports=t.exports.default);var n="function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports;i&&(n.template=i),n.computed||(n.computed={}),Object.keys(a).forEach(function(t){var e=a[t];n.computed[t]=function(){return e}})},262:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{contextPath:{type:String,default:""},token:{type:String,default:""},storeId:{type:String,default:"file"},ftype:{type:[Array,String],default:function(){return[]}},size:{type:Number,default:2048},width:{type:Number,default:100},ratio:{type:Number,default:1},defaultAvatar:String},methods:{getFileToken:function(){return $(this.$el).emapAvatarUpload("getFileToken")},getFileUrl:function(){return $(this.$el).emapAvatarUpload("getFileUrl")},saveTempFile:function(){return $(this.$el).emapAvatarUpload("saveTempFile")},destroy:function(){$(this.$el).emapAvatarUpload("destroy")}},ready:function(){var t=this,e=$(this.$el),o=$.isArray(this.ftype)?this.ftype:[this.ftype];e.emapAvatarUpload({contextPath:this.contextPath,storeId:this.storeId,type:o,token:this.token,size:this.size,ratio:this.ratio,width:this.width,defaultAvatar:this.defaultAvatar,onSubmit:function(e){t.$dispatch("submit",e)}})},beforeDestroy:function(){this.destroy()}}},263:function(t,e){t.exports=" <div></div> "}})});