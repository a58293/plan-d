import {createRequire} from 'node:module';
import {readFileSync,existsSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {pathToFileURL} from 'node:url';
import ts from 'typescript';
const require=createRequire(import.meta.url);
export function loadSource(file, overrides={}) {
  const filename=resolve(file), module={exports:{}};
  const source=readFileSync(filename,'utf8').replaceAll('import.meta.env',JSON.stringify({DEV:false,PROD:true})).replaceAll('import.meta.url',JSON.stringify(pathToFileURL(filename).href));
  const code=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2022}}).outputText;
  new Function('require','module','exports',code)(name=>{
    if (name in overrides) return overrides[name];
    if (name.endsWith('.css')) return {};
    if (!name.startsWith('.')) return require(name);
    const path=resolve(dirname(filename),name);
    if (name.endsWith('.json')) return {default:JSON.parse(readFileSync(path,'utf8'))};
    const target=[path,path+'.ts',path+'.tsx',path+'.mjs'].find(existsSync);
    if (!target) throw Error(name);
    return loadSource(target,overrides);
  },module,module.exports);
  return module.exports;
}
