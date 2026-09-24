import {requiredImage} from './media-library';
import {JINGXIN_PATH} from './flower-gods-catalog';
import Breadcrumbs from './Breadcrumbs';
import {MobileActions} from './PurchaseMenu';
import './body-category.css';

export default function BodyCategoryPage(){
 return <div className="body-category-world">
 <header className="mf-header"><a href="/" aria-label="返回绘屿造物首页">绘屿造物</a><MobileActions/></header>
 <Breadcrumbs path="/bodies/female-70"/>
 <main className="body-category-main">
 <section className="body-category-intro"><div><p className="body-category-kicker">BODY COLLECTION / FEMALE</p><h1>女体 <span>70</span></h1><p className="body-category-description">从体型出发，寻找与你相契的角色。</p></div><div className="body-category-note"><span>体型档案</span><p>这里收录归属于女体 70 的角色。具体尺寸、配置与适配信息，以各作品正式公布的产品资料为准。</p><small>“70”为体型分类名称，此处不作为实际身高参数。</small></div></section>
 <section className="body-category-works" aria-labelledby="body-works-title"><div className="body-works-heading"><h2 id="body-works-title">这一体型的角色</h2><span>01 / 已公开角色</span></div>
 <a className="body-character-card" href={JINGXIN_PATH} aria-label="查看镜昕 · 荷花女神"><div className="body-character-art"><span className="body-art-number" aria-hidden="true">01</span><img src={requiredImage('jingxinPortrait')} alt="镜昕荷花女神角色展示" decoding="async"/></div><div className="body-character-copy"><p className="body-category-kicker">花神卷 · LOTUS DEITY</p><h3>镜昕</h3><p className="body-character-subtitle">荷花女神</p><p>泥沼生花，水月照心。</p><div className="body-character-tags"><span>女体 70</span><span>角色档案</span></div><span className="body-character-enter">查看角色与产品信息 <b aria-hidden="true">↗</b></span></div></a>
 </section><footer className="body-category-footer"><span>更多作品，随正式发布逐步收录。</span><a href="/help">购买与使用帮助 ↗</a></footer>
 </main></div>;
}
