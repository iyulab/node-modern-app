function Ly(e,t){for(var r=0;r<t.length;r++){const n=t[r];if(typeof n!="string"&&!Array.isArray(n)){for(const i in n)if(i!=="default"&&!(i in e)){const o=Object.getOwnPropertyDescriptor(n,i);o&&Object.defineProperty(e,i,o.get?o:{enumerable:!0,get:()=>n[i]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function r(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(i){if(i.ep)return;i.ep=!0;const o=r(i);fetch(i.href,o)}})();function Dy(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Ry={exports:{}},Bc={},My={exports:{}},$e={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var wl=Symbol.for("react.element"),S$=Symbol.for("react.portal"),C$=Symbol.for("react.fragment"),E$=Symbol.for("react.strict_mode"),O$=Symbol.for("react.profiler"),T$=Symbol.for("react.provider"),P$=Symbol.for("react.context"),A$=Symbol.for("react.forward_ref"),j$=Symbol.for("react.suspense"),N$=Symbol.for("react.memo"),L$=Symbol.for("react.lazy"),Rg=Symbol.iterator;function D$(e){return e===null||typeof e!="object"?null:(e=Rg&&e[Rg]||e["@@iterator"],typeof e=="function"?e:null)}var Iy={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Fy=Object.assign,Vy={};function Ts(e,t,r){this.props=e,this.context=t,this.refs=Vy,this.updater=r||Iy}Ts.prototype.isReactComponent={};Ts.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Ts.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function By(){}By.prototype=Ts.prototype;function Qp(e,t,r){this.props=e,this.context=t,this.refs=Vy,this.updater=r||Iy}var Zp=Qp.prototype=new By;Zp.constructor=Qp;Fy(Zp,Ts.prototype);Zp.isPureReactComponent=!0;var Mg=Array.isArray,zy=Object.prototype.hasOwnProperty,Xp={current:null},Hy={key:!0,ref:!0,__self:!0,__source:!0};function Uy(e,t,r){var n,i={},o=null,s=null;if(t!=null)for(n in t.ref!==void 0&&(s=t.ref),t.key!==void 0&&(o=""+t.key),t)zy.call(t,n)&&!Hy.hasOwnProperty(n)&&(i[n]=t[n]);var a=arguments.length-2;if(a===1)i.children=r;else if(1<a){for(var l=Array(a),u=0;u<a;u++)l[u]=arguments[u+2];i.children=l}if(e&&e.defaultProps)for(n in a=e.defaultProps,a)i[n]===void 0&&(i[n]=a[n]);return{$$typeof:wl,type:e,key:o,ref:s,props:i,_owner:Xp.current}}function R$(e,t){return{$$typeof:wl,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function Yp(e){return typeof e=="object"&&e!==null&&e.$$typeof===wl}function M$(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(r){return t[r]})}var Ig=/\/+/g;function Yh(e,t){return typeof e=="object"&&e!==null&&e.key!=null?M$(""+e.key):t.toString(36)}function Su(e,t,r,n,i){var o=typeof e;(o==="undefined"||o==="boolean")&&(e=null);var s=!1;if(e===null)s=!0;else switch(o){case"string":case"number":s=!0;break;case"object":switch(e.$$typeof){case wl:case S$:s=!0}}if(s)return s=e,i=i(s),e=n===""?"."+Yh(s,0):n,Mg(i)?(r="",e!=null&&(r=e.replace(Ig,"$&/")+"/"),Su(i,t,r,"",function(u){return u})):i!=null&&(Yp(i)&&(i=R$(i,r+(!i.key||s&&s.key===i.key?"":(""+i.key).replace(Ig,"$&/")+"/")+e)),t.push(i)),1;if(s=0,n=n===""?".":n+":",Mg(e))for(var a=0;a<e.length;a++){o=e[a];var l=n+Yh(o,a);s+=Su(o,t,r,l,i)}else if(l=D$(e),typeof l=="function")for(e=l.call(e),a=0;!(o=e.next()).done;)o=o.value,l=n+Yh(o,a++),s+=Su(o,t,r,l,i);else if(o==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return s}function Jl(e,t,r){if(e==null)return e;var n=[],i=0;return Su(e,n,"","",function(o){return t.call(r,o,i++)}),n}function I$(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(r){(e._status===0||e._status===-1)&&(e._status=1,e._result=r)},function(r){(e._status===0||e._status===-1)&&(e._status=2,e._result=r)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var er={current:null},Cu={transition:null},F$={ReactCurrentDispatcher:er,ReactCurrentBatchConfig:Cu,ReactCurrentOwner:Xp};$e.Children={map:Jl,forEach:function(e,t,r){Jl(e,function(){t.apply(this,arguments)},r)},count:function(e){var t=0;return Jl(e,function(){t++}),t},toArray:function(e){return Jl(e,function(t){return t})||[]},only:function(e){if(!Yp(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};$e.Component=Ts;$e.Fragment=C$;$e.Profiler=O$;$e.PureComponent=Qp;$e.StrictMode=E$;$e.Suspense=j$;$e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=F$;$e.cloneElement=function(e,t,r){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var n=Fy({},e.props),i=e.key,o=e.ref,s=e._owner;if(t!=null){if(t.ref!==void 0&&(o=t.ref,s=Xp.current),t.key!==void 0&&(i=""+t.key),e.type&&e.type.defaultProps)var a=e.type.defaultProps;for(l in t)zy.call(t,l)&&!Hy.hasOwnProperty(l)&&(n[l]=t[l]===void 0&&a!==void 0?a[l]:t[l])}var l=arguments.length-2;if(l===1)n.children=r;else if(1<l){a=Array(l);for(var u=0;u<l;u++)a[u]=arguments[u+2];n.children=a}return{$$typeof:wl,type:e.type,key:i,ref:o,props:n,_owner:s}};$e.createContext=function(e){return e={$$typeof:P$,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:T$,_context:e},e.Consumer=e};$e.createElement=Uy;$e.createFactory=function(e){var t=Uy.bind(null,e);return t.type=e,t};$e.createRef=function(){return{current:null}};$e.forwardRef=function(e){return{$$typeof:A$,render:e}};$e.isValidElement=Yp;$e.lazy=function(e){return{$$typeof:L$,_payload:{_status:-1,_result:e},_init:I$}};$e.memo=function(e,t){return{$$typeof:N$,type:e,compare:t===void 0?null:t}};$e.startTransition=function(e){var t=Cu.transition;Cu.transition={};try{e()}finally{Cu.transition=t}};$e.unstable_act=function(){throw Error("act(...) is not supported in production builds of React.")};$e.useCallback=function(e,t){return er.current.useCallback(e,t)};$e.useContext=function(e){return er.current.useContext(e)};$e.useDebugValue=function(){};$e.useDeferredValue=function(e){return er.current.useDeferredValue(e)};$e.useEffect=function(e,t){return er.current.useEffect(e,t)};$e.useId=function(){return er.current.useId()};$e.useImperativeHandle=function(e,t,r){return er.current.useImperativeHandle(e,t,r)};$e.useInsertionEffect=function(e,t){return er.current.useInsertionEffect(e,t)};$e.useLayoutEffect=function(e,t){return er.current.useLayoutEffect(e,t)};$e.useMemo=function(e,t){return er.current.useMemo(e,t)};$e.useReducer=function(e,t,r){return er.current.useReducer(e,t,r)};$e.useRef=function(e){return er.current.useRef(e)};$e.useState=function(e){return er.current.useState(e)};$e.useSyncExternalStore=function(e,t,r){return er.current.useSyncExternalStore(e,t,r)};$e.useTransition=function(){return er.current.useTransition()};$e.version="18.2.0";My.exports=$e;var P=My.exports;const pi=Dy(P),V$=Ly({__proto__:null,default:pi},[P]);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var B$=P,z$=Symbol.for("react.element"),H$=Symbol.for("react.fragment"),U$=Object.prototype.hasOwnProperty,q$=B$.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,W$={key:!0,ref:!0,__self:!0,__source:!0};function qy(e,t,r){var n,i={},o=null,s=null;r!==void 0&&(o=""+r),t.key!==void 0&&(o=""+t.key),t.ref!==void 0&&(s=t.ref);for(n in t)U$.call(t,n)&&!W$.hasOwnProperty(n)&&(i[n]=t[n]);if(e&&e.defaultProps)for(n in t=e.defaultProps,t)i[n]===void 0&&(i[n]=t[n]);return{$$typeof:z$,type:e,key:o,ref:s,props:i,_owner:q$.current}}Bc.Fragment=H$;Bc.jsx=qy;Bc.jsxs=qy;Ry.exports=Bc;var U=Ry.exports,Wy={exports:{}},br={},Ky={exports:{}},Gy={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(B,ee){var ne=B.length;B.push(ee);e:for(;0<ne;){var xe=ne-1>>>1,q=B[xe];if(0<i(q,ee))B[xe]=ee,B[ne]=q,ne=xe;else break e}}function r(B){return B.length===0?null:B[0]}function n(B){if(B.length===0)return null;var ee=B[0],ne=B.pop();if(ne!==ee){B[0]=ne;e:for(var xe=0,q=B.length,Ot=q>>>1;xe<Ot;){var dt=2*(xe+1)-1,Se=B[dt],Tt=dt+1,un=B[Tt];if(0>i(Se,ne))Tt<q&&0>i(un,Se)?(B[xe]=un,B[Tt]=ne,xe=Tt):(B[xe]=Se,B[dt]=ne,xe=dt);else if(Tt<q&&0>i(un,ne))B[xe]=un,B[Tt]=ne,xe=Tt;else break e}}return ee}function i(B,ee){var ne=B.sortIndex-ee.sortIndex;return ne!==0?ne:B.id-ee.id}if(typeof performance=="object"&&typeof performance.now=="function"){var o=performance;e.unstable_now=function(){return o.now()}}else{var s=Date,a=s.now();e.unstable_now=function(){return s.now()-a}}var l=[],u=[],c=1,h=null,d=3,m=!1,y=!1,w=!1,E=typeof setTimeout=="function"?setTimeout:null,p=typeof clearTimeout=="function"?clearTimeout:null,f=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function v(B){for(var ee=r(u);ee!==null;){if(ee.callback===null)n(u);else if(ee.startTime<=B)n(u),ee.sortIndex=ee.expirationTime,t(l,ee);else break;ee=r(u)}}function S(B){if(w=!1,v(B),!y)if(r(l)!==null)y=!0,oe(L);else{var ee=r(u);ee!==null&&de(S,ee.startTime-B)}}function L(B,ee){y=!1,w&&(w=!1,p(I),I=-1),m=!0;var ne=d;try{for(v(ee),h=r(l);h!==null&&(!(h.expirationTime>ee)||B&&!fe());){var xe=h.callback;if(typeof xe=="function"){h.callback=null,d=h.priorityLevel;var q=xe(h.expirationTime<=ee);ee=e.unstable_now(),typeof q=="function"?h.callback=q:h===r(l)&&n(l),v(ee)}else n(l);h=r(l)}if(h!==null)var Ot=!0;else{var dt=r(u);dt!==null&&de(S,dt.startTime-ee),Ot=!1}return Ot}finally{h=null,d=ne,m=!1}}var x=!1,N=null,I=-1,W=5,te=-1;function fe(){return!(e.unstable_now()-te<W)}function Ct(){if(N!==null){var B=e.unstable_now();te=B;var ee=!0;try{ee=N(!0,B)}finally{ee?Ze():(x=!1,N=null)}}else x=!1}var Ze;if(typeof f=="function")Ze=function(){f(Ct)};else if(typeof MessageChannel<"u"){var Et=new MessageChannel,$r=Et.port2;Et.port1.onmessage=Ct,Ze=function(){$r.postMessage(null)}}else Ze=function(){E(Ct,0)};function oe(B){N=B,x||(x=!0,Ze())}function de(B,ee){I=E(function(){B(e.unstable_now())},ee)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(B){B.callback=null},e.unstable_continueExecution=function(){y||m||(y=!0,oe(L))},e.unstable_forceFrameRate=function(B){0>B||125<B?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):W=0<B?Math.floor(1e3/B):5},e.unstable_getCurrentPriorityLevel=function(){return d},e.unstable_getFirstCallbackNode=function(){return r(l)},e.unstable_next=function(B){switch(d){case 1:case 2:case 3:var ee=3;break;default:ee=d}var ne=d;d=ee;try{return B()}finally{d=ne}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(B,ee){switch(B){case 1:case 2:case 3:case 4:case 5:break;default:B=3}var ne=d;d=B;try{return ee()}finally{d=ne}},e.unstable_scheduleCallback=function(B,ee,ne){var xe=e.unstable_now();switch(typeof ne=="object"&&ne!==null?(ne=ne.delay,ne=typeof ne=="number"&&0<ne?xe+ne:xe):ne=xe,B){case 1:var q=-1;break;case 2:q=250;break;case 5:q=1073741823;break;case 4:q=1e4;break;default:q=5e3}return q=ne+q,B={id:c++,callback:ee,priorityLevel:B,startTime:ne,expirationTime:q,sortIndex:-1},ne>xe?(B.sortIndex=ne,t(u,B),r(l)===null&&B===r(u)&&(w?(p(I),I=-1):w=!0,de(S,ne-xe))):(B.sortIndex=q,t(l,B),y||m||(y=!0,oe(L))),B},e.unstable_shouldYield=fe,e.unstable_wrapCallback=function(B){var ee=d;return function(){var ne=d;d=ee;try{return B.apply(this,arguments)}finally{d=ne}}}})(Gy);Ky.exports=Gy;var K$=Ky.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Qy=P,yr=K$;function R(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,r=1;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Zy=new Set,Fa={};function ho(e,t){as(e,t),as(e+"Capture",t)}function as(e,t){for(Fa[e]=t,e=0;e<t.length;e++)Zy.add(t[e])}var Mn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),mf=Object.prototype.hasOwnProperty,G$=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Fg={},Vg={};function Q$(e){return mf.call(Vg,e)?!0:mf.call(Fg,e)?!1:G$.test(e)?Vg[e]=!0:(Fg[e]=!0,!1)}function Z$(e,t,r,n){if(r!==null&&r.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return n?!1:r!==null?!r.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function X$(e,t,r,n){if(t===null||typeof t>"u"||Z$(e,t,r,n))return!0;if(n)return!1;if(r!==null)switch(r.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function tr(e,t,r,n,i,o,s){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=n,this.attributeNamespace=i,this.mustUseProperty=r,this.propertyName=e,this.type=t,this.sanitizeURL=o,this.removeEmptyString=s}var Dt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){Dt[e]=new tr(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];Dt[t]=new tr(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){Dt[e]=new tr(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){Dt[e]=new tr(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){Dt[e]=new tr(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){Dt[e]=new tr(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){Dt[e]=new tr(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){Dt[e]=new tr(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){Dt[e]=new tr(e,5,!1,e.toLowerCase(),null,!1,!1)});var Jp=/[\-:]([a-z])/g;function ev(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(Jp,ev);Dt[t]=new tr(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(Jp,ev);Dt[t]=new tr(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(Jp,ev);Dt[t]=new tr(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){Dt[e]=new tr(e,1,!1,e.toLowerCase(),null,!1,!1)});Dt.xlinkHref=new tr("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){Dt[e]=new tr(e,1,!1,e.toLowerCase(),null,!0,!0)});function tv(e,t,r,n){var i=Dt.hasOwnProperty(t)?Dt[t]:null;(i!==null?i.type!==0:n||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(X$(t,r,i,n)&&(r=null),n||i===null?Q$(t)&&(r===null?e.removeAttribute(t):e.setAttribute(t,""+r)):i.mustUseProperty?e[i.propertyName]=r===null?i.type===3?!1:"":r:(t=i.attributeName,n=i.attributeNamespace,r===null?e.removeAttribute(t):(i=i.type,r=i===3||i===4&&r===!0?"":""+r,n?e.setAttributeNS(n,t,r):e.setAttribute(t,r))))}var qn=Qy.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,eu=Symbol.for("react.element"),Do=Symbol.for("react.portal"),Ro=Symbol.for("react.fragment"),rv=Symbol.for("react.strict_mode"),yf=Symbol.for("react.profiler"),Xy=Symbol.for("react.provider"),Yy=Symbol.for("react.context"),nv=Symbol.for("react.forward_ref"),bf=Symbol.for("react.suspense"),xf=Symbol.for("react.suspense_list"),iv=Symbol.for("react.memo"),Yn=Symbol.for("react.lazy"),Jy=Symbol.for("react.offscreen"),Bg=Symbol.iterator;function Gs(e){return e===null||typeof e!="object"?null:(e=Bg&&e[Bg]||e["@@iterator"],typeof e=="function"?e:null)}var Ge=Object.assign,Jh;function va(e){if(Jh===void 0)try{throw Error()}catch(r){var t=r.stack.trim().match(/\n( *(at )?)/);Jh=t&&t[1]||""}return`
`+Jh+e}var ed=!1;function td(e,t){if(!e||ed)return"";ed=!0;var r=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(u){var n=u}Reflect.construct(e,[],t)}else{try{t.call()}catch(u){n=u}e.call(t.prototype)}else{try{throw Error()}catch(u){n=u}e()}}catch(u){if(u&&n&&typeof u.stack=="string"){for(var i=u.stack.split(`
`),o=n.stack.split(`
`),s=i.length-1,a=o.length-1;1<=s&&0<=a&&i[s]!==o[a];)a--;for(;1<=s&&0<=a;s--,a--)if(i[s]!==o[a]){if(s!==1||a!==1)do if(s--,a--,0>a||i[s]!==o[a]){var l=`
`+i[s].replace(" at new "," at ");return e.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",e.displayName)),l}while(1<=s&&0<=a);break}}}finally{ed=!1,Error.prepareStackTrace=r}return(e=e?e.displayName||e.name:"")?va(e):""}function Y$(e){switch(e.tag){case 5:return va(e.type);case 16:return va("Lazy");case 13:return va("Suspense");case 19:return va("SuspenseList");case 0:case 2:case 15:return e=td(e.type,!1),e;case 11:return e=td(e.type.render,!1),e;case 1:return e=td(e.type,!0),e;default:return""}}function wf(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Ro:return"Fragment";case Do:return"Portal";case yf:return"Profiler";case rv:return"StrictMode";case bf:return"Suspense";case xf:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Yy:return(e.displayName||"Context")+".Consumer";case Xy:return(e._context.displayName||"Context")+".Provider";case nv:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case iv:return t=e.displayName||null,t!==null?t:wf(e.type)||"Memo";case Yn:t=e._payload,e=e._init;try{return wf(e(t))}catch{}}return null}function J$(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return wf(t);case 8:return t===rv?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function vi(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function e1(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function e_(e){var t=e1(e)?"checked":"value",r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),n=""+e[t];if(!e.hasOwnProperty(t)&&typeof r<"u"&&typeof r.get=="function"&&typeof r.set=="function"){var i=r.get,o=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(s){n=""+s,o.call(this,s)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(s){n=""+s},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function tu(e){e._valueTracker||(e._valueTracker=e_(e))}function t1(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var r=t.getValue(),n="";return e&&(n=e1(e)?e.checked?"true":"false":e.value),e=n,e!==r?(t.setValue(e),!0):!1}function Uu(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function $f(e,t){var r=t.checked;return Ge({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:r??e._wrapperState.initialChecked})}function zg(e,t){var r=t.defaultValue==null?"":t.defaultValue,n=t.checked!=null?t.checked:t.defaultChecked;r=vi(t.value!=null?t.value:r),e._wrapperState={initialChecked:n,initialValue:r,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function r1(e,t){t=t.checked,t!=null&&tv(e,"checked",t,!1)}function _f(e,t){r1(e,t);var r=vi(t.value),n=t.type;if(r!=null)n==="number"?(r===0&&e.value===""||e.value!=r)&&(e.value=""+r):e.value!==""+r&&(e.value=""+r);else if(n==="submit"||n==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?kf(e,t.type,r):t.hasOwnProperty("defaultValue")&&kf(e,t.type,vi(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function Hg(e,t,r){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var n=t.type;if(!(n!=="submit"&&n!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,r||t===e.value||(e.value=t),e.defaultValue=t}r=e.name,r!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,r!==""&&(e.name=r)}function kf(e,t,r){(t!=="number"||Uu(e.ownerDocument)!==e)&&(r==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+r&&(e.defaultValue=""+r))}var ga=Array.isArray;function Yo(e,t,r,n){if(e=e.options,t){t={};for(var i=0;i<r.length;i++)t["$"+r[i]]=!0;for(r=0;r<e.length;r++)i=t.hasOwnProperty("$"+e[r].value),e[r].selected!==i&&(e[r].selected=i),i&&n&&(e[r].defaultSelected=!0)}else{for(r=""+vi(r),t=null,i=0;i<e.length;i++){if(e[i].value===r){e[i].selected=!0,n&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function Sf(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(R(91));return Ge({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Ug(e,t){var r=t.value;if(r==null){if(r=t.children,t=t.defaultValue,r!=null){if(t!=null)throw Error(R(92));if(ga(r)){if(1<r.length)throw Error(R(93));r=r[0]}t=r}t==null&&(t=""),r=t}e._wrapperState={initialValue:vi(r)}}function n1(e,t){var r=vi(t.value),n=vi(t.defaultValue);r!=null&&(r=""+r,r!==e.value&&(e.value=r),t.defaultValue==null&&e.defaultValue!==r&&(e.defaultValue=r)),n!=null&&(e.defaultValue=""+n)}function qg(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function i1(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Cf(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?i1(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var ru,o1=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,r,n,i){MSApp.execUnsafeLocalFunction(function(){return e(t,r,n,i)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(ru=ru||document.createElement("div"),ru.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=ru.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Va(e,t){if(t){var r=e.firstChild;if(r&&r===e.lastChild&&r.nodeType===3){r.nodeValue=t;return}}e.textContent=t}var $a={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},t_=["Webkit","ms","Moz","O"];Object.keys($a).forEach(function(e){t_.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),$a[t]=$a[e]})});function s1(e,t,r){return t==null||typeof t=="boolean"||t===""?"":r||typeof t!="number"||t===0||$a.hasOwnProperty(e)&&$a[e]?(""+t).trim():t+"px"}function a1(e,t){e=e.style;for(var r in t)if(t.hasOwnProperty(r)){var n=r.indexOf("--")===0,i=s1(r,t[r],n);r==="float"&&(r="cssFloat"),n?e.setProperty(r,i):e[r]=i}}var r_=Ge({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Ef(e,t){if(t){if(r_[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(R(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(R(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(R(61))}if(t.style!=null&&typeof t.style!="object")throw Error(R(62))}}function Of(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Tf=null;function ov(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Pf=null,Jo=null,es=null;function Wg(e){if(e=kl(e)){if(typeof Pf!="function")throw Error(R(280));var t=e.stateNode;t&&(t=Wc(t),Pf(e.stateNode,e.type,t))}}function l1(e){Jo?es?es.push(e):es=[e]:Jo=e}function u1(){if(Jo){var e=Jo,t=es;if(es=Jo=null,Wg(e),t)for(e=0;e<t.length;e++)Wg(t[e])}}function c1(e,t){return e(t)}function h1(){}var rd=!1;function d1(e,t,r){if(rd)return e(t,r);rd=!0;try{return c1(e,t,r)}finally{rd=!1,(Jo!==null||es!==null)&&(h1(),u1())}}function Ba(e,t){var r=e.stateNode;if(r===null)return null;var n=Wc(r);if(n===null)return null;r=n[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(n=!n.disabled)||(e=e.type,n=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!n;break e;default:e=!1}if(e)return null;if(r&&typeof r!="function")throw Error(R(231,t,typeof r));return r}var Af=!1;if(Mn)try{var Qs={};Object.defineProperty(Qs,"passive",{get:function(){Af=!0}}),window.addEventListener("test",Qs,Qs),window.removeEventListener("test",Qs,Qs)}catch{Af=!1}function n_(e,t,r,n,i,o,s,a,l){var u=Array.prototype.slice.call(arguments,3);try{t.apply(r,u)}catch(c){this.onError(c)}}var _a=!1,qu=null,Wu=!1,jf=null,i_={onError:function(e){_a=!0,qu=e}};function o_(e,t,r,n,i,o,s,a,l){_a=!1,qu=null,n_.apply(i_,arguments)}function s_(e,t,r,n,i,o,s,a,l){if(o_.apply(this,arguments),_a){if(_a){var u=qu;_a=!1,qu=null}else throw Error(R(198));Wu||(Wu=!0,jf=u)}}function fo(e){var t=e,r=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(r=t.return),e=t.return;while(e)}return t.tag===3?r:null}function f1(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Kg(e){if(fo(e)!==e)throw Error(R(188))}function a_(e){var t=e.alternate;if(!t){if(t=fo(e),t===null)throw Error(R(188));return t!==e?null:e}for(var r=e,n=t;;){var i=r.return;if(i===null)break;var o=i.alternate;if(o===null){if(n=i.return,n!==null){r=n;continue}break}if(i.child===o.child){for(o=i.child;o;){if(o===r)return Kg(i),e;if(o===n)return Kg(i),t;o=o.sibling}throw Error(R(188))}if(r.return!==n.return)r=i,n=o;else{for(var s=!1,a=i.child;a;){if(a===r){s=!0,r=i,n=o;break}if(a===n){s=!0,n=i,r=o;break}a=a.sibling}if(!s){for(a=o.child;a;){if(a===r){s=!0,r=o,n=i;break}if(a===n){s=!0,n=o,r=i;break}a=a.sibling}if(!s)throw Error(R(189))}}if(r.alternate!==n)throw Error(R(190))}if(r.tag!==3)throw Error(R(188));return r.stateNode.current===r?e:t}function p1(e){return e=a_(e),e!==null?v1(e):null}function v1(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=v1(e);if(t!==null)return t;e=e.sibling}return null}var g1=yr.unstable_scheduleCallback,Gg=yr.unstable_cancelCallback,l_=yr.unstable_shouldYield,u_=yr.unstable_requestPaint,it=yr.unstable_now,c_=yr.unstable_getCurrentPriorityLevel,sv=yr.unstable_ImmediatePriority,m1=yr.unstable_UserBlockingPriority,Ku=yr.unstable_NormalPriority,h_=yr.unstable_LowPriority,y1=yr.unstable_IdlePriority,zc=null,yn=null;function d_(e){if(yn&&typeof yn.onCommitFiberRoot=="function")try{yn.onCommitFiberRoot(zc,e,void 0,(e.current.flags&128)===128)}catch{}}var Qr=Math.clz32?Math.clz32:v_,f_=Math.log,p_=Math.LN2;function v_(e){return e>>>=0,e===0?32:31-(f_(e)/p_|0)|0}var nu=64,iu=4194304;function ma(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Gu(e,t){var r=e.pendingLanes;if(r===0)return 0;var n=0,i=e.suspendedLanes,o=e.pingedLanes,s=r&268435455;if(s!==0){var a=s&~i;a!==0?n=ma(a):(o&=s,o!==0&&(n=ma(o)))}else s=r&~i,s!==0?n=ma(s):o!==0&&(n=ma(o));if(n===0)return 0;if(t!==0&&t!==n&&!(t&i)&&(i=n&-n,o=t&-t,i>=o||i===16&&(o&4194240)!==0))return t;if(n&4&&(n|=r&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=n;0<t;)r=31-Qr(t),i=1<<r,n|=e[r],t&=~i;return n}function g_(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function m_(e,t){for(var r=e.suspendedLanes,n=e.pingedLanes,i=e.expirationTimes,o=e.pendingLanes;0<o;){var s=31-Qr(o),a=1<<s,l=i[s];l===-1?(!(a&r)||a&n)&&(i[s]=g_(a,t)):l<=t&&(e.expiredLanes|=a),o&=~a}}function Nf(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function b1(){var e=nu;return nu<<=1,!(nu&4194240)&&(nu=64),e}function nd(e){for(var t=[],r=0;31>r;r++)t.push(e);return t}function $l(e,t,r){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Qr(t),e[t]=r}function y_(e,t){var r=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var n=e.eventTimes;for(e=e.expirationTimes;0<r;){var i=31-Qr(r),o=1<<i;t[i]=0,n[i]=-1,e[i]=-1,r&=~o}}function av(e,t){var r=e.entangledLanes|=t;for(e=e.entanglements;r;){var n=31-Qr(r),i=1<<n;i&t|e[n]&t&&(e[n]|=t),r&=~i}}var Pe=0;function x1(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var w1,lv,$1,_1,k1,Lf=!1,ou=[],si=null,ai=null,li=null,za=new Map,Ha=new Map,ei=[],b_="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Qg(e,t){switch(e){case"focusin":case"focusout":si=null;break;case"dragenter":case"dragleave":ai=null;break;case"mouseover":case"mouseout":li=null;break;case"pointerover":case"pointerout":za.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ha.delete(t.pointerId)}}function Zs(e,t,r,n,i,o){return e===null||e.nativeEvent!==o?(e={blockedOn:t,domEventName:r,eventSystemFlags:n,nativeEvent:o,targetContainers:[i]},t!==null&&(t=kl(t),t!==null&&lv(t)),e):(e.eventSystemFlags|=n,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function x_(e,t,r,n,i){switch(t){case"focusin":return si=Zs(si,e,t,r,n,i),!0;case"dragenter":return ai=Zs(ai,e,t,r,n,i),!0;case"mouseover":return li=Zs(li,e,t,r,n,i),!0;case"pointerover":var o=i.pointerId;return za.set(o,Zs(za.get(o)||null,e,t,r,n,i)),!0;case"gotpointercapture":return o=i.pointerId,Ha.set(o,Zs(Ha.get(o)||null,e,t,r,n,i)),!0}return!1}function S1(e){var t=Mi(e.target);if(t!==null){var r=fo(t);if(r!==null){if(t=r.tag,t===13){if(t=f1(r),t!==null){e.blockedOn=t,k1(e.priority,function(){$1(r)});return}}else if(t===3&&r.stateNode.current.memoizedState.isDehydrated){e.blockedOn=r.tag===3?r.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Eu(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var r=Df(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(r===null){r=e.nativeEvent;var n=new r.constructor(r.type,r);Tf=n,r.target.dispatchEvent(n),Tf=null}else return t=kl(r),t!==null&&lv(t),e.blockedOn=r,!1;t.shift()}return!0}function Zg(e,t,r){Eu(e)&&r.delete(t)}function w_(){Lf=!1,si!==null&&Eu(si)&&(si=null),ai!==null&&Eu(ai)&&(ai=null),li!==null&&Eu(li)&&(li=null),za.forEach(Zg),Ha.forEach(Zg)}function Xs(e,t){e.blockedOn===t&&(e.blockedOn=null,Lf||(Lf=!0,yr.unstable_scheduleCallback(yr.unstable_NormalPriority,w_)))}function Ua(e){function t(i){return Xs(i,e)}if(0<ou.length){Xs(ou[0],e);for(var r=1;r<ou.length;r++){var n=ou[r];n.blockedOn===e&&(n.blockedOn=null)}}for(si!==null&&Xs(si,e),ai!==null&&Xs(ai,e),li!==null&&Xs(li,e),za.forEach(t),Ha.forEach(t),r=0;r<ei.length;r++)n=ei[r],n.blockedOn===e&&(n.blockedOn=null);for(;0<ei.length&&(r=ei[0],r.blockedOn===null);)S1(r),r.blockedOn===null&&ei.shift()}var ts=qn.ReactCurrentBatchConfig,Qu=!0;function $_(e,t,r,n){var i=Pe,o=ts.transition;ts.transition=null;try{Pe=1,uv(e,t,r,n)}finally{Pe=i,ts.transition=o}}function __(e,t,r,n){var i=Pe,o=ts.transition;ts.transition=null;try{Pe=4,uv(e,t,r,n)}finally{Pe=i,ts.transition=o}}function uv(e,t,r,n){if(Qu){var i=Df(e,t,r,n);if(i===null)fd(e,t,n,Zu,r),Qg(e,n);else if(x_(i,e,t,r,n))n.stopPropagation();else if(Qg(e,n),t&4&&-1<b_.indexOf(e)){for(;i!==null;){var o=kl(i);if(o!==null&&w1(o),o=Df(e,t,r,n),o===null&&fd(e,t,n,Zu,r),o===i)break;i=o}i!==null&&n.stopPropagation()}else fd(e,t,n,null,r)}}var Zu=null;function Df(e,t,r,n){if(Zu=null,e=ov(n),e=Mi(e),e!==null)if(t=fo(e),t===null)e=null;else if(r=t.tag,r===13){if(e=f1(t),e!==null)return e;e=null}else if(r===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Zu=e,null}function C1(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(c_()){case sv:return 1;case m1:return 4;case Ku:case h_:return 16;case y1:return 536870912;default:return 16}default:return 16}}var ni=null,cv=null,Ou=null;function E1(){if(Ou)return Ou;var e,t=cv,r=t.length,n,i="value"in ni?ni.value:ni.textContent,o=i.length;for(e=0;e<r&&t[e]===i[e];e++);var s=r-e;for(n=1;n<=s&&t[r-n]===i[o-n];n++);return Ou=i.slice(e,1<n?1-n:void 0)}function Tu(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function su(){return!0}function Xg(){return!1}function xr(e){function t(r,n,i,o,s){this._reactName=r,this._targetInst=i,this.type=n,this.nativeEvent=o,this.target=s,this.currentTarget=null;for(var a in e)e.hasOwnProperty(a)&&(r=e[a],this[a]=r?r(o):o[a]);return this.isDefaultPrevented=(o.defaultPrevented!=null?o.defaultPrevented:o.returnValue===!1)?su:Xg,this.isPropagationStopped=Xg,this}return Ge(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var r=this.nativeEvent;r&&(r.preventDefault?r.preventDefault():typeof r.returnValue!="unknown"&&(r.returnValue=!1),this.isDefaultPrevented=su)},stopPropagation:function(){var r=this.nativeEvent;r&&(r.stopPropagation?r.stopPropagation():typeof r.cancelBubble!="unknown"&&(r.cancelBubble=!0),this.isPropagationStopped=su)},persist:function(){},isPersistent:su}),t}var Ps={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},hv=xr(Ps),_l=Ge({},Ps,{view:0,detail:0}),k_=xr(_l),id,od,Ys,Hc=Ge({},_l,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:dv,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Ys&&(Ys&&e.type==="mousemove"?(id=e.screenX-Ys.screenX,od=e.screenY-Ys.screenY):od=id=0,Ys=e),id)},movementY:function(e){return"movementY"in e?e.movementY:od}}),Yg=xr(Hc),S_=Ge({},Hc,{dataTransfer:0}),C_=xr(S_),E_=Ge({},_l,{relatedTarget:0}),sd=xr(E_),O_=Ge({},Ps,{animationName:0,elapsedTime:0,pseudoElement:0}),T_=xr(O_),P_=Ge({},Ps,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),A_=xr(P_),j_=Ge({},Ps,{data:0}),Jg=xr(j_),N_={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},L_={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},D_={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function R_(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=D_[e])?!!t[e]:!1}function dv(){return R_}var M_=Ge({},_l,{key:function(e){if(e.key){var t=N_[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Tu(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?L_[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:dv,charCode:function(e){return e.type==="keypress"?Tu(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Tu(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),I_=xr(M_),F_=Ge({},Hc,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),em=xr(F_),V_=Ge({},_l,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:dv}),B_=xr(V_),z_=Ge({},Ps,{propertyName:0,elapsedTime:0,pseudoElement:0}),H_=xr(z_),U_=Ge({},Hc,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),q_=xr(U_),W_=[9,13,27,32],fv=Mn&&"CompositionEvent"in window,ka=null;Mn&&"documentMode"in document&&(ka=document.documentMode);var K_=Mn&&"TextEvent"in window&&!ka,O1=Mn&&(!fv||ka&&8<ka&&11>=ka),tm=" ",rm=!1;function T1(e,t){switch(e){case"keyup":return W_.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function P1(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Mo=!1;function G_(e,t){switch(e){case"compositionend":return P1(t);case"keypress":return t.which!==32?null:(rm=!0,tm);case"textInput":return e=t.data,e===tm&&rm?null:e;default:return null}}function Q_(e,t){if(Mo)return e==="compositionend"||!fv&&T1(e,t)?(e=E1(),Ou=cv=ni=null,Mo=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return O1&&t.locale!=="ko"?null:t.data;default:return null}}var Z_={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function nm(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Z_[e.type]:t==="textarea"}function A1(e,t,r,n){l1(n),t=Xu(t,"onChange"),0<t.length&&(r=new hv("onChange","change",null,r,n),e.push({event:r,listeners:t}))}var Sa=null,qa=null;function X_(e){z1(e,0)}function Uc(e){var t=Vo(e);if(t1(t))return e}function Y_(e,t){if(e==="change")return t}var j1=!1;if(Mn){var ad;if(Mn){var ld="oninput"in document;if(!ld){var im=document.createElement("div");im.setAttribute("oninput","return;"),ld=typeof im.oninput=="function"}ad=ld}else ad=!1;j1=ad&&(!document.documentMode||9<document.documentMode)}function om(){Sa&&(Sa.detachEvent("onpropertychange",N1),qa=Sa=null)}function N1(e){if(e.propertyName==="value"&&Uc(qa)){var t=[];A1(t,qa,e,ov(e)),d1(X_,t)}}function J_(e,t,r){e==="focusin"?(om(),Sa=t,qa=r,Sa.attachEvent("onpropertychange",N1)):e==="focusout"&&om()}function ek(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Uc(qa)}function tk(e,t){if(e==="click")return Uc(t)}function rk(e,t){if(e==="input"||e==="change")return Uc(t)}function nk(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Jr=typeof Object.is=="function"?Object.is:nk;function Wa(e,t){if(Jr(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var r=Object.keys(e),n=Object.keys(t);if(r.length!==n.length)return!1;for(n=0;n<r.length;n++){var i=r[n];if(!mf.call(t,i)||!Jr(e[i],t[i]))return!1}return!0}function sm(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function am(e,t){var r=sm(e);e=0;for(var n;r;){if(r.nodeType===3){if(n=e+r.textContent.length,e<=t&&n>=t)return{node:r,offset:t-e};e=n}e:{for(;r;){if(r.nextSibling){r=r.nextSibling;break e}r=r.parentNode}r=void 0}r=sm(r)}}function L1(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?L1(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function D1(){for(var e=window,t=Uu();t instanceof e.HTMLIFrameElement;){try{var r=typeof t.contentWindow.location.href=="string"}catch{r=!1}if(r)e=t.contentWindow;else break;t=Uu(e.document)}return t}function pv(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function ik(e){var t=D1(),r=e.focusedElem,n=e.selectionRange;if(t!==r&&r&&r.ownerDocument&&L1(r.ownerDocument.documentElement,r)){if(n!==null&&pv(r)){if(t=n.start,e=n.end,e===void 0&&(e=t),"selectionStart"in r)r.selectionStart=t,r.selectionEnd=Math.min(e,r.value.length);else if(e=(t=r.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var i=r.textContent.length,o=Math.min(n.start,i);n=n.end===void 0?o:Math.min(n.end,i),!e.extend&&o>n&&(i=n,n=o,o=i),i=am(r,o);var s=am(r,n);i&&s&&(e.rangeCount!==1||e.anchorNode!==i.node||e.anchorOffset!==i.offset||e.focusNode!==s.node||e.focusOffset!==s.offset)&&(t=t.createRange(),t.setStart(i.node,i.offset),e.removeAllRanges(),o>n?(e.addRange(t),e.extend(s.node,s.offset)):(t.setEnd(s.node,s.offset),e.addRange(t)))}}for(t=[],e=r;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof r.focus=="function"&&r.focus(),r=0;r<t.length;r++)e=t[r],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var ok=Mn&&"documentMode"in document&&11>=document.documentMode,Io=null,Rf=null,Ca=null,Mf=!1;function lm(e,t,r){var n=r.window===r?r.document:r.nodeType===9?r:r.ownerDocument;Mf||Io==null||Io!==Uu(n)||(n=Io,"selectionStart"in n&&pv(n)?n={start:n.selectionStart,end:n.selectionEnd}:(n=(n.ownerDocument&&n.ownerDocument.defaultView||window).getSelection(),n={anchorNode:n.anchorNode,anchorOffset:n.anchorOffset,focusNode:n.focusNode,focusOffset:n.focusOffset}),Ca&&Wa(Ca,n)||(Ca=n,n=Xu(Rf,"onSelect"),0<n.length&&(t=new hv("onSelect","select",null,t,r),e.push({event:t,listeners:n}),t.target=Io)))}function au(e,t){var r={};return r[e.toLowerCase()]=t.toLowerCase(),r["Webkit"+e]="webkit"+t,r["Moz"+e]="moz"+t,r}var Fo={animationend:au("Animation","AnimationEnd"),animationiteration:au("Animation","AnimationIteration"),animationstart:au("Animation","AnimationStart"),transitionend:au("Transition","TransitionEnd")},ud={},R1={};Mn&&(R1=document.createElement("div").style,"AnimationEvent"in window||(delete Fo.animationend.animation,delete Fo.animationiteration.animation,delete Fo.animationstart.animation),"TransitionEvent"in window||delete Fo.transitionend.transition);function qc(e){if(ud[e])return ud[e];if(!Fo[e])return e;var t=Fo[e],r;for(r in t)if(t.hasOwnProperty(r)&&r in R1)return ud[e]=t[r];return e}var M1=qc("animationend"),I1=qc("animationiteration"),F1=qc("animationstart"),V1=qc("transitionend"),B1=new Map,um="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function xi(e,t){B1.set(e,t),ho(t,[e])}for(var cd=0;cd<um.length;cd++){var hd=um[cd],sk=hd.toLowerCase(),ak=hd[0].toUpperCase()+hd.slice(1);xi(sk,"on"+ak)}xi(M1,"onAnimationEnd");xi(I1,"onAnimationIteration");xi(F1,"onAnimationStart");xi("dblclick","onDoubleClick");xi("focusin","onFocus");xi("focusout","onBlur");xi(V1,"onTransitionEnd");as("onMouseEnter",["mouseout","mouseover"]);as("onMouseLeave",["mouseout","mouseover"]);as("onPointerEnter",["pointerout","pointerover"]);as("onPointerLeave",["pointerout","pointerover"]);ho("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));ho("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));ho("onBeforeInput",["compositionend","keypress","textInput","paste"]);ho("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));ho("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));ho("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var ya="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),lk=new Set("cancel close invalid load scroll toggle".split(" ").concat(ya));function cm(e,t,r){var n=e.type||"unknown-event";e.currentTarget=r,s_(n,t,void 0,e),e.currentTarget=null}function z1(e,t){t=(t&4)!==0;for(var r=0;r<e.length;r++){var n=e[r],i=n.event;n=n.listeners;e:{var o=void 0;if(t)for(var s=n.length-1;0<=s;s--){var a=n[s],l=a.instance,u=a.currentTarget;if(a=a.listener,l!==o&&i.isPropagationStopped())break e;cm(i,a,u),o=l}else for(s=0;s<n.length;s++){if(a=n[s],l=a.instance,u=a.currentTarget,a=a.listener,l!==o&&i.isPropagationStopped())break e;cm(i,a,u),o=l}}}if(Wu)throw e=jf,Wu=!1,jf=null,e}function Ie(e,t){var r=t[zf];r===void 0&&(r=t[zf]=new Set);var n=e+"__bubble";r.has(n)||(H1(t,e,2,!1),r.add(n))}function dd(e,t,r){var n=0;t&&(n|=4),H1(r,e,n,t)}var lu="_reactListening"+Math.random().toString(36).slice(2);function Ka(e){if(!e[lu]){e[lu]=!0,Zy.forEach(function(r){r!=="selectionchange"&&(lk.has(r)||dd(r,!1,e),dd(r,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[lu]||(t[lu]=!0,dd("selectionchange",!1,t))}}function H1(e,t,r,n){switch(C1(t)){case 1:var i=$_;break;case 4:i=__;break;default:i=uv}r=i.bind(null,t,r,e),i=void 0,!Af||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(i=!0),n?i!==void 0?e.addEventListener(t,r,{capture:!0,passive:i}):e.addEventListener(t,r,!0):i!==void 0?e.addEventListener(t,r,{passive:i}):e.addEventListener(t,r,!1)}function fd(e,t,r,n,i){var o=n;if(!(t&1)&&!(t&2)&&n!==null)e:for(;;){if(n===null)return;var s=n.tag;if(s===3||s===4){var a=n.stateNode.containerInfo;if(a===i||a.nodeType===8&&a.parentNode===i)break;if(s===4)for(s=n.return;s!==null;){var l=s.tag;if((l===3||l===4)&&(l=s.stateNode.containerInfo,l===i||l.nodeType===8&&l.parentNode===i))return;s=s.return}for(;a!==null;){if(s=Mi(a),s===null)return;if(l=s.tag,l===5||l===6){n=o=s;continue e}a=a.parentNode}}n=n.return}d1(function(){var u=o,c=ov(r),h=[];e:{var d=B1.get(e);if(d!==void 0){var m=hv,y=e;switch(e){case"keypress":if(Tu(r)===0)break e;case"keydown":case"keyup":m=I_;break;case"focusin":y="focus",m=sd;break;case"focusout":y="blur",m=sd;break;case"beforeblur":case"afterblur":m=sd;break;case"click":if(r.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":m=Yg;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":m=C_;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":m=B_;break;case M1:case I1:case F1:m=T_;break;case V1:m=H_;break;case"scroll":m=k_;break;case"wheel":m=q_;break;case"copy":case"cut":case"paste":m=A_;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":m=em}var w=(t&4)!==0,E=!w&&e==="scroll",p=w?d!==null?d+"Capture":null:d;w=[];for(var f=u,v;f!==null;){v=f;var S=v.stateNode;if(v.tag===5&&S!==null&&(v=S,p!==null&&(S=Ba(f,p),S!=null&&w.push(Ga(f,S,v)))),E)break;f=f.return}0<w.length&&(d=new m(d,y,null,r,c),h.push({event:d,listeners:w}))}}if(!(t&7)){e:{if(d=e==="mouseover"||e==="pointerover",m=e==="mouseout"||e==="pointerout",d&&r!==Tf&&(y=r.relatedTarget||r.fromElement)&&(Mi(y)||y[In]))break e;if((m||d)&&(d=c.window===c?c:(d=c.ownerDocument)?d.defaultView||d.parentWindow:window,m?(y=r.relatedTarget||r.toElement,m=u,y=y?Mi(y):null,y!==null&&(E=fo(y),y!==E||y.tag!==5&&y.tag!==6)&&(y=null)):(m=null,y=u),m!==y)){if(w=Yg,S="onMouseLeave",p="onMouseEnter",f="mouse",(e==="pointerout"||e==="pointerover")&&(w=em,S="onPointerLeave",p="onPointerEnter",f="pointer"),E=m==null?d:Vo(m),v=y==null?d:Vo(y),d=new w(S,f+"leave",m,r,c),d.target=E,d.relatedTarget=v,S=null,Mi(c)===u&&(w=new w(p,f+"enter",y,r,c),w.target=v,w.relatedTarget=E,S=w),E=S,m&&y)t:{for(w=m,p=y,f=0,v=w;v;v=Po(v))f++;for(v=0,S=p;S;S=Po(S))v++;for(;0<f-v;)w=Po(w),f--;for(;0<v-f;)p=Po(p),v--;for(;f--;){if(w===p||p!==null&&w===p.alternate)break t;w=Po(w),p=Po(p)}w=null}else w=null;m!==null&&hm(h,d,m,w,!1),y!==null&&E!==null&&hm(h,E,y,w,!0)}}e:{if(d=u?Vo(u):window,m=d.nodeName&&d.nodeName.toLowerCase(),m==="select"||m==="input"&&d.type==="file")var L=Y_;else if(nm(d))if(j1)L=rk;else{L=ek;var x=J_}else(m=d.nodeName)&&m.toLowerCase()==="input"&&(d.type==="checkbox"||d.type==="radio")&&(L=tk);if(L&&(L=L(e,u))){A1(h,L,r,c);break e}x&&x(e,d,u),e==="focusout"&&(x=d._wrapperState)&&x.controlled&&d.type==="number"&&kf(d,"number",d.value)}switch(x=u?Vo(u):window,e){case"focusin":(nm(x)||x.contentEditable==="true")&&(Io=x,Rf=u,Ca=null);break;case"focusout":Ca=Rf=Io=null;break;case"mousedown":Mf=!0;break;case"contextmenu":case"mouseup":case"dragend":Mf=!1,lm(h,r,c);break;case"selectionchange":if(ok)break;case"keydown":case"keyup":lm(h,r,c)}var N;if(fv)e:{switch(e){case"compositionstart":var I="onCompositionStart";break e;case"compositionend":I="onCompositionEnd";break e;case"compositionupdate":I="onCompositionUpdate";break e}I=void 0}else Mo?T1(e,r)&&(I="onCompositionEnd"):e==="keydown"&&r.keyCode===229&&(I="onCompositionStart");I&&(O1&&r.locale!=="ko"&&(Mo||I!=="onCompositionStart"?I==="onCompositionEnd"&&Mo&&(N=E1()):(ni=c,cv="value"in ni?ni.value:ni.textContent,Mo=!0)),x=Xu(u,I),0<x.length&&(I=new Jg(I,e,null,r,c),h.push({event:I,listeners:x}),N?I.data=N:(N=P1(r),N!==null&&(I.data=N)))),(N=K_?G_(e,r):Q_(e,r))&&(u=Xu(u,"onBeforeInput"),0<u.length&&(c=new Jg("onBeforeInput","beforeinput",null,r,c),h.push({event:c,listeners:u}),c.data=N))}z1(h,t)})}function Ga(e,t,r){return{instance:e,listener:t,currentTarget:r}}function Xu(e,t){for(var r=t+"Capture",n=[];e!==null;){var i=e,o=i.stateNode;i.tag===5&&o!==null&&(i=o,o=Ba(e,r),o!=null&&n.unshift(Ga(e,o,i)),o=Ba(e,t),o!=null&&n.push(Ga(e,o,i))),e=e.return}return n}function Po(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function hm(e,t,r,n,i){for(var o=t._reactName,s=[];r!==null&&r!==n;){var a=r,l=a.alternate,u=a.stateNode;if(l!==null&&l===n)break;a.tag===5&&u!==null&&(a=u,i?(l=Ba(r,o),l!=null&&s.unshift(Ga(r,l,a))):i||(l=Ba(r,o),l!=null&&s.push(Ga(r,l,a)))),r=r.return}s.length!==0&&e.push({event:t,listeners:s})}var uk=/\r\n?/g,ck=/\u0000|\uFFFD/g;function dm(e){return(typeof e=="string"?e:""+e).replace(uk,`
`).replace(ck,"")}function uu(e,t,r){if(t=dm(t),dm(e)!==t&&r)throw Error(R(425))}function Yu(){}var If=null,Ff=null;function Vf(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Bf=typeof setTimeout=="function"?setTimeout:void 0,hk=typeof clearTimeout=="function"?clearTimeout:void 0,fm=typeof Promise=="function"?Promise:void 0,dk=typeof queueMicrotask=="function"?queueMicrotask:typeof fm<"u"?function(e){return fm.resolve(null).then(e).catch(fk)}:Bf;function fk(e){setTimeout(function(){throw e})}function pd(e,t){var r=t,n=0;do{var i=r.nextSibling;if(e.removeChild(r),i&&i.nodeType===8)if(r=i.data,r==="/$"){if(n===0){e.removeChild(i),Ua(t);return}n--}else r!=="$"&&r!=="$?"&&r!=="$!"||n++;r=i}while(r);Ua(t)}function ui(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function pm(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="$"||r==="$!"||r==="$?"){if(t===0)return e;t--}else r==="/$"&&t++}e=e.previousSibling}return null}var As=Math.random().toString(36).slice(2),vn="__reactFiber$"+As,Qa="__reactProps$"+As,In="__reactContainer$"+As,zf="__reactEvents$"+As,pk="__reactListeners$"+As,vk="__reactHandles$"+As;function Mi(e){var t=e[vn];if(t)return t;for(var r=e.parentNode;r;){if(t=r[In]||r[vn]){if(r=t.alternate,t.child!==null||r!==null&&r.child!==null)for(e=pm(e);e!==null;){if(r=e[vn])return r;e=pm(e)}return t}e=r,r=e.parentNode}return null}function kl(e){return e=e[vn]||e[In],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Vo(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(R(33))}function Wc(e){return e[Qa]||null}var Hf=[],Bo=-1;function wi(e){return{current:e}}function Fe(e){0>Bo||(e.current=Hf[Bo],Hf[Bo]=null,Bo--)}function De(e,t){Bo++,Hf[Bo]=e.current,e.current=t}var gi={},qt=wi(gi),ar=wi(!1),Ki=gi;function ls(e,t){var r=e.type.contextTypes;if(!r)return gi;var n=e.stateNode;if(n&&n.__reactInternalMemoizedUnmaskedChildContext===t)return n.__reactInternalMemoizedMaskedChildContext;var i={},o;for(o in r)i[o]=t[o];return n&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=i),i}function lr(e){return e=e.childContextTypes,e!=null}function Ju(){Fe(ar),Fe(qt)}function vm(e,t,r){if(qt.current!==gi)throw Error(R(168));De(qt,t),De(ar,r)}function U1(e,t,r){var n=e.stateNode;if(t=t.childContextTypes,typeof n.getChildContext!="function")return r;n=n.getChildContext();for(var i in n)if(!(i in t))throw Error(R(108,J$(e)||"Unknown",i));return Ge({},r,n)}function ec(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||gi,Ki=qt.current,De(qt,e),De(ar,ar.current),!0}function gm(e,t,r){var n=e.stateNode;if(!n)throw Error(R(169));r?(e=U1(e,t,Ki),n.__reactInternalMemoizedMergedChildContext=e,Fe(ar),Fe(qt),De(qt,e)):Fe(ar),De(ar,r)}var En=null,Kc=!1,vd=!1;function q1(e){En===null?En=[e]:En.push(e)}function gk(e){Kc=!0,q1(e)}function $i(){if(!vd&&En!==null){vd=!0;var e=0,t=Pe;try{var r=En;for(Pe=1;e<r.length;e++){var n=r[e];do n=n(!0);while(n!==null)}En=null,Kc=!1}catch(i){throw En!==null&&(En=En.slice(e+1)),g1(sv,$i),i}finally{Pe=t,vd=!1}}return null}var zo=[],Ho=0,tc=null,rc=0,Er=[],Or=0,Gi=null,Pn=1,An="";function Di(e,t){zo[Ho++]=rc,zo[Ho++]=tc,tc=e,rc=t}function W1(e,t,r){Er[Or++]=Pn,Er[Or++]=An,Er[Or++]=Gi,Gi=e;var n=Pn;e=An;var i=32-Qr(n)-1;n&=~(1<<i),r+=1;var o=32-Qr(t)+i;if(30<o){var s=i-i%5;o=(n&(1<<s)-1).toString(32),n>>=s,i-=s,Pn=1<<32-Qr(t)+i|r<<i|n,An=o+e}else Pn=1<<o|r<<i|n,An=e}function vv(e){e.return!==null&&(Di(e,1),W1(e,1,0))}function gv(e){for(;e===tc;)tc=zo[--Ho],zo[Ho]=null,rc=zo[--Ho],zo[Ho]=null;for(;e===Gi;)Gi=Er[--Or],Er[Or]=null,An=Er[--Or],Er[Or]=null,Pn=Er[--Or],Er[Or]=null}var mr=null,gr=null,ze=!1,Gr=null;function K1(e,t){var r=Nr(5,null,null,0);r.elementType="DELETED",r.stateNode=t,r.return=e,t=e.deletions,t===null?(e.deletions=[r],e.flags|=16):t.push(r)}function mm(e,t){switch(e.tag){case 5:var r=e.type;return t=t.nodeType!==1||r.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,mr=e,gr=ui(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,mr=e,gr=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(r=Gi!==null?{id:Pn,overflow:An}:null,e.memoizedState={dehydrated:t,treeContext:r,retryLane:1073741824},r=Nr(18,null,null,0),r.stateNode=t,r.return=e,e.child=r,mr=e,gr=null,!0):!1;default:return!1}}function Uf(e){return(e.mode&1)!==0&&(e.flags&128)===0}function qf(e){if(ze){var t=gr;if(t){var r=t;if(!mm(e,t)){if(Uf(e))throw Error(R(418));t=ui(r.nextSibling);var n=mr;t&&mm(e,t)?K1(n,r):(e.flags=e.flags&-4097|2,ze=!1,mr=e)}}else{if(Uf(e))throw Error(R(418));e.flags=e.flags&-4097|2,ze=!1,mr=e}}}function ym(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;mr=e}function cu(e){if(e!==mr)return!1;if(!ze)return ym(e),ze=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Vf(e.type,e.memoizedProps)),t&&(t=gr)){if(Uf(e))throw G1(),Error(R(418));for(;t;)K1(e,t),t=ui(t.nextSibling)}if(ym(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(R(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="/$"){if(t===0){gr=ui(e.nextSibling);break e}t--}else r!=="$"&&r!=="$!"&&r!=="$?"||t++}e=e.nextSibling}gr=null}}else gr=mr?ui(e.stateNode.nextSibling):null;return!0}function G1(){for(var e=gr;e;)e=ui(e.nextSibling)}function us(){gr=mr=null,ze=!1}function mv(e){Gr===null?Gr=[e]:Gr.push(e)}var mk=qn.ReactCurrentBatchConfig;function qr(e,t){if(e&&e.defaultProps){t=Ge({},t),e=e.defaultProps;for(var r in e)t[r]===void 0&&(t[r]=e[r]);return t}return t}var nc=wi(null),ic=null,Uo=null,yv=null;function bv(){yv=Uo=ic=null}function xv(e){var t=nc.current;Fe(nc),e._currentValue=t}function Wf(e,t,r){for(;e!==null;){var n=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,n!==null&&(n.childLanes|=t)):n!==null&&(n.childLanes&t)!==t&&(n.childLanes|=t),e===r)break;e=e.return}}function rs(e,t){ic=e,yv=Uo=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(ir=!0),e.firstContext=null)}function Ir(e){var t=e._currentValue;if(yv!==e)if(e={context:e,memoizedValue:t,next:null},Uo===null){if(ic===null)throw Error(R(308));Uo=e,ic.dependencies={lanes:0,firstContext:e}}else Uo=Uo.next=e;return t}var Ii=null;function wv(e){Ii===null?Ii=[e]:Ii.push(e)}function Q1(e,t,r,n){var i=t.interleaved;return i===null?(r.next=r,wv(t)):(r.next=i.next,i.next=r),t.interleaved=r,Fn(e,n)}function Fn(e,t){e.lanes|=t;var r=e.alternate;for(r!==null&&(r.lanes|=t),r=e,e=e.return;e!==null;)e.childLanes|=t,r=e.alternate,r!==null&&(r.childLanes|=t),r=e,e=e.return;return r.tag===3?r.stateNode:null}var Jn=!1;function $v(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Z1(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Nn(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function ci(e,t,r){var n=e.updateQueue;if(n===null)return null;if(n=n.shared,Ce&2){var i=n.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),n.pending=t,Fn(e,r)}return i=n.interleaved,i===null?(t.next=t,wv(n)):(t.next=i.next,i.next=t),n.interleaved=t,Fn(e,r)}function Pu(e,t,r){if(t=t.updateQueue,t!==null&&(t=t.shared,(r&4194240)!==0)){var n=t.lanes;n&=e.pendingLanes,r|=n,t.lanes=r,av(e,r)}}function bm(e,t){var r=e.updateQueue,n=e.alternate;if(n!==null&&(n=n.updateQueue,r===n)){var i=null,o=null;if(r=r.firstBaseUpdate,r!==null){do{var s={eventTime:r.eventTime,lane:r.lane,tag:r.tag,payload:r.payload,callback:r.callback,next:null};o===null?i=o=s:o=o.next=s,r=r.next}while(r!==null);o===null?i=o=t:o=o.next=t}else i=o=t;r={baseState:n.baseState,firstBaseUpdate:i,lastBaseUpdate:o,shared:n.shared,effects:n.effects},e.updateQueue=r;return}e=r.lastBaseUpdate,e===null?r.firstBaseUpdate=t:e.next=t,r.lastBaseUpdate=t}function oc(e,t,r,n){var i=e.updateQueue;Jn=!1;var o=i.firstBaseUpdate,s=i.lastBaseUpdate,a=i.shared.pending;if(a!==null){i.shared.pending=null;var l=a,u=l.next;l.next=null,s===null?o=u:s.next=u,s=l;var c=e.alternate;c!==null&&(c=c.updateQueue,a=c.lastBaseUpdate,a!==s&&(a===null?c.firstBaseUpdate=u:a.next=u,c.lastBaseUpdate=l))}if(o!==null){var h=i.baseState;s=0,c=u=l=null,a=o;do{var d=a.lane,m=a.eventTime;if((n&d)===d){c!==null&&(c=c.next={eventTime:m,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var y=e,w=a;switch(d=t,m=r,w.tag){case 1:if(y=w.payload,typeof y=="function"){h=y.call(m,h,d);break e}h=y;break e;case 3:y.flags=y.flags&-65537|128;case 0:if(y=w.payload,d=typeof y=="function"?y.call(m,h,d):y,d==null)break e;h=Ge({},h,d);break e;case 2:Jn=!0}}a.callback!==null&&a.lane!==0&&(e.flags|=64,d=i.effects,d===null?i.effects=[a]:d.push(a))}else m={eventTime:m,lane:d,tag:a.tag,payload:a.payload,callback:a.callback,next:null},c===null?(u=c=m,l=h):c=c.next=m,s|=d;if(a=a.next,a===null){if(a=i.shared.pending,a===null)break;d=a,a=d.next,d.next=null,i.lastBaseUpdate=d,i.shared.pending=null}}while(!0);if(c===null&&(l=h),i.baseState=l,i.firstBaseUpdate=u,i.lastBaseUpdate=c,t=i.shared.interleaved,t!==null){i=t;do s|=i.lane,i=i.next;while(i!==t)}else o===null&&(i.shared.lanes=0);Zi|=s,e.lanes=s,e.memoizedState=h}}function xm(e,t,r){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var n=e[t],i=n.callback;if(i!==null){if(n.callback=null,n=r,typeof i!="function")throw Error(R(191,i));i.call(n)}}}var X1=new Qy.Component().refs;function Kf(e,t,r,n){t=e.memoizedState,r=r(n,t),r=r==null?t:Ge({},t,r),e.memoizedState=r,e.lanes===0&&(e.updateQueue.baseState=r)}var Gc={isMounted:function(e){return(e=e._reactInternals)?fo(e)===e:!1},enqueueSetState:function(e,t,r){e=e._reactInternals;var n=Xt(),i=di(e),o=Nn(n,i);o.payload=t,r!=null&&(o.callback=r),t=ci(e,o,i),t!==null&&(Zr(t,e,i,n),Pu(t,e,i))},enqueueReplaceState:function(e,t,r){e=e._reactInternals;var n=Xt(),i=di(e),o=Nn(n,i);o.tag=1,o.payload=t,r!=null&&(o.callback=r),t=ci(e,o,i),t!==null&&(Zr(t,e,i,n),Pu(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var r=Xt(),n=di(e),i=Nn(r,n);i.tag=2,t!=null&&(i.callback=t),t=ci(e,i,n),t!==null&&(Zr(t,e,n,r),Pu(t,e,n))}};function wm(e,t,r,n,i,o,s){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(n,o,s):t.prototype&&t.prototype.isPureReactComponent?!Wa(r,n)||!Wa(i,o):!0}function Y1(e,t,r){var n=!1,i=gi,o=t.contextType;return typeof o=="object"&&o!==null?o=Ir(o):(i=lr(t)?Ki:qt.current,n=t.contextTypes,o=(n=n!=null)?ls(e,i):gi),t=new t(r,o),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=Gc,e.stateNode=t,t._reactInternals=e,n&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=i,e.__reactInternalMemoizedMaskedChildContext=o),t}function $m(e,t,r,n){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(r,n),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(r,n),t.state!==e&&Gc.enqueueReplaceState(t,t.state,null)}function Gf(e,t,r,n){var i=e.stateNode;i.props=r,i.state=e.memoizedState,i.refs=X1,$v(e);var o=t.contextType;typeof o=="object"&&o!==null?i.context=Ir(o):(o=lr(t)?Ki:qt.current,i.context=ls(e,o)),i.state=e.memoizedState,o=t.getDerivedStateFromProps,typeof o=="function"&&(Kf(e,t,o,r),i.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(t=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),t!==i.state&&Gc.enqueueReplaceState(i,i.state,null),oc(e,r,i,n),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308)}function Js(e,t,r){if(e=r.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(r._owner){if(r=r._owner,r){if(r.tag!==1)throw Error(R(309));var n=r.stateNode}if(!n)throw Error(R(147,e));var i=n,o=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===o?t.ref:(t=function(s){var a=i.refs;a===X1&&(a=i.refs={}),s===null?delete a[o]:a[o]=s},t._stringRef=o,t)}if(typeof e!="string")throw Error(R(284));if(!r._owner)throw Error(R(290,e))}return e}function hu(e,t){throw e=Object.prototype.toString.call(t),Error(R(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function _m(e){var t=e._init;return t(e._payload)}function J1(e){function t(p,f){if(e){var v=p.deletions;v===null?(p.deletions=[f],p.flags|=16):v.push(f)}}function r(p,f){if(!e)return null;for(;f!==null;)t(p,f),f=f.sibling;return null}function n(p,f){for(p=new Map;f!==null;)f.key!==null?p.set(f.key,f):p.set(f.index,f),f=f.sibling;return p}function i(p,f){return p=fi(p,f),p.index=0,p.sibling=null,p}function o(p,f,v){return p.index=v,e?(v=p.alternate,v!==null?(v=v.index,v<f?(p.flags|=2,f):v):(p.flags|=2,f)):(p.flags|=1048576,f)}function s(p){return e&&p.alternate===null&&(p.flags|=2),p}function a(p,f,v,S){return f===null||f.tag!==6?(f=$d(v,p.mode,S),f.return=p,f):(f=i(f,v),f.return=p,f)}function l(p,f,v,S){var L=v.type;return L===Ro?c(p,f,v.props.children,S,v.key):f!==null&&(f.elementType===L||typeof L=="object"&&L!==null&&L.$$typeof===Yn&&_m(L)===f.type)?(S=i(f,v.props),S.ref=Js(p,f,v),S.return=p,S):(S=Ru(v.type,v.key,v.props,null,p.mode,S),S.ref=Js(p,f,v),S.return=p,S)}function u(p,f,v,S){return f===null||f.tag!==4||f.stateNode.containerInfo!==v.containerInfo||f.stateNode.implementation!==v.implementation?(f=_d(v,p.mode,S),f.return=p,f):(f=i(f,v.children||[]),f.return=p,f)}function c(p,f,v,S,L){return f===null||f.tag!==7?(f=qi(v,p.mode,S,L),f.return=p,f):(f=i(f,v),f.return=p,f)}function h(p,f,v){if(typeof f=="string"&&f!==""||typeof f=="number")return f=$d(""+f,p.mode,v),f.return=p,f;if(typeof f=="object"&&f!==null){switch(f.$$typeof){case eu:return v=Ru(f.type,f.key,f.props,null,p.mode,v),v.ref=Js(p,null,f),v.return=p,v;case Do:return f=_d(f,p.mode,v),f.return=p,f;case Yn:var S=f._init;return h(p,S(f._payload),v)}if(ga(f)||Gs(f))return f=qi(f,p.mode,v,null),f.return=p,f;hu(p,f)}return null}function d(p,f,v,S){var L=f!==null?f.key:null;if(typeof v=="string"&&v!==""||typeof v=="number")return L!==null?null:a(p,f,""+v,S);if(typeof v=="object"&&v!==null){switch(v.$$typeof){case eu:return v.key===L?l(p,f,v,S):null;case Do:return v.key===L?u(p,f,v,S):null;case Yn:return L=v._init,d(p,f,L(v._payload),S)}if(ga(v)||Gs(v))return L!==null?null:c(p,f,v,S,null);hu(p,v)}return null}function m(p,f,v,S,L){if(typeof S=="string"&&S!==""||typeof S=="number")return p=p.get(v)||null,a(f,p,""+S,L);if(typeof S=="object"&&S!==null){switch(S.$$typeof){case eu:return p=p.get(S.key===null?v:S.key)||null,l(f,p,S,L);case Do:return p=p.get(S.key===null?v:S.key)||null,u(f,p,S,L);case Yn:var x=S._init;return m(p,f,v,x(S._payload),L)}if(ga(S)||Gs(S))return p=p.get(v)||null,c(f,p,S,L,null);hu(f,S)}return null}function y(p,f,v,S){for(var L=null,x=null,N=f,I=f=0,W=null;N!==null&&I<v.length;I++){N.index>I?(W=N,N=null):W=N.sibling;var te=d(p,N,v[I],S);if(te===null){N===null&&(N=W);break}e&&N&&te.alternate===null&&t(p,N),f=o(te,f,I),x===null?L=te:x.sibling=te,x=te,N=W}if(I===v.length)return r(p,N),ze&&Di(p,I),L;if(N===null){for(;I<v.length;I++)N=h(p,v[I],S),N!==null&&(f=o(N,f,I),x===null?L=N:x.sibling=N,x=N);return ze&&Di(p,I),L}for(N=n(p,N);I<v.length;I++)W=m(N,p,I,v[I],S),W!==null&&(e&&W.alternate!==null&&N.delete(W.key===null?I:W.key),f=o(W,f,I),x===null?L=W:x.sibling=W,x=W);return e&&N.forEach(function(fe){return t(p,fe)}),ze&&Di(p,I),L}function w(p,f,v,S){var L=Gs(v);if(typeof L!="function")throw Error(R(150));if(v=L.call(v),v==null)throw Error(R(151));for(var x=L=null,N=f,I=f=0,W=null,te=v.next();N!==null&&!te.done;I++,te=v.next()){N.index>I?(W=N,N=null):W=N.sibling;var fe=d(p,N,te.value,S);if(fe===null){N===null&&(N=W);break}e&&N&&fe.alternate===null&&t(p,N),f=o(fe,f,I),x===null?L=fe:x.sibling=fe,x=fe,N=W}if(te.done)return r(p,N),ze&&Di(p,I),L;if(N===null){for(;!te.done;I++,te=v.next())te=h(p,te.value,S),te!==null&&(f=o(te,f,I),x===null?L=te:x.sibling=te,x=te);return ze&&Di(p,I),L}for(N=n(p,N);!te.done;I++,te=v.next())te=m(N,p,I,te.value,S),te!==null&&(e&&te.alternate!==null&&N.delete(te.key===null?I:te.key),f=o(te,f,I),x===null?L=te:x.sibling=te,x=te);return e&&N.forEach(function(Ct){return t(p,Ct)}),ze&&Di(p,I),L}function E(p,f,v,S){if(typeof v=="object"&&v!==null&&v.type===Ro&&v.key===null&&(v=v.props.children),typeof v=="object"&&v!==null){switch(v.$$typeof){case eu:e:{for(var L=v.key,x=f;x!==null;){if(x.key===L){if(L=v.type,L===Ro){if(x.tag===7){r(p,x.sibling),f=i(x,v.props.children),f.return=p,p=f;break e}}else if(x.elementType===L||typeof L=="object"&&L!==null&&L.$$typeof===Yn&&_m(L)===x.type){r(p,x.sibling),f=i(x,v.props),f.ref=Js(p,x,v),f.return=p,p=f;break e}r(p,x);break}else t(p,x);x=x.sibling}v.type===Ro?(f=qi(v.props.children,p.mode,S,v.key),f.return=p,p=f):(S=Ru(v.type,v.key,v.props,null,p.mode,S),S.ref=Js(p,f,v),S.return=p,p=S)}return s(p);case Do:e:{for(x=v.key;f!==null;){if(f.key===x)if(f.tag===4&&f.stateNode.containerInfo===v.containerInfo&&f.stateNode.implementation===v.implementation){r(p,f.sibling),f=i(f,v.children||[]),f.return=p,p=f;break e}else{r(p,f);break}else t(p,f);f=f.sibling}f=_d(v,p.mode,S),f.return=p,p=f}return s(p);case Yn:return x=v._init,E(p,f,x(v._payload),S)}if(ga(v))return y(p,f,v,S);if(Gs(v))return w(p,f,v,S);hu(p,v)}return typeof v=="string"&&v!==""||typeof v=="number"?(v=""+v,f!==null&&f.tag===6?(r(p,f.sibling),f=i(f,v),f.return=p,p=f):(r(p,f),f=$d(v,p.mode,S),f.return=p,p=f),s(p)):r(p,f)}return E}var cs=J1(!0),eb=J1(!1),Sl={},bn=wi(Sl),Za=wi(Sl),Xa=wi(Sl);function Fi(e){if(e===Sl)throw Error(R(174));return e}function _v(e,t){switch(De(Xa,t),De(Za,e),De(bn,Sl),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Cf(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Cf(t,e)}Fe(bn),De(bn,t)}function hs(){Fe(bn),Fe(Za),Fe(Xa)}function tb(e){Fi(Xa.current);var t=Fi(bn.current),r=Cf(t,e.type);t!==r&&(De(Za,e),De(bn,r))}function kv(e){Za.current===e&&(Fe(bn),Fe(Za))}var We=wi(0);function sc(e){for(var t=e;t!==null;){if(t.tag===13){var r=t.memoizedState;if(r!==null&&(r=r.dehydrated,r===null||r.data==="$?"||r.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var gd=[];function Sv(){for(var e=0;e<gd.length;e++)gd[e]._workInProgressVersionPrimary=null;gd.length=0}var Au=qn.ReactCurrentDispatcher,md=qn.ReactCurrentBatchConfig,Qi=0,Ke=null,ft=null,$t=null,ac=!1,Ea=!1,Ya=0,yk=0;function Ft(){throw Error(R(321))}function Cv(e,t){if(t===null)return!1;for(var r=0;r<t.length&&r<e.length;r++)if(!Jr(e[r],t[r]))return!1;return!0}function Ev(e,t,r,n,i,o){if(Qi=o,Ke=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Au.current=e===null||e.memoizedState===null?$k:_k,e=r(n,i),Ea){o=0;do{if(Ea=!1,Ya=0,25<=o)throw Error(R(301));o+=1,$t=ft=null,t.updateQueue=null,Au.current=kk,e=r(n,i)}while(Ea)}if(Au.current=lc,t=ft!==null&&ft.next!==null,Qi=0,$t=ft=Ke=null,ac=!1,t)throw Error(R(300));return e}function Ov(){var e=Ya!==0;return Ya=0,e}function pn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return $t===null?Ke.memoizedState=$t=e:$t=$t.next=e,$t}function Fr(){if(ft===null){var e=Ke.alternate;e=e!==null?e.memoizedState:null}else e=ft.next;var t=$t===null?Ke.memoizedState:$t.next;if(t!==null)$t=t,ft=e;else{if(e===null)throw Error(R(310));ft=e,e={memoizedState:ft.memoizedState,baseState:ft.baseState,baseQueue:ft.baseQueue,queue:ft.queue,next:null},$t===null?Ke.memoizedState=$t=e:$t=$t.next=e}return $t}function Ja(e,t){return typeof t=="function"?t(e):t}function yd(e){var t=Fr(),r=t.queue;if(r===null)throw Error(R(311));r.lastRenderedReducer=e;var n=ft,i=n.baseQueue,o=r.pending;if(o!==null){if(i!==null){var s=i.next;i.next=o.next,o.next=s}n.baseQueue=i=o,r.pending=null}if(i!==null){o=i.next,n=n.baseState;var a=s=null,l=null,u=o;do{var c=u.lane;if((Qi&c)===c)l!==null&&(l=l.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),n=u.hasEagerState?u.eagerState:e(n,u.action);else{var h={lane:c,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};l===null?(a=l=h,s=n):l=l.next=h,Ke.lanes|=c,Zi|=c}u=u.next}while(u!==null&&u!==o);l===null?s=n:l.next=a,Jr(n,t.memoizedState)||(ir=!0),t.memoizedState=n,t.baseState=s,t.baseQueue=l,r.lastRenderedState=n}if(e=r.interleaved,e!==null){i=e;do o=i.lane,Ke.lanes|=o,Zi|=o,i=i.next;while(i!==e)}else i===null&&(r.lanes=0);return[t.memoizedState,r.dispatch]}function bd(e){var t=Fr(),r=t.queue;if(r===null)throw Error(R(311));r.lastRenderedReducer=e;var n=r.dispatch,i=r.pending,o=t.memoizedState;if(i!==null){r.pending=null;var s=i=i.next;do o=e(o,s.action),s=s.next;while(s!==i);Jr(o,t.memoizedState)||(ir=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),r.lastRenderedState=o}return[o,n]}function rb(){}function nb(e,t){var r=Ke,n=Fr(),i=t(),o=!Jr(n.memoizedState,i);if(o&&(n.memoizedState=i,ir=!0),n=n.queue,Tv(sb.bind(null,r,n,e),[e]),n.getSnapshot!==t||o||$t!==null&&$t.memoizedState.tag&1){if(r.flags|=2048,el(9,ob.bind(null,r,n,i,t),void 0,null),kt===null)throw Error(R(349));Qi&30||ib(r,t,i)}return i}function ib(e,t,r){e.flags|=16384,e={getSnapshot:t,value:r},t=Ke.updateQueue,t===null?(t={lastEffect:null,stores:null},Ke.updateQueue=t,t.stores=[e]):(r=t.stores,r===null?t.stores=[e]:r.push(e))}function ob(e,t,r,n){t.value=r,t.getSnapshot=n,ab(t)&&lb(e)}function sb(e,t,r){return r(function(){ab(t)&&lb(e)})}function ab(e){var t=e.getSnapshot;e=e.value;try{var r=t();return!Jr(e,r)}catch{return!0}}function lb(e){var t=Fn(e,1);t!==null&&Zr(t,e,1,-1)}function km(e){var t=pn();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Ja,lastRenderedState:e},t.queue=e,e=e.dispatch=wk.bind(null,Ke,e),[t.memoizedState,e]}function el(e,t,r,n){return e={tag:e,create:t,destroy:r,deps:n,next:null},t=Ke.updateQueue,t===null?(t={lastEffect:null,stores:null},Ke.updateQueue=t,t.lastEffect=e.next=e):(r=t.lastEffect,r===null?t.lastEffect=e.next=e:(n=r.next,r.next=e,e.next=n,t.lastEffect=e)),e}function ub(){return Fr().memoizedState}function ju(e,t,r,n){var i=pn();Ke.flags|=e,i.memoizedState=el(1|t,r,void 0,n===void 0?null:n)}function Qc(e,t,r,n){var i=Fr();n=n===void 0?null:n;var o=void 0;if(ft!==null){var s=ft.memoizedState;if(o=s.destroy,n!==null&&Cv(n,s.deps)){i.memoizedState=el(t,r,o,n);return}}Ke.flags|=e,i.memoizedState=el(1|t,r,o,n)}function Sm(e,t){return ju(8390656,8,e,t)}function Tv(e,t){return Qc(2048,8,e,t)}function cb(e,t){return Qc(4,2,e,t)}function hb(e,t){return Qc(4,4,e,t)}function db(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function fb(e,t,r){return r=r!=null?r.concat([e]):null,Qc(4,4,db.bind(null,t,e),r)}function Pv(){}function pb(e,t){var r=Fr();t=t===void 0?null:t;var n=r.memoizedState;return n!==null&&t!==null&&Cv(t,n[1])?n[0]:(r.memoizedState=[e,t],e)}function vb(e,t){var r=Fr();t=t===void 0?null:t;var n=r.memoizedState;return n!==null&&t!==null&&Cv(t,n[1])?n[0]:(e=e(),r.memoizedState=[e,t],e)}function gb(e,t,r){return Qi&21?(Jr(r,t)||(r=b1(),Ke.lanes|=r,Zi|=r,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,ir=!0),e.memoizedState=r)}function bk(e,t){var r=Pe;Pe=r!==0&&4>r?r:4,e(!0);var n=md.transition;md.transition={};try{e(!1),t()}finally{Pe=r,md.transition=n}}function mb(){return Fr().memoizedState}function xk(e,t,r){var n=di(e);if(r={lane:n,action:r,hasEagerState:!1,eagerState:null,next:null},yb(e))bb(t,r);else if(r=Q1(e,t,r,n),r!==null){var i=Xt();Zr(r,e,n,i),xb(r,t,n)}}function wk(e,t,r){var n=di(e),i={lane:n,action:r,hasEagerState:!1,eagerState:null,next:null};if(yb(e))bb(t,i);else{var o=e.alternate;if(e.lanes===0&&(o===null||o.lanes===0)&&(o=t.lastRenderedReducer,o!==null))try{var s=t.lastRenderedState,a=o(s,r);if(i.hasEagerState=!0,i.eagerState=a,Jr(a,s)){var l=t.interleaved;l===null?(i.next=i,wv(t)):(i.next=l.next,l.next=i),t.interleaved=i;return}}catch{}finally{}r=Q1(e,t,i,n),r!==null&&(i=Xt(),Zr(r,e,n,i),xb(r,t,n))}}function yb(e){var t=e.alternate;return e===Ke||t!==null&&t===Ke}function bb(e,t){Ea=ac=!0;var r=e.pending;r===null?t.next=t:(t.next=r.next,r.next=t),e.pending=t}function xb(e,t,r){if(r&4194240){var n=t.lanes;n&=e.pendingLanes,r|=n,t.lanes=r,av(e,r)}}var lc={readContext:Ir,useCallback:Ft,useContext:Ft,useEffect:Ft,useImperativeHandle:Ft,useInsertionEffect:Ft,useLayoutEffect:Ft,useMemo:Ft,useReducer:Ft,useRef:Ft,useState:Ft,useDebugValue:Ft,useDeferredValue:Ft,useTransition:Ft,useMutableSource:Ft,useSyncExternalStore:Ft,useId:Ft,unstable_isNewReconciler:!1},$k={readContext:Ir,useCallback:function(e,t){return pn().memoizedState=[e,t===void 0?null:t],e},useContext:Ir,useEffect:Sm,useImperativeHandle:function(e,t,r){return r=r!=null?r.concat([e]):null,ju(4194308,4,db.bind(null,t,e),r)},useLayoutEffect:function(e,t){return ju(4194308,4,e,t)},useInsertionEffect:function(e,t){return ju(4,2,e,t)},useMemo:function(e,t){var r=pn();return t=t===void 0?null:t,e=e(),r.memoizedState=[e,t],e},useReducer:function(e,t,r){var n=pn();return t=r!==void 0?r(t):t,n.memoizedState=n.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},n.queue=e,e=e.dispatch=xk.bind(null,Ke,e),[n.memoizedState,e]},useRef:function(e){var t=pn();return e={current:e},t.memoizedState=e},useState:km,useDebugValue:Pv,useDeferredValue:function(e){return pn().memoizedState=e},useTransition:function(){var e=km(!1),t=e[0];return e=bk.bind(null,e[1]),pn().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,r){var n=Ke,i=pn();if(ze){if(r===void 0)throw Error(R(407));r=r()}else{if(r=t(),kt===null)throw Error(R(349));Qi&30||ib(n,t,r)}i.memoizedState=r;var o={value:r,getSnapshot:t};return i.queue=o,Sm(sb.bind(null,n,o,e),[e]),n.flags|=2048,el(9,ob.bind(null,n,o,r,t),void 0,null),r},useId:function(){var e=pn(),t=kt.identifierPrefix;if(ze){var r=An,n=Pn;r=(n&~(1<<32-Qr(n)-1)).toString(32)+r,t=":"+t+"R"+r,r=Ya++,0<r&&(t+="H"+r.toString(32)),t+=":"}else r=yk++,t=":"+t+"r"+r.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},_k={readContext:Ir,useCallback:pb,useContext:Ir,useEffect:Tv,useImperativeHandle:fb,useInsertionEffect:cb,useLayoutEffect:hb,useMemo:vb,useReducer:yd,useRef:ub,useState:function(){return yd(Ja)},useDebugValue:Pv,useDeferredValue:function(e){var t=Fr();return gb(t,ft.memoizedState,e)},useTransition:function(){var e=yd(Ja)[0],t=Fr().memoizedState;return[e,t]},useMutableSource:rb,useSyncExternalStore:nb,useId:mb,unstable_isNewReconciler:!1},kk={readContext:Ir,useCallback:pb,useContext:Ir,useEffect:Tv,useImperativeHandle:fb,useInsertionEffect:cb,useLayoutEffect:hb,useMemo:vb,useReducer:bd,useRef:ub,useState:function(){return bd(Ja)},useDebugValue:Pv,useDeferredValue:function(e){var t=Fr();return ft===null?t.memoizedState=e:gb(t,ft.memoizedState,e)},useTransition:function(){var e=bd(Ja)[0],t=Fr().memoizedState;return[e,t]},useMutableSource:rb,useSyncExternalStore:nb,useId:mb,unstable_isNewReconciler:!1};function ds(e,t){try{var r="",n=t;do r+=Y$(n),n=n.return;while(n);var i=r}catch(o){i=`
Error generating stack: `+o.message+`
`+o.stack}return{value:e,source:t,stack:i,digest:null}}function xd(e,t,r){return{value:e,source:null,stack:r??null,digest:t??null}}function Qf(e,t){try{console.error(t.value)}catch(r){setTimeout(function(){throw r})}}var Sk=typeof WeakMap=="function"?WeakMap:Map;function wb(e,t,r){r=Nn(-1,r),r.tag=3,r.payload={element:null};var n=t.value;return r.callback=function(){cc||(cc=!0,op=n),Qf(e,t)},r}function $b(e,t,r){r=Nn(-1,r),r.tag=3;var n=e.type.getDerivedStateFromError;if(typeof n=="function"){var i=t.value;r.payload=function(){return n(i)},r.callback=function(){Qf(e,t)}}var o=e.stateNode;return o!==null&&typeof o.componentDidCatch=="function"&&(r.callback=function(){Qf(e,t),typeof n!="function"&&(hi===null?hi=new Set([this]):hi.add(this));var s=t.stack;this.componentDidCatch(t.value,{componentStack:s!==null?s:""})}),r}function Cm(e,t,r){var n=e.pingCache;if(n===null){n=e.pingCache=new Sk;var i=new Set;n.set(t,i)}else i=n.get(t),i===void 0&&(i=new Set,n.set(t,i));i.has(r)||(i.add(r),e=Fk.bind(null,e,t,r),t.then(e,e))}function Em(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Om(e,t,r,n,i){return e.mode&1?(e.flags|=65536,e.lanes=i,e):(e===t?e.flags|=65536:(e.flags|=128,r.flags|=131072,r.flags&=-52805,r.tag===1&&(r.alternate===null?r.tag=17:(t=Nn(-1,1),t.tag=2,ci(r,t,1))),r.lanes|=1),e)}var Ck=qn.ReactCurrentOwner,ir=!1;function Qt(e,t,r,n){t.child=e===null?eb(t,null,r,n):cs(t,e.child,r,n)}function Tm(e,t,r,n,i){r=r.render;var o=t.ref;return rs(t,i),n=Ev(e,t,r,n,o,i),r=Ov(),e!==null&&!ir?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,Vn(e,t,i)):(ze&&r&&vv(t),t.flags|=1,Qt(e,t,n,i),t.child)}function Pm(e,t,r,n,i){if(e===null){var o=r.type;return typeof o=="function"&&!Iv(o)&&o.defaultProps===void 0&&r.compare===null&&r.defaultProps===void 0?(t.tag=15,t.type=o,_b(e,t,o,n,i)):(e=Ru(r.type,null,n,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(o=e.child,!(e.lanes&i)){var s=o.memoizedProps;if(r=r.compare,r=r!==null?r:Wa,r(s,n)&&e.ref===t.ref)return Vn(e,t,i)}return t.flags|=1,e=fi(o,n),e.ref=t.ref,e.return=t,t.child=e}function _b(e,t,r,n,i){if(e!==null){var o=e.memoizedProps;if(Wa(o,n)&&e.ref===t.ref)if(ir=!1,t.pendingProps=n=o,(e.lanes&i)!==0)e.flags&131072&&(ir=!0);else return t.lanes=e.lanes,Vn(e,t,i)}return Zf(e,t,r,n,i)}function kb(e,t,r){var n=t.pendingProps,i=n.children,o=e!==null?e.memoizedState:null;if(n.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},De(Wo,pr),pr|=r;else{if(!(r&1073741824))return e=o!==null?o.baseLanes|r:r,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,De(Wo,pr),pr|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},n=o!==null?o.baseLanes:r,De(Wo,pr),pr|=n}else o!==null?(n=o.baseLanes|r,t.memoizedState=null):n=r,De(Wo,pr),pr|=n;return Qt(e,t,i,r),t.child}function Sb(e,t){var r=t.ref;(e===null&&r!==null||e!==null&&e.ref!==r)&&(t.flags|=512,t.flags|=2097152)}function Zf(e,t,r,n,i){var o=lr(r)?Ki:qt.current;return o=ls(t,o),rs(t,i),r=Ev(e,t,r,n,o,i),n=Ov(),e!==null&&!ir?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,Vn(e,t,i)):(ze&&n&&vv(t),t.flags|=1,Qt(e,t,r,i),t.child)}function Am(e,t,r,n,i){if(lr(r)){var o=!0;ec(t)}else o=!1;if(rs(t,i),t.stateNode===null)Nu(e,t),Y1(t,r,n),Gf(t,r,n,i),n=!0;else if(e===null){var s=t.stateNode,a=t.memoizedProps;s.props=a;var l=s.context,u=r.contextType;typeof u=="object"&&u!==null?u=Ir(u):(u=lr(r)?Ki:qt.current,u=ls(t,u));var c=r.getDerivedStateFromProps,h=typeof c=="function"||typeof s.getSnapshotBeforeUpdate=="function";h||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(a!==n||l!==u)&&$m(t,s,n,u),Jn=!1;var d=t.memoizedState;s.state=d,oc(t,n,s,i),l=t.memoizedState,a!==n||d!==l||ar.current||Jn?(typeof c=="function"&&(Kf(t,r,c,n),l=t.memoizedState),(a=Jn||wm(t,r,a,n,d,l,u))?(h||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount()),typeof s.componentDidMount=="function"&&(t.flags|=4194308)):(typeof s.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=n,t.memoizedState=l),s.props=n,s.state=l,s.context=u,n=a):(typeof s.componentDidMount=="function"&&(t.flags|=4194308),n=!1)}else{s=t.stateNode,Z1(e,t),a=t.memoizedProps,u=t.type===t.elementType?a:qr(t.type,a),s.props=u,h=t.pendingProps,d=s.context,l=r.contextType,typeof l=="object"&&l!==null?l=Ir(l):(l=lr(r)?Ki:qt.current,l=ls(t,l));var m=r.getDerivedStateFromProps;(c=typeof m=="function"||typeof s.getSnapshotBeforeUpdate=="function")||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(a!==h||d!==l)&&$m(t,s,n,l),Jn=!1,d=t.memoizedState,s.state=d,oc(t,n,s,i);var y=t.memoizedState;a!==h||d!==y||ar.current||Jn?(typeof m=="function"&&(Kf(t,r,m,n),y=t.memoizedState),(u=Jn||wm(t,r,u,n,d,y,l)||!1)?(c||typeof s.UNSAFE_componentWillUpdate!="function"&&typeof s.componentWillUpdate!="function"||(typeof s.componentWillUpdate=="function"&&s.componentWillUpdate(n,y,l),typeof s.UNSAFE_componentWillUpdate=="function"&&s.UNSAFE_componentWillUpdate(n,y,l)),typeof s.componentDidUpdate=="function"&&(t.flags|=4),typeof s.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof s.componentDidUpdate!="function"||a===e.memoizedProps&&d===e.memoizedState||(t.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&d===e.memoizedState||(t.flags|=1024),t.memoizedProps=n,t.memoizedState=y),s.props=n,s.state=y,s.context=l,n=u):(typeof s.componentDidUpdate!="function"||a===e.memoizedProps&&d===e.memoizedState||(t.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&d===e.memoizedState||(t.flags|=1024),n=!1)}return Xf(e,t,r,n,o,i)}function Xf(e,t,r,n,i,o){Sb(e,t);var s=(t.flags&128)!==0;if(!n&&!s)return i&&gm(t,r,!1),Vn(e,t,o);n=t.stateNode,Ck.current=t;var a=s&&typeof r.getDerivedStateFromError!="function"?null:n.render();return t.flags|=1,e!==null&&s?(t.child=cs(t,e.child,null,o),t.child=cs(t,null,a,o)):Qt(e,t,a,o),t.memoizedState=n.state,i&&gm(t,r,!0),t.child}function Cb(e){var t=e.stateNode;t.pendingContext?vm(e,t.pendingContext,t.pendingContext!==t.context):t.context&&vm(e,t.context,!1),_v(e,t.containerInfo)}function jm(e,t,r,n,i){return us(),mv(i),t.flags|=256,Qt(e,t,r,n),t.child}var Yf={dehydrated:null,treeContext:null,retryLane:0};function Jf(e){return{baseLanes:e,cachePool:null,transitions:null}}function Eb(e,t,r){var n=t.pendingProps,i=We.current,o=!1,s=(t.flags&128)!==0,a;if((a=s)||(a=e!==null&&e.memoizedState===null?!1:(i&2)!==0),a?(o=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(i|=1),De(We,i&1),e===null)return qf(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(s=n.children,e=n.fallback,o?(n=t.mode,o=t.child,s={mode:"hidden",children:s},!(n&1)&&o!==null?(o.childLanes=0,o.pendingProps=s):o=Yc(s,n,0,null),e=qi(e,n,r,null),o.return=t,e.return=t,o.sibling=e,t.child=o,t.child.memoizedState=Jf(r),t.memoizedState=Yf,e):Av(t,s));if(i=e.memoizedState,i!==null&&(a=i.dehydrated,a!==null))return Ek(e,t,s,n,a,i,r);if(o){o=n.fallback,s=t.mode,i=e.child,a=i.sibling;var l={mode:"hidden",children:n.children};return!(s&1)&&t.child!==i?(n=t.child,n.childLanes=0,n.pendingProps=l,t.deletions=null):(n=fi(i,l),n.subtreeFlags=i.subtreeFlags&14680064),a!==null?o=fi(a,o):(o=qi(o,s,r,null),o.flags|=2),o.return=t,n.return=t,n.sibling=o,t.child=n,n=o,o=t.child,s=e.child.memoizedState,s=s===null?Jf(r):{baseLanes:s.baseLanes|r,cachePool:null,transitions:s.transitions},o.memoizedState=s,o.childLanes=e.childLanes&~r,t.memoizedState=Yf,n}return o=e.child,e=o.sibling,n=fi(o,{mode:"visible",children:n.children}),!(t.mode&1)&&(n.lanes=r),n.return=t,n.sibling=null,e!==null&&(r=t.deletions,r===null?(t.deletions=[e],t.flags|=16):r.push(e)),t.child=n,t.memoizedState=null,n}function Av(e,t){return t=Yc({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function du(e,t,r,n){return n!==null&&mv(n),cs(t,e.child,null,r),e=Av(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Ek(e,t,r,n,i,o,s){if(r)return t.flags&256?(t.flags&=-257,n=xd(Error(R(422))),du(e,t,s,n)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(o=n.fallback,i=t.mode,n=Yc({mode:"visible",children:n.children},i,0,null),o=qi(o,i,s,null),o.flags|=2,n.return=t,o.return=t,n.sibling=o,t.child=n,t.mode&1&&cs(t,e.child,null,s),t.child.memoizedState=Jf(s),t.memoizedState=Yf,o);if(!(t.mode&1))return du(e,t,s,null);if(i.data==="$!"){if(n=i.nextSibling&&i.nextSibling.dataset,n)var a=n.dgst;return n=a,o=Error(R(419)),n=xd(o,n,void 0),du(e,t,s,n)}if(a=(s&e.childLanes)!==0,ir||a){if(n=kt,n!==null){switch(s&-s){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(n.suspendedLanes|s)?0:i,i!==0&&i!==o.retryLane&&(o.retryLane=i,Fn(e,i),Zr(n,e,i,-1))}return Mv(),n=xd(Error(R(421))),du(e,t,s,n)}return i.data==="$?"?(t.flags|=128,t.child=e.child,t=Vk.bind(null,e),i._reactRetry=t,null):(e=o.treeContext,gr=ui(i.nextSibling),mr=t,ze=!0,Gr=null,e!==null&&(Er[Or++]=Pn,Er[Or++]=An,Er[Or++]=Gi,Pn=e.id,An=e.overflow,Gi=t),t=Av(t,n.children),t.flags|=4096,t)}function Nm(e,t,r){e.lanes|=t;var n=e.alternate;n!==null&&(n.lanes|=t),Wf(e.return,t,r)}function wd(e,t,r,n,i){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:n,tail:r,tailMode:i}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=n,o.tail=r,o.tailMode=i)}function Ob(e,t,r){var n=t.pendingProps,i=n.revealOrder,o=n.tail;if(Qt(e,t,n.children,r),n=We.current,n&2)n=n&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Nm(e,r,t);else if(e.tag===19)Nm(e,r,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}n&=1}if(De(We,n),!(t.mode&1))t.memoizedState=null;else switch(i){case"forwards":for(r=t.child,i=null;r!==null;)e=r.alternate,e!==null&&sc(e)===null&&(i=r),r=r.sibling;r=i,r===null?(i=t.child,t.child=null):(i=r.sibling,r.sibling=null),wd(t,!1,i,r,o);break;case"backwards":for(r=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&sc(e)===null){t.child=i;break}e=i.sibling,i.sibling=r,r=i,i=e}wd(t,!0,r,null,o);break;case"together":wd(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Nu(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function Vn(e,t,r){if(e!==null&&(t.dependencies=e.dependencies),Zi|=t.lanes,!(r&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(R(153));if(t.child!==null){for(e=t.child,r=fi(e,e.pendingProps),t.child=r,r.return=t;e.sibling!==null;)e=e.sibling,r=r.sibling=fi(e,e.pendingProps),r.return=t;r.sibling=null}return t.child}function Ok(e,t,r){switch(t.tag){case 3:Cb(t),us();break;case 5:tb(t);break;case 1:lr(t.type)&&ec(t);break;case 4:_v(t,t.stateNode.containerInfo);break;case 10:var n=t.type._context,i=t.memoizedProps.value;De(nc,n._currentValue),n._currentValue=i;break;case 13:if(n=t.memoizedState,n!==null)return n.dehydrated!==null?(De(We,We.current&1),t.flags|=128,null):r&t.child.childLanes?Eb(e,t,r):(De(We,We.current&1),e=Vn(e,t,r),e!==null?e.sibling:null);De(We,We.current&1);break;case 19:if(n=(r&t.childLanes)!==0,e.flags&128){if(n)return Ob(e,t,r);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),De(We,We.current),n)break;return null;case 22:case 23:return t.lanes=0,kb(e,t,r)}return Vn(e,t,r)}var Tb,ep,Pb,Ab;Tb=function(e,t){for(var r=t.child;r!==null;){if(r.tag===5||r.tag===6)e.appendChild(r.stateNode);else if(r.tag!==4&&r.child!==null){r.child.return=r,r=r.child;continue}if(r===t)break;for(;r.sibling===null;){if(r.return===null||r.return===t)return;r=r.return}r.sibling.return=r.return,r=r.sibling}};ep=function(){};Pb=function(e,t,r,n){var i=e.memoizedProps;if(i!==n){e=t.stateNode,Fi(bn.current);var o=null;switch(r){case"input":i=$f(e,i),n=$f(e,n),o=[];break;case"select":i=Ge({},i,{value:void 0}),n=Ge({},n,{value:void 0}),o=[];break;case"textarea":i=Sf(e,i),n=Sf(e,n),o=[];break;default:typeof i.onClick!="function"&&typeof n.onClick=="function"&&(e.onclick=Yu)}Ef(r,n);var s;r=null;for(u in i)if(!n.hasOwnProperty(u)&&i.hasOwnProperty(u)&&i[u]!=null)if(u==="style"){var a=i[u];for(s in a)a.hasOwnProperty(s)&&(r||(r={}),r[s]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(Fa.hasOwnProperty(u)?o||(o=[]):(o=o||[]).push(u,null));for(u in n){var l=n[u];if(a=i!=null?i[u]:void 0,n.hasOwnProperty(u)&&l!==a&&(l!=null||a!=null))if(u==="style")if(a){for(s in a)!a.hasOwnProperty(s)||l&&l.hasOwnProperty(s)||(r||(r={}),r[s]="");for(s in l)l.hasOwnProperty(s)&&a[s]!==l[s]&&(r||(r={}),r[s]=l[s])}else r||(o||(o=[]),o.push(u,r)),r=l;else u==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,a=a?a.__html:void 0,l!=null&&a!==l&&(o=o||[]).push(u,l)):u==="children"?typeof l!="string"&&typeof l!="number"||(o=o||[]).push(u,""+l):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&(Fa.hasOwnProperty(u)?(l!=null&&u==="onScroll"&&Ie("scroll",e),o||a===l||(o=[])):(o=o||[]).push(u,l))}r&&(o=o||[]).push("style",r);var u=o;(t.updateQueue=u)&&(t.flags|=4)}};Ab=function(e,t,r,n){r!==n&&(t.flags|=4)};function ea(e,t){if(!ze)switch(e.tailMode){case"hidden":t=e.tail;for(var r=null;t!==null;)t.alternate!==null&&(r=t),t=t.sibling;r===null?e.tail=null:r.sibling=null;break;case"collapsed":r=e.tail;for(var n=null;r!==null;)r.alternate!==null&&(n=r),r=r.sibling;n===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:n.sibling=null}}function Vt(e){var t=e.alternate!==null&&e.alternate.child===e.child,r=0,n=0;if(t)for(var i=e.child;i!==null;)r|=i.lanes|i.childLanes,n|=i.subtreeFlags&14680064,n|=i.flags&14680064,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)r|=i.lanes|i.childLanes,n|=i.subtreeFlags,n|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=n,e.childLanes=r,t}function Tk(e,t,r){var n=t.pendingProps;switch(gv(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Vt(t),null;case 1:return lr(t.type)&&Ju(),Vt(t),null;case 3:return n=t.stateNode,hs(),Fe(ar),Fe(qt),Sv(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(cu(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Gr!==null&&(lp(Gr),Gr=null))),ep(e,t),Vt(t),null;case 5:kv(t);var i=Fi(Xa.current);if(r=t.type,e!==null&&t.stateNode!=null)Pb(e,t,r,n,i),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!n){if(t.stateNode===null)throw Error(R(166));return Vt(t),null}if(e=Fi(bn.current),cu(t)){n=t.stateNode,r=t.type;var o=t.memoizedProps;switch(n[vn]=t,n[Qa]=o,e=(t.mode&1)!==0,r){case"dialog":Ie("cancel",n),Ie("close",n);break;case"iframe":case"object":case"embed":Ie("load",n);break;case"video":case"audio":for(i=0;i<ya.length;i++)Ie(ya[i],n);break;case"source":Ie("error",n);break;case"img":case"image":case"link":Ie("error",n),Ie("load",n);break;case"details":Ie("toggle",n);break;case"input":zg(n,o),Ie("invalid",n);break;case"select":n._wrapperState={wasMultiple:!!o.multiple},Ie("invalid",n);break;case"textarea":Ug(n,o),Ie("invalid",n)}Ef(r,o),i=null;for(var s in o)if(o.hasOwnProperty(s)){var a=o[s];s==="children"?typeof a=="string"?n.textContent!==a&&(o.suppressHydrationWarning!==!0&&uu(n.textContent,a,e),i=["children",a]):typeof a=="number"&&n.textContent!==""+a&&(o.suppressHydrationWarning!==!0&&uu(n.textContent,a,e),i=["children",""+a]):Fa.hasOwnProperty(s)&&a!=null&&s==="onScroll"&&Ie("scroll",n)}switch(r){case"input":tu(n),Hg(n,o,!0);break;case"textarea":tu(n),qg(n);break;case"select":case"option":break;default:typeof o.onClick=="function"&&(n.onclick=Yu)}n=i,t.updateQueue=n,n!==null&&(t.flags|=4)}else{s=i.nodeType===9?i:i.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=i1(r)),e==="http://www.w3.org/1999/xhtml"?r==="script"?(e=s.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof n.is=="string"?e=s.createElement(r,{is:n.is}):(e=s.createElement(r),r==="select"&&(s=e,n.multiple?s.multiple=!0:n.size&&(s.size=n.size))):e=s.createElementNS(e,r),e[vn]=t,e[Qa]=n,Tb(e,t,!1,!1),t.stateNode=e;e:{switch(s=Of(r,n),r){case"dialog":Ie("cancel",e),Ie("close",e),i=n;break;case"iframe":case"object":case"embed":Ie("load",e),i=n;break;case"video":case"audio":for(i=0;i<ya.length;i++)Ie(ya[i],e);i=n;break;case"source":Ie("error",e),i=n;break;case"img":case"image":case"link":Ie("error",e),Ie("load",e),i=n;break;case"details":Ie("toggle",e),i=n;break;case"input":zg(e,n),i=$f(e,n),Ie("invalid",e);break;case"option":i=n;break;case"select":e._wrapperState={wasMultiple:!!n.multiple},i=Ge({},n,{value:void 0}),Ie("invalid",e);break;case"textarea":Ug(e,n),i=Sf(e,n),Ie("invalid",e);break;default:i=n}Ef(r,i),a=i;for(o in a)if(a.hasOwnProperty(o)){var l=a[o];o==="style"?a1(e,l):o==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&o1(e,l)):o==="children"?typeof l=="string"?(r!=="textarea"||l!=="")&&Va(e,l):typeof l=="number"&&Va(e,""+l):o!=="suppressContentEditableWarning"&&o!=="suppressHydrationWarning"&&o!=="autoFocus"&&(Fa.hasOwnProperty(o)?l!=null&&o==="onScroll"&&Ie("scroll",e):l!=null&&tv(e,o,l,s))}switch(r){case"input":tu(e),Hg(e,n,!1);break;case"textarea":tu(e),qg(e);break;case"option":n.value!=null&&e.setAttribute("value",""+vi(n.value));break;case"select":e.multiple=!!n.multiple,o=n.value,o!=null?Yo(e,!!n.multiple,o,!1):n.defaultValue!=null&&Yo(e,!!n.multiple,n.defaultValue,!0);break;default:typeof i.onClick=="function"&&(e.onclick=Yu)}switch(r){case"button":case"input":case"select":case"textarea":n=!!n.autoFocus;break e;case"img":n=!0;break e;default:n=!1}}n&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return Vt(t),null;case 6:if(e&&t.stateNode!=null)Ab(e,t,e.memoizedProps,n);else{if(typeof n!="string"&&t.stateNode===null)throw Error(R(166));if(r=Fi(Xa.current),Fi(bn.current),cu(t)){if(n=t.stateNode,r=t.memoizedProps,n[vn]=t,(o=n.nodeValue!==r)&&(e=mr,e!==null))switch(e.tag){case 3:uu(n.nodeValue,r,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&uu(n.nodeValue,r,(e.mode&1)!==0)}o&&(t.flags|=4)}else n=(r.nodeType===9?r:r.ownerDocument).createTextNode(n),n[vn]=t,t.stateNode=n}return Vt(t),null;case 13:if(Fe(We),n=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(ze&&gr!==null&&t.mode&1&&!(t.flags&128))G1(),us(),t.flags|=98560,o=!1;else if(o=cu(t),n!==null&&n.dehydrated!==null){if(e===null){if(!o)throw Error(R(318));if(o=t.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(R(317));o[vn]=t}else us(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Vt(t),o=!1}else Gr!==null&&(lp(Gr),Gr=null),o=!0;if(!o)return t.flags&65536?t:null}return t.flags&128?(t.lanes=r,t):(n=n!==null,n!==(e!==null&&e.memoizedState!==null)&&n&&(t.child.flags|=8192,t.mode&1&&(e===null||We.current&1?gt===0&&(gt=3):Mv())),t.updateQueue!==null&&(t.flags|=4),Vt(t),null);case 4:return hs(),ep(e,t),e===null&&Ka(t.stateNode.containerInfo),Vt(t),null;case 10:return xv(t.type._context),Vt(t),null;case 17:return lr(t.type)&&Ju(),Vt(t),null;case 19:if(Fe(We),o=t.memoizedState,o===null)return Vt(t),null;if(n=(t.flags&128)!==0,s=o.rendering,s===null)if(n)ea(o,!1);else{if(gt!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(s=sc(e),s!==null){for(t.flags|=128,ea(o,!1),n=s.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),t.subtreeFlags=0,n=r,r=t.child;r!==null;)o=r,e=n,o.flags&=14680066,s=o.alternate,s===null?(o.childLanes=0,o.lanes=e,o.child=null,o.subtreeFlags=0,o.memoizedProps=null,o.memoizedState=null,o.updateQueue=null,o.dependencies=null,o.stateNode=null):(o.childLanes=s.childLanes,o.lanes=s.lanes,o.child=s.child,o.subtreeFlags=0,o.deletions=null,o.memoizedProps=s.memoizedProps,o.memoizedState=s.memoizedState,o.updateQueue=s.updateQueue,o.type=s.type,e=s.dependencies,o.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),r=r.sibling;return De(We,We.current&1|2),t.child}e=e.sibling}o.tail!==null&&it()>fs&&(t.flags|=128,n=!0,ea(o,!1),t.lanes=4194304)}else{if(!n)if(e=sc(s),e!==null){if(t.flags|=128,n=!0,r=e.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),ea(o,!0),o.tail===null&&o.tailMode==="hidden"&&!s.alternate&&!ze)return Vt(t),null}else 2*it()-o.renderingStartTime>fs&&r!==1073741824&&(t.flags|=128,n=!0,ea(o,!1),t.lanes=4194304);o.isBackwards?(s.sibling=t.child,t.child=s):(r=o.last,r!==null?r.sibling=s:t.child=s,o.last=s)}return o.tail!==null?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=it(),t.sibling=null,r=We.current,De(We,n?r&1|2:r&1),t):(Vt(t),null);case 22:case 23:return Rv(),n=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==n&&(t.flags|=8192),n&&t.mode&1?pr&1073741824&&(Vt(t),t.subtreeFlags&6&&(t.flags|=8192)):Vt(t),null;case 24:return null;case 25:return null}throw Error(R(156,t.tag))}function Pk(e,t){switch(gv(t),t.tag){case 1:return lr(t.type)&&Ju(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return hs(),Fe(ar),Fe(qt),Sv(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return kv(t),null;case 13:if(Fe(We),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(R(340));us()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Fe(We),null;case 4:return hs(),null;case 10:return xv(t.type._context),null;case 22:case 23:return Rv(),null;case 24:return null;default:return null}}var fu=!1,Bt=!1,Ak=typeof WeakSet=="function"?WeakSet:Set,G=null;function qo(e,t){var r=e.ref;if(r!==null)if(typeof r=="function")try{r(null)}catch(n){Ye(e,t,n)}else r.current=null}function tp(e,t,r){try{r()}catch(n){Ye(e,t,n)}}var Lm=!1;function jk(e,t){if(If=Qu,e=D1(),pv(e)){if("selectionStart"in e)var r={start:e.selectionStart,end:e.selectionEnd};else e:{r=(r=e.ownerDocument)&&r.defaultView||window;var n=r.getSelection&&r.getSelection();if(n&&n.rangeCount!==0){r=n.anchorNode;var i=n.anchorOffset,o=n.focusNode;n=n.focusOffset;try{r.nodeType,o.nodeType}catch{r=null;break e}var s=0,a=-1,l=-1,u=0,c=0,h=e,d=null;t:for(;;){for(var m;h!==r||i!==0&&h.nodeType!==3||(a=s+i),h!==o||n!==0&&h.nodeType!==3||(l=s+n),h.nodeType===3&&(s+=h.nodeValue.length),(m=h.firstChild)!==null;)d=h,h=m;for(;;){if(h===e)break t;if(d===r&&++u===i&&(a=s),d===o&&++c===n&&(l=s),(m=h.nextSibling)!==null)break;h=d,d=h.parentNode}h=m}r=a===-1||l===-1?null:{start:a,end:l}}else r=null}r=r||{start:0,end:0}}else r=null;for(Ff={focusedElem:e,selectionRange:r},Qu=!1,G=t;G!==null;)if(t=G,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,G=e;else for(;G!==null;){t=G;try{var y=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(y!==null){var w=y.memoizedProps,E=y.memoizedState,p=t.stateNode,f=p.getSnapshotBeforeUpdate(t.elementType===t.type?w:qr(t.type,w),E);p.__reactInternalSnapshotBeforeUpdate=f}break;case 3:var v=t.stateNode.containerInfo;v.nodeType===1?v.textContent="":v.nodeType===9&&v.documentElement&&v.removeChild(v.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(R(163))}}catch(S){Ye(t,t.return,S)}if(e=t.sibling,e!==null){e.return=t.return,G=e;break}G=t.return}return y=Lm,Lm=!1,y}function Oa(e,t,r){var n=t.updateQueue;if(n=n!==null?n.lastEffect:null,n!==null){var i=n=n.next;do{if((i.tag&e)===e){var o=i.destroy;i.destroy=void 0,o!==void 0&&tp(t,r,o)}i=i.next}while(i!==n)}}function Zc(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var r=t=t.next;do{if((r.tag&e)===e){var n=r.create;r.destroy=n()}r=r.next}while(r!==t)}}function rp(e){var t=e.ref;if(t!==null){var r=e.stateNode;switch(e.tag){case 5:e=r;break;default:e=r}typeof t=="function"?t(e):t.current=e}}function jb(e){var t=e.alternate;t!==null&&(e.alternate=null,jb(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[vn],delete t[Qa],delete t[zf],delete t[pk],delete t[vk])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Nb(e){return e.tag===5||e.tag===3||e.tag===4}function Dm(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Nb(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function np(e,t,r){var n=e.tag;if(n===5||n===6)e=e.stateNode,t?r.nodeType===8?r.parentNode.insertBefore(e,t):r.insertBefore(e,t):(r.nodeType===8?(t=r.parentNode,t.insertBefore(e,r)):(t=r,t.appendChild(e)),r=r._reactRootContainer,r!=null||t.onclick!==null||(t.onclick=Yu));else if(n!==4&&(e=e.child,e!==null))for(np(e,t,r),e=e.sibling;e!==null;)np(e,t,r),e=e.sibling}function ip(e,t,r){var n=e.tag;if(n===5||n===6)e=e.stateNode,t?r.insertBefore(e,t):r.appendChild(e);else if(n!==4&&(e=e.child,e!==null))for(ip(e,t,r),e=e.sibling;e!==null;)ip(e,t,r),e=e.sibling}var jt=null,Wr=!1;function Zn(e,t,r){for(r=r.child;r!==null;)Lb(e,t,r),r=r.sibling}function Lb(e,t,r){if(yn&&typeof yn.onCommitFiberUnmount=="function")try{yn.onCommitFiberUnmount(zc,r)}catch{}switch(r.tag){case 5:Bt||qo(r,t);case 6:var n=jt,i=Wr;jt=null,Zn(e,t,r),jt=n,Wr=i,jt!==null&&(Wr?(e=jt,r=r.stateNode,e.nodeType===8?e.parentNode.removeChild(r):e.removeChild(r)):jt.removeChild(r.stateNode));break;case 18:jt!==null&&(Wr?(e=jt,r=r.stateNode,e.nodeType===8?pd(e.parentNode,r):e.nodeType===1&&pd(e,r),Ua(e)):pd(jt,r.stateNode));break;case 4:n=jt,i=Wr,jt=r.stateNode.containerInfo,Wr=!0,Zn(e,t,r),jt=n,Wr=i;break;case 0:case 11:case 14:case 15:if(!Bt&&(n=r.updateQueue,n!==null&&(n=n.lastEffect,n!==null))){i=n=n.next;do{var o=i,s=o.destroy;o=o.tag,s!==void 0&&(o&2||o&4)&&tp(r,t,s),i=i.next}while(i!==n)}Zn(e,t,r);break;case 1:if(!Bt&&(qo(r,t),n=r.stateNode,typeof n.componentWillUnmount=="function"))try{n.props=r.memoizedProps,n.state=r.memoizedState,n.componentWillUnmount()}catch(a){Ye(r,t,a)}Zn(e,t,r);break;case 21:Zn(e,t,r);break;case 22:r.mode&1?(Bt=(n=Bt)||r.memoizedState!==null,Zn(e,t,r),Bt=n):Zn(e,t,r);break;default:Zn(e,t,r)}}function Rm(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var r=e.stateNode;r===null&&(r=e.stateNode=new Ak),t.forEach(function(n){var i=Bk.bind(null,e,n);r.has(n)||(r.add(n),n.then(i,i))})}}function Ur(e,t){var r=t.deletions;if(r!==null)for(var n=0;n<r.length;n++){var i=r[n];try{var o=e,s=t,a=s;e:for(;a!==null;){switch(a.tag){case 5:jt=a.stateNode,Wr=!1;break e;case 3:jt=a.stateNode.containerInfo,Wr=!0;break e;case 4:jt=a.stateNode.containerInfo,Wr=!0;break e}a=a.return}if(jt===null)throw Error(R(160));Lb(o,s,i),jt=null,Wr=!1;var l=i.alternate;l!==null&&(l.return=null),i.return=null}catch(u){Ye(i,t,u)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Db(t,e),t=t.sibling}function Db(e,t){var r=e.alternate,n=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Ur(t,e),fn(e),n&4){try{Oa(3,e,e.return),Zc(3,e)}catch(w){Ye(e,e.return,w)}try{Oa(5,e,e.return)}catch(w){Ye(e,e.return,w)}}break;case 1:Ur(t,e),fn(e),n&512&&r!==null&&qo(r,r.return);break;case 5:if(Ur(t,e),fn(e),n&512&&r!==null&&qo(r,r.return),e.flags&32){var i=e.stateNode;try{Va(i,"")}catch(w){Ye(e,e.return,w)}}if(n&4&&(i=e.stateNode,i!=null)){var o=e.memoizedProps,s=r!==null?r.memoizedProps:o,a=e.type,l=e.updateQueue;if(e.updateQueue=null,l!==null)try{a==="input"&&o.type==="radio"&&o.name!=null&&r1(i,o),Of(a,s);var u=Of(a,o);for(s=0;s<l.length;s+=2){var c=l[s],h=l[s+1];c==="style"?a1(i,h):c==="dangerouslySetInnerHTML"?o1(i,h):c==="children"?Va(i,h):tv(i,c,h,u)}switch(a){case"input":_f(i,o);break;case"textarea":n1(i,o);break;case"select":var d=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!o.multiple;var m=o.value;m!=null?Yo(i,!!o.multiple,m,!1):d!==!!o.multiple&&(o.defaultValue!=null?Yo(i,!!o.multiple,o.defaultValue,!0):Yo(i,!!o.multiple,o.multiple?[]:"",!1))}i[Qa]=o}catch(w){Ye(e,e.return,w)}}break;case 6:if(Ur(t,e),fn(e),n&4){if(e.stateNode===null)throw Error(R(162));i=e.stateNode,o=e.memoizedProps;try{i.nodeValue=o}catch(w){Ye(e,e.return,w)}}break;case 3:if(Ur(t,e),fn(e),n&4&&r!==null&&r.memoizedState.isDehydrated)try{Ua(t.containerInfo)}catch(w){Ye(e,e.return,w)}break;case 4:Ur(t,e),fn(e);break;case 13:Ur(t,e),fn(e),i=e.child,i.flags&8192&&(o=i.memoizedState!==null,i.stateNode.isHidden=o,!o||i.alternate!==null&&i.alternate.memoizedState!==null||(Lv=it())),n&4&&Rm(e);break;case 22:if(c=r!==null&&r.memoizedState!==null,e.mode&1?(Bt=(u=Bt)||c,Ur(t,e),Bt=u):Ur(t,e),fn(e),n&8192){if(u=e.memoizedState!==null,(e.stateNode.isHidden=u)&&!c&&e.mode&1)for(G=e,c=e.child;c!==null;){for(h=G=c;G!==null;){switch(d=G,m=d.child,d.tag){case 0:case 11:case 14:case 15:Oa(4,d,d.return);break;case 1:qo(d,d.return);var y=d.stateNode;if(typeof y.componentWillUnmount=="function"){n=d,r=d.return;try{t=n,y.props=t.memoizedProps,y.state=t.memoizedState,y.componentWillUnmount()}catch(w){Ye(n,r,w)}}break;case 5:qo(d,d.return);break;case 22:if(d.memoizedState!==null){Im(h);continue}}m!==null?(m.return=d,G=m):Im(h)}c=c.sibling}e:for(c=null,h=e;;){if(h.tag===5){if(c===null){c=h;try{i=h.stateNode,u?(o=i.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none"):(a=h.stateNode,l=h.memoizedProps.style,s=l!=null&&l.hasOwnProperty("display")?l.display:null,a.style.display=s1("display",s))}catch(w){Ye(e,e.return,w)}}}else if(h.tag===6){if(c===null)try{h.stateNode.nodeValue=u?"":h.memoizedProps}catch(w){Ye(e,e.return,w)}}else if((h.tag!==22&&h.tag!==23||h.memoizedState===null||h===e)&&h.child!==null){h.child.return=h,h=h.child;continue}if(h===e)break e;for(;h.sibling===null;){if(h.return===null||h.return===e)break e;c===h&&(c=null),h=h.return}c===h&&(c=null),h.sibling.return=h.return,h=h.sibling}}break;case 19:Ur(t,e),fn(e),n&4&&Rm(e);break;case 21:break;default:Ur(t,e),fn(e)}}function fn(e){var t=e.flags;if(t&2){try{e:{for(var r=e.return;r!==null;){if(Nb(r)){var n=r;break e}r=r.return}throw Error(R(160))}switch(n.tag){case 5:var i=n.stateNode;n.flags&32&&(Va(i,""),n.flags&=-33);var o=Dm(e);ip(e,o,i);break;case 3:case 4:var s=n.stateNode.containerInfo,a=Dm(e);np(e,a,s);break;default:throw Error(R(161))}}catch(l){Ye(e,e.return,l)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Nk(e,t,r){G=e,Rb(e)}function Rb(e,t,r){for(var n=(e.mode&1)!==0;G!==null;){var i=G,o=i.child;if(i.tag===22&&n){var s=i.memoizedState!==null||fu;if(!s){var a=i.alternate,l=a!==null&&a.memoizedState!==null||Bt;a=fu;var u=Bt;if(fu=s,(Bt=l)&&!u)for(G=i;G!==null;)s=G,l=s.child,s.tag===22&&s.memoizedState!==null?Fm(i):l!==null?(l.return=s,G=l):Fm(i);for(;o!==null;)G=o,Rb(o),o=o.sibling;G=i,fu=a,Bt=u}Mm(e)}else i.subtreeFlags&8772&&o!==null?(o.return=i,G=o):Mm(e)}}function Mm(e){for(;G!==null;){var t=G;if(t.flags&8772){var r=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:Bt||Zc(5,t);break;case 1:var n=t.stateNode;if(t.flags&4&&!Bt)if(r===null)n.componentDidMount();else{var i=t.elementType===t.type?r.memoizedProps:qr(t.type,r.memoizedProps);n.componentDidUpdate(i,r.memoizedState,n.__reactInternalSnapshotBeforeUpdate)}var o=t.updateQueue;o!==null&&xm(t,o,n);break;case 3:var s=t.updateQueue;if(s!==null){if(r=null,t.child!==null)switch(t.child.tag){case 5:r=t.child.stateNode;break;case 1:r=t.child.stateNode}xm(t,s,r)}break;case 5:var a=t.stateNode;if(r===null&&t.flags&4){r=a;var l=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&r.focus();break;case"img":l.src&&(r.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var u=t.alternate;if(u!==null){var c=u.memoizedState;if(c!==null){var h=c.dehydrated;h!==null&&Ua(h)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(R(163))}Bt||t.flags&512&&rp(t)}catch(d){Ye(t,t.return,d)}}if(t===e){G=null;break}if(r=t.sibling,r!==null){r.return=t.return,G=r;break}G=t.return}}function Im(e){for(;G!==null;){var t=G;if(t===e){G=null;break}var r=t.sibling;if(r!==null){r.return=t.return,G=r;break}G=t.return}}function Fm(e){for(;G!==null;){var t=G;try{switch(t.tag){case 0:case 11:case 15:var r=t.return;try{Zc(4,t)}catch(l){Ye(t,r,l)}break;case 1:var n=t.stateNode;if(typeof n.componentDidMount=="function"){var i=t.return;try{n.componentDidMount()}catch(l){Ye(t,i,l)}}var o=t.return;try{rp(t)}catch(l){Ye(t,o,l)}break;case 5:var s=t.return;try{rp(t)}catch(l){Ye(t,s,l)}}}catch(l){Ye(t,t.return,l)}if(t===e){G=null;break}var a=t.sibling;if(a!==null){a.return=t.return,G=a;break}G=t.return}}var Lk=Math.ceil,uc=qn.ReactCurrentDispatcher,jv=qn.ReactCurrentOwner,Mr=qn.ReactCurrentBatchConfig,Ce=0,kt=null,ut=null,Lt=0,pr=0,Wo=wi(0),gt=0,tl=null,Zi=0,Xc=0,Nv=0,Ta=null,nr=null,Lv=0,fs=1/0,Cn=null,cc=!1,op=null,hi=null,pu=!1,ii=null,hc=0,Pa=0,sp=null,Lu=-1,Du=0;function Xt(){return Ce&6?it():Lu!==-1?Lu:Lu=it()}function di(e){return e.mode&1?Ce&2&&Lt!==0?Lt&-Lt:mk.transition!==null?(Du===0&&(Du=b1()),Du):(e=Pe,e!==0||(e=window.event,e=e===void 0?16:C1(e.type)),e):1}function Zr(e,t,r,n){if(50<Pa)throw Pa=0,sp=null,Error(R(185));$l(e,r,n),(!(Ce&2)||e!==kt)&&(e===kt&&(!(Ce&2)&&(Xc|=r),gt===4&&ti(e,Lt)),ur(e,n),r===1&&Ce===0&&!(t.mode&1)&&(fs=it()+500,Kc&&$i()))}function ur(e,t){var r=e.callbackNode;m_(e,t);var n=Gu(e,e===kt?Lt:0);if(n===0)r!==null&&Gg(r),e.callbackNode=null,e.callbackPriority=0;else if(t=n&-n,e.callbackPriority!==t){if(r!=null&&Gg(r),t===1)e.tag===0?gk(Vm.bind(null,e)):q1(Vm.bind(null,e)),dk(function(){!(Ce&6)&&$i()}),r=null;else{switch(x1(n)){case 1:r=sv;break;case 4:r=m1;break;case 16:r=Ku;break;case 536870912:r=y1;break;default:r=Ku}r=Ub(r,Mb.bind(null,e))}e.callbackPriority=t,e.callbackNode=r}}function Mb(e,t){if(Lu=-1,Du=0,Ce&6)throw Error(R(327));var r=e.callbackNode;if(ns()&&e.callbackNode!==r)return null;var n=Gu(e,e===kt?Lt:0);if(n===0)return null;if(n&30||n&e.expiredLanes||t)t=dc(e,n);else{t=n;var i=Ce;Ce|=2;var o=Fb();(kt!==e||Lt!==t)&&(Cn=null,fs=it()+500,Ui(e,t));do try{Mk();break}catch(a){Ib(e,a)}while(!0);bv(),uc.current=o,Ce=i,ut!==null?t=0:(kt=null,Lt=0,t=gt)}if(t!==0){if(t===2&&(i=Nf(e),i!==0&&(n=i,t=ap(e,i))),t===1)throw r=tl,Ui(e,0),ti(e,n),ur(e,it()),r;if(t===6)ti(e,n);else{if(i=e.current.alternate,!(n&30)&&!Dk(i)&&(t=dc(e,n),t===2&&(o=Nf(e),o!==0&&(n=o,t=ap(e,o))),t===1))throw r=tl,Ui(e,0),ti(e,n),ur(e,it()),r;switch(e.finishedWork=i,e.finishedLanes=n,t){case 0:case 1:throw Error(R(345));case 2:Ri(e,nr,Cn);break;case 3:if(ti(e,n),(n&130023424)===n&&(t=Lv+500-it(),10<t)){if(Gu(e,0)!==0)break;if(i=e.suspendedLanes,(i&n)!==n){Xt(),e.pingedLanes|=e.suspendedLanes&i;break}e.timeoutHandle=Bf(Ri.bind(null,e,nr,Cn),t);break}Ri(e,nr,Cn);break;case 4:if(ti(e,n),(n&4194240)===n)break;for(t=e.eventTimes,i=-1;0<n;){var s=31-Qr(n);o=1<<s,s=t[s],s>i&&(i=s),n&=~o}if(n=i,n=it()-n,n=(120>n?120:480>n?480:1080>n?1080:1920>n?1920:3e3>n?3e3:4320>n?4320:1960*Lk(n/1960))-n,10<n){e.timeoutHandle=Bf(Ri.bind(null,e,nr,Cn),n);break}Ri(e,nr,Cn);break;case 5:Ri(e,nr,Cn);break;default:throw Error(R(329))}}}return ur(e,it()),e.callbackNode===r?Mb.bind(null,e):null}function ap(e,t){var r=Ta;return e.current.memoizedState.isDehydrated&&(Ui(e,t).flags|=256),e=dc(e,t),e!==2&&(t=nr,nr=r,t!==null&&lp(t)),e}function lp(e){nr===null?nr=e:nr.push.apply(nr,e)}function Dk(e){for(var t=e;;){if(t.flags&16384){var r=t.updateQueue;if(r!==null&&(r=r.stores,r!==null))for(var n=0;n<r.length;n++){var i=r[n],o=i.getSnapshot;i=i.value;try{if(!Jr(o(),i))return!1}catch{return!1}}}if(r=t.child,t.subtreeFlags&16384&&r!==null)r.return=t,t=r;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function ti(e,t){for(t&=~Nv,t&=~Xc,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var r=31-Qr(t),n=1<<r;e[r]=-1,t&=~n}}function Vm(e){if(Ce&6)throw Error(R(327));ns();var t=Gu(e,0);if(!(t&1))return ur(e,it()),null;var r=dc(e,t);if(e.tag!==0&&r===2){var n=Nf(e);n!==0&&(t=n,r=ap(e,n))}if(r===1)throw r=tl,Ui(e,0),ti(e,t),ur(e,it()),r;if(r===6)throw Error(R(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Ri(e,nr,Cn),ur(e,it()),null}function Dv(e,t){var r=Ce;Ce|=1;try{return e(t)}finally{Ce=r,Ce===0&&(fs=it()+500,Kc&&$i())}}function Xi(e){ii!==null&&ii.tag===0&&!(Ce&6)&&ns();var t=Ce;Ce|=1;var r=Mr.transition,n=Pe;try{if(Mr.transition=null,Pe=1,e)return e()}finally{Pe=n,Mr.transition=r,Ce=t,!(Ce&6)&&$i()}}function Rv(){pr=Wo.current,Fe(Wo)}function Ui(e,t){e.finishedWork=null,e.finishedLanes=0;var r=e.timeoutHandle;if(r!==-1&&(e.timeoutHandle=-1,hk(r)),ut!==null)for(r=ut.return;r!==null;){var n=r;switch(gv(n),n.tag){case 1:n=n.type.childContextTypes,n!=null&&Ju();break;case 3:hs(),Fe(ar),Fe(qt),Sv();break;case 5:kv(n);break;case 4:hs();break;case 13:Fe(We);break;case 19:Fe(We);break;case 10:xv(n.type._context);break;case 22:case 23:Rv()}r=r.return}if(kt=e,ut=e=fi(e.current,null),Lt=pr=t,gt=0,tl=null,Nv=Xc=Zi=0,nr=Ta=null,Ii!==null){for(t=0;t<Ii.length;t++)if(r=Ii[t],n=r.interleaved,n!==null){r.interleaved=null;var i=n.next,o=r.pending;if(o!==null){var s=o.next;o.next=i,n.next=s}r.pending=n}Ii=null}return e}function Ib(e,t){do{var r=ut;try{if(bv(),Au.current=lc,ac){for(var n=Ke.memoizedState;n!==null;){var i=n.queue;i!==null&&(i.pending=null),n=n.next}ac=!1}if(Qi=0,$t=ft=Ke=null,Ea=!1,Ya=0,jv.current=null,r===null||r.return===null){gt=1,tl=t,ut=null;break}e:{var o=e,s=r.return,a=r,l=t;if(t=Lt,a.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var u=l,c=a,h=c.tag;if(!(c.mode&1)&&(h===0||h===11||h===15)){var d=c.alternate;d?(c.updateQueue=d.updateQueue,c.memoizedState=d.memoizedState,c.lanes=d.lanes):(c.updateQueue=null,c.memoizedState=null)}var m=Em(s);if(m!==null){m.flags&=-257,Om(m,s,a,o,t),m.mode&1&&Cm(o,u,t),t=m,l=u;var y=t.updateQueue;if(y===null){var w=new Set;w.add(l),t.updateQueue=w}else y.add(l);break e}else{if(!(t&1)){Cm(o,u,t),Mv();break e}l=Error(R(426))}}else if(ze&&a.mode&1){var E=Em(s);if(E!==null){!(E.flags&65536)&&(E.flags|=256),Om(E,s,a,o,t),mv(ds(l,a));break e}}o=l=ds(l,a),gt!==4&&(gt=2),Ta===null?Ta=[o]:Ta.push(o),o=s;do{switch(o.tag){case 3:o.flags|=65536,t&=-t,o.lanes|=t;var p=wb(o,l,t);bm(o,p);break e;case 1:a=l;var f=o.type,v=o.stateNode;if(!(o.flags&128)&&(typeof f.getDerivedStateFromError=="function"||v!==null&&typeof v.componentDidCatch=="function"&&(hi===null||!hi.has(v)))){o.flags|=65536,t&=-t,o.lanes|=t;var S=$b(o,a,t);bm(o,S);break e}}o=o.return}while(o!==null)}Bb(r)}catch(L){t=L,ut===r&&r!==null&&(ut=r=r.return);continue}break}while(!0)}function Fb(){var e=uc.current;return uc.current=lc,e===null?lc:e}function Mv(){(gt===0||gt===3||gt===2)&&(gt=4),kt===null||!(Zi&268435455)&&!(Xc&268435455)||ti(kt,Lt)}function dc(e,t){var r=Ce;Ce|=2;var n=Fb();(kt!==e||Lt!==t)&&(Cn=null,Ui(e,t));do try{Rk();break}catch(i){Ib(e,i)}while(!0);if(bv(),Ce=r,uc.current=n,ut!==null)throw Error(R(261));return kt=null,Lt=0,gt}function Rk(){for(;ut!==null;)Vb(ut)}function Mk(){for(;ut!==null&&!l_();)Vb(ut)}function Vb(e){var t=Hb(e.alternate,e,pr);e.memoizedProps=e.pendingProps,t===null?Bb(e):ut=t,jv.current=null}function Bb(e){var t=e;do{var r=t.alternate;if(e=t.return,t.flags&32768){if(r=Pk(r,t),r!==null){r.flags&=32767,ut=r;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{gt=6,ut=null;return}}else if(r=Tk(r,t,pr),r!==null){ut=r;return}if(t=t.sibling,t!==null){ut=t;return}ut=t=e}while(t!==null);gt===0&&(gt=5)}function Ri(e,t,r){var n=Pe,i=Mr.transition;try{Mr.transition=null,Pe=1,Ik(e,t,r,n)}finally{Mr.transition=i,Pe=n}return null}function Ik(e,t,r,n){do ns();while(ii!==null);if(Ce&6)throw Error(R(327));r=e.finishedWork;var i=e.finishedLanes;if(r===null)return null;if(e.finishedWork=null,e.finishedLanes=0,r===e.current)throw Error(R(177));e.callbackNode=null,e.callbackPriority=0;var o=r.lanes|r.childLanes;if(y_(e,o),e===kt&&(ut=kt=null,Lt=0),!(r.subtreeFlags&2064)&&!(r.flags&2064)||pu||(pu=!0,Ub(Ku,function(){return ns(),null})),o=(r.flags&15990)!==0,r.subtreeFlags&15990||o){o=Mr.transition,Mr.transition=null;var s=Pe;Pe=1;var a=Ce;Ce|=4,jv.current=null,jk(e,r),Db(r,e),ik(Ff),Qu=!!If,Ff=If=null,e.current=r,Nk(r),u_(),Ce=a,Pe=s,Mr.transition=o}else e.current=r;if(pu&&(pu=!1,ii=e,hc=i),o=e.pendingLanes,o===0&&(hi=null),d_(r.stateNode),ur(e,it()),t!==null)for(n=e.onRecoverableError,r=0;r<t.length;r++)i=t[r],n(i.value,{componentStack:i.stack,digest:i.digest});if(cc)throw cc=!1,e=op,op=null,e;return hc&1&&e.tag!==0&&ns(),o=e.pendingLanes,o&1?e===sp?Pa++:(Pa=0,sp=e):Pa=0,$i(),null}function ns(){if(ii!==null){var e=x1(hc),t=Mr.transition,r=Pe;try{if(Mr.transition=null,Pe=16>e?16:e,ii===null)var n=!1;else{if(e=ii,ii=null,hc=0,Ce&6)throw Error(R(331));var i=Ce;for(Ce|=4,G=e.current;G!==null;){var o=G,s=o.child;if(G.flags&16){var a=o.deletions;if(a!==null){for(var l=0;l<a.length;l++){var u=a[l];for(G=u;G!==null;){var c=G;switch(c.tag){case 0:case 11:case 15:Oa(8,c,o)}var h=c.child;if(h!==null)h.return=c,G=h;else for(;G!==null;){c=G;var d=c.sibling,m=c.return;if(jb(c),c===u){G=null;break}if(d!==null){d.return=m,G=d;break}G=m}}}var y=o.alternate;if(y!==null){var w=y.child;if(w!==null){y.child=null;do{var E=w.sibling;w.sibling=null,w=E}while(w!==null)}}G=o}}if(o.subtreeFlags&2064&&s!==null)s.return=o,G=s;else e:for(;G!==null;){if(o=G,o.flags&2048)switch(o.tag){case 0:case 11:case 15:Oa(9,o,o.return)}var p=o.sibling;if(p!==null){p.return=o.return,G=p;break e}G=o.return}}var f=e.current;for(G=f;G!==null;){s=G;var v=s.child;if(s.subtreeFlags&2064&&v!==null)v.return=s,G=v;else e:for(s=f;G!==null;){if(a=G,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:Zc(9,a)}}catch(L){Ye(a,a.return,L)}if(a===s){G=null;break e}var S=a.sibling;if(S!==null){S.return=a.return,G=S;break e}G=a.return}}if(Ce=i,$i(),yn&&typeof yn.onPostCommitFiberRoot=="function")try{yn.onPostCommitFiberRoot(zc,e)}catch{}n=!0}return n}finally{Pe=r,Mr.transition=t}}return!1}function Bm(e,t,r){t=ds(r,t),t=wb(e,t,1),e=ci(e,t,1),t=Xt(),e!==null&&($l(e,1,t),ur(e,t))}function Ye(e,t,r){if(e.tag===3)Bm(e,e,r);else for(;t!==null;){if(t.tag===3){Bm(t,e,r);break}else if(t.tag===1){var n=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof n.componentDidCatch=="function"&&(hi===null||!hi.has(n))){e=ds(r,e),e=$b(t,e,1),t=ci(t,e,1),e=Xt(),t!==null&&($l(t,1,e),ur(t,e));break}}t=t.return}}function Fk(e,t,r){var n=e.pingCache;n!==null&&n.delete(t),t=Xt(),e.pingedLanes|=e.suspendedLanes&r,kt===e&&(Lt&r)===r&&(gt===4||gt===3&&(Lt&130023424)===Lt&&500>it()-Lv?Ui(e,0):Nv|=r),ur(e,t)}function zb(e,t){t===0&&(e.mode&1?(t=iu,iu<<=1,!(iu&130023424)&&(iu=4194304)):t=1);var r=Xt();e=Fn(e,t),e!==null&&($l(e,t,r),ur(e,r))}function Vk(e){var t=e.memoizedState,r=0;t!==null&&(r=t.retryLane),zb(e,r)}function Bk(e,t){var r=0;switch(e.tag){case 13:var n=e.stateNode,i=e.memoizedState;i!==null&&(r=i.retryLane);break;case 19:n=e.stateNode;break;default:throw Error(R(314))}n!==null&&n.delete(t),zb(e,r)}var Hb;Hb=function(e,t,r){if(e!==null)if(e.memoizedProps!==t.pendingProps||ar.current)ir=!0;else{if(!(e.lanes&r)&&!(t.flags&128))return ir=!1,Ok(e,t,r);ir=!!(e.flags&131072)}else ir=!1,ze&&t.flags&1048576&&W1(t,rc,t.index);switch(t.lanes=0,t.tag){case 2:var n=t.type;Nu(e,t),e=t.pendingProps;var i=ls(t,qt.current);rs(t,r),i=Ev(null,t,n,e,i,r);var o=Ov();return t.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,lr(n)?(o=!0,ec(t)):o=!1,t.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,$v(t),i.updater=Gc,t.stateNode=i,i._reactInternals=t,Gf(t,n,e,r),t=Xf(null,t,n,!0,o,r)):(t.tag=0,ze&&o&&vv(t),Qt(null,t,i,r),t=t.child),t;case 16:n=t.elementType;e:{switch(Nu(e,t),e=t.pendingProps,i=n._init,n=i(n._payload),t.type=n,i=t.tag=Hk(n),e=qr(n,e),i){case 0:t=Zf(null,t,n,e,r);break e;case 1:t=Am(null,t,n,e,r);break e;case 11:t=Tm(null,t,n,e,r);break e;case 14:t=Pm(null,t,n,qr(n.type,e),r);break e}throw Error(R(306,n,""))}return t;case 0:return n=t.type,i=t.pendingProps,i=t.elementType===n?i:qr(n,i),Zf(e,t,n,i,r);case 1:return n=t.type,i=t.pendingProps,i=t.elementType===n?i:qr(n,i),Am(e,t,n,i,r);case 3:e:{if(Cb(t),e===null)throw Error(R(387));n=t.pendingProps,o=t.memoizedState,i=o.element,Z1(e,t),oc(t,n,null,r);var s=t.memoizedState;if(n=s.element,o.isDehydrated)if(o={element:n,isDehydrated:!1,cache:s.cache,pendingSuspenseBoundaries:s.pendingSuspenseBoundaries,transitions:s.transitions},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){i=ds(Error(R(423)),t),t=jm(e,t,n,r,i);break e}else if(n!==i){i=ds(Error(R(424)),t),t=jm(e,t,n,r,i);break e}else for(gr=ui(t.stateNode.containerInfo.firstChild),mr=t,ze=!0,Gr=null,r=eb(t,null,n,r),t.child=r;r;)r.flags=r.flags&-3|4096,r=r.sibling;else{if(us(),n===i){t=Vn(e,t,r);break e}Qt(e,t,n,r)}t=t.child}return t;case 5:return tb(t),e===null&&qf(t),n=t.type,i=t.pendingProps,o=e!==null?e.memoizedProps:null,s=i.children,Vf(n,i)?s=null:o!==null&&Vf(n,o)&&(t.flags|=32),Sb(e,t),Qt(e,t,s,r),t.child;case 6:return e===null&&qf(t),null;case 13:return Eb(e,t,r);case 4:return _v(t,t.stateNode.containerInfo),n=t.pendingProps,e===null?t.child=cs(t,null,n,r):Qt(e,t,n,r),t.child;case 11:return n=t.type,i=t.pendingProps,i=t.elementType===n?i:qr(n,i),Tm(e,t,n,i,r);case 7:return Qt(e,t,t.pendingProps,r),t.child;case 8:return Qt(e,t,t.pendingProps.children,r),t.child;case 12:return Qt(e,t,t.pendingProps.children,r),t.child;case 10:e:{if(n=t.type._context,i=t.pendingProps,o=t.memoizedProps,s=i.value,De(nc,n._currentValue),n._currentValue=s,o!==null)if(Jr(o.value,s)){if(o.children===i.children&&!ar.current){t=Vn(e,t,r);break e}}else for(o=t.child,o!==null&&(o.return=t);o!==null;){var a=o.dependencies;if(a!==null){s=o.child;for(var l=a.firstContext;l!==null;){if(l.context===n){if(o.tag===1){l=Nn(-1,r&-r),l.tag=2;var u=o.updateQueue;if(u!==null){u=u.shared;var c=u.pending;c===null?l.next=l:(l.next=c.next,c.next=l),u.pending=l}}o.lanes|=r,l=o.alternate,l!==null&&(l.lanes|=r),Wf(o.return,r,t),a.lanes|=r;break}l=l.next}}else if(o.tag===10)s=o.type===t.type?null:o.child;else if(o.tag===18){if(s=o.return,s===null)throw Error(R(341));s.lanes|=r,a=s.alternate,a!==null&&(a.lanes|=r),Wf(s,r,t),s=o.sibling}else s=o.child;if(s!==null)s.return=o;else for(s=o;s!==null;){if(s===t){s=null;break}if(o=s.sibling,o!==null){o.return=s.return,s=o;break}s=s.return}o=s}Qt(e,t,i.children,r),t=t.child}return t;case 9:return i=t.type,n=t.pendingProps.children,rs(t,r),i=Ir(i),n=n(i),t.flags|=1,Qt(e,t,n,r),t.child;case 14:return n=t.type,i=qr(n,t.pendingProps),i=qr(n.type,i),Pm(e,t,n,i,r);case 15:return _b(e,t,t.type,t.pendingProps,r);case 17:return n=t.type,i=t.pendingProps,i=t.elementType===n?i:qr(n,i),Nu(e,t),t.tag=1,lr(n)?(e=!0,ec(t)):e=!1,rs(t,r),Y1(t,n,i),Gf(t,n,i,r),Xf(null,t,n,!0,e,r);case 19:return Ob(e,t,r);case 22:return kb(e,t,r)}throw Error(R(156,t.tag))};function Ub(e,t){return g1(e,t)}function zk(e,t,r,n){this.tag=e,this.key=r,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=n,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Nr(e,t,r,n){return new zk(e,t,r,n)}function Iv(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Hk(e){if(typeof e=="function")return Iv(e)?1:0;if(e!=null){if(e=e.$$typeof,e===nv)return 11;if(e===iv)return 14}return 2}function fi(e,t){var r=e.alternate;return r===null?(r=Nr(e.tag,t,e.key,e.mode),r.elementType=e.elementType,r.type=e.type,r.stateNode=e.stateNode,r.alternate=e,e.alternate=r):(r.pendingProps=t,r.type=e.type,r.flags=0,r.subtreeFlags=0,r.deletions=null),r.flags=e.flags&14680064,r.childLanes=e.childLanes,r.lanes=e.lanes,r.child=e.child,r.memoizedProps=e.memoizedProps,r.memoizedState=e.memoizedState,r.updateQueue=e.updateQueue,t=e.dependencies,r.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},r.sibling=e.sibling,r.index=e.index,r.ref=e.ref,r}function Ru(e,t,r,n,i,o){var s=2;if(n=e,typeof e=="function")Iv(e)&&(s=1);else if(typeof e=="string")s=5;else e:switch(e){case Ro:return qi(r.children,i,o,t);case rv:s=8,i|=8;break;case yf:return e=Nr(12,r,t,i|2),e.elementType=yf,e.lanes=o,e;case bf:return e=Nr(13,r,t,i),e.elementType=bf,e.lanes=o,e;case xf:return e=Nr(19,r,t,i),e.elementType=xf,e.lanes=o,e;case Jy:return Yc(r,i,o,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Xy:s=10;break e;case Yy:s=9;break e;case nv:s=11;break e;case iv:s=14;break e;case Yn:s=16,n=null;break e}throw Error(R(130,e==null?e:typeof e,""))}return t=Nr(s,r,t,i),t.elementType=e,t.type=n,t.lanes=o,t}function qi(e,t,r,n){return e=Nr(7,e,n,t),e.lanes=r,e}function Yc(e,t,r,n){return e=Nr(22,e,n,t),e.elementType=Jy,e.lanes=r,e.stateNode={isHidden:!1},e}function $d(e,t,r){return e=Nr(6,e,null,t),e.lanes=r,e}function _d(e,t,r){return t=Nr(4,e.children!==null?e.children:[],e.key,t),t.lanes=r,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Uk(e,t,r,n,i){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=nd(0),this.expirationTimes=nd(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=nd(0),this.identifierPrefix=n,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function Fv(e,t,r,n,i,o,s,a,l){return e=new Uk(e,t,r,a,l),t===1?(t=1,o===!0&&(t|=8)):t=0,o=Nr(3,null,null,t),e.current=o,o.stateNode=e,o.memoizedState={element:n,isDehydrated:r,cache:null,transitions:null,pendingSuspenseBoundaries:null},$v(o),e}function qk(e,t,r){var n=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Do,key:n==null?null:""+n,children:e,containerInfo:t,implementation:r}}function qb(e){if(!e)return gi;e=e._reactInternals;e:{if(fo(e)!==e||e.tag!==1)throw Error(R(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(lr(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(R(171))}if(e.tag===1){var r=e.type;if(lr(r))return U1(e,r,t)}return t}function Wb(e,t,r,n,i,o,s,a,l){return e=Fv(r,n,!0,e,i,o,s,a,l),e.context=qb(null),r=e.current,n=Xt(),i=di(r),o=Nn(n,i),o.callback=t??null,ci(r,o,i),e.current.lanes=i,$l(e,i,n),ur(e,n),e}function Jc(e,t,r,n){var i=t.current,o=Xt(),s=di(i);return r=qb(r),t.context===null?t.context=r:t.pendingContext=r,t=Nn(o,s),t.payload={element:e},n=n===void 0?null:n,n!==null&&(t.callback=n),e=ci(i,t,s),e!==null&&(Zr(e,i,s,o),Pu(e,i,s)),s}function fc(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function zm(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var r=e.retryLane;e.retryLane=r!==0&&r<t?r:t}}function Vv(e,t){zm(e,t),(e=e.alternate)&&zm(e,t)}function Wk(){return null}var Kb=typeof reportError=="function"?reportError:function(e){console.error(e)};function Bv(e){this._internalRoot=e}eh.prototype.render=Bv.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(R(409));Jc(e,t,null,null)};eh.prototype.unmount=Bv.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Xi(function(){Jc(null,e,null,null)}),t[In]=null}};function eh(e){this._internalRoot=e}eh.prototype.unstable_scheduleHydration=function(e){if(e){var t=_1();e={blockedOn:null,target:e,priority:t};for(var r=0;r<ei.length&&t!==0&&t<ei[r].priority;r++);ei.splice(r,0,e),r===0&&S1(e)}};function zv(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function th(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Hm(){}function Kk(e,t,r,n,i){if(i){if(typeof n=="function"){var o=n;n=function(){var u=fc(s);o.call(u)}}var s=Wb(t,n,e,0,null,!1,!1,"",Hm);return e._reactRootContainer=s,e[In]=s.current,Ka(e.nodeType===8?e.parentNode:e),Xi(),s}for(;i=e.lastChild;)e.removeChild(i);if(typeof n=="function"){var a=n;n=function(){var u=fc(l);a.call(u)}}var l=Fv(e,0,!1,null,null,!1,!1,"",Hm);return e._reactRootContainer=l,e[In]=l.current,Ka(e.nodeType===8?e.parentNode:e),Xi(function(){Jc(t,l,r,n)}),l}function rh(e,t,r,n,i){var o=r._reactRootContainer;if(o){var s=o;if(typeof i=="function"){var a=i;i=function(){var l=fc(s);a.call(l)}}Jc(t,s,e,i)}else s=Kk(r,t,e,i,n);return fc(s)}w1=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var r=ma(t.pendingLanes);r!==0&&(av(t,r|1),ur(t,it()),!(Ce&6)&&(fs=it()+500,$i()))}break;case 13:Xi(function(){var n=Fn(e,1);if(n!==null){var i=Xt();Zr(n,e,1,i)}}),Vv(e,1)}};lv=function(e){if(e.tag===13){var t=Fn(e,134217728);if(t!==null){var r=Xt();Zr(t,e,134217728,r)}Vv(e,134217728)}};$1=function(e){if(e.tag===13){var t=di(e),r=Fn(e,t);if(r!==null){var n=Xt();Zr(r,e,t,n)}Vv(e,t)}};_1=function(){return Pe};k1=function(e,t){var r=Pe;try{return Pe=e,t()}finally{Pe=r}};Pf=function(e,t,r){switch(t){case"input":if(_f(e,r),t=r.name,r.type==="radio"&&t!=null){for(r=e;r.parentNode;)r=r.parentNode;for(r=r.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<r.length;t++){var n=r[t];if(n!==e&&n.form===e.form){var i=Wc(n);if(!i)throw Error(R(90));t1(n),_f(n,i)}}}break;case"textarea":n1(e,r);break;case"select":t=r.value,t!=null&&Yo(e,!!r.multiple,t,!1)}};c1=Dv;h1=Xi;var Gk={usingClientEntryPoint:!1,Events:[kl,Vo,Wc,l1,u1,Dv]},ta={findFiberByHostInstance:Mi,bundleType:0,version:"18.2.0",rendererPackageName:"react-dom"},Qk={bundleType:ta.bundleType,version:ta.version,rendererPackageName:ta.rendererPackageName,rendererConfig:ta.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:qn.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=p1(e),e===null?null:e.stateNode},findFiberByHostInstance:ta.findFiberByHostInstance||Wk,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.2.0-next-9e3b772b8-20220608"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var vu=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!vu.isDisabled&&vu.supportsFiber)try{zc=vu.inject(Qk),yn=vu}catch{}}br.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Gk;br.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!zv(t))throw Error(R(200));return qk(e,t,null,r)};br.createRoot=function(e,t){if(!zv(e))throw Error(R(299));var r=!1,n="",i=Kb;return t!=null&&(t.unstable_strictMode===!0&&(r=!0),t.identifierPrefix!==void 0&&(n=t.identifierPrefix),t.onRecoverableError!==void 0&&(i=t.onRecoverableError)),t=Fv(e,1,!1,null,null,r,!1,n,i),e[In]=t.current,Ka(e.nodeType===8?e.parentNode:e),new Bv(t)};br.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(R(188)):(e=Object.keys(e).join(","),Error(R(268,e)));return e=p1(t),e=e===null?null:e.stateNode,e};br.flushSync=function(e){return Xi(e)};br.hydrate=function(e,t,r){if(!th(t))throw Error(R(200));return rh(null,e,t,!0,r)};br.hydrateRoot=function(e,t,r){if(!zv(e))throw Error(R(405));var n=r!=null&&r.hydratedSources||null,i=!1,o="",s=Kb;if(r!=null&&(r.unstable_strictMode===!0&&(i=!0),r.identifierPrefix!==void 0&&(o=r.identifierPrefix),r.onRecoverableError!==void 0&&(s=r.onRecoverableError)),t=Wb(t,null,e,1,r??null,i,!1,o,s),e[In]=t.current,Ka(e),n)for(e=0;e<n.length;e++)r=n[e],i=r._getVersion,i=i(r._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[r,i]:t.mutableSourceEagerHydrationData.push(r,i);return new eh(t)};br.render=function(e,t,r){if(!th(t))throw Error(R(200));return rh(null,e,t,!1,r)};br.unmountComponentAtNode=function(e){if(!th(e))throw Error(R(40));return e._reactRootContainer?(Xi(function(){rh(null,null,e,!1,function(){e._reactRootContainer=null,e[In]=null})}),!0):!1};br.unstable_batchedUpdates=Dv;br.unstable_renderSubtreeIntoContainer=function(e,t,r,n){if(!th(r))throw Error(R(200));if(e==null||e._reactInternals===void 0)throw Error(R(38));return rh(e,t,r,!1,n)};br.version="18.2.0-next-9e3b772b8-20220608";function Gb(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Gb)}catch(e){console.error(e)}}Gb(),Wy.exports=br;var Hv=Wy.exports;const Qb=Dy(Hv),Zk=Ly({__proto__:null,default:Qb},[Hv]);var Xk=Object.defineProperty,Yk=(e,t,r)=>t in e?Xk(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,$=(e,t,r)=>(Yk(e,typeof t!="symbol"?t+"":t,r),r);/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */function g(e,t,r,n){var i=arguments.length,o=i<3?t:n===null?n=Object.getOwnPropertyDescriptor(t,r):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(o=(i<3?s(o):i>3?s(t,r,o):s(t,r))||o);return i>3&&o&&Object.defineProperty(t,r,o),o}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Mu=globalThis,Uv=Mu.ShadowRoot&&(Mu.ShadyCSS===void 0||Mu.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,qv=Symbol(),Um=new WeakMap;let Zb=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==qv)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(Uv&&e===void 0){const r=t!==void 0&&t.length===1;r&&(e=Um.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),r&&Um.set(t,e))}return e}toString(){return this.cssText}};const nh=e=>new Zb(typeof e=="string"?e:e+"",void 0,qv),at=(e,...t)=>{const r=e.length===1?e[0]:t.reduce((n,i,o)=>n+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[o+1],e[0]);return new Zb(r,e,qv)},Jk=(e,t)=>{if(Uv)e.adoptedStyleSheets=t.map(r=>r instanceof CSSStyleSheet?r:r.styleSheet);else for(const r of t){const n=document.createElement("style"),i=Mu.litNonce;i!==void 0&&n.setAttribute("nonce",i),n.textContent=r.cssText,e.appendChild(n)}},qm=Uv?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let r="";for(const n of t.cssRules)r+=n.cssText;return nh(r)})(e):e;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:e2,defineProperty:t2,getOwnPropertyDescriptor:r2,getOwnPropertyNames:n2,getOwnPropertySymbols:i2,getPrototypeOf:o2}=Object,ps=globalThis,Wm=ps.trustedTypes,s2=Wm?Wm.emptyScript:"",Km=ps.reactiveElementPolyfillSupport,Aa=(e,t)=>e,pc={toAttribute(e,t){switch(t){case Boolean:e=e?s2:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let r=e;switch(t){case Boolean:r=e!==null;break;case Number:r=e===null?null:Number(e);break;case Object:case Array:try{r=JSON.parse(e)}catch{r=null}}return r}},Wv=(e,t)=>!e2(e,t),Gm={attribute:!0,type:String,converter:pc,reflect:!1,hasChanged:Wv};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),ps.litPropertyMetadata??(ps.litPropertyMetadata=new WeakMap);class Lo extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,r=Gm){if(r.state&&(r.attribute=!1),this._$Ei(),this.elementProperties.set(t,r),!r.noAccessor){const n=Symbol(),i=this.getPropertyDescriptor(t,n,r);i!==void 0&&t2(this.prototype,t,i)}}static getPropertyDescriptor(t,r,n){const{get:i,set:o}=r2(this.prototype,t)??{get(){return this[r]},set(s){this[r]=s}};return{get(){return i==null?void 0:i.call(this)},set(s){const a=i==null?void 0:i.call(this);o.call(this,s),this.requestUpdate(t,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Gm}static _$Ei(){if(this.hasOwnProperty(Aa("elementProperties")))return;const t=o2(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(Aa("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Aa("properties"))){const r=this.properties,n=[...n2(r),...i2(r)];for(const i of n)this.createProperty(i,r[i])}const t=this[Symbol.metadata];if(t!==null){const r=litPropertyMetadata.get(t);if(r!==void 0)for(const[n,i]of r)this.elementProperties.set(n,i)}this._$Eh=new Map;for(const[r,n]of this.elementProperties){const i=this._$Eu(r,n);i!==void 0&&this._$Eh.set(i,r)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const r=[];if(Array.isArray(t)){const n=new Set(t.flat(1/0).reverse());for(const i of n)r.unshift(qm(i))}else t!==void 0&&r.push(qm(t));return r}static _$Eu(t,r){const n=r.attribute;return n===!1?void 0:typeof n=="string"?n:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$Eg=new Promise(r=>this.enableUpdating=r),this._$AL=new Map,this._$ES(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(r=>r(this))}addController(t){var r;(this._$E_??(this._$E_=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((r=t.hostConnected)==null||r.call(t))}removeController(t){var r;(r=this._$E_)==null||r.delete(t)}_$ES(){const t=new Map,r=this.constructor.elementProperties;for(const n of r.keys())this.hasOwnProperty(n)&&(t.set(n,this[n]),delete this[n]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Jk(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$E_)==null||t.forEach(r=>{var n;return(n=r.hostConnected)==null?void 0:n.call(r)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$E_)==null||t.forEach(r=>{var n;return(n=r.hostDisconnected)==null?void 0:n.call(r)})}attributeChangedCallback(t,r,n){this._$AK(t,n)}_$EO(t,r){var n;const i=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,i);if(o!==void 0&&i.reflect===!0){const s=(((n=i.converter)==null?void 0:n.toAttribute)!==void 0?i.converter:pc).toAttribute(r,i.type);this._$Em=t,s==null?this.removeAttribute(o):this.setAttribute(o,s),this._$Em=null}}_$AK(t,r){var n;const i=this.constructor,o=i._$Eh.get(t);if(o!==void 0&&this._$Em!==o){const s=i.getPropertyOptions(o),a=typeof s.converter=="function"?{fromAttribute:s.converter}:((n=s.converter)==null?void 0:n.fromAttribute)!==void 0?s.converter:pc;this._$Em=o,this[o]=a.fromAttribute(r,s.type),this._$Em=null}}requestUpdate(t,r,n){if(t!==void 0){if(n??(n=this.constructor.getPropertyOptions(t)),!(n.hasChanged??Wv)(this[t],r))return;this.C(t,r,n)}this.isUpdatePending===!1&&(this._$Eg=this._$EP())}C(t,r,n){this._$AL.has(t)||this._$AL.set(t,r),n.reflect===!0&&this._$Em!==t&&(this._$ET??(this._$ET=new Set)).add(t)}async _$EP(){this.isUpdatePending=!0;try{await this._$Eg}catch(r){Promise.reject(r)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[o,s]of this._$Ep)this[o]=s;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[o,s]of i)s.wrapped!==!0||this._$AL.has(o)||this[o]===void 0||this.C(o,this[o],s)}let r=!1;const n=this._$AL;try{r=this.shouldUpdate(n),r?(this.willUpdate(n),(t=this._$E_)==null||t.forEach(i=>{var o;return(o=i.hostUpdate)==null?void 0:o.call(i)}),this.update(n)):this._$Ej()}catch(i){throw r=!1,this._$Ej(),i}r&&this._$AE(n)}willUpdate(t){}_$AE(t){var r;(r=this._$E_)==null||r.forEach(n=>{var i;return(i=n.hostUpdated)==null?void 0:i.call(n)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ej(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Eg}shouldUpdate(t){return!0}update(t){this._$ET&&(this._$ET=this._$ET.forEach(r=>this._$EO(r,this[r]))),this._$Ej()}updated(t){}firstUpdated(t){}}Lo.elementStyles=[],Lo.shadowRootOptions={mode:"open"},Lo[Aa("elementProperties")]=new Map,Lo[Aa("finalized")]=new Map,Km==null||Km({ReactiveElement:Lo}),(ps.reactiveElementVersions??(ps.reactiveElementVersions=[])).push("2.0.3");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const vc=globalThis,gc=vc.trustedTypes,Qm=gc?gc.createPolicy("lit-html",{createHTML:e=>e}):void 0,Xb="$lit$",ri=`lit$${(Math.random()+"").slice(9)}$`,Yb="?"+ri,a2=`<${Yb}>`,Yi=document,rl=()=>Yi.createComment(""),nl=e=>e===null||typeof e!="object"&&typeof e!="function",Jb=Array.isArray,l2=e=>Jb(e)||typeof(e==null?void 0:e[Symbol.iterator])=="function",kd=`[ 	
\f\r]`,ra=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Zm=/-->/g,Xm=/>/g,ji=RegExp(`>|${kd}(?:([^\\s"'>=/]+)(${kd}*=${kd}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ym=/'/g,Jm=/"/g,ex=/^(?:script|style|textarea|title)$/i,u2=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),re=u2(1),vs=Symbol.for("lit-noChange"),_t=Symbol.for("lit-nothing"),e0=new WeakMap,Vi=Yi.createTreeWalker(Yi,129);function tx(e,t){if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Qm!==void 0?Qm.createHTML(t):t}const c2=(e,t)=>{const r=e.length-1,n=[];let i,o=t===2?"<svg>":"",s=ra;for(let a=0;a<r;a++){const l=e[a];let u,c,h=-1,d=0;for(;d<l.length&&(s.lastIndex=d,c=s.exec(l),c!==null);)d=s.lastIndex,s===ra?c[1]==="!--"?s=Zm:c[1]!==void 0?s=Xm:c[2]!==void 0?(ex.test(c[2])&&(i=RegExp("</"+c[2],"g")),s=ji):c[3]!==void 0&&(s=ji):s===ji?c[0]===">"?(s=i??ra,h=-1):c[1]===void 0?h=-2:(h=s.lastIndex-c[2].length,u=c[1],s=c[3]===void 0?ji:c[3]==='"'?Jm:Ym):s===Jm||s===Ym?s=ji:s===Zm||s===Xm?s=ra:(s=ji,i=void 0);const m=s===ji&&e[a+1].startsWith("/>")?" ":"";o+=s===ra?l+a2:h>=0?(n.push(u),l.slice(0,h)+Xb+l.slice(h)+ri+m):l+ri+(h===-2?a:m)}return[tx(e,o+(e[r]||"<?>")+(t===2?"</svg>":"")),n]};class il{constructor({strings:t,_$litType$:r},n){let i;this.parts=[];let o=0,s=0;const a=t.length-1,l=this.parts,[u,c]=c2(t,r);if(this.el=il.createElement(u,n),Vi.currentNode=this.el.content,r===2){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(i=Vi.nextNode())!==null&&l.length<a;){if(i.nodeType===1){if(i.hasAttributes())for(const h of i.getAttributeNames())if(h.endsWith(Xb)){const d=c[s++],m=i.getAttribute(h).split(ri),y=/([.?@])?(.*)/.exec(d);l.push({type:1,index:o,name:y[2],strings:m,ctor:y[1]==="."?d2:y[1]==="?"?f2:y[1]==="@"?p2:ih}),i.removeAttribute(h)}else h.startsWith(ri)&&(l.push({type:6,index:o}),i.removeAttribute(h));if(ex.test(i.tagName)){const h=i.textContent.split(ri),d=h.length-1;if(d>0){i.textContent=gc?gc.emptyScript:"";for(let m=0;m<d;m++)i.append(h[m],rl()),Vi.nextNode(),l.push({type:2,index:++o});i.append(h[d],rl())}}}else if(i.nodeType===8)if(i.data===Yb)l.push({type:2,index:o});else{let h=-1;for(;(h=i.data.indexOf(ri,h+1))!==-1;)l.push({type:7,index:o}),h+=ri.length-1}o++}}static createElement(t,r){const n=Yi.createElement("template");return n.innerHTML=t,n}}function gs(e,t,r=e,n){var i,o;if(t===vs)return t;let s=n!==void 0?(i=r._$Co)==null?void 0:i[n]:r._$Cl;const a=nl(t)?void 0:t._$litDirective$;return(s==null?void 0:s.constructor)!==a&&((o=s==null?void 0:s._$AO)==null||o.call(s,!1),a===void 0?s=void 0:(s=new a(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=gs(e,s._$AS(e,t.values),s,n)),t}class h2{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:r},parts:n}=this._$AD,i=((t==null?void 0:t.creationScope)??Yi).importNode(r,!0);Vi.currentNode=i;let o=Vi.nextNode(),s=0,a=0,l=n[0];for(;l!==void 0;){if(s===l.index){let u;l.type===2?u=new Cl(o,o.nextSibling,this,t):l.type===1?u=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(u=new v2(o,this,t)),this._$AV.push(u),l=n[++a]}s!==(l==null?void 0:l.index)&&(o=Vi.nextNode(),s++)}return Vi.currentNode=Yi,i}p(t){let r=0;for(const n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}}class Cl{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,r,n,i){this.type=2,this._$AH=_t,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const r=this._$AM;return r!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=gs(this,t,r),nl(t)?t===_t||t==null||t===""?(this._$AH!==_t&&this._$AR(),this._$AH=_t):t!==this._$AH&&t!==vs&&this._(t):t._$litType$!==void 0?this.g(t):t.nodeType!==void 0?this.$(t):l2(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==_t&&nl(this._$AH)?this._$AA.nextSibling.data=t:this.$(Yi.createTextNode(t)),this._$AH=t}g(t){var r;const{values:n,_$litType$:i}=t,o=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=il.createElement(tx(i.h,i.h[0]),this.options)),i);if(((r=this._$AH)==null?void 0:r._$AD)===o)this._$AH.p(n);else{const s=new h2(o,this),a=s.u(this.options);s.p(n),this.$(a),this._$AH=s}}_$AC(t){let r=e0.get(t.strings);return r===void 0&&e0.set(t.strings,r=new il(t)),r}T(t){Jb(this._$AH)||(this._$AH=[],this._$AR());const r=this._$AH;let n,i=0;for(const o of t)i===r.length?r.push(n=new Cl(this.k(rl()),this.k(rl()),this,this.options)):n=r[i],n._$AI(o),i++;i<r.length&&(this._$AR(n&&n._$AB.nextSibling,i),r.length=i)}_$AR(t=this._$AA.nextSibling,r){var n;for((n=this._$AP)==null?void 0:n.call(this,!1,!0,r);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var r;this._$AM===void 0&&(this._$Cv=t,(r=this._$AP)==null||r.call(this,t))}}class ih{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,i,o){this.type=1,this._$AH=_t,this._$AN=void 0,this.element=t,this.name=r,this._$AM=i,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=_t}_$AI(t,r=this,n,i){const o=this.strings;let s=!1;if(o===void 0)t=gs(this,t,r,0),s=!nl(t)||t!==this._$AH&&t!==vs,s&&(this._$AH=t);else{const a=t;let l,u;for(t=o[0],l=0;l<o.length-1;l++)u=gs(this,a[n+l],r,l),u===vs&&(u=this._$AH[l]),s||(s=!nl(u)||u!==this._$AH[l]),u===_t?t=_t:t!==_t&&(t+=(u??"")+o[l+1]),this._$AH[l]=u}s&&!i&&this.O(t)}O(t){t===_t?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class d2 extends ih{constructor(){super(...arguments),this.type=3}O(t){this.element[this.name]=t===_t?void 0:t}}class f2 extends ih{constructor(){super(...arguments),this.type=4}O(t){this.element.toggleAttribute(this.name,!!t&&t!==_t)}}class p2 extends ih{constructor(t,r,n,i,o){super(t,r,n,i,o),this.type=5}_$AI(t,r=this){if((t=gs(this,t,r,0)??_t)===vs)return;const n=this._$AH,i=t===_t&&n!==_t||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==_t&&(n===_t||i);i&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var r;typeof this._$AH=="function"?this._$AH.call(((r=this.options)==null?void 0:r.host)??this.element,t):this._$AH.handleEvent(t)}}class v2{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){gs(this,t)}}const t0=vc.litHtmlPolyfillSupport;t0==null||t0(il,Cl),(vc.litHtmlVersions??(vc.litHtmlVersions=[])).push("3.1.1");const g2=(e,t,r)=>{const n=(r==null?void 0:r.renderBefore)??t;let i=n._$litPart$;if(i===void 0){const o=(r==null?void 0:r.renderBefore)??null;n._$litPart$=i=new Cl(t.insertBefore(rl(),o),o,void 0,r??{})}return i._$AI(e),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class Re extends Lo{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const r=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=r.firstChild),r}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=g2(r,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return vs}}var r0;Re._$litElement$=!0,Re.finalized=!0,(r0=globalThis.litElementHydrateSupport)==null||r0.call(globalThis,{LitElement:Re});const n0=globalThis.litElementPolyfillSupport;n0==null||n0({LitElement:Re});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.0.3");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const lt=e=>(t,r)=>{r!==void 0?r.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const m2={attribute:!0,type:String,converter:pc,reflect:!1,hasChanged:Wv},y2=(e=m2,t,r)=>{const{kind:n,metadata:i}=r;let o=globalThis.litPropertyMetadata.get(i);if(o===void 0&&globalThis.litPropertyMetadata.set(i,o=new Map),o.set(r.name,e),n==="accessor"){const{name:s}=r;return{set(a){const l=t.get.call(this);t.set.call(this,a),this.requestUpdate(s,l,e)},init(a){return a!==void 0&&this.C(s,void 0,e),a}}}if(n==="setter"){const{name:s}=r;return function(a){const l=this[s];t.call(this,a),this.requestUpdate(s,l,e)}}throw Error("Unsupported decorator location: "+n)};function J(e){return(t,r)=>typeof r=="object"?y2(e,t,r):((n,i,o)=>{const s=i.hasOwnProperty(o);return i.constructor.createProperty(o,s?{...n,wrapped:!0}:n),s?Object.getOwnPropertyDescriptor(i,o):void 0})(e,t,r)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function po(e){return J({...e,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const i0=(e,t,r)=>(r.configurable=!0,r.enumerable=!0,Reflect.decorate&&typeof t!="object"&&Object.defineProperty(e,t,r),r);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Br(e,t){return(r,n,i)=>{const o=s=>{var a;return((a=s.renderRoot)==null?void 0:a.querySelector(e))??null};if(t){const{get:s,set:a}=typeof n=="object"?r:i??(()=>{const l=Symbol();return{get(){return this[l]},set(u){this[l]=u}}})();return i0(r,n,{get(){let l=s.call(this);return l===void 0&&(l=o(this),(l!==null||this.hasUpdated)&&a.call(this,l)),l}})}return i0(r,n,{get(){return o(this)}})}}const mi=function(){if(typeof globalThis<"u")return globalThis;if(typeof global<"u")return global;if(typeof self<"u")return self;if(typeof window<"u")return window;try{return new Function("return this")()}catch{return{}}}();mi.trustedTypes===void 0&&(mi.trustedTypes={createPolicy:(e,t)=>t});const rx={configurable:!1,enumerable:!1,writable:!1};mi.FAST===void 0&&Reflect.defineProperty(mi,"FAST",Object.assign({value:Object.create(null)},rx));const ol=mi.FAST;if(ol.getById===void 0){const e=Object.create(null);Reflect.defineProperty(ol,"getById",Object.assign({value(t,r){let n=e[t];return n===void 0&&(n=r?e[t]=r():null),n}},rx))}const ja=Object.freeze([]);function nx(){const e=new WeakMap;return function(t){let r=e.get(t);if(r===void 0){let n=Reflect.getPrototypeOf(t);for(;r===void 0&&n!==null;)r=e.get(n),n=Reflect.getPrototypeOf(n);r=r===void 0?[]:r.slice(0),e.set(t,r)}return r}}const Sd=mi.FAST.getById(1,()=>{const e=[],t=[];function r(){if(t.length)throw t.shift()}function n(s){try{s.call()}catch(a){t.push(a),setTimeout(r,0)}}function i(){let s=0;for(;s<e.length;)if(n(e[s]),s++,s>1024){for(let a=0,l=e.length-s;a<l;a++)e[a]=e[a+s];e.length-=s,s=0}e.length=0}function o(s){e.length<1&&mi.requestAnimationFrame(i),e.push(s)}return Object.freeze({enqueue:o,process:i})}),ix=mi.trustedTypes.createPolicy("fast-html",{createHTML:e=>e});let Cd=ix;const Na=`fast-${Math.random().toString(36).substring(2,8)}`,ox=`${Na}{`,Kv=`}${Na}`,_e=Object.freeze({supportsAdoptedStyleSheets:Array.isArray(document.adoptedStyleSheets)&&"replace"in CSSStyleSheet.prototype,setHTMLPolicy(e){if(Cd!==ix)throw new Error("The HTML policy can only be set once.");Cd=e},createHTML(e){return Cd.createHTML(e)},isMarker(e){return e&&e.nodeType===8&&e.data.startsWith(Na)},extractDirectiveIndexFromMarker(e){return parseInt(e.data.replace(`${Na}:`,""))},createInterpolationPlaceholder(e){return`${ox}${e}${Kv}`},createCustomAttributePlaceholder(e,t){return`${e}="${this.createInterpolationPlaceholder(t)}"`},createBlockPlaceholder(e){return`<!--${Na}:${e}-->`},queueUpdate:Sd.enqueue,processUpdates:Sd.process,nextUpdate(){return new Promise(Sd.enqueue)},setAttribute(e,t,r){r==null?e.removeAttribute(t):e.setAttribute(t,r)},setBooleanAttribute(e,t,r){r?e.setAttribute(t,""):e.removeAttribute(t)},removeChildNodes(e){for(let t=e.firstChild;t!==null;t=e.firstChild)e.removeChild(t)},createTemplateWalker(e){return document.createTreeWalker(e,133,null,!1)}});class up{constructor(t,r){this.sub1=void 0,this.sub2=void 0,this.spillover=void 0,this.source=t,this.sub1=r}has(t){return this.spillover===void 0?this.sub1===t||this.sub2===t:this.spillover.indexOf(t)!==-1}subscribe(t){const r=this.spillover;if(r===void 0){if(this.has(t))return;if(this.sub1===void 0){this.sub1=t;return}if(this.sub2===void 0){this.sub2=t;return}this.spillover=[this.sub1,this.sub2,t],this.sub1=void 0,this.sub2=void 0}else r.indexOf(t)===-1&&r.push(t)}unsubscribe(t){const r=this.spillover;if(r===void 0)this.sub1===t?this.sub1=void 0:this.sub2===t&&(this.sub2=void 0);else{const n=r.indexOf(t);n!==-1&&r.splice(n,1)}}notify(t){const r=this.spillover,n=this.source;if(r===void 0){const i=this.sub1,o=this.sub2;i!==void 0&&i.handleChange(n,t),o!==void 0&&o.handleChange(n,t)}else for(let i=0,o=r.length;i<o;++i)r[i].handleChange(n,t)}}class sx{constructor(t){this.subscribers={},this.sourceSubscribers=null,this.source=t}notify(t){var r;const n=this.subscribers[t];n!==void 0&&n.notify(t),(r=this.sourceSubscribers)===null||r===void 0||r.notify(t)}subscribe(t,r){var n;if(r){let i=this.subscribers[r];i===void 0&&(this.subscribers[r]=i=new up(this.source)),i.subscribe(t)}else this.sourceSubscribers=(n=this.sourceSubscribers)!==null&&n!==void 0?n:new up(this.source),this.sourceSubscribers.subscribe(t)}unsubscribe(t,r){var n;if(r){const i=this.subscribers[r];i!==void 0&&i.unsubscribe(t)}else(n=this.sourceSubscribers)===null||n===void 0||n.unsubscribe(t)}}const we=ol.getById(2,()=>{const e=/(:|&&|\|\||if)/,t=new WeakMap,r=_e.queueUpdate;let n,i=u=>{throw new Error("Must call enableArrayObservation before observing arrays.")};function o(u){let c=u.$fastController||t.get(u);return c===void 0&&(Array.isArray(u)?c=i(u):t.set(u,c=new sx(u))),c}const s=nx();class a{constructor(c){this.name=c,this.field=`_${c}`,this.callback=`${c}Changed`}getValue(c){return n!==void 0&&n.watch(c,this.name),c[this.field]}setValue(c,h){const d=this.field,m=c[d];if(m!==h){c[d]=h;const y=c[this.callback];typeof y=="function"&&y.call(c,m,h),o(c).notify(this.name)}}}class l extends up{constructor(c,h,d=!1){super(c,h),this.binding=c,this.isVolatileBinding=d,this.needsRefresh=!0,this.needsQueue=!0,this.first=this,this.last=null,this.propertySource=void 0,this.propertyName=void 0,this.notifier=void 0,this.next=void 0}observe(c,h){this.needsRefresh&&this.last!==null&&this.disconnect();const d=n;n=this.needsRefresh?this:void 0,this.needsRefresh=this.isVolatileBinding;const m=this.binding(c,h);return n=d,m}disconnect(){if(this.last!==null){let c=this.first;for(;c!==void 0;)c.notifier.unsubscribe(this,c.propertyName),c=c.next;this.last=null,this.needsRefresh=this.needsQueue=!0}}watch(c,h){const d=this.last,m=o(c),y=d===null?this.first:{};if(y.propertySource=c,y.propertyName=h,y.notifier=m,m.subscribe(this,h),d!==null){if(!this.needsRefresh){let w;n=void 0,w=d.propertySource[d.propertyName],n=this,c===w&&(this.needsRefresh=!0)}d.next=y}this.last=y}handleChange(){this.needsQueue&&(this.needsQueue=!1,r(this))}call(){this.last!==null&&(this.needsQueue=!0,this.notify(this))}records(){let c=this.first;return{next:()=>{const h=c;return h===void 0?{value:void 0,done:!0}:(c=c.next,{value:h,done:!1})},[Symbol.iterator]:function(){return this}}}}return Object.freeze({setArrayObserverFactory(u){i=u},getNotifier:o,track(u,c){n!==void 0&&n.watch(u,c)},trackVolatile(){n!==void 0&&(n.needsRefresh=!0)},notify(u,c){o(u).notify(c)},defineProperty(u,c){typeof c=="string"&&(c=new a(c)),s(u).push(c),Reflect.defineProperty(u,c.name,{enumerable:!0,get:function(){return c.getValue(this)},set:function(h){c.setValue(this,h)}})},getAccessors:s,binding(u,c,h=this.isVolatileBinding(u)){return new l(u,c,h)},isVolatileBinding(u){return e.test(u.toString())}})});function be(e,t){we.defineProperty(e,t)}function b2(e,t,r){return Object.assign({},r,{get:function(){return we.trackVolatile(),r.get.apply(this)}})}const o0=ol.getById(3,()=>{let e=null;return{get(){return e},set(t){e=t}}});class sl{constructor(){this.index=0,this.length=0,this.parent=null,this.parentContext=null}get event(){return o0.get()}get isEven(){return this.index%2===0}get isOdd(){return this.index%2!==0}get isFirst(){return this.index===0}get isInMiddle(){return!this.isFirst&&!this.isLast}get isLast(){return this.index===this.length-1}static setEvent(t){o0.set(t)}}we.defineProperty(sl.prototype,"index");we.defineProperty(sl.prototype,"length");const La=Object.seal(new sl);class Gv{constructor(){this.targetIndex=0}}class ax extends Gv{constructor(){super(...arguments),this.createPlaceholder=_e.createInterpolationPlaceholder}}class lx extends Gv{constructor(t,r,n){super(),this.name=t,this.behavior=r,this.options=n}createPlaceholder(t){return _e.createCustomAttributePlaceholder(this.name,t)}createBehavior(t){return new this.behavior(t,this.options)}}function x2(e,t){this.source=e,this.context=t,this.bindingObserver===null&&(this.bindingObserver=we.binding(this.binding,this,this.isBindingVolatile)),this.updateTarget(this.bindingObserver.observe(e,t))}function w2(e,t){this.source=e,this.context=t,this.target.addEventListener(this.targetName,this)}function $2(){this.bindingObserver.disconnect(),this.source=null,this.context=null}function _2(){this.bindingObserver.disconnect(),this.source=null,this.context=null;const e=this.target.$fastView;e!==void 0&&e.isComposed&&(e.unbind(),e.needsBindOnly=!0)}function k2(){this.target.removeEventListener(this.targetName,this),this.source=null,this.context=null}function S2(e){_e.setAttribute(this.target,this.targetName,e)}function C2(e){_e.setBooleanAttribute(this.target,this.targetName,e)}function E2(e){if(e==null&&(e=""),e.create){this.target.textContent="";let t=this.target.$fastView;t===void 0?t=e.create():this.target.$fastTemplate!==e&&(t.isComposed&&(t.remove(),t.unbind()),t=e.create()),t.isComposed?t.needsBindOnly&&(t.needsBindOnly=!1,t.bind(this.source,this.context)):(t.isComposed=!0,t.bind(this.source,this.context),t.insertBefore(this.target),this.target.$fastView=t,this.target.$fastTemplate=e)}else{const t=this.target.$fastView;t!==void 0&&t.isComposed&&(t.isComposed=!1,t.remove(),t.needsBindOnly?t.needsBindOnly=!1:t.unbind()),this.target.textContent=e}}function O2(e){this.target[this.targetName]=e}function T2(e){const t=this.classVersions||Object.create(null),r=this.target;let n=this.version||0;if(e!=null&&e.length){const i=e.split(/\s+/);for(let o=0,s=i.length;o<s;++o){const a=i[o];a!==""&&(t[a]=n,r.classList.add(a))}}if(this.classVersions=t,this.version=n+1,n!==0){n-=1;for(const i in t)t[i]===n&&r.classList.remove(i)}}class Qv extends ax{constructor(t){super(),this.binding=t,this.bind=x2,this.unbind=$2,this.updateTarget=S2,this.isBindingVolatile=we.isVolatileBinding(this.binding)}get targetName(){return this.originalTargetName}set targetName(t){if(this.originalTargetName=t,t!==void 0)switch(t[0]){case":":if(this.cleanedTargetName=t.substr(1),this.updateTarget=O2,this.cleanedTargetName==="innerHTML"){const r=this.binding;this.binding=(n,i)=>_e.createHTML(r(n,i))}break;case"?":this.cleanedTargetName=t.substr(1),this.updateTarget=C2;break;case"@":this.cleanedTargetName=t.substr(1),this.bind=w2,this.unbind=k2;break;default:this.cleanedTargetName=t,t==="class"&&(this.updateTarget=T2);break}}targetAtContent(){this.updateTarget=E2,this.unbind=_2}createBehavior(t){return new P2(t,this.binding,this.isBindingVolatile,this.bind,this.unbind,this.updateTarget,this.cleanedTargetName)}}class P2{constructor(t,r,n,i,o,s,a){this.source=null,this.context=null,this.bindingObserver=null,this.target=t,this.binding=r,this.isBindingVolatile=n,this.bind=i,this.unbind=o,this.updateTarget=s,this.targetName=a}handleChange(){this.updateTarget(this.bindingObserver.observe(this.source,this.context))}handleEvent(t){sl.setEvent(t);const r=this.binding(this.source,this.context);sl.setEvent(null),r!==!0&&t.preventDefault()}}let Ed=null;class Zv{addFactory(t){t.targetIndex=this.targetIndex,this.behaviorFactories.push(t)}captureContentBinding(t){t.targetAtContent(),this.addFactory(t)}reset(){this.behaviorFactories=[],this.targetIndex=-1}release(){Ed=this}static borrow(t){const r=Ed||new Zv;return r.directives=t,r.reset(),Ed=null,r}}function A2(e){if(e.length===1)return e[0];let t;const r=e.length,n=e.map(s=>typeof s=="string"?()=>s:(t=s.targetName||t,s.binding)),i=(s,a)=>{let l="";for(let u=0;u<r;++u)l+=n[u](s,a);return l},o=new Qv(i);return o.targetName=t,o}const j2=Kv.length;function ux(e,t){const r=t.split(ox);if(r.length===1)return null;const n=[];for(let i=0,o=r.length;i<o;++i){const s=r[i],a=s.indexOf(Kv);let l;if(a===-1)l=s;else{const u=parseInt(s.substring(0,a));n.push(e.directives[u]),l=s.substring(a+j2)}l!==""&&n.push(l)}return n}function s0(e,t,r=!1){const n=t.attributes;for(let i=0,o=n.length;i<o;++i){const s=n[i],a=s.value,l=ux(e,a);let u=null;l===null?r&&(u=new Qv(()=>a),u.targetName=s.name):u=A2(l),u!==null&&(t.removeAttributeNode(s),i--,o--,e.addFactory(u))}}function N2(e,t,r){const n=ux(e,t.textContent);if(n!==null){let i=t;for(let o=0,s=n.length;o<s;++o){const a=n[o],l=o===0?t:i.parentNode.insertBefore(document.createTextNode(""),i.nextSibling);typeof a=="string"?l.textContent=a:(l.textContent=" ",e.captureContentBinding(a)),i=l,e.targetIndex++,l!==t&&r.nextNode()}e.targetIndex--}}function L2(e,t){const r=e.content;document.adoptNode(r);const n=Zv.borrow(t);s0(n,e,!0);const i=n.behaviorFactories;n.reset();const o=_e.createTemplateWalker(r);let s;for(;s=o.nextNode();)switch(n.targetIndex++,s.nodeType){case 1:s0(n,s);break;case 3:N2(n,s,o);break;case 8:_e.isMarker(s)&&n.addFactory(t[_e.extractDirectiveIndexFromMarker(s)])}let a=0;(_e.isMarker(r.firstChild)||r.childNodes.length===1&&t.length)&&(r.insertBefore(document.createComment(""),r.firstChild),a=-1);const l=n.behaviorFactories;return n.release(),{fragment:r,viewBehaviorFactories:l,hostBehaviorFactories:i,targetOffset:a}}const Od=document.createRange();class D2{constructor(t,r){this.fragment=t,this.behaviors=r,this.source=null,this.context=null,this.firstChild=t.firstChild,this.lastChild=t.lastChild}appendTo(t){t.appendChild(this.fragment)}insertBefore(t){if(this.fragment.hasChildNodes())t.parentNode.insertBefore(this.fragment,t);else{const r=this.lastChild;if(t.previousSibling===r)return;const n=t.parentNode;let i=this.firstChild,o;for(;i!==r;)o=i.nextSibling,n.insertBefore(i,t),i=o;n.insertBefore(r,t)}}remove(){const t=this.fragment,r=this.lastChild;let n=this.firstChild,i;for(;n!==r;)i=n.nextSibling,t.appendChild(n),n=i;t.appendChild(r)}dispose(){const t=this.firstChild.parentNode,r=this.lastChild;let n=this.firstChild,i;for(;n!==r;)i=n.nextSibling,t.removeChild(n),n=i;t.removeChild(r);const o=this.behaviors,s=this.source;for(let a=0,l=o.length;a<l;++a)o[a].unbind(s)}bind(t,r){const n=this.behaviors;if(this.source!==t)if(this.source!==null){const i=this.source;this.source=t,this.context=r;for(let o=0,s=n.length;o<s;++o){const a=n[o];a.unbind(i),a.bind(t,r)}}else{this.source=t,this.context=r;for(let i=0,o=n.length;i<o;++i)n[i].bind(t,r)}}unbind(){if(this.source===null)return;const t=this.behaviors,r=this.source;for(let n=0,i=t.length;n<i;++n)t[n].unbind(r);this.source=null}static disposeContiguousBatch(t){if(t.length!==0){Od.setStartBefore(t[0].firstChild),Od.setEndAfter(t[t.length-1].lastChild),Od.deleteContents();for(let r=0,n=t.length;r<n;++r){const i=t[r],o=i.behaviors,s=i.source;for(let a=0,l=o.length;a<l;++a)o[a].unbind(s)}}}}class a0{constructor(t,r){this.behaviorCount=0,this.hasHostBehaviors=!1,this.fragment=null,this.targetOffset=0,this.viewBehaviorFactories=null,this.hostBehaviorFactories=null,this.html=t,this.directives=r}create(t){if(this.fragment===null){let u;const c=this.html;if(typeof c=="string"){u=document.createElement("template"),u.innerHTML=_e.createHTML(c);const d=u.content.firstElementChild;d!==null&&d.tagName==="TEMPLATE"&&(u=d)}else u=c;const h=L2(u,this.directives);this.fragment=h.fragment,this.viewBehaviorFactories=h.viewBehaviorFactories,this.hostBehaviorFactories=h.hostBehaviorFactories,this.targetOffset=h.targetOffset,this.behaviorCount=this.viewBehaviorFactories.length+this.hostBehaviorFactories.length,this.hasHostBehaviors=this.hostBehaviorFactories.length>0}const r=this.fragment.cloneNode(!0),n=this.viewBehaviorFactories,i=new Array(this.behaviorCount),o=_e.createTemplateWalker(r);let s=0,a=this.targetOffset,l=o.nextNode();for(let u=n.length;s<u;++s){const c=n[s],h=c.targetIndex;for(;l!==null;)if(a===h){i[s]=c.createBehavior(l);break}else l=o.nextNode(),a++}if(this.hasHostBehaviors){const u=this.hostBehaviorFactories;for(let c=0,h=u.length;c<h;++c,++s)i[s]=u[c].createBehavior(t)}return new D2(r,i)}render(t,r,n){typeof r=="string"&&(r=document.getElementById(r)),n===void 0&&(n=r);const i=this.create(n);return i.bind(t,La),i.appendTo(r),i}}const R2=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function St(e,...t){const r=[];let n="";for(let i=0,o=e.length-1;i<o;++i){const s=e[i];let a=t[i];if(n+=s,a instanceof a0){const l=a;a=()=>l}if(typeof a=="function"&&(a=new Qv(a)),a instanceof ax){const l=R2.exec(s);l!==null&&(a.targetName=l[2])}a instanceof Gv?(n+=a.createPlaceholder(r.length),r.push(a)):n+=a}return n+=e[e.length-1],new a0(n,r)}class Yt{constructor(){this.targets=new WeakSet}addStylesTo(t){this.targets.add(t)}removeStylesFrom(t){this.targets.delete(t)}isAttachedTo(t){return this.targets.has(t)}withBehaviors(...t){return this.behaviors=this.behaviors===null?t:this.behaviors.concat(t),this}}Yt.create=(()=>{if(_e.supportsAdoptedStyleSheets){const e=new Map;return t=>new M2(t,e)}return e=>new V2(e)})();function Xv(e){return e.map(t=>t instanceof Yt?Xv(t.styles):[t]).reduce((t,r)=>t.concat(r),[])}function cx(e){return e.map(t=>t instanceof Yt?t.behaviors:null).reduce((t,r)=>r===null?t:(t===null&&(t=[]),t.concat(r)),null)}let hx=(e,t)=>{e.adoptedStyleSheets=[...e.adoptedStyleSheets,...t]},dx=(e,t)=>{e.adoptedStyleSheets=e.adoptedStyleSheets.filter(r=>t.indexOf(r)===-1)};if(_e.supportsAdoptedStyleSheets)try{document.adoptedStyleSheets.push(),document.adoptedStyleSheets.splice(),hx=(e,t)=>{e.adoptedStyleSheets.push(...t)},dx=(e,t)=>{for(const r of t){const n=e.adoptedStyleSheets.indexOf(r);n!==-1&&e.adoptedStyleSheets.splice(n,1)}}}catch{}class M2 extends Yt{constructor(t,r){super(),this.styles=t,this.styleSheetCache=r,this._styleSheets=void 0,this.behaviors=cx(t)}get styleSheets(){if(this._styleSheets===void 0){const t=this.styles,r=this.styleSheetCache;this._styleSheets=Xv(t).map(n=>{if(n instanceof CSSStyleSheet)return n;let i=r.get(n);return i===void 0&&(i=new CSSStyleSheet,i.replaceSync(n),r.set(n,i)),i})}return this._styleSheets}addStylesTo(t){hx(t,this.styleSheets),super.addStylesTo(t)}removeStylesFrom(t){dx(t,this.styleSheets),super.removeStylesFrom(t)}}let I2=0;function F2(){return`fast-style-class-${++I2}`}class V2 extends Yt{constructor(t){super(),this.styles=t,this.behaviors=null,this.behaviors=cx(t),this.styleSheets=Xv(t),this.styleClass=F2()}addStylesTo(t){const r=this.styleSheets,n=this.styleClass;t=this.normalizeTarget(t);for(let i=0;i<r.length;i++){const o=document.createElement("style");o.innerHTML=r[i],o.className=n,t.append(o)}super.addStylesTo(t)}removeStylesFrom(t){t=this.normalizeTarget(t);const r=t.querySelectorAll(`.${this.styleClass}`);for(let n=0,i=r.length;n<i;++n)t.removeChild(r[n]);super.removeStylesFrom(t)}isAttachedTo(t){return super.isAttachedTo(this.normalizeTarget(t))}normalizeTarget(t){return t===document?document.body:t}}const mc=Object.freeze({locate:nx()}),fx={toView(e){return e?"true":"false"},fromView(e){return!(e==null||e==="false"||e===!1||e===0)}},Rt={toView(e){if(e==null)return null;const t=e*1;return isNaN(t)?null:t.toString()},fromView(e){if(e==null)return null;const t=e*1;return isNaN(t)?null:t}};class yc{constructor(t,r,n=r.toLowerCase(),i="reflect",o){this.guards=new Set,this.Owner=t,this.name=r,this.attribute=n,this.mode=i,this.converter=o,this.fieldName=`_${r}`,this.callbackName=`${r}Changed`,this.hasCallback=this.callbackName in t.prototype,i==="boolean"&&o===void 0&&(this.converter=fx)}setValue(t,r){const n=t[this.fieldName],i=this.converter;i!==void 0&&(r=i.fromView(r)),n!==r&&(t[this.fieldName]=r,this.tryReflectToAttribute(t),this.hasCallback&&t[this.callbackName](n,r),t.$fastController.notify(this.name))}getValue(t){return we.track(t,this.name),t[this.fieldName]}onAttributeChangedCallback(t,r){this.guards.has(t)||(this.guards.add(t),this.setValue(t,r),this.guards.delete(t))}tryReflectToAttribute(t){const r=this.mode,n=this.guards;n.has(t)||r==="fromView"||_e.queueUpdate(()=>{n.add(t);const i=t[this.fieldName];switch(r){case"reflect":const o=this.converter;_e.setAttribute(t,this.attribute,o!==void 0?o.toView(i):i);break;case"boolean":_e.setBooleanAttribute(t,this.attribute,i);break}n.delete(t)})}static collect(t,...r){const n=[];r.push(mc.locate(t));for(let i=0,o=r.length;i<o;++i){const s=r[i];if(s!==void 0)for(let a=0,l=s.length;a<l;++a){const u=s[a];typeof u=="string"?n.push(new yc(t,u)):n.push(new yc(t,u.property,u.attribute,u.mode,u.converter))}}return n}}function D(e,t){let r;function n(i,o){arguments.length>1&&(r.property=o),mc.locate(i.constructor).push(r)}if(arguments.length>1){r={},n(e,t);return}return r=e===void 0?{}:e,n}const l0={mode:"open"},u0={},cp=ol.getById(4,()=>{const e=new Map;return Object.freeze({register(t){return e.has(t.type)?!1:(e.set(t.type,t),!0)},getByType(t){return e.get(t)}})});class oh{constructor(t,r=t.definition){typeof r=="string"&&(r={name:r}),this.type=t,this.name=r.name,this.template=r.template;const n=yc.collect(t,r.attributes),i=new Array(n.length),o={},s={};for(let a=0,l=n.length;a<l;++a){const u=n[a];i[a]=u.attribute,o[u.name]=u,s[u.attribute]=u}this.attributes=n,this.observedAttributes=i,this.propertyLookup=o,this.attributeLookup=s,this.shadowOptions=r.shadowOptions===void 0?l0:r.shadowOptions===null?void 0:Object.assign(Object.assign({},l0),r.shadowOptions),this.elementOptions=r.elementOptions===void 0?u0:Object.assign(Object.assign({},u0),r.elementOptions),this.styles=r.styles===void 0?void 0:Array.isArray(r.styles)?Yt.create(r.styles):r.styles instanceof Yt?r.styles:Yt.create([r.styles])}get isDefined(){return!!cp.getByType(this.type)}define(t=customElements){const r=this.type;if(cp.register(this)){const n=this.attributes,i=r.prototype;for(let o=0,s=n.length;o<s;++o)we.defineProperty(i,n[o]);Reflect.defineProperty(r,"observedAttributes",{value:this.observedAttributes,enumerable:!0})}return t.get(this.name)||t.define(this.name,r,this.elementOptions),this}}oh.forType=cp.getByType;const px=new WeakMap,B2={bubbles:!0,composed:!0,cancelable:!0};function Td(e){return e.shadowRoot||px.get(e)||null}class Yv extends sx{constructor(t,r){super(t),this.boundObservables=null,this.behaviors=null,this.needsInitialization=!0,this._template=null,this._styles=null,this._isConnected=!1,this.$fastController=this,this.view=null,this.element=t,this.definition=r;const n=r.shadowOptions;if(n!==void 0){const o=t.attachShadow(n);n.mode==="closed"&&px.set(t,o)}const i=we.getAccessors(t);if(i.length>0){const o=this.boundObservables=Object.create(null);for(let s=0,a=i.length;s<a;++s){const l=i[s].name,u=t[l];u!==void 0&&(delete t[l],o[l]=u)}}}get isConnected(){return we.track(this,"isConnected"),this._isConnected}setIsConnected(t){this._isConnected=t,we.notify(this,"isConnected")}get template(){return this._template}set template(t){this._template!==t&&(this._template=t,this.needsInitialization||this.renderTemplate(t))}get styles(){return this._styles}set styles(t){this._styles!==t&&(this._styles!==null&&this.removeStyles(this._styles),this._styles=t,!this.needsInitialization&&t!==null&&this.addStyles(t))}addStyles(t){const r=Td(this.element)||this.element.getRootNode();if(t instanceof HTMLStyleElement)r.append(t);else if(!t.isAttachedTo(r)){const n=t.behaviors;t.addStylesTo(r),n!==null&&this.addBehaviors(n)}}removeStyles(t){const r=Td(this.element)||this.element.getRootNode();if(t instanceof HTMLStyleElement)r.removeChild(t);else if(t.isAttachedTo(r)){const n=t.behaviors;t.removeStylesFrom(r),n!==null&&this.removeBehaviors(n)}}addBehaviors(t){const r=this.behaviors||(this.behaviors=new Map),n=t.length,i=[];for(let o=0;o<n;++o){const s=t[o];r.has(s)?r.set(s,r.get(s)+1):(r.set(s,1),i.push(s))}if(this._isConnected){const o=this.element;for(let s=0;s<i.length;++s)i[s].bind(o,La)}}removeBehaviors(t,r=!1){const n=this.behaviors;if(n===null)return;const i=t.length,o=[];for(let s=0;s<i;++s){const a=t[s];if(n.has(a)){const l=n.get(a)-1;l===0||r?n.delete(a)&&o.push(a):n.set(a,l)}}if(this._isConnected){const s=this.element;for(let a=0;a<o.length;++a)o[a].unbind(s)}}onConnectedCallback(){if(this._isConnected)return;const t=this.element;this.needsInitialization?this.finishInitialization():this.view!==null&&this.view.bind(t,La);const r=this.behaviors;if(r!==null)for(const[n]of r)n.bind(t,La);this.setIsConnected(!0)}onDisconnectedCallback(){if(!this._isConnected)return;this.setIsConnected(!1);const t=this.view;t!==null&&t.unbind();const r=this.behaviors;if(r!==null){const n=this.element;for(const[i]of r)i.unbind(n)}}onAttributeChangedCallback(t,r,n){const i=this.definition.attributeLookup[t];i!==void 0&&i.onAttributeChangedCallback(this.element,n)}emit(t,r,n){return this._isConnected?this.element.dispatchEvent(new CustomEvent(t,Object.assign(Object.assign({detail:r},B2),n))):!1}finishInitialization(){const t=this.element,r=this.boundObservables;if(r!==null){const i=Object.keys(r);for(let o=0,s=i.length;o<s;++o){const a=i[o];t[a]=r[a]}this.boundObservables=null}const n=this.definition;this._template===null&&(this.element.resolveTemplate?this._template=this.element.resolveTemplate():n.template&&(this._template=n.template||null)),this._template!==null&&this.renderTemplate(this._template),this._styles===null&&(this.element.resolveStyles?this._styles=this.element.resolveStyles():n.styles&&(this._styles=n.styles||null)),this._styles!==null&&this.addStyles(this._styles),this.needsInitialization=!1}renderTemplate(t){const r=this.element,n=Td(r)||r;this.view!==null?(this.view.dispose(),this.view=null):this.needsInitialization||_e.removeChildNodes(n),t&&(this.view=t.render(r,n,r))}static forCustomElement(t){const r=t.$fastController;if(r!==void 0)return r;const n=oh.forType(t.constructor);if(n===void 0)throw new Error("Missing FASTElement definition.");return t.$fastController=new Yv(t,n)}}function c0(e){return class extends e{constructor(){super(),Yv.forCustomElement(this)}$emit(t,r,n){return this.$fastController.emit(t,r,n)}connectedCallback(){this.$fastController.onConnectedCallback()}disconnectedCallback(){this.$fastController.onDisconnectedCallback()}attributeChangedCallback(t,r,n){this.$fastController.onAttributeChangedCallback(t,r,n)}}}const sh=Object.assign(c0(HTMLElement),{from(e){return c0(e)},define(e,t){return new oh(e,t).define().type}});class Jv{createCSS(){return""}createBehavior(){}}function vx(e,t){const r=[];let n="";const i=[];for(let o=0,s=e.length-1;o<s;++o){n+=e[o];let a=t[o];if(a instanceof Jv){const l=a.createBehavior();a=a.createCSS(),l&&i.push(l)}a instanceof Yt||a instanceof CSSStyleSheet?(n.trim()!==""&&(r.push(n),n=""),r.push(a)):n+=a}return n+=e[e.length-1],n.trim()!==""&&r.push(n),{styles:r,behaviors:i}}function ue(e,...t){const{styles:r,behaviors:n}=vx(e,t),i=Yt.create(r);return n.length&&i.withBehaviors(...n),i}class z2 extends Jv{constructor(t,r){super(),this.behaviors=r,this.css="";const n=t.reduce((i,o)=>(typeof o=="string"?this.css+=o:i.push(o),i),[]);n.length&&(this.styles=Yt.create(n))}createBehavior(){return this}createCSS(){return this.css}bind(t){this.styles&&t.$fastController.addStyles(this.styles),this.behaviors.length&&t.$fastController.addBehaviors(this.behaviors)}unbind(t){this.styles&&t.$fastController.removeStyles(this.styles),this.behaviors.length&&t.$fastController.removeBehaviors(this.behaviors)}}function H2(e,...t){const{styles:r,behaviors:n}=vx(e,t);return new z2(r,n)}class U2{constructor(t,r){this.target=t,this.propertyName=r}bind(t){t[this.propertyName]=this.target}unbind(){}}function Jt(e){return new lx("fast-ref",U2,e)}const gx=e=>typeof e=="function",q2=()=>null;function h0(e){return e===void 0?q2:gx(e)?e:()=>e}function eg(e,t,r){const n=gx(e)?e:()=>e,i=h0(t),o=h0(r);return(s,a)=>n(s,a)?i(s,a):o(s,a)}class W2{constructor(t,r){this.target=t,this.options=r,this.source=null}bind(t){const r=this.options.property;this.shouldUpdate=we.getAccessors(t).some(n=>n.name===r),this.source=t,this.updateTarget(this.computeNodes()),this.shouldUpdate&&this.observe()}unbind(){this.updateTarget(ja),this.source=null,this.shouldUpdate&&this.disconnect()}handleEvent(){this.updateTarget(this.computeNodes())}computeNodes(){let t=this.getNodes();return this.options.filter!==void 0&&(t=t.filter(this.options.filter)),t}updateTarget(t){this.source[this.options.property]=t}}class K2 extends W2{constructor(t,r){super(t,r)}observe(){this.target.addEventListener("slotchange",this)}disconnect(){this.target.removeEventListener("slotchange",this)}getNodes(){return this.target.assignedNodes(this.options)}}function vo(e){return typeof e=="string"&&(e={property:e}),new lx("fast-slotted",K2,e)}class js{handleStartContentChange(){this.startContainer.classList.toggle("start",this.start.assignedNodes().length>0)}handleEndContentChange(){this.endContainer.classList.toggle("end",this.end.assignedNodes().length>0)}}const El=(e,t)=>St`
    <span
        part="end"
        ${Jt("endContainer")}
        class=${r=>t.end?"end":void 0}
    >
        <slot name="end" ${Jt("end")} @slotchange="${r=>r.handleEndContentChange()}">
            ${t.end||""}
        </slot>
    </span>
`,Ol=(e,t)=>St`
    <span
        part="start"
        ${Jt("startContainer")}
        class="${r=>t.start?"start":void 0}"
    >
        <slot
            name="start"
            ${Jt("start")}
            @slotchange="${r=>r.handleStartContentChange()}"
        >
            ${t.start||""}
        </slot>
    </span>
`;St`
    <span part="end" ${Jt("endContainer")}>
        <slot
            name="end"
            ${Jt("end")}
            @slotchange="${e=>e.handleEndContentChange()}"
        ></slot>
    </span>
`;St`
    <span part="start" ${Jt("startContainer")}>
        <slot
            name="start"
            ${Jt("start")}
            @slotchange="${e=>e.handleStartContentChange()}"
        ></slot>
    </span>
`;const Pd=new Map;"metadata"in Reflect||(Reflect.metadata=function(e,t){return function(r){Reflect.defineMetadata(e,t,r)}},Reflect.defineMetadata=function(e,t,r){let n=Pd.get(r);n===void 0&&Pd.set(r,n=new Map),n.set(e,t)},Reflect.getOwnMetadata=function(e,t){const r=Pd.get(t);if(r!==void 0)return r.get(e)});class G2{constructor(t,r){this.container=t,this.key=r}instance(t){return this.registerResolver(0,t)}singleton(t){return this.registerResolver(1,t)}transient(t){return this.registerResolver(2,t)}callback(t){return this.registerResolver(3,t)}cachedCallback(t){return this.registerResolver(3,yx(t))}aliasTo(t){return this.registerResolver(5,t)}registerResolver(t,r){const{container:n,key:i}=this;return this.container=this.key=void 0,n.registerResolver(i,new Tr(i,t,r))}}function na(e){const t=e.slice(),r=Object.keys(e),n=r.length;let i;for(let o=0;o<n;++o)i=r[o],bx(i)||(t[i]=e[i]);return t}const Q2=Object.freeze({none(e){throw Error(`${e.toString()} not registered, did you forget to add @singleton()?`)},singleton(e){return new Tr(e,1,e)},transient(e){return new Tr(e,2,e)}}),Ad=Object.freeze({default:Object.freeze({parentLocator:()=>null,responsibleForOwnerRequests:!1,defaultResolver:Q2.singleton})}),d0=new Map;function f0(e){return t=>Reflect.getOwnMetadata(e,t)}let p0=null;const qe=Object.freeze({createContainer(e){return new Da(null,Object.assign({},Ad.default,e))},findResponsibleContainer(e){const t=e.$$container$$;return t&&t.responsibleForOwnerRequests?t:qe.findParentContainer(e)},findParentContainer(e){const t=new CustomEvent(mx,{bubbles:!0,composed:!0,cancelable:!0,detail:{container:void 0}});return e.dispatchEvent(t),t.detail.container||qe.getOrCreateDOMContainer()},getOrCreateDOMContainer(e,t){return e?e.$$container$$||new Da(e,Object.assign({},Ad.default,t,{parentLocator:qe.findParentContainer})):p0||(p0=new Da(null,Object.assign({},Ad.default,t,{parentLocator:()=>null})))},getDesignParamtypes:f0("design:paramtypes"),getAnnotationParamtypes:f0("di:paramtypes"),getOrCreateAnnotationParamTypes(e){let t=this.getAnnotationParamtypes(e);return t===void 0&&Reflect.defineMetadata("di:paramtypes",t=[],e),t},getDependencies(e){let t=d0.get(e);if(t===void 0){const r=e.inject;if(r===void 0){const n=qe.getDesignParamtypes(e),i=qe.getAnnotationParamtypes(e);if(n===void 0)if(i===void 0){const o=Object.getPrototypeOf(e);typeof o=="function"&&o!==Function.prototype?t=na(qe.getDependencies(o)):t=[]}else t=na(i);else if(i===void 0)t=na(n);else{t=na(n);let o=i.length,s;for(let u=0;u<o;++u)s=i[u],s!==void 0&&(t[u]=s);const a=Object.keys(i);o=a.length;let l;for(let u=0;u<o;++u)l=a[u],bx(l)||(t[l]=i[l])}}else t=na(r);d0.set(e,t)}return t},defineProperty(e,t,r,n=!1){const i=`$di_${t}`;Reflect.defineProperty(e,t,{get:function(){let o=this[i];if(o===void 0&&(o=(this instanceof HTMLElement?qe.findResponsibleContainer(this):qe.getOrCreateDOMContainer()).get(r),this[i]=o,n&&this instanceof sh)){const s=this.$fastController,a=()=>{const l=qe.findResponsibleContainer(this).get(r),u=this[i];l!==u&&(this[i]=o,s.notify(t))};s.subscribe({handleChange:a},"isConnected")}return o}})},createInterface(e,t){const r=typeof e=="function"?e:t,n=typeof e=="string"?e:e&&"friendlyName"in e&&e.friendlyName||iS,i=typeof e=="string"?!1:e&&"respectConnection"in e&&e.respectConnection||!1,o=function(s,a,l){if(s==null||new.target!==void 0)throw new Error(`No registration for interface: '${o.friendlyName}'`);if(a)qe.defineProperty(s,a,o,i);else{const u=qe.getOrCreateAnnotationParamTypes(s);u[l]=o}};return o.$isInterface=!0,o.friendlyName=n??"(anonymous)",r!=null&&(o.register=function(s,a){return r(new G2(s,a??o))}),o.toString=function(){return`InterfaceSymbol<${o.friendlyName}>`},o},inject(...e){return function(t,r,n){if(typeof n=="number"){const i=qe.getOrCreateAnnotationParamTypes(t),o=e[0];o!==void 0&&(i[n]=o)}else if(r)qe.defineProperty(t,r,e[0]);else{const i=n?qe.getOrCreateAnnotationParamTypes(n.value):qe.getOrCreateAnnotationParamTypes(t);let o;for(let s=0;s<e.length;++s)o=e[s],o!==void 0&&(i[s]=o)}}},transient(e){return e.register=function(t){return al.transient(e,e).register(t)},e.registerInRequestor=!1,e},singleton(e,t=X2){return e.register=function(r){return al.singleton(e,e).register(r)},e.registerInRequestor=t.scoped,e}}),Z2=qe.createInterface("Container");qe.inject;const X2={scoped:!1};class Tr{constructor(t,r,n){this.key=t,this.strategy=r,this.state=n,this.resolving=!1}get $isResolver(){return!0}register(t){return t.registerResolver(this.key,this)}resolve(t,r){switch(this.strategy){case 0:return this.state;case 1:{if(this.resolving)throw new Error(`Cyclic dependency found: ${this.state.name}`);return this.resolving=!0,this.state=t.getFactory(this.state).construct(r),this.strategy=0,this.resolving=!1,this.state}case 2:{const n=t.getFactory(this.state);if(n===null)throw new Error(`Resolver for ${String(this.key)} returned a null factory`);return n.construct(r)}case 3:return this.state(t,r,this);case 4:return this.state[0].resolve(t,r);case 5:return r.get(this.state);default:throw new Error(`Invalid resolver strategy specified: ${this.strategy}.`)}}getFactory(t){var r,n,i;switch(this.strategy){case 1:case 2:return t.getFactory(this.state);case 5:return(i=(n=(r=t.getResolver(this.state))===null||r===void 0?void 0:r.getFactory)===null||n===void 0?void 0:n.call(r,t))!==null&&i!==void 0?i:null;default:return null}}}function v0(e){return this.get(e)}function Y2(e,t){return t(e)}class J2{constructor(t,r){this.Type=t,this.dependencies=r,this.transformers=null}construct(t,r){let n;return r===void 0?n=new this.Type(...this.dependencies.map(v0,t)):n=new this.Type(...this.dependencies.map(v0,t),...r),this.transformers==null?n:this.transformers.reduce(Y2,n)}registerTransformer(t){(this.transformers||(this.transformers=[])).push(t)}}const eS={$isResolver:!0,resolve(e,t){return t}};function Iu(e){return typeof e.register=="function"}function tS(e){return Iu(e)&&typeof e.registerInRequestor=="boolean"}function g0(e){return tS(e)&&e.registerInRequestor}function rS(e){return e.prototype!==void 0}const nS=new Set(["Array","ArrayBuffer","Boolean","DataView","Date","Error","EvalError","Float32Array","Float64Array","Function","Int8Array","Int16Array","Int32Array","Map","Number","Object","Promise","RangeError","ReferenceError","RegExp","Set","SharedArrayBuffer","String","SyntaxError","TypeError","Uint8Array","Uint8ClampedArray","Uint16Array","Uint32Array","URIError","WeakMap","WeakSet"]),mx="__DI_LOCATE_PARENT__",jd=new Map;class Da{constructor(t,r){this.owner=t,this.config=r,this._parent=void 0,this.registerDepth=0,this.context=null,t!==null&&(t.$$container$$=this),this.resolvers=new Map,this.resolvers.set(Z2,eS),t instanceof Node&&t.addEventListener(mx,n=>{n.composedPath()[0]!==this.owner&&(n.detail.container=this,n.stopImmediatePropagation())})}get parent(){return this._parent===void 0&&(this._parent=this.config.parentLocator(this.owner)),this._parent}get depth(){return this.parent===null?0:this.parent.depth+1}get responsibleForOwnerRequests(){return this.config.responsibleForOwnerRequests}registerWithContext(t,...r){return this.context=t,this.register(...r),this.context=null,this}register(...t){if(++this.registerDepth===100)throw new Error("Unable to autoregister dependency");let r,n,i,o,s;const a=this.context;for(let l=0,u=t.length;l<u;++l)if(r=t[l],!!y0(r))if(Iu(r))r.register(this,a);else if(rS(r))al.singleton(r,r).register(this);else for(n=Object.keys(r),o=0,s=n.length;o<s;++o)i=r[n[o]],y0(i)&&(Iu(i)?i.register(this,a):this.register(i));return--this.registerDepth,this}registerResolver(t,r){gu(t);const n=this.resolvers,i=n.get(t);return i==null?n.set(t,r):i instanceof Tr&&i.strategy===4?i.state.push(r):n.set(t,new Tr(t,4,[i,r])),r}registerTransformer(t,r){const n=this.getResolver(t);if(n==null)return!1;if(n.getFactory){const i=n.getFactory(this);return i==null?!1:(i.registerTransformer(r),!0)}return!1}getResolver(t,r=!0){if(gu(t),t.resolve!==void 0)return t;let n=this,i;for(;n!=null;)if(i=n.resolvers.get(t),i==null){if(n.parent==null){const o=g0(t)?this:n;return r?this.jitRegister(t,o):null}n=n.parent}else return i;return null}has(t,r=!1){return this.resolvers.has(t)?!0:r&&this.parent!=null?this.parent.has(t,!0):!1}get(t){if(gu(t),t.$isResolver)return t.resolve(this,this);let r=this,n;for(;r!=null;)if(n=r.resolvers.get(t),n==null){if(r.parent==null){const i=g0(t)?this:r;return n=this.jitRegister(t,i),n.resolve(r,this)}r=r.parent}else return n.resolve(r,this);throw new Error(`Unable to resolve key: ${String(t)}`)}getAll(t,r=!1){gu(t);const n=this;let i=n,o;if(r){let s=ja;for(;i!=null;)o=i.resolvers.get(t),o!=null&&(s=s.concat(m0(o,i,n))),i=i.parent;return s}else for(;i!=null;)if(o=i.resolvers.get(t),o==null){if(i=i.parent,i==null)return ja}else return m0(o,i,n);return ja}getFactory(t){let r=jd.get(t);if(r===void 0){if(oS(t))throw new Error(`${t.name} is a native function and therefore cannot be safely constructed by DI. If this is intentional, please use a callback or cachedCallback resolver.`);jd.set(t,r=new J2(t,qe.getDependencies(t)))}return r}registerFactory(t,r){jd.set(t,r)}createChild(t){return new Da(null,Object.assign({},this.config,t,{parentLocator:()=>this}))}jitRegister(t,r){if(typeof t!="function")throw new Error(`Attempted to jitRegister something that is not a constructor: '${t}'. Did you forget to register this dependency?`);if(nS.has(t.name))throw new Error(`Attempted to jitRegister an intrinsic type: ${t.name}. Did you forget to add @inject(Key)`);if(Iu(t)){const n=t.register(r);if(!(n instanceof Object)||n.resolve==null){const i=r.resolvers.get(t);if(i!=null)return i;throw new Error("A valid resolver was not returned from the static register method")}return n}else{if(t.$isInterface)throw new Error(`Attempted to jitRegister an interface: ${t.friendlyName}`);{const n=this.config.defaultResolver(t,r);return r.resolvers.set(t,n),n}}}}const Nd=new WeakMap;function yx(e){return function(t,r,n){if(Nd.has(n))return Nd.get(n);const i=e(t,r,n);return Nd.set(n,i),i}}const al=Object.freeze({instance(e,t){return new Tr(e,0,t)},singleton(e,t){return new Tr(e,1,t)},transient(e,t){return new Tr(e,2,t)},callback(e,t){return new Tr(e,3,t)},cachedCallback(e,t){return new Tr(e,3,yx(t))},aliasTo(e,t){return new Tr(t,5,e)}});function gu(e){if(e==null)throw new Error("key/value cannot be null or undefined. Are you trying to inject/register something that doesn't exist with DI?")}function m0(e,t,r){if(e instanceof Tr&&e.strategy===4){const n=e.state;let i=n.length;const o=new Array(i);for(;i--;)o[i]=n[i].resolve(t,r);return o}return[e.resolve(t,r)]}const iS="(anonymous)";function y0(e){return typeof e=="object"&&e!==null||typeof e=="function"}const oS=function(){const e=new WeakMap;let t=!1,r="",n=0;return function(i){return t=e.get(i),t===void 0&&(r=i.toString(),n=r.length,t=n>=29&&n<=100&&r.charCodeAt(n-1)===125&&r.charCodeAt(n-2)<=32&&r.charCodeAt(n-3)===93&&r.charCodeAt(n-4)===101&&r.charCodeAt(n-5)===100&&r.charCodeAt(n-6)===111&&r.charCodeAt(n-7)===99&&r.charCodeAt(n-8)===32&&r.charCodeAt(n-9)===101&&r.charCodeAt(n-10)===118&&r.charCodeAt(n-11)===105&&r.charCodeAt(n-12)===116&&r.charCodeAt(n-13)===97&&r.charCodeAt(n-14)===110&&r.charCodeAt(n-15)===88,e.set(i,t)),t}}(),mu={};function bx(e){switch(typeof e){case"number":return e>=0&&(e|0)===e;case"string":{const t=mu[e];if(t!==void 0)return t;const r=e.length;if(r===0)return mu[e]=!1;let n=0;for(let i=0;i<r;++i)if(n=e.charCodeAt(i),i===0&&n===48&&r>1||n<48||n>57)return mu[e]=!1;return mu[e]=!0}default:return!1}}function b0(e){return`${e.toLowerCase()}:presentation`}const yu=new Map,xx=Object.freeze({define(e,t,r){const n=b0(e);yu.get(n)===void 0?yu.set(n,t):yu.set(n,!1),r.register(al.instance(n,t))},forTag(e,t){const r=b0(e),n=yu.get(r);return n===!1?qe.findResponsibleContainer(t).get(r):n||null}});class sS{constructor(t,r){this.template=t||null,this.styles=r===void 0?null:Array.isArray(r)?Yt.create(r):r instanceof Yt?r:Yt.create([r])}applyTo(t){const r=t.$fastController;r.template===null&&(r.template=this.template),r.styles===null&&(r.styles=this.styles)}}class Wt extends sh{constructor(){super(...arguments),this._presentation=void 0}get $presentation(){return this._presentation===void 0&&(this._presentation=xx.forTag(this.tagName,this)),this._presentation}templateChanged(){this.template!==void 0&&(this.$fastController.template=this.template)}stylesChanged(){this.styles!==void 0&&(this.$fastController.styles=this.styles)}connectedCallback(){this.$presentation!==null&&this.$presentation.applyTo(this),super.connectedCallback()}static compose(t){return(r={})=>new aS(this===Wt?class extends Wt{}:this,t,r)}}g([be],Wt.prototype,"template",void 0);g([be],Wt.prototype,"styles",void 0);function ia(e,t,r){return typeof e=="function"?e(t,r):e}class aS{constructor(t,r,n){this.type=t,this.elementDefinition=r,this.overrideDefinition=n,this.definition=Object.assign(Object.assign({},this.elementDefinition),this.overrideDefinition)}register(t,r){const n=this.definition,i=this.overrideDefinition,o=`${n.prefix||r.elementPrefix}-${n.baseName}`;r.tryDefineElement({name:o,type:this.type,baseClass:this.elementDefinition.baseClass,callback:s=>{const a=new sS(ia(n.template,s,n),ia(n.styles,s,n));s.definePresentation(a);let l=ia(n.shadowOptions,s,n);s.shadowRootMode&&(l?i.shadowOptions||(l.mode=s.shadowRootMode):l!==null&&(l={mode:s.shadowRootMode})),s.defineElement({elementOptions:ia(n.elementOptions,s,n),shadowOptions:l,attributes:ia(n.attributes,s,n)})}})}}function hr(e,...t){const r=mc.locate(e);t.forEach(n=>{Object.getOwnPropertyNames(n.prototype).forEach(i=>{i!=="constructor"&&Object.defineProperty(e.prototype,i,Object.getOwnPropertyDescriptor(n.prototype,i))}),mc.locate(n).forEach(i=>r.push(i))})}function lS(e,t){let r=e.length;for(;r--;)if(t(e[r],r,e))return r;return-1}function uS(){return!!(typeof window<"u"&&window.document&&window.document.createElement)}function cS(...e){return e.every(t=>t instanceof HTMLElement)}function hS(){const e=document.querySelector('meta[property="csp-nonce"]');return e?e.getAttribute("content"):null}let Ni;function dS(){if(typeof Ni=="boolean")return Ni;if(!uS())return Ni=!1,Ni;const e=document.createElement("style"),t=hS();t!==null&&e.setAttribute("nonce",t),document.head.appendChild(e);try{e.sheet.insertRule("foo:focus-visible {color:inherit}",0),Ni=!0}catch{Ni=!1}finally{document.head.removeChild(e)}return Ni}var x0;(function(e){e[e.alt=18]="alt",e[e.arrowDown=40]="arrowDown",e[e.arrowLeft=37]="arrowLeft",e[e.arrowRight=39]="arrowRight",e[e.arrowUp=38]="arrowUp",e[e.back=8]="back",e[e.backSlash=220]="backSlash",e[e.break=19]="break",e[e.capsLock=20]="capsLock",e[e.closeBracket=221]="closeBracket",e[e.colon=186]="colon",e[e.colon2=59]="colon2",e[e.comma=188]="comma",e[e.ctrl=17]="ctrl",e[e.delete=46]="delete",e[e.end=35]="end",e[e.enter=13]="enter",e[e.equals=187]="equals",e[e.equals2=61]="equals2",e[e.equals3=107]="equals3",e[e.escape=27]="escape",e[e.forwardSlash=191]="forwardSlash",e[e.function1=112]="function1",e[e.function10=121]="function10",e[e.function11=122]="function11",e[e.function12=123]="function12",e[e.function2=113]="function2",e[e.function3=114]="function3",e[e.function4=115]="function4",e[e.function5=116]="function5",e[e.function6=117]="function6",e[e.function7=118]="function7",e[e.function8=119]="function8",e[e.function9=120]="function9",e[e.home=36]="home",e[e.insert=45]="insert",e[e.menu=93]="menu",e[e.minus=189]="minus",e[e.minus2=109]="minus2",e[e.numLock=144]="numLock",e[e.numPad0=96]="numPad0",e[e.numPad1=97]="numPad1",e[e.numPad2=98]="numPad2",e[e.numPad3=99]="numPad3",e[e.numPad4=100]="numPad4",e[e.numPad5=101]="numPad5",e[e.numPad6=102]="numPad6",e[e.numPad7=103]="numPad7",e[e.numPad8=104]="numPad8",e[e.numPad9=105]="numPad9",e[e.numPadDivide=111]="numPadDivide",e[e.numPadDot=110]="numPadDot",e[e.numPadMinus=109]="numPadMinus",e[e.numPadMultiply=106]="numPadMultiply",e[e.numPadPlus=107]="numPadPlus",e[e.openBracket=219]="openBracket",e[e.pageDown=34]="pageDown",e[e.pageUp=33]="pageUp",e[e.period=190]="period",e[e.print=44]="print",e[e.quote=222]="quote",e[e.scrollLock=145]="scrollLock",e[e.shift=16]="shift",e[e.space=32]="space",e[e.tab=9]="tab",e[e.tilde=192]="tilde",e[e.windowsLeft=91]="windowsLeft",e[e.windowsOpera=219]="windowsOpera",e[e.windowsRight=92]="windowsRight"})(x0||(x0={}));const ah="ArrowDown",lh="ArrowUp",tg="Enter",uh="Escape",rg="Home",ng="End",ch=" ",hh="Tab";var hp;(function(e){e.ltr="ltr",e.rtl="rtl"})(hp||(hp={}));function fS(e,t,r){return Math.min(Math.max(r,e),t)}function bu(e,t,r=0){return[t,r]=[t,r].sort((n,i)=>n-i),t<=e&&e<r}let pS=0;function ig(e=""){return`${e}${pS++}`}var C;(function(e){e.Canvas="Canvas",e.CanvasText="CanvasText",e.LinkText="LinkText",e.VisitedText="VisitedText",e.ActiveText="ActiveText",e.ButtonFace="ButtonFace",e.ButtonText="ButtonText",e.Field="Field",e.FieldText="FieldText",e.Highlight="Highlight",e.HighlightText="HighlightText",e.GrayText="GrayText"})(C||(C={}));class Qe{}g([D({attribute:"aria-atomic"})],Qe.prototype,"ariaAtomic",void 0);g([D({attribute:"aria-busy"})],Qe.prototype,"ariaBusy",void 0);g([D({attribute:"aria-controls"})],Qe.prototype,"ariaControls",void 0);g([D({attribute:"aria-current"})],Qe.prototype,"ariaCurrent",void 0);g([D({attribute:"aria-describedby"})],Qe.prototype,"ariaDescribedby",void 0);g([D({attribute:"aria-details"})],Qe.prototype,"ariaDetails",void 0);g([D({attribute:"aria-disabled"})],Qe.prototype,"ariaDisabled",void 0);g([D({attribute:"aria-errormessage"})],Qe.prototype,"ariaErrormessage",void 0);g([D({attribute:"aria-flowto"})],Qe.prototype,"ariaFlowto",void 0);g([D({attribute:"aria-haspopup"})],Qe.prototype,"ariaHaspopup",void 0);g([D({attribute:"aria-hidden"})],Qe.prototype,"ariaHidden",void 0);g([D({attribute:"aria-invalid"})],Qe.prototype,"ariaInvalid",void 0);g([D({attribute:"aria-keyshortcuts"})],Qe.prototype,"ariaKeyshortcuts",void 0);g([D({attribute:"aria-label"})],Qe.prototype,"ariaLabel",void 0);g([D({attribute:"aria-labelledby"})],Qe.prototype,"ariaLabelledby",void 0);g([D({attribute:"aria-live"})],Qe.prototype,"ariaLive",void 0);g([D({attribute:"aria-owns"})],Qe.prototype,"ariaOwns",void 0);g([D({attribute:"aria-relevant"})],Qe.prototype,"ariaRelevant",void 0);g([D({attribute:"aria-roledescription"})],Qe.prototype,"ariaRoledescription",void 0);const vS=(e,t)=>St`
    <button
        class="control"
        part="control"
        ?autofocus="${r=>r.autofocus}"
        ?disabled="${r=>r.disabled}"
        form="${r=>r.formId}"
        formaction="${r=>r.formaction}"
        formenctype="${r=>r.formenctype}"
        formmethod="${r=>r.formmethod}"
        formnovalidate="${r=>r.formnovalidate}"
        formtarget="${r=>r.formtarget}"
        name="${r=>r.name}"
        type="${r=>r.type}"
        value="${r=>r.value}"
        aria-atomic="${r=>r.ariaAtomic}"
        aria-busy="${r=>r.ariaBusy}"
        aria-controls="${r=>r.ariaControls}"
        aria-current="${r=>r.ariaCurrent}"
        aria-describedby="${r=>r.ariaDescribedby}"
        aria-details="${r=>r.ariaDetails}"
        aria-disabled="${r=>r.ariaDisabled}"
        aria-errormessage="${r=>r.ariaErrormessage}"
        aria-expanded="${r=>r.ariaExpanded}"
        aria-flowto="${r=>r.ariaFlowto}"
        aria-haspopup="${r=>r.ariaHaspopup}"
        aria-hidden="${r=>r.ariaHidden}"
        aria-invalid="${r=>r.ariaInvalid}"
        aria-keyshortcuts="${r=>r.ariaKeyshortcuts}"
        aria-label="${r=>r.ariaLabel}"
        aria-labelledby="${r=>r.ariaLabelledby}"
        aria-live="${r=>r.ariaLive}"
        aria-owns="${r=>r.ariaOwns}"
        aria-pressed="${r=>r.ariaPressed}"
        aria-relevant="${r=>r.ariaRelevant}"
        aria-roledescription="${r=>r.ariaRoledescription}"
        ${Jt("control")}
    >
        ${Ol(e,t)}
        <span class="content" part="content">
            <slot ${vo("defaultSlottedContent")}></slot>
        </span>
        ${El(e,t)}
    </button>
`,w0="form-associated-proxy",$0="ElementInternals",_0=$0 in window&&"setFormValue"in window[$0].prototype,k0=new WeakMap;function go(e){const t=class extends e{constructor(...r){super(...r),this.dirtyValue=!1,this.disabled=!1,this.proxyEventsToBlock=["change","click"],this.proxyInitialized=!1,this.required=!1,this.initialValue=this.initialValue||"",this.elementInternals||(this.formResetCallback=this.formResetCallback.bind(this))}static get formAssociated(){return _0}get validity(){return this.elementInternals?this.elementInternals.validity:this.proxy.validity}get form(){return this.elementInternals?this.elementInternals.form:this.proxy.form}get validationMessage(){return this.elementInternals?this.elementInternals.validationMessage:this.proxy.validationMessage}get willValidate(){return this.elementInternals?this.elementInternals.willValidate:this.proxy.willValidate}get labels(){if(this.elementInternals)return Object.freeze(Array.from(this.elementInternals.labels));if(this.proxy instanceof HTMLElement&&this.proxy.ownerDocument&&this.id){const r=this.proxy.labels,n=Array.from(this.proxy.getRootNode().querySelectorAll(`[for='${this.id}']`)),i=r?n.concat(Array.from(r)):n;return Object.freeze(i)}else return ja}valueChanged(r,n){this.dirtyValue=!0,this.proxy instanceof HTMLElement&&(this.proxy.value=this.value),this.currentValue=this.value,this.setFormValue(this.value),this.validate()}currentValueChanged(){this.value=this.currentValue}initialValueChanged(r,n){this.dirtyValue||(this.value=this.initialValue,this.dirtyValue=!1)}disabledChanged(r,n){this.proxy instanceof HTMLElement&&(this.proxy.disabled=this.disabled),_e.queueUpdate(()=>this.classList.toggle("disabled",this.disabled))}nameChanged(r,n){this.proxy instanceof HTMLElement&&(this.proxy.name=this.name)}requiredChanged(r,n){this.proxy instanceof HTMLElement&&(this.proxy.required=this.required),_e.queueUpdate(()=>this.classList.toggle("required",this.required)),this.validate()}get elementInternals(){if(!_0)return null;let r=k0.get(this);return r||(r=this.attachInternals(),k0.set(this,r)),r}connectedCallback(){super.connectedCallback(),this.addEventListener("keypress",this._keypressHandler),this.value||(this.value=this.initialValue,this.dirtyValue=!1),this.elementInternals||(this.attachProxy(),this.form&&this.form.addEventListener("reset",this.formResetCallback))}disconnectedCallback(){super.disconnectedCallback(),this.proxyEventsToBlock.forEach(r=>this.proxy.removeEventListener(r,this.stopPropagation)),!this.elementInternals&&this.form&&this.form.removeEventListener("reset",this.formResetCallback)}checkValidity(){return this.elementInternals?this.elementInternals.checkValidity():this.proxy.checkValidity()}reportValidity(){return this.elementInternals?this.elementInternals.reportValidity():this.proxy.reportValidity()}setValidity(r,n,i){this.elementInternals?this.elementInternals.setValidity(r,n,i):typeof n=="string"&&this.proxy.setCustomValidity(n)}formDisabledCallback(r){this.disabled=r}formResetCallback(){this.value=this.initialValue,this.dirtyValue=!1}attachProxy(){var r;this.proxyInitialized||(this.proxyInitialized=!0,this.proxy.style.display="none",this.proxyEventsToBlock.forEach(n=>this.proxy.addEventListener(n,this.stopPropagation)),this.proxy.disabled=this.disabled,this.proxy.required=this.required,typeof this.name=="string"&&(this.proxy.name=this.name),typeof this.value=="string"&&(this.proxy.value=this.value),this.proxy.setAttribute("slot",w0),this.proxySlot=document.createElement("slot"),this.proxySlot.setAttribute("name",w0)),(r=this.shadowRoot)===null||r===void 0||r.appendChild(this.proxySlot),this.appendChild(this.proxy)}detachProxy(){var r;this.removeChild(this.proxy),(r=this.shadowRoot)===null||r===void 0||r.removeChild(this.proxySlot)}validate(r){this.proxy instanceof HTMLElement&&this.setValidity(this.proxy.validity,this.proxy.validationMessage,r)}setFormValue(r,n){this.elementInternals&&this.elementInternals.setFormValue(r,n||r)}_keypressHandler(r){switch(r.key){case tg:if(this.form instanceof HTMLFormElement){const n=this.form.querySelector("[type=submit]");n==null||n.click()}break}}stopPropagation(r){r.stopPropagation()}};return D({mode:"boolean"})(t.prototype,"disabled"),D({mode:"fromView",attribute:"value"})(t.prototype,"initialValue"),D({attribute:"current-value"})(t.prototype,"currentValue"),D(t.prototype,"name"),D({mode:"boolean"})(t.prototype,"required"),be(t.prototype,"value"),t}function gS(e){class t extends go(e){}class r extends t{constructor(...i){super(i),this.dirtyChecked=!1,this.checkedAttribute=!1,this.checked=!1,this.dirtyChecked=!1}checkedAttributeChanged(){this.defaultChecked=this.checkedAttribute}defaultCheckedChanged(){this.dirtyChecked||(this.checked=this.defaultChecked,this.dirtyChecked=!1)}checkedChanged(i,o){this.dirtyChecked||(this.dirtyChecked=!0),this.currentChecked=this.checked,this.updateForm(),this.proxy instanceof HTMLInputElement&&(this.proxy.checked=this.checked),i!==void 0&&this.$emit("change"),this.validate()}currentCheckedChanged(i,o){this.checked=this.currentChecked}updateForm(){const i=this.checked?this.value:null;this.setFormValue(i,i)}connectedCallback(){super.connectedCallback(),this.updateForm()}formResetCallback(){super.formResetCallback(),this.checked=!!this.checkedAttribute,this.dirtyChecked=!1}}return D({attribute:"checked",mode:"boolean"})(r.prototype,"checkedAttribute"),D({attribute:"current-checked",converter:fx})(r.prototype,"currentChecked"),be(r.prototype,"defaultChecked"),be(r.prototype,"checked"),r}class mS extends Wt{}class yS extends go(mS){constructor(){super(...arguments),this.proxy=document.createElement("input")}}let zr=class extends yS{constructor(){super(...arguments),this.handleClick=e=>{var t;this.disabled&&((t=this.defaultSlottedContent)===null||t===void 0?void 0:t.length)<=1&&e.stopPropagation()},this.handleSubmission=()=>{if(!this.form)return;const e=this.proxy.isConnected;e||this.attachProxy(),typeof this.form.requestSubmit=="function"?this.form.requestSubmit(this.proxy):this.proxy.click(),e||this.detachProxy()},this.handleFormReset=()=>{var e;(e=this.form)===null||e===void 0||e.reset()},this.handleUnsupportedDelegatesFocus=()=>{var e;window.ShadowRoot&&!window.ShadowRoot.prototype.hasOwnProperty("delegatesFocus")&&!((e=this.$fastController.definition.shadowOptions)===null||e===void 0)&&e.delegatesFocus&&(this.focus=()=>{this.control.focus()})}}formactionChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formAction=this.formaction)}formenctypeChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formEnctype=this.formenctype)}formmethodChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formMethod=this.formmethod)}formnovalidateChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formNoValidate=this.formnovalidate)}formtargetChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formTarget=this.formtarget)}typeChanged(e,t){this.proxy instanceof HTMLInputElement&&(this.proxy.type=this.type),t==="submit"&&this.addEventListener("click",this.handleSubmission),e==="submit"&&this.removeEventListener("click",this.handleSubmission),t==="reset"&&this.addEventListener("click",this.handleFormReset),e==="reset"&&this.removeEventListener("click",this.handleFormReset)}validate(){super.validate(this.control)}connectedCallback(){var e;super.connectedCallback(),this.proxy.setAttribute("type",this.type),this.handleUnsupportedDelegatesFocus();const t=Array.from((e=this.control)===null||e===void 0?void 0:e.children);t&&t.forEach(r=>{r.addEventListener("click",this.handleClick)})}disconnectedCallback(){var e;super.disconnectedCallback();const t=Array.from((e=this.control)===null||e===void 0?void 0:e.children);t&&t.forEach(r=>{r.removeEventListener("click",this.handleClick)})}};g([D({mode:"boolean"})],zr.prototype,"autofocus",void 0);g([D({attribute:"form"})],zr.prototype,"formId",void 0);g([D],zr.prototype,"formaction",void 0);g([D],zr.prototype,"formenctype",void 0);g([D],zr.prototype,"formmethod",void 0);g([D({mode:"boolean"})],zr.prototype,"formnovalidate",void 0);g([D],zr.prototype,"formtarget",void 0);g([D],zr.prototype,"type",void 0);g([be],zr.prototype,"defaultSlottedContent",void 0);class dh{}g([D({attribute:"aria-expanded"})],dh.prototype,"ariaExpanded",void 0);g([D({attribute:"aria-pressed"})],dh.prototype,"ariaPressed",void 0);hr(dh,Qe);hr(zr,js,dh);const bS=(e,t)=>St`
    <slot></slot>
`;let wx=class extends Wt{};const xS=(e,t)=>St`
    <template
        role="checkbox"
        aria-checked="${r=>r.checked}"
        aria-required="${r=>r.required}"
        aria-disabled="${r=>r.disabled}"
        aria-readonly="${r=>r.readOnly}"
        tabindex="${r=>r.disabled?null:0}"
        @keypress="${(r,n)=>r.keypressHandler(n.event)}"
        @click="${(r,n)=>r.clickHandler(n.event)}"
        class="${r=>r.readOnly?"readonly":""} ${r=>r.checked?"checked":""} ${r=>r.indeterminate?"indeterminate":""}"
    >
        <div part="control" class="control">
            <slot name="checked-indicator">
                ${t.checkedIndicator||""}
            </slot>
            <slot name="indeterminate-indicator">
                ${t.indeterminateIndicator||""}
            </slot>
        </div>
        <label
            part="label"
            class="${r=>r.defaultSlottedNodes&&r.defaultSlottedNodes.length?"label":"label label__hidden"}"
        >
            <slot ${vo("defaultSlottedNodes")}></slot>
        </label>
    </template>
`;class wS extends Wt{}class $S extends gS(wS){constructor(){super(...arguments),this.proxy=document.createElement("input")}}class fh extends $S{constructor(){super(),this.initialValue="on",this.indeterminate=!1,this.keypressHandler=t=>{if(!this.readOnly)switch(t.key){case ch:this.indeterminate&&(this.indeterminate=!1),this.checked=!this.checked;break}},this.clickHandler=t=>{!this.disabled&&!this.readOnly&&(this.indeterminate&&(this.indeterminate=!1),this.checked=!this.checked)},this.proxy.setAttribute("type","checkbox")}readOnlyChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.readOnly=this.readOnly)}}g([D({attribute:"readonly",mode:"boolean"})],fh.prototype,"readOnly",void 0);g([be],fh.prototype,"defaultSlottedNodes",void 0);g([be],fh.prototype,"indeterminate",void 0);function $x(e){return cS(e)&&(e.getAttribute("role")==="option"||e instanceof HTMLOptionElement)}class an extends Wt{constructor(t,r,n,i){super(),this.defaultSelected=!1,this.dirtySelected=!1,this.selected=this.defaultSelected,this.dirtyValue=!1,t&&(this.textContent=t),r&&(this.initialValue=r),n&&(this.defaultSelected=n),i&&(this.selected=i),this.proxy=new Option(`${this.textContent}`,this.initialValue,this.defaultSelected,this.selected),this.proxy.disabled=this.disabled}checkedChanged(t,r){if(typeof r=="boolean"){this.ariaChecked=r?"true":"false";return}this.ariaChecked=null}contentChanged(t,r){this.proxy instanceof HTMLOptionElement&&(this.proxy.textContent=this.textContent),this.$emit("contentchange",null,{bubbles:!0})}defaultSelectedChanged(){this.dirtySelected||(this.selected=this.defaultSelected,this.proxy instanceof HTMLOptionElement&&(this.proxy.selected=this.defaultSelected))}disabledChanged(t,r){this.ariaDisabled=this.disabled?"true":"false",this.proxy instanceof HTMLOptionElement&&(this.proxy.disabled=this.disabled)}selectedAttributeChanged(){this.defaultSelected=this.selectedAttribute,this.proxy instanceof HTMLOptionElement&&(this.proxy.defaultSelected=this.defaultSelected)}selectedChanged(){this.ariaSelected=this.selected?"true":"false",this.dirtySelected||(this.dirtySelected=!0),this.proxy instanceof HTMLOptionElement&&(this.proxy.selected=this.selected)}initialValueChanged(t,r){this.dirtyValue||(this.value=this.initialValue,this.dirtyValue=!1)}get label(){var t;return(t=this.value)!==null&&t!==void 0?t:this.text}get text(){var t,r;return(r=(t=this.textContent)===null||t===void 0?void 0:t.replace(/\s+/g," ").trim())!==null&&r!==void 0?r:""}set value(t){const r=`${t??""}`;this._value=r,this.dirtyValue=!0,this.proxy instanceof HTMLOptionElement&&(this.proxy.value=r),we.notify(this,"value")}get value(){var t;return we.track(this,"value"),(t=this._value)!==null&&t!==void 0?t:this.text}get form(){return this.proxy?this.proxy.form:null}}g([be],an.prototype,"checked",void 0);g([be],an.prototype,"content",void 0);g([be],an.prototype,"defaultSelected",void 0);g([D({mode:"boolean"})],an.prototype,"disabled",void 0);g([D({attribute:"selected",mode:"boolean"})],an.prototype,"selectedAttribute",void 0);g([be],an.prototype,"selected",void 0);g([D({attribute:"value",mode:"fromView"})],an.prototype,"initialValue",void 0);class Ns{}g([be],Ns.prototype,"ariaChecked",void 0);g([be],Ns.prototype,"ariaPosInSet",void 0);g([be],Ns.prototype,"ariaSelected",void 0);g([be],Ns.prototype,"ariaSetSize",void 0);hr(Ns,Qe);hr(an,js,Ns);class Ut extends Wt{constructor(){super(...arguments),this._options=[],this.selectedIndex=-1,this.selectedOptions=[],this.shouldSkipFocus=!1,this.typeaheadBuffer="",this.typeaheadExpired=!0,this.typeaheadTimeout=-1}get firstSelectedOption(){var t;return(t=this.selectedOptions[0])!==null&&t!==void 0?t:null}get hasSelectableOptions(){return this.options.length>0&&!this.options.every(t=>t.disabled)}get length(){var t,r;return(r=(t=this.options)===null||t===void 0?void 0:t.length)!==null&&r!==void 0?r:0}get options(){return we.track(this,"options"),this._options}set options(t){this._options=t,we.notify(this,"options")}get typeAheadExpired(){return this.typeaheadExpired}set typeAheadExpired(t){this.typeaheadExpired=t}clickHandler(t){const r=t.target.closest("option,[role=option]");if(r&&!r.disabled)return this.selectedIndex=this.options.indexOf(r),!0}focusAndScrollOptionIntoView(t=this.firstSelectedOption){this.contains(document.activeElement)&&t!==null&&(t.focus(),requestAnimationFrame(()=>{t.scrollIntoView({block:"nearest"})}))}focusinHandler(t){!this.shouldSkipFocus&&t.target===t.currentTarget&&(this.setSelectedOptions(),this.focusAndScrollOptionIntoView()),this.shouldSkipFocus=!1}getTypeaheadMatches(){const t=this.typeaheadBuffer.replace(/[.*+\-?^${}()|[\]\\]/g,"\\$&"),r=new RegExp(`^${t}`,"gi");return this.options.filter(n=>n.text.trim().match(r))}getSelectableIndex(t=this.selectedIndex,r){const n=t>r?-1:t<r?1:0,i=t+n;let o=null;switch(n){case-1:{o=this.options.reduceRight((s,a,l)=>!s&&!a.disabled&&l<i?a:s,o);break}case 1:{o=this.options.reduce((s,a,l)=>!s&&!a.disabled&&l>i?a:s,o);break}}return this.options.indexOf(o)}handleChange(t,r){switch(r){case"selected":{Ut.slottedOptionFilter(t)&&(this.selectedIndex=this.options.indexOf(t)),this.setSelectedOptions();break}}}handleTypeAhead(t){this.typeaheadTimeout&&window.clearTimeout(this.typeaheadTimeout),this.typeaheadTimeout=window.setTimeout(()=>this.typeaheadExpired=!0,Ut.TYPE_AHEAD_TIMEOUT_MS),!(t.length>1)&&(this.typeaheadBuffer=`${this.typeaheadExpired?"":this.typeaheadBuffer}${t}`)}keydownHandler(t){if(this.disabled)return!0;this.shouldSkipFocus=!1;const r=t.key;switch(r){case rg:{t.shiftKey||(t.preventDefault(),this.selectFirstOption());break}case ah:{t.shiftKey||(t.preventDefault(),this.selectNextOption());break}case lh:{t.shiftKey||(t.preventDefault(),this.selectPreviousOption());break}case ng:{t.preventDefault(),this.selectLastOption();break}case hh:return this.focusAndScrollOptionIntoView(),!0;case tg:case uh:return!0;case ch:if(this.typeaheadExpired)return!0;default:return r.length===1&&this.handleTypeAhead(`${r}`),!0}}mousedownHandler(t){return this.shouldSkipFocus=!this.contains(document.activeElement),!0}multipleChanged(t,r){this.ariaMultiSelectable=r?"true":null}selectedIndexChanged(t,r){var n;if(!this.hasSelectableOptions){this.selectedIndex=-1;return}if(!((n=this.options[this.selectedIndex])===null||n===void 0)&&n.disabled&&typeof t=="number"){const i=this.getSelectableIndex(t,r),o=i>-1?i:t;this.selectedIndex=o,r===o&&this.selectedIndexChanged(r,o);return}this.setSelectedOptions()}selectedOptionsChanged(t,r){var n;const i=r.filter(Ut.slottedOptionFilter);(n=this.options)===null||n===void 0||n.forEach(o=>{const s=we.getNotifier(o);s.unsubscribe(this,"selected"),o.selected=i.includes(o),s.subscribe(this,"selected")})}selectFirstOption(){var t,r;this.disabled||(this.selectedIndex=(r=(t=this.options)===null||t===void 0?void 0:t.findIndex(n=>!n.disabled))!==null&&r!==void 0?r:-1)}selectLastOption(){this.disabled||(this.selectedIndex=lS(this.options,t=>!t.disabled))}selectNextOption(){!this.disabled&&this.selectedIndex<this.options.length-1&&(this.selectedIndex+=1)}selectPreviousOption(){!this.disabled&&this.selectedIndex>0&&(this.selectedIndex=this.selectedIndex-1)}setDefaultSelectedOption(){var t,r;this.selectedIndex=(r=(t=this.options)===null||t===void 0?void 0:t.findIndex(n=>n.defaultSelected))!==null&&r!==void 0?r:-1}setSelectedOptions(){var t,r,n;!((t=this.options)===null||t===void 0)&&t.length&&(this.selectedOptions=[this.options[this.selectedIndex]],this.ariaActiveDescendant=(n=(r=this.firstSelectedOption)===null||r===void 0?void 0:r.id)!==null&&n!==void 0?n:"",this.focusAndScrollOptionIntoView())}slottedOptionsChanged(t,r){this.options=r.reduce((i,o)=>($x(o)&&i.push(o),i),[]);const n=`${this.options.length}`;this.options.forEach((i,o)=>{i.id||(i.id=ig("option-")),i.ariaPosInSet=`${o+1}`,i.ariaSetSize=n}),this.$fastController.isConnected&&(this.setSelectedOptions(),this.setDefaultSelectedOption())}typeaheadBufferChanged(t,r){if(this.$fastController.isConnected){const n=this.getTypeaheadMatches();if(n.length){const i=this.options.indexOf(n[0]);i>-1&&(this.selectedIndex=i)}this.typeaheadExpired=!1}}}Ut.slottedOptionFilter=e=>$x(e)&&!e.hidden;Ut.TYPE_AHEAD_TIMEOUT_MS=1e3;g([D({mode:"boolean"})],Ut.prototype,"disabled",void 0);g([be],Ut.prototype,"selectedIndex",void 0);g([be],Ut.prototype,"selectedOptions",void 0);g([be],Ut.prototype,"slottedOptions",void 0);g([be],Ut.prototype,"typeaheadBuffer",void 0);class _i{}g([be],_i.prototype,"ariaActiveDescendant",void 0);g([be],_i.prototype,"ariaDisabled",void 0);g([be],_i.prototype,"ariaExpanded",void 0);g([be],_i.prototype,"ariaMultiSelectable",void 0);hr(_i,Qe);hr(Ut,_i);const is={above:"above",below:"below"};class _S extends Ut{}class kS extends go(_S){constructor(){super(...arguments),this.proxy=document.createElement("input")}}const xu={inline:"inline",list:"list",both:"both",none:"none"};let Wn=class extends kS{constructor(){super(...arguments),this._value="",this.filteredOptions=[],this.filter="",this.forcedPosition=!1,this.listboxId=ig("listbox-"),this.maxHeight=0,this.open=!1}formResetCallback(){super.formResetCallback(),this.setDefaultSelectedOption(),this.updateValue()}validate(){super.validate(this.control)}get isAutocompleteInline(){return this.autocomplete===xu.inline||this.isAutocompleteBoth}get isAutocompleteList(){return this.autocomplete===xu.list||this.isAutocompleteBoth}get isAutocompleteBoth(){return this.autocomplete===xu.both}openChanged(){if(this.open){this.ariaControls=this.listboxId,this.ariaExpanded="true",this.setPositioning(),this.focusAndScrollOptionIntoView(),_e.queueUpdate(()=>this.focus());return}this.ariaControls="",this.ariaExpanded="false"}get options(){return we.track(this,"options"),this.filteredOptions.length?this.filteredOptions:this._options}set options(e){this._options=e,we.notify(this,"options")}placeholderChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.placeholder=this.placeholder)}positionChanged(e,t){this.positionAttribute=t,this.setPositioning()}get value(){return we.track(this,"value"),this._value}set value(e){var t,r,n;const i=`${this._value}`;if(this.$fastController.isConnected&&this.options){const o=this.options.findIndex(l=>l.text.toLowerCase()===e.toLowerCase()),s=(t=this.options[this.selectedIndex])===null||t===void 0?void 0:t.text,a=(r=this.options[o])===null||r===void 0?void 0:r.text;this.selectedIndex=s!==a?o:this.selectedIndex,e=((n=this.firstSelectedOption)===null||n===void 0?void 0:n.text)||e}i!==e&&(this._value=e,super.valueChanged(i,e),we.notify(this,"value"))}clickHandler(e){if(!this.disabled){if(this.open){const t=e.target.closest("option,[role=option]");if(!t||t.disabled)return;this.selectedOptions=[t],this.control.value=t.text,this.clearSelectionRange(),this.updateValue(!0)}return this.open=!this.open,this.open&&this.control.focus(),!0}}connectedCallback(){super.connectedCallback(),this.forcedPosition=!!this.positionAttribute,this.value&&(this.initialValue=this.value)}disabledChanged(e,t){super.disabledChanged&&super.disabledChanged(e,t),this.ariaDisabled=this.disabled?"true":"false"}filterOptions(){(!this.autocomplete||this.autocomplete===xu.none)&&(this.filter="");const e=this.filter.toLowerCase();this.filteredOptions=this._options.filter(t=>t.text.toLowerCase().startsWith(this.filter.toLowerCase())),this.isAutocompleteList&&(!this.filteredOptions.length&&!e&&(this.filteredOptions=this._options),this._options.forEach(t=>{t.hidden=!this.filteredOptions.includes(t)}))}focusAndScrollOptionIntoView(){this.contains(document.activeElement)&&(this.control.focus(),this.firstSelectedOption&&requestAnimationFrame(()=>{var e;(e=this.firstSelectedOption)===null||e===void 0||e.scrollIntoView({block:"nearest"})}))}focusoutHandler(e){if(this.syncValue(),!this.open)return!0;const t=e.relatedTarget;if(this.isSameNode(t)){this.focus();return}(!this.options||!this.options.includes(t))&&(this.open=!1)}inputHandler(e){if(this.filter=this.control.value,this.filterOptions(),this.isAutocompleteInline||(this.selectedIndex=this.options.map(t=>t.text).indexOf(this.control.value)),e.inputType.includes("deleteContent")||!this.filter.length)return!0;this.isAutocompleteList&&!this.open&&(this.open=!0),this.isAutocompleteInline&&(this.filteredOptions.length?(this.selectedOptions=[this.filteredOptions[0]],this.selectedIndex=this.options.indexOf(this.firstSelectedOption),this.setInlineSelection()):this.selectedIndex=-1)}keydownHandler(e){const t=e.key;if(e.ctrlKey||e.shiftKey)return!0;switch(t){case"Enter":{this.syncValue(),this.isAutocompleteInline&&(this.filter=this.value),this.open=!1,this.clearSelectionRange();break}case"Escape":{if(this.isAutocompleteInline||(this.selectedIndex=-1),this.open){this.open=!1;break}this.value="",this.control.value="",this.filter="",this.filterOptions();break}case"Tab":{if(this.setInputToSelection(),!this.open)return!0;e.preventDefault(),this.open=!1;break}case"ArrowUp":case"ArrowDown":{if(this.filterOptions(),!this.open){this.open=!0;break}this.filteredOptions.length>0&&super.keydownHandler(e),this.isAutocompleteInline&&this.setInlineSelection();break}default:return!0}}keyupHandler(e){switch(e.key){case"ArrowLeft":case"ArrowRight":case"Backspace":case"Delete":case"Home":case"End":{this.filter=this.control.value,this.selectedIndex=-1,this.filterOptions();break}}}selectedIndexChanged(e,t){if(this.$fastController.isConnected){if(t=fS(-1,this.options.length-1,t),t!==this.selectedIndex){this.selectedIndex=t;return}super.selectedIndexChanged(e,t)}}selectPreviousOption(){!this.disabled&&this.selectedIndex>=0&&(this.selectedIndex=this.selectedIndex-1)}setDefaultSelectedOption(){if(this.$fastController.isConnected&&this.options){const e=this.options.findIndex(t=>t.getAttribute("selected")!==null||t.selected);this.selectedIndex=e,!this.dirtyValue&&this.firstSelectedOption&&(this.value=this.firstSelectedOption.text),this.setSelectedOptions()}}setInputToSelection(){this.firstSelectedOption&&(this.control.value=this.firstSelectedOption.text,this.control.focus())}setInlineSelection(){this.firstSelectedOption&&(this.setInputToSelection(),this.control.setSelectionRange(this.filter.length,this.control.value.length,"backward"))}syncValue(){var e;const t=this.selectedIndex>-1?(e=this.firstSelectedOption)===null||e===void 0?void 0:e.text:this.control.value;this.updateValue(this.value!==t)}setPositioning(){const e=this.getBoundingClientRect(),t=window.innerHeight-e.bottom;this.position=this.forcedPosition?this.positionAttribute:e.top>t?is.above:is.below,this.positionAttribute=this.forcedPosition?this.positionAttribute:this.position,this.maxHeight=this.position===is.above?~~e.top:~~t}selectedOptionsChanged(e,t){this.$fastController.isConnected&&this._options.forEach(r=>{r.selected=t.includes(r)})}slottedOptionsChanged(e,t){super.slottedOptionsChanged(e,t),this.updateValue()}updateValue(e){var t;this.$fastController.isConnected&&(this.value=((t=this.firstSelectedOption)===null||t===void 0?void 0:t.text)||this.control.value,this.control.value=this.value),e&&this.$emit("change")}clearSelectionRange(){const e=this.control.value.length;this.control.setSelectionRange(e,e)}};g([D({attribute:"autocomplete",mode:"fromView"})],Wn.prototype,"autocomplete",void 0);g([be],Wn.prototype,"maxHeight",void 0);g([D({attribute:"open",mode:"boolean"})],Wn.prototype,"open",void 0);g([D],Wn.prototype,"placeholder",void 0);g([D({attribute:"position"})],Wn.prototype,"positionAttribute",void 0);g([be],Wn.prototype,"position",void 0);class ph{}g([be],ph.prototype,"ariaAutoComplete",void 0);g([be],ph.prototype,"ariaControls",void 0);hr(ph,_i);hr(Wn,js,ph);const SS=(e,t)=>St`
    <template
        aria-disabled="${r=>r.ariaDisabled}"
        autocomplete="${r=>r.autocomplete}"
        class="${r=>r.open?"open":""} ${r=>r.disabled?"disabled":""} ${r=>r.position}"
        ?open="${r=>r.open}"
        tabindex="${r=>r.disabled?null:"0"}"
        @click="${(r,n)=>r.clickHandler(n.event)}"
        @focusout="${(r,n)=>r.focusoutHandler(n.event)}"
        @keydown="${(r,n)=>r.keydownHandler(n.event)}"
    >
        <div class="control" part="control">
            ${Ol(e,t)}
            <slot name="control">
                <input
                    aria-activedescendant="${r=>r.open?r.ariaActiveDescendant:null}"
                    aria-autocomplete="${r=>r.ariaAutoComplete}"
                    aria-controls="${r=>r.ariaControls}"
                    aria-disabled="${r=>r.ariaDisabled}"
                    aria-expanded="${r=>r.ariaExpanded}"
                    aria-haspopup="listbox"
                    class="selected-value"
                    part="selected-value"
                    placeholder="${r=>r.placeholder}"
                    role="combobox"
                    type="text"
                    ?disabled="${r=>r.disabled}"
                    :value="${r=>r.value}"
                    @input="${(r,n)=>r.inputHandler(n.event)}"
                    @keyup="${(r,n)=>r.keyupHandler(n.event)}"
                    ${Jt("control")}
                />
                <div class="indicator" part="indicator" aria-hidden="true">
                    <slot name="indicator">
                        ${t.indicator||""}
                    </slot>
                </div>
            </slot>
            ${El(e,t)}
        </div>
        <div
            class="listbox"
            id="${r=>r.listboxId}"
            part="listbox"
            role="listbox"
            ?disabled="${r=>r.disabled}"
            ?hidden="${r=>!r.open}"
            ${Jt("listbox")}
        >
            <slot
                ${vo({filter:Ut.slottedOptionFilter,flatten:!0,property:"slottedOptions"})}
            ></slot>
        </div>
    </template>
`;function bc(e){const t=e.parentElement;if(t)return t;{const r=e.getRootNode();if(r.host instanceof HTMLElement)return r.host}return null}function CS(e,t){let r=t;for(;r!==null;){if(r===e)return!0;r=bc(r)}return!1}const jn=document.createElement("div");function ES(e){return e instanceof sh}class og{setProperty(t,r){_e.queueUpdate(()=>this.target.setProperty(t,r))}removeProperty(t){_e.queueUpdate(()=>this.target.removeProperty(t))}}class OS extends og{constructor(t){super();const r=new CSSStyleSheet;this.target=r.cssRules[r.insertRule(":host{}")].style,t.$fastController.addStyles(Yt.create([r]))}}class TS extends og{constructor(){super();const t=new CSSStyleSheet;this.target=t.cssRules[t.insertRule(":root{}")].style,document.adoptedStyleSheets=[...document.adoptedStyleSheets,t]}}class PS extends og{constructor(){super(),this.style=document.createElement("style"),document.head.appendChild(this.style);const{sheet:t}=this.style;if(t){const r=t.insertRule(":root{}",t.cssRules.length);this.target=t.cssRules[r].style}}}class _x{constructor(t){this.store=new Map,this.target=null;const r=t.$fastController;this.style=document.createElement("style"),r.addStyles(this.style),we.getNotifier(r).subscribe(this,"isConnected"),this.handleChange(r,"isConnected")}targetChanged(){if(this.target!==null)for(const[t,r]of this.store.entries())this.target.setProperty(t,r)}setProperty(t,r){this.store.set(t,r),_e.queueUpdate(()=>{this.target!==null&&this.target.setProperty(t,r)})}removeProperty(t){this.store.delete(t),_e.queueUpdate(()=>{this.target!==null&&this.target.removeProperty(t)})}handleChange(t,r){const{sheet:n}=this.style;if(n){const i=n.insertRule(":host{}",n.cssRules.length);this.target=n.cssRules[i].style}else this.target=null}}g([be],_x.prototype,"target",void 0);class AS{constructor(t){this.target=t.style}setProperty(t,r){_e.queueUpdate(()=>this.target.setProperty(t,r))}removeProperty(t){_e.queueUpdate(()=>this.target.removeProperty(t))}}class wt{setProperty(t,r){wt.properties[t]=r;for(const n of wt.roots.values())Ko.getOrCreate(wt.normalizeRoot(n)).setProperty(t,r)}removeProperty(t){delete wt.properties[t];for(const r of wt.roots.values())Ko.getOrCreate(wt.normalizeRoot(r)).removeProperty(t)}static registerRoot(t){const{roots:r}=wt;if(!r.has(t)){r.add(t);const n=Ko.getOrCreate(this.normalizeRoot(t));for(const i in wt.properties)n.setProperty(i,wt.properties[i])}}static unregisterRoot(t){const{roots:r}=wt;if(r.has(t)){r.delete(t);const n=Ko.getOrCreate(wt.normalizeRoot(t));for(const i in wt.properties)n.removeProperty(i)}}static normalizeRoot(t){return t===jn?document:t}}wt.roots=new Set;wt.properties={};const Ld=new WeakMap,jS=_e.supportsAdoptedStyleSheets?OS:_x,Ko=Object.freeze({getOrCreate(e){if(Ld.has(e))return Ld.get(e);let t;return e===jn?t=new wt:e instanceof Document?t=_e.supportsAdoptedStyleSheets?new TS:new PS:ES(e)?t=new jS(e):t=new AS(e),Ld.set(e,t),t}});class Zt extends Jv{constructor(t){super(),this.subscribers=new WeakMap,this._appliedTo=new Set,this.name=t.name,t.cssCustomPropertyName!==null&&(this.cssCustomProperty=`--${t.cssCustomPropertyName}`,this.cssVar=`var(${this.cssCustomProperty})`),this.id=Zt.uniqueId(),Zt.tokensById.set(this.id,this)}get appliedTo(){return[...this._appliedTo]}static from(t){return new Zt({name:typeof t=="string"?t:t.name,cssCustomPropertyName:typeof t=="string"?t:t.cssCustomPropertyName===void 0?t.name:t.cssCustomPropertyName})}static isCSSDesignToken(t){return typeof t.cssCustomProperty=="string"}static isDerivedDesignTokenValue(t){return typeof t=="function"}static getTokenById(t){return Zt.tokensById.get(t)}getOrCreateSubscriberSet(t=this){return this.subscribers.get(t)||this.subscribers.set(t,new Set)&&this.subscribers.get(t)}createCSS(){return this.cssVar||""}getValueFor(t){const r=nt.getOrCreate(t).get(this);if(r!==void 0)return r;throw new Error(`Value could not be retrieved for token named "${this.name}". Ensure the value is set for ${t} or an ancestor of ${t}.`)}setValueFor(t,r){return this._appliedTo.add(t),r instanceof Zt&&(r=this.alias(r)),nt.getOrCreate(t).set(this,r),this}deleteValueFor(t){return this._appliedTo.delete(t),nt.existsFor(t)&&nt.getOrCreate(t).delete(this),this}withDefault(t){return this.setValueFor(jn,t),this}subscribe(t,r){const n=this.getOrCreateSubscriberSet(r);r&&!nt.existsFor(r)&&nt.getOrCreate(r),n.has(t)||n.add(t)}unsubscribe(t,r){const n=this.subscribers.get(r||this);n&&n.has(t)&&n.delete(t)}notify(t){const r=Object.freeze({token:this,target:t});this.subscribers.has(this)&&this.subscribers.get(this).forEach(n=>n.handleChange(r)),this.subscribers.has(t)&&this.subscribers.get(t).forEach(n=>n.handleChange(r))}alias(t){return r=>t.getValueFor(r)}}Zt.uniqueId=(()=>{let e=0;return()=>(e++,e.toString(16))})();Zt.tokensById=new Map;class NS{startReflection(t,r){t.subscribe(this,r),this.handleChange({token:t,target:r})}stopReflection(t,r){t.unsubscribe(this,r),this.remove(t,r)}handleChange(t){const{token:r,target:n}=t;this.add(r,n)}add(t,r){Ko.getOrCreate(r).setProperty(t.cssCustomProperty,this.resolveCSSValue(nt.getOrCreate(r).get(t)))}remove(t,r){Ko.getOrCreate(r).removeProperty(t.cssCustomProperty)}resolveCSSValue(t){return t&&typeof t.createCSS=="function"?t.createCSS():t}}class LS{constructor(t,r,n){this.source=t,this.token=r,this.node=n,this.dependencies=new Set,this.observer=we.binding(t,this,!1),this.observer.handleChange=this.observer.call,this.handleChange()}disconnect(){this.observer.disconnect()}handleChange(){this.node.store.set(this.token,this.observer.observe(this.node.target,La))}}class DS{constructor(){this.values=new Map}set(t,r){this.values.get(t)!==r&&(this.values.set(t,r),we.getNotifier(this).notify(t.id))}get(t){return we.track(this,t.id),this.values.get(t)}delete(t){this.values.delete(t)}all(){return this.values.entries()}}const oa=new WeakMap,sa=new WeakMap;class nt{constructor(t){this.target=t,this.store=new DS,this.children=[],this.assignedValues=new Map,this.reflecting=new Set,this.bindingObservers=new Map,this.tokenValueChangeHandler={handleChange:(r,n)=>{const i=Zt.getTokenById(n);if(i&&(i.notify(this.target),Zt.isCSSDesignToken(i))){const o=this.parent,s=this.isReflecting(i);if(o){const a=o.get(i),l=r.get(i);a!==l&&!s?this.reflectToCSS(i):a===l&&s&&this.stopReflectToCSS(i)}else s||this.reflectToCSS(i)}}},oa.set(t,this),we.getNotifier(this.store).subscribe(this.tokenValueChangeHandler),t instanceof sh?t.$fastController.addBehaviors([this]):t.isConnected&&this.bind()}static getOrCreate(t){return oa.get(t)||new nt(t)}static existsFor(t){return oa.has(t)}static findParent(t){if(jn!==t.target){let r=bc(t.target);for(;r!==null;){if(oa.has(r))return oa.get(r);r=bc(r)}return nt.getOrCreate(jn)}return null}static findClosestAssignedNode(t,r){let n=r;do{if(n.has(t))return n;n=n.parent?n.parent:n.target!==jn?nt.getOrCreate(jn):null}while(n!==null);return null}get parent(){return sa.get(this)||null}has(t){return this.assignedValues.has(t)}get(t){const r=this.store.get(t);if(r!==void 0)return r;const n=this.getRaw(t);if(n!==void 0)return this.hydrate(t,n),this.get(t)}getRaw(t){var r;return this.assignedValues.has(t)?this.assignedValues.get(t):(r=nt.findClosestAssignedNode(t,this))===null||r===void 0?void 0:r.getRaw(t)}set(t,r){Zt.isDerivedDesignTokenValue(this.assignedValues.get(t))&&this.tearDownBindingObserver(t),this.assignedValues.set(t,r),Zt.isDerivedDesignTokenValue(r)?this.setupBindingObserver(t,r):this.store.set(t,r)}delete(t){this.assignedValues.delete(t),this.tearDownBindingObserver(t);const r=this.getRaw(t);r?this.hydrate(t,r):this.store.delete(t)}bind(){const t=nt.findParent(this);t&&t.appendChild(this);for(const r of this.assignedValues.keys())r.notify(this.target)}unbind(){this.parent&&sa.get(this).removeChild(this)}appendChild(t){t.parent&&sa.get(t).removeChild(t);const r=this.children.filter(n=>t.contains(n));sa.set(t,this),this.children.push(t),r.forEach(n=>t.appendChild(n)),we.getNotifier(this.store).subscribe(t);for(const[n,i]of this.store.all())t.hydrate(n,this.bindingObservers.has(n)?this.getRaw(n):i)}removeChild(t){const r=this.children.indexOf(t);return r!==-1&&this.children.splice(r,1),we.getNotifier(this.store).unsubscribe(t),t.parent===this?sa.delete(t):!1}contains(t){return CS(this.target,t.target)}reflectToCSS(t){this.isReflecting(t)||(this.reflecting.add(t),nt.cssCustomPropertyReflector.startReflection(t,this.target))}stopReflectToCSS(t){this.isReflecting(t)&&(this.reflecting.delete(t),nt.cssCustomPropertyReflector.stopReflection(t,this.target))}isReflecting(t){return this.reflecting.has(t)}handleChange(t,r){const n=Zt.getTokenById(r);n&&this.hydrate(n,this.getRaw(n))}hydrate(t,r){if(!this.has(t)){const n=this.bindingObservers.get(t);Zt.isDerivedDesignTokenValue(r)?n?n.source!==r&&(this.tearDownBindingObserver(t),this.setupBindingObserver(t,r)):this.setupBindingObserver(t,r):(n&&this.tearDownBindingObserver(t),this.store.set(t,r))}}setupBindingObserver(t,r){const n=new LS(r,t,this);return this.bindingObservers.set(t,n),n}tearDownBindingObserver(t){return this.bindingObservers.has(t)?(this.bindingObservers.get(t).disconnect(),this.bindingObservers.delete(t),!0):!1}}nt.cssCustomPropertyReflector=new NS;g([be],nt.prototype,"children",void 0);function RS(e){return Zt.from(e)}const vh=Object.freeze({create:RS,notifyConnection(e){return!e.isConnected||!nt.existsFor(e)?!1:(nt.getOrCreate(e).bind(),!0)},notifyDisconnection(e){return e.isConnected||!nt.existsFor(e)?!1:(nt.getOrCreate(e).unbind(),!0)},registerRoot(e=jn){wt.registerRoot(e)},unregisterRoot(e=jn){wt.unregisterRoot(e)}}),Dd=Object.freeze({definitionCallbackOnly:null,ignoreDuplicate:Symbol()}),Rd=new Map,Fu=new Map;let os=null;const aa=qe.createInterface(e=>e.cachedCallback(t=>(os===null&&(os=new Sx(null,t)),os))),kx=Object.freeze({tagFor(e){return Fu.get(e)},responsibleFor(e){return e.$$designSystem$$||qe.findResponsibleContainer(e).get(aa)},getOrCreate(e){if(!e)return os===null&&(os=qe.getOrCreateDOMContainer().get(aa)),os;const t=e.$$designSystem$$;if(t)return t;const r=qe.getOrCreateDOMContainer(e);if(r.has(aa,!1))return r.get(aa);{const n=new Sx(e,r);return r.register(al.instance(aa,n)),n}}});function MS(e,t,r){return typeof e=="string"?{name:e,type:t,callback:r}:e}class Sx{constructor(t,r){this.owner=t,this.container=r,this.designTokensInitialized=!1,this.prefix="fast",this.shadowRootMode=void 0,this.disambiguate=()=>Dd.definitionCallbackOnly,t!==null&&(t.$$designSystem$$=this)}withPrefix(t){return this.prefix=t,this}withShadowRootMode(t){return this.shadowRootMode=t,this}withElementDisambiguation(t){return this.disambiguate=t,this}withDesignTokenRoot(t){return this.designTokenRoot=t,this}register(...t){const r=this.container,n=[],i=this.disambiguate,o=this.shadowRootMode,s={elementPrefix:this.prefix,tryDefineElement(a,l,u){const c=MS(a,l,u),{name:h,callback:d,baseClass:m}=c;let{type:y}=c,w=h,E=Rd.get(w),p=!0;for(;E;){const f=i(w,y,E);switch(f){case Dd.ignoreDuplicate:return;case Dd.definitionCallbackOnly:p=!1,E=void 0;break;default:w=f,E=Rd.get(w);break}}p&&((Fu.has(y)||y===Wt)&&(y=class extends y{}),Rd.set(w,y),Fu.set(y,w),m&&Fu.set(m,w)),n.push(new IS(r,w,y,o,d,p))}};this.designTokensInitialized||(this.designTokensInitialized=!0,this.designTokenRoot!==null&&vh.registerRoot(this.designTokenRoot)),r.registerWithContext(s,...t);for(const a of n)a.callback(a),a.willDefine&&a.definition!==null&&a.definition.define();return this}}class IS{constructor(t,r,n,i,o,s){this.container=t,this.name=r,this.type=n,this.shadowRootMode=i,this.callback=o,this.willDefine=s,this.definition=null}definePresentation(t){xx.define(this.name,t,this.container)}defineElement(t){this.definition=new oh(this.type,Object.assign(Object.assign({},t),{name:this.name}))}tagFor(t){return kx.tagFor(t)}}const FS=(e,t)=>St`
    <div class="positioning-region" part="positioning-region">
        ${eg(r=>r.modal,St`
                <div
                    class="overlay"
                    part="overlay"
                    role="presentation"
                    @click="${r=>r.dismiss()}"
                ></div>
            `)}
        <div
            role="dialog"
            tabindex="-1"
            class="control"
            part="control"
            aria-modal="${r=>r.modal}"
            aria-describedby="${r=>r.ariaDescribedby}"
            aria-labelledby="${r=>r.ariaLabelledby}"
            aria-label="${r=>r.ariaLabel}"
            ${Jt("dialog")}
        >
            <slot></slot>
        </div>
    </div>
`;/*!
* tabbable 5.3.3
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/var VS=["input","select","textarea","a[href]","button","[tabindex]:not(slot)","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])',"details>summary:first-of-type","details"],BS=VS.join(","),Cx=typeof Element>"u",xc=Cx?function(){}:Element.prototype.matches||Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector,dp=!Cx&&Element.prototype.getRootNode?function(e){return e.getRootNode()}:function(e){return e.ownerDocument},zS=function(e,t){return e.tabIndex<0&&(t||/^(AUDIO|VIDEO|DETAILS)$/.test(e.tagName)||e.isContentEditable)&&isNaN(parseInt(e.getAttribute("tabindex"),10))?0:e.tabIndex},Ex=function(e){return e.tagName==="INPUT"},HS=function(e){return Ex(e)&&e.type==="hidden"},US=function(e){var t=e.tagName==="DETAILS"&&Array.prototype.slice.apply(e.children).some(function(r){return r.tagName==="SUMMARY"});return t},qS=function(e,t){for(var r=0;r<e.length;r++)if(e[r].checked&&e[r].form===t)return e[r]},WS=function(e){if(!e.name)return!0;var t=e.form||dp(e),r=function(o){return t.querySelectorAll('input[type="radio"][name="'+o+'"]')},n;if(typeof window<"u"&&typeof window.CSS<"u"&&typeof window.CSS.escape=="function")n=r(window.CSS.escape(e.name));else try{n=r(e.name)}catch(o){return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s",o.message),!1}var i=qS(n,e.form);return!i||i===e},KS=function(e){return Ex(e)&&e.type==="radio"},GS=function(e){return KS(e)&&!WS(e)},S0=function(e){var t=e.getBoundingClientRect(),r=t.width,n=t.height;return r===0&&n===0},QS=function(e,t){var r=t.displayCheck,n=t.getShadowRoot;if(getComputedStyle(e).visibility==="hidden")return!0;var i=xc.call(e,"details>summary:first-of-type"),o=i?e.parentElement:e;if(xc.call(o,"details:not([open]) *"))return!0;var s=dp(e).host,a=(s==null?void 0:s.ownerDocument.contains(s))||e.ownerDocument.contains(e);if(!r||r==="full"){if(typeof n=="function"){for(var l=e;e;){var u=e.parentElement,c=dp(e);if(u&&!u.shadowRoot&&n(u)===!0)return S0(e);e.assignedSlot?e=e.assignedSlot:!u&&c!==e.ownerDocument?e=c.host:e=u}e=l}if(a)return!e.getClientRects().length}else if(r==="non-zero-area")return S0(e);return!1},ZS=function(e){if(/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(e.tagName))for(var t=e.parentElement;t;){if(t.tagName==="FIELDSET"&&t.disabled){for(var r=0;r<t.children.length;r++){var n=t.children.item(r);if(n.tagName==="LEGEND")return xc.call(t,"fieldset[disabled] *")?!0:!n.contains(e)}return!0}t=t.parentElement}return!1},XS=function(e,t){return!(t.disabled||HS(t)||QS(t,e)||US(t)||ZS(t))},YS=function(e,t){return!(GS(t)||zS(t)<0||!XS(e,t))},C0=function(e,t){if(t=t||{},!e)throw new Error("No node provided");return xc.call(e,BS)===!1?!1:YS(t,e)};class Lr extends Wt{constructor(){super(...arguments),this.modal=!0,this.hidden=!1,this.trapFocus=!0,this.trapFocusChanged=()=>{this.$fastController.isConnected&&this.updateTrapFocus()},this.isTrappingFocus=!1,this.handleDocumentKeydown=t=>{if(!t.defaultPrevented&&!this.hidden)switch(t.key){case uh:this.dismiss(),t.preventDefault();break;case hh:this.handleTabKeyDown(t);break}},this.handleDocumentFocus=t=>{!t.defaultPrevented&&this.shouldForceFocus(t.target)&&(this.focusFirstElement(),t.preventDefault())},this.handleTabKeyDown=t=>{if(!this.trapFocus||this.hidden)return;const r=this.getTabQueueBounds();if(r.length!==0){if(r.length===1){r[0].focus(),t.preventDefault();return}t.shiftKey&&t.target===r[0]?(r[r.length-1].focus(),t.preventDefault()):!t.shiftKey&&t.target===r[r.length-1]&&(r[0].focus(),t.preventDefault())}},this.getTabQueueBounds=()=>{const t=[];return Lr.reduceTabbableItems(t,this)},this.focusFirstElement=()=>{const t=this.getTabQueueBounds();t.length>0?t[0].focus():this.dialog instanceof HTMLElement&&this.dialog.focus()},this.shouldForceFocus=t=>this.isTrappingFocus&&!this.contains(t),this.shouldTrapFocus=()=>this.trapFocus&&!this.hidden,this.updateTrapFocus=t=>{const r=t===void 0?this.shouldTrapFocus():t;r&&!this.isTrappingFocus?(this.isTrappingFocus=!0,document.addEventListener("focusin",this.handleDocumentFocus),_e.queueUpdate(()=>{this.shouldForceFocus(document.activeElement)&&this.focusFirstElement()})):!r&&this.isTrappingFocus&&(this.isTrappingFocus=!1,document.removeEventListener("focusin",this.handleDocumentFocus))}}dismiss(){this.$emit("dismiss"),this.$emit("cancel")}show(){this.hidden=!1}hide(){this.hidden=!0,this.$emit("close")}connectedCallback(){super.connectedCallback(),document.addEventListener("keydown",this.handleDocumentKeydown),this.notifier=we.getNotifier(this),this.notifier.subscribe(this,"hidden"),this.updateTrapFocus()}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this.handleDocumentKeydown),this.updateTrapFocus(!1),this.notifier.unsubscribe(this,"hidden")}handleChange(t,r){switch(r){case"hidden":this.updateTrapFocus();break}}static reduceTabbableItems(t,r){return r.getAttribute("tabindex")==="-1"?t:C0(r)||Lr.isFocusableFastElement(r)&&Lr.hasTabbableShadow(r)?(t.push(r),t):r.childElementCount?t.concat(Array.from(r.children).reduce(Lr.reduceTabbableItems,[])):t}static isFocusableFastElement(t){var r,n;return!!(!((n=(r=t.$fastController)===null||r===void 0?void 0:r.definition.shadowOptions)===null||n===void 0)&&n.delegatesFocus)}static hasTabbableShadow(t){var r,n;return Array.from((n=(r=t.shadowRoot)===null||r===void 0?void 0:r.querySelectorAll("*"))!==null&&n!==void 0?n:[]).some(i=>C0(i))}}g([D({mode:"boolean"})],Lr.prototype,"modal",void 0);g([D({mode:"boolean"})],Lr.prototype,"hidden",void 0);g([D({attribute:"trap-focus",mode:"boolean"})],Lr.prototype,"trapFocus",void 0);g([D({attribute:"aria-describedby"})],Lr.prototype,"ariaDescribedby",void 0);g([D({attribute:"aria-labelledby"})],Lr.prototype,"ariaLabelledby",void 0);g([D({attribute:"aria-label"})],Lr.prototype,"ariaLabel",void 0);const JS=(e,t)=>St`
    <template
        aria-checked="${r=>r.ariaChecked}"
        aria-disabled="${r=>r.ariaDisabled}"
        aria-posinset="${r=>r.ariaPosInSet}"
        aria-selected="${r=>r.ariaSelected}"
        aria-setsize="${r=>r.ariaSetSize}"
        class="${r=>[r.checked&&"checked",r.selected&&"selected",r.disabled&&"disabled"].filter(Boolean).join(" ")}"
        role="option"
    >
        ${Ol(e,t)}
        <span class="content" part="content">
            <slot ${vo("content")}></slot>
        </span>
        ${El(e,t)}
    </template>
`;class Tl extends Ut{constructor(){super(...arguments),this.activeIndex=-1,this.rangeStartIndex=-1}get activeOption(){return this.options[this.activeIndex]}get checkedOptions(){var t;return(t=this.options)===null||t===void 0?void 0:t.filter(r=>r.checked)}get firstSelectedOptionIndex(){return this.options.indexOf(this.firstSelectedOption)}activeIndexChanged(t,r){var n,i;this.ariaActiveDescendant=(i=(n=this.options[r])===null||n===void 0?void 0:n.id)!==null&&i!==void 0?i:"",this.focusAndScrollOptionIntoView()}checkActiveIndex(){if(!this.multiple)return;const t=this.activeOption;t&&(t.checked=!0)}checkFirstOption(t=!1){t?(this.rangeStartIndex===-1&&(this.rangeStartIndex=this.activeIndex+1),this.options.forEach((r,n)=>{r.checked=bu(n,this.rangeStartIndex)})):this.uncheckAllOptions(),this.activeIndex=0,this.checkActiveIndex()}checkLastOption(t=!1){t?(this.rangeStartIndex===-1&&(this.rangeStartIndex=this.activeIndex),this.options.forEach((r,n)=>{r.checked=bu(n,this.rangeStartIndex,this.options.length)})):this.uncheckAllOptions(),this.activeIndex=this.options.length-1,this.checkActiveIndex()}connectedCallback(){super.connectedCallback(),this.addEventListener("focusout",this.focusoutHandler)}disconnectedCallback(){this.removeEventListener("focusout",this.focusoutHandler),super.disconnectedCallback()}checkNextOption(t=!1){t?(this.rangeStartIndex===-1&&(this.rangeStartIndex=this.activeIndex),this.options.forEach((r,n)=>{r.checked=bu(n,this.rangeStartIndex,this.activeIndex+1)})):this.uncheckAllOptions(),this.activeIndex+=this.activeIndex<this.options.length-1?1:0,this.checkActiveIndex()}checkPreviousOption(t=!1){t?(this.rangeStartIndex===-1&&(this.rangeStartIndex=this.activeIndex),this.checkedOptions.length===1&&(this.rangeStartIndex+=1),this.options.forEach((r,n)=>{r.checked=bu(n,this.activeIndex,this.rangeStartIndex)})):this.uncheckAllOptions(),this.activeIndex-=this.activeIndex>0?1:0,this.checkActiveIndex()}clickHandler(t){var r;if(!this.multiple)return super.clickHandler(t);const n=(r=t.target)===null||r===void 0?void 0:r.closest("[role=option]");if(!(!n||n.disabled))return this.uncheckAllOptions(),this.activeIndex=this.options.indexOf(n),this.checkActiveIndex(),this.toggleSelectedForAllCheckedOptions(),!0}focusAndScrollOptionIntoView(){super.focusAndScrollOptionIntoView(this.activeOption)}focusinHandler(t){if(!this.multiple)return super.focusinHandler(t);!this.shouldSkipFocus&&t.target===t.currentTarget&&(this.uncheckAllOptions(),this.activeIndex===-1&&(this.activeIndex=this.firstSelectedOptionIndex!==-1?this.firstSelectedOptionIndex:0),this.checkActiveIndex(),this.setSelectedOptions(),this.focusAndScrollOptionIntoView()),this.shouldSkipFocus=!1}focusoutHandler(t){this.multiple&&this.uncheckAllOptions()}keydownHandler(t){if(!this.multiple)return super.keydownHandler(t);if(this.disabled)return!0;const{key:r,shiftKey:n}=t;switch(this.shouldSkipFocus=!1,r){case rg:{this.checkFirstOption(n);return}case ah:{this.checkNextOption(n);return}case lh:{this.checkPreviousOption(n);return}case ng:{this.checkLastOption(n);return}case hh:return this.focusAndScrollOptionIntoView(),!0;case uh:return this.uncheckAllOptions(),this.checkActiveIndex(),!0;case ch:if(t.preventDefault(),this.typeAheadExpired){this.toggleSelectedForAllCheckedOptions();return}default:return r.length===1&&this.handleTypeAhead(`${r}`),!0}}mousedownHandler(t){if(t.offsetX>=0&&t.offsetX<=this.scrollWidth)return super.mousedownHandler(t)}multipleChanged(t,r){var n;this.ariaMultiSelectable=r?"true":null,(n=this.options)===null||n===void 0||n.forEach(i=>{i.checked=r?!1:void 0}),this.setSelectedOptions()}setSelectedOptions(){if(!this.multiple){super.setSelectedOptions();return}this.$fastController.isConnected&&this.options&&(this.selectedOptions=this.options.filter(t=>t.selected),this.focusAndScrollOptionIntoView())}sizeChanged(t,r){var n;const i=Math.max(0,parseInt((n=r==null?void 0:r.toFixed())!==null&&n!==void 0?n:"",10));i!==r&&_e.queueUpdate(()=>{this.size=i})}toggleSelectedForAllCheckedOptions(){const t=this.checkedOptions.filter(n=>!n.disabled),r=!t.every(n=>n.selected);t.forEach(n=>n.selected=r),this.selectedIndex=this.options.indexOf(t[t.length-1]),this.setSelectedOptions()}typeaheadBufferChanged(t,r){if(!this.multiple){super.typeaheadBufferChanged(t,r);return}if(this.$fastController.isConnected){const n=this.getTypeaheadMatches(),i=this.options.indexOf(n[0]);i>-1&&(this.activeIndex=i,this.uncheckAllOptions(),this.checkActiveIndex()),this.typeAheadExpired=!1}}uncheckAllOptions(t=!1){this.options.forEach(r=>r.checked=this.multiple?!1:void 0),t||(this.rangeStartIndex=-1)}}g([be],Tl.prototype,"activeIndex",void 0);g([D({mode:"boolean"})],Tl.prototype,"multiple",void 0);g([D({converter:Rt})],Tl.prototype,"size",void 0);const eC=(e,t)=>St`
    <template class="${r=>r.readOnly?"readonly":""}">
        <label
            part="label"
            for="control"
            class="${r=>r.defaultSlottedNodes&&r.defaultSlottedNodes.length?"label":"label label__hidden"}"
        >
            <slot ${vo("defaultSlottedNodes")}></slot>
        </label>
        <div class="root" part="root">
            ${Ol(e,t)}
            <input
                class="control"
                part="control"
                id="control"
                @input="${r=>r.handleTextInput()}"
                @change="${r=>r.handleChange()}"
                @keydown="${(r,n)=>r.handleKeyDown(n.event)}"
                @blur="${(r,n)=>r.handleBlur()}"
                ?autofocus="${r=>r.autofocus}"
                ?disabled="${r=>r.disabled}"
                list="${r=>r.list}"
                maxlength="${r=>r.maxlength}"
                minlength="${r=>r.minlength}"
                placeholder="${r=>r.placeholder}"
                ?readonly="${r=>r.readOnly}"
                ?required="${r=>r.required}"
                size="${r=>r.size}"
                type="text"
                inputmode="numeric"
                min="${r=>r.min}"
                max="${r=>r.max}"
                step="${r=>r.step}"
                aria-atomic="${r=>r.ariaAtomic}"
                aria-busy="${r=>r.ariaBusy}"
                aria-controls="${r=>r.ariaControls}"
                aria-current="${r=>r.ariaCurrent}"
                aria-describedby="${r=>r.ariaDescribedby}"
                aria-details="${r=>r.ariaDetails}"
                aria-disabled="${r=>r.ariaDisabled}"
                aria-errormessage="${r=>r.ariaErrormessage}"
                aria-flowto="${r=>r.ariaFlowto}"
                aria-haspopup="${r=>r.ariaHaspopup}"
                aria-hidden="${r=>r.ariaHidden}"
                aria-invalid="${r=>r.ariaInvalid}"
                aria-keyshortcuts="${r=>r.ariaKeyshortcuts}"
                aria-label="${r=>r.ariaLabel}"
                aria-labelledby="${r=>r.ariaLabelledby}"
                aria-live="${r=>r.ariaLive}"
                aria-owns="${r=>r.ariaOwns}"
                aria-relevant="${r=>r.ariaRelevant}"
                aria-roledescription="${r=>r.ariaRoledescription}"
                ${Jt("control")}
            />
            ${eg(r=>!r.hideStep&&!r.readOnly&&!r.disabled,St`
                    <div class="controls" part="controls">
                        <div class="step-up" part="step-up" @click="${r=>r.stepUp()}">
                            <slot name="step-up-glyph">
                                ${t.stepUpGlyph||""}
                            </slot>
                        </div>
                        <div
                            class="step-down"
                            part="step-down"
                            @click="${r=>r.stepDown()}"
                        >
                            <slot name="step-down-glyph">
                                ${t.stepDownGlyph||""}
                            </slot>
                        </div>
                    </div>
                `)}
            ${El(e,t)}
        </div>
    </template>
`;class tC extends Wt{}class rC extends go(tC){constructor(){super(...arguments),this.proxy=document.createElement("input")}}const nC={email:"email",password:"password",tel:"tel",text:"text",url:"url"};let dr=class extends rC{constructor(){super(...arguments),this.type=nC.text}readOnlyChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.readOnly=this.readOnly,this.validate())}autofocusChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.autofocus=this.autofocus,this.validate())}placeholderChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.placeholder=this.placeholder)}typeChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.type=this.type,this.validate())}listChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.setAttribute("list",this.list),this.validate())}maxlengthChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.maxLength=this.maxlength,this.validate())}minlengthChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.minLength=this.minlength,this.validate())}patternChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.pattern=this.pattern,this.validate())}sizeChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.size=this.size)}spellcheckChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.spellcheck=this.spellcheck)}connectedCallback(){super.connectedCallback(),this.proxy.setAttribute("type",this.type),this.validate(),this.autofocus&&_e.queueUpdate(()=>{this.focus()})}select(){this.control.select(),this.$emit("select")}handleTextInput(){this.value=this.control.value}handleChange(){this.$emit("change")}validate(){super.validate(this.control)}};g([D({attribute:"readonly",mode:"boolean"})],dr.prototype,"readOnly",void 0);g([D({mode:"boolean"})],dr.prototype,"autofocus",void 0);g([D],dr.prototype,"placeholder",void 0);g([D],dr.prototype,"type",void 0);g([D],dr.prototype,"list",void 0);g([D({converter:Rt})],dr.prototype,"maxlength",void 0);g([D({converter:Rt})],dr.prototype,"minlength",void 0);g([D],dr.prototype,"pattern",void 0);g([D({converter:Rt})],dr.prototype,"size",void 0);g([D({mode:"boolean"})],dr.prototype,"spellcheck",void 0);g([be],dr.prototype,"defaultSlottedNodes",void 0);class gh{}hr(gh,Qe);hr(dr,js,gh);class iC extends Wt{}class oC extends go(iC){constructor(){super(...arguments),this.proxy=document.createElement("input")}}let rr=class extends oC{constructor(){super(...arguments),this.hideStep=!1,this.step=1,this.isUserInput=!1}maxChanged(e,t){var r;this.max=Math.max(t,(r=this.min)!==null&&r!==void 0?r:t);const n=Math.min(this.min,this.max);this.min!==void 0&&this.min!==n&&(this.min=n),this.value=this.getValidValue(this.value)}minChanged(e,t){var r;this.min=Math.min(t,(r=this.max)!==null&&r!==void 0?r:t);const n=Math.max(this.min,this.max);this.max!==void 0&&this.max!==n&&(this.max=n),this.value=this.getValidValue(this.value)}get valueAsNumber(){return parseFloat(super.value)}set valueAsNumber(e){this.value=e.toString()}valueChanged(e,t){this.value=this.getValidValue(t),t===this.value&&(this.control&&!this.isUserInput&&(this.control.value=this.value),super.valueChanged(e,this.value),e!==void 0&&!this.isUserInput&&(this.$emit("input"),this.$emit("change")),this.isUserInput=!1)}validate(){super.validate(this.control)}getValidValue(e){var t,r;let n=parseFloat(parseFloat(e).toPrecision(12));return isNaN(n)?n="":(n=Math.min(n,(t=this.max)!==null&&t!==void 0?t:n),n=Math.max(n,(r=this.min)!==null&&r!==void 0?r:n).toString()),n}stepUp(){const e=parseFloat(this.value),t=isNaN(e)?this.min>0?this.min:this.max<0?this.max:this.min?0:this.step:e+this.step;this.value=t.toString()}stepDown(){const e=parseFloat(this.value),t=isNaN(e)?this.min>0?this.min:this.max<0?this.max:this.min?0:0-this.step:e-this.step;this.value=t.toString()}connectedCallback(){super.connectedCallback(),this.proxy.setAttribute("type","number"),this.validate(),this.control.value=this.value,this.autofocus&&_e.queueUpdate(()=>{this.focus()})}select(){this.control.select(),this.$emit("select")}handleTextInput(){this.control.value=this.control.value.replace(/[^0-9\-+e.]/g,""),this.isUserInput=!0,this.value=this.control.value}handleChange(){this.$emit("change")}handleKeyDown(e){switch(e.key){case lh:return this.stepUp(),!1;case ah:return this.stepDown(),!1}return!0}handleBlur(){this.control.value=this.value}};g([D({attribute:"readonly",mode:"boolean"})],rr.prototype,"readOnly",void 0);g([D({mode:"boolean"})],rr.prototype,"autofocus",void 0);g([D({attribute:"hide-step",mode:"boolean"})],rr.prototype,"hideStep",void 0);g([D],rr.prototype,"placeholder",void 0);g([D],rr.prototype,"list",void 0);g([D({converter:Rt})],rr.prototype,"maxlength",void 0);g([D({converter:Rt})],rr.prototype,"minlength",void 0);g([D({converter:Rt})],rr.prototype,"size",void 0);g([D({converter:Rt})],rr.prototype,"step",void 0);g([D({converter:Rt})],rr.prototype,"max",void 0);g([D({converter:Rt})],rr.prototype,"min",void 0);g([be],rr.prototype,"defaultSlottedNodes",void 0);hr(rr,js,gh);const E0=44,sC=(e,t)=>St`
    <template
        role="progressbar"
        aria-valuenow="${r=>r.value}"
        aria-valuemin="${r=>r.min}"
        aria-valuemax="${r=>r.max}"
        class="${r=>r.paused?"paused":""}"
    >
        ${eg(r=>typeof r.value=="number",St`
                <svg
                    class="progress"
                    part="progress"
                    viewBox="0 0 16 16"
                    slot="determinate"
                >
                    <circle
                        class="background"
                        part="background"
                        cx="8px"
                        cy="8px"
                        r="7px"
                    ></circle>
                    <circle
                        class="determinate"
                        part="determinate"
                        style="stroke-dasharray: ${r=>E0*r.percentComplete/100}px ${E0}px"
                        cx="8px"
                        cy="8px"
                        r="7px"
                    ></circle>
                </svg>
            `,St`
                <slot name="indeterminate" slot="indeterminate">
                    ${t.indeterminateIndicator||""}
                </slot>
            `)}
    </template>
`;class Ls extends Wt{constructor(){super(...arguments),this.percentComplete=0}valueChanged(){this.$fastController.isConnected&&this.updatePercentComplete()}minChanged(){this.$fastController.isConnected&&this.updatePercentComplete()}maxChanged(){this.$fastController.isConnected&&this.updatePercentComplete()}connectedCallback(){super.connectedCallback(),this.updatePercentComplete()}updatePercentComplete(){const t=typeof this.min=="number"?this.min:0,r=typeof this.max=="number"?this.max:100,n=typeof this.value=="number"?this.value:0,i=r-t;this.percentComplete=i===0?0:Math.fround((n-t)/i*100)}}g([D({converter:Rt})],Ls.prototype,"value",void 0);g([D({converter:Rt})],Ls.prototype,"min",void 0);g([D({converter:Rt})],Ls.prototype,"max",void 0);g([D({mode:"boolean"})],Ls.prototype,"paused",void 0);g([be],Ls.prototype,"percentComplete",void 0);function aC(e,t,r){return e.nodeType!==Node.TEXT_NODE?!0:typeof e.nodeValue=="string"&&!!e.nodeValue.trim().length}class lC extends Tl{}class uC extends go(lC){constructor(){super(...arguments),this.proxy=document.createElement("select")}}class ki extends uC{constructor(){super(...arguments),this.open=!1,this.forcedPosition=!1,this.listboxId=ig("listbox-"),this.maxHeight=0}openChanged(t,r){if(this.collapsible){if(this.open){this.ariaControls=this.listboxId,this.ariaExpanded="true",this.setPositioning(),this.focusAndScrollOptionIntoView(),this.indexWhenOpened=this.selectedIndex,_e.queueUpdate(()=>this.focus());return}this.ariaControls="",this.ariaExpanded="false"}}get collapsible(){return!(this.multiple||typeof this.size=="number")}get value(){return we.track(this,"value"),this._value}set value(t){var r,n,i,o,s,a,l;const u=`${this._value}`;if(!((r=this._options)===null||r===void 0)&&r.length){const c=this._options.findIndex(m=>m.value===t),h=(i=(n=this._options[this.selectedIndex])===null||n===void 0?void 0:n.value)!==null&&i!==void 0?i:null,d=(s=(o=this._options[c])===null||o===void 0?void 0:o.value)!==null&&s!==void 0?s:null;(c===-1||h!==d)&&(t="",this.selectedIndex=c),t=(l=(a=this.firstSelectedOption)===null||a===void 0?void 0:a.value)!==null&&l!==void 0?l:t}u!==t&&(this._value=t,super.valueChanged(u,t),we.notify(this,"value"),this.updateDisplayValue())}updateValue(t){var r,n;this.$fastController.isConnected&&(this.value=(n=(r=this.firstSelectedOption)===null||r===void 0?void 0:r.value)!==null&&n!==void 0?n:""),t&&(this.$emit("input"),this.$emit("change",this,{bubbles:!0,composed:void 0}))}selectedIndexChanged(t,r){super.selectedIndexChanged(t,r),this.updateValue()}positionChanged(t,r){this.positionAttribute=r,this.setPositioning()}setPositioning(){const t=this.getBoundingClientRect(),r=window.innerHeight-t.bottom;this.position=this.forcedPosition?this.positionAttribute:t.top>r?is.above:is.below,this.positionAttribute=this.forcedPosition?this.positionAttribute:this.position,this.maxHeight=this.position===is.above?~~t.top:~~r}get displayValue(){var t,r;return we.track(this,"displayValue"),(r=(t=this.firstSelectedOption)===null||t===void 0?void 0:t.text)!==null&&r!==void 0?r:""}disabledChanged(t,r){super.disabledChanged&&super.disabledChanged(t,r),this.ariaDisabled=this.disabled?"true":"false"}formResetCallback(){this.setProxyOptions(),super.setDefaultSelectedOption(),this.selectedIndex===-1&&(this.selectedIndex=0)}clickHandler(t){if(!this.disabled){if(this.open){const r=t.target.closest("option,[role=option]");if(r&&r.disabled)return}return super.clickHandler(t),this.open=this.collapsible&&!this.open,!this.open&&this.indexWhenOpened!==this.selectedIndex&&this.updateValue(!0),!0}}focusoutHandler(t){var r;if(super.focusoutHandler(t),!this.open)return!0;const n=t.relatedTarget;if(this.isSameNode(n)){this.focus();return}!((r=this.options)===null||r===void 0)&&r.includes(n)||(this.open=!1,this.indexWhenOpened!==this.selectedIndex&&this.updateValue(!0))}handleChange(t,r){super.handleChange(t,r),r==="value"&&this.updateValue()}slottedOptionsChanged(t,r){this.options.forEach(n=>{we.getNotifier(n).unsubscribe(this,"value")}),super.slottedOptionsChanged(t,r),this.options.forEach(n=>{we.getNotifier(n).subscribe(this,"value")}),this.setProxyOptions(),this.updateValue()}mousedownHandler(t){var r;return t.offsetX>=0&&t.offsetX<=((r=this.listbox)===null||r===void 0?void 0:r.scrollWidth)?super.mousedownHandler(t):this.collapsible}multipleChanged(t,r){super.multipleChanged(t,r),this.proxy&&(this.proxy.multiple=r)}selectedOptionsChanged(t,r){var n;super.selectedOptionsChanged(t,r),(n=this.options)===null||n===void 0||n.forEach((i,o)=>{var s;const a=(s=this.proxy)===null||s===void 0?void 0:s.options.item(o);a&&(a.selected=i.selected)})}setDefaultSelectedOption(){var t;const r=(t=this.options)!==null&&t!==void 0?t:Array.from(this.children).filter(Ut.slottedOptionFilter),n=r==null?void 0:r.findIndex(i=>i.hasAttribute("selected")||i.selected||i.value===this.value);if(n!==-1){this.selectedIndex=n;return}this.selectedIndex=0}setProxyOptions(){this.proxy instanceof HTMLSelectElement&&this.options&&(this.proxy.options.length=0,this.options.forEach(t=>{const r=t.proxy||(t instanceof HTMLOptionElement?t.cloneNode():null);r&&this.proxy.options.add(r)}))}keydownHandler(t){super.keydownHandler(t);const r=t.key||t.key.charCodeAt(0);switch(r){case ch:{t.preventDefault(),this.collapsible&&this.typeAheadExpired&&(this.open=!this.open);break}case rg:case ng:{t.preventDefault();break}case tg:{t.preventDefault(),this.open=!this.open;break}case uh:{this.collapsible&&this.open&&(t.preventDefault(),this.open=!1);break}case hh:return this.collapsible&&this.open&&(t.preventDefault(),this.open=!1),!0}return!this.open&&this.indexWhenOpened!==this.selectedIndex&&(this.updateValue(!0),this.indexWhenOpened=this.selectedIndex),!(r===ah||r===lh)}connectedCallback(){super.connectedCallback(),this.forcedPosition=!!this.positionAttribute,this.addEventListener("contentchange",this.updateDisplayValue)}disconnectedCallback(){this.removeEventListener("contentchange",this.updateDisplayValue),super.disconnectedCallback()}sizeChanged(t,r){super.sizeChanged(t,r),this.proxy&&(this.proxy.size=r)}updateDisplayValue(){this.collapsible&&we.notify(this,"displayValue")}}g([D({attribute:"open",mode:"boolean"})],ki.prototype,"open",void 0);g([b2],ki.prototype,"collapsible",null);g([be],ki.prototype,"control",void 0);g([D({attribute:"position"})],ki.prototype,"positionAttribute",void 0);g([be],ki.prototype,"position",void 0);g([be],ki.prototype,"maxHeight",void 0);class sg{}g([be],sg.prototype,"ariaControls",void 0);hr(sg,_i);hr(ki,js,sg);class cC extends Wt{}class hC extends go(cC){constructor(){super(...arguments),this.proxy=document.createElement("textarea")}}const Ox={none:"none",both:"both",horizontal:"horizontal",vertical:"vertical"};let Gt=class extends hC{constructor(){super(...arguments),this.resize=Ox.none,this.cols=20,this.handleTextInput=()=>{this.value=this.control.value}}readOnlyChanged(){this.proxy instanceof HTMLTextAreaElement&&(this.proxy.readOnly=this.readOnly)}autofocusChanged(){this.proxy instanceof HTMLTextAreaElement&&(this.proxy.autofocus=this.autofocus)}listChanged(){this.proxy instanceof HTMLTextAreaElement&&this.proxy.setAttribute("list",this.list)}maxlengthChanged(){this.proxy instanceof HTMLTextAreaElement&&(this.proxy.maxLength=this.maxlength)}minlengthChanged(){this.proxy instanceof HTMLTextAreaElement&&(this.proxy.minLength=this.minlength)}spellcheckChanged(){this.proxy instanceof HTMLTextAreaElement&&(this.proxy.spellcheck=this.spellcheck)}select(){this.control.select(),this.$emit("select")}handleChange(){this.$emit("change")}validate(){super.validate(this.control)}};g([D({mode:"boolean"})],Gt.prototype,"readOnly",void 0);g([D],Gt.prototype,"resize",void 0);g([D({mode:"boolean"})],Gt.prototype,"autofocus",void 0);g([D({attribute:"form"})],Gt.prototype,"formId",void 0);g([D],Gt.prototype,"list",void 0);g([D({converter:Rt})],Gt.prototype,"maxlength",void 0);g([D({converter:Rt})],Gt.prototype,"minlength",void 0);g([D],Gt.prototype,"name",void 0);g([D],Gt.prototype,"placeholder",void 0);g([D({converter:Rt,mode:"fromView"})],Gt.prototype,"cols",void 0);g([D({converter:Rt,mode:"fromView"})],Gt.prototype,"rows",void 0);g([D({mode:"boolean"})],Gt.prototype,"spellcheck",void 0);g([be],Gt.prototype,"defaultSlottedNodes",void 0);hr(Gt,gh);const dC=(e,t)=>St`
    <template
        class="
            ${r=>r.readOnly?"readonly":""}
            ${r=>r.resize!==Ox.none?`resize-${r.resize}`:""}"
    >
        <label
            part="label"
            for="control"
            class="${r=>r.defaultSlottedNodes&&r.defaultSlottedNodes.length?"label":"label label__hidden"}"
        >
            <slot ${vo("defaultSlottedNodes")}></slot>
        </label>
        <textarea
            part="control"
            class="control"
            id="control"
            ?autofocus="${r=>r.autofocus}"
            cols="${r=>r.cols}"
            ?disabled="${r=>r.disabled}"
            form="${r=>r.form}"
            list="${r=>r.list}"
            maxlength="${r=>r.maxlength}"
            minlength="${r=>r.minlength}"
            name="${r=>r.name}"
            placeholder="${r=>r.placeholder}"
            ?readonly="${r=>r.readOnly}"
            ?required="${r=>r.required}"
            rows="${r=>r.rows}"
            ?spellcheck="${r=>r.spellcheck}"
            :value="${r=>r.value}"
            aria-atomic="${r=>r.ariaAtomic}"
            aria-busy="${r=>r.ariaBusy}"
            aria-controls="${r=>r.ariaControls}"
            aria-current="${r=>r.ariaCurrent}"
            aria-describedby="${r=>r.ariaDescribedby}"
            aria-details="${r=>r.ariaDetails}"
            aria-disabled="${r=>r.ariaDisabled}"
            aria-errormessage="${r=>r.ariaErrormessage}"
            aria-flowto="${r=>r.ariaFlowto}"
            aria-haspopup="${r=>r.ariaHaspopup}"
            aria-hidden="${r=>r.ariaHidden}"
            aria-invalid="${r=>r.ariaInvalid}"
            aria-keyshortcuts="${r=>r.ariaKeyshortcuts}"
            aria-label="${r=>r.ariaLabel}"
            aria-labelledby="${r=>r.ariaLabelledby}"
            aria-live="${r=>r.ariaLive}"
            aria-owns="${r=>r.ariaOwns}"
            aria-relevant="${r=>r.ariaRelevant}"
            aria-roledescription="${r=>r.ariaRoledescription}"
            @input="${(r,n)=>r.handleTextInput()}"
            @change="${r=>r.handleChange()}"
            ${Jt("control")}
        ></textarea>
    </template>
`,fC=(e,t)=>St`
    <template
        class="
            ${r=>r.readOnly?"readonly":""}
        "
    >
        <label
            part="label"
            for="control"
            class="${r=>r.defaultSlottedNodes&&r.defaultSlottedNodes.length?"label":"label label__hidden"}"
        >
            <slot
                ${vo({property:"defaultSlottedNodes",filter:aC})}
            ></slot>
        </label>
        <div class="root" part="root">
            ${Ol(e,t)}
            <input
                class="control"
                part="control"
                id="control"
                @input="${r=>r.handleTextInput()}"
                @change="${r=>r.handleChange()}"
                ?autofocus="${r=>r.autofocus}"
                ?disabled="${r=>r.disabled}"
                list="${r=>r.list}"
                maxlength="${r=>r.maxlength}"
                minlength="${r=>r.minlength}"
                pattern="${r=>r.pattern}"
                placeholder="${r=>r.placeholder}"
                ?readonly="${r=>r.readOnly}"
                ?required="${r=>r.required}"
                size="${r=>r.size}"
                ?spellcheck="${r=>r.spellcheck}"
                :value="${r=>r.value}"
                type="${r=>r.type}"
                aria-atomic="${r=>r.ariaAtomic}"
                aria-busy="${r=>r.ariaBusy}"
                aria-controls="${r=>r.ariaControls}"
                aria-current="${r=>r.ariaCurrent}"
                aria-describedby="${r=>r.ariaDescribedby}"
                aria-details="${r=>r.ariaDetails}"
                aria-disabled="${r=>r.ariaDisabled}"
                aria-errormessage="${r=>r.ariaErrormessage}"
                aria-flowto="${r=>r.ariaFlowto}"
                aria-haspopup="${r=>r.ariaHaspopup}"
                aria-hidden="${r=>r.ariaHidden}"
                aria-invalid="${r=>r.ariaInvalid}"
                aria-keyshortcuts="${r=>r.ariaKeyshortcuts}"
                aria-label="${r=>r.ariaLabel}"
                aria-labelledby="${r=>r.ariaLabelledby}"
                aria-live="${r=>r.ariaLive}"
                aria-owns="${r=>r.ariaOwns}"
                aria-relevant="${r=>r.ariaRelevant}"
                aria-roledescription="${r=>r.ariaRoledescription}"
                ${Jt("control")}
            />
            ${El(e,t)}
        </div>
    </template>
`;class pC{constructor(t){this.listenerCache=new WeakMap,this.query=t}bind(t){const{query:r}=this,n=this.constructListener(t);n.bind(r)(),r.addListener(n),this.listenerCache.set(t,n)}unbind(t){const r=this.listenerCache.get(t);r&&(this.query.removeListener(r),this.listenerCache.delete(t))}}class Pl extends pC{constructor(t,r){super(t),this.styles=r}static with(t){return r=>new Pl(t,r)}constructListener(t){let r=!1;const n=this.styles;return function(){const{matches:i}=this;i&&!r?(t.$fastController.addStyles(n),r=i):!i&&r&&(t.$fastController.removeStyles(n),r=i)}}unbind(t){super.unbind(t),t.$fastController.removeStyles(this.styles)}}const ct=Pl.with(window.matchMedia("(forced-colors)"));Pl.with(window.matchMedia("(prefers-color-scheme: dark)"));Pl.with(window.matchMedia("(prefers-color-scheme: light)"));class vC{constructor(t,r,n){this.propertyName=t,this.value=r,this.styles=n}bind(t){we.getNotifier(t).subscribe(this,this.propertyName),this.handleChange(t,this.propertyName)}unbind(t){we.getNotifier(t).unsubscribe(this,this.propertyName),t.$fastController.removeStyles(this.styles)}handleChange(t,r){t[r]===this.value?t.$fastController.addStyles(this.styles):t.$fastController.removeStyles(this.styles)}}const en="not-allowed",gC=":host([hidden]){display:none}";function _n(e){return`${gC}:host{display:${e}}`}const ge=dS()?"focus-visible":"focus";function On(e,t,r){return isNaN(e)||e<=t?t:e>=r?r:e}function Md(e,t,r){return isNaN(e)||e<=t?0:e>=r?1:e/(r-t)}function Li(e,t,r){return isNaN(e)?t:t+e*(r-t)}function O0(e){return e*(Math.PI/180)}function mC(e){return e*(180/Math.PI)}function yC(e){const t=Math.round(On(e,0,255)).toString(16);return t.length===1?"0"+t:t}function zt(e,t,r){return isNaN(e)||e<=0?t:e>=1?r:t+e*(r-t)}function ag(e,t,r){if(e<=0)return t%360;if(e>=1)return r%360;const n=(t-r+360)%360,i=(r-t+360)%360;return n<=i?(t-n*e+360)%360:(t+n*e+360)%360}function mt(e,t){const r=Math.pow(10,t);return Math.round(e*r)/r}class Ji{constructor(t,r,n){this.h=t,this.s=r,this.l=n}static fromObject(t){return t&&!isNaN(t.h)&&!isNaN(t.s)&&!isNaN(t.l)?new Ji(t.h,t.s,t.l):null}equalValue(t){return this.h===t.h&&this.s===t.s&&this.l===t.l}roundToPrecision(t){return new Ji(mt(this.h,t),mt(this.s,t),mt(this.l,t))}toObject(){return{h:this.h,s:this.s,l:this.l}}}class ll{constructor(t,r,n){this.h=t,this.s=r,this.v=n}static fromObject(t){return t&&!isNaN(t.h)&&!isNaN(t.s)&&!isNaN(t.v)?new ll(t.h,t.s,t.v):null}equalValue(t){return this.h===t.h&&this.s===t.s&&this.v===t.v}roundToPrecision(t){return new ll(mt(this.h,t),mt(this.s,t),mt(this.v,t))}toObject(){return{h:this.h,s:this.s,v:this.v}}}class Nt{constructor(t,r,n){this.l=t,this.a=r,this.b=n}static fromObject(t){return t&&!isNaN(t.l)&&!isNaN(t.a)&&!isNaN(t.b)?new Nt(t.l,t.a,t.b):null}equalValue(t){return this.l===t.l&&this.a===t.a&&this.b===t.b}roundToPrecision(t){return new Nt(mt(this.l,t),mt(this.a,t),mt(this.b,t))}toObject(){return{l:this.l,a:this.a,b:this.b}}}Nt.epsilon=216/24389;Nt.kappa=24389/27;class ms{constructor(t,r,n){this.l=t,this.c=r,this.h=n}static fromObject(t){return t&&!isNaN(t.l)&&!isNaN(t.c)&&!isNaN(t.h)?new ms(t.l,t.c,t.h):null}equalValue(t){return this.l===t.l&&this.c===t.c&&this.h===t.h}roundToPrecision(t){return new ms(mt(this.l,t),mt(this.c,t),mt(this.h,t))}toObject(){return{l:this.l,c:this.c,h:this.h}}}class st{constructor(t,r,n,i){this.r=t,this.g=r,this.b=n,this.a=typeof i=="number"&&!isNaN(i)?i:1}static fromObject(t){return t&&!isNaN(t.r)&&!isNaN(t.g)&&!isNaN(t.b)?new st(t.r,t.g,t.b,t.a):null}equalValue(t){return this.r===t.r&&this.g===t.g&&this.b===t.b&&this.a===t.a}toStringHexRGB(){return"#"+[this.r,this.g,this.b].map(this.formatHexValue).join("")}toStringHexRGBA(){return this.toStringHexRGB()+this.formatHexValue(this.a)}toStringHexARGB(){return"#"+[this.a,this.r,this.g,this.b].map(this.formatHexValue).join("")}toStringWebRGB(){return`rgb(${Math.round(Li(this.r,0,255))},${Math.round(Li(this.g,0,255))},${Math.round(Li(this.b,0,255))})`}toStringWebRGBA(){return`rgba(${Math.round(Li(this.r,0,255))},${Math.round(Li(this.g,0,255))},${Math.round(Li(this.b,0,255))},${On(this.a,0,1)})`}roundToPrecision(t){return new st(mt(this.r,t),mt(this.g,t),mt(this.b,t),mt(this.a,t))}clamp(){return new st(On(this.r,0,1),On(this.g,0,1),On(this.b,0,1),On(this.a,0,1))}toObject(){return{r:this.r,g:this.g,b:this.b,a:this.a}}formatHexValue(t){return yC(Li(t,0,255))}}class or{constructor(t,r,n){this.x=t,this.y=r,this.z=n}static fromObject(t){return t&&!isNaN(t.x)&&!isNaN(t.y)&&!isNaN(t.z)?new or(t.x,t.y,t.z):null}equalValue(t){return this.x===t.x&&this.y===t.y&&this.z===t.z}roundToPrecision(t){return new or(mt(this.x,t),mt(this.y,t),mt(this.z,t))}toObject(){return{x:this.x,y:this.y,z:this.z}}}or.whitePoint=new or(.95047,1,1.08883);function fp(e){return e.r*.2126+e.g*.7152+e.b*.0722}function pp(e){function t(r){return r<=.03928?r/12.92:Math.pow((r+.055)/1.055,2.4)}return fp(new st(t(e.r),t(e.g),t(e.b),1))}const T0=(e,t)=>(e+.05)/(t+.05);function P0(e,t){const r=pp(e),n=pp(t);return r>n?T0(r,n):T0(n,r)}function ul(e){const t=Math.max(e.r,e.g,e.b),r=Math.min(e.r,e.g,e.b),n=t-r;let i=0;n!==0&&(t===e.r?i=60*((e.g-e.b)/n%6):t===e.g?i=60*((e.b-e.r)/n+2):i=60*((e.r-e.g)/n+4)),i<0&&(i+=360);const o=(t+r)/2;let s=0;return n!==0&&(s=n/(1-Math.abs(2*o-1))),new Ji(i,s,o)}function vp(e,t=1){const r=(1-Math.abs(2*e.l-1))*e.s,n=r*(1-Math.abs(e.h/60%2-1)),i=e.l-r/2;let o=0,s=0,a=0;return e.h<60?(o=r,s=n,a=0):e.h<120?(o=n,s=r,a=0):e.h<180?(o=0,s=r,a=n):e.h<240?(o=0,s=n,a=r):e.h<300?(o=n,s=0,a=r):e.h<360&&(o=r,s=0,a=n),new st(o+i,s+i,a+i,t)}function A0(e){const t=Math.max(e.r,e.g,e.b),r=Math.min(e.r,e.g,e.b),n=t-r;let i=0;n!==0&&(t===e.r?i=60*((e.g-e.b)/n%6):t===e.g?i=60*((e.b-e.r)/n+2):i=60*((e.r-e.g)/n+4)),i<0&&(i+=360);let o=0;return t!==0&&(o=n/t),new ll(i,o,t)}function bC(e,t=1){const r=e.s*e.v,n=r*(1-Math.abs(e.h/60%2-1)),i=e.v-r;let o=0,s=0,a=0;return e.h<60?(o=r,s=n,a=0):e.h<120?(o=n,s=r,a=0):e.h<180?(o=0,s=r,a=n):e.h<240?(o=0,s=n,a=r):e.h<300?(o=n,s=0,a=r):e.h<360&&(o=r,s=0,a=n),new st(o+i,s+i,a+i,t)}function xC(e){let t=0,r=0;return e.h!==0&&(t=Math.cos(O0(e.h))*e.c,r=Math.sin(O0(e.h))*e.c),new Nt(e.l,t,r)}function wC(e){let t=0;(Math.abs(e.b)>.001||Math.abs(e.a)>.001)&&(t=mC(Math.atan2(e.b,e.a))),t<0&&(t+=360);const r=Math.sqrt(e.a*e.a+e.b*e.b);return new ms(e.l,r,t)}function $C(e){const t=(e.l+16)/116,r=t+e.a/500,n=t-e.b/200,i=Math.pow(r,3),o=Math.pow(t,3),s=Math.pow(n,3);let a=0;i>Nt.epsilon?a=i:a=(116*r-16)/Nt.kappa;let l=0;e.l>Nt.epsilon*Nt.kappa?l=o:l=e.l/Nt.kappa;let u=0;return s>Nt.epsilon?u=s:u=(116*n-16)/Nt.kappa,a=or.whitePoint.x*a,l=or.whitePoint.y*l,u=or.whitePoint.z*u,new or(a,l,u)}function _C(e){function t(l){return l>Nt.epsilon?Math.pow(l,1/3):(Nt.kappa*l+16)/116}const r=t(e.x/or.whitePoint.x),n=t(e.y/or.whitePoint.y),i=t(e.z/or.whitePoint.z),o=116*n-16,s=500*(r-n),a=200*(n-i);return new Nt(o,s,a)}function gp(e){function t(l){return l<=.04045?l/12.92:Math.pow((l+.055)/1.055,2.4)}const r=t(e.r),n=t(e.g),i=t(e.b),o=r*.4124564+n*.3575761+i*.1804375,s=r*.2126729+n*.7151522+i*.072175,a=r*.0193339+n*.119192+i*.9503041;return new or(o,s,a)}function Tx(e,t=1){function r(s){return s<=.0031308?s*12.92:1.055*Math.pow(s,1/2.4)-.055}const n=r(e.x*3.2404542-e.y*1.5371385-e.z*.4985314),i=r(e.x*-.969266+e.y*1.8760108+e.z*.041556),o=r(e.x*.0556434-e.y*.2040259+e.z*1.0572252);return new st(n,i,o,t)}function mp(e){return _C(gp(e))}function Px(e,t=1){return Tx($C(e),t)}function yp(e){return wC(mp(e))}function Ax(e,t=1){return Px(xC(e),t)}function j0(e,t,r=18){const n=yp(e);let i=n.c+t*r;return i<0&&(i=0),Ax(new ms(n.l,i,n.h))}function Id(e,t){return e*t}function N0(e,t){return new st(Id(e.r,t.r),Id(e.g,t.g),Id(e.b,t.b),1)}function Fd(e,t){return e<.5?On(2*t*e,0,1):On(1-2*(1-t)*(1-e),0,1)}function L0(e,t){return new st(Fd(e.r,t.r),Fd(e.g,t.g),Fd(e.b,t.b),1)}var D0;(function(e){e[e.Burn=0]="Burn",e[e.Color=1]="Color",e[e.Darken=2]="Darken",e[e.Dodge=3]="Dodge",e[e.Lighten=4]="Lighten",e[e.Multiply=5]="Multiply",e[e.Overlay=6]="Overlay",e[e.Screen=7]="Screen"})(D0||(D0={}));function kC(e,t,r){return isNaN(e)||e<=0?t:e>=1?r:new st(zt(e,t.r,r.r),zt(e,t.g,r.g),zt(e,t.b,r.b),zt(e,t.a,r.a))}function SC(e,t,r){return isNaN(e)||e<=0?t:e>=1?r:new Ji(ag(e,t.h,r.h),zt(e,t.s,r.s),zt(e,t.l,r.l))}function CC(e,t,r){return isNaN(e)||e<=0?t:e>=1?r:new ll(ag(e,t.h,r.h),zt(e,t.s,r.s),zt(e,t.v,r.v))}function EC(e,t,r){return isNaN(e)||e<=0?t:e>=1?r:new or(zt(e,t.x,r.x),zt(e,t.y,r.y),zt(e,t.z,r.z))}function OC(e,t,r){return isNaN(e)||e<=0?t:e>=1?r:new Nt(zt(e,t.l,r.l),zt(e,t.a,r.a),zt(e,t.b,r.b))}function TC(e,t,r){return isNaN(e)||e<=0?t:e>=1?r:new ms(zt(e,t.l,r.l),zt(e,t.c,r.c),ag(e,t.h,r.h))}var vr;(function(e){e[e.RGB=0]="RGB",e[e.HSL=1]="HSL",e[e.HSV=2]="HSV",e[e.XYZ=3]="XYZ",e[e.LAB=4]="LAB",e[e.LCH=5]="LCH"})(vr||(vr={}));function ba(e,t,r,n){if(isNaN(e)||e<=0)return r;if(e>=1)return n;switch(t){case vr.HSL:return vp(SC(e,ul(r),ul(n)));case vr.HSV:return bC(CC(e,A0(r),A0(n)));case vr.XYZ:return Tx(EC(e,gp(r),gp(n)));case vr.LAB:return Px(OC(e,mp(r),mp(n)));case vr.LCH:return Ax(TC(e,yp(r),yp(n)));default:return kC(e,r,n)}}class Pr{constructor(t){if(t==null||t.length===0)throw new Error("The stops argument must be non-empty");this.stops=this.sortColorScaleStops(t)}static createBalancedColorScale(t){if(t==null||t.length===0)throw new Error("The colors argument must be non-empty");const r=new Array(t.length);for(let n=0;n<t.length;n++)n===0?r[n]={color:t[n],position:0}:n===t.length-1?r[n]={color:t[n],position:1}:r[n]={color:t[n],position:n*(1/(t.length-1))};return new Pr(r)}getColor(t,r=vr.RGB){if(this.stops.length===1)return this.stops[0].color;if(t<=0)return this.stops[0].color;if(t>=1)return this.stops[this.stops.length-1].color;let n=0;for(let s=0;s<this.stops.length;s++)this.stops[s].position<=t&&(n=s);let i=n+1;i>=this.stops.length&&(i=this.stops.length-1);const o=(t-this.stops[n].position)*(1/(this.stops[i].position-this.stops[n].position));return ba(o,r,this.stops[n].color,this.stops[i].color)}trim(t,r,n=vr.RGB){if(t<0||r>1||r<t)throw new Error("Invalid bounds");if(t===r)return new Pr([{color:this.getColor(t,n),position:0}]);const i=[];for(let a=0;a<this.stops.length;a++)this.stops[a].position>=t&&this.stops[a].position<=r&&i.push(this.stops[a]);if(i.length===0)return new Pr([{color:this.getColor(t),position:t},{color:this.getColor(r),position:r}]);i[0].position!==t&&i.unshift({color:this.getColor(t),position:t}),i[i.length-1].position!==r&&i.push({color:this.getColor(r),position:r});const o=r-t,s=new Array(i.length);for(let a=0;a<i.length;a++)s[a]={color:i[a].color,position:(i[a].position-t)/o};return new Pr(s)}findNextColor(t,r,n=!1,i=vr.RGB,o=.005,s=32){isNaN(t)||t<=0?t=0:t>=1&&(t=1);const a=this.getColor(t,i),l=n?0:1,u=this.getColor(l,i);if(P0(a,u)<=r)return l;let c=n?0:t,h=n?t:0,d=l,m=0;for(;m<=s;){d=Math.abs(h-c)/2+c;const y=this.getColor(d,i),w=P0(a,y);if(Math.abs(w-r)<=o)return d;w>r?n?c=d:h=d:n?h=d:c=d,m++}return d}clone(){const t=new Array(this.stops.length);for(let r=0;r<t.length;r++)t[r]={color:this.stops[r].color,position:this.stops[r].position};return new Pr(t)}sortColorScaleStops(t){return t.sort((r,n)=>{const i=r.position,o=n.position;return i<o?-1:i>o?1:0})}}const PC=/^#((?:[0-9a-f]{6}|[0-9a-f]{3}))$/i;function Ds(e){const t=PC.exec(e);if(t===null)return null;let r=t[1];if(r.length===3){const i=r.charAt(0),o=r.charAt(1),s=r.charAt(2);r=i.concat(i,o,o,s,s)}const n=parseInt(r,16);return isNaN(n)?null:new st(Md((n&16711680)>>>16,0,255),Md((n&65280)>>>8,0,255),Md(n&255,0,255),1)}class yi{constructor(t){this.config=Object.assign({},yi.defaultPaletteConfig,t),this.palette=[],this.updatePaletteColors()}updatePaletteGenerationValues(t){let r=!1;for(const n in t)this.config[n]&&(this.config[n].equalValue?this.config[n].equalValue(t[n])||(this.config[n]=t[n],r=!0):t[n]!==this.config[n]&&(this.config[n]=t[n],r=!0));return r&&this.updatePaletteColors(),r}updatePaletteColors(){const t=this.generatePaletteColorScale();for(let r=0;r<this.config.steps;r++)this.palette[r]=t.getColor(r/(this.config.steps-1),this.config.interpolationMode)}generatePaletteColorScale(){const t=ul(this.config.baseColor),r=new Pr([{position:0,color:this.config.scaleColorLight},{position:.5,color:this.config.baseColor},{position:1,color:this.config.scaleColorDark}]).trim(this.config.clipLight,1-this.config.clipDark),n=r.getColor(0),i=r.getColor(1);let o=n,s=i;if(t.s>=this.config.saturationAdjustmentCutoff&&(o=j0(o,this.config.saturationLight),s=j0(s,this.config.saturationDark)),this.config.multiplyLight!==0){const a=N0(this.config.baseColor,o);o=ba(this.config.multiplyLight,this.config.interpolationMode,o,a)}if(this.config.multiplyDark!==0){const a=N0(this.config.baseColor,s);s=ba(this.config.multiplyDark,this.config.interpolationMode,s,a)}if(this.config.overlayLight!==0){const a=L0(this.config.baseColor,o);o=ba(this.config.overlayLight,this.config.interpolationMode,o,a)}if(this.config.overlayDark!==0){const a=L0(this.config.baseColor,s);s=ba(this.config.overlayDark,this.config.interpolationMode,s,a)}return this.config.baseScalePosition?this.config.baseScalePosition<=0?new Pr([{position:0,color:this.config.baseColor},{position:1,color:s.clamp()}]):this.config.baseScalePosition>=1?new Pr([{position:0,color:o.clamp()},{position:1,color:this.config.baseColor}]):new Pr([{position:0,color:o.clamp()},{position:this.config.baseScalePosition,color:this.config.baseColor},{position:1,color:s.clamp()}]):new Pr([{position:0,color:o.clamp()},{position:.5,color:this.config.baseColor},{position:1,color:s.clamp()}])}}yi.defaultPaletteConfig={baseColor:Ds("#808080"),steps:11,interpolationMode:vr.RGB,scaleColorLight:new st(1,1,1,1),scaleColorDark:new st(0,0,0,1),clipLight:.185,clipDark:.16,saturationAdjustmentCutoff:.05,saturationLight:.35,saturationDark:1.25,overlayLight:0,overlayDark:.25,multiplyLight:0,multiplyDark:0,baseScalePosition:.5};yi.greyscalePaletteConfig={baseColor:Ds("#808080"),steps:11,interpolationMode:vr.RGB,scaleColorLight:new st(1,1,1,1),scaleColorDark:new st(0,0,0,1),clipLight:0,clipDark:0,saturationAdjustmentCutoff:0,saturationLight:0,saturationDark:0,overlayLight:0,overlayDark:0,multiplyLight:0,multiplyDark:0,baseScalePosition:.5};yi.defaultPaletteConfig.scaleColorLight,yi.defaultPaletteConfig.scaleColorDark;class mh{constructor(t){this.palette=[],this.config=Object.assign({},mh.defaultPaletteConfig,t),this.regenPalettes()}regenPalettes(){let t=this.config.steps;(isNaN(t)||t<3)&&(t=3);const r=.14,n=.06,i=new st(r,r,r,1),o=94,s=new yi(Object.assign(Object.assign({},yi.greyscalePaletteConfig),{baseColor:i,baseScalePosition:(1-r)*100/o,steps:t})).palette,a=fp(this.config.baseColor),l=ul(this.config.baseColor).l,u=(a+l)/2,c=this.matchRelativeLuminanceIndex(u,s)/(t-1),h=this.matchRelativeLuminanceIndex(r,s)/(t-1),d=ul(this.config.baseColor),m=vp(Ji.fromObject({h:d.h,s:d.s,l:r})),y=vp(Ji.fromObject({h:d.h,s:d.s,l:n})),w=new Array(5);w[0]={position:0,color:new st(1,1,1,1)},w[1]={position:c,color:this.config.baseColor},w[2]={position:h,color:m},w[3]={position:.99,color:y},w[4]={position:1,color:new st(0,0,0,1)};const E=new Pr(w);this.palette=new Array(t);for(let p=0;p<t;p++){const f=E.getColor(p/(t-1),vr.RGB);this.palette[p]=f}}matchRelativeLuminanceIndex(t,r){let n=Number.MAX_VALUE,i=0,o=0;const s=r.length;for(;o<s;o++){const a=Math.abs(fp(r[o])-t);a<n&&(n=a,i=o)}return i}}mh.defaultPaletteConfig={baseColor:Ds("#808080"),steps:94};function jx(e,t){const r=e.relativeLuminance>t.relativeLuminance?e:t,n=e.relativeLuminance>t.relativeLuminance?t:e;return(r.relativeLuminance+.05)/(n.relativeLuminance+.05)}const Si=Object.freeze({create(e,t,r){return new wc(e,t,r)},from(e){return new wc(e.r,e.g,e.b)}});function AC(e){const t={r:0,g:0,b:0,toColorString:()=>"",contrast:()=>0,relativeLuminance:0};for(const r in t)if(typeof t[r]!=typeof e[r])return!1;return!0}class wc extends st{constructor(t,r,n){super(t,r,n,1),this.toColorString=this.toStringHexRGB,this.contrast=jx.bind(null,this),this.createCSS=this.toColorString,this.relativeLuminance=pp(this)}static fromObject(t){return new wc(t.r,t.g,t.b)}}function bp(e,t,r=0,n=e.length-1){if(n===r)return e[r];const i=Math.floor((n-r)/2)+r;return t(e[i])?bp(e,t,r,i):bp(e,t,i+1,n)}const jC=(-.1+Math.sqrt(.21))/2;function NC(e){return e.relativeLuminance<=jC}function mo(e){return NC(e)?-1:1}function LC(e,t,r){return typeof e=="number"?$c.from(Si.create(e,t,r)):$c.from(e)}function DC(e){return AC(e)?_c.from(e):_c.from(Si.create(e.r,e.g,e.b))}const $c=Object.freeze({create:LC,from:DC});class _c{constructor(t,r){this.closestIndexCache=new Map,this.source=t,this.swatches=r,this.reversedSwatches=Object.freeze([...this.swatches].reverse()),this.lastIndex=this.swatches.length-1}colorContrast(t,r,n,i){n===void 0&&(n=this.closestIndexOf(t));let o=this.swatches;const s=this.lastIndex;let a=n;i===void 0&&(i=mo(t));const l=u=>jx(t,u)>=r;return i===-1&&(o=this.reversedSwatches,a=s-a),bp(o,l,a,s)}get(t){return this.swatches[t]||this.swatches[On(t,0,this.lastIndex)]}closestIndexOf(t){if(this.closestIndexCache.has(t.relativeLuminance))return this.closestIndexCache.get(t.relativeLuminance);let r=this.swatches.indexOf(t);if(r!==-1)return this.closestIndexCache.set(t.relativeLuminance,r),r;const n=this.swatches.reduce((i,o)=>Math.abs(o.relativeLuminance-t.relativeLuminance)<Math.abs(i.relativeLuminance-t.relativeLuminance)?o:i);return r=this.swatches.indexOf(n),this.closestIndexCache.set(t.relativeLuminance,r),r}static from(t){return new _c(t,Object.freeze(new mh({baseColor:st.fromObject(t)}).palette.map(r=>{const n=Ds(r.toStringHexRGB());return Si.create(n.r,n.g,n.b)})))}}function RC(e,t,r,n,i,o,s,a,l){const u=e.source,c=t.closestIndexOf(r),h=Math.max(s,a,l),d=c>=h?-1:1,m=e.closestIndexOf(u),y=m+d*-1*n,w=y+d*i,E=y+d*o;return{rest:e.get(y),hover:e.get(m),active:e.get(w),focus:e.get(E)}}function MC(e,t,r,n,i,o,s){const a=e.source,l=e.closestIndexOf(a),u=mo(t),c=l+(u===1?Math.min(n,i):Math.max(u*n,u*i)),h=e.colorContrast(t,r,c,u),d=e.closestIndexOf(h),m=d+u*Math.abs(n-i),y=u===1?n<i:u*n>u*i;let w,E;return y?(w=d,E=m):(w=m,E=d),{rest:e.get(w),hover:e.get(E),active:e.get(w+u*o),focus:e.get(w+u*s)}}const R0=Si.create(1,1,1),IC=Si.create(0,0,0),FC=Si.from(Ds("#808080")),VC=Si.from(Ds("#DA1A5F"));function BC(e,t){return e.contrast(R0)>=t?R0:IC}function zC(e,t,r,n,i,o){const s=e.closestIndexOf(t),a=Math.max(r,n,i,o),l=s>=a?-1:1;return{rest:e.get(s+l*r),hover:e.get(s+l*n),active:e.get(s+l*i),focus:e.get(s+l*o)}}function HC(e,t,r,n,i,o){const s=mo(t),a=e.closestIndexOf(t);return{rest:e.get(a-s*r),hover:e.get(a-s*n),active:e.get(a-s*i),focus:e.get(a-s*o)}}function UC(e,t,r){const n=e.closestIndexOf(t);return e.get(n-(n<r?r*-1:r))}function qC(e,t,r,n,i,o,s,a,l,u){const c=Math.max(r,n,i,o,s,a,l,u),h=e.closestIndexOf(t),d=h>=c?-1:1;return{rest:e.get(h+d*r),hover:e.get(h+d*n),active:e.get(h+d*i),focus:e.get(h+d*o)}}function WC(e,t,r,n,i,o){const s=mo(t),a=e.closestIndexOf(e.colorContrast(t,4.5)),l=a+s*Math.abs(r-n),u=s===1?r<n:s*r>s*n;let c,h;return u?(c=a,h=l):(c=l,h=a),{rest:e.get(c),hover:e.get(h),active:e.get(c+s*i),focus:e.get(c+s*o)}}function KC(e,t){return e.colorContrast(t,3.5)}function GC(e,t,r){return e.colorContrast(r,3.5,e.closestIndexOf(e.source),mo(t)*-1)}function QC(e,t){return e.colorContrast(t,14)}function ZC(e,t){return e.colorContrast(t,4.5)}function yh(e){return Si.create(e,e,e)}const xp={LightMode:1,DarkMode:.23};function XC(e,t,r){return e.get(e.closestIndexOf(yh(t))+r)}function YC(e,t,r){const n=e.closestIndexOf(yh(t))-r;return e.get(n-r)}function JC(e,t){return e.get(e.closestIndexOf(yh(t)))}function lg(e,t,r,n,i,o){return Math.max(e.closestIndexOf(yh(t))+r,n,i,o)}function eE(e,t,r,n,i,o){return e.get(lg(e,t,r,n,i,o))}function tE(e,t,r,n,i,o){return e.get(lg(e,t,r,n,i,o)+r)}function rE(e,t,r,n,i,o){return e.get(lg(e,t,r,n,i,o)+r*2)}function nE(e,t,r,n,i,o){const s=e.closestIndexOf(t),a=mo(t),l=s+a*r,u=l+a*(n-r),c=l+a*(i-r),h=l+a*(o-r);return{rest:e.get(l),hover:e.get(u),active:e.get(c),focus:e.get(h)}}function iE(e,t,r){return e.get(e.closestIndexOf(t)+mo(t)*r)}const{create:M}=vh;function ce(e){return vh.create({name:e,cssCustomPropertyName:null})}const yo=M("body-font").withDefault('aktiv-grotesk, "Segoe UI", Arial, Helvetica, sans-serif'),Nx=M("base-height-multiplier").withDefault(10);M("base-horizontal-spacing-multiplier").withDefault(3);const bo=M("base-layer-luminance").withDefault(xp.DarkMode),Vr=M("control-corner-radius").withDefault(4),ug=M("density").withDefault(0),ot=M("design-unit").withDefault(4);M("direction").withDefault(hp.ltr);const Ci=M("disabled-opacity").withDefault(.3),He=M("stroke-width").withDefault(1),et=M("focus-stroke-width").withDefault(2),tn=M("type-ramp-base-font-size").withDefault("14px"),rn=M("type-ramp-base-line-height").withDefault("20px");M("type-ramp-minus-1-font-size").withDefault("12px");M("type-ramp-minus-1-line-height").withDefault("16px");M("type-ramp-minus-2-font-size").withDefault("10px");M("type-ramp-minus-2-line-height").withDefault("16px");M("type-ramp-plus-1-font-size").withDefault("16px");M("type-ramp-plus-1-line-height").withDefault("24px");M("type-ramp-plus-2-font-size").withDefault("20px");M("type-ramp-plus-2-line-height").withDefault("28px");M("type-ramp-plus-3-font-size").withDefault("28px");M("type-ramp-plus-3-line-height").withDefault("36px");M("type-ramp-plus-4-font-size").withDefault("34px");M("type-ramp-plus-4-line-height").withDefault("44px");M("type-ramp-plus-5-font-size").withDefault("46px");M("type-ramp-plus-5-line-height").withDefault("56px");M("type-ramp-plus-6-font-size").withDefault("60px");M("type-ramp-plus-6-line-height").withDefault("72px");ce("accent-fill-rest-delta").withDefault(0);const oE=ce("accent-fill-hover-delta").withDefault(4),sE=ce("accent-fill-active-delta").withDefault(-5),aE=ce("accent-fill-focus-delta").withDefault(0),lE=ce("accent-foreground-rest-delta").withDefault(0),uE=ce("accent-foreground-hover-delta").withDefault(6),cE=ce("accent-foreground-active-delta").withDefault(-4),hE=ce("accent-foreground-focus-delta").withDefault(0),Rs=ce("neutral-fill-rest-delta").withDefault(7),Ms=ce("neutral-fill-hover-delta").withDefault(10),Is=ce("neutral-fill-active-delta").withDefault(5),Lx=ce("neutral-fill-focus-delta").withDefault(0),dE=ce("neutral-fill-input-rest-delta").withDefault(0),fE=ce("neutral-fill-input-hover-delta").withDefault(0),pE=ce("neutral-fill-input-active-delta").withDefault(0),vE=ce("neutral-fill-input-focus-delta").withDefault(0),gE=ce("neutral-fill-stealth-rest-delta").withDefault(0),mE=ce("neutral-fill-stealth-hover-delta").withDefault(5),yE=ce("neutral-fill-stealth-active-delta").withDefault(3),bE=ce("neutral-fill-stealth-focus-delta").withDefault(0),xE=ce("neutral-fill-strong-rest-delta").withDefault(0),wE=ce("neutral-fill-strong-hover-delta").withDefault(8),$E=ce("neutral-fill-strong-active-delta").withDefault(-5),_E=ce("neutral-fill-strong-focus-delta").withDefault(0),Fs=ce("neutral-fill-layer-rest-delta").withDefault(3),kE=ce("neutral-stroke-rest-delta").withDefault(25),SE=ce("neutral-stroke-hover-delta").withDefault(40),CE=ce("neutral-stroke-active-delta").withDefault(16),EE=ce("neutral-stroke-focus-delta").withDefault(25),OE=ce("neutral-stroke-divider-rest-delta").withDefault(8),TE=M("neutral-color").withDefault(FC),Mt=ce("neutral-palette").withDefault(e=>$c.from(TE.getValueFor(e))),PE=M("accent-color").withDefault(VC),cg=ce("accent-palette").withDefault(e=>$c.from(PE.getValueFor(e))),AE=ce("neutral-layer-card-container-recipe").withDefault({evaluate:e=>XC(Mt.getValueFor(e),bo.getValueFor(e),Fs.getValueFor(e))});M("neutral-layer-card-container").withDefault(e=>AE.getValueFor(e).evaluate(e));const jE=ce("neutral-layer-floating-recipe").withDefault({evaluate:e=>YC(Mt.getValueFor(e),bo.getValueFor(e),Fs.getValueFor(e))});M("neutral-layer-floating").withDefault(e=>jE.getValueFor(e).evaluate(e));const NE=ce("neutral-layer-1-recipe").withDefault({evaluate:e=>JC(Mt.getValueFor(e),bo.getValueFor(e))}),LE=M("neutral-layer-1").withDefault(e=>NE.getValueFor(e).evaluate(e)),DE=ce("neutral-layer-2-recipe").withDefault({evaluate:e=>eE(Mt.getValueFor(e),bo.getValueFor(e),Fs.getValueFor(e),Rs.getValueFor(e),Ms.getValueFor(e),Is.getValueFor(e))});M("neutral-layer-2").withDefault(e=>DE.getValueFor(e).evaluate(e));const RE=ce("neutral-layer-3-recipe").withDefault({evaluate:e=>tE(Mt.getValueFor(e),bo.getValueFor(e),Fs.getValueFor(e),Rs.getValueFor(e),Ms.getValueFor(e),Is.getValueFor(e))});M("neutral-layer-3").withDefault(e=>RE.getValueFor(e).evaluate(e));const ME=ce("neutral-layer-4-recipe").withDefault({evaluate:e=>rE(Mt.getValueFor(e),bo.getValueFor(e),Fs.getValueFor(e),Rs.getValueFor(e),Ms.getValueFor(e),Is.getValueFor(e))});M("neutral-layer-4").withDefault(e=>ME.getValueFor(e).evaluate(e));const ht=M("fill-color").withDefault(e=>LE.getValueFor(e));var cl;(function(e){e[e.normal=4.5]="normal",e[e.large=7]="large"})(cl||(cl={}));const bh=M({name:"accent-fill-recipe",cssCustomPropertyName:null}).withDefault({evaluate:(e,t)=>RC(cg.getValueFor(e),Mt.getValueFor(e),t||ht.getValueFor(e),oE.getValueFor(e),sE.getValueFor(e),aE.getValueFor(e),Rs.getValueFor(e),Ms.getValueFor(e),Is.getValueFor(e))}),cr=M("accent-fill-rest").withDefault(e=>bh.getValueFor(e).evaluate(e).rest),nn=M("accent-fill-hover").withDefault(e=>bh.getValueFor(e).evaluate(e).hover),on=M("accent-fill-active").withDefault(e=>bh.getValueFor(e).evaluate(e).active),hg=M("accent-fill-focus").withDefault(e=>bh.getValueFor(e).evaluate(e).focus),Dx=e=>(t,r)=>BC(r||cr.getValueFor(t),e),xh=ce("foreground-on-accent-recipe").withDefault({evaluate:(e,t)=>Dx(cl.normal)(e,t)}),kc=M("foreground-on-accent-rest").withDefault(e=>xh.getValueFor(e).evaluate(e,cr.getValueFor(e))),Sc=M("foreground-on-accent-hover").withDefault(e=>xh.getValueFor(e).evaluate(e,nn.getValueFor(e))),Cc=M("foreground-on-accent-active").withDefault(e=>xh.getValueFor(e).evaluate(e,on.getValueFor(e))),IE=M("foreground-on-accent-focus").withDefault(e=>xh.getValueFor(e).evaluate(e,hg.getValueFor(e))),wh=ce("foreground-on-accent-large-recipe").withDefault({evaluate:(e,t)=>Dx(cl.large)(e,t)});M("foreground-on-accent-rest-large").withDefault(e=>wh.getValueFor(e).evaluate(e,cr.getValueFor(e)));M("foreground-on-accent-hover-large").withDefault(e=>wh.getValueFor(e).evaluate(e,nn.getValueFor(e)));M("foreground-on-accent-active-large").withDefault(e=>wh.getValueFor(e).evaluate(e,on.getValueFor(e)));M("foreground-on-accent-focus-large").withDefault(e=>wh.getValueFor(e).evaluate(e,hg.getValueFor(e)));const FE=e=>(t,r)=>MC(cg.getValueFor(t),r||ht.getValueFor(t),e,lE.getValueFor(t),uE.getValueFor(t),cE.getValueFor(t),hE.getValueFor(t)),$h=M({name:"accent-foreground-recipe",cssCustomPropertyName:null}).withDefault({evaluate:(e,t)=>FE(cl.normal)(e,t)}),ys=M("accent-foreground-rest").withDefault(e=>$h.getValueFor(e).evaluate(e).rest),wp=M("accent-foreground-hover").withDefault(e=>$h.getValueFor(e).evaluate(e).hover),$p=M("accent-foreground-active").withDefault(e=>$h.getValueFor(e).evaluate(e).active);M("accent-foreground-focus").withDefault(e=>$h.getValueFor(e).evaluate(e).focus);const _h=M({name:"neutral-fill-recipe",cssCustomPropertyName:null}).withDefault({evaluate:(e,t)=>zC(Mt.getValueFor(e),t||ht.getValueFor(e),Rs.getValueFor(e),Ms.getValueFor(e),Is.getValueFor(e),Lx.getValueFor(e))}),eo=M("neutral-fill-rest").withDefault(e=>_h.getValueFor(e).evaluate(e).rest),kh=M("neutral-fill-hover").withDefault(e=>_h.getValueFor(e).evaluate(e).hover),VE=M("neutral-fill-active").withDefault(e=>_h.getValueFor(e).evaluate(e).active);M("neutral-fill-focus").withDefault(e=>_h.getValueFor(e).evaluate(e).focus);const Sh=M({name:"neutral-fill-input-recipe",cssCustomPropertyName:null}).withDefault({evaluate:(e,t)=>HC(Mt.getValueFor(e),t||ht.getValueFor(e),dE.getValueFor(e),fE.getValueFor(e),pE.getValueFor(e),vE.getValueFor(e))}),Al=M("neutral-fill-input-rest").withDefault(e=>Sh.getValueFor(e).evaluate(e).rest),to=M("neutral-fill-input-hover").withDefault(e=>Sh.getValueFor(e).evaluate(e).hover),dg=M("neutral-fill-input-active").withDefault(e=>Sh.getValueFor(e).evaluate(e).active);M("neutral-fill-input-focus").withDefault(e=>Sh.getValueFor(e).evaluate(e).focus);const Ch=M({name:"neutral-fill-stealth-recipe",cssCustomPropertyName:null}).withDefault({evaluate:(e,t)=>qC(Mt.getValueFor(e),t||ht.getValueFor(e),gE.getValueFor(e),mE.getValueFor(e),yE.getValueFor(e),bE.getValueFor(e),Rs.getValueFor(e),Ms.getValueFor(e),Is.getValueFor(e),Lx.getValueFor(e))}),Eh=M("neutral-fill-stealth-rest").withDefault(e=>Ch.getValueFor(e).evaluate(e).rest),Rx=M("neutral-fill-stealth-hover").withDefault(e=>Ch.getValueFor(e).evaluate(e).hover),Mx=M("neutral-fill-stealth-active").withDefault(e=>Ch.getValueFor(e).evaluate(e).active);M("neutral-fill-stealth-focus").withDefault(e=>Ch.getValueFor(e).evaluate(e).focus);const Oh=M({name:"neutral-fill-strong-recipe",cssCustomPropertyName:null}).withDefault({evaluate:(e,t)=>WC(Mt.getValueFor(e),t||ht.getValueFor(e),xE.getValueFor(e),wE.getValueFor(e),$E.getValueFor(e),_E.getValueFor(e))});M("neutral-fill-strong-rest").withDefault(e=>Oh.getValueFor(e).evaluate(e).rest);M("neutral-fill-strong-hover").withDefault(e=>Oh.getValueFor(e).evaluate(e).hover);M("neutral-fill-strong-active").withDefault(e=>Oh.getValueFor(e).evaluate(e).active);M("neutral-fill-strong-focus").withDefault(e=>Oh.getValueFor(e).evaluate(e).focus);const Ix=ce("neutral-fill-layer-recipe").withDefault({evaluate:(e,t)=>UC(Mt.getValueFor(e),t||ht.getValueFor(e),Fs.getValueFor(e))});M("neutral-fill-layer-rest").withDefault(e=>Ix.getValueFor(e).evaluate(e));const BE=ce("focus-stroke-outer-recipe").withDefault({evaluate:e=>KC(Mt.getValueFor(e),ht.getValueFor(e))}),tt=M("focus-stroke-outer").withDefault(e=>BE.getValueFor(e).evaluate(e)),zE=ce("focus-stroke-inner-recipe").withDefault({evaluate:e=>GC(cg.getValueFor(e),ht.getValueFor(e),tt.getValueFor(e))}),fg=M("focus-stroke-inner").withDefault(e=>zE.getValueFor(e).evaluate(e)),HE=ce("neutral-foreground-hint-recipe").withDefault({evaluate:e=>ZC(Mt.getValueFor(e),ht.getValueFor(e))}),UE=M("neutral-foreground-hint").withDefault(e=>HE.getValueFor(e).evaluate(e)),qE=ce("neutral-foreground-recipe").withDefault({evaluate:e=>QC(Mt.getValueFor(e),ht.getValueFor(e))}),sr=M("neutral-foreground-rest").withDefault(e=>qE.getValueFor(e).evaluate(e)),Th=M({name:"neutral-stroke-recipe",cssCustomPropertyName:null}).withDefault({evaluate:e=>nE(Mt.getValueFor(e),ht.getValueFor(e),kE.getValueFor(e),SE.getValueFor(e),CE.getValueFor(e),EE.getValueFor(e))}),jl=M("neutral-stroke-rest").withDefault(e=>Th.getValueFor(e).evaluate(e).rest),WE=M("neutral-stroke-hover").withDefault(e=>Th.getValueFor(e).evaluate(e).hover),KE=M("neutral-stroke-active").withDefault(e=>Th.getValueFor(e).evaluate(e).active);M("neutral-stroke-focus").withDefault(e=>Th.getValueFor(e).evaluate(e).focus);const GE=ce("neutral-stroke-divider-recipe").withDefault({evaluate:(e,t)=>iE(Mt.getValueFor(e),t||ht.getValueFor(e),OE.getValueFor(e))});M("neutral-stroke-divider-rest").withDefault(e=>GE.getValueFor(e).evaluate(e));const QE=vh.create({name:"height-number",cssCustomPropertyName:null}).withDefault(e=>(Nx.getValueFor(e)+ug.getValueFor(e))*ot.getValueFor(e)),Ht=H2`(${Nx} + ${ug}) * ${ot}`,ZE="0 0 calc((var(--elevation) * 0.225px) + 2px) rgba(0, 0, 0, calc(.11 * (2 - var(--background-luminance, 1))))",XE="0 calc(var(--elevation) * 0.4px) calc((var(--elevation) * 0.9px)) rgba(0, 0, 0, calc(.13 * (2 - var(--background-luminance, 1))))",Ec=`box-shadow: ${ZE}, ${XE};`,YE=ue`
    ${_n("inline-flex")} :host {
        font-family: ${yo};
        outline: none;
        font-size: ${tn};
        line-height: ${rn};
        height: calc(${Ht} * 1px);
        min-width: calc(${Ht} * 1px);
        background-color: ${eo};
        color: ${sr};
        border-radius: calc(${Vr} * 1px);
        fill: currentcolor;
        cursor: pointer;
    }

    .control {
        background: transparent;
        height: inherit;
        flex-grow: 1;
        box-sizing: border-box;
        display: inline-flex;
        justify-content: center;
        align-items: baseline;
        padding: 0 calc((10 + (${ot} * 2 * ${ug})) * 1px);
        white-space: nowrap;
        outline: none;
        text-decoration: none;
        border: calc(${He} * 1px) solid transparent;
        color: inherit;
        border-radius: inherit;
        fill: inherit;
        cursor: inherit;
        font-weight: inherit;
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
    }

    :host(:hover) {
        background-color: ${kh};
    }

    :host(:active) {
        background-color: ${VE};
    }

    .control:${ge} {
        border-color: ${tt};
        box-shadow: 0 0 0 calc((${et} - ${He}) * 1px) ${tt} inset;
    }

    .control::-moz-focus-inner {
        border: 0;
    }

    .start,
    .content,
    .end {
        align-self: center;
    }

    .start,
    .end {
        display: flex;
    }

    .control.icon-only {
        padding: 0;
        line-height: 0;
    }

    ::slotted(svg) {
        ${""} width: 16px;
        height: 16px;
        pointer-events: none;
    }

    .start {
        margin-inline-end: 11px;
    }

    .end {
        margin-inline-start: 11px;
    }
`.withBehaviors(ct(ue`
            :host .control {
              background-color: ${C.ButtonFace};
              border-color: ${C.ButtonText};
              color: ${C.ButtonText};
              fill: currentColor;
            }

            :host(:hover) .control {
              forced-color-adjust: none;
              background-color: ${C.Highlight};
              color: ${C.HighlightText};
            }

            .control:${ge} {
              forced-color-adjust: none;
              background-color: ${C.Highlight};
              border-color: ${C.ButtonText};
              box-shadow: 0 0 0 calc((${et} - ${He}) * 1px) ${C.ButtonText} inset;
              color: ${C.HighlightText};
            }

            .control:hover,
            :host([appearance="outline"]) .control:hover {
              border-color: ${C.ButtonText};
            }

            :host([href]) .control {
                border-color: ${C.LinkText};
                color: ${C.LinkText};
            }

            :host([href]) .control:hover,
            :host([href]) .control:${ge}{
              forced-color-adjust: none;
              background: ${C.ButtonFace};
              border-color: ${C.LinkText};
              box-shadow: 0 0 0 1px ${C.LinkText} inset;
              color: ${C.LinkText};
              fill: currentColor;
            }
        `)),JE=ue`
    :host([appearance="accent"]) {
        background: ${cr};
        color: ${kc};
    }

    :host([appearance="accent"]:hover) {
        background: ${nn};
        color: ${Sc};
    }

    :host([appearance="accent"]:active) .control:active {
        background: ${on};
        color: ${Cc};
    }

    :host([appearance="accent"]) .control:${ge} {
        box-shadow: 0 0 0 calc((${et} - ${He}) * 1px) ${tt} inset,
            0 0 0 calc((${et} + ${He}) * 1px) ${fg} inset;
    }
`.withBehaviors(ct(ue`
            :host([appearance="accent"]) .control {
                forced-color-adjust: none;
                background: ${C.Highlight};
                color: ${C.HighlightText};
            }

            :host([appearance="accent"]) .control:hover,
            :host([appearance="accent"]:active) .control:active {
                background: ${C.HighlightText};
                border-color: ${C.Highlight};
                color: ${C.Highlight};
            }

            :host([appearance="accent"]) .control:${ge} {
                border-color: ${C.Highlight};
                box-shadow: 0 0 0 calc(${et} * 1px) ${C.HighlightText} inset;
            }

            :host([appearance="accent"][href]) .control{
                background: ${C.LinkText};
                color: ${C.HighlightText};
            }

            :host([appearance="accent"][href]) .control:hover {
                background: ${C.ButtonFace};
                border-color: ${C.LinkText};
                box-shadow: none;
                color: ${C.LinkText};
                fill: currentColor;
            }

            :host([appearance="accent"][href]) .control:${ge} {
                border-color: ${C.LinkText};
                box-shadow: 0 0 0 calc(${et} * 1px) ${C.HighlightText} inset;
            }
        `));ue`
    :host([appearance="hypertext"]) {
        font-size: inherit;
        line-height: inherit;
        height: auto;
        min-width: 0;
        background: transparent;
    }

    :host([appearance="hypertext"]) .control {
        display: inline;
        padding: 0;
        border: none;
        box-shadow: none;
        border-radius: 0;
        line-height: 1;
    }

    :host a.control:not(:link) {
        background-color: transparent;
        cursor: default;
    }
    :host([appearance="hypertext"]) .control:link,
    :host([appearance="hypertext"]) .control:visited {
        background: transparent;
        color: ${ys};
        border-bottom: calc(${He} * 1px) solid ${ys};
    }

    :host([appearance="hypertext"]:hover),
    :host([appearance="hypertext"]) .control:hover {
        background: transparent;
        border-bottom-color: ${wp};
    }

    :host([appearance="hypertext"]:active),
    :host([appearance="hypertext"]) .control:active {
        background: transparent;
        border-bottom-color: ${$p};
    }

    :host([appearance="hypertext"]) .control:${ge} {
        border-bottom: calc(${et} * 1px) solid ${tt};
        margin-bottom: calc(calc(${He} - ${et}) * 1px);
    }
`.withBehaviors(ct(ue`
            :host([appearance="hypertext"]:hover) {
                background-color: ${C.ButtonFace};
                color: ${C.ButtonText};
            }
            :host([appearance="hypertext"][href]) .control:hover,
            :host([appearance="hypertext"][href]) .control:active,
            :host([appearance="hypertext"][href]) .control:${ge} {
                color: ${C.LinkText};
                border-bottom-color: ${C.LinkText};
                box-shadow: none;
            }
        `));const e3=ue`
    :host([appearance="lightweight"]) {
        background: transparent;
        color: ${ys};
    }

    :host([appearance="lightweight"]) .control {
        padding: 0;
        height: initial;
        border: none;
        box-shadow: none;
        border-radius: 0;
    }

    :host([appearance="lightweight"]:hover) {
        background: transparent;
        color: ${wp};
    }

    :host([appearance="lightweight"]:active) {
        background: transparent;
        color: ${$p};
    }

    :host([appearance="lightweight"]) .content {
        position: relative;
    }

    :host([appearance="lightweight"]) .content::before {
        content: "";
        display: block;
        height: calc(${He} * 1px);
        position: absolute;
        top: calc(1em + 4px);
        width: 100%;
    }

    :host([appearance="lightweight"]:hover) .content::before {
        background: ${wp};
    }

    :host([appearance="lightweight"]:active) .content::before {
        background: ${$p};
    }

    :host([appearance="lightweight"]) .control:${ge} .content::before {
        background: ${sr};
        height: calc(${et} * 1px);
    }
`.withBehaviors(ct(ue`
            :host([appearance="lightweight"]) .control:hover,
            :host([appearance="lightweight"]) .control:${ge} {
                forced-color-adjust: none;
                background: ${C.ButtonFace};
                color: ${C.Highlight};
            }
            :host([appearance="lightweight"]) .control:hover .content::before,
            :host([appearance="lightweight"]) .control:${ge} .content::before {
                background: ${C.Highlight};
            }

            :host([appearance="lightweight"][href]) .control:hover,
            :host([appearance="lightweight"][href]) .control:${ge} {
                background: ${C.ButtonFace};
                box-shadow: none;
                color: ${C.LinkText};
            }

            :host([appearance="lightweight"][href]) .control:hover .content::before,
            :host([appearance="lightweight"][href]) .control:${ge} .content::before {
                background: ${C.LinkText};
            }
        `)),t3=ue`
    :host([appearance="outline"]) {
        background: transparent;
        border-color: ${cr};
    }

    :host([appearance="outline"]:hover) {
        border-color: ${nn};
    }

    :host([appearance="outline"]:active) {
        border-color: ${on};
    }

    :host([appearance="outline"]) .control {
        border-color: inherit;
    }

    :host([appearance="outline"]) .control:${ge} {
        box-shadow: 0 0 0 calc((${et} - ${He}) * 1px) ${tt} inset;
        border-color: ${tt};
    }
`.withBehaviors(ct(ue`
            :host([appearance="outline"]) .control {
                border-color: ${C.ButtonText};
            }
            :host([appearance="outline"]) .control:${ge} {
              forced-color-adjust: none;
              background-color: ${C.Highlight};
              border-color: ${C.ButtonText};
              box-shadow: 0 0 0 calc((${et} - ${He}) * 1px) ${C.ButtonText} inset;
              color: ${C.HighlightText};
              fill: currentColor;
            }
            :host([appearance="outline"][href]) .control {
                background: ${C.ButtonFace};
                border-color: ${C.LinkText};
                color: ${C.LinkText};
                fill: currentColor;
            }
            :host([appearance="outline"][href]) .control:hover,
            :host([appearance="outline"][href]) .control:${ge} {
              forced-color-adjust: none;
              border-color: ${C.LinkText};
              box-shadow: 0 0 0 1px ${C.LinkText} inset;
            }
        `)),r3=ue`
    :host([appearance="stealth"]) {
        background: ${Eh};
    }

    :host([appearance="stealth"]:hover) {
        background: ${Rx};
    }

    :host([appearance="stealth"]:active) {
        background: ${Mx};
    }
`.withBehaviors(ct(ue`
            :host([appearance="stealth"]),
            :host([appearance="stealth"]) .control {
                forced-color-adjust: none;
                background: ${C.ButtonFace};
                border-color: transparent;
                color: ${C.ButtonText};
                fill: currentColor;
            }

            :host([appearance="stealth"]:hover) .control {
                background: ${C.Highlight};
                border-color: ${C.Highlight};
                color: ${C.HighlightText};
                fill: currentColor;
            }

            :host([appearance="stealth"]:${ge}) .control {
                background: ${C.Highlight};
                box-shadow: 0 0 0 1px ${C.Highlight};
                color: ${C.HighlightText};
                fill: currentColor;
            }

            :host([appearance="stealth"][href]) .control {
                color: ${C.LinkText};
            }

            :host([appearance="stealth"][href]:hover) .control,
            :host([appearance="stealth"][href]:${ge}) .control {
                background: ${C.LinkText};
                border-color: ${C.LinkText};
                color: ${C.HighlightText};
                fill: currentColor;
            }

            :host([appearance="stealth"][href]:${ge}) .control {
                forced-color-adjust: none;
                box-shadow: 0 0 0 1px ${C.LinkText};
            }
        `));function wu(e,t){return new vC("appearance",e,t)}const n3=(e,t)=>ue`
        :host([disabled]),
        :host([disabled]:hover),
        :host([disabled]:active) {
            opacity: ${Ci};
            background-color: ${eo};
            cursor: ${en};
        }

        ${YE}
    `.withBehaviors(ct(ue`
                :host([disabled]),
                :host([disabled]) .control,
                :host([disabled]:hover),
                :host([disabled]:active) {
                    forced-color-adjust: none;
                    background-color: ${C.ButtonFace};
                    border-color: ${C.GrayText};
                    color: ${C.GrayText};
                    cursor: ${en};
                    opacity: 1;
                }
            `),wu("accent",ue`
                :host([appearance="accent"][disabled]),
                :host([appearance="accent"][disabled]:hover),
                :host([appearance="accent"][disabled]:active) {
                    background: ${cr};
                }

                ${JE}
            `.withBehaviors(ct(ue`
                        :host([appearance="accent"][disabled]) .control,
                        :host([appearance="accent"][disabled]) .control:hover {
                            background: ${C.ButtonFace};
                            border-color: ${C.GrayText};
                            color: ${C.GrayText};
                        }
                    `))),wu("lightweight",ue`
                :host([appearance="lightweight"][disabled]:hover),
                :host([appearance="lightweight"][disabled]:active) {
                    background-color: transparent;
                    color: ${ys};
                }

                :host([appearance="lightweight"][disabled]) .content::before,
                :host([appearance="lightweight"][disabled]:hover) .content::before,
                :host([appearance="lightweight"][disabled]:active) .content::before {
                    background: transparent;
                }

                ${e3}
            `.withBehaviors(ct(ue`
                        :host([appearance="lightweight"].disabled) .control {
                            forced-color-adjust: none;
                            color: ${C.GrayText};
                        }

                        :host([appearance="lightweight"].disabled)
                            .control:hover
                            .content::before {
                            background: none;
                        }
                    `))),wu("outline",ue`
                :host([appearance="outline"][disabled]),
                :host([appearance="outline"][disabled]:hover),
                :host([appearance="outline"][disabled]:active) {
                    background: transparent;
                    border-color: ${cr};
                }

                ${t3}
            `.withBehaviors(ct(ue`
                        :host([appearance="outline"][disabled]) .control {
                            border-color: ${C.GrayText};
                        }
                    `))),wu("stealth",ue`
                :host([appearance="stealth"][disabled]),
                :host([appearance="stealth"][disabled]:hover),
                :host([appearance="stealth"][disabled]:active) {
                    background: ${Eh};
                }

                ${r3}
            `.withBehaviors(ct(ue`
                        :host([appearance="stealth"][disabled]) {
                            background: ${C.ButtonFace};
                        }

                        :host([appearance="stealth"][disabled]) .control {
                            background: ${C.ButtonFace};
                            border-color: transparent;
                            color: ${C.GrayText};
                        }
                    `))));class Fx extends zr{constructor(){super(...arguments),this.appearance="neutral"}defaultSlottedContentChanged(t,r){const n=this.defaultSlottedContent.filter(i=>i.nodeType===Node.ELEMENT_NODE);n.length===1&&n[0]instanceof SVGElement?this.control.classList.add("icon-only"):this.control.classList.remove("icon-only")}}g([D],Fx.prototype,"appearance",void 0);const Ph=Fx.compose({baseName:"button",baseClass:zr,template:vS,styles:n3,shadowOptions:{delegatesFocus:!0}}),i3=(e,t)=>ue`
        ${_n("block")} :host {
            --elevation: 4;
            display: block;
            contain: content;
            height: var(--card-height, 100%);
            width: var(--card-width, 100%);
            box-sizing: border-box;
            background: ${ht};
            border-radius: calc(${Vr} * 1px);
            ${Ec}
        }
    `.withBehaviors(ct(ue`
                :host {
                    forced-color-adjust: none;
                    background: ${C.Canvas};
                    box-shadow: 0 0 0 1px ${C.CanvasText};
                }
            `));class o3 extends wx{connectedCallback(){super.connectedCallback();const t=bc(this);t&&ht.setValueFor(this,r=>Ix.getValueFor(r).evaluate(r,ht.getValueFor(t)))}}const s3=o3.compose({baseName:"card",baseClass:wx,template:bS,styles:i3}),a3=(e,t)=>ue`
        ${_n("inline-flex")} :host {
            align-items: center;
            outline: none;
            margin: calc(${ot} * 1px) 0;
            /* Chromium likes to select label text or the default slot when the checkbox is
                clicked. Maybe there is a better solution here? */
            user-select: none;
        }

        .control {
            position: relative;
            width: calc((${Ht} / 2 + ${ot}) * 1px);
            height: calc((${Ht} / 2 + ${ot}) * 1px);
            box-sizing: border-box;
            border-radius: calc(${Vr} * 1px);
            border: calc(${He} * 1px) solid ${jl};
            background: ${Al};
            outline: none;
            cursor: pointer;
        }

        .label {
            font-family: ${yo};
            color: ${sr};
            padding-inline-start: calc(${ot} * 2px + 2px);
            margin-inline-end: calc(${ot} * 2px + 2px);
            cursor: pointer;
            font-size: ${tn};
            line-height: ${rn};
        }

        .label__hidden {
            display: none;
            visibility: hidden;
        }

        .checked-indicator {
            width: 100%;
            height: 100%;
            display: block;
            fill: ${kc};
            opacity: 0;
            pointer-events: none;
        }

        .indeterminate-indicator {
            border-radius: calc(${Vr} * 1px);
            background: ${kc};
            position: absolute;
            top: 50%;
            left: 50%;
            width: 50%;
            height: 50%;
            transform: translate(-50%, -50%);
            opacity: 0;
        }

        :host(:not([disabled])) .control:hover {
            background: ${to};
            border-color: ${WE};
        }

        :host(:not([disabled])) .control:active {
            background: ${dg};
            border-color: ${KE};
        }

        :host(:${ge}) .control {
            box-shadow: 0 0 0 2px ${ht}, 0 0 0 4px ${tt};
        }

        :host([aria-checked="true"]) .control {
            background: ${cr};
            border: calc(${He} * 1px) solid ${cr};
        }

        :host([aria-checked="true"]:not([disabled])) .control:hover {
            background: ${nn};
            border: calc(${He} * 1px) solid ${nn};
        }

        :host([aria-checked="true"]:not([disabled])) .control:hover .checked-indicator {
            fill: ${Sc};
        }

        :host([aria-checked="true"]:not([disabled])) .control:hover .indeterminate-indicator {
            background: ${Sc};
        }

        :host([aria-checked="true"]:not([disabled])) .control:active {
            background: ${on};
            border: calc(${He} * 1px) solid ${on};
        }

        :host([aria-checked="true"]:not([disabled])) .control:active .checked-indicator {
            fill: ${Cc};
        }

        :host([aria-checked="true"]:not([disabled])) .control:active .indeterminate-indicator {
            background: ${Cc};
        }

        :host([aria-checked="true"]:${ge}:not([disabled])) .control {
            box-shadow: 0 0 0 2px ${ht}, 0 0 0 4px ${tt};
        }


        :host([disabled]) .label,
        :host([readonly]) .label,
        :host([readonly]) .control,
        :host([disabled]) .control {
            cursor: ${en};
        }

        :host([aria-checked="true"]:not(.indeterminate)) .checked-indicator,
        :host(.indeterminate) .indeterminate-indicator {
            opacity: 1;
        }

        :host([disabled]) {
            opacity: ${Ci};
        }
    `.withBehaviors(ct(ue`
            .control {
                forced-color-adjust: none;
                border-color: ${C.FieldText};
                background: ${C.Field};
            }
            .checked-indicator {
                fill: ${C.FieldText};
            }
            .indeterminate-indicator {
                background: ${C.FieldText};
            }
            :host(:not([disabled])) .control:hover, .control:active {
                border-color: ${C.Highlight};
                background: ${C.Field};
            }
            :host(:${ge}) .control {
                box-shadow: 0 0 0 2px ${C.Field}, 0 0 0 4px ${C.FieldText};
            }
            :host([aria-checked="true"]:${ge}:not([disabled])) .control {
                box-shadow: 0 0 0 2px ${C.Field}, 0 0 0 4px ${C.FieldText};
            }
            :host([aria-checked="true"]) .control {
                background: ${C.Highlight};
                border-color: ${C.Highlight};
            }
            :host([aria-checked="true"]:not([disabled])) .control:hover, .control:active {
                border-color: ${C.Highlight};
                background: ${C.HighlightText};
            }
            :host([aria-checked="true"]) .checked-indicator {
                fill: ${C.HighlightText};
            }
            :host([aria-checked="true"]:not([disabled])) .control:hover .checked-indicator {
                fill: ${C.Highlight}
            }
            :host([aria-checked="true"]) .indeterminate-indicator {
                background: ${C.HighlightText};
            }
            :host([aria-checked="true"]) .control:hover .indeterminate-indicator {
                background: ${C.Highlight}
            }
            :host([disabled]) {
                opacity: 1;
            }
            :host([disabled]) .control {
                forced-color-adjust: none;
                border-color: ${C.GrayText};
                background: ${C.Field};
            }
            :host([disabled]) .indeterminate-indicator,
            :host([aria-checked="true"][disabled]) .control:hover .indeterminate-indicator {
                forced-color-adjust: none;
                background: ${C.GrayText};
            }
            :host([disabled]) .checked-indicator,
            :host([aria-checked="true"][disabled]) .control:hover .checked-indicator {
                forced-color-adjust: none;
                fill: ${C.GrayText};
            }
        `)),l3=fh.compose({baseName:"checkbox",template:xS,styles:a3,checkedIndicator:`
        <svg
            part="checked-indicator"
            class="checked-indicator"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8.143 12.6697L15.235 4.5L16.8 5.90363L8.23812 15.7667L3.80005 11.2556L5.27591 9.7555L8.143 12.6697Z"
            />
        </svg>
    `,indeterminateIndicator:`
        <div part="indeterminate-indicator" class="indeterminate-indicator"></div>
    `}),u3=(e,t)=>{const r=e.tagFor(an),n=e.name===e.tagFor(Tl)?"":".listbox";return ue`
        ${n?"":_n("inline-flex")}

        :host ${n} {
            background: ${ht};
            border: calc(${He} * 1px) solid ${jl};
            border-radius: calc(${Vr} * 1px);
            box-sizing: border-box;
            flex-direction: column;
            padding: calc(${ot} * 1px) 0;
        }

        ${n?"":ue`
            :host(:focus-within:not([disabled])) {
                border-color: ${tt};
                box-shadow: 0 0 0
                    calc((${et} - ${He}) * 1px)
                    ${tt} inset;
            }

            :host([disabled]) ::slotted(*) {
                cursor: ${en};
                opacity: ${Ci};
                pointer-events: none;
            }
        `}

        ${n||":host([size])"} {
            max-height: calc(
                (var(--size) * ${Ht} + (${ot} * ${He} * 2)) * 1px
            );
            overflow-y: auto;
        }

        :host([size="0"]) ${n} {
            max-height: none;
        }
    `.withBehaviors(ct(ue`
                :host(:not([multiple]):${ge}) ::slotted(${r}[aria-selected="true"]),
                :host([multiple]:${ge}) ::slotted(${r}[aria-checked="true"]) {
                    border-color: ${C.ButtonText};
                    box-shadow: 0 0 0 calc(${et} * 1px) inset ${C.HighlightText};
                }

                :host(:not([multiple]):${ge}) ::slotted(${r}[aria-selected="true"]) {
                    background: ${C.Highlight};
                    color: ${C.HighlightText};
                    fill: currentcolor;
                }

                ::slotted(${r}[aria-selected="true"]:not([aria-checked="true"])) {
                    background: ${C.Highlight};
                    border-color: ${C.HighlightText};
                    color: ${C.HighlightText};
                }
            `))},c3=(e,t)=>{const r=e.name===e.tagFor(ki);return ue`
        ${_n("inline-flex")}

        :host {
            --elevation: 14;
            background: ${Al};
            border-radius: calc(${Vr} * 1px);
            border: calc(${He} * 1px) solid ${cr};
            box-sizing: border-box;
            color: ${sr};
            font-family: ${yo};
            height: calc(${Ht} * 1px);
            position: relative;
            user-select: none;
            min-width: 250px;
            outline: none;
            vertical-align: top;
        }

        ${r?ue`
            :host(:not([aria-haspopup])) {
                --elevation: 0;
                border: 0;
                height: auto;
                min-width: 0;
            }
        `:""}

        ${u3(e)}

        :host .listbox {
            ${Ec}
            border: none;
            display: flex;
            left: 0;
            position: absolute;
            width: 100%;
            z-index: 1;
        }

        .control + .listbox {
            --stroke-size: calc(${ot} * ${He} * 2);
            max-height: calc(
                (var(--listbox-max-height) * ${Ht} + var(--stroke-size)) * 1px
            );
        }

        ${r?ue`
            :host(:not([aria-haspopup])) .listbox {
                left: auto;
                position: static;
                z-index: auto;
            }
        `:""}

        .listbox[hidden] {
            display: none;
        }

        .control {
            align-items: center;
            box-sizing: border-box;
            cursor: pointer;
            display: flex;
            font-size: ${tn};
            font-family: inherit;
            line-height: ${rn};
            min-height: 100%;
            padding: 0 calc(${ot} * 2.25px);
            width: 100%;
        }

        :host(:not([disabled]):hover) {
            background: ${to};
            border-color: ${nn};
        }

        :host(:${ge}) {
            border-color: ${tt};
        }

        :host(:not([size]):not([multiple]):not([open]):${ge}),
        :host([multiple]:${ge}),
        :host([size]:${ge}) {
            box-shadow: 0 0 0 calc(${et} * 1px) ${tt};
        }

        :host(:not([multiple]):not([size]):${ge}) ::slotted(${e.tagFor(an)}[aria-selected="true"]:not([disabled])) {
            box-shadow: 0 0 0 calc(${et} * 1px) inset ${fg};
            border-color: ${tt};
            background: ${hg};
            color: ${IE};
        }

        :host([disabled]) {
            cursor: ${en};
            opacity: ${Ci};
        }

        :host([disabled]) .control {
            cursor: ${en};
            user-select: none;
        }

        :host([disabled]:hover) {
            background: ${Eh};
            color: ${sr};
            fill: currentcolor;
        }

        :host(:not([disabled])) .control:active {
            background: ${dg};
            border-color: ${on};
            border-radius: calc(${Vr} * 1px);
        }

        :host([open][position="above"]) .listbox {
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
            border-bottom: 0;
            bottom: calc(${Ht} * 1px);
        }

        :host([open][position="below"]) .listbox {
            border-top-left-radius: 0;
            border-top-right-radius: 0;
            border-top: 0;
            top: calc(${Ht} * 1px);
        }

        .selected-value {
            flex: 1 1 auto;
            font-family: inherit;
            min-width: calc(var(--listbox-scroll-width, 0) - (${ot} * 4) * 1px);
            overflow: hidden;
            text-align: start;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .indicator {
            flex: 0 0 auto;
            margin-inline-start: 1em;
        }

        slot[name="listbox"] {
            display: none;
            width: 100%;
        }

        :host([open]) slot[name="listbox"] {
            display: flex;
            position: absolute;
            ${Ec}
        }

        .end {
            margin-inline-start: auto;
        }

        .start,
        .end,
        .indicator,
        .select-indicator,
        ::slotted(svg) {
            /* TODO: adaptive typography https://github.com/microsoft/fast/issues/2432 */
            fill: currentcolor;
            height: 1em;
            min-height: calc(${ot} * 4px);
            min-width: calc(${ot} * 4px);
            width: 1em;
        }

        ::slotted([role="option"]),
        ::slotted(option) {
            flex: 0 0 auto;
        }
    `.withBehaviors(ct(ue`
                :host(:not([disabled]):hover),
                :host(:not([disabled]):active) {
                    border-color: ${C.Highlight};
                }

                :host(:not([disabled]):${ge}) {
                    background-color: ${C.ButtonFace};
                    box-shadow: 0 0 0 calc(${et} * 1px) ${C.Highlight};
                    color: ${C.ButtonText};
                    fill: currentcolor;
                    forced-color-adjust: none;
                }

                :host(:not([disabled]):${ge}) .listbox {
                    background: ${C.ButtonFace};
                }

                :host([disabled]) {
                    border-color: ${C.GrayText};
                    background-color: ${C.ButtonFace};
                    color: ${C.GrayText};
                    fill: currentcolor;
                    opacity: 1;
                    forced-color-adjust: none;
                }

                :host([disabled]:hover) {
                    background: ${C.ButtonFace};
                }

                :host([disabled]) .control {
                    color: ${C.GrayText};
                    border-color: ${C.GrayText};
                }

                :host([disabled]) .control .select-indicator {
                    fill: ${C.GrayText};
                }

                :host(:${ge}) ::slotted([aria-selected="true"][role="option"]),
                :host(:${ge}) ::slotted(option[aria-selected="true"]),
                :host(:${ge}) ::slotted([aria-selected="true"][role="option"]:not([disabled])) {
                    background: ${C.Highlight};
                    border-color: ${C.ButtonText};
                    box-shadow: 0 0 0 calc(${et} * 1px) inset ${C.HighlightText};
                    color: ${C.HighlightText};
                    fill: currentcolor;
                }

                .start,
                .end,
                .indicator,
                .select-indicator,
                ::slotted(svg) {
                    color: ${C.ButtonText};
                    fill: currentcolor;
                }
            `))},h3=(e,t)=>ue`
    ${c3(e)}

    :host(:empty) .listbox {
        display: none;
    }

    :host([disabled]) *,
    :host([disabled]) {
        cursor: ${en};
        user-select: none;
    }

    .selected-value {
        -webkit-appearance: none;
        background: transparent;
        border: none;
        color: inherit;
        font-size: ${tn};
        line-height: ${rn};
        height: calc(100% - (${He} * 1px));
        margin: auto 0;
        width: 100%;
    }

    .selected-value:hover,
    .selected-value:${ge},
    .selected-value:disabled,
    .selected-value:active {
        outline: none;
    }
`;class d3 extends Wn{maxHeightChanged(t,r){this.updateComputedStylesheet()}updateComputedStylesheet(){this.computedStylesheet&&this.$fastController.removeStyles(this.computedStylesheet);const t=Math.floor(this.maxHeight/QE.getValueFor(this)).toString();this.computedStylesheet=ue`
            :host {
                --listbox-max-height: ${t};
            }
        `,this.$fastController.addStyles(this.computedStylesheet)}}const Vx=d3.compose({baseName:"combobox",baseClass:Wn,template:SS,styles:h3,shadowOptions:{delegatesFocus:!0},indicator:`
        <svg
            class="select-indicator"
            part="select-indicator"
            viewBox="0 0 12 7"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M11.85.65c.2.2.2.5 0 .7L6.4 6.84a.55.55 0 01-.78 0L.14 1.35a.5.5 0 11.71-.7L6 5.8 11.15.65c.2-.2.5-.2.7 0z"
            />
        </svg>
    `}),f3=(e,t)=>ue`
    :host([hidden]) {
        display: none;
    }

    :host {
        --elevation: 14;
        --dialog-height: 480px;
        --dialog-width: 640px;
        display: block;
    }

    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.3);
        touch-action: none;
    }

    .positioning-region {
        display: flex;
        justify-content: center;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        overflow: auto;
    }

    .control {
        ${Ec}
        margin-top: auto;
        margin-bottom: auto;
        width: var(--dialog-width);
        height: var(--dialog-height);
        background-color: ${ht};
        z-index: 1;
        border-radius: calc(${Vr} * 1px);
        border: calc(${He} * 1px) solid transparent;
    }
`,Nl=Lr.compose({baseName:"dialog",template:FS,styles:f3}),p3=(e,t)=>ue`
        ${_n("inline-flex")} :host {
            align-items: center;
            font-family: ${yo};
            border-radius: calc(${Vr} * 1px);
            border: calc(${et} * 1px) solid transparent;
            box-sizing: border-box;
            background: ${Eh};
            color: ${sr};
            cursor: pointer;
            flex: 0 0 auto;
            fill: currentcolor;
            font-size: ${tn};
            height: calc(${Ht} * 1px);
            line-height: ${rn};
            margin: 0 calc((${ot} - ${et}) * 1px);
            outline: none;
            overflow: hidden;
            padding: 0 1ch;
            user-select: none;
            white-space: nowrap;
        }

        :host(:not([disabled]):not([aria-selected="true"]):hover) {
            background: ${Rx};
        }

        :host(:not([disabled]):not([aria-selected="true"]):active) {
            background: ${Mx};
        }

        :host([aria-selected="true"]) {
            background: ${cr};
            color: ${kc};
        }

        :host(:not([disabled])[aria-selected="true"]:hover) {
            background: ${nn};
            color: ${Sc};
        }

        :host(:not([disabled])[aria-selected="true"]:active) {
            background: ${on};
            color: ${Cc};
        }

        :host([disabled]) {
            cursor: ${en};
            opacity: ${Ci};
        }

        .content {
            grid-column-start: 2;
            justify-self: start;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .start,
        .end,
        ::slotted(svg) {
            display: flex;
        }

        ::slotted(svg) {
            /* TODO: adaptive typography https://github.com/microsoft/fast/issues/2432 */
            height: calc(${ot} * 4px);
            width: calc(${ot} * 4px);
        }

        ::slotted([slot="end"]) {
            margin-inline-start: 1ch;
        }

        ::slotted([slot="start"]) {
            margin-inline-end: 1ch;
        }

        :host([aria-checked="true"][aria-selected="false"]) {
            border-color: ${tt};
        }

        :host([aria-checked="true"][aria-selected="true"]) {
            border-color: ${tt};
            box-shadow: 0 0 0 calc(${et} * 2 * 1px) inset
                ${fg};
        }
    `.withBehaviors(ct(ue`
                :host {
                    border-color: transparent;
                    forced-color-adjust: none;
                    color: ${C.ButtonText};
                    fill: currentcolor;
                }

                :host(:not([aria-selected="true"]):hover),
                :host([aria-selected="true"]) {
                    background: ${C.Highlight};
                    color: ${C.HighlightText};
                }

                :host([disabled]),
                :host([disabled][aria-selected="false"]:hover) {
                    background: ${C.Canvas};
                    color: ${C.GrayText};
                    fill: currentcolor;
                    opacity: 1;
                }

                :host([aria-checked="true"][aria-selected="false"]) {
                    background: ${C.ButtonFace};
                    color: ${C.ButtonText};
                    border-color: ${C.ButtonText};
                }

                :host([aria-checked="true"][aria-selected="true"]),
                :host([aria-checked="true"][aria-selected="true"]:hover) {
                    background: ${C.Highlight};
                    color: ${C.HighlightText};
                    border-color: ${C.ButtonText};
                }
            `)),v3=an.compose({baseName:"option",template:JS,styles:p3}),g3=(e,t)=>ue`
    ${_n("inline-block")} :host {
        font-family: ${yo};
        outline: none;
        user-select: none;
    }

    .root {
        box-sizing: border-box;
        position: relative;
        display: flex;
        flex-direction: row;
        color: ${sr};
        background: ${Al};
        border-radius: calc(${Vr} * 1px);
        border: calc(${He} * 1px) solid ${cr};
        height: calc(${Ht} * 1px);
        align-items: baseline;
    }

    .control {
        -webkit-appearance: none;
        font: inherit;
        background: transparent;
        border: 0;
        color: inherit;
        height: calc(100% - 4px);
        width: 100%;
        margin-top: auto;
        margin-bottom: auto;
        border: none;
        padding: 0 calc(${ot} * 2px + 1px);
        font-size: ${tn};
        line-height: ${rn};
    }

    .control:hover,
    .control:${ge},
    .control:disabled,
    .control:active {
        outline: none;
    }

    .controls {
        opacity: 0;
    }

    .label {
        display: block;
        color: ${sr};
        cursor: pointer;
        font-size: ${tn};
        line-height: ${rn};
        margin-bottom: 4px;
    }

    .label__hidden {
        display: none;
        visibility: hidden;
    }

    .start,
    .control,
    .controls,
    .end {
        align-self: center;
    }

    .start,
    .end {
        margin: auto;
        fill: currentcolor;
    }

    .step-up-glyph,
    .step-down-glyph {
        display: block;
        padding: 4px 10px;
        cursor: pointer;
    }

    .step-up-glyph:before,
    .step-down-glyph:before {
        content: '';
        display: block;
        border: solid transparent 6px;
    }

    .step-up-glyph:before {
        border-bottom-color: ${sr};
    }

    .step-down-glyph:before {
        border-top-color: ${sr};
    }

    ::slotted(svg) {
        /* TODO: adaptive typography https://github.com/microsoft/fast/issues/2432 */
        width: 16px;
        height: 16px;
    }

    .start {
        margin-inline-start: 11px;
    }

    .end {
        margin-inline-end: 11px;
    }

    :host(:hover:not([disabled])) .root {
        background: ${to};
        border-color: ${nn};
    }

    :host(:active:not([disabled])) .root {
        background: ${to};
        border-color: ${on};
    }

    :host(:focus-within:not([disabled])) .root {
        border-color: ${tt};
        box-shadow: 0 0 0 calc(${et} * 1px) ${tt} inset;
    }

    :host(:hover:not([disabled])) .controls,
    :host(:focus-within:not([disabled])) .controls {
        opacity: 1;
    }

    :host([appearance="filled"]) .root {
        background: ${eo};
    }

    :host([appearance="filled"]:hover:not([disabled])) .root {
        background: ${kh};
    }

    :host([disabled]) .label,
    :host([readonly]) .label,
    :host([readonly]) .control,
    :host([disabled]) .control {
        cursor: ${en};
    }

    :host([disabled]) {
        opacity: ${Ci};
    }

    :host([disabled]) .control {
        border-color: ${jl};
    }
`.withBehaviors(ct(ue`
                .root,
                :host([appearance="filled"]) .root {
                    forced-color-adjust: none;
                    background: ${C.Field};
                    border-color: ${C.FieldText};
                }
                :host(:hover:not([disabled])) .root,
                :host([appearance="filled"]:hover:not([disabled])) .root,
                :host([appearance="filled"]:hover) .root {
                    background: ${C.Field};
                    border-color: ${C.Highlight};
                }
                .start,
                .end {
                    fill: currentcolor;
                }
                :host([disabled]) {
                    opacity: 1;
                }
                :host([disabled]) .root,
                :host([appearance="filled"]:hover[disabled]) .root {
                    border-color: ${C.GrayText};
                    background: ${C.Field};
                }
                :host(:focus-within:enabled) .root {
                    border-color: ${C.Highlight};
                    box-shadow: 0 0 0 1px ${C.Highlight} inset;
                }
                input::placeholder {
                    color: ${C.GrayText};
                }
            `));class Bx extends rr{constructor(){super(...arguments),this.appearance="outline"}}g([D],Bx.prototype,"appearance",void 0);const m3=Bx.compose({baseName:"number-field",baseClass:rr,styles:g3,template:eC,shadowOptions:{delegatesFocus:!0},stepDownGlyph:`
        <span class="step-down-glyph" part="step-down-glyph"></span>
    `,stepUpGlyph:`
        <span class="step-up-glyph" part="step-up-glyph"></span>
    `}),y3=(e,t)=>ue`
        ${_n("flex")} :host {
            align-items: center;
            outline: none;
            height: calc(${Ht} * 1px);
            width: calc(${Ht} * 1px);
            margin: calc(${Ht} * 1px) 0;
        }

        .progress {
            height: 100%;
            width: 100%;
        }

        .background {
            stroke: ${eo};
            fill: none;
            stroke-width: 2px;
        }

        .determinate {
            stroke: ${ys};
            fill: none;
            stroke-width: 2px;
            stroke-linecap: round;
            transform-origin: 50% 50%;
            transform: rotate(-90deg);
            transition: all 0.2s ease-in-out;
        }

        .indeterminate-indicator-1 {
            stroke: ${ys};
            fill: none;
            stroke-width: 2px;
            stroke-linecap: round;
            transform-origin: 50% 50%;
            transform: rotate(-90deg);
            transition: all 0.2s ease-in-out;
            animation: spin-infinite 2s linear infinite;
        }

        :host([paused]) .indeterminate-indicator-1 {
            animation-play-state: paused;
            stroke: ${eo};
        }

        :host([paused]) .determinate {
            stroke: ${UE};
        }

        @keyframes spin-infinite {
            0% {
                stroke-dasharray: 0.01px 43.97px;
                transform: rotate(0deg);
            }
            50% {
                stroke-dasharray: 21.99px 21.99px;
                transform: rotate(450deg);
            }
            100% {
                stroke-dasharray: 0.01px 43.97px;
                transform: rotate(1080deg);
            }
        }
    `.withBehaviors(ct(ue`
                .indeterminate-indicator-1,
                .determinate {
                    stroke: ${C.FieldText};
                }
                .background {
                    stroke: ${C.Field};
                }
                :host([paused]) .indeterminate-indicator-1 {
                    stroke: ${C.Field};
                }
                :host([paused]) .determinate {
                    stroke: ${C.GrayText};
                }
            `)),b3=Ls.compose({baseName:"progress-ring",template:sC,styles:y3,indeterminateIndicator:`
        <svg class="progress" part="progress" viewBox="0 0 16 16">
            <circle
                class="background"
                part="background"
                cx="8px"
                cy="8px"
                r="7px"
            ></circle>
            <circle
                class="indeterminate-indicator-1"
                part="indeterminate-indicator-1"
                cx="8px"
                cy="8px"
                r="7px"
            ></circle>
        </svg>
    `}),x3=(e,t)=>ue`
    ${_n("inline-block")} :host {
        font-family: ${yo};
        outline: none;
        user-select: none;
    }

    .control {
        box-sizing: border-box;
        position: relative;
        color: ${sr};
        background: ${Al};
        border-radius: calc(${Vr} * 1px);
        border: calc(${He} * 1px) solid ${cr};
        height: calc(${Ht} * 2px);
        font: inherit;
        font-size: ${tn};
        line-height: ${rn};
        padding: calc(${ot} * 2px + 1px);
        width: 100%;
        resize: none;
    }

    .control:hover:enabled {
        background: ${to};
        border-color: ${nn};
    }

    .control:active:enabled {
        background: ${dg};
        border-color: ${on};
    }

    .control:hover,
    .control:${ge},
    .control:disabled,
    .control:active {
        outline: none;
    }

    :host(:focus-within) .control {
        border-color: ${tt};
        box-shadow: 0 0 0 1px ${tt} inset;
    }

    :host([appearance="filled"]) .control {
        background: ${eo};
    }

    :host([appearance="filled"]:hover:not([disabled])) .control {
        background: ${kh};
    }

    :host([resize="both"]) .control {
        resize: both;
    }

    :host([resize="horizontal"]) .control {
        resize: horizontal;
    }

    :host([resize="vertical"]) .control {
        resize: vertical;
    }

    .label {
        display: block;
        color: ${sr};
        cursor: pointer;
        font-size: ${tn};
        line-height: ${rn};
        margin-bottom: 4px;
    }

    .label__hidden {
        display: none;
        visibility: hidden;
    }

    :host([disabled]) .label,
    :host([readonly]) .label,
    :host([readonly]) .control,
    :host([disabled]) .control {
        cursor: ${en};
    }
    :host([disabled]) {
        opacity: ${Ci};
    }
    :host([disabled]) .control {
        border-color: ${jl};
    }

    :host([cols]){
        width: initial;
    }

    :host([rows]) .control {
        height: initial;
    }
 `.withBehaviors(ct(ue`
                :host([disabled]) {
                    opacity: 1;
                }
            `));class zx extends Gt{constructor(){super(...arguments),this.appearance="outline"}}g([D],zx.prototype,"appearance",void 0);const w3=zx.compose({baseName:"text-area",baseClass:Gt,template:dC,styles:x3,shadowOptions:{delegatesFocus:!0}}),$3=(e,t)=>ue`
    ${_n("inline-block")} :host {
        font-family: ${yo};
        outline: none;
        user-select: none;
    }

    .root {
        box-sizing: border-box;
        position: relative;
        display: flex;
        flex-direction: row;
        color: ${sr};
        background: ${Al};
        border-radius: calc(${Vr} * 1px);
        border: calc(${He} * 1px) solid ${cr};
        height: calc(${Ht} * 1px);
        align-items: baseline;
    }

    .control {
        -webkit-appearance: none;
        font: inherit;
        background: transparent;
        border: 0;
        color: inherit;
        height: calc(100% - 4px);
        width: 100%;
        margin-top: auto;
        margin-bottom: auto;
        border: none;
        padding: 0 calc(${ot} * 2px + 1px);
        font-size: ${tn};
        line-height: ${rn};
    }

    .control:hover,
    .control:${ge},
    .control:disabled,
    .control:active {
        outline: none;
    }

    .label {
        display: block;
        color: ${sr};
        cursor: pointer;
        font-size: ${tn};
        line-height: ${rn};
        margin-bottom: 4px;
    }

    .label__hidden {
        display: none;
        visibility: hidden;
    }

    .start,
    .control,
    .end {
        align-self: center;
    }

    .start,
    .end {
        display: flex;
        margin: auto;
        fill: currentcolor;
    }

    ::slotted(svg) {
        /* TODO: adaptive typography https://github.com/microsoft/fast/issues/2432 */
        width: 16px;
        height: 16px;
    }

    .start {
        margin-inline-start: 11px;
    }

    .end {
        margin-inline-end: 11px;
    }

    :host(:hover:not([disabled])) .root {
        background: ${to};
        border-color: ${nn};
    }

    :host(:active:not([disabled])) .root {
        background: ${to};
        border-color: ${on};
    }

    :host(:focus-within:not([disabled])) .root {
        border-color: ${tt};
        box-shadow: 0 0 0 calc(${et} * 1px) ${tt} inset;
    }

    :host([appearance="filled"]) .root {
        background: ${eo};
    }

    :host([appearance="filled"]:hover:not([disabled])) .root {
        background: ${kh};
    }

    :host([disabled]) .label,
    :host([readonly]) .label,
    :host([readonly]) .control,
    :host([disabled]) .control {
        cursor: ${en};
    }

    :host([disabled]) {
        opacity: ${Ci};
    }

    :host([disabled]) .control {
        border-color: ${jl};
    }
`.withBehaviors(ct(ue`
                .root,
                :host([appearance="filled"]) .root {
                    forced-color-adjust: none;
                    background: ${C.Field};
                    border-color: ${C.FieldText};
                }
                :host(:hover:not([disabled])) .root,
                :host([appearance="filled"]:hover:not([disabled])) .root,
                :host([appearance="filled"]:hover) .root {
                    background: ${C.Field};
                    border-color: ${C.Highlight};
                }
                .start,
                .end {
                    fill: currentcolor;
                }
                :host([disabled]) {
                    opacity: 1;
                }
                :host([disabled]) .root,
                :host([appearance="filled"]:hover[disabled]) .root {
                    border-color: ${C.GrayText};
                    background: ${C.Field};
                }
                :host(:focus-within:enabled) .root {
                    border-color: ${C.Highlight};
                    box-shadow: 0 0 0 1px ${C.Highlight} inset;
                }
                input::placeholder {
                    color: ${C.GrayText};
                }
            `));class Hx extends dr{constructor(){super(...arguments),this.appearance="outline"}}g([D],Hx.prototype,"appearance",void 0);const _3=Hx.compose({baseName:"text-field",baseClass:dr,template:fC,styles:$3,shadowOptions:{delegatesFocus:!0}});function kn(e){return kx.getOrCreate(e).withPrefix("fast")}kn().register(b3());var Vd;let bs=(Vd=class extends Re{constructor(){super(...arguments),$(this,"message"),$(this,"full",!1),$(this,"show",!0)}render(){return this.show?re`
      <div class="busy-indicator">
        <fast-progress-ring indeterminate></fast-progress-ring>
        <div>${this.message}</div>
      </div>`:re``}},$(Vd,"styles",[at`
      :host {
        z-index: 999;
      }

      :host([full]) .busy-indicator {
        position: fixed; /* 전체 화면을 커버하기 위한 스타일 */
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
      }
      
      .busy-indicator {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: #2224;
        display: flex;
        align-items: center;
        justify-content: center;

        display: flex;
        flex-direction: column;
      }
      `]),Vd);g([J({type:String})],bs.prototype,"message",void 0);g([J({type:Boolean,reflect:!0})],bs.prototype,"full",void 0);g([J({type:Boolean,reflect:!0})],bs.prototype,"show",void 0);bs=g([lt("busy-indicator")],bs);var Bd;let hl=(Bd=class extends Re{constructor(){super(...arguments),$(this,"orientation","horizontal"),$(this,"host"),$(this,"thumb"),$(this,"isDragging",!1),$(this,"initValue",0)}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.orientation==="horizontal"?(this.style.minWidth="2px",this.style.maxWidth="2px",this.host.style.height="100%",this.host.style.width="2px",this.thumb.style.width="8px",this.thumb.style.height="20px",this.thumb.style.top="calc(50% - 10px)",this.thumb.style.left="-3px",this.thumb.style.cursor="ew-resize"):(this.style.minHeight="2px",this.style.maxHeight="2px",this.host.style.width="100%",this.host.style.height="2px",this.thumb.style.height="8px",this.thumb.style.width="20px",this.thumb.style.left="50%",this.thumb.style.top="-3px",this.thumb.style.cursor="ns-resize"),this.onMouseDown=this.onMouseDown.bind(this),this.onMouseMove=this.onMouseMove.bind(this),this.onMouseUp=this.onMouseUp.bind(this),this.onKeyDown=this.onKeyDown.bind(this),this.thumb.addEventListener("mousedown",this.onMouseDown),document.addEventListener("mousemove",this.onMouseMove),document.addEventListener("mouseup",this.onMouseUp),document.addEventListener("keydown",this.onKeyDown)}onMouseDown(e){this.isDragging=!0,this.classList.add("dragging"),this.initValue=this.orientation=="horizontal"?e.clientX:e.clientY}onMouseMove(e){if(this.isDragging)if(this.orientation==="horizontal"){const t=e.clientX-this.initValue;this.host.style.left=`${t}px`}else{const t=e.clientY-this.initValue;this.host.style.top=`${t}px`}}onMouseUp(e){if(!this.isDragging)return;this.isDragging=!1,this.classList.remove("dragging"),this.orientation=="horizontal"?this.host.style.left="0px":this.host.style.top="0px";const t=this.orientation==="horizontal"?e.clientX-this.initValue:e.clientY-this.initValue;this.dispatchEvent(new CustomEvent("on-dragged",{detail:t}))}onKeyDown(e){this.isDragging&&e.key=="Escape"&&(this.isDragging=!1,this.classList.remove("dragging"),this.orientation=="horizontal"?this.host.style.left="0px":this.host.style.top="0px")}render(){return re`
      <div id="host">
        <div id="thumb">
        </div>
      </div>
    `}},$(Bd,"styles",[at`

    :host {
      background: transparent;
      position: relative;
    }

    #host {
      visibility: hidden;
      background: #7a7a7a;

      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;

      z-index: 9999;
    }

    #thumb {
      background: red;
      border-radius: 4px;
      visibility: hidden;
      position: absolute;
    }

    :host(:hover) #thumb {
      visibility: visible;
    }

    :host(.dragging) #thumb,:host(.dragging) #host {
      visibility: visible;
    }
    `]),Bd);g([J({type:String})],hl.prototype,"orientation",void 0);g([Br("#host")],hl.prototype,"host",void 0);g([Br("#thumb")],hl.prototype,"thumb",void 0);hl=g([lt("x-splitter")],hl);var zd;let ro=(zd=class extends Re{constructor(){super(...arguments),$(this,"key"),$(this,"orientation","horizontal"),$(this,"init","5:5"),$(this,"item1"),$(this,"item2")}async firstUpdated(e){super.firstUpdated(e),await this.updateComplete,this.load()}updated(e){super.updated(e),e.has("orientation")&&this.style.setProperty("--flex-direction",this.orientation==="horizontal"?"row":"column")}render(){return re`
      <div id="item1">
        <slot name="item1"></slot>
      </div>
      <x-splitter orientation=${this.orientation} @on-dragged=${this.onDragged}></x-splitter>
      <div id="item2">
        <slot name="item2"></slot>
      </div>
    `}onDragged(e){if(e.detail){const t=e.detail;this.resize(t)}}resize(e){if(this.orientation==="horizontal"){const t=this.item1.clientWidth,r=this.item2.clientWidth,n=t+r,i=(t+e)/n*100,o=(r-e)/n*100;this.item1.style.width=`${i}%`,this.item2.style.width=`${o}%`}else{const t=this.item1.clientHeight,r=this.item2.clientHeight,n=t+r,i=(t+e)/n*100,o=(r-e)/n*100;this.item1.style.height=`${i}%`,this.item2.style.height=`${o}%`}this.save()}save(){if(this.key){let e;this.orientation==="horizontal"?e=JSON.stringify({width1:this.item1.style.width,width2:this.item2.style.width}):e=JSON.stringify({height1:this.item1.style.height,height2:this.item2.style.height}),localStorage.setItem(this.key,e)}}load(){if(this.key){const e=localStorage.getItem(this.key);if(e){const t=JSON.parse(e);this.orientation==="horizontal"?(this.item1.style.width=t.width1,this.item2.style.width=t.width2):(this.item1.style.height=t.height1,this.item2.style.height=t.height2);return}}if(this.init&&this.init.includes(":")){const e=this.init.split(":");let t=parseFloat(e[0]),r=parseFloat(e[1]);const n=t+r;t&&r&&n!=0&&(t=t/n*100,r=r/n*100,this.orientation==="horizontal"?(this.item1.style.width=`${t}%`,this.item2.style.width=`${r}%`):(this.item1.style.height=`${t}%`,this.item2.style.height=`${r}%`))}}},$(zd,"styles",at`
      :host {
        position: relative;
        display: flex;
        flex-direction: var(--flex-direction, row);
        width: 100%;
        height: 100%;
      }

      #item1, #item2 {
        flex-grow: 1;
      }
  `),zd);g([J({type:String})],ro.prototype,"key",void 0);g([J({type:String})],ro.prototype,"orientation",void 0);g([J({type:String})],ro.prototype,"init",void 0);g([Br("#item1")],ro.prototype,"item1",void 0);g([Br("#item2")],ro.prototype,"item2",void 0);ro=g([lt("grid-unit")],ro);var Hd;let dl=(Hd=class extends Re{constructor(){super(),$(this,"menu"),$(this,"menuItems",[]),$(this,"location",{x:0,y:0}),$(this,"selectedItem",null),$(this,"resolve"),$(this,"reject"),this.onMouseUp=this.onMouseUp.bind(this),this.addEventListener("mouseup",this.onMouseUp)}onMouseUp(e){this.menu.isCursorInElement(e)||this.cancel()}render(){return re`
      <fast-menu id="menu" style="left: ${this.location.x}px; top: ${this.location.y}px">
        ${this.menuItems.map(e=>re`
          <fast-menu-item @click="${()=>this.onMenuItemClick(e)}" .value="${e.name}">
            ${e.label}
          </fast-menu-item>
        `)}
      </fast-menu>
    `}onMenuItemClick(e){this.selectedItem=e,this.ok()}ok(){this.selectedItem&&this.resolve?this.resolve({success:!0,value:this.selectedItem.name}):this.cancel()}cancel(){this.close(),this.reject&&this.reject()}async showAsync(){return await this.updateComplete,this.visible(),new Promise((e,t)=>{this.resolve=e,this.reject=t}).catch(e=>(console.warn(e),{success:!1,value:null}))}visible(){this.hidden=!1}close(){this.hidden=!0}},$(Hd,"styles",[at`
    :host {
      background: transparent;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 9999;
    }
    
    #menu {
      position: absolute;
    }
    `]),Hd);g([Br("#menu")],dl.prototype,"menu",void 0);g([J({type:Array})],dl.prototype,"menuItems",void 0);g([J({type:Object})],dl.prototype,"location",void 0);dl=g([lt("popup-menu")],dl);function Ee(e){for(var t=arguments.length,r=new Array(t>1?t-1:0),n=1;n<t;n++)r[n-1]=arguments[n];throw new Error(typeof e=="number"?"[MobX] minified error nr: "+e+(r.length?" "+r.map(String).join(","):"")+". Find the full error at: https://github.com/mobxjs/mobx/blob/main/packages/mobx/src/errors.ts":"[MobX] "+e)}var k3={};function pg(){return typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:k3}var Ux=Object.assign,Oc=Object.getOwnPropertyDescriptor,xn=Object.defineProperty,Ah=Object.prototype,_p=[];Object.freeze(_p);var vg={};Object.freeze(vg);var S3=typeof Proxy<"u",C3=Object.toString();function qx(){S3||Ee("Proxy not available")}function Wx(e){var t=!1;return function(){if(!t)return t=!0,e.apply(this,arguments)}}var Go=function(){};function sn(e){return typeof e=="function"}function no(e){var t=typeof e;switch(t){case"string":case"symbol":case"number":return!0}return!1}function jh(e){return e!==null&&typeof e=="object"}function Bn(e){if(!jh(e))return!1;var t=Object.getPrototypeOf(e);if(t==null)return!0;var r=Object.hasOwnProperty.call(t,"constructor")&&t.constructor;return typeof r=="function"&&r.toString()===C3}function Kx(e){var t=e==null?void 0:e.constructor;return t?t.name==="GeneratorFunction"||t.displayName==="GeneratorFunction":!1}function Ll(e,t,r){xn(e,t,{enumerable:!1,writable:!0,configurable:!0,value:r})}function Gx(e,t,r){xn(e,t,{enumerable:!1,writable:!1,configurable:!0,value:r})}function xo(e,t){var r="isMobX"+e;return t.prototype[r]=!0,function(n){return jh(n)&&n[r]===!0}}function Vs(e){return e instanceof Map}function Dl(e){return e instanceof Set}var Qx=typeof Object.getOwnPropertySymbols<"u";function E3(e){var t=Object.keys(e);if(!Qx)return t;var r=Object.getOwnPropertySymbols(e);return r.length?[].concat(t,r.filter(function(n){return Ah.propertyIsEnumerable.call(e,n)})):t}var xs=typeof Reflect<"u"&&Reflect.ownKeys?Reflect.ownKeys:Qx?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:Object.getOwnPropertyNames;function Zx(e){return e===null?null:typeof e=="object"?""+e:e}function Ln(e,t){return Ah.hasOwnProperty.call(e,t)}var O3=Object.getOwnPropertyDescriptors||function(e){var t={};return xs(e).forEach(function(r){t[r]=Oc(e,r)}),t};function M0(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,A3(n.key),n)}}function gg(e,t,r){return t&&M0(e.prototype,t),r&&M0(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}function io(){return io=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},io.apply(this,arguments)}function Xx(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,kp(e,t)}function kp(e,t){return kp=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,n){return r.__proto__=n,r},kp(e,t)}function Ud(e){if(e===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function T3(e,t){if(e){if(typeof e=="string")return I0(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);if(r==="Object"&&e.constructor&&(r=e.constructor.name),r==="Map"||r==="Set")return Array.from(e);if(r==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return I0(e,t)}}function I0(e,t){(t==null||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function Qo(e,t){var r=typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(r)return(r=r.call(e)).next.bind(r);if(Array.isArray(e)||(r=T3(e))||t&&e&&typeof e.length=="number"){r&&(e=r);var n=0;return function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function P3(e,t){if(typeof e!="object"||e===null)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t||"default");if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function A3(e){var t=P3(e,"string");return typeof t=="symbol"?t:String(t)}var mn=Symbol("mobx-stored-annotations");function wn(e){function t(r,n){if(Rl(n))return e.decorate_20223_(r,n);Bs(r,n,e)}return Object.assign(t,e)}function Bs(e,t,r){Ln(e,mn)||Ll(e,mn,io({},e[mn])),V3(r)||(e[mn][t]=r)}function j3(e){return Ln(e,mn)||Ll(e,mn,io({},e[mn])),e[mn]}function Rl(e){return typeof e=="object"&&typeof e.kind=="string"}var se=Symbol("mobx administration"),Ml=function(){function e(r){r===void 0&&(r="Atom"),this.name_=void 0,this.isPendingUnobservation_=!1,this.isBeingObserved_=!1,this.observers_=new Set,this.diffValue_=0,this.lastAccessedBy_=0,this.lowestObserverState_=Oe.NOT_TRACKING_,this.onBOL=void 0,this.onBUOL=void 0,this.name_=r}var t=e.prototype;return t.onBO=function(){this.onBOL&&this.onBOL.forEach(function(r){return r()})},t.onBUO=function(){this.onBUOL&&this.onBUOL.forEach(function(r){return r()})},t.reportObserved=function(){return mw(this)},t.reportChanged=function(){Dr(),yw(this),Rr()},t.toString=function(){return this.name_},e}(),mg=xo("Atom",Ml);function Yx(e,t,r){t===void 0&&(t=Go),r===void 0&&(r=Go);var n=new Ml(e);return t!==Go&&HO(n,t),r!==Go&&Sw(n,r),n}function N3(e,t){return e===t}function L3(e,t){return $g(e,t)}function D3(e,t){return $g(e,t,1)}function R3(e,t){return Object.is?Object.is(e,t):e===t?e!==0||1/e===1/t:e!==e&&t!==t}var ws={identity:N3,structural:L3,default:R3,shallow:D3};function zs(e,t,r){return Pw(e)?e:Array.isArray(e)?vt.array(e,{name:r}):Bn(e)?vt.object(e,void 0,{name:r}):Vs(e)?vt.map(e,{name:r}):Dl(e)?vt.set(e,{name:r}):typeof e=="function"&&!Fh(e)&&!pl(e)?Kx(e)?_s(e):fl(r,e):e}function M3(e,t,r){if(e==null||ks(e)||Vh(e)||$o(e)||Us(e))return e;if(Array.isArray(e))return vt.array(e,{name:r,deep:!1});if(Bn(e))return vt.object(e,void 0,{name:r,deep:!1});if(Vs(e))return vt.map(e,{name:r,deep:!1});if(Dl(e))return vt.set(e,{name:r,deep:!1})}function Nh(e){return e}function I3(e,t){return $g(e,t)?t:e}var F3="override";function V3(e){return e.annotationType_===F3}function Il(e,t){return{annotationType_:e,options_:t,make_:B3,extend_:z3,decorate_20223_:H3}}function B3(e,t,r,n){var i;if((i=this.options_)!=null&&i.bound)return this.extend_(e,t,r,!1)===null?0:1;if(n===e.target_)return this.extend_(e,t,r,!1)===null?0:2;if(Fh(r.value))return 1;var o=Jx(e,this,t,r,!1);return xn(n,t,o),2}function z3(e,t,r,n){var i=Jx(e,this,t,r);return e.defineProperty_(t,i,n)}function H3(e,t){var r=t.kind,n=t.name,i=t.addInitializer,o=this,s=function(l){var u,c,h,d;return oo((u=(c=o.options_)==null?void 0:c.name)!=null?u:n.toString(),l,(h=(d=o.options_)==null?void 0:d.autoAction)!=null?h:!1)};if(r=="field"){i(function(){Bs(this,n,o)});return}if(r=="method"){var a;return Fh(e)||(e=s(e)),(a=this.options_)!=null&&a.bound&&i(function(){var l=this,u=l[n].bind(l);u.isMobxAction=!0,l[n]=u}),e}Ee("Cannot apply '"+o.annotationType_+"' to '"+String(n)+"' (kind: "+r+"):"+(`
'`+o.annotationType_+"' can only be used on properties with a function value."))}function U3(e,t,r,n){t.annotationType_,n.value}function Jx(e,t,r,n,i){var o,s,a,l,u,c,h;i===void 0&&(i=z.safeDescriptors),U3(e,t,r,n);var d=n.value;if((o=t.options_)!=null&&o.bound){var m;d=d.bind((m=e.proxy_)!=null?m:e.target_)}return{value:oo((s=(a=t.options_)==null?void 0:a.name)!=null?s:r.toString(),d,(l=(u=t.options_)==null?void 0:u.autoAction)!=null?l:!1,(c=t.options_)!=null&&c.bound?(h=e.proxy_)!=null?h:e.target_:void 0),configurable:i?e.isPlainObject_:!0,enumerable:!1,writable:!i}}function ew(e,t){return{annotationType_:e,options_:t,make_:q3,extend_:W3,decorate_20223_:K3}}function q3(e,t,r,n){var i;if(n===e.target_)return this.extend_(e,t,r,!1)===null?0:2;if((i=this.options_)!=null&&i.bound&&(!Ln(e.target_,t)||!pl(e.target_[t]))&&this.extend_(e,t,r,!1)===null)return 0;if(pl(r.value))return 1;var o=tw(e,this,t,r,!1,!1);return xn(n,t,o),2}function W3(e,t,r,n){var i,o=tw(e,this,t,r,(i=this.options_)==null?void 0:i.bound);return e.defineProperty_(t,o,n)}function K3(e,t){var r,n=t.name,i=t.addInitializer;return pl(e)||(e=_s(e)),(r=this.options_)!=null&&r.bound&&i(function(){var o=this,s=o[n].bind(o);s.isMobXFlow=!0,o[n]=s}),e}function G3(e,t,r,n){t.annotationType_,n.value}function tw(e,t,r,n,i,o){o===void 0&&(o=z.safeDescriptors),G3(e,t,r,n);var s=n.value;if(pl(s)||(s=_s(s)),i){var a;s=s.bind((a=e.proxy_)!=null?a:e.target_),s.isMobXFlow=!0}return{value:s,configurable:o?e.isPlainObject_:!0,enumerable:!1,writable:!o}}function yg(e,t){return{annotationType_:e,options_:t,make_:Q3,extend_:Z3,decorate_20223_:X3}}function Q3(e,t,r){return this.extend_(e,t,r,!1)===null?0:1}function Z3(e,t,r,n){return Y3(e,this,t,r),e.defineComputedProperty_(t,io({},this.options_,{get:r.get,set:r.set}),n)}function X3(e,t){var r=this,n=t.name,i=t.addInitializer;return i(function(){var o=_o(this)[se],s=io({},r.options_,{get:e,context:this});s.name||(s.name="ObservableObject."+n.toString()),o.values_.set(n,new $s(s))}),function(){return this[se].getObservablePropValue_(n)}}function Y3(e,t,r,n){t.annotationType_,n.get}function Lh(e,t){return{annotationType_:e,options_:t,make_:J3,extend_:eO,decorate_20223_:tO}}function J3(e,t,r){return this.extend_(e,t,r,!1)===null?0:1}function eO(e,t,r,n){var i,o;return rO(e,this),e.defineObservableProperty_(t,r.value,(i=(o=this.options_)==null?void 0:o.enhancer)!=null?i:zs,n)}function tO(e,t){var r=this,n=t.kind,i=t.name,o=new WeakSet;function s(a,l){var u,c,h=_o(a)[se],d=new Wi(l,(u=(c=r.options_)==null?void 0:c.enhancer)!=null?u:zs,"ObservableObject."+i.toString(),!1);h.values_.set(i,d),o.add(a)}if(n=="accessor")return{get:function(){return o.has(this)||s(this,e.get.call(this)),this[se].getObservablePropValue_(i)},set:function(a){return o.has(this)||s(this,a),this[se].setObservablePropValue_(i,a)},init:function(a){return o.has(this)||s(this,a),a}}}function rO(e,t,r,n){t.annotationType_}var nO="true",iO=rw();function rw(e){return{annotationType_:nO,options_:e,make_:oO,extend_:sO,decorate_20223_:aO}}function oO(e,t,r,n){var i,o;if(r.get)return Dh.make_(e,t,r,n);if(r.set){var s=oo(t.toString(),r.set);return n===e.target_?e.defineProperty_(t,{configurable:z.safeDescriptors?e.isPlainObject_:!0,set:s})===null?0:2:(xn(n,t,{configurable:!0,set:s}),2)}if(n!==e.target_&&typeof r.value=="function"){var a;if(Kx(r.value)){var l,u=(l=this.options_)!=null&&l.autoBind?_s.bound:_s;return u.make_(e,t,r,n)}var c=(a=this.options_)!=null&&a.autoBind?fl.bound:fl;return c.make_(e,t,r,n)}var h=((i=this.options_)==null?void 0:i.deep)===!1?vt.ref:vt;if(typeof r.value=="function"&&(o=this.options_)!=null&&o.autoBind){var d;r.value=r.value.bind((d=e.proxy_)!=null?d:e.target_)}return h.make_(e,t,r,n)}function sO(e,t,r,n){var i,o;if(r.get)return Dh.extend_(e,t,r,n);if(r.set)return e.defineProperty_(t,{configurable:z.safeDescriptors?e.isPlainObject_:!0,set:oo(t.toString(),r.set)},n);if(typeof r.value=="function"&&(i=this.options_)!=null&&i.autoBind){var s;r.value=r.value.bind((s=e.proxy_)!=null?s:e.target_)}var a=((o=this.options_)==null?void 0:o.deep)===!1?vt.ref:vt;return a.extend_(e,t,r,n)}function aO(e,t){Ee("'"+this.annotationType_+"' cannot be used as a decorator")}var lO="observable",uO="observable.ref",cO="observable.shallow",hO="observable.struct",nw={deep:!0,name:void 0,defaultDecorator:void 0,proxy:!0};Object.freeze(nw);function $u(e){return e||nw}var Sp=Lh(lO),dO=Lh(uO,{enhancer:Nh}),fO=Lh(cO,{enhancer:M3}),pO=Lh(hO,{enhancer:I3}),iw=wn(Sp);function _u(e){return e.deep===!0?zs:e.deep===!1?Nh:gO(e.defaultDecorator)}function vO(e){var t;return e?(t=e.defaultDecorator)!=null?t:rw(e):void 0}function gO(e){var t,r;return e&&(t=(r=e.options_)==null?void 0:r.enhancer)!=null?t:zs}function ow(e,t,r){if(Rl(t))return Sp.decorate_20223_(e,t);if(no(t)){Bs(e,t,Sp);return}return Pw(e)?e:Bn(e)?vt.object(e,t,r):Array.isArray(e)?vt.array(e,t):Vs(e)?vt.map(e,t):Dl(e)?vt.set(e,t):typeof e=="object"&&e!==null?e:vt.box(e,t)}Ux(ow,iw);var mO={box:function(e,t){var r=$u(t);return new Wi(e,_u(r),r.name,!0,r.equals)},array:function(e,t){var r=$u(t);return(z.useProxies===!1||r.proxy===!1?f4:n4)(e,_u(r),r.name)},map:function(e,t){var r=$u(t);return new Lw(e,_u(r),r.name)},set:function(e,t){var r=$u(t);return new Mw(e,_u(r),r.name)},object:function(e,t,r){return Ei(function(){return Ew(z.useProxies===!1||(r==null?void 0:r.proxy)===!1?_o({},r):JO({},r),e,t)})},ref:wn(dO),shallow:wn(fO),deep:iw,struct:wn(pO)},vt=Ux(ow,mO),sw="computed",yO="computed.struct",Cp=yg(sw),bO=yg(yO,{equals:ws.structural}),Dh=function(e,t){if(Rl(t))return Cp.decorate_20223_(e,t);if(no(t))return Bs(e,t,Cp);if(Bn(e))return wn(yg(sw,e));var r=Bn(t)?t:{};return r.get=e,r.name||(r.name=e.name||""),new $s(r)};Object.assign(Dh,Cp);Dh.struct=wn(bO);var F0,V0,Tc=0,xO=1,wO=(F0=(V0=Oc(function(){},"name"))==null?void 0:V0.configurable)!=null?F0:!1,B0={value:"action",configurable:!0,writable:!1,enumerable:!1};function oo(e,t,r,n){r===void 0&&(r=!1);function i(){return aw(e,r,t,n||this,arguments)}return i.isMobxAction=!0,i.toString=function(){return t.toString()},wO&&(B0.value=e,xn(i,"name",B0)),i}function aw(e,t,r,n,i){var o=$O(e,t);try{return r.apply(n,i)}catch(s){throw o.error_=s,s}finally{_O(o)}}function $O(e,t,r,n){var i=!1,o=0,s=z.trackingDerivation,a=!t||!s;Dr();var l=z.allowStateChanges;a&&(wo(),l=Rh(!0));var u=bg(!0),c={runAsAction_:a,prevDerivation_:s,prevAllowStateChanges_:l,prevAllowStateReads_:u,notifySpy_:i,startTime_:o,actionId_:xO++,parentActionId_:Tc};return Tc=c.actionId_,c}function _O(e){Tc!==e.actionId_&&Ee(30),Tc=e.parentActionId_,e.error_!==void 0&&(z.suppressReactionErrors=!0),Mh(e.prevAllowStateChanges_),Ra(e.prevAllowStateReads_),Rr(),e.runAsAction_&&Dn(e.prevDerivation_),z.suppressReactionErrors=!1}function lw(e,t){var r=Rh(e);try{return t()}finally{Mh(r)}}function Rh(e){var t=z.allowStateChanges;return z.allowStateChanges=e,t}function Mh(e){z.allowStateChanges=e}var uw;uw=Symbol.toPrimitive;var Wi=function(e){Xx(t,e);function t(n,i,o,s,a){var l;return o===void 0&&(o="ObservableValue"),a===void 0&&(a=ws.default),l=e.call(this,o)||this,l.enhancer=void 0,l.name_=void 0,l.equals=void 0,l.hasUnreportedChange_=!1,l.interceptors_=void 0,l.changeListeners_=void 0,l.value_=void 0,l.dehancer=void 0,l.enhancer=i,l.name_=o,l.equals=a,l.value_=i(n,void 0,o),l}var r=t.prototype;return r.dehanceValue=function(n){return this.dehancer!==void 0?this.dehancer(n):n},r.set=function(n){this.value_,n=this.prepareNewValue_(n),n!==z.UNCHANGED&&this.setNewValue_(n)},r.prepareNewValue_=function(n){if(Ar(this)){var i=jr(this,{object:this,type:$n,newValue:n});if(!i)return z.UNCHANGED;n=i.newValue}return n=this.enhancer(n,this.value_,this.name_),this.equals(this.value_,n)?z.UNCHANGED:n},r.setNewValue_=function(n){var i=this.value_;this.value_=n,this.reportChanged(),Xr(this)&&Yr(this,{type:$n,object:this,newValue:n,oldValue:i})},r.get=function(){return this.reportObserved(),this.dehanceValue(this.value_)},r.intercept_=function(n){return Fl(this,n)},r.observe_=function(n,i){return i&&n({observableKind:"value",debugObjectName:this.name_,object:this,type:$n,newValue:this.value_,oldValue:void 0}),Vl(this,n)},r.raw=function(){return this.value_},r.toJSON=function(){return this.get()},r.toString=function(){return this.name_+"["+this.value_+"]"},r.valueOf=function(){return Zx(this.get())},r[uw]=function(){return this.valueOf()},t}(Ml),cw;cw=Symbol.toPrimitive;var $s=function(){function e(r){this.dependenciesState_=Oe.NOT_TRACKING_,this.observing_=[],this.newObserving_=null,this.isBeingObserved_=!1,this.isPendingUnobservation_=!1,this.observers_=new Set,this.diffValue_=0,this.runId_=0,this.lastAccessedBy_=0,this.lowestObserverState_=Oe.UP_TO_DATE_,this.unboundDepsCount_=0,this.value_=new Ac(null),this.name_=void 0,this.triggeredBy_=void 0,this.isComputing_=!1,this.isRunningSetter_=!1,this.derivation=void 0,this.setter_=void 0,this.isTracing_=Pc.NONE,this.scope_=void 0,this.equals_=void 0,this.requiresReaction_=void 0,this.keepAlive_=void 0,this.onBOL=void 0,this.onBUOL=void 0,r.get||Ee(31),this.derivation=r.get,this.name_=r.name||"ComputedValue",r.set&&(this.setter_=oo("ComputedValue-setter",r.set)),this.equals_=r.equals||(r.compareStructural||r.struct?ws.structural:ws.default),this.scope_=r.context,this.requiresReaction_=r.requiresReaction,this.keepAlive_=!!r.keepAlive}var t=e.prototype;return t.onBecomeStale_=function(){OO(this)},t.onBO=function(){this.onBOL&&this.onBOL.forEach(function(r){return r()})},t.onBUO=function(){this.onBUOL&&this.onBUOL.forEach(function(r){return r()})},t.get=function(){if(this.isComputing_&&Ee(32,this.name_,this.derivation),z.inBatch===0&&this.observers_.size===0&&!this.keepAlive_)Ep(this)&&(this.warnAboutUntrackedRead_(),Dr(),this.value_=this.computeValue_(!1),Rr());else if(mw(this),Ep(this)){var r=z.trackingContext;this.keepAlive_&&!r&&(z.trackingContext=this),this.trackAndCompute()&&EO(this),z.trackingContext=r}var n=this.value_;if(Vu(n))throw n.cause;return n},t.set=function(r){if(this.setter_){this.isRunningSetter_&&Ee(33,this.name_),this.isRunningSetter_=!0;try{this.setter_.call(this.scope_,r)}finally{this.isRunningSetter_=!1}}else Ee(34,this.name_)},t.trackAndCompute=function(){var r=this.value_,n=this.dependenciesState_===Oe.NOT_TRACKING_,i=this.computeValue_(!0),o=n||Vu(r)||Vu(i)||!this.equals_(r,i);return o&&(this.value_=i),o},t.computeValue_=function(r){this.isComputing_=!0;var n=Rh(!1),i;if(r)i=hw(this,this.derivation,this.scope_);else if(z.disableErrorBoundaries===!0)i=this.derivation.call(this.scope_);else try{i=this.derivation.call(this.scope_)}catch(o){i=new Ac(o)}return Mh(n),this.isComputing_=!1,i},t.suspend_=function(){this.keepAlive_||(Op(this),this.value_=void 0)},t.observe_=function(r,n){var i=this,o=!0,s=void 0;return ss(function(){var a=i.get();if(!o||n){var l=wo();r({observableKind:"computed",debugObjectName:i.name_,type:$n,object:i,newValue:a,oldValue:s}),Dn(l)}o=!1,s=a})},t.warnAboutUntrackedRead_=function(){},t.toString=function(){return this.name_+"["+this.derivation.toString()+"]"},t.valueOf=function(){return Zx(this.get())},t[cw]=function(){return this.valueOf()},e}(),Ih=xo("ComputedValue",$s),Oe;(function(e){e[e.NOT_TRACKING_=-1]="NOT_TRACKING_",e[e.UP_TO_DATE_=0]="UP_TO_DATE_",e[e.POSSIBLY_STALE_=1]="POSSIBLY_STALE_",e[e.STALE_=2]="STALE_"})(Oe||(Oe={}));var Pc;(function(e){e[e.NONE=0]="NONE",e[e.LOG=1]="LOG",e[e.BREAK=2]="BREAK"})(Pc||(Pc={}));var Ac=function(e){this.cause=void 0,this.cause=e};function Vu(e){return e instanceof Ac}function Ep(e){switch(e.dependenciesState_){case Oe.UP_TO_DATE_:return!1;case Oe.NOT_TRACKING_:case Oe.STALE_:return!0;case Oe.POSSIBLY_STALE_:{for(var t=bg(!0),r=wo(),n=e.observing_,i=n.length,o=0;o<i;o++){var s=n[o];if(Ih(s)){if(z.disableErrorBoundaries)s.get();else try{s.get()}catch{return Dn(r),Ra(t),!0}if(e.dependenciesState_===Oe.STALE_)return Dn(r),Ra(t),!0}}return fw(e),Dn(r),Ra(t),!1}}}function hw(e,t,r){var n=bg(!0);fw(e),e.newObserving_=new Array(e.observing_.length+100),e.unboundDepsCount_=0,e.runId_=++z.runId;var i=z.trackingDerivation;z.trackingDerivation=e,z.inBatch++;var o;if(z.disableErrorBoundaries===!0)o=t.call(r);else try{o=t.call(r)}catch(s){o=new Ac(s)}return z.inBatch--,z.trackingDerivation=i,kO(e),Ra(n),o}function kO(e){for(var t=e.observing_,r=e.observing_=e.newObserving_,n=Oe.UP_TO_DATE_,i=0,o=e.unboundDepsCount_,s=0;s<o;s++){var a=r[s];a.diffValue_===0&&(a.diffValue_=1,i!==s&&(r[i]=a),i++),a.dependenciesState_>n&&(n=a.dependenciesState_)}for(r.length=i,e.newObserving_=null,o=t.length;o--;){var l=t[o];l.diffValue_===0&&vw(l,e),l.diffValue_=0}for(;i--;){var u=r[i];u.diffValue_===1&&(u.diffValue_=0,CO(u,e))}n!==Oe.UP_TO_DATE_&&(e.dependenciesState_=n,e.onBecomeStale_())}function Op(e){var t=e.observing_;e.observing_=[];for(var r=t.length;r--;)vw(t[r],e);e.dependenciesState_=Oe.NOT_TRACKING_}function dw(e){var t=wo();try{return e()}finally{Dn(t)}}function wo(){var e=z.trackingDerivation;return z.trackingDerivation=null,e}function Dn(e){z.trackingDerivation=e}function bg(e){var t=z.allowStateReads;return z.allowStateReads=e,t}function Ra(e){z.allowStateReads=e}function fw(e){if(e.dependenciesState_!==Oe.UP_TO_DATE_){e.dependenciesState_=Oe.UP_TO_DATE_;for(var t=e.observing_,r=t.length;r--;)t[r].lowestObserverState_=Oe.UP_TO_DATE_}}var Bu=function(){this.version=6,this.UNCHANGED={},this.trackingDerivation=null,this.trackingContext=null,this.runId=0,this.mobxGuid=0,this.inBatch=0,this.pendingUnobservations=[],this.pendingReactions=[],this.isRunningReactions=!1,this.allowStateChanges=!1,this.allowStateReads=!0,this.enforceActions=!0,this.spyListeners=[],this.globalReactionErrorHandlers=[],this.computedRequiresReaction=!1,this.reactionRequiresObservable=!1,this.observableRequiresReaction=!1,this.disableErrorBoundaries=!1,this.suppressReactionErrors=!1,this.useProxies=!0,this.verifyProxies=!1,this.safeDescriptors=!0},zu=!0,pw=!1,z=function(){var e=pg();return e.__mobxInstanceCount>0&&!e.__mobxGlobals&&(zu=!1),e.__mobxGlobals&&e.__mobxGlobals.version!==new Bu().version&&(zu=!1),zu?e.__mobxGlobals?(e.__mobxInstanceCount+=1,e.__mobxGlobals.UNCHANGED||(e.__mobxGlobals.UNCHANGED={}),e.__mobxGlobals):(e.__mobxInstanceCount=1,e.__mobxGlobals=new Bu):(setTimeout(function(){pw||Ee(35)},1),new Bu)}();function SO(){if((z.pendingReactions.length||z.inBatch||z.isRunningReactions)&&Ee(36),pw=!0,zu){var e=pg();--e.__mobxInstanceCount===0&&(e.__mobxGlobals=void 0),z=new Bu}}function CO(e,t){e.observers_.add(t),e.lowestObserverState_>t.dependenciesState_&&(e.lowestObserverState_=t.dependenciesState_)}function vw(e,t){e.observers_.delete(t),e.observers_.size===0&&gw(e)}function gw(e){e.isPendingUnobservation_===!1&&(e.isPendingUnobservation_=!0,z.pendingUnobservations.push(e))}function Dr(){z.inBatch++}function Rr(){if(--z.inBatch===0){bw();for(var e=z.pendingUnobservations,t=0;t<e.length;t++){var r=e[t];r.isPendingUnobservation_=!1,r.observers_.size===0&&(r.isBeingObserved_&&(r.isBeingObserved_=!1,r.onBUO()),r instanceof $s&&r.suspend_())}z.pendingUnobservations=[]}}function mw(e){var t=z.trackingDerivation;return t!==null?(t.runId_!==e.lastAccessedBy_&&(e.lastAccessedBy_=t.runId_,t.newObserving_[t.unboundDepsCount_++]=e,!e.isBeingObserved_&&z.trackingContext&&(e.isBeingObserved_=!0,e.onBO())),e.isBeingObserved_):(e.observers_.size===0&&z.inBatch>0&&gw(e),!1)}function yw(e){e.lowestObserverState_!==Oe.STALE_&&(e.lowestObserverState_=Oe.STALE_,e.observers_.forEach(function(t){t.dependenciesState_===Oe.UP_TO_DATE_&&t.onBecomeStale_(),t.dependenciesState_=Oe.STALE_}))}function EO(e){e.lowestObserverState_!==Oe.STALE_&&(e.lowestObserverState_=Oe.STALE_,e.observers_.forEach(function(t){t.dependenciesState_===Oe.POSSIBLY_STALE_?t.dependenciesState_=Oe.STALE_:t.dependenciesState_===Oe.UP_TO_DATE_&&(e.lowestObserverState_=Oe.UP_TO_DATE_)}))}function OO(e){e.lowestObserverState_===Oe.UP_TO_DATE_&&(e.lowestObserverState_=Oe.POSSIBLY_STALE_,e.observers_.forEach(function(t){t.dependenciesState_===Oe.UP_TO_DATE_&&(t.dependenciesState_=Oe.POSSIBLY_STALE_,t.onBecomeStale_())}))}var so=function(){function e(r,n,i,o){r===void 0&&(r="Reaction"),this.name_=void 0,this.onInvalidate_=void 0,this.errorHandler_=void 0,this.requiresObservable_=void 0,this.observing_=[],this.newObserving_=[],this.dependenciesState_=Oe.NOT_TRACKING_,this.diffValue_=0,this.runId_=0,this.unboundDepsCount_=0,this.isDisposed_=!1,this.isScheduled_=!1,this.isTrackPending_=!1,this.isRunning_=!1,this.isTracing_=Pc.NONE,this.name_=r,this.onInvalidate_=n,this.errorHandler_=i,this.requiresObservable_=o}var t=e.prototype;return t.onBecomeStale_=function(){this.schedule_()},t.schedule_=function(){this.isScheduled_||(this.isScheduled_=!0,z.pendingReactions.push(this),bw())},t.isScheduled=function(){return this.isScheduled_},t.runReaction_=function(){if(!this.isDisposed_){Dr(),this.isScheduled_=!1;var r=z.trackingContext;if(z.trackingContext=this,Ep(this)){this.isTrackPending_=!0;try{this.onInvalidate_()}catch(n){this.reportExceptionInDerivation_(n)}}z.trackingContext=r,Rr()}},t.track=function(r){if(!this.isDisposed_){Dr(),this.isRunning_=!0;var n=z.trackingContext;z.trackingContext=this;var i=hw(this,r,void 0);z.trackingContext=n,this.isRunning_=!1,this.isTrackPending_=!1,this.isDisposed_&&Op(this),Vu(i)&&this.reportExceptionInDerivation_(i.cause),Rr()}},t.reportExceptionInDerivation_=function(r){var n=this;if(this.errorHandler_){this.errorHandler_(r,this);return}if(z.disableErrorBoundaries)throw r;var i="[mobx] uncaught error in '"+this+"'";z.suppressReactionErrors||console.error(i,r),z.globalReactionErrorHandlers.forEach(function(o){return o(r,n)})},t.dispose=function(){this.isDisposed_||(this.isDisposed_=!0,this.isRunning_||(Dr(),Op(this),Rr()))},t.getDisposer_=function(r){var n=this,i=function o(){n.dispose(),r==null||r.removeEventListener==null||r.removeEventListener("abort",o)};return r==null||r.addEventListener==null||r.addEventListener("abort",i),i[se]=this,i},t.toString=function(){return"Reaction["+this.name_+"]"},t.trace=function(r){},e}(),TO=100,Tp=function(e){return e()};function bw(){z.inBatch>0||z.isRunningReactions||Tp(PO)}function PO(){z.isRunningReactions=!0;for(var e=z.pendingReactions,t=0;e.length>0;){++t===TO&&(console.error("[mobx] cycle in reaction: "+e[0]),e.splice(0));for(var r=e.splice(0),n=0,i=r.length;n<i;n++)r[n].runReaction_()}z.isRunningReactions=!1}var jc=xo("Reaction",so);function AO(e){var t=Tp;Tp=function(r){return e(function(){return t(r)})}}function Ma(){return!1}function jO(e){return console.warn("[mobx.spy] Is a no-op in production builds"),function(){}}var xw="action",NO="action.bound",ww="autoAction",LO="autoAction.bound",$w="<unnamed action>",Pp=Il(xw),DO=Il(NO,{bound:!0}),Ap=Il(ww,{autoAction:!0}),RO=Il(LO,{autoAction:!0,bound:!0});function _w(e){var t=function(r,n){if(sn(r))return oo(r.name||$w,r,e);if(sn(n))return oo(r,n,e);if(Rl(n))return(e?Ap:Pp).decorate_20223_(r,n);if(no(n))return Bs(r,n,e?Ap:Pp);if(no(r))return wn(Il(e?ww:xw,{name:r,autoAction:e}))};return t}var Bi=_w(!1);Object.assign(Bi,Pp);var fl=_w(!0);Object.assign(fl,Ap);Bi.bound=wn(DO);fl.bound=wn(RO);function MO(e){return aw(e.name||$w,!1,e,this,void 0)}function Fh(e){return sn(e)&&e.isMobxAction===!0}function ss(e,t){var r,n,i,o,s;t===void 0&&(t=vg);var a=(r=(n=t)==null?void 0:n.name)!=null?r:"Autorun",l=!t.scheduler&&!t.delay,u;if(l)u=new so(a,function(){this.track(d)},t.onError,t.requiresObservable);else{var c=kw(t),h=!1;u=new so(a,function(){h||(h=!0,c(function(){h=!1,u.isDisposed_||u.track(d)}))},t.onError,t.requiresObservable)}function d(){e(u)}return(i=t)!=null&&(o=i.signal)!=null&&o.aborted||u.schedule_(),u.getDisposer_((s=t)==null?void 0:s.signal)}var IO=function(e){return e()};function kw(e){return e.scheduler?e.scheduler:e.delay?function(t){return setTimeout(t,e.delay)}:IO}function FO(e,t,r){var n,i,o,s;r===void 0&&(r=vg);var a=(n=r.name)!=null?n:"Reaction",l=Bi(a,r.onError?VO(r.onError,t):t),u=!r.scheduler&&!r.delay,c=kw(r),h=!0,d=!1,m,y,w=r.compareStructural?ws.structural:r.equals||ws.default,E=new so(a,function(){h||u?p():d||(d=!0,c(p))},r.onError,r.requiresObservable);function p(){if(d=!1,!E.isDisposed_){var f=!1;E.track(function(){var v=lw(!1,function(){return e(E)});f=h||!w(m,v),y=m,m=v}),(h&&r.fireImmediately||!h&&f)&&l(m,y,E),h=!1}}return(i=r)!=null&&(o=i.signal)!=null&&o.aborted||E.schedule_(),E.getDisposer_((s=r)==null?void 0:s.signal)}function VO(e,t){return function(){try{return t.apply(this,arguments)}catch(r){e.call(this,r)}}}var BO="onBO",zO="onBUO";function HO(e,t,r){return Cw(BO,e,t,r)}function Sw(e,t,r){return Cw(zO,e,t,r)}function Cw(e,t,r,n){var i=typeof n=="function"?Ss(t,r):Ss(t),o=sn(n)?n:r,s=e+"L";return i[s]?i[s].add(o):i[s]=new Set([o]),function(){var a=i[s];a&&(a.delete(o),a.size===0&&delete i[s])}}var UO="never",ku="always",qO="observed";function WO(e){e.isolateGlobalState===!0&&SO();var t=e.useProxies,r=e.enforceActions;if(t!==void 0&&(z.useProxies=t===ku?!0:t===UO?!1:typeof Proxy<"u"),t==="ifavailable"&&(z.verifyProxies=!0),r!==void 0){var n=r===ku?ku:r===qO;z.enforceActions=n,z.allowStateChanges=!(n===!0||n===ku)}["computedRequiresReaction","reactionRequiresObservable","observableRequiresReaction","disableErrorBoundaries","safeDescriptors"].forEach(function(i){i in e&&(z[i]=!!e[i])}),z.allowStateReads=!z.observableRequiresReaction,e.reactionScheduler&&AO(e.reactionScheduler)}function Ew(e,t,r,n){var i=O3(t);return Ei(function(){var o=_o(e,n)[se];xs(i).forEach(function(s){o.extend_(s,i[s],r&&s in r?r[s]:!0)})}),e}function KO(e,t){return Ow(Ss(e,t))}function Ow(e){var t={name:e.name_};return e.observing_&&e.observing_.length>0&&(t.dependencies=GO(e.observing_).map(Ow)),t}function GO(e){return Array.from(new Set(e))}var QO=0;function Tw(){this.message="FLOW_CANCELLED"}Tw.prototype=Object.create(Error.prototype);var qd=ew("flow"),ZO=ew("flow.bound",{bound:!0}),_s=Object.assign(function(e,t){if(Rl(t))return qd.decorate_20223_(e,t);if(no(t))return Bs(e,t,qd);var r=e,n=r.name||"<unnamed flow>",i=function(){var o=this,s=arguments,a=++QO,l=Bi(n+" - runid: "+a+" - init",r).apply(o,s),u,c=void 0,h=new Promise(function(d,m){var y=0;u=m;function w(f){c=void 0;var v;try{v=Bi(n+" - runid: "+a+" - yield "+y++,l.next).call(l,f)}catch(S){return m(S)}p(v)}function E(f){c=void 0;var v;try{v=Bi(n+" - runid: "+a+" - yield "+y++,l.throw).call(l,f)}catch(S){return m(S)}p(v)}function p(f){if(sn(f==null?void 0:f.then)){f.then(p,m);return}return f.done?d(f.value):(c=Promise.resolve(f.value),c.then(w,E))}w(void 0)});return h.cancel=Bi(n+" - runid: "+a+" - cancel",function(){try{c&&z0(c);var d=l.return(void 0),m=Promise.resolve(d.value);m.then(Go,Go),z0(m),u(new Tw)}catch(y){u(y)}}),h};return i.isMobXFlow=!0,i},qd);_s.bound=wn(ZO);function z0(e){sn(e.cancel)&&e.cancel()}function pl(e){return(e==null?void 0:e.isMobXFlow)===!0}function XO(e,t){return e?t!==void 0?ks(e)?e[se].values_.has(t):!1:ks(e)||!!e[se]||mg(e)||jc(e)||Ih(e):!1}function Pw(e){return XO(e)}function Tn(e,t){t===void 0&&(t=void 0),Dr();try{return e.apply(t)}finally{Rr()}}function Ao(e){return e[se]}var YO={has:function(e,t){return Ao(e).has_(t)},get:function(e,t){return Ao(e).get_(t)},set:function(e,t,r){var n;return no(t)?(n=Ao(e).set_(t,r,!0))!=null?n:!0:!1},deleteProperty:function(e,t){var r;return no(t)?(r=Ao(e).delete_(t,!0))!=null?r:!0:!1},defineProperty:function(e,t,r){var n;return(n=Ao(e).defineProperty_(t,r))!=null?n:!0},ownKeys:function(e){return Ao(e).ownKeys_()},preventExtensions:function(e){Ee(13)}};function JO(e,t){var r,n;return qx(),e=_o(e,t),(n=(r=e[se]).proxy_)!=null?n:r.proxy_=new Proxy(e,YO)}function Ar(e){return e.interceptors_!==void 0&&e.interceptors_.length>0}function Fl(e,t){var r=e.interceptors_||(e.interceptors_=[]);return r.push(t),Wx(function(){var n=r.indexOf(t);n!==-1&&r.splice(n,1)})}function jr(e,t){var r=wo();try{for(var n=[].concat(e.interceptors_||[]),i=0,o=n.length;i<o&&(t=n[i](t),t&&!t.type&&Ee(14),!!t);i++);return t}finally{Dn(r)}}function Xr(e){return e.changeListeners_!==void 0&&e.changeListeners_.length>0}function Vl(e,t){var r=e.changeListeners_||(e.changeListeners_=[]);return r.push(t),Wx(function(){var n=r.indexOf(t);n!==-1&&r.splice(n,1)})}function Yr(e,t){var r=wo(),n=e.changeListeners_;if(n){n=n.slice();for(var i=0,o=n.length;i<o;i++)n[i](t);Dn(r)}}function e4(e,t,r){return Ei(function(){var n,i=_o(e,r)[se];(n=t)!=null||(t=j3(e)),xs(t).forEach(function(o){return i.make_(o,t[o])})}),e}var Wd=Symbol("mobx-keys");function Hs(e,t,r){return Bn(e)?Ew(e,e,t,r):(Ei(function(){var n=_o(e,r)[se];if(!e[Wd]){var i=Object.getPrototypeOf(e),o=new Set([].concat(xs(e),xs(i)));o.delete("constructor"),o.delete(se),Ll(i,Wd,o)}e[Wd].forEach(function(s){return n.make_(s,t&&s in t?t[s]:!0)})}),e)}var H0="splice",$n="update",t4=1e4,r4={get:function(e,t){var r=e[se];return t===se?r:t==="length"?r.getArrayLength_():typeof t=="string"&&!isNaN(t)?r.get_(parseInt(t)):Ln(Nc,t)?Nc[t]:e[t]},set:function(e,t,r){var n=e[se];return t==="length"&&n.setArrayLength_(r),typeof t=="symbol"||isNaN(t)?e[t]=r:n.set_(parseInt(t),r),!0},preventExtensions:function(){Ee(15)}},xg=function(){function e(r,n,i,o){r===void 0&&(r="ObservableArray"),this.owned_=void 0,this.legacyMode_=void 0,this.atom_=void 0,this.values_=[],this.interceptors_=void 0,this.changeListeners_=void 0,this.enhancer_=void 0,this.dehancer=void 0,this.proxy_=void 0,this.lastKnownLength_=0,this.owned_=i,this.legacyMode_=o,this.atom_=new Ml(r),this.enhancer_=function(s,a){return n(s,a,"ObservableArray[..]")}}var t=e.prototype;return t.dehanceValue_=function(r){return this.dehancer!==void 0?this.dehancer(r):r},t.dehanceValues_=function(r){return this.dehancer!==void 0&&r.length>0?r.map(this.dehancer):r},t.intercept_=function(r){return Fl(this,r)},t.observe_=function(r,n){return n===void 0&&(n=!1),n&&r({observableKind:"array",object:this.proxy_,debugObjectName:this.atom_.name_,type:"splice",index:0,added:this.values_.slice(),addedCount:this.values_.length,removed:[],removedCount:0}),Vl(this,r)},t.getArrayLength_=function(){return this.atom_.reportObserved(),this.values_.length},t.setArrayLength_=function(r){(typeof r!="number"||isNaN(r)||r<0)&&Ee("Out of range: "+r);var n=this.values_.length;if(r!==n)if(r>n){for(var i=new Array(r-n),o=0;o<r-n;o++)i[o]=void 0;this.spliceWithArray_(n,0,i)}else this.spliceWithArray_(r,n-r)},t.updateArrayLength_=function(r,n){r!==this.lastKnownLength_&&Ee(16),this.lastKnownLength_+=n,this.legacyMode_&&n>0&&Bw(r+n+1)},t.spliceWithArray_=function(r,n,i){var o=this;this.atom_;var s=this.values_.length;if(r===void 0?r=0:r>s?r=s:r<0&&(r=Math.max(0,s+r)),arguments.length===1?n=s-r:n==null?n=0:n=Math.max(0,Math.min(n,s-r)),i===void 0&&(i=_p),Ar(this)){var a=jr(this,{object:this.proxy_,type:H0,index:r,removedCount:n,added:i});if(!a)return _p;n=a.removedCount,i=a.added}if(i=i.length===0?i:i.map(function(c){return o.enhancer_(c,void 0)}),this.legacyMode_||!1){var l=i.length-n;this.updateArrayLength_(s,l)}var u=this.spliceItemsIntoValues_(r,n,i);return(n!==0||i.length!==0)&&this.notifyArraySplice_(r,i,u),this.dehanceValues_(u)},t.spliceItemsIntoValues_=function(r,n,i){if(i.length<t4){var o;return(o=this.values_).splice.apply(o,[r,n].concat(i))}else{var s=this.values_.slice(r,r+n),a=this.values_.slice(r+n);this.values_.length+=i.length-n;for(var l=0;l<i.length;l++)this.values_[r+l]=i[l];for(var u=0;u<a.length;u++)this.values_[r+i.length+u]=a[u];return s}},t.notifyArrayChildUpdate_=function(r,n,i){var o=!this.owned_&&Ma(),s=Xr(this),a=s||o?{observableKind:"array",object:this.proxy_,type:$n,debugObjectName:this.atom_.name_,index:r,newValue:n,oldValue:i}:null;this.atom_.reportChanged(),s&&Yr(this,a)},t.notifyArraySplice_=function(r,n,i){var o=!this.owned_&&Ma(),s=Xr(this),a=s||o?{observableKind:"array",object:this.proxy_,debugObjectName:this.atom_.name_,type:H0,index:r,removed:i,added:n,removedCount:i.length,addedCount:n.length}:null;this.atom_.reportChanged(),s&&Yr(this,a)},t.get_=function(r){if(this.legacyMode_&&r>=this.values_.length){console.warn("[mobx] Out of bounds read: "+r);return}return this.atom_.reportObserved(),this.dehanceValue_(this.values_[r])},t.set_=function(r,n){var i=this.values_;if(this.legacyMode_&&r>i.length&&Ee(17,r,i.length),r<i.length){this.atom_;var o=i[r];if(Ar(this)){var s=jr(this,{type:$n,object:this.proxy_,index:r,newValue:n});if(!s)return;n=s.newValue}n=this.enhancer_(n,o);var a=n!==o;a&&(i[r]=n,this.notifyArrayChildUpdate_(r,n,o))}else{for(var l=new Array(r+1-i.length),u=0;u<l.length-1;u++)l[u]=void 0;l[l.length-1]=n,this.spliceWithArray_(i.length,0,l)}},e}();function n4(e,t,r,n){return r===void 0&&(r="ObservableArray"),n===void 0&&(n=!1),qx(),Ei(function(){var i=new xg(r,t,n,!1);Gx(i.values_,se,i);var o=new Proxy(i.values_,r4);return i.proxy_=o,e&&e.length&&i.spliceWithArray_(0,0,e),o})}var Nc={clear:function(){return this.splice(0)},replace:function(e){var t=this[se];return t.spliceWithArray_(0,t.values_.length,e)},toJSON:function(){return this.slice()},splice:function(e,t){for(var r=arguments.length,n=new Array(r>2?r-2:0),i=2;i<r;i++)n[i-2]=arguments[i];var o=this[se];switch(arguments.length){case 0:return[];case 1:return o.spliceWithArray_(e);case 2:return o.spliceWithArray_(e,t)}return o.spliceWithArray_(e,t,n)},spliceWithArray:function(e,t,r){return this[se].spliceWithArray_(e,t,r)},push:function(){for(var e=this[se],t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return e.spliceWithArray_(e.values_.length,0,r),e.values_.length},pop:function(){return this.splice(Math.max(this[se].values_.length-1,0),1)[0]},shift:function(){return this.splice(0,1)[0]},unshift:function(){for(var e=this[se],t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return e.spliceWithArray_(0,0,r),e.values_.length},reverse:function(){return z.trackingDerivation&&Ee(37,"reverse"),this.replace(this.slice().reverse()),this},sort:function(){z.trackingDerivation&&Ee(37,"sort");var e=this.slice();return e.sort.apply(e,arguments),this.replace(e),this},remove:function(e){var t=this[se],r=t.dehanceValues_(t.values_).indexOf(e);return r>-1?(this.splice(r,1),!0):!1}};Me("at",wr);Me("concat",wr);Me("flat",wr);Me("includes",wr);Me("indexOf",wr);Me("join",wr);Me("lastIndexOf",wr);Me("slice",wr);Me("toString",wr);Me("toLocaleString",wr);Me("toSorted",wr);Me("toSpliced",wr);Me("with",wr);Me("every",ln);Me("filter",ln);Me("find",ln);Me("findIndex",ln);Me("findLast",ln);Me("findLastIndex",ln);Me("flatMap",ln);Me("forEach",ln);Me("map",ln);Me("some",ln);Me("toReversed",ln);Me("reduce",Aw);Me("reduceRight",Aw);function Me(e,t){typeof Array.prototype[e]=="function"&&(Nc[e]=t(e))}function wr(e){return function(){var t=this[se];t.atom_.reportObserved();var r=t.dehanceValues_(t.values_);return r[e].apply(r,arguments)}}function ln(e){return function(t,r){var n=this,i=this[se];i.atom_.reportObserved();var o=i.dehanceValues_(i.values_);return o[e](function(s,a){return t.call(r,s,a,n)})}}function Aw(e){return function(){var t=this,r=this[se];r.atom_.reportObserved();var n=r.dehanceValues_(r.values_),i=arguments[0];return arguments[0]=function(o,s,a){return i(o,s,a,t)},n[e].apply(n,arguments)}}var i4=xo("ObservableArrayAdministration",xg);function Vh(e){return jh(e)&&i4(e[se])}var jw,Nw,o4={},oi="add",Lc="delete";jw=Symbol.iterator;Nw=Symbol.toStringTag;var Lw=function(){function e(r,n,i){var o=this;n===void 0&&(n=zs),i===void 0&&(i="ObservableMap"),this.enhancer_=void 0,this.name_=void 0,this[se]=o4,this.data_=void 0,this.hasMap_=void 0,this.keysAtom_=void 0,this.interceptors_=void 0,this.changeListeners_=void 0,this.dehancer=void 0,this.enhancer_=n,this.name_=i,sn(Map)||Ee(18),Ei(function(){o.keysAtom_=Yx("ObservableMap.keys()"),o.data_=new Map,o.hasMap_=new Map,r&&o.merge(r)})}var t=e.prototype;return t.has_=function(r){return this.data_.has(r)},t.has=function(r){var n=this;if(!z.trackingDerivation)return this.has_(r);var i=this.hasMap_.get(r);if(!i){var o=i=new Wi(this.has_(r),Nh,"ObservableMap.key?",!1);this.hasMap_.set(r,o),Sw(o,function(){return n.hasMap_.delete(r)})}return i.get()},t.set=function(r,n){var i=this.has_(r);if(Ar(this)){var o=jr(this,{type:i?$n:oi,object:this,newValue:n,name:r});if(!o)return this;n=o.newValue}return i?this.updateValue_(r,n):this.addValue_(r,n),this},t.delete=function(r){var n=this;if(this.keysAtom_,Ar(this)){var i=jr(this,{type:Lc,object:this,name:r});if(!i)return!1}if(this.has_(r)){var o=Ma(),s=Xr(this),a=s||o?{observableKind:"map",debugObjectName:this.name_,type:Lc,object:this,oldValue:this.data_.get(r).value_,name:r}:null;return Tn(function(){var l;n.keysAtom_.reportChanged(),(l=n.hasMap_.get(r))==null||l.setNewValue_(!1);var u=n.data_.get(r);u.setNewValue_(void 0),n.data_.delete(r)}),s&&Yr(this,a),!0}return!1},t.updateValue_=function(r,n){var i=this.data_.get(r);if(n=i.prepareNewValue_(n),n!==z.UNCHANGED){var o=Ma(),s=Xr(this),a=s||o?{observableKind:"map",debugObjectName:this.name_,type:$n,object:this,oldValue:i.value_,name:r,newValue:n}:null;i.setNewValue_(n),s&&Yr(this,a)}},t.addValue_=function(r,n){var i=this;this.keysAtom_,Tn(function(){var l,u=new Wi(n,i.enhancer_,"ObservableMap.key",!1);i.data_.set(r,u),n=u.value_,(l=i.hasMap_.get(r))==null||l.setNewValue_(!0),i.keysAtom_.reportChanged()});var o=Ma(),s=Xr(this),a=s||o?{observableKind:"map",debugObjectName:this.name_,type:oi,object:this,name:r,newValue:n}:null;s&&Yr(this,a)},t.get=function(r){return this.has(r)?this.dehanceValue_(this.data_.get(r).get()):this.dehanceValue_(void 0)},t.dehanceValue_=function(r){return this.dehancer!==void 0?this.dehancer(r):r},t.keys=function(){return this.keysAtom_.reportObserved(),this.data_.keys()},t.values=function(){var r=this,n=this.keys();return vl({next:function(){var i=n.next(),o=i.done,s=i.value;return{done:o,value:o?void 0:r.get(s)}}})},t.entries=function(){var r=this,n=this.keys();return vl({next:function(){var i=n.next(),o=i.done,s=i.value;return{done:o,value:o?void 0:[s,r.get(s)]}}})},t[jw]=function(){return this.entries()},t.forEach=function(r,n){for(var i=Qo(this),o;!(o=i()).done;){var s=o.value,a=s[0],l=s[1];r.call(n,l,a,this)}},t.merge=function(r){var n=this;return $o(r)&&(r=new Map(r)),Tn(function(){Bn(r)?E3(r).forEach(function(i){return n.set(i,r[i])}):Array.isArray(r)?r.forEach(function(i){var o=i[0],s=i[1];return n.set(o,s)}):Vs(r)?(r.constructor!==Map&&Ee(19,r),r.forEach(function(i,o){return n.set(o,i)})):r!=null&&Ee(20,r)}),this},t.clear=function(){var r=this;Tn(function(){dw(function(){for(var n=Qo(r.keys()),i;!(i=n()).done;){var o=i.value;r.delete(o)}})})},t.replace=function(r){var n=this;return Tn(function(){for(var i=s4(r),o=new Map,s=!1,a=Qo(n.data_.keys()),l;!(l=a()).done;){var u=l.value;if(!i.has(u)){var c=n.delete(u);if(c)s=!0;else{var h=n.data_.get(u);o.set(u,h)}}}for(var d=Qo(i.entries()),m;!(m=d()).done;){var y=m.value,w=y[0],E=y[1],p=n.data_.has(w);if(n.set(w,E),n.data_.has(w)){var f=n.data_.get(w);o.set(w,f),p||(s=!0)}}if(!s)if(n.data_.size!==o.size)n.keysAtom_.reportChanged();else for(var v=n.data_.keys(),S=o.keys(),L=v.next(),x=S.next();!L.done;){if(L.value!==x.value){n.keysAtom_.reportChanged();break}L=v.next(),x=S.next()}n.data_=o}),this},t.toString=function(){return"[object ObservableMap]"},t.toJSON=function(){return Array.from(this)},t.observe_=function(r,n){return Vl(this,r)},t.intercept_=function(r){return Fl(this,r)},gg(e,[{key:"size",get:function(){return this.keysAtom_.reportObserved(),this.data_.size}},{key:Nw,get:function(){return"Map"}}]),e}(),$o=xo("ObservableMap",Lw);function s4(e){if(Vs(e)||$o(e))return e;if(Array.isArray(e))return new Map(e);if(Bn(e)){var t=new Map;for(var r in e)t.set(r,e[r]);return t}else return Ee(21,e)}var Dw,Rw,a4={};Dw=Symbol.iterator;Rw=Symbol.toStringTag;var Mw=function(){function e(r,n,i){var o=this;n===void 0&&(n=zs),i===void 0&&(i="ObservableSet"),this.name_=void 0,this[se]=a4,this.data_=new Set,this.atom_=void 0,this.changeListeners_=void 0,this.interceptors_=void 0,this.dehancer=void 0,this.enhancer_=void 0,this.name_=i,sn(Set)||Ee(22),this.enhancer_=function(s,a){return n(s,a,i)},Ei(function(){o.atom_=Yx(o.name_),r&&o.replace(r)})}var t=e.prototype;return t.dehanceValue_=function(r){return this.dehancer!==void 0?this.dehancer(r):r},t.clear=function(){var r=this;Tn(function(){dw(function(){for(var n=Qo(r.data_.values()),i;!(i=n()).done;){var o=i.value;r.delete(o)}})})},t.forEach=function(r,n){for(var i=Qo(this),o;!(o=i()).done;){var s=o.value;r.call(n,s,s,this)}},t.add=function(r){var n=this;if(this.atom_,Ar(this)){var i=jr(this,{type:oi,object:this,newValue:r});if(!i)return this}if(!this.has(r)){Tn(function(){n.data_.add(n.enhancer_(r,void 0)),n.atom_.reportChanged()});var o=!1,s=Xr(this),a=s||o?{observableKind:"set",debugObjectName:this.name_,type:oi,object:this,newValue:r}:null;s&&Yr(this,a)}return this},t.delete=function(r){var n=this;if(Ar(this)){var i=jr(this,{type:Lc,object:this,oldValue:r});if(!i)return!1}if(this.has(r)){var o=!1,s=Xr(this),a=s||o?{observableKind:"set",debugObjectName:this.name_,type:Lc,object:this,oldValue:r}:null;return Tn(function(){n.atom_.reportChanged(),n.data_.delete(r)}),s&&Yr(this,a),!0}return!1},t.has=function(r){return this.atom_.reportObserved(),this.data_.has(this.dehanceValue_(r))},t.entries=function(){var r=0,n=Array.from(this.keys()),i=Array.from(this.values());return vl({next:function(){var o=r;return r+=1,o<i.length?{value:[n[o],i[o]],done:!1}:{done:!0}}})},t.keys=function(){return this.values()},t.values=function(){this.atom_.reportObserved();var r=this,n=0,i=Array.from(this.data_.values());return vl({next:function(){return n<i.length?{value:r.dehanceValue_(i[n++]),done:!1}:{done:!0}}})},t.replace=function(r){var n=this;return Us(r)&&(r=new Set(r)),Tn(function(){Array.isArray(r)?(n.clear(),r.forEach(function(i){return n.add(i)})):Dl(r)?(n.clear(),r.forEach(function(i){return n.add(i)})):r!=null&&Ee("Cannot initialize set from "+r)}),this},t.observe_=function(r,n){return Vl(this,r)},t.intercept_=function(r){return Fl(this,r)},t.toJSON=function(){return Array.from(this)},t.toString=function(){return"[object ObservableSet]"},t[Dw]=function(){return this.values()},gg(e,[{key:"size",get:function(){return this.atom_.reportObserved(),this.data_.size}},{key:Rw,get:function(){return"Set"}}]),e}(),Us=xo("ObservableSet",Mw),U0=Object.create(null),q0="remove",Iw=function(){function e(r,n,i,o){n===void 0&&(n=new Map),o===void 0&&(o=iO),this.target_=void 0,this.values_=void 0,this.name_=void 0,this.defaultAnnotation_=void 0,this.keysAtom_=void 0,this.changeListeners_=void 0,this.interceptors_=void 0,this.proxy_=void 0,this.isPlainObject_=void 0,this.appliedAnnotations_=void 0,this.pendingKeys_=void 0,this.target_=r,this.values_=n,this.name_=i,this.defaultAnnotation_=o,this.keysAtom_=new Ml("ObservableObject.keys"),this.isPlainObject_=Bn(this.target_)}var t=e.prototype;return t.getObservablePropValue_=function(r){return this.values_.get(r).get()},t.setObservablePropValue_=function(r,n){var i=this.values_.get(r);if(i instanceof $s)return i.set(n),!0;if(Ar(this)){var o=jr(this,{type:$n,object:this.proxy_||this.target_,name:r,newValue:n});if(!o)return null;n=o.newValue}if(n=i.prepareNewValue_(n),n!==z.UNCHANGED){var s=Xr(this),a=!1,l=s||a?{type:$n,observableKind:"object",debugObjectName:this.name_,object:this.proxy_||this.target_,oldValue:i.value_,name:r,newValue:n}:null;i.setNewValue_(n),s&&Yr(this,l)}return!0},t.get_=function(r){return z.trackingDerivation&&!Ln(this.target_,r)&&this.has_(r),this.target_[r]},t.set_=function(r,n,i){return i===void 0&&(i=!1),Ln(this.target_,r)?this.values_.has(r)?this.setObservablePropValue_(r,n):i?Reflect.set(this.target_,r,n):(this.target_[r]=n,!0):this.extend_(r,{value:n,enumerable:!0,writable:!0,configurable:!0},this.defaultAnnotation_,i)},t.has_=function(r){if(!z.trackingDerivation)return r in this.target_;this.pendingKeys_||(this.pendingKeys_=new Map);var n=this.pendingKeys_.get(r);return n||(n=new Wi(r in this.target_,Nh,"ObservableObject.key?",!1),this.pendingKeys_.set(r,n)),n.get()},t.make_=function(r,n){if(n===!0&&(n=this.defaultAnnotation_),n!==!1){if(!(r in this.target_)){var i;if((i=this.target_[mn])!=null&&i[r])return;Ee(1,n.annotationType_,this.name_+"."+r.toString())}for(var o=this.target_;o&&o!==Ah;){var s=Oc(o,r);if(s){var a=n.make_(this,r,s,o);if(a===0)return;if(a===1)break}o=Object.getPrototypeOf(o)}K0(this,n,r)}},t.extend_=function(r,n,i,o){if(o===void 0&&(o=!1),i===!0&&(i=this.defaultAnnotation_),i===!1)return this.defineProperty_(r,n,o);var s=i.extend_(this,r,n,o);return s&&K0(this,i,r),s},t.defineProperty_=function(r,n,i){i===void 0&&(i=!1),this.keysAtom_;try{Dr();var o=this.delete_(r);if(!o)return o;if(Ar(this)){var s=jr(this,{object:this.proxy_||this.target_,name:r,type:oi,newValue:n.value});if(!s)return null;var a=s.newValue;n.value!==a&&(n=io({},n,{value:a}))}if(i){if(!Reflect.defineProperty(this.target_,r,n))return!1}else xn(this.target_,r,n);this.notifyPropertyAddition_(r,n.value)}finally{Rr()}return!0},t.defineObservableProperty_=function(r,n,i,o){o===void 0&&(o=!1),this.keysAtom_;try{Dr();var s=this.delete_(r);if(!s)return s;if(Ar(this)){var a=jr(this,{object:this.proxy_||this.target_,name:r,type:oi,newValue:n});if(!a)return null;n=a.newValue}var l=W0(r),u={configurable:z.safeDescriptors?this.isPlainObject_:!0,enumerable:!0,get:l.get,set:l.set};if(o){if(!Reflect.defineProperty(this.target_,r,u))return!1}else xn(this.target_,r,u);var c=new Wi(n,i,"ObservableObject.key",!1);this.values_.set(r,c),this.notifyPropertyAddition_(r,c.value_)}finally{Rr()}return!0},t.defineComputedProperty_=function(r,n,i){i===void 0&&(i=!1),this.keysAtom_;try{Dr();var o=this.delete_(r);if(!o)return o;if(Ar(this)){var s=jr(this,{object:this.proxy_||this.target_,name:r,type:oi,newValue:void 0});if(!s)return null}n.name||(n.name="ObservableObject.key"),n.context=this.proxy_||this.target_;var a=W0(r),l={configurable:z.safeDescriptors?this.isPlainObject_:!0,enumerable:!1,get:a.get,set:a.set};if(i){if(!Reflect.defineProperty(this.target_,r,l))return!1}else xn(this.target_,r,l);this.values_.set(r,new $s(n)),this.notifyPropertyAddition_(r,void 0)}finally{Rr()}return!0},t.delete_=function(r,n){if(n===void 0&&(n=!1),this.keysAtom_,!Ln(this.target_,r))return!0;if(Ar(this)){var i=jr(this,{object:this.proxy_||this.target_,name:r,type:q0});if(!i)return null}try{var o,s;Dr();var a=Xr(this),l=!1,u=this.values_.get(r),c=void 0;if(!u&&(a||l)){var h;c=(h=Oc(this.target_,r))==null?void 0:h.value}if(n){if(!Reflect.deleteProperty(this.target_,r))return!1}else delete this.target_[r];if(u&&(this.values_.delete(r),u instanceof Wi&&(c=u.value_),yw(u)),this.keysAtom_.reportChanged(),(o=this.pendingKeys_)==null||(s=o.get(r))==null||s.set(r in this.target_),a||l){var d={type:q0,observableKind:"object",object:this.proxy_||this.target_,debugObjectName:this.name_,oldValue:c,name:r};a&&Yr(this,d)}}finally{Rr()}return!0},t.observe_=function(r,n){return Vl(this,r)},t.intercept_=function(r){return Fl(this,r)},t.notifyPropertyAddition_=function(r,n){var i,o,s=Xr(this),a=!1;if(s||a){var l=s||a?{type:oi,observableKind:"object",debugObjectName:this.name_,object:this.proxy_||this.target_,name:r,newValue:n}:null;s&&Yr(this,l)}(i=this.pendingKeys_)==null||(o=i.get(r))==null||o.set(!0),this.keysAtom_.reportChanged()},t.ownKeys_=function(){return this.keysAtom_.reportObserved(),xs(this.target_)},t.keys_=function(){return this.keysAtom_.reportObserved(),Object.keys(this.target_)},e}();function _o(e,t){var r;if(Ln(e,se))return e;var n=(r=t==null?void 0:t.name)!=null?r:"ObservableObject",i=new Iw(e,new Map,String(n),vO(t));return Ll(e,se,i),e}var l4=xo("ObservableObjectAdministration",Iw);function W0(e){return U0[e]||(U0[e]={get:function(){return this[se].getObservablePropValue_(e)},set:function(t){return this[se].setObservablePropValue_(e,t)}})}function ks(e){return jh(e)?l4(e[se]):!1}function K0(e,t,r){var n;(n=e.target_[mn])==null||delete n[r]}var u4=Vw(0),c4=function(){var e=!1,t={};return Object.defineProperty(t,"0",{set:function(){e=!0}}),Object.create(t)[0]=1,e===!1}(),Kd=0,Fw=function(){};function h4(e,t){Object.setPrototypeOf?Object.setPrototypeOf(e.prototype,t):e.prototype.__proto__!==void 0?e.prototype.__proto__=t:e.prototype=t}h4(Fw,Array.prototype);var wg=function(e,t,r){Xx(n,e);function n(o,s,a,l){var u;return a===void 0&&(a="ObservableArray"),l===void 0&&(l=!1),u=e.call(this)||this,Ei(function(){var c=new xg(a,s,l,!0);c.proxy_=Ud(u),Gx(Ud(u),se,c),o&&o.length&&u.spliceWithArray(0,0,o),c4&&Object.defineProperty(Ud(u),"0",u4)}),u}var i=n.prototype;return i.concat=function(){this[se].atom_.reportObserved();for(var o=arguments.length,s=new Array(o),a=0;a<o;a++)s[a]=arguments[a];return Array.prototype.concat.apply(this.slice(),s.map(function(l){return Vh(l)?l.slice():l}))},i[r]=function(){var o=this,s=0;return vl({next:function(){return s<o.length?{value:o[s++],done:!1}:{done:!0,value:void 0}}})},gg(n,[{key:"length",get:function(){return this[se].getArrayLength_()},set:function(o){this[se].setArrayLength_(o)}},{key:t,get:function(){return"Array"}}]),n}(Fw,Symbol.toStringTag,Symbol.iterator);Object.entries(Nc).forEach(function(e){var t=e[0],r=e[1];t!=="concat"&&Ll(wg.prototype,t,r)});function Vw(e){return{enumerable:!1,configurable:!0,get:function(){return this[se].get_(e)},set:function(t){this[se].set_(e,t)}}}function d4(e){xn(wg.prototype,""+e,Vw(e))}function Bw(e){if(e>Kd){for(var t=Kd;t<e+100;t++)d4(t);Kd=e}}Bw(1e3);function f4(e,t,r){return new wg(e,t,r)}function Ss(e,t){if(typeof e=="object"&&e!==null){if(Vh(e))return t!==void 0&&Ee(23),e[se].atom_;if(Us(e))return e.atom_;if($o(e)){if(t===void 0)return e.keysAtom_;var r=e.data_.get(t)||e.hasMap_.get(t);return r||Ee(25,t,jp(e)),r}if(ks(e)){if(!t)return Ee(26);var n=e[se].values_.get(t);return n||Ee(27,t,jp(e)),n}if(mg(e)||Ih(e)||jc(e))return e}else if(sn(e)&&jc(e[se]))return e[se];Ee(28)}function zw(e,t){if(e||Ee(29),t!==void 0)return zw(Ss(e,t));if(mg(e)||Ih(e)||jc(e)||$o(e)||Us(e))return e;if(e[se])return e[se];Ee(24,e)}function jp(e,t){var r;if(t!==void 0)r=Ss(e,t);else{if(Fh(e))return e.name;ks(e)||$o(e)||Us(e)?r=zw(e):r=Ss(e)}return r.name_}function Ei(e){var t=wo(),r=Rh(!0);Dr();try{return e()}finally{Rr(),Mh(r),Dn(t)}}var G0=Ah.toString;function $g(e,t,r){return r===void 0&&(r=-1),Np(e,t,r)}function Np(e,t,r,n,i){if(e===t)return e!==0||1/e===1/t;if(e==null||t==null)return!1;if(e!==e)return t!==t;var o=typeof e;if(o!=="function"&&o!=="object"&&typeof t!="object")return!1;var s=G0.call(e);if(s!==G0.call(t))return!1;switch(s){case"[object RegExp]":case"[object String]":return""+e==""+t;case"[object Number]":return+e!=+e?+t!=+t:+e==0?1/+e===1/t:+e==+t;case"[object Date]":case"[object Boolean]":return+e==+t;case"[object Symbol]":return typeof Symbol<"u"&&Symbol.valueOf.call(e)===Symbol.valueOf.call(t);case"[object Map]":case"[object Set]":r>=0&&r++;break}e=Q0(e),t=Q0(t);var a=s==="[object Array]";if(!a){if(typeof e!="object"||typeof t!="object")return!1;var l=e.constructor,u=t.constructor;if(l!==u&&!(sn(l)&&l instanceof l&&sn(u)&&u instanceof u)&&"constructor"in e&&"constructor"in t)return!1}if(r===0)return!1;r<0&&(r=-1),n=n||[],i=i||[];for(var c=n.length;c--;)if(n[c]===e)return i[c]===t;if(n.push(e),i.push(t),a){if(c=e.length,c!==t.length)return!1;for(;c--;)if(!Np(e[c],t[c],r-1,n,i))return!1}else{var h=Object.keys(e),d;if(c=h.length,Object.keys(t).length!==c)return!1;for(;c--;)if(d=h[c],!(Ln(t,d)&&Np(e[d],t[d],r-1,n,i)))return!1}return n.pop(),i.pop(),!0}function Q0(e){return Vh(e)?e.slice():Vs(e)||$o(e)||Dl(e)||Us(e)?Array.from(e.entries()):e}function vl(e){return e[Symbol.iterator]=p4,e}function p4(){return this}["Symbol","Map","Set"].forEach(function(e){var t=pg();typeof t[e]>"u"&&Ee("MobX requires global '"+e+"' to be available or polyfilled")});typeof __MOBX_DEVTOOLS_GLOBAL_HOOK__=="object"&&__MOBX_DEVTOOLS_GLOBAL_HOOK__.injectMobx({spy:jO,extras:{getDebugName:jp},$mobx:se});const jo=Symbol("LitMobxRenderReaction"),Z0=Symbol("LitMobxRequestUpdate");function v4(e,t){var r,n;return n=class extends e{constructor(){super(...arguments),this[r]=()=>{this.requestUpdate()}}connectedCallback(){super.connectedCallback();const i=this.constructor.name||this.nodeName;this[jo]=new t(`${i}.update()`,this[Z0]),this.hasUpdated&&this.requestUpdate()}disconnectedCallback(){super.disconnectedCallback(),this[jo]&&(this[jo].dispose(),this[jo]=void 0)}update(i){this[jo]?this[jo].track(super.update.bind(this,i)):super.update(i)}},r=Z0,n}function g4(e){return v4(e,so)}class Hw extends g4(Re){}function _g(e,t){let r=t??this;for(;r;){if(r[e])return r[e];let n=r;for(;n&&n.shadowRoot;)if(n=n.shadowRoot,n[e])return n[e];r=r.parentNode||r.host}}function m4(e){const t=e;t.__proto__.findContext!=!0&&(t.__proto__.findContext=_g)}Re.prototype.findContext=_g;const y4={findContext:_g,aware:m4},kg="@tailwind base;@tailwind components;@tailwind utilities;",Bh=e=>{class t extends e{async updated(n){if(super.updated(n),await this.updateComplete,this.isConnected==!0)for(const[i]of n){const o=`onChanged${`${i.charAt(0).toUpperCase()}${i.slice(1)}`}`,s=Reflect.get(this,o);typeof s=="function"&&s.call(this,this[i])}}findContext(n){return y4.findContext(n,this)}}return $(t,"styles",[nh(kg),e.styles??[]]),t};class b4 extends Bh(Hw){}$(b4,"styles",[Bh(Hw).styles]);kn().register(Ph());var Gd;let bi=(Gd=class extends Bh(Re){constructor(){super(),$(this,"href",null),$(this,"appearance",null),$(this,"accent",!1),$(this,"disabled",!1),$(this,"command"),$(this,"commandParameter"),this.hasAttribute("icon")&&(this.appearance="stealth")}onChangedCommand(e){e&&(e.content&&(this.innerText=e.content),FO(()=>e.content,t=>{this.innerText=t}))}render(){return this.accent?this.appearance="accent":this.href&&this.appearance==null&&(this.appearance="lightweight"),re`
      <fast-button id='btn' @click=${this.onClick} .appearance=${this.appearance} ?disabled=${this.disabled}>
        <slot></slot>
      </fast-button>
    `}onClick(){this.command?this.command.execute(this.commandParameter):this.href&&(window.location.href=this.href)}},$(Gd,"styles",[at`
      :host {
        --neutral-fill-stealth-rest: none;
        --btn-min-width: 80px;
        display: inline-flex;
      }
      
      :host(.block) {
        display: block;
        width: 100%;
        padding: 0.2em 0;
      }

      :host(.block) #btn {
        display: flex;
      }

      #btn {
        min-width: var(--btn-min-width);
      }
    `]),Gd);g([J({type:String})],bi.prototype,"href",void 0);g([J({type:String,attribute:"appearance"})],bi.prototype,"appearance",void 0);g([J({type:Boolean,attribute:"accent"})],bi.prototype,"accent",void 0);g([J({type:Boolean,attribute:"disabled"})],bi.prototype,"disabled",void 0);g([J({type:Object})],bi.prototype,"command",void 0);g([J()],bi.prototype,"commandParameter",void 0);bi=g([lt("u-button")],bi);var Qd;let Lp=(Qd=class extends Re{constructor(){super(...arguments),$(this,"right",!1)}render(){const e=this.right?"justify-end":"justify-start";return re`
      <div class="button-container ${e}">
        <slot></slot>
      </div>
    `}},$(Qd,"styles",[at`
      :host {
        display: block;
        margin-top: 1rem;
      }
      .button-container {
        display: flex;
        gap: 4px;
      }
      .justify-end {
        justify-content: flex-end;
      }
      .justify-start {
        justify-content: flex-start;
      }
    `]),Qd);g([J({type:Boolean})],Lp.prototype,"right",void 0);Lp=g([lt("u-buttons")],Lp);kn().register(s3());var Zd;let Dp=(Zd=class extends Re{constructor(){super(),$(this,"items",[]),$(this,"selectedItem",null),$(this,"useAdd",!0),this.getCardElement=this.getCardElement.bind(this)}render(){return re`
        <div class="flex flex-wrap gap-2">
          ${this.items.map(this.getCardElement)}
          ${this.useAdd?this.getAddCardElement():null}
        </div>`}connectedCallback(){super.connectedCallback(),this.onSelectedItem.bind(this)}getCardElement(e,t){return re`
    <fast-card index=${t} class="card hover:cursor-pointer" @click=${()=>this.onSelectedItem(e)}>
      <div class="label p-2">
        <h3 class="text-lg font-bold">${e.title}</h3>
        ${this.getDescriptionElement(e)}
      </div>
    </fast-card>`}getDescriptionElement(e){return re`<p class="text-sm font-light" style="color: #888">${e.description}</p>`}getAddCardElement(){return re`
    <fast-card class="card hover:cursor-pointer" style="background: #888" @click=${this.onAdd}>
      <div class="flex justify-center items-center h-full">
        <div class="ui-plus-01"></div>
      </div>
    </fast-card>`}onSelectedItem(e){this.selectedItem=e,this.dispatchEvent(new CustomEvent("changed",{detail:this.selectedItem}))}onAdd(){this.dispatchEvent(new CustomEvent("clickAdd"))}},$(Zd,"styles",[at`
      .card {
        width: 300px; 
        height: 200px; 
        min-width: 300px;
        background: white url(https://picsum.photos/300/200) center/cover;
      }

      .label {
        position: absolute;
        bottom: 0;
        width: 100%;
        background: #222; 
        color: #eee;
      }

      .ui-plus-01 {
        position: relative;
        cursor: pointer;
        border: none;
        background-color: transparent;
        width: 30px;
        height: 30px;
      }
      .ui-plus-01:before,
      .ui-plus-01:after {
        content: "";
        height: 20%;
        width: 100%;
        background-color: var(--accent-color);
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -10%;
      }
      .ui-plus-01:before {
        transform: rotate(90deg);
      }
      .ui-plus-01:before {
        transition: transform 0.3s ease;
      }
      .ui-plus-01.is-active:before {
        transform: rotate(0);
      }
            
    `]),Zd);g([J({type:Array})],Dp.prototype,"items",void 0);Dp=g([lt("u-cards")],Dp);Array.prototype.last=function(){if(this.length!==0)return this[this.length-1]};Array.prototype.replaceBy=function(e,t){const r=this.findIndex(n=>e(n));return r!==-1?(this.splice(r,1,t),!0):!1};Array.prototype.upsert=function(e,t){const r=this.findIndex(n=>e(n));r!==-1?this.splice(r,1,t):this.push(t)};Array.prototype.removeBy=function(e){const t=this.findIndex(r=>e(r));return t!==-1?(this.splice(t,1),!0):!1};Array.prototype.remove=function(e){const t=this.indexOf(e);return t!==-1?(this.splice(t,1),!0):!1};Array.prototype.contains=function(e){return this.indexOf(e)!==-1};Array.prototype.sortBy=function(e){return this.slice().sort((t,r)=>{const n=e(t),i=e(r);return n<i?-1:n>i?1:0})};Array.prototype.except=function(e){return e==null?this:this.filter(t=>!e.includes(t))};Array.prototype.groupBy=function(e){return this.reduce((t,r)=>{const n=e(r),i=t.find(o=>o.key===n);return i?i.value.push(r):t.push({key:n,value:[r]}),t},[])};Document.prototype.findElementsWithSelector=function(e,t=document){const r=Array.from(t.querySelectorAll("*")),n=[];return r.forEach(i=>{if(i instanceof HTMLElement&&i.shadowRoot){const o=findElementsWithSelector(e,i.shadowRoot);n.push(...o)}i.matches&&i.matches(e)&&n.push(i)}),n};HTMLElement.prototype.isCursorInElement=function(e){const t=this.getBoundingClientRect();return e.clientX>=t.left&&e.clientX<=t.right&&e.clientY>=t.top&&e.clientY<=t.bottom};Location.prototype.getQueryParameter=e=>new URLSearchParams(window.location.search).get(e);String.prototype.left=function(e,t=!1){const r=String(this).toString();return t?r.substring(0,r.lastIndexOf(e)):r.substring(0,r.indexOf(e))};String.prototype.right=function(e,t=!0){const r=String(this).toString();return t?r.substring(r.lastIndexOf(e)+e.length):r.substring(r.indexOf(e)+e.length)};URLSearchParams.prototype.getCaseIgnore=function(e){const t=new URLSearchParams(window.location.search);for(const[r,n]of t)if(r.toLowerCase()==e.toLowerCase())return n;return null};kn().register(Vx());var Xd;let zn=(Xd=class extends Re{constructor(){super(...arguments),$(this,"source",[]),$(this,"context"),$(this,"label",""),$(this,"hint",null),$(this,"value"),$(this,"dataContext",null),$(this,"path",null)}onChangedContext(){this.context&&(this.context.source&&(this.source=this.context.source),this.context.value&&(this.value=this.context.value))}updated(e){if(super.updated(e),e.has("dataContext")){if(this.dataContext&&this.path){const t=this.dataContext[this.path];t!=null&&t!=null&&(this.value=t),this.value!=t&&(this.value="Text")}}else e.has("context")&&this.onChangedContext()}getCurrentValue(){var e;if(this.context&&this.context.valuePath&&this.context.displayPath){const t=(e=this.context.source)==null?void 0:e.find(r=>r[this.context.valuePath]==this.value);if(t)return t[this.context.displayPath]}return this.value}render(){var e;return re`
    ${this.label?re`<label class="label">${this.label}</label>`:null}
    <fast-combobox 
      autocomplete="both" 
      @change=${this.changeValue} 
      placeholder=${this.hint??this.label} 
      value=${this.value} 
      current-value=${this.getCurrentValue()}>

      ${(e=this.source)==null?void 0:e.map(t=>{const r=this.context!=null&&this.context.valuePath?t[this.context.valuePath]:t,n=this.context!=null&&this.context.displayPath?t[this.context.displayPath]:t,i=this.value==r;return re`<fast-option ?selected=${i} value=${r} .dataContext=${t}>${n}</fast-option>`})}
    </fast-combobox>`}changeValue(e){this.value=e.target.currentValue;const t=e.target.options[e.target.selectedIndex],r=t.dataContext,n=t.value;this.context&&(this.context.selectedItem=r,this.context.value=n),this.dataContext&&this.path&&(this.dataContext[this.path]=n),this.dispatchEvent(new CustomEvent("changed",{detail:{text:e.target.currentValue,value:n},bubbles:!0,composed:!0}))}},$(Xd,"styles",[at`
    :host {
      display: block;
    }

    fast-combobox {
      min-width: 80px;
      width: 100%;
    }

    .label {
      display: block;
      padding: 4px 0;
    }
    `]),Xd);g([J({type:Array})],zn.prototype,"source",void 0);g([J({type:Object})],zn.prototype,"context",void 0);g([J({type:String})],zn.prototype,"label",void 0);g([J({type:String})],zn.prototype,"hint",void 0);g([J({type:Object})],zn.prototype,"value",void 0);g([J({type:Object})],zn.prototype,"dataContext",void 0);g([J({type:String})],zn.prototype,"path",void 0);zn=g([lt("u-combobox")],zn);var Yd;let Dc=(Yd=class extends Re{constructor(){super(...arguments),$(this,"errors",[]),$(this,"expanded",!1)}render(){if(this.errors.length<1)return re``;const e=this.expanded?"expanded":"";return re`
      <div id="iyu-error-msg-container">
        <div id="iyu-error-main">
          ${this.renderErrorSVG()}
          <span id="first-error">${this.errors[0]}</span>

          ${this.errors.length>1?re` 
              <span id="error-expand-button" @click=${()=>this.expanded=!this.expanded}>
                ...more[${this.errors.length-1}]
              </span>`:re``}
        </div>
        <div id="iyu-error-sub" class=${e}>
          ${this.errors.slice(1).map(t=>re` <div class="expanded-error">&#9900; ${t}</div> `)}
        </div>
      </div>
    `}renderErrorSVG(){return re`
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="20" height="20" viewBox="0 0 256 256" xml:space="preserve">
        <defs></defs>
        <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
          <path d="M 87 83.294 H 3 c -1.079 0 -2.075 -0.579 -2.608 -1.518 c -0.533 -0.938 -0.522 -2.089 0.03 -3.017 l 42 -70.588 C 42.963 7.263 43.942 6.706 45 6.706 s 2.037 0.557 2.578 1.466 l 42 70.588 c 0.552 0.928 0.563 2.079 0.029 3.017 C 89.074 82.715 88.079 83.294 87 83.294 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,188,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
          <path d="M 45 63.666 c -1.888 0 -3.419 -1.53 -3.419 -3.419 V 32.693 c 0 -1.888 1.531 -3.419 3.419 -3.419 c 1.888 0 3.419 1.531 3.419 3.419 v 27.554 C 48.419 62.136 46.888 63.666 45 63.666 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(63,63,63); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
          <path d="M 45 74.275 c -0.9 0 -1.778 -0.364 -2.416 -1.003 c -0.638 -0.638 -1.003 -1.516 -1.003 -2.416 c 0 -0.228 0.023 -0.444 0.068 -0.672 c 0.045 -0.216 0.102 -0.433 0.194 -0.638 c 0.08 -0.206 0.194 -0.4 0.319 -0.593 c 0.114 -0.183 0.262 -0.353 0.422 -0.513 c 0.16 -0.159 0.331 -0.296 0.512 -0.421 c 0.194 -0.126 0.388 -0.24 0.593 -0.319 c 0.205 -0.08 0.422 -0.148 0.638 -0.194 c 1.117 -0.228 2.291 0.137 3.089 0.934 c 0.638 0.639 1.003 1.516 1.003 2.416 s -0.365 1.778 -1.003 2.416 c -0.16 0.16 -0.331 0.308 -0.524 0.422 c -0.183 0.126 -0.376 0.239 -0.582 0.319 c -0.205 0.091 -0.421 0.148 -0.638 0.194 C 45.444 74.252 45.228 74.275 45 74.275 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(63,63,63); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
        </g>
      </svg>
    `}},$(Yd,"styles",at`
    #iyu-error-msg-container {
      display: block;
      width: auto;
      padding: 5px 10px 2px 10px;
      background-color: #ffdddd;
      border: 1px solid #ff0000;
      border-radius: 4px;
      color: #747474;
    }

    #iyu-error-main {
      display: flex;
      align-items: center;
      margin-bottom: 3px;
    }

    #iyu-error-main svg {
      margin-right: 5px;
    }

    #first-error {
      font-size: 14px;
    }

    #error-expand-button{
      margin-left: 5px;
      font-size: 14px;
      color: black;
      cursor: pointer;
      text-decoration: underline;
      user-select: none;
    }

    #error-expand-button:hover {
      color: #999; 
    }

    #error-expand-button:active {
      color: #333; 
    }

    #iyu-error-sub {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      //text-align: left;
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.5s ease-in-out;
    }

    #iyu-error-sub.expanded {
      max-height: 500px;
    }

    .expanded-error {
      margin-bottom: 3px;
      font-size: 14px;
    }
  `),Yd);g([J({type:Array})],Dc.prototype,"errors",void 0);g([J({type:Boolean})],Dc.prototype,"expanded",void 0);Dc=g([lt("u-errors")],Dc);var X0=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/*! *****************************************************************************
Copyright (C) Microsoft. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */var Y0;(function(e){(function(t){var r=typeof globalThis=="object"?globalThis:typeof X0=="object"?X0:typeof self=="object"?self:typeof this=="object"?this:a(),n=i(e);typeof r.Reflect<"u"&&(n=i(r.Reflect,n)),t(n,r),typeof r.Reflect>"u"&&(r.Reflect=e);function i(l,u){return function(c,h){Object.defineProperty(l,c,{configurable:!0,writable:!0,value:h}),u&&u(c,h)}}function o(){try{return Function("return this;")()}catch{}}function s(){try{return(0,eval)("(function() { return this; })()")}catch{}}function a(){return o()||s()}})(function(t,r){var n=Object.prototype.hasOwnProperty,i=typeof Symbol=="function",o=i&&typeof Symbol.toPrimitive<"u"?Symbol.toPrimitive:"@@toPrimitive",s=i&&typeof Symbol.iterator<"u"?Symbol.iterator:"@@iterator",a=typeof Object.create=="function",l={__proto__:[]}instanceof Array,u=!a&&!l,c={create:a?function(){return Co(Object.create(null))}:l?function(){return Co({__proto__:null})}:function(){return Co({})},has:u?function(_,O){return n.call(_,O)}:function(_,O){return O in _},get:u?function(_,O){return n.call(_,O)?_[O]:void 0}:function(_,O){return _[O]}},h=Object.getPrototypeOf(Function),d=typeof Map=="function"&&typeof Map.prototype.entries=="function"?Map:So(),m=typeof Set=="function"&&typeof Set.prototype.entries=="function"?Set:Kh(),y=typeof WeakMap=="function"?WeakMap:hn(),w=i?Symbol.for("@reflect-metadata:registry"):void 0,E=Ks(),p=cn(E);function f(_,O,j,F){if(q(j)){if(!It(_))throw new TypeError;if(!Ws(O))throw new TypeError;return Ct(_,O)}else{if(!It(_))throw new TypeError;if(!Se(O))throw new TypeError;if(!Se(F)&&!q(F)&&!Ot(F))throw new TypeError;return Ot(F)&&(F=void 0),j=_r(j),Ze(_,O,j,F)}}t("decorate",f);function v(_,O){function j(F,Y){if(!Se(F))throw new TypeError;if(!q(Y)&&!Wh(Y))throw new TypeError;B(_,O,F,Y)}return j}t("metadata",v);function S(_,O,j,F){if(!Se(j))throw new TypeError;return q(F)||(F=_r(F)),B(_,O,j,F)}t("defineMetadata",S);function L(_,O,j){if(!Se(O))throw new TypeError;return q(j)||(j=_r(j)),Et(_,O,j)}t("hasMetadata",L);function x(_,O,j){if(!Se(O))throw new TypeError;return q(j)||(j=_r(j)),$r(_,O,j)}t("hasOwnMetadata",x);function N(_,O,j){if(!Se(O))throw new TypeError;return q(j)||(j=_r(j)),oe(_,O,j)}t("getMetadata",N);function I(_,O,j){if(!Se(O))throw new TypeError;return q(j)||(j=_r(j)),de(_,O,j)}t("getOwnMetadata",I);function W(_,O){if(!Se(_))throw new TypeError;return q(O)||(O=_r(O)),ee(_,O)}t("getMetadataKeys",W);function te(_,O){if(!Se(_))throw new TypeError;return q(O)||(O=_r(O)),ne(_,O)}t("getOwnMetadataKeys",te);function fe(_,O,j){if(!Se(O))throw new TypeError;if(q(j)||(j=_r(j)),!Se(O))throw new TypeError;q(j)||(j=_r(j));var F=Gn(O,j,!1);return q(F)?!1:F.OrdinaryDeleteMetadata(_,O,j)}t("deleteMetadata",fe);function Ct(_,O){for(var j=_.length-1;j>=0;--j){var F=_[j],Y=F(O);if(!q(Y)&&!Ot(Y)){if(!Ws(Y))throw new TypeError;O=Y}}return O}function Ze(_,O,j,F){for(var Y=_.length-1;Y>=0;--Y){var Ve=_[Y],Ue=Ve(O,j,F);if(!q(Ue)&&!Ot(Ue)){if(!Se(Ue))throw new TypeError;F=Ue}}return F}function Et(_,O,j){var F=$r(_,O,j);if(F)return!0;var Y=Sn(O);return Ot(Y)?!1:Et(_,Y,j)}function $r(_,O,j){var F=Gn(O,j,!1);return q(F)?!1:Ul(F.OrdinaryHasOwnMetadata(_,O,j))}function oe(_,O,j){var F=$r(_,O,j);if(F)return de(_,O,j);var Y=Sn(O);if(!Ot(Y))return oe(_,Y,j)}function de(_,O,j){var F=Gn(O,j,!1);if(!q(F))return F.OrdinaryGetOwnMetadata(_,O,j)}function B(_,O,j,F){var Y=Gn(j,F,!0);Y.OrdinaryDefineOwnMetadata(_,O,j,F)}function ee(_,O){var j=ne(_,O),F=Sn(_);if(F===null)return j;var Y=ee(F,O);if(Y.length<=0)return j;if(j.length<=0)return Y;for(var Ve=new m,Ue=[],me=0,H=j;me<H.length;me++){var Q=H[me],K=Ve.has(Q);K||(Ve.add(Q),Ue.push(Q))}for(var Z=0,b=Y;Z<b.length;Z++){var Q=b[Z],K=Ve.has(Q);K||(Ve.add(Q),Ue.push(Q))}return Ue}function ne(_,O){var j=Gn(_,O,!1);return j?j.OrdinaryOwnMetadataKeys(_,O):[]}function xe(_){if(_===null)return 1;switch(typeof _){case"undefined":return 0;case"boolean":return 2;case"string":return 3;case"symbol":return 4;case"number":return 5;case"object":return _===null?1:6;default:return 6}}function q(_){return _===void 0}function Ot(_){return _===null}function dt(_){return typeof _=="symbol"}function Se(_){return typeof _=="object"?_!==null:typeof _=="function"}function Tt(_,O){switch(xe(_)){case 0:return _;case 1:return _;case 2:return _;case 3:return _;case 4:return _;case 5:return _}var j=O===3?"string":O===5?"number":"default",F=ql(_,o);if(F!==void 0){var Y=F.call(_,j);if(Se(Y))throw new TypeError;return Y}return un(_,j==="default"?"number":j)}function un(_,O){if(O==="string"){var j=_.toString;if(kr(j)){var F=j.call(_);if(!Se(F))return F}var Y=_.valueOf;if(kr(Y)){var F=Y.call(_);if(!Se(F))return F}}else{var Y=_.valueOf;if(kr(Y)){var F=Y.call(_);if(!Se(F))return F}var Ve=_.toString;if(kr(Ve)){var F=Ve.call(_);if(!Se(F))return F}}throw new TypeError}function Ul(_){return!!_}function qh(_){return""+_}function _r(_){var O=Tt(_,3);return dt(O)?O:qh(O)}function It(_){return Array.isArray?Array.isArray(_):_ instanceof Object?_ instanceof Array:Object.prototype.toString.call(_)==="[object Array]"}function kr(_){return typeof _=="function"}function Ws(_){return typeof _=="function"}function Wh(_){switch(xe(_)){case 3:return!0;case 4:return!0;default:return!1}}function Hr(_,O){return _===O||_!==_&&O!==O}function ql(_,O){var j=_[O];if(j!=null){if(!kr(j))throw new TypeError;return j}}function Wl(_){var O=ql(_,s);if(!kr(O))throw new TypeError;var j=O.call(_);if(!Se(j))throw new TypeError;return j}function Kl(_){return _.value}function Gl(_){var O=_.next();return O.done?!1:O}function Ql(_){var O=_.return;O&&O.call(_)}function Sn(_){var O=Object.getPrototypeOf(_);if(typeof _!="function"||_===h||O!==h)return O;var j=_.prototype,F=j&&Object.getPrototypeOf(j);if(F==null||F===Object.prototype)return O;var Y=F.constructor;return typeof Y!="function"||Y===_?O:Y}function Zl(){var _;!q(w)&&typeof r.Reflect<"u"&&!(w in r.Reflect)&&typeof r.Reflect.defineMetadata=="function"&&(_=Pi(r.Reflect));var O,j,F,Y=new y,Ve={registerProvider:Ue,getProvider:H,setProvider:K};return Ve;function Ue(Z){if(!Object.isExtensible(Ve))throw new Error("Cannot add provider to a frozen registry.");switch(!0){case _===Z:break;case q(O):O=Z;break;case O===Z:break;case q(j):j=Z;break;case j===Z:break;default:F===void 0&&(F=new m),F.add(Z);break}}function me(Z,b){if(!q(O)){if(O.isProviderFor(Z,b))return O;if(!q(j)){if(j.isProviderFor(Z,b))return O;if(!q(F))for(var k=Wl(F);;){var A=Gl(k);if(!A)return;var V=Kl(A);if(V.isProviderFor(Z,b))return Ql(k),V}}}if(!q(_)&&_.isProviderFor(Z,b))return _}function H(Z,b){var k=Y.get(Z),A;return q(k)||(A=k.get(b)),q(A)&&(A=me(Z,b),q(A)||(q(k)&&(k=new d,Y.set(Z,k)),k.set(b,A))),A}function Q(Z){if(q(Z))throw new TypeError;return O===Z||j===Z||!q(F)&&F.has(Z)}function K(Z,b,k){if(!Q(k))throw new Error("Metadata provider not registered.");var A=H(Z,b);if(A!==k){if(!q(A))return!1;var V=Y.get(Z);q(V)&&(V=new d,Y.set(Z,V)),V.set(b,k)}return!0}}function Ks(){var _;return!q(w)&&Se(r.Reflect)&&Object.isExtensible(r.Reflect)&&(_=r.Reflect[w]),q(_)&&(_=Zl()),!q(w)&&Se(r.Reflect)&&Object.isExtensible(r.Reflect)&&Object.defineProperty(r.Reflect,w,{enumerable:!1,configurable:!1,writable:!1,value:_}),_}function cn(_){var O=new y,j={isProviderFor:function(Q,K){var Z=O.get(Q);return q(Z)?!1:Z.has(K)},OrdinaryDefineOwnMetadata:Ue,OrdinaryHasOwnMetadata:Y,OrdinaryGetOwnMetadata:Ve,OrdinaryOwnMetadataKeys:me,OrdinaryDeleteMetadata:H};return E.registerProvider(j),j;function F(Q,K,Z){var b=O.get(Q),k=!1;if(q(b)){if(!Z)return;b=new d,O.set(Q,b),k=!0}var A=b.get(K);if(q(A)){if(!Z)return;if(A=new d,b.set(K,A),!_.setProvider(Q,K,j))throw b.delete(K),k&&O.delete(Q),new Error("Wrong provider for target.")}return A}function Y(Q,K,Z){var b=F(K,Z,!1);return q(b)?!1:Ul(b.has(Q))}function Ve(Q,K,Z){var b=F(K,Z,!1);if(!q(b))return b.get(Q)}function Ue(Q,K,Z,b){var k=F(Z,b,!0);k.set(Q,K)}function me(Q,K){var Z=[],b=F(Q,K,!1);if(q(b))return Z;for(var k=b.keys(),A=Wl(k),V=0;;){var X=Gl(A);if(!X)return Z.length=V,Z;var pe=Kl(X);try{Z[V]=pe}catch(ae){try{Ql(A)}finally{throw ae}}V++}}function H(Q,K,Z){var b=F(K,Z,!1);if(q(b)||!b.delete(Q))return!1;if(b.size===0){var k=O.get(K);q(k)||(k.delete(Z),k.size===0&&O.delete(k))}return!0}}function Pi(_){var O=_.defineMetadata,j=_.hasOwnMetadata,F=_.getOwnMetadata,Y=_.getOwnMetadataKeys,Ve=_.deleteMetadata,Ue=new y,me={isProviderFor:function(H,Q){var K=Ue.get(H);return q(K)?Y(H,Q).length?(q(K)&&(K=new m,Ue.set(H,K)),K.add(Q),!0):!1:K.has(Q)},OrdinaryDefineOwnMetadata:O,OrdinaryHasOwnMetadata:j,OrdinaryGetOwnMetadata:F,OrdinaryOwnMetadataKeys:Y,OrdinaryDeleteMetadata:Ve};return me}function Gn(_,O,j){var F=E.getProvider(_,O);if(!q(F))return F;if(j){if(E.setProvider(_,O,p))return p;throw new Error("Illegal state.")}}function So(){var _={},O=[],j=function(){function me(H,Q,K){this._index=0,this._keys=H,this._values=Q,this._selector=K}return me.prototype["@@iterator"]=function(){return this},me.prototype[s]=function(){return this},me.prototype.next=function(){var H=this._index;if(H>=0&&H<this._keys.length){var Q=this._selector(this._keys[H],this._values[H]);return H+1>=this._keys.length?(this._index=-1,this._keys=O,this._values=O):this._index++,{value:Q,done:!1}}return{value:void 0,done:!0}},me.prototype.throw=function(H){throw this._index>=0&&(this._index=-1,this._keys=O,this._values=O),H},me.prototype.return=function(H){return this._index>=0&&(this._index=-1,this._keys=O,this._values=O),{value:H,done:!0}},me}(),F=function(){function me(){this._keys=[],this._values=[],this._cacheKey=_,this._cacheIndex=-2}return Object.defineProperty(me.prototype,"size",{get:function(){return this._keys.length},enumerable:!0,configurable:!0}),me.prototype.has=function(H){return this._find(H,!1)>=0},me.prototype.get=function(H){var Q=this._find(H,!1);return Q>=0?this._values[Q]:void 0},me.prototype.set=function(H,Q){var K=this._find(H,!0);return this._values[K]=Q,this},me.prototype.delete=function(H){var Q=this._find(H,!1);if(Q>=0){for(var K=this._keys.length,Z=Q+1;Z<K;Z++)this._keys[Z-1]=this._keys[Z],this._values[Z-1]=this._values[Z];return this._keys.length--,this._values.length--,Hr(H,this._cacheKey)&&(this._cacheKey=_,this._cacheIndex=-2),!0}return!1},me.prototype.clear=function(){this._keys.length=0,this._values.length=0,this._cacheKey=_,this._cacheIndex=-2},me.prototype.keys=function(){return new j(this._keys,this._values,Y)},me.prototype.values=function(){return new j(this._keys,this._values,Ve)},me.prototype.entries=function(){return new j(this._keys,this._values,Ue)},me.prototype["@@iterator"]=function(){return this.entries()},me.prototype[s]=function(){return this.entries()},me.prototype._find=function(H,Q){if(!Hr(this._cacheKey,H)){this._cacheIndex=-1;for(var K=0;K<this._keys.length;K++)if(Hr(this._keys[K],H)){this._cacheIndex=K;break}}return this._cacheIndex<0&&Q&&(this._cacheIndex=this._keys.length,this._keys.push(H),this._values.push(void 0)),this._cacheIndex},me}();return F;function Y(me,H){return me}function Ve(me,H){return H}function Ue(me,H){return[me,H]}}function Kh(){var _=function(){function O(){this._map=new d}return Object.defineProperty(O.prototype,"size",{get:function(){return this._map.size},enumerable:!0,configurable:!0}),O.prototype.has=function(j){return this._map.has(j)},O.prototype.add=function(j){return this._map.set(j,j),this},O.prototype.delete=function(j){return this._map.delete(j)},O.prototype.clear=function(){this._map.clear()},O.prototype.keys=function(){return this._map.keys()},O.prototype.values=function(){return this._map.keys()},O.prototype.entries=function(){return this._map.entries()},O.prototype["@@iterator"]=function(){return this.keys()},O.prototype[s]=function(){return this.keys()},O}();return _}function hn(){var _=16,O=c.create(),j=F();return function(){function H(){this._key=F()}return H.prototype.has=function(Q){var K=Y(Q,!1);return K!==void 0?c.has(K,this._key):!1},H.prototype.get=function(Q){var K=Y(Q,!1);return K!==void 0?c.get(K,this._key):void 0},H.prototype.set=function(Q,K){var Z=Y(Q,!0);return Z[this._key]=K,this},H.prototype.delete=function(Q){var K=Y(Q,!1);return K!==void 0?delete K[this._key]:!1},H.prototype.clear=function(){this._key=F()},H}();function F(){var H;do H="@@WeakMap@@"+me();while(c.has(O,H));return O[H]=!0,H}function Y(H,Q){if(!n.call(H,j)){if(!Q)return;Object.defineProperty(H,j,{value:c.create()})}return H[j]}function Ve(H,Q){for(var K=0;K<Q;++K)H[K]=Math.random()*255|0;return H}function Ue(H){return typeof Uint8Array=="function"?typeof crypto<"u"?crypto.getRandomValues(new Uint8Array(H)):typeof msCrypto<"u"?msCrypto.getRandomValues(new Uint8Array(H)):Ve(new Uint8Array(H),H):Ve(new Array(H),H)}function me(){var H=Ue(_);H[6]=H[6]&79|64,H[8]=H[8]&191|128;for(var Q="",K=0;K<_;++K){var Z=H[K];(K===4||K===6||K===8)&&(Q+="-"),Z<16&&(Q+="0"),Q+=Z.toString(16).toLowerCase()}return Q}}function Co(_){return _.__=void 0,delete _.__,_}})})(Y0||(Y0={}));const x4="propertyMeta",w4=Symbol(x4),$4="Object",Hu={};document.__propertyMeta__=Hu;function Sg(e,t){let r;try{if(r=Reflect.getMetadata(w4,e,t),r)return r}catch{}if(r===void 0){const n=e.constructor.name;return Hu[n]===void 0?e.constructor.name===$4?void 0:Sg(Hu,t):Hu[n][t]}return r}kn().register(_3(),w3(),m3(),l3(),Vx(),v3());var Te;(function(e){e[e.text=0]="text",e[e.email=1]="email",e[e.password=2]="password",e[e.tel=3]="tel",e[e.url=4]="url",e[e.checkbox=5]="checkbox",e[e.number=6]="number",e[e.date=7]="date",e[e.time=8]="time",e[e.datetime=9]="datetime"})(Te||(Te={}));var Jd;let Kt=(Jd=class extends Bh(Re){constructor(){super(...arguments),$(this,"type",Te.text),$(this,"value",null),$(this,"label",null),$(this,"hint",null),$(this,"required",!1),$(this,"context",null),$(this,"path",null),$(this,"skipUpdate",!1),$(this,"readonly",!1),$(this,"autoFocus",!1),$(this,"multiline",!1),$(this,"pattern",null),$(this,"updatedAction",null),$(this,"errorMessage",null),$(this,"lastContext",null),$(this,"lastPath",null)}async updated(e){if(super.updated(e),await this.updateComplete,this.context&&this.path){if(this.context==this.lastContext&&this.path==this.lastPath)return;this.lastContext=this.context,this.lastPath=this.path,this.autoWire(this.context,this.path)}}autoWire(e,t){const r=Sg(e,t);if(r){if(r.label&&(this.label=r.label),r.hint&&(this.hint=r.hint),r.required&&(this.required=r.required),r.type){const i=r.type.name;i=="String"&&(this.type=Te.text),i=="Boolean"&&(this.type=Te.checkbox),i=="Number"&&(this.type=Te.number)}if(r.format){const i=Te[r.format];if(i==null)throw`not suppreted ${r.format}`;this.type=i}}this.hint==null&&(this.label?this.hint=this.label:this.hint=t);const n=e[t];this.value=n??""}render(){return re`
      ${this.renderInput()}
      ${this.renderError()}
    `}renderInput(){if(this.type==Te.checkbox||this.type==Te[Te.checkbox])return this.renderCheckbox();if(this.type==Te.email||this.type==Te[Te.email])return this.renderText("email");if(this.type==Te.number||this.type==Te[Te.number])return this.renderNumber();if(this.type==Te.date||this.type==Te[Te.date])return re`<input type="date">`;if(this.type==Te.time||this.type==Te[Te.time])return re`<input type="time">`;if(this.type==Te.datetime||this.type==Te[Te.datetime])return re`<input type="datetime-local">`;{let e=this.type;return typeof this.type=="number"&&(e=Te[this.type]),this.multiline?this.renderTextArea(`${e}`):this.renderText(`${e}`)}}renderError(){return this.errorMessage?re`<div style="color: red; font-size: 12px;">${this.errorMessage}</div>`:re``}renderText(e){const t=this.pattern??this.getPatternByType(e);return re`
    <fast-text-field @change=${this.onChangeTextField}
      .type=${e}
      .value=${this.value} 
      .placeholder=${this.hint??this.label} 
      ?required=${this.required}
      ?readonly=${this.readonly}
      ?autofocus=${this.autoFocus}
      pattern=${t}
      tabindex=0>
      ${this.label&&this.required?re`<span style="color:red;">&#42;</span>`:re``}
      ${this.label}
    </fast-text-field>
    `}renderTextArea(e){return re`
    <fast-text-area @change=${t=>{this.value=t.target.value.trim(),this.onChange(this.value),t.cancelBubble=!0}} 
      .type=${e}
      .value=${this.value} 
      .placeholder=${this.hint??this.label}
      ?required=${this.required}
      ?readonly=${this.readonly}
      ?autofocus=${this.autoFocus}
      tabindex=0>
      ${this.label&&this.required?re`<span style="color:red;">&#42;</span>`:re``}
      ${this.label}
    </fast-text-area>
    `}renderCheckbox(){return re`
    <fast-checkbox @change=${e=>{this.value=e.target.currentChecked,this.onChange(this.value),e.cancelBubble=!0}} 
      ?checked=${this.value}
      ?required=${this.required}
      ?readonly=${this.readonly}
      ?autofocus=${this.autoFocus}
      tabindex=0>
      ${this.label}
    </fast-checkbox>`}renderNumber(){return re`
    <fast-number-field @change=${e=>{this.value=e.target.value!==null?Number(e.target.value):null,this.onChange(this.value),e.cancelBubble=!0}}
      .value=${this.value} 
      .placeholder=${this.hint??this.label} 
      ?required=${this.required}
      ?readonly=${this.readonly}
      ?autofocus=${this.autoFocus}
      tabindex=0>
      ${this.label&&this.required?re`<span style="color:red;">&#42;</span>`:re``}
      ${this.label}
    </fast-number-field>
    `}onChangeTextField(e){const t=e.target.value,r=e.target.pattern;this.validate(t,r)&&(this.value=e.target.value.trim(),this.onChange(this.value),e.cancelBubble=!0)}validate(e,t){return e&&t&&!new RegExp(t).test(e)?(this.errorMessage="입력된 값이 유효하지 않습니다.",!1):(this.errorMessage=null,!0)}onChange(e){(this.type==Te.number||this.type==Te[Te.number])&&e==""&&(e=null);const t=new CustomEvent("change",{detail:{value:e}});this.dispatchEvent(t),this.skipUpdate!=!0&&this.context&&this.path&&(ks(this.context)?MO(()=>{this.context[this.path]=e}):this.context[this.path]=e),this.updatedAction&&this.path&&this.updatedAction(this.path,e,this.context)}getPatternByType(e){return e==null||e==null||e=="text"?null:e=="email"?"^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$":e=="tel"?"^[-+()0-9]+$":e=="url"?"^((http|https):\\/\\/)?[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}((:[0-9]{1,5})?\\/.*)?$":e=="password"?"[0-9a-zA-Z!@#$%^&*()-_=+]":null}},$(Jd,"styles",[at`
    :host {
      display: block;
    }

    :host(:focus-within) {
      outline: none;
    }

    fast-text-field {
      display: block;
      margin: 2px 0px;
    }

    fast-text-area {
      display: block;
      margin: 2px 0px;
    }

    fast-number-field {
      display: block;
      margin: 2px 0px;      
    }
    
    fast-checkbox {
      margin: 4px 0px 4px 0px;
    }
    `]),Jd);g([J({type:Te})],Kt.prototype,"type",void 0);g([J()],Kt.prototype,"value",void 0);g([J({type:String})],Kt.prototype,"label",void 0);g([J({type:String})],Kt.prototype,"hint",void 0);g([J({type:Boolean})],Kt.prototype,"required",void 0);g([J({type:Object})],Kt.prototype,"context",void 0);g([J({type:String})],Kt.prototype,"path",void 0);g([J({type:Boolean,attribute:"skip-update"})],Kt.prototype,"skipUpdate",void 0);g([J({type:Boolean})],Kt.prototype,"readonly",void 0);g([J({type:Boolean,attribute:"auto-focus"})],Kt.prototype,"autoFocus",void 0);g([J({type:Boolean,attribute:!0})],Kt.prototype,"multiline",void 0);g([J({type:String})],Kt.prototype,"pattern",void 0);g([J({type:Function})],Kt.prototype,"updatedAction",void 0);g([J({type:String})],Kt.prototype,"errorMessage",void 0);Kt=g([lt("u-input")],Kt);var ef;let gl=(ef=class extends Re{constructor(){super(),$(this,"anchorElement",null),$(this,"viewportElement",null),$(this,"isOpen",!1),this.open=this.open.bind(this),this.close=this.close.bind(this)}render(){return this.ensureEvent(),re`<h1><slot></slot></h1>`}disconnectedCallback(){super.disconnectedCallback(),this.removeEvents()}ensureEvent(){this.removeEvents(),this.anchorElement&&this.anchorElement.addEventListener("click",this.open),this.viewportElement&&this.viewportElement.addEventListener("click",this.close)}removeEvents(){this.anchorElement&&this.anchorElement.removeEventListener("click",this.open),this.viewportElement&&this.viewportElement.removeEventListener("click",this.close)}open(e){if(this.anchorElement&&this.isOpen!=!0){this.isOpen=!0,e.stopImmediatePropagation(),this.dispatchEvent(new CustomEvent("on-opening",{bubbles:!0,composed:!0})),this.style.display="block",this.style.position="absolute",this.style.zIndex="9999";const t=this.anchorElement.getBoundingClientRect(),r=this.getBoundingClientRect();t.bottom+r.height>window.innerHeight?this.style.top=t.top-r.height+"px":this.style.top=t.bottom+"px",t.right+r.width>window.innerWidth?this.style.left=t.left-r.width+"px":this.style.left=t.right+"px"}}close(){this.isOpen&&(this.isOpen=!1,this.style.display="none")}},$(ef,"styles",[at`
    :host {
      display: none;
    }
    `]),ef);g([J({type:Object})],gl.prototype,"anchorElement",void 0);g([J({type:Object})],gl.prototype,"viewportElement",void 0);g([po()],gl.prototype,"isOpen",void 0);gl=g([lt("u-popup")],gl);var tf;let J0=(tf=class extends Re{constructor(){super(),$(this,"resizeObserver"),$(this,"mutationObserver"),this.resizeObserver=new ResizeObserver(()=>this.adjustScale()),this.mutationObserver=new MutationObserver(()=>this.adjustScale())}connectedCallback(){super.connectedCallback(),this.resizeObserver.observe(this)}disconnectedCallback(){this.mutationObserver.disconnect(),this.resizeObserver.disconnect(),super.disconnectedCallback()}firstUpdated(){var e;const t=(e=this.shadowRoot)==null?void 0:e.querySelector("slot");t&&this.mutationObserver.observe(t,{childList:!0}),this.adjustScale()}adjustScale(){var e;const t=(e=this.shadowRoot)==null?void 0:e.querySelector(".container");if(t){const r=t.style.transform;t.style.transform="scale(1)";const n=t.getBoundingClientRect();t.style.transform=r;const i=this.clientWidth/n.width,o=this.clientHeight/n.height,s=Math.min(i,o);t.style.transform=`scale(${s})`}}render(){return re`
      <div class="container">
        <slot></slot>
      </div>
    `}},$(tf,"styles",at`
    :host {
      display: block;
      position: relative;
    }

    .container {
      transform-origin: top left;
    }
  `),tf);J0=g([lt("view-box")],J0);kn().register(Nl());var rf;let Rc=(rf=class extends Re{constructor(){super(...arguments),$(this,"dialog"),$(this,"content",null),$(this,"resolve"),$(this,"reject")}render(){return re`
      <fast-dialog id="dialog" modal="true" hidden>
        ${this.content}
        <button id="close-button" @click=${this.cancel}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px" height="50px"><path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"/></svg>
        </button>
      </fast-dialog>
    `}ok(){this.close(),this.resolve&&this.resolve({success:!0,value:this.content})}cancel(){this.close(),this.reject&&this.reject()}async showAsync(){return await this.updateComplete,this.visible(),new Promise((e,t)=>{this.resolve=e,this.reject=t,this.content&&this.content.loadPromise&&this.content.loadPromise(e,t)}).catch(e=>({success:!1,value:e}))}visible(){this.dialog&&this.dialog.show(),this.hidden=!1}close(){this.dialog&&this.dialog.hide(),this.hidden=!0}},$(rf,"styles",[nh(kg),at`
    :host {
      z-index: 999; 
      position: absolute;
    }
    
    fast-dialog {
      --dialog-height: auto;
      --dialog-width: auto;
    }

    #close-button {
      position: absolute;
      top: 12px;
      right: 12px;
      background: transparent;
      border: none;
      color: var(--fill-color);
      font-size: 1.5rem;
      padding: 0px 8px;
      cursor: pointer;
    }
    `]),rf);g([Br("#dialog")],Rc.prototype,"dialog",void 0);g([J()],Rc.prototype,"content",void 0);Rc=g([lt("blank-dialog")],Rc);kn().register(Nl(),Ph());var nf;let Cs=(nf=class extends Re{constructor(){super(),$(this,"positiveText","Ok"),$(this,"negativeText","Cancel"),$(this,"useNegative",!1),$(this,"hiddenButtons",!1),$(this,"boundCancel",()=>{}),$(this,"dialog"),$(this,"errors"),$(this,"title",""),$(this,"content",null),$(this,"resolve"),$(this,"reject"),$(this,"validationHandler"),this.boundCancel=this.cancel.bind(this)}async connectedCallback(){var e;super.connectedCallback(),await this.updateComplete,(e=this.dialog)==null||e.addEventListener("cancel",this.boundCancel)}disconnectedCallback(){var e;(e=this.dialog)==null||e.removeEventListener("cancel",this.boundCancel),super.disconnectedCallback()}render(){var e;return re`
      <fast-dialog id="dialog" modal="true" hidden>
        <div style="padding: 10px; color: var(--neutral-foreground-rest); min-width: 400px">
          <h2>${this.title}</h2>
          ${this.content}
          ${(e=this.errors)==null?void 0:e.map(t=>re`<div class="row" style="color: var(--accent-foreground-rest)">${t}</div>`)}
          ${this.hiddenButtons?null:re`
            <div class="row" style="justify-content: end; padding-top: 4px">
              ${this.useNegative?re`<fast-button @click=${this.cancel}>${this.negativeText}</fast-button>`:null}
              <fast-button @click=${this.ok}>${this.positiveText}</fast-button>
            </div>`}
        </div>
      </fast-dialog>
    `}ok(){if(this.validationHandler){const e=this.validationHandler();if(e.length>0){this.errors=e;return}}this.close(),this.resolve&&this.resolve({success:!0,value:this.content})}cancel(){this.close(),this.reject&&this.reject()}async showAsync(e){return await this.updateComplete,this.title=e,this.visible(),new Promise((t,r)=>{this.resolve=t,this.reject=r}).catch(t=>({success:!1,value:t}))}visible(){this.dialog&&this.dialog.show(),this.hidden=!1}close(){this.dialog&&this.dialog.hide(),this.hidden=!0}},$(nf,"styles",[at`
    :host {
      z-index: 999; 
      position: absolute;
    }
    
    fast-dialog {
      --dialog-height: auto;
      --dialog-width: auto;
    }

    .row {
      display: flex;
      justify-content: space-between;
    }
    
    fast-button {
      min-width: 80px;
      margin: 0px 4px;
    }
    `]),nf);g([Br("#dialog")],Cs.prototype,"dialog",void 0);g([po()],Cs.prototype,"errors",void 0);g([J({type:String})],Cs.prototype,"title",void 0);g([J({attribute:!1})],Cs.prototype,"content",void 0);Cs=g([lt("content-dialog")],Cs);function Uw(e){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)}function qw(e){return/^(?:|\+\d+\s*)(?:|\d{2,3}(?:|-))\d{3,4}(?:|-)\d{4}$/.test(e)}function Rp(e,t){const r=[],n=Sg(e,t);if(n==null)return r;const i=`[${n.label??t}]`,o=e[t];return n.required&&(o==null||o.length<1)?(r.push(`Required ${i} Field`),r):(o==null||o.length<1||(n.minLength&&n.minLength>o.length&&r.push(`At least ${n.minLength} characters are required for ${i}`),n.maxLength&&n.maxLength<o.length&&r.push(`Up to ${n.maxLength} characters are allowed for ${i}`),n.format&&(n.format=="email"&&Uw(o)!=!0?r.push(`${i} is not an email format`):n.format=="tel"&&qw(o)!=!0&&r.push(`${i} is not a phone number format`)),n.regex&&n.regex.test(o)==!1&&r.push(`${i} is not a valid format.`)),r)}function _4(e,...t){const r=[];return t.length>0?t.forEach(n=>{Rp(e,n).forEach(i=>{r.push(i)})}):Object.keys(e).forEach(n=>{Rp(e,n).forEach(i=>{r.push(i)})}),r}const k4={validateEmail:Uw,validateTel:qw,validatePath:Rp,validate:_4};kn().register(Nl(),Ph());var of;let ao=(of=class extends Re{constructor(){super(),$(this,"boundCancel",()=>{}),$(this,"dialog"),$(this,"title",""),$(this,"message",""),$(this,"format",""),$(this,"value",""),$(this,"resolve"),$(this,"reject"),this.boundCancel=this.cancel.bind(this)}async connectedCallback(){var e;super.connectedCallback(),await this.updateComplete,(e=this.dialog)==null||e.addEventListener("cancel",this.boundCancel)}disconnectedCallback(){var e;(e=this.dialog)==null||e.removeEventListener("cancel",this.boundCancel),super.disconnectedCallback()}render(){return re`
      <fast-dialog id="dialog" modal="true" hidden>
        <div style="padding: 10px; color: var(--neutral-foreground-rest); min-width: 400px">
          <h2>${this.title}</h2>
          <p>${this.message}</p>
          <u-input 
            @change=${e=>this.value=e.detail.value} 
            value=${this.value} 
            label='' 
            type=${this.format} 
            auto-focus>
          </u-input>
          <div class="row" style="justify-content: end">
            <fast-button @click=${this.ok}>Ok</fast-button>
          </div>
        </div>
      </fast-dialog>
    `}ok(){this.format=="email"&&k4.validateEmail(this.value)!=!0||(this.close(),this.resolve&&this.resolve({success:!0,value:this.value}))}cancel(){this.close(),this.reject&&this.reject()}async showAsync(e,t,r){return await this.updateComplete,this.title=e,this.message=t,this.format=(r==null?void 0:r.format)??"",this.value=(r==null?void 0:r.value)??"",this.visible(),new Promise((n,i)=>{this.resolve=n,this.reject=i}).catch(n=>({success:!1,value:n}))}visible(){this.dialog&&this.dialog.show(),this.hidden=!1}close(){this.dialog&&this.dialog.hide(),this.hidden=!0}},$(of,"styles",[at`
    :host {
      z-index: 999; 
      position: absolute;
    }
        
    fast-dialog {
      --dialog-height: auto;
      --dialog-width: auto;
    }

    .row {
      display: flex;
      justify-content: space-between;
    }    
    `]),of);g([Br("#dialog")],ao.prototype,"dialog",void 0);g([J()],ao.prototype,"title",void 0);g([J()],ao.prototype,"message",void 0);g([J()],ao.prototype,"format",void 0);g([J()],ao.prototype,"value",void 0);ao=g([lt("input-dialog")],ao);/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const S4=new Set(["children","localName","ref","style","className"]),ey=new WeakMap,C4=(e,t,r,n,i)=>{const o=i==null?void 0:i[t];o===void 0||r===n?(e[t]=r,r==null&&t in HTMLElement.prototype&&e.removeAttribute(t)):((s,a,l)=>{let u=ey.get(s);u===void 0&&ey.set(s,u=new Map);let c=u.get(a);l!==void 0?c===void 0?(u.set(a,c={handleEvent:l}),s.addEventListener(a,c)):c.handleEvent=l:c!==void 0&&(u.delete(a),s.removeEventListener(a,c))})(e,o,r)},E4=({react:e,tagName:t,elementClass:r,events:n,displayName:i})=>{const o=new Set(Object.keys(n??{})),s=e.forwardRef((a,l)=>{const u=e.useRef(null),c=e.useRef(null),h={},d={};for(const[m,y]of Object.entries(a))S4.has(m)?h[m==="className"?"class":m]=y:o.has(m)||m in r.prototype?d[m]=y:h[m]=y;return e.useLayoutEffect(()=>{if(c.current!==null){for(const m in d)C4(c.current,m,a[m],u.current?u.current[m]:void 0,n);u.current=a}}),e.useLayoutEffect(()=>{var m;(m=c.current)==null||m.removeAttribute("defer-hydration")},[]),h.suppressHydrationWarning=!0,e.createElement(t,{...h,ref:e.useCallback(m=>{c.current=m,typeof l=="function"?l(m):l!==null&&(l.current=m)},[l])})});return s.displayName=i??r.name,s};kn().register(Nl(),Ph());var sf;let lo=(sf=class extends Re{constructor(){super(),$(this,"positiveText","Ok"),$(this,"negativeText","Cancel"),$(this,"useNegative",!1),$(this,"boundCancel",()=>{}),$(this,"dialog"),$(this,"title",""),$(this,"message",""),$(this,"resolve"),$(this,"reject"),this.boundCancel=this.cancel.bind(this)}async connectedCallback(){var e;super.connectedCallback(),await this.updateComplete,this.hidden=!0,(e=this.dialog)==null||e.addEventListener("cancel",this.boundCancel)}disconnectedCallback(){var e;(e=this.dialog)==null||e.removeEventListener("cancel",this.boundCancel),super.disconnectedCallback()}render(){return re`
      <fast-dialog id="dialog" modal="true" hidden>
        <div style="padding: 10px; color: var(--neutral-foreground-rest); min-width: 400px">
          <label id="title">${this.title}</label>
          <pre>${this.message}</pre>
          <div class="row">
            <fast-button @click=${()=>this.ok()}>${this.positiveText}</fast-button>
            ${this.useNegative?re`<fast-button @click=${()=>this.cancel()}>${this.negativeText}</fast-button>`:null}
          </div>
        </div>
      </fast-dialog>
    `}initOk(){this.positiveText="Ok",this.negativeText="Cancel",this.useNegative=!1}initOkCancel(){this.positiveText="Ok",this.negativeText="Cancel",this.useNegative=!0}initYesNo(){this.positiveText="Yes",this.negativeText="No",this.useNegative=!0}initCustom(e,t,r){this.positiveText=e,this.negativeText=t,this.useNegative=r??!0}ok(){this.close(),this.resolve&&this.resolve(!0)}cancel(){this.close(),this.reject&&this.reject("cancel")}showAsync(e,t){return this.title=e,this.message=t,this.visible(),new Promise((r,n)=>{this.resolve=r,this.reject=n}).catch(()=>!1)}visible(){this.dialog&&this.dialog.show(),this.hidden=!1}close(){this.dialog&&this.dialog.hide(),this.hidden=!0}},$(sf,"styles",[at`
      :host {
        z-index: 999; 
        position: absolute;
      }
          
      fast-dialog {
        --dialog-height: auto;
        --dialog-width: auto;
      }

      .row {
        display: flex;
        justify-content: space-between;
        justify-content: end;
      }
      
      fast-button {
        min-width: 80px;
        margin: 0px 4px;
      }

      #title {
        font-weight: initial;
        opacity: 0.6;
        font-size: large;
      }
    `]),sf);g([Br("#dialog")],lo.prototype,"dialog",void 0);g([J()],lo.prototype,"title",void 0);g([J()],lo.prototype,"message",void 0);lo=g([lt("message-dialog")],lo);E4({tagName:"message-dialog",elementClass:lo,react:pi});kn().register(Nl());var af;let ml=(af=class extends Re{constructor(){super(...arguments),$(this,"dialog"),$(this,"title",""),$(this,"content"),$(this,"resolve"),$(this,"reject")}render(){return re`
      <fast-dialog id="dialog" modal="true" hidden>
        <div id="title">
          ${this.title}        
        </div>
        <div id="content">
          ${this.content}
        </div>
        <button id="close-button" @click=${this.cancel} tabindex="-1">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="24px" height="24px"><path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"/></svg>
        </button>
      </fast-dialog>
    `}ok(e){this.close(),this.resolve&&(e??(e={success:!0,value:this.content}),this.resolve(e))}cancel(e){this.close(),this.reject&&this.reject(e)}async showAsync(){return await this.updateComplete,this.visible(),new Promise((e,t)=>{this.resolve=e,this.reject=t,this.content&&(this.content.loadPromise&&this.content.loadPromise(e,t),this.content.title&&(this.title=this.content.title),this.content.addEventListener("close",r=>{const n=r.detail;n.success?this.ok(n):this.cancel(n)}))}).catch(e=>({success:!1,value:e}))}visible(){this.dialog&&this.dialog.show(),this.hidden=!1}close(){this.dialog&&this.dialog.hide(),this.hidden=!0}},$(af,"styles",[nh(kg),at`
    :host {
      z-index: 999;
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
    }
  
    fast-dialog {
      --dialog-height: 100%;
      --dialog-width: 320px;
      
      position: fixed;
      right: 0;
    }
    
    fast-dialog::part(control) {
      margin: auto;
      position: fixed;
      right: 0;
      top: 0;
      height: 100%;
    }
  
    #close-button {
      position: absolute;
      top: 12px;
      right: 12px;
      background: transparent;
      border: none;
      color: var(--fill-color);
      font-size: 1.5rem;
      padding: 0px 8px;
      cursor: pointer;
    }

    #title {
      font-size: 1.5rem;
      font-weight: 600;
      padding: 12px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      max-width: calc(100% - 30px);
    }    
    
    #content {
      overflow-y: auto;
      max-height: calc(100% - 60px);
      padding: 12px;

      height: 100%;
      overflow: auto;
    }
    `]),af);g([Br("#dialog")],ml.prototype,"dialog",void 0);g([J()],ml.prototype,"title",void 0);g([J()],ml.prototype,"content",void 0);ml=g([lt("right-dialog")],ml);class Mp{constructor(t){$(this,"content",null),$(this,"execute"),$(this,"canExecute"),Hs(this),this.content=t.content,this.execute=t.execute,this.canExecute=t.canExecute||(()=>!0)}}g([vt],Mp.prototype,"content",void 0);class O4{constructor(t){$(this,"key"),$(this,"instance"),$(this,"type"),this.key=Symbol(),this.type=t}}const Ww=class xa{constructor(){$(this,"singletons",new Map),$(this,"multitons",new Map),$(this,"services",[])}static getOrCreate(){return xa.instance||(xa.instance=new xa),xa.instance}addSingleton(t,r){const n=this.singletons.get(t);if(n)return n;{const i=new t(...r??[]);return this.singletons.set(t,i),i}}addMultiton(t,r,n){const i=this.multitons.get(t);if(i)return console.warn(`${t} already exists`),i;{const o=new r(...n??[]);return this.multitons.set(t,o),o}}createService(t="singleton"){const r=new O4(t);return this.services.push(r),r.key}register(t,r){const n=this.services.find(i=>i.key==t);n?n.instance=r:console.warn(`Service ${t.toString()} is not registered`)}resolve(t){const r=this.services.find(n=>n.key==t);if(r){if(r.type=="singleton")return r.instance;if(r.type=="multiton"){const n=r.instance.constructor;return n()}else throw new Error(`Service ${t.toString()} is not registered`)}else return console.warn(`Service ${t.toString()} is not registered`),null}get(t,r){return r?this.multitons.get(r)||(console.warn(`${r} is not registered, it will be registered as a multiton`),this.addMultiton(r,t)):this.singletons.get(t)||(console.warn(`${t.name} is not registered, it will be registered as a singleton`),this.addSingleton(t))}};$(Ww,"instance");let T4=Ww;function Kw(e,t){return function(r,n){Object.defineProperty(r,n,{get:()=>gn.get(e,t)})}}const gn=T4.getOrCreate();var xt;(function(e){e[e.TopLeft=0]="TopLeft",e[e.TopCenter=1]="TopCenter",e[e.TopRight=2]="TopRight",e[e.BottomLeft=3]="BottomLeft",e[e.BottomCenter=4]="BottomCenter",e[e.BottomRight=5]="BottomRight",e[e.LeftTop=6]="LeftTop",e[e.LeftCenter=7]="LeftCenter",e[e.LeftBottom=8]="LeftBottom",e[e.RightTop=9]="RightTop",e[e.RightCenter=10]="RightCenter",e[e.RightBottom=11]="RightBottom",e[e.Auto=12]="Auto"})(xt||(xt={}));class Cg extends Re{constructor(){super(...arguments),$(this,"open",!1),$(this,"target"),$(this,"handleOutsideClickBind",this.handleOutsideClick.bind(this)),$(this,"handleEscapeKeyBind",this.handleEscapeKey.bind(this)),$(this,"handleHoverTargetBind",this.handleHoverTarget.bind(this)),$(this,"handleHoverThisBind",this.handleHoverThis.bind(this)),$(this,"adjustPositionBind",this.adjustPosition.bind(this))}get isOpen(){return this.open}get targetElement(){return this.target}connectedCallback(){super.connectedCallback(),this.style.position="absolute",this.style.zIndex="5",this.hidden=!0}async toggleAsync(t){if(!t.currentTarget)throw new Error("event target is null");t.currentTarget===this.target&&this.open?await this.hideClickAsync():await this.showClickAsync(t)}async showClickAsync(t){var r;await this.showAsync(t),document.removeEventListener("click",this.handleOutsideClickBind,{capture:!0}),document.removeEventListener("keydown",this.handleEscapeKeyBind,{capture:!0}),document.removeEventListener("scroll",this.adjustPositionBind,{capture:!0}),window.removeEventListener("resize",this.adjustPositionBind),document.addEventListener("click",this.handleOutsideClickBind,{capture:!0}),document.addEventListener("keydown",this.handleEscapeKeyBind,{capture:!0}),document.addEventListener("scroll",this.adjustPositionBind,{capture:!0}),window.addEventListener("resize",this.adjustPositionBind),(r=this.target)==null||r.classList.add("active"),setTimeout(()=>{this.open=!0},100)}async hideClickAsync(){var t;this.hidden=!0,document.removeEventListener("click",this.handleOutsideClickBind,{capture:!0}),document.removeEventListener("keydown",this.handleEscapeKeyBind,{capture:!0}),document.removeEventListener("scroll",this.adjustPositionBind,{capture:!0}),window.removeEventListener("resize",this.adjustPositionBind),(t=this.target)==null||t.classList.remove("active"),setTimeout(()=>{this.open=!1},100)}async hoverAsync(t){await this.showHoverAsync(t)}async showHoverAsync(t){await this.showAsync(t),this.target&&this.target.removeEventListener("mouseleave",this.handleHoverTargetBind),this.removeEventListener("mouseleave",this.handleHoverThisBind),this.target&&this.target.addEventListener("mouseleave",this.handleHoverTargetBind),this.addEventListener("mouseleave",this.handleHoverThisBind),this.open=!0}async hideHoverAsync(){this.hidden=!0,this.target&&this.target.removeEventListener("mouseleave",this.handleHoverTargetBind),this.removeEventListener("mouseleave",this.handleHoverThisBind),this.open=!1}async showAsync(t){const r=t.currentTarget;if(!r)throw new Error("event target is null");this.target=r,this.style.opacity="0",this.hidden=!1,await this.updateComplete,await this.adjustPosition(),this.style.opacity="1"}async handleOutsideClick(t){var r;const n=t.target,i=this.contains(n),o=(r=this.target)==null?void 0:r.contains(n);!i&&!o&&this.hideClickAsync()}async handleEscapeKey(t){t.key==="Escape"&&this.hideClickAsync()}async handleHoverTarget(t){t.relatedTarget===this&&this.keepHover||this.hideHoverAsync()}async handleHoverThis(){this.hideHoverAsync()}async adjustPosition(){const t=window.innerWidth,r=window.innerHeight;if(!this.target)return;const n=this.target.getBoundingClientRect(),i=n.top,o=r-n.bottom,s=n.left,a=t-n.right,l=i>o,u=s>a,c=this.getBoundingClientRect(),{width:h,height:d}=c,m=i>d,y=o>d,w=s>h,E=a>h;let p,f,v,S;switch(this.position){case xt.TopLeft:{m||l?S=o+n.height:p=i+n.height,s+n.width>h?h>n.width?v=a:f=s:f=1;break}case xt.TopCenter:{m||l?S=o+n.height:p=i+n.height;const L=(h-n.width)/2,x=s<L,N=a<L;x?f=1:N?v=1:f=s-L;break}case xt.TopRight:{m||l?S=o+n.height:p=i+n.height,a+n.width>h?h>n.width?f=s:v=a:v=1;break}case xt.BottomLeft:{y||!l?p=i+n.height:S=o+n.height,s+n.width>h?v=a:f=1;break}case xt.BottomCenter:{y||!l?p=i+n.height:S=o+n.height;const L=(h-n.width)/2,x=s<L,N=a<L;x?f=1:N?v=1:f=s-L;break}case xt.BottomRight:{y||!l?p=i+n.height:S=o+n.height,a+n.width>h?f=s:v=1;break}case xt.LeftTop:{w||u?f=s-h:v=a-h,i>d-n.height?d>n.height?S=o:p=i:p=1;break}case xt.LeftCenter:{w||u?f=s-h:v=a-h;const L=(d-n.height)/2,x=i<L,N=o<L;x?p=1:N?S=1:p=i-L;break}case xt.LeftBottom:{w||u?f=s-h:v=a-h,o>d-n.height?d>n.height?p=i:S=o:S=1;break}case xt.RightTop:{E||!u?v=a-h:f=s-h,i>d-n.height?d>n.height?S=o:p=i:p=1;break}case xt.RightCenter:{E||!u?v=a-h:f=s-h;const L=(d-n.height)/2,x=i<L,N=o<L;x?p=1:N?S=1:p=i-L;break}case xt.RightBottom:{E||!u?v=a-h:f=s-h,o>d-n.height?d>n.height?p=i:S=o:S=1;break}case xt.Auto:l?p=i-d:S=o-d,u?v=a:f=s;break}this.style.top=p?`${p}px`:"unset",this.style.bottom=S?`${S}px`:"unset",this.style.left=f?`${f}px`:"unset",this.style.right=v?`${v}px`:"unset"}}const P4="m3.514 6.61c-.317.179-.514.519-.514.887v8.95c0 .37.197.708.514.887 1.597.901 6.456 3.639 8.005 4.512.152.085.319.128.487.128.164 0 .328-.041.477-.123 1.549-.855 6.39-3.523 7.994-4.408.323-.177.523-.519.523-.891v-9.055c0-.368-.197-.708-.515-.887-1.595-.899-6.444-3.632-7.999-4.508-.151-.085-.319-.128-.486-.128-.168 0-.335.043-.486.128-1.555.876-6.405 3.609-8 4.508m15.986 2.115v7.525l-6.75 3.722v-7.578zm-15 7.425v-7.458l6.75 3.75v7.511zm.736-8.769 6.764-3.813 6.801 3.834-6.801 3.716z",A4="M12,12A6,6,0,1,0,6,6,6.006,6.006,0,0,0,12,12ZM12,2A4,4,0,1,1,8,6,4,4,0,0,1,12,2Z M12,14a9.01,9.01,0,0,0-9,9,1,1,0,0,0,2,0,7,7,0,0,1,14,0,1,1,0,0,0,2,0A9.01,9.01,0,0,0,12,14Z",j4="M12,16a4,4,0,1,1,4-4A4,4,0,0,1,12,16Zm0-6a2,2,0,1,0,2,2A2,2,0,0,0,12,10Zm6,13A6,6,0,0,0,6,23a1,1,0,0,0,2,0,4,4,0,0,1,8,0,1,1,0,0,0,2,0ZM18,8a4,4,0,1,1,4-4A4,4,0,0,1,18,8Zm0-6a2,2,0,1,0,2,2A2,2,0,0,0,18,2Zm6,13a6.006,6.006,0,0,0-6-6,1,1,0,0,0,0,2,4,4,0,0,1,4,4,1,1,0,0,0,2,0ZM6,8a4,4,0,1,1,4-4A4,4,0,0,1,6,8ZM6,2A2,2,0,1,0,8,4,2,2,0,0,0,6,2ZM2,15a4,4,0,0,1,4-4A1,1,0,0,0,6,9a6.006,6.006,0,0,0-6,6,1,1,0,0,0,2,0Z",N4="M12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z M21.294,13.9l-.444-.256a9.1,9.1,0,0,0,0-3.29l.444-.256a3,3,0,1,0-3-5.2l-.445.257A8.977,8.977,0,0,0,15,3.513V3A3,3,0,0,0,9,3v.513A8.977,8.977,0,0,0,6.152,5.159L5.705,4.9a3,3,0,0,0-3,5.2l.444.256a9.1,9.1,0,0,0,0,3.29l-.444.256a3,3,0,1,0,3,5.2l.445-.257A8.977,8.977,0,0,0,9,20.487V21a3,3,0,0,0,6,0v-.513a8.977,8.977,0,0,0,2.848-1.646l.447.258a3,3,0,0,0,3-5.2Zm-2.548-3.776a7.048,7.048,0,0,1,0,3.75,1,1,0,0,0,.464,1.133l1.084.626a1,1,0,0,1-1,1.733l-1.086-.628a1,1,0,0,0-1.215.165,6.984,6.984,0,0,1-3.243,1.875,1,1,0,0,0-.751.969V21a1,1,0,0,1-2,0V19.748a1,1,0,0,0-.751-.969A6.984,6.984,0,0,1,7.006,16.9a1,1,0,0,0-1.215-.165l-1.084.627a1,1,0,1,1-1-1.732l1.084-.626a1,1,0,0,0,.464-1.133,7.048,7.048,0,0,1,0-3.75A1,1,0,0,0,4.79,8.992L3.706,8.366a1,1,0,0,1,1-1.733l1.086.628A1,1,0,0,0,7.006,7.1a6.984,6.984,0,0,1,3.243-1.875A1,1,0,0,0,11,4.252V3a1,1,0,0,1,2,0V4.252a1,1,0,0,0,.751.969A6.984,6.984,0,0,1,16.994,7.1a1,1,0,0,0,1.215.165l1.084-.627a1,1,0,1,1,1,1.732l-1.084.626A1,1,0,0,0,18.746,10.125Z",L4="M13.04 6.25L14.8 4.5l.7.7-1.75 1.76-.7-.7zM9 5V2.5h1V5H9zM5.26 6.97L3.5 5.2l.7-.7 1.77 1.76-.7.7zM7 10.5C7 9.12 8.12 8 9.5 8S12 9.12 12 10.5 10.88 13 9.5 13 7 11.88 7 10.5zm4 0c0-.83-.67-1.5-1.5-1.5S8 9.67 8 10.5 8.67 12 9.5 12s1.5-.67 1.5-1.5zm4-.5h2.5v1H15v-1zM1.5 10H4v1H1.5v-1zm14.93 5.43c1-1.4 1.57-3.1 1.57-4.93C18 5.8 14.2 2 9.5 2S1 5.8 1 10.5c0 1.84.58 3.54 1.57 4.93l-.7.7C.67 14.58 0 12.63 0 10.5 0 5.25 4.25 1 9.5 1S19 5.25 19 10.5c0 2.1-.7 4.07-1.86 5.64l-.7-.7z",D4="m17,9.04V2h2V0H5v2h2v7.04c-1.497,1.311-7,6.427-7,10.817,0,3.035,2.927,4.102,3.044,4.143h17.912c.117-.042,3.044-1.108,3.044-4.143,0-4.39-5.503-9.506-7-10.817Zm3.585,12.96H3.415c-.396-.186-1.415-.796-1.415-2.143,0-.9.347-1.899.89-2.908h15.768c-.434-.656-.958-1.337-1.524-2H4.188c1.513-2.019,3.43-3.833,4.45-4.679l.362-.3V2h6v7.97l.362.3c1.846,1.529,6.638,6.232,6.638,9.587,0,1.347-1.019,1.957-1.415,2.143Z",R4="M431-330q1-72 16.5-105t58.5-72q42-38 64.5-70.5T593-647q0-45-30-75t-84-30q-52 0-80 29.5T358-661l-84-37q22-59 74.5-100.5T479-840q100 0 154 55.5T687-651q0 48-20.5 87T601-482q-49 47-59 72t-11 80H431Zm48 250q-29 0-49.5-20.5T409-150q0-29 20.5-49.5T479-220q29 0 49.5 20.5T549-150q0 29-20.5 49.5T479-80Z",M4="M480-340q58 0 99-41t41-99q0-58-41-99t-99-41q-58 0-99 41t-41 99q0 58 41 99t99 41Zm0 60q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-450H40v-60h160v60Zm720 0H760v-60h160v60ZM450-760v-160h60v160h-60Zm0 720v-160h60v160h-60ZM262-658l-100-97 43-44 96 100-39 41Zm494 496-98-100 41-41 99 98-42 43Zm-99-537 98-99 44 42-99 98-43-41ZM162-205l99-98 42 42-98 99-43-43Zm318-275Z",I4="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q8 0 17 .5t23 1.5q-36 32-56 79t-20 99q0 90 63 153t153 63q52 0 99-18.5t79-51.5q1 12 1.5 19.5t.5 14.5q0 150-105 255T480-120Zm0-60q109 0 190-67.5T771-406q-25 11-53.667 16.5Q688.667-384 660-384q-114.689 0-195.345-80.655Q384-545.311 384-660q0-24 5-51.5t18-62.5q-98 27-162.5 109.5T180-480q0 125 87.5 212.5T480-180Zm-4-297Z",F4="M160-200v-60h80v-304q0-84 49.5-150.5T420-798v-22q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v22q81 17 130.5 83.5T720-564v304h80v60H160Zm320-302Zm0 422q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM300-260h360v-304q0-75-52.5-127.5T480-744q-75 0-127.5 52.5T300-564v304Z",V4="M21,4H17.9A5.009,5.009,0,0,0,13,0H11A5.009,5.009,0,0,0,6.1,4H3A1,1,0,0,0,3,6H4V19a5.006,5.006,0,0,0,5,5h6a5.006,5.006,0,0,0,5-5V6h1a1,1,0,0,0,0-2ZM11,2h2a3.006,3.006,0,0,1,2.829,2H8.171A3.006,3.006,0,0,1,11,2Zm7,17a3,3,0,0,1-3,3H9a3,3,0,0,1-3-3V6H18Z M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18Z M14,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z",B4="m23.181,17.974L12.354,7.146c-.189-.189-.518-.189-.707,0L.819,17.974l-.707-.707L10.939,6.439c.566-.566,1.555-.566,2.121,0l10.827,10.827-.707.707Z",z4="m12,18c-.4,0-.777-.156-1.061-.439L.112,6.733l.707-.707,10.827,10.827c.189.189.518.189.707,0l10.827-10.827.707.707-10.827,10.827c-.283.283-.66.439-1.061.439Z",H4="M18.3 2.3L4.5 16l13.8 13.7-2 2L.9 16 16.4.4l1.9 1.9zm13.3 0L18 16l13.7 13.7-1.9 2L14.1 16 29.7.4l2 1.9z",U4="M13.7 2.3l2-2L31.1 16 15.6 31.6l-1.9-1.9L27.5 16 13.7 2.3zM.4 2.3l1.9-2L17.9 16 2.3 31.6l-2-1.9L14.2 16 .4 2.3z",q4="M22.5,18a1.5,1.5,0,0,1-1.061-.44L13.768,9.889a2.5,2.5,0,0,0-3.536,0L2.57,17.551A1.5,1.5,0,0,1,.449,15.43L8.111,7.768a5.505,5.505,0,0,1,7.778,0l7.672,7.672A1.5,1.5,0,0,1,22.5,18Z",W4="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z",K4="M9.068,16.347l4.9,4.9.707-.707a7.977,7.977,0,0,0,2.075-7.619l-.246-1,2.086-2.086.217.217a3.085,3.085,0,0,0,3.938.4,3,3,0,0,0,.38-4.565L18.2.954a3.085,3.085,0,0,0-3.938-.4,3,3,0,0,0-.38,4.565l.293.293L12.085,7.5,11.1,7.258A7.985,7.985,0,0,0,3.464,9.33l-.707.707,4.9,4.895L.293,22.293l1.414,1.414ZM10.607,9.2l2.1.514,4.3-4.3L15.293,3.707a1,1,0,0,1,.134-1.528,1.084,1.084,0,0,1,1.356.19l4.924,4.924h0a1,1,0,0,1-.134,1.528,1.084,1.084,0,0,1-1.356-.19L18.586,7l-4.3,4.3.518,2.111a5.977,5.977,0,0,1-.9,4.946L5.646,10.1A5.986,5.986,0,0,1,10.607,9.2Z",pt={cube:P4,user:A4,group:j4,setting:N4,overview:L4,labs:D4,question:R4,sun:M4,moon:I4,notification:F4,trash:V4,angleUp:B4,angleDown:z4,leftChevron:H4,rightChevron:U4,angleUp2:q4,close:W4,pin:K4};var lf;let Mc=(lf=class extends Cg{constructor(){super(...arguments),$(this,"keepHover",!0),$(this,"position",xt.BottomLeft),$(this,"items",[])}connectedCallback(){super.connectedCallback(),this.getUserInfo()}render(){return re`
      <div class="container">
          <div class="header">
            <div class="title">Notification</div>
            <div class="count">${this.items.filter(e=>e.read===!1?e:null).length}</div>
            <div class="flex"></div>
            <div class="delete" @click=${this.deleteAll}>Delete All</div>
            <div class="delete" @click=${this.deleteRead}>Delete Read</div>
          </div>
          <div class="body">
          ${this.items.length>0?this.items.map(e=>re`
              <div class="item">
                <div class=${`main ${e.read?"read":""}`} @click=${()=>this.readItem(e.id)}>
                  <div class="title">${e.title}</div>
                  <div class="content" title=${e.content}>${e.content}</div>
                  <div class="date">${e.date?this.formatDate(e.date):null}</div>
                </div>
                <div class="delete" @click=${()=>this.deleteItem(e.id)}>
                  <svg class="icon" viewBox="0 0 24 24">
                    <path d=${pt.trash}></path>
                  </svg>
                </div>
              </div>
            `):re`<div class="empty">There is no notification</div>`}
          </div>
      </div>
    `}async getUserInfo(){this.items=[{id:1,title:"길이 테스트용입니다. ㄴㄴㄴㄴㄴㄴㄴㄴㄴsssㄴㄴㄴㄴㄴㄴㄴㄴㄴ",content:"첫 번째 알림 길이테스트입니다.ㅁㄴㅇㄴㅁㅇㅁㄴ차처챵ㅊㄴ마ㅡㅊㅋㅌ,ㅡ차트ㅏ킅챠ㅐㅁ차ㅣㅇ추카티추먕추ㅏㅣㅋ추애ㅣ차퉄차ㅣ",date:new Date(2022,10,10),read:!1},{id:2,title:"두 번째 알림입니다.",content:"두 번째 알림 내용입니다.",date:new Date(2023,7,10),read:!1},{id:3,title:"세 번째 알림입니다.",content:"세 번째 알림 내용입니다.",date:new Date(2023,9,10),read:!1},{id:4,title:"네 번째 알림입니다.",content:"네 번째 알림 내용입니다.",date:new Date(2023,9,16,10),read:!1},{id:5,title:"다섯 번째 알림입니다.",content:"다섯 번째 알림 내용입니다.",date:new Date(2023,9,16,12,33,50),read:!1}]}async readItem(e){const t=this.items.find(r=>r.id===e);t&&(t.read=!0),this.requestUpdate()}async deleteItem(e){this.items=this.items.filter(t=>t.id!==e)}async deleteAll(){this.items=[]}async deleteRead(){this.items=this.items.filter(e=>!e.read)}formatDate(e){const t=new Date,r=navigator.language,n=new Date(e.getTime()-e.getTimezoneOffset()*6e4),i=Math.floor((t.getTime()-n.getTime())/1e3),o=this.formatDateToFullDate(n);return i<60?`${i} seconds ago - ${o} ${r}`:i<3600?`${Math.floor(i/60)} minutes ago - ${o} ${r}`:i<86400?`${Math.floor(i/3600)} hours ago - ${o} ${r}`:i<2592e3?`${Math.floor(i/86400)} days ago - ${o} ${r}`:i<31536e3?`${Math.floor(i/2592e3)} months ago - ${o} ${r}`:`${Math.floor(i/31536e3)} years ago - ${o} ${r}`}formatDateToFullDate(e){const t=e.getFullYear(),r=String(e.getMonth()+1).padStart(2,"0"),n=String(e.getDate()).padStart(2,"0"),i=String(e.getHours()).padStart(2,"0"),o=String(e.getMinutes()).padStart(2,"0");return`${t}/${r}/${n} ${i}:${o}`}},$(lf,"styles",at`
    .container {
      margin: 5px;
      width: 400px;
      background-color: var(--surface-card);
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      user-select: none;
    }

    .header {
      padding: 7px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
      border-bottom: 2px solid #ccc;

      .title {
        font-size: 16px;
        font-weight: bold;
      }

      .count {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 10px;
        height: 10px;
        padding: 4px;
        border-radius: 50%;
        background-color: red;
        color: white;
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .flex {
        flex-grow: 1;
      }

      .delete {
        font-size: 14px;
        color: var(--alpha-80);
        cursor: pointer;

        &:hover {
          opacity: 0.6;
        }

        &:active {
          opacity: 0.8;
        }
      }
    }

    .body {
      display: flex;
      flex-direction: column;
      height: 350px;
      overflow-x: hidden;
      overflow-y: auto;

      .item {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        border-bottom: 1px solid #ccc;
        cursor: pointer;

        .main {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 2px;
          padding: 5px;
          overflow: hidden;

          .title {
            color: var(--primary-text);
            font-size: 16px;
            font-weight: bold;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
  
          .content {
            color: var(--alpha-80);
            font-size: 12px;
            overflow: hidden;
            display: -webkit-box; /* for box-orient 레거시 */
            -webkit-line-clamp: 2; /* 두 줄로 제한 */
            -webkit-box-orient: vertical;
            text-overflow: ellipsis;
            white-space: normal;
          }
  
          .date {
            color: var(--alpha-30);
            font-size: 10px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          &.read {
            .title {
              font-weight: normal;
              color: #999;
            }
  
            .content {
              color: #999;
            }

            .date {
              color: #999;
            }
          }
        }
    
        .delete {
          display: none;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          width: 30px;
          height: 100%;

          .icon {
            width: 20px;
            height: 20px;
            fill: var(--primary-text);
            fill-rule: evenodd;
          }

          &:hover {
            background-color: #ff00004d;
          }
        }

        &:hover {
          background-color: var(--ui-subtle-hover);

          .delete {
            display: flex;
          }
        }

        &:last-child {
          border-bottom: none;
        }
      }

      .empty {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #999;
        font-size: 16px;
      }

      &::-webkit-scrollbar {
        width: 16px;
      }

      &::-webkit-scrollbar-thumb {
        height: 56px;
        border-radius: 8px;
        border: 4px solid transparent;
        background-clip: content-box;
        background-color: hsl(0,0%,37%)
      }

      &::-webkit-scrollbar-thumb:hover {
        background-color: hsl(0,0%,67%)
      }
    }
    
  `),lf);g([J({type:Array})],Mc.prototype,"items",void 0);Mc=g([lt("notification-menu")],Mc);var Gw={exports:{}},la={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ty;function G4(){if(ty)return la;ty=1;var e=pi,t=Symbol.for("react.element"),r=Symbol.for("react.fragment"),n=Object.prototype.hasOwnProperty,i=e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,o={key:!0,ref:!0,__self:!0,__source:!0};function s(a,l,u){var c,h={},d=null,m=null;u!==void 0&&(d=""+u),l.key!==void 0&&(d=""+l.key),l.ref!==void 0&&(m=l.ref);for(c in l)n.call(l,c)&&!o.hasOwnProperty(c)&&(h[c]=l[c]);if(a&&a.defaultProps)for(c in l=a.defaultProps,l)h[c]===void 0&&(h[c]=l[c]);return{$$typeof:t,type:a,key:d,ref:m,props:h,_owner:i.current}}return la.Fragment=r,la.jsx=s,la.jsxs=s,la}Gw.exports=G4();var T=Gw.exports;/**
 * @remix-run/router v1.14.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Je(){return Je=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},Je.apply(this,arguments)}var rt;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(rt||(rt={}));const ry="popstate";function Q4(e){e===void 0&&(e={});function t(n,i){let{pathname:o,search:s,hash:a}=n.location;return yl("",{pathname:o,search:s,hash:a},i.state&&i.state.usr||null,i.state&&i.state.key||"default")}function r(n,i){return typeof i=="string"?i:co(i)}return X4(t,r,null,e)}function ye(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function uo(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function Z4(){return Math.random().toString(36).substr(2,8)}function ny(e,t){return{usr:e.state,key:e.key,idx:t}}function yl(e,t,r,n){return r===void 0&&(r=null),Je({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof t=="string"?Kn(t):t,{state:r,key:t&&t.key||n||Z4()})}function co(e){let{pathname:t="/",search:r="",hash:n=""}=e;return r&&r!=="?"&&(t+=r.charAt(0)==="?"?r:"?"+r),n&&n!=="#"&&(t+=n.charAt(0)==="#"?n:"#"+n),t}function Kn(e){let t={};if(e){let r=e.indexOf("#");r>=0&&(t.hash=e.substr(r),e=e.substr(0,r));let n=e.indexOf("?");n>=0&&(t.search=e.substr(n),e=e.substr(0,n)),e&&(t.pathname=e)}return t}function X4(e,t,r,n){n===void 0&&(n={});let{window:i=document.defaultView,v5Compat:o=!1}=n,s=i.history,a=rt.Pop,l=null,u=c();u==null&&(u=0,s.replaceState(Je({},s.state,{idx:u}),""));function c(){return(s.state||{idx:null}).idx}function h(){a=rt.Pop;let E=c(),p=E==null?null:E-u;u=E,l&&l({action:a,location:w.location,delta:p})}function d(E,p){a=rt.Push;let f=yl(w.location,E,p);r&&r(f,E),u=c()+1;let v=ny(f,u),S=w.createHref(f);try{s.pushState(v,"",S)}catch(L){if(L instanceof DOMException&&L.name==="DataCloneError")throw L;i.location.assign(S)}o&&l&&l({action:a,location:w.location,delta:1})}function m(E,p){a=rt.Replace;let f=yl(w.location,E,p);r&&r(f,E),u=c();let v=ny(f,u),S=w.createHref(f);s.replaceState(v,"",S),o&&l&&l({action:a,location:w.location,delta:0})}function y(E){let p=i.location.origin!=="null"?i.location.origin:i.location.href,f=typeof E=="string"?E:co(E);return ye(p,"No window.location.(origin|href) available to create URL for href: "+f),new URL(f,p)}let w={get action(){return a},get location(){return e(i,s)},listen(E){if(l)throw new Error("A history only accepts one active listener");return i.addEventListener(ry,h),l=E,()=>{i.removeEventListener(ry,h),l=null}},createHref(E){return t(i,E)},createURL:y,encodeLocation(E){let p=y(E);return{pathname:p.pathname,search:p.search,hash:p.hash}},push:d,replace:m,go(E){return s.go(E)}};return w}var Xe;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(Xe||(Xe={}));const Y4=new Set(["lazy","caseSensitive","path","id","index","children"]);function J4(e){return e.index===!0}function Ip(e,t,r,n){return r===void 0&&(r=[]),n===void 0&&(n={}),e.map((i,o)=>{let s=[...r,o],a=typeof i.id=="string"?i.id:s.join("-");if(ye(i.index!==!0||!i.children,"Cannot specify children on an index route"),ye(!n[a],'Found a route id collision on id "'+a+`".  Route id's must be globally unique within Data Router usages`),J4(i)){let l=Je({},i,t(i),{id:a});return n[a]=l,l}else{let l=Je({},i,t(i),{id:a,children:void 0});return n[a]=l,i.children&&(l.children=Ip(i.children,t,s,n)),l}})}function Zo(e,t,r){r===void 0&&(r="/");let n=typeof t=="string"?Kn(t):t,i=Hn(n.pathname||"/",r);if(i==null)return null;let o=Qw(e);t5(o);let s=null;for(let a=0;s==null&&a<o.length;++a)s=c5(o[a],d5(i));return s}function e5(e,t){let{route:r,pathname:n,params:i}=e;return{id:r.id,pathname:n,params:i,data:t[r.id],handle:r.handle}}function Qw(e,t,r,n){t===void 0&&(t=[]),r===void 0&&(r=[]),n===void 0&&(n="");let i=(o,s,a)=>{let l={relativePath:a===void 0?o.path||"":a,caseSensitive:o.caseSensitive===!0,childrenIndex:s,route:o};l.relativePath.startsWith("/")&&(ye(l.relativePath.startsWith(n),'Absolute route path "'+l.relativePath+'" nested under path '+('"'+n+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),l.relativePath=l.relativePath.slice(n.length));let u=Rn([n,l.relativePath]),c=r.concat(l);o.children&&o.children.length>0&&(ye(o.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+u+'".')),Qw(o.children,t,c,u)),!(o.path==null&&!o.index)&&t.push({path:u,score:l5(u,o.index),routesMeta:c})};return e.forEach((o,s)=>{var a;if(o.path===""||!((a=o.path)!=null&&a.includes("?")))i(o,s);else for(let l of Zw(o.path))i(o,s,l)}),t}function Zw(e){let t=e.split("/");if(t.length===0)return[];let[r,...n]=t,i=r.endsWith("?"),o=r.replace(/\?$/,"");if(n.length===0)return i?[o,""]:[o];let s=Zw(n.join("/")),a=[];return a.push(...s.map(l=>l===""?o:[o,l].join("/"))),i&&a.push(...s),a.map(l=>e.startsWith("/")&&l===""?"/":l)}function t5(e){e.sort((t,r)=>t.score!==r.score?r.score-t.score:u5(t.routesMeta.map(n=>n.childrenIndex),r.routesMeta.map(n=>n.childrenIndex)))}const r5=/^:[\w-]+$/,n5=3,i5=2,o5=1,s5=10,a5=-2,iy=e=>e==="*";function l5(e,t){let r=e.split("/"),n=r.length;return r.some(iy)&&(n+=a5),t&&(n+=i5),r.filter(i=>!iy(i)).reduce((i,o)=>i+(r5.test(o)?n5:o===""?o5:s5),n)}function u5(e,t){return e.length===t.length&&e.slice(0,-1).every((r,n)=>r===t[n])?e[e.length-1]-t[t.length-1]:0}function c5(e,t){let{routesMeta:r}=e,n={},i="/",o=[];for(let s=0;s<r.length;++s){let a=r[s],l=s===r.length-1,u=i==="/"?t:t.slice(i.length)||"/",c=Fp({path:a.relativePath,caseSensitive:a.caseSensitive,end:l},u);if(!c)return null;Object.assign(n,c.params);let h=a.route;o.push({params:n,pathname:Rn([i,c.pathname]),pathnameBase:g5(Rn([i,c.pathnameBase])),route:h}),c.pathnameBase!=="/"&&(i=Rn([i,c.pathnameBase]))}return o}function Fp(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[r,n]=h5(e.path,e.caseSensitive,e.end),i=t.match(r);if(!i)return null;let o=i[0],s=o.replace(/(.)\/+$/,"$1"),a=i.slice(1);return{params:n.reduce((l,u,c)=>{let{paramName:h,isOptional:d}=u;if(h==="*"){let y=a[c]||"";s=o.slice(0,o.length-y.length).replace(/(.)\/+$/,"$1")}const m=a[c];return d&&!m?l[h]=void 0:l[h]=f5(m||"",h),l},{}),pathname:o,pathnameBase:s,pattern:e}}function h5(e,t,r){t===void 0&&(t=!1),r===void 0&&(r=!0),uo(e==="*"||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".'));let n=[],i="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(o,s,a)=>(n.push({paramName:s,isOptional:a!=null}),a?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(n.push({paramName:"*"}),i+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):r?i+="\\/*$":e!==""&&e!=="/"&&(i+="(?:(?=\\/|$))"),[new RegExp(i,t?void 0:"i"),n]}function d5(e){try{return decodeURI(e)}catch(t){return uo(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+t+").")),e}}function f5(e,t){try{return decodeURIComponent(e)}catch(r){return uo(!1,'The value for the URL param "'+t+'" will not be decoded because'+(' the string "'+e+'" is a malformed URL segment. This is probably')+(" due to a bad percent encoding ("+r+").")),e}}function Hn(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let r=t.endsWith("/")?t.length-1:t.length,n=e.charAt(r);return n&&n!=="/"?null:e.slice(r)||"/"}function p5(e,t){t===void 0&&(t="/");let{pathname:r,search:n="",hash:i=""}=typeof e=="string"?Kn(e):e;return{pathname:r?r.startsWith("/")?r:v5(r,t):t,search:m5(n),hash:y5(i)}}function v5(e,t){let r=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(n=>{n===".."?r.length>1&&r.pop():n!=="."&&r.push(n)}),r.length>1?r.join("/"):"/"}function uf(e,t,r,n){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t+"` field ["+JSON.stringify(n)+"].  Please separate it out to the ")+("`to."+r+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function Xw(e){return e.filter((t,r)=>r===0||t.route.path&&t.route.path.length>0)}function Eg(e,t){let r=Xw(e);return t?r.map((n,i)=>i===e.length-1?n.pathname:n.pathnameBase):r.map(n=>n.pathnameBase)}function Og(e,t,r,n){n===void 0&&(n=!1);let i;typeof e=="string"?i=Kn(e):(i=Je({},e),ye(!i.pathname||!i.pathname.includes("?"),uf("?","pathname","search",i)),ye(!i.pathname||!i.pathname.includes("#"),uf("#","pathname","hash",i)),ye(!i.search||!i.search.includes("#"),uf("#","search","hash",i)));let o=e===""||i.pathname==="",s=o?"/":i.pathname,a;if(s==null)a=r;else{let h=t.length-1;if(!n&&s.startsWith("..")){let d=s.split("/");for(;d[0]==="..";)d.shift(),h-=1;i.pathname=d.join("/")}a=h>=0?t[h]:"/"}let l=p5(i,a),u=s&&s!=="/"&&s.endsWith("/"),c=(o||s===".")&&r.endsWith("/");return!l.pathname.endsWith("/")&&(u||c)&&(l.pathname+="/"),l}const Rn=e=>e.join("/").replace(/\/\/+/g,"/"),g5=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),m5=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,y5=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;class Tg{constructor(t,r,n,i){i===void 0&&(i=!1),this.status=t,this.statusText=r||"",this.internal=i,n instanceof Error?(this.data=n.toString(),this.error=n):this.data=n}}function Pg(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}const Yw=["post","put","patch","delete"],b5=new Set(Yw),x5=["get",...Yw],w5=new Set(x5),$5=new Set([301,302,303,307,308]),_5=new Set([307,308]),cf={state:"idle",location:void 0,formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,json:void 0,text:void 0},k5={state:"idle",data:void 0,formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,json:void 0,text:void 0},ua={state:"unblocked",proceed:void 0,reset:void 0,location:void 0},Jw=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,S5=e=>({hasErrorBoundary:!!e.hasErrorBoundary}),e$="remix-router-transitions";function C5(e){const t=e.window?e.window:typeof window<"u"?window:void 0,r=typeof t<"u"&&typeof t.document<"u"&&typeof t.document.createElement<"u",n=!r;ye(e.routes.length>0,"You must provide a non-empty routes array to createRouter");let i;if(e.mapRouteProperties)i=e.mapRouteProperties;else if(e.detectErrorBoundary){let b=e.detectErrorBoundary;i=k=>({hasErrorBoundary:b(k)})}else i=S5;let o={},s=Ip(e.routes,i,void 0,o),a,l=e.basename||"/",u=Je({v7_fetcherPersist:!1,v7_normalizeFormMethod:!1,v7_partialHydration:!1,v7_prependBasename:!1,v7_relativeSplatPath:!1},e.future),c=null,h=new Set,d=null,m=null,y=null,w=e.hydrationData!=null,E=Zo(s,e.history.location,l),p=null;if(E==null){let b=Cr(404,{pathname:e.history.location.pathname}),{matches:k,route:A}=dy(s);E=k,p={[A.id]:b}}let f,v=E.some(b=>b.route.lazy),S=E.some(b=>b.route.loader);if(v)f=!1;else if(!S)f=!0;else if(u.v7_partialHydration){let b=e.hydrationData?e.hydrationData.loaderData:null,k=e.hydrationData?e.hydrationData.errors:null;f=E.every(A=>A.route.loader&&A.route.loader.hydrate!==!0&&(b&&b[A.route.id]!==void 0||k&&k[A.route.id]!==void 0))}else f=e.hydrationData!=null;let L,x={historyAction:e.history.action,location:e.history.location,matches:E,initialized:f,navigation:cf,restoreScrollPosition:e.hydrationData!=null?!1:null,preventScrollReset:!1,revalidation:"idle",loaderData:e.hydrationData&&e.hydrationData.loaderData||{},actionData:e.hydrationData&&e.hydrationData.actionData||null,errors:e.hydrationData&&e.hydrationData.errors||p,fetchers:new Map,blockers:new Map},N=rt.Pop,I=!1,W,te=!1,fe=new Map,Ct=null,Ze=!1,Et=!1,$r=[],oe=[],de=new Map,B=0,ee=-1,ne=new Map,xe=new Set,q=new Map,Ot=new Map,dt=new Set,Se=new Map,Tt=new Map,un=!1;function Ul(){if(c=e.history.listen(b=>{let{action:k,location:A,delta:V}=b;if(un){un=!1;return}uo(Tt.size===0||V!=null,"You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL.");let X=Ve({currentLocation:x.location,nextLocation:A,historyAction:k});if(X&&V!=null){un=!0,e.history.go(V*-1),Y(X,{state:"blocked",location:A,proceed(){Y(X,{state:"proceeding",proceed:void 0,reset:void 0,location:A}),e.history.go(V)},reset(){let pe=new Map(x.blockers);pe.set(X,ua),It({blockers:pe})}});return}return Hr(k,A)}),r){M5(t,fe);let b=()=>I5(t,fe);t.addEventListener("pagehide",b),Ct=()=>t.removeEventListener("pagehide",b)}return x.initialized||Hr(rt.Pop,x.location,{initialHydration:!0}),L}function qh(){c&&c(),Ct&&Ct(),h.clear(),W&&W.abort(),x.fetchers.forEach((b,k)=>So(k)),x.blockers.forEach((b,k)=>F(k))}function _r(b){return h.add(b),()=>h.delete(b)}function It(b,k){k===void 0&&(k={}),x=Je({},x,b);let A=[],V=[];u.v7_fetcherPersist&&x.fetchers.forEach((X,pe)=>{X.state==="idle"&&(dt.has(pe)?V.push(pe):A.push(pe))}),[...h].forEach(X=>X(x,{deletedFetchers:V,unstable_viewTransitionOpts:k.viewTransitionOpts,unstable_flushSync:k.flushSync===!0})),u.v7_fetcherPersist&&(A.forEach(X=>x.fetchers.delete(X)),V.forEach(X=>So(X)))}function kr(b,k,A){var V,X;let{flushSync:pe}=A===void 0?{}:A,ae=x.actionData!=null&&x.navigation.formMethod!=null&&Kr(x.navigation.formMethod)&&x.navigation.state==="loading"&&((V=b.state)==null?void 0:V._isRedirect)!==!0,le;k.actionData?Object.keys(k.actionData).length>0?le=k.actionData:le=null:ae?le=x.actionData:le=null;let ie=k.loaderData?hy(x.loaderData,k.loaderData,k.matches||[],k.errors):x.loaderData,ke=x.blockers;ke.size>0&&(ke=new Map(ke),ke.forEach((je,Pt)=>ke.set(Pt,ua)));let yt=I===!0||x.navigation.formMethod!=null&&Kr(x.navigation.formMethod)&&((X=b.state)==null?void 0:X._isRedirect)!==!0;a&&(s=a,a=void 0),Ze||N===rt.Pop||(N===rt.Push?e.history.push(b,b.state):N===rt.Replace&&e.history.replace(b,b.state));let ve;if(N===rt.Pop){let je=fe.get(x.location.pathname);je&&je.has(b.pathname)?ve={currentLocation:x.location,nextLocation:b}:fe.has(b.pathname)&&(ve={currentLocation:b,nextLocation:x.location})}else if(te){let je=fe.get(x.location.pathname);je?je.add(b.pathname):(je=new Set([b.pathname]),fe.set(x.location.pathname,je)),ve={currentLocation:x.location,nextLocation:b}}It(Je({},k,{actionData:le,loaderData:ie,historyAction:N,location:b,initialized:!0,navigation:cf,revalidation:"idle",restoreScrollPosition:K(b,k.matches||x.matches),preventScrollReset:yt,blockers:ke}),{viewTransitionOpts:ve,flushSync:pe===!0}),N=rt.Pop,I=!1,te=!1,Ze=!1,Et=!1,$r=[],oe=[]}async function Ws(b,k){if(typeof b=="number"){e.history.go(b);return}let A=Vp(x.location,x.matches,l,u.v7_prependBasename,b,u.v7_relativeSplatPath,k==null?void 0:k.fromRouteId,k==null?void 0:k.relative),{path:V,submission:X,error:pe}=oy(u.v7_normalizeFormMethod,!1,A,k),ae=x.location,le=yl(x.location,V,k&&k.state);le=Je({},le,e.history.encodeLocation(le));let ie=k&&k.replace!=null?k.replace:void 0,ke=rt.Push;ie===!0?ke=rt.Replace:ie===!1||X!=null&&Kr(X.formMethod)&&X.formAction===x.location.pathname+x.location.search&&(ke=rt.Replace);let yt=k&&"preventScrollReset"in k?k.preventScrollReset===!0:void 0,ve=(k&&k.unstable_flushSync)===!0,je=Ve({currentLocation:ae,nextLocation:le,historyAction:ke});if(je){Y(je,{state:"blocked",location:le,proceed(){Y(je,{state:"proceeding",proceed:void 0,reset:void 0,location:le}),Ws(b,k)},reset(){let Pt=new Map(x.blockers);Pt.set(je,ua),It({blockers:Pt})}});return}return await Hr(ke,le,{submission:X,pendingError:pe,preventScrollReset:yt,replace:k&&k.replace,enableViewTransition:k&&k.unstable_viewTransition,flushSync:ve})}function Wh(){if(Ks(),It({revalidation:"loading"}),x.navigation.state!=="submitting"){if(x.navigation.state==="idle"){Hr(x.historyAction,x.location,{startUninterruptedRevalidation:!0});return}Hr(N||x.historyAction,x.navigation.location,{overrideNavigation:x.navigation})}}async function Hr(b,k,A){W&&W.abort(),W=null,N=b,Ze=(A&&A.startUninterruptedRevalidation)===!0,Q(x.location,x.matches),I=(A&&A.preventScrollReset)===!0,te=(A&&A.enableViewTransition)===!0;let V=a||s,X=A&&A.overrideNavigation,pe=Zo(V,k,l),ae=(A&&A.flushSync)===!0;if(!pe){let Pt=Cr(404,{pathname:k.pathname}),{matches:Sr,route:bt}=dy(V);Ue(),kr(k,{matches:Sr,loaderData:{},errors:{[bt.id]:Pt}},{flushSync:ae});return}if(x.initialized&&!Et&&A5(x.location,k)&&!(A&&A.submission&&Kr(A.submission.formMethod))){kr(k,{matches:pe},{flushSync:ae});return}W=new AbortController;let le=ha(e.history,k,W.signal,A&&A.submission),ie,ke;if(A&&A.pendingError)ke={[Ia(pe).route.id]:A.pendingError};else if(A&&A.submission&&Kr(A.submission.formMethod)){let Pt=await ql(le,k,A.submission,pe,{replace:A.replace,flushSync:ae});if(Pt.shortCircuited)return;ie=Pt.pendingActionData,ke=Pt.pendingActionError,X=hf(k,A.submission),ae=!1,le=new Request(le.url,{signal:le.signal})}let{shortCircuited:yt,loaderData:ve,errors:je}=await Wl(le,k,pe,X,A&&A.submission,A&&A.fetcherSubmission,A&&A.replace,A&&A.initialHydration===!0,ae,ie,ke);yt||(W=null,kr(k,Je({matches:pe},ie?{actionData:ie}:{},{loaderData:ve,errors:je})))}async function ql(b,k,A,V,X){X===void 0&&(X={}),Ks();let pe=D5(k,A);It({navigation:pe},{flushSync:X.flushSync===!0});let ae,le=zp(V,k);if(!le.route.action&&!le.route.lazy)ae={type:Xe.error,error:Cr(405,{method:b.method,pathname:k.pathname,routeId:le.route.id})};else if(ae=await ca("action",b,le,V,o,i,l,u.v7_relativeSplatPath),b.signal.aborted)return{shortCircuited:!0};if(Hi(ae)){let ie;return X&&X.replace!=null?ie=X.replace:ie=ae.location===x.location.pathname+x.location.search,await Sn(x,ae,{submission:A,replace:ie}),{shortCircuited:!0}}if(Xo(ae)){let ie=Ia(V,le.route.id);return(X&&X.replace)!==!0&&(N=rt.Push),{pendingActionData:{},pendingActionError:{[ie.route.id]:ae.error}}}if(zi(ae))throw Cr(400,{type:"defer-action"});return{pendingActionData:{[le.route.id]:ae.data}}}async function Wl(b,k,A,V,X,pe,ae,le,ie,ke,yt){let ve=V||hf(k,X),je=X||pe||vy(ve),Pt=a||s,[Sr,bt]=sy(e.history,x,A,je,k,u.v7_partialHydration&&le===!0,Et,$r,oe,dt,q,xe,Pt,l,ke,yt);if(Ue(Ae=>!(A&&A.some(Be=>Be.route.id===Ae))||Sr&&Sr.some(Be=>Be.route.id===Ae)),ee=++B,Sr.length===0&&bt.length===0){let Ae=_();return kr(k,Je({matches:A,loaderData:{},errors:yt||null},ke?{actionData:ke}:{},Ae?{fetchers:new Map(x.fetchers)}:{}),{flushSync:ie}),{shortCircuited:!0}}if(!Ze&&(!u.v7_partialHydration||!le)){bt.forEach(Be=>{let dn=x.fetchers.get(Be.key),Yl=da(void 0,dn?dn.data:void 0);x.fetchers.set(Be.key,Yl)});let Ae=ke||x.actionData;It(Je({navigation:ve},Ae?Object.keys(Ae).length===0?{actionData:null}:{actionData:Ae}:{},bt.length>0?{fetchers:new Map(x.fetchers)}:{}),{flushSync:ie})}bt.forEach(Ae=>{de.has(Ae.key)&&hn(Ae.key),Ae.controller&&de.set(Ae.key,Ae.controller)});let Eo=()=>bt.forEach(Ae=>hn(Ae.key));W&&W.signal.addEventListener("abort",Eo);let{results:Gh,loaderResults:Oo,fetcherResults:Qn}=await Zl(x.matches,A,Sr,bt,b);if(b.signal.aborted)return{shortCircuited:!0};W&&W.signal.removeEventListener("abort",Eo),bt.forEach(Ae=>de.delete(Ae.key));let Ai=fy(Gh);if(Ai){if(Ai.idx>=Sr.length){let Ae=bt[Ai.idx-Sr.length].key;xe.add(Ae)}return await Sn(x,Ai.result,{replace:ae}),{shortCircuited:!0}}let{loaderData:Qh,errors:Zh}=cy(x,A,Sr,Oo,yt,bt,Qn,Se);Se.forEach((Ae,Be)=>{Ae.subscribe(dn=>{(dn||Ae.done)&&Se.delete(Be)})});let Xh=_(),To=O(ee),Xl=Xh||To||bt.length>0;return Je({loaderData:Qh,errors:Zh},Xl?{fetchers:new Map(x.fetchers)}:{})}function Kl(b,k,A,V){if(n)throw new Error("router.fetch() was called during the server render, but it shouldn't be. You are likely calling a useFetcher() method in the body of your component. Try moving it to a useEffect or a callback.");de.has(b)&&hn(b);let X=(V&&V.unstable_flushSync)===!0,pe=a||s,ae=Vp(x.location,x.matches,l,u.v7_prependBasename,A,u.v7_relativeSplatPath,k,V==null?void 0:V.relative),le=Zo(pe,ae,l);if(!le){Pi(b,k,Cr(404,{pathname:ae}),{flushSync:X});return}let{path:ie,submission:ke,error:yt}=oy(u.v7_normalizeFormMethod,!0,ae,V);if(yt){Pi(b,k,yt,{flushSync:X});return}let ve=zp(le,ie);if(I=(V&&V.preventScrollReset)===!0,ke&&Kr(ke.formMethod)){Gl(b,k,ie,ve,le,X,ke);return}q.set(b,{routeId:k,path:ie}),Ql(b,k,ie,ve,le,X,ke)}async function Gl(b,k,A,V,X,pe,ae){if(Ks(),q.delete(b),!V.route.action&&!V.route.lazy){let Be=Cr(405,{method:ae.formMethod,pathname:A,routeId:k});Pi(b,k,Be,{flushSync:pe});return}let le=x.fetchers.get(b);cn(b,R5(ae,le),{flushSync:pe});let ie=new AbortController,ke=ha(e.history,A,ie.signal,ae);de.set(b,ie);let yt=B,ve=await ca("action",ke,V,X,o,i,l,u.v7_relativeSplatPath);if(ke.signal.aborted){de.get(b)===ie&&de.delete(b);return}if(u.v7_fetcherPersist&&dt.has(b)){if(Hi(ve)||Xo(ve)){cn(b,Xn(void 0));return}}else{if(Hi(ve))if(de.delete(b),ee>yt){cn(b,Xn(void 0));return}else return xe.add(b),cn(b,da(ae)),Sn(x,ve,{fetcherSubmission:ae});if(Xo(ve)){Pi(b,k,ve.error);return}}if(zi(ve))throw Cr(400,{type:"defer-action"});let je=x.navigation.location||x.location,Pt=ha(e.history,je,ie.signal),Sr=a||s,bt=x.navigation.state!=="idle"?Zo(Sr,x.navigation.location,l):x.matches;ye(bt,"Didn't find any matches after fetcher action");let Eo=++B;ne.set(b,Eo);let Gh=da(ae,ve.data);x.fetchers.set(b,Gh);let[Oo,Qn]=sy(e.history,x,bt,ae,je,!1,Et,$r,oe,dt,q,xe,Sr,l,{[V.route.id]:ve.data},void 0);Qn.filter(Be=>Be.key!==b).forEach(Be=>{let dn=Be.key,Yl=x.fetchers.get(dn),k$=da(void 0,Yl?Yl.data:void 0);x.fetchers.set(dn,k$),de.has(dn)&&hn(dn),Be.controller&&de.set(dn,Be.controller)}),It({fetchers:new Map(x.fetchers)});let Ai=()=>Qn.forEach(Be=>hn(Be.key));ie.signal.addEventListener("abort",Ai);let{results:Qh,loaderResults:Zh,fetcherResults:Xh}=await Zl(x.matches,bt,Oo,Qn,Pt);if(ie.signal.aborted)return;ie.signal.removeEventListener("abort",Ai),ne.delete(b),de.delete(b),Qn.forEach(Be=>de.delete(Be.key));let To=fy(Qh);if(To){if(To.idx>=Oo.length){let Be=Qn[To.idx-Oo.length].key;xe.add(Be)}return Sn(x,To.result)}let{loaderData:Xl,errors:Ae}=cy(x,x.matches,Oo,Zh,void 0,Qn,Xh,Se);if(x.fetchers.has(b)){let Be=Xn(ve.data);x.fetchers.set(b,Be)}O(Eo),x.navigation.state==="loading"&&Eo>ee?(ye(N,"Expected pending action"),W&&W.abort(),kr(x.navigation.location,{matches:bt,loaderData:Xl,errors:Ae,fetchers:new Map(x.fetchers)})):(It({errors:Ae,loaderData:hy(x.loaderData,Xl,bt,Ae),fetchers:new Map(x.fetchers)}),Et=!1)}async function Ql(b,k,A,V,X,pe,ae){let le=x.fetchers.get(b);cn(b,da(ae,le?le.data:void 0),{flushSync:pe});let ie=new AbortController,ke=ha(e.history,A,ie.signal);de.set(b,ie);let yt=B,ve=await ca("loader",ke,V,X,o,i,l,u.v7_relativeSplatPath);if(zi(ve)&&(ve=await n$(ve,ke.signal,!0)||ve),de.get(b)===ie&&de.delete(b),!ke.signal.aborted){if(dt.has(b)){cn(b,Xn(void 0));return}if(Hi(ve))if(ee>yt){cn(b,Xn(void 0));return}else{xe.add(b),await Sn(x,ve);return}if(Xo(ve)){Pi(b,k,ve.error);return}ye(!zi(ve),"Unhandled fetcher deferred data"),cn(b,Xn(ve.data))}}async function Sn(b,k,A){let{submission:V,fetcherSubmission:X,replace:pe}=A===void 0?{}:A;k.revalidate&&(Et=!0);let ae=yl(b.location,k.location,{_isRedirect:!0});if(ye(ae,"Expected a location on the redirect navigation"),r){let je=!1;if(k.reloadDocument)je=!0;else if(Jw.test(k.location)){const Pt=e.history.createURL(k.location);je=Pt.origin!==t.location.origin||Hn(Pt.pathname,l)==null}if(je){pe?t.location.replace(k.location):t.location.assign(k.location);return}}W=null;let le=pe===!0?rt.Replace:rt.Push,{formMethod:ie,formAction:ke,formEncType:yt}=b.navigation;!V&&!X&&ie&&ke&&yt&&(V=vy(b.navigation));let ve=V||X;if(_5.has(k.status)&&ve&&Kr(ve.formMethod))await Hr(le,ae,{submission:Je({},ve,{formAction:k.location}),preventScrollReset:I});else{let je=hf(ae,V);await Hr(le,ae,{overrideNavigation:je,fetcherSubmission:X,preventScrollReset:I})}}async function Zl(b,k,A,V,X){let pe=await Promise.all([...A.map(ie=>ca("loader",X,ie,k,o,i,l,u.v7_relativeSplatPath)),...V.map(ie=>ie.matches&&ie.match&&ie.controller?ca("loader",ha(e.history,ie.path,ie.controller.signal),ie.match,ie.matches,o,i,l,u.v7_relativeSplatPath):{type:Xe.error,error:Cr(404,{pathname:ie.path})})]),ae=pe.slice(0,A.length),le=pe.slice(A.length);return await Promise.all([py(b,A,ae,ae.map(()=>X.signal),!1,x.loaderData),py(b,V.map(ie=>ie.match),le,V.map(ie=>ie.controller?ie.controller.signal:null),!0)]),{results:pe,loaderResults:ae,fetcherResults:le}}function Ks(){Et=!0,$r.push(...Ue()),q.forEach((b,k)=>{de.has(k)&&(oe.push(k),hn(k))})}function cn(b,k,A){A===void 0&&(A={}),x.fetchers.set(b,k),It({fetchers:new Map(x.fetchers)},{flushSync:(A&&A.flushSync)===!0})}function Pi(b,k,A,V){V===void 0&&(V={});let X=Ia(x.matches,k);So(b),It({errors:{[X.route.id]:A},fetchers:new Map(x.fetchers)},{flushSync:(V&&V.flushSync)===!0})}function Gn(b){return u.v7_fetcherPersist&&(Ot.set(b,(Ot.get(b)||0)+1),dt.has(b)&&dt.delete(b)),x.fetchers.get(b)||k5}function So(b){let k=x.fetchers.get(b);de.has(b)&&!(k&&k.state==="loading"&&ne.has(b))&&hn(b),q.delete(b),ne.delete(b),xe.delete(b),dt.delete(b),x.fetchers.delete(b)}function Kh(b){if(u.v7_fetcherPersist){let k=(Ot.get(b)||0)-1;k<=0?(Ot.delete(b),dt.add(b)):Ot.set(b,k)}else So(b);It({fetchers:new Map(x.fetchers)})}function hn(b){let k=de.get(b);ye(k,"Expected fetch controller: "+b),k.abort(),de.delete(b)}function Co(b){for(let k of b){let A=Gn(k),V=Xn(A.data);x.fetchers.set(k,V)}}function _(){let b=[],k=!1;for(let A of xe){let V=x.fetchers.get(A);ye(V,"Expected fetcher: "+A),V.state==="loading"&&(xe.delete(A),b.push(A),k=!0)}return Co(b),k}function O(b){let k=[];for(let[A,V]of ne)if(V<b){let X=x.fetchers.get(A);ye(X,"Expected fetcher: "+A),X.state==="loading"&&(hn(A),ne.delete(A),k.push(A))}return Co(k),k.length>0}function j(b,k){let A=x.blockers.get(b)||ua;return Tt.get(b)!==k&&Tt.set(b,k),A}function F(b){x.blockers.delete(b),Tt.delete(b)}function Y(b,k){let A=x.blockers.get(b)||ua;ye(A.state==="unblocked"&&k.state==="blocked"||A.state==="blocked"&&k.state==="blocked"||A.state==="blocked"&&k.state==="proceeding"||A.state==="blocked"&&k.state==="unblocked"||A.state==="proceeding"&&k.state==="unblocked","Invalid blocker state transition: "+A.state+" -> "+k.state);let V=new Map(x.blockers);V.set(b,k),It({blockers:V})}function Ve(b){let{currentLocation:k,nextLocation:A,historyAction:V}=b;if(Tt.size===0)return;Tt.size>1&&uo(!1,"A router only supports one blocker at a time");let X=Array.from(Tt.entries()),[pe,ae]=X[X.length-1],le=x.blockers.get(pe);if(!(le&&le.state==="proceeding")&&ae({currentLocation:k,nextLocation:A,historyAction:V}))return pe}function Ue(b){let k=[];return Se.forEach((A,V)=>{(!b||b(V))&&(A.cancel(),k.push(V),Se.delete(V))}),k}function me(b,k,A){if(d=b,y=k,m=A||null,!w&&x.navigation===cf){w=!0;let V=K(x.location,x.matches);V!=null&&It({restoreScrollPosition:V})}return()=>{d=null,y=null,m=null}}function H(b,k){return m&&m(b,k.map(A=>e5(A,x.loaderData)))||b.key}function Q(b,k){if(d&&y){let A=H(b,k);d[A]=y()}}function K(b,k){if(d){let A=H(b,k),V=d[A];if(typeof V=="number")return V}return null}function Z(b){o={},a=Ip(b,i,void 0,o)}return L={get basename(){return l},get future(){return u},get state(){return x},get routes(){return s},get window(){return t},initialize:Ul,subscribe:_r,enableScrollRestoration:me,navigate:Ws,fetch:Kl,revalidate:Wh,createHref:b=>e.history.createHref(b),encodeLocation:b=>e.history.encodeLocation(b),getFetcher:Gn,deleteFetcher:Kh,dispose:qh,getBlocker:j,deleteBlocker:F,_internalFetchControllers:de,_internalActiveDeferreds:Se,_internalSetRoutes:Z},L}function E5(e){return e!=null&&("formData"in e&&e.formData!=null||"body"in e&&e.body!==void 0)}function Vp(e,t,r,n,i,o,s,a){let l,u;if(s){l=[];for(let h of t)if(l.push(h),h.route.id===s){u=h;break}}else l=t,u=t[t.length-1];let c=Og(i||".",Eg(l,o),Hn(e.pathname,r)||e.pathname,a==="path");return i==null&&(c.search=e.search,c.hash=e.hash),(i==null||i===""||i===".")&&u&&u.route.index&&!Ag(c.search)&&(c.search=c.search?c.search.replace(/^\?/,"?index&"):"?index"),n&&r!=="/"&&(c.pathname=c.pathname==="/"?r:Rn([r,c.pathname])),co(c)}function oy(e,t,r,n){if(!n||!E5(n))return{path:r};if(n.formMethod&&!L5(n.formMethod))return{path:r,error:Cr(405,{method:n.formMethod})};let i=()=>({path:r,error:Cr(400,{type:"invalid-body"})}),o=n.formMethod||"get",s=e?o.toUpperCase():o.toLowerCase(),a=r$(r);if(n.body!==void 0){if(n.formEncType==="text/plain"){if(!Kr(s))return i();let d=typeof n.body=="string"?n.body:n.body instanceof FormData||n.body instanceof URLSearchParams?Array.from(n.body.entries()).reduce((m,y)=>{let[w,E]=y;return""+m+w+"="+E+`
`},""):String(n.body);return{path:r,submission:{formMethod:s,formAction:a,formEncType:n.formEncType,formData:void 0,json:void 0,text:d}}}else if(n.formEncType==="application/json"){if(!Kr(s))return i();try{let d=typeof n.body=="string"?JSON.parse(n.body):n.body;return{path:r,submission:{formMethod:s,formAction:a,formEncType:n.formEncType,formData:void 0,json:d,text:void 0}}}catch{return i()}}}ye(typeof FormData=="function","FormData is not available in this environment");let l,u;if(n.formData)l=Bp(n.formData),u=n.formData;else if(n.body instanceof FormData)l=Bp(n.body),u=n.body;else if(n.body instanceof URLSearchParams)l=n.body,u=uy(l);else if(n.body==null)l=new URLSearchParams,u=new FormData;else try{l=new URLSearchParams(n.body),u=uy(l)}catch{return i()}let c={formMethod:s,formAction:a,formEncType:n&&n.formEncType||"application/x-www-form-urlencoded",formData:u,json:void 0,text:void 0};if(Kr(c.formMethod))return{path:r,submission:c};let h=Kn(r);return t&&h.search&&Ag(h.search)&&l.append("index",""),h.search="?"+l,{path:co(h),submission:c}}function O5(e,t){let r=e;if(t){let n=e.findIndex(i=>i.route.id===t);n>=0&&(r=e.slice(0,n))}return r}function sy(e,t,r,n,i,o,s,a,l,u,c,h,d,m,y,w){let E=w?Object.values(w)[0]:y?Object.values(y)[0]:void 0,p=e.createURL(t.location),f=e.createURL(i),v=w?Object.keys(w)[0]:void 0,S=O5(r,v).filter((x,N)=>{let{route:I}=x;if(I.lazy)return!0;if(I.loader==null)return!1;if(o)return I.loader.hydrate?!0:t.loaderData[I.id]===void 0&&(!t.errors||t.errors[I.id]===void 0);if(T5(t.loaderData,t.matches[N],x)||a.some(fe=>fe===x.route.id))return!0;let W=t.matches[N],te=x;return ay(x,Je({currentUrl:p,currentParams:W.params,nextUrl:f,nextParams:te.params},n,{actionResult:E,defaultShouldRevalidate:s||p.pathname+p.search===f.pathname+f.search||p.search!==f.search||t$(W,te)}))}),L=[];return c.forEach((x,N)=>{if(o||!r.some(Ct=>Ct.route.id===x.routeId)||u.has(N))return;let I=Zo(d,x.path,m);if(!I){L.push({key:N,routeId:x.routeId,path:x.path,matches:null,match:null,controller:null});return}let W=t.fetchers.get(N),te=zp(I,x.path),fe=!1;h.has(N)?fe=!1:l.includes(N)?fe=!0:W&&W.state!=="idle"&&W.data===void 0?fe=s:fe=ay(te,Je({currentUrl:p,currentParams:t.matches[t.matches.length-1].params,nextUrl:f,nextParams:r[r.length-1].params},n,{actionResult:E,defaultShouldRevalidate:s})),fe&&L.push({key:N,routeId:x.routeId,path:x.path,matches:I,match:te,controller:new AbortController})}),[S,L]}function T5(e,t,r){let n=!t||r.route.id!==t.route.id,i=e[r.route.id]===void 0;return n||i}function t$(e,t){let r=e.route.path;return e.pathname!==t.pathname||r!=null&&r.endsWith("*")&&e.params["*"]!==t.params["*"]}function ay(e,t){if(e.route.shouldRevalidate){let r=e.route.shouldRevalidate(t);if(typeof r=="boolean")return r}return t.defaultShouldRevalidate}async function ly(e,t,r){if(!e.lazy)return;let n=await e.lazy();if(!e.lazy)return;let i=r[e.id];ye(i,"No route found in manifest");let o={};for(let s in n){let a=i[s]!==void 0&&s!=="hasErrorBoundary";uo(!a,'Route "'+i.id+'" has a static property "'+s+'" defined but its lazy function is also returning a value for this property. '+('The lazy route property "'+s+'" will be ignored.')),!a&&!Y4.has(s)&&(o[s]=n[s])}Object.assign(i,o),Object.assign(i,Je({},t(i),{lazy:void 0}))}async function ca(e,t,r,n,i,o,s,a,l){l===void 0&&(l={});let u,c,h,d=w=>{let E,p=new Promise((f,v)=>E=v);return h=()=>E(),t.signal.addEventListener("abort",h),Promise.race([w({request:t,params:r.params,context:l.requestContext}),p])};try{let w=r.route[e];if(r.route.lazy)if(w){let E,p=await Promise.all([d(w).catch(f=>{E=f}),ly(r.route,o,i)]);if(E)throw E;c=p[0]}else if(await ly(r.route,o,i),w=r.route[e],w)c=await d(w);else if(e==="action"){let E=new URL(t.url),p=E.pathname+E.search;throw Cr(405,{method:t.method,pathname:p,routeId:r.route.id})}else return{type:Xe.data,data:void 0};else if(w)c=await d(w);else{let E=new URL(t.url),p=E.pathname+E.search;throw Cr(404,{pathname:p})}ye(c!==void 0,"You defined "+(e==="action"?"an action":"a loader")+" for route "+('"'+r.route.id+"\" but didn't return anything from your `"+e+"` ")+"function. Please return a value or `null`.")}catch(w){u=Xe.error,c=w}finally{h&&t.signal.removeEventListener("abort",h)}if(N5(c)){let w=c.status;if($5.has(w)){let p=c.headers.get("Location");if(ye(p,"Redirects returned/thrown from loaders/actions must have a Location header"),!Jw.test(p))p=Vp(new URL(t.url),n.slice(0,n.indexOf(r)+1),s,!0,p,a);else if(!l.isStaticRequest){let f=new URL(t.url),v=p.startsWith("//")?new URL(f.protocol+p):new URL(p),S=Hn(v.pathname,s)!=null;v.origin===f.origin&&S&&(p=v.pathname+v.search+v.hash)}if(l.isStaticRequest)throw c.headers.set("Location",p),c;return{type:Xe.redirect,status:w,location:p,revalidate:c.headers.get("X-Remix-Revalidate")!==null,reloadDocument:c.headers.get("X-Remix-Reload-Document")!==null}}if(l.isRouteRequest)throw{type:u===Xe.error?Xe.error:Xe.data,response:c};let E;try{let p=c.headers.get("Content-Type");p&&/\bapplication\/json\b/.test(p)?c.body==null?E=null:E=await c.json():E=await c.text()}catch(p){return{type:Xe.error,error:p}}return u===Xe.error?{type:u,error:new Tg(w,c.statusText,E),headers:c.headers}:{type:Xe.data,data:E,statusCode:c.status,headers:c.headers}}if(u===Xe.error)return{type:u,error:c};if(j5(c)){var m,y;return{type:Xe.deferred,deferredData:c,statusCode:(m=c.init)==null?void 0:m.status,headers:((y=c.init)==null?void 0:y.headers)&&new Headers(c.init.headers)}}return{type:Xe.data,data:c}}function ha(e,t,r,n){let i=e.createURL(r$(t)).toString(),o={signal:r};if(n&&Kr(n.formMethod)){let{formMethod:s,formEncType:a}=n;o.method=s.toUpperCase(),a==="application/json"?(o.headers=new Headers({"Content-Type":a}),o.body=JSON.stringify(n.json)):a==="text/plain"?o.body=n.text:a==="application/x-www-form-urlencoded"&&n.formData?o.body=Bp(n.formData):o.body=n.formData}return new Request(i,o)}function Bp(e){let t=new URLSearchParams;for(let[r,n]of e.entries())t.append(r,typeof n=="string"?n:n.name);return t}function uy(e){let t=new FormData;for(let[r,n]of e.entries())t.append(r,n);return t}function P5(e,t,r,n,i){let o={},s=null,a,l=!1,u={};return r.forEach((c,h)=>{let d=t[h].route.id;if(ye(!Hi(c),"Cannot handle redirect results in processLoaderData"),Xo(c)){let m=Ia(e,d),y=c.error;n&&(y=Object.values(n)[0],n=void 0),s=s||{},s[m.route.id]==null&&(s[m.route.id]=y),o[d]=void 0,l||(l=!0,a=Pg(c.error)?c.error.status:500),c.headers&&(u[d]=c.headers)}else zi(c)?(i.set(d,c.deferredData),o[d]=c.deferredData.data):o[d]=c.data,c.statusCode!=null&&c.statusCode!==200&&!l&&(a=c.statusCode),c.headers&&(u[d]=c.headers)}),n&&(s=n,o[Object.keys(n)[0]]=void 0),{loaderData:o,errors:s,statusCode:a||200,loaderHeaders:u}}function cy(e,t,r,n,i,o,s,a){let{loaderData:l,errors:u}=P5(t,r,n,i,a);for(let c=0;c<o.length;c++){let{key:h,match:d,controller:m}=o[c];ye(s!==void 0&&s[c]!==void 0,"Did not find corresponding fetcher result");let y=s[c];if(!(m&&m.signal.aborted))if(Xo(y)){let w=Ia(e.matches,d==null?void 0:d.route.id);u&&u[w.route.id]||(u=Je({},u,{[w.route.id]:y.error})),e.fetchers.delete(h)}else if(Hi(y))ye(!1,"Unhandled fetcher revalidation redirect");else if(zi(y))ye(!1,"Unhandled fetcher deferred data");else{let w=Xn(y.data);e.fetchers.set(h,w)}}return{loaderData:l,errors:u}}function hy(e,t,r,n){let i=Je({},t);for(let o of r){let s=o.route.id;if(t.hasOwnProperty(s)?t[s]!==void 0&&(i[s]=t[s]):e[s]!==void 0&&o.route.loader&&(i[s]=e[s]),n&&n.hasOwnProperty(s))break}return i}function Ia(e,t){return(t?e.slice(0,e.findIndex(r=>r.route.id===t)+1):[...e]).reverse().find(r=>r.route.hasErrorBoundary===!0)||e[0]}function dy(e){let t=e.length===1?e[0]:e.find(r=>r.index||!r.path||r.path==="/")||{id:"__shim-error-route__"};return{matches:[{params:{},pathname:"",pathnameBase:"",route:t}],route:t}}function Cr(e,t){let{pathname:r,routeId:n,method:i,type:o}=t===void 0?{}:t,s="Unknown Server Error",a="Unknown @remix-run/router error";return e===400?(s="Bad Request",i&&r&&n?a="You made a "+i+' request to "'+r+'" but '+('did not provide a `loader` for route "'+n+'", ')+"so there is no way to handle the request.":o==="defer-action"?a="defer() is not supported in actions":o==="invalid-body"&&(a="Unable to encode submission body")):e===403?(s="Forbidden",a='Route "'+n+'" does not match URL "'+r+'"'):e===404?(s="Not Found",a='No route matches URL "'+r+'"'):e===405&&(s="Method Not Allowed",i&&r&&n?a="You made a "+i.toUpperCase()+' request to "'+r+'" but '+('did not provide an `action` for route "'+n+'", ')+"so there is no way to handle the request.":i&&(a='Invalid request method "'+i.toUpperCase()+'"')),new Tg(e||500,s,new Error(a),!0)}function fy(e){for(let t=e.length-1;t>=0;t--){let r=e[t];if(Hi(r))return{result:r,idx:t}}}function r$(e){let t=typeof e=="string"?Kn(e):e;return co(Je({},t,{hash:""}))}function A5(e,t){return e.pathname!==t.pathname||e.search!==t.search?!1:e.hash===""?t.hash!=="":e.hash===t.hash?!0:t.hash!==""}function zi(e){return e.type===Xe.deferred}function Xo(e){return e.type===Xe.error}function Hi(e){return(e&&e.type)===Xe.redirect}function j5(e){let t=e;return t&&typeof t=="object"&&typeof t.data=="object"&&typeof t.subscribe=="function"&&typeof t.cancel=="function"&&typeof t.resolveData=="function"}function N5(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.headers=="object"&&typeof e.body<"u"}function L5(e){return w5.has(e.toLowerCase())}function Kr(e){return b5.has(e.toLowerCase())}async function py(e,t,r,n,i,o){for(let s=0;s<r.length;s++){let a=r[s],l=t[s];if(!l)continue;let u=e.find(h=>h.route.id===l.route.id),c=u!=null&&!t$(u,l)&&(o&&o[l.route.id])!==void 0;if(zi(a)&&(i||c)){let h=n[s];ye(h,"Expected an AbortSignal for revalidating fetcher deferred result"),await n$(a,h,i).then(d=>{d&&(r[s]=d||r[s])})}}}async function n$(e,t,r){if(r===void 0&&(r=!1),!await e.deferredData.resolveData(t)){if(r)try{return{type:Xe.data,data:e.deferredData.unwrappedData}}catch(n){return{type:Xe.error,error:n}}return{type:Xe.data,data:e.deferredData.data}}}function Ag(e){return new URLSearchParams(e).getAll("index").some(t=>t==="")}function zp(e,t){let r=typeof t=="string"?Kn(t).search:t.search;if(e[e.length-1].route.index&&Ag(r||""))return e[e.length-1];let n=Xw(e);return n[n.length-1]}function vy(e){let{formMethod:t,formAction:r,formEncType:n,text:i,formData:o,json:s}=e;if(!(!t||!r||!n)){if(i!=null)return{formMethod:t,formAction:r,formEncType:n,formData:void 0,json:void 0,text:i};if(o!=null)return{formMethod:t,formAction:r,formEncType:n,formData:o,json:void 0,text:void 0};if(s!==void 0)return{formMethod:t,formAction:r,formEncType:n,formData:void 0,json:s,text:void 0}}}function hf(e,t){return t?{state:"loading",location:e,formMethod:t.formMethod,formAction:t.formAction,formEncType:t.formEncType,formData:t.formData,json:t.json,text:t.text}:{state:"loading",location:e,formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,json:void 0,text:void 0}}function D5(e,t){return{state:"submitting",location:e,formMethod:t.formMethod,formAction:t.formAction,formEncType:t.formEncType,formData:t.formData,json:t.json,text:t.text}}function da(e,t){return e?{state:"loading",formMethod:e.formMethod,formAction:e.formAction,formEncType:e.formEncType,formData:e.formData,json:e.json,text:e.text,data:t}:{state:"loading",formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,json:void 0,text:void 0,data:t}}function R5(e,t){return{state:"submitting",formMethod:e.formMethod,formAction:e.formAction,formEncType:e.formEncType,formData:e.formData,json:e.json,text:e.text,data:t?t.data:void 0}}function Xn(e){return{state:"idle",formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,json:void 0,text:void 0,data:e}}function M5(e,t){try{let r=e.sessionStorage.getItem(e$);if(r){let n=JSON.parse(r);for(let[i,o]of Object.entries(n||{}))o&&Array.isArray(o)&&t.set(i,new Set(o||[]))}}catch{}}function I5(e,t){if(t.size>0){let r={};for(let[n,i]of t)r[n]=[...i];try{e.sessionStorage.setItem(e$,JSON.stringify(r))}catch(n){uo(!1,"Failed to save applied view transitions in sessionStorage ("+n+").")}}}/**
 * React Router v6.21.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function bl(){return bl=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},bl.apply(this,arguments)}const Bl=P.createContext(null),jg=P.createContext(null),Oi=P.createContext(null),zh=P.createContext(null),Ti=P.createContext({outlet:null,matches:[],isDataRoute:!1}),i$=P.createContext(null);function F5(e,t){let{relative:r}=t===void 0?{}:t;zl()||ye(!1);let{basename:n,navigator:i}=P.useContext(Oi),{hash:o,pathname:s,search:a}=Hh(e,{relative:r}),l=s;return n!=="/"&&(l=s==="/"?n:Rn([n,s])),i.createHref({pathname:l,search:a,hash:o})}function zl(){return P.useContext(zh)!=null}function Hl(){return zl()||ye(!1),P.useContext(zh).location}function o$(e){P.useContext(Oi).static||P.useLayoutEffect(e)}function s$(){let{isDataRoute:e}=P.useContext(Ti);return e?Y5():V5()}function V5(){zl()||ye(!1);let e=P.useContext(Bl),{basename:t,future:r,navigator:n}=P.useContext(Oi),{matches:i}=P.useContext(Ti),{pathname:o}=Hl(),s=JSON.stringify(Eg(i,r.v7_relativeSplatPath)),a=P.useRef(!1);return o$(()=>{a.current=!0}),P.useCallback(function(l,u){if(u===void 0&&(u={}),!a.current)return;if(typeof l=="number"){n.go(l);return}let c=Og(l,JSON.parse(s),o,u.relative==="path");e==null&&t!=="/"&&(c.pathname=c.pathname==="/"?t:Rn([t,c.pathname])),(u.replace?n.replace:n.push)(c,u.state,u)},[t,n,s,o,e])}const B5=P.createContext(null);function z5(e){let t=P.useContext(Ti).outlet;return t&&P.createElement(B5.Provider,{value:e},t)}function Hh(e,t){let{relative:r}=t===void 0?{}:t,{future:n}=P.useContext(Oi),{matches:i}=P.useContext(Ti),{pathname:o}=Hl(),s=JSON.stringify(Eg(i,n.v7_relativeSplatPath));return P.useMemo(()=>Og(e,JSON.parse(s),o,r==="path"),[e,s,o,r])}function H5(e,t,r,n){zl()||ye(!1);let{navigator:i}=P.useContext(Oi),{matches:o}=P.useContext(Ti),s=o[o.length-1],a=s?s.params:{};s&&s.pathname;let l=s?s.pathnameBase:"/";s&&s.route;let u=Hl(),c;if(t){var h;let E=typeof t=="string"?Kn(t):t;l==="/"||(h=E.pathname)!=null&&h.startsWith(l)||ye(!1),c=E}else c=u;let d=c.pathname||"/",m=l==="/"?d:d.slice(l.length)||"/",y=Zo(e,{pathname:m}),w=G5(y&&y.map(E=>Object.assign({},E,{params:Object.assign({},a,E.params),pathname:Rn([l,i.encodeLocation?i.encodeLocation(E.pathname).pathname:E.pathname]),pathnameBase:E.pathnameBase==="/"?l:Rn([l,i.encodeLocation?i.encodeLocation(E.pathnameBase).pathname:E.pathnameBase])})),o,r,n);return t&&w?P.createElement(zh.Provider,{value:{location:bl({pathname:"/",search:"",hash:"",state:null,key:"default"},c),navigationType:rt.Pop}},w):w}function U5(){let e=u$(),t=Pg(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),r=e instanceof Error?e.stack:null,n="rgba(200,200,200, 0.5)",i={padding:"0.5rem",backgroundColor:n};return P.createElement(P.Fragment,null,P.createElement("h2",null,"Unexpected Application Error!"),P.createElement("h3",{style:{fontStyle:"italic"}},t),r?P.createElement("pre",{style:i},r):null,null)}const q5=P.createElement(U5,null);class W5 extends P.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,r){return r.location!==t.location||r.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error!==void 0?t.error:r.error,location:r.location,revalidation:t.revalidation||r.revalidation}}componentDidCatch(t,r){console.error("React Router caught the following error during render",t,r)}render(){return this.state.error!==void 0?P.createElement(Ti.Provider,{value:this.props.routeContext},P.createElement(i$.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function K5(e){let{routeContext:t,match:r,children:n}=e,i=P.useContext(Bl);return i&&i.static&&i.staticContext&&(r.route.errorElement||r.route.ErrorBoundary)&&(i.staticContext._deepestRenderedBoundaryId=r.route.id),P.createElement(Ti.Provider,{value:t},n)}function G5(e,t,r,n){var i;if(t===void 0&&(t=[]),r===void 0&&(r=null),n===void 0&&(n=null),e==null){var o;if((o=r)!=null&&o.errors)e=r.matches;else return null}let s=e,a=(i=r)==null?void 0:i.errors;if(a!=null){let c=s.findIndex(h=>h.route.id&&(a==null?void 0:a[h.route.id]));c>=0||ye(!1),s=s.slice(0,Math.min(s.length,c+1))}let l=!1,u=-1;if(r&&n&&n.v7_partialHydration)for(let c=0;c<s.length;c++){let h=s[c];if((h.route.HydrateFallback||h.route.hydrateFallbackElement)&&(u=c),h.route.id){let{loaderData:d,errors:m}=r,y=h.route.loader&&d[h.route.id]===void 0&&(!m||m[h.route.id]===void 0);if(h.route.lazy||y){l=!0,u>=0?s=s.slice(0,u+1):s=[s[0]];break}}}return s.reduceRight((c,h,d)=>{let m,y=!1,w=null,E=null;r&&(m=a&&h.route.id?a[h.route.id]:void 0,w=h.route.errorElement||q5,l&&(u<0&&d===0?(J5("route-fallback",!1),y=!0,E=null):u===d&&(y=!0,E=h.route.hydrateFallbackElement||null)));let p=t.concat(s.slice(0,d+1)),f=()=>{let v;return m?v=w:y?v=E:h.route.Component?v=P.createElement(h.route.Component,null):h.route.element?v=h.route.element:v=c,P.createElement(K5,{match:h,routeContext:{outlet:c,matches:p,isDataRoute:r!=null},children:v})};return r&&(h.route.ErrorBoundary||h.route.errorElement||d===0)?P.createElement(W5,{location:r.location,revalidation:r.revalidation,component:w,error:m,children:f(),routeContext:{outlet:null,matches:p,isDataRoute:!0}}):f()},null)}var a$=function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}(a$||{}),Ic=function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}(Ic||{});function Q5(e){let t=P.useContext(Bl);return t||ye(!1),t}function Z5(e){let t=P.useContext(jg);return t||ye(!1),t}function X5(e){let t=P.useContext(Ti);return t||ye(!1),t}function l$(e){let t=X5(),r=t.matches[t.matches.length-1];return r.route.id||ye(!1),r.route.id}function u$(){var e;let t=P.useContext(i$),r=Z5(Ic.UseRouteError),n=l$(Ic.UseRouteError);return t!==void 0?t:(e=r.errors)==null?void 0:e[n]}function Y5(){let{router:e}=Q5(a$.UseNavigateStable),t=l$(Ic.UseNavigateStable),r=P.useRef(!1);return o$(()=>{r.current=!0}),P.useCallback(function(n,i){i===void 0&&(i={}),r.current&&(typeof n=="number"?e.navigate(n):e.navigate(n,bl({fromRouteId:t},i)))},[e,t])}const gy={};function J5(e,t,r){!t&&!gy[e]&&(gy[e]=!0)}function eT(e){return z5(e.context)}function tT(e){let{basename:t="/",children:r=null,location:n,navigationType:i=rt.Pop,navigator:o,static:s=!1,future:a}=e;zl()&&ye(!1);let l=t.replace(/^\/*/,"/"),u=P.useMemo(()=>({basename:l,navigator:o,static:s,future:bl({v7_relativeSplatPath:!1},a)}),[l,a,o,s]);typeof n=="string"&&(n=Kn(n));let{pathname:c="/",search:h="",hash:d="",state:m=null,key:y="default"}=n,w=P.useMemo(()=>{let E=Hn(c,l);return E==null?null:{location:{pathname:E,search:h,hash:d,state:m,key:y},navigationType:i}},[l,c,h,d,m,y,i]);return w==null?null:P.createElement(Oi.Provider,{value:u},P.createElement(zh.Provider,{children:r,value:w}))}new Promise(()=>{});function rT(e){let t={hasErrorBoundary:e.ErrorBoundary!=null||e.errorElement!=null};return e.Component&&Object.assign(t,{element:P.createElement(e.Component),Component:void 0}),e.HydrateFallback&&Object.assign(t,{hydrateFallbackElement:P.createElement(e.HydrateFallback),HydrateFallback:void 0}),e.ErrorBoundary&&Object.assign(t,{errorElement:P.createElement(e.ErrorBoundary),ErrorBoundary:void 0}),t}/**
 * React Router DOM v6.21.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Es(){return Es=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},Es.apply(this,arguments)}function c$(e,t){if(e==null)return{};var r={},n=Object.keys(e),i,o;for(o=0;o<n.length;o++)i=n[o],!(t.indexOf(i)>=0)&&(r[i]=e[i]);return r}function nT(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function iT(e,t){return e.button===0&&(!t||t==="_self")&&!nT(e)}const oT=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","unstable_viewTransition"],sT=["aria-current","caseSensitive","className","end","style","to","unstable_viewTransition","children"];function aT(e,t){return C5({basename:t==null?void 0:t.basename,future:Es({},t==null?void 0:t.future,{v7_prependBasename:!0}),history:Q4({window:t==null?void 0:t.window}),hydrationData:(t==null?void 0:t.hydrationData)||lT(),routes:e,mapRouteProperties:rT,window:t==null?void 0:t.window}).initialize()}function lT(){var e;let t=(e=window)==null?void 0:e.__staticRouterHydrationData;return t&&t.errors&&(t=Es({},t,{errors:uT(t.errors)})),t}function uT(e){if(!e)return null;let t=Object.entries(e),r={};for(let[n,i]of t)if(i&&i.__type==="RouteErrorResponse")r[n]=new Tg(i.status,i.statusText,i.data,i.internal===!0);else if(i&&i.__type==="Error"){if(i.__subType){let o=window[i.__subType];if(typeof o=="function")try{let s=new o(i.message);s.stack="",r[n]=s}catch{}}if(r[n]==null){let o=new Error(i.message);o.stack="",r[n]=o}}else r[n]=i;return r}const h$=P.createContext({isTransitioning:!1}),cT=P.createContext(new Map),hT="startTransition",my=V$[hT],dT="flushSync",yy=Zk[dT];function fT(e){my?my(e):e()}function fa(e){yy?yy(e):e()}class pT{constructor(){this.status="pending",this.promise=new Promise((t,r)=>{this.resolve=n=>{this.status==="pending"&&(this.status="resolved",t(n))},this.reject=n=>{this.status==="pending"&&(this.status="rejected",r(n))}})}}function vT(e){let{fallbackElement:t,router:r,future:n}=e,[i,o]=P.useState(r.state),[s,a]=P.useState(),[l,u]=P.useState({isTransitioning:!1}),[c,h]=P.useState(),[d,m]=P.useState(),[y,w]=P.useState(),E=P.useRef(new Map),{v7_startTransition:p}=n||{},f=P.useCallback(N=>{p?fT(N):N()},[p]),v=P.useCallback((N,I)=>{let{deletedFetchers:W,unstable_flushSync:te,unstable_viewTransitionOpts:fe}=I;W.forEach(Ze=>E.current.delete(Ze)),N.fetchers.forEach((Ze,Et)=>{Ze.data!==void 0&&E.current.set(Et,Ze.data)});let Ct=r.window==null||typeof r.window.document.startViewTransition!="function";if(!fe||Ct){te?fa(()=>o(N)):f(()=>o(N));return}if(te){fa(()=>{d&&(c&&c.resolve(),d.skipTransition()),u({isTransitioning:!0,flushSync:!0,currentLocation:fe.currentLocation,nextLocation:fe.nextLocation})});let Ze=r.window.document.startViewTransition(()=>{fa(()=>o(N))});Ze.finished.finally(()=>{fa(()=>{h(void 0),m(void 0),a(void 0),u({isTransitioning:!1})})}),fa(()=>m(Ze));return}d?(c&&c.resolve(),d.skipTransition(),w({state:N,currentLocation:fe.currentLocation,nextLocation:fe.nextLocation})):(a(N),u({isTransitioning:!0,flushSync:!1,currentLocation:fe.currentLocation,nextLocation:fe.nextLocation}))},[r.window,d,c,E,f]);P.useLayoutEffect(()=>r.subscribe(v),[r,v]),P.useEffect(()=>{l.isTransitioning&&!l.flushSync&&h(new pT)},[l]),P.useEffect(()=>{if(c&&s&&r.window){let N=s,I=c.promise,W=r.window.document.startViewTransition(async()=>{f(()=>o(N)),await I});W.finished.finally(()=>{h(void 0),m(void 0),a(void 0),u({isTransitioning:!1})}),m(W)}},[f,s,c,r.window]),P.useEffect(()=>{c&&s&&i.location.key===s.location.key&&c.resolve()},[c,d,i.location,s]),P.useEffect(()=>{!l.isTransitioning&&y&&(a(y.state),u({isTransitioning:!0,flushSync:!1,currentLocation:y.currentLocation,nextLocation:y.nextLocation}),w(void 0))},[l.isTransitioning,y]),P.useEffect(()=>{},[]);let S=P.useMemo(()=>({createHref:r.createHref,encodeLocation:r.encodeLocation,go:N=>r.navigate(N),push:(N,I,W)=>r.navigate(N,{state:I,preventScrollReset:W==null?void 0:W.preventScrollReset}),replace:(N,I,W)=>r.navigate(N,{replace:!0,state:I,preventScrollReset:W==null?void 0:W.preventScrollReset})}),[r]),L=r.basename||"/",x=P.useMemo(()=>({router:r,navigator:S,static:!1,basename:L}),[r,S,L]);return P.createElement(P.Fragment,null,P.createElement(Bl.Provider,{value:x},P.createElement(jg.Provider,{value:i},P.createElement(cT.Provider,{value:E.current},P.createElement(h$.Provider,{value:l},P.createElement(tT,{basename:L,location:i.location,navigationType:i.historyAction,navigator:S,future:{v7_relativeSplatPath:r.future.v7_relativeSplatPath}},i.initialized||r.future.v7_partialHydration?P.createElement(gT,{routes:r.routes,future:r.future,state:i}):t))))),null)}function gT(e){let{routes:t,future:r,state:n}=e;return H5(t,void 0,n,r)}const mT=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",yT=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Hp=P.forwardRef(function(e,t){let{onClick:r,relative:n,reloadDocument:i,replace:o,state:s,target:a,to:l,preventScrollReset:u,unstable_viewTransition:c}=e,h=c$(e,oT),{basename:d}=P.useContext(Oi),m,y=!1;if(typeof l=="string"&&yT.test(l)&&(m=l,mT))try{let f=new URL(window.location.href),v=l.startsWith("//")?new URL(f.protocol+l):new URL(l),S=Hn(v.pathname,d);v.origin===f.origin&&S!=null?l=S+v.search+v.hash:y=!0}catch{}let w=F5(l,{relative:n}),E=xT(l,{replace:o,state:s,target:a,preventScrollReset:u,relative:n,unstable_viewTransition:c});function p(f){r&&r(f),f.defaultPrevented||E(f)}return P.createElement("a",Es({},h,{href:m||w,onClick:y||i?r:p,ref:t,target:a}))}),by=P.forwardRef(function(e,t){let{"aria-current":r="page",caseSensitive:n=!1,className:i="",end:o=!1,style:s,to:a,unstable_viewTransition:l,children:u}=e,c=c$(e,sT),h=Hh(a,{relative:c.relative}),d=Hl(),m=P.useContext(jg),{navigator:y,basename:w}=P.useContext(Oi),E=m!=null&&wT(h)&&l===!0,p=y.encodeLocation?y.encodeLocation(h).pathname:h.pathname,f=d.pathname,v=m&&m.navigation&&m.navigation.location?m.navigation.location.pathname:null;n||(f=f.toLowerCase(),v=v?v.toLowerCase():null,p=p.toLowerCase()),v&&w&&(v=Hn(v,w)||v);const S=p!=="/"&&p.endsWith("/")?p.length-1:p.length;let L=f===p||!o&&f.startsWith(p)&&f.charAt(S)==="/",x=v!=null&&(v===p||!o&&v.startsWith(p)&&v.charAt(p.length)==="/"),N={isActive:L,isPending:x,isTransitioning:E},I=L?r:void 0,W;typeof i=="function"?W=i(N):W=[i,L?"active":null,x?"pending":null,E?"transitioning":null].filter(Boolean).join(" ");let te=typeof s=="function"?s(N):s;return P.createElement(Hp,Es({},c,{"aria-current":I,className:W,ref:t,style:te,to:a,unstable_viewTransition:l}),typeof u=="function"?u(N):u)});var Up;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(Up||(Up={}));var xy;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(xy||(xy={}));function bT(e){let t=P.useContext(Bl);return t||ye(!1),t}function xT(e,t){let{target:r,replace:n,state:i,preventScrollReset:o,relative:s,unstable_viewTransition:a}=t===void 0?{}:t,l=s$(),u=Hl(),c=Hh(e,{relative:s});return P.useCallback(h=>{if(iT(h,r)){h.preventDefault();let d=n!==void 0?n:co(u)===co(c);l(e,{replace:d,state:i,preventScrollReset:o,relative:s,unstable_viewTransition:a})}},[u,l,c,n,i,r,e,o,s,a])}function wT(e,t){t===void 0&&(t={});let r=P.useContext(h$);r==null&&ye(!1);let{basename:n}=bT(Up.useViewTransitionState),i=Hh(e,{relative:t.relative});if(!r.isTransitioning)return!1;let o=Hn(r.currentLocation.pathname,n)||r.currentLocation.pathname,s=Hn(r.nextLocation.pathname,n)||r.nextLocation.pathname;return Fp(i.pathname,s)!=null||Fp(i.pathname,o)!=null}class $T{constructor(){$(this,"logo"),$(this,"title","IYULAB APP"),Hs(this)}initAppInfo(t,r){this.logo=r,this.title=t??this.title}}class d${constructor(){$(this,"menuItems",[]),Hs(this)}get menus(){return this.menuItems}initMenu(t,r){this.menuItems=this.resolvePath(t,r)}resolvePath(t,r){return t.map(n=>{if(n.type==="single"){const i=r.get(n.key);return i&&!n.path&&(n.path=i),n}else return n.type==="group"&&(n.subMenu=n.subMenu.map(i=>{const o=r.get(i.key);return o&&!i.path&&(i.path=o),i})),n})}}var Fc;(function(e){e[e.Tablet=768]="Tablet",e[e.Small=1100]="Small",e[e.Medium=1300]="Medium",e[e.Large=1500]="Large"})(Fc||(Fc={}));var fr;(function(e){e[e.dark=0]="dark",e[e.light=1]="light"})(fr||(fr={}));class f${constructor(){$(this,"_title","IYULAB APP"),$(this,"_logo"),$(this,"_theme",fr.light),$(this,"_isMediumScreen",window.innerWidth<Fc.Medium),Hs(this),window.addEventListener("resize",this.onWindowResized.bind(this)),this._theme=localStorage.theme==="dark"?fr.dark:fr.light,this.updateTheme(this.theme)}get title(){return this._title}get logo(){return this._logo}get theme(){return this._theme}get isMediumScreen(){return this._isMediumScreen}initLayout(t,r){this._title=t??this.title,this._logo=r}toggleTheme(t){const r=this.theme===fr.dark?fr.light:fr.dark;this.updateTheme(r,t)}updateTheme(t,r){this._theme=t,localStorage.theme=t===fr.dark?"dark":"light",t==fr.dark?(document.documentElement.classList.add("dark"),document.documentElement.setAttribute("data-dark-theme","true"),document.documentElement.setAttribute("data-prefers-color-scheme","dark")):(document.documentElement.classList.remove("dark"),document.documentElement.removeAttribute("data-dark-theme"),document.documentElement.setAttribute("data-prefers-color-scheme","light"));const n=r??window.document.body;n&&_e.queueUpdate(()=>{bo.setValueFor(n,t==fr.dark?xp.DarkMode:xp.LightMode)});const i=document.querySelector("#root");i&&(t==fr.dark?i.classList.add("dark"):i.classList.remove("dark"))}onWindowResized(){const t=window.innerWidth<Fc.Medium;!this.isMediumScreen&&t?this._isMediumScreen=!0:this.isMediumScreen&&!t&&(this._isMediumScreen=!1)}}function Ng(){return gn.get(f$)}function _T(){return gn.get(d$)}function kT(){return gn.get(Lg)}function p$(){const e=gn.get(Dg);return e.initUI(),e}const ST="data:image/svg+xml,%3csvg%20width='520'%20height='520'%20viewBox='0%200%20520%20520'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20filter='url(%23filter0_f_10_3)'%3e%3ccircle%20cx='261.5'%20cy='261.5'%20r='254.5'%20fill='%23D9D9D9'/%3e%3c/g%3e%3cg%20filter='url(%23filter1_f_10_3)'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M260%204C296.254%204%20330.747%2011.536%20362%2025.1271V359H23.8452C11.063%20328.546%204%20295.098%204%20260C4%20118.615%20118.615%204%20260%204Z'%20fill='%23111111'/%3e%3c/g%3e%3cg%20filter='url(%23filter2_f_10_3)'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M299%20427H220V512.893C233.033%20514.938%20246.393%20516%20260%20516C273.26%20516%20286.284%20514.992%20299%20513.048V427Z'%20fill='%23111111'/%3e%3c/g%3e%3cdefs%3e%3cfilter%20id='filter0_f_10_3'%20x='3'%20y='3'%20width='517'%20height='517'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'/%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='BackgroundImageFix'%20result='shape'/%3e%3cfeGaussianBlur%20stdDeviation='2'%20result='effect1_foregroundBlur_10_3'/%3e%3c/filter%3e%3cfilter%20id='filter1_f_10_3'%20x='0'%20y='0'%20width='366'%20height='363'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'/%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='BackgroundImageFix'%20result='shape'/%3e%3cfeGaussianBlur%20stdDeviation='2'%20result='effect1_foregroundBlur_10_3'/%3e%3c/filter%3e%3cfilter%20id='filter2_f_10_3'%20x='216'%20y='423'%20width='86.9999'%20height='97'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'/%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='BackgroundImageFix'%20result='shape'/%3e%3cfeGaussianBlur%20stdDeviation='2'%20result='effect1_foregroundBlur_10_3'/%3e%3c/filter%3e%3c/defs%3e%3c/svg%3e",CT="768px",ET="1100px",OT="1300px",TT="1500px",PT="#006fc8",AT="#1FAECE",jT="var(--primary-text)",NT="var(--secondary-text)",LT="var(--ui-divider)",DT="#dedede",RT="#002050",MT="#F7E28B",IT="#CEC0EC",FT="#CFECE8",VT="var(--banner-blue)",BT="4px",zT="8px",HT="16px",UT="20px",qT="24px",WT="32px",KT="40px",GT="60px",QT="200ms",ZT="100ms",XT="46px",YT="_container_1jo64_216",JT="_logo_1jo64_222",eP="_icon_1jo64_235",tP="_img_1jo64_244",rP="_title_1jo64_250",nP="_breadCrumb_1jo64_263",iP="_bread_1jo64_263",oP="_path_1jo64_275",sP="_slash_1jo64_294",aP="_flex_1jo64_301",lP="_userButtons_1jo64_305",uP="_hoverButton_1jo64_310",cP="_badge_1jo64_329",hP="_tooltip_1jo64_341",dP="_progressbar_1jo64_369",fP="_bar_1jo64_380",Ne={tabletScreen:CT,smallScreen:ET,mediumScreen:OT,largeScreen:TT,azure:PT,cyan:AT,primaryText:jT,secondaryText:NT,chartGridColor:LT,gray10:DT,msDarkBlue:RT,amberLight2:MT,violetLight2:IT,tealLight3:FT,bannerBlue:VT,spaceXXS:BT,spaceXS:zT,spaceS:HT,spaceM:UT,spaceXM:qT,spaceL:WT,spaceXL:KT,spaceXXL:GT,panelSlideDuration:QT,panelFadeDuration:ZT,ccBannerHeight:XT,container:YT,logo:JT,icon:eP,img:tP,title:rP,breadCrumb:nP,bread:iP,path:oP,slash:sP,flex:aP,userButtons:lP,hoverButton:uP,badge:cP,tooltip:hP,progressbar:dP,bar:fP};if(!P.useState)throw new Error("mobx-react-lite requires React with Hooks support");if(!e4)throw new Error("mobx-react-lite@3 requires mobx at least version 6 to be available");function pP(e){e()}function vP(e){e||(e=pP),WO({reactionScheduler:e})}function gP(e){return KO(e)}var mP=1e4,yP=1e4,bP=function(){function e(t){var r=this;Object.defineProperty(this,"finalize",{enumerable:!0,configurable:!0,writable:!0,value:t}),Object.defineProperty(this,"registrations",{enumerable:!0,configurable:!0,writable:!0,value:new Map}),Object.defineProperty(this,"sweepTimeout",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"sweep",{enumerable:!0,configurable:!0,writable:!0,value:function(n){n===void 0&&(n=mP),clearTimeout(r.sweepTimeout),r.sweepTimeout=void 0;var i=Date.now();r.registrations.forEach(function(o,s){i-o.registeredAt>=n&&(r.finalize(o.value),r.registrations.delete(s))}),r.registrations.size>0&&r.scheduleSweep()}}),Object.defineProperty(this,"finalizeAllImmediately",{enumerable:!0,configurable:!0,writable:!0,value:function(){r.sweep(0)}})}return Object.defineProperty(e.prototype,"register",{enumerable:!1,configurable:!0,writable:!0,value:function(t,r,n){this.registrations.set(n,{value:r,registeredAt:Date.now()}),this.scheduleSweep()}}),Object.defineProperty(e.prototype,"unregister",{enumerable:!1,configurable:!0,writable:!0,value:function(t){this.registrations.delete(t)}}),Object.defineProperty(e.prototype,"scheduleSweep",{enumerable:!1,configurable:!0,writable:!0,value:function(){this.sweepTimeout===void 0&&(this.sweepTimeout=setTimeout(this.sweep,yP))}}),e}(),xP=typeof FinalizationRegistry<"u"?FinalizationRegistry:bP,xl=new xP(function(e){var t;(t=e.reaction)===null||t===void 0||t.dispose(),e.reaction=null}),v$={exports:{}},df={};/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var wy;function wP(){if(wy)return df;wy=1;var e=pi;function t(h,d){return h===d&&(h!==0||1/h===1/d)||h!==h&&d!==d}var r=typeof Object.is=="function"?Object.is:t,n=e.useState,i=e.useEffect,o=e.useLayoutEffect,s=e.useDebugValue;function a(h,d){var m=d(),y=n({inst:{value:m,getSnapshot:d}}),w=y[0].inst,E=y[1];return o(function(){w.value=m,w.getSnapshot=d,l(w)&&E({inst:w})},[h,m,d]),i(function(){return l(w)&&E({inst:w}),h(function(){l(w)&&E({inst:w})})},[h]),s(m),m}function l(h){var d=h.getSnapshot;h=h.value;try{var m=d();return!r(h,m)}catch{return!0}}function u(h,d){return d()}var c=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?u:a;return df.useSyncExternalStore=e.useSyncExternalStore!==void 0?e.useSyncExternalStore:c,df}v$.exports=wP();var $P=v$.exports,_P=function(){};function $y(e){e.reaction=new so("observer".concat(e.name),function(){var t;e.stateVersion=Symbol(),(t=e.onStoreChange)===null||t===void 0||t.call(e)})}function kP(e,t){t===void 0&&(t="observed");var r=pi.useRef(null);if(!r.current){var n={reaction:null,onStoreChange:null,stateVersion:Symbol(),name:t,subscribe:function(a){return xl.unregister(n),n.onStoreChange=a,n.reaction||($y(n),n.stateVersion=Symbol()),function(){var l;n.onStoreChange=null,(l=n.reaction)===null||l===void 0||l.dispose(),n.reaction=null}},getSnapshot:function(){return n.stateVersion}};r.current=n}var i=r.current;i.reaction||($y(i),xl.register(r,i,i)),pi.useDebugValue(i.reaction,gP),$P.useSyncExternalStore(i.subscribe,i.getSnapshot,_P);var o,s;if(i.reaction.track(function(){try{o=e()}catch(a){s=a}}),s)throw s;return o}var g$=typeof Symbol=="function"&&Symbol.for,_y=g$?Symbol.for("react.forward_ref"):typeof P.forwardRef=="function"&&P.forwardRef(function(e){return null}).$$typeof,ky=g$?Symbol.for("react.memo"):typeof P.memo=="function"&&P.memo(function(e){return null}).$$typeof;function SP(e,t){var r;if(ky&&e.$$typeof===ky)throw new Error("[mobx-react-lite] You are trying to use `observer` on a function component wrapped in either another `observer` or `React.memo`. The observer already applies 'React.memo' for you.");var n=(r=t==null?void 0:t.forwardRef)!==null&&r!==void 0?r:!1,i=e,o=e.displayName||e.name;if(_y&&e.$$typeof===_y&&(n=!0,i=e.render,typeof i!="function"))throw new Error("[mobx-react-lite] `render` property of ForwardRef was not a function");var s=function(a,l){return kP(function(){return i(a,l)},o)};return s.displayName=e.displayName,Object.defineProperty(s,"name",{value:e.name,writable:!0,configurable:!0}),e.contextTypes&&(s.contextTypes=e.contextTypes),n&&(s=P.forwardRef(s)),s=P.memo(s),EP(e,s),s}var CP={$$typeof:!0,render:!0,compare:!0,type:!0,displayName:!0};function EP(e,t){Object.keys(e).forEach(function(r){CP[r]||Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(e,r))})}vP(Hv.unstable_batchedUpdates);xl.finalizeAllImmediately;function OP(e,t){if(Sy(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var r=Object.keys(e),n=Object.keys(t);if(r.length!==n.length)return!1;for(var i=0;i<r.length;i++)if(!Object.hasOwnProperty.call(t,r[i])||!Sy(e[r[i]],t[r[i]]))return!1;return!0}function Sy(e,t){return e===t?e!==0||1/e===1/t:e!==e&&t!==t}var Cy=Symbol("patchMixins"),m$=Symbol("patchedDefinition");function TP(e,t){var r=e[Cy]=e[Cy]||{},n=r[t]=r[t]||{};return n.locks=n.locks||0,n.methods=n.methods||[],n}function Ey(e,t){for(var r=this,n=arguments.length,i=new Array(n>2?n-2:0),o=2;o<n;o++)i[o-2]=arguments[o];t.locks++;try{var s;return e!=null&&(s=e.apply(this,i)),s}finally{t.locks--,t.locks===0&&t.methods.forEach(function(a){a.apply(r,i)})}}function Oy(e,t){var r=function(){for(var n=arguments.length,i=new Array(n),o=0;o<n;o++)i[o]=arguments[o];Ey.call.apply(Ey,[this,e,t].concat(i))};return r}function PP(e,t,r){var n=TP(e,t);n.methods.indexOf(r)<0&&n.methods.push(r);var i=Object.getOwnPropertyDescriptor(e,t);if(!(i&&i[m$])){var o=e[t],s=y$(e,t,i?i.enumerable:void 0,n,o);Object.defineProperty(e,t,s)}}function y$(e,t,r,n,i){var o,s=Oy(i,n);return o={},o[m$]=!0,o.get=function(){return s},o.set=function(a){if(this===e)s=Oy(a,n);else{var l=y$(this,t,r,n,a);Object.defineProperty(this,t,l)}},o.configurable=!0,o.enumerable=r,o}var Ty=Symbol("ObserverAdministration"),Py=Symbol("isMobXReactObserver");function qp(e){var t;return(t=e[Ty])!=null?t:e[Ty]={reaction:null,mounted:!1,reactionInvalidatedBeforeMount:!1,forceUpdate:null,name:Wp(e.constructor),state:void 0,props:void 0,context:void 0}}function AP(e){var t=e.prototype;if(e[Py]){var r=Wp(e);throw new Error("The provided component class ("+r+") has already been declared as an observer component.")}else e[Py]=!0;if(t.componentWillReact)throw new Error("The componentWillReact life-cycle event is no longer supported");if(e.__proto__!==P.PureComponent){if(!t.shouldComponentUpdate)t.shouldComponentUpdate=Ay;else if(t.shouldComponentUpdate!==Ay)throw new Error("It is not allowed to use shouldComponentUpdate in observer based components.")}var n=t.render;if(typeof n!="function"){var i=Wp(e);throw new Error("[mobx-react] class component ("+i+") is missing `render` method.\n`observer` requires `render` being a function defined on prototype.\n`render = () => {}` or `render = function() {}` is not supported.")}t.render=function(){return Object.defineProperty(this,"render",{configurable:!1,writable:!1,value:jP.call(this,n)}),this.render()};var o=t.componentDidMount;return t.componentDidMount=function(){var s=this,a=qp(this);return a.mounted=!0,xl.unregister(this),a.forceUpdate=function(){return s.forceUpdate()},(!a.reaction||a.reactionInvalidatedBeforeMount)&&a.forceUpdate(),o==null?void 0:o.apply(this,arguments)},PP(t,"componentWillUnmount",function(){var s,a=qp(this);(s=a.reaction)==null||s.dispose(),a.reaction=null,a.forceUpdate=null,a.mounted=!1,a.reactionInvalidatedBeforeMount=!1}),e}function Wp(e){return e.displayName||e.name||"<component>"}function jP(e){var t=e.bind(this),r=qp(this);function n(){r.reaction||(r.reaction=NP(r),r.mounted||xl.register(this,r,this));var i=void 0,o=void 0;if(r.reaction.track(function(){try{o=lw(!1,t)}catch(s){i=s}}),i)throw i;return o}return n}function NP(e){return new so(e.name+".render()",function(){if(!e.mounted){e.reactionInvalidatedBeforeMount=!0;return}try{e.forceUpdate==null||e.forceUpdate()}catch{var t;(t=e.reaction)==null||t.dispose(),e.reaction=null}})}function Ay(e,t){return this.state!==t?!0:!OP(this.props,e)}function LP(e,t){if(t&&t.kind!=="class")throw new Error("The @observer decorator can be used on classes only");return e.isMobxInjector===!0&&console.warn("Mobx observer: You are trying to use `observer` on a component that already has `inject`. Please apply `observer` before applying `inject`"),Object.prototype.isPrototypeOf.call(P.Component,e)||Object.prototype.isPrototypeOf.call(P.PureComponent,e)?AP(e):SP(e)}pi.version.split(".")[0];if(!P.Component)throw new Error("mobx-react requires React to be available");if(!vt)throw new Error("mobx-react requires mobx to be available");class DP{constructor(){$(this,"visibleHelp",!0),$(this,"visibleNotification",!0),Hs(this)}setVisibleHelp(t){this.visibleHelp=t}setVisibleNotification(t){this.visibleNotification=t}}const Kp=new DP,RP=LP(()=>{const e=kT(),t=Ng(),r=p$(),n=P.useRef(null),i=P.useRef(null),[o,s]=P.useState([]),[a,l]=P.useState(0);return P.useEffect(()=>{const u=ss(()=>{const c=i.current;c&&(t.theme===fr.dark?c.setAttribute("d",pt.sun):c.setAttribute("d",pt.moon))});return()=>{u()}}),P.useEffect(()=>{const u=ss(()=>{const h=n.current;if(!h)return;const d=e.progress;d===1?(h.style.opacity="0",h.style.transform="scaleX(1)",setTimeout(()=>c(),350)):(h.style.opacity="1",h.style.transitionDuration="350ms, 350ms, 350ms",h.style.transform=`scaleX(${d})`)}),c=()=>{if(e.isLoading)return;const h=n.current;h&&(h.style.opacity="1",h.style.transitionDuration="0ms, 350ms, 350ms",h.style.transform="scaleX(0)")};return()=>{u()}}),P.useEffect(()=>{const u=ss(()=>{var c;(c=e.current)!=null&&c.fullPaths&&s(e.current.fullPaths)});return()=>{u()}}),P.useEffect(()=>{l(2)},[]),T.jsxs(T.Fragment,{children:[T.jsxs("div",{className:Ne.container,children:[T.jsxs(Hp,{className:Ne.logo,to:e.baseUrl,children:[T.jsx("div",{className:Ne.icon,children:T.jsx("img",{className:Ne.img,src:t.logo??ST})}),T.jsx("div",{className:Ne.title,children:t.title})]}),T.jsx("div",{className:Ne.breadCrumb,children:o.map((u,c)=>{const h=o.slice(0,c+1).join("/"),d=e.getDisplay(c);return T.jsxs("div",{className:Ne.bread,children:[T.jsx(Hp,{to:h,className:Ne.path,children:d}),c!==o.length-1?T.jsx("div",{className:Ne.slash,children:"/"}):null]},h)})}),T.jsx("div",{className:Ne.flex}),T.jsxs("div",{className:Ne.userButtons,children:[Kp.visibleHelp&&T.jsxs("div",{className:Ne.hoverButton,onClick:()=>e.go(e.helpUrl),children:[T.jsx("svg",{className:Ne.icon,viewBox:"0 -960 960 960",children:T.jsx("path",{d:pt.question})}),T.jsx("div",{className:Ne.tooltip,children:"HELP"})]}),T.jsxs("div",{className:Ne.hoverButton,onClick:()=>t.toggleTheme(),children:[T.jsx("svg",{className:Ne.icon,viewBox:"0 -960 960 960",children:T.jsx("path",{ref:i})}),T.jsx("div",{className:Ne.tooltip,children:"THEME"})]}),Kp.visibleNotification&&T.jsxs("div",{className:Ne.hoverButton,onClick:u=>r.toggleNotificationAsync(u),children:[T.jsx("svg",{className:Ne.icon,viewBox:"0 -960 960 960",children:T.jsx("path",{d:pt.notification})}),a>0?T.jsx("span",{className:Ne.badge,children:a}):null,T.jsx("div",{className:Ne.tooltip,children:"NOTIFICATION"})]}),T.jsxs("div",{className:Ne.hoverButton,onClick:u=>r.showUserMenuAsync(u),children:[T.jsx("svg",{className:Ne.icon,children:T.jsx("path",{d:pt.user})}),T.jsx("div",{className:Ne.tooltip,children:"User"})]})]})]}),T.jsx("span",{className:Ne.progressbar,children:T.jsx("span",{className:Ne.bar,ref:n})})]})}),MP="_leftNavContainer_10b87_185",IP="_navMenus_10b87_198",FP="_singleMenu_10b87_204",VP="_icon_10b87_213",BP="_text_10b87_227",zP="_selected_10b87_240",HP="_groupMenu_10b87_255",UP="_groupHeader_10b87_258",qP="_flex_10b87_291",WP="_toggle_10b87_295",KP="_groupBody_10b87_312",GP="_subMenu_10b87_312",QP="_collapsed_10b87_358",ZP="_separator_10b87_370",XP="_line_10b87_376",YP="_navFooter_10b87_399",JP="_button_10b87_403",eA="_img_10b87_409",tA="_expand_10b87_420",rA="_small_10b87_424",nA="_smallWindowExpandedOverlay_10b87_428",Le={leftNavContainer:MP,navMenus:IP,singleMenu:FP,icon:VP,text:BP,selected:zP,groupMenu:HP,groupHeader:UP,flex:qP,toggle:WP,groupBody:KP,subMenu:GP,collapsed:QP,separator:ZP,line:XP,navFooter:YP,button:JP,img:eA,expand:tA,small:rA,smallWindowExpandedOverlay:nA};function iA(){const e=_T(),t=Ng(),r=p$(),[n,i]=P.useState(!0),[o,s]=P.useState(!1),[a,l]=P.useState({}),[u,c]=P.useState(""),h=y=>{setTimeout(()=>{c(y)},0)},d=(y,w,E)=>{n?l(p=>({...p,[w]:!p[w]})):r.toggleSubNavAsync(y,E)},m=(y,w)=>{n||r.hoverNavTooltipAsync(y,w)};return P.useEffect(()=>{const y=ss(()=>{t.isMediumScreen?(s(!0),i(!1)):(s(!1),i(!0),r.subNavMenu.hideClickAsync())});return()=>{y()}},[]),T.jsxs(T.Fragment,{children:[T.jsxs("div",{className:`${Le.leftNavContainer} ${o?Le.small:""} ${n?Le.expand:""}`,children:[T.jsx("div",{className:Le.navMenus,children:e.menus.map((y,w)=>{var E,p;if(y.type==="separator"){const f={height:y.height?y.height:void 0};return T.jsx("div",{className:Le.separator,style:f,children:y.line&&T.jsx("div",{className:Le.line})},w)}else if(y.type==="single"){const f=(E=y.path)==null?void 0:E.endsWith("/:id?"),v=f?(p=y.path)==null?void 0:p.replace("/:id?",""):y.path;return T.jsxs(by,{to:v,className:({isActive:S})=>(S&&h(""),`${Le.singleMenu} ${S?Le.selected:""}`),onMouseEnter:S=>m(S,y.display),end:!f,children:[T.jsx("svg",{className:Le.icon,viewBox:y.iconViewBox??"0 0 24 24",children:T.jsx("path",{d:y.iconData??pt.cube})}),T.jsx("div",{className:Le.text,children:y.display})]},y.key)}else if(y.type==="group"){const f=y.subMenu.find(S=>S.key===u)!==void 0,v=a[w]??!1;return T.jsxs("div",{className:`${Le.groupMenu}
                  ${f?Le.selected:""} ${n?"":Le.collapsed}`,children:[T.jsxs("div",{className:`${Le.groupHeader}`,onClick:S=>d(S,w,y),onMouseEnter:S=>m(S,y.display),children:[T.jsx("svg",{className:Le.icon,viewBox:y.iconViewBox??"0 0 24 24",children:T.jsx("path",{d:y.iconData??pt.group})}),T.jsx("div",{className:Le.text,children:y.display}),T.jsx("div",{className:Le.flex}),T.jsx("svg",{className:Le.toggle,viewBox:"0 0 24 24",children:T.jsx("path",{d:v?pt.angleDown:pt.angleUp})})]}),T.jsx("div",{className:Le.groupBody,hidden:!v||!n,children:y.subMenu.map(S=>{var L,x;const N=(L=S.path)==null?void 0:L.endsWith("/:id?"),I=N?(x=S.path)==null?void 0:x.replace("/:id?",""):S.path;return T.jsx(by,{to:I,className:({isActive:W})=>(W&&h(S.key),`${Le.subMenu} ${W?Le.selected:""}`),end:!N,children:T.jsx("div",{className:Le.text,children:S.display})},S.key)})})]},w)}else return null})}),T.jsx("div",{className:Le.navFooter,children:T.jsx("div",{className:Le.button,onClick:()=>i(!n),children:T.jsx("svg",{className:Le.img,viewBox:"0 0 32 32",children:T.jsx("path",{d:n?pt.leftChevron:pt.rightChevron})})})})]}),T.jsx("div",{className:o&&n?Le.smallWindowExpandedOverlay:"",onClick:()=>i(!1)})]})}const oA="_shell_bv7ze_185",sA="_header_bv7ze_190",aA="_main_bv7ze_197",lA="_nav_bv7ze_205",uA="_content_bv7ze_210",pa={shell:oA,header:sA,main:aA,nav:lA,content:uA};function b$(){const[e,t]=P.useState(!1);return P.useEffect(()=>{t(!0)},[]),e&&T.jsx(T.Fragment,{children:T.jsxs("div",{className:pa.shell,children:[T.jsx("header",{className:pa.header,children:T.jsx(RP,{})}),T.jsxs("main",{className:pa.main,children:[T.jsx("div",{className:pa.nav,children:T.jsx(iA,{})}),T.jsx("div",{className:pa.content,children:T.jsx(eT,{})})]}),T.jsx("footer",{})]})})}const cA="_teapot_1p2xm_35",At={"error-container":"_error-container_1p2xm_1","error-button":"_error-button_1p2xm_21",teapot:cA};function x$(e,t=!1){const r=P.useRef(document.title);P.useEffect(()=>{document.title=e??r.current},[e]),P.useEffect(()=>()=>{t||(document.title=r.current)},[])}function jy(){x$("Error Occurred");const e=u$(),t=s$();if(P.useEffect(()=>{console.log("error occurred")},[]),Pg(e))switch(e.status){case 400:return T.jsxs("div",{className:At["error-container"],children:[T.jsx("h1",{children:"400 - 잘못된 요청"}),T.jsx("p",{children:"죄송합니다, 요청이 잘못되었습니다."}),T.jsx("div",{onClick:()=>t(-1),className:At["error-button"],children:"이전으로 돌아가기"})]});case 401:return T.jsxs("div",{className:At["error-container"],children:[T.jsx("h1",{children:"401 - 권한 없음"}),T.jsx("p",{children:"이 페이지를 볼 권한이 없습니다."}),T.jsx("div",{onClick:()=>t(-1),className:At["error-button"],children:"이전으로 돌아가기"})]});case 403:return T.jsxs("div",{className:At["error-container"],children:[T.jsx("h1",{children:"403 - 액세스 거부"}),T.jsx("p",{children:"죄송합니다, 해당 페이지에 액세스 권한이 없습니다."}),T.jsx("div",{onClick:()=>t(-1),className:At["error-button"],children:"이전으로 돌아가기"})]});case 404:return T.jsxs("div",{className:At["error-container"],children:[T.jsx("h1",{children:"404 - 페이지를 찾을 수 없음"}),T.jsx("p",{children:"죄송합니다, 요청하신 페이지를 찾을 수 없습니다."}),T.jsx("div",{onClick:()=>t(-1),className:At["error-button"],children:"이전으로 돌아가기"})]});case 418:return T.jsxs("div",{className:At["error-container"],children:[T.jsx("h1",{className:At.teapot,children:"418 - I'm a teapot"}),T.jsx("p",{children:"이게 뭐에요? ☕"}),T.jsx("div",{onClick:()=>t(-1),className:At["error-button"],children:"이전으로 돌아가기"})]});case 500:return T.jsxs("div",{className:At["error-container"],children:[T.jsx("h1",{children:"500 - 서버 오류"}),T.jsx("p",{children:"죄송합니다, 서버에서 오류가 발생했습니다."}),T.jsx("div",{onClick:()=>t(-1),className:At["error-button"],children:"이전으로 돌아가기"})]});default:return T.jsxs("div",{className:At["error-container"],children:[T.jsxs("h1",{children:[e.status," - 알 수 없는 오류"]}),T.jsx("p",{children:"죄송합니다, 알 수 없는 오류가 발생했습니다."}),T.jsx("p",{children:e.data}),T.jsx("div",{onClick:()=>t(-1),className:At["error-button"],children:"이전으로 돌아가기"})]})}return T.jsxs("div",{className:At["error-container"],children:[T.jsx("h1",{children:"오류 발생"}),T.jsx("p",{children:"죄송합니다, 뭔가 잘못되었습니다."}),T.jsx("div",{onClick:()=>t(-1),className:At["error-button"],children:"이전으로 돌아가기"})]})}const w$=class $${constructor(){$(this,"routeData"),$(this,"helpPath","/help"),$(this,"basePath","/"),$(this,"keyPath",new Map),$(this,"router"),$(this,"currentlocation"),$(this,"eventHandler",new Map),$(this,"_progress",0),$(this,"loading",!1),Hs(this)}get helpUrl(){return this.helpPath}get baseUrl(){return this.basePath}get current(){return this.currentlocation}set progress(t){t>100&&(t=100),t<20&&(t=20),t===100?this.loading=!1:this.loading=!0,this._progress=t/100}get progress(){return this._progress}get isLoading(){return this.loading}initLocator(t,r,n,i,o,s){this.basePath=n??this.basePath,this.basePath.startsWith("/")||(this.basePath=`/${this.basePath}`),this.helpPath=r??this.helpPath,this.helpPath.startsWith("/")||(this.helpPath=`/${this.helpPath}`);const a=this.setRoute(t),l=this.setRouter(a,i,o,s);return this.router=l,[this.keyPath,this.router]}go(t,r){var n,i;this.routeData=r,t.startsWith("/")?(n=this.router)==null||n.navigate(t):(i=this.router)==null||i.navigate(`${this.basePath}/${t}`)}goBack(){var t;(t=this.router)==null||t.navigate(-1)}goForward(){var t;(t=this.router)==null||t.navigate(1)}reload(){var t;(t=this.router)==null||t.navigate(0)}addChangedEvent(t,r){this.eventHandler.set(t,r)}removeChangedEvent(t){this.eventHandler.delete(t)}onLocationChanged(t){window.dispatchEvent(new CustomEvent($$.LOCATION_CHANGED_NAME,{detail:t}))}setRoute(t,r){return t.map(n=>{const{key:i,useParam:o,children:s,...a}=n;if(!i)throw new Error("key is required");if(r!=null&&r.endsWith("/:id?"))throw new Error("You cannot use 'useParam' with 'children' in a Route.");if(a.path)if(a.path===""||a.path==="/"){if(a.path="",a.index=!0,this.keyPath.set(i,r?`${r}`:"/"),o)throw new Error("You cannot use 'useParam' in 'index route'")}else a.path.startsWith("/")&&(a.path=a.path.substring(1,a.path.length)),a.path.endsWith("/")&&(a.path=a.path.substring(0,a.path.length-1)),o&&(a.path=`${a.path}/:id?`),this.keyPath.set(i,r?`${r}/${a.path}`:a.path);else if(a.index){if(a.path="",this.keyPath.set(i,r?`${r}`:this.basePath),o)throw new Error("You cannot use 'useParam' in 'index route'")}else throw new Error("path or index is required");const l=a.loader;if(a.loader=async({request:u,params:c})=>{var h,d;let m=!1;u.url!==((h=this.currentlocation)==null?void 0:h.request.url)&&!c.id&&(this.progress=20,m=!0);const y=new URL(u.url),w=decodeURIComponent(y.pathname).replace(this.basePath,"").split("/").filter(f=>f.length>0),E=(d=c.id)==null?void 0:d.split("/").filter(f=>f.length>0),p=Object.fromEntries(y.searchParams.entries());if(this.currentlocation={key:i,request:u,url:y,fullPaths:w,paths:E,query:p},this.onLocationChanged(this.currentlocation),this.eventHandler.has(i)){const f=this.eventHandler.get(i);f&&f(this.currentlocation)}if(m&&(this.progress=40),l){const f=await l({request:u,params:c});return m&&(this.progress=100),f}else return m&&(this.progress=100),new Response(null,{status:200})},s){if(a.element||a.Component)throw new Error(`You cannot use 'element' or 'Component' with 'children' in a Route. 
          Please using 'index' in children instead.`);if(o)throw new Error("You cannot use 'useParam' with 'children' in a Route.");a.children=this.setRoute(s,this.keyPath.get(i))}return a})}setRouter(t,r,n,i){const o=[{path:this.basePath,element:r??T.jsx(b$,{}),errorElement:this.basePath==="/"?n??T.jsx(jy,{}):void 0,children:t}];return i&&o.push(...i),this.basePath!=="/"&&o.push({path:"",element:T.jsx(T.Fragment,{children:T.jsxs("pre",{children:[" WRONG URL! Base Path: [",this.basePath,"] "]})}),errorElement:n??T.jsx(jy,{})}),aT([...o])}getDisplay(t){var r,n;const i=(n=(r=this.currentlocation)==null?void 0:r.fullPaths)==null?void 0:n.at(t);return i==null?"":i.match(/^[a-zA-Z]/)?i.charAt(0).toUpperCase()+i.slice(1):i}};$(w$,"LOCATION_CHANGED_NAME","location-changed");let Lg=w$;var ff;let Os=(ff=class extends Cg{constructor(){super(...arguments),$(this,"keepHover",!0),$(this,"position",xt.RightBottom),$(this,"locator"),$(this,"key"),$(this,"item")}connectedCallback(){super.connectedCallback(),this.style.zIndex="4",ss(()=>{var e;this.key=(e=this.locator.current)==null?void 0:e.key})}render(){var e,t,r;const n=!!((e=this.item)!=null&&e.subMenu.find(i=>i.key===this.key));return re`
      <div class="container">
        <div class="header ${n?"selected":null}">
          ${(t=this.item)==null?void 0:t.display}
        </div>
        <div class="body">
          ${(r=this.item)==null?void 0:r.subMenu.map(i=>re`
            <div key=${i.key} class="menu ${i.key===this.key?"selected":null}"
              @click=${()=>this.handleChangeLocation(i)}>
              ${i.display}
            </div>
          `)}
        </div>
      </div>
    `}handleChangeLocation(e){const t=e.path,r=t.endsWith("/:id?")?t.replace("/:id?",""):t;e.force?window.location.href=r:this.locator.go(r)}},$(ff,"styles",at`
    .container {
      position: relative;
      display: block;
      margin-left: 5px;
      background-color: var(--gray-light3);
      width: 180px;
      user-select: none;
      box-shadow: 0 6px 12px rgba(0,0,0,.12);
      padding: 5px;
    }

    .header {
      padding: 10px;
      color: var(--primary-text);
      font-weight: normal;
      font-size: 16px;
      line-height: 20px;
      overflow: hidden;
      text-align: left;
      text-overflow: ellipsis;
      white-space: nowrap;
      border-bottom: 1px solid var(--alpha-20);

      &.selected {
        font-weight: bold;
      }
    }

    .body {
      overflow: hidden;
      overflow-y: auto;
      min-height: 20px;

      &::-webkit-scrollbar {
        width: 16px;
      }

      &::-webkit-scrollbar-thumb {
        height: 56px;
        border-radius: 8px;
        border: 4px solid transparent;
        background-clip: content-box;
        background-color: hsl(0,0%,37%)
      }

      &::-webkit-scrollbar-thumb:hover {
        background-color: hsl(0,0%,67%)
      }
    }

    .menu {
      padding: 5px 5px 5px 25px;
      text-align: left;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: normal;
      font-size: 14px;
      color: var(--primary-text);
      line-height: 30px;
      cursor: pointer;

      &:hover {
        background-color: var(--ui-subtle-hover);
      }

      &.selected {
        font-weight: bold;
        background-color: var(--ui-subtle-active);
      }
    }
  `),ff);g([Kw(Lg)],Os.prototype,"locator",void 0);g([po()],Os.prototype,"key",void 0);g([J({type:Object})],Os.prototype,"item",void 0);Os=g([lt("sub-nav-menu")],Os);var pf;let Vc=(pf=class extends Cg{constructor(){super(...arguments),$(this,"keepHover",!1),$(this,"position",xt.RightCenter),$(this,"display","")}render(){return re`
            <div class="container">
                ${this.display}
            </div>
        `}},$(pf,"styles",at`
        .container {
            padding: 6px 12px;
            margin: 5px;
            background-color: rgba(0, 0, 0, .65);
            border-radius: 2px;
            box-shadow: none;

            color: #fff;
            font-weight: normal;
            font-size: 14px;
            line-height: 20px;
            white-space: nowrap;
        }
    `),pf);g([J({type:String})],Vc.prototype,"display",void 0);Vc=g([lt("sub-nav-tooltip")],Vc);const hA="M453-280h60v-240h-60v240Zm26.982-314q14.018 0 23.518-9.2T513-626q0-14.45-9.482-24.225-9.483-9.775-23.5-9.775-14.018 0-23.518 9.775T447-626q0 13.6 9.482 22.8 9.483 9.2 23.5 9.2Zm.284 514q-82.734 0-155.5-31.5t-127.266-86q-54.5-54.5-86-127.341Q80-397.681 80-480.5q0-82.819 31.5-155.659Q143-709 197.5-763t127.341-85.5Q397.681-880 480.5-880q82.819 0 155.659 31.5Q709-817 763-763t85.5 127Q880-563 880-480.266q0 82.734-31.5 155.5T763-197.684q-54 54.316-127 86Q563-80 480.266-80Zm.234-60Q622-140 721-239.5t99-241Q820-622 721.188-721 622.375-820 480-820q-141 0-240.5 98.812Q140-622.375 140-480q0 141 99.5 240.5t241 99.5Zm-.5-340Z",dA="m330-288 150-150 150 150 42-42-150-150 150-150-42-42-150 150-150-150-42 42 150 150-150 150 42 42ZM480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Zm0-60q142 0 241-99.5T820-480q0-142-99-241t-241-99q-141 0-240.5 99T140-480q0 141 99.5 240.5T480-140Zm0-340Z",fA="m40-120 440-760 440 760H40Zm104-60h672L480-760 144-180Zm340.175-57q12.825 0 21.325-8.675 8.5-8.676 8.5-21.5 0-12.825-8.675-21.325-8.676-8.5-21.5-8.5-12.825 0-21.325 8.675-8.5 8.676-8.5 21.5 0 12.825 8.675 21.325 8.676 8.5 21.5 8.5ZM454-348h60v-224h-60v224Zm26-122Z",pA="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z",vf={info:"#2ecc71",error:"#e74c3c",warning:"#f1c40f"};var gf;let Un=(gf=class extends Re{constructor(){super(...arguments),$(this,"hideTimeout"),$(this,"closeTimeout"),$(this,"expanded",!1),$(this,"container"),$(this,"body"),$(this,"status"),$(this,"icon"),$(this,"color"),$(this,"message")}connectedCallback(){super.connectedCallback(),this.hidden=!0}async updated(e){super.updated(e),await this.updateComplete,e.has("color")&&this.style.setProperty("--color-background",this.color)}render(){return re`
            <div id="container"
                @mouseenter=${this.cancelHideAsync}
                @mouseleave=${this.startHideAsync}>
                <div class="header">
                    <svg class="icon" viewBox="0 -960 960 960">
                        <path d="${this.icon}"></path>
                    </svg>
                    <div class="title">
                        ${this.status}
                    </div>
                    <svg class="close" viewBox="0 -960 960 960"
                        @click=${this.close}>
                        <path d="${pA}"></path>
                    </svg>
                </div>
                <div id="body">
                    <div class="message"
                    @click=${this.toggleMessageExpand}>
                        ${this.message}
                    </div>
                </div>
            </div>
        `}async info(e){this.icon=hA,this.status="INFO",this.color=vf.info,this.show(e),this.startHideAsync()}async error(e){this.icon=dA,this.status="ERROR",this.color=vf.error,this.show(e),this.startHideAsync()}async warning(e){this.icon=fA,this.status="WARNING",this.color=vf.warning,this.show(e),this.startHideAsync()}async show(e){this.cancelHideAsync(),this.message=e,this.hidden=!1}async close(){this.container.classList.remove("hide"),this.body.classList.remove("expanded"),this.expanded=!1,this.message="",this.hidden=!0}async startHideAsync(){this.hideTimeout=setTimeout(()=>{this.container.classList.add("hide")},1e3),this.closeTimeout=setTimeout(()=>{this.close()},2e3)}async cancelHideAsync(){this.hideTimeout&&clearTimeout(this.hideTimeout),this.closeTimeout&&clearTimeout(this.closeTimeout),this.container.classList.remove("hide")}toggleMessageExpand(){this.expanded=!this.expanded,this.expanded?this.body.classList.add("expanded"):this.body.classList.remove("expanded")}},$(gf,"styles",at`
        :host {
            --color-background: #2ecc71;
        }

        #container {
            opacity: 1;
            position: fixed;
            z-index: 10;
            bottom: 10%;
            left: 25%;
            width: 50%;
            display: flex;
            flex-direction: column;
            background: var(--color-background);
            color: #fff;
            border-radius: 4px;
            padding: 8px 12px;
            box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
            transition: opacity 1s ease-in-out;

            &.hide {
                opacity: 0;
            }
        }

        .header {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            gap: 10px;
            user-select: none;

            .icon {
                width: 24px;
                height: 24px;
                fill: #fff;
                fill-rule: evenodd;
            }

            .title {
                flex: 1;
                font-size: 18px;
                font-weight: 600;
            }

            .close {
                position: relative;
                width: 24px;
                height: 24px;
                fill: #fff;
                fill-rule: evenodd;
                cursor: pointer;
            }
        }

        #body {
            margin-top: 5px;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            height: 20px;

            .message {
                flex: 1;
                font-size: 14px;
                line-height: 20px;
                font-weight: 300;
            }

            &:hover {
                cursor: n-resize;
                background-color: rgba(0, 0, 0, 0.1);
            }

            &.expanded {
                overflow: auto;
                height: auto;
                white-space: normal;
            }
        }
  `),gf);g([Br("#container")],Un.prototype,"container",void 0);g([Br("#body")],Un.prototype,"body",void 0);g([po()],Un.prototype,"status",void 0);g([po()],Un.prototype,"icon",void 0);g([po()],Un.prototype,"color",void 0);g([J({type:String})],Un.prototype,"message",void 0);Un=g([lt("toast-bar")],Un);class Dg{constructor(){$(this,"pageBusyIndicator",new bs),$(this,"messageBoxDialog",new lo),$(this,"notificationMenu",new Mc),$(this,"subNavMenu",new Os),$(this,"subNavTooltip",new Vc),$(this,"toastBar",new Un)}initUI(){this.pageBusyIndicator&&this.pageBusyIndicator.parentElement||(document.body.appendChild(this.pageBusyIndicator),document.body.appendChild(this.messageBoxDialog),this.pageBusyIndicator.hidden=!0,this.messageBoxDialog.hidden=!0,document.body.appendChild(this.notificationMenu),document.body.appendChild(this.subNavMenu),document.body.appendChild(this.subNavTooltip),document.body.appendChild(this.toastBar))}async toggleNotificationAsync(t){this.notificationMenu.toggleAsync(t)}async toggleSubNavAsync(t,r){this.subNavMenu.item=r,this.subNavMenu.toggleAsync(t)}async hoverNavTooltipAsync(t,r){this.subNavTooltip.display=r,this.subNavTooltip.hoverAsync(t)}createElement(t){const r=document.createElement("template");return r.innerHTML=t.trim(),r.content.firstChild}async showContextMenu(t,r){const n=this.createElement("<popup-menu hidden></popup-menu>");document.body.appendChild(n);try{const i=n;return i.menuItems=t,i.location={x:r.x,y:r.y},await i.showAsync()}catch(i){return{success:!1,value:i}}finally{document.body.removeChild(n)}}async showUserMenuAsync(t){this.subNavMenu.item={type:"group",display:"User",subMenu:[{key:"Profile",display:"Profile",path:"/app/profile"},{key:"SignOut",display:"Sign Out",path:"/accounts/logout",force:!0}]},this.subNavMenu.toggleAsync(t)}async showMessageAsync(t,r){return this.messageBoxDialog.initOk(),this.messageBoxDialog.showAsync(t,r)}async showMessageOkCancelAsync(t,r){return this.messageBoxDialog.initOkCancel(),this.messageBoxDialog.showAsync(t,r)}async showConfirmDialog(t,r){return this.messageBoxDialog.initYesNo(),this.messageBoxDialog.showAsync(t,r)}async showInputDialogAsync(t,r,n){const i=this.createElement("<input-dialog hidden></input-dialog>");document.body.appendChild(i);try{return await i.showAsync(t,r,n)}catch(o){return{success:!1,value:o}}finally{document.body.removeChild(i)}}async showContentDialogAsync(t,r,n){const i=this.createElement("<content-dialog hidden></content-dialog>");document.body.appendChild(i);try{const o=i;return o.content=r,n!=null&&(n.okCancel?(o.positiveText="Ok",o.negativeText="Cancel",o.useNegative=!0):n.yesNo&&(o.positiveText="Yes",o.negativeText="No",o.useNegative=!0),n.hiddenButtons&&(o.hiddenButtons=n.hiddenButtons),n.validationHandler&&(o.validationHandler=n.validationHandler)),await o.showAsync(t)}catch(o){return{success:!1,value:o}}finally{document.body.removeChild(i)}}async showDialogAsync(t){const r=this.createElement("<blank-dialog hidden></blank-dialog>");document.body.appendChild(r);try{const n=r;return n.content=t,await n.showAsync()}catch{return{success:!1,value:null}}finally{document.body.removeChild(r)}}async showRightDialogAsync(t){const r=this.createElement("<right-dialog hidden></right-dialog>");document.body.appendChild(r);try{const n=r;return n.title=t.title,n.content=t,await n.showAsync()}catch{return{success:!1,value:null}}finally{document.body.removeChild(r)}}}class Uh extends Re{constructor(){super(),$(this,"manager"),$(this,"steps",[]),$(this,"currentStepIndex",0),$(this,"backCommand"),$(this,"nextCommand"),$(this,"resolve"),$(this,"reject"),this.backCommand=new Mp({content:"Back",execute:()=>{if(this.backCommand.canExecute()!=!1&&this.currentStepIndex>0){const t=this.currentStep().onLeave("back");this.currentStepIndex--,this.currentStep().onGot("back",t)}},canExecute:()=>this.currentStepIndex>0?this.canBack():!1}),this.nextCommand=new Mp({content:"Next",execute:()=>{if(this.nextCommand.canExecute()!=!1){if(this.currentStepIndex==this.steps.length-1){this.canFinish()&&this.fisish();return}else if(this.currentStepIndex<this.steps.length-1){const t=this.currentStep().onLeave("next");this.currentStepIndex++,this.currentStep().onGot("next",t)}this.currentStepIndex==this.steps.length-1?this.nextCommand.content="Finish":this.nextCommand.content="Next"}},canExecute:()=>this.currentStepIndex==this.steps.length-1?this.canFinish():this.currentStepIndex<this.steps.length-1?this.canNext():!1}),this.steps=this.initSteps()}render(){return re`
      <div class="p-2">
        <h4>${this.title}</h4>

        ${this.currentStep()}
        
        <div class="flex justify-end items-center gap-1">
          <!-- back, next -->
          <u-button .command=${this.backCommand}></u-button>
          <u-button .command=${this.nextCommand} accent></u-button>
        </div>
      </div>
    `}currentStep(){return this.steps[this.currentStepIndex]}canBack(){const t=this.currentStep();return!(t.canBack&&!t.canBack())}canNext(){const t=this.currentStep();return!(t.canNext&&!t.canNext())}canFinish(){return!0}fisish(){if(this.resolve)this.resolve({success:!0,value:this.returnValue()});else throw new Error("resolve is null")}returnValue(){return this}loadPromise(t,r){this.resolve=t,this.reject=r}showAsync(){return this.manager?this.manager.showDialogAsync(this):Promise.resolve({success:!1,value:"UIManager is null"})}}$(Uh,"styles",[]);g([Kw(Dg)],Uh.prototype,"manager",void 0);g([J({type:Array})],Uh.prototype,"steps",void 0);g([po()],Uh.prototype,"currentStepIndex",void 0);var Gp={},Ny=Qb;Gp.createRoot=Ny.createRoot,Gp.hydrateRoot=Ny.hydrateRoot;class vA{constructor(){$(this,"layout",Ng()),$(this,"topBarOptions",Kp)}init(){const t=gn.addSingleton($T),r=gn.addSingleton(d$),n=gn.addSingleton(Lg),i=gn.addSingleton(f$);gn.addSingleton(Dg).initUI(),t.initAppInfo(),i.initLayout(this.title,this.logo);const o=this.initRoutes(),[s,a]=n.initLocator(o,this.helpPath,this.basePath,this.baseElement,this.errorElement,this.otherShells),l=this.initMainMenuItems();return r.initMenu(l,s),a}run(){const t=this.init();let r=document.getElementById("root");r||(r=document.createElement("div"),r.id="root",document.body.appendChild(r)),Gp.hydrateRoot(r,T.jsx(pi.StrictMode,{children:T.jsx(vT,{router:t})}))}}const gA="_container_cm2mx_185",mA="_top_cm2mx_198",yA="_shadow_cm2mx_203",bA="_main_cm2mx_208",xA="_content_cm2mx_213",wA="_title_cm2mx_219",$A="_scrollTop_cm2mx_246",_A="_icon_cm2mx_262",kA="_panel_cm2mx_276",SA="_fixed_cm2mx_283",CA="_panelHead_cm2mx_290",EA="_button_cm2mx_290",OA="_pin_cm2mx_290",TA="_resize_cm2mx_293",PA="_active_cm2mx_297",AA="_flex_cm2mx_320",jA="_panelContent_cm2mx_338",NA="_right_cm2mx_346",LA="_bottom_cm2mx_365",DA="_menu_cm2mx_384",RA="_tab_cm2mx_394",he={container:gA,top:mA,shadow:yA,main:bA,content:xA,title:wA,scrollTop:$A,icon:_A,panel:kA,fixed:SA,panelHead:CA,button:EA,pin:OA,resize:TA,active:PA,flex:AA,panelContent:jA,right:NA,bottom:LA,menu:DA,tab:RA};function _$(e){return T.jsx(T.Fragment,{children:e.children})}function wa(e){return T.jsx(T.Fragment,{children:e.children})}function ko(e){x$(e.docTitle);const t=P.useRef(null),r=P.useRef(null),n=P.useRef(null),i=P.useRef(null),o=P.useRef(null),s=P.useRef(null),a=P.useRef(null),l=P.useRef(null),u=P.useRef(null),c=[],h=[],[d,m]=P.useState(null),[y,w]=P.useState(null),[E,p]=P.useState(!0),[f,v]=P.useState(!0);let S;const L=[],x={},N={};P.Children.forEach(e.children,oe=>{if(P.isValidElement(oe))if(oe.type===_$)S=oe;else if(oe.type===wa){if(oe.key===null)throw new Error("PagePanel must have a key property.");oe.props.position==="right"?(h.push(oe.key),x[oe.key]=oe):oe.props.position==="bottom"&&(c.push(oe.key),N[oe.key]=oe)}else L.push(oe)});const I=oe=>{w(y===oe?null:oe)},W=oe=>{m(d===oe?null:oe)},te=()=>{if(t.current===null)return;t.current.style.gridTemplateRows="auto 100% auto auto";const oe=r.current?r.current.offsetHeight:0,de=f&&o.current?o.current.offsetHeight:0,B=s.current?s.current.offsetHeight:0,ee=oe+de+B;t.current.style.gridTemplateRows=`auto calc(100% - ${ee}px) auto auto`},fe=()=>{if(t.current===null)return;t.current.style.gridTemplateColumns="100% auto auto";const oe=E&&n.current?n.current.offsetWidth:0,de=i.current?i.current.offsetWidth:0,B=oe+de;t.current.style.gridTemplateColumns=`calc(100% - ${B}px) auto auto`},Ct=()=>{l.current===null||u.current===null||r.current&&(l.current.scrollTop>20?(r.current.classList.add(he.shadow),u.current.style.display="flex"):(r.current.classList.remove(he.shadow),u.current.style.display="none"))},Ze=()=>{l.current!==null&&l.current.scrollTo({top:0,behavior:"instant"})},Et=oe=>{oe.preventDefault();const de=oe.target;de.classList.add(he.active);let B=0;const ee=xe=>{B+=xe.movementX,de.style.left=`${B}px`},ne=()=>{de.style.left="-2px",de.classList.remove(he.active),n.current.style.width=`${n.current.offsetWidth-B}px`,fe(),document.removeEventListener("mousemove",ee),document.removeEventListener("mouseup",ne)};document.addEventListener("mousemove",ee),document.addEventListener("mouseup",ne)},$r=oe=>{oe.preventDefault();const de=oe.target;de.classList.add(he.active);let B=0;const ee=xe=>{B+=xe.movementY,de.style.top=`${B}px`},ne=()=>{de.style.top="-2px",de.classList.remove(he.active),o.current.style.height=`${o.current.offsetHeight-B}px`,te(),document.removeEventListener("mousemove",ee),document.removeEventListener("mouseup",ne)};document.addEventListener("mousemove",ee),document.addEventListener("mouseup",ne)};return P.useEffect(()=>{te(),fe()},[]),P.useEffect(()=>{te()},[d,f]),P.useEffect(()=>{fe()},[y,E]),T.jsxs("div",{className:he.container,ref:t,children:[S&&T.jsx("div",{className:he.top,ref:r,children:S}),T.jsxs("div",{className:he.main,ref:a,children:[T.jsxs("div",{className:he.content,ref:l,onScroll:()=>Ct(),children:[e.title&&T.jsx("div",{className:he.title,children:e.title}),L]}),T.jsx("div",{className:he.scrollTop,ref:u,onClick:()=>Ze(),children:T.jsx("svg",{className:he.icon,viewBox:"0 0 24 24",children:T.jsx("path",{d:pt.angleUp2})})})]}),y!==null&&T.jsxs("div",{className:`${he.panel} ${he.right} ${E?he.fixed:""}`,ref:n,children:[T.jsx("div",{className:he.resize,onMouseDown:Et}),T.jsxs("div",{className:he.panelHead,children:[T.jsx("div",{className:he.title,children:y}),T.jsx("div",{className:he.flex}),T.jsx("svg",{className:`${he.button} ${he.pin}`,viewBox:"0 0 24 24",onClick:()=>p(!E),children:T.jsx("path",{d:pt.pin})}),T.jsx("svg",{className:he.button,viewBox:"0 -960 960 960",onClick:()=>w(null),children:T.jsx("path",{d:pt.close})})]}),T.jsx("div",{className:he.panelContent,children:x[y]})]}),h.length>0&&T.jsx("div",{className:`${he.menu} ${he.right}`,ref:i,children:h.map(oe=>T.jsx("div",{className:`${he.tab} ${y===oe?he.active:""}`,onClick:()=>I(oe),children:oe},oe))}),d!==null&&T.jsxs("div",{className:`${he.panel} ${he.bottom} ${f?he.fixed:""}`,ref:o,children:[T.jsx("div",{className:he.resize,onMouseDown:$r}),T.jsxs("div",{className:he.panelHead,children:[T.jsx("div",{className:he.title,children:d}),T.jsx("div",{className:he.flex}),T.jsx("svg",{className:`${he.button} ${he.pin}`,viewBox:"0 0 24 24",onClick:()=>v(!f),children:T.jsx("path",{d:pt.pin})}),T.jsx("svg",{className:he.button,viewBox:"0 -960 960 960",onClick:()=>m(null),children:T.jsx("path",{d:pt.close})})]}),T.jsx("div",{className:he.panelContent,children:N[d]})]}),c.length>0&&T.jsx("div",{className:`${he.menu} ${he.bottom}`,ref:s,children:c.map(oe=>T.jsx("div",{className:`${he.tab} ${d===oe?he.active:""}`,onClick:()=>W(oe),children:oe},oe))})]})}function MA(){const[e,t]=P.useState(!1);return P.useEffect(()=>{t(!0)},[]),e&&U.jsx(U.Fragment,{children:U.jsx(b$,{})})}const IA="_home_10to4_1",qs={home:IA};function FA(){return U.jsx(ko,{docTitle:"Home Page",title:"Overview",children:U.jsx("div",{className:qs.home,children:U.jsx("h1",{children:"Hello This is Home Page"})})})}function VA(){return U.jsx(ko,{title:"This is Mix",children:U.jsx("div",{className:qs.home,children:U.jsx("h1",{children:"Hello This is Mix Page"})})})}function BA(){return U.jsx(ko,{title:"This is Home",children:U.jsx("div",{className:qs.home,children:U.jsx("h1",{children:"Hello This is Lit Page"})})})}function zA(){return U.jsx(ko,{title:"This is Home",children:U.jsx("div",{className:qs.home,children:U.jsx("h1",{children:"Hello This is React Page"})})})}function HA(){return U.jsx(ko,{title:"This is Home",children:U.jsx("div",{className:qs.home,children:U.jsx("h1",{children:"Hello This is Setting Page"})})})}function UA(){return U.jsx(ko,{title:"This is Home",children:U.jsx("div",{className:qs.home,children:U.jsx("h1",{children:"Hello This is User Page"})})})}const qA="_head_1f5tg_1",WA="_body_1f5tg_7",KA="_right-panel_1f5tg_17",GA="_bottom-panel_1f5tg_26",No={head:qA,body:WA,"right-panel":"_right-panel_1f5tg_17",rightPanel:KA,"bottom-panel":"_bottom-panel_1f5tg_26",bottomPanel:GA};function QA(){return U.jsxs(ko,{docTitle:"This is Test",children:[U.jsx(_$,{children:U.jsx("div",{className:No.head,children:"헤더 타이틀"})}),U.jsxs("div",{className:No.body,children:["본문 시작",U.jsx("br",{}),U.jsx("br",{}),U.jsx("br",{}),U.jsx("br",{}),U.jsx("br",{}),U.jsx("br",{}),U.jsx("br",{}),U.jsx("br",{}),U.jsx("br",{}),U.jsx("br",{}),U.jsx("br",{}),U.jsx("br",{}),U.jsx("br",{}),U.jsx("br",{}),U.jsx("br",{}),U.jsx("br",{}),U.jsx("br",{}),U.jsx("br",{}),U.jsx("br",{}),U.jsx("br",{}),U.jsx("br",{}),U.jsx("br",{}),U.jsx("br",{}),U.jsx("br",{}),U.jsx("br",{}),U.jsx("br",{}),U.jsx("br",{}),U.jsx("br",{}),U.jsx("br",{}),U.jsx("br",{}),U.jsx("br",{}),U.jsx("br",{}),U.jsx("br",{}),U.jsx("br",{}),U.jsx("br",{}),"본문 끝"]}),U.jsx(wa,{position:"right",children:U.jsx("div",{className:No.rightPanel,children:"오른쪽 패널"})},"오른쪽 패널"),U.jsx(wa,{position:"right",children:U.jsx("div",{className:No.rightPanel2,children:"오른쪽 패널2"})},"오른쪽 패널2"),U.jsx(wa,{position:"bottom",children:U.jsx("div",{className:No.bottomPanel,children:"하단 패널"})},"하단 패널"),U.jsx(wa,{position:"bottom",children:U.jsx("div",{className:No.bottomPanel2,children:"하단 패널2"})},"하단 패널2")]})}class ZA extends vA{constructor(){super(...arguments),this.title="IYULAB APP SAMPLE",this.baseElement=U.jsx(MA,{})}initMainMenuItems(){return[{type:"single",key:"home",display:"Single Menu"},{type:"separator",height:5},{type:"group",display:"Group Menu",subMenu:[{key:"mix",display:"Mix Component"},{key:"lit",display:"Lit Element"},{key:"react",display:"React Component"}]},{type:"separator"},{type:"group",display:"Setting",iconData:pt.setting,subMenu:[{key:"settingIndex",display:"General"},{key:"user",display:"User"}]},{type:"separator",line:!0},{type:"single",key:"test",display:"Test Page",iconData:pt.labs}]}initRoutes(){return[{key:"home",element:U.jsx(FA,{}),index:!0},{key:"component",path:"/component",children:[{key:"mix",index:!0,element:U.jsx(VA,{})},{key:"lit",path:"lit",element:U.jsx(BA,{}),useParam:!0},{key:"react",path:"react",element:U.jsx(zA,{}),useParam:!0}]},{key:"setting",path:"/setting",children:[{key:"settingIndex",index:!0,element:U.jsx(HA,{})},{key:"user",path:"user",element:U.jsx(UA,{})}]},{key:"test",path:"/test",element:U.jsx(QA,{})}]}}const XA=new ZA;XA.run();
