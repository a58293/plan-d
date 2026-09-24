import {useState} from 'react';
import SiteSearch from './SiteSearch';
import Breadcrumbs from './Breadcrumbs';
import {requiredImage} from './media-library';
import './legal-page.css';
import './home-support.css';

export default function ReportPage() {
  const [notice,setNotice]=useState('');
  async function copyAccount() {
    try {await navigator.clipboard.writeText('6765312465');setNotice('已复制小红书号，请打开小红书搜索该账号，再通过私信联系。');}
    catch {setNotice('未能自动复制，请长按或选中小红书号 6765312465 手动复制。');}
  }
  return <div className="legal-world report-world">
    <header className="legal-header"><a className="legal-brand" href="/" aria-label="返回绘屿造物首页"><img src={requiredImage('brandLogo')} alt=""/><span>LUMEN AURALIS<small>绘屿造物</small></span></a><SiteSearch/></header>
    <Breadcrumbs path="/report"/>
    <main><p className="legal-kicker">原创保护 · 联系我们</p><h1>举报说明</h1><p className="legal-intro">如发现疑似仿冒、盗用图片或冒充官方的情况，请通过官方小红书账号私信提供线索。</p>
      <section className="report-guidance"><h2>联系前，请准备这些线索</h2><p>相关网页链接、店铺或账号名称，以及能够说明情况的截图。如涉及图片或文字，请尽量附上原作品出处。请描述你实际发现的情况，不必自行作出侵权结论。请勿发送密码、身份证照片或无关人员的个人资料。</p></section>
      <section className="report-social" aria-labelledby="social-title"><div><p className="legal-kicker">小红书 · 官方私信</p><h2 id="social-title">绘屿造物 Lumen Auralis</h2><p>小红书号：<strong className="social-account">6765312465</strong></p><p>复制账号后，在小红书中搜索；也可以保存名片，在小红书中扫描识别二维码，进入账号主页后发起私信。</p><div className="report-actions"><button type="button" onClick={copyAccount}>复制小红书号</button><a href="/contact/xiaohongshu-card.jpg" download="绘屿造物-小红书名片.jpg">保存账号名片 ↓</a></div><p>请核对账号名称和小红书号。此页面仅提供联系方式，不会代你发送私信。</p><p role="status">{notice}</p></div><a href="/contact/xiaohongshu-card.jpg" target="_blank" rel="noopener noreferrer" aria-label="查看小红书账号名片原图"><img src="/contact/xiaohongshu-card.jpg" alt="绘屿造物 Lumen Auralis 小红书名片，账号 6765312465，含账号二维码" width="987" height="1347"/></a></section>
    </main>
  </div>;
}
