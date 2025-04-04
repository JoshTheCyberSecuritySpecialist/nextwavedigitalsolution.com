import React from 'react';
import { motion } from 'framer-motion';
import { Server, Shield, Users, Cloud, Zap, Clock, Bot, Terminal } from 'lucide-react';

interface SupportCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const SupportCard: React.FC<SupportCardProps> = ({ icon: Icon, title, description }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10"
  >
    <Icon className="w-8 h-8 text-accent-aqua mb-4" />
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </motion.div>
);

const EnterpriseSupport = () => {
  return (
    <section id="enterprise" className="py-24 px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/50 via-background to-background -z-10" />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-indigo/20 border border-accent-aqua/20 mb-4"
          >
            <Bot className="text-accent-aqua w-5 h-5" />
            <span className="text-accent-aqua font-semibold">AI-Powered Support</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-accent-aqua to-accent-indigo bg-clip-text text-transparent">
              Enterprise Tech Support
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            From cloud to code, we've got your back. Our AI-enhanced support team ensures your systems 
            run smoothly, securely, and without interruption — 24/7.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <SupportCard
            icon={Server}
            title="Infrastructure Management"
            description="Comprehensive server maintenance, monitoring, and optimization for peak performance."
          />
          <SupportCard
            icon={Shield}
            title="Security & Monitoring"
            description="Real-time threat detection, network monitoring, and proactive security measures."
          />
          <SupportCard
            icon={Users}
            title="End-User Support"
            description="Responsive ticketing system and user support for smooth operations."
          />
          <SupportCard
            icon={Cloud}
            title="Cloud Integration"
            description="Seamless cloud deployment, migration, and hybrid infrastructure management."
          />
          <SupportCard
            icon={Terminal}
            title="Technical Consulting"
            description="Expert guidance on architecture, scalability, and technology decisions."
          />
          <SupportCard
            icon={Clock}
            title="24/7 Emergency Response"
            description="Round-the-clock support for critical issues and system emergencies."
          />
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                Ready for enterprise-grade support?
              </h3>
              <p className="text-gray-400 mb-6 md:mb-0">
                Let us handle the tech — so you can focus on growth.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-accent-indigo rounded-lg font-semibold text-white 
                         hover:shadow-[0_0_15px_#00FFF7] transition-all duration-300
                         flex items-center justify-center gap-2"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Zap className="w-5 h-5" />
                Get Started
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/10 backdrop-blur-md rounded-lg font-semibold
                         hover:bg-white/20 transition-colors duration-300
                         flex items-center justify-center gap-2"
                onClick={() => window.location.href = 'mailto:nextwavedigitalsolutions@outlook.com?subject=Enterprise Support Inquiry'}
              >
                <Bot className="w-5 h-5" />
                Schedule Demo
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnterpriseSupport;