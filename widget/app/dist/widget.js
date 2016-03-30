window.addEventListener('load', function(){
window.DGW = function () {
    if (document.getElementById('dgl-gamified-widget')) {
        var key = document.getElementById('dgl-gamified-widget').getAttribute('data-key');
        if (key) {
            return {
                templates: {},
                main: {
                    methods: {},
                    elements: {
                        pages: {}
                    },
                    currentState: 'earn',
                    cache: {
                        drawsList: [],
                        drawsEntries: []
                    }
                },
                side: {
                    methods: {},
                    elements: {}
                },
                global: {
                    authorized: false,
                    launched: false,
                    api: {
                        apiKey: key,
                        requests: {}
                    },
                    elements: {},
                    methods: {}
                },
                states: {},
                helpers: {}
            };
        }
    }
    console.warn('No script ID or data-key attribute provided');
}();

if (!DGW) return;
/**
 * easyXDM
 * http://easyxdm.net/
 * Copyright(c) 2009-2011, Øyvind Sean Kinsey, oyvind@kinsey.no.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
(function(N,d,p,K,k,H){var b=this;var n=Math.floor(Math.random()*10000);var q=Function.prototype;var Q=/^((http.?:)\/\/([^:\/\s]+)(:\d+)*)/;var R=/[\-\w]+\/\.\.\//;var F=/([^:])\/\//g;var I="";var o={};var M=N.easyXDM;var U="easyXDM_";var E;var y=false;var i;var h;function C(X,Z){var Y=typeof X[Z];return Y=="function"||(!!(Y=="object"&&X[Z]))||Y=="unknown"}function u(X,Y){return !!(typeof(X[Y])=="object"&&X[Y])}function r(X){return Object.prototype.toString.call(X)==="[object Array]"}function c(){var Z="Shockwave Flash",ad="application/x-shockwave-flash";if(!t(navigator.plugins)&&typeof navigator.plugins[Z]=="object"){var ab=navigator.plugins[Z].description;if(ab&&!t(navigator.mimeTypes)&&navigator.mimeTypes[ad]&&navigator.mimeTypes[ad].enabledPlugin){i=ab.match(/\d+/g)}}if(!i){var Y;try{Y=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");i=Array.prototype.slice.call(Y.GetVariable("$version").match(/(\d+),(\d+),(\d+),(\d+)/),1);Y=null}catch(ac){}}if(!i){return false}var X=parseInt(i[0],10),aa=parseInt(i[1],10);h=X>9&&aa>0;return true}var v,x;if(C(N,"addEventListener")){v=function(Z,X,Y){Z.addEventListener(X,Y,false)};x=function(Z,X,Y){Z.removeEventListener(X,Y,false)}}else{if(C(N,"attachEvent")){v=function(X,Z,Y){X.attachEvent("on"+Z,Y)};x=function(X,Z,Y){X.detachEvent("on"+Z,Y)}}else{throw new Error("Browser not supported")}}var W=false,J=[],L;if("readyState" in d){L=d.readyState;W=L=="complete"||(~navigator.userAgent.indexOf("AppleWebKit/")&&(L=="loaded"||L=="interactive"))}else{W=!!d.body}function s(){if(W){return}W=true;for(var X=0;X<J.length;X++){J[X]()}J.length=0}if(!W){if(C(N,"addEventListener")){v(d,"DOMContentLoaded",s)}else{v(d,"readystatechange",function(){if(d.readyState=="complete"){s()}});if(d.documentElement.doScroll&&N===top){var g=function(){if(W){return}try{d.documentElement.doScroll("left")}catch(X){K(g,1);return}s()};g()}}v(N,"load",s)}function G(Y,X){if(W){Y.call(X);return}J.push(function(){Y.call(X)})}function m(){var Z=parent;if(I!==""){for(var X=0,Y=I.split(".");X<Y.length;X++){Z=Z[Y[X]]}}return Z.easyXDM}function e(X){N.easyXDM=M;I=X;if(I){U="easyXDM_"+I.replace(".","_")+"_"}return o}function z(X){return X.match(Q)[3]}function f(X){return X.match(Q)[4]||""}function j(Z){var X=Z.toLowerCase().match(Q);var aa=X[2],ab=X[3],Y=X[4]||"";if((aa=="http:"&&Y==":80")||(aa=="https:"&&Y==":443")){Y=""}return aa+"//"+ab+Y}function B(X){X=X.replace(F,"$1/");if(!X.match(/^(http||https):\/\//)){var Y=(X.substring(0,1)==="/")?"":p.pathname;if(Y.substring(Y.length-1)!=="/"){Y=Y.substring(0,Y.lastIndexOf("/")+1)}X=p.protocol+"//"+p.host+Y+X}while(R.test(X)){X=X.replace(R,"")}return X}function P(X,aa){var ac="",Z=X.indexOf("#");if(Z!==-1){ac=X.substring(Z);X=X.substring(0,Z)}var ab=[];for(var Y in aa){if(aa.hasOwnProperty(Y)){ab.push(Y+"="+H(aa[Y]))}}return X+(y?"#":(X.indexOf("?")==-1?"?":"&"))+ab.join("&")+ac}var S=(function(X){X=X.substring(1).split("&");var Z={},aa,Y=X.length;while(Y--){aa=X[Y].split("=");Z[aa[0]]=k(aa[1])}return Z}(/xdm_e=/.test(p.search)?p.search:p.hash));function t(X){return typeof X==="undefined"}var O=function(){var Y={};var Z={a:[1,2,3]},X='{"a":[1,2,3]}';if(typeof JSON!="undefined"&&typeof JSON.stringify==="function"&&JSON.stringify(Z).replace((/\s/g),"")===X){return JSON}if(Object.toJSON){if(Object.toJSON(Z).replace((/\s/g),"")===X){Y.stringify=Object.toJSON}}if(typeof String.prototype.evalJSON==="function"){Z=X.evalJSON();if(Z.a&&Z.a.length===3&&Z.a[2]===3){Y.parse=function(aa){return aa.evalJSON()}}}if(Y.stringify&&Y.parse){O=function(){return Y};return Y}return null};function T(X,Y,Z){var ab;for(var aa in Y){if(Y.hasOwnProperty(aa)){if(aa in X){ab=Y[aa];if(typeof ab==="object"){T(X[aa],ab,Z)}else{if(!Z){X[aa]=Y[aa]}}}else{X[aa]=Y[aa]}}}return X}function a(){var Y=d.body.appendChild(d.createElement("form")),X=Y.appendChild(d.createElement("input"));X.name=U+"TEST"+n;E=X!==Y.elements[X.name];d.body.removeChild(Y)}function A(Y){if(t(E)){a()}var ac;if(E){ac=d.createElement('<iframe name="'+Y.props.name+'"/>')}else{ac=d.createElement("IFRAME");ac.name=Y.props.name}ac.id=ac.name=Y.props.name;delete Y.props.name;if(typeof Y.container=="string"){Y.container=d.getElementById(Y.container)}if(!Y.container){T(ac.style,{position:"absolute",top:"-2000px",left:"0px"});Y.container=d.body}var ab=Y.props.src;Y.props.src="javascript:false";T(ac,Y.props);ac.border=ac.frameBorder=0;ac.allowTransparency=true;Y.container.appendChild(ac);if(Y.onLoad){v(ac,"load",Y.onLoad)}if(Y.usePost){var aa=Y.container.appendChild(d.createElement("form")),X;aa.target=ac.name;aa.action=ab;aa.method="POST";if(typeof(Y.usePost)==="object"){for(var Z in Y.usePost){if(Y.usePost.hasOwnProperty(Z)){if(E){X=d.createElement('<input name="'+Z+'"/>')}else{X=d.createElement("INPUT");X.name=Z}X.value=Y.usePost[Z];aa.appendChild(X)}}}aa.submit();aa.parentNode.removeChild(aa)}else{ac.src=ab}Y.props.src=ab;return ac}function V(aa,Z){if(typeof aa=="string"){aa=[aa]}var Y,X=aa.length;while(X--){Y=aa[X];Y=new RegExp(Y.substr(0,1)=="^"?Y:("^"+Y.replace(/(\*)/g,".$1").replace(/\?/g,".")+"$"));if(Y.test(Z)){return true}}return false}function l(Z){var ae=Z.protocol,Y;Z.isHost=Z.isHost||t(S.xdm_p);y=Z.hash||false;if(!Z.props){Z.props={}}if(!Z.isHost){Z.channel=S.xdm_c.replace(/["'<>\\]/g,"");Z.secret=S.xdm_s;Z.remote=S.xdm_e.replace(/["'<>\\]/g,"");ae=S.xdm_p;if(Z.acl&&!V(Z.acl,Z.remote)){throw new Error("Access denied for "+Z.remote)}}else{Z.remote=B(Z.remote);Z.channel=Z.channel||"default"+n++;Z.secret=Math.random().toString(16).substring(2);if(t(ae)){if(j(p.href)==j(Z.remote)){ae="4"}else{if(C(N,"postMessage")||C(d,"postMessage")){ae="1"}else{if(Z.swf&&C(N,"ActiveXObject")&&c()){ae="6"}else{if(navigator.product==="Gecko"&&"frameElement" in N&&navigator.userAgent.indexOf("WebKit")==-1){ae="5"}else{if(Z.remoteHelper){ae="2"}else{ae="0"}}}}}}}Z.protocol=ae;switch(ae){case"0":T(Z,{interval:100,delay:2000,useResize:true,useParent:false,usePolling:false},true);if(Z.isHost){if(!Z.local){var ac=p.protocol+"//"+p.host,X=d.body.getElementsByTagName("img"),ad;var aa=X.length;while(aa--){ad=X[aa];if(ad.src.substring(0,ac.length)===ac){Z.local=ad.src;break}}if(!Z.local){Z.local=N}}var ab={xdm_c:Z.channel,xdm_p:0};if(Z.local===N){Z.usePolling=true;Z.useParent=true;Z.local=p.protocol+"//"+p.host+p.pathname+p.search;ab.xdm_e=Z.local;ab.xdm_pa=1}else{ab.xdm_e=B(Z.local)}if(Z.container){Z.useResize=false;ab.xdm_po=1}Z.remote=P(Z.remote,ab)}else{T(Z,{channel:S.xdm_c,remote:S.xdm_e,useParent:!t(S.xdm_pa),usePolling:!t(S.xdm_po),useResize:Z.useParent?false:Z.useResize})}Y=[new o.stack.HashTransport(Z),new o.stack.ReliableBehavior({}),new o.stack.QueueBehavior({encode:true,maxLength:4000-Z.remote.length}),new o.stack.VerifyBehavior({initiate:Z.isHost})];break;case"1":Y=[new o.stack.PostMessageTransport(Z)];break;case"2":if(Z.isHost){Z.remoteHelper=B(Z.remoteHelper)}Y=[new o.stack.NameTransport(Z),new o.stack.QueueBehavior(),new o.stack.VerifyBehavior({initiate:Z.isHost})];break;case"3":Y=[new o.stack.NixTransport(Z)];break;case"4":Y=[new o.stack.SameOriginTransport(Z)];break;case"5":Y=[new o.stack.FrameElementTransport(Z)];break;case"6":if(!i){c()}Y=[new o.stack.FlashTransport(Z)];break}Y.push(new o.stack.QueueBehavior({lazy:Z.lazy,remove:true}));return Y}function D(aa){var ab,Z={incoming:function(ad,ac){this.up.incoming(ad,ac)},outgoing:function(ac,ad){this.down.outgoing(ac,ad)},callback:function(ac){this.up.callback(ac)},init:function(){this.down.init()},destroy:function(){this.down.destroy()}};for(var Y=0,X=aa.length;Y<X;Y++){ab=aa[Y];T(ab,Z,true);if(Y!==0){ab.down=aa[Y-1]}if(Y!==X-1){ab.up=aa[Y+1]}}return ab}function w(X){X.up.down=X.down;X.down.up=X.up;X.up=X.down=null}T(o,{version:"2.4.19.3",query:S,stack:{},apply:T,getJSONObject:O,whenReady:G,noConflict:e});o.DomHelper={on:v,un:x,requiresJSON:function(X){if(!u(N,"JSON")){d.write('<script type="text/javascript" src="'+X+'"><\/script>')}}};(function(){var X={};o.Fn={set:function(Y,Z){X[Y]=Z},get:function(Z,Y){if(!X.hasOwnProperty(Z)){return}var aa=X[Z];if(Y){delete X[Z]}return aa}}}());o.Socket=function(Y){var X=D(l(Y).concat([{incoming:function(ab,aa){Y.onMessage(ab,aa)},callback:function(aa){if(Y.onReady){Y.onReady(aa)}}}])),Z=j(Y.remote);this.origin=j(Y.remote);this.destroy=function(){X.destroy()};this.postMessage=function(aa){X.outgoing(aa,Z)};X.init()};o.Rpc=function(Z,Y){if(Y.local){for(var ab in Y.local){if(Y.local.hasOwnProperty(ab)){var aa=Y.local[ab];if(typeof aa==="function"){Y.local[ab]={method:aa}}}}}var X=D(l(Z).concat([new o.stack.RpcBehavior(this,Y),{callback:function(ac){if(Z.onReady){Z.onReady(ac)}}}]));this.origin=j(Z.remote);this.destroy=function(){X.destroy()};X.init()};o.stack.SameOriginTransport=function(Y){var Z,ab,aa,X;return(Z={outgoing:function(ad,ae,ac){aa(ad);if(ac){ac()}},destroy:function(){if(ab){ab.parentNode.removeChild(ab);ab=null}},onDOMReady:function(){X=j(Y.remote);if(Y.isHost){T(Y.props,{src:P(Y.remote,{xdm_e:p.protocol+"//"+p.host+p.pathname,xdm_c:Y.channel,xdm_p:4}),name:U+Y.channel+"_provider"});ab=A(Y);o.Fn.set(Y.channel,function(ac){aa=ac;K(function(){Z.up.callback(true)},0);return function(ad){Z.up.incoming(ad,X)}})}else{aa=m().Fn.get(Y.channel,true)(function(ac){Z.up.incoming(ac,X)});K(function(){Z.up.callback(true)},0)}},init:function(){G(Z.onDOMReady,Z)}})};o.stack.FlashTransport=function(aa){var ac,X,ab,ad,Y,ae;function af(ah,ag){K(function(){ac.up.incoming(ah,ad)},0)}function Z(ah){var ag=aa.swf+"?host="+aa.isHost;var aj="easyXDM_swf_"+Math.floor(Math.random()*10000);o.Fn.set("flash_loaded"+ah.replace(/[\-.]/g,"_"),function(){o.stack.FlashTransport[ah].swf=Y=ae.firstChild;var ak=o.stack.FlashTransport[ah].queue;for(var al=0;al<ak.length;al++){ak[al]()}ak.length=0});if(aa.swfContainer){ae=(typeof aa.swfContainer=="string")?d.getElementById(aa.swfContainer):aa.swfContainer}else{ae=d.createElement("div");T(ae.style,h&&aa.swfNoThrottle?{height:"20px",width:"20px",position:"fixed",right:0,top:0}:{height:"1px",width:"1px",position:"absolute",overflow:"hidden",right:0,top:0});d.body.appendChild(ae)}var ai="callback=flash_loaded"+H(ah.replace(/[\-.]/g,"_"))+"&proto="+b.location.protocol+"&domain="+H(z(b.location.href))+"&port="+H(f(b.location.href))+"&ns="+H(I);ae.innerHTML="<object height='20' width='20' type='application/x-shockwave-flash' id='"+aj+"' data='"+ag+"'><param name='allowScriptAccess' value='always'></param><param name='wmode' value='transparent'><param name='movie' value='"+ag+"'></param><param name='flashvars' value='"+ai+"'></param><embed type='application/x-shockwave-flash' FlashVars='"+ai+"' allowScriptAccess='always' wmode='transparent' src='"+ag+"' height='1' width='1'></embed></object>"}return(ac={outgoing:function(ah,ai,ag){Y.postMessage(aa.channel,ah.toString());if(ag){ag()}},destroy:function(){try{Y.destroyChannel(aa.channel)}catch(ag){}Y=null;if(X){X.parentNode.removeChild(X);X=null}},onDOMReady:function(){ad=aa.remote;o.Fn.set("flash_"+aa.channel+"_init",function(){K(function(){ac.up.callback(true)})});o.Fn.set("flash_"+aa.channel+"_onMessage",af);aa.swf=B(aa.swf);var ah=z(aa.swf);var ag=function(){o.stack.FlashTransport[ah].init=true;Y=o.stack.FlashTransport[ah].swf;Y.createChannel(aa.channel,aa.secret,j(aa.remote),aa.isHost);if(aa.isHost){if(h&&aa.swfNoThrottle){T(aa.props,{position:"fixed",right:0,top:0,height:"20px",width:"20px"})}T(aa.props,{src:P(aa.remote,{xdm_e:j(p.href),xdm_c:aa.channel,xdm_p:6,xdm_s:aa.secret}),name:U+aa.channel+"_provider"});X=A(aa)}};if(o.stack.FlashTransport[ah]&&o.stack.FlashTransport[ah].init){ag()}else{if(!o.stack.FlashTransport[ah]){o.stack.FlashTransport[ah]={queue:[ag]};Z(ah)}else{o.stack.FlashTransport[ah].queue.push(ag)}}},init:function(){G(ac.onDOMReady,ac)}})};o.stack.PostMessageTransport=function(aa){var ac,ad,Y,Z;function X(ae){if(ae.origin){return j(ae.origin)}if(ae.uri){return j(ae.uri)}if(ae.domain){return p.protocol+"//"+ae.domain}throw"Unable to retrieve the origin of the event"}function ab(af){var ae=X(af);if(ae==Z&&af.data.substring(0,aa.channel.length+1)==aa.channel+" "){ac.up.incoming(af.data.substring(aa.channel.length+1),ae)}}return(ac={outgoing:function(af,ag,ae){Y.postMessage(aa.channel+" "+af,ag||Z);if(ae){ae()}},destroy:function(){x(N,"message",ab);if(ad){Y=null;ad.parentNode.removeChild(ad);ad=null}},onDOMReady:function(){Z=j(aa.remote);if(aa.isHost){var ae=function(af){if(af.data==aa.channel+"-ready"){Y=("postMessage" in ad.contentWindow)?ad.contentWindow:ad.contentWindow.document;x(N,"message",ae);v(N,"message",ab);K(function(){ac.up.callback(true)},0)}};v(N,"message",ae);T(aa.props,{src:P(aa.remote,{xdm_e:j(p.href),xdm_c:aa.channel,xdm_p:1}),name:U+aa.channel+"_provider"});ad=A(aa)}else{v(N,"message",ab);Y=("postMessage" in N.parent)?N.parent:N.parent.document;Y.postMessage(aa.channel+"-ready",Z);K(function(){ac.up.callback(true)},0)}},init:function(){G(ac.onDOMReady,ac)}})};o.stack.FrameElementTransport=function(Y){var Z,ab,aa,X;return(Z={outgoing:function(ad,ae,ac){aa.call(this,ad);if(ac){ac()}},destroy:function(){if(ab){ab.parentNode.removeChild(ab);ab=null}},onDOMReady:function(){X=j(Y.remote);if(Y.isHost){T(Y.props,{src:P(Y.remote,{xdm_e:j(p.href),xdm_c:Y.channel,xdm_p:5}),name:U+Y.channel+"_provider"});ab=A(Y);ab.fn=function(ac){delete ab.fn;aa=ac;K(function(){Z.up.callback(true)},0);return function(ad){Z.up.incoming(ad,X)}}}else{if(d.referrer&&j(d.referrer)!=S.xdm_e){N.top.location=S.xdm_e}aa=N.frameElement.fn(function(ac){Z.up.incoming(ac,X)});Z.up.callback(true)}},init:function(){G(Z.onDOMReady,Z)}})};o.stack.NameTransport=function(ab){var ac;var ae,ai,aa,ag,ah,Y,X;function af(al){var ak=ab.remoteHelper+(ae?"#_3":"#_2")+ab.channel;ai.contentWindow.sendMessage(al,ak)}function ad(){if(ae){if(++ag===2||!ae){ac.up.callback(true)}}else{af("ready");ac.up.callback(true)}}function aj(ak){ac.up.incoming(ak,Y)}function Z(){if(ah){K(function(){ah(true)},0)}}return(ac={outgoing:function(al,am,ak){ah=ak;af(al)},destroy:function(){ai.parentNode.removeChild(ai);ai=null;if(ae){aa.parentNode.removeChild(aa);aa=null}},onDOMReady:function(){ae=ab.isHost;ag=0;Y=j(ab.remote);ab.local=B(ab.local);if(ae){o.Fn.set(ab.channel,function(al){if(ae&&al==="ready"){o.Fn.set(ab.channel,aj);ad()}});X=P(ab.remote,{xdm_e:ab.local,xdm_c:ab.channel,xdm_p:2});T(ab.props,{src:X+"#"+ab.channel,name:U+ab.channel+"_provider"});aa=A(ab)}else{ab.remoteHelper=ab.remote;o.Fn.set(ab.channel,aj)}var ak=function(){var al=ai||this;x(al,"load",ak);o.Fn.set(ab.channel+"_load",Z);(function am(){if(typeof al.contentWindow.sendMessage=="function"){ad()}else{K(am,50)}}())};ai=A({props:{src:ab.local+"#_4"+ab.channel},onLoad:ak})},init:function(){G(ac.onDOMReady,ac)}})};o.stack.HashTransport=function(Z){var ac;var ah=this,af,aa,X,ad,am,ab,al;var ag,Y;function ak(ao){if(!al){return}var an=Z.remote+"#"+(am++)+"_"+ao;((af||!ag)?al.contentWindow:al).location=an}function ae(an){ad=an;ac.up.incoming(ad.substring(ad.indexOf("_")+1),Y)}function aj(){if(!ab){return}var an=ab.location.href,ap="",ao=an.indexOf("#");if(ao!=-1){ap=an.substring(ao)}if(ap&&ap!=ad){ae(ap)}}function ai(){aa=setInterval(aj,X)}return(ac={outgoing:function(an,ao){ak(an)},destroy:function(){N.clearInterval(aa);if(af||!ag){al.parentNode.removeChild(al)}al=null},onDOMReady:function(){af=Z.isHost;X=Z.interval;ad="#"+Z.channel;am=0;ag=Z.useParent;Y=j(Z.remote);if(af){T(Z.props,{src:Z.remote,name:U+Z.channel+"_provider"});if(ag){Z.onLoad=function(){ab=N;ai();ac.up.callback(true)}}else{var ap=0,an=Z.delay/50;(function ao(){if(++ap>an){throw new Error("Unable to reference listenerwindow")}try{ab=al.contentWindow.frames[U+Z.channel+"_consumer"]}catch(aq){}if(ab){ai();ac.up.callback(true)}else{K(ao,50)}}())}al=A(Z)}else{ab=N;ai();if(ag){al=parent;ac.up.callback(true)}else{T(Z,{props:{src:Z.remote+"#"+Z.channel+new Date(),name:U+Z.channel+"_consumer"},onLoad:function(){ac.up.callback(true)}});al=A(Z)}}},init:function(){G(ac.onDOMReady,ac)}})};o.stack.ReliableBehavior=function(Y){var aa,ac;var ab=0,X=0,Z="";return(aa={incoming:function(af,ad){var ae=af.indexOf("_"),ag=af.substring(0,ae).split(",");af=af.substring(ae+1);if(ag[0]==ab){Z="";if(ac){ac(true)}}if(af.length>0){aa.down.outgoing(ag[1]+","+ab+"_"+Z,ad);if(X!=ag[1]){X=ag[1];aa.up.incoming(af,ad)}}},outgoing:function(af,ad,ae){Z=af;ac=ae;aa.down.outgoing(X+","+(++ab)+"_"+af,ad)}})};o.stack.QueueBehavior=function(Z){var ac,ad=[],ag=true,aa="",af,X=0,Y=false,ab=false;function ae(){if(Z.remove&&ad.length===0){w(ac);return}if(ag||ad.length===0||af){return}ag=true;var ah=ad.shift();ac.down.outgoing(ah.data,ah.origin,function(ai){ag=false;if(ah.callback){K(function(){ah.callback(ai)},0)}ae()})}return(ac={init:function(){if(t(Z)){Z={}}if(Z.maxLength){X=Z.maxLength;ab=true}if(Z.lazy){Y=true}else{ac.down.init()}},callback:function(ai){ag=false;var ah=ac.up;ae();ah.callback(ai)},incoming:function(ak,ai){if(ab){var aj=ak.indexOf("_"),ah=parseInt(ak.substring(0,aj),10);aa+=ak.substring(aj+1);if(ah===0){if(Z.encode){aa=k(aa)}ac.up.incoming(aa,ai);aa=""}}else{ac.up.incoming(ak,ai)}},outgoing:function(al,ai,ak){if(Z.encode){al=H(al)}var ah=[],aj;if(ab){while(al.length!==0){aj=al.substring(0,X);al=al.substring(aj.length);ah.push(aj)}while((aj=ah.shift())){ad.push({data:ah.length+"_"+aj,origin:ai,callback:ah.length===0?ak:null})}}else{ad.push({data:al,origin:ai,callback:ak})}if(Y){ac.down.init()}else{ae()}},destroy:function(){af=true;ac.down.destroy()}})};o.stack.VerifyBehavior=function(ab){var ac,aa,Y,Z=false;function X(){aa=Math.random().toString(16).substring(2);ac.down.outgoing(aa)}return(ac={incoming:function(af,ad){var ae=af.indexOf("_");if(ae===-1){if(af===aa){ac.up.callback(true)}else{if(!Y){Y=af;if(!ab.initiate){X()}ac.down.outgoing(af)}}}else{if(af.substring(0,ae)===Y){ac.up.incoming(af.substring(ae+1),ad)}}},outgoing:function(af,ad,ae){ac.down.outgoing(aa+"_"+af,ad,ae)},callback:function(ad){if(ab.initiate){X()}}})};o.stack.RpcBehavior=function(ad,Y){var aa,af=Y.serializer||O();var ae=0,ac={};function X(ag){ag.jsonrpc="2.0";aa.down.outgoing(af.stringify(ag))}function ab(ag,ai){var ah=Array.prototype.slice;return function(){var aj=arguments.length,al,ak={method:ai};if(aj>0&&typeof arguments[aj-1]==="function"){if(aj>1&&typeof arguments[aj-2]==="function"){al={success:arguments[aj-2],error:arguments[aj-1]};ak.params=ah.call(arguments,0,aj-2)}else{al={success:arguments[aj-1]};ak.params=ah.call(arguments,0,aj-1)}ac[""+(++ae)]=al;ak.id=ae}else{ak.params=ah.call(arguments,0)}if(ag.namedParams&&ak.params.length===1){ak.params=ak.params[0]}X(ak)}}function Z(an,am,ai,al){if(!ai){if(am){X({id:am,error:{code:-32601,message:"Procedure not found."}})}return}var ak,ah;if(am){ak=function(ao){ak=q;X({id:am,result:ao})};ah=function(ao,ap){ah=q;var aq={id:am,error:{code:-32099,message:ao}};if(ap){aq.error.data=ap}X(aq)}}else{ak=ah=q}if(!r(al)){al=[al]}try{var ag=ai.method.apply(ai.scope,al.concat([ak,ah]));if(!t(ag)){ak(ag)}}catch(aj){ah(aj.message)}}return(aa={incoming:function(ah,ag){var ai=af.parse(ah);if(ai.method){if(Y.handle){Y.handle(ai,X)}else{Z(ai.method,ai.id,Y.local[ai.method],ai.params)}}else{var aj=ac[ai.id];if(ai.error){if(aj.error){aj.error(ai.error)}}else{if(aj.success){aj.success(ai.result)}}delete ac[ai.id]}},init:function(){if(Y.remote){for(var ag in Y.remote){if(Y.remote.hasOwnProperty(ag)){ad[ag]=ab(Y.remote[ag],ag)}}}aa.down.init()},destroy:function(){for(var ag in Y.remote){if(Y.remote.hasOwnProperty(ag)&&ad.hasOwnProperty(ag)){delete ad[ag]}}aa.down.destroy()}})};b.easyXDM=o})(window,document,location,window.setTimeout,decodeURIComponent,encodeURIComponent);
/**
* Vanilla Slider
* A simple slider made with pure Javascript
*
* @version 0.1
* @author Guilherme Santiago - http://guilherme.sexy
* @repo http://github.com/gsantiago/vanilla-slider
*/
(function (window, document) {
  'use strict';


  /**
  * Default options
  */
  var DEFAULTS = {
    visibles: 1,
    direction: 'horizontal',
    controlPrev: '',
    controlNext: '',
    justify: true,
    steps: 1,

    // TO IMPLEMENT:
    dots: '',
    touch: true,
    animation: 'slide',
    autoPlay: 1000,
    infinite: true
  };


  /**
  * Utils
  */
  var utils = {

    // Returns true if 'obj' is a node element
    isDOM: function (o) {
      return (
        typeof HTMLElement === 'object' ? o instanceof HTMLElement :
        o && typeof o === 'object' && o !== null && o.nodeType === 1 && typeof o.nodeName === 'string'
      );
    },

    // Merge two objects. Similar to $.extends from jQuery
    merge: function (obj1, obj2) {
      var result = {};
      for (var prop in obj1) {
        if (obj2.hasOwnProperty(prop)) {
          result[prop] = obj2[prop];
        } else {
          result[prop] = obj1[prop];
        }
      }

      return result;
    },

    // A simple iterator for collections
    each: function (group, callback) {
      for (var i = 0, max = group.length; i < max; i += 1) {
        callback.call(group[i], i);
      }
    }
  }


  /**
  * Constructor for the slider
  *
  * @class Slider
  * @constructor
  * @param {String | Node Element} Selector for the slider's container
  * @param {Object} Options
  */
  function Slider(element, options) {
    if (!(this instanceof Slider)) return new Slider(element, options);

    if (utils.isDOM(element)) {
      this.container = element;
    } else {
      this.container = document.querySelector(element);
    }

    this.settings = utils.merge(DEFAULTS, options);

    this.slider = this.container.children[0];
    this.items = this.slider.children;

    this.containerWidth = this.container.offsetWidth;
    this.containerHeight = this.container.offsetHeight;

    this.itemWidth = this.items[0].offsetWidth;
    this.itemHeight = this.items[0].offsetHeight;
    this.itemMargin = 0;

    if (this.settings.direction === 'vertical') {
      this.containerDimension = this.containerHeight;
      this.itemDimension = this.itemHeight;
    } else {
      this.containerDimension = this.containerWidth;
      this.itemDimension = this.itemWidth;
    }

    // Justify the margins acording to the number of items to show (visibles)
    if (this.settings.visibles > 1 && this.settings.justify) {
      this.justifyItems();
    }

    if (this.settings.controlNext || this.settings.controlPrev) {
      this.addControls(this.settings.controlNext, this.settings.controlPrev, this.settings.steps);
    }
  }

  // An alias for prototype
  Slider.fn = Slider.prototype;


  /*
  * Justify the margins between the items acording to the number
  * of items to show (the visibles), and the direction (vertical or horizontal)
  *
  * @method justifyItems
  */
  Slider.fn.justifyItems = function () {

    var visibles = this.settings.visibles,
        items = this.items,
        direction = this.settings.direction,
        margin;

    margin = (this.containerDimension - (this.itemDimension * visibles)) / (visibles - 1);
    margin = Math.ceil(margin);
    this.itemMargin = margin;

    utils.each(items, function () {
      this.style[direction === 'vertical' ? 'marginBottom' : 'marginRight'] = margin + 'px';
    });
  };


  /**
  * Static method to return the max or min position for the Slider
  *
  * @method getLimit
  * @param {Object} The instance of slider
  * @param {String} The position ('max' or 'min')
  */
  Slider.getLimit = function (instance, pos) {

    var settings = instance.settings,
        direction = settings.direction,
        itemDimension = instance.itemDimension,
        itemMargin = instance.itemMargin,
        visibles = settings.visibles,
        items = instance.items;

    if (direction === 'vertical' && pos === 'max') {
      return 0;
    }

    if (direction === 'vertical' && pos === 'min') {
      return (((itemDimension + itemMargin) * (items.length - visibles + 1)) - itemMargin) * -1;
    }

    if (direction === 'horizontal' && pos === 'max') {
      return ((itemDimension + itemMargin) * (items.length - visibles + 1)) - itemMargin;
    }

    if (direction === 'horizontal' && pos === 'min') {
      return 0;
    }

  };


  /**
  * Check if the Slider is at its limit
  *
  * @method isAtLimit
  */
  Slider.fn.isAtLimit = function (nextPos) {
    var max = Slider.getLimit(this, 'max'),
        min = Slider.getLimit(this, 'min');

    if (nextPos < min) {
      return true;
    }

    if (nextPos > max) {
      return true;
    }

    return false;
  };


  /**
  * Return the next position for the slider based in the number of steps
  *
  * @method getNextPos
  */
  Slider.fn.getNextPos = function (steps) {
    var currentPos,
        direction,
        nextPos;

    direction = this.settings.direction;

    currentPos = this.slider.style[direction === 'vertical' ? 'top' : 'right'];

    if (currentPos) {
      currentPos = Math.floor(parseInt(currentPos));
    }

    if (direction === 'vertical') {
      nextPos = currentPos - (((this.itemDimension + this.itemMargin)) * steps);
    } else {
      nextPos = currentPos + (((this.itemDimension + this.itemMargin)) * steps)
    }

    return Math.ceil(nextPos);
  };

  /**
  * Move the slider.
  * Pass a negative number to go in the inverse direction
  *
  * @method move
  * @param {Integer} Number of items to move
  */
  Slider.fn.move = function (steps) {
    steps = steps || 1;

    var nextPos = this.getNextPos(steps),
        direction = this.settings.direction;

    if (this.isAtLimit(nextPos)) {
      return this;
    }

    this.slider.style[direction === 'vertical' ? 'top' : 'right'] = nextPos + 'px';
  };


  /**
  * Add event listeners for the controls passed
  *
  * @method addControls
  * @param {String | Node Element} Next Control
  * @param {String | Node Element} Prev Control
  * @param {Integer} Number of items (steps) to avance/return
  */
  Slider.fn.addControls = function (next, prev, steps) {

    var that = this;

    if (!utils.isDOM(next)) {
      next = document.querySelector(next);
    }

    if (!utils.isDOM(prev)) {
      prev = document.querySelector(prev);
    }

    next.addEventListener('click', function (e) {
      e.preventDefault();
      that.move(steps);
    });

    prev.addEventListener('click', function (e) {
      e.preventDefault();
      that.move(steps * -1);
    });
  };


  window.Slider = Slider;

}(window, document));

DGW.global.api.easyXDM = easyXDM.noConflict('DGW.global.api');
DGW.global.api.rpc = new DGW.global.api.easyXDM.Rpc({
    remote: "http://spr-api-test.cloudapp.net/tunnel.html"
}, {
    remote: {
        apiTunnel: {}
    }
});

DGW.global.api.generic = function(apiName, callback, requestBody){
    var result = {},
        interval,
        method = '',
        endpoint= '';
    requestBody = requestBody || '';

    switch (apiName) {
        case 'signUp':
            method = 'POST';
            endpoint = 'auth/signup';
            requestBody = JSON.stringify(requestBody);
            break;
        case 'signIn':
            method = 'POST';
            endpoint = 'auth/login';
            requestBody = JSON.stringify(requestBody);
            break;
        case 'signOut':
            method = 'POST';
            endpoint = 'auth/logout';
            break;
        case 'facebookLogIn':
            method = 'POST';
            endpoint = 'auth/facebookconnect';
            requestBody = JSON.stringify(requestBody);
            break;
        case 'getUser':
            method = 'GET';
            endpoint = 'user/getuser';
            break;
        case 'getDraws':
            method = 'GET';
            endpoint = 'draw/getdraws';
            break;
        case 'getDrawEntries':
            method = 'GET';
            endpoint = 'draw/getdrawentries';
            break;
        case 'drawBet':
            method = 'POST';
            endpoint = 'draw/bet';
            requestBody = JSON.stringify(requestBody);
        case 'claimPrize':
            method = 'POST';
            endpoint = 'draw/claimprize';
            requestBody = JSON.stringify(requestBody);
            break;
    }
    DGW.global.api.rpc.apiTunnel({
            apiKey: DGW.global.api.apiKey,
            method: method,
            endpoint: endpoint,
            params: requestBody
        },
        function onSuccess(response) {
            if (response.error) {
                result.error = response.error;
            } else if (response.data !== null) {
                result.data = response.data;
            } else {
                if (result !== undefined)
                    result = null;
            }
        },
        function onError(error) {
            console.error(error.message);
        });

    interval = setInterval(function(){
        if (result === null || result === undefined) {
            clearInterval(interval);
            console.log('no data');
            callback(result);
        } else if ( Object.keys(result).length > 0 ) {
            clearInterval(interval);
            callback(result);
        }  else {
            console.log('retrieving data');
        }
    }, 500);
};

DGW.global.api.requests.signUp = function(userObj){
    DGW.global.api.generic('signUp', function(result){
        if (!result.error) {
            console.info(result.data);
            DGW.global.authorized = true;
            DGW.global.methods.authorize();
            DGW.global.methods.profileSetData(result.data);
        } else {
            DGW.global.authorized = false;
            console.error(result.error);
        }
    }, {
        Username: userObj.Username,
        Email: userObj.Email,
        Password: userObj.Password
    });
};

DGW.global.api.requests.signIn = function(userObj){
    DGW.global.api.generic('signIn', function(result){
        if (!result.error) {
            console.info(result.data);
            DGW.global.methods.authorize();
            DGW.global.methods.profileSetData(result.data);
            DGW.global.authorized = true;
        } else {
            DGW.global.authorized = false;
            console.error(result.error);
        }
    }, {
        Email: userObj.Email,
        Password: userObj.Password
    });
};

DGW.global.api.requests.signOut = function(){
    DGW.global.api.generic('signOut', function(result){
        //TODO: review it later, maybe
        console.info('Signed out');
        DGW.global.authorized = false;
        DGW.global.methods.unAuthorize();
    });
};

DGW.global.api.requests.getUser = function(){
    DGW.global.api.generic('getUser', function(result){
        if (!result.error) {
            console.info(result.data);
            if (DGW.global.authorized === false) {
                DGW.global.authorized = true;
                DGW.global.methods.authorize();
                DGW.global.methods.profileSetData(result.data);
            }
        } else {
            DGW.global.authorized = false;
            console.error(result.error);
        }
        if (!DGW.global.launched) {
            // Showing side widget
            DGW.side.methods.showWidget();
            DGW.global.launched = true;
        }
    });
};

//Prefacebook loaders
(function(){
//fbAsyncInit
    window.fbAsyncInit = function () {
        FB.init({
            appId: '614550048660888',
            cookie: true,  // enable cookies to allow the server to access
            // the session
            xfbml: true,  // parse social plugins on this page
            version: 'v2.2' // use version 2.2
        });
    };

    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
})();

DGW.global.api.requests.fbConnect = function(){
    FB.login(function (response) {
            if (response.status === "connected") {
                // Logged into your app and Facebook.

                DGW.global.api.generic('facebookLogIn', function(result){
                    if (!result.error) {
                        console.info(result.data);
                    } else {
                        console.error(result.error);
                    }
                }, {
                    AccessToken: response.authResponse.accessToken,
                    ExpiresIn: response.authResponse.expiresIn
                });
            }
            else if (response.status === "not_authorized") {
                // The person is logged into Facebook, but not your app.
            }
            else {
                // The person is not logged into Facebook, so we're not sure if
                // they are logged into this app or not.
            }
        },
        { scope: "email" }
    );
};

DGW.global.api.requests.getDraws = function(){
    DGW.main.methods.loadingStarted();
    DGW.global.api.generic('getDraws', function(result) {
        if (!result.error) {
            console.info(result.data);
            DGW.main.cache.drawsList = result.data.Draws;
            if (DGW.global.authorized == true) {
                DGW.global.api.requests.getDrawEntries();
            } else {
                DGW.main.methods.drawsConstructor(DGW.main.cache);
                DGW.main.methods.loadingFinished();
            }
        } else {
            console.error(result.error);
        }
    });
};

DGW.global.api.requests.getDrawEntries = function(){
    DGW.global.api.generic('getDrawEntries', function(result){
        if (!result.error) {
            console.info(result.data);
            DGW.main.cache.drawsEntries = result.data.DrawEntries;

            DGW.main.methods.drawsConstructor(DGW.main.cache);
            DGW.main.methods.loadingFinished();
        } else {
            console.error(result.error);
        }
    });
};

DGW.global.api.requests.drawBet = function(drawId, pointsAmount){
    DGW.global.api.generic('drawBet', function(result){
        if (!result.error) {
            console.log(result);

            DGW.main.methods.updateUserInfoBet(result.data.DrawEntry, result.data.User);
        } else {
            console.error(result.error);
        }
    },{
        DrawId: drawId,
        PointsAmount: pointsAmount
    });
};

DGW.global.api.requests.claimPrize = function(drawId, address, el){
    DGW.global.api.generic('claimPrize', function(result){
        if (!result.error) {
            DGW.helpers.addClass(el, 'claimed');
        } else {
            console.error(result.error);
        }
    },{
        DrawId: drawId,
        Address1: address
    });
};
DGW.helpers.addClass = function(obj, className){
    if (!(new RegExp(className).test(obj.className))) {
        if (obj.className.length === 0) {
            obj.className += className;
        } else {
            obj.className += (' ' + className);
        }
    }
};

DGW.helpers.removeClass = function(obj, className) {
    obj.className = obj.className.replace(new RegExp(className), '').trim();
};

DGW.helpers.toggleClass = function(obj, className) {
    if (new RegExp(className).test(obj.className)) {
        DGW.helpers.removeClass(obj, className);
    } else {
        DGW.helpers.addClass(obj, className);
    }
};

DGW.helpers.hasClass = function(obj, className) {
    return new RegExp(className).test(obj.className);
};

DGW.helpers.isArray = function(o){
    return Object.prototype.toString.call(o) === '[object Array]';
};

var a = [
    {
        dt: 'data',
        elem: 'li'
    },
    {
        dt: 'data',
        elem: 'li'
    }];


DGW.helpers.drawsTimerConstr = function(params){
    var draws;
    var _second = 1000;
    var _minute = _second * 60;
    var _hour = _minute * 60;
    var _day = _hour * 24;
    var timer;

    function checkExpirationDate(draw){
        var end = new Date(draw.dt);
        var now = new Date();
        if ((end - now) > 0) {
            return true;
        } else {
            return false;
        }
    }

    function updateTime(){
        draws.forEach(function(draw){

            var end = new Date(draw.dt);

            var now = new Date();
            var distance = end - now;

            var days = Math.floor(distance / _day);
            var hours = Math.floor((distance % _day) / _hour);
            var minutes = Math.floor((distance % _hour) / _minute);
            var seconds = Math.floor((distance % _minute) / _second);

            if (distance < 0) {
                draw.elem.innerHTML = 'Draw has finished';
            } else {
                draw.elem.innerHTML = days + 'd ';
                draw.elem.innerHTML += hours + 'h ';
                draw.elem.innerHTML += minutes + 'm ';
                draw.elem.innerHTML += seconds + 's';
            }

        });
    }

    this.setDraws = function(newDraws){
        if (DGW.helpers.isArray(newDraws)) {
            draws = newDraws.filter(function(draw){
                return checkExpirationDate(draw);
            });
        }
    };

    this.push = function(draw){
        if (draw.elem && draw.dt) {
            if (checkExpirationDate(draw)) {
                draws.push(draw);
                return true;
            } else {
                return false;
            }
        }
    };

    this.start = function(){
        updateTime();
        timer = window.setInterval(updateTime, 1000);
    };

    this.stop = function(){
        window.clearInterval(timer);
    };

    this.setDraws(params);
    this.start();
};

DGW.helpers.drawsTimer = new DGW.helpers.drawsTimerConstr([]);

DGW.templates.sideWidgetCore = '<div id="dg-side-widget-wrapper">' +
                                    '<div class="dg-side-widget-body"></div>' +
                               '</div>';

DGW.templates.mainWidgetCore = '<div id="dg-o-w-wrapper">' +
                                    '<div class="dg-o-w-overlay">' +
                                        '<div class="dg-o-w-body">' +
                                            '<div class="dg-o-w-header">' +
                                                '<div class="dg-o-w-logo">' +
                                                    '<img src="./imgs/everton-logo.jpg" alt="Club Logo" />' +
                                                '</div>' +
                                                '<div class="dg-o-w-menu">' +
                                                    '<ul><li class="earn-menu-item">Earn</li>' +
                                                    '<li class="draws-menu-item">Draws & Games</li>' +
                                                    '<li class="activities-menu-item">Activities</li></ul>' +
                                                '</div>' +
                                                '<div class="dg-o-w-menu-profile">' +
                                                    '<div class="profile-menu-item">' +
                                                        '<img src="http://lorempixel.com/100/100/cats" />' +
                                                        '<div class="profile-menu-unauthorized">' +
                                                            '<div>' +
                                                                '<h4>Hello, guest!</h4>' +
                                                                '<div class="dg-o-w-login-dropdown">' +
                                                                    '<a href="#">Log in by email</a>' +
                                                                    '<div class="dg-o-w-email-login-form">' +
                                                                        '<form id="dg-o-w-form-login-top">' +
                                                                            '<label>Email <input type="email" placeholder="mail@mail.com" /></label>' +
                                                                            '<label>Password <input type="password" /></label>' +
                                                                            '<input type="submit" value="Sign In" />' +
                                                                            '<a href="#" class="">Forgot your password?</a>' +
                                                                        '</form>' +
                                                                    '</div>' +
                                                                '</div>' +
                                                            '</div>' +
                                                        '</div>' +
                                                        '<div class="profile-menu-authorized">' +
                                                            '<div>' +
                                                                '<h4>Hello, Paul!</h4>' +
                                                                '<p><span id="dg-o-w-points">25</span> | <span id="dg-o-w-credits">115.25</span></p>' +
                                                            '</div>' +
                                                        '</div>' +
                                                    '</div>' +
                                                '</div>' +
                                            '</div>' +
                                            '<div class="dg-o-w-content"><div class="dg-o-w-section">' +
                                                '<section></section>' +
                                                '<footer class="dg-o-w-footer-login">' +
                                                    '<div class="footer-section footer-section-step-1">' +
                                                        '<div class="inline-part"><h3>Log in with Facebook and get +10 points</h3></div>' +
                                                        '<div class="inline-part"><a href="#" class="btn-radius btn-large btn-brand">Facebook</a></div>' +
                                                        '<div class="inline-part"><p>or</p></div>' +
                                                        '<div class="inline-part"><a id="dg-o-w-footer-email-login" href="#" class="btn-radius btn-large btn-white">Sign up with email</a></div>' +
                                                    '</div>' +
                                                    '<div class="footer-section footer-section-step-2">' +
                                                        '<a id="dg-o-w-footer-login-select" href="#" class="btn-back-footer">&larr; Back</a><form id="dg-o-w-footer-signup-email">' +
                                                            '<div class="inline-part"><label>Name <input type="text" placeholder="First Name" /></label></div>' +
                                                            '<div class="inline-part"><label>Email <input type="email" placeholder="mail@mail.com" /></label></div>' +
                                                            '<div class="inline-part"><label>&nbsp; <input class="btn-dg-o-w-outline" type="submit" value="Submit" /></label></div>' +
                                                        '</form>' +
                                                    '</div>' +
                                                    '<div class="footer-section footer-section-step-3">' +
                                                        '<a id="dg-o-w-footer-login-select-2" href="#" class="btn-back-footer">&larr; Back</a><form id="dg-o-w-footer-signup-pass">' +
                                                            '<div class="inline-part"><label>Password <input type="password" /></label></div>' +
                                                            '<div class="inline-part"><label>&nbsp; <input class="btn-dg-o-w-outline" type="submit" value="Sign Up" /></label></div>' +
                                                        '</form>' +
                                                    '</div>' +
                                                '</footer>' +
                                            '</div></div>' +
                                            '<div class="dg-o-w-close">&times;</div>' +
                                            '<div class="dg-o-w-spinner"></div>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>';

DGW.templates.earnMain = '<div class="dg-o-w-submenu">' +
                            '<ul><li class="dg-o-w-active">All</li>' +
                                '<li>Share</li>' +
                                '<li>Watch</li>' +
                                '<li>Visit</li>' +
                                '<li>Download</li>' +
                                '<li>Invite</li></ul>' +
                            '<select><option>All sponsors</option>' +
                                '<option>Coca-Cola</option>' +
                                '<option>Nike</option>' +
                                '<option>Telco</option></select>' +
                        '</div>' +
                        '<div class="dg-o-w-section-content">' +
                            '<h3>Complete the tasks and earn +500 points today</h3>' +
                            '<ul class="dg-o-w-list-offers">' +
                                '<li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>' +
                        '</div>';

DGW.templates.drawsMain = '<div class="dg-o-w-submenu">' +
                            '<ul><li class="dg-o-w-active">All draws</li><li>Finished soon</li>' +
                                '<li>My draws</li><li>Games</li></ul>' +
                            '<label class="checkbox-slider">Show finished draws <input id="dg-o-w-show-expired" type="checkbox" class="ios-switch bigswitch" /><div><div></div></div></label>' +
                        '</div>' +
                        '<div class="dg-o-w-section-content">' +
                            '<h3>Available draws</h3>' +
                            '<ul class="dg-o-w-list-draws">' +
                            '</ul>' +
                        '</div>';

DGW.templates.profileMain = '<div class="dg-o-w-profile">' +
                                '<div class="dg-o-w-left-side">' +
                                    '<div class="dg-o-w-image-holder"><img id="profileImage" src="http://lorempixel.com/500/500/cats" /></div>' +
                                    '<p><span id="profileFriendsAmount">15</span> friends</p>' +
                                '</div>' +
                                '<div class="dg-o-w-right-side">' +
                                    '<div class="dg-o-w-profile-top">' +
                                        '<div class="dg-o-w-float-left"><h3 id="profileName">Captain Deadpool</h3><h5>2 badges</h5></div>' +
                                        '<div class="dg-o-w-float-right">' +
                                            '<div class="dg-o-w-profile-points"><h3>115</h3><h5>20</h5></div>' +
                                            '<div class="dg-o-w-profile-credits"><h3>215.20</h3><h5>25.15</h5></div>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="dg-o-w-profile-earnings-info">' +
                                        '<p class="color-brand-light">Today earned: <span>15</span> pts | left: <span>5</span>pts</p>' +
                                        '<p>Get +10 additional points by adding your other accounts from ' +
                                            '<a href="#" class="facebook">f</a> and <a href="#" class="twitter">t</a></p>' +
                                    '</div>' +
                                    '<div class="dg-o-w-profile-progress"><div style="width:35%;"></div></div>' +
                                    '<div class="dg-o-w-profile-bottom">' +
                                        '<div class="dg-o-w-profile-invite dg-o-w-float-left">' +
                                            '<p class="color-brand-light"><a href="#" class="btn-dg-o-w-outline">Invite more friends</a>' +
                                            ' and get <span>+50</span> points for each friend</p>' +
                                        '</div>' +
                                        '<div class="dg-o-w-profile-signout dg-o-w-float-right">' +
                                            '<p class="color-brand-light"><a id="dg-o-w-sign-out-btn" href="#">Sign out</a></p>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                            '<div class="dg-o-w-section-content content-static">' +
                                '<h3>Badges</h3>' +
                                '<div class="dg-o-w-badges-holder"><ul></ul></div>' +
                            '</div>';


DGW.templates.loginMain = '<div class="dg-o-w-login">' +
                                '<div class="dg-o-w-left-side"><div class="dg-o-w-image-holder"><img src="./imgs/kevin-mirallas.png" /></div></div>' +
                                '<div class="dg-o-w-right-side">' +
                                    '<h1>Win exclusive prizes handling simple tasks</h1>' +
                                    '<a href="#" class="btn-radius btn-large btn-brand-3d">Join now</a>' +
                                    '<div class="dg-o-w-login-winners">' +
                                        '<img src="http://lorempixel.com/100/100/cats" />' +
                                        '<div><h4>Daniel won a signed t-shirt!</h4><h5>Sign up and get your own prize now</h5></div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>';

DGW.templates.activitiesMain = '<div class="dg-o-w-submenu"><ul><li class="toggle-section-height"><div></div></li><li class="dg-o-w-active">Leaderboard</li></ul></div>' +
                                '<div class="dg-o-w-activities">' +
                                    '<div class="dg-o-w-activity-slider-holder">' +
                                        '<div class="dg-o-w-activity-slider-controls">' +
                                            '<div class="dg-o-w-activity-slider-prev"><</div><div class="dg-o-w-activity-slider-next">></div>' +
                                        '</div>' +
                                        '<div class="dg-o-w-activity-slider"><ul></ul></div>' +
                                    '</div>' +
                                '</div>' +
                                '<div class="dg-o-w-section-content">' +
                                    '<div class="dg-o-w-activities-header">' +
                                        '<p class="dg-o-w-float-left">Activities for today</p>' +
                                        '<p class="dg-o-w-floating-link"><a href="#">Invite more friends</a> and get +50 points for each</p>' +
                                        '<select class="dg-o-w-float-right">' +
                                            '<option>All activities</option>' +
                                        '</select>' +
                                    '</div>' +
                                    '<div class="dg-o-w-activities-holder"><ul></ul></div>' +
                                '</div>';

DGW.global.elements.documentBody = document.body;

DGW.side.elements.widget = document.createElement('div');
    DGW.side.elements.widget.id = 'dg-side-widget';
    DGW.side.elements.widget.innerHTML = DGW.templates.sideWidgetCore;

DGW.main.elements.widget = document.createElement('div');
    DGW.main.elements.widget.id = 'dg-o-w';
    DGW.main.elements.widget.innerHTML = DGW.templates.mainWidgetCore;
DGW.main.elements.widgetBody = DGW.main.elements.widget.querySelector('.dg-o-w-body');

DGW.main.elements.menuItems = {
    earn: DGW.main.elements.widget.querySelector('.dg-o-w-menu .earn-menu-item'),
    draws: DGW.main.elements.widget.querySelector('.dg-o-w-menu .draws-menu-item'),
    activities: DGW.main.elements.widget.querySelector('.dg-o-w-menu .activities-menu-item'),
    profile: DGW.main.elements.widget.querySelector('.dg-o-w-menu-profile .profile-menu-item img')
};

DGW.main.elements.widgetContent = DGW.main.elements.widget.querySelector('.dg-o-w-content .dg-o-w-section section');

DGW.main.elements.loginFooter = DGW.main.elements.widget.querySelector('.dg-o-w-footer-login');

DGW.main.elements.loginMenuButton = DGW.main.elements.widget.querySelector('.dg-o-w-login-dropdown a');


DGW.main.elements.pages.earnMain = document.createElement('div');
    DGW.main.elements.pages.earnMain.innerHTML = DGW.templates.earnMain;
DGW.main.elements.pages.drawsMain = document.createElement('div');
    DGW.main.elements.pages.drawsMain.innerHTML = DGW.templates.drawsMain;
DGW.main.elements.pages.activitiesMain = document.createElement('div');
    DGW.main.elements.pages.activitiesMain.innerHTML = DGW.templates.activitiesMain;
DGW.main.elements.pages.profileMain = document.createElement('div');
    DGW.main.elements.pages.profileMain.innerHTML = DGW.templates.profileMain;
DGW.main.elements.pages.loginMain = document.createElement('div');
    DGW.main.elements.pages.loginMain.innerHTML = DGW.templates.loginMain;

DGW.main.elements.pages.singleDraw = document.createElement('div');

DGW.main.elements.activitiesSliderParent = DGW.main.elements.pages.activitiesMain.querySelector('.dg-o-w-activities');


// Main widget global methods
DGW.main.methods.showWidget = function(){
    DGW.helpers.removeClass(DGW.main.elements.widget, 'hiding');
    DGW.global.elements.documentBody.appendChild(DGW.main.elements.widget);
    DGW.main.methods.changeMainState(DGW.main.currentState);
};
DGW.main.methods.hideWidget = function(){
    DGW.helpers.addClass(DGW.main.elements.widget, 'hiding');
    setTimeout(function(){
        DGW.global.elements.documentBody.removeChild(DGW.main.elements.widget);
    }, 310);
};

DGW.main.methods.changeMainState = function(state){
    for (item in DGW.main.elements.menuItems) {
        DGW.helpers.removeClass(DGW.main.elements.menuItems[item], 'dg-o-w-active');
        DGW.helpers.removeClass(DGW.main.elements.menuItems['profile'].parentNode, 'dg-o-w-active');
        if (item === state) {
            if (state === 'profile') {
                DGW.helpers.addClass(DGW.main.elements.menuItems[item].parentNode, 'dg-o-w-active');
            } else {
                DGW.helpers.addClass(DGW.main.elements.menuItems[item], 'dg-o-w-active');
            }
        }
    }
    if (DGW.main.elements.widgetContent.children.length > 0) {
        DGW.main.elements.widgetContent.removeChild(DGW.main.elements.widgetContent.childNodes[0]);
    }

    if (DGW.main.currentState !== 'draws') {
        DGW.helpers.drawsTimer.setDraws([]);
    }
    DGW.helpers.removeClass(DGW.main.elements.widgetBody, 'profile-anon');
    switch (state) {
        case 'earn':

            DGW.main.elements.widgetContent.appendChild(DGW.main.elements.pages.earnMain);
            break;
        case 'draws':
            //TODO: work on this further
            if (DGW.main.currentState !== 'draws') {
                DGW.global.api.requests.getDraws();
            }
            DGW.main.elements.widgetContent.appendChild(DGW.main.elements.pages.drawsMain);
            break;
        case 'activities':

            DGW.main.elements.widgetContent.appendChild(DGW.main.elements.pages.activitiesMain);
            break;
        case 'profile':
            if ( DGW.global.authorized ) {
                DGW.main.elements.widgetContent.appendChild(DGW.main.elements.pages.profileMain);
            } else {
                DGW.helpers.addClass(DGW.main.elements.widgetBody, 'profile-anon');
                DGW.main.elements.widgetContent.appendChild(DGW.main.elements.pages.loginMain);
            }
            break;
        default:

    }

    DGW.main.currentState = state;
    DGW.main.methods.checkSectionHeight();
};

DGW.main.methods.loadingStarted = function(){
    DGW.helpers.addClass(DGW.main.elements.widgetBody, 'loading');
};
DGW.main.methods.loadingFinished = function(){
    DGW.helpers.removeClass(DGW.main.elements.widgetBody, 'loading');
};


// Side widget global methods
DGW.side.methods.showWidget = function(){
    DGW.global.elements.documentBody.appendChild(DGW.side.elements.widget);
};
DGW.side.methods.hideWidget = function(){
    DGW.global.elements.documentBody.removeChild(DGW.side.elements.widget);
};


DGW.global.methods.init = function(){

    // Handling clicks
    DGW.side.elements.widget.addEventListener('click', function(){
        DGW.main.methods.showWidget();
    });
    DGW.main.elements.widget.querySelector('.dg-o-w-close').addEventListener('click', function(){
        DGW.main.methods.hideWidget();
    });

    DGW.main.methods.addPageEvents();

    //Main widget, main menu clicks
    for (item in DGW.main.elements.menuItems) {
        DGW.main.elements.menuItems[item].addEventListener('click', function(item){
            return function(){
                DGW.main.methods.changeMainState(item);
            };
        }(item));
    }

    //Initializing or checking user
    DGW.global.api.requests.getUser();
};

DGW.global.methods.authorize = function(){
    DGW.helpers.addClass(DGW.main.elements.widgetBody, 'authorized');
    DGW.global.authorized = true;
    if (DGW.main.currentState === 'profile') {
        DGW.main.methods.changeMainState('profile');
    } else if (DGW.main.currentState === 'draws') {
        DGW.global.api.requests.getDraws();
    }
};

DGW.global.methods.unAuthorize = function(){
    DGW.helpers.removeClass(DGW.main.elements.widgetBody, 'authorized');
    DGW.global.authorized = false;
    if (DGW.main.currentState === 'profile') {
        DGW.main.methods.changeMainState('profile');
    }
};

DGW.main.methods.checkSectionHeight = function() {
    var section = DGW.main.elements.widgetBody.querySelector('.dg-o-w-section');
    var sectionContent = DGW.main.elements.widgetBody.querySelector('.dg-o-w-section-content');

    if ( section.querySelector('.dg-o-w-submenu') ) {
        DGW.helpers.addClass(sectionContent, 'dg-o-w-submenu-only');
        DGW.helpers.removeClass(sectionContent, 'dg-o-w-submenu-activities');
        if ( section.querySelector('.dg-o-w-activity-slider-holder') && !DGW.helpers.hasClass(section.querySelector('.dg-o-w-activities'), 'collapsed') ) {
            DGW.helpers.addClass(sectionContent, 'dg-o-w-submenu-activities');
            DGW.helpers.removeClass(sectionContent, 'dg-o-w-submenu-only');
        }
    }
};

DGW.main.methods.addPageEvents = function () {
    // Login header
    DGW.main.elements.loginMenuButton.addEventListener('click', function (e) {
        e.preventDefault();
        var that = this;
        var form = that.parentNode.querySelector('.dg-o-w-email-login-form');
        if (DGW.helpers.hasClass(that.parentNode, 'shown')) {
            DGW.helpers.removeClass(that.parentNode, 'shown');
            setTimeout(function () {
                DGW.helpers.removeClass(form, 'visible');
            }, 310);
        } else {
            DGW.helpers.addClass(form, 'visible');
            setTimeout(function () {
                DGW.helpers.addClass(that.parentNode, 'shown');
            }, 0);
        }
    });

    DGW.main.elements.widgetBody.querySelector('#dg-o-w-form-login-top').addEventListener('submit', function(ev){
        ev.preventDefault();
        var emailF = this.querySelector('[type=email]').value,
            passF = this.querySelector('[type=password]').value;

        if (emailF != '' && passF != '' && passF.length > 5) {
            DGW.global.api.requests.signIn({
                Email: emailF,
                Password: passF
            });
        }
    });

    //Activities page
    DGW.main.elements.pages.activitiesMain.querySelector('.toggle-section-height').addEventListener('click', function () {
        if (DGW.helpers.hasClass(this, 'collapsed')) {
            DGW.helpers.removeClass(DGW.main.elements.activitiesSliderParent, 'collapsed');
            DGW.helpers.removeClass(this, 'collapsed');
        } else {
            DGW.helpers.addClass(DGW.main.elements.activitiesSliderParent, 'collapsed');
            DGW.helpers.addClass(this, 'collapsed');
        }
        DGW.main.methods.checkSectionHeight();
    });

    //Footer login init
    DGW.main.elements.loginFooter.querySelector('#dg-o-w-footer-email-login').addEventListener('click', function (ev) {
        ev.preventDefault();
        DGW.helpers.addClass(DGW.main.elements.loginFooter, 'email-sign-up');
    });
    DGW.main.elements.loginFooter.querySelector('#dg-o-w-footer-login-select').addEventListener('click', function (ev) {
        ev.preventDefault();
        DGW.helpers.removeClass(DGW.main.elements.loginFooter, 'email-sign-up');
    });
    DGW.main.elements.loginFooter.querySelector('#dg-o-w-footer-login-select-2').addEventListener('click', function (ev) {
        ev.preventDefault();
        DGW.helpers.removeClass(DGW.main.elements.loginFooter, 'password');
    });
    (function(){
        var newUser = {};
        DGW.main.elements.loginFooter.querySelector('#dg-o-w-footer-signup-email').addEventListener('submit', function(){
            var name = this.querySelector('[type=text]').value,
                email = this.querySelector('[type=email]').value;
            if (name != '' && email != '') {
                newUser.Username = name;
                newUser.Email = email;

                DGW.helpers.addClass(DGW.main.elements.loginFooter, 'password');
            } else {
                //TODO: validation
            }
        });
        DGW.main.elements.loginFooter.querySelector('#dg-o-w-footer-signup-pass').addEventListener('submit', function(){
            var pass = this.querySelector('[type=password]').value;
            if (pass != '' && pass.length >= 5) {
                newUser.Password = pass;
                DGW.global.api.requests.signUp(newUser);

                //TODO: preloader and success messages
                DGW.helpers.removeClass(DGW.main.elements.loginFooter, 'email-sign-up');
                DGW.helpers.removeClass(DGW.main.elements.loginFooter, 'password');
            } else {
                //TODO: validation
            }
        });
    })();

    //Draws page clicks
    DGW.main.elements.pages.drawsMain.querySelector('#dg-o-w-show-expired').addEventListener('change', function (ev) {
        if (this.checked) {
            DGW.helpers.addClass(DGW.main.elements.widgetBody, 'draws-expired');
        } else {
            DGW.helpers.removeClass(DGW.main.elements.widgetBody, 'draws-expired');
        }
    });

    //Profile page clicks
    DGW.main.elements.pages.profileMain.querySelector('#dg-o-w-sign-out-btn').addEventListener('click', function (ev) {
        ev.preventDefault();
        DGW.global.api.requests.signOut();
    });
};
DGW.global.methods.profileSetData = function(data) {
    var profileImageHolders = [
            DGW.main.elements.widgetBody.querySelector('.dg-o-w-menu-profile .profile-menu-item img'),
            DGW.main.elements.pages.profileMain.querySelector('#profileImage')
        ],
        profileNames = [
            DGW.main.elements.widgetBody.querySelector('.dg-o-w-menu-profile .profile-menu-authorized h4'),
            DGW.main.elements.pages.profileMain.querySelector('#profileName')
        ],
        friendsNumber = DGW.main.elements.pages.profileMain.querySelector('#profileFriendsAmount');

    var points = {
            confirmed: [
                DGW.main.elements.widgetBody.querySelector('#dg-o-w-points'),
                DGW.main.elements.pages.profileMain.querySelector('.dg-o-w-profile-points h3')
            ],
            pending: [DGW.main.elements.pages.profileMain.querySelector('.dg-o-w-profile-points h5')]
        },
        credits = {
            confirmed: [
                DGW.main.elements.widgetBody.querySelector('#dg-o-w-credits'),
                DGW.main.elements.pages.profileMain.querySelector('.dg-o-w-profile-credits h3')
            ],
            pending: [DGW.main.elements.pages.profileMain.querySelector('.dg-o-w-profile-credits h5')]
        };

    profileImageHolders.forEach(function(image){
        image.src = data.ImageUrl || image.src;
    });

    profileNames.forEach(function(name){
        name.innerHTML = data.UserName;
    });

    points.confirmed.forEach(function(point){
       point.innerHTML = data.Wallet.PointsConfirmed;
    });
    points.pending.forEach(function(point){
        point.innerHTML = data.Wallet.PointsPending;
    });

    credits.confirmed.forEach(function(credit){
        credit.innerHTML = data.Wallet.CreditsConfirmed;
    });
    credits.pending.forEach(function(credit){
        credit.innerHTML = data.Wallet.CreditsPending;
    });
};

DGW.main.methods.updateUserInfoBet = function(draw, user){
    var points = {
            confirmed: [
                DGW.main.elements.widgetBody.querySelector('#dg-o-w-points'),
                DGW.main.elements.pages.profileMain.querySelector('.dg-o-w-profile-points h3')
            ],
            pending: [DGW.main.elements.pages.profileMain.querySelector('.dg-o-w-profile-points h5')]
        },
        credits = {
            confirmed: [
                DGW.main.elements.widgetBody.querySelector('#dg-o-w-credits'),
                DGW.main.elements.pages.profileMain.querySelector('.dg-o-w-profile-credits h3')
            ],
            pending: [DGW.main.elements.pages.profileMain.querySelector('.dg-o-w-profile-credits h5')]
        };

    var betPoints = DGW.main.elements.widgetContent.querySelector('.dg-o-w-your-bet span');

    points.confirmed.forEach(function(point){
        point.innerHTML = user.Wallet.PointsConfirmed;
    });
    points.pending.forEach(function(point){
        point.innerHTML = user.Wallet.PointsPending;
    });

    credits.confirmed.forEach(function(credit){
        credit.innerHTML = user.Wallet.CreditsConfirmed;
    });
    credits.pending.forEach(function(credit){
        credit.innerHTML = user.Wallet.CreditsPending;
    });

    betPoints.innerHTML = draw.TicketsAmount || 0;
};

DGW.main.methods.drawsConstructor = function(cacheObj){
    var drawsList = DGW.main.elements.pages.drawsMain.querySelector('.dg-o-w-list-draws');
    drawsList.innerHTML = '';
    if (cacheObj) {
        cacheObj.drawsList.forEach(function (draw) {
            var li = document.createElement('li');
            li.id = draw.DrawId;
            li.setAttribute('data-end-date', draw.EndDate);
            var drawEntry = cacheObj.drawsEntries.filter(function(de){
                return de.DrawId == draw.DrawId;
            })[0];
            if (drawEntry) {
                var ticketsInDraw = drawEntry.TicketsAmount;
            }
            //console.log(drawEntry);
            li.innerHTML = '<div class="dg-o-w-draw">' +
                                '<img src="' + draw.Prize.ImageUrl.replace(/api/g, 'everton') + '" />' + //TODO: ask to change this server-side
                                '<div class="dg-o-w-draw-text">' +
                                    //'<h2>' + draw.Prize.Title + '</h2>' +
                                    '<h2 class="dg-o-w-draw-countdown">' + '&nbsp;' + '</h2>' +
                                    '<p>' + draw.Prize.Description + '</p>' +
                                '</div>' +
                            ((drawEntry != undefined) ?
                                '<div class="dg-o-w-draw-bet">You\'ve bet: <span>' + ticketsInDraw + '</span> points</div>' :
                            '') +
                                //'<div class="dg-o-w-draw-connections"><span>2</span> of your friends</div>' +
                            '</div>';
            if (!DGW.helpers.drawsTimer.push({dt:draw.EndDate, elem:li.querySelector('.dg-o-w-draw-countdown')})) {
                DGW.helpers.addClass(li, 'expired');
            }
            if (drawEntry && drawEntry.IsWinner) {
                DGW.helpers.addClass(li, 'winner');
                if (drawEntry.NeedToClaimPrize) {
                    DGW.helpers.addClass(li, 'claim-prize');
                }
            }
            li.addEventListener('click', function(){
                DGW.main.methods.singleDrawConstructor(draw.DrawId);
            });
            drawsList.appendChild(li);
        });
    }
};

DGW.main.methods.singleDrawConstructor = function(drawId){

    var draw = DGW.main.cache.drawsList.filter(function(draws){
        return draws.DrawId === drawId;
    })[0];
    var drawEntry = DGW.main.cache.drawsEntries.filter(function(draws){
        return draws.DrawId === drawId;
    })[0];

    var el = DGW.main.elements.pages.singleDraw;
    var prizeSect = '<div class="dg-o-w-draw-left-side">' +
                        '<div class="prize-image"><div><img src="' + draw.Prize.ImageUrl.replace(/api/g, 'everton') + '" /></div></div>' +
                    '</div>';
    var shareSect = '<div class="dg-o-w-draw-share">' +
                        '<a href="#" class="dg-o-w-like dg-o-w-facebook-like">Like and get 10 points</a>' +
                        '<a href="#" class="dg-o-w-like dg-o-w-twitter-like">Tweet and get 10 points</a>' +
                    '</div>';
    var submenu = '<div class="dg-o-w-submenu">' +
                        '<ul><li class="dg-o-w-back-draws">&lt; Back</li></ul><div class="right-side">' +
        (!(drawEntry != undefined && drawEntry.IsWinner) ?'Minimum bet is 10' : 'You\'ve spent ' + drawEntry.TicketsAmount + ' points and won!') +
                            '</div>' +
                    '</div>';

    // Cleaning viewport from other sections
    if (DGW.main.elements.widgetContent.children.length > 0) {
        DGW.main.elements.widgetContent.removeChild(DGW.main.elements.widgetContent.childNodes[0]);
    }

    el.innerHTML =  submenu +
                    '<div class="dg-o-w-section-content">' +
                        '<div class="dg-o-w-single-draw">' +
                                prizeSect +
                            '<div class="dg-o-w-draw-right-side">' +
                                '<h2 class="dg-o-w-countdown">&nbsp;</h2>' +
                                '<h5>' + draw.Prize.Title + '</h5>' +
                                '<p>' + draw.Prize.Description + '</p>' +
                                '<div class="dg-o-w-draw-bet-info dg-o-w-draw-auth-show">' +
                                    '<div class="dg-o-w-your-bet">You\'ve bet <span></span> points</div>' +
                                    '<div class="dg-o-w-users-done">' +
                                        '<div>' +
                                            '<img src="http://lorempixel.com/70/70/people/1" />' +
                                            '<img src="http://lorempixel.com/70/70/people/2" />' +
                                            '<img src="http://lorempixel.com/70/70/people/3" />' +
                                        '</div>' +
                                        '<p>10 users have done this</p>' +
                                    '</div>' +
                                '</div>' +
                                '<h2 class="dg-o-w-draw-login-show">Please, log in to bet</h2>' +
                                '<div class="dg-o-w-draw-bet-action dg-o-w-draw-auth-show">' +
                                    '<h5>How much do you want to bet?</h5>' +
                                    '<form id="bet-form" class="dg-o-w-one-field-form">' +
                                        '<input type="number" min="10" max="1000" placeholder="10 points"/>' +
                                        '<input type="submit" value="Bet points" />' +
                                        '<p class="dg-o-w-form-message">something has happened</p>' +
                                    '</form>' +
                                    '<div class="btn-dg-o-w-outline">Get additional points</div>' +
                                '</div>' +
                                    ((draw.Winner !== null) ?
                                        '<div class="dg-o-w-draw-winner"><h2>Winner</h2><img src="' + (draw.Winner.ImageUrl || './imgs/avatars/p21.jpg') + '" /><h4>' + draw.Winner.UserName + '</h4></div>' :
                                    '') +
                                shareSect +
                            '</div>' +
                        '</div>' +
                    '</div>';

    if (drawEntry && drawEntry.IsWinner) {
        if (drawEntry.NeedToClaimPrize == true) {
            el.innerHTML = submenu +
            '<div class="dg-o-w-section-content">' +
                '<div class="dg-o-w-single-draw">' +
                    prizeSect +
                    '<div class="dg-o-w-draw-right-side won">' +
                        '<h2>Congrats, you\'ve won!!!</h2>' +
                        '<h5>' + draw.Prize.Title + '</h5>' +
                        '<p>' + draw.Prize.Description + '</p>' +
                    '<div>' +
                    '<h2 class="show-claimed">You\'ve already claimed your prize!</h2>' +
                    '<h5 class="hide-claimed">Put your address to get the prize</h5>' +
                    '<form id="claim-prize" class="dg-o-w-form hide-claimed">' +
                        //'<select><option disabled>Select your country</option><option>UK</option><option>Ireland</option></select>' +
                        '<input type="text" placeholder="Address line 1" />' +
                        '<input type="text" placeholder="Address line 2" />' +
                        '<input type="text" placeholder="County" />' +
                        '<input type="text" placeholder="Postcode" />' +
                        '<input type="submit" value="Submit " />' +
                        '<p class="dg-o-w-form-message">something has happened</p>' +
                    '</form>' +
                '</div>' +
                shareSect +
            '</div>' +
        '</div>' +
    '</div>';
        } else {
            el.innerHTML = submenu +
            '<div class="dg-o-w-section-content">' +
                '<div class="dg-o-w-single-draw">' +
                    prizeSect +
                    '<div class="dg-o-w-draw-right-side won">' +
                    '<h2>Congrats, you\'ve won!!!</h2>' +
                    '<h5>' + draw.Prize.Title + '</h5>' +
                    '<p>' + draw.Prize.Description + '</p>' +
                    '<div>' +
                        '<h2>You\'ve already claimed your prize!</h2>' +
                    '</div>' +
                    shareSect +
                    '</div>' +
                '</div>' +
            '</div>';
        }
    }

    el.querySelector('.dg-o-w-submenu li.dg-o-w-back-draws').addEventListener('click', function(){
        DGW.main.methods.changeMainState('draws');
    });

    if (el.querySelector('#bet-form')) {
        el.querySelector('#bet-form').addEventListener('submit', function (ev) {
            ev.preventDefault();
            var pointsToBet = +this.querySelector('input[type=number]').value;

            if (pointsToBet > 0) {
                DGW.global.api.requests.drawBet(drawId, pointsToBet);
            } else {

            }
        });
    }
    if (el.querySelector('#claim-prize')) {
        el.querySelector('#claim-prize').addEventListener('submit', function(ev){
            ev.preventDefault();
            var that = this;
            var address = '';

            Array.prototype.slice.call(that.querySelectorAll('input:not([type=submit])')).forEach(function(field){
                address += (field.placeholder + ': ');
                address += field.value;
                address += '; ';
            });

            console.log(address);

            if (address != '') {
                DGW.global.api.requests.claimPrize(drawId, address, el.querySelector('.dg-o-w-single-draw'));
            }
        });
    }


    if (!DGW.helpers.drawsTimer.push({dt:draw.EndDate, elem:el.querySelector('.dg-o-w-countdown')})) {
        DGW.helpers.addClass(el.querySelector('.dg-o-w-single-draw'), 'expired');
    }

    DGW.main.elements.widgetContent.appendChild(el);
    DGW.main.methods.checkSectionHeight();
};

var widgetStyles = document.createElement('link');
widgetStyles.rel = 'stylesheet';
widgetStyles.type = 'text/css';

widgetStyles.addEventListener('load', function(){
    DGW.global.methods.init();
});
widgetStyles.href = 'dist/style.min.css';
//widgetStyles.href = 'http://football.cool-link.com/widget/build/style.min.css';
document.head.appendChild(widgetStyles);


});