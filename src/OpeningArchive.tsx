import {useEffect,useRef,useState} from 'react';
import Breadcrumbs from './Breadcrumbs';
import {MobileActions} from './PurchaseMenu';
import FlowerStory from './FlowerStory';
import './opening-archive.css';
const issue={title:'镜昕 · 荷花女神',theme:'泥沼生花，水月照心',lettering:'/opening/lotus-calligraphy-v1.webp',poster:'/opening/lotus-2026-09-still-v2.webp',video:'/opening/lotus-2026-09-music-v4.mp4'};
export default function OpeningArchive(){
 const [interactive,setInteractive]=useState(false),[selected,setSelected]=useState(false);
 const stage=useRef<HTMLDivElement>(null),dialog=useRef<HTMLDialogElement>(null),trigger=useRef<HTMLButtonElement|null>(null);
 useEffect(()=>{if(!selected)return;dialog.current?.showModal();const previous=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{document.body.style.overflow=previous;trigger.current?.focus();};},[selected]);
 useEffect(()=>{if(interactive)stage.current?.focus();},[interactive]);
 const move=(x:number,y:number)=>{stage.current?.style.setProperty('--poster-x',x+'px');stage.current?.style.setProperty('--poster-y',y+'px');};
 const play=(button:HTMLButtonElement)=>{trigger.current=button;setSelected(true);};
 return <div className="opening-archive-world"><header className="mf-header"><a href="/">绘屿造物</a><MobileActions/></header><Breadcrumbs path="/stories/openings"/><main><p className="opening-archive-kicker">PROLOGUE ARCHIVE</p><h1>往期序章</h1><p>循着每一期的主推海报，重回故事开始的地方。</p>
 {interactive?<section className="archive-interactive" aria-label="互动海报">
 <button className="archive-text-button" onClick={()=>{setInteractive(false);requestAnimationFrame(()=>document.getElementById('archive-lotus')?.focus());}}>‹ 返回序章列表</button>
 <div className="archive-layer-stage" ref={stage} tabIndex={0} aria-label={issue.theme+'；移动鼠标、拖动或按方向键探索图层'}
 onPointerMove={e=>{if(e.pointerType==='touch'&&!e.buttons)return;const r=e.currentTarget.getBoundingClientRect();move(((e.clientX-r.left)/r.width-.5)*16,((e.clientY-r.top)/r.height-.5)*12);}}
 onPointerDown={e=>{if(e.pointerType==='touch')e.currentTarget.setPointerCapture(e.pointerId);}}
 onPointerUp={()=>move(0,0)} onPointerLeave={()=>move(0,0)} onBlur={()=>move(0,0)}
 onKeyDown={e=>{if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home'].includes(e.key)){e.preventDefault();move(e.key==='ArrowLeft'?-8:e.key==='ArrowRight'?8:0,e.key==='ArrowUp'?-6:e.key==='ArrowDown'?6:0);}}}>
 <img className="archive-scene-layer" src={issue.poster} alt={issue.title+'水下莲花海报'}/>
 <img className="archive-title-layer" src={issue.lettering} alt={issue.theme}/>
 </div><p className="archive-interaction-hint">移动鼠标或轻拖海报，感受图层变化；键盘方向键亦可操作。</p>
 <h2>{issue.title}</h2><div className="archive-mode-actions"><FlowerStory slug="jingxin"/><button className="archive-text-button" onClick={e=>play(e.currentTarget)}>视频回看 ▷</button></div>
 </section>:<div className="opening-archive-grid"><article className="opening-archive-card"><button id="archive-lotus" className="archive-poster-button" onClick={()=>setInteractive(true)} aria-label={'打开互动海报：'+issue.title}><img src={issue.poster} alt={issue.title+'主推海报'} loading="lazy"/><img className="archive-cover-title" src={issue.lettering} alt={issue.theme}/></button><small>序章 / 01</small><h2>{issue.title}</h2><p>{issue.theme}</p><div className="archive-mode-actions"><button className="archive-text-button" onClick={()=>setInteractive(true)}>互动海报 ↗</button><button className="archive-text-button" onClick={e=>play(e.currentTarget)} aria-label={'播放序章：'+issue.title}>视频回看 ▷</button></div></article></div>}
 </main>{selected&&<dialog className="opening-archive-player" ref={dialog} aria-label={issue.title+'序章播放'} onCancel={()=>setSelected(false)} onClick={e=>{if(e.target===e.currentTarget)setSelected(false);}}><header><span>{issue.title}</span><button autoFocus onClick={()=>setSelected(false)} aria-label="关闭序章播放">×</button></header><video src={issue.video} poster={issue.poster} controls playsInline preload="metadata"/><p>{issue.theme} · 点击播放即可观看；关闭后返回。</p></dialog>}</div>;
}
