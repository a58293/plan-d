import {useEffect, useRef, useState} from 'react';
import './seasonal-opening.css';
import {commerce} from './commerce';

// Change both the issue id and versioned file name when publishing a new issue.
export const openingIssue = 'lotus-2026-09-still-v2';
export const openingKey = `lumen-opening:${openingIssue}`;
const source = '/opening/lotus-2026-09-still-v2.mp4';
const posterSource = '/opening/lotus-2026-09-still-v2.webp';
const videoEnd = 10.8;
export function shouldShowOpening(path: string) {
  if (path !== '/') return false;
  try { return localStorage.getItem(openingKey) !== 'seen'; } catch { return true; }
}

export default function SeasonalOpening({onComplete}: {onComplete: () => void}) {
  const video = useRef<HTMLVideoElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const poster = useRef<HTMLImageElement>(null);
  const capturing = useRef(false);
  const [src, setSrc] = useState('');
  const [ready, setReady] = useState(false);
  const [showPoster, setShowPoster] = useState(false);
  const [state, setState] = useState<'loading'|'ready'|'playing'|'paused'|'ended'|'error'>('loading');
  const [showChoices, setShowChoices] = useState(false);
  const [exiting, setExiting] = useState(false);
  const exitFrame = useRef(0);
  const exitTimer = useRef(0);
  const [muted, setMuted] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const closed = useRef(false);
  const finish = (destination?: string) => {
    if (closed.current) return;
    closed.current = true;
    setExiting(true);
    try { localStorage.setItem(openingKey, 'seen'); } catch { /* Private browsing remains usable. */ }
    const element = video.current;
    const start = performance.now();
    const initialVolume = element?.volume ?? 1;
    const fade = () => {
      if (element) element.volume = Math.max(0, initialVolume * (1 - (performance.now() - start) / 400));
      if (performance.now() - start < 400) exitFrame.current = requestAnimationFrame(fade);
    };
    exitFrame.current = requestAnimationFrame(fade);
    exitTimer.current = window.setTimeout(() => {
      element?.pause();
      if (destination) window.location.assign(destination);
      else onComplete();
    }, 420);
  };
  useEffect(() => () => { cancelAnimationFrame(exitFrame.current); clearTimeout(exitTimer.current); }, []);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.current?.focus();
    return () => { document.body.style.overflow = overflow; previous?.focus(); };
  }, []);
  useEffect(() => {
    let disposed = false;
    let posterReady = false;
    let settled = false;
    const timer = window.setTimeout(() => {
      if (!disposed && !settled) { settled = true; video.current?.pause(); setState('error'); }
    }, 45000);
    capturing.current = false;
    setReady(false); setShowChoices(false); setShowPoster(false); setState('loading');
    // A single MP4 clock: 10.8s of video, 196s of continuous audio (no player handoff).
    // Do not block on the entire song. Require a contiguous buffered opening plus
    // audio headroom and a decoded, pixel-matched poster before enabling Start.
    const element = video.current;
    const check = () => {
      if (disposed || settled || !posterReady || !element || element.readyState < 3) return;
      for (let i = 0; i < element.buffered.length; i++) {
        if (element.buffered.start(i) <= 0.05 && element.buffered.end(i) >= videoEnd + 1.2) {
          settled = true; clearTimeout(timer); setReady(true); setState('ready'); break;
        }
      }
    };
    const fail = () => { if (!disposed) { settled = true; clearTimeout(timer); setState('error'); } };
    element?.addEventListener('canplay', check);
    element?.addEventListener('progress', check);
    element?.addEventListener('error', fail);
    const poll = window.setInterval(check, 250);
    setSrc(source);
    if (element) { element.src = source; element.load(); }
    const image = poster.current;
    if (image) {
      image.src = posterSource;
      void image.decode().then(() => { posterReady = true; check(); }, fail);
    }
    return () => {
      disposed = true; clearTimeout(timer); clearInterval(poll);
      element?.removeEventListener('canplay', check);
      element?.removeEventListener('progress', check);
      element?.removeEventListener('error', fail);
      element?.pause();
      element?.removeAttribute('src'); element?.load();
    };
  }, [attempt]);
  useEffect(() => {
    const pause = () => {
      if (document.hidden && video.current && !video.current.paused) video.current.pause();
    };
    document.addEventListener('visibilitychange', pause);
    return () => document.removeEventListener('visibilitychange', pause);
  }, []);
  const play = () => {
    if (!ready || !video.current) return;
    // Called synchronously from a click so mobile sound playback has a user gesture.
    void video.current.play().then(() => {
      if (document.hidden) video.current?.pause();
    }).catch(() => setState('paused'));
  };
  const freezeFrame = () => {
    const element = video.current, image = poster.current;
    if (capturing.current || !element || !image || !element.videoWidth) return;
    capturing.current = true;
    try {
      // Capture the browser's decoded frame, including its colour conversion.
      // This avoids device-specific differences between video YUV and image RGB.
      const canvas = document.createElement('canvas');
      canvas.width = element.videoWidth; canvas.height = element.videoHeight;
      const context = canvas.getContext('2d');
      if (!context) return; // Retain the video last frame as the safe fallback.
      context.drawImage(element, 0, 0);
      image.src = canvas.toDataURL('image/png');
      void image.decode().then(() => {
        if (poster.current === image && !closed.current) setShowPoster(true);
      }).catch(() => { /* Underlying last frame stays visible; never flash. */ });
    } catch { /* Canvas unavailable: keep the held video frame, audio continues. */ }
  };
  return <div className={`seasonal-opening${exiting ? ' is-exiting' : ''}`} ref={dialog} role="dialog" aria-modal="true" aria-label="本期海报序章" tabIndex={-1}
    onKeyDown={event => {
      if (event.key === 'Escape') finish();
      if (event.key === 'Tab') {
        const items = Array.from(dialog.current?.querySelectorAll<HTMLButtonElement>('button:not(:disabled)') || []);
        const first = items[0], last = items.at(-1);
        if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog.current)) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    }}>
    <video ref={video} src={src || undefined} preload="auto" playsInline muted={muted}
      aria-label="水下气泡、暗手与莲花照亮海报，配有音乐，无对白"
      onPlaying={() => setState('playing')} onPause={() => setState(s => s === 'playing' ? 'paused' : s)}
      onWaiting={() => { if (ready) { video.current?.pause(); setState('paused'); } }}
      onTimeUpdate={() => {
        if ((video.current?.currentTime ?? 0) >= videoEnd) freezeFrame();
        if ((video.current?.currentTime ?? 0) >= 10 && !showChoices) {
          setShowChoices(true);
          try { localStorage.setItem(openingKey, 'seen'); } catch { /* storage optional */ }
        }
      }}
      onError={() => setState('error')} onEnded={() => { setShowChoices(true); setState('ended'); }} />
    <img ref={poster} className={`seasonal-opening-still${showPoster ? ' is-visible' : ''}`} alt="莲花照亮水下的镜昕" aria-hidden={!showPoster} />
    <div className="seasonal-opening-tools">
      <button onClick={() => setMuted(!muted)} aria-pressed={muted}>{muted ? '开启声音' : '静音'}</button>
      {state === 'playing' && <button onClick={() => video.current?.pause()}>暂停</button>}
      {showChoices && state === 'paused' && <button onClick={play}>继续播放</button>}
      <button onClick={() => finish()}>跳过序章</button>
    </div>
    {showChoices && <div className="seasonal-opening-choices" aria-label="序章结束后的选择">
      <button disabled={!commerce.featuredProductUrl || exiting} onClick={() => finish(commerce.featuredProductUrl || undefined)}>
        立即购买{!commerce.featuredProductUrl && <small>即将开放</small>}
      </button>
      <button disabled={exiting} onClick={() => finish()}>进入主页</button>
    </div>}
    {state !== 'playing' && (!showChoices || state === 'error') && <div className="seasonal-opening-prompt">
      <p className="seasonal-opening-label">LUMEN AURALIS · 本期序章</p>
      <p role="status">{state === 'loading' ? '正在准备完整影像…' : state === 'error' ? '影像暂未准备好，可重试或跳过。' : state === 'paused' ? '播放已暂停' : '一朵莲，照见深水。'}</p>
      {state === 'error' ? <button onClick={() => setAttempt(n => n + 1)}>重新加载</button>
        : <button disabled={!ready} onClick={play}>{state === 'paused' ? '继续播放' : '开启本期'}</button>}
      {state === 'ready' && <small>10 秒后可进入主页 · {muted ? '静音播放' : '点击后播放音乐'}</small>}
    </div>}
  </div>;
}
