window.addEventListener('load', function(){
var DGW = function () {
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
                tunnelPath = 'https://api.rewarded.club/core/v1/xdm/tunnel';
                envPath = tunnelPath.substring(tunnelPath.lastIndexOf('/xdm/') + 1, 0);
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
                templates: {
                    side: {

                    }
                },
                main: {
                    methods: {},
                    elements: {
                        pages: {}
                    },
                    currentState: '',
                    cache: {
                        drawsList: [],
                        drawsEntries: [],
                        rewardedActions: [],
                        userRelations: {}
                    },
                    shown: false,
                    settings: {
                        draws: {
                            showExpired: true,
                            currentSubMenu: 'dg-o-w-show-all-draws'
                        },
                        friends: {
                            currentSubMenu: 'friends'
                        }
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
                    gaSend: '',
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
        case 'usersGet':
            endpoint = 'friend/getuserrelations';
            break;
        case 'userFollow':
            method = 'POST';
            endpoint = 'friend/follow';
            requestBody = JSON.stringify(requestBody);
            break;
        case 'userUnfollow':
            method = 'POST';
            endpoint = 'friend/unfollow';
            requestBody = JSON.stringify(requestBody);
            break;
        case 'userRequestSend':
            method = 'POST';
            endpoint = 'friend/sendfriendrequest';
            requestBody = JSON.stringify(requestBody);
            break;
        case 'userRequestAccept':
            method = 'POST';
            endpoint = 'friend/acceptfriendrequest';
            requestBody = JSON.stringify(requestBody);
            break;
        case 'userRequestDecline':
            method = 'POST';
            endpoint = 'friend/declinefriendrequest';
            requestBody = JSON.stringify(requestBody);
            break;
        case 'userUnfriend':
            method = 'POST';
            endpoint = 'friend/unfriend';
            requestBody = JSON.stringify(requestBody);
            break;
        case 'userSearch':
            method = 'POST';
            endpoint = 'friend/findusers';
            requestBody = JSON.stringify(requestBody);
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
            if (result.error && result.status == 401) {
                DGW.global.methods.unAuthorize();
            }
            if (result.status == 0) {
                DGW.main.methods.notificationConstructor(['There is no Internet connection'], 'error');
                return;
            }
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
            if (result.data.IsActive) {
                DGW.global.club.name = result.data.FoundationName;
                DGW.global.api.requests.initMainFlow();
                DGW.helpers.gaCheckPut(DGW.global.club.name);
            } else {
                DGW.helpers.console.warn('Widget is disabled');
            }
        }
    });
};

DGW.global.api.requests.initMainFlow = function(){
    var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    if (isSafari && !DGW.global.safariFix) {
        DGW.global.api.requests.readServerCookie('safarifix', function (response) {
            if (!response) {
                DGW.side.methods.changeSideWidgetState();
            } else {
                DGW.global.safariFix = true;
                DGW.global.api.requests.initMainFlow();
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

DGW.global.api.requests.connectFB = function(onSuccess, onError){
    DGW.helpers.centerWindowPopup(DGW.global.envPath +
    'auth/facebook?api_key=' + DGW.global.api.apiKey, 'fbWindow', 460, 340, function(){
        DGW.global.api.requests.getUser();
        if(onSuccess) onSuccess();
    });
};

DGW.global.api.requests.signUp = function(userObj, onSuccess, onError){
    DGW.global.api.generic('signUp', function(result){
        if (result.status == 200) {
            DGW.helpers.console.info('signUp: ', result.data);
            DGW.global.methods.authorize();
            DGW.main.methods.profileSetData(result.data);
            if (onSuccess) onSuccess(result.data);
        } else {
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
            if (onSuccess) onSuccess(result.data);
        } else {
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
            if (!DGW.global.authorized) {
                DGW.global.methods.authorize();
            }
            DGW.main.methods.profileSetData(result.data);
            if (onSuccess) onSuccess(result.data);
        } else {
            DGW.global.methods.unAuthorize();
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
            if ( DGW.main.cache.drawsEntries.some(function(entry){return entry.NeedToClaimPrize}) ) {
                DGW.side.methods.showNotification('winner');
            }
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

DGW.global.api.requests.getAllActivities = function(onSuccess, onError){
    DGW.global.api.generic('getAllActivities', function(result){
        if (result.status == 200) {
            DGW.helpers.console.info('getAllActivities ', result.data);
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
    }, drawId);
};

DGW.global.api.requests.usersGet = function(onSuccess, onError){
    DGW.global.api.generic('usersGet', function(result){
        if (result.status == 200) {
            DGW.helpers.console.info('Get friends API: ', result.data);
            if (onSuccess) onSuccess(result.data);
        } else {
            DGW.helpers.console.error('Get friends API: ', result.error);
            if (onError) onError(result.error);
        }
    });
};

DGW.global.api.requests.userFollow = function(userId, onSuccess, onError){
    DGW.global.api.generic('userFollow', function(result){
        if (result.status == 200) {
            DGW.helpers.console.info('friendFollow ', result.data);
            if (onSuccess) onSuccess(result.data);
        } else {
            DGW.helpers.console.error('friendFollow ', result.error);
            if (onError) onError(result.error);
        }
    }, {
        UserId: userId
    });
};

DGW.global.api.requests.userUnfollow = function(userId, onSuccess, onError){
    DGW.global.api.generic('userUnfollow', function(result){
        if (result.status == 200) {
            DGW.helpers.console.info('friendUnfollow ', result.data);
            if (onSuccess) onSuccess(result.data);
        } else {
            DGW.helpers.console.error('friendUnfollow ', result.error);
            if (onError) onError(result.error);
        }
    }, {
        UserId: userId
    });
};

DGW.global.api.requests.userRequestSend = function(userId, onSuccess, onError){
    DGW.global.api.generic('userRequestSend', function(result){
        if (result.status == 200) {
            DGW.helpers.console.info('friendRequestSend ', result.data);
            if (onSuccess) onSuccess(result.data);
        } else {
            DGW.helpers.console.error('friendRequestSend ', result.error);
            if (onError) onError(result.error);
        }
    }, {
        UserId: userId
    });
};

DGW.global.api.requests.userRequestAccept = function(userId, onSuccess, onError){
    DGW.global.api.generic('userRequestAccept', function(result){
        if (result.status == 200) {
            DGW.helpers.console.info('friendRequestAccept ', result.data);
            if (onSuccess) onSuccess(result.data);
        } else {
            DGW.helpers.console.error('friendRequestAccept ', result.error);
            if (onError) onError(result.error);
        }
    }, {
        UserId: userId
    });
};

DGW.global.api.requests.userRequestDecline = function(userId, onSuccess, onError){
    DGW.global.api.generic('userRequestDecline', function(result){
        if (result.status == 200) {
            DGW.helpers.console.info('friendRequestDecline ', result.data);
            if (onSuccess) onSuccess(result.data);
        } else {
            DGW.helpers.console.error('friendRequestDecline ', result.error);
            if (onError) onError(result.error);
        }
    }, {
        UserId: userId
    });
};

DGW.global.api.requests.userUnfriend = function(userId, onSuccess, onError){
    DGW.global.api.generic('userUnfriend', function(result){
        if (result.status == 200) {
            DGW.helpers.console.info('friendUnfriend ', result.data);
            if (onSuccess) onSuccess(result.data);
        } else {
            DGW.helpers.console.error('friendUnfriend ', result.error);
            if (onError) onError(result.error);
        }
    }, {
        UserId: userId
    });
};


DGW.global.api.requests.userSearch = function(queryString, onSuccess, onError){
    DGW.global.api.generic('userSearch', function(result){
        if (result.status == 200) {
            DGW.helpers.console.info('friendSearch ', result.data);
            if (onSuccess) onSuccess(result.data);
        } else {
            DGW.helpers.console.error('friendSearch ', result.error);
            if (onError) onError(result.error);
        }
    }, {
        Query: queryString
    });
};
DGW.helpers.addClass = function(obj, className){
    if (!obj) return;
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

DGW.helpers.isObject = function(o){
    return Object.prototype.toString.call(o) === '[object Object]';
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
        timer = window.setInterval(updateTime, 100);
    };

    this.stop = function(){
        window.clearInterval(timer);
    };

    this.setDraws(params);
    this.start();
};

DGW.helpers.drawsTimer = new DGW.helpers.drawsTimerConstr([]);

DGW.helpers.drawIsFinished = function (draw) {
    return DGW.helpers.dateDiff(draw.EndDate) <= 0;
};

DGW.helpers.checkImagesForSrc = function(src) {
    if (src) {
        return src;
    } else {
        return DGW.global.widgetPathName + 'imgs/avatar-placeholder.png';
    }
};

DGW.helpers.imagesResponsivePaths = function(imgsCollection) {
    if (arguments.length == 0) return;
    var array = Array.prototype.slice.call(imgsCollection);
    array.forEach(function(img){
        if (img.getAttribute('data-image') != null) {
            img.src = DGW.global.widgetPathName + 'imgs/' + img.getAttribute('data-image');
        }
    });
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

    return window.open('', title, 'menubar=no,location=no,resizable=no,scrollbars=yes,status=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
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

DGW.helpers.openDataLinks = function(elems, domEl){
    var array = [];
    if (!DGW.helpers.isArray(elems)) {
        array.push(elems);
    } else {
        array = elems;
    }

    array.forEach(function(link){
        var url = DGW.global.widgetPathName + 'pages/' + link.getAttribute('data-link') + '.html';
        if (link) {
            link.addEventListener('click', function(ev){
                ev.preventDefault();
                DGW.helpers.showFramedSrc(url, (domEl) ? domEl : null);
            });
        }
    });

};

DGW.helpers.showFramedSrc = function(src, domEl){
    var h = DGW.main.elements.frameHolder,
        ih = h.querySelector('.dg-o-w-iframe-holder'),
        sm = h.querySelector('.dg-o-w-submenu'),
        bb = h.querySelector('.dg-o-w-back-btn'),
        wb = DGW.main.elements.widgetBodyWrapper;
    ih.innerHTML = '';
    var iframe = document.createElement('iframe');
    DGW.main.methods.loadingStarted();
    iframe.onload = function(){
        DGW.main.methods.loadingFinished();
    };
    iframe.src = src;
    if (sm.childNodes.length > 1) sm.removeChild(sm.childNodes[sm.childNodes.length - 1]);

    if (domEl && domEl.nodeName) {
        var rightSide = document.createElement('div');
        rightSide.className = 'right-side';
        rightSide.appendChild(domEl);
        sm.appendChild(rightSide);
    }

    bb.addEventListener('click', DGW.helpers.hideFramedSrc);

    DGW.main.methods.hideNotificationBar();
    ih.appendChild(iframe);
    wb.appendChild(h);
};

DGW.helpers.hideFramedSrc = function(){
    var fh = DGW.main.elements.frameHolder,
        wb = DGW.main.elements.widgetBodyWrapper;

    if (fh.parentNode == wb) {
        DGW.helpers.addClass(fh, 'dg-o-w-hidden');
        setTimeout(function () {
            fh.querySelector('.dg-o-w-iframe-holder').innerHTML = '';
            DGW.helpers.removeClass(fh, 'dg-o-w-hidden');
            wb.removeChild(fh);
        }, 300);
    }
};

DGW.helpers.getElementsFromAllPlaces = function(selector, place){
    if (!selector) return;
    var places;

    if (place === 'main') {
        places = [
            DGW.main.elements.widgetBody,
            DGW.main.elements.pages
        ];
    } else if (place === 'side') {
        places = [
            DGW.side.elements.widgetBody
        ];
    } else {
        places = [
            DGW.main.elements.widgetBody,
            DGW.side.elements.widgetBody,
            DGW.main.elements.pages
        ];
    }

    var placesArr = [];
    var elements = [];

    places.forEach(function(place){
        if (DGW.helpers.isObject(place)) {
            for (var pl in place) {
                placesArr.push(place[pl]);
            }
        } else {
            placesArr.push(place);
        }
    });

    placesArr.forEach(function(place){
        Array.prototype.slice.call(place.querySelectorAll(selector)).forEach(function(elem){
            elements.push(elem);
        });
    });

    return elements;
};

DGW.helpers.gaCheckPut = function(name){
    name = name || DGW.global.club.name;
    if (!window.ga) {
        (function (i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
                (i[r].q = i[r].q || []).push(arguments)
            }, i[r].l = 1 * new Date(); a = s.createElement(o),
                m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
        })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

        DGW.helpers.gaCheckPut();
    } else {
        DGW.global.gaSend = name + '.send';
        if (ga.getByName) {
            if (!ga.getByName(name)) {
                ga('create', {
                    trackingId: 'UA-51923524-37',
                    cookieDomain: 'auto',
                    name: name
                });
            } else {
                DGW.helpers.console.log('GA is ready, DGW is created');
            }
        } else {
            var interval = window.setInterval(function(){
                if (ga.getByName) {
                    window.clearInterval(interval);
                    DGW.helpers.gaCheckPut();
                }
            }, 50);
        }
    }
};
DGW.templates.side.profileInfo ='<div class="dg-side-section">' +
                                    '<div class="dg-side-user-img-holder"><img data-userstats-userimage class="dg-o-w-side-image-floating" src=""/></div>' +
                                    '<div class="dg-side-collapsed dg-side-floating-text"><p><span data-userstats-points-c class="dg-o-w-points-text">00</span></p><h5>Earn more</h5></div>' +
                                    '<div class="dg-side-content">' +
                                        '<h4 data-userstats-username>Name Surname Whatever</h4>' +
                                        '<h6><span data-userstats-points-c class="dg-o-w-points-text">00</span><br/><span data-userstats-credits-c data-round="2" class="dg-o-w-credits-text">00</span></h6>' +
                                    '</div>' +
                                '</div>' +
                                '<div data-page="earn" class="dg-side-cta-floating"><span class="dg-side-collapsed">&rarr;</span><span class="dg-side-expanded">Earn more points</span></div>';

DGW.templates.side.prizeGeneric =   '<div class="dg-side-section">' +
                                        '<div class="dg-side-img-holder"><img data-image="everton-crest-full.png" class="dg-o-w-side-image-floating" src=""/></div>' +
                                        '<div class="dg-side-content">Sign up & get +10 points</div>' +
                                    '</div>' +
                                    '<div class="dg-side-collapsed"><div data-page="profile" class="dg-side-cta">Sign Up</div></div>' +
                                    '<div class="dg-side-expanded"><div data-page="profile" class="dg-side-cta">Sign up & get +10 points</div></div>';

DGW.templates.sideWidgetCore = '<div id="dg-side-widget-wrapper">' +
                                    '<div class="dg-side-widget-body">' +
                                        '<div class="dg-side-widget-content"></div>' +
                                        '<div data-page="earn" class="dg-side-click-holder"></div>' +
                                        '<div class="dg-side-notification-holder"></div>' +
                                    '</div>' +
                                '</div>';

DGW.templates.side.draw =  '<div class="dg-side-section">' +
                                        '<img data-image="temp-green-tee.png" class="dg-side-image-bg" src=""/>' +
                                        '<div class="dg-side-content">' +
                                            '<p>Win<br/>prizes</p>' +
                                            '<div class="dg-side-cta">Play</div>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="dg-side-bottom-floating"><div class="dg-side-progress-bar"><div class="dg-side-progress-bar-inner"></div></div></div>';

DGW.templates.side.anonymousSignUp =  '<div class="dg-side-section dg-full-size">' +
                                        '<img data-image="temp-signup-bg.png" class="dg-side-image-bg" src=""/>' +
                                        '<div class="dg-side-content">' +
                                            '<p>Join<br/>Everton<br/>&<br/><span class="dg-o-w-font-smaller dg-o-w-color-brand">get prizes</span></p>' +
                                            '<div class="dg-side-cta">Join</div>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="dg-side-bottom-floating"><div class="dg-side-progress-bar"><div class="dg-side-progress-bar-inner"></div></div></div>';

DGW.templates.side.registeredProfile =  '<div class="dg-side-section dg-small-size">' +
                                            '<img data-userstats-userimage class="dg-side-image-bg" src=""/>' +
                                            '<div class="dg-side-content">' +
                                                '<div class="dg-side-progress-bar"><div class="dg-side-progress-bar-inner"></div></div>' +
                                                '<p data-userstats-points-c class="dg-o-w-points-text">00</p>' +
                                            '</div>' +
                                        '</div>';

DGW.templates.side.actions = {
    earn: '<div class="dg-side-bottom-floating dg-side-action" data-page="earn">Earn</div>',
    play: '<div class="dg-side-bottom-floating dg-side-action" data-page="draws">Play</div>',
    stats: '<div class="dg-side-bottom-floating dg-side-action" data-page="profile">Stats</div>'
};

DGW.templates.side.notifications = {
    winner: '<div class="dg-side-notification dg-side-claim-prize"></div>'
};
DGW.templates.spinner = '<div class="dg-o-w-spinner">' +
                            '<div class="sk-circle1 sk-circle"></div><div class="sk-circle2 sk-circle"></div><div class="sk-circle3 sk-circle"></div>' +
                            '<div class="sk-circle4 sk-circle"></div><div class="sk-circle5 sk-circle"></div><div class="sk-circle6 sk-circle"></div>' +
                            '<div class="sk-circle7 sk-circle"></div><div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div>' +
                            '<div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div><div class="sk-circle12 sk-circle"></div>' +
                        '</div>';

DGW.templates.loginFooter = '<footer class="dg-o-w-footer-login">' +
                                '<div class="footer-section">' +
                                    '<div class="inline-part inline-table dg-o-w-text-left"><p>Get started now and earn first <span id="dg-o-w-login-fb-reward" class="dg-o-w-rewarded-action dg-o-w-points">30</span></p>' +
                                    '<h5 class="dg-o-w-color-grey">We\'ll never send you any spam.</h5></div>' +
                                    '<div class="inline-part inline-table"><a href="#" id="dg-o-w-footer-fb-connect" class="btn-dg-o-w btn-dg-o-w-brand btn-dg-o-w-large">Connect with Facebook</a></div>' +
                                    '<div class="inline-part inline-table"><p>or</p></div>' +
                                    '<div class="inline-part inline-table"><a id="dg-o-w-footer-email-login" href="#" class="btn-dg-o-w btn-dg-o-w-brand-l btn-dg-o-w-large">Enter with email</a></div>' +
                                '</div>' +
                            '</footer>';

DGW.templates.header = '<div class="dg-o-w-header">' +
                            '<div class="dg-o-w-logo"></div>' +
                            '<div class="dg-o-w-menu">' +
                            '<ul><li class="earn-menu-item">Earn</li>' +
                                '<li class="draws-menu-item">Enter & Play</li>' +
                                '<li class="activities-menu-item">Leaderboards</li></ul>' +
                            '</div>' +
                            '<div class="dg-o-w-menu-profile">' +
                                '<div class="profile-menu-item">' +
                                    '<img data-userstats-userimage class="avatar" src="" />' +
                                    '<div class="profile-menu-unauthorized">' +
                                        '<div>' +
                                            '<h4>Hello, guest!</h4>' +
                                            '<div class="dg-o-w-login-dropdown">' +
                                                '<a href="#" id="dg-o-w-login-trigger">Enter & get started</a>' +
                                                '<div class="dg-o-w-email-login-form">' +
                                                    '<form class="shown" id="dg-o-w-form-login-top">' +
                                                        '<h2 id="dg-o-w-login-heading">Welcome!</h2>' +
                                                        '<div id="dg-o-w-header-fb-connect" class="btn-dg-o-w btn-dg-o-w-brand btn-dg-o-w-large">Connect with Facebook</div>' +
                                                        '<label><input type="email" placeholder="Email" /></label>' +
                                                        '<label><input type="password" placeholder="Password"/></label>' +
                                                        '<label class="dg-o-w-hidden"><input type="text" placeholder="Hello, what\'s your name?"/></label>' +
                                                        '<input class="btn-dg-o-w btn-dg-o-w-brand-l btn-dg-o-w-large" type="submit" value="Enter with email" />' +
                                                        '<a href="#" id="dg-o-w-header-forgot-pass" class="">Forgot your password?</a>' +
                                                    '</form>' +
                                                    '<form id="dg-o-w-form-forgot-top">' +
                                                        '<h2>Forgot password?</h2>' +
                                                        '<div><label><input type="email" placeholder="Email" /></label>' +
                                                        '<input class="btn-dg-o-w btn-dg-o-w-brand btn-dg-o-w-large" type="submit" value="Request new password" />' +
                                                        '<a href="#" class="">&larr; Back</a></div>' +
                                                        '<p class="success-message">Email was sent</p>' +
                                                    '</form>' +
                                                    '<div class="dg-o-w-header-form-close" id="dg-o-w-header-form-close">&times;</div>' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="profile-menu-authorized">' +
                                        '<div>' +
                                            '<h4 data-userstats-username>Hello, Paul!</h4>' +
                                            '<p><span data-userstats-points-c>25</span> | <span data-userstats-credits-c>115.25</span></p>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>';

DGW.templates.mainWidgetCore = '<div id="dg-o-w-wrapper">' +
                                    '<div class="dg-o-w-overlay">' +
                                        '<div class="dg-o-w-body">' +
                                            '<div class="dg-o-w-body-wrapper">' +
                                                DGW.templates.header +
                                                '<div class="dg-o-w-content"><div class="dg-o-w-section">' +
                                                    '<section></section>' +
                                                    DGW.templates.loginFooter +
                                                '</div></div>' +
                                            '</div>' +
                                            '<div class="dg-o-w-close">&times;</div>' +
                                            DGW.templates.spinner +
                                        '<footer class="dg-o-w-main-footer">Powered by Loyalty Rewarded, 2016 &nbsp;&nbsp;-&nbsp;&nbsp; ' +
                                            '<a data-link="faq" href="#">FAQ</a>, <a data-link="privacy" href="#">Privacy Policy</a>, <a data-link="terms" href="#">Terms & Conditions</a>' +
                                        '</footer></div>' +
                                    '</div>' +
                                '</div>';

DGW.templates.earnMain = '<div class="dg-o-w-submenu">' +
                            '<ul><li class="dg-o-w-active">All</li>' +
                                '<li>Share</li>' +
                                '<li>Watch</li>' +
                                '<li>Visit</li>' +
                                '<li>Download</li>' +
                                '<li>Invite</li></ul>' +
                            '<select class="single-select"></select>' +
                        '</div>' +
                        '<div class="dg-o-w-section-content">' +
                            '<h3>Complete the tasks and earn +<span></span> points today</h3>' +
                            '<ul class="dg-o-w-list-offers"></ul>' +
                        '</div>';

DGW.templates.drawsMain = '<div class="dg-o-w-submenu">' +
                            '<ul><li class="dg-o-w-active" id="dg-o-w-show-all-draws">All draws</li><li id="dg-o-w-show-finished-soon">Finishing soon</li>' +
                                '<li id="dg-o-w-show-my-draws">My draws</li><li id="dg-o-w-show-games">Games</li></ul>' +
                            '<label class="checkbox-slider">Show completed draws <input id="dg-o-w-show-expired" type="checkbox" class="ios-switch bigswitch" /><div><div></div></div></label>' +
                        '</div>' +
                        '<div class="dg-o-w-section-content">' +
                            '<div class="dg-o-w-draws-active"><ul class="dg-o-w-list-draws"></ul></div>' +
                        '</div>';

DGW.templates.profileMain = '<div class="dg-o-w-profile dg-o-w-white-section">' +

                                '<div class="dg-o-w-profile-stats">' +
                                    '<div class="dg-o-w-image-holder"><img data-userstats-userimage class="avatar" src="" /></div>' +
                                    '<div class="dg-o-w-profile-stats-holder">' +
                                        '<h3 data-userstats-username class="dg-o-w-profile-name">Captain Deadpool</h3>' +
                                        '<div class="dg-o-w-profile-stats-holder-rest">' +
                                            '<div class="dg-o-w-profile-stats-inner" data-page="friends"><div><h3 class="dg-o-w-color-brand" data-friends-c></h3><p>friends</p></div><div class="dg-o-w-profile-stats-pend"><p data-friends-requests class="green-highlighter"></p></div></div>' +
                                            //'<div class="dg-o-w-profile-stats-inner"><div><h3 class="dg-o-w-color-brand" data-userstats-groups-c>20</h3><p>groups</p></div><div class="dg-o-w-profile-stats-pend"><p data-userstats-groups-p class="green-highlighter">3</p></div></div>' +
                                            '<div class="dg-o-w-profile-stats-inner"><div class="dg-o-w-profile-stats-icon dg-o-w-points-icon"></div><div><h3 data-userstats-points-c>520</h3><p>points</p></div></div>' +
                                            '<div class="dg-o-w-profile-stats-inner"><div class="dg-o-w-profile-stats-icon dg-o-w-credits-icon"></div><div><h3 data-userstats-credits-c>40</h3></div></div>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +

                                '<div class="dg-o-w-profile-text-block">' +
                                    '<p id="dg-o-w-login-fb-text">Get +<span class="dg-o-w-rewarded-action" id="dg-o-w-login-fb-reward">50</span> additional points by adding your other accounts from ' +
                                        '<a href="#" class="dg-o-w-fb-connect"></a></p>' +
                                '</div>' +

                                '<div class="dg-o-w-profile-text-block">' +
                                    '<p id="dg-o-w-profile-earn-today">&nbsp;</p>' +
                                '</div>' +

                                '<div class="dg-o-w-profile-progress"><div style="width:35%;"></div></div>' +

                                '<div class="dg-o-w-profile-signout dg-o-w-float-right">' +
                                    '<p class="dg-o-w-color-brand-light"><a id="dg-o-w-sign-out-btn" href="#">Sign out</a></p>' +
                                '</div>' +
                            '</div>' +
                            '<div class="dg-o-w-section-content content-static dg-o-w-white-section dg-o-w-blocks-margin">' +
                                '<div class="dg-o-w-badges-holder"><ul></ul></div>' +
                            '</div>';


DGW.templates.loginMain = '<div class="dg-o-w-login">' +
                                '<div class="dg-o-w-login-holder"><div class="dg-o-w-login-holder-content">' +
                                    '<h1>Earn points & enter exclusive prize draws</h1>' +
                                    '<h4>Become a part of the team</h4>' +
                                '</div></div>' +
                                '<h4 class="dg-o-w-login-prize-title" id="dg-o-w-login-prize-title"></h4>' + //TODO: do a prize title using data-attribute
                            '</div>';

DGW.templates.activitiesMain = '<div class="dg-o-w-submenu"><ul>' +
                                    '<li class="dg-o-w-active">Leaderboard</li></ul></div>' +
                                '<div class="dg-o-w-section-scroller">' +
                                    '<div class="dg-o-w-activities dg-o-w-white-section">' +
                                        '<div class="dg-o-w-activity-slider-holder">' +
                                            '<div class="dg-o-w-activity-slider-controls">' +
                                                '<div class="dg-o-w-activity-slider-prev dg-o-w-arrow dg-o-w-arrow-left"></div><div class="dg-o-w-activity-slider-next dg-o-w-arrow dg-o-w-arrow-right"></div>' +
                                            '</div>' +
                                            '<div class="dg-o-w-activity-slider"><ul></ul></div>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="dg-o-w-section-content content-static dg-o-w-white-section">' +
                                        '<div class="dg-o-w-section-header">' +
                                            '<p class="dg-o-w-float-left">Activities for today</p>' +
                                            // TODO: don't show until we have invite friends functionality
                                            // '<p class="dg-o-w-floating-link"><a href="#">Invite more friends</a> and get +<span id="dg-o-w-friends-sign-up-reward" class="dg-o-w-rewarded-action">50</span> points for each</p>' +
                                            '<select id="dg-o-w-activities-filter" class="dg-o-w-float-right">' +
                                                '<option value="all-activities">All activities</option>' +
                                                '<option value="my-activities">My Activities</option>' +
                                            '</select>' +
                                        '</div>' +
                                        '<div class="dg-o-w-section-list-holder"><ul data-activities></ul></div>' +
                                    '</div>' +
                                '</div>';

DGW.templates.friendsMain = '<div class="dg-o-w-submenu"><ul>' +
                                    '<li class="dg-o-w-active" data-submenu="friends">Friends</li><li data-submenu="following">Following</li><li data-submenu="followers">Followers</li></ul>' +
                                '<div class="dg-o-w-float-right dg-o-w-inline-form dg-o-w-right-padding">' +
                                    '<form class="search-form"><input class="search-field" type="text" placeholder="Search" /><span class="form-search-decorator"></span></form>' +
                                '</div></div>' +
                                '<div class="dg-o-w-section-scroller">' +
                                    '<div class="dg-o-w-section-content content-static dg-o-w-white-section">' +
                                        '<div class="dg-o-w-section-header">' +
                                            // '<div class="dg-o-w-float-left"><p><a href="#" class="btn-dg-o-w btn-dg-o-w-brand">Invite more friends</a> and get points per each</p></div>' +
                                            '<div class="dg-o-w-float-right"><p class="line-height-btn">You have <span data-friends-c></span> friends <span class="green-highlighter" data-friends-requests></span></p></div>' +
                                        '</div>' +
                                        '<div class="dg-o-w-section-list-holder"><ul data-friends-list>' +
                                            '<li class="dg-o-w-table-display">' +
                                                '<div class="dg-o-w-cell dg-o-w-cell-full"><h3>Your friends list is loading... Please, wait a bit</h3></div>' +
                                            '</li>' +
                                        '</ul></div>' +
                                    '</div>' +
                                '</div>';

DGW.templates.userListItem = '<div class="dg-o-w-cell">' +
                                    '<img src="" data-user-image/>' +
                                    '<div class="dg-o-w-details">' +
                                        '<p class="dg-o-w-color-brand" data-user-name></p>' +
                                            //'<p class="dg-o-w-color-grey">2 common groups</p>' +
                                    '</div>' +
                                '</div>' +
                                '<div class="dg-o-w-cell">' +
                                    '<div class="dg-o-w-users-done" data-user-common-users></div>' +
                                '</div>' +
                                '<div class="dg-o-w-cell" data-user-actions></div>';

DGW.templates.userListItemNothingFound = '<div class="dg-o-w-cell dg-o-w-cell-full"><h3>Unfortunately, no matching result was found.</h3></div>';
DGW.templates.userListItemNew = '<div class="dg-o-w-cell dg-o-w-cell-full"><h3>Your friends list is loading... Please, wait a bit</h3></div>';

DGW.templates.userListActions = {
    follow: '<div class="btn-dg-o-w btn-dg-o-w-small btn-dg-o-w-stroked" data-click-holder>Follow</div>',
    following: '<div class="btn-dg-o-w btn-dg-o-w-small btn-dg-o-w-stroked-okay">' +
                    '<span class="btn-dg-o-w-dropdown-holder">Following</span><span class="btn-dg-o-w-dropdown-action" data-click-holder>Unfollow</span>' +
                '</div>',
    followsYou: '<p class="btn-dg-o-w-text-small dg-o-w-color-grey">Follows you</p>',
    friends: '<div class="btn-dg-o-w btn-dg-o-w-small btn-dg-o-w-stroked-okay">' +
                    '<span class="btn-dg-o-w-dropdown-holder">Friends</span><span class="btn-dg-o-w-dropdown-action" data-click-holder>Unfriend</span>' +
             '</div>',
    request: '<div class="btn-dg-o-w btn-dg-o-w-small btn-dg-o-w-stroked" data-click-holder>Add to friends</div>',
    requestSent: '<p class="btn-dg-o-w-text-small dg-o-w-color-grey">Request sent</p>',
    accept: '<div class="btn-dg-o-w btn-dg-o-w-small btn-dg-o-w-stroked" data-click-holder>Accept</div>',
    decline: '<div class="btn-dg-o-w btn-dg-o-w-small btn-dg-o-w-stroked" data-click-holder>Decline</div>'
};

DGW.templates.videoHolderInner = '<div id="dg-o-w-video-playing"></div><div class="dg-o-w-video-text"><span></span></div>';
DGW.templates.videoHolder = '<div class="dg-o-w-video-holder">' + DGW.templates.videoHolderInner + '</div>';

DGW.templates.notificationHolder = '<div class="dg-o-w-notification-holder"><ul></ul><div class="dg-o-w-notification-close">&times;</div></div>';
DGW.side.elements.widget = document.createElement('div');
DGW.side.elements.widget.id = 'dg-side-widget';
DGW.side.elements.widget.innerHTML = DGW.templates.sideWidgetCore;
DGW.side.elements.widgetBody = DGW.side.elements.widget.querySelector('.dg-side-widget-body');
DGW.side.elements.widgetContent = DGW.side.elements.widgetBody.querySelector('.dg-side-widget-content');

DGW.side.elements.clickCatcher = document.createElement('div');
DGW.side.elements.clickCatcher.className = 'dg-side-click-holder';
DGW.global.elements.documentBody = document.body;

DGW.main.elements.widget = document.createElement('div');
DGW.main.elements.widget.id = 'dg-o-w';
DGW.main.elements.widget.innerHTML = DGW.templates.mainWidgetCore;
DGW.main.elements.widgetBody = DGW.main.elements.widget.querySelector('.dg-o-w-body');
DGW.main.elements.widgetBodyWrapper = DGW.main.elements.widgetBody.querySelector('.dg-o-w-body-wrapper');

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
DGW.main.elements.loginMenuButton = DGW.main.elements.widget.querySelector('#dg-o-w-login-trigger');

DGW.main.elements.pages.earnMain = document.createElement('div');
DGW.main.elements.pages.earnMain.innerHTML = DGW.templates.earnMain;
DGW.main.elements.pages.drawsMain = document.createElement('div');
DGW.main.elements.pages.drawsMain.innerHTML = DGW.templates.drawsMain;
DGW.main.elements.pages.singleDraw = document.createElement('div');
DGW.main.elements.pages.activitiesMain = document.createElement('div');
DGW.main.elements.pages.activitiesMain.innerHTML = DGW.templates.activitiesMain;
DGW.main.elements.activitiesSliderParent = DGW.main.elements.pages.activitiesMain.querySelector('.dg-o-w-activities');
DGW.main.elements.pages.profileMain = document.createElement('div');
DGW.main.elements.pages.profileMain.innerHTML = DGW.templates.profileMain;
DGW.main.elements.pages.loginMain = document.createElement('div');
DGW.main.elements.pages.loginMain.innerHTML = DGW.templates.loginMain;
DGW.main.elements.pages.friendsMain = document.createElement('div');
DGW.main.elements.pages.friendsMain.innerHTML = DGW.templates.friendsMain;

DGW.main.elements.pages.videoHolder = document.createElement('div');
DGW.main.elements.pages.videoHolder.innerHTML = DGW.templates.videoHolder;

DGW.main.elements.pages.notificationHolder = document.createElement('div');
DGW.main.elements.pages.notificationHolder.innerHTML = DGW.templates.notificationHolder;
DGW.main.elements.pages.notificationHolder = DGW.main.elements.pages.notificationHolder.querySelector('div');

DGW.main.elements.frameHolder = document.createElement('div');
DGW.main.elements.frameHolder.className = 'dg-o-w-frame-holder';
DGW.main.elements.frameHolder.innerHTML = '<div class="dg-o-w-submenu"><div class="dg-o-w-back-btn">&larr; Back</div></div>' +
                                          '<div class="dg-o-w-iframe-holder"></div>';
// Main widget global methods
DGW.main.methods.showWidget = function(){
    DGW.helpers.zeroTimeout(function(){ DGW.main.shown = true; }); // Fixing IE button click
    DGW.helpers.removeClass(DGW.main.elements.widget, 'hiding');
    DGW.global.elements.documentBody.appendChild(DGW.main.elements.widget);
    if (DGW.main.currentState === '') {
        DGW.main.methods.changeMainState('earn');
    } else {
        DGW.main.methods.changeMainState(DGW.main.currentState);
    }
    DGW.main.methods.pageBodyLock();
};
DGW.main.methods.hideWidget = function(){
    DGW.helpers.zeroTimeout(function(){ DGW.main.shown = false; });
    DGW.helpers.addClass(DGW.main.elements.widget, 'hiding');
    setTimeout(function(){
        DGW.global.elements.documentBody.removeChild(DGW.main.elements.widget);
        ga(DGW.global.gaSend, 'pageview', 'Holder page');
    }, 310);
    DGW.main.methods.pageBodyUnlock();
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
    ga(DGW.global.gaSend, 'pageview', 'Holder page');
};
DGW.side.methods.hideWidget = function(){
    DGW.global.elements.documentBody.removeChild(DGW.side.elements.widget);
};


DGW.global.methods.authorize = function(){
    DGW.main.methods.resetStates();
    DGW.helpers.addClass(DGW.main.elements.widgetBody, 'authorized');
    DGW.global.authorized = true;
    DGW.helpers.addClass(DGW.side.elements.widgetBody, 'dg-o-w-authorized');
    // ********
    if (DGW.main.currentState !== 'draws' && DGW.main.shown) {
        DGW.main.methods.changeMainState('earn');
    }
    DGW.global.api.requests.getDraws(function(){
        DGW.global.api.requests.getDrawEntries(function(){
            DGW.main.methods.changeDrawsSubmenu(DGW.main.settings.draws.currentSubMenu);
        });
    });

    DGW.side.methods.changeSideWidgetState();
    DGW.global.api.requests.getUserActions();
};

DGW.global.methods.unAuthorize = function(){
    DGW.helpers.removeClass(DGW.main.elements.widgetBody, 'authorized');
    DGW.helpers.removeClass(DGW.side.elements.widgetBody, 'dg-o-w-authorized');
    DGW.global.authorized = false;
    if (DGW.main.currentState === 'profile' && DGW.main.shown) {
        DGW.main.methods.changeMainState('profile');
    }
    DGW.main.methods.resetStates();
    DGW.global.methods.userStatsReset();

    DGW.side.methods.changeSideWidgetState();
    DGW.side.methods.hideNotification();
};

DGW.global.methods.userStatsReset = function(){
    DGW.global.userStats.userId = '';
    DGW.global.userStats.imageUrl = DGW.helpers.checkImagesForSrc();
    DGW.global.userStats.name = 'Guest';
    DGW.global.userStats.facebookId = null;
    DGW.global.userStats.pointsC = 0;
    DGW.global.userStats.pointsP = 0;
    DGW.global.userStats.creditsC = 0;
    DGW.global.userStats.creditsP = 0;
    DGW.global.userStats.earnToday = null;
    DGW.global.userStats.badges = {
        all: {},
        earned: {}
    };
    DGW.global.userStats.friends = 0;
    DGW.global.userStats.friendsRequests = 0;
};

DGW.global.methods.init = function(){


    // initialising widget events
    //DGW.side.methods.initEvents();
    DGW.main.methods.initEvents();

    // adding notification panel to the DOM (hidden)
    DGW.main.elements.widgetWrapper.appendChild(DGW.main.elements.pages.notificationHolder);

    // filling user default data
    DGW.global.methods.userStatsReset();

    //Initializing or checking user
    DGW.global.api.requests.getUser(
        function registered(){},
        function anonymous(){
            DGW.global.api.requests.getDraws();
            DGW.global.api.requests.getActions();
        }
    );

    if (DGW.global.safariFixFirstOpen) {
        DGW.main.methods.showWidget();
    }
};

DGW.main.methods.showNotificationBar = function(type){
    var nh = DGW.main.elements.pages.notificationHolder;
    if (!type) type = 'success';
    DGW.helpers.addClass(nh, type);
    nh.querySelector('.dg-o-w-notification-close').addEventListener('click', DGW.main.methods.hideNotificationBar);
};

DGW.main.methods.hideNotificationBar = function(){
    DGW.helpers.removeClass(DGW.main.elements.pages.notificationHolder, 'success');
    DGW.helpers.removeClass(DGW.main.elements.pages.notificationHolder, 'error');
};

DGW.main.methods.pageBodyLock = function(){
    DGW.helpers.addClass(DGW.global.elements.documentBody, 'dg-o-w-body-fixed');
};
DGW.main.methods.pageBodyUnlock = function(){
    DGW.helpers.removeClass(DGW.global.elements.documentBody, 'dg-o-w-body-fixed');
};
DGW.side.methods.ctaClick = function(){
    if (this.getAttribute('data-page') != null) {
        DGW.main.currentState = this.getAttribute('data-page');
    }
    if (!DGW.main.shown) {
        DGW.main.methods.showWidget();
    } else {
        DGW.main.methods.changeMainState(DGW.main.currentState);
    }
};

DGW.side.methods.initEvents = function(){
    if (!DGW.global.launched) {
        // Showing side widget
        DGW.side.methods.showWidget();
        DGW.global.launched = true;
    }

    var wBody = DGW.side.elements.widgetBody;
    var cta = wBody.querySelector('.dg-side-click-holder');

    wBody.removeEventListener('click', DGW.global.api.requests.safariFix);

    if (cta) {
        cta.addEventListener('click', DGW.side.methods.ctaClick);
    }

    DGW.helpers.imagesResponsivePaths(wBody.querySelectorAll('[data-image]'));
};

DGW.side.methods.initSafariFixEvents = function(){
    var wBody = DGW.side.elements.widgetBody;
    DGW.side.methods.showWidget();

    wBody.addEventListener('click', DGW.global.api.requests.safariFix);

    DGW.helpers.imagesResponsivePaths(wBody.querySelectorAll('[data-image]'));
};

DGW.side.methods.changeSideWidgetState = function(state) {
    var swc = DGW.side.elements.widgetContent;
    var wb = DGW.side.elements.widgetBody;
    var cc = wb.querySelector('.dg-side-click-holder');
    var mainCta;

    var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;

    swc.innerHTML = '';

    //TODO: TEMP place with randomized states
    /*var states = ['profile', 'draws'];
    if(!state) state = states[Math.round(Math.random())];*/
    var actions = ['earn', 'play'];
    var curAction = actions[Math.floor(Math.random() * actions.length)];

    switch(state){
        case 'draws':
            cc.setAttribute('data-page', 'draws');
            swc.innerHTML = DGW.templates.side.draw;
            break;
        default:
            // PROFILE or SIGNUP pages
            cc.setAttribute('data-page', 'profile');
            if (DGW.global.authorized) {
                swc.innerHTML = DGW.templates.side.registeredProfile;
                swc.innerHTML += DGW.templates.side.actions[curAction];
            } else {
                swc.innerHTML = DGW.templates.side.draw;
            }
    }

    mainCta = swc.querySelector('[data-page]');
    if (mainCta) cc.setAttribute('data-page', mainCta.getAttribute('data-page'));

    if (isSafari && !DGW.global.safariFix) {
        DGW.side.methods.initSafariFixEvents();
    } else {
        DGW.side.methods.initEvents();
    }
};

DGW.side.methods.showNotification = function(notification) {
    var wb = DGW.side.elements.widgetBody;
    var nh = wb.querySelector('.dg-side-notification-holder');
    nh.innerHTML = DGW.templates.side.notifications[notification];
};

DGW.side.methods.hideNotification = function() {
    DGW.side.elements.widgetBody.querySelector('.dg-side-notification-holder').innerHTML = '';
};
DGW.main.methods.activitiesInit = function(){

    DGW.main.elements.pages.activitiesMain.querySelector('#dg-o-w-activities-filter').addEventListener('change', function(){
        if (this.value === 'all-activities') {
            DGW.global.api.requests.getAllActivities(function(response){
                DGW.main.methods.activitiesConstructor(response.Activities);
            });
        } else {
            DGW.global.api.requests.getUserActivities(function(response){
                DGW.main.methods.activitiesConstructor(response.Activities);
            });
        }
    });

};
DGW.main.methods.drawsInit = function(){

    DGW.main.elements.pages.drawsMain.querySelector('#dg-o-w-show-expired').addEventListener('change', function (ev) {
        DGW.main.settings.draws.showExpired = this.checked;
        DGW.main.methods.changeDrawsSubmenu(DGW.main.settings.draws.currentSubMenu);
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
            if (DGW.main.settings.draws.showExpired) {
                hiddenDrawsChkBox.checked = true;
                DGW.helpers.addClass(DGW.main.elements.widgetBody, 'draws-expired');
            }
            hiddenDrawsChkBox.parentNode.style.display = 'block';
        }

        DGW.main.methods.changeDrawsSubmenu = function(state){
            submenuItems.filter(function(item){
                return item.id == state;
            })[0].click();
        };

        submenuItems.forEach(function(item){
            item.addEventListener('click', function(){
                removeActive();
                DGW.helpers.addClass(this, 'dg-o-w-active');
                DGW.main.settings.draws.currentSubMenu = this.id;
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

};
(function(){
    var dp = DGW.main.elements.pages.friendsMain;

    (function searchFriends(){
        var friendSearch = dp.querySelector('.search-form .search-field');
        var searchEmpty = dp.querySelector('.search-form .form-search-decorator');
        var searchTimeout;
        var searchDelay = 500;

        friendSearch.addEventListener('input', function(){
            var that = this;
            DGW.helpers.console.info('input');
            if (that.value.length > 0) {
                DGW.helpers.addClass(searchEmpty, 'form-search-empty');
                searchEmpty.addEventListener('click', searchFormReset);
                if (searchTimeout) window.clearTimeout(searchTimeout);
                searchTimeout = window.setTimeout(function () {
                    DGW.helpers.console.info('search');
                    DGW.helpers.addClass(searchEmpty, 'form-search-progress');
                    searchEmpty.removeEventListener('click', searchFormReset);
                    DGW.global.api.requests.userSearch(that.value,
                        function (searchQuery) {
                            DGW.main.methods.usersConstructor('search', searchQuery);
                            DGW.helpers.removeClass(searchEmpty, 'form-search-progress');
                            searchEmpty.addEventListener('click', searchFormReset);
                        },
                        function () {
                            DGW.helpers.removeClass(searchEmpty, 'form-search-progress');
                            searchEmpty.addEventListener('click', searchFormReset);
                        }
                    );
                }, searchDelay);
            } else {
                searchFormReset();
            }
        });

        function searchFormReset(){
            DGW.main.methods.friendsResetSearch();
            DGW.main.methods.usersConstructor(DGW.main.settings.friends.currentSubMenu);
        }

        DGW.main.methods.friendsResetSearch = function(){
            friendSearch.value = '';
            if (searchTimeout) window.clearTimeout(searchTimeout);
            DGW.helpers.removeClass(searchEmpty, 'form-search-empty');
            DGW.helpers.removeClass(searchEmpty, 'form-search-progress');
            searchEmpty.removeEventListener('click', searchFormReset);
        };

    })();

    // Submenu clicks
    (function handlingSubmenu(){
        var items = Array.prototype.slice.call(dp.querySelectorAll('.dg-o-w-submenu li'));
        function noActive() {
            items.forEach(function(item){
                DGW.helpers.removeClass(item, 'dg-o-w-active');
            });
        }

        items.forEach(function(item){
            item.addEventListener('click', function(){
                noActive();
                DGW.helpers.addClass(this, 'dg-o-w-active');
                DGW.main.methods.usersConstructor(this.getAttribute('data-submenu'));
                DGW.main.settings.friends.currentSubMenu = this.getAttribute('data-submenu');
            });
        });
    })();

    DGW.main.methods.friendsSetData = function(friends, requests){
        var friendsHolders = DGW.helpers.getElementsFromAllPlaces('[data-friends-c]'),
            requestsHolders = DGW.helpers.getElementsFromAllPlaces('[data-friends-requests]');

        if (!friends) {
            if (DGW.main.cache.userRelations.users) {
                friends = DGW.main.cache.userRelations.users.filter(function(u){return u.Rels.some(function(r){return r==='Friends'})}).length;
            } else {
                friends = 0;
            }
        }
        if (!requests) {
            if (DGW.main.cache.userRelations.users) {
                requests = DGW.main.cache.userRelations.users.filter(function(u){return u.Rels.some(function(r){return r==='FriendRequestFrom'})}).length;
            }
            requests = 0;
        }

        DGW.global.userStats.friends = friends;
        DGW.global.userStats.friendsRequests = requests;



        friendsHolders.forEach(function(f){
            f.innerHTML = DGW.global.userStats.friends;
        });

        requestsHolders.forEach(function(r){
            if (DGW.global.userStats.friendsRequests === 0) {
                r.style.display = 'none';
            } else {
                r.style.display = 'inline-block';
            }
            r.innerHTML = DGW.global.userStats.friendsRequests;
        });
    };

})();
DGW.main.methods.loginInit = function(){

    // login dropdown menu
    (function headerLoginFormTriggers(){
        var link = DGW.main.elements.loginMenuButton;
        var linkP = link.parentNode;
        var form = linkP.querySelector('.dg-o-w-email-login-form');
        var formClose = form.querySelector('#dg-o-w-header-form-close');
        var heading = form.querySelector('#dg-o-w-login-heading');

        DGW.main.methods.headerLoginShow = function(headingText){
            headingText = headingText || 'Welcome!';
            heading.innerHTML = headingText;
            DGW.helpers.addClass(form, 'visible');
            setTimeout(function () {
                DGW.helpers.addClass(linkP, 'shown');
                form.querySelector('input').focus();
            }, 100);
        };
        DGW.main.methods.headerLoginHide = function(){
            DGW.helpers.removeClass(linkP, 'shown');
            setTimeout(function () {
                DGW.helpers.removeClass(form, 'visible');
                Array.prototype.slice.call(form.querySelectorAll(':not([type=submit])'))
                    .forEach(function(input){
                        input.value = '';
                    });
                DGW.main.methods.headerLoginReset();
            }, 310);
        };

        function triggerLoginForm(){
            if (DGW.helpers.hasClass(linkP, 'shown')) {
                DGW.main.methods.headerLoginHide();
            } else {
                DGW.main.methods.headerLoginShow();
            }
        }


        link.addEventListener('click', triggerLoginForm);
        formClose.addEventListener('click', DGW.main.methods.headerLoginHide);
    })();

    DGW.main.elements.widget.querySelector('#dg-o-w-header-fb-connect').addEventListener('click', function(ev){
        ev.preventDefault();
        DGW.global.api.requests.connectFB();
    });

    // login form submit
    var topLoginForm = DGW.main.elements.widgetBody.querySelector('#dg-o-w-form-login-top');
    var topForgotForm = DGW.main.elements.widgetBody.querySelector('#dg-o-w-form-forgot-top');

    (function topLoginInit(){
        var noUserRXP = /not\sfound/;
        var emailF = topLoginForm.querySelector('[type=email]'),
            passF = topLoginForm.querySelector('[type=password]'),
            nameF = topLoginForm.querySelector('[type=text]'),
            btn = topLoginForm.querySelector('[type=submit]');
        var btnVal = btn.value;
        var trySignIn = function(ev){
                ev.preventDefault();
                DGW.main.methods.hideNotificationBar();
                DGW.global.api.requests.signIn({
                    Email: emailF.value,
                    Password: passF.value
                }, function onSuccess(){
                    DGW.main.methods.notificationConstructor(['Welcome back, ' + DGW.global.userStats.name, 'Have a look at our new offers!']);

                    ga(DGW.global.gaSend, 'event', 'UserActions', 'SignIn');
                }, function onError(result){
                    var err = DGW.helpers.errorParser(result).messages;
                    if (noUserRXP.test(err)) {
                        DGW.helpers.removeClass(nameF.parentNode, 'dg-o-w-hidden');
                        nameF.focus();
                        topLoginForm.removeEventListener('submit', trySignIn);
                        topLoginForm.addEventListener('submit', trySignUp);
                        btn.value = 'Sign up with email';
                    } else {
                        DGW.main.methods.notificationConstructor(err, 'error');
                    }
                });
            },
            trySignUp = function(ev){
                ev.preventDefault();

                DGW.main.methods.hideNotificationBar();
                DGW.global.api.requests.signUp({
                    Email: emailF.value,
                    Password: passF.value,
                    Username: nameF.value
                }, function onSuccess(){
                    DGW.main.methods.notificationConstructor(['Hi, ' + nameF.value + '! ', 'Welcome to ' + DGW.global.club.name + ' rewarded widget.']);

                    ga(DGW.global.gaSend, 'event', 'UserActions', 'SignUp');
                }, function onError(result){
                    var err = DGW.helpers.errorParser(result).messages;
                    DGW.main.methods.notificationConstructor(err, 'error');
                });
            };

        topLoginForm.addEventListener('submit', trySignIn);

        DGW.main.methods.headerLoginReset = function(){
            topLoginForm.removeEventListener('submit', trySignUp);
            topLoginForm.addEventListener('submit', trySignIn);
            DGW.helpers.addClass(nameF.parentNode, 'dg-o-w-hidden');
            btn.value = btnVal;
        };
    })();

    topForgotForm.addEventListener('submit', function(ev){
        ev.preventDefault();
        var that = this;
        var emailF = that.querySelector('[type=email]').value;
        DGW.global.api.requests.forgotPass(emailF,
            function onSuccess(){
                DGW.main.methods.notificationConstructor('Check your email to confirm the new password.');

                ga(DGW.global.gaSend, 'event', 'UserActions', 'PasswordRestoring');
            }, function onError(result){
                DGW.main.methods.notificationConstructor(DGW.helpers.errorParser(result).messages, 'error');
            });
    });
    topLoginForm.querySelector('#dg-o-w-header-forgot-pass').addEventListener('click', function(ev){
        ev.preventDefault();
        DGW.helpers.removeClass(topLoginForm, 'shown');
        DGW.helpers.addClass(topForgotForm, 'shown');
    });
    topForgotForm.querySelector('a').addEventListener('click', function(ev){
        ev.preventDefault();
        DGW.helpers.removeClass(topForgotForm, 'shown');
        DGW.helpers.addClass(topLoginForm, 'shown');
    });

    //Footer login init
    DGW.main.elements.loginFooter.querySelector('#dg-o-w-footer-email-login').addEventListener('click', function (ev) {
        ev.preventDefault();
        DGW.main.methods.headerLoginShow();
    });
    DGW.main.elements.loginFooter.querySelector('#dg-o-w-footer-fb-connect').addEventListener('click', function(ev){
        ev.preventDefault();
        DGW.global.api.requests.connectFB();
    });
};
DGW.main.methods.profileInit = function(){

    //Profile page clicks
    DGW.main.elements.pages.profileMain.querySelector('#dg-o-w-login-fb-text').addEventListener('click', function(){
        DGW.global.api.requests.connectFB();
    });
    DGW.main.elements.pages.profileMain.querySelector('#dg-o-w-sign-out-btn').addEventListener('click', function (ev) {
        ev.preventDefault();
        DGW.global.api.requests.signOut();
    });

    DGW.helpers.getElementsFromAllPlaces('[data-page]', 'main').forEach(function(el){
        el.addEventListener('click', function(ev){
            ev.preventDefault();
            DGW.main.methods.changeMainState(el.getAttribute('data-page'));
        });
    });

};
DGW.main.methods.activitiesConstructor = function(activities){
    activities.sort(function(a, b){
        return new Date(b.Date) - new Date(a.Date);
    });
    var activitiesHolder = DGW.helpers.getElementsFromAllPlaces('[data-activities]')[0];
    activitiesHolder.innerHTML = '';

    activities.forEach(function(activity){
        var ownStats = false;
        if (!activity.User) {
            ownStats = true;
            activity.User = {
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
            } else if (activity.GameOrder.GameType === 'MatchQuiz') {
                message += ' placing a bet in ' + DGW.global.club.name + ' Score Predictor';
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
                case 'MatchQuizFacebookShare':
                    message += ' for sharing Score Predictor results on Facebook';
                    break;
                case 'MatchQuizTwitterShare':
                    message += ' for sharing Score Predictor results on Twitter';
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
                message += ' watching "' + activity.OfferAction.Title + '" video';
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


DGW.main.methods.gamesConstructor = function(){
    var dp = DGW.main.elements.pages.drawsMain;
    var dpCont = dp.querySelector('.dg-o-w-section-content');
    var gamesList = dp.querySelector('.dg-o-w-list-draws');
    gamesList.innerHTML = '';

    var games = [1];

    //var emptyMessageEl = document.createElement('div');
    //DGW.helpers.addClass(emptyMessageEl, 'dg-o-w-draws-empty');
    //if (dpCont.children.length > 1) dpCont.removeChild(dpCont.childNodes[1]);
    //emptyMessageEl.innerHTML = '<h2>Hi, we are glad to see you here, games will be available very soon!</h2></div>';
    //dpCont.appendChild(emptyMessageEl);


    if (dpCont.querySelector('.dg-o-w-draws-empty'))
        dpCont.removeChild(dpCont.querySelector('.dg-o-w-draws-empty'));


    games.forEach(function(game){
        var li = document.createElement('li');
        li.innerHTML =  '<div class="dg-o-w-draw">' +
                            '<div class="dg-o-w-draw-image-holder">' +
                                '<img src="" data-image="temp-score-predictor-logo.png"/>' +
                            '</div>' +
                            '<div class="dg-o-w-draw-text">' +
                                '<h2 class="dg-o-w-draw-countdown">Score predictor Game</h2>' +
                                '<p>Make predictions for your favourite matches, earn tons of points</p>' +
                            '</div>' +
                        '</div>';

        DGW.helpers.imagesResponsivePaths(li.querySelectorAll('img'));

        var a = document.createElement('a');
            a.href = 'http://everton.scorepredictor.club/';
            a.target = '_blank';
            a.innerHTML = 'Open link in the new tab';
        li.setAttribute('data-link', 'score-predictor');

        DGW.helpers.openDataLinks(li, a);

        gamesList.appendChild(li);
    });

    // TEMP PART
    var li = document.createElement('li');
    li.innerHTML =  '<div class="dg-o-w-draw">' +
                        '<div class="dg-o-w-draw-image-holder">' +
                            '<img src="" data-image="everton-bg.svg"/>' +
                        '</div>' +
                        '<div class="dg-o-w-draw-text">' +
                            '<h2 class="dg-o-w-draw-countdown">More games coming soon</h2>' +
                            '<p></p>' +
                        '</div>' +
                    '</div>';
    li.style.opacity = 0.4;
    li.style.cursor = 'default';

    DGW.helpers.imagesResponsivePaths(li.querySelectorAll('img'));
    gamesList.appendChild(li);
};
DGW.main.methods.drawsConstructor = function(cacheObj, _context){
    var dp = DGW.main.elements.pages.drawsMain;
    var dpCont = dp.querySelector('.dg-o-w-section-content');
    var drawsList = dp.querySelector('.dg-o-w-list-draws');
    drawsList.innerHTML = '';
    DGW.global.activeDrawsExist = false;
    var showExpiredDraws = DGW.main.settings.draws.showExpired;
    var draws = [];

    var emptyMessage = '';
    var emptyMessageEl = document.createElement('div');
    DGW.helpers.addClass(emptyMessageEl, 'dg-o-w-draws-empty');

    if (dpCont.children.length > 1) dpCont.removeChild(dpCont.childNodes[1]);


    function filterDrawsByChkBox(showActiveOnly){
        if (!showExpiredDraws || showActiveOnly) {
            draws = cacheObj.drawsList.filter(function (draw) {
                return !DGW.helpers.drawIsFinished(draw);
            });
        } else {
            draws = cacheObj.drawsList;
        }
    }

    if (cacheObj) {
        if (!_context || _context == 'my-draws') filterDrawsByChkBox();
        else filterDrawsByChkBox(true);

        if (draws.length == 0) {
            if (!_context) {
                emptyMessage = 'Sorry, but there are no draws running at the moment.';
            } else {
                if (_context == 'close-to-finish') {
                    emptyMessage = 'Sorry, but seems like there are no draws that will be completed soon.';
                }
                if (_context == 'my-draws') {
                    emptyMessage = 'Hey, seems like you are not taking a part in any of running draws';
                }
            }
            emptyMessageEl.innerHTML = '<h2>' + emptyMessage + '</h2><br/><div class="dg-o-w-draws-refresh"></div>';
            emptyMessageEl.querySelector('.dg-o-w-draws-refresh').addEventListener('click', function(){
                DGW.global.api.requests.getDraws(function(){
                    if (DGW.global.authorized) {
                        DGW.global.api.requests.getDrawEntries(function(){
                            DGW.main.methods.changeDrawsSubmenu(DGW.main.settings.draws.currentSubMenu);
                        });
                    } else {
                        DGW.main.methods.changeDrawsSubmenu(DGW.main.settings.draws.currentSubMenu);
                    }
                });
            });

            dpCont.appendChild(emptyMessageEl);
        }


        draws.forEach(function (draw) {

            var li = document.createElement('li');
            var drawEntry = cacheObj.drawsEntries.filter(function (de) {
                    return de.DrawId == draw.DrawId;
                })[0] || null;
            var winnerExist = draw.Winner;
            var isWinner = (drawEntry) ? drawEntry.IsWinner : false;
            var winnerHtml = '',
                winnerInnerText = '',
                drawEntryHtml = '',
                countdownHtml = '&nbsp;';
            var activeDraw = false;

            if (drawEntry) {
                var ticketsInDraw = drawEntry.TicketsAmount;
                var secondLineClass = (winnerExist ? ' dg-o-w-draw-bet-second' : '');
                drawEntryHtml = '<div class="dg-o-w-draw-bet' + secondLineClass + '"><p>You\'ve placed: <span>' + ticketsInDraw + '</span> points</p></div>';
                if (drawEntry.IsWinner) {
                    DGW.helpers.addClass(li, 'winner');
                    if (drawEntry.NeedToClaimPrize) {
                        DGW.helpers.addClass(li, 'claim-prize');
                    }
                }
            }

            if (winnerExist) {
                winnerInnerText = (isWinner === true) ? ('You\'ve won this draw!') : (draw.Winner.UserName + ' has won');
                winnerHtml = '<div class="dg-o-w-draw-list-winner"><img src="' + draw.Winner.ImageUrl + '" />' +
                '<p>' + winnerInnerText + '</p></div>';
            }

            if (DGW.helpers.drawIsFinished(draw)) {
                DGW.helpers.addClass(li, 'expired');
                countdownHtml = 'Finished ' + DGW.helpers.getDateFromNow(draw.EndDate);
            } else {
                activeDraw = true;
            }

            li.innerHTML = '<div class="dg-o-w-draw">' +
            '<div class="dg-o-w-draw-image-holder">' +
            '<img src="' + draw.Prize.ImageUrl + '" />' +
            '</div>' +
            '<div class="dg-o-w-draw-text">' +
            '<h2 class="dg-o-w-draw-countdown">' + countdownHtml + '</h2>' +
            '<p>' + draw.Prize.Description + '</p>' +
            '</div>' +
            winnerHtml + drawEntryHtml +
            '</div>';

            if (activeDraw) DGW.helpers.drawsTimer.push({
                dt: draw.EndDate,
                elem: li.querySelector('.dg-o-w-draw-countdown')
            });

            li.addEventListener('click', function() {
                if (DGW.global.authorized || !activeDraw) DGW.main.methods.singleDrawConstructor(draw.DrawId);
                else DGW.main.methods.headerLoginShow('Please, enter to play the draw');
            });

            drawsList.appendChild(li);
        });
    }

    DGW.main.methods.setRewardedActions();
};

DGW.main.methods.singleDrawConstructor = function(drawId){

    ga(DGW.global.gaSend, 'pageview', 'drawId=' + drawId);

    var draw = DGW.main.cache.drawsList.filter(function(draws){
        return draws.DrawId === drawId;
    })[0];
    var drawEntry = DGW.main.cache.drawsEntries.filter(function(draws){
        return draws.DrawId === drawId;
    })[0];

    var el = DGW.main.elements.pages.singleDraw;
    var prizeSect = '<div class="dg-o-w-draw-left-side">' +
        '<div class="prize-image"><img src="' + draw.Prize.ImageUrl + '" /></div>' +
        '</div>';
    var shareSect = '<div class="dg-o-w-draw-share dg-o-w-draw-auth-show">' +
        '<a href="#" class="dg-o-w-like dg-o-w-facebook-like">Share <span class="dg-o-w-rewarded-action" id="dg-o-w-facebook-like-reward"></span></a>' +
        '<a href="#" class="dg-o-w-like dg-o-w-twitter-like">Tweet <span class="dg-o-w-rewarded-action" id="dg-o-w-tweeter-like-reward"></span></a>' +
        '</div>';
    var submenu = '<div class="dg-o-w-submenu">' +
        '<ul><li class="dg-o-w-back-draws">&larr; Back</li></ul><div class="right-side">' +
        (!(drawEntry != undefined && drawEntry.IsWinner) ? /*'Minimum bet is 10'*/ '' : 'You\'ve placed ' + drawEntry.TicketsAmount + ' points and won!') +
        '</div>' +
        '</div>';
    var drawnState = '';

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
            drawnState = '<p>Winner will be announced very soon!</p>';
            DGW.helpers.console.info('isdrawn: ', draw.IsDrawn);
        } else {
            // Draw has been finished and drawn
            DGW.helpers.console.info(draw.IsDrawn);
            if (draw.Winner == null) {
                // No one has participated in the draw
                drawnState = '<p>Unfortunately, no one has participated in this Draw</p>';
            } else {
                drawnState = '<div class="dg-o-w-draw-winner"><img src="' + (draw.Winner.ImageUrl || DGW.helpers.checkImagesForSrc()) + '" />' +
                '<p>' + draw.Winner.UserName + ' has won this draw. Our congratulations!</p></div>';
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
    '<h3>' + draw.Prize.Title + '</h3>' +
    '<p>' + draw.Prize.Description + '</p>' +
    '<div class="dg-o-w-draw-bet-info dg-o-w-draw-auth-show">' +
    '<div class="dg-o-w-your-bet dg-o-w-points-bet"><p>You\'ve placed <span data-draw-betpoints>' + ((drawEntry) ? drawEntry.TicketsAmount : 0 ) + '</span> points</p></div>' +
    '</div>' +
    ((DGW.helpers.dateDiff(draw.EndDate) > 0) ? '<h2 class="dg-o-w-draw-login-show">Please, log in to play the draw</h2>' : '') +
    '<div class="dg-o-w-draw-bet-action dg-o-w-draw-auth-show">' +
    '<h4>How much do you want to place?</h4>' +
    '<form id="bet-form" class="dg-o-w-one-field-form">' +
    '<input type="number" min="1" max="1000" placeholder="50"/>' +
    '<input class="btn-dg-o-w btn-dg-o-w-brand" type="submit" value="Place points" />' +
    '</form>' +
    '<div id="dg-o-w-get-points-btn" class="btn-dg-o-w btn-dg-o-w-brand-l">Get additional points</div>' +
    '</div>' +
    drawnState +
    shareSect +
    '</div>' +
    '</div>' +
    '</div>';

    if (drawEntry && drawEntry.IsWinner) {
        var claimPrizeHtml = '';
        if (drawEntry.NeedToClaimPrize == true) {
            claimPrizeHtml ='<p class="hide-claimed">Put your address to get the prize</p>' +
            '<form id="claim-prize" class="dg-o-w-form hide-claimed">' +
            '<input type="text" name="Address1" placeholder="Address line 1" />' +
            '<input type="text" name="Address2" placeholder="Address line 2" />' +
            '<input type="text" name="County" placeholder="County" />' +
            '<input type="text" name="Postcode" placeholder="Postcode" />' +
            '<input class="btn-dg-o-w btn-dg-o-w-brand btn-dg-o-w-large" type="submit" value="Submit " />' +
            '</form>';
        } else {
            claimPrizeHtml ='<h2>You\'ve already claimed your prize!</h2>';
        }
        el.innerHTML = submenu +
        '<div class="dg-o-w-section-content">' +
        '<div class="dg-o-w-single-draw">' +
        prizeSect +
        '<div class="dg-o-w-draw-right-side won">' +
        '<h2>Congrats, you\'ve won!!!</h2>' +
        '<h3>' + draw.Prize.Title + '</h3>' +
        '<p>' + draw.Prize.Description + '</p>' +
        '<div>' + claimPrizeHtml + '</div>' +
        shareSect +
        '</div>' +
        '</div>' +
        '</div>';
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
                        p.className = ((result.RecentPlayers.length == 2) ? 'dg-o-w-two-images' : 'dg-o-w-three-images');
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
            ga(DGW.global.gaSend, 'event', 'DrawActions', 'GetAdditionalPoints');
        });
    }

    el.querySelector('.dg-o-w-submenu li.dg-o-w-back-draws').addEventListener('click', function(){
        DGW.main.methods.changeMainState('draws');
        ga(DGW.global.gaSend, 'event', 'DrawActions', 'BackToDrawsList');
    });

    if (el.querySelector('#bet-form')) {
        el.querySelector('#bet-form').addEventListener('submit', function (ev) {
            ev.preventDefault();
            var that = this;
            var betBtn = that.querySelector('input[type=submit]');
            var pointsToBet = +that.querySelector('input[type=number]').value;

            DGW.global.api.requests.drawBet(drawId, pointsToBet,
                function onSuccess(result){
                    betBtn.disabled = false;
                    DGW.main.methods.notificationConstructor('We\'ve received your ' + pointsToBet + ' points. Bet more!');
                    that.querySelector('input[type=number]').value = '';

                    DGW.main.cache.drawsEntries.forEach(function(de){
                        if (de.DrawId == result.DrawEntry.DrawId) de.TicketsAmount = result.DrawEntry.TicketsAmount;
                    });
                    DGW.main.methods.changeDrawsSubmenu(DGW.main.settings.draws.currentSubMenu);

                    DGW.main.methods.profileSetData(result.User, result.DrawEntry);

                    ga(DGW.global.gaSend, 'event', 'DrawActions', 'Betting', 'success');
                }, function onError(result){
                    betBtn.disabled = false;
                    DGW.main.methods.notificationConstructor(DGW.helpers.errorParser(result).messages, 'error');

                    ga(DGW.global.gaSend, 'event', 'DrawActions', 'Betting', 'error');
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

                ga(DGW.global.gaSend, 'event', 'DrawActions', 'ClaimPrize', 'AddressSent');
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

        ga(DGW.global.gaSend, 'event', 'DrawActions', 'Sharing', 'Facebook');
    });
    el.querySelector('.dg-o-w-like.dg-o-w-twitter-like').addEventListener('click', function(ev){
        ev.preventDefault();
        DGW.global.actions.requests.shareTw(drawId, (!isWinner) ? 'Win ' : 'I\'ve just won ' + draw.Prize.Title, isWinner);

        ga(DGW.global.gaSend, 'event', 'DrawActions', 'Sharing', 'Twitter');
    });

    DGW.main.elements.widgetContent.appendChild(el);
    DGW.main.methods.checkSectionHeight();
    DGW.main.methods.setRewardedActions();

    el.querySelector('.dg-o-w-single-draw').style.height = el.querySelector('.dg-o-w-single-draw').clientHeight + 'px';
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
    DGW.global.userStats.earnToday = offers.TotalPointsReward;
    offersSubmenu.innerHTML = '';
    offersSponsors.innerHTML = '';

    lists.offers.forEach(function(offer){
        offer = offer.Offer;
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
            offer = offer.Offer;
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
            var recentCompleters = offer.RecentCompleters,
                completersCount = offer.TotalCompletersCount;

            offer = offer.Offer;

            var li = document.createElement('li');
            li.innerHTML =
                '<a href="" target="_blank"><div class="dg-o-w-offer">' +
                '<div class="dg-o-w-offer-left">' +
                '<img class="dg-o-w-offer-image" src="' + (offer.ImageUrl || offer.Type.ImageUrl) + '" />' +
                '<p class="dg-o-w-color-green">' + offer.PointsReward + '</p>' +
                '</div>' +
                '<div class="dg-o-w-offer-right">' +
                '<h4>' + '<img class="dg-o-w-offer-group" src="' + offer.Type.Group.ImageUrl + '"/>' + offer.Title + '</h4>' +
                '<p>' + offer.Description + '</p>' +
                '<div class="dg-o-w-users-done"></div>' +
                '</div>' +
                '</div></a>';
            if (offer.Type.Name == 'DownloadMobileApp') {
                li.querySelector('a').href = offer.CustomData.Url;
            }
            if (offer.Type.Name == 'DownloadToolbar') {
                li.querySelector('a').href = offer.CustomData.Url
                    .replace(/\{0}/, offer.Id)
                    .replace(/\{1}/, DGW.global.userStats.userId);
            }
            li.querySelector('a').addEventListener('click', function(ev){
                if (DGW.global.authorized) {
                    if (offer.Type.Name != 'DownloadMobileApp' && offer.Type.Name != 'DownloadToolbar') {
                        ev.preventDefault();
                    }
                    if (offer.Type.Name == 'FacebookShare') {
                        DGW.global.offers.requests.shareOfferFb(offer.Id);
                    } else if (offer.Type.Name == 'TwitterShare'){
                        DGW.global.offers.requests.shareOfferTw(offer.Id, offer.CustomData.Url, offer.CustomData.TweetText, offer.CustomData.Hashtags);
                    } else if (offer.Type.Name == 'WatchVideo'){
                        DGW.global.offers.requests.watchVideo(offer.Id, offer.CustomData.Url);
                    } else if (offer.Type.Name == 'DownloadToolbar') {
                        DGW.global.api.requests.trackOffer(offer.Id);
                    }

                    ga(DGW.global.gaSend, 'event', 'EarningPoints', offer.Type.Group.Name, offer.Sponsor.Name);
                } else {
                    ev.preventDefault();
                    DGW.main.methods.headerLoginShow('Enter to earn points');
                    ga(DGW.global.gaSend, 'event', 'EarningPointsAnonymous', offer.Type.Group.Name, offer.Sponsor.Name);
                }
            });



            if (recentCompleters.length > 0) {
                var usersCompletedDiv = li.querySelector('.dg-o-w-users-done');
                var playerImgsHolder = document.createElement('div');
                recentCompleters.forEach(function(user, ind){
                    if (ind > 2) return;
                    var img = document.createElement('img');
                    img.src = user.ImageUrl;

                    playerImgsHolder.appendChild(img);
                });
                usersCompletedDiv.appendChild(playerImgsHolder);

                var p = document.createElement('p');
                if (completersCount == 1) {
                    p.innerHTML = '1 user has done this';
                } else {
                    p.innerHTML = completersCount + ' users have done this';
                    p.className = ((recentCompleters.length == 2) ? 'dg-o-w-two-images' : 'dg-o-w-three-images');
                }
                usersCompletedDiv.appendChild(p);
            }


            offersHolder.appendChild(li);
        });
    }

    showOffersPanels(lists.offers);
    DGW.main.methods.setRewardedActions();
};
DGW.main.methods.usersConstructor = function(state, usersFound) {
    // Possible states: 'friends', 'followers', 'search'
    'use strict';

    // Elements and variables
    var userListHolder = DGW.helpers.getElementsFromAllPlaces('[data-friends-list]')[0],
        usersToShow;

    // Methods
    var createUserItem, createUserItemActions, createSingleAction, createSimpleItem;


    createSimpleItem = function(type){
        var li = document.createElement('li');
            li.className = 'dg-o-w-table-display';
        if (type === 'empty' || !type) li.innerHTML = DGW.templates.userListItemNothingFound;
        if (type === 'new') li.innerHTML = DGW.templates.userListItemNew;

        return li;
    };

    // Every button logic, later transmitted back to the LI item
    createSingleAction = function(actionType, userId, li) {
        var action = document.createElement('div');

        function successfulUpdate(userObj, li) {
            var userIndex = DGW.main.cache.userRelations.users.findIndex(function(el){
                return (el.User.UserId == userId);
            });

            DGW.main.cache.userRelations.users[userIndex] = userObj;
            DGW.helpers.insertAfter(createUserItem(userObj), li);
            userListHolder.removeChild(li);

            DGW.main.methods.friendsSetData();

            console.info(userObj.User.UserId, userId)
        }

        function passEvent(actionObj, event, fn) {
            var clickHolder = (actionObj.getAttribute('data-click-holder') != null) ? actionObj : actionObj.querySelector('[data-click-holder]');
            clickHolder.addEventListener(event, fn);
        }

        switch (actionType) {
            case 'follow':
                action.innerHTML = DGW.templates.userListActions.follow;
                action = action.childNodes[0];
                passEvent(action, 'click', function(){
                    DGW.global.api.requests.userFollow(userId,
                        function(userObj){
                            successfulUpdate(userObj, li);
                        },
                        function(res){
                            DGW.helpers.console.warn('Follow ID: ', userId, res.Message);
                        }
                    );
                });
                break;
            case 'following':
                action.innerHTML = DGW.templates.userListActions.following;
                action = action.childNodes[0];
                passEvent(action, 'click', function(){
                    DGW.global.api.requests.userUnfollow(userId,
                        function(userObj){
                            successfulUpdate(userObj, li);
                        },
                        function(res){
                            DGW.helpers.console.warn('Unfollow ID: ', userId, res.Message);
                        }
                    );
                });
                break;
            case 'followsYou':
                action.innerHTML = DGW.templates.userListActions.followsYou;
                action = action.childNodes[0];
                break;
            case 'friends':
                action.innerHTML = DGW.templates.userListActions.friends;
                action = action.childNodes[0];
                passEvent(action, 'click', function(){
                    DGW.global.api.requests.userUnfollow(userId,
                        function(userObj){
                            successfulUpdate(userObj, li);
                        },
                        function(res){
                            DGW.helpers.console.warn('Unfriend ID: ', userId, res.Message);
                        }
                    );
                });
                break;
            case 'request':
                action.innerHTML = DGW.templates.userListActions.request;
                action = action.childNodes[0];
                passEvent(action, 'click', function(){
                    DGW.global.api.requests.userRequestSend(userId,
                        function(userObj){
                            successfulUpdate(userObj, li);
                        },
                        function(res){
                            DGW.helpers.console.warn('Friend request send ID: ', userId, res.Message);
                        }
                    );
                });
                break;
            case 'requestSent':
                action.innerHTML = DGW.templates.userListActions.requestSent;
                action = action.childNodes[0];
                break;
            case 'accept':
                action.innerHTML = DGW.templates.userListActions.accept;
                action = action.childNodes[0];
                passEvent(action, 'click', function(){
                    DGW.global.api.requests.userRequestAccept(userId,
                        function(userObj){
                            successfulUpdate(userObj, li);
                        },
                        function(res){
                            DGW.helpers.console.warn('Accept ID: ', userId, res.Message);
                        }
                    );
                });
                break;
            case 'decline':
                action.innerHTML = DGW.templates.userListActions.decline;
                action = action.childNodes[0];
                passEvent(action, 'click', function(){
                    DGW.global.api.requests.userRequestDecline(userId,
                        function(userObj){
                            successfulUpdate(userObj, li);
                        },
                        function(res){
                            DGW.helpers.console.warn('Decline ID: ', userId, res.Message);
                            console.warn(res);
                        }
                    );
                });
                break;
            default:
                return action;
        }

        return action;
    };

    // Defining which actions will be needed withing this user (one LI element)
    createUserItemActions = function(relations, userId, li){
        if (relations == undefined) return;
        var actions = [];

        if (relations.length > 0) {
            relations = relations.map(function(r){return r.toLowerCase()});
            var requestFrom = relations.some(function(r){return r === 'friendrequestfrom'}),
                requestTo = relations.some(function(r){return r === 'friendrequestto'}),
                friends = relations.some(function(r){return r === 'friends'}),
                following = relations.some(function(r){return r === 'following'}),
                followedBy = relations.some(function(r){return r === 'followedby'});

            if (requestFrom) {
                actions.push(createSingleAction('accept', userId, li));
                actions.push(createSingleAction('decline', userId, li));
            } else if (requestTo) {
                if (following) {
                    actions.push(createSingleAction('following', userId, li));
                } else if (followedBy) {
                    actions.push(createSingleAction('follow', userId, li));
                } else {
                    actions.push(createSingleAction('follow', userId, li));
                }
                actions.push(createSingleAction('requestSent'));
            } else if (friends) {
                actions.push(createSingleAction('friends', userId, li));
            } else if (following) {
                actions.push(createSingleAction('following', userId, li));
                actions.push(createSingleAction('request', userId, li));
            } else {
                actions.push(createSingleAction('follow', userId, li));
                actions.push(createSingleAction('request', userId, li));
            }

        } else {
            actions.push(createSingleAction('follow', userId, li));
            actions.push(createSingleAction('request', userId, li));
        }

        return actions;
    };

    // Creating single LI element to put into the page
    createUserItem = function(userObj){
        var commonUsers = userObj.MutualFriends,
            commonUsersCount = +userObj.MutualFriendsTotalCount,
            user = userObj.User,
            relations = userObj.Rels,
            relationsCount = userObj.RelsCount;

        var commonUsersText = document.createElement('p'),
            li = document.createElement('li');
            li.className = 'dg-o-w-table-display';
            li.innerHTML = DGW.templates.userListItem;

        var commonUsersHolder = li.querySelector('[data-user-common-users]'),
            userActionsHolder = li.querySelector('[data-user-actions]');


        // Filling user name, image, groups
        li.querySelector('[data-user-image]').src = user.ImageUrl;
        li.querySelector('[data-user-name]').innerHTML = user.UserName;


        //Filling common users section
        if (commonUsers.length > 0) {
            var commonImgsHolder = document.createElement('div');
            commonUsers.forEach(function(cUser, ind){
                if (ind > 2) return;
                var img = document.createElement('img');
                img.src = cUser.ImageUrl;
                commonImgsHolder.appendChild(img);
            });
            commonUsersHolder.appendChild(commonImgsHolder);

            if (commonUsersCount === 1) {
                commonUsersText.innerHTML = '1 common user';
            } else {
                commonUsersText.innerHTML = commonUsersCount + ' common users';
                commonUsersText.className = ((commonUsers.length == 2) ? 'dg-o-w-two-images' : 'dg-o-w-three-images');
            }
        } else {
            commonUsersText.innerHTML = 'No common users';
        }
        commonUsersHolder.appendChild(commonUsersText);

        createUserItemActions(relations, user.UserId, li).forEach(function(action){
            userActionsHolder.appendChild(action);
        });

        return li;
    };


    // Main logic
    // cleaning the list of users
    userListHolder.innerHTML = '';

    // Sorting types
    function sortByName(a, b) {
        var nameA = a.User.UserName.toUpperCase();
        var nameB = b.User.UserName.toUpperCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
    }

    // defining which users to show in the list
    if (state === 'friends') {
        usersToShow = DGW.main.cache.userRelations.users.filter(function(rels){
            return rels.Rels.some(function(r){
                return r === 'FriendRequestFrom' || r === 'Friends' || r === 'FriendRequestTo';
            });
        });

        // Sorting friends in a specific order
        usersToShow = usersToShow.filter(function(f){return f.Rels.some(function(r){return r === 'FriendRequestFrom'})})
            .sort(sortByName).concat(
            usersToShow.filter(function(f){return f.Rels.some(function(r){return r === 'Friends'})})
                .sort(sortByName).concat(
                usersToShow.filter(function(f){return f.Rels.some(function(r){return r === 'FriendRequestTo'})})
                .sort(sortByName)
            )
        );
    } else if (state === 'following') {
        usersToShow = DGW.main.cache.userRelations.users.filter(function(rels){
            return rels.Rels.some(function(r){
                return r === 'Following';
            });
        });

        // Sorting followers
        usersToShow = usersToShow.filter(function(f){return f.Rels.some(function(r){return r === 'Following'})}).sort(sortByName);

    } else if (state === 'followers') {
        usersToShow = DGW.main.cache.userRelations.users.filter(function(rels){
            return rels.Rels.some(function(r){
                return r === 'FollowedBy';
            });
        });

        // Sorting followed by
        usersToShow = usersToShow.filter(function(f){return f.Rels.some(function(r){return r === 'Following'})})
            .sort(sortByName)
            .concat(
            usersToShow.filter(function(f){return f.Rels.some(function(r){return r === 'FollowedBy'}) &&
                f.Rels.every(function(r){return r !== 'Following'})}).sort(sortByName)
        );
    } else if (state === 'search') {
        usersToShow = usersFound.Users;
        usersToShow = usersToShow.filter(function(f){return f.Rels.some(function(r){return r === 'FriendRequestFrom'})})
            .sort(sortByName)
            .concat(
            usersToShow.filter(function(f){return f.Rels.some(function(r){return r === 'Friends'})})
                .sort(sortByName).concat(
                usersToShow.filter(function(f){return f.Rels.some(function(r){return r === 'FriendRequestTo'})})
                    .sort(sortByName)
            )).concat(
            usersToShow.filter(function(f){return f.Rels.some(function(r){return r === 'Following'})})
                .sort(sortByName)
                .concat(
                usersToShow.filter(function(f){return f.Rels.some(function(r){return r === 'FollowedBy'}) &&
                    f.Rels.every(function(r){return r !== 'Following'})}).sort(sortByName)
            )).concat(usersToShow.filter(function(f){return f.Rels.length === 0}).sort(sortByName));
    } else {
        // default state
    }

    // adding users to the list
    if (usersToShow.length > 0) {
        usersToShow.forEach(function (userObj) {
            userListHolder.appendChild(createUserItem(userObj));
        });
    } else {
        userListHolder.appendChild(createSimpleItem());
    }

    DGW.main.methods.friendsSetData();

    // TEMP part
    DGW.helpers.console.info(
        'Number of relations > 1: ',
        DGW.main.cache.userRelations.users.filter(function(us){return us.Rels.length > 1}).length
    );
};

// ["FriendRequestTo", "Friends", "FollowedBy", "Following", "FriendRequestFrom"]
// DGW.main.cache.userRelations.users
// DGW.main.cache.userRelations.count
DGW.main.methods.leaderboardConstructor = function(earners) {
    var s = DGW.main.elements.pages.activitiesMain;
    var ul = s.querySelector('.dg-o-w-activity-slider ul'),
        slideLeft = s.querySelector('.dg-o-w-activity-slider-prev'),
        slideRight = s.querySelector('.dg-o-w-activity-slider-next');
    var sliderItemWidth = 0;

    var transformReg = /translateX\(-(\d*)px\)/,
        ulTransform = ul.style.transform;
    var scrollValue = (ulTransform) ? +transformReg.exec(ulTransform)[1] : 0;

    ul.innerHTML = '';
    ul.style.width = '';
    earners.forEach(function(earner){
        var li = document.createElement('li');
        li.innerHTML = '<div><img src="' + earner.ImageUrl +'"><p>' + earner.Amount + '</p></div><p class="dg-o-w-color-brand">' + earner.UserName + '</p>';

        ul.appendChild(li);
        ul.style.width = +(ul.style.width.replace(/px/, '')) + li.clientWidth + 'px';
    });

    sliderItemWidth = ul.querySelector('li').clientWidth;

    function slideLeaderboard(direction){
        if (direction === 'right') {
            if (scrollValue < +(ul.style.width.replace(/px/, '')) - sliderItemWidth * 5)
                scrollValue += sliderItemWidth;
        } else {
            if (scrollValue > 0) scrollValue -= sliderItemWidth;
        }
        ul.style.transform = 'translateX(-' + scrollValue + 'px)';
    }

    slideLeft.addEventListener('click', function(){
        slideLeaderboard();
    });

    slideRight.addEventListener('click', function(){
        slideLeaderboard('right');
    });
};
DGW.main.methods.profileSetData = function(data, draw) {
    var pr = DGW.main.elements.pages.profileMain;
    var wb = DGW.main.elements.widgetBody;
    var sb = DGW.side.elements.widgetBody;
    var profileImageHolders = DGW.helpers.getElementsFromAllPlaces('[data-userstats-userimage]'),
        profileNames = DGW.helpers.getElementsFromAllPlaces('[data-userstats-username]');

    var points = {
            confirmed: DGW.helpers.getElementsFromAllPlaces('[data-userstats-points-c]'),
            pending: [pr.querySelector('.dg-o-w-profile-points h5')]
        },
        credits = {
            confirmed: DGW.helpers.getElementsFromAllPlaces('[data-userstats-credits-c]'),
            pending: [pr.querySelector('.dg-o-w-profile-credits h5')]
        };

    var fbAddText = pr.querySelector('#dg-o-w-login-fb-text');

    DGW.global.userStats.userId = data.UserId;

    profileImageHolders.forEach(function(image){
        if (image) image.src = data.ImageUrl || DGW.helpers.checkImagesForSrc(image.getAttribute('src'));
    });

    DGW.global.userStats.imageUrl = data.ImageUrl || DGW.global.userStats.imageUrl;

    profileNames.forEach(function(name){
        if (name) name.innerHTML = data.UserName;
    });

    DGW.global.userStats.name = data.UserName || DGW.global.userStats.name;
    DGW.global.userStats.facebookId = data.FacebookId;

    points.confirmed.forEach(function(point){
        if (point) {
            point.innerHTML = data.Wallet.PointsConfirmed;
        }
    });
    points.pending.forEach(function(point){
        if (point) point.innerHTML = data.Wallet.PointsPending;
    });

    credits.confirmed.forEach(function(credit){
        if (credit) {
            if (credit.getAttribute('data-round'))
                credit.innerHTML = data.Wallet.CreditsConfirmed.toFixed(credit.getAttribute('data-round'));
            else credit.innerHTML = data.Wallet.CreditsConfirmed;
        }
    });
    credits.pending.forEach(function(credit){
        if (credit) credit.innerHTML = data.Wallet.CreditsPending;
    });

    DGW.global.userStats.pointsC = data.Wallet.PointsConfirmed;
    DGW.global.userStats.pointsP = data.Wallet.PointsPending;
    DGW.global.userStats.creditsC = data.Wallet.CreditsConfirmed;
    DGW.global.userStats.creditsP = data.Wallet.CreditsPending;


    DGW.main.methods.friendsSetData(data.FriendsCount, data.FriendRequestsCount);


    if (fbAddText) {
        if (DGW.global.userStats.facebookId !== null) {
            fbAddText.style.display = 'none';
        } else {
            fbAddText.style.display = 'block';
        }
    }

    if (DGW.global.userStats.earnToday && pr.querySelector('#dg-o-w-profile-earn-today'))
        pr.querySelector('#dg-o-w-profile-earn-today').innerHTML = 'You can <span class="dg-o-w-color-brand">earn +' + DGW.global.userStats.earnToday + ' points</span> more';

    if (draw) {
        var betPoints = DGW.main.elements.pages.singleDraw.querySelector('[data-draw-betpoints]');
        if (betPoints) {
            betPoints.innerHTML = draw.TicketsAmount || 0;
        }
    }
};


DGW.main.methods.updateBadgesInfo = function(){
    var ba = DGW.global.userStats.badges.all,
        be = DGW.global.userStats.badges.earned;
    var pr = DGW.main.elements.pages.profileMain;
    var wc = DGW.main.elements.widgetContent;
    var ul = pr.querySelector('.dg-o-w-badges-holder ul');

    ul.innerHTML = '';
    ba.forEach(function(b){
        var li = document.createElement('li');
        li.innerHTML = '<img src="' + b.ImageUrl + '" alt=""/><p class="dg-o-w-color-brand">' + b.Title + '</p>';

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
        var pageContent = '<div class="dg-o-w-badge-single dg-o-w-white-section">' +
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

    // Sending analytics
    // * * * * * *

    if (!DGW.global.authorized && state === 'profile') {
        ga(DGW.global.gaSend, 'pageview', 'landing');
    } else {
        ga(DGW.global.gaSend, 'pageview', state);
    }

    // * * * * * *
    // End of analytics

    for (var item in DGW.main.elements.menuItems) {
        DGW.helpers.removeClass(DGW.main.elements.menuItems[item], 'dg-o-w-active');
    }
    DGW.helpers.removeClass(DGW.main.elements.menuItems['profile'].parentNode.parentNode, 'dg-o-w-active');

    if (state === 'profile') {
        DGW.helpers.addClass(DGW.main.elements.menuItems['profile'].parentNode.parentNode, 'dg-o-w-active');
    } else {
        DGW.helpers.addClass(DGW.main.elements.menuItems[state], 'dg-o-w-active');
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
                DGW.global.api.requests.getUserOffers(function(response){
                    DGW.main.methods.offersConstructor(response);
                    DGW.global.userStats.earnToday = response.TotalPointsReward;
                });
            } else {
                DGW.global.api.requests.getOffers(function(response){
                    DGW.main.methods.offersConstructor(response);
                });
            }
            DGW.main.elements.widgetContent.appendChild(DGW.main.elements.pages.earnMain);
            break;
        case 'draws':
            //TODO: work on this further
            if (DGW.main.currentState !== 'draws') {
                DGW.global.api.requests.getDraws(function(){
                    if (DGW.global.authorized) {
                        DGW.global.api.requests.getDrawEntries(function(){
                            DGW.main.methods.changeDrawsSubmenu(DGW.main.settings.draws.currentSubMenu);
                        });
                    } else {
                        DGW.main.methods.changeDrawsSubmenu(DGW.main.settings.draws.currentSubMenu);
                    }
                });
                DGW.main.methods.drawSubmenuReset();
            }
            DGW.main.elements.widgetContent.appendChild(DGW.main.elements.pages.drawsMain);
            break;
        case 'activities':
            if (DGW.main.elements.pages.activitiesMain.querySelector('#dg-o-w-activities-filter').value === 'all-activities') {
                DGW.global.api.requests.getAllActivities(function(response){
                    DGW.main.methods.activitiesConstructor(response.Activities);
                });
            } else {
                DGW.global.api.requests.getUserActivities(function(response){
                    DGW.main.methods.activitiesConstructor(response.Activities);
                });
            }
            DGW.global.api.requests.getLeaderboard(function(response){
                DGW.main.methods.leaderboardConstructor(response.Earners);
            });
            DGW.main.elements.widgetContent.appendChild(DGW.main.elements.pages.activitiesMain);
            break;
        case 'profile':
            if ( DGW.global.authorized ) {
                DGW.main.elements.widgetContent.appendChild(DGW.main.elements.pages.profileMain);
                DGW.global.api.requests.getUser();
                DGW.global.api.requests.getAllBadges(function(response){
                    DGW.global.userStats.badges.all = response.Badges;
                    DGW.global.api.requests.getEarnedBadges(function(response){
                        DGW.global.userStats.badges.earned = response.EarnedBadges;
                        DGW.main.methods.updateBadgesInfo();
                    });
                });
            } else {
                DGW.helpers.addClass(DGW.main.elements.widgetBody, 'profile-anon');
                DGW.main.elements.widgetContent.appendChild(DGW.main.elements.pages.loginMain);
            }
            break;
        case 'friends':
            DGW.main.elements.widgetContent.appendChild(DGW.main.elements.pages.friendsMain);
            DGW.global.api.requests.usersGet(function(response){
                DGW.main.cache.userRelations.users = response.Users;
                DGW.main.cache.userRelations.count = response.UsersCount;
                DGW.main.methods.friendsResetSearch();
                DGW.main.methods.usersConstructor(DGW.main.settings.friends.currentSubMenu);
            });
            break;
        default:

    }

    DGW.helpers.hideFramedSrc();

    DGW.main.methods.hideNotificationBar();

    DGW.main.currentState = state;
    DGW.main.methods.setRewardedActions();
    DGW.main.methods.checkSectionHeight();
};

DGW.main.methods.initEvents = function () {
    DGW.main.methods.fillDefaultValues();

// Login header
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

//Login page and form
    DGW.main.methods.loginInit();
//Activities page
    DGW.main.methods.activitiesInit();
//Draws page clicks
    DGW.main.methods.drawsInit();
//Profile page clicks
    DGW.main.methods.profileInit();

//Widget internal links
    DGW.helpers.openDataLinks(Array.prototype.slice.call(DGW.main.elements.widgetBody.querySelectorAll('[data-link]')));
};

DGW.main.methods.resetStates = function(){
    DGW.main.elements.widgetBody.querySelector('.dg-o-w-menu-profile .profile-menu-item img').src = DGW.helpers.checkImagesForSrc();
    DGW.main.elements.pages.activitiesMain.querySelector('#dg-o-w-activities-filter').value = 'all-activities';
    DGW.helpers.removeClass(DGW.main.elements.loginFooter, 'email-sign-up');
    DGW.helpers.removeClass(DGW.main.elements.loginFooter, 'password');
    DGW.main.methods.headerLoginHide();
    DGW.main.methods.fillDefaultValues();

    // clearing private cache
    DGW.main.cache.drawsEntries = [];
};

DGW.main.methods.fillDefaultValues = function(){

    var hiddenDrawsChkBox = DGW.main.elements.pages.drawsMain.querySelector('#dg-o-w-show-expired');
    var getWinnerInterval = setInterval(function(){
        if (DGW.global.cache.last.prize) {
            var l = DGW.main.elements.pages.loginMain.querySelector('#dg-o-w-login-prize-title');
            if (l) l.innerHTML = 'Today you can win ' + DGW.global.cache.last.prize.Title;
            clearInterval(getWinnerInterval);
        }
    }, 50);

    if (DGW.main.settings.draws.showExpired) {
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
DGW.global.offers.requests.shareOfferFb = function(offerId){
    DGW.helpers.centerWindowPopup(DGW.global.envPath +
    'offer/facebookshare?api_key=' + DGW.global.api.apiKey + '&offerid=' + offerId, 'fbWindow', 460, 340, function(){
        DGW.global.api.requests.getUserOffers(function(response){
            DGW.main.methods.offersConstructor(response);
            DGW.global.userStats.earnToday = response.TotalPointsReward;
        });
    });
};
//
DGW.global.offers.requests.shareOfferTw = function(offerId, url, text, hashtags){
    DGW.global.api.requests.trackOffer(offerId);

    DGW.helpers.centerWindowPopup('https://twitter.com/intent/tweet?text=' + text +
    '&url=' + encodeURIComponent(url) + '&hashtags=' + hashtags,
        'twWindow', 460, 340, function(){
        DGW.global.api.requests.completeOffer(offerId,
            function onSuccess(){
                DGW.global.api.requests.getUserOffers(function(response){
                    DGW.main.methods.offersConstructor(response);
                    DGW.global.userStats.earnToday = response.TotalPointsReward;
                });
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
    var errorHandlerCounter = 0;
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

    function destroyVideo(callback){
        player.destroy();
        DGW.main.elements.pages.videoHolder.querySelector('.dg-o-w-video-holder').innerHTML = DGW.templates.videoHolderInner;
        if(callback) setTimeout(callback, 10);
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
        DGW.helpers.console.info('Video duration available: ', !!player.getDuration);
        if (errorHandlerCounter <= 2) {
            if (!player.getDuration) {
                destroyVideo(onYouTubePlayerAPIReady);
                errorHandlerCounter += 1;
                DGW.helpers.console.info('No duration');
            } else {
                playbackInterval = window.setInterval(function () {
                    DGW.main.elements.pages.videoHolder.querySelector('span').innerHTML =
                        Math.floor(player.getDuration() - player.getCurrentTime());
                }, 1000);
                DGW.helpers.console.log('Video has started');
            }
        }
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
            if (DGW.main.elements.pages.videoHolder.parentNode)
                DGW.main.elements.widgetBody.removeChild(DGW.main.elements.pages.videoHolder);
            DGW.helpers.removeClass(DGW.main.elements.pages.videoHolder.querySelector('.dg-o-w-video-holder'), 'dg-video-hidden');
            destroyVideo();
            wCloseBtn.removeEventListener('click', cancelVideoOffer);
            wCloseBtn.addEventListener('click', DGW.main.methods.hideWidget);
        }, 320);
        DGW.main.elements.pages.videoHolder.querySelector('span').innerHTML = '';
        window.clearInterval(widgetShownInterval);
        window.clearInterval(playbackInterval);
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

DGW.global.offers.requests.openExternalLink = function(src){
    DGW.helpers.showFramedSrc(src);
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

if (DGW.global.debug) window.DGW = DGW;

window.dgwActivateDebugMode = function(){
    DGW.global.debug = true;
};
});
