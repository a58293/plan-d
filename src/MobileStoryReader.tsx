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

export default function MobileStoryReader() {
  return <div className="mobile-story-reader" aria-label="镜昕故事全文">
    <figure className="mobile-story-portrait">
      <img src={requiredImage('jingxinPortrait')} alt="镜昕荷花女神完整造型" loading="lazy" decoding="async" />
      <figcaption>镜昕 · 泥沼生花，水月照心</figcaption>
    </figure>
    <div className="mobile-story-pages">
      <p className="mobile-story-eyebrow">镜昕 · 原典</p>
      <h3>{storyTitle}</h3>
      {chapters.map((chapter,index) => <section className="mobile-story-chapter" key={chapter.title} aria-labelledby={`mobile-story-chapter-${index}`}>
        <span className="mobile-story-number">{String(index+1).padStart(2,'0')}</span>
        <h4 id={`mobile-story-chapter-${index}`}>{chapter.title}</h4>
        {chapter.paragraphs.map((paragraph,part) => <p key={part}>{paragraph}</p>)}
      </section>)}
    </div>
  </div>;
}
