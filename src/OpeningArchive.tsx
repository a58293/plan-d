import {useEffect,useRef,useState} from 'react';
import Breadcrumbs from './Breadcrumbs';
import {MobileActions} from './PurchaseMenu';
import './opening-archive.css';
// Keep each issue's poster and film fixed; do not point past issues at the current feature.
const issues=[{id:'lotus-2026-09',title:'镜昕 · 荷花女神',theme:'泥沼生花，水月照心',poster:'/opening/lotus-2026-09-still-v2.webp',video:'/opening/lotus-2026-09-music-v4.mp4'}];
export default function OpeningArchive(){
 const [selected,setSelected]=useState<(typeof issues)[number]|null>(null);
 const dialog=useRef<HTMLDialogElement>(null),trigger=useRef<HTMLButtonElement|null>(null);
 useEffect(()=>{if(!selected)return;dialog.current?.showModal();const previous=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{document.body.style.overflow=previous;trigger.current?.focus();};},[selected]);
 return <div className="opening-archive-world"><header className="mf-header"><a href="/">绘屿造物</a><MobileActions/></header><Breadcrumbs path="/stories/openings"/><main><p className="opening-archive-kicker">PROLOGUE ARCHIVE</p><h1>往期序章</h1><p>循着每一期的主推海报，重回故事开始的地方。</p><div className="opening-archive-grid">{issues.map((issue,i)=><button key={issue.id} className="opening-archive-card" onClick={e=>{trigger.current=e.currentTarget;setSelected(issue);}} aria-label={'播放序章：'+issue.title}><div><img src={issue.poster} alt={issue.title+'主推海报'} loading="lazy"/><span className="opening-archive-play" aria-hidden="true">▷</span></div><small>序章 / {String(i+1).padStart(2,'0')}</small><h2>{issue.title}</h2><p>{issue.theme}</p><span>播放序章 ↗</span></button>)}</div></main>{selected&&<dialog className="opening-archive-player" ref={dialog} aria-label={selected.title+'序章播放'} onCancel={()=>setSelected(null)} onClick={e=>{if(e.target===e.currentTarget)setSelected(null);}}><header><span>{selected.title}</span><button autoFocus onClick={()=>setSelected(null)} aria-label="关闭序章播放">×</button></header><video key={selected.id} src={selected.video} poster={selected.poster} controls playsInline preload="metadata"/><p>点击播放即可观看；播放结束后可重播或关闭返回。</p></dialog>}</div>;
}
