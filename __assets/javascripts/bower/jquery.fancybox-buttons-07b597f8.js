!function(e){var t=e.fancybox;t.helpers.buttons={defaults:{skipSingle:!1,position:"top",tpl:'<div id="fancybox-buttons"><ul><li><a class="btnPrev" title="Previous" href="javascript:;"></a></li><li><a class="btnPlay" title="Start slideshow" href="javascript:;"></a></li><li><a class="btnNext" title="Next" href="javascript:;"></a></li><li><a class="btnToggle" title="Toggle size" href="javascript:;"></a></li><li><a class="btnClose" title="Close" href="javascript:;"></a></li></ul></div>'},list:null,buttons:null,beforeLoad:function(e,t){return e.skipSingle&&t.group.length<2?(t.helpers.buttons=!1,void(t.closeBtn=!0)):void(t.margin["bottom"===e.position?2:0]+=30)},onPlayStart:function(){this.buttons&&this.buttons.play.attr("title","Pause slideshow").addClass("btnPlayOn")},onPlayEnd:function(){this.buttons&&this.buttons.play.attr("title","Start slideshow").removeClass("btnPlayOn")},afterShow:function(n,i){var r=this.buttons;r||(this.list=e(n.tpl).addClass(n.position).appendTo("body"),r={prev:this.list.find(".btnPrev").click(t.prev),next:this.list.find(".btnNext").click(t.next),play:this.list.find(".btnPlay").click(t.play),toggle:this.list.find(".btnToggle").click(t.toggle),close:this.list.find(".btnClose").click(t.close)}),i.index>0||i.loop?r.prev.removeClass("btnDisabled"):r.prev.addClass("btnDisabled"),i.loop||i.index<i.group.length-1?(r.next.removeClass("btnDisabled"),r.play.removeClass("btnDisabled")):(r.next.addClass("btnDisabled"),r.play.addClass("btnDisabled")),this.buttons=r,this.onUpdate(n,i)},onUpdate:function(e,t){var n;this.buttons&&(n=this.buttons.toggle.removeClass("btnDisabled btnToggleOn"),t.canShrink?n.addClass("btnToggleOn"):t.canExpand||n.addClass("btnDisabled"))},beforeClose:function(){this.list&&this.list.remove(),this.list=null,this.buttons=null}}}(jQuery);