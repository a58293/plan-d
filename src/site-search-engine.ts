export type SearchEntry={title:string;subtitle:string;href:string;category:string;keywords:string;aliases?:string[]};
export function normalizeSearch(value:string){return value.normalize('NFKC').toLowerCase().replace(/[\s\p{P}\p{S}]+/gu,'');}
export function searchSite(entries:readonly SearchEntry[],query:string):SearchEntry[]{
 const tokens=[...new Set(query.normalize('NFKC').toLowerCase().trim().split(/\s+/u).map(normalizeSearch).filter(Boolean))];
 if(!tokens.length)return [];
 const full=normalizeSearch(query);
 const scored=entries.map((entry,index)=>{
  const title=normalizeSearch(entry.title),aliases=(entry.aliases||[]).map(normalizeSearch);
  const context=normalizeSearch(entry.subtitle+' '+entry.category+' '+entry.keywords);
  if(!tokens.every(token=>title.includes(token)||aliases.some(alias=>alias.includes(token))||context.includes(token)))return null;
  let score=title===full?200:title.startsWith(full)?140:title.includes(full)?110:0;
  if(aliases.includes(full))score+=150;
  for(const token of tokens)score+=title===token?60:title.includes(token)?40:aliases.includes(token)?60:aliases.some(alias=>alias.includes(token))?25:10;
  return {entry,index,score};
 }).filter((result):result is {entry:SearchEntry;index:number;score:number}=>result!==null);
 const seen=new Set<string>();
 return scored.sort((a,b)=>b.score-a.score||a.index-b.index).filter(({entry})=>{if(seen.has(entry.href))return false;seen.add(entry.href);return true}).map(({entry})=>entry);
}