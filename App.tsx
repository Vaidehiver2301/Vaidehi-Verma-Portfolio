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
  const [isMobile, setIsMobile] = useState(false); // New state for mobile detection

  useEffect(() => {
    // Media query for mobile detection (using a common breakpoint)
    const mobileMediaQuery = window.matchMedia('(max-width: 768px)');

    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    // Initial check
    setIsMobile(mobileMediaQuery.matches);

    // Listen for changes
    mobileMediaQuery.addEventListener('change', handleMediaQueryChange);

    return () => {
      mobileMediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []); // Empty dependency array means this runs once on mount

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Only handle mouse events if not on a mobile device
      if (isMobile) return;

      setCursorPosition({ x: event.clientX, y: event.clientY });
      
      const target = event.target as HTMLElement;
      if (target.closest('a, button, .cursor-pointer')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    // Add/remove event listener based on isMobile status
    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile]); // Re-run effect when isMobile changes

  return (
    <div className="relative w-full overflow-x-hidden bg-[#111111] text-[#F5F5F5] font-sans antialiased">
      {/* Conditionally render custom cursor and glow only on non-mobile devices */}
      {!isMobile && <CustomCursor position={cursorPosition} isHovering={isHovering} />}
      {!isMobile && <CursorGlow position={cursorPosition} isHovering={isHovering} />}
      <Background isMobile={isMobile} />
      <div className="relative z-10 flex flex-col">
        <Header />
        <main>
          <section id="home" className="min-h-screen flex items-center justify-center">
            <Hero isMobile={isMobile} />
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