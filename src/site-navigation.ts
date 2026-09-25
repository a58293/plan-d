export type NavigationItem={title:string;href?:string;children?:NavigationItem[];pending?:boolean};
const character='/series/flower-gods/jingxin';
export const siteNavigation:NavigationItem[]=[
 {title:'新品与发售',children:[{title:'当期主推 · 镜昕',href:character},{title:'发售与购买说明',href:'/help'}]},
 {title:'角色与系列',children:[{title:'花神卷',children:[{title:'全部花神',href:'/series/flower-gods'},{title:'镜昕 · 荷花女神',href:character}]},{title:'天使卷',pending:true},{title:'专属造物',children:[{title:'镜昕 · 莲台',pending:true}]}]},
 {title:'体型与部件',children:[{title:'体型总览',href:'/bodies'},{title:'女体',children:[{title:'全部女体',href:'/bodies/female'},{title:'女体 60',pending:true},{title:'女体 65',pending:true},{title:'女体 70',href:'/bodies/female-70'}]},{title:'男体',children:['70','75','80'].map(n=>({title:`男体 ${n}`,pending:true}))},{title:'独立部件',pending:true}]},
 {title:'服饰与配件',children:['娃衣','鞋袜','假发与眼珠','饰品与道具','展示与收纳'].map(title=>({title,pending:true}))},
 {title:'影像与故事',children:[{title:'藏家自拍',href:'/stories/collectors'},{title:'官方拍图',pending:true},{title:'往期序章',href:'/stories/openings'},{title:'投稿与联系',href:'/contact'}]},
 {title:'帮助与服务',children:[{title:'帮助说明',href:'/help'},{title:'防伪核验',href:'/verify'},{title:'防伪说明',href:'/legal/authenticity'},{title:'投稿与联系',href:'/contact'},{title:'举报说明',href:'/report'},{title:'网站条款',href:'/legal/terms'}]},
];
// Category landing pages remain separate from product/character detail pages.
const overviewPaths=['/releases','/collections','/bodies','/accessories','/stories','/support'];
siteNavigation.forEach((section,i)=>{if(i!==2&&i!==4)section.children?.unshift({title:'查看全部'+section.title,href:overviewPaths[i]});});
const bodyGroups=siteNavigation[2].children!;
bodyGroups.find(item=>item.title==='男体')?.children?.unshift({title:'全部男体',href:'/bodies/male'});
const parts=bodyGroups.find(item=>item.title==='独立部件')!;parts.pending=false;parts.href='/bodies/parts';
siteNavigation[1].children?.find(item=>item.title==='专属造物')?.children?.unshift({title:'全部专属造物',href:'/creations'});
const accessoryPaths:Record<string,string>={'娃衣':'clothing','鞋袜':'shoes','假发与眼珠':'hair-eyes','饰品与道具':'props','展示与收纳':'storage'};
siteNavigation[3].children?.forEach(item=>{if(accessoryPaths[item.title]){item.pending=false;item.href='/accessories/'+accessoryPaths[item.title];}});
