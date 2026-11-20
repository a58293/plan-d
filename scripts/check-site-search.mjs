import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import ts from 'typescript';
const source=await readFile(new URL('../src/site-search-engine.ts',import.meta.url),'utf8');
const js=ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}}).outputText;
const {searchSite,normalizeSearch}=await import('data:text/javascript;base64,'+Buffer.from(js).toString('base64'));
const entries=[
 {title:'镜昕的目光',href:'/eyes',category:'配件',subtitle:'眼球实物',aliases:['眼珠','eyes'],keywords:'镜昕 14/5 16/5'},
 {title:'镜昕',href:'/jingxin',category:'角色',subtitle:'荷花女神',aliases:['jingxin','jing xin'],keywords:'眼珠 配件'},
 {title:'购买须知',href:'/purchase',category:'帮助',subtitle:'售后说明',keywords:'退款 发货 周期'},
 {title:'重复入口',href:'/eyes',category:'配件',subtitle:'镜昕眼珠',keywords:'镜昕'},
];
assert.equal(searchSite(entries,'镜昕')[0].href,'/jingxin','exact name ranks before a related product');
assert.deepEqual(searchSite(entries,'镜昕 眼珠').map(e=>e.href),['/eyes','/jingxin'],'all spaced terms must match and routes are deduplicated');
assert.equal(searchSite(entries,'ＪＩＮＧＸＩＮ')[0].href,'/jingxin','fullwidth case-insensitive pinyin');
assert.equal(searchSite(entries,'jing xin')[0].href,'/jingxin','spaced pinyin');
assert.equal(searchSite(entries,'眼珠 １４／５')[0].href,'/eyes','synonym and fullwidth specification');
assert.equal(searchSite(entries,'退款')[0].href,'/purchase','help body keywords');
assert.deepEqual(searchSite(entries,'镜昕 不存在'),[],'unmatched term must not return unrelated results');
assert.deepEqual(searchSite(entries,'   '),[]);
assert.deepEqual(searchSite(entries,'＋'),[]);
assert.equal(normalizeSearch(' 14 ／ 5 '),'145');
console.log('站内搜索检查通过：名称排序、组合词、去重、拼音、全角规格、帮助关键词、空查询和无匹配。');
// Check the real index as well as the isolated ranking fixtures.
const {createRequire}=await import('node:module');
const {build}=createRequire(import.meta.resolve('vite'))('esbuild');
const bundled=await build({stdin:{contents:`export {siteSearchIndex} from './src/site-search-index'; export {visibleSiteNavigation} from './src/site-navigation'; export {categoryPages} from './src/category-pages';`,resolveDir:process.cwd(),loader:'ts'},bundle:true,write:false,platform:'node',format:'esm',define:{'import.meta.env':'{}'},loader:{'.png':'dataurl','.webp':'dataurl'}});
const {siteSearchIndex,visibleSiteNavigation,categoryPages}=await import('data:text/javascript;base64,'+Buffer.from(bundled.outputFiles[0].text).toString('base64'));
const indexed=new Set(siteSearchIndex.map(entry=>entry.href));
assert.equal(indexed.size,siteSearchIndex.length,'one canonical result per destination');
const destinations=items=>items.flatMap(item=>[...(item.href?[item.href]:[]),...destinations(item.children||[])]);
for(const href of destinations(visibleSiteNavigation))assert.ok(indexed.has(href),'published navigation indexed: '+href);
for(const href of ['/releases','/collections','/accessories','/stories','/support'])assert.ok(indexed.has(href),'category overview indexed: '+href);
for(const href of ['/creations','/bodies/male','/accessories/storage'])assert.ok(!indexed.has(href),'unpublished-only directory excluded: '+href);
for(const [query,href] of [['镜昕 眼珠','/accessories/eyes'],['jing xin','/series/flower-gods/jingxin'],['产品信息','/series/flower-gods/jingxin'],['树脂','/series/flower-gods/jingxin'],['转单','/purchase-notice'],['故事','/stories'],['女体68','/bodies/female-70'],['联系客服','/contact']])assert.equal(searchSite(siteSearchIndex,query)[0]?.href,href,'real index query: '+query);
const fixed=new Set(['/','/series/flower-gods','/series/flower-gods/jingxin','/verify','/purchase-notice','/help','/contact','/report','/stories/official','/stories/collectors','/stories/openings']);
for(const entry of siteSearchIndex)assert.ok(fixed.has(entry.href)||categoryPages[entry.href]||/^\/stories\/(official|collectors)\/[^/]+$/.test(entry.href),'search destination has a renderer: '+entry.href);
console.log(`真实索引检查通过：${siteSearchIndex.length} 个独立入口，公开导航覆盖、目录状态、常用查询和路由有效性。`);