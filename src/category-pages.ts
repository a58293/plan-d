type Entry={title:string;href?:string;note?:string};
type Category={title:string;parent?:string;description:string;items:Entry[]};
export const categoryPages:Record<string,Category>={
 '/bodies':{title:'体型与部件',description:'按体型或部件分类浏览。',items:[{title:'女体',href:'/bodies/female'},{title:'男体',href:'/bodies/male'},{title:'独立部件',href:'/bodies/parts'}]},
 '/bodies/female':{title:'女体',parent:'/bodies',description:'选择型号，查看已公开角色。',items:[{title:'女体 60',note:'资料待公开'},{title:'女体 65',note:'资料待公开'},{title:'女体 70',href:'/bodies/female-70'}]},
 '/bodies/male':{title:'男体',parent:'/bodies',description:'以下为规划型号，资料将在正式发布后开放。',items:['70','75','80'].map(n=>({title:'男体 '+n,note:'资料待公开'}))},
 '/bodies/parts':{title:'独立部件',parent:'/bodies',description:'部件与适配资料尚未公开，请以后续正式发布为准。',items:[]},
 '/bodies/female-70':{title:'女体 70',parent:'/bodies/female',description:'此分类收录镜昕。具体尺寸、配置与适配信息以作品正式资料为准。',items:[{title:'镜昕 · 荷花女神',href:'/series/flower-gods/jingxin',note:'花神卷 · 查看角色与产品信息'}]},
 '/releases':{title:'新品与发售',description:'浏览当期作品与购买说明。',items:[{title:'当期主推 · 镜昕',href:'/series/flower-gods/jingxin'},{title:'发售与购买说明',href:'/help'}]},
 '/collections':{title:'角色与系列',description:'按系列浏览角色及专属造物。',items:[{title:'花神卷',href:'/series/flower-gods'},{title:'天使卷',note:'资料待公开'},{title:'专属造物',href:'/creations'}]},
 '/creations':{title:'专属造物',parent:'/collections',description:'与角色共同设计的独立作品。',items:[{title:'镜昕 · 莲台',note:'模型调整中，资料待公开'}]},
 '/accessories':{title:'服饰与配件',description:'按用途查看分类；未发布商品暂不开放购买。',items:[{title:'娃衣',href:'/accessories/clothing'},{title:'鞋袜',href:'/accessories/shoes'},{title:'假发与眼珠',href:'/accessories/hair-eyes'},{title:'饰品与道具',href:'/accessories/props'},{title:'展示与收纳',href:'/accessories/storage'}]},
 '/stories':{title:'影像与故事',description:'角色档案、藏家影像与投稿。',items:[{title:'藏家自拍',href:'/stories/collectors'},{title:'官方拍图',note:'筹备中'},{title:'往期序章',note:'筹备中'},{title:'投稿与联系',href:'/contact'}]},
 '/support':{title:'帮助与服务',description:'查找使用帮助、核验与官方联系方式。',items:[{title:'帮助说明',href:'/help'},{title:'防伪核验',href:'/verify'},{title:'防伪说明',href:'/legal/authenticity'},{title:'投稿与联系',href:'/contact'},{title:'举报说明',href:'/report'},{title:'网站条款',href:'/legal/terms'}]},
};
for(const [slug,title] of [['clothing','娃衣'],['shoes','鞋袜'],['hair-eyes','假发与眼珠'],['props','饰品与道具'],['storage','展示与收纳']])categoryPages['/accessories/'+slug]={title,parent:'/accessories',description:'本分类尚无已公开商品。款式、规格与适配信息将在正式发布后补充。',items:[]};
