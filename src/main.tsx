import {lazy, StrictMode, Suspense, useState, useEffect, useCallback} from 'react';
import {createRoot} from 'react-dom/client';
import {categoryPages} from './category-pages';
import BrandLoadingScreen from './BrandLoadingScreen.tsx';
import {applyCustomFonts} from './custom-fonts';
import {trackInitialAssets} from './initial-assets';
import {resolveSiteRoute} from './flower-gods-catalog';
import {PageRevealContext} from './page-reveal-context';
import {applySiteMetadata} from './site-metadata';
import SiteErrorBoundary from './SiteErrorBoundary';
import SeasonalOpening, {shouldShowOpening} from './SeasonalOpening';
import './index.css';
import './typography-color.css';
import './brand-identity-refresh.css';
import './verification-demo.css';
import './managed-media.css';
import './series-scrolls.css';
import './home-product-theme.css';
import './custom-fonts.css';
import './mobile-compat.css';
import './ui-unified.css';
document.documentElement.classList.add('site-ui');
import MobileNavigation from './MobileNavigation';
import DesktopNavigation from './DesktopNavigation';

const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
applySiteMetadata(pathname);
const UnifiedBjdSite = lazy(() => import('./UnifiedBjdSite.tsx'));
const VerifyPage = lazy(() => import('./VerifyPage.tsx'));
const NotFoundPage = lazy(() => import('./NotFoundPage.tsx'));
const LegalPage = lazy(() => import('./LegalPage.tsx'));
const ReportPage = lazy(() => import('./ReportPage.tsx'));
const HelpPage = lazy(() => import('./HelpPage.tsx'));
const ContactPage = lazy(() => import('./ContactPage.tsx'));
const BodyCategoryPage = lazy(() => import('./BodyCategoryPage.tsx'));
const BodyIndexPage = lazy(() => import('./BodyIndexPage.tsx'));
const CategoryPage = lazy(() => import('./CategoryPage.tsx'));
const CollectorGallery = lazy(() => import('./CollectorGallery.tsx'));
const PhotoDetail = lazy(() => import('./PhotoDetail'));
const OpeningArchive = lazy(() => import('./OpeningArchive.tsx'));
const legalPage = pathname.match(/^\/legal\/(terms|authenticity)$/)?.[1] as 'terms' | 'authenticity' | undefined;
const pageCode = pathname === '/' ? import('./BjdApp')
  : pathname === '/series/flower-gods/jingxin' ? import('./FlowerGodsExperience')
  : pathname === '/series/flower-gods' ? import('./FlowerGodsCollection')
  : pathname === '/verify' ? import('./VerifyPage')
  : pathname === '/stories/openings' ? import('./OpeningArchive') : /^\/stories\/(collectors|official)\/[^/]+$/.test(pathname) ? import('./PhotoDetail') : ['/stories/collectors','/stories/official'].includes(pathname) ? import('./CollectorGallery') : categoryPages[pathname] ? import('./CategoryPage')
  : pathname === '/help' ? import('./HelpPage')
  : pathname === '/contact' ? import('./ContactPage')
  : pathname === '/report' ? import('./ReportPage')
  : legalPage ? import('./LegalPage') : import('./NotFoundPage');
const initialLoadStarted = performance.now();
const initialAssets = trackInitialAssets(pathname, pageCode);
let initialReadyAt:number|undefined;
void initialAssets.ready.then(()=>{initialReadyAt=performance.now();});
// Let the visible imagery win the network race; typography swaps in directly
// afterwards and remains cached for the rest of the visit.
const loaderSessionKey = 'lumen-intro-seen-v1';

function SiteRoot() {
  const [showOpening, setShowOpening] = useState(() => shouldShowOpening(pathname));
  const [openingTail, setOpeningTail] = useState(false);
  const [openingRun, setOpeningRun] = useState(0);
  useEffect(() => {
    const replay = () => { setOpeningTail(false); setOpeningRun(n => n + 1); setShowOpening(true); };
    window.addEventListener('lumen:replay-opening', replay);
    return () => window.removeEventListener('lumen:replay-opening', replay);
  }, []);
  useEffect(() => {
    if (!showOpening) void initialAssets.ready.then(() => applyCustomFonts());
  }, [showOpening]);
  const [showLoader, setShowLoader] = useState(() => {
    return true;
  });
  const [showLoaderAnimation,setShowLoaderAnimation]=useState(false);
  const finishLoader = useCallback(() => {
    try { window.sessionStorage.setItem(loaderSessionKey, 'yes'); } catch { /* storage may be unavailable */ }
    setShowLoader(false);
  },[]);
  useEffect(()=>{
    let cancelled=false;
    const timer=window.setTimeout(()=>{if(!cancelled)setShowLoaderAnimation(true);},Math.max(0,2000-(performance.now()-initialLoadStarted)));
    void initialAssets.ready.then(()=>{
      if(cancelled)return;
      if((initialReadyAt??performance.now())-initialLoadStarted<2000){window.clearTimeout(timer);finishLoader();}
      else setShowLoaderAnimation(true);
    });
    return()=>{cancelled=true;window.clearTimeout(timer);};
  },[finishLoader]);
  return (
    <>
      <div inert={showLoader || showOpening}>
      <PageRevealContext.Provider value={!showLoader && !showOpening}>
        <SiteErrorBoundary><Suspense fallback={null}>
          {pathname === '/stories/openings' ? <OpeningArchive/> : /^\/stories\/(collectors|official)\/[^/]+$/.test(pathname) ? <PhotoDetail/> : ['/stories/collectors','/stories/official'].includes(pathname) ? <CollectorGallery/> : categoryPages[pathname] ? <CategoryPage path={pathname}/> : pathname === '/bodies' || pathname === '/bodies/female' ? <BodyIndexPage female={pathname==='/bodies/female'}/> : pathname === '/bodies/female-70' ? <BodyCategoryPage /> : pathname === '/contact' ? <ContactPage /> : pathname === '/help' ? <HelpPage /> : pathname === '/report' ? <ReportPage /> : pathname === '/verify' ? <VerifyPage /> : legalPage ? <LegalPage page={legalPage} />
            : resolveSiteRoute(pathname).view !== 'not-found' ? <UnifiedBjdSite /> : <NotFoundPage />}
        </Suspense></SiteErrorBoundary>
      </PageRevealContext.Provider>
      </div>
      <MobileNavigation visible={!showLoader && !showOpening && !openingTail}/>
      {!showLoader && !showOpening && !openingTail && <DesktopNavigation />}
      {showLoader && (showLoaderAnimation?<BrandLoadingScreen tracker={initialAssets} onComplete={finishLoader} />:<div aria-label="页面准备中" style={{position:'fixed',inset:0,background:'#f8f7f2',zIndex:10000}}/>)}
      {!showLoader && (showOpening || openingTail) && <SeasonalOpening key={openingRun}
        onReveal={() => { setOpeningTail(true); setShowOpening(false); }}
        onComplete={() => { setOpeningTail(false); setShowOpening(false); }} />}
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SiteRoot />
  </StrictMode>,
);
