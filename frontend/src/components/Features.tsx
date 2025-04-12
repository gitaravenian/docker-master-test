"use client";

import { motion } from 'framer-motion';
import { Shield, Clock, Users, TrendingUp, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    title: 'Trustworthy',
    description: 'Over 25 years of expertise in delivering innovative and high-quality business solutions',
    icon: Shield,
    gradient: "from-[#3785CC] to-[#4A9BE4]",
    link: "/about#expertise"
  },
  {
    title: '24/7 Support',
    description: 'Comprehensive round-the-clock technical support and professional assistance for all your business needs',
    icon: Clock,
    gradient: "from-[#4A9BE4] to-[#5B8AF0]",
    link: "/services#support"
  },
  {
    title: 'Expert Team',
    description: 'Dedicated team of professionals with extensive industry knowledge and experience',
    icon: Users,
    gradient: "from-[#5B8AF0] to-[#8590EA]",
    link: "/about#team"
  },
  {
    title: 'Scalable Solutions',
    description: 'Flexible and adaptable solutions designed to grow seamlessly with your business',
    icon: TrendingUp,
    gradient: "from-[#8590EA] to-[#B5C6F4]",
    link: "/services#solutions"
  }
];

export default function Features() {
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
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full bg-[url('/noise.png')] opacity-5"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#3785CC]/5 via-[#5B8AF0]/5 to-[#8590EA]/5 animate-gradient"></div>
      </div>

      <div className="w-full lg:w-[1280px] mx-auto px-4 relative">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.span
            variants={itemVariants}
            className="px-4 py-1.5 rounded-full text-sm font-medium bg-[#111240]/5 text-[#111240] backdrop-blur-sm mb-4 inline-block"
          >
            Our Advantages
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="text-5xl font-bold mb-6 pb-6 bg-gradient-to-r from-[#002060] to-[#002060]/80 bg-clip-text text-transparent"
          >
            Why Choose IC&I?
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-[#111240]/70 max-w-2xl mx-auto"
          >
            Experience excellence in every aspect of our service delivery
          </motion.p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#3785CC]/5 to-[#5B8AF0]/5 rounded-2xl transform rotate-2 scale-[1.02] opacity-50 group-hover:rotate-1 transition-transform duration-300"></div>
              <Link href={feature.link}>
                <div className="relative p-8 rounded-2xl bg-white backdrop-blur-sm border border-gray-100 hover:bg-gray-50 transition-all duration-300 text-center group-hover:transform group-hover:scale-[1.02] shadow-sm">
                  <div className={`p-4 rounded-xl bg-gradient-to-r ${feature.gradient} mx-auto w-16 h-16 flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-[#002060]">{feature.title}</h3>
                  <p className="text-[#111240]/60 mb-6">{feature.description}</p>
                  {/* <div className="inline-flex items-center text-[#111240]/80 hover:text-[#111240] group/link">
                    <span className="mr-2">Learn More</span>
                    <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform duration-300" />
                  </div> */}
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}