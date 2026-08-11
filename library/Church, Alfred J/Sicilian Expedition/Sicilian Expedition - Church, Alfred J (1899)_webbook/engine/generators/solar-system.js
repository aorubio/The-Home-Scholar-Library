
window.HS_SOLAR={id:"solar-system",render(host,c){const{hash,rng,E,base,stars,meteors}=HSC,R=rng(hash("solar:"+c.identity)),s=base("hs-drift");stars(s,R,210,.3,1.35);meteors(s,R,3);
function sphere(n,x,y,z){let g=E("g",{transform:`translate(${x} ${y})`}),defs=E("defs"),id="g"+Math.floor(x+y),grad=E("radialGradient",{id,cx:".35",cy:".3"}),colors={Mercury:["#b5aaa0","#5b5652"],Venus:["#efe0b0","#a9895f"],Earth:["#78a9cf","#234b73"],Mars:["#c66b4d","#71362d"],Jupiter:["#e0c2a0","#76574d"],Uranus:["#a9d9d8","#578f98"],Neptune:["#5987d8","#183b83"]}[n];grad.innerHTML=`<stop stop-color="${colors[0]}"/><stop offset="1" stop-color="${colors[1]}"/>`;defs.append(grad);g.append(defs);g.append(E("circle",{r:z,fill:`url(#${id})`}));
if(n==="Jupiter"){
let jd=E("defs"),jid="jup"+Math.floor(x+y+z),jg=E("linearGradient",{id:jid,x1:"0",y1:"0",x2:"0",y2:"1"});
[["0%","#d8c09d"],["18%","#9b725b"],["35%","#ead2ae"],["52%","#80594c"],["70%","#d5b08b"],["86%","#936755"],["100%","#d9bd98"]].forEach(q=>jg.append(E("stop",{offset:q[0],"stop-color":q[1]})));jd.append(jg);g.append(jd);
let body=g.querySelector("circle");if(body)body.setAttribute("fill",`url(#${jid})`);
g.append(E("ellipse",{cx:z*.31,cy:z*.22,rx:z*.19,ry:z*.075,fill:"#9a5144",opacity:.58}));
g.append(E("ellipse",{cx:z*.28,cy:z*.205,rx:z*.11,ry:z*.03,fill:"#d18a72",opacity:.22}));
} 
if(n==="Mars"){for(let i=0;i<7;i++){let a=R()*6.28,d=R()*z*.65;g.append(E("ellipse",{cx:Math.cos(a)*d,cy:Math.sin(a)*d,rx:z*(.06+R()*.12),ry:z*(.025+R()*.07),fill:"#63382f",opacity:.28,transform:`rotate(${R()*180})`}))}g.append(E("ellipse",{cy:-z*.82,rx:z*.32,ry:z*.09,fill:"#ead9c8",opacity:.7}))}
if(n==="Venus"){for(let i=-3;i<=3;i++)g.append(E("path",{d:`M ${-z*.7} ${i*z*.17} Q 0 ${i*z*.17+(R()-.5)*z*.15} ${z*.7} ${i*z*.17}`,stroke:"#fff1c8","stroke-width":z*.08,opacity:.2,fill:"none"}))}
if(n==="Earth"){
let ed=E("defs"),eid="earth"+Math.floor(x+y+z),eg=E("radialGradient",{id:eid,cx:".34",cy:".28"});
[["0%","#8bc5e6"],["42%","#3478ad"],["78%","#174d80"],["100%","#0b2747"]].forEach(q=>eg.append(E("stop",{offset:q[0],"stop-color":q[1]})));ed.append(eg);g.append(ed);
let body=g.querySelector("circle");if(body)body.setAttribute("fill",`url(#${eid})`);
// Procedural continental silhouettes, deliberately recognizable rather than cartographic.
g.append(E("path",{d:`M${-z*.62},${-z*.38} Q${-z*.38},${-z*.58} ${-z*.17},${-z*.42} Q${z*.02},${-z*.30} ${-z*.08},${-z*.08} Q${-z*.20},${z*.08} ${-z*.03},${z*.30} Q${-z*.20},${z*.48} ${-z*.34},${z*.24} Q${-z*.47},${z*.04} ${-z*.55},${-z*.10}Z`,fill:"#6f9464",opacity:.94}));
g.append(E("path",{d:`M${z*.10},${-z*.46} Q${z*.35},${-z*.58} ${z*.62},${-z*.28} Q${z*.46},${-z*.08} ${z*.26},${-z*.04} Q${z*.18},${z*.16} ${z*.38},${z*.31} Q${z*.17},${z*.48} ${z*.02},${z*.23} Q${-z*.05},${z*.04} ${z*.08},${-z*.13}Z`,fill:"#809b64",opacity:.92}));
// deserts / terrain variation
g.append(E("path",{d:`M${z*.18},${-z*.18} Q${z*.38},${-z*.23} ${z*.46},${-.02*z} Q${z*.29},${z*.10} ${z*.13},${z*.02}Z`,fill:"#b49a65",opacity:.62}));
// layered cloud systems
[[-.46,-.20,.55],[.08,-.35,.42],[-.12,.12,.50],[.30,.30,.34]].forEach((q,i)=>g.append(E("path",{d:`M${q[0]*z-z*.28},${q[1]*z} Q${q[0]*z},${(q[1]-.10)*z} ${q[0]*z+z*.30},${(q[1]+.02)*z}`,stroke:"#f5fbff","stroke-width":z*(.055+i*.008),opacity:q[2],fill:"none","stroke-linecap":"round"})));
// polar ice + atmospheric limb cue
g.append(E("ellipse",{cy:-z*.83,rx:z*.34,ry:z*.10,fill:"#edf7fa",opacity:.78}));
g.append(E("circle",{r:z*.97,fill:"none",stroke:"#a9dcf4","stroke-width":z*.045,opacity:.36}));
}
if(n==="Uranus"){for(let i=-2;i<=2;i++)g.append(E("line",{x1:-z*.75,y1:i*z*.2,x2:z*.75,y2:i*z*.2,stroke:"#d7f1ec",opacity:.12,"stroke-width":z*.04}));if(R()<.5)g.insertBefore(E("ellipse",{rx:z*1.45,ry:z*.25,fill:"none",stroke:"#c9e5df",opacity:.18,"stroke-width":z*.035}),g.lastChild)}
if(n==="Neptune"){for(let i=-2;i<=2;i++)g.append(E("line",{x1:-z*.75,y1:i*z*.2,x2:z*.75,y2:i*z*.2,stroke:"#bcd3ff",opacity:.16,"stroke-width":z*.045}));g.append(E("ellipse",{cx:z*.25,cy:z*.1,rx:z*.18,ry:z*.09,fill:"#173169",opacity:.42}))}
if(n==="Mercury"){for(let i=0;i<10;i++){let a=R()*6.28,d=Math.sqrt(R())*z*.7;g.append(E("circle",{cx:Math.cos(a)*d,cy:Math.sin(a)*d,r:z*(.025+R()*.07),fill:"#504c49",opacity:.18}))}}
return g}
function saturn(x,y,overall){let globe=overall*.46,g=E("g",{transform:`translate(${x} ${y}) rotate(${-13+R()*26})`});[[1.75,.36,.13],[1.55,.31,.24],[1.36,.27,.16]].forEach(q=>g.append(E("ellipse",{rx:globe*q[0],ry:globe*q[1],fill:"none",stroke:"#cdb28a","stroke-width":globe*.065,opacity:q[2]})));g.append(E("circle",{r:globe,fill:"#b99770"}));for(let i=-3;i<=3;i++)g.append(E("line",{x1:-globe*.75,y1:i*globe*.16,x2:globe*.75,y2:i*globe*.16,stroke:"#ead0a5",opacity:.13,"stroke-width":globe*.045}));[[1.75,.36,.19],[1.55,.31,.31],[1.36,.27,.2]].forEach(q=>g.append(E("path",{d:`M ${-globe*q[0]} 0 A ${globe*q[0]} ${globe*q[1]} 0 0 0 ${globe*q[0]} 0`,fill:"none",stroke:"#e0c49a","stroke-width":globe*.065,opacity:q[2]})));return g}
function moon(x,y,z,phase){let g=E("g",{transform:`translate(${x} ${y})`});g.append(E("circle",{r:z,fill:"#d8d3c7"}));for(let i=0;i<30;i++){let a=R()*6.283,d=Math.sqrt(R())*z*.76;g.append(E("circle",{cx:Math.cos(a)*d,cy:Math.sin(a)*d,r:z*(.015+R()*.065),fill:R()<.55?"#777b7b":"#aaa69d",opacity:.07+R()*.11}))}
let illum=(1-Math.cos(2*Math.PI*phase))/2, waxing=phase<.5, rx=z*Math.abs(1-2*illum);if(illum<.5){g.append(E("path",{d:`M0 ${-z} A${z} ${z} 0 0 ${waxing?1:0} 0 ${z} A${rx} ${z} 0 0 ${waxing?0:1} 0 ${-z}Z`,fill:"#050810",opacity:.84}))}else{g.append(E("path",{d:`M0 ${-z} A${z} ${z} 0 0 ${waxing?0:1} 0 ${z} A${rx} ${z} 0 0 ${waxing?1:0} 0 ${-z}Z`,fill:"#050810",opacity:.84}))}return g}
let jd=Date.parse(c.date+"T12:00:00Z")/86400000+2440587.5,phase=((jd-2451550.1)/29.530588853)%1;if(phase<0)phase+=1;
let zones=[[90,130,360,830],[1240,130,1510,830],[100,70,1500,185],[100,825,1500,930]],moonSize=82+R()*22,jupSize=48+R()*12,satOverall=jupSize*(.95+R()*.1);
let major=R()<.5?"Jupiter":"Saturn",others=["Earth","Earth","Earth","Mars","Venus","Uranus","Neptune","Mercury"],names=[major],count=2+Math.floor(R()*3);while(names.length<count){let n=others[Math.floor(R()*others.length)];if(!names.includes(n))names.push(n)}
names.forEach((n,i)=>{let q=zones[i%4],x=q[0]+R()*(q[2]-q[0]),y=q[1]+R()*(q[3]-q[1]);if(n==="Saturn")s.append(saturn(x,y,satOverall));else s.append(sphere(n,x,y,n==="Jupiter"?jupSize:22+R()*13))});
let mq=zones[names.length%4];s.append(moon(mq[0]+R()*(mq[2]-mq[0]),mq[1]+R()*(mq[3]-mq[1]),moonSize,phase));host.replaceChildren(s);return{reader:"#101722",ink:"#d8dde7",detail:`Moon phase ${(phase*100).toFixed(1)}% cycle · ${names.join(", ")} · Moon largest; Jupiter/Saturn next`,phase}}};
