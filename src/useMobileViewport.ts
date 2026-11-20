import {useEffect,useState} from 'react';

/** Keep React page branches in sync with the same breakpoint as their CSS. */
export function useMobileViewport(){
 const [mobile,setMobile]=useState(()=>window.matchMedia('(max-width: 700px)').matches);
 useEffect(()=>{
  const query=window.matchMedia('(max-width: 700px)');
  const update=()=>setMobile(query.matches);
  update();
  if(query.addEventListener){query.addEventListener('change',update);return()=>query.removeEventListener('change',update)}
  query.addListener(update);return()=>query.removeListener(update);
 },[]);
 return mobile;
}