
import React from 'react';
import LinkedInIcon from './icons/LinkedInIcon';
import MailIcon from './icons/MailIcon';
import GitHubIcon from './icons/GitHubIcon';

const SocialSidebar: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-20">
      <div className="flex flex-row items-center space-x-6 px-4 py-2 bg-black/20 backdrop-blur-sm border border-white/20 rounded-full">
        <a href="#" aria-label="LinkedIn" className="text-gray-300 hover:text-white transition-colors">
          <LinkedInIcon className="w-6 h-6" />
        </a>
        <a href="#" aria-label="Email" className="text-gray-300 hover:text-white transition-colors">
          <MailIcon className="w-6 h-6" />
        </a>
        <a href="#" aria-label="GitHub" className="text-gray-300 hover:text-white transition-colors">
          <GitHubIcon className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
};

export default SocialSidebar;
