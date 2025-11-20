import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Background from './components/Background';
import CursorGlow from './components/CursorGlow';
import CustomCursor from './components/CustomCursor';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Skills from './components/Skills';
import Gallery from './components/Gallery';

const App: React.FC = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: -200, y: -200 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
      
      const target = event.target as HTMLElement;
      if (target.closest('a, button, .cursor-pointer')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="relative w-full overflow-x-hidden bg-[#111111] text-[#F5F5F5] font-sans antialiased">
      <CustomCursor position={cursorPosition} isHovering={isHovering} />
      <CursorGlow position={cursorPosition} isHovering={isHovering} />
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