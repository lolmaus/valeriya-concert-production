/*!
* FitText.js 1.2
*
* Copyright 2011, Dave Rupert http://daverupert.com
* Released under the WTFPL license
* http://sam.zoy.org/wtfpl/
*
* Date: Thu May 05 14:23:00 2011 -0600
*/
!function(e){e.fn.fitText=function(t,n){var i=t||1,r=e.extend({minFontSize:Number.NEGATIVE_INFINITY,maxFontSize:Number.POSITIVE_INFINITY},n);return this.each(function(){var t=e(this),n=function(){t.css("font-size",Math.max(Math.min(t.width()/(10*i),parseFloat(r.maxFontSize)),parseFloat(r.minFontSize)))};n(),e(window).on("resize.fittext orientationchange.fittext",n)})}}(jQuery);