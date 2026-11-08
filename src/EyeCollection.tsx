import {useState,useRef,useEffect,type SyntheticEvent} from 'react';
const styles=[
 {name:'深色调',files:['deep-1','deep-2']},
 {name:'浅色调',files:['light-1','light-2']},
 {name:'绿色花纹款',files:['green-1','green-2']},
 {name:'晶石款',files:['crystal-1','crystal-2','crystal-3']},
];
const eyePhotos=import.meta.glob<string>('../public/eye-collection/*.webp',{eager:true,query:'?url',import:'default'});
const url=(file:string,size=720)=>eyePhotos[`../public/eye-collection/${file}-${size}.webp`];
const originals=import.meta.glob<string>('../public/eye-collection/*.png',{eager:true,query:'?url',import:'default'});
const allSlides=styles.flatMap((item,style)=>item.files.map((file,angle)=>({file,style,angle,name:item.name})));
function recoverPhoto(event:SyntheticEvent<HTMLImageElement>){const image=event.currentTarget;const file=image.dataset.file;if(file&&image.dataset.recovered!=='true'){image.dataset.recovered='true';image.src=originals[`../public/eye-collection/${file}.png`];}}
export default function EyeCollection({overview=false,onPreview}:{overview?:boolean;onPreview:(src:string)=>void}){
 const [selected,setSelected]=useState(0),[angle,setAngle]=useState(0);
 const item=styles[selected];
 const track=useRef<HTMLDivElement>(null);
 const desktop=useRef<HTMLDivElement>(null);
 const wheelState=useRef({delta:0,last:0});
 useEffect(()=>{
  const node=desktop.current;if(!node)return;
  const wheel=(event:WheelEvent)=>{
   if(event.ctrlKey||!window.matchMedia('(hover:hover) and (pointer:fine)').matches)return;
   const current=allSlides.findIndex(slide=>slide.style===selected&&slide.angle===angle);
   const direction=Math.sign(event.deltaY);
   if(!direction||(current===0&&direction<0)||(current===allSlides.length-1&&direction>0))return;
   event.preventDefault();
   const state=wheelState.current,now=performance.now();
   if(now-state.last<350)return;
   state.delta+=event.deltaY*(event.deltaMode===1?16:event.deltaMode===2?500:1);
   if(Math.abs(state.delta)<45)return;
   const next=allSlides[current+Math.sign(state.delta)];state.delta=0;state.last=now;
   setSelected(next.style);setAngle(next.angle);
  };
  node.addEventListener('wheel',wheel,{passive:false});
  return()=>node.removeEventListener('wheel',wheel);
 },[selected,angle,overview]);
 const jump=(style:number,photo=0)=>{setSelected(style);setAngle(photo);const index=allSlides.findIndex(slide=>slide.style===style&&slide.angle===photo);track.current?.scrollTo({left:index*track.current.clientWidth,behavior:'smooth'});};

 if(overview)return <><div className="eye-classic-hero eye-classic-four accessory-eye-hero-field"><span className="accessory-eye-hero-overline">镜昕 · 四款目光</span><div className="accessory-eye-hero-pair">{styles.map((entry,i)=><a className="accessory-eye-hero-sample" key={entry.name} href="#accessory-archive"><div className={`accessory-eye-hero-object ${i<2?`is-${i?'light':'deep'}`:`eye-real-sample eye-real-${i}`}`}><img src={i<2?new URL('../public/eye-product-display-v1.png',import.meta.url).href:originals[`../public/eye-collection/${i===2?'green':'crystal'}-display.png`]} alt={entry.name} decoding="async"/></div><span>{entry.name}</span></a>)}</div></div><div className="eye-collection-overview">{styles.map((entry,index)=><a key={entry.name} href="#accessory-archive" className="eye-collection-card"><img src={url(entry.files[0])} alt={entry.name+'眼球实拍'} loading={index>1?'lazy':'eager'} decoding="async" width="720" height="540"/><span>{entry.name}</span></a>)}</div></>;
 return <div className="eye-collection-detail"><div ref={desktop} className="eye-desktop-photo eye-collection-photo" data-photo={item.files[angle]}><img key={item.files[angle]} data-file={item.files[angle]} onError={recoverPhoto} src={url(item.files[angle],1440)} loading="eager" decoding="async" width="1440" height="1080" alt={item.name+'实拍角度'+(angle+1)}/></div><div ref={track} className="eye-mobile-track" onScroll={event=>{const node=event.currentTarget;const index=Math.max(0,Math.min(allSlides.length-1,Math.round(node.scrollLeft/Math.max(1,node.clientWidth))));const slide=allSlides[index];setSelected(slide.style);setAngle(slide.angle);}}>{allSlides.map(slide=><button key={slide.file} className="eye-mobile-slide" data-photo={slide.file} onClick={()=>onPreview(url(slide.file,1440))} aria-label={slide.name+'，角度'+(slide.angle+1)}><img data-file={slide.file} onError={recoverPhoto} src={url(slide.file)} alt={slide.name+'实物照片'} loading="eager" decoding="async" width="720" height="540"/></button>)}</div><div className="eye-collection-controls"><h3>{item.name}</h3><p>四款实物展示，可选择款式与拍摄角度，查看花纹、色泽及细节。</p><div className="eye-collection-select" aria-label="选择眼球款式">{styles.map((entry,i)=><button key={entry.name} aria-pressed={selected===i} onClick={()=>jump(i)}>{entry.name}</button>)}</div><div className="eye-collection-angles" aria-label="选择拍摄角度">{item.files.map((file,i)=><button key={file} aria-label={'查看角度'+(i+1)} aria-pressed={angle===i} onClick={()=>jump(selected,i)}><img data-file={file} onError={recoverPhoto} src={url(file)} alt="" loading="eager" decoding="async"/></button>)}</div><p>尺寸、适配与可选配置请在淘宝商品页面核对。</p></div></div>;
}
