!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.BhDropdownmenu=t():e.BhDropdownmenu=t()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}({0:function(e,t,n){e.exports=n(115)},4:function(e,t){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var n=this[t];n[2]?e.push("@media "+n[2]+"{"+n[1]+"}"):e.push(n[1])}return e.join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var r={},o=0;o<this.length;o++){var i=this[o][0];"number"==typeof i&&(r[i]=!0)}for(o=0;o<t.length;o++){var s=t[o];"number"==typeof s[0]&&r[s[0]]||(n&&!s[2]?s[2]=n:n&&(s[2]="("+s[2]+") and ("+n+")"),e.push(s))}},e}},5:function(e,t,n){function r(e,t){for(var n=0;n<e.length;n++){var r=e[n],o=d[r.id];if(o){o.refs++;for(var i=0;i<o.parts.length;i++)o.parts[i](r.parts[i]);for(;i<r.parts.length;i++)o.parts.push(a(r.parts[i],t))}else{for(var s=[],i=0;i<r.parts.length;i++)s.push(a(r.parts[i],t));d[r.id]={id:r.id,refs:1,parts:s}}}}function o(e){for(var t=[],n={},r=0;r<e.length;r++){var o=e[r],i=o[0],s=o[1],u=o[2],a=o[3],l={css:s,media:u,sourceMap:a};n[i]?n[i].parts.push(l):t.push(n[i]={id:i,parts:[l]})}return t}function i(e,t){var n=h(),r=m[m.length-1];if("top"===e.insertAt)r?r.nextSibling?n.insertBefore(t,r.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),m.push(t);else{if("bottom"!==e.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(t)}}function s(e){e.parentNode.removeChild(e);var t=m.indexOf(e);t>=0&&m.splice(t,1)}function u(e){var t=document.createElement("style");return t.type="text/css",i(e,t),t}function a(e,t){var n,r,o;if(t.singleton){var i=b++;n=v||(v=u(t)),r=l.bind(null,n,i,!1),o=l.bind(null,n,i,!0)}else n=u(t),r=p.bind(null,n),o=function(){s(n)};return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else o()}}function l(e,t,n,r){var o=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=y(t,o);else{var i=document.createTextNode(o),s=e.childNodes;s[t]&&e.removeChild(s[t]),s.length?e.insertBefore(i,s[t]):e.appendChild(i)}}function p(e,t){var n=t.css,r=t.media,o=t.sourceMap;if(r&&e.setAttribute("media",r),o&&(n+="\n/*# sourceURL="+o.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */"),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}var d={},c=function(e){var t;return function(){return"undefined"==typeof t&&(t=e.apply(this,arguments)),t}},f=c(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),h=c(function(){return document.head||document.getElementsByTagName("head")[0]}),v=null,b=0,m=[];e.exports=function(e,t){t=t||{},"undefined"==typeof t.singleton&&(t.singleton=f()),"undefined"==typeof t.insertAt&&(t.insertAt="bottom");var n=o(e);return r(n,t),function(e){for(var i=[],s=0;s<n.length;s++){var u=n[s],a=d[u.id];a.refs--,i.push(a)}if(e){var l=o(e);r(l,t)}for(var s=0;s<i.length;s++){var a=i[s];if(0===a.refs){for(var p=0;p<a.parts.length;p++)a.parts[p]();delete d[a.id]}}}};var y=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}()},115:function(e,t,n){var r,o,i={};n(116),r=n(118),o=n(119),e.exports=r||{},e.exports.__esModule&&(e.exports=e.exports.default);var s="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;o&&(s.template=o),s.computed||(s.computed={}),Object.keys(i).forEach(function(e){var t=i[e];s.computed[e]=function(){return t}})},116:function(e,t,n){var r=n(117);"string"==typeof r&&(r=[[e.id,r,""]]);n(5)(r,{});r.locals&&(e.exports=r.locals)},117:function(e,t,n){t=e.exports=n(4)(),t.push([e.id,"",""])},118:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={computed:{btnColor:function(){var e={};return e["bh-btn-"+this.buttonColor]=!0,e},isDropPrimary:function(){return"primary"===this.buttonColor}},data:function(){return{}},props:{title:String,displayMember:{default:"name"},valueMember:{default:"sid"},type:{default:"button"},source:{default:[]},icon:{default:""},buttonColor:""},methods:{click:function(e){var t=$(e.target).parent("li").index(),n=this.source[t];return n.disable===!0?void e.preventDefault():void("button"===this.type?(this.$dispatch("clickitem",n),e.preventDefault()):(n.url||console.error("bh-dropdownmenu error: url must be given when the type is not button"),window.location.href=n.url))}},ready:function(){},beforeDestroy:function(){}}},119:function(e,t){e.exports=' <div class="bh-dropdown bh-l-inline" :class="{\'bh-dropdown-primary\':isDropPrimary}" bh-dropdown-role=bhDropdown _v-4694664c=""> <button class="bh-btn bh-btn-default waves-effect" :class=btnColor type=button bh-dropdown-role=bhDropdownBtn _v-4694664c=""> <i class="iconfont icon-{{icon}}" _v-4694664c=""></i> {{title}} </button> <ul class=bh-dropdown-menu bh-dropdown-role=bhDropdownMenu _v-4694664c=""> <li v-for="item in source" :class="{\'bh-disabled\': item.disable}" _v-4694664c=""> <a :href="type===\'button\' ? \'#\' : item.url" @click=click _v-4694664c="">{{item[displayMember]}}</a> </li> </ul> </div> '}})});