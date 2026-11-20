import {detailAccessoryHref} from './jingxin-detail-links';
import {useState,type CSSProperties} from 'react';
import {commerce} from './commerce';
import {requiredImage} from './media-library';
import PurchaseMenu from './PurchaseMenu';
import {jingxinHeroImage} from './character-hero-media';
import './character-scene-fit.css';

type Props={scale?:number;onProductInfo:()=>void;onExplore?:()=>void;mobile?:boolean};
export default function CharacterEntrance({scale=1,onProductInfo,onExplore,mobile=false}:Props){
 const [mode,setMode]=useState<'poster'|'physical'>('poster');
 const [physicalReady,setPhysicalReady]=useState(false);
 const physicalVisible=mode==='physical'&&physicalReady;
 const physicalImage=requiredImage('jingxinPortrait');
 const preloadPhysical=()=>{const image=new Image();image.src=physicalImage};
 return <>
  <img className="character-hero-art character-hero-layer" src={jingxinHeroImage} data-mode="poster" data-visible={!physicalVisible} aria-hidden={physicalVisible} alt="镜昕与莲花的水下海报" fetchPriority="high" decoding="async"/>
  {(mode==='physical'||physicalReady)&&<img className="character-hero-art character-hero-layer" src={physicalImage} data-mode="physical" data-visible={physicalVisible} aria-hidden={!physicalVisible} alt="镜昕实体造型" decoding="async" onLoad={async event=>{const image=event.currentTarget;try{await image.decode()}catch{}setPhysicalReady(true)}} onError={()=>{setPhysicalReady(false);setMode('poster')}}/>}
  <div className="character-hero-shade" aria-hidden="true"/>
  <div className="character-fitbox" style={{'--character-scale':scale} as CSSProperties}><div className="character-scene">
   <div className="character-intro">
    <h1>镜昕</h1>
    <div className="character-links">
    <a className="character-explore" href={mobile?'#detail':'#details'} onClick={e=>{if(onExplore){e.preventDefault();onExplore()}}}>查看造型细节</a>
    <div className="character-actions">
     <button type="button" onClick={onProductInfo}>产品信息</button>
     {commerce.featuredProductUrl||commerce.shopUrl?<a href={commerce.featuredProductUrl||commerce.shopUrl!} target="_blank" rel="noopener noreferrer">前往淘宝购买</a>:<PurchaseMenu currentSlug="jingxin" label="淘宝购买"/>}
    </div>
    <div className="character-secondary">
    <div className="character-mode" role="group" aria-label="主页展示方式">
     <button type="button" aria-pressed={mode==='poster'} onClick={()=>setMode('poster')}>海报</button>
     <button type="button" aria-pressed={mode==='physical'} onPointerEnter={preloadPhysical} onFocus={preloadPhysical} onClick={()=>setMode('physical')}>实物</button>
    </div>

    <nav className="character-accessories" aria-label="镜昕的配件">
     <span className="character-accessories-label">祂的</span>
     <a href={detailAccessoryHref('eyes','face')}>目光</a>
     <a href={detailAccessoryHref('clothing','dress')}>衣袂</a>
     <a href={detailAccessoryHref('wigs','headdress')}>游丝</a>
     <a href={detailAccessoryHref('jewelry','ornament')}>流光</a>
    </nav>
    </div>
    </div>
   </div>
  </div></div>
 </>;
}