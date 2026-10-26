import {useEffect, useRef, useState, type MouseEvent} from 'react';
import SiteSearch from './SiteSearch';
import Breadcrumbs from './Breadcrumbs';
import {requiredImage} from './media-library';
import noticeText from './purchase-notice-text.txt?raw';
import './legal-page.css';
import './purchase-notice.css';

type TextBlock = {type: 'paragraph' | 'subheading' | 'faq'; text: string};
type NoticeSection = {key: string; heading: string; blocks: TextBlock[]};

const chapterDefs = [
  {id: 'before', title: '相遇之前', sections: ['一']},
  {id: 'order', title: '从下单到相见', sections: ['二', '三']},
  {id: 'arrival', title: '初见', sections: ['四', '五']},
  {id: 'care', title: '相伴与岁藏', sections: ['六', '七', '八']},
  {id: 'protection', title: '流转与守护', sections: ['九', '十', '十一', '十二']},
] as const;

function parseNotice(text: string) {
  const paragraphs = text.replace(/\r\n?/g, '\n').trim().split(/\n\s*\n/).map(item => item.trim()).filter(Boolean);
  const sections: NoticeSection[] = [];
  const introduction: string[] = [];
  let current: NoticeSection | undefined;

  for (const paragraph of paragraphs.slice(1)) {
    const heading = paragraph.match(/^([一二三四五六七八九十]+)、(.+)$/);
    if (heading) {
      current = {key: heading[1], heading: heading[2], blocks: []};
      sections.push(current);
    } else if (!current) {
      introduction.push(paragraph);
    } else if (/^\d+\.\s*/.test(paragraph)) {
      current.blocks.push({type: 'subheading', text: paragraph.replace(/^\d+\.\s*/, '')});
    } else if (current.key === '十一' && /^.+？\n/.test(paragraph)) {
      current.blocks.push({type: 'faq', text: paragraph});
    } else {
      current.blocks.push({type: 'paragraph', text: paragraph});
    }
  }

  return {introduction, sections};
}

const notice = parseNotice(noticeText);

export default function PurchaseNotice() {
  const [chapterMotion, setChapterMotion] = useState<'idle' | 'leaving' | 'entering'>('idle');
  const motionTimers = useRef<number[]>([]);

  useEffect(() => () => motionTimers.current.forEach(window.clearTimeout), []);

  function openChapter(event: MouseEvent<HTMLAnchorElement>, id: string) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    event.preventDefault();
    motionTimers.current.forEach(window.clearTimeout);
    motionTimers.current = [];
    setChapterMotion('leaving');

    motionTimers.current.push(window.setTimeout(() => {
      const chapter = document.getElementById(id);
      if (!chapter) {
        setChapterMotion('idle');
        return;
      }

      const destination = new URL(window.location.href);
      destination.hash = id;
      window.history.pushState(null, '', destination);
      chapter.scrollIntoView({behavior: 'instant'});
      chapter.querySelector<HTMLElement>('h2')?.focus({preventScroll: true});
      setChapterMotion('entering');
      motionTimers.current.push(window.setTimeout(() => setChapterMotion('idle'), 460));
    }, 190));
  }

  return <div className="legal-world purchase-notice-world" id="page-top">
    <header className="legal-header"><a className="legal-brand" href="/" aria-label="返回绘屿造物首页"><img src={requiredImage('brandLogo')} alt=""/><span>绘屿造物</span></a><SiteSearch/></header>
    <Breadcrumbs path="/purchase-notice"/>
    <main className="purchase-main">
      <div className="purchase-heading">
        <p className="legal-kicker">绘屿造物 · 购买须知</p>
        <h1>购买与使用说明</h1>
        {notice.introduction.map((paragraph, index) => <p className="purchase-intro" key={index}>{paragraph}</p>)}
      </div>

      <div className="purchase-layout">
        <nav className="purchase-chapters" aria-label="购买与使用说明章节">
          <span className="purchase-chapters-label">阅读章节</span>
          {chapterDefs.map(chapter => <a href={`#${chapter.id}`} onClick={event => openChapter(event, chapter.id)} key={chapter.id}>{chapter.title}</a>)}
        </nav>
        <article className={`purchase-article purchase-article--${chapterMotion}`}>
          {chapterDefs.map(chapter => <section className="purchase-chapter" id={chapter.id} key={chapter.id}>
            <h2 tabIndex={-1}>{chapter.title}</h2>
            {chapter.sections.map(key => {
              const section = notice.sections.find(item => item.key === key);
              if (!section) return null;
              return <div className="purchase-section" key={section.key}>
                <h3>{section.heading}</h3>
                {section.blocks.map((block, index) => {
                  if (block.type === 'subheading') return <h4 key={index}>{block.text}</h4>;
                  if (block.type === 'faq') {
                    const [question, ...answer] = block.text.split('\n');
                    return <div className="purchase-question" key={index}><h4>{question}</h4><p>{answer.join('\n')}</p></div>;
                  }
                  return <p key={index}>{block.text}</p>;
                })}
              </div>;
            })}
          </section>)}
          <a className="purchase-back-top" href="#page-top">回到页首</a>
        </article>
      </div>
    </main>
  </div>;
}
