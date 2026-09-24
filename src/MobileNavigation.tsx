import {useEffect,useRef,useState} from 'react';
import {siteNavigation,type NavigationItem} from './site-navigation';
import './mobile-navigation.css';

export default function MobileNavigation(){
 const [open,setOpen]=useState(false),[trail,setTrail]=useState<NavigationItem[]>([]),[index,setIndex]=useState(0);
 const dialog=useRef<HTMLDialogElement>(null),trigger=useRef<HTMLButtonElement>(null);
 const drag=useRef<{x:number;y:number;moved:boolean}|null>(null),suppress=useRef(false);
 const items=trail.at(-1)?.children||siteNavigation;
 const close=()=>setOpen(false);
 useEffect(()=>{if(!open)return;dialog.current?.showModal();const old=document.body.style.overflow;document.body.style.overflow='hidden';const resize=()=>{if(innerWidth>700)close();};window.addEventListener('resize',resize);return()=>{document.body.style.overflow=old;window.removeEventListener('resize',resize);trigger.current?.focus();};},[open]);
 const shift=(delta:number)=>setIndex(i=>(i+delta+items.length)%items.length);
 const enter=(item:NavigationItem)=>{if(suppress.current){suppress.current=false;return;}if(item.children){setTrail(t=>[...t,item]);setIndex(0);}else if(item.href){close();window.location.assign(item.href);}};
 return <div className="mobile-navigation"><button ref={trigger} className="nav-orb" aria-label="打开分层目录" aria-haspopup="dialog" aria-expanded={open} onClick={()=>{setTrail([]);setIndex(0);setOpen(true);}}>目录</button>
 {open&&<dialog ref={dialog} className="radial-dialog" aria-labelledby="radial-title" onCancel={close} onClick={e=>{if(e.target===e.currentTarget)close();}}>
 <section className="radial-sheet"><header><button onClick={()=>{setTrail(t=>t.slice(0,-1));setIndex(0);}} disabled={!trail.length}>‹ 返回</button><button aria-label="关闭分层目录" onClick={close}>×</button></header>
 <p className="radial-path">目录{trail.map(t=>' / '+t.title).join('')}</p><h2 id="radial-title">{trail.at(-1)?.title||'探索绘屿'}</h2>
 <div className="radial-stage" onPointerDown={e=>{drag.current={x:e.clientX,y:e.clientY,moved:false};suppress.current=false;}} onPointerMove={e=>{if(drag.current&&Math.hypot(e.clientX-drag.current.x,e.clientY-drag.current.y)>12){drag.current.moved=true;suppress.current=true;}}} onPointerUp={e=>{const start=drag.current;drag.current=null;if(start?.moved){shift(e.clientX-start.x<0?1:-1);}}} onPointerCancel={()=>{drag.current=null;suppress.current=true;}}>
 <div className="radial-track" aria-hidden="true"/>{items.map((item,i)=>{let offset=(i-index+items.length)%items.length;if(offset>items.length/2)offset-=items.length;const visible=Math.abs(offset)<=1;return <button key={item.title} className="radial-item" data-offset={offset} hidden={!visible} disabled={item.pending} onClick={()=>enter(item)}><strong>{item.title}</strong><small>{item.pending?'资料待公开':item.children?'展开子栏目':'进入页面 ↗'}</small></button>;})}
 <span className="radial-center" aria-hidden="true">✦</span></div>
 <div className="radial-controls"><button aria-label="上一项" disabled={items.length<2} onClick={()=>shift(-1)}>←</button><span aria-live="polite">{index+1} / {items.length}</span><button aria-label="下一项" disabled={items.length<2} onClick={()=>shift(1)}>→</button></div><p className="radial-hint">左右滑动转动栏目 · 点击展开</p><a className="radial-home" href="/">返回首页 ↗</a>
 </section></dialog>}
 </div>;
}
