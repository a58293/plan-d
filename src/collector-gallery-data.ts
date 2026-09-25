import {requiredImage} from './media-library';
export type CollectorPhoto={id:string;src:string;alt:string;width:number;height:number;platform:string;author:string;profileUrl?:string;publishedAt?:string;postUrl?:string;series?:string;groupId?:string;description?:string;tags:string[];flowers:string[];authorized:boolean};
// Publish only images whose display permission and attribution have been confirmed.
export const collectorGallery:CollectorPhoto[]=[];
export const officialGallery:CollectorPhoto[]=[];
export function photoPath(id:string,official=false){return '/stories/'+(official?'official':'collectors')+'/'+encodeURIComponent(id);}
export function safePhotoLink(url?:string){try{return url&&new URL(url).protocol==='https:'?url:null;}catch{return null;}}
// Each entry must be a separate transparent flower, not a complete background.
// Reuse homepage relief assets. CSS viewports select a flower cluster without
// editing the source or repeating the complete two-sided background.
export const flowerSprites:Record<string,{src:string;size:string;position:string}>={
 lotus:{src:requiredImage('lotusRelief'),size:'420% auto',position:'0% 73%'},
};
export function flowerAllocation(weights:Record<string,number>,count=18):string[]{
 const entries=Object.entries(weights).filter(([,n])=>n>0).sort(([a],[b])=>a.localeCompare(b));
 const total=entries.reduce((n,[,v])=>n+v,0);if(!total)return [];
 const quotas=entries.map(([key,n])=>({key,value:n/total*count,slots:Math.floor(n/total*count)}));
 let left=count-quotas.reduce((n,q)=>n+q.slots,0);
 for(const q of [...quotas].sort((a,b)=>(b.value-b.slots)-(a.value-a.slots))){if(left--<=0)break;q.slots++;}
 return quotas.flatMap(q=>Array(q.slots).fill(q.key));
}
