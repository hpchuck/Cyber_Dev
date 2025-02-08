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
    <section className="py-20 px-4 md:px-8 min-h-screen relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-transparent" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-2xl mx-auto relative z-10"
      >
        <h2 className="section-heading text-[#00FF41] mb-8">
          SHARE_YOUR_EXPERIENCE
        </h2>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6 backdrop-blur-md bg-black/30 border border-[#00FF41]/20 rounded-lg p-8"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-32 h-32 group">
              {previewImage ? (
                <div className="relative">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-32 h-32 rounded-full object-cover border-2 border-[#00FF41]/30"
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
                <div className="w-32 h-32 rounded-full border-2 border-dashed border-[#00FF41]/30 flex items-center justify-center bg-black/30">
                  <Upload className="w-8 h-8 text-[#00FF41]/50" />
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
            <p className="text-sm text-[#00FF41]/70">Upload your photo (optional)</p>
          </div>

          <div>
            <label className="block text-[#00FF41] mb-2 flex items-center gap-2">
              <User className="w-4 h-4" /> Name
            </label>
            <input
              type="text"
              value={formState.name}
              onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
              className="w-full bg-black/50 border border-[#00FF41]/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00FF41]"
              required
            />
          </div>

          <div>
            <label className="block text-[#00FF41] mb-2 flex items-center gap-2">
              <Briefcase className="w-4 h-4" /> Role
            </label>
            <input
              type="text"
              value={formState.role}
              onChange={(e) => setFormState(prev => ({ ...prev, role: e.target.value }))}
              className="w-full bg-black/50 border border-[#00FF41]/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00FF41]"
              required
            />
          </div>

          <div>
            <label className="block text-[#00FF41] mb-2 flex items-center gap-2">
              <Building className="w-4 h-4" /> Company
            </label>
            <input
              type="text"
              value={formState.company}
              onChange={(e) => setFormState(prev => ({ ...prev, company: e.target.value }))}
              className="w-full bg-black/50 border border-[#00FF41]/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00FF41]"
              required
            />
          </div>

          <div>
            <label className="block text-[#00FF41] mb-2">Rating</label>
            <div className="flex gap-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <motion.button
                  key={index}
                  type="button"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setFormState(prev => ({ ...prev, rating: index + 1 }))}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-6 h-6 ${
                      index < formState.rating
                        ? 'text-[#00FF41]'
                        : 'text-[#00FF41]/20'
                    }`}
                    fill={index < formState.rating ? '#00FF41' : 'none'}
                  />
                </motion.button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[#00FF41] mb-2">Your Testimonial</label>
            <textarea
              value={formState.content}
              onChange={(e) => setFormState(prev => ({ ...prev, content: e.target.value }))}
              rows={4}
              className="w-full bg-black/50 border border-[#00FF41]/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00FF41]"
              required
            />
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full btn flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              'Submitting...'
            ) : (
              <>
                <Send className="w-4 h-4" />
                Submit Testimonial
              </>
            )}
          </motion.button>

          {submitStatus === 'success' && (
            <p className="text-green-500 text-center">
              Thank you for your testimonial! It will be reviewed and published soon.
            </p>
          )}
          {submitStatus === 'error' && (
            <p className="text-red-500 text-center">
              Failed to submit testimonial. Please try again.
            </p>
          )}
        </motion.form>
      </motion.div>
    </section>
  );
};