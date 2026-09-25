import {useEffect,useRef,useState} from 'react';
import Breadcrumbs from './Breadcrumbs';
import {MobileActions} from './PurchaseMenu';
import FlowerStory from './FlowerStory';
import {usePosterTilt} from './usePosterTilt';
import './opening-archive.css';
const issue={title:'镜昕 · 荷花女神',theme:'泥沼生花，水月照心',lettering:'/opening/lotus-calligraphy-v1.webp',poster:'/opening/lotus-2026-09-still-v2.webp'};
export default function OpeningArchive(){
 const [interactive,setInteractive]=useState(false);
 const stage=useRef<HTMLDivElement>(null);
 const tilt=usePosterTilt(interactive,stage);
 useEffect(()=>{if(interactive)stage.current?.focus();},[interactive]);
 const move=(x:number,y:number)=>{stage.current?.style.setProperty('--poster-x',x+'px');stage.current?.style.setProperty('--poster-y',y+'px');};
 return <div className="opening-archive-world"><header className="mf-header"><a href="/">绘屿造物</a><MobileActions/></header><Breadcrumbs path="/stories/openings"/><main><p className="opening-archive-kicker">PROLOGUE ARCHIVE</p><h1>往期序章</h1><p>收藏已制作的序章，循着互动海报重回故事开始的地方。</p>
 {interactive?<section className="archive-interactive" aria-label="互动海报">
 <button className="archive-text-button" onClick={()=>{setInteractive(false);requestAnimationFrame(()=>document.getElementById('archive-lotus')?.focus());}}>‹ 返回序章列表</button>
 <div className="archive-layer-stage" ref={stage} tabIndex={0} aria-label={issue.theme+'；移动鼠标、拖动或按方向键探索图层'}
 onPointerMove={e=>{if(tilt.enabled)return;if(e.pointerType==='touch'&&!e.buttons)return;const r=e.currentTarget.getBoundingClientRect();move(((e.clientX-r.left)/r.width-.5)*16,((e.clientY-r.top)/r.height-.5)*12);}}
 onPointerDown={e=>{if(e.pointerType==='touch')e.currentTarget.setPointerCapture(e.pointerId);}}
 onPointerUp={()=>move(0,0)} onPointerLeave={()=>move(0,0)} onBlur={()=>move(0,0)}
 onKeyDown={e=>{if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home'].includes(e.key)){e.preventDefault();move(e.key==='ArrowLeft'?-8:e.key==='ArrowRight'?8:0,e.key==='ArrowUp'?-6:e.key==='ArrowDown'?6:0);}}}>
 <img className="archive-scene-layer" src={issue.poster} alt={issue.title+'水下莲花海报'}/>
 <img className="archive-title-layer" src={issue.lettering} alt={issue.theme}/>
 </div><p className="archive-interaction-hint">移动鼠标或轻拖海报，感受图层变化；手机也可开启倾斜感应。</p>
 {tilt.mobile&&<div className="archive-tilt-controls"><button className="archive-text-button" aria-pressed={tilt.enabled} onClick={()=>void tilt.toggle()}>{tilt.enabled?'关闭倾斜感应':'开启倾斜感应'}</button><p role="status">{tilt.status}</p></div>}<h2>{issue.title}</h2><div className="archive-mode-actions"><FlowerStory slug="jingxin"/></div>
 </section>:<div className="opening-archive-grid"><article className="opening-archive-card"><button id="archive-lotus" className="archive-poster-button" onClick={()=>setInteractive(true)} aria-label={'打开互动海报：'+issue.title}><img src={issue.poster} alt={issue.title+'主推海报'} loading="lazy"/><img className="archive-cover-title" src={issue.lettering} alt={issue.theme}/></button><small>序章 / 01</small><h2>{issue.title}</h2><p>{issue.theme}</p><div className="archive-mode-actions"><button className="archive-text-button" onClick={()=>setInteractive(true)}>互动海报 ↗</button></div></article></div>}
 </main></div>;
}
