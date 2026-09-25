import {useEffect,useRef,useState} from 'react';
import {createPortal,flushSync} from 'react-dom';
import {lotusSale,resolveOpeningSale} from './opening-sale';
import {openingKey} from './SeasonalOpening';
import Breadcrumbs from './Breadcrumbs';
import {MobileActions} from './PurchaseMenu';
import FlowerStory from './FlowerStory';
import {usePosterTilt} from './usePosterTilt';
import './opening-archive.css';
const issue={title:'镜昕 · 荷花女神',theme:'泥沼生花，水月照心',lettering:'/opening/lotus-calligraphy-v1.webp',poster:'/opening/lotus-2026-09-still-v2.webp'};
export default function OpeningArchive(){
 const [interactive,setInteractive]=useState(false);
 const [mode,setMode]=useState<'poster'|'full'>('poster'),[display,setDisplay]=useState('all'),[toolsVisible,setToolsVisible]=useState(true),[muted,setMuted]=useState(false),[paused,setPaused]=useState(false),[held,setHeld]=useState(false),[playError,setPlayError]=useState(false),[storyOpen,setStoryOpen]=useState(false);
 const video=useRef<HTMLVideoElement>(null);
 const switchMode=(value:'poster'|'full')=>{if(value===mode)return;video.current?.pause();flushSync(()=>{setMode(value);setHeld(false);setPlayError(false);setPaused(false);setMuted(false);});if(value==='full')void video.current?.play().catch(()=>setPaused(true));};
 useEffect(()=>{if(!interactive||mode!=='full')return;const el=video.current;if(!el)return;return()=>{el.pause();el.removeAttribute('src');el.load();};},[interactive,mode]);
 useEffect(()=>{if(!interactive)return;let timer=0;const wake=()=>{setToolsVisible(true);clearTimeout(timer);timer=window.setTimeout(()=>{if(!storyOpen&&!(overlay.current?.querySelector('.archive-view-tools')?.contains(document.activeElement)&&(document.activeElement?.matches(':focus-visible')||document.activeElement?.tagName==='SELECT')))setToolsVisible(false);},3000);};wake();const el=overlay.current;el?.addEventListener('pointermove',wake);el?.addEventListener('pointerdown',wake);el?.addEventListener('keydown',wake);el?.addEventListener('focusin',wake);return()=>{clearTimeout(timer);el?.removeEventListener('pointermove',wake);el?.removeEventListener('pointerdown',wake);el?.removeEventListener('keydown',wake);el?.removeEventListener('focusin',wake);};},[interactive,storyOpen]);
 const stage=useRef<HTMLDivElement>(null);
 const tilt=usePosterTilt(interactive&&mode==='poster',stage);
 const overlay=useRef<HTMLElement>(null),trigger=useRef<HTMLElement|null>(null);
 const [now,setNow]=useState(Date.now());
 const sale=resolveOpeningSale(lotusSale,now);
 const seconds=Math.ceil(sale.remaining/1000);
 const countdown=[Math.floor(seconds/86400)+'天',String(Math.floor(seconds/3600)%24).padStart(2,'0'),String(Math.floor(seconds/60)%60).padStart(2,'0'),String(seconds%60).padStart(2,'0')].join(' : ');
 const open=()=>{trigger.current=document.activeElement as HTMLElement;setNow(Date.now());setMode('poster');setDisplay('all');setInteractive(true);};
 useEffect(()=>{if(!interactive)return;const timer=window.setInterval(()=>setNow(Date.now()),1000);const overflow=document.body.style.overflow;document.body.style.overflow='hidden';const siblings=Array.from(document.body.children).filter(e=>e instanceof HTMLElement&&e!==overlay.current) as HTMLElement[];const states=siblings.map(e=>e.inert);siblings.forEach(e=>e.inert=true);return()=>{clearInterval(timer);document.body.style.overflow=overflow;siblings.forEach((e,i)=>e.inert=states[i]);trigger.current?.focus();};},[interactive]);
 useEffect(()=>{if(interactive)stage.current?.focus();},[interactive]);
 const move=(x:number,y:number)=>{stage.current?.style.setProperty('--poster-x',x+'px');stage.current?.style.setProperty('--poster-y',y+'px');};
 return <div className="opening-archive-world"><header className="mf-header"><a href="/">绘屿造物</a><MobileActions/></header><Breadcrumbs path="/stories/openings"/><main><p className="opening-archive-kicker">PROLOGUE ARCHIVE</p><h1>往期序章</h1><p>收藏已制作的序章，循着互动海报重回故事开始的地方。</p>
 {interactive&&createPortal(<section className="archive-interactive archive-fullscreen" data-display={display} data-tools={toolsVisible} data-mode={mode} ref={overlay} role="dialog" aria-modal="true" aria-label={issue.title+'互动序章'} onKeyDown={e=>{if(e.key==='Escape'){e.preventDefault();setInteractive(false);}if(e.key==='Tab'){const items=Array.from(overlay.current?.querySelectorAll<HTMLElement>('button:not(:disabled),a[href],select,[tabindex="0"]')||[]).filter(el=>el.getClientRects().length>0);const first=items[0],last=items.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}}}}>
 <div className="archive-view-tools"><div role="group" aria-label="观看模式"><button aria-pressed={mode==='full'} onClick={()=>switchMode('full')}>完整播放</button><button aria-pressed={mode==='poster'} onClick={()=>switchMode('poster')}>只看海报</button></div><label>画面显示<select value={display} onChange={e=>setDisplay(e.target.value)}><option value="all">完整显示</option><option value="title">只留题字</option><option value="clean">纯净画面</option></select></label>{mode==='full'&&<><button onClick={()=>setMuted(!muted)}>{muted?'开启声音':'静音'}</button><button onClick={()=>{if(paused){void video.current?.play().catch(()=>setPlayError(true));}else video.current?.pause();}}>{paused?'继续播放':'暂停'}</button></>}<button className="archive-text-button archive-close" onClick={()=>setInteractive(false)} aria-label="关闭互动序章">关闭 ×</button></div>
 <div className="archive-layer-stage" ref={stage} tabIndex={0} aria-label={issue.theme+'；移动鼠标、拖动或按方向键探索图层'}
 onPointerMove={e=>{if(tilt.enabled||mode==='full')return;if(e.pointerType==='touch'&&!e.buttons)return;const r=e.currentTarget.getBoundingClientRect();move(((e.clientX-r.left)/r.width-.5)*16,((e.clientY-r.top)/r.height-.5)*12);}}
 onPointerDown={e=>{if(e.pointerType==='touch'&&!(e.target as HTMLElement).closest('button,a,select'))e.currentTarget.setPointerCapture(e.pointerId);}}
 onPointerUp={()=>move(0,0)} onPointerLeave={()=>move(0,0)} onBlur={()=>move(0,0)}
 onKeyDown={e=>{if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home'].includes(e.key)){e.preventDefault();move(e.key==='ArrowLeft'?-8:e.key==='ArrowRight'?8:0,e.key==='ArrowUp'?-6:e.key==='ArrowDown'?6:0);}}}>
 {mode==='full'&&<video className="archive-full-video" ref={video} src="/opening/lotus-2026-09-music-v4.mp4" playsInline muted={muted} onTimeUpdate={()=>{if((video.current?.currentTime||0)>=10.8)setHeld(true);}} onPlay={()=>setPaused(false)} onPause={()=>setPaused(true)} onEnded={()=>{setHeld(true);setPaused(true);}} onError={()=>setPlayError(true)}/>}
 <img style={{opacity:mode==='poster'||held||playError?1:0}} className="archive-scene-layer" src={issue.poster} alt={issue.title+'水下莲花海报'}/>
 <img hidden={display==='clean'||(mode==='full'&&!held&&!playError)} className="archive-title-layer" src={issue.lettering} alt={issue.theme}/>
 {playError&&<p className="archive-media-error" role="status">视频暂时无法播放，请切换到只看海报。</p>}
 {tilt.mobile&&mode==='poster'&&<div className="archive-tilt-controls"><button className="archive-text-button" aria-pressed={tilt.enabled} onClick={()=>void tilt.toggle()}>{tilt.enabled?'关闭倾斜感应':'开启倾斜感应'}</button><p role="status">{tilt.status}</p></div>}<div hidden={display!=='all'||(mode==='full'&&!held&&!playError)} className="archive-fullscreen-actions"><a href="/" onClick={()=>{try{localStorage.setItem(openingKey,'seen');}catch{}}}>进入主页</a><FlowerStory slug="jingxin" onOpenChange={setStoryOpen}/>{sale.kind==='open'?<a href={sale.url!} target="_blank" rel="noopener noreferrer">前往购买 ↗</a>:sale.kind==='countdown'?<div className="archive-countdown" role="timer" aria-label="距离开仓"><span>距离开仓</span><strong>{countdown}</strong></div>:<span className="archive-closed" aria-label="售卖状态：关仓">关仓</span>}</div></div><p className="archive-wake-hint">轻点画面或移动鼠标，显示观看工具</p>
 </section>,document.body)}<div className="opening-archive-grid"><article className="opening-archive-card"><button id="archive-lotus" className="archive-poster-button" onClick={open} aria-label={'打开互动海报：'+issue.title}><img src={issue.poster} alt={issue.title+'主推海报'} loading="lazy"/><img className="archive-cover-title" src={issue.lettering} alt={issue.theme}/></button><small>序章 / 01</small><h2>{issue.title}</h2><p>{issue.theme}</p><div className="archive-mode-actions"><button className="archive-text-button" onClick={open}>互动海报 ↗</button></div></article></div>
 </main></div>;
}
