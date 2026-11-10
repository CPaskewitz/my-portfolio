import React from 'react';
import { CoreProvider } from './state/CoreContext';
import Backdrop from './components/Backdrop/Backdrop';
import HudNav from './components/HudNav/HudNav';
import Hero from './components/Hero/Hero';
import Dossier from './components/Dossier/Dossier';
import Capabilities from './components/Capabilities/Capabilities';
import ProjectionBay from './components/ProjectionBay/ProjectionBay';
import Uplink from './components/Uplink/Uplink';
import Channel from './components/Channel/Channel';
import StatusBar from './components/StatusBar/StatusBar';
import CommandPalette from './components/CommandPalette/CommandPalette';
import Reticle from './components/Reticle/Reticle';

// Meta tags and JSON-LD live in index.html so crawlers see them without running JS.
// The previous Helmet-based setup is in archive/components/Helmet.

const App: React.FC = () => (
  <CoreProvider>
    <a href="#main-content" className="skip-link">
      Skip to main content
    </a>
    <Backdrop />
    <HudNav />
    <main id="main-content">
      <Hero />
      <Dossier />
      <Capabilities />
      <ProjectionBay />
      <Uplink />
      <Channel />
    </main>
    <StatusBar />
    <CommandPalette />
    <Reticle />
  </CoreProvider>
);

export default App;
