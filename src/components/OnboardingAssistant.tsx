import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Image, Users, Palette, Loader, Send, CheckCircle } from 'lucide-react';

interface Question {
  id: string;
  text: string;
  icon: React.ElementType;
  placeholder?: string;
}

const questions: Question[] = [
  {
    id: 'businessName',
    text: "What's your business name?",
    icon: Rocket,
    placeholder: 'e.g., Acme Solutions'
  },
  {
    id: 'hasLogo',
    text: 'Do you already have a logo?',
    icon: Image,
    placeholder: 'Yes/No - If no, we can help create one'
  },
  {
    id: 'targetAudience',
    text: "What's your target audience?",
    icon: Users,
    placeholder: 'e.g., Small business owners, tech enthusiasts'
  },
  {
    id: 'brandStyle',
    text: 'What color/style fits your brand?',
    icon: Palette,
    placeholder: 'e.g., Modern & minimal, Bold & energetic'
  }
];

const OnboardingAssistant = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleAnswer = (answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: answer
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Here you would typically send the answers to your backend
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulated API call
      setIsComplete(true);
    } catch (error) {
      console.error('Error submitting onboarding answers:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentQ = questions[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto p-6">
      {!isComplete ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10"
        >
          <div className="flex items-center gap-3 mb-8">
            <Rocket className="text-accent-aqua w-6 h-6" />
            <h2 className="text-2xl font-bold">Welcome to your new site journey! 🚀</h2>
          </div>

          <div className="mb-8">
            <p className="text-gray-300">
              I'll help you get your website launched. Just answer a few questions and we'll start building your custom experience.
              (This only takes 2-3 minutes!)
            </p>
          </div>

          <motion.div
            key={currentQ.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 mb-4">
              <currentQ.icon className="text-accent-aqua w-5 h-5" />
              <h3 className="text-xl font-semibold">{currentQ.text}</h3>
            </div>

            <input
              type="text"
              placeholder={currentQ.placeholder}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white 
                       focus:outline-none focus:ring-2 focus:ring-accent-aqua"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && (e.target as HTMLInputElement).value.trim()) {
                  handleAnswer((e.target as HTMLInputElement).value.trim());
                  (e.target as HTMLInputElement).value = '';
                }
              }}
            />

            <div className="flex justify-between items-center mt-6">
              <span className="text-gray-400">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              {currentQuestion > 0 && (
                <button
                  onClick={() => setCurrentQuestion(prev => prev - 1)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Back
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10 text-center"
        >
          <CheckCircle className="w-16 h-16 text-accent-aqua mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-4">Perfect! We're on it! 🎉</h2>
          <p className="text-gray-300 mb-6">
            Thanks for sharing your vision with us. Our team will review your responses and reach out within 24 hours
            to discuss the next steps in bringing your website to life.
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

export default OnboardingAssistant;