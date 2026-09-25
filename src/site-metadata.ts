import { resolveSiteRoute, type SiteRoute } from './flower-gods-catalog';
import {categoryPages} from './category-pages';

type PageMetadata = {
  title: string;
  description: string;
  robots?: string;
};

const defaultMetadata: PageMetadata = {
  title: 'LUMEN AURALIS｜绘屿造物原创 BJD',
  description: '探索绘屿造物原创 BJD 系列、当期角色档案、藏家返图与官方防伪验证。',
};

export function metadataForRoute(route: SiteRoute): PageMetadata {
  if (route.view === 'collection') return {
    title: '花神卷｜选择花神｜LUMEN AURALIS 绘屿造物',
    description: '进入绘屿造物花神卷，在花、云海与东方建筑构成的世界中选择并探索每一位花神。',
  };
  if (route.view === 'character') return {
    title: `${route.deity.name}｜${route.deity.flower}｜LUMEN AURALIS 绘屿造物`,
    description: `${route.deity.name}，${route.deity.flower}。${route.deity.description}查看角色原画、实体展示与造型细节。`,
  };
  if (route.view === 'not-found') return {
    title: '页面未收录｜LUMEN AURALIS 绘屿造物',
    description: '该页面暂未收录，请返回绘屿造物品牌首页。',
    robots: 'noindex, nofollow',
  };
  return defaultMetadata;
}

export function metadataForPath(pathname: string): PageMetadata {
  if(pathname.replace(/\/+$/, '')==='/stories/collectors')return {title:'藏家自拍｜绘屿造物',description:'经授权的藏家影像，按角色标签与平台浏览。'};
  const category=categoryPages[pathname.replace(/\/+$/, '')];if(category)return {title:category.title+'｜绘屿造物',description:category.description};
  if(pathname.replace(/\/+$/, '') === '/bodies') return {title:'体型与部件｜绘屿造物',description:'探索体型分类、已公开角色与部件资料。'};
  if(pathname.replace(/\/+$/, '') === '/bodies/female') return {title:'女体分类｜绘屿造物',description:'浏览女体分类与已公开的女体 70 角色。'};
  if(pathname.replace(/\/+$/, '') === '/bodies/female-70') return {title:'女体 70｜绘屿造物',description:'浏览女体 70 分类下的已公开角色，进入镜昕荷花女神档案与产品信息。'};
  if(pathname.replace(/\/+$/, '') === '/contact') return {title:'投稿与联系｜绘屿造物',description:'分享藏家影像，通过官方小红书联系绘屿造物。'};
  if(pathname.replace(/\/+$/, '') === '/help') return {title:'帮助说明｜绘屿造物',description:'浏览、购买、防伪查询与联系方法。'};
  if(pathname.replace(/\/+$/, '') === '/report') return {title:'侵权举报｜绘屿造物',description:'向绘屿造物提供疑似仿冒、盗图或冒充官方的线索。'};
  const legal = pathname.match(/^\/legal\/(terms|authenticity)\/?$/)?.[1];
  if (legal) {
    const titles = { terms: '网站使用条款', authenticity: '防伪服务说明' };
    return {
      title: `${titles[legal as keyof typeof titles]}｜LUMEN AURALIS 绘屿造物`,
      description: `查看绘屿造物${titles[legal as keyof typeof titles]}。`,
    };
  }
  if ((pathname.replace(/\/+$/, '') || '/') === '/verify') return {
    title: '官方防伪核验｜LUMEN AURALIS 绘屿造物',
    description: '绘屿造物原创 BJD 官方防伪核验入口。正式服务开放前，当前页面仅展示虚构样例。',
  };
  return metadataForRoute(resolveSiteRoute(pathname));
}

function upsertMeta(selector: string, attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

export function applySiteMetadata(pathname: string) {
  const metadata = metadataForPath(pathname);
  document.title = metadata.title;
  upsertMeta('meta[name="description"]', 'name', 'description', metadata.description);
  upsertMeta('meta[name="robots"]', 'name', 'robots', metadata.robots || 'index, follow');
  upsertMeta('meta[property="og:title"]', 'property', 'og:title', metadata.title);
  upsertMeta('meta[property="og:description"]', 'property', 'og:description', metadata.description);
  upsertMeta('meta[property="og:type"]', 'property', 'og:type', 'website');
  upsertMeta('meta[property="og:site_name"]', 'property', 'og:site_name', 'LUMEN AURALIS 绘屿造物');
  upsertMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary');
}
