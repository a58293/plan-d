import './home-support.css';
function SupportIllustration({kind}:{kind:'protect'|'guide'}) {
 return <div className="support-symbol-art" aria-hidden="true"><svg viewBox="0 0 240 160" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
 <circle cx="120" cy="80" r="63" opacity=".13"/><path d="M22 80h24m148 0h24" opacity=".25"/>
 {kind==='protect'?<><path d="M120 24c16 12 31 17 49 20v43c0 27-24 46-49 56-25-10-49-29-49-56V44c18-3 33-8 49-20Z"/><path d="M120 108c-20-9-30-22-27-39 15 3 24 13 27 25 3-12 12-22 27-25 3 17-7 30-27 39Z"/><path d="M120 92c-11-14-11-29 0-43 11 14 11 29 0 43Zm-30 19c17 7 43 7 60 0"/></>:<><path d="M120 53c-20-12-43-16-67-10v78c24-6 47-2 67 10 20-12 43-16 67-10V43c-24-6-47-2-67 10Zm0 0v78"/><path d="M67 64c14-2 27 0 39 5m-39 12c14-2 27 0 39 5m-39 12c14-2 27 0 39 5m28-34c12-5 25-7 39-5m-39 22c12-5 25-7 39-5m-39 22c12-5 25-7 39-5M120 14v17m-8-9h16"/></>}
 </svg><span>{kind==='protect'?'ORIGINALITY · 原创保护':'GUIDANCE · 使用指南'}</span></div>;
}

export default function HomeSupport() {
  return <section className="home-support" id="support" aria-labelledby="support-title">
    <p className="support-kicker">HELP & SUPPORT</p><h2 id="support-title">帮助与支持</h2>
    <div className="support-grid">
      <a className="support-card" href="/report"><SupportIllustration kind="protect"/><h3>举报说明</h3><p>发现疑似仿冒、盗图或冒充官方？了解需要准备的线索，以及如何联系我们。</p><span className="support-more">进一步了解 ↗</span></a>
      <a className="support-card" href="/help"><SupportIllustration kind="guide"/><h3>帮助说明</h3><p>从浏览作品、购买入口到防伪查询，在这里找到常用说明与联系方法。</p><span className="support-more">进一步了解 ↗</span></a>
    </div>
  </section>;
}
