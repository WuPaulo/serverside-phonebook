(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{38:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var c=t(14),a=t.n(c),o=t(3),r=t(1),u=t(4),i=t.n(u),s="/api/persons",j=function(){return i.a.get(s)},b=function(e){return i.a.post(s,e)},d=function(e,n){return i.a.put("".concat(s,"/").concat(e),n)},l=function(e,n){return i.a.delete("".concat(s,"/").concat(e),n)},h=t(0),m=function(e){var n=e.onSubmit,t=e.onChange,c=e.numberChange,a=e.newName,o=e.newNumber;return Object(h.jsx)("div",{children:Object(h.jsxs)("form",{onSubmit:n,children:[Object(h.jsxs)("div",{children:["Name: ",Object(h.jsx)("input",{value:a,onChange:t,required:!0})]}),Object(h.jsxs)("div",{children:["Number:"," ",Object(h.jsx)("input",{type:"number",value:o,onChange:c,required:!0})]}),Object(h.jsx)("div",{children:Object(h.jsx)("button",{type:"submit",children:"add"})})]})})},f=function(e){var n=e.value,t=e.onChange;return Object(h.jsxs)("div",{children:["Filter Phonebook",Object(h.jsx)("input",{value:n,onChange:t})]})},O=function(e){var n=e.name,t=e.id,c=e.noteObject,a=e.setNotes;return Object(h.jsx)("button",{onClick:function(){window.confirm("Delete ".concat(n))&&l(t,c).then((function(e){j().then((function(e){a(e.data)}))}))},children:"delete"})},v=function(e){var n=e.data,t=e.nameFilter,c=e.noteObject,a=e.setNotes;return Object(h.jsx)("div",{children:n.map((function(e){return e.name.toLowerCase().indexOf(t.toLowerCase())>-1?Object(h.jsxs)("p",{children:[e.name," ",e.number," ",Object(h.jsx)(O,{name:e.name,id:e.id,noteObject:c,setNotes:a})]},e.id):null}))})},x=function(e){var n=e.message;e.errorMessages;return null===n?null:Object(h.jsx)("div",{className:"notification",children:n})},p=(t(38),function(){var e=Object(r.useState)([]),n=Object(o.a)(e,2),t=n[0],c=n[1],a=Object(r.useState)(""),u=Object(o.a)(a,2),i=u[0],s=u[1],l=Object(r.useState)(""),O=Object(o.a)(l,2),p=O[0],g=O[1],w=Object(r.useState)(""),N=Object(o.a)(w,2),C=N[0],S=N[1],k=Object(r.useState)(null),y=Object(o.a)(k,2),D=y[0],F=y[1],M=Object(r.useState)(null),q=Object(o.a)(M,2),A=q[0],E=q[1];Object(r.useEffect)((function(){j().then((function(e){c(e.data)}))}),[]);return Object(h.jsxs)("div",{children:[Object(h.jsx)("h2",{children:"Phonebook"}),Object(h.jsx)(x,{message:D,errorMessage:A}),Object(h.jsx)(f,{value:C,onChange:function(e){S(e.target.value)}}),Object(h.jsx)("h2",{children:"Add a new"}),Object(h.jsx)(m,{onSubmit:function(e){e.preventDefault();var n={name:i,number:p,date:new Date,important:Math.random()<.5};if(t.some((function(e){return e.name.includes(i)}))){if(window.confirm("".concat(i," is already added to the phonebook, replace the old number with a new one?"))){var a=t.findIndex((function(e){return e.name===i}));d(t[a].id,n).then((function(e){j().then((function(e){c(e.data)})).catch((function(e){console.log(e),E("Note '".concat(t.content,"' was already removed from server")),setTimeout((function(){E(null)}),5e3)}))}))}s(""),g("")}else b(n).then((function(e){c(t.concat(e.data)),s(""),g(""),F("Added ".concat(i)),setTimeout((function(){F(null)}),3e3)}))},onChange:function(e){s(e.target.value)},numberChange:function(e){g(e.target.value)},newName:i,newNumber:p}),Object(h.jsx)("h2",{children:"Numbers"}),Object(h.jsx)(v,{data:t,nameFilter:C,noteObject:{},setNotes:c})]})});a.a.render(Object(h.jsx)(p,{}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.2bdd26c3.chunk.js.map