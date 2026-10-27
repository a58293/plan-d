import {useRef, useState} from 'react';
import storyText from './stories/jingxin.txt?raw';
import {requiredImage} from './media-library';
import './mobile-story-reader.css';

const blocks = storyText.trim().split(/\r?\n\s*\r?\n/).map(block => block.trim()).filter(Boolean);
const storyTitle = blocks[0];
const chapters: {title:string; paragraphs:string[]}[] = [];
for (const block of blocks.slice(1)) {
  if (/^[一二三四]、/.test(block)) chapters.push({title:block,paragraphs:[]});
  else chapters.at(-1)?.paragraphs.push(block);
}
const images = [
  {src:requiredImage('jingxinConcept'), alt:'镜昕原画'},
  {src:'/story-experiences/assets/moon-scene.webp', alt:'镜昕与水月的故事画面'},
  {src:requiredImage('jingxinPortrait'), alt:'镜昕作品完整造型'},
];

export default function MobileStoryReader() {
  const [page,setPage] = useState(0);
  const touchStart = useRef<number | null>(null);
  const move = (step:number) => setPage(current => Math.max(0,Math.min(images.length-1,current+step)));
  return <div className="mobile-story-reader" aria-label="镜昕故事图册">
    <div className="mobile-story-book" onTouchStart={event=>{touchStart.current=event.changedTouches[0]?.clientX ?? null;}} onTouchEnd={event=>{
      if (touchStart.current===null) return;
      const distance=(event.changedTouches[0]?.clientX ?? touchStart.current)-touchStart.current;
      if (Math.abs(distance)>45) move(distance<0?1:-1);
      touchStart.current=null;
    }}>
      <img key={images[page].src} src={images[page].src} alt={images[page].alt} loading="lazy" decoding="async" draggable={false}/>
    </div>
    <div className="mobile-story-controls" aria-label="图册翻页">
      <button type="button" onClick={()=>move(-1)} disabled={page===0}>上一页</button>
      <span aria-live="polite">{String(page+1).padStart(2,'0')} / {String(images.length).padStart(2,'0')}</span>
      <button type="button" onClick={()=>move(1)} disabled={page===images.length-1}>下一页</button>
    </div>
    <p className="mobile-story-hint">左右轻扫，也可以翻页</p>
    <details className="mobile-story-fulltext">
      <summary>阅读故事全文</summary>
      <div className="mobile-story-pages">
        <h3>{storyTitle}</h3>
        {chapters.map((chapter,index) => <section className="mobile-story-chapter" key={chapter.title} aria-labelledby={`mobile-story-chapter-${index}`}>
          <h4 id={`mobile-story-chapter-${index}`}>{chapter.title}</h4>
          {chapter.paragraphs.map((paragraph,part) => <p key={part}>{paragraph}</p>)}
        </section>)}
      </div>
    </details>
  </div>;
}
