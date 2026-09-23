import {useEffect, useId, useMemo, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import jingxin from './stories/jingxin.txt?raw';
import './flower-story.css';

const stories: Record<string, {title: string; text: string}> = {
  jingxin: {title: '泥沼生花，水月照心', text: jingxin},
};
type Page = {chapter: number; heading?: string; paragraphs: string[]; blank?: boolean};

function StoryBook({text, title}: {text: string; title: string}) {
  const chapters = useMemo(() => {
    const result: {heading: string; paragraphs: string[]}[] = [];
    for (const paragraph of text.trim().split(/\r?\n\s*\r?\n/).map(s => s.trim())) {
      if (paragraph === title) continue;
      if (/^[一二三四五六七八九十]+\s*[，、,]/.test(paragraph)) result.push({heading: paragraph, paragraphs: []});
      else { if (!result.length) result.push({heading: title, paragraphs: []}); result.at(-1)!.paragraphs.push(paragraph); }
    }
    return result;
  }, [text, title]);
  const measure = useRef<HTMLDivElement>(null);
  const current = useRef(0);
  const pageList = useRef<Page[]>([]);
  const [pages, setPages] = useState<Page[]>([]);
  const [index, setIndex] = useState(0);
  const [spread, setSpread] = useState(1);
  const [direction, setDirection] = useState('next');
  const touch = useRef<{x: number; y: number} | null>(null);
  useEffect(() => {
    const box = measure.current;
    if (!box) return;
    let frame = 0;
    const paginate = () => {
      const count = window.matchMedia('(min-width: 800px)').matches ? 2 : 1;
      if (!box.clientHeight || !box.clientWidth) return;
      const chapterBefore = pageList.current[current.current]?.chapter ?? 0;
      const result: Page[] = [];
      const fits = () => box.scrollHeight <= box.clientHeight;
      chapters.forEach((chapter, chapterIndex) => {
        let page: Page = {chapter: chapterIndex, heading: chapter.heading, paragraphs: []};
        box.replaceChildren();
        const heading = document.createElement('h3'); heading.textContent = chapter.heading; box.append(heading);
        const next = () => { result.push(page); page = {chapter: chapterIndex, paragraphs: []}; box.replaceChildren(); };
        for (const paragraph of chapter.paragraphs) {
          let remaining = Array.from(paragraph);
          while (remaining.length) {
            const node = document.createElement('p'); box.append(node);
            let low = 0, high = remaining.length;
            while (low < high) {
              const mid = Math.ceil((low + high) / 2); node.textContent = remaining.slice(0, mid).join('');
              if (fits()) low = mid; else high = mid - 1;
            }
            if (!low && (page.paragraphs.length || page.heading)) { node.remove(); next(); continue; }
            // Extremely short viewports retain readable text with a page-local scroll fallback.
            const taken = Math.max(1, low);
            const part = remaining.slice(0, taken).join(''); node.textContent = part;
            page.paragraphs.push(part); remaining = remaining.slice(taken);
            if (remaining.length) next();
          }
        }
        result.push(page);
        if (count === 2 && result.length % 2) result.push({chapter: chapterIndex, paragraphs: [], blank: true});
      });
      box.replaceChildren();
      const target = Math.max(0, result.findIndex(p => p.chapter === chapterBefore));
      current.current = target; pageList.current = result;
      setSpread(count); setPages(result); setIndex(target);
    };
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(paginate); };
    const observer = new ResizeObserver(schedule); observer.observe(box);
    document.fonts.addEventListener('loadingdone', schedule); schedule();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); document.fonts.removeEventListener('loadingdone', schedule); };
  }, [chapters]);
  const turn = (target: number) => {
    const next = Math.max(0, Math.min(Math.max(0, pages.length - spread), Math.floor(target / spread) * spread));
    setDirection(next < index ? 'previous' : 'next'); current.current = next; setIndex(next);
  };
  const chapterIndex = pages[index]?.chapter ?? 0;
  return <div className="story-book" onKeyDown={event => {
    if (event.target instanceof HTMLSelectElement) return;
    if (event.key === 'ArrowRight') { event.preventDefault(); turn(index + spread); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); turn(index - spread); }
  }}>
    <div className="story-book-stage" onTouchStart={event => { const t = event.touches[0]; touch.current = {x:t.clientX,y:t.clientY}; }}
      onTouchEnd={event => {
        const t = event.changedTouches[0], start = touch.current; touch.current = null;
        if (start && Math.abs(t.clientX-start.x)>55 && Math.abs(t.clientX-start.x)>Math.abs(t.clientY-start.y)*1.5) turn(index + (t.clientX<start.x?spread:-spread));
      }}>
      <div className="story-page story-measure" aria-hidden="true"><div className="story-page-body" ref={measure} /></div>
      <div className={`story-spread turn-${direction}`} key={`${index}-${spread}-${pages.length}`}>
        {pages.slice(index,index+spread).map((page, offset) => <section className="story-page" key={index+offset} aria-label={`第 ${index+offset+1} 页`}>
          <div className="story-page-body" tabIndex={0}>
            {page.heading && <h3>{page.heading}</h3>}
            {page.paragraphs.map((paragraph,i)=><p key={i}>{paragraph}</p>)}
            {page.blank && <div className="story-page-rest" aria-label="本章结束"><span aria-hidden="true">◇</span><div>{chapters[page.chapter].heading.replace(/^[^、，,]+[、，,]/,'')}</div><small>镜昕 · 荷花女神</small></div>}
          </div>
          <span className="story-folio" aria-hidden="true">{String(index+offset+1).padStart(2,'0')}</span>
        </section>)}
      </div>
    </div>
    <div className="story-book-controls">
      <button onClick={()=>turn(index-spread)} disabled={index===0} aria-label="上一页">←</button>
      <div><select aria-label="选择章节" value={chapterIndex} onChange={event=>turn(pages.findIndex(p=>p.chapter===Number(event.target.value)))}>
        {chapters.map((chapter,i)=><option key={i} value={i}>{chapter.heading}</option>)}
      </select><span role="status" aria-live="polite">{pages.length ? `${index+1}${spread===2?`–${Math.min(index+spread,pages.length)}`:''} / ${pages.length}` : '正在排版'}</span></div>
      <button onClick={()=>turn(index+spread)} disabled={index+spread>=pages.length} aria-label="下一页">→</button>
    </div>
  </div>;
}

export default function FlowerStory({slug, onOpenChange}: {slug: string; onOpenChange?: (open: boolean) => void}) {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const story = stories[slug];
  const change = (value: boolean) => { setOpen(value); onOpenChange?.(value); };
  useEffect(() => {
    if (!open) return;
    const element = dialog.current, overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden'; element?.showModal();
    return () => { element?.close(); document.body.style.overflow = overflow; if (trigger.current?.isConnected) trigger.current.focus(); };
  }, [open]);
  if (!story) return null;
  return <>
    <button ref={trigger} type="button" className="flower-story-trigger" onClick={() => change(true)} aria-haspopup="dialog">她的故事 <span aria-hidden="true">↗</span></button>
    {open && createPortal(<dialog ref={dialog} className="flower-story-dialog" aria-labelledby={titleId}
      onCancel={event=>{event.preventDefault();event.stopPropagation();change(false);}}
      onKeyDown={event=>event.stopPropagation()} onWheel={event=>event.stopPropagation()}
      onTouchStart={event=>event.stopPropagation()} onTouchMove={event=>event.stopPropagation()} onTouchEnd={event=>event.stopPropagation()}
      onClick={event=>{event.stopPropagation();if(event.target===event.currentTarget)change(false);}}>
      <div className="flower-story-shell">
        <header><div><small>镜昕 · 荷花女神</small><h2 id={titleId}>{story.title}</h2></div><button type="button" onClick={()=>change(false)} aria-label="关闭故事" autoFocus>关闭 ×</button></header>
        <StoryBook text={story.text} title={story.title} />
      </div>
    </dialog>,document.body)}
  </>;
}
