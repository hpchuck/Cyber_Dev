import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, Send, User, Briefcase, Building, Upload, X } from 'lucide-react';
import { useStore } from '../store/useStore';

const EMAIL_SERVICE_URL = 'https://api.emailjs.com/api/v1.0/email/send';
const EMAIL_SERVICE_ID = 'your_service_id';
const EMAIL_TEMPLATE_ID = 'your_template_id';
const EMAIL_USER_ID = 'your_user_id';

export const TestimonialForm = () => {
  const { addTestimonial } = useStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formState, setFormState] = useState({
    name: '',
    role: '',
    company: '',
    content: '',
    rating: 5,
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const sendEmailNotification = async (testimonialData: any) => {
    try {
      const response = await fetch(EMAIL_SERVICE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: EMAIL_SERVICE_ID,
          template_id: EMAIL_TEMPLATE_ID,
          user_id: EMAIL_USER_ID,
          template_params: {
            from_name: testimonialData.name,
            from_company: testimonialData.company,
            from_role: testimonialData.role,
            message: testimonialData.content,
            rating: testimonialData.rating,
          },
        }),
      });

      if (!response.ok) {
        console.error('Failed to send email notification');
      }
    } catch (error) {
      console.error('Error sending email notification:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const testimonialData = {
        ...formState,
        avatar: previewImage || undefined,
      };

      addTestimonial(testimonialData);
      await sendEmailNotification(testimonialData);

      setSubmitStatus('success');
      setFormState({
        name: '',
        role: '',
        company: '',
        content: '',
        rating: 5,
      });
      setPreviewImage(null);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  const removeImage = () => {
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <section className="py-20 px-4 md:px-8 min-h-screen relative bg-[#030303]">
      {/* Background gradients matching main theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />
      
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: -150, rotate: -3 }}
          animate={{ opacity: 1, y: 0, rotate: 12 }}
          transition={{ duration: 2.4, delay: 0.3, ease: [0.23, 0.86, 0.39, 0.96] }}
          className="absolute left-[-5%] top-[20%] w-[400px] h-[100px]"
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-full bg-gradient-to-r from-indigo-500/[0.15] to-transparent backdrop-blur-[2px] border-2 border-white/[0.15] rounded-full shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -150, rotate: 5 }}
          animate={{ opacity: 1, y: 0, rotate: -15 }}
          transition={{ duration: 2.4, delay: 0.5, ease: [0.23, 0.86, 0.39, 0.96] }}
          className="absolute right-[0%] top-[70%] w-[300px] h-[80px]"
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-full bg-gradient-to-r from-rose-500/[0.15] to-transparent backdrop-blur-[2px] border-2 border-white/[0.15] rounded-full shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]"
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-2xl mx-auto relative z-10"
      >
        {/* Updated heading to match main theme */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-6">
            <div className="h-2 w-2 rounded-full bg-rose-500/80" />
            <span className="text-sm text-white/60 tracking-wide">
              Share Your Experience
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
              Leave a
            </span>
            {' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300">
              Testimonial
            </span>
          </h2>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="space-y-6 backdrop-blur-md bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-32 h-32 group">
              {previewImage ? (
                <div className="relative">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-32 h-32 rounded-full object-cover border-2 border-white/20"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="w-32 h-32 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center bg-white/[0.02]">
                  <Upload className="w-8 h-8 text-white/50" />
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="avatar-upload"
              />
              <motion.label
                htmlFor="avatar-upload"
                className="absolute inset-0 cursor-pointer rounded-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              />
            </div>
            <p className="text-sm text-white/50">Upload your photo (optional)</p>
          </div>

          <div>
            <label className="flex items-center gap-2 text-white/80 mb-2 font-medium">
              <User className="w-4 h-4" /> Name
            </label>
            <input
              type="text"
              value={formState.name}
              onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
              className="w-full bg-white/[0.05] border border-white/[0.15] rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-colors"
              placeholder="Your full name"
              required
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-white/80 mb-2 font-medium">
              <Briefcase className="w-4 h-4" /> Role
            </label>
            <input
              type="text"
              value={formState.role}
              onChange={(e) => setFormState(prev => ({ ...prev, role: e.target.value }))}
              className="w-full bg-white/[0.05] border border-white/[0.15] rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-colors"
              placeholder="Your job title"
              required
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-white/80 mb-2 font-medium">
              <Building className="w-4 h-4" /> Company
            </label>
            <input
              type="text"
              value={formState.company}
              onChange={(e) => setFormState(prev => ({ ...prev, company: e.target.value }))}
              className="w-full bg-white/[0.05] border border-white/[0.15] rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-colors"
              placeholder="Company name"
              required
            />
          </div>

          <div>
            <label className="block text-white/80 mb-2 font-medium">Rating</label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  type="button"
                  onClick={() => setFormState(prev => ({ ...prev, rating: star }))}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-1"
                >
                  <Star
                    className={`w-6 h-6 transition-colors ${
                      star <= formState.rating 
                        ? 'text-yellow-400 fill-yellow-400' 
                        : 'text-white/30'
                    }`}
                    fill={star <= formState.rating ? 'currentColor' : 'none'}
                  />
                </motion.button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-white/80 mb-2 font-medium">Your Testimonial</label>
            <textarea
              value={formState.content}
              onChange={(e) => setFormState(prev => ({ ...prev, content: e.target.value }))}
              rows={4}
              className="w-full bg-white/[0.05] border border-white/[0.15] rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-colors resize-none"
              placeholder="Share your experience working with me..."
              required
            />
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-medium py-3 px-6 rounded-lg hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Submit Testimonial
              </>
            )}
          </motion.button>

          {submitStatus === 'success' && (
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-green-400 text-center bg-green-500/10 border border-green-500/20 rounded-lg p-3"
            >
              Thank you for your testimonial! It will be reviewed and published soon.
            </motion.p>
          )}
          {submitStatus === 'error' && (
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-center bg-red-500/10 border border-red-500/20 rounded-lg p-3"
            >
              Failed to submit testimonial. Please try again.
            </motion.p>
          )}
        </motion.form>
      </motion.div>
    </section>
  );
};