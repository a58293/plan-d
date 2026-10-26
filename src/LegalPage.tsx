import { requiredImage } from './media-library';
import SiteSearch from './SiteSearch';
import Breadcrumbs from './Breadcrumbs';
import './legal-page.css';
import {officialInfo, verificationIsLive} from './official-info';

const pages = {
  terms: {
    kicker: '网站条款', title: '网站使用条款',
    intro: '浏览本网站即表示你理解当前展示内容与尚未开放服务之间的区别。',
    sections: [
      ['原创内容', '角色设定、插画、产品图、品牌标识、文字与页面视觉均受相应知识产权规则保护，未经许可不得复制用于商业用途。'],
      ['展示与实物', '角色原画、效果图及屏幕颜色仅用于视觉展示；正式商品信息以销售页面的实物照片、配置清单与购买说明为准。'],
      ['外部购买链接', '淘宝入口开放后将前往第三方平台。订单、付款、物流与平台服务同时受淘宝相关规则约束。'],
      ['运营与联系', `运营主体：${officialInfo.brandName}。客服联系方式：${officialInfo.servicePhone}。服务时间：${officialInfo.serviceHours}。争议处理方式与正式生效日期将在公开发布前补齐。`],
    ],
  },
  authenticity: {
    kicker: '防伪核验', title: '防伪服务说明',
    intro: '防伪查询用于核对绘屿造物正式发行作品的娃证记录，不替代交易平台的订单与售后凭证。',
    sections: [
      ['查询条件', verificationIsLive ? '使用娃证编号与对应购买订单号进行双重核对，避免仅凭单一编号判断。' : '正式服务计划使用娃证编号与对应购买订单号进行双重核对，避免仅凭单一编号判断。'],
      ['结果含义', '“匹配”仅表示输入信息与官方发行档案一致；“未匹配”也可能由输入错误、档案尚未同步等原因造成。'],
      ['安全原则', verificationIsLive ? '请仅从绘屿造物官网进入核验；核验通过不替代交易平台订单与售后凭证。' : '正式后台上线前将完成数据存储、访问权限、速率限制、操作留痕与备份机制。当前演示结果没有认证效力。'],
      ['人工复核', `如需人工复核，请联系${officialInfo.brandName}客服：${officialInfo.servicePhone}。服务时间为${officialInfo.serviceHours}；正式复核流程将在防伪后台上线时同步公布。`],
    ],
  },
} as const;

export default function LegalPage({ page }: { page: keyof typeof pages }) {
  const content = pages[page];
  return <div className="legal-world">
    <header className="legal-header">
      <a className="legal-brand" href="/"><img src={requiredImage('brandLogo')} alt="" /><span>绘屿造物</span></a>
      <div><SiteSearch /><a href="/">返回首页</a></div>
    </header>
    <Breadcrumbs path={`/legal/${page}`}/>
    <main>
      <p className="legal-kicker">{content.kicker} · 绘屿造物</p>
      <h1>{content.title}</h1>
      <p className="legal-intro">{content.intro}</p>
      <div className="legal-draft-note">上线草案 · 正式生效日期与完整售后规则待确认</div>
      <div className="legal-sections">{content.sections.map(([title, body], index) => <section key={title}>
        <span>0{index + 1}</span><div><h2>{title}</h2><p>{body}</p></div>
      </section>)}</div>
    </main>
    <footer><span>© 2026 绘屿造物</span><nav><a href="/legal/terms">使用条款</a><a href="/legal/authenticity">防伪说明</a></nav></footer>
  </div>;
}
