!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.SimpleSearch=t():e.SimpleSearch=t()}(this,function(){return function(e){function t(n){if(r[n])return r[n].exports;var o=r[n]={exports:{},id:n,loaded:!1};return e[n].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var r={};return t.m=e,t.c=r,t.p="",t(0)}({0:function(e,t,r){e.exports=r(310)},4:function(e,t){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var r=this[t];r[2]?e.push("@media "+r[2]+"{"+r[1]+"}"):e.push(r[1])}return e.join("")},e.i=function(t,r){"string"==typeof t&&(t=[[null,t,""]]);for(var n={},o=0;o<this.length;o++){var i=this[o][0];"number"==typeof i&&(n[i]=!0)}for(o=0;o<t.length;o++){var s=t[o];"number"==typeof s[0]&&n[s[0]]||(r&&!s[2]?s[2]=r:r&&(s[2]="("+s[2]+") and ("+r+")"),e.push(s))}},e}},5:function(e,t,r){function n(e,t){for(var r=0;r<e.length;r++){var n=e[r],o=l[n.id];if(o){o.refs++;for(var i=0;i<o.parts.length;i++)o.parts[i](n.parts[i]);for(;i<n.parts.length;i++)o.parts.push(p(n.parts[i],t))}else{for(var s=[],i=0;i<n.parts.length;i++)s.push(p(n.parts[i],t));l[n.id]={id:n.id,refs:1,parts:s}}}}function o(e){for(var t=[],r={},n=0;n<e.length;n++){var o=e[n],i=o[0],s=o[1],a=o[2],p=o[3],c={css:s,media:a,sourceMap:p};r[i]?r[i].parts.push(c):t.push(r[i]={id:i,parts:[c]})}return t}function i(e,t){var r=h(),n=x[x.length-1];if("top"===e.insertAt)n?n.nextSibling?r.insertBefore(t,n.nextSibling):r.appendChild(t):r.insertBefore(t,r.firstChild),x.push(t);else{if("bottom"!==e.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");r.appendChild(t)}}function s(e){e.parentNode.removeChild(e);var t=x.indexOf(e);t>=0&&x.splice(t,1)}function a(e){var t=document.createElement("style");return t.type="text/css",i(e,t),t}function p(e,t){var r,n,o;if(t.singleton){var i=m++;r=v||(v=a(t)),n=c.bind(null,r,i,!1),o=c.bind(null,r,i,!0)}else r=a(t),n=u.bind(null,r),o=function(){s(r)};return n(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;n(e=t)}else o()}}function c(e,t,r,n){var o=r?"":n.css;if(e.styleSheet)e.styleSheet.cssText=b(t,o);else{var i=document.createTextNode(o),s=e.childNodes;s[t]&&e.removeChild(s[t]),s.length?e.insertBefore(i,s[t]):e.appendChild(i)}}function u(e,t){var r=t.css,n=t.media,o=t.sourceMap;if(n&&e.setAttribute("media",n),o&&(r+="\n/*# sourceURL="+o.sources[0]+" */",r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */"),e.styleSheet)e.styleSheet.cssText=r;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(r))}}var l={},f=function(e){var t;return function(){return"undefined"==typeof t&&(t=e.apply(this,arguments)),t}},d=f(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),h=f(function(){return document.head||document.getElementsByTagName("head")[0]}),v=null,m=0,x=[];e.exports=function(e,t){t=t||{},"undefined"==typeof t.singleton&&(t.singleton=d()),"undefined"==typeof t.insertAt&&(t.insertAt="bottom");var r=o(e);return n(r,t),function(e){for(var i=[],s=0;s<r.length;s++){var a=r[s],p=l[a.id];p.refs--,i.push(p)}if(e){var c=o(e);n(c,t)}for(var s=0;s<i.length;s++){var p=i[s];if(0===p.refs){for(var u=0;u<p.parts.length;u++)p.parts[u]();delete l[p.id]}}}};var b=function(){var e=[];return function(t,r){return e[t]=r,e.filter(Boolean).join("\n")}}()},310:function(e,t,r){var n,o,i={};r(311),n=r(313),o=r(314),e.exports=n||{},e.exports.__esModule&&(e.exports=e.exports.default);var s="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;o&&(s.template=o),s.computed||(s.computed={}),Object.keys(i).forEach(function(e){var t=i[e];s.computed[e]=function(){return t}})},311:function(e,t,r){var n=r(312);"string"==typeof n&&(n=[[e.id,n,""]]);r(5)(n,{});n.locals&&(e.exports=n.locals)},312:function(e,t,r){t=e.exports=r(4)(),t.push([e.id,".bh-simple-search[_v-481e168e]{width:300px;display:inline-block}.search-button[_v-481e168e]{vertical-align:top}",""])},313:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:["name","simpleSearch","placeholder","searchEvent"],data:function(){return{keyword:""}},created:function(){this.simpleSearch||(this.simpleSearch=this.$parent.pageopt&&this.$parent.pageopt[this.name?this.name:"simpleSearch"])},methods:{doSearch:function(e){this.$dispatch(e)}}}},314:function(e,t){e.exports=' <div class=search _v-481e168e=""> <div class=bh-simple-search _v-481e168e=""> <input class=bh-form-control type=text :placeholder="placeholder || simpleSearch.placeholder" v-model=keyword _v-481e168e=""> <a href=javascript:void(0) _v-481e168e=""><i class=iconfont _v-481e168e=""></i></a> </div> <a href=javascript:void(0); class="bh-btn bh-btn-primary bh-btn-small waves-effect search-button" @click="doSearch(searchEvent || simpleSearch.searchEvent)" _v-481e168e="">搜索</a> </div> '}})});