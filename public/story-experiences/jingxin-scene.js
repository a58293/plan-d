if(new URLSearchParams(location.search).has('embed'))document.documentElement.classList.add('story-embed');
const storyOrigin=location.origin==='null'?window.parent.location.origin:location.origin;
const scene=document.querySelector('.journey');
const stage=scene.querySelector('.stage'),copy=scene.querySelector('.copy');
const articles=[...copy.querySelectorAll('article')];let layers=[...stage.querySelectorAll('[data-depth]')];
const reduced=matchMedia('(prefers-reduced-motion:reduce)'),mobile=matchMedia('(max-width:720px)');
const fine=matchMedia('(hover:hover) and (pointer:fine)');
const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
const lerp=(a,b,t)=>a+(b-a)*t;
const smooth=(a,b,x)=>{const t=clamp((x-a)/(b-a));return t*t*(3-2*t)};
// 每个故事镜头可独立替换主图；当前近景暂用同一张人物图裁切。
const mainArt=[
  {id:'base',name:'镜头一 · 初逢',selector:'.portrait.base',src:'assets/portrait.webp',at:.07},
  {id:'close',name:'镜头二 · 近景',selector:'.portrait.close',src:'assets/portrait.webp',at:.34},
  {id:'vision',name:'镜头三 · 水月',selector:'.character-vision',src:'assets/moon-scene.webp',at:.71}
];
for(const art of mainArt){art.element=stage.querySelector(art.selector);art.element.src=art.src}
const artDefaults=()=>({scale:1,x:0,y:0,travel:1,parallax:1,keyframes:{}});
const timingDefaults=()=>({base:{start:0,end:1,fadeIn:0,fadeOut:0},close:{start:.16,end:.56,fadeIn:.3,fadeOut:.325},vision:{start:.54,end:.9,fadeIn:13/36,fadeOut:1/3}});
const configDefaults=()=>({version:1,length:9,parallax:1,globalKeyframes:{},extraScenes:[],timing:timingDefaults(),names:Object.fromEntries(mainArt.slice(0,3).map(a=>[a.id,a.name])),art:Object.fromEntries(mainArt.slice(0,3).map(a=>[a.id,{desktop:artDefaults(),mobile:artDefaults()}]))});
function validateKeys(input,min,max){if(input===undefined)return [];if(!Array.isArray(input)||input.length>500)throw Error('关键帧格式不正确或数量过多。');const points=new Map();for(const point of input){if(!point||typeof point.at!=='number'||typeof point.value!=='number'||!Number.isFinite(point.at)||!Number.isFinite(point.value))throw Error('关键帧时间或数值不正确。');const at=clamp(point.at);points.set(at,{at,value:clamp(point.value,min,max),ease:['linear','smooth','hold'].includes(point.ease)?point.ease:'linear'})}return [...points.values()].sort((a,b)=>a.at-b.at)}
function sampleValue(keys,p,fallback){if(!keys?.length)return fallback;if(p<=keys[0].at)return keys[0].value;for(let i=0;i<keys.length-1;i++){const a=keys[i],b=keys[i+1];if(p<=b.at){if(p===b.at)return b.value;let t=clamp((p-a.at)/(b.at-a.at));if(a.ease==='hold')t=0;else if(a.ease==='smooth')t=t*t*(3-2*t);return lerp(a.value,b.value,t)}}return keys.at(-1).value}
let settings=configDefaults(),solo=null,lastPublished=-1;
function validateSettings(input){
  if(!input||input.version!==1)throw Error('请选择本预览导出的参数文件。');
  const next=configDefaults(),number=(v,min,max,fallback)=>typeof v==='number'&&Number.isFinite(v)?clamp(v,min,max):fallback;
  next.length=number(input.length,5,18,9);next.parallax=number(input.parallax,0,2,1);
  next.globalKeyframes.parallax=validateKeys(input.globalKeyframes?.parallax,0,2);
  for(const id of ['base','close','vision']){const t=input.timing?.[id]||{},original=next.timing[id];const start=number(t.start,0,.97,original.start);next.timing[id]={start,end:number(t.end,start+.03,1,Math.max(start+.03,original.end)),fadeIn:number(t.fadeIn,0,.45,original.fadeIn),fadeOut:number(t.fadeOut,0,.45,original.fadeOut),fadeKeys:validateKeys(t.fadeKeys,0,.45)};if(typeof input.names?.[id]==='string')next.names[id]=input.names[id].slice(0,80)}
  if(input.extraScenes!==undefined&&!Array.isArray(input.extraScenes))throw Error('镜头列表格式不正确。');
  const ids=new Set(['base','close','vision']);
  if((input.extraScenes||[]).length>100)throw Error('单个项目最多支持 100 个新增镜头。');
  for(const value of input.extraScenes||[]){
    if(!value||typeof value.id!=='string'||!/^shot-[a-z0-9-]{1,80}$/.test(value.id)||ids.has(value.id))throw Error('镜头编号不正确或重复。');ids.add(value.id);
    const start=number(value.start,0,.97,.3),end=number(value.end,start+.03,1,Math.min(1,start+.2));
    next.extraScenes.push({id:value.id,name:typeof value.name==='string'?value.name.slice(0,80):'新镜头',start,end,fade:number(value.fade,0,.45,.18),fadeKeys:validateKeys(value.fadeKeys,0,.45),template:value.template==='moon'?'moon':'portrait'});
    next.art[value.id]={desktop:artDefaults(),mobile:artDefaults()};
  }
  for(const id of Object.keys(next.art))for(const device of ['desktop','mobile']){
    const value=input.art?.[id]?.[device]||{},item=next.art[id][device];
    for(const [key,min,max] of [['scale',.4,1.8],['x',-60,60],['y',-60,60],['travel',0,2],['parallax',0,2]])item[key]=number(value[key],min,max,item[key]);
    for(const [key,min,max] of [['scale',.4,1.8],['x',-60,60],['y',-60,60],['travel',0,2],['parallax',0,2]])item.keyframes[key]=validateKeys(value.keyframes?.[key],min,max);
  }
  return next;
}
function reconcileScenes(){
  const keep=new Set(settings.extraScenes.map(a=>a.id));
  for(let i=mainArt.length-1;i>=3;i--)if(!keep.has(mainArt[i].id)){mainArt[i].element.remove();mainArt.splice(i,1)}
  for(const definition of settings.extraScenes){let art=mainArt.find(a=>a.id===definition.id);const source=definition.template==='moon'?'assets/moon-scene.webp':'assets/portrait.webp';if(!art){const element=document.createElement('img');element.className='portrait extra depth-layer';element.dataset.depth='0.9';element.dataset.shot=definition.id;element.alt='';element.setAttribute('aria-hidden','true');element.src=source;stage.insertBefore(element,stage.querySelector('.mist'));art={id:definition.id,selector:`[data-shot="${definition.id}"]`,src:source,element};mainArt.push(art)}else if(art.src!==source){art.src=source;art.element.src=source}Object.assign(art,definition,{at:(definition.start+definition.end)/2})}
  mainArt.splice(3,mainArt.length-3,...settings.extraScenes.map(d=>mainArt.find(a=>a.id===d.id)));
  if(solo&&!mainArt.some(a=>a.id===solo))solo=null;
  layers=[...stage.querySelectorAll('[data-depth]')];
}
function applySettings(input){settings=validateSettings(input);reconcileScenes();scene.style.height=reduced.matches?'auto':`${settings.length*(mobile.matches?820/9:100)}svh`;measure();draw(progress);request();notifyParent()}
function artValues(id,device,p){const tune=settings.art[id]?.[device];if(!tune)return null;return Object.fromEntries(['scale','x','y','travel','parallax'].map(key=>[key,sampleValue(tune.keyframes[key],p,tune[key])]))}
function tunedPose(art,x,y,scale,p){const tune=artValues(art.id,mobile.matches?'mobile':'desktop',p);return [x*tune.travel+tune.x,y*tune.travel+tune.y,scale*tune.scale]}
function fadeValue(clip,p){return sampleValue(clip.fadeKeys,p,clip.fade??(clip.fadeIn+clip.fadeOut)/2)}
function clipOpacity(clip,p){const duration=clip.end-clip.start,fade=fadeValue(clip,p);const fadeIn=(clip.fadeKeys?.length?fade:clip.fadeIn??clip.fade)*duration,fadeOut=(clip.fadeKeys?.length?fade:clip.fadeOut??clip.fade)*duration;return (fadeIn>0?smooth(clip.start,clip.start+fadeIn,p):Number(p>=clip.start))*(fadeOut>0?1-smooth(clip.end-fadeOut,clip.end,p):Number(p<=clip.end))}
const reading=[{at:0,value:0},{at:.1,value:.11},{at:.24,value:.28},{at:.34,value:.32},{at:.53,value:.52},{at:.67,value:.68},{at:.88,value:.87},{at:1,value:1}];
const palette=[
  {at:0,top:[241,244,236],bottom:[205,223,214],wash:[155,191,170],hue:0},
  {at:.35,top:[224,237,225],bottom:[157,192,176],wash:[116,171,145],hue:13},
  {at:.72,top:[218,231,239],bottom:[131,169,195],wash:[106,151,187],hue:112},
  {at:1,top:[244,238,224],bottom:[194,202,180],wash:[198,180,143],hue:-16}
];
function bracket(track,p){const i=Math.max(0,track.findIndex((stop,i)=>i<track.length-1&&p>=stop.at&&p<=track[i+1].at));return [track[i],track[i+1],clamp((p-track[i].at)/(track[i+1].at-track[i].at))]}
const set=(name,value,unit='')=>scene.style.setProperty(name,`${value.toFixed(3)}${unit}`);
let origin=0,range=1,centers=[],copyHeight=0,target=0,progress=0,frame=0,lastTime=0;
let lookX=0,lookY=0,targetX=0,targetY=0;
function measure(){const r=scene.getBoundingClientRect();origin=r.top+scrollY;range=Math.max(1,r.height-stage.clientHeight);centers=articles.map(a=>a.offsetTop+a.offsetHeight/2);copyHeight=copy.clientHeight;target=clamp((scrollY-origin)/range)}
function draw(p){
  const approach=smooth(.06,.31,p),retreat=smooth(.37,.58,p),returning=smooth(.65,.93,p),forward=approach;
  set('--far-x',-2*approach+3*retreat-2*returning,'%');set('--far-y',-1.5*approach+2*retreat-1.5*returning,'%');set('--far-scale',1.09-.17*approach+.08*retreat-.06*returning);
  set('--middle-x',-8*approach+5*retreat-4*returning,'%');set('--middle-y',2*approach-4*retreat+2*returning,'%');set('--middle-scale',1.04+.2*approach-.12*retreat+.08*returning);
  set('--figure-x',-13*approach+9*retreat-10*returning,'%');set('--figure-y',7*approach-4*retreat+5*returning,'%');set('--figure-scale',.9+.42*approach-.25*retreat+.22*returning);
  set('--close-x',5-14*smooth(.16,.38,p),'%');set('--close-y',8*smooth(.16,.39,p),'%');set('--close-scale',.92+.58*smooth(.16,.43,p));
  set('--vision-x',10-19*smooth(.53,.85,p),'%');set('--vision-y',7*smooth(.53,.85,p),'%');set('--vision-scale',.94+.33*smooth(.53,.85,p));
  const poses=[[-13*approach+9*retreat-10*returning,7*approach-4*retreat+5*returning,.9+.42*approach-.25*retreat+.22*returning],[5-14*smooth(.16,.38,p),8*smooth(.16,.39,p),.92+.58*smooth(.16,.43,p)],[10-19*smooth(.53,.85,p),7*smooth(.53,.85,p),.94+.33*smooth(.53,.85,p)]];
  const closeP=lerp(.16,.56,clamp((p-settings.timing.close.start)/(settings.timing.close.end-settings.timing.close.start))),visionP=lerp(.54,.9,clamp((p-settings.timing.vision.start)/(settings.timing.vision.end-settings.timing.vision.start)));poses[1]=[5-14*smooth(.16,.38,closeP),8*smooth(.16,.39,closeP),.92+.58*smooth(.16,.43,closeP)];poses[2]=[10-19*smooth(.53,.85,visionP),7*smooth(.53,.85,visionP),.94+.33*smooth(.53,.85,visionP)];
  for(let i=0;i<3;i++){const [x,y,size]=tunedPose(mainArt[i],...poses[i],p);const prefix=['figure','close','vision'][i];set(`--${prefix}-x`,x,'%');set(`--${prefix}-y`,y,'%');set(`--${prefix}-scale`,size)}
  let uncovered=1;
  for(let i=mainArt.length-1;i>=3;i--){const art=mainArt[i],definition=settings.extraScenes.find(a=>a.id===art.id),t=clamp((p-art.start)/(art.end-art.start));const alpha=clipOpacity(definition,p),opacity=solo?(solo===art.id?1:0):alpha*uncovered;uncovered*=1-alpha;const [x,y,size]=tunedPose(art,12-22*t,5-7*t,.9+.24*smooth(0,.75,t),p);art.element.style.transform=`translate3d(${x.toFixed(3)}%,${y.toFixed(3)}%,0) scale(${size.toFixed(3)})`;art.element.style.opacity=String(opacity);art.element.style.visibility=opacity>.001?'visible':'hidden'}
  const passing=smooth(.04,.36,p),pond=smooth(.33,.79,p),late=smooth(.7,1,p);
  set('--near-x',-10+32*passing,'%');set('--near-y',18-48*passing,'%');set('--near-scale',.83+1.05*passing);set('--lotus-out',1-smooth(.16,.36,p));
  set('--pond-x',12-33*pond,'%');set('--pond-y',28-52*pond,'%');set('--pond-scale',.7+1.04*pond);set('--lotus-in',smooth(.33,.48,p)*(1-smooth(.66,.8,p)));
  set('--late-x',15-22*late,'%');set('--late-y',32-35*late,'%');set('--late-scale',.73+.64*late);set('--lotus-late',smooth(.7,.88,p));
  const close=clipOpacity(settings.timing.close,p),vision=clipOpacity(settings.timing.vision,p);
  set('--figure-close',close*uncovered);set('--figure-vision',vision*uncovered);set('--figure-base',clipOpacity(settings.timing.base,p)*(1-Math.max(close,vision))*uncovered);
  if(solo)for(const [id,key] of [['base','figure-base'],['close','figure-close'],['vision','figure-vision']])set(`--${key}`,id===solo?1:0);
  set('--cloud-in',smooth(.29,.54,p)*(1-smooth(.83,.98,p))*.42);
  set('--moon-in',smooth(.54,.69,p)*(1-smooth(.81,.94,p))*.2);
  set('--columns-in',smooth(.07,.16,p)*(1-smooth(.35,.51,p))*.34);
  set('--water-in',smooth(.47,.67,p)*(1-smooth(.85,.99,p))*.6);
  const [a,b,t]=bracket(palette,p),rgb=(a,b)=>`rgb(${a.map((v,i)=>Math.round(lerp(v,b[i],t))).join(',')})`;
  scene.style.setProperty('--bg-top',rgb(a.top,b.top));scene.style.setProperty('--bg-bottom',rgb(a.bottom,b.bottom));scene.style.setProperty('--wash',rgb(a.wash,b.wash));set('--hue',lerp(a.hue,b.hue,t),'deg');
  const [ra,rb,rt]=bracket(reading,p),position=lerp(ra.value,rb.value,rt)*(articles.length-1),first=Math.min(articles.length-2,Math.floor(position));
  copy.style.setProperty('--text-shift',`${(copyHeight/2-lerp(centers[first],centers[first+1],position-first)).toFixed(2)}px`);
  // 推近后前景视差更强，文字完全稳定。
  for(const layer of layers){const art=mainArt.find(a=>a.element===layer),tune=art?artValues(art.id,mobile.matches?'mobile':'desktop',p).parallax:1;const d=(Number(layer.dataset.depth)||0)*tune,amplitude=(1+forward*.24)*sampleValue(settings.globalKeyframes.parallax,p,settings.parallax);layer.style.setProperty('--look-x',`${(lookX*d*20*amplitude).toFixed(2)}px`);layer.style.setProperty('--look-y',`${(lookY*d*14*amplitude).toFixed(2)}px`)}
  if(Math.abs(p-lastPublished)>.002){lastPublished=p;dispatchEvent(new CustomEvent('storypreview:progress',{detail:{progress:p}}))}
}
function animate(time){frame=0;const dt=Math.min(48,lastTime?time-lastTime:16.67);lastTime=time;
  progress=lerp(progress,target,1-Math.exp(-dt/(mobile.matches?48:72)));if(Math.abs(progress-target)<.00005)progress=target;
  const e=1-Math.exp(-dt/95);lookX=lerp(lookX,targetX,e);lookY=lerp(lookY,targetY,e);
  if(Math.abs(lookX-targetX)+Math.abs(lookY-targetY)<.001){lookX=targetX;lookY=targetY}
  draw(progress);if(progress!==target||lookX!==targetX||lookY!==targetY)request();else lastTime=0;
}
function request(){if(!reduced.matches&&!frame)frame=requestAnimationFrame(animate)}
function onScroll(){target=clamp((scrollY-origin)/range);request()}
function onResize(){scene.style.height=reduced.matches?'auto':`${settings.length*(mobile.matches?820/9:100)}svh`;measure();request()}
addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onResize,{passive:true});
stage.addEventListener('pointermove',event=>{if(!fine.matches||reduced.matches)return;const r=stage.getBoundingClientRect();targetX=clamp((event.clientX-r.left-r.width/2)/(r.width/2),-1,1);targetY=clamp((event.clientY-r.top-r.height/2)/(r.height/2),-1,1);request()},{passive:true});
stage.addEventListener('pointerleave',()=>{targetX=targetY=0;request()});
reduced.addEventListener('change',()=>{if(frame)cancelAnimationFrame(frame);frame=0;lastTime=0;lookX=lookY=targetX=targetY=0;onResize();progress=target;request()});
document.fonts?.ready.then(onResize);new ResizeObserver(onResize).observe(copy);
measure();progress=target;request();
window.storyPreview={
  get art(){return mainArt.map(({id,name,src,at,selector,start,end,fade})=>{const timing=settings.timing[id];return {id,name:settings.names[id]??name,src,at:timing?(id==='base'?timing.start+(timing.end-timing.start)*.07:(timing.start+timing.end)/2):at,selector,start:timing?.start??start,end:timing?.end??end,fade:timing?(timing.fadeIn+timing.fadeOut)/2:fade,extra:id.startsWith('shot-')}})},
  getSettings:()=>JSON.parse(JSON.stringify(settings)),validateSettings,applySettings,
  getArtValues:(id,device,p=progress)=>artValues(id,device,p),
  getGlobalValues:(p=progress)=>({parallax:sampleValue(settings.globalKeyframes.parallax,p,settings.parallax)}),
  getFade:(id,p=progress)=>fadeValue(settings.timing[id]||settings.extraScenes.find(a=>a.id===id),p),
  currentDevice:()=>mobile.matches?'mobile':'desktop',isReduced:()=>reduced.matches,
  getElement:id=>mainArt.find(a=>a.id===id)?.element||null,
  setSolo:id=>{solo=mainArt.some(a=>a.id===id)?id:null;draw(progress)},
  setImage:(id,url)=>{const art=mainArt.find(a=>a.id===id);if(!art)throw Error('未知镜头');art.element.src=url},
  seek:p=>{measure();target=progress=clamp(p);scrollTo({top:origin+progress*range,behavior:'instant'});draw(progress)},
  progress:()=>progress
};
function notifyParent(){if(window.parent!==window)window.parent.postMessage({type:'lumen-story-ready',length:settings.length},storyOrigin)}
addEventListener('message',event=>{
  if(event.origin!==storyOrigin||event.source!==window.parent||!document.documentElement.classList.contains('story-embed'))return;
  if(event.data?.type==='lumen-story-seek'&&Number.isFinite(event.data.progress)){
    target=progress=clamp(event.data.progress);draw(progress);
  }
  if(event.data?.type==='lumen-story-look'&&Number.isFinite(event.data.x)&&Number.isFinite(event.data.y)){
    targetX=clamp(event.data.x,-1,1);targetY=clamp(event.data.y,-1,1);request();
  }
});
notifyParent();
