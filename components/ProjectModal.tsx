import React, { useState, useEffect } from 'react';
import { Project } from './Projects';
import CloseIcon from './icons/CloseIcon';
import GitHubIcon from './icons/GitHubIcon';
import ExternalLinkIcon from './icons/ExternalLinkIcon';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    // Wait for animation to finish before calling onClose
    setTimeout(onClose, 300); 
  };
  
  // Handle Escape key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div 
        className="fixed inset-0 z-50 flex items-center justify-center"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
    >
        {/* Backdrop */}
        <div 
            className={`modal-backdrop ${isClosing ? 'is-closing' : ''}`}
            onClick={handleClose}
        ></div>

        {/* Modal Content */}
        <div className={`modal-content ${isClosing ? 'is-closing' : ''} bg-[#161616] w-11/12 md:w-3/4 lg:w-2/3 max-w-4xl h-5/6 rounded-lg overflow-hidden flex flex-col`}>
            {/* Header */}
            <div className="flex-shrink-0 p-4 md:p-6 flex justify-between items-center border-b border-gray-800">
                <h2 id="modal-title" className="text-2xl md:text-3xl font-bold">{project.title}</h2>
                <button 
                    onClick={handleClose} 
                    className="p-2 rounded-full hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                    aria-label="Close project details"
                >
                    <CloseIcon className="w-6 h-6" />
                </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-grow p-4 md:p-6 overflow-y-auto">
                <div className="w-full aspect-video rounded-lg overflow-hidden mb-6">
                     <img src={project.images[0]} alt={`${project.title} primary screenshot`} className="w-full h-full object-cover" />
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <h3 className="text-xl font-bold mb-2 text-gray-200">About the Project</h3>
                        <p className="text-gray-400 mb-6">{project.longDescription}</p>
                    </div>

                    <div className="lg:col-span-1">
                        <h3 className="text-xl font-bold mb-3 text-gray-200">Technologies</h3>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {project.tags.map(tag => (
                                <span key={tag} className="bg-gray-800 text-gray-300 text-sm px-3 py-1 rounded-full">{tag}</span>
                            ))}
                        </div>
                        
                        <h3 className="text-xl font-bold mb-3 text-gray-200">Links</h3>
                         <div className="space-y-3">
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors">
                                <ExternalLinkIcon className="w-5 h-5" />
                                <span>View Live Demo</span>
                            </a>
                             <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors">
                                <GitHubIcon className="w-5 h-5" />
                                <span>Source Code</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ProjectModal;