export type NavigationItem={title:string;href?:string;children?:NavigationItem[];pending?:boolean};
const character='/series/flower-gods/jingxin';
export const siteNavigation:NavigationItem[]=[
 {title:'新品与发售',children:[{title:'当期主推 · 镜昕',href:character},{title:'购买须知',href:'/purchase-notice'}]},
 {title:'角色与系列',children:[{title:'花神卷',children:[{title:'镜昕 · 荷花女神',href:character}]},{title:'天使卷',pending:true},{title:'专属造物',children:[{title:'镜昕 · 莲台',pending:true}]}]},
 {title:'体型与部件',children:[{title:'女体',children:[{title:'女体 60',pending:true},{title:'女体 65',pending:true},{title:'女体 70',href:'/bodies/female-70'}]},{title:'男体',children:['70','75','80'].map(n=>({title:`男体 ${n}`,pending:true}))},{title:'独立部件',pending:true}]},
 {title:'服饰与配件',children:['眼球','假发','衣服','首饰','鞋袜','展示与收纳'].map(title=>({title,pending:true}))},
 {title:'影像与故事',children:[{title:'藏家自拍',href:'/stories/collectors'},{title:'官方拍摄',href:'/stories/official'},{title:'往期序章',href:'/stories/openings'},{title:'投稿与联系',href:'/contact'}]},
 {title:'帮助与服务',children:[{title:'帮助说明',href:'/help'},{title:'穿戴说明',href:'/support/dressing'},{title:'防伪核验',href:'/verify'},{title:'防伪说明',href:'/legal/authenticity'},{title:'投稿与联系',href:'/contact'},{title:'举报说明',href:'/report'},{title:'网站条款',href:'/legal/terms'}]},
];
// Landing pages remain available through breadcrumbs, not duplicate menu entries.
const bodyGroups=siteNavigation[2].children!;
const parts=bodyGroups.find(item=>item.title==='独立部件')!;parts.pending=false;parts.href='/bodies/parts';
const accessoryPaths:Record<string,string>={'眼球':'eyes','假发':'wigs','衣服':'clothing','首饰':'jewelry','鞋袜':'shoes','展示与收纳':'storage'};
siteNavigation[3].children?.forEach(item=>{if(accessoryPaths[item.title]){item.pending=false;item.href='/accessories/'+accessoryPaths[item.title];}});

// A menu entry is shown only when it leads to a published page or a
// category containing published entries. Pending leaf placeholders stay out
// of both desktop and mobile navigation.
function visibleEntries(items:NavigationItem[]):NavigationItem[]{
 return items.filter(item=>!item.pending).map(item=>({
  ...item,
  children:item.children?visibleEntries(item.children):undefined,
 })).filter(item=>Boolean(item.href||item.children?.length));
}
export const visibleSiteNavigation=visibleEntries(siteNavigation);
