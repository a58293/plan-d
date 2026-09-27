import {useCallback,useEffect,useRef,type RefObject} from 'react';

// Frame-rate independent easing; input updates a target rather than restarting CSS transitions.
export function useSmoothPosterPointer(root:RefObject<HTMLDivElement|null>,enabled:boolean){
 const target=useRef({x:0,y:0}),current=useRef({x:0,y:0}),frame=useRef(0),last=useRef(0);
 const move=useCallback((x:number,y:number)=>{
  if(!enabled)return;
  target.current={x,y};
  const tick=(time:number)=>{
   const dt=last.current?Math.min(40,time-last.current):16;last.current=time;
   const factor=1-Math.exp(-dt/55);
   current.current.x+=(target.current.x-current.current.x)*factor;
   current.current.y+=(target.current.y-current.current.y)*factor;
   const done=Math.abs(target.current.x-current.current.x)<.02&&Math.abs(target.current.y-current.current.y)<.02;
   if(done)current.current={...target.current};
   root.current?.style.setProperty('--poster-x',current.current.x+'px');
   root.current?.style.setProperty('--poster-y',current.current.y+'px');
   if(!done)frame.current=requestAnimationFrame(tick);else{frame.current=0;last.current=0;}
  };
  if(!frame.current)frame.current=requestAnimationFrame(tick);
 },[enabled,root]);
 useEffect(()=>()=>{cancelAnimationFrame(frame.current);frame.current=0;last.current=0;target.current={x:0,y:0};current.current={x:0,y:0};root.current?.style.setProperty('--poster-x','0px');root.current?.style.setProperty('--poster-y','0px');},[enabled,root]);
 return move;
}
