import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Loader, Send, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-email`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send email');
      }

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' }); // Reset form
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-accent-aqua to-accent-indigo bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Ready to take control of your digital presence? Let's discuss how we can help your business grow.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white 
                           focus:outline-none focus:ring-2 focus:ring-accent-aqua
                           disabled:opacity-50 disabled:cursor-not-allowed"
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
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white 
                           focus:outline-none focus:ring-2 focus:ring-accent-aqua
                           disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white 
                           focus:outline-none focus:ring-2 focus:ring-accent-aqua
                           disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              <motion.button
                whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-accent-indigo rounded-lg font-semibold text-white 
                         hover:shadow-[0_0_15px_#00FFF7] transition-all duration-300
                         disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none
                         flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="animate-spin" size={20} />
                    Sending...
                  </>
                ) : submitStatus === 'success' ? (
                  <>
                    <CheckCircle size={20} />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </motion.button>

              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400"
                >
                  Message sent successfully! We'll get back to you soon.
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400"
                >
                  {errorMessage}
                </motion.div>
              )}
            </form>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="text-accent-aqua" />
                  <a href="mailto:nextwavedigitalsolutions@outlook.com" className="text-gray-300 hover:text-accent-aqua">
                    nextwavedigitalsolutions@outlook.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="text-accent-aqua" />
                  <a href="tel:+18035421761" className="text-gray-300 hover:text-accent-aqua">
                    (803) 542-1761
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Location</h3>
              <p className="text-gray-400">
                Titusville, FL
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;