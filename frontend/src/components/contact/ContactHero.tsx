"use client";

import { motion } from 'framer-motion';

export default function ContactHero() {
  return (
    <div className="relative overflow-hidden py-32 bg-[#111240]">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full bg-[url('/noise.png')] opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#181c52] via-[#181c52] to-[#3785CC] animate-gradient"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="px-4 py-1.5 rounded-full text-sm font-medium bg-white/10 text-white/80 backdrop-blur-sm mb-6 inline-block"
          >
            Contact Us
          </motion.span>
          
          <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-purple-100 to-white/80 bg-clip-text text-transparent mb-6 leading-normal">
            Get in Touch
          </h1>
          
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            We're here to help! Whether you have questions, need support, or want to learn more about what we offer, 
            don't hesitate to reach out.
          </p>
        </motion.div>
      </div>
    </div>
  );
}