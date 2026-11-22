import './service-contact.css';

/** Shared contact destinations; never show a personal phone or dialing link. */
export default function ServiceContact(){
 return <span className="service-contact-links"><a href="/contact#xiaohongshu">小红书私信</a><span aria-hidden="true">／</span><a href="/contact#taobao">淘宝客服</a></span>;
}