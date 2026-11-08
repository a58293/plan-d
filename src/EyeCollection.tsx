import {useState} from 'react';
const styles=[
 {name:'深色调',files:['deep-1','deep-2']},
 {name:'浅色调',files:['light-1','light-2']},
 {name:'绿色花纹款',files:['green-1','green-2']},
 {name:'晶石款',files:['crystal-1','crystal-2','crystal-3']},
];
const url=(file:string)=>`/eye-collection/${file}.png`;
export default function EyeCollection({overview=false,onPreview}:{overview?:boolean;onPreview:(src:string)=>void}){
 const [selected,setSelected]=useState(0),[angle,setAngle]=useState(0);
 const item=styles[selected];
 if(overview)return <div className="eye-collection-overview">{styles.map((entry,index)=><a key={entry.name} href="#accessory-archive" className="eye-collection-card"><img src={url(entry.files[0])} alt={entry.name+'眼球实拍'} loading={index>1?'lazy':'eager'}/><span>{entry.name}</span></a>)}</div>;
 return <div className="eye-collection-detail"><div className="eye-collection-photo"><img src={url(item.files[angle])} alt={item.name+'实拍角度'+(angle+1)}/><button className="accessory-enlarge" onClick={()=>onPreview(url(item.files[angle]))}>点击放大查看</button></div><div className="eye-collection-controls"><h3>{item.name}</h3><p>四款实物展示，可选择款式与拍摄角度，查看花纹、色泽及细节。</p><div className="eye-collection-select" aria-label="选择眼球款式">{styles.map((entry,i)=><button key={entry.name} aria-pressed={selected===i} onClick={()=>{setSelected(i);setAngle(0);}}>{entry.name}</button>)}</div><div className="eye-collection-angles" aria-label="选择拍摄角度">{item.files.map((file,i)=><button key={file} aria-label={'查看角度'+(i+1)} aria-pressed={angle===i} onClick={()=>setAngle(i)}><img src={url(file)} alt=""/></button>)}</div><p>尺寸、适配与可选配置请在淘宝商品页面核对。</p></div></div>;
}
