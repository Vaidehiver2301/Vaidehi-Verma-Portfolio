import React, { useState, FormEvent, useEffect, useRef } from 'react';
import LinkedInIcon from './icons/LinkedInIcon';
import MailIcon from './icons/MailIcon';
import GitHubIcon from './icons/GitHubIcon';

// This tells TypeScript that the 'emailjs' object exists on the window,
// as it's loaded from a CDN script in index.html.
declare const emailjs: any;

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
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
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
        setStatus('error');
        setStatusMessage('Please fill out all fields.');
        setTimeout(() => setStatus('idle'), 5000);
        return;
    }
    
    setStatus('sending');
    setStatusMessage('');

    // --- IMPORTANT ---
    // Replace these placeholder values with your actual EmailJS credentials.
    // You can find these in your EmailJS account dashboard.
    const serviceID = 'service_2yle2it';
    const templateID = 'template_ihf63si';
    const publicKey = 'a7XdjNnsI7WubjwWq';
    // -----------------

    emailjs.send(serviceID, templateID, formData, publicKey)
      .then(() => {
        setStatus('success');
        setStatusMessage("Message sent! I'll get back to you soon.");
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000); // Reset status after 5 seconds
      }, (error: any) => {
        setStatus('error');
        setStatusMessage('Something went wrong. Please try again.');
        console.error('EmailJS Error:', error);
        setTimeout(() => setStatus('idle'), 5000); // Reset status after 5 seconds
      });
  };

  const getButtonText = () => {
    switch (status) {
        case 'sending': return 'Sending...';
        case 'success': return 'Message Sent!';
        case 'error': return 'Try Again';
        default: return 'Send Message';
    }
  }

  return (
    <section id="contact" ref={sectionRef} className="scroll-animate py-24 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-400 mb-10">
            Have a project in mind, a question, or just want to connect? Feel free to send me a message or find me on other platforms.
          </p>
          
          <div className="mb-12">
            <a
                href="https://res.cloudinary.com/dggajdbuf/image/upload/v1771871428/ResumeVaidehi_j0ylln.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 border-2 border-[#F5F5F5] rounded-lg text-lg bg-[#F5F5F5] text-[#111111] hover:bg-transparent hover:text-[#F5F5F5] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#111111] focus:ring-white"
            >
                View My Resume
            </a>
          </div>
          
          <div className="flex justify-center items-center space-x-6 sm:space-x-8 mb-12">
              <a href="https://linkedin.com/in/vaidehi-verma-345875288" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-400 hover:text-white transition-transform duration-300 hover:scale-110">
                  <LinkedInIcon className="w-8 h-8" />
              </a>
              <a href="mailto:vaidehiverma640@gmail.com" aria-label="Email" className="text-gray-400 hover:text-white transition-transform duration-300 hover:scale-110">
                  <MailIcon className="w-8 h-8" />
              </a>
              <a href="https://github.com/Vaidehiver2301" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-gray-400 hover:text-white transition-transform duration-300 hover:scale-110">
                  <GitHubIcon className="w-8 h-8" />
              </a>
          </div>

          <form onSubmit={handleSubmit} noValidate className="text-left">
            <div className="mb-6">
              <label htmlFor="name" className="block text-gray-400 text-sm font-medium mb-2">Name</label>
              <input 
                type="text" 
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-black/20 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-400 transition-colors duration-300"
                placeholder="Your Name"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-400 text-sm font-medium mb-2">Email</label>
              <input 
                type="email" 
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-black/20 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-400 transition-colors duration-300"
                placeholder="Your Email"
              />
            </div>
            <div className="mb-8">
              <label htmlFor="message" className="block text-gray-400 text-sm font-medium mb-2">Message</label>
              <textarea 
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full bg-black/20 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-400 transition-colors duration-300"
                placeholder="Your message here..."
              />
            </div>
            <div className="text-center">
              <button 
                type="submit"
                disabled={status === 'sending'}
                className="px-8 py-3 border-2 border-[#F5F5F5] rounded-lg text-lg hover:bg-[#F5F5F5] hover:text-[#111111] focus:bg-[#F5F5F5] focus:text-[#111111] transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                aria-busy={status === 'sending'}
              >
                {getButtonText()}
              </button>
            </div>
          </form>
           {status !== 'idle' && status !== 'sending' && (
                <p className={`mt-6 text-center text-sm status-message-animate ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                    {statusMessage}
                </p>
            )}
            <div className="mt-24">
                <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Vaidehi Verma. All rights reserved.</p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
