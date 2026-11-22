import {useState,type CSSProperties} from 'react';
import {requiredImage} from './media-library';
import SeriesScrolls from './SeriesScrolls';
import './series-archive-preview.css';

export default function SeriesArchivePreview(){
 const [selected,setSelected]=useState(0);
 const posters=[
  {title:'最新海报',src:'/opening/lotus-2026-09-still-v2.webp'},
  {title:'实物海报示意',src:requiredImage('jingxinPortrait')},
  {title:'原画海报示意',src:requiredImage('jingxinConcept')},
 ];
 return <main className="series-edge-preview series-swipe-preview" style={{'--poster-count':posters.length} as CSSProperties}>
  {posters.map((poster,index)=><section key={poster.title} className="series-swipe-panel" data-active={selected===index} aria-label={poster.title} onPointerMove={event=>{if(event.pointerType==='mouse'&&(event.movementX!==0||event.movementY!==0))setSelected(index)}}>
   <div className="series-swipe-content" inert={selected!==index} aria-hidden={selected!==index}>
    <img className="series-swipe-art" src={poster.src} alt={poster.title}/>

   </div>
   <button type="button" className="series-swipe-hit" aria-label={`查看${poster.title}`} aria-expanded={selected===index} onFocus={()=>setSelected(index)} onClick={()=>setSelected(index)}><span>{poster.title}</span></button>
  </section>)}
  <div className="series-swipe-overlay"><SeriesScrolls/><p className="series-edge-caption">系列滑页预览</p></div>
 </main>;
}