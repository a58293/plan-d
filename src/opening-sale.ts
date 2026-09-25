import {commerce} from './commerce';
// Use an ISO date with timezone when scheduling an issue's opening.
export type OpeningSale={status:'closed'|'open'|'scheduled';url:string|null;opensAt:string|null};
export const lotusSale:OpeningSale={status:commerce.featuredProductUrl?'open':'closed',url:commerce.featuredProductUrl,opensAt:null};
export function resolveOpeningSale(sale:OpeningSale,now:number){
 const target=sale.opensAt?Date.parse(sale.opensAt):NaN;
 let url:string|null=null;
 try{if(sale.url&&new URL(sale.url).protocol==='https:')url=sale.url;}catch{}
 if(sale.status==='scheduled'&&Number.isFinite(target)&&target>now)return {kind:'countdown' as const,remaining:target-now,url:null};
 if((sale.status==='open'||(sale.status==='scheduled'&&Number.isFinite(target)&&target<=now))&&url)return {kind:'open' as const,remaining:0,url};
 return {kind:'closed' as const,remaining:0,url:null};
}
