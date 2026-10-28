import {useRef,useState,type MouseEvent} from 'react';
import {requiredImage} from './media-library';
import {currentFeaturedProduct} from './current-product-theme';
import {isPlainNavigation, flowerGods, flowerGodPath} from './flower-gods-catalog';
import {MobileActions} from './PurchaseMenu';
import './mobile-home.css';
import HomeSupport from './HomeSupport';
import HomeCollectorPreview from './HomeCollectorPreview';
import {useSmoothPosterPointer} from './useSmoothPosterPointer';
import {officialInfo, verificationIsLive} from './official-info';

export default function MobileHome({onOpenFeatured}:{onOpenFlowerGods?:()=>void;onOpenFeatured?:()=>void}) {
  const [artMode,setArtMode]=useState<'poster'|'physical'>('poster');
  const stage=useRef<HTMLElement>(null);
  const move=useSmoothPosterPointer(stage,true);
  const follow=(action?:()=>void)=>(event:MouseEvent<HTMLAnchorElement>)=>{if(action&&isPlainNavigation(event)){event.preventDefault();action();}};
  return <div className="mh-page">
    <header className="mh-header"><a href="/" className="mh-brand"><img src={requiredImage('brandLogo')} alt="绘屿造物"/><span>绘屿造物</span></a><MobileActions/></header>
    <main>
      <section ref={stage} className="mh-cover mh-prologue-cover" aria-labelledby="mh-title" data-art-mode={artMode}
        onPointerMove={event=>{if(event.pointerType==='touch'&&!event.buttons)return;const rect=event.currentTarget.getBoundingClientRect();move(((event.clientX-rect.left)/rect.width-.5)*12,((event.clientY-rect.top)/rect.height-.5)*9);}}
        onPointerLeave={()=>move(0,0)}>
        <img className="mh-prologue-image" src="/opening/lotus-2026-09-still-v2.webp" alt="" fetchPriority="high" decoding="async" />
        <div className="mh-prologue-physical-scene" aria-hidden="true"><img src={requiredImage('lotusRelief')} alt="" loading="lazy" decoding="async" /></div>
        <img className="mh-prologue-physical" src={requiredImage(currentFeaturedProduct.physicalMedia)} alt="镜昕 · 荷花女神实体造型" loading="lazy" decoding="async" />
        <div className="mh-prologue-shade" aria-hidden="true" />
        <div className="mh-heading mh-prologue-heading"><p>序章 / 01 · 镜昕</p><h1 id="mh-title"><img src="/opening/lotus-calligraphy-v1.webp" alt="泥沼生花，水月照心" /></h1><span>荷花女神 · 花神卷</span></div>
        <div className="mh-prologue-mode" role="group" aria-label="首页展示方式"><button aria-pressed={artMode==='poster'} onClick={()=>setArtMode('poster')}>画报</button><button aria-pressed={artMode==='physical'} onClick={()=>setArtMode('physical')}>实物</button></div>
        <div className="mh-prologue-actions"><a className="mh-cta" href="/series/flower-gods/jingxin#gallery">她的故事<small className="story-desktop-hint">电脑端体验更完整</small></a><ReplayOpeningButton /></div>
      </section>
      <section className="mh-volume" id="series"><div className="mh-section-heading"><span>01 / 花神卷</span><h2>一卷花事，<br/>各有其神。</h2><p>以花为引，将想象塑成可珍藏的形体。</p></div>
        <nav className="deity-roster" aria-label="选择花神">{flowerGods.map(deity=><a key={deity.slug} href={flowerGodPath(deity)} onClick={flowerGodPath(deity)===currentFeaturedProduct.href?follow(onOpenFeatured):undefined} aria-label={'进入'+deity.flower+deity.name+'详情'}><span className="deity-avatar"><img src={deity.avatar} alt="" width="58" height="58"/></span><span>{deity.name}</span></a>)}{[1,2,3].map(index=><button key={index} disabled aria-label={'未公开花神 '+index}><span className="deity-avatar deity-placeholder">?</span><span>待揭晓</span></button>)}</nav>
      </section>
      <section className="mh-collectors" id="collectors"><HomeCollectorPreview/></section>
      <section className="mh-auth" id="verify"><span className="mh-eyebrow">03 / 防伪核验</span><h2>珍藏有据，<br/>相遇有迹。</h2><p>{verificationIsLive ? <>凭娃证编号与淘宝订单号，<br/>查询作品的官方出品记录。</> : <>正式核验暂未开放。<br/>可先查看虚构样例与核验说明。</>}</p><a href="/verify">{verificationIsLive ? '进入防伪核验' : '查看防伪预览'}</a></section>
      <HomeSupport />
    </main>
    <footer className="mh-footer"><strong>绘屿造物</strong><p>{officialInfo.brandName} · 原创球形关节人偶</p><a href={`tel:${officialInfo.servicePhone}`}>客服 {officialInfo.servicePhone}</a><small>{officialInfo.serviceHours}</small><div><a href="/legal/terms">网站条款</a><a href="/legal/authenticity">防伪说明</a><a href="/report">侵权举报</a></div></footer>
  </div>;
}
import ReplayOpeningButton from './ReplayOpeningButton';
