import SiteSearch from './SiteSearch';
import Breadcrumbs from './Breadcrumbs';
import {requiredImage} from './media-library';
import './legal-page.css';
import './home-support.css';

export default function HelpPage() {
  return <div className="legal-world help-world">
    <header className="legal-header"><a className="legal-brand" href="/" aria-label="返回绘屿造物首页"><img src={requiredImage('brandLogo')} alt=""/><span>LUMEN AURALIS<small>绘屿造物</small></span></a><SiteSearch/></header>
    <Breadcrumbs path="/help"/>
    <main><p className="legal-kicker">HELP & SUPPORT</p><h1>帮助说明</h1><p className="legal-intro">关于浏览、购买和查询，你可能想了解这些。</p>
      <div className="help-questions">
        <details open><summary>在哪里查看作品与产品信息？</summary><p>通过顶部“目录”进入花神卷，选择角色后可查看她的故事、造型与摄影。角色名字下方的“产品信息”提供已公布的作品资料。</p><a href="/series/flower-gods">浏览花神卷 ↗</a></details>
        <details><summary>如何购买？</summary><p>请使用角色页面的官方购买入口。显示“即将开放”时，表示当前尚未提供购买链接。价格、发售时间、配送与售后安排，以正式销售页面和订单说明为准。</p></details>
        <details><summary>如何查询防伪记录？</summary><p>进入防伪核验页面，按页面提示填写娃证编号与淘宝订单号。请妥善保管这些信息，不要在公开评论中发布完整编号。</p><a href="/verify">进入防伪核验 ↗</a></details>
        <details><summary>序章没有声音，或影像加载较慢怎么办？</summary><p>部分浏览器需要轻触页面后才能播放声音，请检查页面声音开关与设备音量。网络较慢时可稍后重试，或先进入主页浏览；主页提供返回序章的入口。</p></details>
        <details><summary>发现疑似仿冒或盗图怎么办？</summary><p>请保留相关链接、账号信息及截图，通过举报说明页面整理线索。不要公开无关人员的个人资料。</p><a href="/report">查看举报说明 ↗</a></details>
        <details><summary>如何联系客服？</summary><p>可以在小红书搜索“绘屿造物 Lumen Auralis”，小红书号 6765312465，通过账号私信联系。咨询订单时，请准备订单信息和问题描述。</p><a href="/report">查看官方账号名片 ↗</a></details>
      </div>
    </main>
  </div>;
}
