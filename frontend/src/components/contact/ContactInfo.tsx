"use client";

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Building2, Facebook, Twitter, Linkedin, Instagram, PhoneCall, Printer } from 'lucide-react';
import Link from 'next/link';

export default function ContactInfo() {
  const contactDetails = [
    {
      icon: MapPin,
      title: "Office Locations",
      details: [
        "90/3 Adawi Enshaat, Damascus, Syria",
        "21/2051 Baladieh, Jaramana, Syria"
      ]
    },
    {
      icon: Phone,
      title: "Phone and Fax Numbers",
      details: [
        {
          label: "Phone:",
          text: "+963 44 20 567"
        },
        {
          label: "Fax:",
          text: "+963 44 30 567"
        }
      ]
    },
    {
      icon: Mail,
      title: "Email Address",
      details: ["gd@ici-sy.com"]
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' }
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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-12"
    >
      <motion.div variants={itemVariants} className="space-y-4">
        <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-[#002060]/5 text-[#002060] backdrop-blur-sm inline-block">
          Contact Information
        </span>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-[#002060] via-[#002060]/90 to-[#002060]/80 bg-clip-text text-transparent">
          Let's Make It Happen
        </h2>
        <p className="text-[#111240]/70 text-lg leading-relaxed max-w-lg">
          Have a question or want to work together? We'd love to hear from you. 
          Get in touch with us using any of the following methods.
        </p>
      </motion.div>

      <motion.div variants={containerVariants} className="space-y-8">
        {contactDetails.map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#3785CC]/5 to-[#5B8AF0]/5 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
            <div className="relative p-6 rounded-xl bg-white shadow-lg border border-[#111240]/10 hover:bg-[#111240]/5 transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-lg bg-gradient-to-r from-[#3785CC] to-[#5B8AF0]">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-[#002060] font-semibold mb-2">{item.title}</h3>
                  {item.details.map((detail, detailIndex) => (
                    <div
                      key={detailIndex}
                      className="flex items-center space-x-2 text-[#111240]/70"
                    >
                      {typeof detail === 'string' ? (
                        <span>{detail}</span>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-[#002060]">{detail.label}</span>
                          <span>{detail.text}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-4">
        <h3 className="text-lg font-semibold text-[#002060]">Follow Us</h3>
        <div className="flex space-x-4">
          {socialLinks.map((social, index) => (
            <Link
              key={index}
              href={social.href}
              className="p-3 rounded-lg bg-[#002060]/5 hover:bg-[#002060]/10 text-[#002060]/80 hover:text-[#002060] transition-all duration-300"
              aria-label={social.label}
            >
              <social.icon className="w-5 h-5" />
            </Link>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}