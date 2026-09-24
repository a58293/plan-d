export type NavigationItem={title:string;href?:string;children?:NavigationItem[];pending?:boolean};
const character='/series/flower-gods/jingxin';
export const siteNavigation:NavigationItem[]=[
 {title:'新品与发售',children:[{title:'当期主推 · 镜昕',href:character},{title:'发售与购买说明',href:'/help'}]},
 {title:'角色与系列',children:[{title:'花神卷',children:[{title:'全部花神',href:'/series/flower-gods'},{title:'镜昕 · 荷花女神',href:character}]},{title:'天使卷',pending:true},{title:'专属造物',children:[{title:'镜昕 · 莲台',pending:true}]}]},
 {title:'体型与部件',children:[{title:'女体',children:['60','65','70'].map(n=>({title:`女体 ${n}`,pending:true}))},{title:'男体',children:['70','75','80'].map(n=>({title:`男体 ${n}`,pending:true}))},{title:'独立部件',pending:true}]},
 {title:'服饰与配件',children:['娃衣','鞋袜','假发与眼珠','饰品与道具','展示与收纳'].map(title=>({title,pending:true}))},
 {title:'影像与故事',children:[{title:'镜昕 · 角色档案',href:character},{title:'藏家返图',href:'/#collectors'},{title:'投稿与联系',href:'/report'}]},
 {title:'帮助与服务',children:[{title:'帮助说明',href:'/help'},{title:'防伪核验',href:'/verify'},{title:'防伪说明',href:'/legal/authenticity'},{title:'举报与官方联系',href:'/report'},{title:'网站条款',href:'/legal/terms'}]},
];
