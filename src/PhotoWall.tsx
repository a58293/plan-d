import {useLayoutEffect,useRef,useState} from 'react';
import {photoPath,type CollectorPhoto} from './collector-gallery-data';
// Deterministic shortest-column placement: appending photos never rearranges earlier ones.
export default function PhotoWall({photos,official=false}:{photos:CollectorPhoto[];official?:boolean}){
 const root=useRef<HTMLDivElement>(null),[width,setWidth]=useState(0);
 useLayoutEffect(()=>{const el=root.current;if(!el)return;const observer=new ResizeObserver(()=>setWidth(el.clientWidth));setWidth(el.clientWidth);observer.observe(el);return()=>observer.disconnect();},[]);
 const columns=width<600?2:6,gap=width<600?10:14,unit=(width-gap*(columns-1))/columns;
 const heights=Array.from({length:columns},(_,i)=>width<600?i*18:[28,28,8,8,0,0][i]);
 const cards=photos.map((photo,index)=>{
  const span=columns===2?1:(index%5===1?3:2);
  let column=0,top=Infinity;
  for(let c=0;c<=columns-span;c++){const y=Math.max(...heights.slice(c,c+span));if(y<top){top=y;column=c;}}
  const w=unit*span+gap*(span-1),h=w*Math.max(.1,photo.height/Math.max(1,photo.width));
  // Touch credit occupies reserved space, so subsequent image positions remain stable.
  const credit=width<600?92:0;
  for(let c=column;c<column+span;c++)heights[c]=top+h+credit+gap;
  return {photo,style:{left:column*(unit+gap),top,width:w,height:h+credit},h};
 });
 return <div ref={root} className="photo-wall" style={{height:photos.length?Math.max(...heights):0}}>{width>0&&cards.map(({photo:p,style,h})=><article key={p.id} data-photo={p.id} style={style}><a href={photoPath(p.id,official)} aria-label={'查看影像：'+p.alt}><img src={p.src} alt={p.alt} width={p.width} height={p.height} style={{height:h}} loading="lazy"/><div className="photo-wall-credit"><strong>{p.author}</strong><span>{[p.platform,p.publishedAt].filter(Boolean).join(' · ')}</span></div></a></article>)}</div>;
}
