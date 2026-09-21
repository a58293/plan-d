import {useEffect, useRef, useState} from 'react';
import './seasonal-opening.css';
import {commerce} from './commerce';

// Change both the issue id and versioned file name when publishing a new issue.
export const openingIssue = 'lotus-2026-09-long-v1';
export const openingKey = `lumen-opening:${openingIssue}`;
const source = '/opening/lotus-2026-09-long-v1.mp4';
export function shouldShowOpening(path: string) {
  if (path !== '/') return false;
  try { return localStorage.getItem(openingKey) !== 'seen'; } catch { return true; }
}

export default function SeasonalOpening({onComplete}: {onComplete: () => void}) {
  const video = useRef<HTMLVideoElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const [src, setSrc] = useState('');
  const [ready, setReady] = useState(false);
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
    const controller = new AbortController();
    let disposed = false;
    let objectUrl = '';
    const timer = window.setTimeout(() => {
      controller.abort();
      if (!disposed) setState('error');
    }, 45000);
    setSrc(''); setReady(false); setShowChoices(false); setState('loading');
    // Wait for the whole response, not canplaythrough's bandwidth estimate.
    void fetch(source, {signal: controller.signal, cache: 'force-cache'})
      .then(async response => {
        if (!response.ok) throw new Error('Opening download failed');
        const blob = await response.blob();
        if (!blob.size || !blob.type.startsWith('video/')) throw new Error('Invalid opening media');
        if (disposed) return;
        objectUrl = URL.createObjectURL(blob);
        setSrc(objectUrl);
      }).catch(() => { if (!disposed) setState('error'); });
    // Includes decode readiness; a complete download alone is not enough.
    const element = video.current;
    const loaded = () => {
      if (disposed) return;
      clearTimeout(timer); setReady(true); setState('ready');
    };
    element?.addEventListener('canplay', loaded, {once: true});
    return () => {
      disposed = true; controller.abort(); clearTimeout(timer);
      element?.removeEventListener('canplay', loaded);
      element?.pause();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
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
        if ((video.current?.currentTime ?? 0) >= 10 && !showChoices) {
          setShowChoices(true);
          try { localStorage.setItem(openingKey, 'seen'); } catch { /* storage optional */ }
        }
      }}
      onError={() => setState('error')} onEnded={() => { setShowChoices(true); setState('ended'); }} />
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
