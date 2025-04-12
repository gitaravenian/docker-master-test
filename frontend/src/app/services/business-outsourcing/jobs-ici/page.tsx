"use client";

import { motion } from 'framer-motion';
import { Search, Upload, Bell, Activity, BookOpen, ArrowRight, Link } from 'lucide-react';
import ServiceHero from '@/components/services/ServiceHero';

export default function JobsIciPage() {
  const services = [
    {
      icon: Search,
      title: "Extensive Job Listings",
      description: "Browse through curated job opportunities matched to your experience level and preferences.",
      gradient: "from-[#00B4D8] to-[#4A9BE4]"
    },
    {
      icon: Upload,
      title: "Resume Submission",
      description: "Upload your resume securely to connect with potential employers and opportunities.",
      gradient: "from-[#4A9BE4] to-[#8590EA]"
    },
    {
      icon: Bell,
      title: "Personalized Job Alerts",
      description: "Get notified about relevant job openings that match your career interests and skills.",
      gradient: "from-[#8590EA] to-[#B5C6F4]"
    },
    {
      icon: Activity,
      title: "Application Tracking",
      description: "Monitor your job application progress with real-time updates and status tracking.",
      gradient: "from-[#00B4D8] to-[#4A9BE4]"

    },
    {
      icon: BookOpen,
      title: "Career Resources",
      description: "Access comprehensive tools and resources to enhance your job search and career development.",
      gradient: "from-[#4A9BE4] to-[#8590EA]"

    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <ServiceHero 
        title="Jobs.ici – Recruiting"
        description="Empowering Ambitious Professionals to Find Their Perfect Job."
      />

      <div className="w-full lg:w-[1280px]  mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-24 flex flex-col items-center text-justify"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="px-4 py-1.5 rounded-full text-sm font-medium bg-[#111240]/5 text-[#111240] backdrop-blur-sm mb-6 inline-block"

          >
            Overview
          </motion.span>
          
          <h2 className="text-4xl font-bold pb-1 bg-gradient-to-r from-[#002060] to-[#002060] bg-clip-text text-transparent mb-8">
            Building Careers in Syria
          </h2>
          
          <p className="text-lg text-[#111240]/70 leading-relaxed">
            IC&I is dedicated to fostering a thriving job market in Syria through our specialized platform, 
            Jobs.ici. This initiative is designed to connect ambitious and competent professionals with the 
            right job opportunities, helping to build careers and drive economic growth. Our platform's 
            intelligent matching algorithms actively work to pair job seekers with opportunities that align 
            with their qualifications and career goals.
          </p>
        </motion.div>

        <div className="w-full h-[1px] bg-gradient-to-r from-[#00B4D8] to-[#4A9BE4] my-8 opacity-50" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-16"
        >
          <div className="text-center mb-16">
            <motion.span
              variants={itemVariants}
              className="px-4 py-1.5 rounded-full text-sm font-medium bg-[#111240]/5 text-[#111240] backdrop-blur-sm mb-4 inline-block"
            >
              Platform Features
            </motion.span>
            <motion.h2
              variants={itemVariants}
              className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#002060] to-[#002060] bg-clip-text text-transparent"
            >
              Comprehensive Career Tools
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-[#111240]/70 max-w-2xl mx-auto"
            >
              Jobs.ici is more than just a job board—it's a comprehensive career-building tool designed 
              to empower Syrian professionals to achieve their career aspirations.
            </motion.p>
          </div>

          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                variants={itemVariants}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl transform rotate-1 scale-[1.02] opacity-50 group-hover:rotate-2 transition-transform duration-300"></div>
                <div className="relative p-8 rounded-2xl bg-white backdrop-blur-sm border border-gray-100 hover:bg-gray-50 transition-all duration-300 shadow-sm">
                  <div className={`p-4 rounded-xl bg-gradient-to-r ${service.gradient} transform group-hover:scale-110 transition-transform duration-300 mb-6 w-16 h-16 flex items-center justify-center`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#002060] mb-4">{service.title}</h3>
                  <p className="text-[#111240]/60 mb-6">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}