import {useEffect,useRef,useState} from 'react';
import {siteNavigation,type NavigationItem} from './site-navigation';
import {requiredImage,type MediaId} from './media-library';
import SiteSearch from './SiteSearch';
import './desktop-navigation.css';

const artwork:MediaId[]=['jingxinPortrait','homeSeries','jingxinPortrait','lotusRelief','jingxinConcept','homeSeries'];
const descriptions=['循着当期作品，了解新的相遇。','花神与天使，各有其世界。','体型、部件与适配资料。','为角色选择合适的装扮。','从创作到相遇，记录每一份故事。','购买、核验与联系，从这里开始。'];
function Entry({item}:{item:NavigationItem}){return item.href?<a href={item.href}>{item.title}<span aria-hidden="true">↗</span></a>:<span className="mega-pending">{item.title}<small>资料待公开</small></span>;}
export default function DesktopNavigation(){
 const [active,setActive]=useState<number|null>(null);
 const timer=useRef<ReturnType<typeof setTimeout>|null>(null),root=useRef<HTMLElement>(null),buttons=useRef<(HTMLButtonElement|null)[]>([]);
 const cancel=()=>{if(timer.current)clearTimeout(timer.current);};
 const open=(index:number)=>{cancel();timer.current=setTimeout(()=>setActive(index),120);};
 const leave=()=>{cancel();timer.current=setTimeout(()=>setActive(null),220);};
 useEffect(()=>{const escape=(e:KeyboardEvent)=>{if(e.key==='Escape'){cancel();setActive(null);}};document.addEventListener('keydown',escape);return()=>document.removeEventListener('keydown',escape);},[]);
 useEffect(()=>{const dismiss=(e:PointerEvent)=>{if(!root.current?.contains(e.target as Node))setActive(null);};document.addEventListener('pointerdown',dismiss);return()=>{cancel();document.removeEventListener('pointerdown',dismiss);};},[]);
 return <header ref={root} className="desktop-navigation" data-expanded={active!==null} onMouseLeave={leave} onMouseEnter={cancel} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))setActive(null);}} onKeyDown={e=>{e.stopPropagation();if(e.key==='Escape'&&active!==null){cancel();buttons.current[active]?.focus();setActive(null);}}}>
 <div className="desktop-nav-row"><a className="desktop-nav-brand" href="/" aria-label="返回绘屿造物首页"><img src={requiredImage('brandLogo')} alt=""/><span>LUMEN AURALIS<small>绘屿造物</small></span></a>
 <nav aria-label="主导航">{siteNavigation.map((item,i)=><button key={item.title} ref={el=>{buttons.current[i]=el;}} aria-expanded={active===i} aria-controls={`mega-panel-${i}`} onMouseEnter={()=>open(i)} onClick={()=>{cancel();setActive(active===i?null:i);}} onKeyDown={e=>{if(e.key==='ArrowDown'){e.preventDefault();cancel();setActive(i);setTimeout(()=>root.current?.querySelector<HTMLElement>(`#mega-panel-${i} a`)?.focus(),0);}}}>{item.title}</button>)}</nav><SiteSearch/>
 </div>
 {siteNavigation.map((section,i)=><section key={section.title} id={`mega-panel-${i}`} className="mega-panel" aria-label={section.title} hidden={active!==i} onMouseEnter={cancel} onClick={e=>{if((e.target as HTMLElement).closest('a'))setActive(null);}}>
 <div className="mega-intro"><p>EXPLORE / 0{i+1}</p><h2>{section.title}</h2><p>{descriptions[i]}</p><a href="/">品牌首页 ↗</a></div>
 <div className="mega-groups">{section.children?.map(item=><div className="mega-group" key={item.title}>{item.children?<><h3>{item.title}</h3>{item.children.map(child=>child.children?<div key={child.title}><h4>{child.title}</h4>{child.children.map(leaf=><Entry key={leaf.title} item={leaf}/>)}</div>:<Entry key={child.title} item={child}/>)}</>:<Entry item={item}/>}</div>)}</div>
 <figure><img src={requiredImage(artwork[i])} alt="" loading="lazy"/><figcaption>{section.title} · LUMEN AURALIS</figcaption></figure>
 </section>)}
 </header>;
}
