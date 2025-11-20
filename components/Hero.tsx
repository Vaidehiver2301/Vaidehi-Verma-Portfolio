import React, { useState, useEffect, useRef } from 'react';

const TEXTS_TO_TYPE = ["a designer.", "an engineer.", "a developer."];
const TYPING_DELAY = 150;
const DELETING_DELAY = 75;
const NEXT_TEXT_DELAY = 2000;

// Particle interface
interface Particle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  alpha: number;
}

interface HeroProps {
    isMobile: boolean; // New prop for mobile detection
}

const Hero: React.FC<HeroProps> = ({ isMobile }) => {
  const [textIndex, setTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const name = "Vaidehi Verma";
  const [scrambledName, setScrambledName] = useState(name);
  const intervalRef = useRef<number | null>(null);
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -1000, y: -1000 });

  // Particle animation effect
  useEffect(() => {
    // If on mobile, stop any existing animation and do not set up new ones
    if (isMobile) {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas if it was rendered
        }
        return; // Exit early, no animation for mobile
    }

    // --- Desktop animation logic starts here ---
    const canvas = canvasRef.current;
    const container = containerRef.current;
    // Check if canvas and container exist, they might not be rendered on mobile
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const setCanvasDimensions = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };

    const createParticles = () => {
        particles = [];
        const particleCount = Math.floor((canvas.width * canvas.height) / 25000); // Adjust density
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2 + 1,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                alpha: Math.random() * 0.5 + 0.1,
            });
        }
    };
    
    const handleMouseMove = (event: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        mouse.current.x = event.clientX - rect.left;
        mouse.current.y = event.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.current.x = -1000;
      mouse.current.y = -1000;
    }

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x + p.radius < 0 || p.x - p.radius > canvas.width) p.vx *= -1;
            if (p.y + p.radius < 0 || p.y - p.radius > canvas.height) p.vy *= -1;

            const dx = p.x - mouse.current.x;
            const dy = p.y - mouse.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const interactionRadius = 150;
            
            if (dist < interactionRadius) {
                const force = 1 - (dist / interactionRadius);
                p.x += (dx / dist) * force * 1.2;
                p.y += (dy / dist) * force * 1.2;
            }

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(245, 245, 245, ${p.alpha})`;
            ctx.fill();
        });

        animationFrameId = requestAnimationFrame(animate);
    };

    const init = () => {
        setCanvasDimensions();
        createParticles();
        animate();
    };
    
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    const resizeObserver = new ResizeObserver(() => {
        cancelAnimationFrame(animationFrameId);
        init();
    });
    
    resizeObserver.observe(container);
    init();

    return () => {
        cancelAnimationFrame(animationFrameId);
        resizeObserver.disconnect();
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isMobile]); // Dependency on isMobile to re-run effect on mobile state change

  useEffect(() => {
    // Cleanup interval on component unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleTyping = () => {
      const currentText = TEXTS_TO_TYPE[textIndex];
      
      if (isDeleting) {
        // Deleting
        if (displayedText.length > 0) {
          setDisplayedText(currentText.substring(0, displayedText.length - 1));
        } else {
          setIsDeleting(false);
          setTextIndex((prevIndex) => (prevIndex + 1) % TEXTS_TO_TYPE.length);
        }
      } else {
        // Typing
        if (displayedText.length < currentText.length) {
          setDisplayedText(currentText.substring(0, displayedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), NEXT_TEXT_DELAY);
        }
      }
    };

    const timeout = setTimeout(handleTyping, isDeleting ? DELETING_DELAY : TYPING_DELAY);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, textIndex]);

  const handleMouseOver = () => {
    let iteration = 0;
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = window.setInterval(() => {
      const newName = name
        .split("")
        .map((letter, index) => {
          if (letter === ' ') {
            return ' ';
          }
          if (index < iteration) {
            return name[index];
          }
          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");
      
      setScrambledName(newName);
      
      if (iteration >= name.length) {
        if(intervalRef.current) clearInterval(intervalRef.current);
      }
      
      iteration += 1 / 3;
    }, 30);
  };

  const handleMouseLeave = () => {
      if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
      }
      setScrambledName(name);
  }

  const handleViewWorkClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const targetElement = document.getElementById('projects');
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={containerRef} className="relative w-full min-h-screen text-center flex flex-col items-center justify-center p-4">
      {/* Only render canvas element on non-mobile devices */}
      {!isMobile && <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none" />}
      <h1 
        className="relative text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-300 tracking-tight font-mono"
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        {scrambledName}
      </h1>
      <p className="relative mt-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-300 min-h-[32px] sm:min-h-[40px] md:min-h-[48px] lg:min-h-[56px]">
        I am {` `}
        <span>{displayedText}</span>
        <span className="cursor-blink inline-block w-[3px] h-7 md:h-8 lg:h-10 bg-gray-300 ml-1 translate-y-1"></span>
      </p>
      <button 
        onClick={handleViewWorkClick}
        className="relative mt-10 px-8 py-3 border-2 border-[#F5F5F5] rounded-lg text-lg hover:bg-[#F5F5F5] hover:text-[#111111] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#111111] focus:ring-white"
      >
        View my work
      </button>
    </div>
  );
};

export default Hero;