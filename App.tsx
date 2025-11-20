import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Background from './components/Background';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Skills from './components/Skills';
import Gallery from './components/Gallery';

const App: React.FC = () => {
  // Removed cursorPosition and isHovering state variables
  // Removed useEffect for mousemove listener

  return (
    <div className="relative w-full overflow-x-hidden bg-[#111111] text-[#F5F5F5] font-sans antialiased">
      {/* Removed CustomCursor and CursorGlow components */}
      <Background />
      <div className="relative z-10 flex flex-col">
        <Header />
        <main>
          <section id="home" className="min-h-screen flex items-center justify-center">
            <Hero />
          </section>
          <About />
          <Skills />
          <Projects />
          <Gallery />
          <Contact />
        </main>
      </div>
    </div>
  );
};

export default App;