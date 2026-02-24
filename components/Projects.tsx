import React, { useState, useEffect, useRef, useCallback } from 'react';
import ProjectModal from './ProjectModal';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';

// Expanded project data for modal view
const projectsData = [
  {
    title: "Streamlit Web App - Data Analysis Tool",
    description: "This application is designed to help you perform basic data analysis",
    longDescription: "This application is designed to help you perform basic data analysis tasks directly in your web browser using Python and Streamlit. The app allows you to upload a dataset in CSV format and provides various features to explore and analyze the data.",
    tags: ["Python", "Streamlit"],
    liveUrl: "https://data-analys-is.streamlit.app/",
    repoUrl: "https://github.com/Vaidehiver2301/Streamlit-Web-App",
    images: [
      "https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516116216624-53e6973bea12?q=80&w=1200&auto=format&fit=crop"
    ],
  },
  {
    title: "Ecommerce Store Dashboard - Power BI",
    description: "the Power BI dashboard for an Ecommerce Store",
    longDescription: "the Power BI dashboard for an Ecommerce Store, designed to provide comprehensive insights into sales, profit, and customer behavior. The dashboard is built to help stakeholders make data-driven decisions by visualizing key metrics and trends.",
    tags: ["Power BI", "DAX"],
    liveUrl: "#",
    repoUrl: "https://github.com/Vaidehiver2301/EcommerceDashboard",
    images: [
      "https://res.cloudinary.com/dggajdbuf/image/upload/v1757513479/ECommerce_Dashboard_nhjtzc.png"
    ],
  },
  {
    title: "Student Database Application",
    description: "a console-based Java program designed to simulate a basic student management.",
    longDescription: "The Student Database Application is a console-based Java program designed to simulate a basic student enrollment and fee management system.",
    tags: [ "Java"],
    liveUrl: "https://github.com/Vaidehiver2301/StudentDatabaseApp/blob/main/StudentDatabaseApp.java",
    repoUrl: "https://github.com/Vaidehiver2301/StudentDatabaseApp",
    images: [
      "https://res.cloudinary.com/dggajdbuf/image/upload/v1771866440/Screenshot_2026-02-23_223533_a2wbcs.png"
    ],
  },
  {
    title: "Commitly-AI",
    description: "a productivity-focused web application",
    longDescription: "Commitly is a productivity-focused web application designed to help users track goals, manage tasks, and build consistent habits through structured commitments.",
    tags: [ "React", "Node.js", "Flask API"],
    liveUrl: "https://commitly-ai.netlify.app/",
    repoUrl: "https://github.com/Vaidehiver2301/Commitly",
    images: [
      "https://res.cloudinary.com/dggajdbuf/image/upload/v1771940575/Screenshot_2026-02-24_191211_q3dlx9.png"
    ],
  }
];

export interface Project {
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  liveUrl: string;
  repoUrl: string;
  images: string[];
}

const Projects: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const carouselRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const touchStartX = useRef(0);
    const wheelTimeout = useRef<number | null>(null);

    const openModal = (project: Project) => {
        setSelectedProject(project);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setSelectedProject(null);
        document.body.style.overflow = '';
    };

    const goNext = useCallback(() => {
        setActiveIndex(prev => (prev + 1) % projectsData.length);
    }, []);

    const goPrev = useCallback(() => {
        setActiveIndex(prev => (prev - 1 + projectsData.length) % projectsData.length);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') goNext();
            if (e.key === 'ArrowLeft') goPrev();
        };

        const handleWheel = (e: WheelEvent) => {
            if (document.activeElement !== carouselRef.current && !carouselRef.current?.contains(document.activeElement)) return;
            e.preventDefault();
            if (wheelTimeout.current) return;

            if (e.deltaY > 0 || e.deltaX > 0) goNext();
            else goPrev();
            
            wheelTimeout.current = window.setTimeout(() => { wheelTimeout.current = null; }, 300);
        };
        
        const handleTouchStart = (e: TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
        
        const handleTouchMove = (e: TouchEvent) => {
            if (touchStartX.current === 0) return;
            const touchEndX = e.touches[0].clientX;
            const diffX = touchStartX.current - touchEndX;

            if (Math.abs(diffX) > 40) { // Swipe threshold
                if (diffX > 0) goNext();
                else goPrev();
                touchStartX.current = 0; // Reset after swipe
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        const currentCarousel = carouselRef.current;
        if (currentCarousel) {
            currentCarousel.addEventListener('wheel', handleWheel, { passive: false });
            currentCarousel.addEventListener('touchstart', handleTouchStart);
            currentCarousel.addEventListener('touchmove', handleTouchMove);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            if (currentCarousel) {
                currentCarousel.removeEventListener('wheel', handleWheel);
                currentCarousel.removeEventListener('touchstart', handleTouchStart);
                currentCarousel.removeEventListener('touchmove', handleTouchMove);
            }
        };
    }, [goNext, goPrev]);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        }, { threshold: 0.1 });

        const currentRef = sectionRef.current;
        if (currentRef) observer.observe(currentRef);
        return () => { if (currentRef) observer.unobserve(currentRef); };
    }, []);

    return (
        <section id="projects" ref={sectionRef} className="scroll-animate py-24 md:py-32 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 md:px-12">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 md:mb-20">
                    My Projects
                </h2>

                <div 
                    ref={carouselRef} 
                    className="relative w-full h-[480px] sm:h-[520px] md:h-[550px] flex items-center justify-center"
                    tabIndex={0} // Make it focusable for wheel events
                >
                    <div className="w-full h-full" style={{ perspective: '1200px' }}>
                        <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
                            {projectsData.map((project, index) => {
                                const numItems = projectsData.length;
                                let displayOffset = index - activeIndex;
                                if (displayOffset > numItems / 2) displayOffset -= numItems;
                                else if (displayOffset < -numItems / 2) displayOffset += numItems;

                                const isCenter = index === activeIndex;
                                const placeholderImage = "https://via.placeholder.com/400x250/1a1a1a/4a4a4a?text=Project+Thumbnail";
                                const imageUrl = project.images && project.images.length > 0 ? project.images[0] : placeholderImage;

                                return (
                                    <div
                                        key={project.title}
                                        className="absolute top-0 left-0 w-full h-full flex items-center justify-center transition-transform duration-500 ease-in-out"
                                        style={{
                                            transform: `
                                                rotateY(${displayOffset * -25}deg)
                                                translateX(${displayOffset * 30}%)
                                                translateZ(${-Math.abs(displayOffset) * 150}px)
                                            `,
                                            zIndex: numItems - Math.abs(displayOffset),
                                            opacity: Math.abs(displayOffset) > 2 ? 0 : 1,
                                            pointerEvents: isCenter ? 'auto' : 'none',
                                        }}
                                    >
                                        <div className={`
                                            w-72 sm:w-80 h-[450px] bg-[#161616] rounded-xl overflow-hidden flex flex-col
                                            transition-[transform,opacity,box-shadow,border-color] duration-500 ease-in-out border border-transparent
                                            ${isCenter ? 'scale-100 shadow-2xl shadow-cyan-500/20 border-gray-700' : 'scale-90 opacity-50'}`
                                        }>
                                            <div className="w-full h-48 flex-shrink-0">
                                                <img src={imageUrl} alt={`${project.title} thumbnail`} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="p-6 flex flex-col flex-grow">
                                                <h3 className="text-xl font-bold text-gray-200 mb-2">{project.title}</h3>
                                                <p className="text-gray-400 text-base mb-4 flex-grow">{project.description}</p>
                                                <button
                                                    onClick={() => openModal(project)}
                                                    className="mt-auto w-full px-4 py-2 border border-gray-600 rounded-lg text-sm hover:bg-gray-800 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#111111] focus:ring-white disabled:opacity-50 disabled:cursor-not-allowed"
                                                    disabled={!isCenter}
                                                    aria-label={`View details for ${project.title}`}
                                                >
                                                    View Project
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Navigation Arrows */}
                    <button 
                        onClick={goPrev} 
                        className="absolute left-2 sm:left-0 md:-left-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-black/30 backdrop-blur-sm rounded-full text-white hover:bg-black/50 transition-all focus:outline-none focus:ring-2 focus:ring-white"
                        aria-label="Previous project"
                    >
                        <ChevronLeftIcon className="w-8 h-8" />
                    </button>
                    <button 
                        onClick={goNext} 
                        className="absolute right-2 sm:right-0 md:-right-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-black/30 backdrop-blur-sm rounded-full text-white hover:bg-black/50 transition-all focus:outline-none focus:ring-2 focus:ring-white"
                        aria-label="Next project"
                    >
                        <ChevronRightIcon className="w-8 h-8" />
                    </button>
                </div>
            </div>
            {selectedProject && (
                <ProjectModal project={selectedProject} onClose={closeModal} />
            )}
        </section>
    );
};

export default Projects;
