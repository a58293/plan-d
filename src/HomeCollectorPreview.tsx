import {collectorGallery} from './collector-gallery-data';
import PhotoWall from './PhotoWall';
import './collector-gallery.css';
import './home-collector-preview.css';

export default function HomeCollectorPreview(){
 const photos=collectorGallery.filter(photo=>photo.authorized).slice(0,6);
 return <div className="home-collector-preview">
 <div className="home-collector-intro"><div><p>COLLECTORS’ MOMENTS</p><h2>藏家自拍</h2></div><p>由藏家记录的相遇与日常。<br/>每一份影像，均在获得授权后收录。</p></div>
 {photos.length?<div className="home-collector-wall" data-no-chapter-swipe onWheel={e=>e.stopPropagation()}><PhotoWall photos={photos}/></div>:<div className="home-collector-empty"><span>等待第一份藏家影像</span><p>让你的镜头，续写相遇之后的故事。</p></div>}
 <nav className="home-collector-links" aria-label="藏家影像入口"><a href="/stories/collectors">浏览藏家影像 ↗</a><a href="/contact">投稿与联系 ↗</a></nav>
 </div>;
}
