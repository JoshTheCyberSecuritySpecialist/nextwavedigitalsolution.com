import Stripe from 'npm:stripe@14.18.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const PLAN_PRICES = {
  starter: 'price_starter',  // Replace with actual Stripe price IDs
  pro: 'price_pro',
  infinite: 'price_infinite'
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { plan } = await req.json();

    if (!plan || !PLAN_PRICES[plan as keyof typeof PLAN_PRICES]) {
      throw new Error('Invalid plan selected');
    }

    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '');

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: PLAN_PRICES[plan as keyof typeof PLAN_PRICES],
          quantity: 1,
        },
      ],
      mode: plan === 'infinite' ? 'subscription' : 'payment',
      success_url: `${req.headers.get('origin')}/onboarding?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}#pricing`,
    });

    return new Response(
      JSON.stringify({ sessionId: session.id }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (error) {
    console.error('Error creating checkout session:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Failed to create checkout session' 
      }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    );
  }
});