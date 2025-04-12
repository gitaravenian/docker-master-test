"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-32 bg-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full bg-[url('/noise.png')] opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#181C52] to-[#181C52] animate-gradient"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#3785CC] rounded-full blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#3785CC] rounded-full blur-3xl opacity-30 animate-pulse delay-1000"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-white/10 text-white/80 backdrop-blur-sm mb-8 inline-block">
            Get Started
          </span>
          
          <h2 className="text-5xl font-bold pb-8 mb-8 bg-gradient-to-r from-white via-purple-100 to-white/80 bg-clip-text text-transparent">
            Ready to Transform Your Business?
          </h2>
          
          <p className="text-xl mb-12 text-white/80 max-w-2xl mx-auto leading-relaxed">
            Let's discuss how IC&I can help you achieve your business goals with our comprehensive solutions.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/contact"
              className="group relative px-8 py-4 bg-gradient-to-r from-[#3785CC] to-[#B5C6F4] rounded-full 
                overflow-hidden transition-all duration-300 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 
                translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <span className="relative flex items-center text-white font-medium">
                Get Started Today
                <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Link>

            <Link
              href="/services"
              className="group relative px-8 py-4 rounded-full border border-white/20 hover:bg-white/10
                backdrop-blur-sm transition-all duration-300"
            >
              <span className="text-white/90 group-hover:text-white flex items-center font-medium">
                Explore What We Offer
                <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}