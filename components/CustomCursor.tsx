import React from 'react';

interface CustomCursorProps {
  position: { x: number; y: number };
  isHovering: boolean;
}

const CustomCursor: React.FC<CustomCursorProps> = ({ position, isHovering }) => {
  const cursorStyle: React.CSSProperties = {
    position: 'fixed',
    top: position.y,
    left: position.x,
    width: isHovering ? '32px' : '18px',
    height: isHovering ? '32px' : '18px',
    backgroundColor: isHovering ? 'transparent' : 'rgba(245, 245, 245, 0.8)',
    border: isHovering ? '1px solid rgba(245, 245, 245, 0.8)' : 'none',
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'none',
    zIndex: 50,
    transition: 'width 0.2s ease-in-out, height 0.2s ease-in-out, background-color 0.2s ease-in-out, border 0.2s ease-in-out',
    animation: isHovering ? 'none' : 'pulse 2s infinite ease-in-out',
  };

  return <div style={cursorStyle} />;
};

export default CustomCursor;