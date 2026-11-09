import {useEffect,useRef,useState} from 'react';
import envelopeArt from '../public/journey-envelope-corrected.webp?url';
const frameAssets=import.meta.glob('../public/journey-frame-*-5.webp',{eager:true,query:'?url',import:'default'}) as Record<string,string>;
function JourneyArt({scene}:{scene:number}){
 if(scene===5)return null;
 return <picture><img src={scene===2?envelopeArt:frameAssets[`../public/journey-frame-${scene}-5.webp`]} alt=""/></picture>;
}
type Props={steps:readonly (readonly [string,string])[];stock:boolean};
export default function BuyingJourney({steps,stock}:Props){
 const [step,setStep]=useState(0),[leaving,setLeaving]=useState(false);
 const timer=useRef<ReturnType<typeof setTimeout>|null>(null);
 const touch=useRef<{x:number;y:number}|null>(null);
 useEffect(()=>()=>{if(timer.current)clearTimeout(timer.current);},[]);
 const change=(next:number)=>{
  if(leaving||next<0||next>=steps.length||next===step)return;
  const reduced=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  if(reduced){setStep(next);return;}
  setLeaving(true);timer.current=setTimeout(()=>{setStep(next);setLeaving(false);},180);
 };
 const scene=stock?[0,1,4,5][step]:step;

 const openDetails=()=>{const detail=document.getElementById('purchase-full-details');if(detail instanceof HTMLDetailsElement){detail.open=true;detail.scrollIntoView({behavior:'smooth',block:'start'});}};
 return <div className="buying-journey" tabIndex={0} aria-label="逐步了解购买流程" onKeyDown={event=>{if(event.target!==event.currentTarget)return;if(event.key==='ArrowRight'){event.preventDefault();change(step+1);}if(event.key==='ArrowLeft'){event.preventDefault();change(step-1);}}}
   onTouchStart={event=>{const t=event.touches[0];touch.current={x:t.clientX,y:t.clientY};}}
   onTouchEnd={event=>{const t=event.changedTouches[0],start=touch.current;touch.current=null;if(!start)return;const dx=t.clientX-start.x,dy=t.clientY-start.y;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.4)change(step+(dx<0?1:-1));}}>
   <div key={step} className={`journey-scene ${leaving?'is-leaving':''}`}>
    <div className={`journey-art journey-art--${scene}`} role="img" aria-label={steps[step][0]}><JourneyArt key={step} scene={scene}/></div>
    <div className="journey-copy" aria-live="polite" aria-atomic="true"><p className="journey-position">{stock?'现货作品流程':'预定作品流程'} · {String(step+1).padStart(2,'0')} / {String(steps.length).padStart(2,'0')}</p><h3>{steps[step][0]}</h3><p>{steps[step][1]}</p></div>
   </div>
   <div className="journey-controls"><button type="button" disabled={step===0||leaving} onClick={()=>change(step-1)}>上一步</button><div className="journey-dots" aria-label="选择流程步骤">{steps.map(([title],i)=><button type="button" key={title} aria-label={title} aria-current={step===i?'step':undefined} onClick={()=>change(i)}/>)}</div>{step<steps.length-1?<button type="button" disabled={leaving} onClick={()=>change(step+1)}>下一步</button>:<button type="button" onClick={openDetails}>查看细则</button>}</div>
 </div>;
}






