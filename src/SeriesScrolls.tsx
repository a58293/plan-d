import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { FLOWER_GODS_PATH } from './flower-gods-catalog';

type Props = { onOpenFlowerGods?: () => void; active?: boolean };
type SceneStyle = CSSProperties & Record<`--${string}`, string>;

const smooth = (value: number) => value * value * (3 - 2 * value);
const softer = (value: number) => value ** 3 * (value * (value * 6 - 15) + 10);
const clamp = (value: number) => Math.max(0, Math.min(1, value));
const SESSION_KEY = 'lumen-series-scroll-opened-v2';
const wasOpened = () => {
  // A preview-only URL flag lets the art team inspect the full opening again
  // without changing the once-per-tab behaviour visitors get.
  if (new URLSearchParams(window.location.search).has('replaySeries')) return false;
  try { return window.sessionStorage.getItem(SESSION_KEY) === '1'; } catch { return false; }
};

export default function SeriesScrolls({ onOpenFlowerGods, active = false }: Props) {
  const [progress, setProgress] = useState(() => wasOpened() ? 1 : 0);
  const progressRef = useRef(progress);
  const sectionRef = useRef<HTMLElement>(null);
  const frame = useRef(0);
  const opening = useRef(false);

  const animateOpen = useCallback(() => {
    if (opening.current || progressRef.current >= 1) return;
    opening.current = true;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      progressRef.current = 1;
      setProgress(1);
      try { window.sessionStorage.setItem(SESSION_KEY, '1'); } catch { /* Animation still works without storage. */ }
      opening.current = false;
      return;
    }
    let start = 0;
    const tick = (now: number) => {
      if (!start) start = now;
      const next = clamp((now - start - 200) / 1700);
      progressRef.current = next;
      setProgress(next);
      if (next < 1) frame.current = window.requestAnimationFrame(tick);
      else {
        try { window.sessionStorage.setItem(SESSION_KEY, '1'); } catch { /* Animation still works without storage. */ }
        opening.current = false;
      }
    };
    frame.current = window.requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    if (!active || progressRef.current >= 1) return;
    const timer = window.setTimeout(animateOpen, 420);
    return () => window.clearTimeout(timer);
  }, [active, animateOpen]);

  useEffect(() => () => {
    window.cancelAnimationFrame(frame.current);
  }, []);

  const open = () => {
    if (progressRef.current < 1) { animateOpen(); return; }
    if (onOpenFlowerGods) onOpenFlowerGods();
    else window.location.assign(FLOWER_GODS_PATH);
  };

  const roll = smooth(progress);
  const floral = softer(clamp((progress - .60) / .40));
  const crane = softer(clamp((progress - .68) / .32));
  const breeze = clamp((progress - .60) / .40);
  const gust = Math.sin(breeze * Math.PI * 2.3) * (1 - breeze) * 1.15;
  const style: SceneStyle = {
    '--series-roll': roll.toFixed(4),
    // The artwork uses a 16:9 cover crop. Keep its opening edge attached to
    // the source image's left roller across narrow and tall viewports.
    '--series-edge': `calc(50vw - max(36vw, 63.972svh) + ${(66 * (1 - roll)).toFixed(3)}%)`,
    '--series-floral': floral.toFixed(3),
    '--series-crane': crane.toFixed(3),
    '--series-rod': Math.min(1, roll * 16).toFixed(3),
    '--series-gust': `${gust.toFixed(3)}deg`,
    '--series-gust-y': `${(-gust * 4).toFixed(2)}px`,
    '--series-curl': (Math.min(.72, roll * 12) * (1 - crane)).toFixed(3),
  };

  return <section ref={sectionRef} className="section series-section series-scroll-live" id="series" aria-label="花神卷互动卷轴" data-home-scroll>
    <div className="series-scroll-scene" style={style}>
      <div className="series-scroll-closed" aria-hidden="true" />
      <div className="series-scroll-reveal" aria-hidden="true" />
      <div className="series-scroll-curl" aria-hidden="true" />
      <div className="series-scroll-rod" aria-hidden="true" />
      <div className="series-scroll-flowers" aria-hidden="true" />
      <div className="series-scroll-crane" aria-hidden="true" />
      <div className="series-scroll-breeze" aria-hidden="true" />
      <div className="series-scroll-petals" aria-hidden="true">{Array.from({ length: 12 }, (_, index) => <i key={index} />)}</div>
      <div className="series-scroll-label" aria-hidden="true"><span>01 / 花神卷</span><strong>花神卷</strong><small>{progress >= 1 ? '轻触画卷，进入花神卷' : '画卷展开中'}</small></div>
      <button className="series-scroll-open" type="button" onClick={open} aria-label={progress >= 1 ? '进入花神卷' : '花神卷画卷展开中'} />
    </div>
  </section>;
}
