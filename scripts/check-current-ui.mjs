import assert from 'node:assert/strict';
import {loadSource} from './test-source-loader.mjs';
const model=loadSource('src/flower-carousel.ts');
const {flowerGods}=loadSource('src/flower-gods-catalog.ts');
for(const count of [1,2,3,7]) {
 const seats=model.createFlowerSeats(Array.from({length:count},(_,i)=>({...flowerGods[0],slug:'test-'+i})));
 assert.equal(seats.length,Math.max(3,count));
 assert.equal(seats.filter(x=>x.deity).length,count);
 for(let i=-30;i<=30;i++) assert.equal(new Set(model.carouselWindow(i,seats).filter(x=>Math.abs(x.offset)<=1).map(x=>x.seat.id)).size,3);
}
const {currentProductTheme:theme}=loadSource('src/current-product-theme.ts');
const luminance=hex=>hex.slice(1).match(/../g).map(x=>parseInt(x,16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4).reduce((sum,x,i)=>sum+x*[.2126,.7152,.0722][i],0);
for(const [a,b] of [['ink','paper'],['ink','mist'],['light','middle']]) {
 const x=luminance(theme.colors[a]),y=luminance(theme.colors[b]);
 assert.ok((Math.max(x,y)+.05)/(Math.min(x,y)+.05)>=4.5,`Text contrast ${a}/${b}`);
}
console.log('当前界面行为检查通过：目录扩展、循环位置、当期主题文字对比度。');
