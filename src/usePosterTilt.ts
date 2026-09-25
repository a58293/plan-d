import {useEffect,useRef,useState,type RefObject} from 'react';

type SensorAPI=typeof DeviceOrientationEvent & {requestPermission?:()=>Promise<string>};
export function usePosterTilt(active:boolean,stage:RefObject<HTMLDivElement|null>){
 const [enabled,setEnabled]=useState(false),[status,setStatus]=useState('');
 const [mobile,setMobile]=useState(false);
 const session=useRef(0),requesting=useRef(false);
 useEffect(()=>{setMobile(navigator.maxTouchPoints>0||matchMedia('(pointer:coarse)').matches);},[]);
 useEffect(()=>{session.current++;setEnabled(false);setStatus('');return()=>{session.current++;};},[active]);
 const toggle=async()=>{
  if(enabled){setEnabled(false);setStatus('已关闭倾斜感应，可轻拖海报。');return;}
  if(requesting.current)return;
  if(!window.isSecureContext||!('DeviceOrientationEvent' in window)){setStatus('当前环境不支持倾斜感应，可轻拖海报。');return;}
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){setStatus('已遵循系统减少动态效果设置，可继续阅读海报与故事。');return;}
  const current=session.current;
  requesting.current=true;
  try{
   const api=DeviceOrientationEvent as SensorAPI;
   const permission=api.requestPermission?await api.requestPermission():'granted';
   if(current!==session.current)return;
   if(permission!=='granted'){setStatus('未获得感应权限，可轻拖海报。');return;}
   setStatus('正在连接倾斜感应…');setEnabled(true);
  }catch{if(current===session.current)setStatus('无法开启倾斜感应，可轻拖海报。');}
  finally{requesting.current=false;}
 };
 useEffect(()=>{
  if(!active||!enabled)return;
  let origin:{beta:number;gamma:number}|null=null,received=false,frame=0;
  const element=stage.current;
  const reset=()=>{origin=null;element?.style.setProperty('--poster-x','0px');element?.style.setProperty('--poster-y','0px');};
  const timeout=window.setTimeout(()=>{if(!received){setEnabled(false);setStatus('暂未收到感应数据，可轻拖海报或重新开启。');}},5000);
  const sensor=(event:DeviceOrientationEvent)=>{
   if(document.hidden||event.beta===null||event.gamma===null||!Number.isFinite(event.beta)||!Number.isFinite(event.gamma))return;
   if(!received){received=true;clearTimeout(timeout);setStatus('倾斜感应已开启，轻轻转动手机即可。');}
   if(!origin)origin={beta:event.beta,gamma:event.gamma};
   const delta=(value:number)=>((value+540)%360)-180;
   const dx=delta(event.gamma-origin.gamma),dy=delta(event.beta-origin.beta);
   const angle=(screen.orientation?.angle??0)*Math.PI/180;
   const x=Math.max(-8,Math.min(8,(dx*Math.cos(angle)+dy*Math.sin(angle))*.35));
   const y=Math.max(-6,Math.min(6,(dy*Math.cos(angle)-dx*Math.sin(angle))*.3));
   cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{element?.style.setProperty('--poster-x',x+'px');element?.style.setProperty('--poster-y',y+'px');});
  };
  const motion=matchMedia('(prefers-reduced-motion: reduce)');
  const preference=()=>{if(motion.matches){setEnabled(false);setStatus('已遵循系统减少动态效果设置。');}};
  window.addEventListener('deviceorientation',sensor);
  window.addEventListener('orientationchange',reset);
  document.addEventListener('visibilitychange',reset);
  motion.addEventListener('change',preference);
  return()=>{clearTimeout(timeout);cancelAnimationFrame(frame);window.removeEventListener('deviceorientation',sensor);window.removeEventListener('orientationchange',reset);document.removeEventListener('visibilitychange',reset);motion.removeEventListener('change',preference);reset();};
 },[active,enabled,stage]);
 return {enabled,status,mobile,toggle};
}
