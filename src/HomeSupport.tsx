import './home-support.css';

export default function HomeSupport() {
  return <section className="home-support" id="support" aria-labelledby="support-title">
    <p className="support-kicker">HELP & SUPPORT</p><h2 id="support-title">帮助与支持</h2>
    <div className="support-grid">
      <a className="support-card" href="/report"><div className="support-art" aria-hidden="true"><span>守护原创</span><i>01 / ORIGINALITY</i></div><h3>举报说明</h3><p>发现疑似仿冒、盗图或冒充官方？了解需要准备的线索，以及如何联系我们。</p><span className="support-more">进一步了解 ↗</span></a>
      <a className="support-card" href="/help"><div className="support-art support-art-help" aria-hidden="true"><span>相遇有答</span><i>02 / GUIDANCE</i></div><h3>帮助说明</h3><p>从浏览作品、购买入口到防伪查询，在这里找到常用说明与联系方法。</p><span className="support-more">进一步了解 ↗</span></a>
    </div>
  </section>;
}
