import {commerce} from './commerce';
import {officialInfo} from './official-info';
import ServiceContact from './ServiceContact';
import {useState} from 'react';
import {MobileActions} from './PurchaseMenu';
import Breadcrumbs from './Breadcrumbs';
import card from '../public/contact/xiaohongshu-card.jpg?url';
import './legal-page.css';
import './home-support.css';
export default function ContactPage(){
 const [notice,setNotice]=useState('');
 return <div className="legal-world"><header className="legal-header"><a className="legal-brand" href="/">绘屿造物</a><MobileActions/></header><Breadcrumbs path="/contact"/><main><p className="legal-kicker">投稿与联系</p><h1>投稿与联系</h1><p className="legal-intro">欢迎分享你与作品的日常。如需咨询，请通过官方小红书私信或淘宝客服联系我们。</p><p><ServiceContact/></p><section className="report-guidance"><h2>分享你的藏家影像</h2><p>请通过小红书私信发送照片与作品名称，附上希望使用的署名，以及你想分享的故事。请仅提供自己拍摄或已获授权的图片。</p><p>投稿不代表自动授权公开。是否展示、展示范围与署名方式，会与你确认后再安排；请勿发送包含无关个人信息的照片。</p></section><section className="report-social" id="xiaohongshu"><div><h2>绘屿造物</h2><p>小红书号：<strong>6765312465</strong></p><p>在小红书搜索账号，或保存名片后扫描识别，通过私信联系。</p><div className="report-actions"><button onClick={async()=>{try{await navigator.clipboard.writeText('6765312465');setNotice('请打开小红书搜索该账号，再通过私信联系。');}catch{setNotice('请手动复制小红书号：6765312465');}}}>复制小红书号</button><a href={card} download="绘屿造物-小红书名片.jpg">保存账号名片 </a></div><p role="status">{notice}</p><p>如需提供疑似仿冒或盗图线索，请查看<a href="/report">举报说明</a>。</p></div><img src={card} alt="绘屿造物小红书账号名片" width="987" height="1347"/></section><section className="report-guidance" id="taobao" aria-labelledby="taobao-contact-title"><h2 id="taobao-contact-title">淘宝客服</h2><p>已购买的作品，请在淘宝“我的订单”中找到对应订单，进入店铺后选择“联系客服”，通过原订单沟通配置、制作进度、收货与售后问题。</p><p>尚未下单，也可以通过本站官方淘宝入口进入店铺或商品页面，选择“客服”咨询。</p>{(commerce.shopUrl||commerce.featuredProductUrl)&&<div className="report-actions"><a href={commerce.shopUrl||commerce.featuredProductUrl!} target="_blank" rel="noopener noreferrer">前往官方淘宝入口</a></div>}<p>客服时间：{officialInfo.serviceHours}。请勿在公开评论区发布订单号或收货信息。</p></section></main></div>;
}
