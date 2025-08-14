'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, staggerItem, buttonHover, buttonTap, useInViewAnimation } from '@/lib/animations';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Please enter a valid email address').max(255, 'Email must be less than 255 characters'),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000, 'Message must be less than 5000 characters'),
  honeypot: z.string().max(0, 'Bot detected'),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface FormState {
  isSubmitting: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage?: string;
}

export default function ContactForm() {
  const [formState, setFormState] = useState<FormState>({
    isSubmitting: false,
    isSuccess: false,
    isError: false,
  });

  const inViewProps = useInViewAnimation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      honeypot: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setFormState({
      isSubmitting: true,
      isSuccess: false,
      isError: false,
    });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }

      setFormState({
        isSubmitting: false,
        isSuccess: true,
        isError: false,
      });

      reset();
    } catch (error) {
      setFormState({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        errorMessage: error instanceof Error ? error.message : 'An unexpected error occurred',
      });
    }
  };

  return (
    <motion.section 
      id="contact" 
      className="section-shell py-20"
      variants={fadeInUp}
      {...inViewProps}
    >
      <div className="max-w-2xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          variants={staggerItem}
        >
          <h2 className="text-3xl font-bold text-text mb-4">Ready to Get Started?</h2>
          <p className="text-muted">
            Let&apos;s discuss your project and see how we can help bring your vision to life.
          </p>
        </motion.div>

        {/* Success Message */}
        {formState.isSuccess && (
          <motion.div 
            className="mb-8 p-6 rounded-2xl border backdrop-blur-sm"
            style={{
              background: 'linear-gradient(145deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.05))',
              borderColor: 'rgba(16, 185, 129, 0.2)',
              boxShadow: '0 8px 32px rgba(16, 185, 129, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" as const }}
          >
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-green-800 dark:text-green-200 font-medium">
                Thank you! Your message has been sent successfully. We&apos;ll get back to you within 24 hours.
              </p>
            </div>
          </motion.div>
        )}

        {/* Error Message */}
        {formState.isError && (
          <motion.div 
            className="mb-8 p-6 rounded-2xl border backdrop-blur-sm"
            style={{
              background: 'linear-gradient(145deg, rgba(239, 68, 68, 0.1), rgba(185, 28, 28, 0.05))',
              borderColor: 'rgba(239, 68, 68, 0.2)',
              boxShadow: '0 8px 32px rgba(239, 68, 68, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" as const }}
          >
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-600 dark:text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-red-800 dark:text-red-200 font-medium">
                {formState.errorMessage}
              </p>
            </div>
          </motion.div>
        )}

        {/* Contact Form */}
        <motion.div 
          className="edge-glow p-8"
          variants={staggerItem}
        >
          <motion.form 
            onSubmit={handleSubmit(onSubmit)} 
            className="space-y-6"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {/* Honeypot field - hidden from users but visible to bots */}
            <input
              {...register('honeypot')}
              type="text"
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
            />

            {/* Name Field */}
            <motion.div variants={staggerItem}>
              <label htmlFor="name" className="block text-sm font-medium text-text mb-2">
                Name *
              </label>
              <input
                {...register('name')}
                type="text"
                id="name"
                className={clsx(
                  'w-full px-4 py-3 rounded-xl border text-text placeholder-muted transition-all duration-300',
                  'bg-gradient-to-br from-surface to-surface/80 backdrop-blur-sm',
                  'border-white/10 focus:border-accent/50 focus:ring-2 focus:ring-accent/20',
                  'shadow-lg hover:shadow-xl focus:shadow-accent/10',
                  errors.name
                    ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                    : ''
                )}
                placeholder="Your full name"
                disabled={formState.isSubmitting}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.name.message}
                </p>
              )}
            </motion.div>

            {/* Email Field */}
            <motion.div variants={staggerItem}>
              <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
                Email *
              </label>
              <input
                {...register('email')}
                type="email"
                id="email"
                className={clsx(
                  'w-full px-4 py-3 rounded-xl border text-text placeholder-muted transition-all duration-300',
                  'bg-gradient-to-br from-surface to-surface/80 backdrop-blur-sm',
                  'border-white/10 focus:border-accent/50 focus:ring-2 focus:ring-accent/20',
                  'shadow-lg hover:shadow-xl focus:shadow-accent/10',
                  errors.email
                    ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                    : ''
                )}
                placeholder="your@email.com"
                disabled={formState.isSubmitting}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.email.message}
                </p>
              )}
            </motion.div>

            {/* Phone Field */}
            <motion.div variants={staggerItem}>
              <label htmlFor="phone" className="block text-sm font-medium text-text mb-2">
                Phone
              </label>
              <input
                {...register('phone')}
                type="tel"
                id="phone"
                className="w-full px-4 py-3 rounded-xl border text-text placeholder-muted transition-all duration-300 bg-gradient-to-br from-surface to-surface/80 backdrop-blur-sm border-white/10 focus:border-accent/50 focus:ring-2 focus:ring-accent/20 shadow-lg hover:shadow-xl focus:shadow-accent/10"
                placeholder="+1 (555) 123-4567"
                disabled={formState.isSubmitting}
              />
            </motion.div>

            {/* Company Field */}
            <motion.div variants={staggerItem}>
              <label htmlFor="company" className="block text-sm font-medium text-text mb-2">
                Company
              </label>
              <input
                {...register('company')}
                type="text"
                id="company"
                className="w-full px-4 py-3 rounded-xl border text-text placeholder-muted transition-all duration-300 bg-gradient-to-br from-surface to-surface/80 backdrop-blur-sm border-white/10 focus:border-accent/50 focus:ring-2 focus:ring-accent/20 shadow-lg hover:shadow-xl focus:shadow-accent/10"
                placeholder="Your company name"
                disabled={formState.isSubmitting}
              />
            </motion.div>

            {/* Message Field */}
            <motion.div variants={staggerItem}>
              <label htmlFor="message" className="block text-sm font-medium text-text mb-2">
                Message *
              </label>
              <textarea
                {...register('message')}
                id="message"
                rows={5}
                className={clsx(
                  'w-full px-4 py-3 rounded-xl border text-text placeholder-muted transition-all duration-300 resize-vertical',
                  'bg-gradient-to-br from-surface to-surface/80 backdrop-blur-sm',
                  'border-white/10 focus:border-accent/50 focus:ring-2 focus:ring-accent/20',
                  'shadow-lg hover:shadow-xl focus:shadow-accent/10',
                  errors.message
                    ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                    : ''
                )}
                placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
                disabled={formState.isSubmitting}
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.message.message}
                </p>
              )}
            </motion.div>

            {/* Submit Button */}
            <motion.button
              variants={staggerItem}
              whileHover={formState.isSubmitting ? {} : buttonHover}
              whileTap={formState.isSubmitting ? {} : buttonTap}
              type="submit"
              disabled={formState.isSubmitting}
              className={clsx(
                'w-full py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300',
                'shadow-lg hover:shadow-xl focus:shadow-accent/20',
                formState.isSubmitting
                  ? 'bg-muted text-surface cursor-not-allowed opacity-60'
                  : 'btn-primary text-bg focus:outline-none focus:ring-2 focus:ring-accent/30 focus:ring-offset-2'
              )}
            >
              {formState.isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-surface" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending...
                </span>
              ) : (
                'Send Message'
              )}
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </motion.section>
  );
}