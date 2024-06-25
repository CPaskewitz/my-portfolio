import React, { useEffect, useState, useRef } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import './app.scss';

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
      <Hero projectsRef={projectsRef} />
      <About />
      <div ref={projectsRef}>
        <Projects />
      </div>
      <Contact />
    </div>
  );
}

export default App;