import Breadcrumbs from './Breadcrumbs';
import EmbeddedStory from './EmbeddedStory';
import {MobileActions} from './PurchaseMenu';
import './official-shoots.css';

export default function OfficialShoots(){
  return <div className="official-shoot-world official-shoot-story-page">
    <header className="mf-header"><a href="/">绘屿造物</a><MobileActions/></header>
    <Breadcrumbs path="/stories/official"/>
    <main>
      <div className="official-story-heading"><span>镜昕 · 官方影像</span><h1>镜昕 · 荷花女神</h1><p>滚动镜头，读她的故事。正式拍摄影像将在这里逐幕替换。</p></div>
      <EmbeddedStory mode="document" />
    </main>
  </div>;
}
