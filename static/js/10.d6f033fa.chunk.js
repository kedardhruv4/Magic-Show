(this["webpackJsonpott-app"]=this["webpackJsonpott-app"]||[]).push([[10],{109:function(e,t,r){"use strict";r(1);var n=r(104),s=r(23),i=r(4);t.a=function(e){var t=e.control,r=e.name,a=e.label,o=e.type,c=e.id,l=e.placeholder,d=e.autoFocus,u=e.className,m=e.error;return Object(i.jsxs)(i.Fragment,{children:[a&&Object(i.jsx)(s.s,{className:"form-label",for:c,children:a},r+1),Object(i.jsx)(n.a,{control:t,name:r,render:function(e){var t=e.field,n=t.onChange,a=t.onBlur,g=t.value;return Object(i.jsx)(s.p,{type:o,onChange:n,onBlur:a,name:r,value:g,id:c,placeholder:l,autoFocus:d,className:u,invalid:Boolean(m)},r+3)}},r+2),m&&Object(i.jsx)(s.o,{children:m})]})}},110:function(e,t,r){"use strict";r.d(t,"a",(function(){return i})),r.d(t,"d",(function(){return a})),r.d(t,"e",(function(){return o})),r.d(t,"c",(function(){return c})),r.d(t,"b",(function(){return l}));var n=r(122),s=r(112);r.n(s)()(n);var i=n.object({email:n.string().email().required(),password:n.string().min(8).max(16).minLowercase(1).minUppercase(1).minNumbers(1).minSymbols(1).required()}),a=n.object({username:n.string().required(),email:n.string().email().required(),password:n.string().min(8).max(16).minLowercase(1).minUppercase(1).minNumbers(1).minSymbols(1).required(),terms:n.bool().oneOf([!0],"Please accept  privacy policy & terms").required()}),o=n.object({email:n.string().email().required()}),c=n.object({file:n.array().test("isFile","Please select file",(function(e){return e&&e[0]})).required(),title:n.string().required(),description:n.string().required(),isFree:n.string().required()}),l=n.object({title:n.string().required(),description:n.string().required(),isFree:n.string().required()});n.object({file:n.string().required(),title:n.string().required(),description:n.string().required(),isFree:n.string().required(),cover:n.string()})},112:function(e,t,r){"use strict";var n=function(e,t){return 1===t?e:"".concat(e,"s")},s=function(e){return null===e||void 0===e};function i(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=arguments.length>1?arguments[1]:void 0,r=t||"${path} must contain at least ${length} lowercase "+n("letter",e);return this.test({name:"minLowercase",exclusive:!0,message:r,params:{length:e},test:function(t){return s(t)||(t.match(/[a-z]/g)||[]).length>=e}})}function a(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=arguments.length>1?arguments[1]:void 0,r=t||"${path} must contain at least ${length} uppercase "+n("letter",e);return this.test({name:"minUppercase",exclusive:!0,message:r,params:{length:e},test:function(t){return s(t)||(t.match(/[A-Z]/g)||[]).length>=e}})}function o(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=arguments.length>1?arguments[1]:void 0,r=t||"${path} must contain at least ${length} "+n("number",e);return this.test({name:"minNumber",exclusive:!0,message:r,params:{length:e},test:function(t){return s(t)||(t.match(/[0-9]/g)||[]).length>=e}})}function c(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=arguments.length>1?arguments[1]:void 0,r=t||"${path} must contain at least ${length} "+n("symbol",e);return this.test({name:"minSymbol",exclusive:!0,message:r,params:{length:e},test:function(t){return s(t)||(t.match(/[^a-zA-Z0-9\s]/g)||[]).length>=e}})}function l(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:2,t=arguments.length>1?arguments[1]:void 0,r=t||"${path} must not contain sequences of more than ${length} repeated "+n("character",e);return this.test({name:"minRepeating",exclusive:!0,message:r,params:{length:e},test:function(t){return s(t)||!new RegExp("(.)\\1{".concat(e,",}")).test(t)}})}function d(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:2,t=arguments.length>1?arguments[1]:void 0,r=t||"${path} must contain at least ${length} "+n("word",e),i=new RegExp("[a-zA-Z0-9]");return this.test({name:"minWords",exclusive:!0,message:r,params:{length:e},test:function(t){return s(t)||t.split(" ").filter((function(e){return!!e&&i.test(e)})).length>=e}})}function u(){return this.min(8).max(250).minLowercase(1).minUppercase(1).minNumbers(1).minSymbols(1)}e.exports=function(e){e.addMethod(e.string,"minLowercase",i),e.addMethod(e.string,"minUppercase",a),e.addMethod(e.string,"minNumber",o),e.addMethod(e.string,"minNumbers",o),e.addMethod(e.string,"minSymbol",c),e.addMethod(e.string,"minSymbols",c),e.addMethod(e.string,"minRepeating",l),e.addMethod(e.string,"minWords",d),e.addMethod(e.string,"password",u)}},125:function(e,t,r){var n={"./error-dark.svg":126,"./error.svg":127,"./forgot-password-v2-dark.svg":128,"./forgot-password-v2.svg":129,"./login-v2-dark.svg":130,"./login-v2.svg":131,"./not-authorized-dark.svg":132,"./not-authorized.svg":133,"./register-v2-dark.svg":134,"./register-v2.svg":135};function s(e){var t=i(e);return r(t)}function i(e){if(!r.o(n,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return n[e]}s.keys=function(){return Object.keys(n)},s.resolve=i,e.exports=s,s.id=125},126:function(e,t,r){"use strict";r.r(t),t.default=r.p+"static/media/error-dark.2e51fb62.svg"},127:function(e,t,r){"use strict";r.r(t),t.default=r.p+"static/media/error.b0b2d5e5.svg"},128:function(e,t,r){"use strict";r.r(t),t.default=r.p+"static/media/forgot-password-v2-dark.2a444581.svg"},129:function(e,t,r){"use strict";r.r(t),t.default=r.p+"static/media/forgot-password-v2.7e57d769.svg"},130:function(e,t,r){"use strict";r.r(t),t.default=r.p+"static/media/login-v2-dark.771ce3e0.svg"},131:function(e,t,r){"use strict";r.r(t),t.default=r.p+"static/media/login-v2.9110dc85.svg"},132:function(e,t,r){"use strict";r.r(t),t.default=r.p+"static/media/not-authorized-dark.708fbbd8.svg"},133:function(e,t,r){"use strict";r.r(t),t.default=r.p+"static/media/not-authorized.1e84b555.svg"},134:function(e,t,r){"use strict";r.r(t),t.default=r.p+"static/media/register-v2-dark.558acd10.svg"},135:function(e,t,r){"use strict";r.r(t),t.default=r.p+"static/media/register-v2.4533a9b0.svg"},142:function(e,t,r){},360:function(e,t,r){"use strict";r.r(t);var n=r(24),s=r(17),i=r.n(s),a=r(3),o=r(33),c=r(123),l=r(1),d=r.n(l),u=r(0),m=r.n(u);function g(){return g=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},g.apply(this,arguments)}function p(e,t){if(null==e)return{};var r,n,s=function(e,t){if(null==e)return{};var r,n,s={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(s[r]=e[r]);return s}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(s[r]=e[r])}return s}var f=Object(l.forwardRef)((function(e,t){var r=e.color,n=void 0===r?"currentColor":r,s=e.size,i=void 0===s?24:s,a=p(e,["color","size"]);return d.a.createElement("svg",g({ref:t,xmlns:"http://www.w3.org/2000/svg",width:i,height:i,viewBox:"0 0 24 24",fill:"none",stroke:n,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},a),d.a.createElement("polyline",{points:"15 18 9 12 15 6"}))}));f.propTypes={color:m.a.string,size:m.a.oneOfType([m.a.string,m.a.number])},f.displayName="ChevronLeft";var h=f,v=r(23),b=(r(142),r(104)),j=r(116),x=r(109),O=r(110),y=r(34),w=r(32),N=r(137),k=r(4);t.default=function(){var e,t=Object(c.a)().skin,s=Object(w.c)((function(e){var t;return null===e||void 0===e||null===(t=e.authReducer)||void 0===t?void 0:t.user})),d="dark"===t?"forgot-password-v2-dark.svg":"forgot-password-v2.svg",u=r(125)("./".concat(d)).default,m=Object(a.f)(),g=Object(w.b)(),p=Object(b.e)({resolver:Object(j.a)(O.e)}),f=p.handleSubmit,L=p.control,F=p.formState.errors,q=function(){var e=Object(n.a)(i.a.mark((function e(t){var r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g(Object(N.b)(t));case 2:200===(null===(r=e.sent)||void 0===r?void 0:r.status)&&(y.b.success("Reset mail send succcessfully"),m("/login"));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(l.useEffect)((function(){null!==s&&void 0!==s&&s.length&&m("/movies")}),[s]),Object(k.jsx)("div",{className:"auth-wrapper auth-cover",children:Object(k.jsxs)(v.C,{className:"auth-inner m-0",children:[Object(k.jsxs)(o.b,{className:"brand-logo",to:"/",onClick:function(e){return e.preventDefault()},children:[Object(k.jsxs)("svg",{viewBox:"0 0 139 95",version:"1.1",height:"28",children:[Object(k.jsxs)("defs",{children:[Object(k.jsxs)("linearGradient",{x1:"100%",y1:"10.5120544%",x2:"50%",y2:"89.4879456%",id:"linearGradient-1",children:[Object(k.jsx)("stop",{stopColor:"#000000",offset:"0%"}),Object(k.jsx)("stop",{stopColor:"#FFFFFF",offset:"100%"})]}),Object(k.jsxs)("linearGradient",{x1:"64.0437835%",y1:"46.3276743%",x2:"37.373316%",y2:"100%",id:"linearGradient-2",children:[Object(k.jsx)("stop",{stopColor:"#EEEEEE",stopOpacity:"0",offset:"0%"}),Object(k.jsx)("stop",{stopColor:"#FFFFFF",offset:"100%"})]})]}),Object(k.jsx)("g",{id:"Page-1",stroke:"none",strokeWidth:"1",fill:"none",fillRule:"evenodd",children:Object(k.jsx)("g",{id:"Artboard",transform:"translate(-400.000000, -178.000000)",children:Object(k.jsxs)("g",{id:"Group",transform:"translate(400.000000, 178.000000)",children:[Object(k.jsx)("path",{d:"M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z",id:"Path",className:"text-primary",style:{fill:"currentColor"}}),Object(k.jsx)("path",{d:"M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z",id:"Path",fill:"url(#linearGradient-1)",opacity:"0.2"}),Object(k.jsx)("polygon",{id:"Path-2",fill:"#000000",opacity:"0.049999997",points:"69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325"}),Object(k.jsx)("polygon",{id:"Path-2",fill:"#000000",opacity:"0.099999994",points:"69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338"}),Object(k.jsx)("polygon",{id:"Path-3",fill:"url(#linearGradient-2)",opacity:"0.099999994",points:"101.428699 0 83.0667527 94.1480575 130.378721 47.0740288"})]})})})]}),Object(k.jsx)("h2",{className:"brand-text text-primary ms-1",children:"OTT-APP"})]}),Object(k.jsx)(v.i,{className:"d-none d-lg-flex align-items-center p-5",lg:"8",sm:"12",children:Object(k.jsx)("div",{className:"w-100 d-lg-flex align-items-center justify-content-center px-5",children:Object(k.jsx)("img",{className:"img-fluid",src:u,alt:"Login Cover"})})}),Object(k.jsx)(v.i,{className:"d-flex align-items-center auth-bg px-2 p-lg-5",lg:"4",sm:"12",children:Object(k.jsxs)(v.i,{className:"px-xl-2 mx-auto",sm:"8",md:"6",lg:"12",children:[Object(k.jsx)(v.h,{tag:"h2",className:"fw-bold mb-1",children:"Forgot Password? \ud83d\udd12"}),Object(k.jsx)(v.g,{className:"mb-2",children:"Enter your email and we'll send you instructions to reset your password"}),Object(k.jsxs)(v.n,{className:"auth-forgot-password-form mt-2",onSubmit:f(q),children:[Object(k.jsx)("div",{className:"mb-1",children:Object(k.jsx)(x.a,{control:L,name:"email",label:"Email",type:"email",id:"login-email",placeholder:"john@example.com",autoFocus:!0,className:"",error:null===F||void 0===F||null===(e=F.email)||void 0===e?void 0:e.message})}),Object(k.jsx)(v.b,{color:"primary",block:!0,type:"submit",children:"Send reset link"})]}),Object(k.jsx)("p",{className:"text-center mt-2",children:Object(k.jsxs)(o.b,{to:"/login",children:[Object(k.jsx)(h,{className:"rotate-rtl me-25",size:14}),Object(k.jsx)("span",{className:"align-middle",children:"Back to login"})]})})]})})]})})}}}]);
//# sourceMappingURL=10.d6f033fa.chunk.js.map