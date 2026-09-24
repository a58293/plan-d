import {useEffect,useRef,useState} from 'react';
import {siteNavigation,type NavigationItem} from './site-navigation';
import './mobile-navigation.css';

export default function MobileNavigation(){
 const [open,setOpen]=useState(false),[trail,setTrail]=useState<NavigationItem[]>([]),[index,setIndex]=useState(0);
 const root=useRef<HTMLDivElement>(null),orb=useRef<HTMLButtonElement>(null);
 const drag=useRef<{x:number;y:number;moved:boolean}|null>(null),suppress=useRef(false);
 const items=trail.at(-1)?.children||siteNavigation;
 const close=()=>{setOpen(false);setTrail([]);setIndex(0);};
 const back=()=>{if(trail.length){setTrail(t=>t.slice(0,-1));setIndex(0);}else close();};
 useEffect(()=>{if(!open)return;const outside=(e:PointerEvent)=>{if(!root.current?.contains(e.target as Node))close();};const escape=(e:KeyboardEvent)=>{if(e.key==='Escape'){close();orb.current?.focus();}};const resize=()=>{if(innerWidth>700)close();};document.addEventListener('pointerdown',outside);document.addEventListener('keydown',escape);window.addEventListener('resize',resize);return()=>{document.removeEventListener('pointerdown',outside);document.removeEventListener('keydown',escape);window.removeEventListener('resize',resize);};},[open]);
 const shift=(delta:number)=>setIndex(i=>(i+delta+items.length)%items.length);
 const enter=(item:NavigationItem)=>{if(suppress.current){suppress.current=false;return;}if(item.children){setTrail(t=>[...t,item]);setIndex(0);}else if(item.href){close();window.location.assign(item.href);}};
 return <div ref={root} className="mobile-navigation" data-open={open}>
 {open&&<nav id="orb-menu" className="orb-menu" aria-label="分层目录" onKeyDown={e=>{e.stopPropagation();if(e.key==='Escape'){close();orb.current?.focus();}}}>
 <div className="orb-context"><span>{trail.length?trail.map(t=>t.title).join(' / '):'探索绘屿'}</span><button aria-label="收起全部目录" onClick={close}>×</button></div>
 {trail.length>0&&<button className="orb-parent" onClick={back}>‹ {trail.at(-1)?.title}</button>}
 <div key={trail.map(t=>t.title).join('/')} className="orb-arc" onPointerDown={e=>{drag.current={x:e.clientX,y:e.clientY,moved:false};suppress.current=false;}} onPointerMove={e=>{if(drag.current&&Math.hypot(e.clientX-drag.current.x,e.clientY-drag.current.y)>12){drag.current.moved=true;suppress.current=true;}}} onPointerUp={e=>{const start=drag.current;drag.current=null;if(start?.moved){const dx=e.clientX-start.x,dy=e.clientY-start.y;shift((Math.abs(dx)>Math.abs(dy)?dx:dy)<0?1:-1);}}} onPointerCancel={()=>{drag.current=null;suppress.current=true;}}>
 {items.map((item,i)=>{const slot=(i-index+items.length)%items.length;return <button key={item.title} className="orb-leaf" data-slot={slot} hidden={slot>2} aria-disabled={item.pending||undefined} onClick={()=>{if(!item.pending)enter(item);}}><strong>{item.title}</strong><small>{item.pending?'资料待公开':item.children?'展开 ›':'查看 ↗'}</small></button>;})}
 </div>
 <div className="orb-paging"><button aria-label="上一组栏目" disabled={items.length<2} onClick={()=>shift(-1)}>‹</button><span aria-live="polite">{index+1} / {items.length}</span><button aria-label="下一组栏目" disabled={items.length<2} onClick={()=>shift(1)}>›</button></div>
 </nav>}
 <button ref={orb} className="nav-orb" aria-controls="orb-menu" aria-label={!open?'打开分层目录':trail.length?'返回上一级目录':'收起分层目录'} aria-expanded={open} onClick={()=>{if(open)back();else setOpen(true);}}><span>{!open?'目录':trail.length?'返回':'×'}</span></button>
 </div>;
}
