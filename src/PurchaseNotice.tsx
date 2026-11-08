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
const sectionGuides:Record<string,string>={
 '一':'商品内容、手工差异与付款方式',
 '二':'《云笺》核对、确认制作与交付安排',
 '三':'修改、取消订单及退款处理',
 '四':'配送安排与收件信息',
 '五':'开箱核对、质量问题与售后办理',
 '六':'保养服务与部件补配',
 '七':'穿戴、关节操作与防染',
 '八':'清洁、收纳与安全注意事项',
 '九':'转单及二手交易的办理方式',
 '十':'防伪查询与官方渠道',
 '十一':'按问题查找答案',
 '十二':'客服与官方联系方式',
};
function revealNoticeTarget(id:string){
 const target=document.getElementById(id);
 let parent:HTMLElement|null=target;
 while(parent){if(parent instanceof HTMLDetailsElement)parent.open=true;parent=parent.parentElement;}
 return target;
}

export default function PurchaseNotice() {
  const [chapterMotion, setChapterMotion] = useState<'idle' | 'leaving' | 'entering'>('idle');
  const motionTimers = useRef<number[]>([]);

  useEffect(() => () => motionTimers.current.forEach(window.clearTimeout), []);
  useEffect(() => {const show=()=>{let id='';try{id=decodeURIComponent(window.location.hash.slice(1));}catch{return;}if(id.startsWith('notice-'))revealNoticeTarget(id)?.scrollIntoView({block:'start',behavior:'instant'});};const frame=requestAnimationFrame(show);window.addEventListener('hashchange',show);return()=>{cancelAnimationFrame(frame);window.removeEventListener('hashchange',show);};}, []);

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
        <p className="purchase-reading-guide">先选择与你有关的章节，再展开查看细则。</p>
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
              return <details className="purchase-section purchase-disclosure" id={section.key === '五' ? 'notice-after-sales' : section.key === '七' ? 'notice-care' : section.key === '九' ? 'notice-transfer' : undefined} key={section.key}>
                <summary><span><h3>{section.heading}</h3><span className="purchase-section-guide">{sectionGuides[section.key]}</span></span><span className="purchase-disclosure-label">查看细则</span></summary>
                <div className="purchase-section-content">
                {section.blocks.map((block, index) => {
                  if (block.type === 'subheading') return <h4 id={section.key === '二' && block.text === '确认制作' ? 'notice-confirmation' : section.key === '二' && block.text === '制作与发货时间' ? 'notice-leadtime' : undefined} key={index}>{block.text}</h4>;
                  if (block.type === 'faq') {
                    const [question, ...answer] = block.text.split('\n');
                    return <div className="purchase-question" key={index}><h4>{question}</h4><p>{answer.join('\n')}</p></div>;
                  }
                  return <p key={index}>{block.text}</p>;
                })}
                </div>
              </details>;
            })}
          </section>)}
          <a className="purchase-back-top" href="#page-top">回到页首</a>
        </article>
      </div>
    </main>
  </div>;
}
