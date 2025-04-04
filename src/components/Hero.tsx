import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ArrowRight } from 'lucide-react';
import LeadForm from './LeadForm';

const Hero = () => {
  const [showLeadForm, setShowLeadForm] = useState(false);

  const handleGetStarted = () => {
    setShowLeadForm(true);
  };

  const handleScheduleConsult = () => {
    // Create email parameters
    const subject = "Website Consultation Request";
    const body = "I would like to schedule a consultation about a website project.";
    
    // Construct the mailto URL with proper encoding
    const mailtoUrl = `mailto:nextwavedigitalsolutions@outlook.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open email client
    window.open(mailtoUrl, '_blank');
  };

  if (showLeadForm) {
    return <LeadForm />;
  }

  return (
    <div className="relative min-h-screen flex items-center">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary to-background" />
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-accent-aqua to-accent-indigo bg-clip-text text-transparent">
              Code You Own.
            </span>
            <br />
            <span className="text-white">Power You Keep.</span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Modern websites built with AI — hosted and versioned on GitHub.
            Take control of your digital presence with NextWave.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.button
              onClick={handleGetStarted}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-accent-indigo rounded-lg font-semibold text-white 
                       hover:shadow-[0_0_15px_#00FFF7] transition-shadow duration-300
                       flex items-center justify-center gap-2"
            >
              Get Started
              <ArrowRight size={20} />
            </motion.button>
            
            <motion.button
              onClick={handleScheduleConsult}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/10 backdrop-blur-md rounded-lg font-semibold
                       hover:bg-white/20 transition-colors duration-300
                       flex items-center justify-center gap-2"
            >
              <Github size={20} />
              Schedule a Free Consult
            </motion.button>
          </div>

          {/* AI Indicator */}
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute top-4 right-4 flex items-center gap-2 text-accent-aqua"
          >
            <div className="w-2 h-2 bg-accent-aqua rounded-full animate-pulse-slow" />
            <span className="text-sm">AI-Powered</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;