import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">
          {/* Professional Photo */}
          <img
            src="https://res.cloudinary.com/dggajdbuf/image/upload/v1757513619/vaidehiIMG_shkkyh.jpg"
            alt="Vaidehi Verma"
            className="w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 flex-shrink-0 rounded-full object-cover border-4 border-gray-700"
          />

          {/* Biography */}
          <div className="max-w-xl text-center md:text-left">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              About Me
            </h2>
            <p className="text-lg text-gray-300 mb-4">
              I’m Vaidehi Verma, an Engineer specializing in Artificial Intelligence and Machine Learning. I enjoy solving complex problems with clarity and precision, combining strong analytical skills with creativity.
            </p>
            <p className="text-lg text-gray-300">
             My expertise spans Java problem-solving, MERN stack development, data cleaning, and Power BI, with a focus on building reliable and scalable solutions. I believe engineering is not just about writing code — it’s about creating innovative, dependable systems that inspire confidence and push ideas into reality.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
