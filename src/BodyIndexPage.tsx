import Breadcrumbs from './Breadcrumbs';
import {MobileActions} from './PurchaseMenu';
import {requiredImage} from './media-library';
import './body-category.css';
import './body-index.css';

export default function BodyIndexPage({female=false}:{female?:boolean}){
 const path=female?'/bodies/female':'/bodies';
 return <div className="body-category-world body-index-world"><header className="mf-header"><a href="/">绘屿造物</a><MobileActions/></header><Breadcrumbs path={path}/>
 <main className="body-category-main"><section className="body-index-heading"><div><p className="body-category-kicker">{female?'FEMALE / BODY ARCHIVE':'FORM / BODY & PARTS'}</p><h1>{female?'女体':'体型与部件'}</h1><p>{female?'不同尺度，同样细致的表达。':'形体，是角色与世界相遇的起点。'}</p></div><div className="body-index-caption"><span>{female?'01 / FEMALE':'THE FORM COLLECTION'}</span><p>{female?'按体型分类浏览已公开角色。型号不等同于实际身高，具体规格请查看作品正式资料。':'从完整体型到独立部件，循着清晰的分类，找到角色所属的形体与适配资料。'}</p></div></section>
 {female?<><div className="body-index-section-title"><h2>选择体型</h2><span>FEMALE COLLECTION</span></div><div className="body-model-grid"><a href="/bodies/female-70" className="body-model-feature"><div className="body-model-art"><span aria-hidden="true">70</span><img src={requiredImage('jingxinPortrait')} alt="女体 70 所属角色：镜昕荷花女神"/></div><div className="body-model-copy"><small>已公开角色 · 镜昕</small><h2>女体 70</h2><span>浏览所属角色 ↗</span></div></a><div className="body-model-upcoming">{['60','65'].map(n=><section key={n}><span className="body-model-number" aria-hidden="true">{n}</span><div><h2>女体 {n}</h2><p>资料待公开</p></div><small>型号档案将在正式发布后开放</small></section>)}</div></div></>:<><a className="body-index-feature" href="/bodies/female"><div className="body-index-feature-copy"><span className="body-category-kicker">01 / FEMALE</span><h2>女体</h2><p>以柔和的线条，承载各自鲜明的性格。</p><span className="body-index-models">60 · 65 · 70</span><span className="body-index-entry">探索女体分类 ↗</span></div><div className="body-index-feature-art"><span aria-hidden="true">FORM</span><img src={requiredImage('jingxinPortrait')} alt="女体分类，镜昕角色展示"/></div></a><div className="body-index-secondary"><section><p className="body-category-kicker">02 / MALE</p><h2>男体</h2><span className="body-index-models">70 · 75 · 80</span><p>资料待公开。型号与作品将在正式发布后收录。</p></section><section><p className="body-category-kicker">03 / PARTS</p><h2>独立部件</h2><p>后续收录已公开的替换部件与适配说明。</p><small>资料待公开</small></section></div></>}
 <aside className="body-index-advice"><span>关于适配</span><p>同一分类不代表所有服饰或部件都可通用。购买前，请以对应作品的尺寸与适配说明为准。</p><a href="/help">查看帮助说明 ↗</a></aside>
 </main></div>;
}
