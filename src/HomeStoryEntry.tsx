import {currentFeaturedProduct} from './current-product-theme';
import {officialPhotos, requiredImage, siteMedia} from './media-library';

export default function HomeStoryEntry() {
  const photo=officialPhotos.map(id=>siteMedia[id]).find(item=>item.src);
  return <section className="home-story-entry" id="stories" aria-labelledby="home-story-title">
    <div className="home-story-copy"><p className="home-entry-kicker">STORY & OFFICIAL IMAGERY</p>
      <h2 id="home-story-title">循着花的来处，<br/>走近她的故事。</h2>
      <p>从角色的诞生，到镜头里的细节。让故事与影像，慢慢展开。</p>
      <nav aria-label="故事与官方影像"><a href={currentFeaturedProduct.href+'#prologue'}>她的故事 <span>↗</span></a><a href="/stories/official">官方影像 <span>↗</span></a></nav>
      <a className="home-past-opening" href="/stories/openings">往期序章 · 回到故事开始的地方 ↗</a>
    </div>
    <figure><img src={photo?.src||requiredImage(currentFeaturedProduct.physicalMedia)} alt={photo?.alt||'镜昕 · 实体形象预览'} loading="lazy" decoding="async"/><figcaption>{photo?'镜昕 · 官方影像':'镜昕 · 形象预览，官拍完成后替换'}</figcaption></figure>
  </section>;
}
