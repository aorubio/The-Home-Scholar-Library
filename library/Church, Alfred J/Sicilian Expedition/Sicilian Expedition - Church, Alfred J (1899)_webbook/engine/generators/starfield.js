
window.HS_STARFIELD={id:"starfield",render(host,c){const{hash,rng,E,base,meteors}=HSC,R=rng(hash("deepnew:"+c.identity)),s=base("hs-drift");
for(let j=0;j<7;j++)s.append(E("ellipse",{cx:70+R()*1460,cy:50+R()*900,rx:90+R()*300,ry:55+R()*190,fill:j%3===0?"#342a50":j%3===1?"#203653":"#263a42",opacity:.025+R()*.045}));
for(let i=0;i<285;i++){let rad=.28+R()*1.5,big=rad>1.18,circ=E("circle",{cx:R()*1600,cy:R()*1000,r:rad,fill:R()<.1?"#dbe6ff":"#fff",opacity:.2+R()*.58,class:big?"hs-pulse":""});if(big)circ.style.animationDelay=(-R()*22)+"s";s.append(circ)}
for(let j=0;j<5;j++){let x=80+R()*1440,y=60+R()*880;for(let i=0;i<32;i++){let a=R()*6.283,d=Math.sqrt(R())*(25+R()*120),rad=.25+R()*.9,big=rad>.78,circ=E("circle",{cx:x+Math.cos(a)*d,cy:y+Math.sin(a)*d,r:rad,fill:"#fff",opacity:.18+R()*.5,class:big?"hs-pulse":""});if(big)circ.style.animationDelay=(-R()*22)+"s";s.append(circ)}}
meteors(s,R,5);host.replaceChildren(s);return{reader:"#080b12",ink:"#d8dde7",detail:"Starfield; irregular depth + selected slow pulses + distinct margin meteors"}}};
