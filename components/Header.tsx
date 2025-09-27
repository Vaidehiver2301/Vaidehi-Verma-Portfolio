import React, { useState } from 'react';
import MenuIcon from './icons/MenuIcon';
import CloseIcon from './icons/CloseIcon';
import VLogoIcon from './icons/VLogoIcon';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#contact', label: 'Contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }

    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };
  
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetElement = document.getElementById('home');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <header className="absolute top-0 left-0 right-0 z-30">
      <nav className="container mx-auto px-4 sm:px-6 md:px-12 py-8 flex justify-between items-center">
        <a href="#home" onClick={handleLogoClick} className="w-10 h-10 flex items-center justify-center z-50 group" aria-label="Go to home page">
          <VLogoIcon className="w-7 h-7 text-[#F5F5F5] group-hover:text-gray-300 transition-colors duration-300" />
        </a>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-12 text-lg">
          {navLinks.map(link => (
            <a 
              key={link.label} 
              href={link.href} 
              onClick={(e) => handleLinkClick(e, link.href)} 
              className="hover:text-gray-300 transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile Nav Button */}
        <button 
          className="md:hidden z-50 text-[#F5F5F5]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <CloseIcon className="w-8 h-8" /> : <MenuIcon className="w-8 h-8" />}
        </button>

        {/* Mobile Menu Overlay */}
        <div 
          className={`
            fixed inset-0 bg-[#111111]/95 backdrop-blur-md z-40
            transform transition-transform duration-300 ease-in-out
            ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
            md:hidden
          `}
        >
          <div className="flex flex-col items-center justify-center h-full space-y-10 text-3xl">
            {navLinks.map(link => (
              <a 
                key={link.label} 
                href={link.href} 
                onClick={(e) => handleLinkClick(e, link.href)} 
                className="hover:text-gray-300 transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;