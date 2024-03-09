(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const l of o)if(l.type==="childList")for(const c of l.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function r(o){const l={};return o.integrity&&(l.integrity=o.integrity),o.referrerPolicy&&(l.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?l.credentials="include":o.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function n(o){if(o.ep)return;o.ep=!0;const l=r(o);fetch(o.href,l)}})();document.querySelector("#app").innerHTML=`
  <div>
  <h1 id="title">Pixel-Art</h1>
  <ul id="color-palette">
      <li id="color-red" class="color"></li>
      <li id="color-blue" class="color"></li>
      <li id="color-yellow" class="color"></li>
      <li id="color-black" class="color"></li>
      <li id="color-orange" class="color"></li>
      <li id="color-green" class="color"></li>
      <li id="color-white" class="color"></li>
  </ul>
  <button id="generate-board">Board</button>    
  <input id="board-size" type="number" min="1">
  <p> Auto-Save<p>
  <section>
      <ul id="pixel-board"></ul>
  </section>       
  </div>
`;const m=document.getElementById("board-size"),h=document.getElementById("generate-board");m.value=JSON.parse(localStorage.getItem("boardSize"))||40;let a,s;const y=document.getElementById("pixel-board"),d=e=>{a=e;const t=a*a;let r=0;const o=`${a*11.6}px`;y.style.width=o;for(let l=0;l<t;l+=1){r+=1;const c=document.createElement("li");c.className="pixel",c.id=r,y.appendChild(c)}},g=()=>{const e=document.getElementsByClassName("pixel").length;for(let t=0;t<e;t+=1)document.querySelector(".pixel").remove(),console.log("li deleted")},B=()=>{g(),s=parseInt(m.value,10),localStorage.setItem("boardSize",JSON.stringify(s)),m.value===""?alert("Board inválido!"):(s<5&&(s=5),d(s))};h.addEventListener("click",B);const P=e=>{const t=e.target.className,r=e.target;if(t.includes("color")){const n=document.getElementsByClassName("color");for(let o=0;o<n.length;o+=1)n[o].classList.remove("selected");r.classList.add("selected")}};document.addEventListener("click",P);const i=JSON.parse(localStorage.getItem("pixelBoard"));let u;i!==null?u=i:u=[];const C=e=>{const t=e.target.id,r=e.target.className,n=e.target,o=document.querySelector(".selected");if(r.includes("pixel")){const c=getComputedStyle(o,null).getPropertyValue("background-color");n.style.backgroundColor=c,u.push({findId:t,bgcolor:c}),localStorage.setItem("pixelBoard",JSON.stringify(u))}};document.addEventListener("click",C);const E=document.querySelector("#color-palette"),f=document.createElement("button");f.id="clear-board";f.innerText="Clear";E.insertAdjacentElement("afterend",f);const I=()=>{const e=document.getElementsByClassName("pixel");for(let t=0;t<e.length;t+=1)e[t].style.backgroundColor="white",localStorage.clear()},S=document.querySelector("#clear-board");S.addEventListener("click",I);const b=document.createElement("button");b.id="button-random-color";b.innerText="Generate colors";S.insertAdjacentElement("afterend",b);let p;const N=()=>{const e=Math.random()*255,t=Math.random()*255,r=Math.random()*255;return p=`rgb(${parseInt(e,10)}, ${parseInt(t,10)}, ${parseInt(r,10)})`,p},L=()=>{const e=document.getElementsByClassName("color");for(let t=0;t<e.length;t+=1)N(),e[t].style.backgroundColor=p},O=document.getElementById("button-random-color");O.addEventListener("click",L);const x=()=>{if(i!==null)for(let e=0;e<i.length;e+=1){const{findId:t}=i[e],r=i[e].bgcolor,n=document.getElementById(t);n.style.backgroundColor=r}},v=()=>{JSON.parse(localStorage.getItem("boardSize"))?(g(),s=JSON.parse(localStorage.getItem("boardSize")),d(s),x()):(g(),s=40,d(s),x())},w=document.querySelector("body");w.onload=v();
