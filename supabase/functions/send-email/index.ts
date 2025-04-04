import { SMTPClient } from "npm:emailjs@4.0.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface EmailRequest {
  name: string;
  email: string;
  message: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, message } = await req.json() as EmailRequest;

    const SMTP_HOST = Deno.env.get('SMTP_HOST');
    const SMTP_PORT = parseInt(Deno.env.get('SMTP_PORT') || '587');
    const SMTP_USER = Deno.env.get('SMTP_USER');
    const SMTP_PASS = Deno.env.get('SMTP_PASS');

    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
      throw new Error('SMTP credentials not configured');
    }

    console.log('Attempting to send email with config:', {
      host: SMTP_HOST,
      port: SMTP_PORT,
      user: SMTP_USER,
    });

    const client = new SMTPClient({
      user: SMTP_USER,
      password: SMTP_PASS,
      host: SMTP_HOST,
      port: SMTP_PORT,
      ssl: false,
      tls: true,
      timeout: 30000, // Increased timeout
    });

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #3A36DB;">New Contact Form Submission</h2>
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Message:</strong></p>
          <div style="white-space: pre-wrap; background: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>
        <p style="color: #666; font-size: 12px; margin-top: 20px;">
          This message was sent from the NextWave Digital Solutions contact form.
        </p>
      </div>
    `;

    const textBody = `
New Contact Form Submission

Name: ${name}
Email: ${email}

Message:
${message}

--
Sent from NextWave Digital Solutions contact form
    `;

    console.log('Sending email...');
    
    await client.send({
      from: SMTP_USER,
      to: SMTP_USER,
      subject: `New Contact Form Message from ${name}`,
      text: textBody,
      html: htmlBody,
      replyTo: email,
    });

    console.log('Email sent successfully');

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (error) {
    console.error('Error sending email:', error);
    
    // More detailed error message
    const errorMessage = error instanceof Error 
      ? `Email sending failed: ${error.message}`
      : 'Failed to send email';

    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        details: error instanceof Error ? error.stack : undefined
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    );
  }
});