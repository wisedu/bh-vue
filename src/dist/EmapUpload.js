!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.EmapUpload=e():t.EmapUpload=e()}(this,function(){return function(t){function e(i){if(o[i])return o[i].exports;var r=o[i]={exports:{},id:i,loaded:!1};return t[i].call(r.exports,r,r.exports,e),r.loaded=!0,r.exports}var o={};return e.m=t,e.c=o,e.p="",e(0)}({0:function(t,e,o){t.exports=o(331)},331:function(t,e,o){var i,r,p={};i=o(332),r=o(333),t.exports=i||{},t.exports.__esModule&&(t.exports=t.exports.default);var n="function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports;r&&(n.template=r),n.computed||(n.computed={}),Object.keys(p).forEach(function(t){var e=p[t];n.computed[t]=function(){return e}})},332:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{contextPath:{type:String,default:""},token:{type:String,default:void 0},storeId:{type:String,default:"file"},ftype:{type:[Array,String],default:function(){return["jpg","png","jpeg"]}},width:{default:200},height:{default:150},limit:{type:Number,default:5},size:{type:Number,default:2048},multiple:{type:Boolean,default:!1},buttonType:{type:String,default:"button"},displayType:{type:String,default:"image"},outForm:{type:Boolean,default:!1},outFormUploadUrl:{type:String,default:""},outFormPicUrl:{type:String,default:""},outFormDelete:{type:Function,default:function(){var t=$.Deferred();t.resolve(token)}},params:{type:Object,default:{}}},methods:{getFileToken:function(){return $(this.$el).emapUpload("getFileToken")},getFileUrl:function(){return $(this.$el).emapUpload("getFileUrl")},saveTempFile:function(){return $(this.$el).emapUpload("saveTempFile")},destroy:function(){$(this.$el).emapUpload("destroy")}},ready:function(){var t=this,e=$(this.$el),o=$.isArray(this.ftype)?this.ftype:[this.ftype];e.emapUpload({contextPath:this.contextPath,storeId:this.storeId,type:o,token:this.token,size:this.size,limit:this.limit,width:this.width,height:this.height,multiple:this.multiple,displayType:this.displayType,buttonType:this.buttonType,params:this.params,outForm:this.outForm,outFormUploadUrl:this.outFormUploadUrl,outFormPicUrl:this.outFormPicUrl,outFormDelete:this.outFormDelete,add:function(e,o){t.$dispatch("add",o)},submit:function(e,o){t.$dispatch("submit",o)},done:function(e,o){t.$dispatch("done",o)},fail:function(e,o){t.$dispatch("fail",o)}})},beforeDestroy:function(){this.destroy()}}},333:function(t,e){t.exports=" <div></div> "}})});