/*
	Base.js, version 1.1a
	Copyright 2006-2010, Dean Edwards
	License: http://www.opensource.org/licenses/mit-license.php
*/
var Base=function(){};Base.extend=function(e,t){"use strict";var n=Base.prototype.extend;Base._prototyping=!0;var i=new this;n.call(i,e),i.base=function(){},delete Base._prototyping;var r=i.constructor,o=i.constructor=function(){if(!Base._prototyping)if(this._constructing||this.constructor==o)this._constructing=!0,r.apply(this,arguments),delete this._constructing;else if(null!==arguments[0])return(arguments[0].extend||n).call(arguments[0],i)};return o.ancestor=this,o.extend=this.extend,o.forEach=this.forEach,o.implement=this.implement,o.prototype=i,o.toString=this.toString,o.valueOf=function(e){return"object"==e?o:r.valueOf()},n.call(o,t),"function"==typeof o.init&&o.init(),o},Base.prototype={extend:function(e,t){if(arguments.length>1){var n=this[e];if(n&&"function"==typeof t&&(!n.valueOf||n.valueOf()!=t.valueOf())&&/\bbase\b/.test(t)){var i=t.valueOf();t=function(){var e=this.base||Base.prototype.base;this.base=n;var t=i.apply(this,arguments);return this.base=e,t},t.valueOf=function(e){return"object"==e?t:i},t.toString=Base.toString}this[e]=t}else if(e){var r=Base.prototype.extend;Base._prototyping||"function"==typeof this||(r=this.extend||r);for(var o={toSource:null},a=["constructor","toString","valueOf"],s=Base._prototyping?0:1;l=a[s++];)e[l]!=o[l]&&r.call(this,l,e[l]);for(var l in e)o[l]||r.call(this,l,e[l])}return this}},Base=Base.extend({constructor:function(){this.extend(arguments[0])}},{ancestor:Object,version:"1.1",forEach:function(e,t,n){for(var i in e)void 0===this.prototype[i]&&t.call(n,e[i],i,e)},implement:function(){for(var e=0;e<arguments.length;e++)"function"==typeof arguments[e]?arguments[e](this.prototype):this.prototype.extend(arguments[e]);return this},toString:function(){return String(this.valueOf())}});var FlipClock;/**
 * FlipClock.js
 *
 * @author     Justin Kimbrell
 * @copyright  2013 - Objective HTML, LLC
 * @licesnse   http://www.opensource.org/licenses/mit-license.php
 */
!function(e){"use strict";FlipClock=function(e,t,n){return"object"==typeof t&&(n=t,t=0),new FlipClock.Factory(e,t,n)},FlipClock.Lang={},FlipClock.Base=Base.extend({buildDate:"2014-06-03",version:"0.5.5",constructor:function(t,n){"object"!=typeof t&&(t={}),"object"!=typeof n&&(n={}),this.setOptions(e.extend(!0,{},t,n))},callback:function(e){if("function"==typeof e){for(var t=[],n=1;n<=arguments.length;n++)arguments[n]&&t.push(arguments[n]);e.apply(this,t)}},log:function(e){window.console&&console.log&&console.log(e)},getOption:function(e){return this[e]?this[e]:!1},getOptions:function(){return this},setOption:function(e,t){this[e]=t},setOptions:function(e){for(var t in e)"undefined"!=typeof e[t]&&this.setOption(t,e[t])}})}(jQuery),/**
 * FlipClock.js
 *
 * @author     Justin Kimbrell
 * @copyright  2013 - Objective HTML, LLC
 * @licesnse   http://www.opensource.org/licenses/mit-license.php
 */
function(e){"use strict";FlipClock.Face=FlipClock.Base.extend({dividers:[],factory:!1,lists:[],constructor:function(e,t){this.base(t),this.factory=e,this.dividers=[]},build:function(){},createDivider:function(t,n,i){"boolean"!=typeof n&&n||(i=n,n=t);var r=['<span class="'+this.factory.classes.dot+' top"></span>','<span class="'+this.factory.classes.dot+' bottom"></span>'].join("");i&&(r=""),t=this.factory.localize(t);var o=['<span class="'+this.factory.classes.divider+" "+(n?n:"").toLowerCase()+'">','<span class="'+this.factory.classes.label+'">'+(t?t:"")+"</span>",r,"</span>"];return e(o.join(""))},createList:function(e,t){"object"==typeof e&&(t=e,e=0);var n=new FlipClock.List(this.factory,e,t);return n},reset:function(){this.factory.time=new FlipClock.Time(this.factor,this.factory.original?Math.round(this.factory.original):0),this.flip(this.factory.original,!1)},addDigit:function(e){var t=this.createList(e,{classes:{active:this.factory.classes.active,before:this.factory.classes.before,flip:this.factory.classes.flip}});t.$obj.insertBefore(this.factory.lists[0].$obj),this.factory.lists.unshift(t)},start:function(){},stop:function(){},increment:function(){this.factory.time.time instanceof Date||(this.factory.countdown?0==this.factory.time.getTimeSeconds()?this.factory.stop():this.factory.time.subSecond():this.factory.time.addSecond())},flip:function(t,n){var i=this;this.increment();var r=i.factory.lists.length-t.length;0>r&&(r=0),e.each(t,function(e,t){e+=r;var o=i.factory.lists[e];o?(o.select(t),n||o.play()):i.addDigit(t)});for(var o=0;o<t.length;o++)o>=r&&i.factory.lists[o].digit!=t[o]&&i.factory.lists[o].select(t[o])}})}(jQuery),/**
 * FlipClock.js
 *
 * @author     Justin Kimbrell
 * @copyright  2013 - Objective HTML, LLC
 * @licesnse   http://www.opensource.org/licenses/mit-license.php
 */
function(e){"use strict";FlipClock.Factory=FlipClock.Base.extend({autoStart:!0,callbacks:{destroy:!1,create:!1,init:!1,interval:!1,start:!1,stop:!1,reset:!1},classes:{active:"flip-clock-active",before:"flip-clock-before",divider:"flip-clock-divider",dot:"flip-clock-dot",label:"flip-clock-label",flip:"flip",play:"play",wrapper:"flip-clock-wrapper"},clockFace:"HourlyCounter",defaultClockFace:"HourlyCounter",defaultLanguage:"english",language:"english",lang:!1,original:!1,face:!0,running:!1,time:!1,timer:!1,lists:[],$wrapper:!1,constructor:function(t,n,i){i||(i={}),this.lists=[],this.running=!1,this.base(i),this.$wrapper=e(t).addClass(this.classes.wrapper),this.original=n instanceof Date?n:n?Math.round(n):0,this.time=new FlipClock.Time(this,this.original,{minimumDigits:i.minimumDigits?i.minimumDigits:0,animationRate:i.animationRate?i.animationRate:1e3}),this.timer=new FlipClock.Timer(this,i),this.lang=this.loadLanguage(this.language),this.face=this.loadClockFace(this.clockFace,i),this.autoStart&&this.start()},loadClockFace:function(e,t){var n,i="Face";return e=e.ucfirst()+i,n=FlipClock[e]?new FlipClock[e](this,t):new FlipClock[this.defaultClockFace+i](this,t),n.build(),n},loadLanguage:function(e){var t;return t=FlipClock.Lang[e.ucfirst()]?FlipClock.Lang[e.ucfirst()]:FlipClock.Lang[e]?FlipClock.Lang[e]:FlipClock.Lang[this.defaultLanguage]},localize:function(e,t){var n=this.lang;if(!e)return null;var i=e.toLowerCase();return"object"==typeof t&&(n=t),n&&n[i]?n[i]:e},start:function(e){var t=this;t.running||t.countdown&&!(t.countdown&&t.time.time>0)?t.log("Trying to start timer when countdown already at 0"):(t.face.start(t.time),t.timer.start(function(){t.flip(),"function"==typeof e&&e()}))},stop:function(e){this.face.stop(),this.timer.stop(e);for(var t in this.lists)this.lists[t].stop()},reset:function(e){this.timer.reset(e),this.face.reset()},setTime:function(e){this.time.time=e,this.flip(!0)},getTime:function(){return this.time},setCountdown:function(e){var t=this.running;this.countdown=e?!0:!1,t&&(this.stop(),this.start())},flip:function(e){this.face.flip(!1,e)}})}(jQuery),/**
 * FlipClock.js
 *
 * @author     Justin Kimbrell
 * @copyright  2013 - Objective HTML, LLC
 * @licesnse   http://www.opensource.org/licenses/mit-license.php
 */
function(e){"use strict";FlipClock.List=FlipClock.Base.extend({digit:0,classes:{active:"flip-clock-active",before:"flip-clock-before",flip:"flip"},factory:!1,$obj:!1,items:[],minimumDigits:0,constructor:function(e,t){this.factory=e,this.digit=t,this.$obj=this.createList(),t>0&&this.select(t),this.factory.$wrapper.append(this.$obj)},select:function(e){"undefined"==typeof e?e=this.digit:this.digit=e;{var t=this.$obj.find('[data-digit="'+e+'"]');this.$obj.find("."+this.classes.active).removeClass(this.classes.active),this.$obj.find("."+this.classes.before).removeClass(this.classes.before)}this.factory.countdown?t.is(":last-child")?this.$obj.find(":first-child").addClass(this.classes.before):t.next().addClass(this.classes.before):t.is(":first-child")?this.$obj.find(":last-child").addClass(this.classes.before):t.prev().addClass(this.classes.before),t.addClass(this.classes.active)},play:function(){this.$obj.addClass(this.factory.classes.play)},stop:function(){var e=this;setTimeout(function(){e.$obj.removeClass(e.factory.classes.play)},this.factory.timer.interval)},createList:function(){for(var t=e('<ul class="'+this.classes.flip+" "+(this.factory.running?this.factory.classes.play:"")+'" />'),n=0;10>n;n++){var i=e(['<li data-digit="'+n+'">','<a href="#">','<div class="up">','<div class="shadow"></div>','<div class="inn">'+n+"</div>","</div>",'<div class="down">','<div class="shadow"></div>','<div class="inn">'+n+"</div>","</div>","</a>","</li>"].join(""));this.items.push(i),t.append(i)}return t}})}(jQuery),/**
 * FlipClock.js
 *
 * @author     Justin Kimbrell
 * @copyright  2013 - Objective HTML, LLC
 * @licesnse   http://www.opensource.org/licenses/mit-license.php
 */
function(e){"use strict";String.prototype.ucfirst=function(){return this.substr(0,1).toUpperCase()+this.substr(1)},e.fn.FlipClock=function(t,n){return"object"==typeof t&&(n=t,t=0),new FlipClock(e(this),t,n)},e.fn.flipClock=function(t,n){return e.fn.FlipClock(t,n)}}(jQuery),/**
 * FlipClock.js
 *
 * @author     Justin Kimbrell
 * @copyright  2013 - Objective HTML, LLC
 * @licesnse   http://www.opensource.org/licenses/mit-license.php
 */
function(e){"use strict";FlipClock.Time=FlipClock.Base.extend({time:0,factory:!1,minimumDigits:0,constructor:function(e,t,n){this.base(n),this.factory=e,t&&(this.time=t)},convertDigitsToArray:function(e){var t=[];e=e.toString();for(var n=0;n<e.length;n++)e[n].match(/^\d*$/g)&&t.push(e[n]);return t},digit:function(e){var t=this.toString(),n=t.length;return t[n-e]?t[n-e]:!1},digitize:function(t){var n=[];if(e.each(t,function(e,t){t=t.toString(),1==t.length&&(t="0"+t);for(var i=0;i<t.length;i++)n.push(t.charAt(i))}),n.length>this.minimumDigits&&(this.minimumDigits=n.length),this.minimumDigits>n.length)for(var i=n.length;i<this.minimumDigits;i++)n.unshift("0");return n},getDayCounter:function(e){var t=[this.getDays(),this.getHours(!0),this.getMinutes(!0)];return e&&t.push(this.getSeconds(!0)),this.digitize(t)},getDays:function(e){var t=this.getTimeSeconds()/60/60/24;return e&&(t%=7),Math.floor(t)},getHourCounter:function(){var e=this.digitize([this.getHours(),this.getMinutes(!0),this.getSeconds(!0)]);return e},getHourly:function(){return this.getHourCounter()},getHours:function(e){var t=this.getTimeSeconds()/60/60;return e&&(t%=24),Math.floor(t)},getMilitaryTime:function(){var e=new Date,t=this.digitize([e.getHours(),e.getMinutes(),e.getSeconds()]);return t},getMinutes:function(e){var t=this.getTimeSeconds()/60;return e&&(t%=60),Math.floor(t)},getMinuteCounter:function(){var e=this.digitize([this.getMinutes(),this.getSeconds(!0)]);return e},getTimeSeconds:function(){return this.time instanceof Date?this.factory.countdown?((new Date).getTime()>this.time.getTime()&&this.factory.stop(),Math.max(this.time.getTime()/1e3-(new Date).getTime()/1e3,0)):(new Date).getTime()/1e3-this.time.getTime()/1e3:this.time},getSeconds:function(e){var t=this.getTimeSeconds();return e&&(60==t?t=0:t%=60),Math.ceil(t)},getTime:function(){var e=new Date,t=e.getHours(),n=this.digitize([t>12?t-12:0===t?12:t,e.getMinutes(),e.getSeconds()]);return n},getWeeks:function(){var e=this.getTimeSeconds()/60/60/24/7;return mod&&(e%=52),Math.floor(e)},removeLeadingZeros:function(t,n){var i=0,r=[];return e.each(n,function(e){t>e?i+=parseInt(n[e],10):r.push(n[e])}),0===i?r:n},addSeconds:function(e){this.time+=e},addSecond:function(){this.addSeconds(1)},subSeconds:function(e){this.time-=e},subSecond:function(){this.subSeconds(1)},toString:function(){return this.getTimeSeconds().toString()}})}(jQuery),/**
 * FlipClock.js
 *
 * @author     Justin Kimbrell
 * @copyright  2013 - Objective HTML, LLC
 * @licesnse   http://www.opensource.org/licenses/mit-license.php
 */
function(){"use strict";FlipClock.Timer=FlipClock.Base.extend({callbacks:{destroy:!1,create:!1,init:!1,interval:!1,start:!1,stop:!1,reset:!1},count:0,factory:!1,interval:1e3,animationRate:1e3,constructor:function(e,t){this.base(t),this.factory=e,this.callback(this.callbacks.init),this.callback(this.callbacks.create)},getElapsed:function(){return this.count*this.interval},getElapsedTime:function(){return new Date(this.time+this.getElapsed())},reset:function(e){clearInterval(this.timer),this.count=0,this._setInterval(e),this.callback(this.callbacks.reset)},start:function(e){this.factory.running=!0,this._createTimer(e),this.callback(this.callbacks.start)},stop:function(e){this.factory.running=!1,this._clearInterval(e),this.callback(this.callbacks.stop),this.callback(e)},_clearInterval:function(){clearInterval(this.timer)},_createTimer:function(e){this._setInterval(e)},_destroyTimer:function(e){this._clearInterval(),this.timer=!1,this.callback(e),this.callback(this.callbacks.destroy)},_interval:function(e){this.callback(this.callbacks.interval),this.callback(e),this.count++},_setInterval:function(e){var t=this;t._interval(e),t.timer=setInterval(function(){t._interval(e)},this.interval)}})}(jQuery),function(e){FlipClock.TwentyFourHourClockFace=FlipClock.Face.extend({constructor:function(e,t){e.countdown=!1,this.base(e,t)},build:function(t){var n=this,i=this.factory.$wrapper.find("ul");t=t?t:this.factory.time.time||this.factory.time.getMilitaryTime(),t.length>i.length&&e.each(t,function(e,t){n.factory.lists.push(n.createList(t))}),this.dividers.push(this.createDivider()),this.dividers.push(this.createDivider()),e(this.dividers[0]).insertBefore(this.factory.lists[this.factory.lists.length-2].$obj),e(this.dividers[1]).insertBefore(this.factory.lists[this.factory.lists.length-4].$obj),this._clearExcessDigits(),this.autoStart&&this.start()},flip:function(e,t){e=e?e:this.factory.time.getMilitaryTime(),this.base(e,t)},_clearExcessDigits:function(){for(var e=this.factory.lists[this.factory.lists.length-2],t=this.factory.lists[this.factory.lists.length-4],n=6;10>n;n++)e.$obj.find("li:last-child").remove(),t.$obj.find("li:last-child").remove()}})}(jQuery),function(e){FlipClock.CounterFace=FlipClock.Face.extend({autoStart:!1,minimumDigits:2,constructor:function(e,t){e.timer.interval=0,e.autoStart=!1,e.running=!0,e.increment=function(){e.countdown=!1,e.setTime(e.getTime().getTimeSeconds()+1)},e.decrement=function(){e.countdown=!0;var t=e.getTime().getTimeSeconds();t>0&&e.setTime(t-1)},e.setValue=function(t){e.setTime(t)},e.setCounter=function(t){e.setTime(t)},this.base(e,t)},increment:function(){},build:function(){var t=this,n=this.factory.$wrapper.find("ul"),i=[],r=this.factory.getTime().digitize([this.factory.getTime().time]);r.length>n.length&&e.each(r,function(e,n){var r=t.createList(n,{minimumDigits:t.minimumDigits});r.select(n),i.push(r)}),e.each(i,function(e,t){t.play()}),this.factory.lists=i},flip:function(e,t){e||(e=this.factory.getTime().digitize([this.factory.getTime().time])),this.base(e,t)},reset:function(){this.factory.time=new FlipClock.Time(this.factor,this.factory.original?Math.round(this.factory.original):0),this.flip()}})}(jQuery),function(e){FlipClock.DailyCounterFace=FlipClock.Face.extend({showSeconds:!0,constructor:function(e,t){this.base(e,t)},build:function(t,n){var i=this,r=this.factory.$wrapper.find("ul"),o=[],a=0;n=n?n:this.factory.time.getDayCounter(this.showSeconds),n.length>r.length&&e.each(n,function(e,t){o.push(i.createList(t))}),this.factory.lists=o,this.showSeconds?e(this.createDivider("Seconds")).insertBefore(this.factory.lists[this.factory.lists.length-2].$obj):a=2,e(this.createDivider("Minutes")).insertBefore(this.factory.lists[this.factory.lists.length-4+a].$obj),e(this.createDivider("Hours")).insertBefore(this.factory.lists[this.factory.lists.length-6+a].$obj),e(this.createDivider("Days",!0)).insertBefore(this.factory.lists[0].$obj),this._clearExcessDigits(),this.autoStart&&this.start()},flip:function(e,t){e||(e=this.factory.time.getDayCounter(this.showSeconds)),this.base(e,t)},_clearExcessDigits:function(){for(var e=this.factory.lists[this.factory.lists.length-2],t=this.factory.lists[this.factory.lists.length-4],n=6;10>n;n++)e.$obj.find("li:last-child").remove(),t.$obj.find("li:last-child").remove()}})}(jQuery),function(e){FlipClock.HourlyCounterFace=FlipClock.Face.extend({clearExcessDigits:!0,constructor:function(e,t){this.base(e,t)},build:function(t,n){var i=this,r=this.factory.$wrapper.find("ul"),o=[];n=n?n:this.factory.time.getHourCounter(),n.length>r.length&&e.each(n,function(e,t){o.push(i.createList(t))}),this.factory.lists=o,e(this.createDivider("Seconds")).insertBefore(this.factory.lists[this.factory.lists.length-2].$obj),e(this.createDivider("Minutes")).insertBefore(this.factory.lists[this.factory.lists.length-4].$obj),t||e(this.createDivider("Hours",!0)).insertBefore(this.factory.lists[0].$obj),this.clearExcessDigits&&this._clearExcessDigits(),this.autoStart&&this.start()},flip:function(e,t){e||(e=this.factory.time.getHourCounter()),this.base(e,t)},_clearExcessDigits:function(){for(var e=this.factory.lists[this.factory.lists.length-2],t=this.factory.lists[this.factory.lists.length-4],n=6;10>n;n++)e.$obj.find("li:last-child").remove(),t.$obj.find("li:last-child").remove()}})}(jQuery),function(){FlipClock.MinuteCounterFace=FlipClock.HourlyCounterFace.extend({clearExcessDigits:!1,constructor:function(e,t){this.base(e,t)},build:function(){this.base(!0,this.factory.time.getMinuteCounter())},flip:function(e,t){e||(e=this.factory.time.getMinuteCounter()),this.base(e,t)}})}(jQuery),function(e){FlipClock.TwelveHourClockFace=FlipClock.TwentyFourHourClockFace.extend({meridium:!1,meridiumText:"AM",build:function(t){t=t?t:this.factory.time.time?this.factory.time.time:this.factory.time.getTime(),this.base(t),this.meridiumText=this._isPM()?"PM":"AM",this.meridium=e(['<ul class="flip-clock-meridium">',"<li>",'<a href="#">'+this.meridiumText+"</a>","</li>","</ul>"].join("")),this.meridium.insertAfter(this.factory.lists[this.factory.lists.length-1].$obj)},flip:function(e,t){this.meridiumText!=this._getMeridium()&&(this.meridiumText=this._getMeridium(),this.meridium.find("a").html(this.meridiumText)),this.base(this.factory.time.getTime(),t)},_getMeridium:function(){return(new Date).getHours()>=12?"PM":"AM"},_isPM:function(){return"PM"==this._getMeridium()?!0:!1},_clearExcessDigits:function(){for(var e=this.factory.lists[this.factory.lists.length-2],t=this.factory.lists[this.factory.lists.length-4],n=6;10>n;n++)e.$obj.find("li:last-child").remove(),t.$obj.find("li:last-child").remove()}})}(jQuery),function(){FlipClock.Lang.Arabic={years:"\u0633\u0646\u0648\u0627\u062a",months:"\u0634\u0647\u0648\u0631",days:"\u0623\u064a\u0627\u0645",hours:"\u0633\u0627\u0639\u0627\u062a",minutes:"\u062f\u0642\u0627\u0626\u0642",seconds:"\u062b\u0648\u0627\u0646\u064a"},FlipClock.Lang.ar=FlipClock.Lang.Arabic,FlipClock.Lang["ar-ar"]=FlipClock.Lang.Arabic,FlipClock.Lang.arabic=FlipClock.Lang.Arabic}(jQuery),function(){FlipClock.Lang.Danish={years:"\xc5r",months:"M\xe5neder",days:"Dage",hours:"Timer",minutes:"Minutter",seconds:"Sekunder"},FlipClock.Lang.da=FlipClock.Lang.Danish,FlipClock.Lang["da-dk"]=FlipClock.Lang.Danish,FlipClock.Lang.danish=FlipClock.Lang.Danish}(jQuery),function(){FlipClock.Lang.German={years:"Jahre",months:"Monate",days:"Tage",hours:"Stunden",minutes:"Minuten",seconds:"Sekunden"},FlipClock.Lang.de=FlipClock.Lang.German,FlipClock.Lang["de-de"]=FlipClock.Lang.German,FlipClock.Lang.german=FlipClock.Lang.German}(jQuery),function(){FlipClock.Lang.English={years:"Years",months:"Months",days:"Days",hours:"Hours",minutes:"Minutes",seconds:"Seconds"},FlipClock.Lang.en=FlipClock.Lang.English,FlipClock.Lang["en-us"]=FlipClock.Lang.English,FlipClock.Lang.english=FlipClock.Lang.English}(jQuery),function(){FlipClock.Lang.Spanish={years:"A&#241;os",months:"Meses",days:"D&#205;as",hours:"Horas",minutes:"Minutos",seconds:"Segundo"},FlipClock.Lang.es=FlipClock.Lang.Spanish,FlipClock.Lang["es-es"]=FlipClock.Lang.Spanish,FlipClock.Lang.spanish=FlipClock.Lang.Spanish}(jQuery),function(){FlipClock.Lang.French={years:"Ans",months:"Mois",days:"Jours",hours:"Heures",minutes:"Minutes",seconds:"Secondes"},FlipClock.Lang.fr=FlipClock.Lang.French,FlipClock.Lang["fr-ca"]=FlipClock.Lang.French,FlipClock.Lang.french=FlipClock.Lang.French}(jQuery),function(){FlipClock.Lang.Italian={years:"Anni",months:"Mesi",days:"Giorni",hours:"Ore",minutes:"Minuti",seconds:"Secondi"},FlipClock.Lang.it=FlipClock.Lang.Italian,FlipClock.Lang["it-it"]=FlipClock.Lang.Italian,FlipClock.Lang.italian=FlipClock.Lang.Italian}(jQuery),function(){FlipClock.Lang.Latvian={years:"Gadi",months:"M\u0113ne\u0161i",days:"Dienas",hours:"Stundas",minutes:"Min\u016btes",seconds:"Sekundes"},FlipClock.Lang.lv=FlipClock.Lang.Latvian,FlipClock.Lang["lv-lv"]=FlipClock.Lang.Latvian,FlipClock.Lang.latvian=FlipClock.Lang.Latvian}(jQuery),function(){FlipClock.Lang.Dutch={years:"Jaren",months:"Maanden",days:"Dagen",hours:"Uren",minutes:"Minuten",seconds:"Seconden"},FlipClock.Lang.nl=FlipClock.Lang.Dutch,FlipClock.Lang["nl-be"]=FlipClock.Lang.Dutch,FlipClock.Lang.dutch=FlipClock.Lang.Dutch}(jQuery),function(){FlipClock.Lang.Russian={years:"\u043b\u0435\u0442",months:"\u043c\u0435\u0441\u044f\u0446\u0435\u0432",days:"\u0434\u043d\u0435\u0439",hours:"\u0447\u0430\u0441\u043e\u0432",minutes:"\u043c\u0438\u043d\u0443\u0442",seconds:"\u0441\u0435\u043a\u0443\u043d\u0434"},FlipClock.Lang.ru=FlipClock.Lang.Russian,FlipClock.Lang["ru-ru"]=FlipClock.Lang.Russian,FlipClock.Lang.russian=FlipClock.Lang.Russian}(jQuery),function(){FlipClock.Lang.Swedish={years:"\xc5r",months:"M\xe5nader",days:"Dagar",hours:"Timmar",minutes:"Minuter",seconds:"Sekunder"},FlipClock.Lang.sv=FlipClock.Lang.Danish,FlipClock.Lang["sv-se"]=FlipClock.Lang.Danish,FlipClock.Lang.swedish=FlipClock.Lang.Danish}(jQuery);