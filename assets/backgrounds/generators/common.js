
window.HSC=(()=>{const NS="http://www.w3.org/2000/svg";
function hash(s){let h=2166136261>>>0;for(let c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}return h>>>0}
function rng(seed){let a=seed>>>0;return()=>{a=(a+0x6D2B79F5)|0;let t=Math.imul(a^(a>>>15),1|a);t^=t+Math.imul(t^(t>>>7),61|t);return((t^(t>>>14))>>>0)/4294967296}}
function E(t,a={}){let e=document.createElementNS(NS,t);for(let[k,v]of Object.entries(a))e.setAttribute(k,v);return e}
function base(cls=""){let s=E("svg",{viewBox:"0 0 1600 1000",preserveAspectRatio:"xMidYMid slice",class:cls});s.append(E("rect",{width:1600,height:1000,fill:"#04070d"}));return s}
function stars(s,R,n,min=.35,max=1.8){for(let i=0;i<n;i++){let c=E("circle",{cx:R()*1600,cy:R()*1000,r:min+R()*(max-min),fill:R()<.08?"#dbe6ff":"#fff",opacity:.18+R()*.7,class:"hs-pulse"});c.style.animationDelay=(-R()*22)+"s";s.append(c)}}
function meteors(s,R,n=5){for(let i=0;i<n;i++){let left=R()<.72,x=left?(35+R()*300):(1265+R()*300),y=70+R()*800,g=E("g",{class:"hs-meteor",style:`--meteor-delay:${(-R()*30).toFixed(1)}s;--meteor-time:${(8+R()*13).toFixed(1)}s;--mx:${(left?1:-1)*(35+R()*75).toFixed(0)}px;--my:${(18+R()*38).toFixed(0)}px`});g.append(E("line",{x1:x,y1:y,x2:x+(left?-1:1)*(10+R()*25),y2:y-(5+R()*14),stroke:"#fff",opacity:.35+R()*.35,"stroke-width":.6+R()*1.1,"stroke-linecap":"round"}));s.append(g)}}

function meteorRate(){let v=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hs-meteor-rate"));return Number.isFinite(v)&&v>0?v:1}
function stopMeteors(host){
 let s=host._hsMeteorScheduler;
 if(s){s.timers.forEach(clearTimeout);s.timers.clear();host._hsMeteorScheduler=null}
}
function activateMeteors(host){
 stopMeteors(host);
 let els=[...host.querySelectorAll(".hs-meteor")];
 if(!els.length)return 0;

 let identity=host.dataset.identity||"", R=rng(hash(identity+":meteor-runtime-v29"));
 let state={timers:new Set(),last:-1,count:0};
 host._hsMeteorScheduler=state;

 function ownTimeout(fn,ms){
   let id=setTimeout(()=>{state.timers.delete(id);fn()},ms);
   state.timers.add(id);return id;
 }
 function styleData(el){
   let st=el.getAttribute("style")||"";
   let n=(name,d)=>{let m=st.match(new RegExp("--"+name+":\\s*([-0-9.]+)"));return m?Math.abs(parseFloat(m[1])):d};
   return{
     travel:Math.max(380,Math.min(1500,n("meteor-time",14)*1000*.06)),
     mx:parseFloat((st.match(/--mx:\s*([-0-9.]+)px/)||[])[1]||40),
     my:parseFloat((st.match(/--my:\s*([-0-9.]+)px/)||[])[1]||12)
   };
 }
 function fire(el){
   if(!host.isConnected||host._hsMeteorScheduler!==state)return;
   let d=styleData(el);state.count++;
   el.animate([{opacity:0,transform:"translate(0,0)"},{opacity:.78,offset:.12},{opacity:.62,offset:.62},{opacity:0,transform:`translate(${d.mx}px,${d.my}px)`}],
     {duration:d.travel,easing:"linear"});
 }
 function choose(){
   let i=Math.floor(R()*els.length);
   if(els.length>1&&i===state.last)i=(i+1+Math.floor(R()*(els.length-1)))%els.length;
   state.last=i;return els[i];
 }

 // V27 aggregate calibration:
 // V27 had N independent streams. Each stream's nominal gap was derived from
 // baseGap = clamp(abs(delay)*700 + 3500, 2800, 16000), then jittered ~0.72..1.28.
 // The aggregate event rate is sum(1/gap_i). We reconstruct that expected rate
 // from the actual meteor elements currently installed, then use ONE scheduler
 // with mean inter-event gap = 1 / aggregateRate.
 function legacyGap(el,i){
   let st=el.getAttribute("style")||"";
   let m=st.match(/--meteor-delay:\s*([-0-9.]+)/);
   let delay=m?Math.abs(parseFloat(m[1])):(i+1);
   return Math.max(2800,Math.min(16000,delay*700+3500));
 }
 let aggregatePerMs=els.reduce((sum,el,i)=>sum+1/legacyGap(el,i),0);
 let meanGap=1/aggregatePerMs; // exact V27-style aggregate expectation at 1x

 function ordinaryGap(){
   // Exponential-ish event spacing avoids mechanical rhythm while preserving mean density.
   // Clamp extremes so there are natural quiet moments without long accidental droughts.
   let u=Math.max(.0001,1-R()), gap=-Math.log(u)*meanGap;
   return Math.max(220,Math.min(meanGap*4.5,gap))/meteorRate();
 }
 function schedule(){
   if(!host.isConnected||host._hsMeteorScheduler!==state)return;
   ownTimeout(()=>{
     if(!host.isConnected||host._hsMeteorScheduler!==state)return;
     fire(choose());
     // Rare intentional shower. Every member is owned by this scheduler and cancellable.
     if(R()<.10){
       let extra=2+Math.floor(R()*3);
       for(let j=1;j<=extra;j++)ownTimeout(()=>fire(choose()),j*(180+R()*260));
     }
     schedule();
   },ordinaryGap());
 }

 // Startup/resume uses the SAME aggregate process, not a special short-delay burst.
 schedule();
 host.dataset.meteorMeanGap=Math.round(meanGap);
 return els.length;
}
return{hash,rng,E,base,stars,meteors,activateMeteors,stopMeteors}})();
