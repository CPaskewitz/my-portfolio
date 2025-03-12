import React, { useEffect, useState, useRef, Suspense } from 'react';
import Helmet from './components/Helmet/Helmet';
import { debounce } from 'lodash';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import structuredData from './data/structuredData';
import { seoData } from './data/seoData';
import './app.scss';

const Hero = React.lazy(() => import('./components/Hero/Hero'));
const About = React.lazy(() => import('./components/About/About'));
const Projects = React.lazy(() => import('./components/Projects/Projects'));
const Contact = React.lazy(() => import('./components/Contact/Contact'));

const prefetchComponents = () => {
  const prefetch = (importFunc: () => Promise<any>) => {
    importFunc().catch(() => { });
  };

  setTimeout(() => prefetch(() => import('./components/About/About')), 1000);
  setTimeout(() => prefetch(() => import('./components/Projects/Projects')), 2000);
  setTimeout(() => prefetch(() => import('./components/Contact/Contact')), 3000);
};

const App: React.FC = () => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const projectsRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const handleScroll = debounce(() => {
    if (window.scrollY > window.innerHeight) {
      setIsNavbarVisible(true);
    } else {
      setIsNavbarVisible(false);
    }

    const scrollPosition = window.scrollY;

    const sections = [
      { id: 'about', ref: aboutRef },
      { id: 'projects', ref: projectsRef },
      { id: 'contact', ref: contactRef }
    ];

    for (const section of sections) {
      if (!section.ref.current) continue;

      const element = section.ref.current;
      const rect = element.getBoundingClientRect();

      if (rect.top <= 100 && rect.bottom >= 100) {
        setActiveSection(section.id);
        break;
      }
    }

    if (scrollPosition < window.innerHeight / 2) {
      setActiveSection('');
    }

  }, 100);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    prefetchComponents();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      handleScroll.cancel();
    };
  }, [handleScroll]);

  return (
    <>
      <Helmet
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        url={seoData.url}
        type={seoData.type}
        image={seoData.image}
      >
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {isNavbarVisible && <Navbar activeSection={activeSection} />}

      <main id="main-content">
        <Suspense fallback={<LoadingSpinner />}>
          <Hero projectsRef={projectsRef} />
          <div ref={aboutRef}>
            <About />
          </div>
          <div ref={projectsRef}>
            <Projects />
          </div>
          <div ref={contactRef}>
            <Contact />
          </div>
        </Suspense>
      </main>

      <Footer />
    </>
  );
}

export default App;