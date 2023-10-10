(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function s(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(e){if(e.ep)return;e.ep=!0;const a=s(e);fetch(e.href,a)}})();function _(n,t={},...s){const o=Object.assign(document.createElement(n),t);return o.append(...s),o}function q(n,t){const s=n.prototype.connectedCallback,o=n.prototype.constructor;return n.prototype.constructor=(...e)=>{console.log("ctor"),o(...e)},n.prototype.connectedCallback=function(){if(t.template){const{template:e,...a}=t,u=_("template",{innerHTML:e}),f={...a,mode:a.mode??"open"},h=this.attachShadow(f),v=u.content.cloneNode(!0);if(t.styles){const i=_("style",{innerHTML:t.styles});v.appendChild(i)}h.append(v)}s&&s.call(this)},customElements.define(t.selector,n),n}const $="QWERTYUIOPASDFGHJKLZXCVBNM";function j(n){const o=n.replace("Element","").split("").reduce((r,u,f)=>{const h=$.indexOf(u)>0&&f>0;return(r+=h?"-":"")+u},"");return(o.indexOf("-")>0?o:o+"-page").toLowerCase()}function P(n){return t=>{const s=j(t.name);q(t,{...n,selector:s})}}function N(n){return t=>{q(t,n)}}class O extends HTMLElement{getShadow(){return this.shadowRoot}}class S extends HTMLElement{getShadow(){return this.shadowRoot}}const D=()=>{};function E(n){return!n.canIntercept||n.hashChange||n.downloadRequest||n.formData}function C(n,t){return n.find(s=>s.path===t)??null}function T({routes:n}){const t=window.location.pathname;let s=[];const o=C(n,t),e=i=>(s.push(i),()=>{s=s.filter(l=>l!==i)});let a={pathname:t,matchingRoute:o,data:void 0,initialized:!(o!=null&&o.loader),navigationInProgress:!1};const r=i=>{a={...a,...i},s.forEach(l=>l(a))},u=async i=>{var m;const l=new URL(i),{pathname:p,searchParams:b}=l,d=C(n,p),c=await((m=d==null?void 0:d.loader)==null?void 0:m.call(d,b))??D();r({pathname:p,data:c,matchingRoute:d,initialized:!0,navigationInProgress:!1})},f=i=>{E(i)||i.intercept({async handler(){r({navigationInProgress:!0}),await u(i.destination.url)}})};return window.navigation.addEventListener("navigate",f),u(window.location.href),{get state(){return a},subscribe:e,navigate:(i,{replaceMode:l=!1,info:p}={})=>{window.navigation.navigate(i,{history:l?"replace":"push",info:p})},registerBlockingRoute:({shouldPrompt:i,customPromptBeforeLeaveModal:l,message:p="Are you sure you want to leave? You will lose unsaved changes"})=>{const b=async c=>{const m=c.info;!E(c)&&!(m!=null&&m.forceNavigate)&&i()&&(c.preventDefault(),await l()&&window.navigation.navigate(c.destination.url,{history:"push",state:c.destination.getState(),info:{forceNavigate:!0,...c.info}}))};window.navigation.addEventListener("navigate",b);const d=c=>{if(i())return c.preventDefault(),c.returnValue=p};return window.addEventListener("beforeunload",d),()=>{window.navigation.removeEventListener("navigate",b),window.removeEventListener("beforeunload",d)}}}}class I extends Error{constructor(t,s){super(s),this.status=t,this.message=s}toJSON(){return{status:this.status,message:this.message}}}class z{async get(t,{params:s}={}){const o=t+(s?`?${s}`:"");console.log(o);try{return fetch(o).then(e=>{if(console.log(e),!e.ok){const{status:a,statusText:r}=e;throw new Response(e.body,new I(a,r))}return e.json()})}catch(e){throw new Error(e.name)}}}const H=`<h2>Products</h2>

<nav>
  <span>Páginas</span>
  <a href="?skip=10">1</a>
  <a href="?skip=20">2</a>
  <a href="?skip=30">3</a>
</nav>

<hr />`,A=Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"});var M=Object.defineProperty,B=Object.getOwnPropertyDescriptor,R=(n,t,s,o)=>{for(var e=o>1?void 0:o?B(t,s):t,a=n.length-1,r;a>=0;a--)(r=n[a])&&(e=(o?r(t,s,e):r(e))||e);return o&&e&&M(t,s,e),e};let g=class extends S{constructor(n){super(),this.product=n}connectedCallback(){if(this.product){const{title:n,price:t}=this.product,s=[new Text(A.format(t)),new Text(" - "),new Text(n)],o=this.getSection();o&&o.append(...s)}}getSection(){return this.getShadow().querySelector("section")}};g=R([N({selector:"product-item",template:"<section></section>"})],g);var V=Object.defineProperty,U=Object.getOwnPropertyDescriptor,F=(n,t,s,o)=>{for(var e=o>1?void 0:o?U(t,s):t,a=n.length-1,r;a>=0;a--)(r=n[a])&&(e=(o?r(t,s,e):r(e))||e);return o&&e&&V(t,s,e),e};let w=class extends O{constructor(n){super(),this.data=n}connectedCallback(){for(const n of this.data.products)this.getShadow().append(new g(n))}};w=F([P({template:H})],w);const Q=`<h2>Contato</h2>

<fieldset>
  <legend>Tem alguma dúvida?</legend>

  <form id="contact">
    <label>
      <span>Nome</span>
      <input type="text" name="name" required autofocus>
    </label>
    <label>
      <span>E-mail</span>
      <input type="email" name="email" required>
    </label>
    <label>
      <span>Assunto</span>
      <input type="text" name="subject" required>
    </label>
    <label>
      <span>Mensagem</span>
      <textarea type="text" name="subject" required></textarea>
    </label>

    <button>Enviar</button>
  </form>
</fieldset>`,J=`:host {
  display: block;

  --muted: rgba(27, 31, 35, 0.15);
  --silver: rgba(27, 31, 35, 0.75);
}

:host form {
  gap: 24px;
  padding: 36px;
  display: inline-flex;
  flex-direction: column;
}

:host fieldset {
  display: inline-flex;
  border: 1px dashed var(--muted);
}

:host input,
:host textarea {
  flex: 1;
  padding: 6px 12px;
  border-radius: 6px;
  outline-color: darkorchid;
  border: 1px solid var(--muted);
}

:host input:focus {
  border: 1px solid var(--silver);
}

:host legend {
  display: inline-flex;
  padding: 0 10px;
}

:host label {
  display: flex;
}
:host label span {
  min-width: 100px;
}

:host button {
  appearance: none;
  background-color: #fafbfc;
  border: 1px solid var(--muted);
  border-radius: 6px;
  box-shadow: rgba(27, 31, 35, 0.04) 0 1px 0,
    rgba(255, 255, 255, 0.25) 0 1px 0 inset;
  transition: background-color 0.2s cubic-bezier(0.3, 0, 0.5, 1);
  color: #24292e;
  cursor: pointer;
  display: inline-block;
  padding: 6px 16px;
  position: relative;
}

:host button:hover {
  background-color: #f3f4f6;
  text-decoration: none;
  transition-duration: 0.1s;
}

:host button:disabled {
  background-color: #fafbfc;
  border-color: rgba(27, 31, 35, 0.15);
  color: #959da5;
  cursor: default;
}

:host button:active {
  background-color: #edeff2;
  box-shadow: rgba(225, 228, 232, 0.2) 0 1px 0 inset;
  transition: none 0s;
}

:host button:focus {
  outline-color: darkorchid;
}

:host button:before {
  display: none;
}

:host button:-webkit-details-marker {
  display: none;
}
`;var K=Object.defineProperty,Y=Object.getOwnPropertyDescriptor,G=(n,t,s,o)=>{for(var e=o>1?void 0:o?Y(t,s):t,a=n.length-1,r;a>=0;a--)(r=n[a])&&(e=(o?r(t,s,e):r(e))||e);return o&&e&&K(t,s,e),e};let y=class extends O{};y=G([P({template:Q,styles:J})],y);const W=`<h2>Home</h2>

<div>

  <section>
    <p>Mussum Ipsum, cacilds vidis litro abertis. Casamentiss faiz malandris se pirulitá. Em pé sem cair, deitado sem
      dormir, sentado sem cochilar e fazendo pose. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed
      non ipsum felis. Manduma pindureta quium dia nois paga.</p>

    <p>Nullam volutpat risus nec leo commodo, ut interdum diam laoreet. Sed non consequat odio. Vehicula non. Ut sed ex
      eros. Vivamus sit amet nibh non tellus tristique interdum. Não sou faixa preta cumpadi, sou preto inteiris,
      inteiris. Leite de capivaris, leite de mula manquis sem cabeça.</p>
  </section>
  <section>

    <p>Interagi no mé, cursus quis, vehicula ac nisi. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie
      leo,
      vitae iaculis nisl. Em pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose. Interessantiss quisso
      pudia ce receita de bolis, mais bolis eu num gostis.</p>

    <p>Paisis, filhis, espiritis santis. Bota 1 metro de cachacis aí pra viagem! Mais vale um bebadis conhecidiss, que
      um
      alcoolatra anonimis. Si num tem leite então bota uma pinga aí cumpadi!</p>
  </section>
  <section>
    <p>Admodum accumsan disputationi eu sit. Vide electram sadipscing et per. Cevadis im ampola pa arma uma pindureta.
      Sapien in monti palavris qui num significa nadis i pareci latim. Suco de cevadiss deixa as pessoas mais
      interessantis.
    </p>

    <p>Aenean aliquam molestie leo, vitae iaculis nisl. Si u mundo tá muito paradis? Toma um mé que o mundo vai
      girarzis!
      Quem manda na minha terra sou euzis! Quem num gosta di mim que vai caçá sua turmis!</p>
  </section>
</div>`,X=`:host {
  display: flex;
  flex-direction: column;
}

:host div {
  display: flex;
  justify-content: space-between;
  gap: 36px;
}
`;var Z=Object.defineProperty,k=Object.getOwnPropertyDescriptor,ee=(n,t,s,o)=>{for(var e=o>1?void 0:o?k(t,s):t,a=n.length-1,r;a>=0;a--)(r=n[a])&&(e=(o?r(t,s,e):r(e))||e);return o&&e&&Z(t,s,e),e};let x=class extends O{};x=ee([P({template:W,styles:X})],x);const ne=`<nav>
  <ul>
    <li>
      <a href="/">Home</a>
    </li>
    <li>
      <a href="/products">Products</a>
    </li>
    <li>
      <a href="/contact">Contact</a>
    </li>
  </ul>
</nav>`,te=`:host {
  display: flex;
}
:host nav ul {
  display: flex;
  list-style: none;
  gap: 12px;
}

:host a {
  color: #000;
  display: inline-block;
  text-decoration: none;
}
:host a::after {
  width: 0;
  height: 2px;
  content: '';
  display: block;
  background: #000;
  transition: width 0.3s;
}

:host a:hover::after {
  width: 100%;
}
`;var oe=Object.defineProperty,se=Object.getOwnPropertyDescriptor,ae=(n,t,s,o)=>{for(var e=o>1?void 0:o?se(t,s):t,a=n.length-1,r;a>=0;a--)(r=n[a])&&(e=(o?r(t,s,e):r(e))||e);return o&&e&&oe(t,s,e),e};const re="nav-menu";let L=class extends S{};L=ae([N({selector:re,template:ne,styles:te})],L);const ie=new z,ce=T({routes:[{path:"/",component:x},{path:"/products",component:w,async loader(n){return ie.get("https://dummyjson.com/products",{params:n})}},{path:"/contact",component:y}]});ce.subscribe(({matchingRoute:n,navigationInProgress:t,data:s})=>{if(loading.hidden=!t,n!=null&&n.component){for(;root.firstChild;)root.firstChild.remove();root.append(new n.component(s))}});
