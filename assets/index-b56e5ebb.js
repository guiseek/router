(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function s(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(e){if(e.ep)return;e.ep=!0;const a=s(e);fetch(e.href,a)}})();function E(n,t={},...s){const o=Object.assign(document.createElement(n),t);return o.append(...s),o}function S(n,t){const s=n.prototype.connectedCallback,o=n.prototype.constructor;return n.prototype.constructor=(...e)=>{console.log("ctor"),o(...e)},n.prototype.connectedCallback=function(){if(t.template){const{template:e,...a}=t,u=E("template",{innerHTML:e}),f={...a,mode:a.mode??"open"},h=this.attachShadow(f),v=u.content.cloneNode(!0);if(t.styles){const i=E("style",{innerHTML:t.styles});v.appendChild(i)}h.append(v)}s&&s.call(this)},customElements.define(t.selector,n),n}const j="QWERTYUIOPASDFGHJKLZXCVBNM";function D(n){const o=n.replace("Element","").split("").reduce((r,u,f)=>{const h=j.indexOf(u)>0&&f>0;return(r+=h?"-":"")+u},"");return(o.indexOf("-")>0?o:o+"-page").toLowerCase()}function O(n){return t=>{const s=D(t.name);S(t,{...n,selector:s})}}function q(n){return t=>{S(t,n)}}class _ extends HTMLElement{getShadow(){return this.shadowRoot}}class N extends HTMLElement{getShadow(){return this.shadowRoot}}const T=()=>{};function C(n){return!n.canIntercept||n.hashChange||n.downloadRequest||n.formData}function $(n,t){return n.find(s=>s.path===t)??null}function I({routes:n}){const t=window.location.pathname;let s=[];const o=$(n,t),e=i=>(s.push(i),()=>{s=s.filter(l=>l!==i)});let a={pathname:t,matchingRoute:o,data:void 0,initialized:!(o!=null&&o.loader),navigationInProgress:!1};const r=i=>{a={...a,...i},s.forEach(l=>l(a))},u=async i=>{var m;const l=new URL(i),{pathname:p,searchParams:b}=l,d=$(n,p),c=await((m=d==null?void 0:d.loader)==null?void 0:m.call(d,b))??T();r({pathname:p,data:c,matchingRoute:d,initialized:!0,navigationInProgress:!1})},f=i=>{C(i)||i.intercept({async handler(){r({navigationInProgress:!0}),await u(i.destination.url)}})};return window.navigation.addEventListener("navigate",f),u(window.location.href),{get state(){return a},subscribe:e,navigate:(i,{replaceMode:l=!1,info:p}={})=>{window.navigation.navigate(i,{history:l?"replace":"push",info:p})},registerBlockingRoute:({shouldPrompt:i,customPromptBeforeLeaveModal:l,message:p="Are you sure you want to leave? You will lose unsaved changes"})=>{const b=async c=>{const m=c.info;!C(c)&&!(m!=null&&m.forceNavigate)&&i()&&(c.preventDefault(),await l()&&window.navigation.navigate(c.destination.url,{history:"push",state:c.destination.getState(),info:{forceNavigate:!0,...c.info}}))};window.navigation.addEventListener("navigate",b);const d=c=>{if(i())return c.preventDefault(),c.returnValue=p};return window.addEventListener("beforeunload",d),()=>{window.navigation.removeEventListener("navigate",b),window.removeEventListener("beforeunload",d)}}}}class z extends Error{constructor(t,s){super(s),this.status=t,this.message=s}toJSON(){return{status:this.status,message:this.message}}}class A{async get(t,{params:s}={}){const o=t+(s?`?${s}`:"");console.log(o);try{return fetch(o).then(e=>{if(console.log(e),!e.ok){const{status:a,statusText:r}=e;throw new Response(e.body,new z(a,r))}return e.json()})}catch(e){throw new Error(e.name)}}}const H=`<h2>Products</h2>

<nav>
  <span>Páginas</span>
  <a href="?skip=10">1</a>
  <a href="?skip=20">2</a>
  <a href="?skip=30">3</a>
</nav>

<hr />`,M=Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"});var B=Object.defineProperty,R=Object.getOwnPropertyDescriptor,V=(n,t,s,o)=>{for(var e=o>1?void 0:o?R(t,s):t,a=n.length-1,r;a>=0;a--)(r=n[a])&&(e=(o?r(t,s,e):r(e))||e);return o&&e&&B(t,s,e),e};let w=class extends N{constructor(n){super(),this.product=n}connectedCallback(){if(this.product){const{title:n,price:t}=this.product,s=[new Text(M.format(t)),new Text(" - "),new Text(n)],o=this.getSection();o&&o.append(...s)}}getSection(){return this.getShadow().querySelector("section")}};w=V([q({selector:"product-item",template:"<section></section>"})],w);var U=Object.defineProperty,F=Object.getOwnPropertyDescriptor,Q=(n,t,s,o)=>{for(var e=o>1?void 0:o?F(t,s):t,a=n.length-1,r;a>=0;a--)(r=n[a])&&(e=(o?r(t,s,e):r(e))||e);return o&&e&&U(t,s,e),e};let y=class extends _{constructor(n){super(),this.data=n}connectedCallback(){for(const n of this.data.products)this.getShadow().append(new w(n))}};y=Q([O({template:H})],y);const J=`<h2>Contato</h2>

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
</fieldset>`,K=`:host {
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
`;var Y=Object.defineProperty,G=Object.getOwnPropertyDescriptor,W=(n,t,s,o)=>{for(var e=o>1?void 0:o?G(t,s):t,a=n.length-1,r;a>=0;a--)(r=n[a])&&(e=(o?r(t,s,e):r(e))||e);return o&&e&&Y(t,s,e),e};let x=class extends _{};x=W([O({template:J,styles:K})],x);const X=`<h2>Home</h2>

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
</div>`,Z=`:host {
  display: flex;
  flex-direction: column;
}

:host div {
  display: flex;
  justify-content: space-between;
  gap: 36px;
}
`;var k=Object.defineProperty,ee=Object.getOwnPropertyDescriptor,ne=(n,t,s,o)=>{for(var e=o>1?void 0:o?ee(t,s):t,a=n.length-1,r;a>=0;a--)(r=n[a])&&(e=(o?r(t,s,e):r(e))||e);return o&&e&&k(t,s,e),e};let P=class extends _{};P=ne([O({template:X,styles:Z})],P);const te=`<nav>
  <ul>
    <li>
      <a data-path="">Home</a>
    </li>
    <li>
      <a data-path="products">Products</a>
    </li>
    <li>
      <a data-path="contact">Contact</a>
    </li>
  </ul>
</nav>`,oe=`:host {
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
`;var se=Object.defineProperty,ae=Object.getOwnPropertyDescriptor,re=(n,t,s,o)=>{for(var e=o>1?void 0:o?ae(t,s):t,a=n.length-1,r;a>=0;a--)(r=n[a])&&(e=(o?r(t,s,e):r(e))||e);return o&&e&&se(t,s,e),e};const ie="nav-menu";let L=class extends N{connectedCallback(){const n=this.getShadow().querySelectorAll("a");for(const t of n)t.href=`/router/${t.dataset.path}`,delete t.dataset.path}};L=re([q({selector:ie,template:te,styles:oe})],L);const ce=new A,g="/router",le=I({routes:[{path:`${g}/`,component:P},{path:`${g}/products`,component:y,async loader(n){return ce.get("https://dummyjson.com/products",{params:n})}},{path:`${g}/contact`,component:x}]});le.subscribe(({matchingRoute:n,navigationInProgress:t,data:s})=>{if(loading.hidden=!t,n!=null&&n.component){for(;root.firstChild;)root.firstChild.remove();root.append(new n.component(s))}});
