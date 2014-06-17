/*!
 * fancyBox - jQuery Plugin
 * version: 2.1.5 (Fri, 14 Jun 2013)
 * @requires jQuery v1.6 or later
 *
 * Examples at http://fancyapps.com/fancybox/
 * License: www.fancyapps.com/fancybox/#license
 *
 * Copyright 2012 Janis Skarnelis - janis@fancyapps.com
 *
 */
!function(e,t,n,i){"use strict";var r=n("html"),o=n(e),a=n(t),s=n.fancybox=function(){s.open.apply(this,arguments)},l=navigator.userAgent.match(/msie/i),c=null,u=t.createTouch!==i,d=function(e){return e&&e.hasOwnProperty&&e instanceof n},f=function(e){return e&&"string"===n.type(e)},p=function(e){return f(e)&&e.indexOf("%")>0},h=function(e){return e&&!(e.style.overflow&&"hidden"===e.style.overflow)&&(e.clientWidth&&e.scrollWidth>e.clientWidth||e.clientHeight&&e.scrollHeight>e.clientHeight)},g=function(e,t){var n=parseInt(e,10)||0;return t&&p(e)&&(n=s.getViewport()[t]/100*n),Math.ceil(n)},m=function(e,t){return g(e,t)+"px"};n.extend(s,{version:"2.1.5",defaults:{padding:15,margin:20,width:800,height:600,minWidth:100,minHeight:100,maxWidth:9999,maxHeight:9999,pixelRatio:1,autoSize:!0,autoHeight:!1,autoWidth:!1,autoResize:!0,autoCenter:!u,fitToView:!0,aspectRatio:!1,topRatio:.5,leftRatio:.5,scrolling:"auto",wrapCSS:"",arrows:!0,closeBtn:!0,closeClick:!1,nextClick:!1,mouseWheel:!0,autoPlay:!1,playSpeed:3e3,preload:3,modal:!1,loop:!0,ajax:{dataType:"html",headers:{"X-fancyBox":!0}},iframe:{scrolling:"auto",preload:!0},swf:{wmode:"transparent",allowfullscreen:"true",allowscriptaccess:"always"},keys:{next:{13:"left",34:"up",39:"left",40:"up"},prev:{8:"right",33:"down",37:"right",38:"down"},close:[27],play:[32],toggle:[70]},direction:{next:"left",prev:"right"},scrollOutside:!0,index:0,type:null,href:null,content:null,title:null,tpl:{wrap:'<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',image:'<img class="fancybox-image" src="{href}" alt="" />',iframe:'<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen'+(l?' allowtransparency="true"':"")+"></iframe>",error:'<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',closeBtn:'<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',next:'<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',prev:'<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'},openEffect:"fade",openSpeed:250,openEasing:"swing",openOpacity:!0,openMethod:"zoomIn",closeEffect:"fade",closeSpeed:250,closeEasing:"swing",closeOpacity:!0,closeMethod:"zoomOut",nextEffect:"elastic",nextSpeed:250,nextEasing:"swing",nextMethod:"changeIn",prevEffect:"elastic",prevSpeed:250,prevEasing:"swing",prevMethod:"changeOut",helpers:{overlay:!0,title:!0},onCancel:n.noop,beforeLoad:n.noop,afterLoad:n.noop,beforeShow:n.noop,afterShow:n.noop,beforeChange:n.noop,beforeClose:n.noop,afterClose:n.noop},group:{},opts:{},previous:null,coming:null,current:null,isActive:!1,isOpen:!1,isOpened:!1,wrap:null,skin:null,outer:null,inner:null,player:{timer:null,isActive:!1},ajaxLoad:null,imgPreload:null,transitions:{},helpers:{},open:function(e,t){return e&&(n.isPlainObject(t)||(t={}),!1!==s.close(!0))?(n.isArray(e)||(e=d(e)?n(e).get():[e]),n.each(e,function(r,o){var a,l,c,u,p,h,g,m={};"object"===n.type(o)&&(o.nodeType&&(o=n(o)),d(o)?(m={href:o.data("fancybox-href")||o.attr("href"),title:o.data("fancybox-title")||o.attr("title"),isDom:!0,element:o},n.metadata&&n.extend(!0,m,o.metadata())):m=o),a=t.href||m.href||(f(o)?o:null),l=t.title!==i?t.title:m.title||"",c=t.content||m.content,u=c?"html":t.type||m.type,!u&&m.isDom&&(u=o.data("fancybox-type"),u||(p=o.prop("class").match(/fancybox\.(\w+)/),u=p?p[1]:null)),f(a)&&(u||(s.isImage(a)?u="image":s.isSWF(a)?u="swf":"#"===a.charAt(0)?u="inline":f(o)&&(u="html",c=o)),"ajax"===u&&(h=a.split(/\s+/,2),a=h.shift(),g=h.shift())),c||("inline"===u?a?c=n(f(a)?a.replace(/.*(?=#[^\s]+$)/,""):a):m.isDom&&(c=o):"html"===u?c=a:u||a||!m.isDom||(u="inline",c=o)),n.extend(m,{href:a,type:u,content:c,title:l,selector:g}),e[r]=m}),s.opts=n.extend(!0,{},s.defaults,t),t.keys!==i&&(s.opts.keys=t.keys?n.extend({},s.defaults.keys,t.keys):!1),s.group=e,s._start(s.opts.index)):void 0},cancel:function(){var e=s.coming;e&&!1!==s.trigger("onCancel")&&(s.hideLoading(),s.ajaxLoad&&s.ajaxLoad.abort(),s.ajaxLoad=null,s.imgPreload&&(s.imgPreload.onload=s.imgPreload.onerror=null),e.wrap&&e.wrap.stop(!0,!0).trigger("onReset").remove(),s.coming=null,s.current||s._afterZoomOut(e))},close:function(e){s.cancel(),!1!==s.trigger("beforeClose")&&(s.unbindEvents(),s.isActive&&(s.isOpen&&e!==!0?(s.isOpen=s.isOpened=!1,s.isClosing=!0,n(".fancybox-item, .fancybox-nav").remove(),s.wrap.stop(!0,!0).removeClass("fancybox-opened"),s.transitions[s.current.closeMethod]()):(n(".fancybox-wrap").stop(!0).trigger("onReset").remove(),s._afterZoomOut())))},play:function(e){var t=function(){clearTimeout(s.player.timer)},n=function(){t(),s.current&&s.player.isActive&&(s.player.timer=setTimeout(s.next,s.current.playSpeed))},i=function(){t(),a.unbind(".player"),s.player.isActive=!1,s.trigger("onPlayEnd")},r=function(){s.current&&(s.current.loop||s.current.index<s.group.length-1)&&(s.player.isActive=!0,a.bind({"onCancel.player beforeClose.player":i,"onUpdate.player":n,"beforeLoad.player":t}),n(),s.trigger("onPlayStart"))};e===!0||!s.player.isActive&&e!==!1?r():i()},next:function(e){var t=s.current;t&&(f(e)||(e=t.direction.next),s.jumpto(t.index+1,e,"next"))},prev:function(e){var t=s.current;t&&(f(e)||(e=t.direction.prev),s.jumpto(t.index-1,e,"prev"))},jumpto:function(e,t,n){var r=s.current;r&&(e=g(e),s.direction=t||r.direction[e>=r.index?"next":"prev"],s.router=n||"jumpto",r.loop&&(0>e&&(e=r.group.length+e%r.group.length),e%=r.group.length),r.group[e]!==i&&(s.cancel(),s._start(e)))},reposition:function(e,t){var i,r=s.current,o=r?r.wrap:null;o&&(i=s._getPosition(t),e&&"scroll"===e.type?(delete i.position,o.stop(!0,!0).animate(i,200)):(o.css(i),r.pos=n.extend({},r.dim,i)))},update:function(e){var t=e&&e.type,n=!t||"orientationchange"===t;n&&(clearTimeout(c),c=null),s.isOpen&&!c&&(c=setTimeout(function(){var i=s.current;i&&!s.isClosing&&(s.wrap.removeClass("fancybox-tmp"),(n||"load"===t||"resize"===t&&i.autoResize)&&s._setDimension(),"scroll"===t&&i.canShrink||s.reposition(e),s.trigger("onUpdate"),c=null)},n&&!u?0:300))},toggle:function(e){s.isOpen&&(s.current.fitToView="boolean"===n.type(e)?e:!s.current.fitToView,u&&(s.wrap.removeAttr("style").addClass("fancybox-tmp"),s.trigger("onUpdate")),s.update())},hideLoading:function(){a.unbind(".loading"),n("#fancybox-loading").remove()},showLoading:function(){var e,t;s.hideLoading(),e=n('<div id="fancybox-loading"><div></div></div>').click(s.cancel).appendTo("body"),a.bind("keydown.loading",function(e){27===(e.which||e.keyCode)&&(e.preventDefault(),s.cancel())}),s.defaults.fixed||(t=s.getViewport(),e.css({position:"absolute",top:.5*t.h+t.y,left:.5*t.w+t.x}))},getViewport:function(){var t=s.current&&s.current.locked||!1,n={x:o.scrollLeft(),y:o.scrollTop()};return t?(n.w=t[0].clientWidth,n.h=t[0].clientHeight):(n.w=u&&e.innerWidth?e.innerWidth:o.width(),n.h=u&&e.innerHeight?e.innerHeight:o.height()),n},unbindEvents:function(){s.wrap&&d(s.wrap)&&s.wrap.unbind(".fb"),a.unbind(".fb"),o.unbind(".fb")},bindEvents:function(){var e,t=s.current;t&&(o.bind("orientationchange.fb"+(u?"":" resize.fb")+(t.autoCenter&&!t.locked?" scroll.fb":""),s.update),e=t.keys,e&&a.bind("keydown.fb",function(r){var o=r.which||r.keyCode,a=r.target||r.srcElement;return 27===o&&s.coming?!1:void(r.ctrlKey||r.altKey||r.shiftKey||r.metaKey||a&&(a.type||n(a).is("[contenteditable]"))||n.each(e,function(e,a){return t.group.length>1&&a[o]!==i?(s[e](a[o]),r.preventDefault(),!1):n.inArray(o,a)>-1?(s[e](),r.preventDefault(),!1):void 0}))}),n.fn.mousewheel&&t.mouseWheel&&s.wrap.bind("mousewheel.fb",function(e,i,r,o){for(var a=e.target||null,l=n(a),c=!1;l.length&&!(c||l.is(".fancybox-skin")||l.is(".fancybox-wrap"));)c=h(l[0]),l=n(l).parent();0===i||c||s.group.length>1&&!t.canShrink&&(o>0||r>0?s.prev(o>0?"down":"left"):(0>o||0>r)&&s.next(0>o?"up":"right"),e.preventDefault())}))},trigger:function(e,t){var i,r=t||s.coming||s.current;if(r){if(n.isFunction(r[e])&&(i=r[e].apply(r,Array.prototype.slice.call(arguments,1))),i===!1)return!1;r.helpers&&n.each(r.helpers,function(t,i){i&&s.helpers[t]&&n.isFunction(s.helpers[t][e])&&s.helpers[t][e](n.extend(!0,{},s.helpers[t].defaults,i),r)}),a.trigger(e)}},isImage:function(e){return f(e)&&e.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i)},isSWF:function(e){return f(e)&&e.match(/\.(swf)((\?|#).*)?$/i)},_start:function(e){var t,i,r,o,a,l={};if(e=g(e),t=s.group[e]||null,!t)return!1;if(l=n.extend(!0,{},s.opts,t),o=l.margin,a=l.padding,"number"===n.type(o)&&(l.margin=[o,o,o,o]),"number"===n.type(a)&&(l.padding=[a,a,a,a]),l.modal&&n.extend(!0,l,{closeBtn:!1,closeClick:!1,nextClick:!1,arrows:!1,mouseWheel:!1,keys:null,helpers:{overlay:{closeClick:!1}}}),l.autoSize&&(l.autoWidth=l.autoHeight=!0),"auto"===l.width&&(l.autoWidth=!0),"auto"===l.height&&(l.autoHeight=!0),l.group=s.group,l.index=e,s.coming=l,!1===s.trigger("beforeLoad"))return void(s.coming=null);if(r=l.type,i=l.href,!r)return s.coming=null,s.current&&s.router&&"jumpto"!==s.router?(s.current.index=e,s[s.router](s.direction)):!1;if(s.isActive=!0,("image"===r||"swf"===r)&&(l.autoHeight=l.autoWidth=!1,l.scrolling="visible"),"image"===r&&(l.aspectRatio=!0),"iframe"===r&&u&&(l.scrolling="scroll"),l.wrap=n(l.tpl.wrap).addClass("fancybox-"+(u?"mobile":"desktop")+" fancybox-type-"+r+" fancybox-tmp "+l.wrapCSS).appendTo(l.parent||"body"),n.extend(l,{skin:n(".fancybox-skin",l.wrap),outer:n(".fancybox-outer",l.wrap),inner:n(".fancybox-inner",l.wrap)}),n.each(["Top","Right","Bottom","Left"],function(e,t){l.skin.css("padding"+t,m(l.padding[e]))}),s.trigger("onReady"),"inline"===r||"html"===r){if(!l.content||!l.content.length)return s._error("content")}else if(!i)return s._error("href");"image"===r?s._loadImage():"ajax"===r?s._loadAjax():"iframe"===r?s._loadIframe():s._afterLoad()},_error:function(e){n.extend(s.coming,{type:"html",autoWidth:!0,autoHeight:!0,minWidth:0,minHeight:0,scrolling:"no",hasError:e,content:s.coming.tpl.error}),s._afterLoad()},_loadImage:function(){var e=s.imgPreload=new Image;e.onload=function(){this.onload=this.onerror=null,s.coming.width=this.width/s.opts.pixelRatio,s.coming.height=this.height/s.opts.pixelRatio,s._afterLoad()},e.onerror=function(){this.onload=this.onerror=null,s._error("image")},e.src=s.coming.href,e.complete!==!0&&s.showLoading()},_loadAjax:function(){var e=s.coming;s.showLoading(),s.ajaxLoad=n.ajax(n.extend({},e.ajax,{url:e.href,error:function(e,t){s.coming&&"abort"!==t?s._error("ajax",e):s.hideLoading()},success:function(t,n){"success"===n&&(e.content=t,s._afterLoad())}}))},_loadIframe:function(){var e=s.coming,t=n(e.tpl.iframe.replace(/\{rnd\}/g,(new Date).getTime())).attr("scrolling",u?"auto":e.iframe.scrolling).attr("src",e.href);n(e.wrap).bind("onReset",function(){try{n(this).find("iframe").hide().attr("src","//about:blank").end().empty()}catch(e){}}),e.iframe.preload&&(s.showLoading(),t.one("load",function(){n(this).data("ready",1),u||n(this).bind("load.fb",s.update),n(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show(),s._afterLoad()})),e.content=t.appendTo(e.inner),e.iframe.preload||s._afterLoad()},_preloadImages:function(){var e,t,n=s.group,i=s.current,r=n.length,o=i.preload?Math.min(i.preload,r-1):0;for(t=1;o>=t;t+=1)e=n[(i.index+t)%r],"image"===e.type&&e.href&&((new Image).src=e.href)},_afterLoad:function(){var e,t,i,r,o,a,l=s.coming,c=s.current,u="fancybox-placeholder";if(s.hideLoading(),l&&s.isActive!==!1){if(!1===s.trigger("afterLoad",l,c))return l.wrap.stop(!0).trigger("onReset").remove(),void(s.coming=null);switch(c&&(s.trigger("beforeChange",c),c.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove()),s.unbindEvents(),e=l,t=l.content,i=l.type,r=l.scrolling,n.extend(s,{wrap:e.wrap,skin:e.skin,outer:e.outer,inner:e.inner,current:e,previous:c}),o=e.href,i){case"inline":case"ajax":case"html":e.selector?t=n("<div>").html(t).find(e.selector):d(t)&&(t.data(u)||t.data(u,n('<div class="'+u+'"></div>').insertAfter(t).hide()),t=t.show().detach(),e.wrap.bind("onReset",function(){n(this).find(t).length&&t.hide().replaceAll(t.data(u)).data(u,!1)}));break;case"image":t=e.tpl.image.replace("{href}",o);break;case"swf":t='<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="'+o+'"></param>',a="",n.each(e.swf,function(e,n){t+='<param name="'+e+'" value="'+n+'"></param>',a+=" "+e+'="'+n+'"'}),t+='<embed src="'+o+'" type="application/x-shockwave-flash" width="100%" height="100%"'+a+"></embed></object>"}d(t)&&t.parent().is(e.inner)||e.inner.append(t),s.trigger("beforeShow"),e.inner.css("overflow","yes"===r?"scroll":"no"===r?"hidden":r),s._setDimension(),s.reposition(),s.isOpen=!1,s.coming=null,s.bindEvents(),s.isOpened?c.prevMethod&&s.transitions[c.prevMethod]():n(".fancybox-wrap").not(e.wrap).stop(!0).trigger("onReset").remove(),s.transitions[s.isOpened?e.nextMethod:e.openMethod](),s._preloadImages()}},_setDimension:function(){var e,t,i,r,o,a,l,c,u,d,f,h,y,v,b,x=s.getViewport(),w=0,T=!1,k=!1,C=s.wrap,E=s.skin,S=s.inner,_=s.current,N=_.width,A=_.height,j=_.minWidth,L=_.minHeight,D=_.maxWidth,O=_.maxHeight,H=_.scrolling,M=_.scrollOutside?_.scrollbarWidth:0,P=_.margin,W=g(P[1]+P[3]),F=g(P[0]+P[2]);if(C.add(E).add(S).width("auto").height("auto").removeClass("fancybox-tmp"),e=g(E.outerWidth(!0)-E.width()),t=g(E.outerHeight(!0)-E.height()),i=W+e,r=F+t,o=p(N)?(x.w-i)*g(N)/100:N,a=p(A)?(x.h-r)*g(A)/100:A,"iframe"===_.type){if(v=_.content,_.autoHeight&&1===v.data("ready"))try{v[0].contentWindow.document.location&&(S.width(o).height(9999),b=v.contents().find("body"),M&&b.css("overflow-x","hidden"),a=b.outerHeight(!0))}catch($){}}else(_.autoWidth||_.autoHeight)&&(S.addClass("fancybox-tmp"),_.autoWidth||S.width(o),_.autoHeight||S.height(a),_.autoWidth&&(o=S.width()),_.autoHeight&&(a=S.height()),S.removeClass("fancybox-tmp"));if(N=g(o),A=g(a),u=o/a,j=g(p(j)?g(j,"w")-i:j),D=g(p(D)?g(D,"w")-i:D),L=g(p(L)?g(L,"h")-r:L),O=g(p(O)?g(O,"h")-r:O),l=D,c=O,_.fitToView&&(D=Math.min(x.w-i,D),O=Math.min(x.h-r,O)),h=x.w-W,y=x.h-F,_.aspectRatio?(N>D&&(N=D,A=g(N/u)),A>O&&(A=O,N=g(A*u)),j>N&&(N=j,A=g(N/u)),L>A&&(A=L,N=g(A*u))):(N=Math.max(j,Math.min(N,D)),_.autoHeight&&"iframe"!==_.type&&(S.width(N),A=S.height()),A=Math.max(L,Math.min(A,O))),_.fitToView)if(S.width(N).height(A),C.width(N+e),d=C.width(),f=C.height(),_.aspectRatio)for(;(d>h||f>y)&&N>j&&A>L&&!(w++>19);)A=Math.max(L,Math.min(O,A-10)),N=g(A*u),j>N&&(N=j,A=g(N/u)),N>D&&(N=D,A=g(N/u)),S.width(N).height(A),C.width(N+e),d=C.width(),f=C.height();else N=Math.max(j,Math.min(N,N-(d-h))),A=Math.max(L,Math.min(A,A-(f-y)));M&&"auto"===H&&a>A&&h>N+e+M&&(N+=M),S.width(N).height(A),C.width(N+e),d=C.width(),f=C.height(),T=(d>h||f>y)&&N>j&&A>L,k=_.aspectRatio?l>N&&c>A&&o>N&&a>A:(l>N||c>A)&&(o>N||a>A),n.extend(_,{dim:{width:m(d),height:m(f)},origWidth:o,origHeight:a,canShrink:T,canExpand:k,wPadding:e,hPadding:t,wrapSpace:f-E.outerHeight(!0),skinSpace:E.height()-A}),!v&&_.autoHeight&&A>L&&O>A&&!k&&S.height("auto")},_getPosition:function(e){var t=s.current,n=s.getViewport(),i=t.margin,r=s.wrap.width()+i[1]+i[3],o=s.wrap.height()+i[0]+i[2],a={position:"absolute",top:i[0],left:i[3]};return t.autoCenter&&t.fixed&&!e&&o<=n.h&&r<=n.w?a.position="fixed":t.locked||(a.top+=n.y,a.left+=n.x),a.top=m(Math.max(a.top,a.top+(n.h-o)*t.topRatio)),a.left=m(Math.max(a.left,a.left+(n.w-r)*t.leftRatio)),a},_afterZoomIn:function(){var e=s.current;e&&(s.isOpen=s.isOpened=!0,s.wrap.css("overflow","visible").addClass("fancybox-opened"),s.update(),(e.closeClick||e.nextClick&&s.group.length>1)&&s.inner.css("cursor","pointer").bind("click.fb",function(t){n(t.target).is("a")||n(t.target).parent().is("a")||(t.preventDefault(),s[e.closeClick?"close":"next"]())}),e.closeBtn&&n(e.tpl.closeBtn).appendTo(s.skin).bind("click.fb",function(e){e.preventDefault(),s.close()}),e.arrows&&s.group.length>1&&((e.loop||e.index>0)&&n(e.tpl.prev).appendTo(s.outer).bind("click.fb",s.prev),(e.loop||e.index<s.group.length-1)&&n(e.tpl.next).appendTo(s.outer).bind("click.fb",s.next)),s.trigger("afterShow"),e.loop||e.index!==e.group.length-1?s.opts.autoPlay&&!s.player.isActive&&(s.opts.autoPlay=!1,s.play()):s.play(!1))},_afterZoomOut:function(e){e=e||s.current,n(".fancybox-wrap").trigger("onReset").remove(),n.extend(s,{group:{},opts:{},router:!1,current:null,isActive:!1,isOpened:!1,isOpen:!1,isClosing:!1,wrap:null,skin:null,outer:null,inner:null}),s.trigger("afterClose",e)}}),s.transitions={getOrigPosition:function(){var e=s.current,t=e.element,n=e.orig,i={},r=50,o=50,a=e.hPadding,l=e.wPadding,c=s.getViewport();return!n&&e.isDom&&t.is(":visible")&&(n=t.find("img:first"),n.length||(n=t)),d(n)?(i=n.offset(),n.is("img")&&(r=n.outerWidth(),o=n.outerHeight())):(i.top=c.y+(c.h-o)*e.topRatio,i.left=c.x+(c.w-r)*e.leftRatio),("fixed"===s.wrap.css("position")||e.locked)&&(i.top-=c.y,i.left-=c.x),i={top:m(i.top-a*e.topRatio),left:m(i.left-l*e.leftRatio),width:m(r+l),height:m(o+a)}},step:function(e,t){var n,i,r,o=t.prop,a=s.current,l=a.wrapSpace,c=a.skinSpace;("width"===o||"height"===o)&&(n=t.end===t.start?1:(e-t.start)/(t.end-t.start),s.isClosing&&(n=1-n),i="width"===o?a.wPadding:a.hPadding,r=e-i,s.skin[o](g("width"===o?r:r-l*n)),s.inner[o](g("width"===o?r:r-l*n-c*n)))},zoomIn:function(){var e=s.current,t=e.pos,i=e.openEffect,r="elastic"===i,o=n.extend({opacity:1},t);delete o.position,r?(t=this.getOrigPosition(),e.openOpacity&&(t.opacity=.1)):"fade"===i&&(t.opacity=.1),s.wrap.css(t).animate(o,{duration:"none"===i?0:e.openSpeed,easing:e.openEasing,step:r?this.step:null,complete:s._afterZoomIn})},zoomOut:function(){var e=s.current,t=e.closeEffect,n="elastic"===t,i={opacity:.1};n&&(i=this.getOrigPosition(),e.closeOpacity&&(i.opacity=.1)),s.wrap.animate(i,{duration:"none"===t?0:e.closeSpeed,easing:e.closeEasing,step:n?this.step:null,complete:s._afterZoomOut})},changeIn:function(){var e,t=s.current,n=t.nextEffect,i=t.pos,r={opacity:1},o=s.direction,a=200;i.opacity=.1,"elastic"===n&&(e="down"===o||"up"===o?"top":"left","down"===o||"right"===o?(i[e]=m(g(i[e])-a),r[e]="+="+a+"px"):(i[e]=m(g(i[e])+a),r[e]="-="+a+"px")),"none"===n?s._afterZoomIn():s.wrap.css(i).animate(r,{duration:t.nextSpeed,easing:t.nextEasing,complete:s._afterZoomIn})},changeOut:function(){var e=s.previous,t=e.prevEffect,i={opacity:.1},r=s.direction,o=200;"elastic"===t&&(i["down"===r||"up"===r?"top":"left"]=("up"===r||"left"===r?"-":"+")+"="+o+"px"),e.wrap.animate(i,{duration:"none"===t?0:e.prevSpeed,easing:e.prevEasing,complete:function(){n(this).trigger("onReset").remove()}})}},s.helpers.overlay={defaults:{closeClick:!0,speedOut:200,showEarly:!0,css:{},locked:!u,fixed:!0},overlay:null,fixed:!1,el:n("html"),create:function(e){e=n.extend({},this.defaults,e),this.overlay&&this.close(),this.overlay=n('<div class="fancybox-overlay"></div>').appendTo(s.coming?s.coming.parent:e.parent),this.fixed=!1,e.fixed&&s.defaults.fixed&&(this.overlay.addClass("fancybox-overlay-fixed"),this.fixed=!0)},open:function(e){var t=this;e=n.extend({},this.defaults,e),this.overlay?this.overlay.unbind(".overlay").width("auto").height("auto"):this.create(e),this.fixed||(o.bind("resize.overlay",n.proxy(this.update,this)),this.update()),e.closeClick&&this.overlay.bind("click.overlay",function(e){return n(e.target).hasClass("fancybox-overlay")?(s.isActive?s.close():t.close(),!1):void 0}),this.overlay.css(e.css).show()},close:function(){var e,t;o.unbind("resize.overlay"),this.el.hasClass("fancybox-lock")&&(n(".fancybox-margin").removeClass("fancybox-margin"),e=o.scrollTop(),t=o.scrollLeft(),this.el.removeClass("fancybox-lock"),o.scrollTop(e).scrollLeft(t)),n(".fancybox-overlay").remove().hide(),n.extend(this,{overlay:null,fixed:!1})},update:function(){var e,n="100%";this.overlay.width(n).height("100%"),l?(e=Math.max(t.documentElement.offsetWidth,t.body.offsetWidth),a.width()>e&&(n=a.width())):a.width()>o.width()&&(n=a.width()),this.overlay.width(n).height(a.height())},onReady:function(e,t){var i=this.overlay;n(".fancybox-overlay").stop(!0,!0),i||this.create(e),e.locked&&this.fixed&&t.fixed&&(i||(this.margin=a.height()>o.height()?n("html").css("margin-right").replace("px",""):!1),t.locked=this.overlay.append(t.wrap),t.fixed=!1),e.showEarly===!0&&this.beforeShow.apply(this,arguments)},beforeShow:function(e,t){var i,r;t.locked&&(this.margin!==!1&&(n("*").filter(function(){return"fixed"===n(this).css("position")&&!n(this).hasClass("fancybox-overlay")&&!n(this).hasClass("fancybox-wrap")}).addClass("fancybox-margin"),this.el.addClass("fancybox-margin")),i=o.scrollTop(),r=o.scrollLeft(),this.el.addClass("fancybox-lock"),o.scrollTop(i).scrollLeft(r)),this.open(e)},onUpdate:function(){this.fixed||this.update()},afterClose:function(e){this.overlay&&!s.coming&&this.overlay.fadeOut(e.speedOut,n.proxy(this.close,this))}},s.helpers.title={defaults:{type:"float",position:"bottom"},beforeShow:function(e){var t,i,r=s.current,o=r.title,a=e.type;if(n.isFunction(o)&&(o=o.call(r.element,r)),f(o)&&""!==n.trim(o)){switch(t=n('<div class="fancybox-title fancybox-title-'+a+'-wrap">'+o+"</div>"),a){case"inside":i=s.skin;break;case"outside":i=s.wrap;break;case"over":i=s.inner;break;default:i=s.skin,t.appendTo("body"),l&&t.width(t.width()),t.wrapInner('<span class="child"></span>'),s.current.margin[2]+=Math.abs(g(t.css("margin-bottom")))}t["top"===e.position?"prependTo":"appendTo"](i)}}},n.fn.fancybox=function(e){var t,i=n(this),r=this.selector||"",o=function(o){var a,l,c=n(this).blur(),u=t;o.ctrlKey||o.altKey||o.shiftKey||o.metaKey||c.is(".fancybox-wrap")||(a=e.groupAttr||"data-fancybox-group",l=c.attr(a),l||(a="rel",l=c.get(0)[a]),l&&""!==l&&"nofollow"!==l&&(c=r.length?n(r):i,c=c.filter("["+a+'="'+l+'"]'),u=c.index(this)),e.index=u,s.open(c,e)!==!1&&o.preventDefault())};return e=e||{},t=e.index||0,r&&e.live!==!1?a.undelegate(r,"click.fb-start").delegate(r+":not('.fancybox-item, .fancybox-nav')","click.fb-start",o):i.unbind("click.fb-start").bind("click.fb-start",o),this.filter("[data-fancybox-start=1]").trigger("click"),this},a.ready(function(){var t,o;n.scrollbarWidth===i&&(n.scrollbarWidth=function(){var e=n('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),t=e.children(),i=t.innerWidth()-t.height(99).innerWidth();return e.remove(),i}),n.support.fixedPosition===i&&(n.support.fixedPosition=function(){var e=n('<div style="position:fixed;top:20px;"></div>').appendTo("body"),t=20===e[0].offsetTop||15===e[0].offsetTop;return e.remove(),t}()),n.extend(s.defaults,{scrollbarWidth:n.scrollbarWidth(),fixed:n.support.fixedPosition,parent:n("body")}),t=n(e).width(),r.addClass("fancybox-lock-test"),o=n(e).width(),r.removeClass("fancybox-lock-test"),n("<style type='text/css'>.fancybox-margin{margin-right:"+(o-t)+"px;}</style>").appendTo("head")})}(window,document,jQuery);