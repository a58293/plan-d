/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeGallery from "./components/HomeGallery";
import GraphicDesignGallery from "./components/GraphicDesignGallery";
import IllustrationGallery from "./components/IllustrationGallery";
import SpatialDesignGallery from "./components/SpatialDesignGallery";
import StudioIntro from "./components/StudioIntro";
import MCNGallery from "./components/MCNGallery";
import InstallationGallery from "./components/InstallationGallery";
import ProductDesignDetail from "./components/ProductDesignDetail";

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

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/graphic" element={<GraphicDesign />} />
        <Route path="/illustration" element={<IllustrationGallery />} />
        <Route path="/spatial" element={<SpatialDesignGallery />} />
        <Route path="/mcn" element={<MCNGallery />} />
        <Route path="/installation" element={<InstallationGallery />} />
        <Route path="/installation/:id" element={<ProductDesignDetail />} />
      </Routes>
    </Router>
  );
}
