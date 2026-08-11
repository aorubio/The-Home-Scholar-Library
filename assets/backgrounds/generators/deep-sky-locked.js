window.HS_DEEP_LOCKED={id:"deep-sky",render(host,c){const{hash,rng,E,meteors}=HSC,R=rng(hash("v12-locked:"+c.identity)),s=E("svg",{viewBox:"0 0 1600 1000",preserveAspectRatio:"xMidYMid slice",class:"hs-drift"});
let d=E("defs");d.innerHTML='<radialGradient id="lkbg"><stop stop-color="#102652"/><stop offset=".52" stop-color="#060d20"/><stop offset="1" stop-color="#010309"/></radialGradient><filter id="lkneb"><feTurbulence type="fractalNoise" baseFrequency=".003 .010" numOctaves="4" seed="31"/><feColorMatrix values=".5 0 .2 0 .18 .1 .25 .55 0 .12 .55 .1 .8 0 .38 0 0 0 .20 0"/><feGaussianBlur stdDeviation="6"/></filter>';s.append(d);s.append(E("rect",{width:1600,height:1000,fill:"url(#lkbg)"}));s.append(E("rect",{x:-100,y:-80,width:1800,height:1160,filter:"url(#lkneb)",opacity:.32}));
// V12 locked star grammar: 150 stars, size .55..2.35, halo 2.2x, accepted pulse.
// Full-page demo adaptation: distribute over the entire sky; the reader surface masks noise itself.
for(let i=0;i<190;i++){let x=.02+R()*.96,y=.04+R()*.92,size=.55+R()*1.8,g=E("g",{class:"hs-pulse-strong"});g.style.animationDelay=(-R()*9.52)+"s";g.append(E("circle",{cx:x*1600,cy:y*1000,r:size*2.2,fill:"#b4d2ff",opacity:.11}));g.append(E("circle",{cx:x*1600,cy:y*1000,r:size,fill:"#f0f7ff",opacity:.88}));s.append(g)}
// Recovered meteor grammar: lots of tiny/far events, fewer medium/near events.
for(let i=0;i<24;i++){let u=R(),depth=u<.76?"far":u<.95?"mid":"near",left=R()<.5,
len=depth==="far"?.006+R()*.012:depth==="mid"?.038+R()*.048:.085+R()*.065,
x=(left?.018:.982-len)*1600,y=(.055+R()*.84)*1000,L=len*1600,
alpha=depth==="far"?.16+R()*.22:depth==="mid"?.32+R()*.28:.52+R()*.25,
w=depth==="far"?.24+R()*.24:depth==="mid"?.65+R()*.5:1.05+R()*.85,
g=E("g",{class:"hs-meteor",style:`--meteor-delay:${(-R()*(52/1.5)).toFixed(1)}s;--meteor-time:${(12+R()*27).toFixed(1)}s;--mx:${left?L:-L}px;--my:${(-8+R()*20).toFixed(0)}px`});
g.append(E("line",{x1:x+(left?-L*.72:L*.72),y1:y-7,x2:x,y2:y,stroke:"#eef6ff",opacity:alpha,"stroke-width":w,"stroke-linecap":"round"}));s.append(g)}
// Mini-showers: several related, very small streaks in a local margin region.
for(let sh=0;sh<2;sh++){let left=R()<.5,baseX=(left?.035:.965)*1600,baseY=(.16+R()*.60)*1000;
for(let j=0;j<3+Math.floor(R()*3);j++){let L=(8+R()*16),x=baseX+(R()-.5)*80,y=baseY+(R()-.5)*95,
g=E("g",{class:"hs-meteor",style:`--meteor-delay:${((-R()*48+j*.45)/1.5).toFixed(1)}s;--meteor-time:${(14+R()*18).toFixed(1)}s;--mx:${left?L:-L}px;--my:${(4+R()*10).toFixed(0)}px`});
g.append(E("line",{x1:x+(left?-L*.7:L*.7),y1:y-5,x2:x,y2:y,stroke:"#eef6ff",opacity:.18+R()*.16,"stroke-width":.24+R()*.22,"stroke-linecap":"round"}));s.append(g)}}

// Exact Starfield meteor primitive: same short streak geometry and left/right placement logic.
// This is intentionally shared rather than approximated, so Deep Sky contains the same meteor
// visual the user is identifying in Starfield.
meteors(s,R,7);
host.replaceChildren(s);return{reader:"#101722",ink:"#d9e0ea",detail:"Recovered V12 locked grammar · oversized stars · rebased 1.00× pulse · Starfield meteor primitive + recovered depth mix + mini-showers · full-sky coverage"}}};