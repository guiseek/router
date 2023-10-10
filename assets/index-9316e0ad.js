(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function o(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(n){if(n.ep)return;n.ep=!0;const a=o(n);fetch(n.href,a)}})();function C(e,t={},...o){const s=Object.assign(document.createElement(e),t);return s.append(...o),s}function j(e,t){const o=e.prototype.connectedCallback,s=e.prototype.constructor;return e.prototype.constructor=(...n)=>{console.log("ctor"),s(...n)},e.prototype.connectedCallback=function(){if(t.template){const{template:n,...a}=t,d=C("template",{innerHTML:n}),f={...a,mode:a.mode??"open"},h=this.attachShadow(f),g=d.content.cloneNode(!0);if(t.styles){const i=C("style",{innerHTML:t.styles});g.appendChild(i)}h.append(g)}o&&o.call(this)},customElements.define(t.selector,e),e}const D="QWERTYUIOPASDFGHJKLZXCVBNM";function T(e){const s=e.replace("Element","").split("").reduce((r,d,f)=>{const h=D.indexOf(d)>0&&f>0;return(r+=h?"-":"")+d},"");return(s.indexOf("-")>0?s:s+"-page").toLowerCase()}function _(e){return t=>{const o=T(t.name);j(t,{...e,selector:o})}}function O(e){return t=>{j(t,e)}}class E extends HTMLElement{getShadow(){return this.shadowRoot}}class $ extends HTMLElement{getShadow(){return this.shadowRoot}}const I=()=>{};function L(e){return!e.canIntercept||e.hashChange||e.downloadRequest||e.formData}function S(e,t){return e.find(o=>o.path===t)??null}function z({routes:e}){const t=window.location.pathname;let o=[];const s=S(e,t),n=i=>(o.push(i),()=>{o=o.filter(c=>c!==i)});let a={pathname:t,matchingRoute:s,data:void 0,initialized:!(s!=null&&s.loader),navigationInProgress:!1};const r=i=>{a={...a,...i},o.forEach(c=>c(a))},d=async i=>{var m;const c=new URL(i),{pathname:u,searchParams:v}=c,p=S(e,u),l=await((m=p==null?void 0:p.loader)==null?void 0:m.call(p,v))??I();r({pathname:u,data:l,matchingRoute:p,initialized:!0,navigationInProgress:!1})},f=i=>{L(i)||i.intercept({async handler(){r({navigationInProgress:!0}),await d(i.destination.url)}})};return window.navigation.addEventListener("navigate",f),d(window.location.href),{get state(){return a},subscribe:n,navigate:(i,{replaceMode:c=!1,info:u}={})=>{window.navigation.navigate(i,{history:c?"replace":"push",info:u})},registerBlockingRoute:({shouldPrompt:i,customPromptBeforeLeaveModal:c,message:u="Are you sure you want to leave? You will lose unsaved changes"})=>{const v=async l=>{const m=l.info;!L(l)&&!(m!=null&&m.forceNavigate)&&i()&&(l.preventDefault(),await c()&&window.navigation.navigate(l.destination.url,{history:"push",state:l.destination.getState(),info:{forceNavigate:!0,...l.info}}))};window.navigation.addEventListener("navigate",v);const p=l=>{if(i())return l.preventDefault(),l.returnValue=u};return window.addEventListener("beforeunload",p),()=>{window.navigation.removeEventListener("navigate",v),window.removeEventListener("beforeunload",p)}}}}class H extends Error{constructor(t,o){super(o),this.status=t,this.message=o}toJSON(){return{status:this.status,message:this.message}}}class A{async get(t,{params:o}={}){const s=t+(o?`?${o}`:"");console.log(s);try{return fetch(s).then(n=>{if(console.log(n),!n.ok){const{status:a,statusText:r}=n;throw new Response(n.body,new H(a,r))}return n.json()})}catch(n){throw new Error(n.name)}}}const M=`<h2>Products</h2>

<nav>
  <span>Páginas</span>
  <a href="?skip=10">1</a>
  <a href="?skip=20">2</a>
  <a href="?skip=30">3</a>
</nav>

<hr />`,B=Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"});var R=Object.defineProperty,V=Object.getOwnPropertyDescriptor,U=(e,t,o,s)=>{for(var n=s>1?void 0:s?V(t,o):t,a=e.length-1,r;a>=0;a--)(r=e[a])&&(n=(s?r(t,o,n):r(n))||n);return s&&n&&R(t,o,n),n};let y=class extends ${constructor(e){super(),this.product=e}connectedCallback(){if(this.product){const{title:e,price:t}=this.product,o=[new Text(B.format(t)),new Text(" - "),new Text(e)],s=this.getSection();s&&s.append(...o)}}getSection(){return this.getShadow().querySelector("section")}};y=U([O({selector:"product-item",template:"<section></section>"})],y);var F=Object.defineProperty,Q=Object.getOwnPropertyDescriptor,G=(e,t,o,s)=>{for(var n=s>1?void 0:s?Q(t,o):t,a=e.length-1,r;a>=0;a--)(r=e[a])&&(n=(s?r(t,o,n):r(n))||n);return s&&n&&F(t,o,n),n};let w=class extends E{constructor(e){super(),this.data=e}connectedCallback(){for(const e of this.data.products)this.getShadow().append(new y(e))}};w=G([_({template:M})],w);const J=`<h2>Contato</h2>

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
`;var Y=Object.defineProperty,W=Object.getOwnPropertyDescriptor,X=(e,t,o,s)=>{for(var n=s>1?void 0:s?W(t,o):t,a=e.length-1,r;a>=0;a--)(r=e[a])&&(n=(s?r(t,o,n):r(n))||n);return s&&n&&Y(t,o,n),n};let x=class extends E{};x=X([_({template:J,styles:K})],x);const Z=`<h2>Home</h2>

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
</div>`,k=`:host {
  display: flex;
  flex-direction: column;
}

:host div {
  display: flex;
  justify-content: space-between;
  gap: 36px;
}
`;var nn=Object.defineProperty,en=Object.getOwnPropertyDescriptor,tn=(e,t,o,s)=>{for(var n=s>1?void 0:s?en(t,o):t,a=e.length-1,r;a>=0;a--)(r=e[a])&&(n=(s?r(t,o,n):r(n))||n);return s&&n&&nn(t,o,n),n};let P=class extends E{};P=tn([_({template:Z,styles:k})],P);const sn=`<ul>
  <li>
    <span>Desenvolvido em</span>
    <a href="https://www.typescriptlang.org" target="_blank">
      <img src="./typescript.svg" alt="TypeScript">
    </a>
  </li>

  <li>
    <span>transpilado com</span>
    <a href="https://vitejs.dev/" target="_blank">
      <img src="./vite.svg" alt="Vite">
    </a>
  </li>

  <li>
    <span>e disponível no</span>
    <a href="https://github.com/guiseek/router" target="_blank">
      <img src="./github.svg" alt="GitHub">
    </a>
  </li>
</ul>`,on=`:host {
  display: flex;
}

:host ul li {
  gap: 12px;
  display: flex;
  align-items: center;
}

:host ul {
  display: flex;
  list-style: none;
  gap: 12px;
}

:host span {
  color: #222;
  display: inline-block;
  text-decoration: none;
}
`;var an=Object.defineProperty,rn=Object.getOwnPropertyDescriptor,ln=(e,t,o,s)=>{for(var n=s>1?void 0:s?rn(t,o):t,a=e.length-1,r;a>=0;a--)(r=e[a])&&(n=(s?r(t,o,n):r(n))||n);return s&&n&&an(t,o,n),n};const cn="links-part";let q=class extends ${};q=ln([O({selector:cn,template:sn,styles:on})],q);const pn=`<nav>
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
</nav>`,dn=`:host {
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
`;var un=Object.defineProperty,mn=Object.getOwnPropertyDescriptor,fn=(e,t,o,s)=>{for(var n=s>1?void 0:s?mn(t,o):t,a=e.length-1,r;a>=0;a--)(r=e[a])&&(n=(s?r(t,o,n):r(n))||n);return s&&n&&un(t,o,n),n};const hn="nav-menu";let N=class extends ${connectedCallback(){const e=this.getShadow().querySelectorAll("a");for(const t of e)t.href=`/router/${t.dataset.path}`,delete t.dataset.path}};N=fn([O({selector:hn,template:pn,styles:dn})],N);const vn=new A,b="/router",gn=z({routes:[{path:`${b}/`,component:P},{path:`${b}/products`,component:w,async loader(e){return vn.get("https://dummyjson.com/products",{params:e})}},{path:`${b}/contact`,component:x}]});gn.subscribe(({matchingRoute:e,navigationInProgress:t,data:o})=>{if(loading.hidden=!t,e!=null&&e.component){for(;root.firstChild;)root.firstChild.remove();root.append(new e.component(o))}});
