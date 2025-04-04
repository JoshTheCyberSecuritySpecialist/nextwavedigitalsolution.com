import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Loader } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import OnboardingAssistant from './OnboardingAssistant';
import LeadForm from './LeadForm';

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  isPopular?: boolean;
  onGetStarted: () => void;
  isLoading?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({ 
  title, 
  price, 
  features, 
  isPopular = false, 
  onGetStarted,
  isLoading = false 
}) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className={`relative p-6 rounded-2xl backdrop-blur-md border ${
        isPopular ? 'bg-accent-indigo/10 border-accent-aqua' : 'bg-white/5 border-white/10'
      }`}
    >
      {isPopular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-accent-aqua text-background text-sm font-semibold rounded-full">
          Most Popular
        </span>
      )}
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <div className="mb-6">
        <span className="text-3xl font-bold">${price}</span>
        {price !== '299/mo' && <span className="text-gray-400">/one-time</span>}
      </div>
      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <Check size={16} className="text-accent-aqua" />
            <span className="text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>
      <motion.button
        onClick={onGetStarted}
        whileHover={{ scale: isLoading ? 1 : 1.05 }}
        whileTap={{ scale: isLoading ? 1 : 0.95 }}
        disabled={isLoading}
        className="w-full py-3 px-4 bg-accent-indigo rounded-lg font-semibold text-white 
                  hover:shadow-[0_0_15px_#00FFF7] transition-all duration-300
                  disabled:opacity-70 disabled:cursor-not-allowed
                  flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader className="animate-spin" />
            Processing...
          </>
        ) : (
          <>
            Get Started
            <ArrowRight size={16} />
          </>
        )}
      </motion.button>
    </motion.div>
  );
};

const Pricing = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleGetStarted = async (plan: string) => {
    if (plan === 'lead') {
      setShowLeadForm(true);
      return;
    }

    setSelectedPlan(plan);
    setIsProcessing(true);

    try {
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
      
      if (!stripe) {
        throw new Error('Stripe failed to load');
      }

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-checkout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan }),
      });

      const { sessionId } = await response.json();

      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
      setIsProcessing(false);
    }
  };

  if (showOnboarding) {
    return <OnboardingAssistant />;
  }

  if (showLeadForm) {
    return <LeadForm />;
  }

  return (
    <section id="pricing" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-accent-aqua to-accent-indigo bg-clip-text text-transparent">
              Simple Pricing
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Most agencies charge the same — or more — for cookie-cutter sites you don't even control.
            With NextWave, you get AI tools, GitHub ownership, and modern tech — built for freedom.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <PricingCard
            title="Starter Wave"
            price="500"
            features={[
              '3-page site',
              'AI Chatbot',
              'GitHub Setup + Hosting',
              'SEO',
              '1 Revision'
            ]}
            onGetStarted={() => handleGetStarted('starter')}
            isLoading={isProcessing && selectedPlan === 'starter'}
          />
          <PricingCard
            title="Pro Wave"
            price="1,500"
            features={[
              '7 pages',
              'CMS via Bolt.new',
              'Blog Generator',
              'Analytics',
              '1 Month Support'
            ]}
            isPopular={true}
            onGetStarted={() => handleGetStarted('pro')}
            isLoading={isProcessing && selectedPlan === 'pro'}
          />
          <PricingCard
            title="Infinite Wave"
            price="299/mo"
            features={[
              'Unlimited Pages',
              'AI Workflows',
              'Custom Dashboard',
              'GitHub Team Setup',
              'Hosting & Domain'
            ]}
            onGetStarted={() => handleGetStarted('infinite')}
            isLoading={isProcessing && selectedPlan === 'infinite'}
          />
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => handleGetStarted('lead')}
            className="text-gray-400 hover:text-white transition-colors"
          >
            Not ready to commit? Get a free strategy session instead →
          </button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;