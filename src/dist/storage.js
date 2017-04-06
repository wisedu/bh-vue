!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.storage=e():t.storage=e()}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return t[r].call(i.exports,i,i.exports,e),i.loaded=!0,i.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}({0:function(t,e,n){t.exports=n(349)},349:function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),e.clear=e.has=e.remove=e.getItem=e.setItem=void 0;var i=n(350),s=r(i),a=s.default,o=function(){var t={};return{set:function(e,n){t[e]=n},get:function(e){return t[e]},remove:function(e){delete t[e]},has:function(e){return e in t},clear:function(){t={}}}}(),u=function(t){return t?a:o},h=function(t){return void 0!==t&&null!==t},c=e.setItem=function(t,e,n){return!!h(t)&&(u(n).set(t,e),!0)},f=e.getItem=function(t,e){if(h(t))return u(e).get(t)},l=e.remove=function(t,e){return!!h(t)&&(u(e).remove(t),!0)},_=e.has=function(t,e){return!!h(t)&&u(e).has(t)},v=e.clear=function(t){return u(t).clear()};e.default={setItem:c,getItem:f,remove:l,has:_,clear:v}},350:function(t,e){!function(e,n){var r={version:"2.5.0",areas:{},apis:{},inherit:function(t,e){for(var n in t)e.hasOwnProperty(n)||(e[n]=t[n]);return e},stringify:function(t){return void 0===t||"function"==typeof t?t+"":JSON.stringify(t)},parse:function(t){try{return JSON.parse(t)}catch(e){return t}},fn:function(t,e){r.storeAPI[t]=e;for(var n in r.apis)r.apis[n][t]=e},get:function(t,e){return t.getItem(e)},set:function(t,e,n){t.setItem(e,n)},remove:function(t,e){t.removeItem(e)},key:function(t,e){return t.key(e)},length:function(t){return t.length},clear:function(t){t.clear()},Store:function(t,e,n){var i=r.inherit(r.storeAPI,function(t,e,n){return 0===arguments.length?i.getAll():"function"==typeof e?i.transact(t,e,n):void 0!==e?i.set(t,e,n):"string"==typeof t||"number"==typeof t?i.get(t):t?i.setAll(t,e):i.clear()});i._id=t;try{var s="_safariPrivate_";e.setItem(s,"sucks"),i._area=e,e.removeItem(s)}catch(t){}return i._area||(i._area=r.inherit(r.storageAPI,{items:{},name:"fake"})),i._ns=n||"",r.areas[t]||(r.areas[t]=i._area),r.apis[i._ns+i._id]||(r.apis[i._ns+i._id]=i),i},storeAPI:{area:function(t,e){var n=this[t];return n&&n.area||(n=r.Store(t,e,this._ns),this[t]||(this[t]=n)),n},namespace:function(t,e){if(!t)return this._ns?this._ns.substring(0,this._ns.length-1):"";var n=t,i=this[n];return i&&i.namespace||(i=r.Store(this._id,this._area,this._ns+n+"."),this[n]||(this[n]=i),e||i.area("session",r.areas.session)),i},isFake:function(){return"fake"===this._area.name},toString:function(){return"store"+(this._ns?"."+this.namespace():"")+"["+this._id+"]"},has:function(t){return this._area.has?this._area.has(this._in(t)):!!(this._in(t)in this._area)},size:function(){return this.keys().length},each:function(t,e){for(var n=0,i=r.length(this._area);n<i;n++){var s=this._out(r.key(this._area,n));if(void 0!==s&&t.call(this,s,e||this.get(s))===!1)break;i>r.length(this._area)&&(i--,n--)}return e||this},keys:function(){return this.each(function(t,e){e.push(t)},[])},get:function(t,e){var n=r.get(this._area,this._in(t));return null!==n?r.parse(n):e||n},getAll:function(){return this.each(function(t,e){e[t]=this.get(t)},{})},transact:function(t,e,n){var r=this.get(t,n),i=e(r);return this.set(t,void 0===i?r:i),this},set:function(t,e,n){var i=this.get(t);return null!=i&&n===!1?e:r.set(this._area,this._in(t),r.stringify(e),n)||i},setAll:function(t,e){var n,r;for(var i in t)r=t[i],this.set(i,r,e)!==r&&(n=!0);return n},remove:function(t){var e=this.get(t);return r.remove(this._area,this._in(t)),e},clear:function(){return this._ns?this.each(function(t){r.remove(this._area,this._in(t))},1):r.clear(this._area),this},clearAll:function(){var t=this._area;for(var e in r.areas)r.areas.hasOwnProperty(e)&&(this._area=r.areas[e],this.clear());return this._area=t,this},_in:function(t){return"string"!=typeof t&&(t=r.stringify(t)),this._ns?this._ns+t:t},_out:function(t){return this._ns?t&&0===t.indexOf(this._ns)?t.substring(this._ns.length):void 0:t}},storageAPI:{length:0,has:function(t){return this.items.hasOwnProperty(t)},key:function(t){var e=0;for(var n in this.items)if(this.has(n)&&t===e++)return n},setItem:function(t,e){this.has(t)||this.length++,this.items[t]=e},removeItem:function(t){this.has(t)&&(delete this.items[t],this.length--)},getItem:function(t){return this.has(t)?this.items[t]:null},clear:function(){for(var t in this.list)this.removeItem(t)},toString:function(){return this.length+" items in "+this.name+"Storage"}}},i=r.Store("local",function(){try{return localStorage}catch(t){}}());i.local=i,i._=r,i.area("session",function(){try{return sessionStorage}catch(t){}}()),"function"==typeof n&&void 0!==n.amd?n("store2",[],function(){return i}):"undefined"!=typeof t&&t.exports?t.exports=i:(e.store&&(r.conflict=e.store),e.store=i)}(this,this.define)}})});