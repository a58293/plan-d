import {useState} from 'react';
import {MobileActions} from './PurchaseMenu';
import Breadcrumbs from './Breadcrumbs';
import card from '../public/contact/xiaohongshu-card.jpg?url';
import './legal-page.css';
import './home-support.css';
export default function ContactPage(){
 const [notice,setNotice]=useState('');
 return <div className="legal-world"><header className="legal-header"><a className="legal-brand" href="/">绘屿造物</a><MobileActions/></header><Breadcrumbs path="/contact"/><main><p className="legal-kicker">COLLECTORS & CONTACT</p><h1>投稿与联系</h1><p className="legal-intro">欢迎分享你与作品的日常，也欢迎通过官方账号联系我们。</p><section className="report-guidance"><h2>分享你的藏家影像</h2><p>请通过小红书私信发送照片与作品名称，附上希望使用的署名，以及你想分享的故事。请仅提供自己拍摄或已获授权的图片。</p><p>投稿不代表自动授权公开。是否展示、展示范围与署名方式，会与你确认后再安排；请勿发送包含无关个人信息的照片。</p></section><section className="report-social"><div><h2>绘屿造物 Lumen Auralis</h2><p>小红书号：<strong>6765312465</strong></p><p>在小红书搜索账号，或保存名片后扫描识别，通过私信联系。</p><div className="report-actions"><button onClick={async()=>{try{await navigator.clipboard.writeText('6765312465');setNotice('请打开小红书搜索该账号，再通过私信联系。');}catch{setNotice('请手动复制小红书号：6765312465');}}}>复制小红书号</button><a href={card} download="绘屿造物-小红书名片.jpg">保存账号名片 ↓</a></div><p role="status">{notice}</p><p>如需提供疑似仿冒或盗图线索，请查看<a href="/report">举报说明</a>。</p></div><img src={card} alt="绘屿造物小红书账号名片" width="987" height="1347"/></section></main></div>;
}
