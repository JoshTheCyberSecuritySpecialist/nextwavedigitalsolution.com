import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Moon, Sun, Github } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false); // Close mobile menu after clicking
  };

  return (
    <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-2xl font-bold bg-gradient-to-r from-accent-aqua to-accent-indigo bg-clip-text text-transparent cursor-pointer"
            >
              NextWave
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <button onClick={() => scrollToSection('about')} className="text-gray-300 hover:text-accent-aqua">About</button>
              <button onClick={() => scrollToSection('services')} className="text-gray-300 hover:text-accent-aqua">Services</button>
              <button onClick={() => scrollToSection('enterprise')} className="text-gray-300 hover:text-accent-aqua">Enterprise</button>
              <button onClick={() => scrollToSection('pricing')} className="text-gray-300 hover:text-accent-aqua">Pricing</button>
              <button onClick={() => scrollToSection('blog')} className="text-gray-300 hover:text-accent-aqua">Blog</button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-300 hover:text-accent-aqua">Contact</button>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-white/5 transition-colors"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-white/5"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button onClick={() => scrollToSection('about')} className="block w-full text-left px-3 py-2 text-gray-300 hover:text-accent-aqua">About</button>
            <button onClick={() => scrollToSection('services')} className="block w-full text-left px-3 py-2 text-gray-300 hover:text-accent-aqua">Services</button>
            <button onClick={() => scrollToSection('enterprise')} className="block w-full text-left px-3 py-2 text-gray-300 hover:text-accent-aqua">Enterprise</button>
            <button onClick={() => scrollToSection('pricing')} className="block w-full text-left px-3 py-2 text-gray-300 hover:text-accent-aqua">Pricing</button>
            <button onClick={() => scrollToSection('blog')} className="block w-full text-left px-3 py-2 text-gray-300 hover:text-accent-aqua">Blog</button>
            <button onClick={() => scrollToSection('contact')} className="block w-full text-left px-3 py-2 text-gray-300 hover:text-accent-aqua">Contact</button>
            <button
              onClick={toggleDarkMode}
              className="w-full text-left px-3 py-2 text-gray-300 hover:text-accent-aqua"
            >
              {isDark ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;