import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">
          {/* Professional Photo */}
          <img
            src="https://res.cloudinary.com/dggajdbuf/image/upload/v1781536635/Vaidehi_jjcxl7.jpg"
            alt="Vaidehi Verma"
            className="w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 flex-shrink-0 rounded-full object-cover border-4 border-gray-700"
          />

          {/* Biography */}
          <div className="max-w-xl text-center md:text-left">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              About Me
            </h2>
            <p className="text-lg text-gray-300 mb-4">
              Hi, I'm Vaidehi Verma, a passionate designer and developer with a love for creating beautiful, intuitive, and highly functional user experiences. I thrive at the intersection of design and technology, transforming complex problems into elegant solutions.
            </p>
            <p className="text-lg text-gray-300">
              With a background in both creative arts and computer science, I bring a unique perspective to every project. When I'm not coding or designing, you can find me exploring new coffee shops, hiking, or getting lost in a good book.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
