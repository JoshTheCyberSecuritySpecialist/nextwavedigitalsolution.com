import React from 'react';
import { motion } from 'framer-motion';
import { Code, Rocket, Lock, Brain, Github as GithubIcon, Sparkles, FileCode, ArrowUpRight } from 'lucide-react';

const TechCard = ({ icon: Icon, name }: { icon: any, name: string }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10"
  >
    <Icon className="text-accent-aqua" size={20} />
    <span className="text-gray-300">{name}</span>
  </motion.div>
);

const About = () => {
  return (
    <section id="about" className="py-24 px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/50 via-background to-background -z-10" />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-accent-aqua to-accent-indigo bg-clip-text text-transparent">
                You Don't Rent Your Website — You Own It.
              </span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-300 mb-8 leading-relaxed"
            >
              With most agencies or website builders, you're paying to rent a site you'll never truly own. 
              If you stop paying, your site disappears — along with your traffic, your content, and your momentum.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-300 mb-8 leading-relaxed"
            >
              Unlike traditional web agencies or DIY platforms like Wix and WordPress, we don't lock you in. 
              Your website is fully custom-built and stored in your own GitHub repository — giving you 100% 
              ownership of your source code, assets, and updates.
            </motion.p>

            <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="text-accent-aqua w-6 h-6" />
                <span className="text-lg font-semibold text-white">Built for freedom, not lock-in.</span>
              </div>
              <p className="text-gray-300">
                All NextWave websites are deployed with full code access via GitHub. That means no monthly traps, 
                no paywalls for updates, and no lost sites. You own it, always.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <FileCode className="text-accent-aqua" />
                <span className="text-gray-300">Full Code Access</span>
              </div>
              <div className="flex items-center gap-3">
                <GithubIcon className="text-accent-aqua" />
                <span className="text-gray-300">GitHub Version Control</span>
              </div>
              <div className="flex items-center gap-3">
                <Brain className="text-accent-aqua" />
                <span className="text-gray-300">AI-Powered Tools</span>
              </div>
              <div className="flex items-center gap-3">
                <ArrowUpRight className="text-accent-aqua" />
                <span className="text-gray-300">Take It With You</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-4">
              <span className="bg-gradient-to-r from-accent-aqua to-accent-indigo bg-clip-text text-transparent">
                Modern Tech Stack You Control
              </span>
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <TechCard icon={Sparkles} name="Bolt.new" />
              <TechCard icon={Brain} name="OpenAI" />
              <TechCard icon={Code} name="React" />
              <TechCard icon={Code} name="TailwindCSS" />
              <TechCard icon={GithubIcon} name="GitHub" />
              <TechCard icon={Rocket} name="Vite" />
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h4 className="text-lg font-semibold mb-3">What happens if you leave NextWave?</h4>
              <p className="text-gray-400">
                You take everything with you. Your code, your content, your future. 
                That's the difference between renting and owning your digital presence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;