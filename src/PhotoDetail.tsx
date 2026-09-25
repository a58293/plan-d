import Breadcrumbs from './Breadcrumbs';
import {MobileActions} from './PurchaseMenu';
import {collectorGallery,officialGallery,photoPath,safePhotoLink} from './collector-gallery-data';
import PhotoWall from './PhotoWall';
import './collector-gallery.css';
export default function PhotoDetail(){
 const official=location.pathname.startsWith('/stories/official/'),base='/stories/'+(official?'official':'collectors');
 let id='';try{id=decodeURIComponent(location.pathname.slice(base.length+1));}catch{}
 const source=(official?officialGallery:collectorGallery).filter(p=>p.authorized),photo=source.find(p=>p.id===id);
 const all=[...collectorGallery.map(p=>({p,official:false})),...officialGallery.map(p=>({p,official:true}))].filter(x=>x.p.authorized);
 const group=photo?.groupId?source.filter(p=>p.id!==id&&p.groupId===photo.groupId):[];
 const related=photo?all.filter(x=>x.p!==photo&&x.p.series&&x.p.series!==photo.series).slice(0,8):[];
 return <div className="collector-world"><header className="mf-header"><a href="/">绘屿造物</a><MobileActions/></header><Breadcrumbs path={base} section={photo?.alt||'影像未收录'}/><main className="photo-detail">{photo?<><p className="collector-eyebrow">{official?'OFFICIAL PHOTOGRAPHY':'COLLECTOR MOMENT'}</p><h1>{photo.alt}</h1><img className="photo-detail-main" src={photo.src} alt={photo.alt} width={photo.width} height={photo.height}/><section className="photo-detail-info"><h2>{photo.author}</h2><p>{[photo.platform,photo.publishedAt,photo.series].filter(Boolean).join(' · ')}</p><p>{photo.description}</p><p>{photo.tags.map(t=><span key={t}>#{t} </span>)}</p><div>{safePhotoLink(photo.postUrl)&&<a href={safePhotoLink(photo.postUrl)!} target="_blank" rel="noopener noreferrer">查看原帖 ↗</a>}{safePhotoLink(photo.profileUrl)&&<a href={safePhotoLink(photo.profileUrl)!} target="_blank" rel="noopener noreferrer">创作者主页 ↗</a>}</div></section>{group.length>0&&<section><h2>同组影像</h2><PhotoWall photos={group} official={official}/></section>}{related.length>0&&<section><h2>探索其他系列</h2><div className="photo-related">{related.map(({p,official:o})=><a key={photoPath(p.id,o)} href={photoPath(p.id,o)}><img src={p.src} alt={p.alt} width={p.width} height={p.height} loading="lazy"/><span>{p.series} · {p.alt}</span></a>)}</div></section>}</>:<><h1>这份影像暂未收录</h1><p>作品可能尚未发布，或链接已失效。</p></>}<a href={base}>‹ 返回{official?'官方拍图':'藏家自拍'}</a></main></div>;
}
