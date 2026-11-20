import {categoryPages} from './category-pages';
import {jingxinProductInfo} from './jingxin-product-info';
import {collectorGallery,officialGallery,photoPath} from './collector-gallery-data';
import {visibleSiteNavigation,type NavigationItem} from './site-navigation';
import {flowerGods,flowerGodPath} from './flower-gods-catalog';
import {verificationIsLive} from './official-info';
import type {SearchEntry} from './site-search-engine';

// Canonical destinations first. Public navigation is merged below so newly
// published navigation leaves become searchable without duplicating records.
const curated:SearchEntry[]=[
 {title:'镜昕',category:'角色',subtitle:'荷花女神 · 角色主页、海报与实物',href:'/series/flower-gods/jingxin',aliases:['jingxin','jing xin','镜昕荷花女神'],keywords:'花神卷 莲花 BJD 球形关节人偶 娃娃 角色 原画 实物 海报 产品信息 配置 泥沼生花 水月照心 '+jingxinProductInfo.flat().join(' ')},
 {title:'花神卷',category:'系列',subtitle:'探索已公开的花神角色',href:'/series/flower-gods',aliases:['flora','the flora scroll','花神系列'],keywords:'系列 花神 荷花 镜昕 莲花'},
 {title:'目光',category:'配件',subtitle:'镜昕的目光 · 花纹眼球与实物展示',href:'/accessories/eyes',aliases:['目光','镜昕的目光','眼珠','眼睛','eyes'],keywords:'镜昕 荷花女神 配件 眼球 深色 浅色 绿色 晶石 14/5 16/5'},
 {title:'游丝',category:'配件',subtitle:'镜昕发型与佩戴关系 · 造型档案',href:'/accessories/wigs',aliases:['游丝','镜昕的游丝','假发','头发','wigs','wig'],keywords:'镜昕 荷花女神 头纱 发型 配件 打理'},
 {title:'衣袂',category:'配件',subtitle:'镜昕衣装层次与套装说明 · 造型档案',href:'/accessories/clothing',aliases:['衣袂','镜昕的衣袂','娃衣','衣服','clothing'],keywords:'镜昕 荷花女神 战国袍 披帛 荷叶披肩 拖尾 薄纱 裙子 服饰 套装'},
 {title:'流光',category:'配件',subtitle:'镜昕饰件与佩戴关系 · 造型档案',href:'/accessories/jewelry',aliases:['流光','镜昕的流光','首饰','饰品','jewelry'],keywords:'镜昕 荷花女神 配饰 花冠 胸饰 颈饰 吊坠 项链'},
 {title:'女体 68',category:'体型',subtitle:'镜昕所属体型分类 · 规格以作品正式资料为准',href:'/bodies/female-70',aliases:['女体68','68女体'],keywords:'女体 体型 身体 尺寸 型号 镜昕 荷花'},
 {title:'体型与部件',category:'体型',subtitle:'浏览已公开的体型与部件目录',href:'/bodies',keywords:'体型 身体 部件 分类'},
 {title:'女体分类',category:'体型',subtitle:'浏览已公开的女体型号与角色',href:'/bodies/female',keywords:'女体 身体 型号 体型'},
 {title:'独立部件',category:'部件',subtitle:'部件与适配资料尚未公开 · 分类说明',href:'/bodies/parts',keywords:'部件 手型 手 脚 关节 身体 配件'},
 {title:'防伪核验',category:'服务',subtitle:verificationIsLive?'娃证编号与淘宝订单双重核对':'正式服务未开放 · 查看界面预览',href:'/verify',aliases:['防伪验证','查真伪','验真','verify'],keywords:'真假 正版 防伪 娃证 编号 淘宝 订单 证书 身份 查询 核验'},
 {title:'购买须知',category:'帮助',subtitle:'付款、云笺、制作周期、收货及售后说明',href:'/purchase-notice',aliases:['购买说明','怎么买','购买流程','售后','退款'],keywords:'购买 下单 淘宝 付款 价格 云笺 预定 现货 发货 周期 工期 等待 快递 运输 收货 退换 退货 退款 养护 防染 转单 转让 二手 确认收货 云笺 制作确认 取消 订单修改 开箱 保养 黄化'},
 {title:'穿戴说明',category:'帮助',subtitle:'镜昕穿戴步骤整理中',href:'/support/dressing',keywords:'穿戴 穿衣 安装 头纱 披肩 衣服 裙装 教程'},
 {title:'帮助说明',category:'帮助',subtitle:'浏览、购买、核验及常见使用问题',href:'/help',aliases:['常见问题','FAQ'],keywords:'帮助 声音 音乐 静音 加载 缓慢 打不开 浏览器 客服 联系 购买'},
 {title:'投稿与联系',category:'服务',subtitle:'官方联系方式与藏家影像投稿',href:'/contact',aliases:['联系我们','客服','联系官方','联系客服'],keywords:'投稿 联系 客服 小红书 私信 官方 账号 工作时间 联系方式'},
 {title:'举报说明',category:'服务',subtitle:'仿冒、盗图与冒充官方的线索说明',href:'/report',keywords:'举报 投诉 侵权 盗版 盗图 仿冒 假货 冒充'},
 {title:'官方拍摄',category:'影像',subtitle:'镜昕官方影像与拍摄档案',href:'/stories/official',aliases:['官图','官方照片'],keywords:'镜昕 荷花 实物 摄影 写真 照片 图集 故事 故事图册'},
 {title:'藏家自拍',category:'影像',subtitle:'藏家记录的相遇与日常',href:'/stories/collectors',aliases:['返图','藏家返图'],keywords:'藏家 买家秀 自拍 投稿 返图 照片 图集'},
 {title:'往期序章',category:'影像',subtitle:'主推海报与序章回看',href:'/stories/openings',aliases:['序章','重看序章'],keywords:'镜昕 历史 海报 视频 动画 音乐 水下 莲花 回看 泥沼生花 水月照心'},
 {title:'品牌首页',category:'品牌',subtitle:'绘屿造物 · 当期作品与系列',href:'/',aliases:['绘屿造物','lumen auralis','首页'],keywords:'品牌 BJD 原创 球形关节人偶 当期 主推'}
];
function navigationEntries(items:NavigationItem[],parents:string[]=[]):SearchEntry[]{
 return items.flatMap(item=>{
  if(item.pending)return [];
  const path=[...parents,item.title];
  return [...(item.href?[{title:item.title,subtitle:parents.join(' · '),href:item.href,category:parents[0]||'页面',keywords:path.join(' ')}]:[]),...navigationEntries(item.children||[],path)];
 });
}
const characterEntries=flowerGods.map(god=>({title:god.name,subtitle:god.flower,href:flowerGodPath(god),category:'角色',keywords:`${god.description} ${god.flower} 角色 原画 实物`}));
const categoryEntries:SearchEntry[]=Object.entries(categoryPages)
 .filter(([href,page])=>!href.startsWith('/accessories/hair-eyes')&&!href.startsWith('/accessories/props')&&page.items.some(item=>item.href))
 .map(([href,page])=>({href,title:page.title,subtitle:page.description,category:'分类',keywords:page.title+' '+page.items.filter(item=>item.href).map(item=>item.title).join(' ')}));
const photoEntries:SearchEntry[]=[...collectorGallery.map(photo=>({photo,official:false})),...officialGallery.map(photo=>({photo,official:true}))]
 .filter(({photo})=>photo.authorized)
 .map(({photo,official})=>({title:photo.alt,href:photoPath(photo.id,official),category:official?'官方影像':'藏家影像',subtitle:[photo.author,photo.series,photo.platform].filter(Boolean).join(' · '),keywords:[photo.description,...photo.tags].filter(Boolean).join(' ')}));
const merged=new Map<string,SearchEntry>();
for(const entry of [...curated,...characterEntries,...navigationEntries(visibleSiteNavigation),...categoryEntries,...photoEntries]){
 const existing=merged.get(entry.href);
 if(existing){existing.keywords+=' '+entry.keywords;existing.aliases=[...(existing.aliases||[]),entry.title];}
 else merged.set(entry.href,{...entry});
}
export const siteSearchIndex:readonly SearchEntry[]=[...merged.values()];
export const suggestedSearches=['镜昕','眼珠','娃衣','购买须知','防伪核验','联系客服'];