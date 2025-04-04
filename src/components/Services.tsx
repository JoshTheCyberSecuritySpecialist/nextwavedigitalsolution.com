import React from 'react';
import { motion } from 'framer-motion';
import { Code, Bot, Github, Search, ArrowRight, Settings } from 'lucide-react';

const ServiceCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <motion.div
    whileHover={{ y: -10 }}
    className="p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10"
  >
    <Icon className="w-8 h-8 text-accent-aqua mb-4" />
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </motion.div>
);

const Services = () => {
  return (
    <section id="services" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-accent-aqua to-accent-indigo bg-clip-text text-transparent">
              Our Services
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We deliver modern, AI-powered solutions that put you in control of your digital presence.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <ServiceCard
            icon={Code}
            title="Custom Website Development"
            description="Modern, responsive websites built with React and TailwindCSS."
          />
          <ServiceCard
            icon={Bot}
            title="AI Integration"
            description="Smart chatbots and AI-powered features to enhance user experience."
          />
          <ServiceCard
            icon={Github}
            title="GitHub Setup & Training"
            description="Full code ownership with version control and deployment training."
          />
          <ServiceCard
            icon={Search}
            title="SEO Optimization"
            description="Comprehensive SEO setup to improve your site's visibility."
          />
          <ServiceCard
            icon={ArrowRight}
            title="WordPress Migration"
            description="Seamless transition from WordPress to modern tech stack."
          />
          <ServiceCard
            icon={Settings}
            title="Maintenance & Support"
            description="Ongoing technical support and website maintenance."
          />
        </div>
      </div>
    </section>
  );
}

export default Services;