import {useEffect, useRef, useState} from 'react';
import './seasonal-opening.css';
import {commerce} from './commerce';
import {applyCustomFonts} from './custom-fonts';
import FlowerStory from './FlowerStory';

// Change both the issue id and versioned file name when publishing a new issue.
export const openingIssue = 'lotus-2026-09-still-v2';
export const openingKey = `lumen-opening:${openingIssue}`;
const source = '/opening/lotus-2026-09-music-v4.mp4';
const posterSource = '/opening/lotus-2026-09-still-v2.webp';
const videoEnd = 10.8;
export function shouldShowOpening(path: string) {
  if (path !== '/') return false;
  try { return localStorage.getItem(openingKey) !== 'seen'; } catch { return true; }
}

export default function SeasonalOpening({onComplete, onReveal}: {onComplete: () => void; onReveal: () => void}) {
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
  const revealTimer = useRef(0);
  const audioContext = useRef<AudioContext | null>(null);
  const audioGain = useRef<GainNode | null>(null);
  const levelRequest = useRef(0);
  const [muted, setMuted] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState<number | null>(0);
  const nativeFallback = useRef(false);
  const [attempt, setAttempt] = useState(0);
  const closed = useRef(false);
  const fontsRequested = useRef(false);
  const setMusicLevel = (target: number, seconds: number) => {
    const element = video.current;
    if (!element) return;
    const request = ++levelRequest.current;
    cancelAnimationFrame(exitFrame.current);
    const start = performance.now();
    const initial = element.volume;
    const fallback = () => {
      if (request !== levelRequest.current) return;
      const fraction = Math.min(1, (performance.now() - start) / (seconds * 1000));
      element.volume = initial + (target - initial) * fraction;
      if (fraction < 1) exitFrame.current = requestAnimationFrame(fallback);
    };
    try {
      const context = audioContext.current ?? new AudioContext();
      audioContext.current = context;
      void context.resume().then(() => {
        if (request !== levelRequest.current || video.current !== element) return;
        if (context.state !== 'running') { fallback(); return; }
        let gain = audioGain.current;
        if (!gain) {
          gain = context.createGain();
          gain.gain.value = element.volume;
          context.createMediaElementSource(element).connect(gain);
          gain.connect(context.destination); audioGain.current = gain;
          element.volume = 1;
        }
        gain.gain.cancelAndHoldAtTime(context.currentTime);
        gain.gain.linearRampToValueAtTime(target, context.currentTime + seconds);
      }).catch(fallback);
    } catch { fallback(); }
  };
  useEffect(() => {
    // Load the site's real UI font after the opening media is ready, not only
    // after leaving the opening. Do not make font download a playback gate.
    if (ready && !fontsRequested.current) {
      fontsRequested.current = true;
      void applyCustomFonts();
    }
  }, [ready]);
  const finish = (destination?: string) => {
    if (closed.current) return;
    closed.current = true;
    setExiting(true);
    try { localStorage.setItem(openingKey, 'seen'); } catch { /* Private browsing remains usable. */ }
    const element = video.current;
    setMusicLevel(0, 2);
    if (!destination) revealTimer.current = window.setTimeout(onReveal, 420);
    exitTimer.current = window.setTimeout(() => {
      element?.pause();
      if (destination) window.location.assign(destination);
      else onComplete();
    }, 2020);
  };
  useEffect(() => () => {
    levelRequest.current++;
    cancelAnimationFrame(exitFrame.current); clearTimeout(exitTimer.current); clearTimeout(revealTimer.current);
    void audioContext.current?.close().catch(() => {});
  }, []);
  useEffect(() => {
    if (exiting) return;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.current?.focus();
    return () => { document.body.style.overflow = overflow; previous?.focus(); };
  }, [exiting]);
  useEffect(() => {
    let disposed = false;
    let posterReady = false;
    let settled = false;
    let fallbackUrl = '';
    const abort = new AbortController();
    let fallbackDownloaded = false;
    const timer = window.setTimeout(() => {
      if (!disposed && !settled) { settled = true; abort.abort(); video.current?.pause(); setState('error'); }
    }, 45000);
    capturing.current = false;
    nativeFallback.current = false;
    setDownloadProgress(0); setSrc('');
    setReady(false); setShowChoices(false); setShowPoster(false); setState('loading');
    // Download the small compatibility encode explicitly. Do not depend on
    // Safari's pre-play buffer policy. Progress measures actual received bytes.
    const element = video.current;
    const check = () => {
      if (disposed || settled || !posterReady || !element) return;
      if (fallbackDownloaded) {
        settled = true; clearTimeout(timer); setReady(true); setState('ready'); return;
      }
      if (element.readyState < 3) return;
      for (let i = 0; i < element.buffered.length; i++) {
        if (element.buffered.start(i) <= 0.05 && element.buffered.end(i) >= videoEnd + 1.2) {
          settled = true; clearTimeout(timer); setReady(true); setState('ready'); break;
        }
      }
    };
    const fail = () => { if (!disposed) { settled = true; clearTimeout(timer); setState('error'); } };
    element?.addEventListener('canplay', check);
    element?.addEventListener('progress', check);
    const poll = window.setInterval(check, 250);
    // Some mobile browsers refuse to preload 12s until play() is called.
    // Fetching the compact file explicitly breaks that circular wait, while
    // retaining complete opening data and the same audio/video clock.
    const fallbackTimer = window.setTimeout(() => {
      if (settled || disposed) return;
      void fetch(source, {signal:abort.signal, cache:'force-cache'}).then(async response => {
        if (!response.ok || !response.headers.get('content-type')?.includes('video/')) throw new Error('Invalid media');
        const total = Number(response.headers.get('content-length'));
        let blob: Blob;
        if (response.body) {
          const reader = response.body.getReader();
          const chunks: Uint8Array<ArrayBuffer>[] = [];
          let received = 0;
          while (true) {
            const {done, value} = await reader.read();
            if (done) break;
            if (disposed || settled) { await reader.cancel(); return; }
            chunks.push(new Uint8Array(value)); received += value.byteLength;
            setDownloadProgress(total > 0 ? Math.min(99, Math.floor(received / total * 100)) : null);
          }
          blob = new Blob(chunks, {type:'video/mp4'});
        } else { setDownloadProgress(null); blob = await response.blob(); }
        if (!blob.size) throw new Error('Empty media');
        if (disposed || settled) return;
        setDownloadProgress(100);
        fallbackUrl = URL.createObjectURL(blob);
        fallbackDownloaded = true;
        setSrc(fallbackUrl);
        if (element) { element.src = fallbackUrl; element.load(); }
        check();
      }).catch(() => { if (!disposed && !settled) fail(); });
    }, 0);
    const image = poster.current;
    const titleImage = new Image();
    titleImage.src = '/opening/lotus-calligraphy-v1.webp';
    if (image) {
      image.src = posterSource;
      // A decorative title must never block video playback.
      void titleImage.decode().catch(() => {});
      void image.decode().then(() => { posterReady = true; check(); }, () => {
        // The video itself retains the last frame if the companion image fails.
        posterReady = true; check();
      });
    }
    return () => {
      disposed = true; abort.abort(); clearTimeout(timer); clearTimeout(fallbackTimer); clearInterval(poll);
      element?.removeEventListener('canplay', check);
      element?.removeEventListener('progress', check);
      element?.pause();
      element?.removeAttribute('src'); element?.load();
      if (fallbackUrl) URL.revokeObjectURL(fallbackUrl);
    };
  }, [attempt]);
  useEffect(() => {
    if (state !== 'ready' || !ready) return;
    if (document.hidden) { setState('paused'); return; }
    const element = video.current;
    if (!element) return;
    let cancelled = false;
    const timer = window.setTimeout(() => {
      cancelled = true; element.pause(); setState('paused');
    }, 12000);
    void (async () => {
      try { await element.play(); }
      catch (error) {
        if (cancelled) return;
        // Only autoplay permission failures warrant a muted retry. Decode and
        // network errors must not be disguised as a sound preference change.
        if (error instanceof DOMException && error.name === 'NotAllowedError' && !document.hidden) {
          element.muted = true;
          setMuted(true);
          try { await element.play(); }
          catch { if (!cancelled) setState('paused'); }
        } else { setState('paused'); }
      } finally { clearTimeout(timer); }
    })();
    return () => { cancelled = true; clearTimeout(timer); };
  }, [ready, state]);
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
  return <div className={`seasonal-opening${exiting ? ' is-exiting' : ''}`} ref={dialog} inert={exiting} aria-hidden={exiting} role="dialog" aria-modal={!exiting} aria-label="本期海报序章" tabIndex={-1}
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
      onWaiting={() => {
        // Initial decoding also emits waiting. Pausing here before playing
        // aborts the pending autoplay promise and prevents its muted retry.
        if (state === 'playing') { video.current?.pause(); setState('paused'); }
      }}
      onTimeUpdate={() => {
        if ((video.current?.currentTime ?? 0) >= videoEnd) freezeFrame();
        if ((video.current?.currentTime ?? 0) >= 10 && !showChoices) {
          setShowChoices(true);
          try { localStorage.setItem(openingKey, 'seen'); } catch { /* storage optional */ }
        }
      }}
      onError={() => {
        // Some deployed CSPs / Safari versions reject blob media. The same
        // downloaded URL can still be played natively after an explicit tap.
        if (src.startsWith('blob:') && !nativeFallback.current) {
          nativeFallback.current = true; setSrc(source); setReady(true); setState('paused');
        } else if (src) setState('error');
      }} onEnded={() => { setShowChoices(true); setState('ended'); }} />
    <img ref={poster} className={`seasonal-opening-still${showPoster ? ' is-visible' : ''}`} alt="莲花照亮水下的镜昕" aria-hidden={!showPoster} />
    <div className="seasonal-opening-tools">
      <button onClick={() => {
        // Apply in the gesture itself, before Safari's user activation expires.
        if (video.current) video.current.muted = !muted;
        setMuted(!muted); if (state === 'paused') play();
      }} aria-pressed={muted}>{muted ? '开启声音' : '静音'}</button>
      {state === 'playing' && <button onClick={() => video.current?.pause()}>暂停</button>}
      {showChoices && state === 'paused' && <button onClick={play}>继续播放</button>}
      <button onClick={() => finish()}>跳过序章</button>
    </div>
    {showChoices && <div className="opening-editorial-stage"><section className="opening-editorial" aria-label="泥沼生花，水月照心">
      <img className="opening-calligraphy" src="/opening/lotus-calligraphy-v1.webp" alt="泥沼生花，水月照心" width="1536" height="1024" />
      <div className="seasonal-opening-choices" aria-label="序章结束后的选择">
      <button disabled={!commerce.featuredProductUrl || exiting} onClick={() => finish(commerce.featuredProductUrl || undefined)}>
        立即购买{!commerce.featuredProductUrl && <small>即将开放</small>}
      </button>
      <button disabled={exiting} onClick={() => finish()}>进入主页</button>
    </div><FlowerStory slug="jingxin" onOpenChange={open => setMusicLevel(open ? .18 : 1, 3)} /></section></div>}
    {(state === 'loading' || state === 'ready') && <div className="opening-download" role="status">
      <strong>{downloadProgress === null ? '正在下载' : `${downloadProgress}%`}</strong>
      <small>{downloadProgress === 100 ? '正在准备播放' : '载入影像'}</small>
    </div>}
    {state === 'error' && <div className="opening-recovery"><p role="status">影像暂未载入</p><button onClick={() => setAttempt(n => n + 1)}>重试</button></div>}
    {state === 'paused' && !showChoices && <button className="opening-resume" onClick={play} aria-label="继续播放">▷<small>轻触，入此水境</small></button>}
  </div>;
}
