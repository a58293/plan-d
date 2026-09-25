import {useEffect,useMemo,useRef,useState} from 'react';
import Breadcrumbs from './Breadcrumbs';
import {MobileActions} from './PurchaseMenu';
import {collectorGallery,flowerSprites,flowerAllocation} from './collector-gallery-data';
import './collector-gallery.css';

function FlowerSlot({kind,index}:{kind:string;index:number}){
 const [shown,setShown]=useState(kind),[turn,setTurn]=useState(false);
 useEffect(()=>{if(kind===shown)return;const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;if(reduced){setShown(kind);return;}setTurn(true);const swap=setTimeout(()=>setShown(kind),260),end=setTimeout(()=>setTurn(false),560);return()=>{clearTimeout(swap);clearTimeout(end);};},[kind]);
 const sprite=flowerSprites[shown];return sprite?<span className="collector-flower" data-turn={turn} style={{backgroundImage:`url(${sprite.src})`,backgroundSize:sprite.size,backgroundPosition:sprite.position,left:((index*37)%94)+'%',top:((index*23)%90)+'%',rotate:((index*19)%60-30)+'deg'}}/>:null;
}
export default function CollectorGallery(){
 const [tag,setTag]=useState('全部'),[platform,setPlatform]=useState('全部'),[limit,setLimit]=useState(12),[weights,setWeights]=useState<Record<string,number>>({});
 const grid=useRef<HTMLDivElement>(null),sentinel=useRef<HTMLDivElement>(null);
 const approved=useMemo(()=>collectorGallery.filter(p=>p.authorized),[]);
 const tags=Array.from(new Set(approved.flatMap(p=>p.tags))),platforms=Array.from(new Set(approved.map(p=>p.platform)));
 const filtered=approved.filter(p=>(tag==='全部'||p.tags.includes(tag))&&(platform==='全部'||p.platform===platform));const photos=filtered.slice(0,limit);
 useEffect(()=>{setLimit(12);setWeights({});},[tag,platform]);
 useEffect(()=>{const node=sentinel.current;if(!node||limit>=filtered.length)return;const observer=new IntersectionObserver(([e])=>{if(e.isIntersecting)setLimit(n=>Math.min(n+12,filtered.length));},{rootMargin:'400px'});observer.observe(node);return()=>observer.disconnect();},[limit,filtered.length]);
 useEffect(()=>{const visible=new Map<string,number>();const observer=new IntersectionObserver(entries=>{entries.forEach(e=>visible.set((e.target as HTMLElement).dataset.photo!,e.isIntersecting?e.intersectionRatio:0));const next:Record<string,number>={};photos.forEach(p=>{const ratio=visible.get(p.id)||0;if(ratio>0)p.flowers.forEach(f=>{next[f]=(next[f]||0)+ratio/Math.max(1,p.flowers.length);});});setWeights(next);},{rootMargin:'-90px 0px 0px',threshold:[0,.25,.5,.75,1]});grid.current?.querySelectorAll('[data-photo]').forEach(el=>observer.observe(el));return()=>observer.disconnect();},[tag,platform,limit]);
 const allocation=flowerAllocation(weights);
 return <div className="collector-world"><div className="collector-garden" aria-hidden="true">{allocation.map((kind,i)=><FlowerSlot key={i} kind={kind} index={i}/>)}</div><header className="mf-header"><a href="/">绘屿造物</a><MobileActions/></header><Breadcrumbs path="/stories/collectors"/><main><p className="collector-eyebrow">COLLECTORS / MOMENTS</p><h1>藏家自拍</h1><p>由藏家记录的相遇与日常。</p><div className="collector-filters"><label>角色与标签<select value={tag} onChange={e=>setTag(e.target.value)}>{['全部',...tags].map(t=><option key={t}>{t}</option>)}</select></label><label>平台<select value={platform} onChange={e=>setPlatform(e.target.value)}>{['全部',...platforms].map(t=><option key={t}>{t}</option>)}</select></label></div>
 <div className="collector-grid" ref={grid}>{photos.map(p=><article key={p.id} data-photo={p.id}><a href={p.src} target="_blank" rel="noopener noreferrer" aria-label={'查看原图：'+p.alt}><img src={p.src} width={p.width} height={p.height} alt={p.alt} loading="lazy" decoding="async"/></a><div className="collector-credit"><strong>{p.profileUrl&&/^https:\/\//.test(p.profileUrl)?<a href={p.profileUrl} target="_blank" rel="noopener noreferrer">{p.author} ↗</a>:p.author}</strong><span>{p.platform}</span><p>{p.tags.map(t=><button key={t} onClick={()=>setTag(t)}>#{t}</button>)}</p></div></article>)}</div>
 {!approved.length?<section className="collector-empty"><h2>等待第一份藏家影像</h2><p>经授权的照片将在这里展示，并标注平台、作者与角色标签。</p><a href="/contact">投稿与联系 ↗</a></section>:!filtered.length?<p>没有符合当前筛选的照片。</p>:null}
 <div ref={sentinel} className="collector-end">{limit<filtered.length?<button onClick={()=>setLimit(n=>n+12)}>加载更多照片</button>:photos.length?'已经看完当前分类的照片':''}</div></main></div>;
}
