window.HS_LIBRARY={id:"library",render(host,c){
const{hash,rng,E}=HSC,R=rng(hash("lib-v27:"+c.identity));
const palettes=[
["#e8ddca","#8d5f52","#b99172","#5e7a73","#453b43"],
["#d8d4c5","#627a79","#9a715f","#b79a67","#3e4650"],
["#ead6c2","#9b635b","#687b68","#c49b75","#493f43"],
["#e2d2bf","#80625c","#718071","#b58c68","#463f45"],
["#ebe0c3","#5076a7","#b0b3a9","#c89470","#44556d"],
["#ded2ad","#86734f","#a89267","#6f8580","#4b443b"],
["#d9cbb6","#6e7d65","#aa7767","#c19a69","#51464a"],
["#e6d8bf","#765f78","#a47d67","#778b80","#4b4249"],
["#d5c6a8","#7d6752","#9b8060","#657a79","#49423c"],
["#e4d7c4","#5f7882","#9b6e64","#b18e65","#46494d"],
["#d9cfb7","#806b5e","#75846c","#ad8a72","#4c4540"],
["#e9ddc8","#75677c","#9c8065","#6f817d","#48424a"]
];
const families=[
"floral-lattice","ornamental-diamond","shippo-floral","botanical-halfdrop","deco-fabric",
"marrakesh-soft","honeycomb-bloom","tapestry-medallion","woven-botanical","ditsy",
"fish-scales","brick-bond","basketweave","plus-field","diamond-lattice","circle-lattice",
"herringbone","shippo","checkerboard","tartan","pyramid","geometric-cube"
];
let kind=families[Math.floor(R()*families.length)],P=palettes[Math.floor(R()*palettes.length)];
let [ground,dominant,secondary,accent,detail]=P,id="lib"+hash(c.identity),tile=(kind==="ditsy"?90+R()*55:110+R()*150),m="";
const line=(w=2,op=.27)=>`stroke="${detail}" stroke-width="${w}" stroke-opacity="${op}" fill="none"`;
if(kind==="floral-lattice")m=`<path d="M0 50L50 0L100 50L50 100Z" ${line(2,.22)}/><g transform="translate(50 50)"><ellipse rx="10" ry="29" fill="${dominant}" opacity=".32"/><ellipse rx="10" ry="29" transform="rotate(90)" fill="${secondary}" opacity=".28"/><ellipse rx="8" ry="24" transform="rotate(45)" fill="${accent}" opacity=".24"/><ellipse rx="8" ry="24" transform="rotate(-45)" fill="${accent}" opacity=".24"/><circle r="7" fill="${detail}" opacity=".17"/></g>`;
if(kind==="ornamental-diamond")m=`<path d="M50 4L96 50L50 96L4 50Z" fill="${dominant}" opacity=".16" ${line(3,.27)}/><path d="M50 20C63 34 78 38 80 50C78 62 63 66 50 80C37 66 22 62 20 50C22 38 37 34 50 20Z" fill="${secondary}" opacity=".30"/><circle cx="50" cy="50" r="9" fill="${accent}" opacity=".36"/>`;
if(kind==="shippo-floral")m=`<circle cx="0" cy="50" r="50" ${line(5,.20)}/><circle cx="100" cy="50" r="50" ${line(5,.20)}/><circle cx="50" cy="0" r="50" ${line(5,.20)}/><circle cx="50" cy="100" r="50" ${line(5,.20)}/><g transform="translate(50 50)"><ellipse rx="9" ry="24" fill="${dominant}" opacity=".30"/><ellipse rx="9" ry="24" transform="rotate(60)" fill="${secondary}" opacity=".27"/><ellipse rx="9" ry="24" transform="rotate(120)" fill="${accent}" opacity=".24"/></g>`;
if(kind==="botanical-halfdrop")m=`<path d="M50 100C46 72 54 46 50 0M50 58C34 49 26 36 20 20M50 70C67 61 76 47 82 30" ${line(3,.28)}/><ellipse cx="27" cy="28" rx="12" ry="23" transform="rotate(-42 27 28)" fill="${dominant}" opacity=".34"/><ellipse cx="75" cy="39" rx="12" ry="23" transform="rotate(42 75 39)" fill="${secondary}" opacity=".31"/><circle cx="50" cy="15" r="13" fill="${accent}" opacity=".25"/>`;
if(kind==="deco-fabric")m=`<path d="M10 88L50 10L90 88M22 88L50 30L78 88M35 88L50 51L65 88" ${line(3,.27)}/><path d="M10 88H90L50 100Z" fill="${dominant}" opacity=".20"/><path d="M50 10L62 36L50 30L38 36Z" fill="${accent}" opacity=".30"/>`;
if(kind==="marrakesh-soft")m=`<path d="M50 3C58 25 75 42 97 50C75 58 58 75 50 97C42 75 25 58 3 50C25 42 42 25 50 3Z" fill="${dominant}" opacity=".20" ${line(3,.25)}/><path d="M50 23C57 38 62 43 77 50C62 57 57 62 50 77C43 62 38 57 23 50C38 43 43 38 50 23Z" fill="${secondary}" opacity=".27"/><circle cx="50" cy="50" r="6" fill="${accent}" opacity=".40"/>`;
if(kind==="honeycomb-bloom")m=`<path d="M25 3L75 3L100 50L75 97L25 97L0 50Z" fill="${dominant}" opacity=".13" ${line(2,.21)}/><g transform="translate(50 50)"><ellipse rx="8" ry="23" fill="${secondary}" opacity=".30"/><ellipse rx="8" ry="23" transform="rotate(60)" fill="${accent}" opacity=".26"/><ellipse rx="8" ry="23" transform="rotate(120)" fill="${secondary}" opacity=".24"/></g>`;
if(kind==="tapestry-medallion")m=`<circle cx="50" cy="50" r="38" fill="${dominant}" opacity=".14" ${line(3,.24)}/><path d="M50 13L61 39L87 50L61 61L50 87L39 61L13 50L39 39Z" fill="${secondary}" opacity=".27"/><circle cx="50" cy="50" r="13" fill="${accent}" opacity=".31"/>`;
if(kind==="woven-botanical")m=`<path d="M0 25H100M0 75H100" stroke="${dominant}" stroke-width="16" stroke-opacity=".16"/><path d="M25 0V100M75 0V100" stroke="${secondary}" stroke-width="16" stroke-opacity=".15"/><path d="M0 25H100M25 0V100M0 75H100M75 0V100" ${line(2,.17)}/><ellipse cx="25" cy="25" rx="9" ry="18" transform="rotate(45 25 25)" fill="${accent}" opacity=".27"/><ellipse cx="75" cy="75" rx="9" ry="18" transform="rotate(45 75 75)" fill="${accent}" opacity=".27"/>`;
if(kind==="ditsy")m=`<g transform="translate(25 30)"><circle r="5" fill="${accent}" opacity=".36"/><ellipse cy="-9" rx="4" ry="8" fill="${dominant}" opacity=".30"/><ellipse cx="8" cy="-2" rx="4" ry="8" transform="rotate(70)" fill="${secondary}" opacity=".27"/><ellipse cx="-8" cy="-2" rx="4" ry="8" transform="rotate(-70)" fill="${secondary}" opacity=".27"/></g><g transform="translate(76 72) scale(.75)"><circle r="5" fill="${accent}" opacity=".32"/><ellipse cy="-9" rx="4" ry="8" fill="${dominant}" opacity=".27"/></g>`;
if(kind==="fish-scales")m=`<path d="M0 28Q25 70 50 28Q75 70 100 28M-50 78Q-25 120 0 78Q25 120 50 78Q75 120 100 78Q125 120 150 78" fill="none" stroke="${detail}" stroke-opacity=".30" stroke-width="4"/><path d="M0 31Q25 66 50 31Q75 66 100 31" fill="none" stroke="${dominant}" stroke-opacity=".30" stroke-width="9"/>`;
if(kind==="brick-bond")m=`<rect x="2" y="2" width="46" height="22" rx="4" fill="${dominant}" opacity=".25"/><rect x="52" y="2" width="46" height="22" rx="4" fill="${secondary}" opacity=".22"/><rect x="-23" y="28" width="46" height="22" rx="4" fill="${accent}" opacity=".22"/><rect x="27" y="28" width="46" height="22" rx="4" fill="${dominant}" opacity=".18"/><rect x="77" y="28" width="46" height="22" rx="4" fill="${secondary}" opacity=".24"/>`;
if(kind==="basketweave")m=`<rect x="5" y="8" width="40" height="17" rx="7" fill="${dominant}" opacity=".35"/><rect x="5" y="29" width="40" height="17" rx="7" fill="${dominant}" opacity=".23"/><rect x="55" y="5" width="17" height="40" rx="7" fill="${secondary}" opacity=".35"/><rect x="76" y="5" width="17" height="40" rx="7" fill="${secondary}" opacity=".23"/><rect x="5" y="58" width="17" height="40" rx="7" fill="${accent}" opacity=".28"/><rect x="55" y="63" width="40" height="17" rx="7" fill="${dominant}" opacity=".28"/>`;
if(kind==="plus-field")m=`<path d="M42 8H58V42H92V58H58V92H42V58H8V42H42Z" fill="${dominant}" opacity=".26"/><circle cx="50" cy="50" r="8" fill="${accent}" opacity=".31"/>`;
if(kind==="diamond-lattice")m=`<path d="M50 0L100 50L50 100L0 50Z" fill="${dominant}" fill-opacity=".12" stroke="${detail}" stroke-opacity=".28" stroke-width="3"/><path d="M50 18L82 50L50 82L18 50Z" fill="${secondary}" fill-opacity=".20" stroke="${accent}" stroke-opacity=".25" stroke-width="2"/>`;
if(kind==="circle-lattice")m=`<circle cx="0" cy="0" r="39" fill="${dominant}" opacity=".14"/><circle cx="100" cy="0" r="39" fill="${secondary}" opacity=".14"/><circle cx="0" cy="100" r="39" fill="${accent}" opacity=".14"/><circle cx="100" cy="100" r="39" fill="${dominant}" opacity=".14"/><circle cx="50" cy="50" r="42" fill="none" stroke="${detail}" stroke-opacity=".26" stroke-width="4"/>`;
if(kind==="herringbone")m=`<g fill="none" stroke-linecap="round"><path d="M8 12L50 50L92 12" stroke="${dominant}" stroke-width="13" opacity=".30"/><path d="M8 88L50 50L92 88" stroke="${secondary}" stroke-width="13" opacity=".27"/><path d="M8 12L50 50L92 12M8 88L50 50L92 88" stroke="${detail}" stroke-width="2" opacity=".26"/></g>`;
if(kind==="shippo")m=`<circle cx="0" cy="50" r="50" fill="none" stroke="${dominant}" stroke-width="9" opacity=".23"/><circle cx="100" cy="50" r="50" fill="none" stroke="${secondary}" stroke-width="9" opacity=".23"/><circle cx="50" cy="0" r="50" fill="none" stroke="${accent}" stroke-width="9" opacity=".20"/><circle cx="50" cy="100" r="50" fill="none" stroke="${detail}" stroke-width="3" opacity=".25"/>`;
if(kind==="checkerboard")m=`<rect width="50" height="50" fill="${dominant}" opacity=".20"/><rect x="50" y="50" width="50" height="50" fill="${secondary}" opacity=".20"/><rect x="50" width="50" height="50" fill="${accent}" opacity=".09"/><rect y="50" width="50" height="50" fill="${accent}" opacity=".09"/>`;
if(kind==="tartan")m=`<rect x="10" width="18" height="100" fill="${dominant}" opacity=".18"/><rect x="34" width="5" height="100" fill="${detail}" opacity=".13"/><rect y="58" width="100" height="19" fill="${secondary}" opacity=".20"/><rect y="83" width="100" height="5" fill="${accent}" opacity=".20"/>`;
if(kind==="pyramid")m=`<path d="M50 4L96 82H4Z" fill="${dominant}" opacity=".17"/><path d="M50 4L50 82H4Z" fill="${secondary}" opacity=".19"/><path d="M50 4L96 82H50Z" fill="${accent}" opacity=".15"/><path d="M4 82H96L50 98Z" fill="${detail}" opacity=".08"/>`;
if(kind==="geometric-cube")m=`<path d="M0 20L50 0L100 20L50 40Z" fill="${dominant}" opacity=".21"/><path d="M0 20L50 40V82L0 62Z" fill="${secondary}" opacity=".19"/><path d="M100 20L50 40V82L100 62Z" fill="${accent}" opacity=".17"/><path d="M0 62L50 82L100 62" fill="none" stroke="${detail}" stroke-opacity=".22" stroke-width="3"/>`;
let s=E("svg",{viewBox:"0 0 1600 1000",preserveAspectRatio:"xMidYMid slice"}),d=E("defs"),pat=E("pattern",{id,width:tile,height:tile,patternUnits:"userSpaceOnUse"}),g=E("g",{transform:`scale(${tile/100})`});
g.innerHTML=m;pat.append(g);d.append(pat);
let grad=E("radialGradient",{id:id+"soft"});grad.innerHTML=`<stop stop-color="#fff" stop-opacity=".16"/><stop offset=".7" stop-color="${dominant}" stop-opacity=".025"/><stop offset="1" stop-color="${detail}" stop-opacity=".045"/>`;d.append(grad);s.append(d);
s.append(E("rect",{width:1600,height:1000,fill:ground}));s.append(E("rect",{width:1600,height:1000,fill:`url(#${id})`}));s.append(E("rect",{width:1600,height:1000,fill:`url(#${id}soft)`}));
host.replaceChildren(s);
return{reader:"#f3eadc",ink:"#332f2d",detail:kind+" · 22-family recovered Library pool"};
}};