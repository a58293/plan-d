import {categoryPages} from './category-pages';
import Breadcrumbs from './Breadcrumbs';
import {MobileActions} from './PurchaseMenu';
import {currentProductTheme, currentProductThemeStyle} from './current-product-theme';
import './category-page.css';
type Item={title:string;href?:string;note?:string};
function CategoryItems({items,ancestors=[]}:{items:Item[];ancestors?:string[]}){return <div className="category-list">{items.map(item=>{
 const child=item.href&&item.href!=='/bodies/female-70'&&!ancestors.includes(item.href)?categoryPages[item.href]:undefined;
 if(child)return <details className="category-fold" key={item.title}><summary>{item.title}<span className="category-fold-indicator" aria-hidden="true">＋</span></summary><div className="category-fold-content">{child.items.length?<CategoryItems items={child.items} ancestors={[...ancestors,item.href!]}/>:<p>{child.description}</p>}</div></details>;
 return item.href?<a key={item.title} href={item.href}><span>{item.title}{item.note&&<small>{item.note}</small>}</span></a>:<div key={item.title} className="category-unavailable"><span>{item.title}</span><small>{item.note||'资料待公开'}</small></div>;
 })}</div>;}
export default function CategoryPage({path}:{path:string}){const page=categoryPages[path];return <div className="category-world" data-color-source={currentProductTheme.product} style={currentProductThemeStyle}><header className="mf-header"><a href="/">绘屿造物</a><MobileActions/></header><Breadcrumbs path={path}/><main><p className="category-eyebrow">绘屿造物 / 分类目录</p><h1>{page.title}</h1><p className="category-description">{page.description}</p><CategoryItems items={page.items} ancestors={[path]}/>{!page.items.length&&<p className="category-empty">暂无已公开内容</p>}<footer><a href={page.parent||'/'}> 返回{page.parent?categoryPages[page.parent].title:'首页'}</a><a href="/contact">联系官方</a></footer></main></div>;}
