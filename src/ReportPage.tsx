import {useState} from 'react';
import SiteSearch from './SiteSearch';
import Breadcrumbs from './Breadcrumbs';
import {requiredImage} from './media-library';
import './legal-page.css';
import './home-support.css';

export default function ReportPage() {
  const [kind,setKind]=useState('疑似仿冒产品');
  const [url,setUrl]=useState('');
  const [details,setDetails]=useState('');
  const [notice,setNotice]=useState('');
  const email='1535422463@qq.com';
  const draft=`举报类型：${kind}\n相关链接：${url}\n情况说明：${details}\n\n请在邮件中添加截图等证据，并遮盖无关的个人信息。`;
  return <div className="legal-world report-world">
    <header className="legal-header"><a className="legal-brand" href="/"><img src={requiredImage('brandLogo')} alt=""/><span>LUMEN AURALIS<small>绘屿造物</small></span></a><SiteSearch/></header>
    <Breadcrumbs path="/report"/>
    <main><p className="legal-kicker">原创保护 · 联系我们</p><h1>举报说明</h1><p className="legal-intro">如发现疑似仿冒、盗用图片或冒充官方的情况，请将相关线索发送给我们核查。</p>
      <section className="report-guidance"><h2>发送前，请准备这些线索</h2><p>相关网页链接、店铺或账号名称，以及能够说明情况的截图。如涉及图片或文字，请尽量附上原作品出处。请描述你实际发现的情况，不必自行作出侵权结论。</p><h2>如何发送</h2><p>在下方填写线索后，点击按钮打开自己的邮件应用，添加附件并发送至 1535422463@qq.com。网页不会自动提交，也不会上传附件；若无法打开邮件应用，可复制内容后手动发送。</p></section>
      <form className="report-form" onSubmit={event=>{event.preventDefault();window.location.href=`mailto:${email}?subject=${encodeURIComponent('绘屿造物 · 侵权线索')}&body=${encodeURIComponent(draft)}`;setNotice('已尝试打开邮件应用。请添加证据附件并点击发送；网页不会自动提交举报。');}}>
        <label>线索类型<select value={kind} onChange={e=>setKind(e.target.value)}><option>疑似仿冒产品</option><option>未经授权使用图片或文字</option><option>冒充官方账号或店铺</option><option>其他情况</option></select></label>
        <label>相关网页链接<input type="url" required value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://…" maxLength={500}/></label>
        <label>情况说明<textarea required value={details} onChange={e=>setDetails(e.target.value)} rows={5} maxLength={1500} placeholder="请说明涉及的作品、店铺或账号，以及发现的情况。"/></label>
        <p>收件邮箱：<a href={`mailto:${email}`}>{email}</a><br/>截图请在邮件中添加。请勿提供密码、身份证照片或与线索无关的个人信息。填写内容不会保存在本站。</p>
        <div className="report-actions"><button type="submit">打开邮件应用发送 ↗</button><button type="button" onClick={()=>{void navigator.clipboard.writeText(`收件人：${email}\n${draft}`).then(()=>setNotice('已复制邮件内容，请粘贴到你的邮箱并发送。'),()=>setNotice('未能复制，请手动选择邮箱地址和填写内容。'));}}>复制邮件内容</button></div>
        <p role="status">{notice}</p>
      </form>
    </main>
  </div>;
}
