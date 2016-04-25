window.addEventListener('load', function(){
window.DGW = function () {
    if (document.getElementById('dgl-gamified-widget')) {
        var widgetScript = document.getElementById('dgl-gamified-widget');
        var widgetPathName = widgetScript.src;
        widgetPathName = widgetPathName.substring(widgetPathName.lastIndexOf('/') + 1, 0);
        var key = widgetScript.getAttribute('data-key');
        var envPath, tunnelPath;
        var debugMode = false;
        var widgetType = 'club';

        if (key) {

            // getting tunnel file path
            if (widgetScript.getAttribute('data-tunnel') !== null) {
                tunnelPath = 'http://spr-api-test.cloudapp.net/core/v1/xdm/tunnel';
                envPath = tunnelPath.substring(tunnelPath.lastIndexOf('/xdm/') + 1, 0);
                if (widgetScript.getAttribute('data-tunnel') === 'local') {
                    tunnelPath = 'http://localhostdev/spr-api/core/v1/xdm/tunnel';
                    envPath = tunnelPath.substring(tunnelPath.lastIndexOf('/xdm/') + 1, 0);
                } else if (widgetScript.getAttribute('data-tunnel') === 'live') {
                    tunnelPath = 'https://api.rewarded.club/core/v1/xdm/tunnel';
                    envPath = tunnelPath.substring(tunnelPath.lastIndexOf('/xdm/') + 1, 0);
                }
            } else {
                // No parameter - use production path
                tunnelPath = 'https://api.rewarded.club/tunnel.html';
                envPath = tunnelPath.substring(DGW.global.tunnelPath.lastIndexOf('/xdm/') + 1, 0);
            }

            // checking for debug mode
            if (widgetScript.getAttribute('data-debug') !== null) {
                debugMode = widgetScript.getAttribute('data-debug') !== 'false';
            }

            // checking for type
            if (widgetScript.getAttribute('data-type') !== null && widgetScript.getAttribute('data-type') !== '') {
                widgetType = widgetScript.getAttribute('data-type');
            }
            return {
                templates: {},
                main: {
                    methods: {},
                    elements: {
                        pages: {}
                    },
                    currentState: '',
                    cache: {
                        drawsList: [],
                        drawsEntries: [],
                        rewardedActions: []
                    },
                    shown: false,
                    settings: {
                        hiddenDrawsShow: true
                    }
                },
                side: {
                    methods: {},
                    elements: {}
                },
                global: {
                    type: widgetType, // sponsor || club
                    club: {
                        name: 'TEST_CLUB'
                    },
                    authorized: false,
                    launched: false,
                    safariFix: false,
                    activeDrawsExist: false,
                    offers: {
                        requests: {}
                    },
                    actions: {
                        requests: {}
                    },
                    api: {
                        apiKey: key,
                        requests: {}
                    },
                    cache: {
                        last: {}
                    },
                    elements: {},
                    methods: {},
                    tunnelPath: tunnelPath,
                    envPath: envPath,
                    widgetPathName: widgetPathName,
                    userStats: {},
                    debug: debugMode,
                    safariFixFirstOpen: false
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
    remote: DGW.global.tunnelPath
}, {
    remote: {
        apiTunnel: {},
        writeClubCookie: {},
        readClubCookie: {}
    }
});

DGW.global.api.generic = function(apiName, callback, requestBody){
    var result = {},
        method = 'GET',
        endpoint = '';
        requestBody = requestBody || '';

    switch (apiName) {
        case 'getApp':
            endpoint = 'app/getapp';
            break;
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
        case 'forgotPass':
            method = 'POST';
            endpoint = 'auth/forgotpassword';
            requestBody = JSON.stringify(requestBody);
            break;
        case 'facebookLogIn':
            method = 'POST';
            endpoint = 'auth/facebookconnect';
            requestBody = JSON.stringify(requestBody);
            break;
        case 'getUser':
            endpoint = 'user/getuser';
            break;
        case 'getDraws':
            endpoint = 'draw/getdraws';
            break;
        case 'getDrawEntries':
            endpoint = 'draw/getdrawentries';
            break;
        case 'drawBet':
            method = 'POST';
            endpoint = 'draw/bet';
            requestBody = JSON.stringify(requestBody);
            break;
        case 'drawPlayers':
            endpoint = 'draw/getdrawplayers?drawid=' + requestBody;
            break;
        case 'claimPrize':
            method = 'POST';
            endpoint = 'draw/claimprize';
            requestBody = JSON.stringify(requestBody);
            break;
        case 'getAllActivities':
            endpoint = 'activity/getallactivities';
            break;
        case 'getUserActivities':
            endpoint = 'activity/getuseractivities';
            break;
        case 'getOffers':
            endpoint = 'offer/getoffers';
            break;
        case 'trackOffer':
            method = 'POST';
            endpoint = 'offer/trackoffer';
            requestBody = JSON.stringify(requestBody);
            break;
        case 'completeOffer':
            method = 'POST';
            endpoint = 'offer/completeoffer';
            requestBody = JSON.stringify(requestBody);
            break;
        case 'cancelOffer':
            method = 'POST';
            endpoint = 'offer/canceloffer';
            requestBody = JSON.stringify(requestBody);
            break;
        case 'getUserOffers':
            endpoint = 'offer/getuseroffers';
            break;
        case 'getActions':
            endpoint = 'rewardedaction/getactions';
            break;
        case 'getUserActions':
            endpoint = 'rewardedaction/getuseractions';
            break;
        case 'trackAction':
            method = 'POST';
            endpoint = 'rewardedaction/trackrewardedaction';
            requestBody = JSON.stringify(requestBody);
            break;
        case 'getLeaderboard':
            endpoint = 'leaderboard/gettopearners';
            break;
        case 'getBadges':
            endpoint = 'badge/getbadges';
            break;
        case 'getEarnedBadges':
            endpoint = 'badge/getearnedbadges';
            break;
        case 'shareRewardAction':
            endpoint = 'draw/getsharelinks?drawid=' + requestBody;
            break;
        default:
            DGW.helpers.console.log('Api default occured');
    }
    DGW.global.api.rpc.apiTunnel({
            apiKey: DGW.global.api.apiKey,
            method: method,
            endpoint: endpoint,
            params: requestBody
        },
        function onSuccess(response) {
            result = response;
            if(callback) callback(response);
            DGW.main.methods.loadingFinished();
        },
        function onError(error) {
            DGW.helpers.console.error(error.message);
            DGW.main.methods.loadingFinished();
        });
    DGW.main.methods.loadingStarted();
};


DGW.global.api.requests.safariFix = function(){
    var w = window.open(DGW.global.tunnelPath +
    '?safarifix', '_blank', 'menubar=no,location=no,resizable=no,scrollbars=no,status=no, ' +
    'width=' + 1 + ', height=' + 1 + ', top=' + 0 + ', left=' + 0);
    var interval;
    interval = setInterval(function(){
        if (w.closed) {
            window.clearInterval(interval);
            DGW.global.safariFix = true;
            DGW.global.safariFixFirstOpen = true;
            DGW.global.api.requests.checkServerAvailability();
        }
    }, 50);
};

DGW.global.api.requests.checkServerAvailability = function(){
    DGW.global.api.generic('getApp', function(result){
        if (result.error && result.status == 500) {
            DGW.helpers.console.error('checkServerAvailability no-server', result);
        } else {
            DGW.helpers.console.info('checkServerAvailability: ', result);

            //TODO: refactor later
            DGW.global.club.name = result.data.FoundationName;
            DGW.global.api.requests.getDraws(DGW.global.api.requests.initMainFlow);
        }
    });
};

DGW.global.api.requests.initMainFlow = function(){
    var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    if (isSafari && !DGW.global.safariFix) {
        DGW.global.api.requests.readServerCookie('safarifix', function (response) {
            if (!response) {
                DGW.global.methods.safariFixInit();
            } else {
                DGW.global.safariFix = true;
                DGW.global.api.requests.checkServerAvailability();
            }
        });
    } else {
        if (DGW.global.type == 'club') {
            DGW.global.api.requests.setServerCookie(DGW.global.club.name, function (response) {
                if (response) {
                    DGW.global.methods.init();
                } else {
                    DGW.helpers.console.warn('no third party cookies enabled');
                }
            });
        } else if (DGW.global.type == 'sponsor') {
            DGW.global.api.requests.readServerCookie(DGW.global.club.name, function (response) {
                if (response == 1) {
                    DGW.global.methods.init();
                }
            });
        } else {
            DGW.helpers.console.warn('Please, add "data-type" attribute to the widget');
        }
    }
};

DGW.global.api.requests.setServerCookie = function(cookieName, _callback){
    DGW.global.api.rpc.writeClubCookie(cookieName, function onSuccess(response){
        DGW.helpers.console.info(response);
        if (_callback) _callback(response);
    });
};

DGW.global.api.requests.readServerCookie = function(cookieName, _callback){
    DGW.global.api.rpc.readClubCookie(cookieName, function onSuccess(response){
        DGW.helpers.console.info(response);
        if (_callback) _callback(response);
    });
};

DGW.global.api.requests.signUp = function(userObj, onSuccess, onError){
    DGW.global.api.generic('signUp', function(result){
        if (result.status == 200) {
            DGW.helpers.console.info('signUp: ', result.data);
            DGW.global.authorized = true;
            DGW.global.methods.authorize();
            DGW.main.methods.profileSetData(result.data);
            if (onSuccess) onSuccess(result.data);
        } else {
            DGW.global.authorized = false;
            DGW.helpers.console.error('signUp ', result.error);
            if (onError) onError(result.error);
        }
    }, {
        Username: userObj.Username,
        Email: userObj.Email,
        Password: userObj.Password
    });
};

DGW.global.api.requests.signIn = function(userObj, onSuccess, onError){
    DGW.global.api.generic('signIn', function(result){
        if (result.status == 200) {
            DGW.helpers.console.info('signIn ', result.data);
            DGW.global.methods.authorize();
            DGW.main.methods.profileSetData(result.data);
            DGW.global.authorized = true;
            if (onSuccess) onSuccess(result.data);
        } else {
            DGW.global.authorized = false;
            DGW.helpers.console.error('signIn ', result.error);
            if (onError) onError(result.error);
        }
    }, {
        Email: userObj.Email,
        Password: userObj.Password
    });
};

DGW.global.api.requests.signOut = function(){
    DGW.global.api.generic('signOut', function(){
        //TODO: review it later, maybe
        DGW.helpers.console.info('Signed out');
        DGW.global.authorized = false;
        DGW.global.methods.unAuthorize();
    });
};

DGW.global.api.requests.forgotPass = function(email, onSuccess, onError){
    DGW.global.api.generic('forgotPass', function(result){
        if (result.status == 200) {
            DGW.helpers.console.info('forgotPass ', result.data);
            if (onSuccess) onSuccess(result.data);
        } else {
            DGW.helpers.console.error('forgotPass ', result.error);
            if (onError) onError(result.error);
        }
    }, {
        Email: email
    });
};

DGW.global.api.requests.getUser = function(onSuccess, onError){
    DGW.global.api.generic('getUser', function(result){
        if (result.status == 200) {
            DGW.helpers.console.info('getUser success ', result.data);
            if (DGW.global.authorized === false) {
                DGW.global.authorized = true;
                DGW.global.methods.authorize();
            }
            DGW.main.methods.profileSetData(result.data);
            if (onSuccess) onSuccess(result.data);
        } else {
            DGW.global.authorized = false;
            DGW.helpers.console.error('getUser anon ', result);
            if (onError) onError(result.error);
        }
    });
};

DGW.global.api.requests.getDraws = function(onSuccess, onError){
    DGW.global.api.generic('getDraws', function(result) {
        if (result.status == 200) {
            DGW.helpers.console.info('getDraws ', result.data);
            DGW.main.cache.drawsList = result.data.Draws.sort(function(a,b){return new Date(b.EndDate) - new Date(a.EndDate)});

            DGW.global.cache.last.winner = DGW.main.cache.drawsList.filter(function(draw){return draw.Winner !== null})[0].Winner;
            DGW.global.cache.last.prize = DGW.main.cache.drawsList[0].Prize;

            if (DGW.global.authorized == true) {
                DGW.global.api.requests.getDrawEntries();
            } else {
                DGW.main.methods.drawsConstructor(DGW.main.cache);
            }
            if (onSuccess) onSuccess(result.data);
        } else {
            DGW.helpers.console.error('getDraws ', result.error);
            if (onError) onError(result.error);
        }
    });
};

DGW.global.api.requests.getDrawEntries = function(onSuccess, onError){
    DGW.global.api.generic('getDrawEntries', function(result){
        if (result.status == 200) {
            DGW.helpers.console.info('getDrawEntries ', result.data);
            DGW.main.cache.drawsEntries = result.data.DrawEntries;

            DGW.main.methods.drawsConstructor(DGW.main.cache);
            if (onSuccess) onSuccess(result.data);
        } else {
            DGW.helpers.console.error('getDrawEntries ', result.error);
            if (onError) onError(result.error);
        }
    });
};

DGW.global.api.requests.drawBet = function(drawId, pointsAmount, onSuccess, onError){
    DGW.global.api.generic('drawBet', function(result){
        if (result.status == 200) {
            DGW.helpers.console.info('drawBet ', result);
            DGW.global.api.requests.getDrawEntries();
            DGW.main.methods.updateUserInfoBet(result.data.DrawEntry, result.data.User);
            if (onSuccess) onSuccess(result.data);
        } else {
            if (onError) onError(result.error);
            DGW.helpers.console.error('drawBet ', result.error);
        }
    },{
        DrawId: drawId,
        PointsAmount: pointsAmount
    });
};

DGW.global.api.requests.drawPlayers = function(drawId, onSuccess, onError){
    DGW.global.api.generic('drawPlayers', function(result){
        if (result.status == 200) {
            DGW.helpers.console.info('drawPlayers ', result);
            if (onSuccess) onSuccess(result.data);
        } else {
            if (onError) onError(result.error);
            DGW.helpers.console.error('drawPlayers ', result.error);
        }
    }, drawId);
};

DGW.global.api.requests.claimPrize = function(drawId, address, onSuccess, onError){
    DGW.global.api.generic('claimPrize', function(result){
        if (result.status == 200) {
            if (onSuccess) onSuccess(result.data);
        } else {
            if (onError) onError(result.error);
            DGW.helpers.console.error(result.error);
        }
    },{
        DrawId: drawId,
        Address1: address.Address1,
        Address2: address.Address2,
        County: address.County,
        Postcode: address.Postcode
    });
};

DGW.global.api.requests.connectFB = function(onSuccess, onError){
    DGW.helpers.centerWindowPopup(DGW.global.envPath +
    'auth/facebook?api_key=' + DGW.global.api.apiKey, 'fbWindow', 460, 340, function(){
        if(onSuccess) onSuccess();
    });
};

DGW.global.api.requests.getAllActivities = function(onSuccess, onError){
    DGW.global.api.generic('getAllActivities', function(result){
        if (result.status == 200) {
            DGW.helpers.console.info('getAllActivities ', result.data);
            DGW.main.methods.activitiesConstructor(result.data.Activities);
            if (onSuccess) onSuccess(result.data);
        } else {
            DGW.helpers.console.error('getAllActivities ', result.error);
            if (onError) onError(result.error);
        }
    });
};

DGW.global.api.requests.getUserActivities = function(onSuccess, onError){
    DGW.global.api.generic('getUserActivities', function(result){
        if (result.status == 200) {
            DGW.helpers.console.info('getUserActivities ', result.data);
            DGW.main.methods.activitiesConstructor(result.data.Activities);
            if (onSuccess) onSuccess(result.data);
        } else {
            DGW.helpers.console.error('getUserActivities ', result.error);
            if (onError) onError(result.error);
        }
    });
};

DGW.global.api.requests.getOffers = function(onSuccess, onError){
    DGW.global.api.generic('getOffers', function(result){
        if (result.status == 200) {
            DGW.helpers.console.info('getOffers ', result.data);
            DGW.main.methods.offersConstructor(result.data);
            if (onSuccess) onSuccess(result.data);
        } else {
            DGW.helpers.console.error('getOffers ', result.error);
            if (onError) onError(result.error);
        }
    });
};

DGW.global.api.requests.getUserOffers = function(onSuccess, onError){
    DGW.global.api.generic('getUserOffers', function(result){
        if (result.status == 200) {
            DGW.helpers.console.info('getUserOffers ', result.data);
            DGW.main.methods.offersConstructor(result.data);
            if (onSuccess) onSuccess(result.data);
        } else {
            DGW.helpers.console.error('getUserOffers ', result.error);
            if (onError) onError(result.error);
        }
    });
};

DGW.global.api.requests.trackOffer = function(offerId, onSuccess, onError){
    DGW.global.api.generic('trackOffer', function(result){
        if (result.status == 200) {
            DGW.helpers.console.info(result.data);
            DGW.helpers.console.info('Tracking of ' + offerId + ' has started');
            if (onSuccess) onSuccess(result.data);
        } else {
            DGW.helpers.console.error('trackOffer ', result.error);
            if (onError) onError(result.error);
        }
    }, {
        OfferId: offerId
    });
};

DGW.global.api.requests.completeOffer = function(offerId, onSuccess, onError){
    DGW.global.api.generic('completeOffer', function(result){
        if (result.status == 200) {
            DGW.helpers.console.info(result.data);
            DGW.helpers.console.info('Offer ' + offerId + ' has been completed');
            DGW.global.api.requests.getUser();
            DGW.global.api.requests.getUserOffers();
            if (onSuccess) onSuccess(result.data);
        } else {
            DGW.helpers.console.error('completeOffer ', result.error);
            if (onError) onError(result.error);
        }
    }, {
        OfferId: offerId
    });
};

DGW.global.api.requests.cancelOffer = function(offerId, onSuccess, onError){
    DGW.global.api.generic('cancelOffer', function(result){
        if (result.status == 200) {
            DGW.helpers.console.info(result.data);
            DGW.helpers.console.info('Offer ' + offerId + ' has been cancelled');
            DGW.global.api.requests.getUser();
            DGW.global.api.requests.getUserOffers();
            if (onSuccess) onSuccess(result.data);
        } else {
            DGW.helpers.console.error('cancelOffer ', result.error);
            if (onError) onError(result.error);
        }
    }, {
        OfferId: offerId
    });
};

DGW.global.api.requests.getActions = function(onSuccess, onError){
    DGW.global.api.generic('getActions', function(result){
        if (result.status == 200) {
            DGW.helpers.console.info('getActions ', result.data);
            DGW.main.cache.rewardedActions = result.data.Actions;
            DGW.main.methods.setRewardedActions();
            if (onSuccess) onSuccess(result.data);
        } else {
            DGW.helpers.console.error('getActions ', result.error);
            if (onError) onError(result.error);
        }
    });
};

DGW.global.api.requests.getUserActions = function(onSuccess, onError){
    DGW.global.api.generic('getUserActions', function(result){
        if (result.status == 200) {
            DGW.helpers.console.info('getUserActions ', result.data);
            DGW.main.cache.rewardedActions = result.data.Actions;
            DGW.main.methods.setRewardedActions();
            if (onSuccess) onSuccess(result.data);
        } else {
            DGW.helpers.console.error('getUserActions ', result.error);
            if (onError) onError(result.error);
        }
    });
};

DGW.global.api.requests.trackAction = function(actionType, onSuccess, onError){
    DGW.global.api.generic('trackAction', function(result){
            if (result.status == 200) {
                DGW.helpers.console.info('trackAction ', result.data);
                DGW.global.api.requests.getUserActions();
                DGW.global.api.requests.getUser();

                if (result.data.RewardResult) {
                    // rewarded
                    //DGW.main.methods.notificationConstructor()
                    if (onSuccess) onSuccess(result.data);
                } else {

                }
            } else {
                DGW.helpers.console.error('trackAction ', result.error);
                if (onError) onError(result.error);
            }
        },
        {
            RewardedActionTypeId: actionType
        });
};


DGW.global.api.requests.getLeaderboard = function(onSuccess, onError){
    DGW.global.api.generic('getLeaderboard', function(result){
        if (result.status == 200) {
            DGW.helpers.console.info('getLeaderboard ', result.data);
            DGW.main.methods.leaderboardConstructor(result.data.Earners);
            if (onSuccess) onSuccess(result.data);
        } else {
            DGW.helpers.console.error('getLeaderboard ', result.error);
            if (onError) onError(result.error);
        }
    });
};

DGW.global.api.requests.getAllBadges = function(onSuccess, onError){
    DGW.global.api.generic('getBadges', function(result){
        if (result.status == 200) {
            DGW.helpers.console.info('getBadges ', result.data);
            DGW.global.userStats.badges.all = result.data.Badges;
            DGW.global.api.requests.getEarnedBadges();
            if (onSuccess) onSuccess(result.data);
        } else {
            DGW.helpers.console.error('getBadges ', result.error);
            if (onError) onError(result.error);
        }
    });
};

DGW.global.api.requests.getEarnedBadges = function(onSuccess, onError){
    DGW.global.api.generic('getEarnedBadges', function(result){
        if (result.status == 200) {
            DGW.helpers.console.info('getEarnedBadges ', result.data);
            DGW.global.userStats.badges.earned = result.data.EarnedBadges;
            DGW.main.methods.updateBadgesInfo();
            if (onSuccess) onSuccess(result.data);
        } else {
            DGW.helpers.console.error('getEarnedBadges ', result.error);
            if (onError) onError(result.error);
        }
    });
};

DGW.global.api.requests.shareRewardAction = function(drawId, onSuccess, onError){
    DGW.global.api.generic('shareRewardAction', function(result){
        if (result.status == 200) {
            DGW.helpers.console.info('shareRewardedAction: ', result.data);
            if (onSuccess) onSuccess(result.data);
        } else {
            DGW.helpers.console.error('shareRewardedAction: ', result.error);
            if (onError) onError(result.error);
        }
    }, drawId)
};
DGW.global.offers.requests.shareOfferFb = function(offerId){
    DGW.helpers.centerWindowPopup(DGW.global.envPath +
    'offer/facebookshare?api_key=' + DGW.global.api.apiKey + '&offerid=' + offerId, 'fbWindow', 460, 340, function(){
        DGW.global.api.requests.getUserOffers();
    });
};

DGW.global.offers.requests.shareOfferTw = function(offerId, offerShareUrl){
    DGW.global.api.requests.trackOffer(offerId);

    DGW.helpers.centerWindowPopup('https://twitter.com/intent/tweet?text=Some+offer+text&url=' + encodeURIComponent(offerShareUrl), 'twWindow', 460, 340, function(){
        DGW.global.api.requests.completeOffer(offerId,
            function onSuccess(){
                DGW.main.methods.notificationConstructor('Cool, you\'ve just earned more points for Sharing on Twitter');
            });
    });
};

DGW.global.actions.requests.shareFb = function(drawId, _winner){
    var win = DGW.helpers.createCenteredWindow('shareFbAction', 460, 340);
    DGW.global.api.requests.shareRewardAction(drawId, function onSuccess(urls){
        DGW.helpers.centerWindowPopup(DGW.global.envPath +
            'rewardedaction/facebookshare?api_key=' + DGW.global.api.apiKey + '&shareurl=' + encodeURIComponent((!_winner) ? urls.ShareUrl : urls.WinnerShareUrl),
            'fbWindow2', 460, 340, function(){
                DGW.global.api.requests.getUser();
                DGW.global.api.requests.getUserActions();
        }, win);
    });
};

DGW.global.actions.requests.shareTw = function(drawId, text, _winner){
    var win = DGW.helpers.createCenteredWindow('shareTwAction', 460, 340);
    DGW.global.api.requests.shareRewardAction(drawId, function onSuccess(urls){
        DGW.helpers.centerWindowPopup('https://twitter.com/intent/tweet?text=' + text +
            '&url=' + encodeURIComponent((!_winner) ? urls.ShareUrl : urls.WinnerShareUrl) + '&hashtags=' + DGW.global.club.name,
            'twWindow2', 460, 340, function(){
                //DGW.global.api.requests.getUserActions();
                DGW.global.api.requests.trackAction(5, function onSuccess(){
                    DGW.main.methods.notificationConstructor('Cool, you\'ve just earned more points for Sharing on Twitter');
                });
            }, win);
    });
};

DGW.global.offers.requests.watchVideo = function(offerId, videoUrl){
    var player;
    var scriptCheckingInterval, widgetShownInterval, playbackInterval;
    var wCloseBtn = DGW.main.elements.widget.querySelector('.dg-o-w-close');

    if (!window.YT) {
        var ytScript = document.createElement('script');

        ytScript.onload = function () {
            showVideoOffer();
        };

        ytScript.src = 'https://www.youtube.com/player_api';
        document.head.appendChild(ytScript);
    } else {
        showVideoOffer();
    }

    function onYouTubePlayerAPIReady() {
        player = new YT.Player('dg-o-w-video-playing', {
            height: DGW.main.elements.widgetBody.clientHeight,
            width: DGW.main.elements.widgetBody.clientWidth,
            videoId: DGW.helpers.getURLParameter('v', videoUrl),
            playerVars: {
                controls: 0,
                rel: 0,
                origin: window.document.origin,
                fs: 0,
                modestbranding: 1 // player that does not show a YouTube logo
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }

    // autoplay video
    function onPlayerReady(event) {
        event.target.playVideo();
        DGW.global.api.requests.trackOffer(offerId);
        widgetShownInterval = window.setInterval(function(){
            if (DGW.main.shown == false) {
                cancelVideoOffer();
            }
        }, 100);
        playbackInterval = window.setInterval(function(){
            DGW.main.elements.pages.videoHolder.querySelector('span').innerHTML =
                Math.floor(player.getDuration() - player.getCurrentTime());
        }, 1000);
        DGW.helpers.console.log('Video has started')
    }

    // when video ends
    function onPlayerStateChange(event) {
        if(event.data === 0) {
            // Video has finished
            hidePlayer();
            DGW.global.api.requests.completeOffer(offerId, function onSuccess(){
                DGW.main.methods.notificationConstructor('Cool, you\'ve just earned more points for Watching this cool video');
            });
            DGW.helpers.console.log('Video has finished');
        }
    }

    function cancelVideoOffer(){
        DGW.global.api.requests.cancelOffer(offerId);
        hidePlayer();
    }

    function hidePlayer(){
        DGW.helpers.addClass(DGW.main.elements.pages.videoHolder.querySelector('.dg-o-w-video-holder'), 'dg-video-hidden');
        setTimeout(function(){
            DGW.main.elements.widgetBody.removeChild(DGW.main.elements.pages.videoHolder);
            DGW.helpers.removeClass(DGW.main.elements.pages.videoHolder.querySelector('.dg-o-w-video-holder'), 'dg-video-hidden');
        }, 320);
        DGW.main.elements.pages.videoHolder.querySelector('span').innerHTML = '';
        window.clearInterval(widgetShownInterval);
        window.clearInterval(playbackInterval);

        wCloseBtn.removeEventListener('click', cancelVideoOffer);
        wCloseBtn.addEventListener('click', DGW.main.methods.hideWidget);
    }

    function showVideoOffer(){
        scriptCheckingInterval = window.setInterval(function(){
            if (window.YT.Player) {
                window.clearInterval(scriptCheckingInterval);
                DGW.main.elements.widgetBody.appendChild(DGW.main.elements.pages.videoHolder);

                wCloseBtn.removeEventListener('click', DGW.main.methods.hideWidget);
                wCloseBtn.addEventListener('click', cancelVideoOffer);
                window.setTimeout(function(){
                    onYouTubePlayerAPIReady();
                }, 0);
            }
        }, 50);
    }
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

DGW.helpers.drawsTimerConstr = function(params){
    var draws;
    var _second = 1000;
    var _minute = _second * 60;
    var _hour = _minute * 60;
    var _day = _hour * 24;
    var timer;

    function checkExpirationDate(draw){

        //var end = new Date(draw.dt + 'Z');
        var end = (draw.dt.substring(draw.dt.length - 1).toLowerCase() == 'z') ? new Date(draw.dt) : new Date(draw.dt + 'Z');
        var now = new Date();
        if ((end - now) > 0) {
            return true;
        } else {
            return false;
        }
    }

    function updateTime(){
        draws.forEach(function(draw){

            //var end = new Date(draw.dt + 'Z');
            var end = (draw.dt.substring(draw.dt.length - 1).toLowerCase() == 'z') ? new Date(draw.dt) : new Date(draw.dt + 'Z');

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

DGW.helpers.checkImagesForSrc = function(src) {
    if (src) {
        return src;
    } else {
        return DGW.global.widgetPathName + 'imgs/avatar-placeholder.png'
    }
};

DGW.helpers.centerWindowPopup = function(url, title, w, h, _callback, _win){
    var windowCheckCloseInterval;
    var fbWindow;

    if (_win) {
        fbWindow = _win;
    } else {
        fbWindow = DGW.helpers.createCenteredWindow(title, w, h);
    }
    fbWindow.location.href = url;

    // Puts focus on the newWindow
    if (window.focus) {
        fbWindow.focus();
    }

    windowCheckCloseInterval = window.setInterval(function(){
        if (fbWindow.closed) {
            clearInterval(windowCheckCloseInterval);
            fbWindow = null;
            if (_callback) _callback();
            DGW.global.api.requests.getUser();
        }
    }, 50);
};

DGW.helpers.createCenteredWindow = function(title, w, h){
    // Fixes dual-screen position                         Most browsers      Firefox
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;
    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 2) - (h / 2)) + dualScreenTop;

    return window.open('', title, 'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
};

DGW.helpers.getDateFromNow = (function(undefined){
    var SECOND = 1000,
        MINUTE = 60 * SECOND,
        HOUR = 60 * MINUTE,
        DAY = 24 * HOUR,
        WEEK = 7 * DAY,
        YEAR = DAY * 365,
        MONTH = YEAR / 12;

    var formats = [
        [ 0.7 * MINUTE, 'just now' ],
        [ 1.5 * MINUTE, 'a minute ago' ],
        [ 60 * MINUTE, 'minutes ago', MINUTE ],
        [ 1.5 * HOUR, 'an hour ago' ],
        [ DAY, 'hours ago', HOUR ],
        [ 2 * DAY, 'yesterday' ],
        [ 7 * DAY, 'days ago', DAY ],
        [ 1.5 * WEEK, 'a week ago'],
        [ MONTH, 'weeks ago', WEEK ],
        [ 1.5 * MONTH, 'a month ago' ],
        [ YEAR, 'months ago', MONTH ],
        [ 1.5 * YEAR, 'a year ago' ],
        [ Number.MAX_VALUE, 'years ago', YEAR ]
    ];

    function relativeDate(input,reference){
        input = (input.substring(input.length - 1).toLowerCase() == 'z') ? input : input + 'Z';
        input = new Date(input);
        !reference && ( reference = (new Date).getTime() );
        reference instanceof Date && ( reference = reference.getTime() );
        input instanceof Date && ( input = input.getTime() );

        var delta = reference - input,
            format, i, len;

        for(i = -1, len=formats.length; ++i < len;){
            format = formats[i];
            if(delta < format[0]){
                return format[2] == undefined ? format[1] : Math.round(delta/format[2]) + ' ' + format[1];
            }
        }
    }

    return relativeDate;
})();

DGW.helpers.dateDiff = function(endDate){
    endDate = (endDate.substring(endDate.length - 1).toLowerCase() == 'z') ? endDate : endDate + 'Z';
    return new Date(endDate) - new Date();
};

// TODO: remove " + 'Z' " from helpers, when server provides right time format

DGW.helpers.getURLParameter = function(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
};

DGW.helpers.console = (function(){
    return {
        log: function(){
            if (DGW.global.debug)
                console.log.apply(console, Array.prototype.slice.call(arguments));
        },
        info: function(){
            if (DGW.global.debug)
                console.info.apply(console, Array.prototype.slice.call(arguments));
        },
        warn: function(){
            if (DGW.global.debug)
                console.warn.apply(console, Array.prototype.slice.call(arguments));
        },
        error: function(){
            if (DGW.global.debug)
                console.error.apply(console, Array.prototype.slice.call(arguments));
        }
    };
})();

DGW.helpers.errorParser = function(error) {
    error = JSON.parse(error);
    var errorsArray = [];
    var errorsFields = [];
    if (error.ModelState) {
        for (var model in error.ModelState) {
            if (DGW.helpers.isArray(error.ModelState[model])) {
                error.ModelState[model].forEach(function(el){
                    errorsArray.push(el);
                });
                errorsFields.push(model.substr(6).toLowerCase());
            }
        }
    } else {
        return {messages: error.Message}
    }

    // TODO: use errorsFields as names for inputs
    return {messages: errorsArray, inputs: errorsFields}
};

DGW.helpers.insertAfter = function (newNode, referenceNode, _fallbackNode) {
    if (referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    } else {
        if (_fallbackNode) _fallbackNode.appendChild(newNode);
    }
};

DGW.helpers.zeroTimeout = function(callback){
    window.setTimeout(callback, 0);
};
DGW.templates.sideWidgetCore = '<div id="dg-side-widget-wrapper">' +
                                    '<div class="dg-side-widget-body">' +
                                        '<div class="dg-side-widget-content dg-o-w-authorized">' +
                                            '<div class="dg-side-widget-content-inner">' +
                                                '<div class="dg-side-section"><div class="dg-side-img-holder no-border"><img id="dg-side-widget-userpic" class="avatar" src="" /></div>' +
                                                    '<div class="dg-side-expanded">' +
                                                        '<h4 id="dg-side-widget-name">Name Surname Whatever</h4>' +
                                                        '<h6><span id="dg-side-points">00</span> | <span id="dg-side-credits">00</span></h6>' +
                                                    '</div>' +
                                                '</div>' +
                                                '<div class="dg-side-collapsed"><p><span id="dg-side-points-collapsed"></span> pts</p></div>' +
                                                '<div class="dg-side-expanded"><p>Earned: <span>15</span> pts | left: <span>5</span>pts</p></div>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="dg-side-widget-content dg-o-w-anonymous">' +
                                            '<div class="dg-side-widget-content-inner">' +
                                                '<div class="dg-side-section">' +
                                                    '<div class="dg-side-img-holder"><img class="dg-side-prize" src="" alt="Prize" /></div>' +
                                                    '<div class="dg-side-expanded"><p id="dg-side-widget-prize-desc"></p></div>' +
                                                '</div>' +
                                                '<div class="dg-side-collapsed"><div class="dg-side-cta">Get it</div></div>' +
                                                '<div class="dg-side-expanded"><div class="dg-side-cta">Get the prize</div></div>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="dg-side-widget-resizer"></div>' +
                                    '</div>' +
                               '</div>';

DGW.templates.mainWidgetCore = '<div id="dg-o-w-wrapper">' +
                                    '<div class="dg-o-w-overlay">' +
                                        '<div class="dg-o-w-body">' +
                                            '<div class="dg-o-w-body-wrapper">' +
                                                '<div class="dg-o-w-header">' +
                                                    '<div class="dg-o-w-logo"></div>' +
                                                    '<div class="dg-o-w-menu">' +
                                                        '<ul><li class="earn-menu-item">Earn</li>' +
                                                        '<li class="draws-menu-item">Draws & Games</li>' +
                                                        '<li class="activities-menu-item">Activities</li></ul>' +
                                                    '</div>' +
                                                    '<div class="dg-o-w-menu-profile">' +
                                                        '<div class="profile-menu-item">' +
                                                            '<img class="avatar" src="" />' +
                                                            '<div class="profile-menu-unauthorized">' +
                                                                '<div>' +
                                                                    '<h4>Hello, guest!</h4>' +
                                                                    '<div class="dg-o-w-login-dropdown">' +
                                                                        '<a href="#">Log in by email</a>' +
                                                                        '<div class="dg-o-w-email-login-form">' +
                                                                            '<form class="shown" id="dg-o-w-form-login-top">' +
                                                                                '<label>Email <input type="email" placeholder="mail@mail.com" /></label>' +
                                                                                '<label>Password <input type="password" /></label>' +
                                                                                '<input type="submit" value="Sign In" />' +
                                                                                '<a href="#" class="">Forgot your password?</a>' +
                                                                            '</form>' +
                                                                            '<form id="dg-o-w-form-forgot-top">' +
                                                                                '<div><label>Email <input type="email" placeholder="mail@mail.com" /></label>' +
                                                                                '<input type="submit" value="Request new password" />' +
                                                                                '<a href="#" class="">&larr; Back</a></div>' +
                                                                                '<p class="success-message">Email was sent</p>' +
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
                                                            '<div class="inline-part"><h3>Log in with Facebook and get +<span id="dg-o-w-login-fb-reward" class="dg-o-w-rewarded-action">30</span> points</h3></div>' +
                                                            '<div class="inline-part"><a href="#" id="dg-o-w-footer-fb-connect" class="btn-radius btn-large btn-brand">Facebook</a></div>' +
                                                            '<div class="inline-part"><p>or</p></div>' +
                                                            '<div class="inline-part"><a id="dg-o-w-footer-email-login" href="#" class="btn-radius btn-large btn-white">Sign up with email</a></div>' +
                                                        '</div>' +
                                                        '<div class="footer-section footer-section-step-2">' +
                                                            '<div>' +
                                                                '<a id="dg-o-w-footer-login-select" href="#" class="btn-back-footer">&larr; Back</a><form id="dg-o-w-footer-signup-email">' +
                                                                    '<div class="inline-part"><label>Name <input type="text" placeholder="First Name" /></label></div>' +
                                                                    '<div class="inline-part"><label>Email <input type="email" placeholder="mail@mail.com" /></label></div>' +
                                                                    '<div class="inline-part"><label>&nbsp; <input class="btn-dg-o-w-outline" type="submit" value="Submit" /></label></div>' +
                                                                '</form>' +
                                                            '</div>' +
                                                        '</div>' +
                                                        '<div class="footer-section footer-section-step-3">' +
                                                            '<div>' +
                                                                '<a id="dg-o-w-footer-login-select-2" href="#" class="btn-back-footer">&larr; Back</a><form id="dg-o-w-footer-signup-pass">' +
                                                                    '<div class="inline-part"><label>Password <input type="password" /></label></div>' +
                                                                    '<div class="inline-part"><label>&nbsp; <input class="btn-dg-o-w-outline" type="submit" value="Sign Up" /></label></div>' +
                                                                '</form>' +
                                                            '</div>' +
                                                        '</div>' +
                                                    '</footer>' +
                                                '</div></div>' +
                                            '</div>' +
                                            '<div class="dg-o-w-close">&times;</div>' +
                                            '<div class="dg-o-w-spinner">' +
                                                '<div class="sk-circle1 sk-circle"></div><div class="sk-circle2 sk-circle"></div><div class="sk-circle3 sk-circle"></div>' +
                                                '<div class="sk-circle4 sk-circle"></div><div class="sk-circle5 sk-circle"></div><div class="sk-circle6 sk-circle"></div>' +
                                                '<div class="sk-circle7 sk-circle"></div><div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div>' +
                                                '<div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div><div class="sk-circle12 sk-circle"></div>' +
                                            '</div>' +
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
                            '<h3>Complete the tasks and earn +<span></span> points today</h3>' +
                            '<ul class="dg-o-w-list-offers"></ul>' +
                        '</div>';

DGW.templates.drawsMain = '<div class="dg-o-w-submenu">' +
                            '<ul><li class="dg-o-w-active" id="dg-o-w-show-all-draws">All draws</li><li id="dg-o-w-show-finished-soon">Finished soon</li>' +
                                '<li id="dg-o-w-show-my-draws">My draws</li><li id="dg-o-w-show-games">Games</li></ul>' +
                            '<label class="checkbox-slider">Show finished draws <input id="dg-o-w-show-expired" type="checkbox" class="ios-switch bigswitch" /><div><div></div></div></label>' +
                        '</div>' +
                        '<div class="dg-o-w-section-content">' +
                            '<div class="dg-o-w-draws-active">' +
                            '<ul class="dg-o-w-list-draws"></ul></div>' +
                            '<div class="dg-o-w-draws-no-active"><h2>Sorry, but there are no draws running at the moment.</h2><br/><div class="dg-o-w-draws-refresh"></div></div>' +
                            '<div class="dg-o-w-draws-no-in-draws"><h2>Seems like you don\'t playing any current draw :(</h2></div>' +
                        '</div>';

DGW.templates.profileMain = '<div class="dg-o-w-profile">' +
                                '<div class="dg-o-w-left-side">' +
                                    '<div class="dg-o-w-image-holder"><img id="profileImage" class="avatar" src="" /></div>' +
                                    // TODO: hide until we have invite friends functionality
                                    /*
                                    '<p><span id="profileFriendsAmount">15</span> friends</p>' +
                                    */
                                '</div>' +
                                '<div class="dg-o-w-right-side">' +
                                    '<div class="dg-o-w-profile-top">' +
                                        '<div class="dg-o-w-float-left"><h3 id="profileName">Captain Deadpool</h3><h5><span id="dg-o-w-badges-earned-amount"></span> badges</h5></div>' +
                                        '<div class="dg-o-w-float-right">' +
                                            '<div class="dg-o-w-profile-points"><h3>115</h3><h5>20</h5></div>' +
                                            '<div class="dg-o-w-profile-credits"><h3>215.20</h3><h5>25.15</h5></div>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="dg-o-w-profile-earnings-info">' +
                                        '<p class="color-brand-light">Today earned: <span>15</span> pts | left: <span>5</span>pts</p>' +
                                        '<p id="dg-o-w-login-fb-text">Get +<span class="dg-o-w-rewarded-action" id="dg-o-w-login-fb-reward">50</span> additional points by adding your other accounts from ' +
                                            '<a href="#" class="dg-o-w-fb-connect"></a></p>' +
                                    '</div>' +
                                    '<div class="dg-o-w-profile-progress"><div style="width:35%;"></div></div>' +
                                    '<div class="dg-o-w-profile-bottom">' +
                                        '<div class="dg-o-w-profile-invite dg-o-w-float-left">' +
                                            // TODO: hide until we have invite friends functionality
                                            /*
                                            '<p class="color-brand-light"><a href="#" class="btn-dg-o-w-outline">Invite more friends</a>' +
                                            ' and get +<span class="dg-o-w-rewarded-action" id="dg-o-w-friends-sign-up-reward">50</span> points for each friend</p>' +
                                            */
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
                                '<div class="dg-o-w-left-side"><div class="dg-o-w-image-holder"><div class="dg-o-w-brand-player-image"></div></div></div>' +
                                '<div class="dg-o-w-right-side">' +
                                    '<h1>Win exclusive prizes handling simple tasks</h1>' +
                                    '<div class="dg-o-w-login-winners">' +
                                        '<img class="avatar" src="" />' +
                                        '<div><h4><span></span> has won a signed t-shirt!</h4><h5>Sign up and get your own prize now</h5></div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>';

DGW.templates.activitiesMain = '<div class="dg-o-w-submenu"><ul><li class="toggle-section-height"><div></div></li><li class="dg-o-w-active">Leaderboard</li></ul></div>' +
                                '<div class="dg-o-w-activities">' +
                                    '<div class="dg-o-w-activity-slider-holder">' +
                                        '<div class="dg-o-w-activity-slider-controls">' +
                                            '<div class="dg-o-w-activity-slider-prev dg-o-w-arrow dg-o-w-arrow-left"></div><div class="dg-o-w-activity-slider-next dg-o-w-arrow dg-o-w-arrow-right"></div>' +
                                        '</div>' +
                                        '<div class="dg-o-w-activity-slider"><ul></ul></div>' +
                                    '</div>' +
                                '</div>' +
                                '<div class="dg-o-w-section-content">' +
                                    '<div class="dg-o-w-activities-header">' +
                                        '<p class="dg-o-w-float-left">Activities for today</p>' +
                                        // TODO: don't show until we have invite friends functionality
                                        // '<p class="dg-o-w-floating-link"><a href="#">Invite more friends</a> and get +<span id="dg-o-w-friends-sign-up-reward" class="dg-o-w-rewarded-action">50</span> points for each</p>' +
                                        '<select id="dg-o-w-activities-filter" class="dg-o-w-float-right">' +
                                            '<option value="all-activities">All activities</option>' +
                                            '<option value="my-activities">My Activities</option>' +
                                        '</select>' +
                                    '</div>' +
                                    '<div class="dg-o-w-activities-holder"><ul></ul></div>' +
                                '</div>';

DGW.templates.videoHolder = '<div class="dg-o-w-video-holder"><div id="dg-o-w-video-playing"></div><div class="dg-o-w-video-text"><span></span></div></div>';

DGW.templates.notificationHolder = '<div class="dg-o-w-notification-holder"><ul></ul><div class="dg-o-w-notification-close">&times;</div></div>';
DGW.global.elements.documentBody = document.body;

DGW.side.elements.widget = document.createElement('div');
    DGW.side.elements.widget.id = 'dg-side-widget';
    DGW.side.elements.widget.innerHTML = DGW.templates.sideWidgetCore;
DGW.side.elements.widgetBody = DGW.side.elements.widget.querySelector('.dg-side-widget-body');

DGW.main.elements.widget = document.createElement('div');
    DGW.main.elements.widget.id = 'dg-o-w';
    DGW.main.elements.widget.innerHTML = DGW.templates.mainWidgetCore;
DGW.main.elements.widgetBody = DGW.main.elements.widget.querySelector('.dg-o-w-body');

DGW.main.elements.menuItems = {
    earn: DGW.main.elements.widget.querySelector('.dg-o-w-menu .earn-menu-item'),
    draws: DGW.main.elements.widget.querySelector('.dg-o-w-menu .draws-menu-item'),
    activities: DGW.main.elements.widget.querySelector('.dg-o-w-menu .activities-menu-item'),
    profile: DGW.main.elements.widget.querySelector('.dg-o-w-menu-profile .profile-menu-item img'),
    profileRegistered: DGW.main.elements.widget.querySelector('.dg-o-w-menu-profile .profile-menu-item .profile-menu-authorized')
};

DGW.main.elements.widgetContent = DGW.main.elements.widget.querySelector('.dg-o-w-content .dg-o-w-section section');
DGW.main.elements.widgetWrapper = DGW.main.elements.widget.querySelector('.dg-o-w-body-wrapper');

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

DGW.main.elements.pages.videoHolder = document.createElement('div');
    DGW.main.elements.pages.videoHolder.innerHTML = DGW.templates.videoHolder;

DGW.main.elements.pages.notificationHolder = document.createElement('div');
    DGW.main.elements.pages.notificationHolder.innerHTML = DGW.templates.notificationHolder;
    DGW.main.elements.pages.notificationHolder = DGW.main.elements.pages.notificationHolder.querySelector('div');

DGW.main.elements.activitiesSliderParent = DGW.main.elements.pages.activitiesMain.querySelector('.dg-o-w-activities');


// Main widget global methods
DGW.main.methods.showWidget = function(){
    DGW.helpers.zeroTimeout(function(){ DGW.main.shown = true; }); // Fixing IE button click
    DGW.helpers.removeClass(DGW.main.elements.widget, 'hiding');
    DGW.global.elements.documentBody.appendChild(DGW.main.elements.widget);
    if (DGW.main.currentState === '') {
        DGW.main.methods.changeMainState('earn');
    }
};
DGW.main.methods.hideWidget = function(){
    DGW.helpers.zeroTimeout(function(){ DGW.main.shown = false; });
    DGW.helpers.addClass(DGW.main.elements.widget, 'hiding');
    setTimeout(function(){
        DGW.global.elements.documentBody.removeChild(DGW.main.elements.widget);
    }, 310);
};

DGW.main.methods.loadingStarted = function(){
    DGW.helpers.addClass(DGW.main.elements.widgetBody, 'dg-o-w-loading');
};
DGW.main.methods.loadingFinished = function(){
    DGW.helpers.removeClass(DGW.main.elements.widgetBody, 'dg-o-w-loading');
};


// Side widget global methods
DGW.side.methods.showWidget = function(){
    DGW.global.elements.documentBody.appendChild(DGW.side.elements.widget);
};
DGW.side.methods.hideWidget = function(){
    DGW.global.elements.documentBody.removeChild(DGW.side.elements.widget);
};


DGW.global.methods.authorize = function(){
    DGW.helpers.addClass(DGW.main.elements.widgetBody, 'authorized');
    DGW.global.authorized = true;
    DGW.helpers.addClass(DGW.side.elements.widgetBody, 'dg-o-w-authorized');
    // ********
    if (DGW.main.currentState === 'profile') {
        DGW.main.methods.changeMainState('profile');
        // ********
    } else if (DGW.main.currentState === 'draws') {
        DGW.global.api.requests.getDraws();
    } else if (DGW.main.currentState === 'earn') {
        DGW.global.api.requests.getUserOffers();
    }

    DGW.global.api.requests.getUserActions();
};

DGW.global.methods.unAuthorize = function(){
    DGW.helpers.removeClass(DGW.main.elements.widgetBody, 'authorized');
    DGW.helpers.removeClass(DGW.side.elements.widgetBody, 'dg-o-w-authorized');
    DGW.global.authorized = false;
    if (DGW.main.currentState === 'profile') {
        DGW.main.methods.changeMainState('profile');
    }
    DGW.main.methods.resetStates();
};


DGW.global.methods.init = function(){

    // initialising widget events
    DGW.side.methods.initEvents();
    DGW.main.methods.initEvents();

    // adding notification panel to the DOM (hidden)
    DGW.main.elements.widgetWrapper.appendChild(DGW.main.elements.pages.notificationHolder);

    // filling user default data
    DGW.global.userStats.imageUrl = DGW.helpers.checkImagesForSrc();
    DGW.global.userStats.name = 'Guest';
    DGW.global.userStats.facebookId = null;
    DGW.global.userStats.pointsC = 0;
    DGW.global.userStats.pointsP = 0;
    DGW.global.userStats.creditsC = 0;
    DGW.global.userStats.creditsP = 0;
    DGW.global.userStats.badges = {
        all: {},
        earned: {}
    };

    // requesting basic apis to get some cached data
    DGW.global.api.requests.getDraws();
    DGW.global.api.requests.getActions();

    //Initializing or checking user
    DGW.global.api.requests.getUser();

    if (DGW.global.safariFixFirstOpen) {
        DGW.main.methods.showWidget();
    }
};

DGW.global.methods.safariFixInit = function(){
    DGW.side.methods.initSafariFixEvents();
};

DGW.main.methods.showNotificationBar = function(type){
    if (!type) type = 'success';
    DGW.helpers.addClass(DGW.main.elements.pages.notificationHolder, type);
};

DGW.main.methods.hideNotificationBar = function(){
    DGW.helpers.removeClass(DGW.main.elements.pages.notificationHolder, 'success');
    DGW.helpers.removeClass(DGW.main.elements.pages.notificationHolder, 'error');
};
DGW.side.methods.initEvents = function(){

    if (!DGW.global.launched) {
        // Showing side widget
        DGW.side.methods.showWidget();
        DGW.global.launched = true;
    }

    var initInterval;
    var wBody = DGW.side.elements.widgetBody;
    var resizerBtn = wBody.querySelector('.dg-side-widget-resizer');
    var ctas = Array.prototype.slice.call(wBody.querySelectorAll('.dg-side-cta'));
    var registeredArea = wBody.querySelector('.dg-side-widget-content.dg-o-w-authorized .dg-side-section');
    ctas.push(registeredArea);

    wBody.removeEventListener('click', DGW.global.api.requests.safariFix);

    resizerBtn.addEventListener('click', function(){
        if (DGW.helpers.hasClass(wBody, 'dg-side-widget-expanded')) {
            DGW.helpers.zeroTimeout(function(){DGW.helpers.removeClass(wBody, 'dg-side-widget-expanded');});
        } else {
            DGW.helpers.zeroTimeout(function(){DGW.helpers.addClass(wBody, 'dg-side-widget-expanded')});
        }
    });

    ctas.forEach(function(cta){
        cta.addEventListener('click', function(){
            if (!DGW.main.shown) {
                DGW.main.methods.showWidget();
            } else {
                DGW.main.methods.hideWidget();
            }
        });
    });


    initInterval = window.setInterval(function(){
        if (DGW.global.cache.last.prize) {
            window.clearInterval(initInterval);
            wBody.querySelector('.dg-side-prize').src = DGW.global.cache.last.prize.ImageUrl;
            wBody.querySelector('#dg-side-widget-prize-desc').innerHTML = DGW.global.cache.last.prize.Title;
        }
    }, 100);
};

DGW.side.methods.initSafariFixEvents = function(){
    var initInterval;
    var wBody = DGW.side.elements.widgetBody;
    DGW.side.methods.showWidget();

    wBody.addEventListener('click', DGW.global.api.requests.safariFix);

    initInterval = window.setInterval(function(){
        if (DGW.global.cache.last.prize) {
            window.clearInterval(initInterval);
            wBody.querySelector('.dg-side-prize').src = DGW.global.cache.last.prize.ImageUrl;
            wBody.querySelector('#dg-side-widget-prize-desc').innerHTML = DGW.global.cache.last.prize.Title;
        }
    }, 100);
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

DGW.main.methods.changeMainState = function(state){
    for (var item in DGW.main.elements.menuItems) {
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
        Array.prototype.slice.call(DGW.main.elements.widgetContent.children).forEach(function(ch){
            DGW.main.elements.widgetContent.removeChild(ch);
        });
    }

    if (DGW.main.currentState !== 'draws') {
        DGW.helpers.drawsTimer.setDraws([]);
    }
    DGW.helpers.removeClass(DGW.main.elements.widgetBody, 'profile-anon');
    switch (state) {
        case 'earn':
            if (DGW.global.authorized) {
                DGW.global.api.requests.getUserOffers();
            } else {
                DGW.global.api.requests.getOffers();
            }
            DGW.main.elements.widgetContent.appendChild(DGW.main.elements.pages.earnMain);
            break;
        case 'draws':
            //TODO: work on this further
            if (DGW.main.currentState !== 'draws') {
                DGW.global.api.requests.getDraws();
                DGW.main.methods.drawSubmenuReset();
            }
            DGW.main.elements.widgetContent.appendChild(DGW.main.elements.pages.drawsMain);
            break;
        case 'activities':
            if (DGW.main.elements.pages.activitiesMain.querySelector('#dg-o-w-activities-filter').value === 'all-activities') {
                DGW.global.api.requests.getAllActivities();
            } else {
                DGW.global.api.requests.getUserActivities();
            }
            DGW.global.api.requests.getLeaderboard();
            DGW.main.elements.widgetContent.appendChild(DGW.main.elements.pages.activitiesMain);
            break;
        case 'profile':
            if ( DGW.global.authorized ) {
                DGW.main.elements.widgetContent.appendChild(DGW.main.elements.pages.profileMain);
                DGW.global.api.requests.getUser();
                DGW.global.api.requests.getAllBadges();
            } else {
                DGW.helpers.addClass(DGW.main.elements.widgetBody, 'profile-anon');
                DGW.main.elements.widgetContent.appendChild(DGW.main.elements.pages.loginMain);
            }
            break;
        default:

    }

    Array.prototype.slice.call(DGW.main.elements.widgetContent.querySelectorAll('.avatar')).forEach(function(img){
        img.src = DGW.helpers.checkImagesForSrc(img.getAttribute('src'));
    });

    DGW.main.methods.hideNotificationBar();

    DGW.main.currentState = state;
    DGW.main.methods.setRewardedActions();
    DGW.main.methods.checkSectionHeight();
};

DGW.main.methods.initEvents = function () {
    DGW.main.methods.fillDefaultValues();

// Login header
    // filling avatar images with default pictures
    Array.prototype.slice.call(DGW.main.elements.widget.querySelectorAll('.avatar')).forEach(function(img){
        img.src = DGW.helpers.checkImagesForSrc(img.getAttribute('src'));
    });

    // handling close button
    DGW.main.elements.widget.querySelector('.dg-o-w-close').addEventListener('click', DGW.main.methods.hideWidget);

    // main widget, main menu clicks
    for (var item in DGW.main.elements.menuItems) {
        DGW.main.elements.menuItems[item].addEventListener('click', function(item){
            return function(){
                if (item == 'profileRegistered') item = 'profile';
                DGW.main.methods.changeMainState(item);
            };
        }(item));
    }

    // login dropdown menu
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

    // login form submit
    var topLoginForm = DGW.main.elements.widgetBody.querySelector('#dg-o-w-form-login-top');
    var topForgotForm = DGW.main.elements.widgetBody.querySelector('#dg-o-w-form-forgot-top');

    topLoginForm.addEventListener('submit', function(ev){
        ev.preventDefault();
        var emailF = this.querySelector('[type=email]').value,
            passF = this.querySelector('[type=password]').value;

            DGW.global.api.requests.signIn({
                Email: emailF,
                Password: passF
            }, function onSuccess(){
                DGW.helpers.removeClass(DGW.main.elements.loginMenuButton.parentNode, 'shown');
            }, function onError(result){
                DGW.main.methods.notificationConstructor(DGW.helpers.errorParser(result).messages, 'error');
            });
    });
    topForgotForm.addEventListener('submit', function(ev){
        ev.preventDefault();
        var that = this;
        var emailF = that.querySelector('[type=email]').value;
        DGW.global.api.requests.forgotPass(emailF,
            function onSuccess(){
                DGW.main.methods.notificationConstructor('Check your email to confirm the new password.');
            }, function onError(result){
                DGW.main.methods.notificationConstructor(DGW.helpers.errorParser(result).messages, 'error');
            });
    });
    topLoginForm.querySelector('a').addEventListener('click', function(ev){
        ev.preventDefault();
        DGW.helpers.removeClass(topLoginForm, 'shown');
        DGW.helpers.addClass(topForgotForm, 'shown');
    });
    topForgotForm.querySelector('a').addEventListener('click', function(ev){
        ev.preventDefault();
        DGW.helpers.removeClass(topForgotForm, 'shown');
        DGW.helpers.addClass(topLoginForm, 'shown');
    });

//Activities page
    DGW.main.elements.pages.activitiesMain.querySelector('.toggle-section-height').addEventListener('click', function () {
        var that = this;
        if (DGW.helpers.hasClass(that, 'collapsed')) {
            DGW.helpers.zeroTimeout(function(){
                DGW.helpers.removeClass(DGW.main.elements.activitiesSliderParent, 'collapsed');
                DGW.helpers.removeClass(that, 'collapsed');
                DGW.main.methods.checkSectionHeight();
            });
        } else {
            DGW.helpers.zeroTimeout(function(){
                DGW.helpers.addClass(DGW.main.elements.activitiesSliderParent, 'collapsed');
                DGW.helpers.addClass(that, 'collapsed');
                DGW.main.methods.checkSectionHeight();
            });
        }

    });

    DGW.main.elements.pages.activitiesMain.querySelector('#dg-o-w-activities-filter').addEventListener('change', function(){
        if (this.value === 'all-activities') {
            DGW.global.api.requests.getAllActivities();
        } else {
            DGW.global.api.requests.getUserActivities();
        }
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
        DGW.main.elements.loginFooter.querySelector('#dg-o-w-footer-signup-email').addEventListener('submit', function(ev){
            ev.preventDefault();
            var name = this.querySelector('[type=text]').value,
                email = this.querySelector('[type=email]').value;
            if (name != '' && email != '') {
                newUser.Username = name;
                newUser.Email = email;

                DGW.helpers.addClass(DGW.main.elements.loginFooter, 'password');
            } else {
                var errorMessage = [];
                if (name == '') errorMessage.push('Name is required field');
                if (email == '') errorMessage.push('Email is required');
                DGW.main.methods.notificationConstructor(errorMessage, 'error');
            }
        });
        DGW.main.elements.loginFooter.querySelector('#dg-o-w-footer-signup-pass').addEventListener('submit', function(ev){
            ev.preventDefault();
            var pass = this.querySelector('[type=password]').value;
                newUser.Password = pass;
                DGW.global.api.requests.signUp(newUser,
                    function onSuccess(){
                        DGW.helpers.removeClass(DGW.main.elements.loginFooter, 'email-sign-up');
                        DGW.helpers.removeClass(DGW.main.elements.loginFooter, 'password');
                    }, function onError(result){
                        DGW.main.methods.notificationConstructor(DGW.helpers.errorParser(result).messages, 'error');
                    });
        });
    })();
    DGW.main.elements.loginFooter.querySelector('#dg-o-w-footer-fb-connect').addEventListener('click', function(ev){
        ev.preventDefault();

        DGW.global.api.requests.connectFB();
    });


//Draws page clicks
    DGW.main.elements.pages.drawsMain.querySelector('#dg-o-w-show-expired').addEventListener('change', function (ev) {
        if (this.checked) {
            DGW.helpers.addClass(DGW.main.elements.widgetBody, 'draws-expired');
            DGW.main.settings.hiddenDrawsShow = true;
        } else {
            DGW.helpers.removeClass(DGW.main.elements.widgetBody, 'draws-expired');
            DGW.main.settings.hiddenDrawsShow = false;
        }
    });

    DGW.main.elements.pages.drawsMain.querySelector('.dg-o-w-draws-refresh').addEventListener('click', function(){
        DGW.global.api.requests.getDraws();
    });

//Draw filters
    (function(){
        var hiddenDrawsChkBox = DGW.main.elements.pages.drawsMain.querySelector('#dg-o-w-show-expired');
        var submenuItems = Array.prototype.slice.call(DGW.main.elements.pages.drawsMain.querySelectorAll('.dg-o-w-submenu ul li'));
        function removeActive(){
            submenuItems.forEach(function(item){
                DGW.helpers.removeClass(item, 'dg-o-w-active');
            });
        }

        function hideFinishedDraws(){
            hiddenDrawsChkBox.checked = false;
            DGW.helpers.removeClass(DGW.main.elements.widgetBody, 'draws-expired');
            hiddenDrawsChkBox.parentNode.style.display = 'none';
        }
        function showFinishedDraws(){
            if (DGW.main.settings.hiddenDrawsShow) {
                hiddenDrawsChkBox.checked = true;
                DGW.helpers.addClass(DGW.main.elements.widgetBody, 'draws-expired');
            }
            hiddenDrawsChkBox.parentNode.style.display = 'block';
        }

        submenuItems.forEach(function(item){
            item.addEventListener('click', function(){
                removeActive();
                DGW.helpers.addClass(this, 'dg-o-w-active');
                switch (this.id) {
                    case 'dg-o-w-show-all-draws':
                        DGW.main.cache.drawsList.sort(function(a,b){
                            return new Date(b.EndDate) - new Date(a.EndDate)
                        });

                        showFinishedDraws();

                        DGW.main.methods.drawsConstructor(DGW.main.cache);
                        break;
                    case 'dg-o-w-show-finished-soon':
                        var expArr = DGW.main.cache.drawsList.filter(function(draw){
                            return DGW.helpers.dateDiff(draw.EndDate) <= 0;
                        });
                        var actArr = DGW.main.cache.drawsList.filter(function(draw){
                            return DGW.helpers.dateDiff(draw.EndDate) > 0;
                        }).sort(function(a, b){
                            return new Date(a.EndDate) - new Date(b.EndDate);
                        });

                        DGW.main.cache.drawsList = actArr.concat(expArr);

                        hideFinishedDraws();
                        DGW.main.methods.drawsConstructor(DGW.main.cache, 'close-to-finish');
                        break;
                    case 'dg-o-w-show-my-draws':
                        var myDraws = [];
                        DGW.main.cache.drawsEntries.forEach(function(drawE){
                            DGW.main.cache.drawsList.filter(function(draw){
                                if (draw.DrawId == drawE.DrawId) {
                                    myDraws.push(draw);
                                }
                            });
                        });
                        DGW.main.cache.drawsList = DGW.main.cache.drawsList.sort(function(a,b){
                            return new Date(b.EndDate) - new Date(a.EndDate)
                        });

                        showFinishedDraws();
                        DGW.main.methods.drawsConstructor({drawsList: myDraws, drawsEntries: DGW.main.cache.drawsEntries}, 'my-draws');
                        break;
                    case 'dg-o-w-show-games':
                        hideFinishedDraws();
                        DGW.main.methods.gamesConstructor();
                        break;
                }
            });
        });
        DGW.main.methods.drawSubmenuReset = function(){
            removeActive();
            DGW.helpers.addClass(DGW.main.elements.pages.drawsMain.querySelector('#dg-o-w-show-all-draws'), 'dg-o-w-active');
        };
    })();

//Profile page clicks
    DGW.main.elements.pages.profileMain.querySelector('#dg-o-w-login-fb-text').addEventListener('click', function(){
        DGW.global.api.requests.connectFB(function onSuccess(){
            DGW.global.api.requests.getUser();
        });
    });
    DGW.main.elements.pages.profileMain.querySelector('#dg-o-w-sign-out-btn').addEventListener('click', function (ev) {
        ev.preventDefault();
        DGW.global.api.requests.signOut();
    });

//Notification clicks
    DGW.main.elements.pages.notificationHolder.querySelector('.dg-o-w-notification-close').addEventListener('click', function(){
        DGW.main.methods.hideNotificationBar();
    });
};

DGW.main.methods.resetStates = function(){
    DGW.main.elements.widgetBody.querySelector('.dg-o-w-menu-profile .profile-menu-item img').src = DGW.helpers.checkImagesForSrc();
    DGW.main.elements.pages.activitiesMain.querySelector('#dg-o-w-activities-filter').value = 'all-activities';
    DGW.helpers.removeClass(DGW.main.elements.loginFooter, 'email-sign-up');
    DGW.helpers.removeClass(DGW.main.elements.loginFooter, 'password');
    DGW.main.methods.fillDefaultValues();

    // clearing private cache
    DGW.main.cache.drawsEntries = [];
};

DGW.main.methods.fillDefaultValues = function(){

    var hiddenDrawsChkBox = DGW.main.elements.pages.drawsMain.querySelector('#dg-o-w-show-expired');
    getWinnerInterval = setInterval(function(){
        if (DGW.global.cache.last.winner) {
            var l = DGW.main.elements.pages.loginMain.querySelector('.dg-o-w-login-winners');
            l.querySelector('img').src = DGW.global.cache.last.winner.ImageUrl;
            l.querySelector('h4 span').innerHTML = DGW.global.cache.last.winner.UserName;
            clearInterval(getWinnerInterval);
        }
    }, 50);

    if (DGW.main.settings.hiddenDrawsShow) {
        hiddenDrawsChkBox.checked = true;
        DGW.helpers.addClass(DGW.main.elements.widgetBody, 'draws-expired');
    } else {
        hiddenDrawsChkBox.checked = false;
        DGW.helpers.removeClass(DGW.main.elements.widgetBody, 'draws-expired');
    }
};


DGW.main.methods.setRewardedActions = function(w, a){
    if (!w) w = DGW.main.elements.widget;
    if (!a) a = DGW.main.cache.rewardedActions;
    if (w.querySelector('.dg-o-w-rewarded-action') && a.length > 0) {
        if (w.querySelector('#dg-o-w-login-fb-reward')) {
            if (a.filter(function(action){return action.Type == 'FacebookConnect'}).length > 0)
                w.querySelector('#dg-o-w-login-fb-reward').innerHTML = a.filter(function(action){return action.Type == 'FacebookConnect'})[0].PointsReward;
        }
        if (w.querySelector('#dg-o-w-friends-sign-up-reward')) {
            if (a.filter(function(action){return action.Type == 'FriendSignUp'}).length > 0)
                w.querySelector('#dg-o-w-friends-sign-up-reward').innerHTML = a.filter(function(action){return action.Type == 'FriendSignUp'})[0].PointsReward;
        }
        if (w.querySelector('#dg-o-w-facebook-like-reward')) {
            if (a.filter(function(action){return action.Type == 'FacebookShare'}).length > 0)
                w.querySelector('#dg-o-w-facebook-like-reward').innerHTML = ' and get +' + a.filter(function(action){return action.Type == 'FacebookShare'})[0].PointsReward + ' points';
            else w.querySelector('#dg-o-w-facebook-like-reward').innerHTML = '';
        }
        if (w.querySelector('#dg-o-w-tweeter-like-reward')) {
            if (a.filter(function(action){return action.Type == 'TwitterShare'}).length > 0)
                w.querySelector('#dg-o-w-tweeter-like-reward').innerHTML = ' and get +' + a.filter(function(action){return action.Type == 'TwitterShare'})[0].PointsReward + ' points';
            else w.querySelector('#dg-o-w-tweeter-like-reward').innerHTML = '';
        }
    }
};

DGW.main.methods.profileSetData = function(data) {
    var pr = DGW.main.elements.pages.profileMain;
    var wb = DGW.main.elements.widgetBody;
    var sb = DGW.side.elements.widgetBody;
    var profileImageHolders = [
            wb.querySelector('.dg-o-w-menu-profile .profile-menu-item img'),
            pr.querySelector('#profileImage'),
            sb.querySelector('#dg-side-widget-userpic')
        ],
        profileNames = [
            wb.querySelector('.dg-o-w-menu-profile .profile-menu-authorized h4'),
            pr.querySelector('#profileName'),
            sb.querySelector('#dg-side-widget-name')
        ],
        friendsNumber = pr.querySelector('#profileFriendsAmount');

    var points = {
            confirmed: [
                wb.querySelector('#dg-o-w-points'),
                pr.querySelector('.dg-o-w-profile-points h3'),
                sb.querySelector('#dg-side-points'),
                sb.querySelector('#dg-side-points-collapsed')
            ],
            pending: [pr.querySelector('.dg-o-w-profile-points h5')]
        },
        credits = {
            confirmed: [
                wb.querySelector('#dg-o-w-credits'),
                pr.querySelector('.dg-o-w-profile-credits h3'),
                sb.querySelector('#dg-side-credits')
            ],
            pending: [pr.querySelector('.dg-o-w-profile-credits h5')]
        };

    var fbAddText = pr.querySelector('#dg-o-w-login-fb-text');

    profileImageHolders.forEach(function(image){
        image.src = data.ImageUrl || DGW.helpers.checkImagesForSrc(image.getAttribute('src'));
    });

    DGW.global.userStats.imageUrl = data.ImageUrl || DGW.global.userStats.imageUrl;

    profileNames.forEach(function(name){
        name.innerHTML = data.UserName;
    });

    DGW.global.userStats.name = data.UserName || DGW.global.userStats.name;
    DGW.global.userStats.facebookId = data.FacebookId;

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

    DGW.global.userStats.pointsC = data.Wallet.PointsConfirmed;
    DGW.global.userStats.pointsP = data.Wallet.PointsPending;
    DGW.global.userStats.creditsC = data.Wallet.CreditsConfirmed;
    DGW.global.userStats.creditsP = data.Wallet.CreditsPending;

    if (fbAddText && DGW.global.userStats.facebookId !== null) {
        fbAddText.parentNode.removeChild(fbAddText);
    }
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

    DGW.global.userStats.pointsC = user.Wallet.PointsConfirmed;
    DGW.global.userStats.pointsP = user.Wallet.PointsPending;
    DGW.global.userStats.creditsC = user.Wallet.CreditsConfirmed;
    DGW.global.userStats.creditsP = user.Wallet.CreditsPending;

    if (betPoints) {
        betPoints.innerHTML = draw.TicketsAmount || 0;
    } else {

    }
};

DGW.main.methods.updateBadgesInfo = function(){
    var ba = DGW.global.userStats.badges.all,
        be = DGW.global.userStats.badges.earned;
    var pr = DGW.main.elements.pages.profileMain;
    var wc = DGW.main.elements.widgetContent;
    var ul = pr.querySelector('.dg-o-w-badges-holder ul');

    pr.querySelector('#dg-o-w-badges-earned-amount').innerHTML = be.length;


    ul.innerHTML = '';
    ba.forEach(function(b){
        var li = document.createElement('li');
        li.innerHTML = '<img src="' + b.ImageUrl + '" alt=""/><p>' + b.Title + '</p>';

        if ( be.filter(function(earned){return earned.BadgeId == b.BadgeId;}).length > 0 ) {
            //badge was earned
            DGW.helpers.addClass(li, 'dg-o-w-earned');
        }

        li.addEventListener('click', function(){
            showFullBadgePage(ba, b.BadgeId);
        });

        ul.appendChild(li);
    });

    function showFullBadgePage(badges, curBadgeId){
        var submenu = '<div class="dg-o-w-submenu"><ul><li class="dg-o-w-back-draws">&larr; Back</li></ul></div>';
        var pageContent = '<div class="dg-o-w-badge-single">' +
            '<ul></ul><div class="dg-o-w-badge-single-left dg-o-w-arrow dg-o-w-arrow-left"></div><div class="dg-o-w-badge-single-right dg-o-w-arrow dg-o-w-arrow-right"></div></div>';
        var page = document.createElement('div');
            page.className = 'dg-o-w-badge-single-page';
            page.innerHTML = submenu + pageContent;
        var ul = page.querySelector('.dg-o-w-badge-single ul');
        var leftBtn = page.querySelector('.dg-o-w-badge-single-left'),
            rightBtn = page.querySelector('.dg-o-w-badge-single-right');

        var badgesArr = [];

        function hideBadges(){
            badgesArr.forEach(function(li){
                DGW.helpers.removeClass(li, 'dg-o-w-active');
            });
        }

        function slideBadges(direction){
            var curB = badgesArr.indexOf(badgesArr.filter(function(b, ind){
               return DGW.helpers.hasClass(b, 'dg-o-w-active');
            })[0]);

            // TODO: add slideLeft and slideRight animations
            hideBadges();
            if (direction === 'left') {
                if (curB > 0) {
                    DGW.helpers.addClass(badgesArr[curB - 1], 'dg-o-w-active');
                } else {
                    DGW.helpers.addClass(badgesArr[badgesArr.length - 1], 'dg-o-w-active');
                }
            } else {
                if (curB < badgesArr.length - 1) {
                    DGW.helpers.addClass(badgesArr[curB + 1], 'dg-o-w-active');
                } else {
                    DGW.helpers.addClass(badgesArr[0], 'dg-o-w-active');
                }
            }
        }

        badges.forEach(function(badge){
            var li = document.createElement('li');
            li.innerHTML = '<div><img src="' + badge.ImageUrl + '" /><h3>' + badge.Title + '</h3><p>' + badge.Description + '</p></div>';
            if (badge.BadgeId === curBadgeId) {
                li.className = 'dg-o-w-active';
            }
            if ( be.filter(function(earned){return earned.BadgeId == badge.BadgeId;}).length > 0 ) {
                //badge was earned
                DGW.helpers.addClass(li, 'dg-o-w-earned');
            }
            badgesArr.push(li);
            ul.appendChild(li);
        });

        page.querySelector('.dg-o-w-submenu li').addEventListener('click', function(){
            wc.removeChild(page);
        });

        leftBtn.addEventListener('click', function(){
            slideBadges('left');
        });
        rightBtn.addEventListener('click', function(){
            slideBadges('right');
        });

        wc.appendChild(page);
    }

};

DGW.main.methods.gamesConstructor = function(){
    var gamesList = DGW.main.elements.pages.drawsMain.querySelector('.dg-o-w-list-draws');
    gamesList.innerHTML = '';
    var li = document.createElement('li');
    li.innerHTML = '<h2>Sorry, but there are currently no games</h2>';
    gamesList.appendChild(li);

    DGW.helpers.removeClass(DGW.main.elements.widgetBody, 'no-active-draws');
    DGW.helpers.removeClass(DGW.main.elements.widgetBody, 'no-in-current-draws');
};

DGW.main.methods.drawsConstructor = function(cacheObj, _context){
    var drawsList = DGW.main.elements.pages.drawsMain.querySelector('.dg-o-w-list-draws');
    drawsList.innerHTML = '';
    DGW.global.activeDrawsExist = false;
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
            //DGW.helpers.console.log(drawEntry);
            li.innerHTML = '<div class="dg-o-w-draw">' +
                                '<div class="dg-o-w-draw-image-holder">' +
                                    '<img src="' + draw.Prize.ImageUrl + '" />' +
                                '</div>' +
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
                li.querySelector('.dg-o-w-draw-countdown').innerHTML = 'Finished ' + DGW.helpers.getDateFromNow(draw.EndDate);
            } else {
                DGW.global.activeDrawsExist = true;
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
        DGW.helpers.removeClass(DGW.main.elements.widgetBody, 'no-active-draws');
        DGW.helpers.removeClass(DGW.main.elements.widgetBody, 'no-in-current-draws');
        DGW.helpers.removeClass(DGW.main.elements.widgetBody, 'close-to-finish');
        if (DGW.global.activeDrawsExist) {
            if (_context && _context == 'close-to-finish') {
                DGW.helpers.addClass(DGW.main.elements.widgetBody, 'close-to-finish');
            }
        } else {
            if (_context && _context == 'my-draws') {
                DGW.helpers.addClass(DGW.main.elements.widgetBody, 'no-in-current-draws');
                //DGW.helpers.removeClass(DGW.main.elements.widgetBody, 'no-active-draws');
            } else if (_context && _context == 'close-to-finish') {
                DGW.helpers.addClass(DGW.main.elements.widgetBody, 'close-to-finish');
            } else {
                //DGW.helpers.removeClass(DGW.main.elements.widgetBody, 'no-in-current-draws');
                DGW.helpers.addClass(DGW.main.elements.widgetBody, 'no-active-draws');
            }
        }
    }

    DGW.main.methods.setRewardedActions();
};

DGW.main.methods.singleDrawConstructor = function(drawId){

    var draw = DGW.main.cache.drawsList.filter(function(draws){
        return draws.DrawId === drawId;
    })[0];
    var drawEntry = DGW.main.cache.drawsEntries.filter(function(draws){
        return draws.DrawId === drawId;
    })[0];

    var drawState = 'active';

    var el = DGW.main.elements.pages.singleDraw;
    var prizeSect = '<div class="dg-o-w-draw-left-side">' +
                        '<div class="prize-image"><div><img src="' + draw.Prize.ImageUrl + '" /></div></div>' +
                    '</div>';
    var shareSect = '<div class="dg-o-w-draw-share dg-o-w-draw-auth-show">' +
                        '<a href="#" class="dg-o-w-like dg-o-w-facebook-like">Share <span class="dg-o-w-rewarded-action" id="dg-o-w-facebook-like-reward"></span></a>' +
                        '<a href="#" class="dg-o-w-like dg-o-w-twitter-like">Tweet <span class="dg-o-w-rewarded-action" id="dg-o-w-tweeter-like-reward"></span></a>' +
                    '</div>';
    var submenu = '<div class="dg-o-w-submenu">' +
                        '<ul><li class="dg-o-w-back-draws">&larr; Back</li></ul><div class="right-side">' +
        (!(drawEntry != undefined && drawEntry.IsWinner) ? /*'Minimum bet is 10'*/ '' : 'You\'ve spent ' + drawEntry.TicketsAmount + ' points and won!') +
                            '</div>' +
                    '</div>';

    var playersInDraw = document.createElement('div');
        playersInDraw.className = 'dg-o-w-users-done';


    // Cleaning viewport from other sections
    if (DGW.main.elements.widgetContent.children.length > 0) {
        DGW.main.elements.widgetContent.removeChild(DGW.main.elements.widgetContent.childNodes[0]);
    }

    if (DGW.helpers.dateDiff(draw.EndDate) <= 0) {
        DGW.helpers.console.info('isdrawn: ', draw.IsDrawn);
        // Draw is finished
        if (draw.IsDrawn == false) {
            // Draw has been finished and not drawn
            drawState = 'not-drawn';
            DGW.helpers.console.info('isdrawn: ', draw.IsDrawn);
        } else {
            // Draw has been finished and drawn
            drawState = 'drawn';
            DGW.helpers.console.info(draw.IsDrawn);
            if (draw.Winner == null) {
                // No one has participated in the draw
                drawState = 'drawn-no-players';
            }
        }
    }
    //DGW.helpers.console.log('draw state: ', drawState);
    el.innerHTML =  submenu +
                    '<div class="dg-o-w-section-content">' +
                        '<div class="dg-o-w-single-draw">' +
                                prizeSect +
                            '<div class="dg-o-w-draw-right-side">' +
                                '<h2 class="dg-o-w-countdown">&nbsp;</h2>' +
                                '<h5>' + draw.Prize.Title + '</h5>' +
                                '<p>' + draw.Prize.Description + '</p>' +
                                '<div class="dg-o-w-draw-bet-info dg-o-w-draw-auth-show">' +
                                    '<div class="dg-o-w-your-bet">You\'ve bet <span>' + ((drawEntry) ? drawEntry.TicketsAmount : 0 ) + '</span> points</div>' +
                                    // playersInDraw +
                                '</div>' +
                                ((DGW.helpers.dateDiff(draw.EndDate) > 0) ? '<h2 class="dg-o-w-draw-login-show">Please, log in to bet</h2>' : '') +
                                '<div class="dg-o-w-draw-bet-action dg-o-w-draw-auth-show">' +
                                    '<h5>How much do you want to bet?</h5>' +
                                    '<form id="bet-form" class="dg-o-w-one-field-form">' +
                                        '<input type="number" min="1" max="1000" placeholder="50"/>' +
                                        '<input type="submit" value="Bet points" />' +
                                    '</form>' +
                                    '<div id="dg-o-w-get-points-btn" class="btn-dg-o-w-outline">Get additional points</div>' +
                                '</div>' +
                                    ((draw.Winner !== null) ?
                                        '<div class="dg-o-w-draw-winner"><img src="' + (draw.Winner.ImageUrl || DGW.helpers.checkImagesForSrc()) + '" /><h4>' + draw.Winner.UserName + ' has won this draw. Our congratulations!</h4></div>' :
                                    '') +
                                    ((drawState == 'not-drawn') ? '<div class="dg-o-w-draw-winner"><h4>Winner will be announced very soon!</h4></div>' : '') +
                                    ((drawState == 'drawn-no-players') ? '<div class="dg-o-w-draw-winner"><h4>Unfortunately, no one has participated in this Draw</h4></div>' : '') +
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
                        '<input type="text" name="Address1" placeholder="Address line 1" />' +
                        '<input type="text" name="Address2" placeholder="Address line 2" />' +
                        '<input type="text" name="County" placeholder="County" />' +
                        '<input type="text" name="Postcode" placeholder="Postcode" />' +
                        '<input type="submit" value="Submit " />' +
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

    if (el.querySelector('.dg-o-w-draw-bet-info')) {
        DGW.global.api.requests.drawPlayers(drawId,
            function onSuccess(result){
                if (result.RecentPlayers.length > 0) {
                    var playerImgsHolder = document.createElement('div');
                    result.RecentPlayers.forEach(function(player, ind){
                        if (ind > 2) return;
                        var img = document.createElement('img');
                        img.src = player.ImageUrl;

                        playerImgsHolder.appendChild(img);
                    });
                    playersInDraw.appendChild(playerImgsHolder);

                    var p = document.createElement('p');
                    if (result.TotalCount == 1) {
                        p.innerHTML = '1 user has done this';
                    } else {
                        p.innerHTML = result.TotalCount + ' user has done this';
                    }
                    playersInDraw.appendChild(p);

                    el.querySelector('.dg-o-w-draw-bet-info').appendChild(playersInDraw);
                }
            }
        );
    }

    if (el.querySelector('#dg-o-w-get-points-btn')) {
        el.querySelector('#dg-o-w-get-points-btn').addEventListener('click', function(){
            DGW.main.methods.changeMainState('earn');
        });
    }

    el.querySelector('.dg-o-w-submenu li.dg-o-w-back-draws').addEventListener('click', function(){
        DGW.main.methods.changeMainState('draws');
    });

    if (el.querySelector('#bet-form')) {
        el.querySelector('#bet-form').addEventListener('submit', function (ev) {
            ev.preventDefault();
            var betBtn = this.querySelector('input[type=submit]');
            var pointsToBet = +this.querySelector('input[type=number]').value;

            DGW.global.api.requests.drawBet(drawId, pointsToBet, function onSuccess(){
                betBtn.disabled = false;
                DGW.main.methods.notificationConstructor('We\'ve received your ' + pointsToBet + ' points. Bet more!');
            }, function onError(result){
                betBtn.disabled = false;
                DGW.main.methods.notificationConstructor(DGW.helpers.errorParser(result).messages, 'error');
            });
            betBtn.disabled = true;
        });
    }
    if (el.querySelector('#claim-prize')) {
        el.querySelector('#claim-prize').addEventListener('submit', function(ev){
            ev.preventDefault();
            var that = this;
            var address = {};

            Array.prototype.slice.call(that.querySelectorAll('input:not([type=submit])')).forEach(function(field){
                if (field.value == '' && field.name != 'Address1') field.value = '-';
                address[field.name] = field.value;
            });

            DGW.global.api.requests.claimPrize(drawId, address, function onSuccess(){
                DGW.helpers.addClass(el.querySelector('.dg-o-w-single-draw'), 'claimed');
                DGW.main.methods.notificationConstructor(['We\'ve received your address', 'And will contact you very soon!']);
            }, function onError(result){
                DGW.main.methods.notificationConstructor(DGW.helpers.errorParser(result).messages, 'error');
            });
        });
    }


    if (!DGW.helpers.drawsTimer.push({dt:draw.EndDate, elem:el.querySelector('.dg-o-w-countdown')})) {
        DGW.helpers.addClass(el.querySelector('.dg-o-w-single-draw'), 'expired');
        if (el.querySelector('.dg-o-w-countdown')) {
            el.querySelector('.dg-o-w-countdown').innerHTML = 'Finished ' + String(DGW.helpers.getDateFromNow(draw.EndDate));
        }
    }

    // Setting sharing buttons
    var isWinner = false;
    if (drawEntry && drawEntry.IsWinner) isWinner = true;

    el.querySelector('.dg-o-w-like.dg-o-w-facebook-like').addEventListener('click', function(ev){
        ev.preventDefault();
        DGW.global.actions.requests.shareFb(drawId, isWinner);
    });
    el.querySelector('.dg-o-w-like.dg-o-w-twitter-like').addEventListener('click', function(ev){
        ev.preventDefault();
        DGW.global.actions.requests.shareTw(drawId, (!isWinner) ? 'Win ' : 'I\'ve just won ' + draw.Prize.Title, isWinner);
    });

    DGW.main.elements.widgetContent.appendChild(el);
    DGW.main.methods.checkSectionHeight();
    DGW.main.methods.setRewardedActions();
};


DGW.main.methods.activitiesConstructor = function(activities){
    activities.sort(function(a, b){
        return new Date(b.Date) - new Date(a.Date);
    });
    var activitiesHolder = DGW.main.elements.pages.activitiesMain.querySelector('.dg-o-w-activities-holder ul');
    activitiesHolder.innerHTML = '';

    activities.forEach(function(activity){
        var ownStats = false;
        if (!activity.User) {
            ownStats = true;
            activity.User = {
                //UserName: DGW.global.userStats.name,
                UserName: 'You',
                ImageUrl: DGW.global.userStats.imageUrl
            }
        }
        var li = document.createElement('li');
        var message = '';
        message += activity.User.UserName;
        message += (ownStats !== true) ? ' has ' : ' have ';
        message += (activity.Direction === 'Outflow') ? 'spent ' : 'earned ';
        message += '<span>';
        message += activity.PointsAmount;
        message += ' points';
        message += '</span>';


        if (activity.ActivityType === 'GamePurchase') {
            if (activity.GameOrder.GameType === 'Draw') {
                message += ' playing the draw';
                message += (' to win ' + activity.GameOrder.PrizeTitle);
            }
        }

        if (activity.ActivityType === 'RewardedActionReward') {
            switch (activity.RewardedAction.Type) {
                case 'UserRegister':
                    message += ' for joining our rewarded program';
                    break;
                case 'FacebookConnect':
                    message += ' for connecting with Facebook';
                    break;
                case 'FriendSignUp':
                    message += ' inviting a friend to our rewarding program';
                    break;
                case 'ConnectNewApp':
                    message += ' connecting another app';
                    break;
                case 'FacebookShare':
                    message += ' shouting out about us on Facebook';
                    break;
                case 'TwitterShare':
                    message += ' tweeting about us';
                    break;
                case 'CommissionConfirmed':
                    message += ' for making a great purchase';
                    break;
                default:
            }
        }

        if (activity.ActivityType === 'OfferActionReward') {
            if (activity.OfferAction.Type.Group.Name === 'Share') {
                switch (activity.OfferAction.Type.Name) {
                    case 'FacebookShare':
                        message += ' finishing Facebook share offer';
                        break;
                    case 'TwitterShare':
                        message += ' finishing Twitter share offer';
                }
            } else if (activity.OfferAction.Type.Group.Name === 'Watch') {
                message += ' watching a video';
            } else if (activity.OfferAction.Type.Group.Name === 'Discover') {
                message += ' downloading an app';
            }
        }


        if (activity.ActivityType === 'BadgeReward') {
            message += ' getting a shiny new badge "' + activity.BadgeReward.Title + '"';
        }

        li.innerHTML =
            '<div class="dg-o-w-single-activity">' +
                '<img src="' + DGW.helpers.checkImagesForSrc(activity.User.ImageUrl) + '" alt=""/>' +
                '<div class="dg-o-w-activity-message-holder">' +
                    '<p>' + message + '</p>' +
                '</div>' +
            '</div>' +
            '<h6>' + DGW.helpers.getDateFromNow(activity.Date) + '</h6>';
        if (activity.Direction === 'Outflow') {
            DGW.helpers.addClass(li, 'spent');
        }

        activitiesHolder.appendChild(li);
    });
    DGW.main.methods.setRewardedActions();
};

DGW.main.methods.offersConstructor = function(offers) {
    var offersHolder = DGW.main.elements.pages.earnMain.querySelector('.dg-o-w-list-offers'),
        offersSubmenu = DGW.main.elements.pages.earnMain.querySelector('.dg-o-w-submenu ul'),
        offersSponsors = DGW.main.elements.pages.earnMain.querySelector('.dg-o-w-submenu select'),
        pointsSum = DGW.main.elements.pages.earnMain.querySelector('.dg-o-w-section-content h3 span');
    var lists = {
        offers: offers.Offers,
        sponsors: ['All offers'],
        categories: ['All']
    };
    var sponsorsAllString = lists.sponsors[0].toLowerCase(),
        categoriesAllString = lists.categories[0].toLowerCase();
    var currentCategory = categoriesAllString,
        currentSponsor = sponsorsAllString;

    pointsSum.innerHTML = offers.TotalPointsReward;
    offersSubmenu.innerHTML = '';
    offersSponsors.innerHTML = '';

    //lists.categories.push('All');

    offers.Offers.forEach(function(offer){
        if (lists.sponsors.filter(function(sponsor){return sponsor === offer.Sponsor.Name;}).length == 0) {
            lists.sponsors.push(offer.Sponsor.Name);
        }
        if (lists.categories.filter(function(category){return category === offer.Type.Group.Name;}).length == 0) {
            lists.categories.push(offer.Type.Group.Name);
        }
    });


    lists.sponsors.forEach(function(sponsor){
        var option = document.createElement('option');
        option.innerHTML = sponsor;
        option.value = sponsor.toLowerCase();

        offersSponsors.appendChild(option);
    });

    lists.categories.forEach(function(category, ind){
        var li = document.createElement('li');
        li.innerHTML = category;
        li.addEventListener('click', function(){
            Array.prototype.slice.call(offersSubmenu.querySelectorAll('li')).forEach(function(item){
                DGW.helpers.removeClass(item, 'dg-o-w-active');
            });
            DGW.helpers.addClass(this, 'dg-o-w-active');
            currentCategory = category.toLowerCase();
            showOffersPanels(filterOffers())
        });
        if (category.toLowerCase() == 'all') {DGW.helpers.addClass(li, 'dg-o-w-active')}
        offersSubmenu.appendChild(li);
    });

    if (lists.sponsors.length > 2) {
        offersSponsors.addEventListener('change', function () {
            var that = this;
            DGW.helpers.console.log(that.value);
            currentSponsor = that.value.toLowerCase();
            showOffersPanels(filterOffers());
        });
    } else {
        offersSponsors.style.display = 'none';
    }

    function filterOffers(){
        return lists.offers.filter(function(offer){
            if (currentSponsor == sponsorsAllString &&
                currentCategory == categoriesAllString) {
                return true;
            } else if (currentSponsor == sponsorsAllString) {
                return offer.Type.Group.Name.toLowerCase() == currentCategory;
            } else if (currentCategory == categoriesAllString) {
                return offer.Sponsor.Name.toLowerCase() == currentSponsor;
            }
            return offer.Sponsor.Name.toLowerCase() == currentSponsor &&
                offer.Type.Group.Name.toLowerCase() == currentCategory;
        });
    }

    function showOffersPanels(filteredOffers) {
        offersHolder.innerHTML = '';

        filteredOffers.forEach(function (offer) {
            var li = document.createElement('li');

            li.innerHTML =
                '<a href="" target="_blank"><div class="dg-o-w-offer">' +
                    '<div class="dg-o-w-offer-left">' +
                        '<img src="' + (offer.ImageUrl || 'http://lorempixel.com/100/100/sports') + '" />' +
                        '<span>' + offer.PointsReward + '</span>' +
                    '</div>' +
                    '<div class="dg-o-w-offer-right">' +
                        '<h4>' + offer.Title + '</h4>' +
                        '<h5>' + offer.Description + '</h5>' +
                        '<div class="dg-o-w-users-done">' +
                            '<div>' +
                                '<img src="http://lorempixel.com/70/70/people/1" />' +
                                '<img src="http://lorempixel.com/70/70/people/2" />' +
                                '<img src="http://lorempixel.com/70/70/people/3" />' +
                            '</div>' +
                            '<p>10 users have done this</p>' +
                        '</div>' +
                    '</div>' +
                '</div></a>';
            if (offer.Type.Name == 'DownloadMobileApp' || offer.Type.Name == 'DownloadToolbar') {
                li.querySelector('a').href = offer.CustomData;
            }
            li.querySelector('a').addEventListener('click', function(ev){
                if (DGW.global.authorized) {
                    if (offer.Type.Name != 'DownloadMobileApp' && offer.Type.Name != 'DownloadToolbar') {
                        ev.preventDefault();
                    }
                    if (offer.Type.Name == 'FacebookShare') {
                        DGW.global.offers.requests.shareOfferFb(offer.Id);
                    } else if (offer.Type.Name == 'TwitterShare'){
                        DGW.global.offers.requests.shareOfferTw(offer.Id, offer.CustomData);
                    } else if (offer.Type.Name == 'WatchVideo'){
                        DGW.global.offers.requests.watchVideo(offer.Id, offer.CustomData);
                    } else if (offer.Type.Name == 'DownloadToolbar') {
                        DGW.global.api.requests.trackOffer(offer.Id);
                    }
                } else {
                    ev.preventDefault();
                    DGW.main.methods.changeMainState('profile');
                }
            });
            offersHolder.appendChild(li);
        });
    }

    showOffersPanels(lists.offers);
    DGW.main.methods.setRewardedActions();
};

DGW.main.methods.leaderboardConstructor = function(earners) {
    var s = DGW.main.elements.pages.activitiesMain;
    var ul = s.querySelector('.dg-o-w-activity-slider ul');

    ul.innerHTML = '';
    earners.forEach(function(earner){
        var li = document.createElement('li');
        li.innerHTML = '<div><img src="' + earner.ImageUrl +'"><span>' + earner.Amount + '</span></div><h4>' + earner.UserName + '</h4>';

        ul.appendChild(li);
    });

    DGW.global.elements.leaderboardSlider = new Slider(ul.parentNode, {
        visibles: 5,
        controlNext: '.dg-o-w-activity-slider-next',
        controlPrev: '.dg-o-w-activity-slider-prev'
    });
};

DGW.main.methods.notificationConstructor = function(lis, _type) {
    var ul = DGW.main.elements.pages.notificationHolder.querySelector('ul');
        ul.innerHTML = '';
    if (!_type) _type = 'success';

    if (DGW.helpers.isArray(lis)) {
        lis.forEach(function(el){
            var li = document.createElement('li');
            li.innerHTML = el;
            ul.appendChild(li);
        });
        DGW.main.methods.showNotificationBar(_type);
    } else if (typeof lis == 'string'){
        var li = document.createElement('li');
        li.innerHTML = lis;
        ul.appendChild(li);
        DGW.main.methods.showNotificationBar(_type);
    } else {
        DGW.helpers.console.warn('Notification parameters are not of the type of [Array] or String');
    }
};
var widgetStyles = document.createElement('link');
    widgetStyles.rel = 'stylesheet';
    widgetStyles.type = 'text/css';

widgetStyles.addEventListener('load', function(){
    DGW.global.api.requests.checkServerAvailability();
});

widgetStyles.href = DGW.global.widgetPathName + 'style.min.css';


var lastLinkElement = document.head.getElementsByTagName('link')[document.head.getElementsByTagName('link').length - 1];


if (window.innerWidth > 1024) DGW.helpers.insertAfter(widgetStyles, lastLinkElement, document.head);
else DGW.helpers.console.info('Widget: Mobile screen size, no widget allowed');

window.dgwActivateDebugMode = function(){
    DGW.global.debug = true;
};


});
