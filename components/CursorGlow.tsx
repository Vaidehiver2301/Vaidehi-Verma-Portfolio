
import React from 'react';

interface CursorGlowProps {
  position: { x: number; y: number };
  isHovering: boolean;
}

const CursorGlow: React.FC<CursorGlowProps> = ({ position, isHovering }) => {
  const glowStyle: React.CSSProperties = {
    position: 'fixed',
    top: position.y,
    left: position.x,
    width: '500px',
    height: '500px',
    transform: 'translate(-50%, -50%)',
    background: `radial-gradient(circle, rgba(245, 245, 245, ${isHovering ? 0.1 : 0.06}) 0%, rgba(245, 245, 245, 0) 70%)`,
    pointerEvents: 'none',
    zIndex: 5,
    transition: 'transform 0.1s ease-out, background 0.2s ease-in-out',
  };

  return <div style={glowStyle} />;
};

export default CursorGlow;
