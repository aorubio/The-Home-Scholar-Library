
window.HomeScholarBackgrounds=(()=>{
 const generators={library:()=>HS_LIBRARY,dark:()=>HS_DARK,"deep-sky":()=>HS_DEEP_LOCKED,starfield:()=>HS_STARFIELD,"solar-system":()=>HS_SOLAR};
 let activeTarget=null;
 function render(o){
   HSC.stopMeteors(o.target);
   o.target.dataset.identity=o.identity;
   let g=generators[o.mode];if(!g)throw Error("Unknown background mode "+o.mode);
   let result=g().render(o.target,{identity:o.identity,date:o.date,settings:o.settings||{}});
   result.meteorElements=HSC.activateMeteors(o.target);
   activeTarget=o.target;
   return result;
 }
 function setPaused(target,paused){
   target.getAnimations({subtree:true}).forEach(a=>{
     // Web Animations created for meteors are transient and allowed to finish;
     // CSS sky/pulse animations are paused/resumed.
     if(a.effect && a.effect.target && a.effect.target.closest && a.effect.target.closest(".hs-meteor"))return;
     try{paused?a.pause():a.play()}catch(e){}
   });
 }
 document.addEventListener("visibilitychange",()=>{
   if(!activeTarget)return;
   if(document.visibilityState==="hidden"){
     HSC.stopMeteors(activeTarget);
     setPaused(activeTarget,true);
   }else if(document.visibilityState==="visible"){
     setPaused(activeTarget,false);
     // Same DOM/composition; only the disposable meteor runtime is recreated.
     HSC.activateMeteors(activeTarget);
   }
 });
 return{render,modes:Object.keys(generators)}
})();
