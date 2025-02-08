import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Github, Linkedin, Twitter } from 'lucide-react';

const SocialIcon = ({ href, icon: Icon, label }: { href: string; icon: typeof Github; label: string }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="tech-icon text-white hover:text-[#00FF41] transition-colors relative group cursor-pointer"
    whileHover={{ scale: 1.2 }}
    whileTap={{ scale: 0.9 }}
  >
    <motion.div
      className="absolute -inset-2 bg-[#00FF41]/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      animate={{
        scale: [1, 1.2, 1],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "linear",
      }}
    />
    <Icon className="w-8 h-8 relative z-10" />
    <motion.div
      className="absolute w-20 -bottom-8 left-1/2 transform -translate-x-1/2 flex items-center justify-center"
    >
      <motion.span
        className="text-xs text-[#00FF41] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
        initial={{ y: -10 }}
        animate={{ y: 0 }}
      >
        {label}
      </motion.span>
    </motion.div>
  </motion.a>
);

export const ContactSection = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Replace with your actual form submission endpoint
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '01c1e520-c0ea-4be4-a409-83047f7e23c8', // Replace with your key
          ...formState
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormState({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 md:px-8 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,65,0.15)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-transparent" />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto relative z-10"
      >
        <h2 className="text-4xl md:text-6xl font-bold gradient-text mb-12 text-center">
          Get in Touch
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold gradient-text mb-4">Let's Create Something Amazing</h3>
            <p className="text-gray-300">
              Whether you have a project in mind or just want to chat about technology,
              I'm always open to new opportunities and collaborations.
            </p>

            <div className="flex gap-6">
              <SocialIcon
                href="https://github.com"
                icon={Github}
                label="GitHub"
              />
              <SocialIcon
                href="https://linkedin.com"
                icon={Linkedin}
                label="LinkedIn"
              />
              <SocialIcon
                href="https://twitter.com"
                icon={Twitter}
                label="Twitter"
              />
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label htmlFor="name" className="block text-[#00FF41] mb-2">Name</label>
              <input
                type="text"
                id="name"
                value={formState.name}
                onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                className="w-full bg-[#1A1A1A] border border-[#00FF41]/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00FF41] gradient-border cursor-text"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-[#00FF41] mb-2">Email</label>
              <input
                type="email"
                id="email"
                value={formState.email}
                onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                className="w-full bg-[#1A1A1A] border border-[#00FF41]/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00FF41] gradient-border cursor-text"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-[#00FF41] mb-2">Message</label>
              <textarea
                id="message"
                value={formState.message}
                onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                rows={4}
                className="w-full bg-[#1A1A1A] border border-[#00FF41]/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00FF41] gradient-border cursor-text"
                required
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full btn flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                'Sending...'
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </motion.button>

            {submitStatus === 'success' && (
              <p className="text-green-500 text-center">Message sent successfully!</p>
            )}
            {submitStatus === 'error' && (
              <p className="text-red-500 text-center">Failed to send message. Please try again.</p>
            )}
          </motion.form>
        </div>
      </motion.div>
    </section>
  );
};