!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.BhUploader=e():t.BhUploader=e()}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return t[r].call(i.exports,i,i.exports,e),i.loaded=!0,i.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}({0:function(t,e,n){t.exports=n(222)},4:function(t,e){t.exports=function(){var t=[];return t.toString=function(){for(var t=[],e=0;e<this.length;e++){var n=this[e];n[2]?t.push("@media "+n[2]+"{"+n[1]+"}"):t.push(n[1])}return t.join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},i=0;i<this.length;i++){var o=this[i][0];"number"==typeof o&&(r[o]=!0)}for(i=0;i<e.length;i++){var s=e[i];"number"==typeof s[0]&&r[s[0]]||(n&&!s[2]?s[2]=n:n&&(s[2]="("+s[2]+") and ("+n+")"),t.push(s))}},t}},5:function(t,e,n){function r(t,e){for(var n=0;n<t.length;n++){var r=t[n],i=p[r.id];if(i){i.refs++;for(var o=0;o<i.parts.length;o++)i.parts[o](r.parts[o]);for(;o<r.parts.length;o++)i.parts.push(u(r.parts[o],e))}else{for(var s=[],o=0;o<r.parts.length;o++)s.push(u(r.parts[o],e));p[r.id]={id:r.id,refs:1,parts:s}}}}function i(t){for(var e=[],n={},r=0;r<t.length;r++){var i=t[r],o=i[0],s=i[1],a=i[2],u=i[3],f={css:s,media:a,sourceMap:u};n[o]?n[o].parts.push(f):e.push(n[o]={id:o,parts:[f]})}return e}function o(t,e){var n=h(),r=m[m.length-1];if("top"===t.insertAt)r?r.nextSibling?n.insertBefore(e,r.nextSibling):n.appendChild(e):n.insertBefore(e,n.firstChild),m.push(e);else{if("bottom"!==t.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(e)}}function s(t){t.parentNode.removeChild(t);var e=m.indexOf(t);e>=0&&m.splice(e,1)}function a(t){var e=document.createElement("style");return e.type="text/css",o(t,e),e}function u(t,e){var n,r,i;if(e.singleton){var o=b++;n=v||(v=a(e)),r=f.bind(null,n,o,!1),i=f.bind(null,n,o,!0)}else n=a(e),r=l.bind(null,n),i=function(){s(n)};return r(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;r(t=e)}else i()}}function f(t,e,n,r){var i=n?"":r.css;if(t.styleSheet)t.styleSheet.cssText=y(e,i);else{var o=document.createTextNode(i),s=t.childNodes;s[e]&&t.removeChild(s[e]),s.length?t.insertBefore(o,s[e]):t.appendChild(o)}}function l(t,e){var n=e.css,r=e.media,i=e.sourceMap;if(r&&t.setAttribute("media",r),i&&(n+="\n/*# sourceURL="+i.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */"),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}var p={},d=function(t){var e;return function(){return"undefined"==typeof e&&(e=t.apply(this,arguments)),e}},c=d(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),h=d(function(){return document.head||document.getElementsByTagName("head")[0]}),v=null,b=0,m=[];t.exports=function(t,e){e=e||{},"undefined"==typeof e.singleton&&(e.singleton=c()),"undefined"==typeof e.insertAt&&(e.insertAt="bottom");var n=i(t);return r(n,e),function(t){for(var o=[],s=0;s<n.length;s++){var a=n[s],u=p[a.id];u.refs--,o.push(u)}if(t){var f=i(t);r(f,e)}for(var s=0;s<o.length;s++){var u=o[s];if(0===u.refs){for(var l=0;l<u.parts.length;l++)u.parts[l]();delete p[u.id]}}}};var y=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join("\n")}}()},222:function(t,e,n){var r,i,o={};n(223),r=n(225),i=n(226),t.exports=r||{},t.exports.__esModule&&(t.exports=t.exports.default);var s="function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports;i&&(s.template=i),s.computed||(s.computed={}),Object.keys(o).forEach(function(t){var e=o[t];s.computed[t]=function(){return e}})},223:function(t,e,n){var r=n(224);"string"==typeof r&&(r=[[t.id,r,""]]);n(5)(r,{});r.locals&&(t.exports=r.locals)},224:function(t,e,n){e=t.exports=n(4)(),e.push([t.id,".bh-uploader[_v-1670ffa1]{line-height:28px;position:relative;overflow:hidden;display:inline-block}.file-input[_v-1670ffa1]{position:absolute;top:0;right:0;margin:0;opacity:0;-ms-filter:'alpha(opacity=0)';font-size:200px!important;direction:ltr;cursor:pointer}",""])},225:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(){var t=this,e=$(t.elInput);if(!t.url)return console.warn("Initialize file uploader failed: upload url is null !"),!1;var n={url:t.url,autoUpload:!0,dataType:"json",add:function(e,n){t.$dispatch("submiting",n),n.submit()},submit:function(t,e){},done:function(e,n){t.$dispatch("done",n)},fail:function(e,n){t.$dispatch("failed",n)}};return e.fileupload(n),!0};e.default={data:function(){return{elInput:null}},props:{url:String,type:{type:String,default:"link"},text:{type:String,default:"选择文件"}},ready:function(){this.elInput="link"===this.type?this.$els.linkfile:this.$els.buttonfile,n.call(this)},beforeDestroy:function(){$(this.elInput).fileupload("destroy")}}},226:function(t,e){t.exports=' <div class=bh-uploader _v-1670ffa1=""> <a v-if="type === &quot;link&quot;" class=bh-file-upload href=javascript:void(0) _v-1670ffa1=""> <input v-el:linkfile="" class=file-input type=file _v-1670ffa1="">{{text}} </a> <button v-if="type === &quot;button&quot;" type=button class="bh-btn bh-btn-primary bh-btn-large waves-effect" _v-1670ffa1=""> <input v-el:buttonfile="" class=file-input type=file _v-1670ffa1="">{{text}} </button> </div> '}})});