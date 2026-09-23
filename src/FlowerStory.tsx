import {useEffect, useId, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import jingxin from './stories/jingxin.txt?raw';
import './flower-story.css';

// Add supplied biographies by character slug here; unpublished stories have no entry.
const stories: Record<string, {title: string; text: string}> = {
  jingxin: {title: '荷花女神小传', text: jingxin},
};

export default function FlowerStory({slug, onOpenChange}: {
  slug: string; onOpenChange?: (open: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const story = stories[slug];
  const change = (value: boolean) => { setOpen(value); onOpenChange?.(value); };
  useEffect(() => {
    if (!open) return;
    const element = dialog.current;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    element?.showModal();
    return () => {
      element?.close(); document.body.style.overflow = overflow;
      if (trigger.current?.isConnected) trigger.current.focus();
    };
  }, [open]);
  if (!story) return null;
  const paragraphs = story.text.trim().split(/\r?\n\s*\r?\n/).filter(p => p.trim() !== story.title);
  return <>
    <button ref={trigger} type="button" className="flower-story-trigger" onClick={() => change(true)} aria-haspopup="dialog">花神小传 <span aria-hidden="true">↗</span></button>
    {open && createPortal(<dialog ref={dialog} className="flower-story-dialog" aria-labelledby={titleId}
      onCancel={event => { event.preventDefault(); event.stopPropagation(); change(false); }}
      onKeyDown={event => event.stopPropagation()} onWheel={event => event.stopPropagation()}
      onTouchStart={event => event.stopPropagation()} onTouchMove={event => event.stopPropagation()} onTouchEnd={event => event.stopPropagation()}
      onClick={event => { event.stopPropagation(); if (event.target === event.currentTarget) change(false); }}>
      <div className="flower-story-shell">
        <header><div><small>花神卷 · 生平与心境</small><h2 id={titleId}>{story.title}</h2></div><button type="button" onClick={() => change(false)} aria-label="关闭花神小传" autoFocus>关闭 ×</button></header>
        <article tabIndex={0} aria-label="小传正文">
          {paragraphs.map((p, i) => /^[一二三四五六七八九十]+\s*[，、,]/.test(p.trim())
            ? <h3 key={i}>{p.trim()}</h3> : <p key={i}>{p.trim()}</p>)}
          <footer>— 荷生泥沼，心向清光 —</footer>
        </article>
      </div>
    </dialog>, document.body)}
  </>;
}
