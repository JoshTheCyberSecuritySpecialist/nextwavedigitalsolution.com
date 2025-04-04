import { Configuration, OpenAIApi } from 'npm:openai@4.28.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Max-Age': '86400',
  'Access-Control-Expose-Headers': 'content-length, content-type',
};

interface BlogRequest {
  topic: string;
  keywords: string[];
  tone: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        ...corsHeaders,
        'Content-Length': '0',
      }
    });
  }

  try {
    // Validate request method
    if (req.method !== 'POST') {
      throw new Error('Method not allowed');
    }

    // Validate authorization
    const authHeader = req.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      throw new Error('Missing or invalid authorization header');
    }

    // Parse and validate request body
    let body;
    try {
      body = await req.json() as BlogRequest;
    } catch (e) {
      throw new Error('Invalid JSON in request body');
    }

    const { topic, keywords, tone } = body;

    // Validate request data
    if (!topic?.trim()) {
      throw new Error('Topic is required');
    }
    if (!Array.isArray(keywords) || keywords.length === 0) {
      throw new Error('At least one keyword is required');
    }
    if (!tone?.trim()) {
      throw new Error('Tone is required');
    }

    // Check if we have the API key
    const apiKey = Deno.env.get('OPENAI_API_KEY');
    if (!apiKey) {
      console.error('OpenAI API key is not configured');
      throw new Error('OpenAI API key is not configured in the environment. Please add OPENAI_API_KEY to your Supabase project settings.');
    }

    // Initialize OpenAI with error handling
    let openai;
    try {
      const configuration = new Configuration({
        apiKey,
      });
      openai = new OpenAIApi(configuration);
    } catch (error) {
      console.error('Failed to initialize OpenAI client:', error);
      throw new Error('Failed to initialize OpenAI client. Please check your API key configuration.');
    }

    // Construct the prompt
    const prompt = `Write a professional blog post about "${topic}" using the following keywords: ${keywords.join(', ')}. 
    The blog should include:
    - A compelling introduction
    - At least 3 subheadings with relevant content
    - Key points incorporating the keywords
    - A strong conclusion with a call-to-action
    - Keep it around 800 words
    - Use a ${tone} tone
    
    Format the output in Markdown.`;

    console.log('Generating blog post with OpenAI...');

    // Generate content using OpenAI with timeout
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('OpenAI request timed out after 30 seconds')), 30000);
    });

    const completionPromise = openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a professional content writer specializing in creating engaging, SEO-optimized blog posts."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const completion = await Promise.race([completionPromise, timeoutPromise])
      .catch(error => {
        if (error.message.includes('timed out')) {
          throw new Error('The request to generate content timed out. Please try again.');
        }
        if (error.response?.status === 401) {
          throw new Error('Invalid OpenAI API key. Please check your configuration.');
        }
        if (error.response?.status === 429) {
          throw new Error('OpenAI API rate limit exceeded. Please try again later.');
        }
        throw error;
      });

    if (!completion.data.choices[0]?.message?.content) {
      throw new Error('No content was generated. Please try again.');
    }

    const generatedContent = completion.data.choices[0].message.content;
    console.log('Blog post generated successfully');

    return new Response(
      JSON.stringify({ content: generatedContent }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        },
      },
    );
  } catch (error) {
    console.error('Error in generate-blog function:', error);
    
    let status = 500;
    let errorMessage = 'An unexpected error occurred while generating the blog post';
    
    if (error instanceof Error) {
      // Determine appropriate status code
      if (error.message === 'Method not allowed') {
        status = 405;
      } else if (error.message.includes('authorization')) {
        status = 401;
      } else if (error.message.includes('required')) {
        status = 400;
      } else if (error.message.includes('OpenAI API key')) {
        status = 503;
        errorMessage = 'The blog generation service is temporarily unavailable. Please try again later.';
      } else if (error.message.includes('rate limit')) {
        status = 429;
        errorMessage = 'Too many requests. Please wait a moment and try again.';
      } else if (error.message.includes('timed out')) {
        status = 504;
        errorMessage = 'The request took too long to complete. Please try again.';
      } else {
        errorMessage = error.message;
      }
    }

    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }),
      {
        status,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        },
      },
    );
  }
});