import {useEffect,useRef,useState,type CSSProperties} from 'react';
import {requiredImage} from './media-library';
import {flowerGods,flowerGodPath,isPlainNavigation} from './flower-gods-catalog';
import './series-banner.css';
type Props={onOpenFlowerGods?:()=>void;onOpenFeatured?:()=>void;active?:boolean};
export default function SeriesScrolls({onOpenFeatured,active=true}:Props){
 const [choosing,setChoosing]=useState(false);
 const enter=useRef<HTMLButtonElement>(null),back=useRef<HTMLButtonElement>(null);
 const close=()=>{setChoosing(false);enter.current?.focus()};
 useEffect(()=>{if(!active)setChoosing(false)},[active]);
 useEffect(()=>{if(!choosing)return;back.current?.focus();const escape=(e:KeyboardEvent)=>{if(e.key==='Escape'){e.stopPropagation();close()}};window.addEventListener('keydown',escape);return()=>window.removeEventListener('keydown',escape)},[choosing]);
 return <section id="series" className={`flora-banner ${choosing?'is-choosing':''}`} aria-label="花神卷" data-home-scroll onKeyDown={e=>{if(choosing)e.stopPropagation()}}>
  <img className="flora-background" src="/opening/lotus-2026-09-still-v2.webp" alt="" loading="lazy"/>
  <div className="flora-shade" aria-hidden="true"/>
  <div className="flora-copy" inert={choosing} aria-hidden={choosing} data-active={active}>
   <span className="flora-eyebrow">THE FLORA SCROLL</span><h2>花神卷</h2>
   <p><span>千百年来，</span>人类习惯将<span>无法言明的深情，</span><span>折叠进一花一木的枯荣里。</span><br/><span>花，由此成为世间最纯粹</span><br/><span>也最含蓄的情感容器。</span></p>
   <p><span>当语言失去力量时，</span>我们将<span>这世间最含蓄的情感，</span><span>尽数刻入于造物的眉眼之间</span></p>
   <p><span>以此为契，</span>我们展开了<span>这部没有终点的长卷</span><span>——《花神卷》。</span></p>
   <button ref={enter} type="button" onClick={()=>setChoosing(true)} className="flora-enter">探索花神卷 <span aria-hidden="true">→</span></button>
  </div>
  {choosing&&<div className="flora-selection" data-no-chapter-swipe aria-label="选择花神作品" onClick={e=>{if(e.target===e.currentTarget)close()}}>
   <button ref={back} type="button" className="flora-back" onClick={close}>返回系列 ×</button>
   <nav className="flora-roster" aria-label="花神作品">{flowerGods.map((god,index)=><a className="flora-god" key={god.slug} href={flowerGodPath(god)} aria-label={`查看${god.name}主页`} onClick={e=>{if(index===0&&onOpenFeatured&&isPlainNavigation(e)){e.preventDefault();onOpenFeatured()}}}>
    <span className="flora-shard" style={{'--portrait':`url("${index===0?requiredImage('jingxinConcept'):god.image}")`} as CSSProperties}><img className="flora-alternate" src={index===0?requiredImage('jingxinPortrait'):god.avatar} alt=""/></span>
    <span className="flora-name">{god.name}</span>
   </a>)}</nav>
  </div>}
 </section>
}
