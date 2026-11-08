import {useState,useRef} from 'react';
const styles=[
 {name:'深色调',files:['deep-1','deep-2']},
 {name:'浅色调',files:['light-1','light-2']},
 {name:'绿色花纹款',files:['green-1','green-2']},
 {name:'晶石款',files:['crystal-1','crystal-2','crystal-3']},
];
const eyePhotos=import.meta.glob<string>('../public/eye-collection/*.webp',{eager:true,query:'?url',import:'default'});
const url=(file:string,size=720)=>eyePhotos[`../public/eye-collection/${file}-${size}.webp`];
export default function EyeCollection({overview=false,onPreview}:{overview?:boolean;onPreview:(src:string)=>void}){
 const [selected,setSelected]=useState(0),[angle,setAngle]=useState(0);
 const item=styles[selected];
 const track=useRef<HTMLDivElement>(null);

 if(overview)return <><div className="eye-classic-hero accessory-eye-hero-field"><span className="accessory-eye-hero-overline">镜昕 · 两种色调</span><div className="accessory-eye-hero-pair">{["deep","light"].map((tone,i)=><div className="accessory-eye-hero-sample" key={tone}><div className={`accessory-eye-hero-object is-${tone}`}><img src={new URL("../public/eye-product-display-v1.png",import.meta.url).href} alt={i?"浅色调":"深色调"}/></div><span>{i?"浅色调":"深色调"}</span></div>)}</div></div><div className="eye-collection-overview">{styles.map((entry,index)=><a key={entry.name} href="#accessory-archive" className="eye-collection-card"><img src={url(entry.files[0])} alt={entry.name+'眼球实拍'} loading={index>1?'lazy':'eager'} decoding="async" width="720" height="540"/><span>{entry.name}</span></a>)}</div></>;
 return <div className="eye-collection-detail"><div className="eye-desktop-photo eye-collection-photo" data-photo={item.files[angle]}><img src={url(item.files[angle],1440)} loading="lazy" decoding="async" width="1440" height="1080" alt={item.name+'实拍角度'+(angle+1)}/></div><div key={selected} ref={track} className="eye-mobile-track" onScroll={e=>{const node=e.currentTarget;setAngle(Math.round(node.scrollLeft/Math.max(1,node.clientWidth)));}}>{item.files.map((file,i)=><button key={file} className="eye-mobile-slide" data-photo={file} onClick={()=>onPreview(url(file,1440))} aria-label={item.name+'，角度'+(i+1)}><img src={url(file,1440)} alt={item.name+'实物照片'} loading="lazy" decoding="async"/></button>)}</div><div className="eye-collection-controls"><h3>{item.name}</h3><p>四款实物展示，可选择款式与拍摄角度，查看花纹、色泽及细节。</p><div className="eye-collection-select" aria-label="选择眼球款式">{styles.map((entry,i)=><button key={entry.name} aria-pressed={selected===i} onClick={()=>{setSelected(i);setAngle(0);}}>{entry.name}</button>)}</div><div className="eye-collection-angles" aria-label="选择拍摄角度">{item.files.map((file,i)=><button key={file} aria-label={'查看角度'+(i+1)} aria-pressed={angle===i} onClick={()=>{setAngle(i);track.current?.scrollTo({left:i*track.current.clientWidth,behavior:"smooth"});}}><img src={url(file)} alt="" loading="lazy" decoding="async"/></button>)}</div><p>尺寸、适配与可选配置请在淘宝商品页面核对。</p></div></div>;
}
