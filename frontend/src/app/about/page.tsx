"use client";

import { motion } from 'framer-motion';
import { Globe, Target, Compass, Shield, Users, Heart, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  const values = [
    { 
      icon: Globe, 
      title: "Global Standards", 
      text: "UN Global Compact signatory since 2023",
      gradient: "from-[#3785CC] to-[#4A9BE4]"
    },
    { 
      icon: Target, 
      title: "Mission-Driven", 
      text: "Preferred strategic partner for consultancy and services",
      gradient: "from-[#4A9BE4] to-[#5B8AF0]"
    },
    { 
      icon: Compass, 
      title: "Clear Vision", 
      text: "Driving innovation and exceptional performance",
      gradient: "from-[#5B8AF0] to-[#8590EA]"
    },
    { 
      icon: Shield, 
      title: "Strong Ethics", 
      text: "Highest standards of integrity and professionalism",
      gradient: "from-[#8590EA] to-[#B5C6F4]"
    },
    { 
      icon: Users, 
      title: "Client Focus", 
      text: "Building lasting partnerships through collaboration",
      gradient: "from-[#3785CC] to-[#5B8AF0]"
    },
    { 
      icon: Heart, 
      title: "Core Values", 
      text: "Transparency, respect, innovation, and unwavering commitment to excellence",
      gradient: "from-[#4A9BE4] to-[#B5C6F4]"
    }
  ];

  const stats = [
    { number: "20+", label: "Years Experience" },
    { number: "200+", label: "Projects Completed" },
    { number: "25+", label: "Expert Team Members" },
    { number: "98%", label: "Client Satisfaction" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section - Dark */}
      <div className="relative overflow-hidden bg-[#111240]">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-full h-full bg-[url('/noise.png')] opacity-20"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#181c52] via-[#181c52] to-[#3785CC] animate-gradient"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-32">
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
              About Us
            </motion.span>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-purple-100 to-white/80 bg-clip-text text-transparent mb-6">
              Discover IC&I
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Learn about Information Consultancies & Installations (IC&I) and our commitment to excellence
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content - Light */}
      <div className="bg-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-full h-full bg-[url('/noise.png')] opacity-5"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#3785CC]/5 via-[#5B8AF0]/5 to-[#8590EA]/5 animate-gradient"></div>
        </div>
        
        <div className="container mx-auto px-4 py-24 relative">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Company History */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#3785CC] to-[#4A9BE4] rounded-2xl blur-2xl group-hover:blur-3xl transition-all duration-500 opacity-20"></div>
                <div className="relative rounded-2xl overflow-hidden">
                  <Image 
                    src="/about-page.webp"
                    alt="IC&I Office"
                    width={800}
                    height={600}
                    className="w-full aspect-[4/3] object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="p-6 rounded-xl bg-white shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors duration-300"
                  >
                    <div className="text-3xl font-bold bg-gradient-to-r from-[#002060] to-[#002060] bg-clip-text text-transparent mb-2">
                      {stat.number}
                    </div>
                    <div className="text-[#111240]/60 text-sm">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Story Content */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-[#002060] to-[#002060] bg-clip-text text-transparent">
                  Our Story
                </h2>
                <div className="space-y-4 text-[#111240]/70 text-lg leading-relaxed">
                  <p>
                    Founded in 2007 and headquartered in Damascus, Syria, Information Consultancies & 
                    Installations (IC&I) has become a recognized leader in the industry. Through close 
                    collaboration and a commitment to transparency, we have pioneered the market, 
                    establishing lasting partnerships with our clients.
                  </p>
                  <p>
                    Over the years, IC&I has built a strong reputation for delivering exceptional 
                    services and achieving remarkable results. Our dedication to excellence is reflected 
                    in the trust and loyalty we have earned from a wide range of clients.
                  </p>
                  <p>
                    With a presence across all Syrian governorates and main offices in Damascus, Aleppo, 
                    Homs, Lattakia, and Dara'a, we are strategically positioned to offer top-tier 
                    services wherever they are needed.
                  </p>
                </div>
              </div>

              {/* Mission & Vision */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 rounded-2xl bg-white shadow-sm border border-gray-100 hover:bg-gray-50 transition-all duration-300">
                  <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#002060] to-[#002060] bg-clip-text text-transparent">
                    Our Mission
                  </h3>
                  <p className="text-[#111240]/70">
                    To be the preferred strategic partner to our clients by providing the best 
                    consultancy and outsourcing services, HR services as well as ICT solutions 
                    and installation services throughout our talented team.
                  </p>
                </div>
                <div className="p-8 rounded-2xl bg-white shadow-sm border border-gray-100 hover:bg-gray-50 transition-all duration-300">
                  <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#002060] to-[#002060] bg-clip-text text-transparent">
                    Our Vision
                  </h3>
                  <p className="text-[#111240]/70">
                    We strive to strengthen IC&I's market presence by consistently delivering 
                    exceptional performance, superior service, and driving innovation to support 
                    long-term growth.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Values Section - Dark */}
      <div className="relative overflow-hidden bg-[#111240]">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-full h-full bg-[url('/noise.png')] opacity-20"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#181c52] via-[#181c52] to-[#3785CC] animate-gradient"></div>
        </div>

        <div className="container mx-auto px-4 py-32 relative">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="text-center mb-16">
              <motion.span
                variants={itemVariants}
                className="px-4 py-1.5 rounded-full text-sm font-medium bg-white/10 text-white/80 backdrop-blur-sm mb-4 inline-block"
              >
                Our Values
              </motion.span>
              <motion.h2
                variants={itemVariants}
                className="text-4xl font-bold mb-6 bg-gradient-to-r from-white via-purple-100 to-white/80 bg-clip-text text-transparent"
              >
                What Drives Us
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="text-xl text-white/80 max-w-2xl mx-auto"
              >
                Our core values shape everything we do and guide us in delivering excellence
              </motion.p>
            </div>

            <motion.div 
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
            >
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  variants={itemVariants}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-700 rounded-2xl transform rotate-1 scale-[1.02] opacity-50 group-hover:rotate-2 transition-transform duration-300"></div>
                  <div className="relative p-8 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 hover:bg-white/25 transition-all duration-300">
                    <div className={`p-4 rounded-xl bg-gradient-to-r ${value.gradient} transform group-hover:scale-110 transition-transform duration-300 mb-6 w-16 h-16 flex items-center justify-center`}>
                      <value.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-4">{value.title}</h3>
                    <p className="text-white/80">{value.text}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}