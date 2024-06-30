import React, { useEffect, useState, useRef, Suspense } from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import './app.scss';

const Hero = React.lazy(() => import('./components/Hero/Hero'));
const About = React.lazy(() => import('./components/About/About'));
const Projects = React.lazy(() => import('./components/Projects/Projects'));
const Contact = React.lazy(() => import('./components/Contact/Contact'));

const App: React.FC = () => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const projectsRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (window.scrollY > window.innerHeight) {
      setIsNavbarVisible(true);
    } else {
      setIsNavbarVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      {isNavbarVisible && <Navbar />}
      <Suspense fallback={<div>Loading...</div>}>
        <Hero projectsRef={projectsRef} />
        <About />
        <div ref={projectsRef}>
          <Projects />
        </div>
        <Contact />
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;