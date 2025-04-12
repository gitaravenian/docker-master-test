"use client";

import { motion } from 'framer-motion';
import { Network, CreditCard, Users, Settings, Hammer } from 'lucide-react';
import ServiceHero from '@/components/services/ServiceHero';

export default function SolutionsIntegrationPage() {
  const services = [
    {
      icon: Network,
      title: "BSCS System Expertise",
      description: "Comprehensive implementation and optimization of Business Support and Control Systems (BSCS) for enhanced operational efficiency and customer service delivery.",
      gradient: "from-[#00B4D8] to-[#4A9BE4]"

    },
    {
      icon: CreditCard,
      title: "E-Payment Integration",
      description: "Advanced electronic payment solutions integrating Syrian Telecom Company with SEP platform for secure, efficient, and streamlined digital transactions.",
      gradient: "from-[#4A9BE4] to-[#8590EA]"
    },
    {
      icon: Users,
      title: "Customer Care & Billing Systems",
      description: "Comprehensive development and management of CCBS for Syrian Telecom Company, delivering efficient customer service and billing operations since 2013.",
      gradient: "from-[#8590EA] to-[#B5C6F4]"
    },
    {
      icon: Settings,
      title: "System Integration Services",
      description: "Advanced integration of complex technology components and platforms, ensuring optimal performance and seamless communication between diverse systems.",
      gradient: "from-[#00B4D8] to-[#4A9BE4]"
    },
    {
      icon: Hammer,
      title: "Ongoing Support",
      description: "Comprehensive maintenance and technical support services ensuring continuous system optimization, performance monitoring, and efficient issue resolution.",
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
        title="Solutions Integration"
        description="Delivering Tailored Technology Solutions for Complex Business Challenges."
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
            Enterprise Solutions Integration
          </h2>
          

          <p className="text-lg text-[#111240]/70 leading-relaxed text-justify">
            IC&I brings a wealth of experience to the integration of complex technology solutions, 
            particularly in the utility and telecommunications sectors. Our approach is rooted in a 
            deep understanding of industry-specific challenges and a commitment to delivering solutions 
            that enhance operational efficiency and drive tangible results.
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
              className="text-4xl font-bold mb-6 pb-1 bg-gradient-to-r from-[#002060] to-[#002060] bg-clip-text text-transparent"
            >
              Integration Solutions & Services
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-[#111240]/70 max-w-2xl mx-auto"
            >
              Our solutions integration services are customized to meet the unique needs of each client, 
              ensuring that technology not only supports but enhances your business operations.
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