import {useState} from 'react';
import Breadcrumbs from './Breadcrumbs';
import EmbeddedStory from './EmbeddedStory';
import {MobileActions} from './PurchaseMenu';
import {requiredImage} from './media-library';
import './official-shoots.css';

export default function OfficialShoots(){
 const [selected,setSelected]=useState(false);
 return <div className={`official-shoot-world ${selected?'official-shoot-story-page':'official-shoot-selection-page'}`}>
  <header className="mf-header"><a href="/">绘屿造物</a><MobileActions/></header>
  <Breadcrumbs path="/stories/official"/>
  <main>
   {selected?<>
    <div className="official-story-heading"><button type="button" onClick={()=>{setSelected(false);window.scrollTo(0,0)}}>返回角色选择</button><h1>镜昕 · 荷花女神</h1><p>滚动镜头，读祂的故事。</p></div>
    <EmbeddedStory mode="document" />
   </>:<>
    <div className="official-shoot-intro"><p className="official-shoot-kicker">绘屿造物 · 官方影像</p><h1>官方拍摄</h1><p>选择一位，走进祂的影像与故事。</p></div>
    <div className="official-character-list"><button type="button" className="official-character-choice" onClick={()=>{setSelected(true);window.scrollTo(0,0)}} aria-label="观看镜昕的官方影像"><img src={requiredImage('jingxinPortrait')} alt="镜昕 · 荷花女神"/><span><strong>镜昕</strong><small>荷花女神</small><span>观看祂的影像</span></span></button></div>
   </>}
  </main>
 </div>;
}