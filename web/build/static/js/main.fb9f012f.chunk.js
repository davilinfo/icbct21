(this.webpackJsonpweb=this.webpackJsonpweb||[]).push([[0],{10:function(e,t,a){},176:function(e,t,a){e.exports=a(395)},217:function(e,t){},220:function(e,t){},222:function(e,t){},255:function(e,t){},256:function(e,t){},307:function(e,t){},395:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(12),c=a.n(l),s=a(1),i=a.n(s),o=a(6),d=a(2),u=a(172),m=a.n(u).a.create({baseURL:"http://www.liskrestaurant.com:3334"});a(10);var p=function(e){var t=e.food;return r.a.createElement("li",null," ",t.food," ")},E=a(21),v=a(34),b=a(173),h=a.n(b);var f=function(e){var t=e.onSubmit,a=Object(n.useState)(""),l=Object(d.a)(a,2),c=l[0],s=l[1],u=Object(n.useState)(""),m=Object(d.a)(u,2),p=m[0],E=m[1],v=Object(n.useState)(""),b=Object(d.a)(v,2),h=b[0],f=b[1],g=Object(n.useState)(""),y=Object(d.a)(g,2),O=y[0],w=y[1];function j(){return(j=Object(o.a)(i.a.mark((function e(a){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.preventDefault(),e.next=3,t({username:c,phone:p,deliveryaddress:h,observation:O});case 3:s(""),E(""),f(""),w("");case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return r.a.createElement("div",{id:"app"},r.a.createElement("div",{id:"content",align:"center"},r.a.createElement("form",{onSubmit:function(e){return j.apply(this,arguments)}},r.a.createElement("input",{type:"hidden",id:"request_type",name:"request_type"}),r.a.createElement("div",null,r.a.createElement("label",null,"Your Name")),r.a.createElement("div",null,r.a.createElement("input",{type:"text",id:"username",name:"username",required:!0,onChange:function(e){return s(e.target.value)}})),r.a.createElement("div",null,r.a.createElement("label",null,"Your phone")),r.a.createElement("div",null,r.a.createElement("input",{type:"text",id:"phone",name:"phone",required:!0,onChange:function(e){return E(e.target.value)}})),r.a.createElement("div",null,r.a.createElement("label",null,"Delivery address")),r.a.createElement("div",null,r.a.createElement("textarea",{rows:"5",id:"deliveryaddress",name:"deliveryaddress",required:!0,onChange:function(e){return f(e.target.value)}})),r.a.createElement("div",null,r.a.createElement("label",null,"Any observation")),r.a.createElement("div",null,r.a.createElement("textarea",{rows:"5",id:"observation",name:"observation",onChange:function(e){return w(e.target.value)}})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"Place your order")))))};var g=function(e){var t=document.location.pathname.split("/")[2],a=Object(n.useState)([]),l=Object(d.a)(a,2),s=l[0],u=l[1],p=Object(n.useState)([]),E=Object(d.a)(p,2),v=E[0],b=E[1],g=Object(n.useState)(""),y=Object(d.a)(g,2),O=y[0],w=y[1];function j(){return(j=Object(o.a)(i.a.mark((function e(a){var n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.request_type=t,e.next=3,m.post("/storeQrCode",a);case 3:v=e.sent,b(v),O=encodeURI("recipient=".concat(v.data.response.split("&")[0].split("=")[1]).concat("&amount=").concat(v.data.response.split("&")[1].split("=")[1]).concat("&food=").concat(v.data.response.split("&")[2].split("=")[1]).concat("&foodtype=").concat(v.data.response.split("&")[3].split("=")[1]).concat("&timestamp=").concat(v.data.response.split("&")[4].split("=")[1]).concat("&username=").concat(v.data.response.split("&")[5].split("=")[1]).concat("&phone=").concat(v.data.response.split("&")[6].split("=")[1]).concat("&deliveryaddress=").concat(v.data.response.split("&")[7].split("=")[1]).concat("&observation=").concat(void 0!==v.data.response.split("&")[8]?v.data.response.split("&")[8].split("=")[1]:"")),w(O),n=r.a.createElement("div",{className:"recipes_topic"},r.a.createElement("img",{src:"../".concat(s.img),width:"200",height:"200",alt:""}),r.a.createElement("br",null),r.a.createElement("p",null,"Food description: ",s.description),r.a.createElement("p",null,"Amount: ",s.amount),r.a.createElement("br",null),v.data.status,r.a.createElement("br",null),r.a.createElement("label",null,"Point the camera of your phone to the qr code. Once loaded proceed with the payment"),r.a.createElement("br",null),r.a.createElement("div",{id:"divqrcode"},r.a.createElement("div",{id:"divqrcode"},r.a.createElement(h.a,{value:v.data.response}))),r.a.createElement("br",null),r.a.createElement("a",{href:"/FoodOrderPayment?".concat(O),querystring:"".concat(O)},"Or proceed with direct payment here"),r.a.createElement("div",{className:"clear"})),c.a.render(n,document.getElementById("content"));case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(n.useEffect)((function(){function e(){return(e=Object(o.a)(i.a.mark((function e(){var a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("loading food"),e.next=3,m.get("/foodDetail/".concat(t));case 3:a=e.sent,s=a.data.response,u(s);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]),r.a.createElement("div",{id:"app"},r.a.createElement("div",{id:"content",align:"center"},r.a.createElement("img",{src:"../".concat(s.img),width:"200",height:"200",alt:""}),r.a.createElement("div",{className:"recipes_topic"},s.food,r.a.createElement("br",null),r.a.createElement("p",{style:{width:300}},"Food description: ",s.description),"Amount: ",s.amount,r.a.createElement("br",null),r.a.createElement("div",{className:"clear"})),r.a.createElement("br",null),r.a.createElement(f,{onSubmit:function(e){return j.apply(this,arguments)}})))};var y=function(e){var t=e.food;return r.a.createElement(r.a.Fragment,null,r.a.createElement(E.b,{exact:!0,to:"/FoodOrderQrCode/".concat(t.type)},r.a.createElement("div",{className:"recipes_topic"},r.a.createElement("img",{src:t.img,width:"72",height:"72",alt:""}),r.a.createElement("br",null),r.a.createElement("span",{className:"headline"},t.food)," ",r.a.createElement("br",null),t.description,r.a.createElement("div",{className:"clear"}))),r.a.createElement(v.a,{path:"/FoodOrderQrCode/".concat(t.type),key:t.type,component:g}))};var O=function(){var e=Object(n.useState)([]),t=Object(d.a)(e,2),a=t[0],l=t[1];return Object(n.useEffect)((function(){function e(){return(e=Object(o.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("loading foods"),e.next=3,m.get("/list");case 3:t=e.sent,a=t.data.result,l(a);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]),r.a.createElement("div",{id:"app"},r.a.createElement("div",{id:"content"},r.a.createElement("div",{id:"leftPan"},r.a.createElement("div",{id:"welcome"},r.a.createElement("h2",null),r.a.createElement("img",{src:"images/img_welcome.jpg",width:"72",height:"72",alt:""}),r.a.createElement("p",null,r.a.createElement("span",{className:"headline"},"Enjoy delicious food"),r.a.createElement("br",null),"Seafood, meat, barbecue, menu and delicious dessert created for you. Payment and transactions details managed by Lisk Restaurant sidechain "),r.a.createElement("div",{className:"clear"})),r.a.createElement("div",{id:"services"},r.a.createElement("h2",null),r.a.createElement("p",{className:"headline2"},"You have the option to choose the following entrances."),r.a.createElement("ul",null,a.filter((function(e){return 1===e.category})).map((function(e){return r.a.createElement(p,{key:e.type,food:e})}))),r.a.createElement("div",{className:"clear"}),r.a.createElement("br",null),r.a.createElement("p",{className:"headline2"},"You have the option to choose the following menu."),r.a.createElement("ul",null,a.filter((function(e){return 2===e.category})).map((function(e){return r.a.createElement(r.a.Fragment,null,r.a.createElement(p,{key:e.type,food:e}),r.a.createElement("br",null))}))),r.a.createElement("div",{className:"clear"}),r.a.createElement("br",null),r.a.createElement("p",{className:"headline2"},"You have the option to choose the following desserts."),r.a.createElement("ul",null,a.filter((function(e){return 3===e.category})).map((function(e){return r.a.createElement(p,{key:e.type,food:e})}))),r.a.createElement("div",{className:"clear"}))),r.a.createElement("div",{id:"rightPan"},r.a.createElement("div",{id:"recipes"},r.a.createElement("h2",null),a.map((function(e){return r.a.createElement(y,{key:e.type,food:e})})))),r.a.createElement("div",{className:"clear",id:"end"})))};var w=function(){return r.a.createElement("div",{id:"app"},r.a.createElement("div",{id:"content"},r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("p",{className:"headline2",align:"center"},"Our History"),r.a.createElement("div",{className:"headline2",align:"center"},r.a.createElement("p",null," Luxury restaurant was created as a Proof of Concept for Lisk sidechain blockchain.")),r.a.createElement("div",{className:"headline2",align:"center"},r.a.createElement("p",null,"The goal is to demonstrate how easy can be to create a restaurant based backend that consumes the restaurant sidechain.")),r.a.createElement("div",{className:"headline2",align:"center"},r.a.createElement("p",null,"This site represents a sea food luxury restaurant. It's possible to list all the food offered by this restaurant in the home page.")),r.a.createElement("div",{className:"headline2",align:"center"},"Also, it is possible to click on a food preference and command a desired food option."),r.a.createElement("div",{className:"headline2",align:"center"},"Once commanded the food then a FoodTransaction will be created in the restaurant sidechain,",r.a.createElement("br",null),"the transaction value will be placed on the restaurant Lisk address and the value will be debited from the sender wallet."),r.a.createElement("div",{className:"clear"}),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("br",null)))};var j=function(){var e=Object(n.useState)([]),t=Object(d.a)(e,2),a=t[0],l=t[1];return Object(n.useEffect)((function(){function e(){return(e=Object(o.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("loading foods"),e.next=3,m.get("/list");case 3:t=e.sent,a=t.data.result,l(a);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]),r.a.createElement("div",{id:"app"},r.a.createElement("div",{id:"content"},r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("div",{id:"rightPan"},r.a.createElement("ul",{style:{marginLeft:280,width:300}},a.filter((function(e){return 2===e.category})).map((function(e){return r.a.createElement(r.a.Fragment,null,r.a.createElement(y,{key:e.type,food:e}),r.a.createElement("br",null))})))),r.a.createElement("div",{className:"clear",id:"end"}),r.a.createElement("br",null),r.a.createElement("br",null)))},S=a(7),N=a(310);var x=function(e,t){var a=e.onSubmit,l=Object(n.useState)(""),c=Object(d.a)(l,2),s=c[0],u=c[1],p=decodeURI(document.location.href.split("?")[1]);function E(){return(E=Object(o.a)(i.a.mark((function e(t){var n,r,l,c,o,d;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,m.post("/cryptography",{text:p[5].split("=")[1]});case 3:return n=e.sent,e.next=6,m.post("/cryptography",{text:p[6].split("=")[1]});case 6:return r=e.sent,e.next=9,m.post("/cryptography",{text:p[7].split("=")[1]});case 9:if(l=e.sent,c="",void 0===p[8]){e.next=15;break}return e.next=14,m.post("/cryptography",{text:p[8].split("=")[1]});case 14:c=e.sent;case 15:return o=S.encryptMessageWithPassphrase(p[5].split("=")[1].concat(" ***Field*** ").concat(p[6].split("=")[1]).concat(" ***Field*** ").concat(p[7].split("=")[1]).concat(" ***Field*** ").concat(p[8].split("=")[1]),s,S.getPrivateAndPublicKeyFromPassphrase(s).publicKey),(d=new N({asset:{name:p[2].split("=")[1],description:p[2].split("=")[1],username:n.data.response,phone:r.data.response,deliveryaddress:l.data.response,foodType:p[3].split("=")[1],observation:void 0!==c.data?c.data.response:"",clientData:o.encryptedMessage,clientNonce:o.nonce},amount:p[1].split("=")[1].toString(),recipientId:p[0].split("=")[1],timestamp:parseInt(p[4].split("=")[1])})).sign(s),e.next=20,a({txFood:d});case 20:u("");case 21:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return null!==p&&void 0!==p&&(p=p.split("&")),r.a.createElement("div",{id:"app"},r.a.createElement("div",{id:"content",align:"center"},r.a.createElement("form",{onSubmit:function(e){return E.apply(this,arguments)}},r.a.createElement("div",null,r.a.createElement("label",null,"Your Lisk Passphrase")),r.a.createElement("div",null,r.a.createElement("input",{type:"password",id:"passphrase",name:"passphrase",required:!0,onChange:function(e){return u(e.target.value)}})),r.a.createElement("div",null,r.a.createElement("label",null,"copy this passphrase and test above if desired: wagon stock borrow episode laundry kitten salute link globe zero feed marble")),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"Order")))))};var k=function(e){var t=document.location.href.split("?")[1],a=Object(n.useState)([]),l=Object(d.a)(a,2),s=l[0],u=l[1];function p(){return(p=Object(o.a)(i.a.mark((function e(t){var a,n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.post("/payment",{transaction:t.txFood,networkid:"identifier"});case 2:s=e.sent,console.log(s),u(s),"Transaction result"===s.data.status?(a=r.a.createElement("div",{className:"recipes_topic"},s.data.status,r.a.createElement("br",null),"Transaction id: ",s.data.response.transaction.id,r.a.createElement("br",null),"Paid Amount: LSK ",s.data.response.transaction.amount/1e8,r.a.createElement("br",null),"Payer LSK address: ",s.data.response.transaction.senderId,r.a.createElement("br",null),"Restaurant LSK address: ",s.data.response.transaction.recipientId,r.a.createElement("br",null),"Broadcast info: ",s.data.response.broadcastInfo.data.message,r.a.createElement("div",{className:"clear"})),c.a.render(a,document.getElementById("content"))):(n=r.a.createElement("div",{className:"recipes_topic"},"Transaction result: ",s.data.status,r.a.createElement("div",{className:"clear"})),c.a.render(n,document.getElementById("content")));case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return r.a.createElement("div",{id:"app"},r.a.createElement("div",{id:"content",align:"center"},r.a.createElement(x,{onSubmit:function(e){return p.apply(this,arguments)},orderstring:t})))},C=a(7);var I=function(e){var t=e.onSubmit,a=Object(n.useState)(""),l=Object(d.a)(a,2),c=l[0],s=l[1],u=Object(n.useState)(""),m=Object(d.a)(u,2),p=m[0],E=m[1],v=Object(n.useState)(""),b=Object(d.a)(v,2),h=b[0],f=b[1],g=Object(n.useState)(""),y=Object(d.a)(g,2),O=y[0],w=y[1];function j(){return(j=Object(o.a)(i.a.mark((function e(a){var n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.preventDefault(),n=C.encryptPassphraseWithPassword(p,"luxuryRestaurant"),e.next=4,t({username:c,phone:h,deliveryaddress:O,encryptedPassphrase:n});case 4:s(""),f(""),w(""),E("");case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return r.a.createElement("div",{id:"app"},r.a.createElement("div",{id:"content",align:"center"},r.a.createElement("form",{onSubmit:function(e){return j.apply(this,arguments)}},r.a.createElement("input",{type:"hidden",id:"request_type",name:"request_type"}),r.a.createElement("div",null,r.a.createElement("label",null,"Your Name")),r.a.createElement("div",null,r.a.createElement("input",{type:"text",id:"username",name:"username",required:!0,onChange:function(e){return s(e.target.value)}})),r.a.createElement("div",null,r.a.createElement("label",null,"Your phone")),r.a.createElement("div",null,r.a.createElement("input",{type:"text",id:"phone",name:"phone",required:!0,onChange:function(e){return f(e.target.value)}})),r.a.createElement("div",null,r.a.createElement("label",null,"Delivery address")),r.a.createElement("div",null,r.a.createElement("textarea",{rows:"5",id:"deliveryaddress",name:"deliveryaddress",required:!0,onChange:function(e){return w(e.target.value)}})),r.a.createElement("div",null,r.a.createElement("label",null,"Your Lisk Passphrase")),r.a.createElement("div",null,r.a.createElement("input",{type:"text",id:"passphrase",name:"passphrase",required:!0,onChange:function(e){return E(e.target.value)}})),r.a.createElement("div",null,r.a.createElement("label",null,"copy this passphrase and test above if desired: wagon stock borrow episode laundry kitten salute link globe zero feed marble")),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"Order")))))},P=a(55);var q=function(e){var t=document.location.pathname.split("/")[2],a=Object(n.useState)([]),l=Object(d.a)(a,2),s=l[0],u=l[1],p=Object(n.useState)([]),E=Object(d.a)(p,2),v=E[0],b=E[1];function h(){return(h=Object(o.a)(i.a.mark((function e(a){var n,l;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.request_type=t,a.userid=1,e.next=4,m.post("/userRequest",a);case 4:v=e.sent,b(v),"Transaction result"===v.data.status?(n=r.a.createElement("div",{className:"recipes_topic"},r.a.createElement("img",{src:"../".concat(s.img),width:"200",height:"200",alt:""}),r.a.createElement("br",null),r.a.createElement("p",null,"Food description:  ",s.description),r.a.createElement("p",null,v.data.status,r.a.createElement("br",null),"Transaction id: ",v.data.response.transaction.id,r.a.createElement("br",null),"Paid Amount: LSK ",P.utils.convertBeddowsToLSK(v.data.response.transaction.amount),r.a.createElement("br",null),"Payer address: ",v.data.response.transaction.senderId,r.a.createElement("br",null),"Restaurant address: ",v.data.response.transaction.recipientId,r.a.createElement("br",null),"Broadcast info: ",v.data.response.broadcastInfo.data.message),r.a.createElement("div",{className:"clear"})),c.a.render(n,document.getElementById("content"))):(l=r.a.createElement("div",{className:"recipes_topic"},r.a.createElement("img",{src:"../".concat(s.img),width:"200",height:"200",alt:""}),r.a.createElement("br",null),r.a.createElement("p",null,"Food description:  ",s.description),r.a.createElement("p",null,v.data.status,r.a.createElement("br",null),v.data.response.transaction,r.a.createElement("br",null),"Broadcast info: ",v.data.response.broadcastInfo.data.message),r.a.createElement("div",{className:"clear"})),c.a.render(l,document.getElementById("content")));case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(n.useEffect)((function(){function e(){return(e=Object(o.a)(i.a.mark((function e(){var a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("loading food"),e.next=3,m.get("/foodDetail/".concat(t));case 3:a=e.sent,s=a.data.response,u(s);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]),r.a.createElement("div",{id:"app"},r.a.createElement("div",{id:"content",align:"center"},r.a.createElement("img",{src:"../".concat(s.img),width:"200",height:"200",alt:""}),r.a.createElement("div",{className:"recipes_topic"},r.a.createElement("p",null,s.food,r.a.createElement("br",null),r.a.createElement("p",{style:{width:300}},"Food description: ",s.description),r.a.createElement("br",null),"Amount: ",s.amount),r.a.createElement("div",{className:"clear"})),r.a.createElement(I,{onSubmit:function(e){return h.apply(this,arguments)}})))};var _=function(e){var t=e.onSubmit,a=Object(n.useState)(""),l=Object(d.a)(a,2),c=l[0],s=l[1],u=Object(n.useState)(""),m=Object(d.a)(u,2),p=m[0],E=m[1],v=Object(n.useState)(""),b=Object(d.a)(v,2),h=b[0],f=b[1],g=Object(n.useState)(""),y=Object(d.a)(g,2),O=y[0],w=y[1];function j(){return(j=Object(o.a)(i.a.mark((function e(a){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.preventDefault(),e.next=3,t({transactionId:O,amount:c,recipientAddress:p,password:h});case 3:s(""),E(""),f(""),w("");case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(n.useEffect)((function(){})),r.a.createElement("div",{id:"app"},r.a.createElement("div",{id:"content",align:"center"},r.a.createElement("form",{onSubmit:function(e){return j.apply(this,arguments)}},r.a.createElement("input",{type:"hidden",id:"request_type",name:"request_type"}),r.a.createElement("div",null,r.a.createElement("label",null,"Transaction id")),r.a.createElement("div",null,r.a.createElement("input",{type:"text",id:"transactionId",name:"transactionId",required:!0,onChange:function(e){return w(e.target.value)}})),r.a.createElement("div",null,r.a.createElement("label",null,"LSK Amount")),r.a.createElement("div",null,r.a.createElement("input",{type:"text",id:"amount",name:"amount",required:!0,onChange:function(e){return s(e.target.value)}})),r.a.createElement("div",null,r.a.createElement("label",null,"LSK Recipient address to be refunded")),r.a.createElement("div",null,r.a.createElement("input",{type:"text",id:"recipientAddress",name:"recipientAddress",required:!0,onChange:function(e){return E(e.target.value)}})),r.a.createElement("div",null,r.a.createElement("label",null,"Password")),r.a.createElement("div",null,r.a.createElement("input",{type:"password",id:"password",name:"password",required:!0,onChange:function(e){return f(e.target.value)}})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"Refund")))))},A=a(55);var F=function(e){var t=Object(n.useState)([]),a=Object(d.a)(t,2),l=a[0],s=a[1];function u(){return(u=Object(o.a)(i.a.mark((function e(t){var a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.post("/refund",t);case 2:l=e.sent,s(l),a=r.a.createElement("div",{className:"recipes_topic"},"Transaction result: ",l.data.status,r.a.createElement("br",null),"Refund Transaction id: ",l.data.response.transaction.id,r.a.createElement("br",null),"Paid Amount: LSK ",A.utils.convertBeddowsToLSK(l.data.response.transaction.amount),r.a.createElement("br",null),"Payer LSK address: ",l.data.response.transaction.senderId,r.a.createElement("br",null),"Restaurant LSK address: ",l.data.response.transaction.recipientId,r.a.createElement("br",null),"Broadcast info: ",l.data.response.broadcastInfo.data.message,r.a.createElement("div",{className:"clear"})),c.a.render(a,document.getElementById("content"));case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return r.a.createElement("div",{id:"app"},r.a.createElement("div",{id:"content",align:"center"},r.a.createElement(_,{onSubmit:function(e){return u.apply(this,arguments)}})))},L=a(7);var R=function(e){var t=e.onSubmit,a=Object(n.useState)(""),l=Object(d.a)(a,2),c=l[0],s=l[1],u=Object(n.useState)(""),p=Object(d.a)(u,2),E=p[0],v=p[1],b=Object(n.useState)(""),h=Object(d.a)(b,2),f=h[0],g=h[1];function y(){return(y=Object(o.a)(i.a.mark((function e(a){var n,r,l,o,d;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.preventDefault(),n=L.getAddressAndPublicKeyFromPassphrase(f).address,r=L.getAddressAndPublicKeyFromPassphrase(f).publicKey,e.next=5,m.post("/transaction",{transactionId:c,phone:E,address:n});case 5:l=e.sent,o="",d="";try{o=l.data.response.data.length>0&&void 0!==l.data.response.data[0].asset.clientNonce?L.decryptMessageWithPassphrase(l.data.response.data[0].asset.clientData,l.data.response.data[0].asset.clientNonce,f,r):"",d={foodRequest:l,phone:""!==o?o.split(" ***Field*** ")[1]:l.data.response.data[0].asset.phone,deliveryAddress:""!==o?o.split(" ***Field*** ")[2]:l.data.response.data[0].asset.deliveryaddress,user:""!==o?o.split(" ***Field*** ")[0]:l.data.response.data[0].asset.username,observation:""!==o?o.split(" ***Field*** ")[3]:""}}catch(a){alert("Something wrong with this search data"),d={foodRequest:l,phone:"***",deliveryAddress:"***",user:"***",observation:"***"}}return e.next=11,t({result:d});case 11:s(""),v(""),g("");case 14:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return r.a.createElement("div",{id:"app"},r.a.createElement("div",{id:"content",align:"center"},r.a.createElement("form",{onSubmit:function(e){return y.apply(this,arguments)}},r.a.createElement("input",{type:"hidden",id:"request_type",name:"request_type"}),r.a.createElement("div",null,r.a.createElement("label",null,"Transaction id")),r.a.createElement("div",null,r.a.createElement("input",{type:"text",id:"transactionId",name:"transactionId",required:!0,onChange:function(e){return s(e.target.value)}})),r.a.createElement("div",null,r.a.createElement("label",null,"Phone number")),r.a.createElement("div",null,r.a.createElement("input",{type:"text",id:"phone",name:"phone",onChange:function(e){return v(e.target.value)}})),r.a.createElement("div",null,r.a.createElement("label",null,"Passphrase")),r.a.createElement("div",null,r.a.createElement("input",{type:"password",id:"passphrase",name:"passphrase",onChange:function(e){return g(e.target.value)}})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"Retrieve information of transaction requested")))))},T=a(55);var K=function(e){var t=Object(n.useState)([]),a=Object(d.a)(t,2),l=a[0],s=a[1],u=Object(n.useState)(""),m=Object(d.a)(u,2),p=m[0],E=m[1],v=Object(n.useState)(""),b=Object(d.a)(v,2),h=b[0],f=b[1],g=Object(n.useState)(""),y=Object(d.a)(g,2),O=y[0],w=y[1],j=Object(n.useState)(""),S=Object(d.a)(j,2),N=S[0],x=S[1];function k(){return(k=Object(o.a)(i.a.mark((function e(t){var a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:l=t.result.foodRequest,p=t.result.phone,h=t.result.deliveryAddress,O=t.result.user,N=t.result.observation,s(l),E(p),f(h),x(N),w(O),a=r.a.createElement("div",{className:"recipes_topic"},l.data.status,r.a.createElement("br",null),"Transaction id: ",l.data.response.data.length>0?l.data.response.data[0].id:"",r.a.createElement("br",null),"Payer LSK address: ",l.data.response.data.length>0?l.data.response.data[0].senderId:"",r.a.createElement("br",null),"Restaurant LSK address: ",l.data.response.data.length>0?l.data.response.data[0].recipientId:"",r.a.createElement("br",null),"Food name: ",l.data.response.data.length>0?l.data.response.data[0].asset.name:"",r.a.createElement("br",null),"Amount: LSK ",l.data.response.data.length>0?T.utils.convertBeddowsToLSK(l.data.response.data[0].amount):0,r.a.createElement("br",null),"Phone: ",p,r.a.createElement("br",null),"Delivery address: ",h,r.a.createElement("br",null),"User: ",O,r.a.createElement("br",null),"Observation: ",N,r.a.createElement("div",{className:"clear"})),c.a.render(a,document.getElementById("content"));case 12:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return r.a.createElement("div",{id:"app"},r.a.createElement("div",{id:"content",align:"center"},r.a.createElement(R,{onSubmit:function(e){return k.apply(this,arguments)}})))};var D=function(){return r.a.createElement("div",{id:"header"},r.a.createElement("img",{src:"./images/logo.jpg",width:"438",height:"93",alt:"",id:"logo"})," ",r.a.createElement("img",{src:"./images/slogan.gif",width:"190",height:"81",alt:"",id:"slogan"}),r.a.createElement("ul",{className:"menu"},r.a.createElement("li",{className:"btn_1"},r.a.createElement(E.c,{exact:!0,activeClassName:"active",to:"/"},"Home")),r.a.createElement("li",{className:"line"}),r.a.createElement("li",{className:"btn_2"},r.a.createElement(E.c,{exact:!0,activeClassName:"active",to:"/History"},"Our History")),r.a.createElement("li",{className:"line"}),r.a.createElement("li",{className:"btn_3"},r.a.createElement(E.c,{exact:!0,activeClassName:"active",to:"/Menu"},"Menu")),r.a.createElement("li",{className:"line"}),r.a.createElement("li",{className:"btn_8"},r.a.createElement(E.c,{exact:!0,activeClassName:"active",to:"/Refund"},"Refund")),r.a.createElement("li",{className:"line"}),r.a.createElement("li",{className:"btn_7"},r.a.createElement(E.c,{exact:!0,activeClassName:"active",to:"/Reservation"},"Reservations")),r.a.createElement("li",{className:"line"}),r.a.createElement("li",{className:"btn_6"},r.a.createElement(E.c,{exact:!0,activeClassName:"active",to:"/Contact"},"Contacts"))))};var B=function(){return r.a.createElement("div",{id:"footer"},r.a.createElement("br",null),r.a.createElement("div",{align:"center"},"Copyright \xa9 Dav1 | Design by ",r.a.createElement("a",{href:"http://freshtemplates.com/"},"Website Templates")))};var M=function(){return r.a.createElement("div",{id:"app"},r.a.createElement("div",{id:"content"},r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("div",{align:"center"},r.a.createElement("div",{className:"recipes_topic"},r.a.createElement("img",{src:"./images/davi_paris.jpg",width:"200",height:"150",alt:""}),r.a.createElement("p",null,r.a.createElement("span",{className:"headline"},"https://github.com/davilinfo")," ",r.a.createElement("br",null),"Author: Davi"),r.a.createElement("p",null,"Lisk community discord id: Dav1"),r.a.createElement("p",null,"Email: dav1@liskrestaurant.com"),r.a.createElement("p",null,"Scientific work: A Strategy for Mitigating Denial of Service Attacks on Nodes with Delegate Account of Lisk Blockchain"),r.a.createElement("p",null,"ACM book title: 2020 The 2nd International Conference on Blockchain Technology (ICBCT'20), March 12--14, 2020, Hilo, HI, USA"),r.a.createElement("p",null,"ACM digital library DOI: 10.1145/3390566.3391684"),r.a.createElement("div",{className:"clear"})))))},Y=r.a.createElement(E.a,null,r.a.createElement(D,null),r.a.createElement(v.c,null,r.a.createElement(v.a,{exact:!0,path:"/",component:O}),r.a.createElement(v.a,{path:"/History",component:w}),r.a.createElement(v.a,{path:"/Menu",component:j}),r.a.createElement(v.a,{path:"/FoodOrderQrCode",component:g}),r.a.createElement(v.a,{path:"/FoodOrderPayment",component:k}),r.a.createElement(v.a,{path:"/FoodOrder",component:q}),r.a.createElement(v.a,{path:"/Refund",component:F}),r.a.createElement(v.a,{path:"/Reservation",component:K}),r.a.createElement(v.a,{path:"/Contact",component:M})),r.a.createElement(B,null));c.a.render(Y,document.getElementById("root"))}},[[176,1,2]]]);
//# sourceMappingURL=main.fb9f012f.chunk.js.map