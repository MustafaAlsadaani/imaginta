import { NextRequest, NextResponse } from 'next/server';
import { z, ZodError } from 'zod';

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limiting configuration
const RATE_LIMIT = {
  maxAttempts: 5, // Maximum 5 submissions
  windowMs: 15 * 60 * 1000, // 15 minutes
};

// Validation schema (same as client-side)
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Please enter a valid email address').max(255, 'Email must be less than 255 characters'),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000, 'Message must be less than 5000 characters'),
  honeypot: z.string().max(0, 'Bot detected'),
});

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  return '127.0.0.1';
}

function isRateLimited(clientIP: string): boolean {
  const now = Date.now();
  const clientData = rateLimitStore.get(clientIP);
  
  if (!clientData || now > clientData.resetTime) {
    // First request or window expired, reset counter
    rateLimitStore.set(clientIP, {
      count: 1,
      resetTime: now + RATE_LIMIT.windowMs,
    });
    return false;
  }
  
  if (clientData.count >= RATE_LIMIT.maxAttempts) {
    return true;
  }
  
  // Increment counter
  rateLimitStore.set(clientIP, {
    count: clientData.count + 1,
    resetTime: clientData.resetTime,
  });
  
  return false;
}

function cleanupRateLimit() {
  const now = Date.now();
  for (const [ip, data] of rateLimitStore.entries()) {
    if (now > data.resetTime) {
      rateLimitStore.delete(ip);
    }
  }
}

// Cleanup old entries every 30 minutes
setInterval(cleanupRateLimit, 30 * 60 * 1000);

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIP = getClientIP(request);
    
    // Check rate limiting
    if (isRateLimited(clientIP)) {
      return NextResponse.json(
        { message: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }
    
    // Parse and validate request body
    const body = await request.json();
    const validatedData = contactSchema.parse(body);
    
    // Check honeypot (should be empty)
    if (validatedData.honeypot) {
      return NextResponse.json(
        { message: 'Spam detected' },
        { status: 400 }
      );
    }
    
    // Additional spam checks
    const suspiciousPatterns = [
      /https?:\/\//gi, // URLs in message
      /\b(viagra|casino|crypto|bitcoin|lottery|winner|congratulations)\b/gi,
      /(.)\1{10,}/gi, // Repeated characters
    ];
    
    const textToCheck = `${validatedData.name} ${validatedData.message}`;
    for (const pattern of suspiciousPatterns) {
      if (pattern.test(textToCheck)) {
        return NextResponse.json(
          { message: 'Message appears to be spam' },
          { status: 400 }
        );
      }
    }
    
    // Log the contact form submission (in production, save to database)
    console.log('Contact form submission:', {
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone || 'Not provided',
      company: validatedData.company || 'Not provided',
      message: validatedData.message,
      timestamp: new Date().toISOString(),
      clientIP,
    });
    
    // In production, you would:
    // 1. Save to database
    // 2. Send email notification
    // 3. Integrate with CRM
    // 4. Send auto-response email
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return NextResponse.json(
      { 
        message: 'Thank you for your message. We will get back to you within 24 hours.',
        success: true 
      },
      { status: 200 }
    );
    
  } catch (error: unknown) {
    console.error('Contact form error:', error);
    
    if (error instanceof ZodError) {
      return NextResponse.json(
        { 
          message: 'Validation error',
          errors: error.issues.map(issue => ({
            field: issue.path.join('.'),
            message: issue.message,
          }))
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { message: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  );
}