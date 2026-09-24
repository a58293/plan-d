import {flowerGods, flowerGodPath} from './flower-gods-catalog';
import {categoryPages} from './category-pages';

export default function Breadcrumbs({path, section}: {path: string; section?: string}) {
  const items: {label: string; href?: string}[] = [{label:'首页',href:'/'}];
  const deity=flowerGods.find(g=>flowerGodPath(g)===path);
  if(categoryPages[path]) {
    const chain:string[]=[];let current:string|undefined=path;
    while(current&&categoryPages[current]){chain.unshift(current);current=categoryPages[current].parent;}
    chain.forEach(p=>items.push({label:categoryPages[p].title,href:p===path?undefined:p}));
  } else if(path==='/bodies'||path==='/bodies/female'||path==='/bodies/female-70') {
    items.push({label:'体型与部件',href:path==='/bodies'?undefined:'/bodies'});
    if(path!=='/bodies')items.push({label:'女体',href:path==='/bodies/female'?undefined:'/bodies/female'});
    if(path==='/bodies/female-70')items.push({label:'女体 70'});
  } else if(path.startsWith('/series/flower-gods')) {
    items.push({label:'花神卷',href:deity?'/series/flower-gods':undefined});
    if(deity) items.push({label:deity.name,href:section?path:undefined});
  } else items.push({label:({'/verify':'防伪核验','/legal/terms':'网站条款','/legal/authenticity':'防伪说明','/report':'举报说明','/help':'帮助说明','/contact':'投稿与联系'} as Record<string,string>)[path]||'页面未找到'});
  if(section)items.push({label:section});
  return <nav className="site-breadcrumbs" aria-label="当前位置"><ol>{items.map((item,i)=><li key={i}>
    {i>0&&<span aria-hidden="true">›</span>}{item.href?<a href={item.href}>{item.label}</a>:<span aria-current="page">{item.label}</span>}
  </li>)}</ol></nav>;
}
