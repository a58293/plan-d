/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeGallery from "./components/HomeGallery";
import StudioIntro from "./components/StudioIntro";

// 路由组件懒加载 (Lazy Loading)
const GraphicDesignGallery = lazy(() => import("./components/GraphicDesignGallery"));
const GraphicDesignDetail = lazy(() => import("./components/GraphicDesignDetail"));
const IllustrationGallery = lazy(() => import("./components/IllustrationGallery"));
const SpatialDesignGallery = lazy(() => import("./components/SpatialDesignGallery"));
const MCNGallery = lazy(() => import("./components/MCNGallery"));
const InstallationGallery = lazy(() => import("./components/InstallationGallery"));
const ProductDesignDetail = lazy(() => import("./components/ProductDesignDetail"));
const LogoGallery = lazy(() => import("./components/LogoGallery"));

function Home() {
  return (
    <main className="min-h-screen w-full bg-white">
      <HomeGallery />
      <StudioIntro />
    </main>
  );
}

function GraphicDesign() {
  return (
    <main className="min-h-screen w-full bg-white">
      <GraphicDesignGallery />
    </main>
  );
}

function LogoCollection() {
  return (
    <main className="min-h-screen w-full bg-white">
      <LogoGallery />
    </main>
  );
}

// 页面切换时的加载占位符
const PageLoader = () => (
  <div className="min-h-screen w-full bg-white flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-gray-200 border-t-black rounded-full animate-spin"></div>
  </div>
);

export default function App() {
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/graphic" element={<GraphicDesign />} />
          <Route path="/graphic/:id" element={<GraphicDesignDetail />} />
          <Route path="/logos" element={<LogoCollection />} />
          <Route path="/illustration" element={<IllustrationGallery />} />
          <Route path="/spatial" element={<SpatialDesignGallery />} />
          <Route path="/mcn" element={<MCNGallery />} />
          <Route path="/installation" element={<InstallationGallery />} />
          <Route path="/installation/:id" element={<ProductDesignDetail />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
