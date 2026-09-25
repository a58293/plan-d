import {useEffect,useRef,useState} from 'react';
import {createPortal} from 'react-dom';
import {siteNavigation,type NavigationItem} from './site-navigation';
import './mobile-navigation.css';

export default function MobileNavigation({visible=true}:{visible?:boolean}){
 const [open,setOpen]=useState(false),[trail,setTrail]=useState<NavigationItem[]>([]);
 const root=useRef<HTMLDivElement>(null),orb=useRef<HTMLButtonElement>(null);
 const [position,setPosition]=useState<{x:number;y:number}|null>(()=>{
   try{const saved=JSON.parse(localStorage.getItem('lumen-nav-orb-position-v1')||'null');if(saved&&Number.isFinite(saved.x)&&Number.isFinite(saved.y))return {x:Math.max(12,Math.min(innerWidth-68,saved.x)),y:Math.max(12,Math.min(innerHeight-78,saved.y))};}catch{/* Storage may be unavailable. */}return null;
 });
 useEffect(()=>{if(position)try{localStorage.setItem('lumen-nav-orb-position-v1',JSON.stringify(position));}catch{/* Dragging still works without storage. */}},[position]);
 const orbDrag=useRef<{x:number;y:number;left:number;top:number;moved:boolean}|null>(null),orbMoved=useRef(false);
 useEffect(()=>{const resize=()=>setPosition(p=>p?{x:Math.max(12,Math.min(innerWidth-68,p.x)),y:Math.max(12,Math.min(innerHeight-78,p.y))}:null);window.addEventListener('resize',resize);return()=>window.removeEventListener('resize',resize);},[]);
 const items=trail.at(-1)?.children||siteNavigation;
 const close=()=>{setOpen(false);setTrail([]);};
 const back=()=>{if(trail.length){setTrail(t=>t.slice(0,-1));}else close();};
 useEffect(()=>{if(!visible)close();},[visible]);
 useEffect(()=>{if(!open)return;const outside=(e:PointerEvent)=>{if(!root.current?.contains(e.target as Node))close();};const escape=(e:KeyboardEvent)=>{if(e.key==='Escape'){close();orb.current?.focus();}};const resize=()=>{if(innerWidth>700)close();};document.addEventListener('pointerdown',outside);document.addEventListener('keydown',escape);window.addEventListener('resize',resize);return()=>{document.removeEventListener('pointerdown',outside);document.removeEventListener('keydown',escape);window.removeEventListener('resize',resize);};},[open]);
 const enter=(item:NavigationItem)=>{if(item.children){setTrail(t=>[...t,item]);}else if(item.href){close();window.location.assign(item.href);}};
 return createPortal(<div ref={root} className="mobile-navigation" data-open={open} data-global-orb="true" hidden={!visible} style={position?{left:position.x,top:position.y,right:'auto',bottom:'auto'}:undefined}>
 {open&&<nav id="orb-menu" className="orb-menu" aria-label="分层目录" style={position?{right:'auto',bottom:'auto',left:Math.max(8,Math.min(innerWidth-228,position.x<innerWidth/2?position.x+64:position.x-228))-position.x,top:Math.max(8,Math.min(innerHeight-360,position.y-284))-position.y}:undefined} onKeyDown={e=>{e.stopPropagation();if(e.key==='Escape'){close();orb.current?.focus();}}}>
 <div className="orb-context"><span>{trail.length?trail.map(t=>t.title).join(' / '):'探索绘屿'}</span><button aria-label="收起全部目录" onClick={close}>×</button></div>
 {trail.length>0&&<button className="orb-parent" onClick={back}>‹ {trail.at(-1)?.title}</button>}
 <div key={trail.map(t=>t.title).join('/')} className="orb-list">
 {items.map(item=><button key={item.title} className="orb-leaf" disabled={item.pending} onClick={()=>enter(item)}><strong>{item.title}</strong><small>{item.pending?'资料待公开':item.children?'展开 ›':'查看 ↗'}</small></button>)}
 </div><p className="orb-scroll-hint">上下滑动浏览栏目</p>
 </nav>}
 <button ref={orb} className="nav-orb" aria-controls="orb-menu" aria-label={!open?'打开分层目录':trail.length?'返回上一级目录':'收起分层目录'} aria-expanded={open}
 onPointerDown={e=>{if(e.button!==0)return;const rect=e.currentTarget.getBoundingClientRect();orbMoved.current=false;orbDrag.current={x:e.clientX,y:e.clientY,left:rect.left,top:rect.top,moved:false};e.currentTarget.setPointerCapture(e.pointerId);}}
 onPointerMove={e=>{const start=orbDrag.current;if(!start)return;const dx=e.clientX-start.x,dy=e.clientY-start.y;if(Math.hypot(dx,dy)>7)start.moved=true;if(start.moved){orbMoved.current=true;close();setPosition({x:Math.max(12,Math.min(innerWidth-68,start.left+dx)),y:Math.max(12,Math.min(innerHeight-78,start.top+dy))});}}}
 onPointerUp={()=>{orbDrag.current=null;if(position)try{localStorage.setItem('lumen-nav-orb-position-v1',JSON.stringify(position));}catch{/* Optional persistence. */}}} onPointerCancel={()=>{orbDrag.current=null;orbMoved.current=true;}}
 onClick={()=>{if(orbMoved.current){orbMoved.current=false;return;}if(open)back();else setOpen(true);}}><span aria-hidden="true">{!open?'✦':trail.length?'‹':'×'}</span></button>
 </div>,document.body);
}
