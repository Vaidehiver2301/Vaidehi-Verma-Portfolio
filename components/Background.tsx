import React, { useRef, useEffect } from 'react';

interface BackgroundProps {
}

const Background: React.FC<BackgroundProps> = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosition = useRef({ x: -1000, y: -1000 }); // Start off-screen

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const hexRadius = 30;
    const hexWidth = Math.sqrt(3) * hexRadius;
    const hexHeight = 2 * hexRadius;
    const horizDist = hexWidth;
    const vertDist = hexHeight * 0.75;
    
    let maxInfluenceRadius = Math.min(width, height) * 0.4;

    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current = { x: event.clientX, y: event.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    const drawHexagon = (x: number, y: number, opacity: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const pointX = x + hexRadius * Math.cos(angle);
        const pointY = y + hexRadius * Math.sin(angle);
        if (i === 0) {
            ctx.moveTo(pointX, pointY);
        } else {
            ctx.lineTo(pointX, pointY);
        }
      }
      ctx.closePath();
      
      const finalOpacity = 0.04 + opacity * 0.25;
      ctx.strokeStyle = `rgba(245, 245, 245, ${finalOpacity})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let row = 0; (row * vertDist) < height + hexHeight; row++) {
        for (let col = 0; (col * horizDist) < width + hexWidth; col++) {
          const xOffset = (row % 2) * (horizDist / 2);
          const x = col * horizDist + xOffset;
          const y = row * vertDist;

          const dx = x - mousePosition.current.x;
          const dy = y - mousePosition.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          const opacity = Math.max(0, 1 - distance / maxInfluenceRadius);

          drawHexagon(x, y, opacity);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      maxInfluenceRadius = Math.min(width, height) * 0.4;
    };
    window.addEventListener('resize', handleResize);
    
    // Set initial mouse position to center for a nice fade-in effect on load (desktop only)
    setTimeout(() => {
        mousePosition.current = { x: width/2, y: height/2 };
    }, 100);

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []); // No dependencies, runs once on mount

  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 bg-[#111111]">
        <canvas ref={canvasRef} className="w-full h-full block opacity-80" />
    </div>
  );
};

export default Background;