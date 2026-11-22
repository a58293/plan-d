import {useState,type CSSProperties} from 'react';
import {requiredImage} from './media-library';
import './series-poster-background.css';

export default function SeriesPosterBackground({src,choosing}:{src:string;choosing:boolean}){
 const [selected,setSelected]=useState(0);
 const posters=[
  {title:'序章海报',src},
  {title:'镜昕实物海报',src:requiredImage('jingxinPortrait')},
  {title:'镜昕原画海报',src:requiredImage('jingxinConcept')},
 ];
 return <div className="series-poster-background" data-choosing={choosing} style={{'--poster-count':posters.length} as CSSProperties} inert={choosing}>
  {posters.map((poster,index)=><div key={poster.title} className="series-poster-panel" data-selected={selected===index} onPointerMove={event=>{if(event.pointerType==='mouse'&&(event.movementX!==0||event.movementY!==0))setSelected(index)}}>
   <div className="series-poster-crop" aria-hidden="true"><img src={poster.src} alt="" loading="lazy" decoding="async"/></div>
   <button type="button" className="series-poster-select" aria-label={`查看${poster.title}`} aria-pressed={selected===index} onFocus={()=>setSelected(index)} onClick={()=>setSelected(index)}><span>{poster.title}</span></button>
  </div>)}
 </div>;
}