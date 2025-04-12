"use client";

import { motion } from 'framer-motion';
import { Server, Network, Shield, Code, Users, UserPlus, ClipboardList, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ServicesPage() {
  const services = {
    ict: {
      title: "ICT Solutions",
      description: "Our ICT solutions focus on optimizing business operations and driving process efficiency.",
      items: [
        {
          icon: Server,
          title: "Data Center Infrastructure",
          description: "Advanced data center solutions optimized for your growing business needs.",
          gradient: "from-[#3785CC] to-[#4A9BE4]",
          link: "/services/ict-solutions/data-center"
        },
        {
          icon: Network,
          title: "Solutions Integration",
          description: "Strategic technology solutions to enhance operations and drive business growth.",
          gradient: "from-[#4A9BE4] to-[#5B8AF0]",
          link: "/services/ict-solutions/solutions-integration"
        },
        {
          icon: Shield,
          title: "Information Security",
          description: "Advanced security solutions engineered to safeguard your critical business information assets.",
          gradient: "from-[#5B8AF0] to-[#8590EA]",
          link: "/services/ict-solutions/information-security"
        },
        {
          icon: Code,
          title: "Software Development",
          description: "Custom web and mobile application development solutions for complete digital transformation.",
          gradient: "from-[#8590EA] to-[#B5C6F4]",
          link: "/services/ict-solutions/software-development"
        }
      ]
    },
    business: {
      title: "Business Outsourcing",
      description: "Comprehensive HR and recruitment solutions to streamline your operations.",
      items: [
        {
          icon: UserPlus,
          title: "Jobs.ici – Recruiting",
          description: "Connect with top talents across various industries.",
          gradient: "from-[#3785CC] to-[#5B8AF0]",
          link: "/services/business-outsourcing/jobs-ici"
        },
        {
          icon: Users,
          title: "HR & Recruitment",
          description: "Professional HR solutions and talent acquisition for your business growth.",
          gradient: "from-[#4A9BE4] to-[#B5C6F4]",
          link: "/services/business-outsourcing/hr-recruitment"
        },
        {
          icon: ClipboardList,
          title: "HR Payroll & Performance",
          description: "Streamlined payroll and performance management.",
          gradient: "from-[#5B8AF0] to-[#B5C6F4]",
          link: "/services/business-outsourcing/hr-payroll"
        }
      ]
    }
  };

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
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-[#111240]">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-full h-full bg-[url('/noise.png')] opacity-20"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#181c52] via-[#181c52] to-[#3785CC] animate-gradient"></div>
        </div>
        
        <div className="relative w-full lg:w-[1280px]  mx-auto px-4 py-32">
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
              What We Offer
            </motion.span>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-[#fff] via-[#fff] to-[#fff] bg-clip-text text-transparent mb-6">
              Comprehensive Business Solutions
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Empowering your business with cutting-edge technology and expert talent management solutions
            </p>
          </motion.div>
        </div>
      </div>

      <div className="w-full lg:w-[1280px]  mx-auto px-4 py-24">
        {Object.entries(services).map(([key, section]) => (
          <motion.div 
            key={key} 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-32"
          >
            <div className="text-center mb-16">
              <motion.span
                variants={itemVariants}
                className="px-4 py-1.5 rounded-full text-sm font-medium bg-[#111240]/5 text-[#111240] backdrop-blur-sm mb-4 inline-block"
              >
                {section.title}
              </motion.span>
              <motion.h2
                variants={itemVariants}
                className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#002060] via-[#002060]/90 to-[#002060]/80 bg-clip-text text-transparent"
              >
                {section.title}
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="text-xl text-[#111240]/70 max-w-2xl mx-auto"
              >
                {section.description}
              </motion.p>
            </div>

            <motion.div
              variants={containerVariants} 
              className={`grid gap-8 max-w-7xl mx-auto ${
                section.items.length <= 3 
                  ? 'grid-cols-1 md:grid-cols-3 lg:grid-cols-3' 
                  : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
              }`}
            >
              {section.items.map((item) => (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#111240]/5 to-[#111240]/10 rounded-2xl transform rotate-1 scale-[1.02] opacity-50 group-hover:rotate-2 transition-transform duration-300"></div>
                  <div className="relative p-8 rounded-2xl bg-white shadow-lg border border-[#111240]/10 hover:bg-[#111240]/5 transition-all duration-300">
                    <div className={`p-4 rounded-xl bg-gradient-to-r ${item.gradient} transform group-hover:scale-110 transition-transform duration-300 mb-6 w-16 h-16 flex items-center justify-center`}>
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#002060] mb-4">{item.title}</h3>
                    <p className="text-[#111240]/70 mb-6">{item.description}</p>
                    <Link
                      href={item.link}
                      className="inline-flex items-center text-[#111240]/80 hover:text-[#111240] group/link"
                    >
                      <span className="mr-2">Learn More</span>
                      <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}