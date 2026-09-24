import {useEffect,useRef,useState} from 'react';
import {siteNavigation,type NavigationItem} from './site-navigation';
import {requiredImage} from './media-library';
import SiteSearch from './SiteSearch';
import './desktop-navigation.css';
export default function DesktopNavigation(){
 const [active,setActive]=useState<number|null>(null),[trail,setTrail]=useState<NavigationItem[]>([]);
 const root=useRef<HTMLElement>(null),buttons=useRef<(HTMLButtonElement|null)[]>([]);
 const timer=useRef<ReturnType<typeof setTimeout>|null>(null);
 const cancel=()=>{if(timer.current)clearTimeout(timer.current);};
 const delay=(action:()=>void,ms=160)=>{cancel();timer.current=setTimeout(action,ms);};
 const close=()=>{cancel();setActive(null);};
 useEffect(()=>()=>cancel(),[]);
 useEffect(()=>{const outside=(e:PointerEvent)=>{if(!root.current?.contains(e.target as Node))close();};const escape=(e:KeyboardEvent)=>{if(e.key==='Escape')close();};document.addEventListener('pointerdown',outside);document.addEventListener('keydown',escape);return()=>{document.removeEventListener('pointerdown',outside);document.removeEventListener('keydown',escape);};},[]);
 const items=active===null?[]:siteNavigation[active].children||[];
 const renderItem=(item:NavigationItem)=>item.children?<button key={item.title} onMouseEnter={()=>{cancel();setTrail(t=>t.at(-1)===item?t:[...t,item]);}} onMouseLeave={cancel} onClick={()=>{cancel();setTrail(t=>[...t,item]);}}>{item.title}<span>›</span></button>:item.href?<a key={item.title} href={item.href} onClick={close}>{item.title}<span>↗</span></a>:<span key={item.title} className="archive-pending">{item.title}<small>资料待公开</small></span>;
 return <header ref={root} className="desktop-navigation" onMouseEnter={cancel} onMouseLeave={()=>delay(close,260)} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))close();}} onKeyDown={e=>{e.stopPropagation();if(e.key==='Escape'&&active!==null){buttons.current[active]?.focus();close();}}}>
 <div className="desktop-nav-row"><a className="desktop-nav-brand" href="/" aria-label="返回绘屿造物首页"><img src={requiredImage('brandLogo')} alt=""/><span>LUMEN AURALIS<small>绘屿造物</small></span></a><nav aria-label="主导航">{siteNavigation.map((item,i)=><button key={item.title} ref={el=>{buttons.current[i]=el;}} aria-expanded={active===i} aria-controls="desktop-directory" onMouseEnter={()=>{cancel();setActive(i);setTrail([]);}} onClick={()=>{cancel();setActive(i);setTrail([]);}}>{item.title}</button>)}</nav><SiteSearch/></div>
 {active!==null&&<section id="desktop-directory" className="archive-directory" aria-label={siteNavigation[active].title}><div className="archive-path"><button onClick={()=>setTrail([])}>{siteNavigation[active].title}</button>{trail.map((item,i)=><span key={i}> / <button onClick={()=>setTrail(t=>t.slice(0,i+1))}>{item.title}</button></span>)}<button className="archive-close" aria-label="关闭导航目录" onClick={()=>{buttons.current[active]?.focus();close();}}>×</button></div><div className="archive-columns"><div className="archive-categories">{items.map(item=>item.children?<button key={item.title} aria-pressed={trail[0]===item} onMouseEnter={()=>{cancel();setTrail([item]);}} onMouseLeave={cancel} onClick={()=>{cancel();setTrail([item]);}}>{item.title}<span>›</span></button>:renderItem(item))}</div><div key={trail.map(t=>t.title).join('/')} className="archive-contents">{trail.length?<><h2>{trail.at(-1)?.title}</h2>{trail.at(-1)?.children?.map(renderItem)}</>:<><h2>{siteNavigation[active].title}</h2><p>{items.some(i=>i.children)?'移入左侧分类，继续探索作品与资料。':'从左侧选择入口，查看详细内容。'}</p></>}</div></div></section>}
 </header>;
}
