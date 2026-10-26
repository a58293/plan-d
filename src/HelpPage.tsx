import SiteSearch from './SiteSearch';
import Breadcrumbs from './Breadcrumbs';
import {requiredImage} from './media-library';
import './legal-page.css';
import './home-support.css';
import {officialInfo, officialServiceCopy, productLeadTimeNote} from './official-info';

export default function HelpPage() {
  return <div className="legal-world help-world">
    <header className="legal-header"><a className="legal-brand" href="/" aria-label="返回绘屿造物首页"><img src={requiredImage('brandLogo')} alt=""/><span>绘屿造物</span></a><SiteSearch/></header>
    <Breadcrumbs path="/help"/>
    <main><p className="legal-kicker">帮助与支持</p><h1>帮助说明</h1><p className="legal-intro">关于浏览、购买和查询，你可能想了解这些。</p>
      <div className="help-questions">
        <details open><summary>在哪里查看作品与产品信息？</summary><p>通过顶部“目录”进入花神卷，选择角色后可查看她的故事、造型与摄影。角色名字下方的“产品信息”提供已公布的作品资料。</p><a href="/series/flower-gods">浏览花神卷</a></details>
        <details><summary>如何购买与确认制作？</summary><p>付款、《云笺》核对、预定商品的制作确认及取消退款说明已集中列入购买须知，请在付款前阅读。</p><a href="/purchase-notice">查看购买须知</a></details>
        <details><summary>商品制作周期是多久？</summary><p>商品制作周期：{productLeadTimeNote}。具体流程与收货说明见购买须知。</p><a href="/purchase-notice">查看购买须知</a></details>
        <details><summary>在哪里查看穿戴与养护说明？</summary><p>镜昕的具体穿戴步骤需要结合最终实物拍摄确认，完成后会在穿戴说明中更新。日常养护：{officialInfo.dailyCare}。</p><a href="/support/dressing">查看穿戴说明</a></details>
        <details><summary>售后与退换怎样处理？</summary><p>收货核对、联系建议和质量问题处理原则集中列于购买须知。</p><a href="/purchase-notice">查看购买须知</a></details>
        <details><summary>转单与二手交易怎样处理？</summary><p>{officialServiceCopy.transfer}</p></details>
        <details><summary>如何进行防伪验证？</summary><p>{officialServiceCopy.verification}</p><a href="/verify">查看防伪验证页面</a></details>
        <details><summary>序章没有声音，或影像加载较慢怎么办？</summary><p>部分浏览器需要轻触页面后才能播放声音，请检查页面声音开关与设备音量。网络较慢时可稍后重试，或先进入主页浏览；主页提供返回序章的入口。</p></details>
        <details><summary>发现疑似仿冒或盗图怎么办？</summary><p>请保留相关链接、账号信息及截图，通过举报说明页面整理线索。不要公开无关人员的个人资料。</p><a href="/report">查看举报说明</a></details>
        <details><summary>如何联系客服？</summary><p>可以在小红书搜索“{officialInfo.brandName} {officialInfo.brandLatinName}”，小红书号 6765312465，通过账号私信联系。客服时间为{officialInfo.serviceHours}。咨询订单时，请准备订单信息和问题描述。</p><a href="/contact">查看官方账号名片</a></details>
      </div>
    </main>
  </div>;
}
