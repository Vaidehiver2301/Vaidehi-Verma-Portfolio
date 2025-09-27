import React from 'react';

interface IconProps {
  className?: string;
}

const VLogoIcon: React.FC<IconProps> = ({ className }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M6 4l6 16 6-16"></path>
    </svg>
  );
};

export default VLogoIcon;
