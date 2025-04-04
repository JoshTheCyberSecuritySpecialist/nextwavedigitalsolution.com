import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Copy, Download, Send, Sparkles, X, Pencil, Lightbulb, GraduationCap, Coffee, Heart, AlertCircle } from 'lucide-react';
import MDEditor from '@uiw/react-md-editor';
import { WithContext as ReactTags } from 'react-tag-input';

interface Tag {
  id: string;
  text: string;
}

interface ToneOption {
  value: string;
  label: string;
  icon: React.ElementType;
  description: string;
}

const toneOptions: ToneOption[] = [
  {
    value: 'professional',
    label: 'Professional',
    icon: Brain,
    description: 'Formal and business-oriented tone'
  },
  {
    value: 'conversational',
    label: 'Conversational',
    icon: Coffee,
    description: 'Friendly and approachable style'
  },
  {
    value: 'educational',
    label: 'Educational',
    icon: GraduationCap,
    description: 'Informative and teaching-focused'
  },
  {
    value: 'casual',
    label: 'Casual',
    icon: Pencil,
    description: 'Relaxed and informal approach'
  },
  {
    value: 'inspirational',
    label: 'Inspirational',
    icon: Heart,
    description: 'Motivational and uplifting content'
  },
  {
    value: 'technical',
    label: 'Technical',
    icon: Lightbulb,
    description: 'Detailed and technology-focused'
  }
];

const Blog = () => {
  const [topic, setTopic] = useState('');
  const [tags, setTags] = useState<Tag[]>([]);
  const [tone, setTone] = useState('professional');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showValidationHints, setShowValidationHints] = useState(false);

  const handleDelete = (i: number) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag: Tag) => {
    setTags([...tags, tag]);
    setShowValidationHints(false);
  };

  const isFormValid = () => {
    return topic.trim() !== '' && tags.length > 0;
  };

  const handleGenerate = async () => {
    if (!isFormValid()) {
      setShowValidationHints(true);
      setError('Please provide both a topic and at least one keyword.');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setShowValidationHints(false);

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-blog`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic,
          keywords: tags.map(tag => tag.text),
          tone,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to generate blog post' }));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.content) {
        throw new Error('No content received from the server');
      }

      setGeneratedContent(data.content);
      setError(null);
    } catch (err) {
      console.error('Error generating blog post:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate blog post. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
  };

  const handleDownload = () => {
    const blob = new Blob([generatedContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${topic.toLowerCase().replace(/\s+/g, '-')}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTopic(e.target.value);
    setShowValidationHints(false);
  };

  return (
    <section id="blog" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-accent-aqua to-accent-indigo bg-clip-text text-transparent">
              AI Blog Generator
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Generate engaging blog posts instantly using our AI-powered writing tool.
            Choose from multiple writing styles to match your brand voice.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
              <div className="mb-6">
                <label htmlFor="topic" className="block text-sm font-medium text-gray-300 mb-2">
                  Blog Topic *
                </label>
                <input
                  type="text"
                  id="topic"
                  value={topic}
                  onChange={handleTopicChange}
                  className={`w-full px-4 py-2 rounded-lg bg-white/5 border text-white 
                           focus:outline-none focus:ring-2 focus:ring-accent-aqua
                           ${showValidationHints && !topic.trim() ? 'border-red-500' : 'border-white/10'}`}
                  placeholder="e.g., Modern Web Development Trends"
                  disabled={isGenerating}
                />
                {showValidationHints && !topic.trim() && (
                  <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                    <AlertCircle size={14} />
                    Topic is required
                  </p>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Keywords * (Press Enter or Comma to add)
                </label>
                <ReactTags
                  tags={tags}
                  handleDelete={handleDelete}
                  handleAddition={handleAddition}
                  delimiters={[188, 13]} // comma and enter
                  placeholder="Type and press enter to add keywords"
                  inputDisabled={isGenerating}
                  classNames={{
                    tags: 'space-y-2',
                    tagInput: `w-full px-4 py-2 rounded-lg bg-white/5 border text-white 
                              focus:outline-none focus:ring-2 focus:ring-accent-aqua 
                              ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}
                              ${showValidationHints && tags.length === 0 ? 'border-red-500' : 'border-white/10'}`,
                    tag: 'inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-indigo/20 text-white mr-2',
                    remove: 'text-white/60 hover:text-white',
                  }}
                />
                {showValidationHints && tags.length === 0 && (
                  <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                    <AlertCircle size={14} />
                    At least one keyword is required
                  </p>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Writing Tone
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {toneOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <motion.button
                        key={option.value}
                        whileHover={{ scale: isGenerating ? 1 : 1.02 }}
                        whileTap={{ scale: isGenerating ? 1 : 0.98 }}
                        onClick={() => !isGenerating && setTone(option.value)}
                        disabled={isGenerating}
                        className={`p-3 rounded-lg border ${
                          tone === option.value
                            ? 'bg-accent-indigo/20 border-accent-aqua text-white'
                            : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                        } flex flex-col items-center gap-2 transition-colors duration-200
                        ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <Icon size={20} />
                        <span className="text-sm font-medium">{option.label}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: isGenerating || !isFormValid() ? 1 : 1.05 }}
                whileTap={{ scale: isGenerating || !isFormValid() ? 1 : 0.95 }}
                onClick={handleGenerate}
                disabled={isGenerating || !isFormValid()}
                className={`w-full py-3 px-4 rounded-lg font-semibold text-white 
                         transition-all duration-300 flex items-center justify-center gap-2
                         ${isGenerating || !isFormValid() ? 'bg-gray-500 cursor-not-allowed' : 'bg-accent-indigo hover:shadow-[0_0_15px_#00FFF7]'}`}
              >
                {isGenerating ? (
                  <>
                    <Brain className="animate-pulse" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles />
                    Generate Blog Post
                  </>
                )}
              </motion.button>

              {error && (
                <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 flex items-center gap-2">
                  <AlertCircle size={16} />
                  {error}
                </div>
              )}

              {!error && !isFormValid() && (
                <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-400">
                  <p className="font-medium mb-1">Required fields:</p>
                  <ul className="list-disc list-inside text-sm">
                    {!topic.trim() && <li>Enter a blog topic</li>}
                    {tags.length === 0 && <li>Add at least one keyword</li>}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Preview Panel */}
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Preview</h3>
              {generatedContent && (
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCopy}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10"
                    title="Copy to clipboard"
                  >
                    <Copy size={20} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDownload}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10"
                    title="Download as markdown"
                  >
                    <Download size={20} />
                  </motion.button>
                </div>
              )}
            </div>
            
            <div className="min-h-[400px] rounded-lg bg-white/5 p-4">
              {generatedContent ? (
                <MDEditor.Markdown 
                  source={generatedContent} 
                  className="text-gray-300"
                  style={{ background: 'transparent' }}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  {topic || tags.length > 0 ? (
                    <div className="text-center">
                      <p className="mb-2">Ready to generate!</p>
                      <p className="text-sm text-gray-500">
                        {!topic && 'Add a topic • '}
                        {tags.length === 0 && 'Add some keywords'}
                      </p>
                    </div>
                  ) : (
                    'Generated content will appear here'
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;