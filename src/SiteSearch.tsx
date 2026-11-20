import { useEffect, useMemo, useRef, useState } from 'react';
import {createPortal} from 'react-dom';
import {siteSearchIndex,suggestedSearches} from './site-search-index';
import {searchSite} from './site-search-engine';
import './site-search.css';

export default function SiteSearch({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const results = useMemo(() => searchSite(siteSearchIndex,query), [query]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const timer = window.setTimeout(() => inputRef.current?.focus(), 30);
    const closeOnEscape = (event: KeyboardEvent) => {
      event.stopPropagation();
      if (event.key === 'Escape') {event.preventDefault();setOpen(false);}
      if(event.key==='Tab') {
        const items=Array.from(layerRef.current?.querySelectorAll<HTMLElement>('button,input,a[href]')||[]);
        const first=items[0],last=items.at(-1);
        if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus();}
        else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus();}
      }
    };
    const layer=layerRef.current;
    layer?.addEventListener('keydown', closeOnEscape);
    return () => {
      window.clearTimeout(timer);
      layer?.removeEventListener('keydown', closeOnEscape);
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
          <input ref={inputRef} aria-label="搜索关键词" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="搜索角色、配件或帮助" autoComplete="off" />
        </label>
        {!query.trim()&&<div className="site-search-suggestions"><p>常用搜索</p><div>{suggestedSearches.map(term=><button type="button" key={term} onClick={()=>setQuery(term)}>{term}</button>)}</div></div>}
        {query.trim()&&<p className="site-search-count" role="status">找到 {results.length} 项相关内容</p>}
        {query.trim()&&<div className="site-search-results" aria-live="polite"><ul>
          {results.length ? results.map(entry => <li key={entry.href}><a href={entry.href} onClick={() => setOpen(false)}>
            <span><strong>{entry.title}</strong><small>{entry.category} · {entry.subtitle}</small></span>
          </a></li>) : <li className="site-search-empty">暂时没有找到相关内容，可换用角色名、商品名，或用空格分隔关键词。</li>}
        </ul></div>}
      </section>
    </div>,document.body)}
  </>;
}
