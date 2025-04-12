"use client";

import { motion } from 'framer-motion';
import { Server, Network, Shield, Zap, Hammer, ArrowRight } from 'lucide-react';
import ServiceHero from '@/components/services/ServiceHero';
import Link from 'next/link';

export default function DataCenterPage() {
  const services = [
    {
      icon: Server,
      title: "Design and Implementation",
      description: "Comprehensive approach to data center design and implementation, optimizing scalability, energy efficiency, and security measures.",
      gradient: "from-[#00B4D8] to-[#4A9BE4]"
    },
    {
      icon: Network,
      title: "Network Infrastructure",
      description: "Advanced network infrastructure solutions including comprehensive fiber and copper cabling systems, patching, racks, and accessories.",
      gradient: "from-[#4A9BE4] to-[#8590EA]"
    },
    {
      icon: Shield,
      title: "Security and Compliance",
      description: "Comprehensive security infrastructure including advanced physical security systems, access control protocols, and data encryption solutions.",
      gradient: "from-[#8590EA] to-[#B5C6F4]"
    },
    {
      icon: Zap,
      title: "Cooling and Power Solutions",
      description: "Advanced cooling and power management systems engineered to maintain optimal temperatures and ensure reliable power distribution.",
      gradient: "from-[#00B4D8] to-[#4A9BE4]"
    },
    {
      icon: Hammer,
      title: "Ongoing Support",
      description: "Dedicated technical support team providing comprehensive maintenance, monitoring, and rapid troubleshooting services.",
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
        title="Data Center Infrastructure"
        description="Building and Supporting World-Class Data Centers."
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
          
          <h2 className="text-4xl font-bold bg-gradient-to-r from-[#002060] to-[#002060] bg-clip-text text-transparent mb-8">
            Next-Generation Infrastructure
          </h2>
          

          <p className="text-lg text-[#111240]/70 leading-relaxed text-justify">
            In today's digital world, a robust and reliable data center infrastructure is critical 
            to the success of any organization. IC&I specializes in the design, implementation, 
            and support of data centers that meet the highest standards of performance and security. 
            Our comprehensive services cover every aspect of data center creation, ensuring that 
            your infrastructure is equipped to handle your business's current and future needs.
          </p>
        </motion.div>
        <div className="w-full h-[2px] bg-gradient-to-r from-[#3785CC] to-[#4A9BE4] my-12 opacity-50" />

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
              What We Offer
            </motion.span>
            <motion.h2
              variants={itemVariants}
              className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#002060] to-[#002060] bg-clip-text text-transparent"
            >
              Data Center Solutions
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-[#111240]/70 max-w-2xl mx-auto"
            >
              IC&I's data center infrastructure services are designed to provide a solid foundation 
              for your digital operations, helping you to achieve your business objectives with confidence.
            </motion.p>
          </div>

          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
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
                  <p className="text-[#111240]/60">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}