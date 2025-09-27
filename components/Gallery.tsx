import React, { useState, useEffect, useCallback, useRef } from 'react';
import CloseIcon from './icons/CloseIcon';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';

const galleryImages = [
  { src: "https://res.cloudinary.com/dggajdbuf/image/upload/v1757562489/IMG_1068_qofa2a.jpg", alt: "Laptop with code on screen" },
  { src: "https://res.cloudinary.com/dggajdbuf/image/upload/v1757562489/IMG_6351_fom3hr.jpg", alt: "Web development setup" },
  { src: "https://res.cloudinary.com/dggajdbuf/image/upload/v1757562491/IMG_1421_s7w2jd.jpg", alt: "Team collaborating around a table" },
  { src: "https://res.cloudinary.com/dggajdbuf/image/upload/v1757562492/IMG_0431_jwnves.jpg", alt: "Mobile UI designs" },
  { src: "https://res.cloudinary.com/dggajdbuf/image/upload/v1757562491/IMG_9922_jdbrf2.jpg", alt: "Clean desk setup with laptop and tablet" },
  { src: "https://res.cloudinary.com/dggajdbuf/image/upload/v1757562493/IMG_0706_czzgvk.jpg", alt: "Woman working on a laptop in a creative space" },
];

const Gallery: React.FC = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const isLightboxOpen = selectedImageIndex !== null;

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

  const handleOpen = (index: number) => {
    setSelectedImageIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedImageIndex(null);
      setIsClosing(false);
      document.body.style.overflow = '';
    }, 300);
  }, []);

  const handleNext = useCallback(() => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prev) => (prev! + 1) % galleryImages.length);
    }
  }, [selectedImageIndex]);

  const handlePrev = useCallback(() => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prev) => (prev! - 1 + galleryImages.length) % galleryImages.length);
    }
  }, [selectedImageIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, handleClose, handleNext, handlePrev]);

  return (
    <>
      <section id="gallery" ref={sectionRef} className="scroll-animate py-24 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Image Gallery
          </h2>
          <p className="text-lg text-gray-400 text-center max-w-2xl mx-auto mb-12 md:mb-16">
            Photography is my creative outlet and a way to capture the beauty in everyday moments. This gallery is a small collection of my favorite shots, showcasing my passion for light, composition, and storytelling.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer"
                onClick={() => handleOpen(index)}
                role="button"
                aria-label={`View image ${index + 1} of ${galleryImages.length}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {isLightboxOpen && selectedImageIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop */}
          <div
            className={`modal-backdrop ${isClosing ? 'is-closing' : ''}`}
            onClick={handleClose}
          ></div>
          
          {/* Content */}
          <div className={`modal-content ${isClosing ? 'is-closing' : ''} relative w-11/12 h-5/6 max-w-6xl flex items-center justify-center`}>
            <img
              src={galleryImages[selectedImageIndex].src}
              alt={galleryImages[selectedImageIndex].alt}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Close image viewer"
            >
              <CloseIcon className="w-6 h-6" />
            </button>

             {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors focus:outline-none focus:ring-2 focus:ring-white md:left-8"
              aria-label="Previous image"
            >
              <ChevronLeftIcon className="w-8 h-8" />
            </button>

             {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors focus:outline-none focus:ring-2 focus:ring-white md:right-8"
              aria-label="Next image"
            >
              <ChevronRightIcon className="w-8 h-8" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;