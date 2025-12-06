
import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Cube3D from './components/Cube3D';
import SectionWrapper from './components/SectionWrapper';
import { PERSONAL_INFO, EXPERIENCE_DATA, PROJECTS_DATA, SKILLS_DATA, SOCIAL_LINKS } from './constants';
import { ArrowRight, Download, Github, ExternalLink, Send, MapPin, Mail, Phone, Code2, MousePointer2 } from 'lucide-react';
import { motion } from 'framer-motion';

const App: React.FC = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = "Backend Developer | Node.js | Laravel";
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Typing effect
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, index + 1));
      index++;
      if (index > fullText.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate network delay for better UX before opening mail client
    setTimeout(() => {
      const { name, email, subject, message } = formData;
      
      // Construct the email body
      const emailBody = `Name: ${name}
Email: ${email}

Message:
${message}`;

      const mailtoLink = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(emailBody)}`;
      
      window.location.href = mailtoLink;
      
      setIsSubmitting(false);
      // Optional: clear form
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 800);
  };

  return (
    <div className="bg-dark min-h-screen text-slate-300 font-sans selection:bg-primary selection:text-white">
      <Navbar />

      {/* HERO SECTION - Full Screen 3D Banner */}
      <section id="home" className="h-screen w-full relative flex flex-col justify-center items-center overflow-hidden">
          
          {/* 3D Background */}
          <Cube3D />
          
          {/* Overlay Gradient for readability */}
          <div className="absolute inset-0 bg-dark/60 bg-gradient-to-t from-dark via-transparent to-dark/30 z-0 pointer-events-none"></div>

          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative z-10 text-center px-6 max-w-4xl mx-auto"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full mb-8 backdrop-blur-md hover:bg-white/10 transition-colors cursor-default"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              <span className="text-slate-200 font-mono text-xs tracking-wide">AVAILABLE FOR HIRE</span>
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-none tracking-tight drop-shadow-2xl">
              Hello, I'm <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-300 to-secondary animate-gradient-x">
                {PERSONAL_INFO.name.split(' ')[0]}
              </span>
            </h1>

            <div className="h-10 mb-8 flex justify-center">
              <span className="text-xl md:text-3xl font-mono text-primary/90 border-r-4 border-primary pr-3 drop-shadow-lg">
                &gt; {typedText}<span className="animate-pulse">_</span>
              </span>
            </div>

            <p className="text-lg md:text-xl text-slate-300/90 mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
              {PERSONAL_INFO.tagline} specialized in building high-performance APIs and scalable database architectures.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <a 
                href="#contact"
                className="group px-8 py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-all flex items-center gap-2 shadow-lg shadow-primary/25 hover:scale-105"
              >
                Hire Me <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="/resume.pdf"
                target="_blank"
                className="px-8 py-4 bg-white/5 border border-white/20 text-white font-bold rounded-lg hover:bg-white/10 backdrop-blur-md transition-all flex items-center gap-2 hover:scale-105 group"
              >
                Resume <Download size={20} className="group-hover:text-primary transition-colors" />
              </a>
            </div>
          </motion.div>

          {/* Mouse Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          >
            <div className="w-6 h-10 rounded-full border-2 border-slate-400 flex justify-center p-1">
              <motion.div 
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="w-1 h-2 bg-primary rounded-full"
              />
            </div>
            <span className="text-xs text-slate-500 font-mono tracking-widest uppercase">Scroll</span>
          </motion.div>
      </section>

      {/* ABOUT SECTION */}
      <SectionWrapper id="about" className="bg-dark-lighter/50">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
            <div className="relative bg-dark border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
               <h3 className="text-2xl font-bold text-white mb-6 font-mono flex items-center gap-2">
                 <Code2 className="text-primary" />
                 Technical Arsenal
               </h3>
               <div className="space-y-6">
                  {SKILLS_DATA.map((category, idx) => (
                    <div key={idx}>
                      <div className="flex items-center gap-3 mb-3 text-slate-200">
                        <category.icon size={18} className="text-secondary" />
                        <h4 className="font-bold text-sm uppercase tracking-wider">{category.title}</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map(skill => (
                          <span key={skill} className="px-3 py-1 bg-white/5 border border-white/10 rounded text-xs text-slate-300 hover:text-white hover:border-primary/50 transition-colors cursor-default">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-white mb-6">About Me</h2>
            <p className="text-lg text-slate-400 leading-relaxed mb-6">
              {PERSONAL_INFO.about}
            </p>
            <div className="grid grid-cols-2 gap-6 mt-8">
               <div className="p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-primary/30 transition-colors">
                  <h4 className="text-4xl font-bold text-white mb-1">3+</h4>
                  <p className="text-sm text-slate-400 font-mono">Years Experience</p>
               </div>
               <div className="p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-secondary/30 transition-colors">
                  <h4 className="text-4xl font-bold text-white mb-1">15+</h4>
                  <p className="text-sm text-slate-400 font-mono">Projects Shipped</p>
               </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* EXPERIENCE SECTION */}
      <SectionWrapper id="experience">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Work Experience</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">My professional journey in building scalable software solutions.</p>
        </div>

        <div className="relative border-l-2 border-white/10 ml-4 md:ml-1/2 space-y-12">
          {EXPERIENCE_DATA.map((job, index) => (
            <div key={index} className={`relative pl-8 md:pl-0 ${index % 2 === 0 ? 'md:pr-12 md:text-right md:ml-[-50%] md:mr-[50%]' : 'md:pl-12 md:ml-[50%]'}`}>
              {/* Dot */}
              <div className={`absolute top-0 w-5 h-5 bg-primary rounded-full ring-4 ring-dark z-10 
                ${index % 2 === 0 ? 'left-[-11px] md:right-[-11px] md:left-auto' : 'left-[-11px]'}`}></div>
              
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-dark-lighter p-8 rounded-2xl border border-white/10 hover:border-primary/30 transition-all shadow-lg group"
              >
                <span className="text-primary font-mono text-sm mb-2 block tracking-wide">{job.period}</span>
                <h3 className="text-2xl font-bold text-white mb-1">{job.role}</h3>
                <h4 className="text-lg text-secondary font-medium mb-4">@ {job.company}</h4>
                <p className="text-slate-400 mb-6 text-sm md:text-base leading-relaxed">{job.description}</p>
                
                <ul className={`text-sm text-slate-400 space-y-3 mb-6 ${index % 2 === 0 ? 'md:items-end' : ''} flex flex-col`}>
                  {job.achievements.map((ach, i) => (
                    <li key={i} className="flex items-start gap-2 group-hover:text-slate-300 transition-colors">
                       <span className={`mt-1.5 w-1.5 h-1.5 bg-primary rounded-full shrink-0 ${index % 2 === 0 ? 'md:order-2' : ''}`}></span>
                       <span className={index % 2 === 0 ? 'md:text-right' : 'text-left'}>{ach}</span>
                    </li>
                  ))}
                </ul>

                <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                  {job.tech.map(t => (
                    <span key={t} className="px-2 py-1 bg-white/5 text-xs rounded text-slate-300 border border-white/10 group-hover:border-white/20">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* PROJECTS SECTION */}
      <SectionWrapper id="projects" className="bg-dark-lighter/30">
         <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Featured Projects</h2>
          <p className="text-slate-400">A selection of technical projects I've engineered.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {PROJECTS_DATA.map((project, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -10 }}
              className="group bg-dark rounded-2xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all shadow-xl"
            >
              <div className="h-56 overflow-hidden relative">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-80"></div>
                <div className="absolute top-4 right-4 bg-dark/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono text-primary border border-primary/20">
                  {project.category}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-slate-400 mb-6 line-clamp-3 leading-relaxed text-sm">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.techStack.map(tech => (
                    <span key={tech} className="text-xs font-medium px-2.5 py-1 bg-white/5 text-slate-300 rounded-md border border-white/5">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                   <button className="flex-1 py-3 border border-white/10 rounded-xl hover:bg-white/5 transition-colors text-sm font-bold flex items-center justify-center gap-2 group/btn">
                     <Github size={18} className="group-hover/btn:text-white text-slate-400 transition-colors" /> 
                     <span className="text-slate-300 group-hover/btn:text-white">Code</span>
                   </button>
                   <button className="flex-1 py-3 bg-primary/10 border border-primary/20 text-primary rounded-xl hover:bg-primary/20 transition-colors text-sm font-bold flex items-center justify-center gap-2">
                     <ExternalLink size={18} /> Live Demo
                   </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* CONTACT SECTION */}
      <SectionWrapper id="contact">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl font-bold text-white mb-6">Let's build something amazing.</h2>
            <p className="text-slate-400 mb-12 text-lg">
              I'm currently available for freelance projects and full-time opportunities.
              If you need a robust backend architect, let's talk.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-primary border border-white/10 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Email Me</p>
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="text-lg font-medium text-white hover:text-primary transition-colors">
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-primary border border-white/10 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Call Me</p>
                  <a href={`tel:${PERSONAL_INFO.phone}`} className="text-lg font-medium text-white hover:text-primary transition-colors">
                    {PERSONAL_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-primary border border-white/10 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Location</p>
                  <p className="text-lg font-medium text-white">
                    {PERSONAL_INFO.location}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-12">
              {SOCIAL_LINKS.map(link => (
                <a 
                  key={link.platform} 
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary hover:border-primary hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-primary/20"
                >
                  <link.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <form className="bg-dark-lighter p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden" onSubmit={handleSubmit}>
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[50px] translate-x-1/2 -translate-y-1/2"></div>
             
             <div className="grid grid-cols-2 gap-6 mb-6">
               <div className="col-span-2 sm:col-span-1">
                 <label className="block text-sm text-slate-400 mb-2 font-medium">Name</label>
                 <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-dark border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all" 
                    placeholder="John Doe" 
                    required
                 />
               </div>
               <div className="col-span-2 sm:col-span-1">
                 <label className="block text-sm text-slate-400 mb-2 font-medium">Email</label>
                 <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-dark border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all" 
                    placeholder="john@example.com" 
                    required
                 />
               </div>
             </div>
             <div className="mb-6">
               <label className="block text-sm text-slate-400 mb-2 font-medium">Subject</label>
               <input 
                  type="text" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full bg-dark border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all" 
                  placeholder="Project Inquiry" 
                  required
               />
             </div>
             <div className="mb-8">
               <label className="block text-sm text-slate-400 mb-2 font-medium">Message</label>
               <textarea 
                  rows={4} 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full bg-dark border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all resize-none" 
                  placeholder="Tell me about your project..."
                  required
               ></textarea>
             </div>
             <button 
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-wait`}
             >
               {isSubmitting ? 'Opening Mail Client...' : 'Send Message'} <Send size={18} className={isSubmitting ? 'animate-pulse' : ''} />
             </button>
          </form>
        </div>
      </SectionWrapper>

      {/* FOOTER */}
      <footer className="py-8 bg-dark border-t border-white/10 text-center text-slate-500 text-sm">
         <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {new Date().getFullYear()} Manish Kumar Singh. All rights reserved.</p>
            <p className="mt-2 md:mt-0 flex items-center gap-2">
              Designed with <span className="text-red-500 animate-pulse">❤</span> and React.
            </p>
         </div>
      </footer>
    </div>
  );
};

export default App;
