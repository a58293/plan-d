import { useEffect, useMemo, useRef, useState } from 'react';
import {createPortal} from 'react-dom';
import { flowerGodPath, flowerGods } from './flower-gods-catalog';
import './site-search.css';

const fixedEntries = [
  {title:'往期序章',subtitle:'主推海报与序章回看',href:'/stories/openings',keywords:'序章 互动海报 回看 历史 荷花'},
  {title:'体型与部件',subtitle:'体型分类与部件档案',href:'/bodies',keywords:'体型 部件 女体 男体'},
  {title:'女体分类',subtitle:'女体型号与已公开角色',href:'/bodies/female',keywords:'女体 60 65 70'},
  {title:'女体 70',subtitle:'所属角色 · 镜昕荷花女神',href:'/bodies/female-70',keywords:'体型 女体 70 荷花 镜昕'},
  { title: '投稿与联系', subtitle: '藏家影像投稿与官方私信', href: '/contact', keywords: '投稿 联系 客服 小红书' },
  { title: '品牌首页', subtitle: '当期主推、系列与藏家返图', href: '/', keywords: '首页 当期 up 主推 实体 2d' },
  { title: '花神卷', subtitle: '选择并探索花神', href: '/series/flower-gods', keywords: '系列 花神 选择 云海' },
  { title: '防伪核验', subtitle: '娃证与订单双重核对', href: '/verify', keywords: '验证 真伪 娃证 淘宝 订单' },
  { title: '防伪服务说明', subtitle: '查询范围与结果说明', href: '/legal/authenticity', keywords: '验证 防伪 说明' },
  { title: '举报说明', subtitle: '仿冒、盗图与冒充官方线索', href: '/report', keywords: '举报 投诉 侵权 盗版 仿冒' },
  { title: '帮助说明', subtitle: '浏览、购买、核验与联系方法', href: '/help', keywords: '帮助 客服 购买 声音 加载' },
];

const searchEntries = [
  ...fixedEntries,
  ...flowerGods.map(deity => ({
    title: deity.name,
    subtitle: `${deity.flower} · ${deity.englishName}`,
    href: flowerGodPath(deity),
    keywords: `${deity.flower} ${deity.description} 角色 原画 实体 造型细节`,
  })),
];

export default function SiteSearch({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const results = useMemo(() => {
    const term = query.trim().toLocaleLowerCase();
    if (!term) return [];
    return searchEntries.filter(entry => `${entry.title} ${entry.subtitle} ${entry.keywords}`.toLocaleLowerCase().includes(term));
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const timer = window.setTimeout(() => inputRef.current?.focus(), 30);
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
      if(event.key==='Tab') {
        const items=Array.from(layerRef.current?.querySelectorAll<HTMLElement>('button,input,a[href]')||[]);
        const first=items[0],last=items.at(-1);
        if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus();}
        else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus();}
      }
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', closeOnEscape);
      document.body.style.overflow = previous;
      triggerRef.current?.focus();
    };
  }, [open]);

  return <>
    <button ref={triggerRef} className="site-search-trigger" data-tone={tone} type="button" onClick={() => {setQuery('');setOpen(true);}} aria-haspopup="dialog" aria-expanded={open}>
      <span aria-hidden="true">⌕</span><b>搜索</b>
    </button>
    {open && createPortal(<div ref={layerRef} className="site-search-layer" role="dialog" aria-modal="true" aria-label="网站搜索" onMouseDown={event => {
      if (event.target === event.currentTarget) setOpen(false);
    }}>
      <section className="site-search-panel">
        <header><p>搜索</p><button type="button" onClick={() => setOpen(false)} aria-label="关闭搜索">×</button></header>
        <label className="site-search-field">
          <span aria-hidden="true">⌕</span>
          <input ref={inputRef} aria-label="搜索关键词" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="搜索角色、体型或帮助" autoComplete="off" />
        </label>
        {query.trim()&&<div className="site-search-results" role="list" aria-live="polite">
          {results.length ? results.map(entry => <a role="listitem" href={entry.href} key={entry.href} onClick={() => setOpen(false)}>
            <span><strong>{entry.title}</strong><small>{entry.subtitle}</small></span><b aria-hidden="true">↗</b>
          </a>) : <p className="site-search-empty">暂时没有找到相关内容</p>}
        </div>}
      </section>
    </div>,document.body)}
  </>;
}
