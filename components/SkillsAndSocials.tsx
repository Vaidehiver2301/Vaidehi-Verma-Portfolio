import React, { useEffect, useRef } from 'react';
import LinkedInIcon from './icons/LinkedInIcon';
import MailIcon from './icons/MailIcon';
import GitHubIcon from './icons/GitHubIcon';

const skills = [
  "JavaScript", "TypeScript", "React", "Next.js", "Node.js", 
  "Tailwind CSS", "Figma", "GraphQL", "PostgreSQL", 
  "HTML5", "CSS3", "Git"
];

const SkillsAndSocials: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);

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
    <section id="skills" ref={sectionRef} className="scroll-animate py-20 md:py-24 bg-black/20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Skills */}
            <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center lg:text-left">
                    Skills & Tools
                </h2>
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                    {skills.map(skill => (
                        <span key={skill} className="bg-gray-800 text-gray-300 text-base px-4 py-2 rounded-full transition-colors hover:bg-gray-700 hover:text-white">
                            {skill}
                        </span>
                    ))}
                </div>
            </div>

            {/* Socials */}
            <div className="text-center lg:text-left">
                 <h2 className="text-3xl md:text-4xl font-bold mb-8">
                    Let's Connect
                </h2>
                 <div className="flex justify-center lg:justify-start items-center space-x-8">
                    <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-white transition-transform duration-300 hover:scale-110">
                    <LinkedInIcon className="w-8 h-8" />
                    </a>
                    <a href="#" aria-label="Email" className="text-gray-400 hover:text-white transition-transform duration-300 hover:scale-110">
                    <MailIcon className="w-8 h-8" />
                    </a>
                    <a href="#" aria-label="GitHub" className="text-gray-400 hover:text-white transition-transform duration-300 hover:scale-110">
                    <GitHubIcon className="w-8 h-8" />
                    </a>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsAndSocials;
