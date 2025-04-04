import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle, Loader } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  businessIdea: string;
  helpNeeded: string;
}

const helpOptions = [
  'Branding & Design',
  'Technical Setup',
  'Pricing Strategy',
  'Content Strategy',
  'SEO & Marketing',
  'Other'
];

const LeadForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    businessIdea: '',
    helpNeeded: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Here you would typically send the form data to your backend
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulated API call
      setIsComplete(true);
    } catch (error) {
      setError('Something went wrong. Please try again.');
      console.error('Error submitting lead form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      {!isComplete ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10"
        >
          <div className="flex items-center gap-3 mb-8">
            <Mail className="text-accent-aqua w-6 h-6" />
            <h2 className="text-2xl font-bold">🚧 Site Planning Zone</h2>
          </div>

          <p className="text-gray-300 mb-8">
            Not ready to buy? No problem! 🙌 Tell us a bit about you, and we'll help you plan your site
            or reach out with a free strategy session.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white 
                         focus:outline-none focus:ring-2 focus:ring-accent-aqua"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white 
                         focus:outline-none focus:ring-2 focus:ring-accent-aqua"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label htmlFor="businessIdea" className="block text-sm font-medium text-gray-300 mb-2">
                Business or Idea (optional)
              </label>
              <textarea
                id="businessIdea"
                name="businessIdea"
                value={formData.businessIdea}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white 
                         focus:outline-none focus:ring-2 focus:ring-accent-aqua"
                placeholder="Tell us about your business or idea..."
              />
            </div>

            <div>
              <label htmlFor="helpNeeded" className="block text-sm font-medium text-gray-300 mb-2">
                What would you like help with?
              </label>
              <select
                id="helpNeeded"
                name="helpNeeded"
                required
                value={formData.helpNeeded}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white 
                         focus:outline-none focus:ring-2 focus:ring-accent-aqua"
              >
                <option value="">Select an option</option>
                {helpOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
                {error}
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 bg-accent-indigo rounded-lg font-semibold text-white 
                       hover:shadow-[0_0_15px_#00FFF7] transition-all duration-300
                       disabled:opacity-50 disabled:cursor-not-allowed
                       flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader className="animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Get Free Strategy Session
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10 text-center"
        >
          <CheckCircle className="w-16 h-16 text-accent-aqua mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-4">Thanks for reaching out! 🎉</h2>
          <p className="text-gray-300 mb-6">
            We've received your information and will be in touch within 24 hours to schedule your free strategy session.
            Keep an eye on your inbox!
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-accent-indigo rounded-lg font-semibold text-white 
                     hover:shadow-[0_0_15px_#00FFF7] transition-all duration-300"
          >
            Start Over
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default LeadForm;