import {useCallback,useEffect,useRef,useState} from 'react';
import './embedded-story.css';

type Props={mode:'contained'|'document';className?:string};
const clamp=(value:number)=>Math.max(0,Math.min(1,value));

export default function EmbeddedStory({mode,className=''}:Props){
  const surface=useRef<HTMLDivElement>(null);
  const frame=useRef<HTMLIFrameElement>(null);
  const [length,setLength]=useState(15);
  const [documentMarkup,setDocumentMarkup]=useState('');
  const [loadError,setLoadError]=useState(false);
  const progress=useRef(0);
  const send=useCallback((type:string,details:Record<string,number>)=>{
    frame.current?.contentWindow?.postMessage({type,...details},window.location.origin);
  },[]);
  const sync=useCallback(()=>{
    const element=surface.current;
    if(!element)return;
    const value=mode==='contained'
      ?clamp(element.scrollTop/Math.max(1,element.scrollHeight-element.clientHeight))
      :clamp(-element.getBoundingClientRect().top/Math.max(1,element.offsetHeight-window.innerHeight));
    progress.current=value;
    send('lumen-story-seek',{progress:value});
  },[mode,send]);
  useEffect(()=>{
    const controller=new AbortController();
    void fetch('/story-experiences/jingxin.html',{signal:controller.signal}).then(async response=>{
      if(!response.ok||!response.headers.get('content-type')?.includes('text/html'))throw Error('story unavailable');
      const html=await response.text();
      if(controller.signal.aborted)return;
      setDocumentMarkup(html.replace('<html lang="zh-CN">','<html lang="zh-CN" class="story-embed">').replace('<head>','<head><base href="/story-experiences/">'));
    }).catch(()=>{if(!controller.signal.aborted)setLoadError(true)});
    return()=>controller.abort();
  },[]);
  useEffect(()=>{
    const receive=(event:MessageEvent)=>{
      if(event.origin!==window.location.origin||event.source!==frame.current?.contentWindow||event.data?.type!=='lumen-story-ready')return;
      const next=Number(event.data.length);
      if(Number.isFinite(next))setLength(Math.max(5,Math.min(18,next)));
      send('lumen-story-seek',{progress:progress.current});
    };
    window.addEventListener('message',receive);
    return()=>window.removeEventListener('message',receive);
  },[send]);
  useEffect(()=>{
    if(mode!=='document')return;
    window.addEventListener('scroll',sync,{passive:true});
    window.addEventListener('resize',sync,{passive:true});
    sync();
    return()=>{window.removeEventListener('scroll',sync);window.removeEventListener('resize',sync)};
  },[mode,sync,length]);
  const look=(event:React.PointerEvent<HTMLDivElement>)=>{
    if(event.pointerType==='touch')return;
    const rect=event.currentTarget.getBoundingClientRect();
    send('lumen-story-look',{x:clamp((event.clientX-rect.left)/rect.width)*2-1,y:clamp((event.clientY-rect.top)/Math.min(rect.height,window.innerHeight))*2-1});
  };
  return <div ref={surface} className={`embedded-story embedded-story-${mode} ${className}`} data-chapter-scroll={mode==='contained'||undefined} style={{'--story-length':String(length)} as React.CSSProperties}
    onScroll={mode==='contained'?sync:undefined} onPointerMove={look} onPointerLeave={()=>send('lumen-story-look',{x:0,y:0})}
    onKeyDown={event=>{if(mode!=='contained')return;if(['ArrowDown','PageDown','ArrowUp','PageUp','Home','End'].includes(event.key)){event.stopPropagation();event.preventDefault();const node=surface.current;if(!node)return;const step=event.key.startsWith('Page')?node.clientHeight*.72:node.clientHeight*.18;node.scrollTo({top:event.key==='Home'?0:event.key==='End'?node.scrollHeight:node.scrollTop+(event.key==='ArrowUp'||event.key==='PageUp'?-step:step),behavior:'smooth'});}}}
    tabIndex={mode==='contained'?0:undefined} aria-label="镜昕的滚动故事，滚动阅读四章全文">
    <div className="embedded-story-track">{documentMarkup?<iframe ref={frame} srcDoc={documentMarkup} title="镜昕 · 泥沼生花，水月照心" scrolling="no" onLoad={sync}/>:loadError?<p className="embedded-story-error">故事画面暂时无法载入。<a href="/story-experiences/jingxin.html">单独阅读故事</a></p>:<p className="embedded-story-loading">正在展开镜昕的故事…</p>}</div>
  </div>;
}
