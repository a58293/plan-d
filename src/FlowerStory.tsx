import {useEffect, useId, useMemo, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import jingxin from './stories/jingxin.txt?raw';
import './flower-story.css';

const stories: Record<string, {title: string; text: string}> = {
  jingxin: {title: '泥沼生花，水月照心', text: jingxin},
};
type Page = {chapter: number; heading?: string; paragraphs: string[]};

function BookPage({page, number}: {page?: Page; number: number}) {
  return <section className="story-page" aria-label={`第 ${number} 页`}>
    <div className="story-page-body" tabIndex={0}>
      {page?.heading && <h3>{page.heading}</h3>}
      {page?.paragraphs.map((paragraph,i)=><p key={i}>{paragraph}</p>)}
    </div><span className="story-folio" aria-hidden="true">{String(number).padStart(2,'0')}</span>
  </section>;
}

// A connected ribbon of narrow paper sections, not a single rigid plane.
function CurvedLeaf({front, back, frontNumber, backNumber, reverse}: {
  front?: Page; back?: Page; frontNumber: number; backNumber: number; reverse: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const strips = Array.from(element.children) as HTMLElement[];
    const width = element.clientWidth, step = width / strips.length;
    element.style.setProperty('--leaf-width', `${width}px`);
    const start = performance.now(); let frame = 0;
    const animate = () => {
      const t = Math.min(1, (performance.now()-start)/1050);
      const progress = t*t*(3-2*t);
      let x=0,z=0;
      strips.forEach((strip,i) => {
        const u=(i+.5)/strips.length;
        const angle=Math.PI*progress + .85*Math.sin(Math.PI*progress)*(u-.5);
        strip.style.width=`${step+.3}px`;
        strip.style.transform=`translate3d(${reverse?width-x-step:x}px,0,${z}px) rotateY(${(reverse?1:-1)*angle}rad)`;
        strip.style.setProperty('--strip-shade', `${.08+.17*Math.sin(Math.PI*progress)*Math.abs(u-.35)}`);
        x+=step*Math.cos(angle); z+=step*Math.sin(angle);
      });
      if(t<1) frame=requestAnimationFrame(animate);
    };
    frame=requestAnimationFrame(animate);
    return ()=>cancelAnimationFrame(frame);
  }, [reverse]);
  return <div ref={root} className={`story-curved-leaf${reverse?' is-reverse':''}`}>
    {Array.from({length:16},(_,i)=><div className="story-paper-strip" key={i}>
      <div className="story-strip-face"><div className="story-strip-content" style={{left:`calc(var(--leaf-width) * -${reverse?15-i:i}/16)`}}><BookPage page={front} number={frontNumber}/></div></div>
      <div className="story-strip-face is-back"><div className="story-strip-content" style={{left:`calc(var(--leaf-width) * -${reverse?i:15-i}/16)`}}><BookPage page={back} number={backNumber}/></div></div>
    </div>)}
  </div>;
}

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
  const [turning, setTurning] = useState<{from: number; direction: 'next'|'previous'} | null>(null);
  const turnTimer = useRef(0);
  const turningRef = useRef(false);
  useEffect(() => () => clearTimeout(turnTimer.current), []);
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
      });
      box.replaceChildren();
      const target = Math.max(0, result.findIndex(p => p.chapter === chapterBefore));
      current.current = target; pageList.current = result;
      clearTimeout(turnTimer.current); turningRef.current = false; setTurning(null);
      setSpread(count); setPages(result); setIndex(target);
    };
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(paginate); };
    const observer = new ResizeObserver(schedule); observer.observe(box);
    document.fonts.addEventListener('loadingdone', schedule); schedule();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); document.fonts.removeEventListener('loadingdone', schedule); };
  }, [chapters]);
  const turn = (target: number) => {
    if (turningRef.current) return;
    const next = Math.max(0, Math.min(pages.length-1, target));
    if (next === index) return;
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      turningRef.current = true;
      setTurning({from:index,direction:next<index?'previous':'next'});
      turnTimer.current = window.setTimeout(()=>{turningRef.current=false;setTurning(null);},1080);
    }
    current.current = next; setIndex(next);
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
      <div className="story-spread">
        {pages.slice(index,index+spread).map((page, offset) => <BookPage key={index+offset} page={page} number={index+offset+1} />)}
      </div>
      {turning && <div className={`story-turn-layer is-${turning.direction} ${spread===1?'is-single':''}`} aria-hidden="true" inert>
        {spread===2 && <div className="story-stationary"><BookPage page={pages[turning.from+(turning.direction==='next'?0:1)]} number={turning.from+(turning.direction==='next'?1:2)} /></div>}
        <CurvedLeaf reverse={turning.direction==='previous'}
          front={pages[turning.from+(turning.direction==='next'?spread-1:0)]} frontNumber={turning.from+(turning.direction==='next'?spread:1)}
          back={pages[index+(turning.direction==='next'?0:spread-1)]} backNumber={index+(turning.direction==='next'?1:spread)} />
      </div>}
      <button className="story-edge story-edge-left" aria-label="点击左侧翻到上一页" disabled={index===0||!!turning} onClick={()=>turn(index-spread)}><span>‹</span></button>
      <button className="story-edge story-edge-right" aria-label="点击右侧翻到下一页" disabled={index+spread>=pages.length||!!turning} onClick={()=>turn(index+spread)}><span>›</span></button>
    </div>
    <div className="story-book-controls">
      <button onClick={()=>turn(index-spread)} disabled={index===0||!!turning} aria-label="上一页">←</button>
      <div><select aria-label="选择章节" disabled={!!turning} value={chapterIndex} onChange={event=>turn(pages.findIndex(p=>p.chapter===Number(event.target.value)))}>
        {chapters.map((chapter,i)=><option key={i} value={i}>{chapter.heading}</option>)}
      </select><span role="status" aria-live="polite">{pages.length ? `${index+1}${spread===2?`–${Math.min(index+spread,pages.length)}`:''} / ${pages.length}` : '正在排版'}</span></div>
      <button onClick={()=>turn(index+spread)} disabled={index+spread>=pages.length||!!turning} aria-label="下一页">→</button>
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
