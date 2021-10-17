(this.webpackJsonptaboo=this.webpackJsonptaboo||[]).push([[6],{205:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return z}));var c=n(21),r=n(8),a=n(0),i=n(50),s=n(56),o=n(55),u=n(51),l=n.n(u),j=n(52),b=n(10),h=n(57),d=n(53);function p(e,t){return f.apply(this,arguments)}function f(){return(f=Object(j.a)(l.a.mark((function e(t,n){var c,r,a,i,s,o,u;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(c=t.name,e.prev=1,r=Object(d.a)(),a=n.getToken().value,r.apiBaseUrl){e.next=6;break}throw new Error("apiBaseUrl is not set in config");case 6:return e.next=8,fetch("".concat(r.apiBaseUrl,"/api/v1/topic"),{method:"POST",body:JSON.stringify({name:c}),headers:{"content-type":"application/json",Authorization:"Bearer ".concat(a)}});case 8:if((i=e.sent).ok){e.next=12;break}throw console.error(i),new Error("Error making request to create topic");case 12:return e.next=14,i.json();case 14:return s=e.sent,o=s.id,u=s.name,e.abrupt("return",new h.a(o,u));case 20:throw e.prev=20,e.t0=e.catch(1),console.error("Error creating topic",e.t0),e.t0;case 24:case"end":return e.stop()}}),e,null,[[1,20]])})))).apply(this,arguments)}var O=n(54);var m=n(61),x=n(1);function v(e){var t=e.submitStatus,n=e.onSubmit,r=void 0===n?function(){}:n,o=Object(a.useState)(""),u=Object(c.a)(o,2),l=u[0],j=u[1],b=Object(a.useCallback)((function(){l&&r(l)}),[l,r]);return Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)(i.p,{children:Object(x.jsx)(i.f,{sm:{size:12},children:Object(x.jsx)(s.a,{children:Object(x.jsxs)(i.d,{children:[Object(x.jsx)(i.e,{size:"lg",children:"Choose a topic"}),Object(x.jsx)(i.i,{children:Object(x.jsx)(i.j,{id:"#topic",size:"lg",value:l,onChange:function(e){return j(e.target.value)},placeholder:"e.g Love"})}),Object(x.jsx)(i.i,{children:Object(x.jsx)(m.a,{pill:!0,size:"lg",onClick:b,theme:"success",isLoading:"submitting"===t,children:"Confirm"})})]})})})}),"error"===t&&Object(x.jsx)(i.a,{theme:"danger",children:"There was a problem creating a new topic. Please try later"})]})}var w,g,k=n(9);function y(){return Object(x.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",width:"100%",height:"100%",viewBox:"0 0 100 100",preserveAspectRatio:"xMidYMid",children:[Object(x.jsx)("defs",{children:Object(x.jsxs)("clipPath",{id:"ldio-7s5wq2mzb7v-cp",children:[Object(x.jsxs)("rect",{x:"0",y:"0",width:"100",height:"50",children:[Object(x.jsx)("animate",{attributeName:"y",repeatCount:"indefinite",dur:"2.2222222222222223s",calcMode:"spline",values:"0;50;0;0;0",keyTimes:"0;0.4;0.5;0.9;1",keySplines:"0.3 0 1 0.7;0.3 0 1 0.7;0.3 0 1 0.7;0.3 0 1 0.7"}),Object(x.jsx)("animate",{attributeName:"height",repeatCount:"indefinite",dur:"2.2222222222222223s",calcMode:"spline",values:"50;0;0;50;50",keyTimes:"0;0.4;0.5;0.9;1",keySplines:"0.3 0 1 0.7;0.3 0 1 0.7;0.3 0 1 0.7;0.3 0 1 0.7"})]}),Object(x.jsxs)("rect",{x:"0",y:"50",width:"100",height:"50",children:[Object(x.jsx)("animate",{attributeName:"y",repeatCount:"indefinite",dur:"2.2222222222222223s",calcMode:"spline",values:"100;50;50;50;50",keyTimes:"0;0.4;0.5;0.9;1",keySplines:"0.3 0 1 0.7;0.3 0 1 0.7;0.3 0 1 0.7;0.3 0 1 0.7"}),Object(x.jsx)("animate",{attributeName:"height",repeatCount:"indefinite",dur:"2.2222222222222223s",calcMode:"spline",values:"0;50;50;0;0",keyTimes:"0;0.4;0.5;0.9;1",keySplines:"0.3 0 1 0.7;0.3 0 1 0.7;0.3 0 1 0.7;0.3 0 1 0.7"})]})]})}),Object(x.jsx)("g",{transform:"translate(50 50)",children:Object(x.jsx)("g",{transform:"scale(0.9)",children:Object(x.jsx)("g",{transform:"translate(-50 -50)",children:Object(x.jsxs)("g",{children:[Object(x.jsx)("animateTransform",{attributeName:"transform",type:"rotate",dur:"2.2222222222222223s",repeatCount:"indefinite",values:"0 50 50;0 50 50;180 50 50;180 50 50;360 50 50",keyTimes:"0;0.4;0.5;0.9;1"}),Object(x.jsx)("path",{"clip-path":"url(#ldio-7s5wq2mzb7v-cp)",fill:"#e26c00",d:"M54.864 50L54.864 50c0-1.291 0.689-2.412 1.671-2.729c9.624-3.107 17.154-12.911 19.347-25.296 c0.681-3.844-1.698-7.475-4.791-7.475H28.908c-3.093 0-5.472 3.631-4.791 7.475c2.194 12.385 9.723 22.189 19.347 25.296 c0.982 0.317 1.671 1.438 1.671 2.729v0c0 1.291-0.689 2.412-1.671 2.729C33.84 55.836 26.311 65.64 24.117 78.025 c-0.681 3.844 1.698 7.475 4.791 7.475h42.184c3.093 0 5.472-3.631 4.791-7.475C73.689 65.64 66.16 55.836 56.536 52.729 C55.553 52.412 54.864 51.291 54.864 50z"}),Object(x.jsx)("path",{fill:"#281300",d:"M81 81.5h-2.724l0.091-0.578c0.178-1.122 0.17-2.243-0.022-3.333C76.013 64.42 68.103 54.033 57.703 50.483l-0.339-0.116 v-0.715l0.339-0.135c10.399-3.552 18.31-13.938 20.642-27.107c0.192-1.089 0.2-2.211 0.022-3.333L78.276 18.5H81 c2.481 0 4.5-2.019 4.5-4.5S83.481 9.5 81 9.5H19c-2.481 0-4.5 2.019-4.5 4.5s2.019 4.5 4.5 4.5h2.724l-0.092 0.578 c-0.178 1.122-0.17 2.243 0.023 3.333c2.333 13.168 10.242 23.555 20.642 27.107l0.338 0.116v0.715l-0.338 0.135 c-10.4 3.551-18.31 13.938-20.642 27.106c-0.193 1.09-0.201 2.211-0.023 3.333l0.092 0.578H19c-2.481 0-4.5 2.019-4.5 4.5 s2.019 4.5 4.5 4.5h62c2.481 0 4.5-2.019 4.5-4.5S83.481 81.5 81 81.5z M73.14 81.191L73.012 81.5H26.988l-0.128-0.309 c-0.244-0.588-0.491-1.538-0.28-2.729c2.014-11.375 8.944-20.542 17.654-23.354c2.035-0.658 3.402-2.711 3.402-5.108 c0-2.398-1.368-4.451-3.403-5.108c-8.71-2.812-15.639-11.979-17.653-23.353c-0.211-1.191 0.036-2.143 0.281-2.731l0.128-0.308 h46.024l0.128 0.308c0.244 0.589 0.492 1.541 0.281 2.731c-2.015 11.375-8.944 20.541-17.654 23.353 c-2.035 0.658-3.402 2.71-3.402 5.108c0 2.397 1.368 4.45 3.403 5.108c8.71 2.812 15.64 11.979 17.653 23.354 C73.632 79.651 73.384 80.604 73.14 81.191z"})]})})})})]})}var C=Object(k.b)(w||(w=Object(r.a)(["\n  from {\n    opacity: 0;\n    transform: scale(0);\n  }\n\n  to {\n    opacity: 1;\n    transform: scale(1);\n  }\n"]))),_=k.a.div(g||(g=Object(r.a)(["\n  width: 64px;\n  height: 64px;\n  position: relative;\n  margin: 0 auto;\n  top: -200px;\n  box-sizing: content-box;\n  justify-self: flex-start;\n  opacity: 0;\n  transform: scale(0);\n  animation: "," 0.5s 1 1s;\n  animation-fill-mode: forwards;\n"])),C);function T(){return Object(x.jsx)(_,{children:Object(x.jsx)(y,{})})}var E,S=n(82),M=n(58),N=n(2),U=n(7),P=Object(k.a)(i.l)(E||(E=Object(r.a)(["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n"])));function z(){var e=Object(N.g)(),t=function(){var e=Object(O.a)(!1),t=Object(c.a)(e,2),n=t[0],r=t[1],i=Object(O.a)(null),s=Object(c.a)(i,2),o=s[0],u=s[1],h=Object(O.a)(null),d=Object(c.a)(h,2),f=d[0],m=d[1],x=Object(b.b)(),v=Object(a.useCallback)(function(){var e=Object(j.a)(l.a.mark((function e(t){var n,c;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.name,r(!0),e.prev=2,e.next=5,p({name:n},x);case 5:c=e.sent,m(c),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(2),u(e.t0);case 12:return e.prev=12,r(!1),e.finish(12);case 15:case"end":return e.stop()}}),e,null,[[2,9,12,15]])})));return function(t){return e.apply(this,arguments)}}(),[r,u,x,m]);return Object(a.useMemo)((function(){return{loading:n,error:o,create:v,topic:f}}),[n,o,v,f])}(),n=t.error,r=t.loading,u=t.create,h=t.topic,f=Object(S.a)(),m=f.getChats,w=f.userChats,g=Object(a.useState)(!1),k=Object(c.a)(g,2),y=k[0],C=k[1],_=Object(a.useRef)(null),E=Object(a.useRef)(0),z=Object(d.a)(),A=z.chatPollIntervalSeconds,B=z.chatPollingTimeSeconds,I=Math.floor(B/A),L=Object(a.useCallback)((function(e){u({name:e})}),[u]),R=Object(a.useCallback)((function(){m(),E.current+=1,E.current<=I?_.current=setTimeout((function(){R()}),1e3*A):C(!0)}),[m,A,E,I,C]);return Object(a.useEffect)((function(){h&&!_.current&&R()}),[h,_,R,m]),Object(a.useEffect)((function(){m()}),[m]),Object(a.useEffect)((function(){if(w.length&&h){var t=w.find((function(e){return e.state!==M.b.Fullfilled&&e.topic.name===h.name}));t&&e.push("/chat/".concat(t.id))}}),[w,e,h]),Object(x.jsxs)(o.a,{children:[!h&&Object(x.jsx)(v,{onSubmit:L,submitStatus:r?"submitting":n?"error":"pending"}),w.length>0&&!h&&Object(x.jsx)(s.a,{children:Object(x.jsxs)(i.d,{children:[Object(x.jsx)(i.e,{children:"Active chats with matched topics"}),Object(x.jsx)(i.k,{children:w.map((function(e){return Object(x.jsxs)(P,{children:[e.topic.name,Object(x.jsx)(U.b,{to:"/chat/".concat(e.id),children:Object(x.jsx)(i.b,{outline:!0,pill:!0,size:"sm",children:"Go to chat"})})]},e.id)}))})]})}),h&&Object(x.jsxs)(x.Fragment,{children:[!y&&Object(x.jsx)(T,{}),Object(x.jsxs)(i.m,{centered:!0,open:!0,toggle:function(){},children:[!y&&Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)(i.o,{children:"Thanks \ud83d\ude4f"}),Object(x.jsxs)(i.n,{children:["Please wait while we find a person with interest in"," ",Object(x.jsxs)("strong",{children:['"',h.name,'"']}),"."]})]}),y&&Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)(i.o,{children:"No matches found \ud83d\ude1e"}),Object(x.jsx)(i.n,{children:"Looks like your topic of interest has not found any match yet. We will notify you once we find a match."})]})]})]})]})}},53:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var c="__RUNTIME_CONFIG__",r={};function a(){return c in window?(0===Object.keys(r).length&&(r={apiBaseUrl:window.__RUNTIME_CONFIG__.REACT_APP_API_URL,chatPollIntervalSeconds:window.__RUNTIME_CONFIG__.CHAT_POLL_INTERVAL||10,chatPollingTimeSeconds:300},delete window.__RUNTIME_CONFIG__),r):r}},54:function(e,t,n){"use strict";var c=n(21),r=n(0);t.a=function(e){var t=Object(r.useRef)(!1),n=Object(r.useState)(e),a=Object(c.a)(n,2),i=a[0],s=a[1];return Object(r.useEffect)((function(){return t.current=!0,function(){t.current=!1}}),[]),[i,Object(r.useCallback)((function(e){t.current&&s(e)}),[s])]}},55:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var c,r=n(8),a=n(50),i=n(9),s=Object(i.a)(a.g)(c||(c=Object(r.a)(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n  gap: 1rem;\n  flex-wrap: wrap;\n  min-height: calc(100% - 92px);\n\n  > *:first-child {\n    flex-basis: auto;\n  }\n"])))},56:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var c,r=n(8),a=n(50),i=n(9),s=Object(i.a)(a.c).attrs({outline:!1})(c||(c=Object(r.a)(["\n  width: 400px;\n  max-width: 100%;\n"])))},57:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var c=n(15),r=function e(t,n){Object(c.a)(this,e),this.id=t,this.name=n}},58:function(e,t,n){"use strict";n.d(t,"b",(function(){return r})),n.d(t,"a",(function(){return a}));var c=n(15),r={Pending:"pending",PartialJoin:"partial_join",Fullfilled:"fullfilled"},a=function e(t,n){var r=n.topic,a=n.users,i=n.state,s=n.createdAt,o=n.updatedAt;Object(c.a)(this,e),this.id=t,this.topic=r,this.users=a,this.state=i,this.createdAt=new Date(s),this.updatedAt=new Date(o)}},61:function(e,t,n){"use strict";n.d(t,"a",(function(){return f}));var c,r,a,i=n(22),s=n(69),o=n(8),u=(n(0),n(68)),l=n(50),j=n(9),b=n(1),h=Object(j.b)(c||(c=Object(o.a)(["\n  0% {\n    transform: rotateZ(0)\n  }\n\n  100% {\n    transform: rotateZ(360deg)\n  }\n"]))),d=j.a.div(r||(r=Object(o.a)(["\n  animation: "," infinite;\n  animation-duration: 1s;\n  animation-timing-function: linear;\n"])),h),p=j.a.div(a||(a=Object(o.a)(["\n  margin-left: 0.5rem;\n  display: inline-block;\n  line-height: 0;\n"]))),f=function(e){var t=e.isLoading,n=void 0!==t&&t,c=e.children,r=Object(s.a)(e,["isLoading","children"]);return Object(b.jsxs)(l.b,Object(i.a)(Object(i.a)({},r),{},{children:[c,n&&Object(b.jsx)(p,{children:Object(b.jsx)(d,{children:Object(b.jsx)(u.a,{})})})]}))}},82:function(e,t,n){"use strict";n.d(t,"a",(function(){return v}));var c=n(51),r=n.n(c),a=n(52),i=n(21),s=n(0),o=n(10),u=n(22),l=n(58),j=n(57),b=n(53);function h(e){return e.map((function(e){var t=new j.a(e.topic.id,e.topic.name);return new l.a(e.id,Object(u.a)(Object(u.a)({},e),{},{topic:t}))}))}function d(e){return p.apply(this,arguments)}function p(){return(p=Object(a.a)(r.a.mark((function e(t){var n,c,a,i;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,n=Object(b.a)(),c=t.getToken().value,n.apiBaseUrl){e.next=5;break}throw new Error("apiBaseUrl is not set in config");case 5:return e.next=7,fetch("".concat(n.apiBaseUrl,"/api/v1/chat"),{method:"GET",headers:{"content-type":"application/json",Authorization:"Bearer ".concat(c)}});case 7:if((a=e.sent).ok){e.next=11;break}throw console.error(a),new Error("Error making request to fetch user chats");case 11:return e.next=13,a.json();case 13:return i=e.sent,e.abrupt("return",h(i));case 17:throw e.prev=17,e.t0=e.catch(0),console.error("Error fetching chats",e.t0),e.t0;case 21:case"end":return e.stop()}}),e,null,[[0,17]])})))).apply(this,arguments)}function f(e){var t=new j.a(e.topic.id,e.topic.name);return new l.a(e.id,Object(u.a)(Object(u.a)({},e),{},{topic:t}))}function O(e,t){return m.apply(this,arguments)}function m(){return(m=Object(a.a)(r.a.mark((function e(t,n){var c,a,i,s;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,c=Object(b.a)(),a=n.getToken().value,c.apiBaseUrl){e.next=5;break}throw new Error("apiBaseUrl is not set in config");case 5:return e.next=7,fetch("".concat(c.apiBaseUrl,"/api/v1/chat/").concat(t),{method:"PUT",headers:{"content-type":"application/json",Authorization:"Bearer ".concat(a)}});case 7:if((i=e.sent).ok){e.next=11;break}throw console.error(i),new Error("Error updating user chat id ".concat(t));case 11:return e.next=13,i.json();case 13:return s=e.sent,e.abrupt("return",f(s));case 17:throw e.prev=17,e.t0=e.catch(0),console.error("Error updating chat",e.t0),e.t0;case 21:case"end":return e.stop()}}),e,null,[[0,17]])})))).apply(this,arguments)}var x=n(54);function v(){var e=Object(x.a)(!1),t=Object(i.a)(e,2),n=t[0],c=t[1],u=Object(x.a)(null),l=Object(i.a)(u,2),j=l[0],b=l[1],h=Object(x.a)([]),p=Object(i.a)(h,2),f=p[0],m=p[1],v=Object(x.a)(void 0),w=Object(i.a)(v,2),g=w[0],k=w[1],y=Object(o.b)(),C=Object(s.useCallback)(Object(a.a)(r.a.mark((function e(){var t;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c(!0),e.prev=1,e.next=4,d(y);case 4:t=e.sent,m(t),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),b(e.t0);case 11:return e.prev=11,c(!1),e.finish(11);case 14:case"end":return e.stop()}}),e,null,[[1,8,11,14]])}))),[c,b,y,m]),_=Object(s.useCallback)(function(){var e=Object(a.a)(r.a.mark((function e(t){var n;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c(!0),e.prev=1,e.next=4,O(t,y);case 4:n=e.sent,k(n),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),b(e.t0);case 11:return e.prev=11,c(!1),e.finish(11);case 14:case"end":return e.stop()}}),e,null,[[1,8,11,14]])})));return function(t){return e.apply(this,arguments)}}(),[c,b,y,k]);return Object(s.useMemo)((function(){return{loading:n,error:j,getChats:C,userChats:f,updateChat:_,updatedChat:g}}),[n,j,C,_,f,g])}}}]);
//# sourceMappingURL=6.74adae7e.chunk.js.map