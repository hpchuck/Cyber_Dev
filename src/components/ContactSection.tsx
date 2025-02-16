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

const inputVariants = {
  focus: {
    scale: 1.02,
    boxShadow: "0 0 15px rgba(0, 255, 65, 0.3)",
    borderColor: "rgba(0, 255, 65, 0.8)"
  }
};

const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
};

const buttonVariants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.05,
    boxShadow: "0 0 20px rgba(0, 255, 65, 0.4)",
    transition: {
      duration: 0.3,
      yoyo: Infinity
    }
  },
  tap: { scale: 0.95 }
};

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
            variants={formVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="space-y-6 backdrop-blur-md bg-black/30 border border-[#00FF41]/20 rounded-lg p-8 relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#00FF41]/10 via-transparent to-[#00FF41]/10"
              animate={{
                x: ['-100%', '100%'],
                transition: {
                  repeat: Infinity,
                  duration: 3,
                  ease: 'linear'
                }
              }}
            />

            <motion.div variants={formVariants}>
              <label htmlFor="name" className="block text-[#00FF41] mb-2">Name</label>
              <motion.input
                type="text"
                id="name"
                value={formState.name}
                onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                className="w-full bg-[#1A1A1A] border border-[#00FF41]/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00FF41] gradient-border cursor-text relative z-10"
                variants={inputVariants}
                whileFocus="focus"
                required
              />
            </motion.div>

            <motion.div variants={formVariants}>
              <label htmlFor="email" className="block text-[#00FF41] mb-2">Email</label>
              <motion.input
                type="email"
                id="email"
                value={formState.email}
                onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                className="w-full bg-[#1A1A1A] border border-[#00FF41]/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00FF41] gradient-border cursor-text relative z-10"
                variants={inputVariants}
                whileFocus="focus"
                required
              />
            </motion.div>

            <motion.div variants={formVariants}>
              <label htmlFor="message" className="block text-[#00FF41] mb-2">Message</label>
              <motion.textarea
                id="message"
                value={formState.message}
                onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                rows={4}
                className="w-full bg-[#1A1A1A] border border-[#00FF41]/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00FF41] gradient-border cursor-text relative z-10"
                variants={inputVariants}
                whileFocus="focus"
                required
              />
            </motion.div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="w-full bg-[#00FF41] text-black px-8 py-3 rounded-lg font-bold relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#00FF41] via-[#00FFFF] to-[#00FF41]"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: 'linear'
                }}
              />
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </span>
            </motion.button>

            {submitStatus === 'success' && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-green-500 text-center"
              >
                Message sent successfully!
              </motion.p>
            )}
            {submitStatus === 'error' && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-center"
              >
                Failed to send message. Please try again.
              </motion.p>
            )}
          </motion.form>
        </div>
      </motion.div>
    </section>
  );
};
 