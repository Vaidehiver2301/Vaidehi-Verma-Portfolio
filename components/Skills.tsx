import React, { useEffect, useRef } from 'react';

const skills = [
  "JavaScript", "TypeScript", "React", "Next.js", "Node.js", 
  "Tailwind CSS", "Figma", "GraphQL", "PostgreSQL", 
  "HTML5", "CSS3", "Git"
];

const Skills: React.FC = () => {
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
    <section id="skills" ref={sectionRef} className="scroll-animate py-24 md:py-32 bg-black/20">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            Skills & Tools
        </h2>
        <p className="text-lg text-gray-400 text-center max-w-2xl mx-auto mb-12 md:mb-16">
            A look at the primary technologies and tools I use to bring ideas to life, from initial design to final deployment.
        </p>
        <div className="flex flex-wrap gap-3 justify-center max-w-3xl mx-auto">
            {skills.map(skill => (
                <span key={skill} className="bg-gray-800 text-gray-300 text-base px-4 py-2 rounded-full transition-colors hover:bg-gray-700 hover:text-white">
                    {skill}
                </span>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;