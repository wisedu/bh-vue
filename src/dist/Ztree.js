!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.Ztree=t():e.Ztree=t()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}({0:function(e,t,n){e.exports=n(315)},4:function(e,t){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var n=this[t];n[2]?e.push("@media "+n[2]+"{"+n[1]+"}"):e.push(n[1])}return e.join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var r={},o=0;o<this.length;o++){var i=this[o][0];"number"==typeof i&&(r[i]=!0)}for(o=0;o<t.length;o++){var a=t[o];"number"==typeof a[0]&&r[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),e.push(a))}},e}},5:function(e,t,n){function r(e,t){for(var n=0;n<e.length;n++){var r=e[n],o=d[r.id];if(o){o.refs++;for(var i=0;i<o.parts.length;i++)o.parts[i](r.parts[i]);for(;i<r.parts.length;i++)o.parts.push(u(r.parts[i],t))}else{for(var a=[],i=0;i<r.parts.length;i++)a.push(u(r.parts[i],t));d[r.id]={id:r.id,refs:1,parts:a}}}}function o(e){for(var t=[],n={},r=0;r<e.length;r++){var o=e[r],i=o[0],a=o[1],s=o[2],u=o[3],c={css:a,media:s,sourceMap:u};n[i]?n[i].parts.push(c):t.push(n[i]={id:i,parts:[c]})}return t}function i(e,t){var n=h(),r=x[x.length-1];if("top"===e.insertAt)r?r.nextSibling?n.insertBefore(t,r.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),x.push(t);else{if("bottom"!==e.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(t)}}function a(e){e.parentNode.removeChild(e);var t=x.indexOf(e);t>=0&&x.splice(t,1)}function s(e){var t=document.createElement("style");return t.type="text/css",i(e,t),t}function u(e,t){var n,r,o;if(t.singleton){var i=g++;n=v||(v=s(t)),r=c.bind(null,n,i,!1),o=c.bind(null,n,i,!0)}else n=s(t),r=l.bind(null,n),o=function(){a(n)};return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else o()}}function c(e,t,n,r){var o=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=y(t,o);else{var i=document.createTextNode(o),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(i,a[t]):e.appendChild(i)}}function l(e,t){var n=t.css,r=t.media,o=t.sourceMap;if(r&&e.setAttribute("media",r),o&&(n+="\n/*# sourceURL="+o.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */"),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}var d={},f=function(e){var t;return function(){return"undefined"==typeof t&&(t=e.apply(this,arguments)),t}},p=f(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),h=f(function(){return document.head||document.getElementsByTagName("head")[0]}),v=null,g=0,x=[];e.exports=function(e,t){t=t||{},"undefined"==typeof t.singleton&&(t.singleton=p()),"undefined"==typeof t.insertAt&&(t.insertAt="bottom");var n=o(e);return r(n,t),function(e){for(var i=[],a=0;a<n.length;a++){var s=n[a],u=d[s.id];u.refs--,i.push(u)}if(e){var c=o(e);r(c,t)}for(var a=0;a<i.length;a++){var u=i[a];if(0===u.refs){for(var l=0;l<u.parts.length;l++)u.parts[l]();delete d[u.id]}}}};var y=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}()},315:function(e,t,n){var r,o,i={};n(316),r=n(318),o=n(319),e.exports=r||{},e.exports.__esModule&&(e.exports=e.exports.default);var a="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;o&&(a.template=o),a.computed||(a.computed={}),Object.keys(i).forEach(function(e){var t=i[e];a.computed[e]=function(){return t}})},316:function(e,t,n){var r=n(317);"string"==typeof r&&(r=[[e.id,r,""]]);n(5)(r,{});r.locals&&(e.exports=r.locals)},317:function(e,t,n){t=e.exports=n(4)(),t.push([e.id,"",""])},318:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=0,r={async:{enable:!1,contentType:"application/json",type:"post",dataType:"json"},data:{key:{name:"label"}},callback:{}};t.default={props:{setting:{type:Object,default:function(){return{}}},extraSetting:{type:Object,default:function(){return{}}},data:{type:Array,default:function(){return[]}}},data:function(){return{treeId:"ztree-"+n++,currentSelectedNodeId:""}},created:function(){var e=this,t=["onDblClick","onMouseDown","onCheck","onCollapse","onDblClick","onCollapse","onDrag","onDragMove","onDrop","onMouseUp","onNodeCreated","onRemove","onRename","onRightClick","onClick","onExpand","onAsyncError","onAsyncSuccess"];_.each(t,function(t){r.callback[t]=e._treeEvent(t)}),this.extraSetting.url&&(r.callback.onExpand=this._onExpand,r.callback.onClick=this._onClick)},ready:function(){var e=$.extend({},r,this.setting);this._setting=e,this.data.length>0?$.fn.zTree.init($(this.$el),e,this.data):this.extraSetting.url&&($.fn.zTree.init($(this.$el),e),this._load(null,!0))},methods:{_load:function(e,t){var n=this;$.ajax({type:this._setting.async.type,contentType:this._setting.async.contentType,url:this.extraSetting.url,data:this.extraSetting.params}).done(function(r){var o=[];n.extraSetting.dataFilter&&(o=n.extraSetting.dataFilter(r));var i=$.fn.zTree.getZTreeObj(n.treeId);i.addNodes(e,o),t&&Vue.nextTick(function(){n.$emit("inited",o)})})},_onExpand:function(e,t,n){var r=this;$.fn.zTree.getZTreeObj(this.treeId);this.$emit("on-expand",n,e,t),this.extraSetting.url&&Vue.nextTick(function(){r._load(n)})},_onClick:function(e,t,n){n.tId!=this.currentSelectedNodeId&&(this.$emit("on-click",n,e,t),this.currentSelectedNodeId=n.tId)},action:function(e){for(var t=$.fn.zTree.getZTreeObj(this.treeId),n=arguments.length,r=Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return t[e].apply(t,r)},_treeEvent:function(e){var t=this;return function(){for(var n=arguments.length,r=Array(n),o=0;o<n;o++)r[o]=arguments[o];t.$emit.apply(t,[Vue.util.hyphenate(e)].concat(r))}}}}},319:function(e,t){e.exports=" <div :id=treeId class=ztree> </div> "}})});