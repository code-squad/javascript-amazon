!function(r){var n={};function e(t){if(n[t])return n[t].exports;var i=n[t]={i:t,l:!1,exports:{}};return r[t].call(i.exports,i,i.exports,e),i.l=!0,i.exports}e.m=r,e.c=n,e.d=function(r,n,t){e.o(r,n)||Object.defineProperty(r,n,{enumerable:!0,get:t})},e.r=function(r){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(r,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(r,"__esModule",{value:!0})},e.t=function(r,n){if(1&n&&(r=e(r)),8&n)return r;if(4&n&&"object"==typeof r&&r&&r.__esModule)return r;var t=Object.create(null);if(e.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:r}),2&n&&"string"!=typeof r)for(var i in r)e.d(t,i,function(n){return r[n]}.bind(null,i));return t},e.n=function(r){var n=r&&r.__esModule?function(){return r.default}:function(){return r};return e.d(n,"a",n),n},e.o=function(r,n){return Object.prototype.hasOwnProperty.call(r,n)},e.p="",e(e.s=12)}([function(r,n,e){"use strict";var t,i=function(){return void 0===t&&(t=Boolean(window&&document&&document.all&&!window.atob)),t},a=function(){var r={};return function(n){if(void 0===r[n]){var e=document.querySelector(n);if(window.HTMLIFrameElement&&e instanceof window.HTMLIFrameElement)try{e=e.contentDocument.head}catch(r){e=null}r[n]=e}return r[n]}}(),s=[];function o(r){for(var n=-1,e=0;e<s.length;e++)if(s[e].identifier===r){n=e;break}return n}function d(r,n){for(var e={},t=[],i=0;i<r.length;i++){var a=r[i],d=n.base?a[0]+n.base:a[0],c=e[d]||0,l="".concat(d," ").concat(c);e[d]=c+1;var p=o(l),h={css:a[1],media:a[2],sourceMap:a[3]};-1!==p?(s[p].references++,s[p].updater(h)):s.push({identifier:l,updater:b(h,n),references:1}),t.push(l)}return t}function c(r){var n=document.createElement("style"),t=r.attributes||{};if(void 0===t.nonce){var i=e.nc;i&&(t.nonce=i)}if(Object.keys(t).forEach((function(r){n.setAttribute(r,t[r])})),"function"==typeof r.insert)r.insert(n);else{var s=a(r.insert||"head");if(!s)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");s.appendChild(n)}return n}var l,p=(l=[],function(r,n){return l[r]=n,l.filter(Boolean).join("\n")});function h(r,n,e,t){var i=e?"":t.media?"@media ".concat(t.media," {").concat(t.css,"}"):t.css;if(r.styleSheet)r.styleSheet.cssText=p(n,i);else{var a=document.createTextNode(i),s=r.childNodes;s[n]&&r.removeChild(s[n]),s.length?r.insertBefore(a,s[n]):r.appendChild(a)}}function g(r,n,e){var t=e.css,i=e.media,a=e.sourceMap;if(i?r.setAttribute("media",i):r.removeAttribute("media"),a&&btoa&&(t+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),r.styleSheet)r.styleSheet.cssText=t;else{for(;r.firstChild;)r.removeChild(r.firstChild);r.appendChild(document.createTextNode(t))}}var u=null,m=0;function b(r,n){var e,t,i;if(n.singleton){var a=m++;e=u||(u=c(n)),t=h.bind(null,e,a,!1),i=h.bind(null,e,a,!0)}else e=c(n),t=g.bind(null,e,n),i=function(){!function(r){if(null===r.parentNode)return!1;r.parentNode.removeChild(r)}(e)};return t(r),function(n){if(n){if(n.css===r.css&&n.media===r.media&&n.sourceMap===r.sourceMap)return;t(r=n)}else i()}}r.exports=function(r,n){(n=n||{}).singleton||"boolean"==typeof n.singleton||(n.singleton=i());var e=d(r=r||[],n);return function(r){if(r=r||[],"[object Array]"===Object.prototype.toString.call(r)){for(var t=0;t<e.length;t++){var i=o(e[t]);s[i].references--}for(var a=d(r,n),c=0;c<e.length;c++){var l=o(e[c]);0===s[l].references&&(s[l].updater(),s.splice(l,1))}e=a}}}},function(r,n,e){"use strict";r.exports=function(r){var n=[];return n.toString=function(){return this.map((function(n){var e=function(r,n){var e=r[1]||"",t=r[3];if(!t)return e;if(n&&"function"==typeof btoa){var i=(s=t,o=btoa(unescape(encodeURIComponent(JSON.stringify(s)))),d="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(o),"/*# ".concat(d," */")),a=t.sources.map((function(r){return"/*# sourceURL=".concat(t.sourceRoot||"").concat(r," */")}));return[e].concat(a).concat([i]).join("\n")}var s,o,d;return[e].join("\n")}(n,r);return n[2]?"@media ".concat(n[2]," {").concat(e,"}"):e})).join("")},n.i=function(r,e,t){"string"==typeof r&&(r=[[null,r,""]]);var i={};if(t)for(var a=0;a<this.length;a++){var s=this[a][0];null!=s&&(i[s]=!0)}for(var o=0;o<r.length;o++){var d=[].concat(r[o]);t&&i[d[0]]||(e&&(d[2]?d[2]="".concat(e," and ").concat(d[2]):d[2]=e),n.push(d))}},n}},function(r,n,e){var t=e(0),i=e(3);"string"==typeof(i=i.__esModule?i.default:i)&&(i=[[r.i,i,""]]);var a={insert:"head",singleton:!1},s=(t(i,a),i.locals?i.locals:{});r.exports=s},function(r,n,e){(n=e(1)(!1)).push([r.i,".button1 {\r\n  position: absolute;\r\n  top: 57%;\r\n  left: -80px;\r\n}\r\n\r\n.button2 {\r\n  position: absolute;\r\n  top: 57%;\r\n  right: -80px;\r\n}\r\n",""]),r.exports=n},function(r,n,e){var t=e(0),i=e(5);"string"==typeof(i=i.__esModule?i.default:i)&&(i=[[r.i,i,""]]);var a={insert:"head",singleton:!1},s=(t(i,a),i.locals?i.locals:{});r.exports=s},function(r,n,e){(n=e(1)(!1)).push([r.i,".card-block {\r\n    overflow: hidden;   \r\n}\r\n\r\n.card-wrapper {\r\n    display: flex;\r\n    height: 370px;\r\n    margin-top: 20px;\r\n    position: relative;\r\n    left: calc(-1080px * 8);\r\n}\r\n\r\n#card-1 {\r\n    background: linear-gradient(to right, #FFF, #FFF 15px, rgba(255,255,255,0) 45px), url(https://web.archive.org/web/20180717213726im_/https://images-na.ssl-images-amazon.com/images/G/01/marketing/prime/detail_page/Card_A01._CB514650866_.jpg);\r\n    background-position: top right;\r\n}\r\n\r\n#card-2 {\r\n    background: linear-gradient(to right, #FFF, #FFF 15px, rgba(255,255,255,0) 45px), url(https://web.archive.org/web/20180717213726im_/https://images-na.ssl-images-amazon.com/images/G/01/marketing/prime/detail_page/Card_A02._CB514650866_.jpg);\r\n    background-position: top right;\r\n}\r\n\r\n#card-3 {\r\n    background: linear-gradient(to right, #FFF, #FFF 15px, rgba(255,255,255,0) 45px), url(https://web.archive.org/web/20180717213726im_/https://images-na.ssl-images-amazon.com/images/G/01/marketing/prime/detail_page/Card_A03._CB514650829_.jpg);\r\n    background-position: top right;\r\n}\r\n\r\n#card-4 {\r\n    background: linear-gradient(to right, #FFF, #FFF 15px, rgba(255,255,255,0) 45px), url(https://web.archive.org/web/20180717213726im_/https://images-na.ssl-images-amazon.com/images/G/01/marketing/prime/detail_page/Card_A04._CB494909365_.jpg);\r\n    background-position: top right;\r\n}\r\n\r\n#card-5 {\r\n    background: linear-gradient(to right, #FFF, #FFF 15px, rgba(255,255,255,0) 45px), url(https://web.archive.org/web/20180717213726im_/https://images-na.ssl-images-amazon.com/images/G/01/marketing/prime/detail_page/Card_B01._CB514650828_.jpg);\r\n    background-position: top right;\r\n}\r\n\r\n#card-6 {\r\n    background: linear-gradient(to right, #FFF, #FFF 15px, rgba(255,255,255,0) 45px), url(https://web.archive.org/web/20180717213726im_/https://images-na.ssl-images-amazon.com/images/G/01/marketing/prime/detail_page/Card_B02._CB513839286_.jpg);\r\n    background-position: top right;\r\n}\r\n\r\n#card-7 {\r\n    background: linear-gradient(to right, #FFF, #FFF 15px, rgba(255,255,255,0) 45px), url(https://web.archive.org/web/20180717213726im_/https://images-na.ssl-images-amazon.com/images/G/01/marketing/prime/detail_page/Card_B03._CB513839286_.jpg);\r\n    background-position: top right;\r\n}\r\n\r\n#card-8 {\r\n    background: linear-gradient(to right, #FFF, #FFF 15px, rgba(255,255,255,0) 45px), url(https://web.archive.org/web/20180717213726im_/https://images-na.ssl-images-amazon.com/images/G/01/digital/video/merch/2018/Other/AVD12272_PrimeContentUpdate/Card_B04_AVD12272_PrimeContentUpdate_1280x400_en_US._CB474157036_.jpg);\r\n    background-position: top right;\r\n}\r\n\r\n#card-9 {\r\n    background: linear-gradient(to right, #FFF, #FFF 15px, rgba(255,255,255,0) 45px), url(https://web.archive.org/web/20180717213726im_/https://images-na.ssl-images-amazon.com/images/G/01/marketing/prime/detail_page/Card_B05._CB514650828_.jpg);\r\n    background-position: top right;\r\n}\r\n\r\n#card-10 {\r\n    background: linear-gradient(to right, #FFF, #FFF 15px, rgba(255,255,255,0) 45px), url(https://web.archive.org/web/20180717213726im_/https://images-na.ssl-images-amazon.com/images/G/01/marketing/prime/detail_page/Card_C06._CB495022579_.jpg);\r\n    background-position: top right;\r\n}\r\n\r\n#card-11 {\r\n    background: linear-gradient(to right, #FFF, #FFF 15px, rgba(255,255,255,0) 45px), url(https://web.archive.org/web/20180717213726im_/https://images-na.ssl-images-amazon.com/images/G/01/marketing/prime/detail_page/Card_C01_revised._CB502880131_.jpg);\r\n    background-position: top right;\r\n}\r\n\r\n#card-12 {\r\n    background: linear-gradient(to right, #FFF, #FFF 15px, rgba(255,255,255,0) 45px), url(https://web.archive.org/web/20180717213726im_/https://images-na.ssl-images-amazon.com/images/G/01/marketing/prime/detail_page/Card_C03._CB511882458_.jpg);\r\n    background-position: top right;\r\n}\r\n\r\n#card-13 {\r\n    background: linear-gradient(to right, #FFF, #FFF 15px, rgba(255,255,255,0) 45px), url(https://web.archive.org/web/20180717213726im_/https://images-na.ssl-images-amazon.com/images/G/01/marketing/prime/detail_page/Card_C04._CB514650828_.jpg);\r\n    background-position: top right;\r\n}\r\n\r\n#card-14 {\r\n    background: linear-gradient(to right, #FFF, #FFF 15px, rgba(255,255,255,0) 45px), url(https://web.archive.org/web/20180717213726im_/https://images-na.ssl-images-amazon.com/images/G/01/marketing/prime/detail_page/Card_D01._CB514706473_.jpg);\r\n    background-position: top right;\r\n}\r\n\r\n#card-15 {\r\n    background: linear-gradient(to right, #FFF, #FFF 15px, rgba(255,255,255,0) 45px), url(https://web.archive.org/web/20180717213726im_/https://images-na.ssl-images-amazon.com/images/G/01/marketing/prime/detail_page/Card_D02._CB513839283_.jpg);\r\n    background-position: top right;\r\n}\r\n\r\n#card-16 {\r\n    background: linear-gradient(to right, #FFF, #FFF 15px, rgba(255,255,255,0) 45px), url(https://web.archive.org/web/20180717213726im_/https://images-na.ssl-images-amazon.com/images/G/01/marketing/prime/detail_page/Card_E03._CB513839888_.jpg);\r\n    background-position: top right;\r\n}\r\n\r\n#card-17 {\r\n    background: linear-gradient(to right, #FFF, #FFF 15px, rgba(255,255,255,0) 45px), url(https://web.archive.org/web/20180717213726im_/https://images-na.ssl-images-amazon.com/images/G/01/marketing/prime/detail_page/Card_E01._CB513839282_.jpg);\r\n    background-position: top right;\r\n}\r\n\r\n.card {\r\n    min-width: 1080px;\r\n    display: flex;\r\n    justify-content: space-between;\r\n    position: relative;\r\n}\r\n\r\n.card img {\r\n    border-radius: 50%;\r\n}\r\n\r\n.card-copy {\r\n    width: 500px;\r\n    margin-top: 30px;\r\n    position: absolute;\r\n    right: 0;\r\n}\r\n\r\n.card-copy > h4 {\r\n    font-size: 32px;\r\n}\r\n\r\n\r\n.card-copy li {\r\n    line-height: 2;\r\n}\r\n\r\n.card-category {\r\n    color: #fff;\r\n    padding: 5px 10px;\r\n    font-size: 15px;\r\n    line-height: 30px;\r\n    font-weight: 600;\r\n    display: inline-block;\r\n    margin-bottom: 20px;\r\n}\r\n\r\n.ship {\r\n    background-color: #00A8E1;\r\n}\r\n\r\n.stream {\r\n    background-color: #FF6138;\r\n}\r\n\r\n.shop {\r\n    background-color: #E31F64;\r\n}\r\n\r\n.read {\r\n    background-color: #36C2B4;\r\n}\r\n\r\n.more {\r\n    background-color: #FFC400;\r\n}\r\n\r\n.card-headline {\r\n    font-size: 38px;\r\n    line-height: 32px;\r\n    font-weight: 300;\r\n    margin-bottom: 20px;\r\n}\r\n\r\n.card-body {\r\n    font-size: 18px;\r\n    line-height: 28px;\r\n    font-weight: 300;\r\n    margin-bottom: 20px;\r\n}\r\n\r\n.card-cta {\r\n    font-size: 18px;\r\n    color: #002F36;\r\n    cursor: pointer;\r\n}",""]),r.exports=n},function(r,n,e){var t=e(0),i=e(7);"string"==typeof(i=i.__esModule?i.default:i)&&(i=[[r.i,i,""]]);var a={insert:"head",singleton:!1},s=(t(i,a),i.locals?i.locals:{});r.exports=s},function(r,n,e){(n=e(1)(!1)).push([r.i,"* {\r\n  box-sizing: border-box;\r\n}\r\n\r\n.header-wrapper {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  height: 262px;\r\n  max-width: 1000px;\r\n  min-width: 1000px;\r\n}\r\n\r\n.header-list {\r\n  text-align: center;\r\n  display: flex;\r\n  min-width: 190px;\r\n  justify-content: center;\r\n  align-items: center;\r\n  color: #fff;\r\n  background-size: 1616px auto, 100% 100%;\r\n  background-position: 0px -26px, 0px 0px;\r\n  position: relative;\r\n  cursor: pointer;\r\n}\r\n\r\n.header-list:nth-child(1) {\r\n  background-image: url(https://web.archive.org/web/20180717213726im_/https://images-na.ssl-images-amazon.com/images/G/01/marketing/prime/detail_page/InteractivePlane_TILES_SpriteSheet_A._CB513333159_.png),\r\n  linear-gradient(30deg, #2C88AE 40%, #00A8E1 90%, #00A8E1 48px);\r\n}\r\n\r\n.header-list:nth-child(2) {\r\n  background-image: url(https://web.archive.org/web/20180717213726im_/https://images-na.ssl-images-amazon.com/images/G/01/marketing/prime/detail_page/InteractivePlane_TILES_SpriteSheet_B._CB513285352_.png),\r\n        linear-gradient(30deg, #CC0C39 40%, #FF6138 90%, #FF6138 48px);       \r\n}\r\n\r\n.header-list:nth-child(3) {\r\n  background-image: url(https://web.archive.org/web/20180717213726im_/https://images-na.ssl-images-amazon.com/images/G/01/marketing/prime/detail_page/InteractivePlane_TILES_SpriteSheet_C._CB513285352_.png),\r\n        linear-gradient(30deg, #A90067 40%, #E31F64 90%, #E31F64 48px);\r\n}\r\n\r\n.header-list:nth-child(4) {\r\n  background-image: url(https://web.archive.org/web/20180717213726im_/https://images-na.ssl-images-amazon.com/images/G/01/marketing/prime/detail_page/InteractivePlane_TILES_SpriteSheet_D._CB513285353_.png),\r\n        linear-gradient(30deg, #008577 40%, #36C2B4 90%, #36C2B4 48px);\r\n}\r\n\r\n.header-list:nth-child(5) {\r\n  background-image: url(https://web.archive.org/web/20180717213726im_/https://images-na.ssl-images-amazon.com/images/G/01/marketing/prime/detail_page/InteractivePlane_TILES_SpriteSheet_E._CB513285352_.png),\r\n        linear-gradient(30deg, #FF6138 40%, #FFC400 90%, #FFC400 48px);\r\n}\r\n\r\n.header-selected {\r\n  transform: scale(1.2);\r\n  z-index: 98;\r\n  overflow: hidden;\r\n  box-shadow: -1px 0px 10px -1px #000000; \r\n}\r\n\r\n.header_title {\r\n  position: absolute;\r\n  font-size: 24px;\r\n  font-weight: 300;\r\n  bottom: 60px;\r\n  width: 100%;\r\n  margin: 0 auto;\r\n}\r\n\r\n.circles {\r\n  position: absolute;\r\n  margin: 0 auto;\r\n  bottom: 5px;\r\n}\r\n\r\n.invisible {\r\n  display: none;\r\n}\r\n\r\n/*출처: https://www.w3schools.com/howto/howto_css_circles.asp*/\r\n.dot {\r\n  height: 10px;\r\n  width: 10px;\r\n  background-color: #bbb;\r\n  border-radius: 50%;\r\n  display: inline-block;\r\n  margin-left: 4px;\r\n}\r\n\r\n.selected-dot {\r\n  background-color: #ffffff;\r\n}",""]),r.exports=n},function(r,n,e){var t=e(0),i=e(9);"string"==typeof(i=i.__esModule?i.default:i)&&(i=[[r.i,i,""]]);var a={insert:"head",singleton:!1},s=(t(i,a),i.locals?i.locals:{});r.exports=s},function(r,n,e){(n=e(1)(!1)).push([r.i,"#slider {\r\n  width: 1080px;\r\n  margin: 100px auto 0 auto;\r\n  position: relative;\r\n}\r\n",""]),r.exports=n},function(r,n,e){var t=e(0),i=e(11);"string"==typeof(i=i.__esModule?i.default:i)&&(i=[[r.i,i,""]]);var a={insert:"head",singleton:!1},s=(t(i,a),i.locals?i.locals:{});r.exports=s},function(r,n,e){(n=e(1)(!1)).push([r.i,'/* http://meyerweb.com/eric/tools/css/reset/\r\n   v2.0-modified | 20110126\r\n   License: none (public domain)\r\n*/\r\n\r\nhtml,\r\nbody,\r\ndiv,\r\nspan,\r\napplet,\r\nobject,\r\niframe,\r\nh1,\r\nh2,\r\nh3,\r\nh4,\r\nh5,\r\nh6,\r\np,\r\nblockquote,\r\npre,\r\na,\r\nabbr,\r\nacronym,\r\naddress,\r\nbig,\r\ncite,\r\ncode,\r\ndel,\r\ndfn,\r\nem,\r\nimg,\r\nins,\r\nkbd,\r\nq,\r\ns,\r\nsamp,\r\nsmall,\r\nstrike,\r\nstrong,\r\nsub,\r\nsup,\r\ntt,\r\nvar,\r\nb,\r\nu,\r\ni,\r\ncenter,\r\ndl,\r\ndt,\r\ndd,\r\nol,\r\nul,\r\nli,\r\nfieldset,\r\nform,\r\nlabel,\r\nlegend,\r\ntable,\r\ncaption,\r\ntbody,\r\ntfoot,\r\nthead,\r\ntr,\r\nth,\r\ntd,\r\narticle,\r\naside,\r\ncanvas,\r\ndetails,\r\nembed,\r\nfigure,\r\nfigcaption,\r\nfooter,\r\nheader,\r\nhgroup,\r\nmenu,\r\nnav,\r\noutput,\r\nruby,\r\nsection,\r\nsummary,\r\ntime,\r\nmark,\r\naudio,\r\nvideo {\r\n    margin: 0;\r\n    padding: 0;\r\n    border: 0;\r\n    font-size: 100%;\r\n    font: inherit;\r\n    vertical-align: baseline;\r\n}\r\n\r\n/* make sure to set some focus styles for accessibility */\r\n:focus {\r\n    outline: 0;\r\n}\r\n\r\n/* HTML5 display-role reset for older browsers */\r\narticle,\r\naside,\r\ndetails,\r\nfigcaption,\r\nfigure,\r\nfooter,\r\nheader,\r\nhgroup,\r\nmenu,\r\nnav,\r\nsection {\r\n    display: block;\r\n}\r\n\r\nbody {\r\n    line-height: 1;\r\n}\r\n\r\nol,\r\nul {\r\n    list-style: none;\r\n}\r\n\r\nblockquote,\r\nq {\r\n    quotes: none;\r\n}\r\n\r\nblockquote:before,\r\nblockquote:after,\r\nq:before,\r\nq:after {\r\n    content: "";\r\n    content: none;\r\n}\r\n\r\ntable {\r\n    border-collapse: collapse;\r\n    border-spacing: 0;\r\n}\r\n\r\ninput[type="search"]::-webkit-search-cancel-button,\r\ninput[type="search"]::-webkit-search-decoration,\r\ninput[type="search"]::-webkit-search-results-button,\r\ninput[type="search"]::-webkit-search-results-decoration {\r\n    -webkit-appearance: none;\r\n    -moz-appearance: none;\r\n}\r\n\r\ninput[type="search"] {\r\n    -webkit-appearance: none;\r\n    -moz-appearance: none;\r\n    -webkit-box-sizing: content-box;\r\n    -moz-box-sizing: content-box;\r\n    box-sizing: content-box;\r\n}\r\n\r\ntextarea {\r\n    overflow: auto;\r\n    vertical-align: top;\r\n    resize: vertical;\r\n}\r\n\r\n/**\r\n * Correct `inline-block` display not defined in IE 6/7/8/9 and Firefox 3.\r\n */\r\n\r\naudio,\r\ncanvas,\r\nvideo {\r\n    display: inline-block;\r\n    *display: inline;\r\n    *zoom: 1;\r\n    max-width: 100%;\r\n}\r\n\r\n/**\r\n * Prevent modern browsers from displaying `audio` without controls.\r\n * Remove excess height in iOS 5 devices.\r\n */\r\n\r\naudio:not([controls]) {\r\n    display: none;\r\n    height: 0;\r\n}\r\n\r\n/**\r\n * Address styling not present in IE 7/8/9, Firefox 3, and Safari 4.\r\n * Known issue: no IE 6 support.\r\n */\r\n\r\n[hidden] {\r\n    display: none;\r\n}\r\n\r\n/**\r\n * 1. Correct text resizing oddly in IE 6/7 when body `font-size` is set using\r\n *    `em` units.\r\n * 2. Prevent iOS text size adjust after orientation change, without disabling\r\n *    user zoom.\r\n */\r\n\r\nhtml {\r\n    font-size: 100%; /* 1 */\r\n    -webkit-text-size-adjust: 100%; /* 2 */\r\n    -ms-text-size-adjust: 100%; /* 2 */\r\n}\r\n\r\n/**\r\n * Address `outline` inconsistency between Chrome and other browsers.\r\n */\r\n\r\na:focus {\r\n    outline: thin dotted;\r\n}\r\n\r\n/**\r\n * Improve readability when focused and also mouse hovered in all browsers.\r\n */\r\n\r\na:active,\r\na:hover {\r\n    outline: 0;\r\n}\r\n\r\n/**\r\n * 1. Remove border when inside `a` element in IE 6/7/8/9 and Firefox 3.\r\n * 2. Improve image quality when scaled in IE 7.\r\n */\r\n\r\nimg {\r\n    border: 0; /* 1 */\r\n    -ms-interpolation-mode: bicubic; /* 2 */\r\n}\r\n\r\n/**\r\n * Address margin not present in IE 6/7/8/9, Safari 5, and Opera 11.\r\n */\r\n\r\nfigure {\r\n    margin: 0;\r\n}\r\n\r\n/**\r\n * Correct margin displayed oddly in IE 6/7.\r\n */\r\n\r\nform {\r\n    margin: 0;\r\n}\r\n\r\n/**\r\n * Define consistent border, margin, and padding.\r\n */\r\n\r\nfieldset {\r\n    border: 1px solid #c0c0c0;\r\n    margin: 0 2px;\r\n    padding: 0.35em 0.625em 0.75em;\r\n}\r\n\r\n/**\r\n * 1. Correct color not being inherited in IE 6/7/8/9.\r\n * 2. Correct text not wrapping in Firefox 3.\r\n * 3. Correct alignment displayed oddly in IE 6/7.\r\n */\r\n\r\nlegend {\r\n    border: 0; /* 1 */\r\n    padding: 0;\r\n    white-space: normal; /* 2 */\r\n    *margin-left: -7px; /* 3 */\r\n}\r\n\r\n/**\r\n * 1. Correct font size not being inherited in all browsers.\r\n * 2. Address margins set differently in IE 6/7, Firefox 3+, Safari 5,\r\n *    and Chrome.\r\n * 3. Improve appearance and consistency in all browsers.\r\n */\r\n\r\nbutton,\r\ninput,\r\nselect,\r\ntextarea {\r\n    font-size: 100%; /* 1 */\r\n    margin: 0; /* 2 */\r\n    vertical-align: baseline; /* 3 */\r\n    *vertical-align: middle; /* 3 */\r\n}\r\n\r\n/**\r\n * Address Firefox 3+ setting `line-height` on `input` using `!important` in\r\n * the UA stylesheet.\r\n */\r\n\r\nbutton,\r\ninput {\r\n    line-height: normal;\r\n}\r\n\r\n/**\r\n * Address inconsistent `text-transform` inheritance for `button` and `select`.\r\n * All other form control elements do not inherit `text-transform` values.\r\n * Correct `button` style inheritance in Chrome, Safari 5+, and IE 6+.\r\n * Correct `select` style inheritance in Firefox 4+ and Opera.\r\n */\r\n\r\nbutton,\r\nselect {\r\n    text-transform: none;\r\n}\r\n\r\n/**\r\n * 1. Avoid the WebKit bug in Android 4.0.* where (2) destroys native `audio`\r\n *    and `video` controls.\r\n * 2. Correct inability to style clickable `input` types in iOS.\r\n * 3. Improve usability and consistency of cursor style between image-type\r\n *    `input` and others.\r\n * 4. Remove inner spacing in IE 7 without affecting normal text inputs.\r\n *    Known issue: inner spacing remains in IE 6.\r\n */\r\n\r\nbutton,\r\nhtml input[type="button"], /* 1 */\r\ninput[type="reset"],\r\ninput[type="submit"] {\r\n    -webkit-appearance: button; /* 2 */\r\n    cursor: pointer; /* 3 */\r\n    *overflow: visible; /* 4 */\r\n}\r\n\r\n/**\r\n * Re-set default cursor for disabled elements.\r\n */\r\n\r\nbutton[disabled],\r\nhtml input[disabled] {\r\n    cursor: default;\r\n}\r\n\r\n/**\r\n * 1. Address box sizing set to content-box in IE 8/9.\r\n * 2. Remove excess padding in IE 8/9.\r\n * 3. Remove excess padding in IE 7.\r\n *    Known issue: excess padding remains in IE 6.\r\n */\r\n\r\ninput[type="checkbox"],\r\ninput[type="radio"] {\r\n    box-sizing: border-box; /* 1 */\r\n    padding: 0; /* 2 */\r\n    *height: 13px; /* 3 */\r\n    *width: 13px; /* 3 */\r\n}\r\n\r\n/**\r\n * 1. Address `appearance` set to `searchfield` in Safari 5 and Chrome.\r\n * 2. Address `box-sizing` set to `border-box` in Safari 5 and Chrome\r\n *    (include `-moz` to future-proof).\r\n */\r\n\r\ninput[type="search"] {\r\n    -webkit-appearance: textfield; /* 1 */\r\n    -moz-box-sizing: content-box;\r\n    -webkit-box-sizing: content-box; /* 2 */\r\n    box-sizing: content-box;\r\n}\r\n\r\n/**\r\n * Remove inner padding and search cancel button in Safari 5 and Chrome\r\n * on OS X.\r\n */\r\n\r\ninput[type="search"]::-webkit-search-cancel-button,\r\ninput[type="search"]::-webkit-search-decoration {\r\n    -webkit-appearance: none;\r\n}\r\n\r\n/**\r\n * Remove inner padding and border in Firefox 3+.\r\n */\r\n\r\nbutton::-moz-focus-inner,\r\ninput::-moz-focus-inner {\r\n    border: 0;\r\n    padding: 0;\r\n}\r\n\r\n/**\r\n * 1. Remove default vertical scrollbar in IE 6/7/8/9.\r\n * 2. Improve readability and alignment in all browsers.\r\n */\r\n\r\ntextarea {\r\n    overflow: auto; /* 1 */\r\n    vertical-align: top; /* 2 */\r\n}\r\n\r\n/**\r\n * Remove most spacing between table cells.\r\n */\r\n\r\ntable {\r\n    border-collapse: collapse;\r\n    border-spacing: 0;\r\n}\r\n\r\nhtml,\r\nbutton,\r\ninput,\r\nselect,\r\ntextarea {\r\n    color: #222;\r\n}\r\n\r\n::-moz-selection {\r\n    background: #b3d4fc;\r\n    text-shadow: none;\r\n}\r\n\r\n::selection {\r\n    background: #b3d4fc;\r\n    text-shadow: none;\r\n}\r\n\r\nimg {\r\n    vertical-align: middle;\r\n}\r\n\r\nfieldset {\r\n    border: 0;\r\n    margin: 0;\r\n    padding: 0;\r\n}\r\n\r\ntextarea {\r\n    resize: vertical;\r\n}\r\n\r\n.chromeframe {\r\n    margin: 0.2em 0;\r\n    background: #ccc;\r\n    color: #000;\r\n    padding: 0.2em 0;\r\n}\r\n',""]),r.exports=n},function(r,n,e){"use strict";e.r(n);const t=r=>document.querySelector(r),i=r=>document.querySelectorAll(r);var a=class{constructor(){}addEvent(r,n,e){r.addEventListener(n,e)}initializeStatus(){i(".header-list").forEach(r=>{r.classList.contains("header-selected")&&r.classList.remove("header-selected")}),i(".circles").forEach(r=>{!1===r.classList.contains("invisible")&&r.classList.add("invisible")}),i(".dot").forEach(r=>{r.classList.contains("selected-dot")&&r.classList.remove("selected-dot")})}};var s=class extends a{constructor(r){super(),this.isEventEnded=r}handleHeaderPart(r){r.parentNode.classList.add("header-selected"),r.parentNode.querySelector(".circles").classList.remove("invisible"),r.parentNode.querySelector(".dot").classList.add("selected-dot"),r.parentNode.querySelector(".dot").click()}handleCirclesPart(r){r.parentNode.classList.add("header-selected"),r.classList.remove("invisible"),r.querySelector(".dot").classList.add("selected-dot"),r.querySelector(".dot").click()}handleDotPart(r){r.parentNode.parentNode.classList.add("header-selected"),r.parentNode.classList.remove("invisible"),r.classList.add("selected-dot")}handleAnywhereElse(r){r.querySelector(".dot").classList.add("selected-dot"),r.querySelector(".dot").click(),r.classList.add("header-selected"),Array.from(r.children).forEach(r=>{r.classList.contains("circles")&&r.classList.remove("invisible")})}selectBoxListener(r){if(!1===this.isEventEnded.ended)return;const{target:n}=r;this.initializeStatus(),!0!==n.classList.contains("header_title")&&!0!==n.classList.contains("circles")?!0!==n.classList.contains("dot")?this.handleAnywhereElse(n):this.handleDotPart(n):this.handleHeaderPart(n)}};var o=class extends a{constructor(r){super(),this.isPrevious=!1,this.distance=0,this.previousIndex=0,this.currentIndex=1,this.listLength=17,this.halfListLength=parseInt(this.listLength/2),this.selectedCard=t(".selected-card"),this.movedFinished=!0,this.isEventEnded=r}isRightWay(r){return r>=0}moveByDistance(r){const n=t(".card-wrapper");if(!0===this.isRightWay(r))return this.isPrevious=!1,n.style.transition="transform 1s",void(n.style.transform=`translateX(${-1080*r}px)`);this.isPrevious=!0,n.style.transition="transform 1s",n.style.transform=`translateX(${1080*-r}px)`}getPreviousIndex(r){return r-1==0?this.listLength:r-1}getNextIndex(r){return(r+1)%this.listLength==0?this.listLength:(r+1)%this.listLength}returnCurrentIndex(){const[r,n]=this.selectedCard.id.split("-");return parseInt(n)}giveSelectedClassToCurrentIndexNode(){this.selectedCard.classList.remove("selected-card"),this.selectedCard=t(`#card-${this.currentIndex}`),this.selectedCard.classList.add("selected-card")}setCurrentIndexAsPreviousIndex(){const r=this.returnCurrentIndex();this.previousIndex=r}previousButtonListener(r){!1!==this.isEventEnded.ended&&(this.isEventEnded.ended=!1,this.setCurrentIndexAsPreviousIndex(),this.currentIndex=this.getPreviousIndex(this.previousIndex),this.distance=-1,this.moveByDistance(-1),this.giveSelectedClassToCurrentIndexNode())}nextButtonListener(r){!1!==this.isEventEnded.ended&&(this.isEventEnded.ended=!1,this.setCurrentIndexAsPreviousIndex(),this.currentIndex=this.getNextIndex(this.previousIndex),this.distance=1,this.moveByDistance(1),this.giveSelectedClassToCurrentIndexNode())}transitionEndEvent(r){const n=t(".card-wrapper");n.style.transition="none";const e=Array.from(n.children),i=e.slice(0,Math.abs(this.distance)),a=e[0];if(this.isPrevious){const r=e.slice(e.length-Math.abs(this.distance));r.forEach(r=>r.remove()),r.forEach(r=>n.insertBefore(r,a))}else i.forEach(r=>r.remove()),i.forEach(r=>n.appendChild(r));this.initializeStatus();const s=t(`[data-id="${this.currentIndex}"]`);s.classList.add("selected-dot"),s.parentNode.classList.remove("invisible"),s.parentNode.parentNode.classList.add("header-selected"),n.style.transform="translateX(0px)",this.isEventEnded.ended=!0}getDistanceInRevertedOrder(r,n){r<=n&&n<=this.listLength?this.distance=n-r:1<=n&&n<=r+this.halfListLength-this.listLength?this.distance=this.listLength+n-r:this.distance=-1*(r-n)}getDistanceInNormalOrder(r,n){n<=r+this.halfListLength?this.distance=n-r:this.distance=n<r?-1*(r-n):-1*(this.listLength+r-n)}getDistance(r,n){r+this.halfListLength>this.listLength?this.getDistanceInRevertedOrder(r,n):this.getDistanceInNormalOrder(r,n)}hasClickedSameIndex(r){return parseInt(r.dataset.id)===this.currentIndex}dotEventListener(r){if(!0===this.hasClickedSameIndex(r.target))return void this.isEventEnded;if(!1===this.isEventEnded.ended)return;this.isEventEnded.ended=!1,this.setCurrentIndexAsPreviousIndex();const n=parseInt(r.target.dataset.id);this.currentIndex=n,this.getDistance(this.previousIndex,this.currentIndex),this.moveByDistance(this.distance),this.giveSelectedClassToCurrentIndexNode(),t(`#card-${n}`).click()}};var d=class{constructor(){this.isEventEnded={ended:!0},this.headerEvent=new s(this.isEventEnded),this.sliderEvent=new o(this.isEventEnded)}addEvents(){i(".header-list").forEach(r=>{this.headerEvent.addEvent(r,"click",this.headerEvent.selectBoxListener.bind(this.headerEvent))}),i(".dot").forEach(r=>{this.sliderEvent.addEvent(r,"click",this.sliderEvent.dotEventListener.bind(this.sliderEvent))}),this.sliderEvent.addEvent(t(".button2"),"click",this.sliderEvent.nextButtonListener.bind(this.sliderEvent)),this.sliderEvent.addEvent(t(".button1"),"click",this.sliderEvent.previousButtonListener.bind(this.sliderEvent)),this.sliderEvent.addEvent(t(".card-wrapper"),"transitionend",this.sliderEvent.transitionEndEvent.bind(this.sliderEvent))}};e(2);var c=class{constructor(r){this.buttonData=r}render(){return`${this.buttonData.reduce((r,n,e)=>r+`<button class=${"button"+(e+1)}>${n}</button>`,"")}`}};e(4);var l=class{constructor(r){this.cardData=r,this.cardIndex=1}sortByCategory(r){return this.cardData.filter(n=>n.category===r).reduce((r,n)=>r+`<li class="card ${1===this.cardIndex?"selected-card":""}" id=card-${this.cardIndex++}><div class="card-copy"><span class="card-category ${n.category}">${n.cardCategory}</span><div class="card-headline">${n.cardHeadline}</div><div class="card-body">${n.cardBody}</div><a class="card-cta">${n.cardCta}</a></div></li>`,"")}render(){const r=this.sortByCategory("ship"),n=this.sortByCategory("stream");return`<div class="card-block"><ul class="card-wrapper">${this.sortByCategory("shop")}${this.sortByCategory("read")}${this.sortByCategory("more")}${r}${n}</ul></div>`}};e(6);var p=class{constructor(r){this.headerData=r,this.idIndex=1}returnCardLengthDivString(r){let n="";for(let e=0;e<r;e++)n+=`<div class="dot" data-id=${this.idIndex++}></div>`;return n}render(){return`<ul class="header-wrapper">${this.headerData.reduce((r,n)=>{const e=this.returnCardLengthDivString(n.cardLength);return r+=`<li class="header-list"><div class="header_title">${n.title}</div><div class="circles invisible">${e}</div></li>`},"")}</ul>`}};e(8),e(10);const h="http://localhost:8080/cards";var g=class{constructor(){this.header=null,this.card=null,this.buttons=null,this.cardData=null}setCardData({headerData:r,headerCardLength:n,cardData:e,buttonData:t}){this.header=new p(r,n),this.card=new l(e),this.buttons=new c(t)}render(){return`\n        ${this.header.render()}\n        ${this.card.render()}\n        ${this.buttons.render()}\n        `}doesCardDataExist(){return null!==this.cardData}fetchCardData(){return fetch(h).then(r=>r.json()).then(r=>(this.cardData=r,r))}};window.addEventListener("DOMContentLoaded",async()=>{await(async()=>{const r=new g;let n=window.localStorage.getItem("cards");if(!n){const e=await r.fetchCardData();return window.localStorage.setItem("cards",JSON.stringify(e)),n=e,r.setCardData(n),void(t("#slider").innerHTML=r.render())}r.setCardData(JSON.parse(n)),t("#slider").innerHTML=r.render()})(),(new d).addEvents(),(()=>{const r=t(".header-list");r.classList.add("header-selected"),r.querySelector(".circles").classList.remove("invisible"),r.querySelector(".dot").classList.add("selected-dot")})()})}]);