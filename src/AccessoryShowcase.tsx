import {useState} from 'react';
import {requiredImage} from './media-library';
import {characterThemeStyle} from './current-product-theme';
import {accessoryPurchaseUrl} from './commerce';
import './accessory-showcase.css';

type Kind = 'eyes' | 'wigs' | 'clothing' | 'jewelry';
type Showcase = {
  name: string;
  english: string;
  line: string;
  introduction: string;
  image: string;
  imageAlt: string;
  imageNote: string;
  status: string;
  accent: string;
  details: {heading: string; body: string}[];
  lotusTitle: string;
  featureTitle: string;
  lotusDescription: string;
  lotusParts: string[];
};

const eyeImage = new URL('../public/eye-product-display-v1.png', import.meta.url).href;
const portrait = requiredImage('jingxinPortrait');

const pages: Record<Kind, Showcase> = {
  eyes: {
    name: '眼球', english: '眼球', line: '目光，倒映万象。',
    introduction: '从虹膜的纹理到明暗的层次，一双眼睛让角色有了自己的目光。先看见细节，再决定是否与她相遇。',
    image: eyeImage, imageAlt: '绘屿造物花纹眼球深浅两色展示图', imageNote: '眼球实物展示 · 深色在左，浅色在右', status: '镜昕·荷花女神 / 实物展示', accent: '01',
    lotusTitle: '镜昕的目光', featureTitle: '花纹与色调', lotusDescription: '这组花纹眼球现以实物图呈现深、浅两种色调，尺寸 14/5，适配 16/5。可切换观察色彩差别；入眼效果和实际销售配置以正式商品资料为准。', lotusParts: ['深色调', '浅色调'],
    details: [
      {heading: '两种色调', body: '目前可预览深、浅两种色调。图片经过基础展示修饰；最终颜色以实物及正式商品页面为准。'},
      {heading: '尺寸与适配', body: '眼球尺寸为 14/5，适配 16/5。具体头型的入眼效果会受眼眶形状和安装位置影响，请勿仅凭画面比例判断。'},
      {heading: '购买信息', body: '眼球为独立商品。价格、包含数量、可选颜色与销售状态，请在对应淘宝商品页面核对。'},
    ],
  },
  wigs: {
    name: '镜昕的游丝', english: '假发', line: '发丝，延续她的神情。',
    introduction: '发型改变角色的轮廓，也改变每一次回望的气质。这里将收录绘屿造物公开的假发作品与佩戴资料。',
    image: portrait, imageAlt: '镜昕角色设定图，展示发型与整体造型', imageNote: '镜昕角色设定图 · 发型为造型示意，非独立商品实拍', status: '镜昕·荷花女神 / 造型设定', accent: '02',
    lotusTitle: '镜昕的游丝', featureTitle: '发丝与头纱', lotusDescription: '发型与头纱共同构成镜昕的面部轮廓。这里展示角色设定中的佩戴关系；假发的实物、材质与规格请以对应淘宝商品页面为准。', lotusParts: ['发型轮廓', '头纱层次', '佩戴关系'],
    details: [
      {heading: '造型展示', body: '这里展示镜昕的发型轮廓与佩戴关系。实物角度和佩戴效果请以对应淘宝商品页面为准。'},
      {heading: '尺寸与材质', body: '适配头围、纤维材质、颜色与打理方式，以对应商品页面公布的资料为准。'},
      {heading: '当前说明', body: '本页现有画面来自角色设定，不能用于判断假发实物颜色。假发单独购买时，请核对淘宝商品页面的具体内容。'},
    ],
  },
  clothing: {
    name: '衣服', english: '衣装', line: '层叠衣袂，写下她的故事。',
    introduction: '衣装的层次、轻重与细节，构成角色走入现实的方式。这里会把套装内容与穿戴关系讲清楚。',
    image: portrait, imageAlt: '镜昕荷花女神角色衣装设定图', imageNote: '镜昕角色设定图 · 衣装为造型示意', status: '镜昕·荷花女神 / 造型设定', accent: '03',
    lotusTitle: '镜昕的衣袂', featureTitle: '衣装的层次', lotusDescription: '从战国袍到轻盈的披帛，镜昕的衣装以层叠的线条勾勒荷花意象。披帛不包含在大全套内；其余套装包含关系请以正式商品页面和《云笺》为准。', lotusParts: ['战国袍', '披帛', '荷叶披肩', '拖尾薄纱'],
    details: [
      {heading: '套装内容', body: '娃衣为独立商品。购买前请在对应淘宝商品页面核对包含件数、配件与不包含项。'},
      {heading: '穿戴与适配', body: '适配体型、穿戴顺序和需要注意的细小连接处，将随实际作品资料补充。'},
      {heading: '当前说明', body: '本页现有画面展示镜昕角色造型，并非独立娃衣商品的实拍。实际销售内容以对应淘宝商品页面和订单为准。'},
    ],
  },
  jewelry: {
    name: '首饰', english: '首饰', line: '细微之处，自有光。',
    introduction: '一件饰物或许很小，却能点亮角色的神情。这里将呈现首饰的形态、佩戴位置与使用边界。',
    image: portrait, imageAlt: '镜昕角色设定图中的头饰与颈间饰件', imageNote: '镜昕角色设定图 · 饰件为造型示意', status: '镜昕·荷花女神 / 造型设定', accent: '04',
    lotusTitle: '镜昕的流光', featureTitle: '花冠与挂饰', lotusDescription: '花冠与挂饰是镜昕造型中的点睛细节。这里展示其在角色设定中的位置与气质；单独购买的具体内容请以对应淘宝商品页面为准。', lotusParts: ['花冠与头饰', '挂饰', '细部层次'],
    details: [
      {heading: '细节视角', body: '这里展示角色设定中的佩戴位置。实物角度、连接方式与细部比例请以对应淘宝商品页面为准。'},
      {heading: '材质与使用', body: '材质、固定方式、适配范围及养护方法，以对应商品的正式说明为准。'},
      {heading: '当前说明', body: '本页角色图用于展示整体设计语言。首饰单独购买时，请核对淘宝商品页面实际包含的部件。'},
    ],
  },
};

const order: Kind[] = ['eyes', 'wigs', 'clothing', 'jewelry'];

export default function AccessoryShowcase({kind}: {kind: Kind}) {
  const item = pages[kind];
  const purchaseUrl = accessoryPurchaseUrl(kind);
  const source = new URLSearchParams(window.location.search);
  const returnDetail = source.get('from') === 'jingxin' ? source.get('detail') : null;
  const returnHref = returnDetail && ['face','headdress','ornament','dress'].includes(returnDetail)
    ? `/series/flower-gods/jingxin?detail=${encodeURIComponent(returnDetail)}#details` : null;
  const [tone, setTone] = useState<'deep' | 'light'>('deep');
  return <div className={`accessory-showcase accessory-${kind}`} data-color-owner="jingxin" style={characterThemeStyle('jingxin')}>
    <main>
      <nav className="accessory-tabs" aria-label="造物分类">
        <a className="accessory-tabs-home" href="/accessories">服饰与配件 </a>
        <div>{order.map((key, index) => <a key={key} href={`/accessories/${key}`} aria-current={kind === key ? 'page' : undefined}><span>0{index + 1}</span>{pages[key].name}</a>)}</div>
      </nav>
      <section className="accessory-hero" aria-labelledby="accessory-title">
        <div className="accessory-hero-copy">
          <p className="accessory-overline">绘屿造物 <span>/</span> 造物档案 <span>/</span> {item.accent}</p>
          <p className="accessory-chapter">绘屿造物 · 造物档案</p>
          <h1 id="accessory-title">{item.name}<small>{item.english}</small></h1>
          <p className="accessory-line">{item.line}</p>
          <p className="accessory-introduction">{item.introduction}</p>
          <div className="accessory-hero-actions">
            <div className="accessory-actions-primary"><a className="accessory-buy-link" href={purchaseUrl || '#accessory-archive'} target={purchaseUrl ? '_blank' : undefined} rel={purchaseUrl ? 'noopener noreferrer' : undefined}>前往淘宝选购 </a><a href="#accessory-archive">浏览本页 </a></div>
            <div className="accessory-actions-secondary">{returnHref && <a className="accessory-return-detail" href={returnHref}>返回造型细节 </a>}<a href="/purchase-notice">购买与使用说明 </a></div>
          </div>
          <p className="accessory-index">{item.accent} <span>/ 04</span></p>
        </div>
        <figure className={`accessory-hero-media ${kind === 'eyes' ? 'accessory-eyes-hero-media' : ''}`}>
          {kind === 'eyes' ? <div className="accessory-eye-hero-field" aria-label="镜昕眼球深浅两色实物展示">
            <span className="accessory-eye-hero-overline">镜昕 · 两种色调</span>
            <div className="accessory-eye-hero-pair">
              <div className="accessory-eye-hero-sample"><div className="accessory-eye-hero-object is-deep"><img src={eyeImage} alt="镜昕花纹眼球深色调实物" fetchPriority="high" /></div><span><b>01</b> 深色调</span></div>
              <div className="accessory-eye-hero-sample"><div className="accessory-eye-hero-object is-light"><img src={eyeImage} alt="镜昕花纹眼球浅色调实物" fetchPriority="high" /></div><span><b>02</b> 浅色调</span></div>
            </div>
            <span className="accessory-eye-hero-bottom">镜昕的目光 <i /> 实物色调展示</span>
          </div> : <div className="accessory-image-field"><span className="accessory-image-eyebrow">镜昕 <i /> {item.english}展示</span><img src={item.image} alt={item.imageAlt} fetchPriority="high" /><span className="accessory-image-label">{kind === 'wigs' ? '发间造型' : kind === 'clothing' ? '衣装层次' : '饰物细节'}<small>角色设定 / 造型示意</small></span></div>}
          <figcaption><span>{item.imageNote}</span><span>图录 {item.accent}</span></figcaption>
        </figure>
      </section>
      <section className="accessory-archive" id="accessory-archive" aria-labelledby="archive-title">
        <div className="accessory-section-head"><div><p>造物档案 · 镜昕</p><h2 id="archive-title">{item.lotusTitle}</h2></div><span>{item.status}</span></div>
        {kind === 'eyes' ? <div className="accessory-eye-study">
          <div className={`accessory-eye-crop is-${tone}`}>
            <span className="accessory-eye-stage-label">镜昕 · 眼球色调</span>
            <div className="accessory-eye-object"><img src={eyeImage} alt={`${tone === 'deep' ? '深色' : '浅色'}眼球花纹展示`} /></div>
            <span className="accessory-eye-stage-caption">实物色调展示 <b>·</b> {tone === 'deep' ? '深色' : '浅色'}</span>
          </div>
          <div className="accessory-eye-controls"><p>色调对照 <span>{tone === 'deep' ? '01' : '02'} / 02</span></p><h3>{tone === 'deep' ? '深色调' : '浅色调'}</h3><p className="accessory-eye-spec">尺寸 14/5 <span>·</span> 适配 16/5</p><p>同一花纹，呈现不同的明暗与气息。此处用于观察色调差别，不代表套装配置。</p><div role="group" aria-label="选择眼球色调"><button type="button" aria-pressed={tone === 'deep'} onClick={() => setTone('deep')}>深色调</button><button type="button" aria-pressed={tone === 'light'} onClick={() => setTone('light')}>浅色调</button></div><a className="accessory-archive-buy" href={purchaseUrl || '#accessory-archive'} target={purchaseUrl ? '_blank' : undefined} rel={purchaseUrl ? 'noopener noreferrer' : undefined}>在淘宝查看眼球商品 </a><small>颜色、价格与销售配置以淘宝商品页面为准</small></div>
        </div> : <div className={`accessory-lotus-feature accessory-lotus-${kind}`}>
          <div className="accessory-lotus-art"><img src={portrait} alt={`镜昕·荷花女神${item.name}造型设定`} loading="lazy" /><span>镜昕 · 荷花女神 / 角色设定</span></div>
          <div className="accessory-lotus-copy"><p>01 / 花神卷</p><h3>{item.featureTitle}</h3><p>{item.lotusDescription}</p><div className="accessory-lotus-parts">{item.lotusParts.map((part, index) => <span key={part}><b>0{index + 1}</b>{part}</span>)}</div><a className="accessory-archive-buy" href={purchaseUrl || '#accessory-archive'} target={purchaseUrl ? '_blank' : undefined} rel={purchaseUrl ? 'noopener noreferrer' : undefined}>在淘宝查看{kind === 'wigs' ? '假发' : kind === 'clothing' ? '娃衣' : '首饰'}商品 </a><a href="/series/flower-gods/jingxin">走近镜昕 </a><small>角色设定图仅供了解造型；单独商品包含内容以淘宝商品页面为准。</small></div>
        </div>}
      </section>
      <section className="accessory-notes" aria-label="品类说明">{item.details.map((detail, index) => <article key={detail.heading}><span>0{index + 1}</span><h3>{detail.heading}</h3><p>{detail.body}</p></article>)}</section>
      <footer className="accessory-footer"><p>绘屿造物</p><div><a href="/accessories">返回全部分类</a><a href="/contact">联系绘屿造物</a></div></footer>
    </main>
  </div>;
}
