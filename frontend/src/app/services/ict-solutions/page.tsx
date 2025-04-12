"use client";

import { motion } from 'framer-motion';
import { Server, Network, Shield, Code, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import ServiceHero from '@/components/services/ServiceHero';

export default function ICTSolutionsPage() {
  const services = [
    {
      icon: Server,
      title: "Data Center Infrastructure",
      description: "From design and build to ongoing management, our end-to-end data center infrastructure solutions support your business's growing technology needs.",
      link: "/services/ict-solutions/data-center",
      gradient: "from-[#3785CC] to-[#4A9BE4]"
    },
    {
      icon: Network,
      title: "Solutions Integration",
      description: "Our advanced technology solutions are strategically designed to optimize operations, reduce costs, and fuel sustainable business growth.",
      link: "/services/ict-solutions/solutions-integration",
      gradient: "from-[#4A9BE4] to-[#8590EA]"
    },
    {
      icon: Shield,
      title: "Information Security",
      description: "Advanced cybersecurity solutions protecting your data through threat detection, encryption, and continuous monitoring against evolving cyber threats.",
      link: "/services/ict-solutions/information-security",
      gradient: "from-[#8590EA] to-[#B5C6F4]"
    },
    {
      icon: Code,
      title: "Software Development",
      description: "Custom web and mobile applications tailored to meet business needs and drive digital transformation.",
      link: "/services/ict-solutions/software-development",
      gradient: "from-[#3785CC] to-[#4A9BE4]"
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
        title="ICT Solutions"
        description="IC&I brings over 20 years of experience in ICT consultation, installation, and commissioning services, delivering reliable solutions tailored to meet diverse business needs."
      />

      <div className="w-full lg:w-[1280px] mx-auto px-4 py-24">
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
            Technology Solutions for Growth
          </h2>
          
          <p className="text-lg text-[#111240]/70 leading-relaxed text-justify">
            Our comprehensive ICT solutions are designed to help businesses optimize their operations, 
            enhance security, and stay competitive in today's technology-driven landscape. With over two 
            decades of experience, we provide expert consultation, installation, and commissioning services 
            tailored to meet your specific business needs.
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
              Our Solutions
            </motion.span>
            <motion.h2
              variants={itemVariants}
              className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#002060] to-[#002060] bg-clip-text text-transparent"
            >
              Comprehensive ICT Services
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-[#111240]/70 max-w-2xl mx-auto"
            >
              Explore our range of specialized ICT solutions designed to transform your business operations 
              and drive sustainable growth.
            </motion.p>
          </div>

          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service) => (
              <motion.div
                key={service.title}
                variants={itemVariants}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl transform rotate-1 scale-[1.02] opacity-50 group-hover:rotate-2 transition-transform duration-300"></div>
                <Link href={service.link}>
                  <div className="relative rounded-2xl bg-white backdrop-blur-sm border border-gray-100 overflow-hidden transition-all duration-300 group-hover:bg-gray-50 shadow-sm">
                    <div className="p-8">
                      <div className={`p-4 rounded-xl bg-gradient-to-r ${service.gradient} transform group-hover:scale-110 transition-transform duration-300 mb-6 w-16 h-16 flex items-center justify-center`}>
                        <service.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-[#002060] mb-4">{service.title}</h3>
                      <p className="text-[#111240]/60 mb-6">{service.description}</p>
                      <div className="inline-flex items-center text-[#111240]/80 hover:text-[#111240] group/link">
                        <span className="mr-2">Learn More</span>
                        <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}