import { useEffect, useState } from 'react';
import Preloader from './components/Preloader.jsx';
import Hero from './components/Hero.jsx';
import Social from './components/Social.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Projects from './components/Projects.jsx';
import Education from './components/Education.jsx';
import Freelance from './components/Freelance.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import Nav from './components/Nav.jsx';
import { revealSupported } from './hooks/reveal.js';

export default function App() {
  const [ready, setReady] = useState(false);

  // Hidden "pre-reveal" states only apply when IntersectionObserver exists,
  // so content can never stay invisible if the observer is unavailable.
  useEffect(() => {
    if (revealSupported()) document.documentElement.classList.add('rv-on');
    return () => document.documentElement.classList.remove('rv-on');
  }, []);

  return (
    <>
      <Preloader onLeave={() => setReady(true)} />
      {/* inert keeps hidden content out of the tab order / a11y tree until the loader is dismissed */}
      <div className="app" data-ready={ready} inert={!ready}>
        <Hero />
        <main>
          <Social />
          <About />
          <Skills />
          <Projects />
          <Education />
          <Freelance />
          <Contact />
        </main>
        <Footer />
        <Nav />
      </div>
    </>
  );
}
