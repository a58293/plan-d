import Fontmin from 'fontmin';
import fs from 'fs';
import path from 'path';

const text = '路由组件懒加载页面切换时的占位符藕荷天青秋香色远山蓝紫藤竹绿桃夭响应式初始数量移动端个桌可以多一些但为了统体验默认都从开大屏幕如果还没点击过更显示化检查凯撒益西曲珍身高重胸围腰臀鞋码是处持续实创作空间关注艺术工与文连接探寻者在当下表达喧嚣世界里我们选择缓慢专长期网站全局内容图片配置上线准备版终极指南态排说明本所有格跑马灯瀑布流已经完无论你中添张会自计算并美何将传到仓库对夹方复制行代修改和径即想要几就写不需任这您床基础链使用确保新能立生效首分类封客户集球节人偶设产品模特纪平插画牌标识项目名称详细描述案介绍理念等阿祖小院丽江普洱茶昆岚食谷华侨城恐龙茜姿兰健康日记泽彝楚雄嵩浙鸢尾蓬松活武汉云省阜外心血管病医孔子学环卡地亚港十木草话拿丹寨万镇贵州槐脚安月咏堂发预优防止非浏览器境执或利象后台静存入abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789：，。、（）【】！ ';

const srcPath = 'public/fonts/*.ttf'; // 源字体文件路径
const destPath = 'public/fonts/subset'; // 输出路径

console.log('Starting fontmin...');

const fontmin = new Fontmin()
    .src(srcPath)
    .use(Fontmin.glyph({
        text: text,
        hinting: false         // keep ttf hint info (fpgm, prep, cvt). default = true
    }))
    .use(Fontmin.ttf2woff2())  // 转换为 woff2 格式，体积更小
    .dest(destPath);

fontmin.run(function (err, files) {
    if (err) {
        throw err;
    }
    console.log('Fontmin completed successfully!');
    
    // Check sizes
    const old1 = fs.statSync('public/fonts/Genkaimincho.ttf').size;
    const old2 = fs.statSync('public/fonts/NamiLaoSong-A.ttf').size;
    const new1 = fs.statSync('public/fonts/subset/Genkaimincho.woff2').size;
    const new2 = fs.statSync('public/fonts/subset/NamiLaoSong-A.woff2').size;
    
    console.log(`Genkaimincho: ${old1} -> ${new1} bytes`);
    console.log(`NamiLaoSong-A: ${old2} -> ${new2} bytes`);
});
