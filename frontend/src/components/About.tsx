"use client";

import { motion } from 'framer-motion';
import { Globe, Target, Compass, Shield, Users, Heart, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function About() {
  const features = [
    { 
      icon: Globe, 
      title: "Global Standards", 
      text: "UN Global Compact signatory since 2023",
      color: "from-blue-500 to-cyan-500"
    },
    { 
      icon: Target, 
      title: "Member in UN Global Compact", 
      text: "ICI affirms every year its support of Ten principles of the UN Global Compact in the areas of Human Rights, Labour, Environment, and Anti corruption.",
      color: "from-purple-500 to-pink-500"
    },
    { 
      icon: Compass, 
      title: "Clear Vision", 
      text: "Driving innovation and exceptional performance",
      color: "from-orange-500 to-yellow-500"
    }
  ];

  const stats = [
    { number: "20+", label: "Years Experience" },
    { number: "200+", label: "Projects Completed" },
    { number: "25+", label: "Expert Team Members" },
    { number: "98%", label: "Client Satisfaction" }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full bg-[url('/noise.png')] opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#F7F9FE] to-[#F7F9FE] animate-gradient"></div>
      </div>

      <div className="w-full lg:w-[1280px] mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block"
          >
            <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-gray-200 text-[#111240] backdrop-blur-sm mb-4 inline-block">
              About Us
            </span>
            <h2 className="text-5xl font-bold mb-6 text-[#002060]">
              DISCOVER IC&I
            </h2>
            <p className="text-xl text-[#111240] max-w-2xl mx-auto leading-relaxed">
              Your Reliable Partner in ICT Consulting, Solutions & Services
            </p>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Left Column - Image and Stats */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-2xl group-hover:blur-3xl transition-all duration-500 opacity-75"></div>
              <img
                src="/about.webp"
                alt="IC&I Office"
                className="relative rounded-2xl w-full aspect-[4/3] object-cover transform group-hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-xl bg-transparent backdrop-blur-sm border border-[#B5C6F4] transition-colors duration-300"
                >
                  <div className="text-3xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text mb-2 text-[#002060]">
                    {stat.number}
                  </div>
                  <div className="text-[#111240] text-sm">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Content and Features */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-6 text-lg text-[#111240] leading-relaxed">
              <p>
                A leading provider of ICT solutions, IC&I specializes in comprehensive consultancy, 
                installation, commissioning, and outsourcing services. Our corporate business 
                solutions span a range of sectors, including telecom, ISPs, banking, NGOs and more.
              </p>
              <p>
                We handle all aspects of human resources services, especially contracting and 
                outsourcing, designed to streamline your workforce management by providing 
                flexible, efficient and scalable solutions.
              </p>
            </div>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-[#B5C6F4] hover:bg-[#B5C6F4] transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#002060] mb-2">{feature.title}</h3>
                      <p className="text-[#111240]">{feature.text}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link 
              href="/about"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-[#002060]
                backdrop-blur-sm border border-white/10 transition-all duration-300 group"
            >
              <span>Learn More About Us</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}