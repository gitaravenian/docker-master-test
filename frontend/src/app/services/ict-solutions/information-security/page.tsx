"use client";

import { motion } from 'framer-motion';
import { Shield, Search, Laptop, Server, FileCheck, Zap, ArrowRight } from 'lucide-react';
import ServiceHero from '@/components/services/ServiceHero';

export default function InformationSecurityPage() {
  const services = [
    {
      icon: Shield,
      title: "Traffic Management Solutions",
      description: "Advanced traffic monitoring and control systems implementing DPI, DLP, and IDS tools for enhanced network security and performance.",
      gradient: "from-[#00B4D8] to-[#4A9BE4]"

    },
    {
      icon: Search,
      title: "Security Consultations",
      description: "Comprehensive security assessments and strategic consulting to identify vulnerabilities and implement robust defense mechanisms.",
      gradient: "from-[#4A9BE4] to-[#8590EA]"

    },
    {
      icon: Laptop,
      title: "Endpoint Security Solutions",
      description: "Advanced protection systems for all devices, safeguarding against malware, ransomware, and emerging cyber threats with real-time monitoring and response.",
      gradient: "from-[#8590EA] to-[#B5C6F4]"

    },
    {
      icon: Server,
      title: "IT Security Infrastructure",
      description: "Comprehensive security architecture with advanced firewalls, encryption systems, and multi-layer protection protocols to safeguard critical assets and sensitive data.",
      gradient: "from-[#00B4D8] to-[#4A9BE4]"

    },
    {
      icon: FileCheck,
      title: "Compliance and Risk Management",
      description: "Expert guidance on industry compliance standards while implementing effective risk management strategies for optimal security.",
      gradient: "from-[#4A9BE4] to-[#8590EA]"

    },
    {
      icon: Zap,
      title: "Incident Response",
      description: "Swift security incident management with thorough analysis, immediate containment strategies, and preventive measures to ensure business continuity and strengthen defenses.",
      gradient: "from-[#8590EA] to-[#B5C6F4]"

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
        title="Information Security"
        description="Protecting Your Digital Assets in an Evolving Threat Landscape."
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
            Advanced Security Solutions
          </h2>
          
          <p className="text-lg text-[#111240]/70 leading-relaxed text-justify">
            In an era where cyber threats are increasingly sophisticated, IC&I is dedicated to 
            providing comprehensive information security services that protect your organization's 
            digital assets. We offer a wide range of security solutions designed to safeguard your 
            data, ensure compliance, and provide peace of mind.
          </p>
        </motion.div>

        <div className="w-full h-[1px] bg-gradient-to-r from-[#3785CC] to-[#4A9BE4] my-8 opacity-50" />

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
              Security Solutions & Services
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-[#111240]/70 max-w-2xl mx-auto"
            >
              At IC&I, we are committed to staying ahead of emerging threats and providing our clients 
              with the most effective security solutions.
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