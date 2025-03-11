import React, { useEffect, useState, useRef, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { debounce } from 'lodash';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
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
      <Helmet>
        <title>Corey Paskewitz | Web Developer & Software Engineer</title>
        <meta name="description" content="Portfolio of Corey Paskewitz, a web developer and software engineer specializing in React, TypeScript, and modern web technologies." />
        <meta name="keywords" content="web developer, software engineer, react, typescript, portfolio" />
        <meta property="og:title" content="Corey Paskewitz | Web Developer & Software Engineer" />
        <meta property="og:description" content="Portfolio of Corey Paskewitz, a web developer and software engineer specializing in React, TypeScript, and modern web technologies." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Corey Paskewitz | Web Developer & Software Engineer" />
        <meta name="twitter:description" content="Portfolio of Corey Paskewitz, a web developer and software engineer specializing in React, TypeScript, and modern web technologies." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Corey Paskewitz",
            "jobTitle": "Web Developer & Software Engineer",
            "knowsAbout": ["React", "TypeScript", "Web Development", "Software Engineering"],
          })}
        </script>
      </Helmet>

      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {isNavbarVisible && <Navbar activeSection={activeSection} />}

      <main id="main-content">
        <Suspense fallback={<LoadingSpinner />}>
          <Hero projectsRef={projectsRef} />
          <div ref={aboutRef} id="about">
            <About />
          </div>
          <div ref={projectsRef} id="projects">
            <Projects />
          </div>
          <div ref={contactRef} id="contact">
            <Contact />
          </div>
        </Suspense>
      </main>

      <Footer />
    </>
  );
}

export default App;