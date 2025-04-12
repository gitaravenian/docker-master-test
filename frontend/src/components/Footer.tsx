"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Building2, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    businessOutsourcing: {
      title: 'Business Outsourcing',
      links: [
        { text: 'HR Payroll & Performance Management', href: '/hr-payroll' },
        { text: 'HR & Recruitment Management', href: '/hr-recruitment' },
        { text: 'Jobs.ici – Recruiting', href: '/jobs-ici' },
      ],
    },
    itSolutions: {
      title: 'IT Solutions',
      links: [
        { text: 'Solutions Integration', href: '/solutions-integration' },
        { text: 'Information Security', href: '/information-security' },
        { text: 'Software Development', href: '/software-development' },
        { text: 'Data Center Infrastructure', href: '/data-center' },
      ],
    },
  };

  const contactInfo = [
    { Icon: MapPin, text: '90/3 Adawi Enshaat, Damascus, Syria.' },
    { Icon: MapPin, text: '21/2051 Baladieh, Jaramana, Syria' },
    { 
      Icon: Phone, 
      text: ['Phone: +963 44 20 567', 'Fax: +963 44 30 567'],
      multiline: true 
    },
    { Icon: Mail, text: 'gd@ici-sy.com' },
  ];

  const socialLinks = [
    { Icon: Facebook, href: '#', label: 'Facebook' },
    { Icon: Twitter, href: '#', label: 'Twitter' },
    { Icon: Linkedin, href: '#', label: 'LinkedIn' },
    { Icon: Instagram, href: '#', label: 'Instagram' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <footer className="bg-gradient-to-b from-[#111240] to-[#0A0C2E] relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full bg-[url('/noise.png')] opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#3785CC]/10 via-[#5B8AF0]/10 to-[#8590EA]/10 animate-gradient"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16"
        >
          {/* Company Info */}
          <motion.div variants={itemVariants} className="space-y-6">
            <Link href="/" className="block">
              <Image 
                src="/logo_ow.webp" 
                alt="IC&I Logo" 
                width={140}
                height={56}
                className="h-14 w-auto"
              />
            </Link>
            <p className="text-white/80 text-sm leading-relaxed">
              Information Consultancies & Installations (IC&I) is a leading provider of ICT solutions and business outsourcing services in Syria.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="p-2 rounded-full bg-[#3785CC]/10 hover:bg-[#3785CC]/20 border border-[#3785CC]/20 
                    transition-colors duration-300 group"
                  aria-label={social.label}
                >
                  <social.Icon className="w-5 h-5 text-white/80 group-hover:text-white transition-colors duration-300" />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Business Outsourcing */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-lg font-semibold text-white bg-gradient-to-r from-[#3785CC] to-[#4A9BE4] bg-clip-text text-transparent">{footerLinks.businessOutsourcing.title}</h3>
            <ul className="space-y-3">
              {footerLinks.businessOutsourcing.links.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="group flex items-center text-white/80 hover:text-white transition-colors duration-300"
                  >
                    <span>{link.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* IT Solutions */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-lg font-semibold text-white bg-gradient-to-r from-[#4A9BE4] to-[#8590EA] bg-clip-text text-transparent">{footerLinks.itSolutions.title}</h3>
            <ul className="space-y-3">
              {footerLinks.itSolutions.links.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="group flex items-center text-white/80 hover:text-white transition-colors duration-300"
                  >
                    <span>{link.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-lg font-semibold text-white bg-gradient-to-r from-[#8590EA] to-[#B5C6F4] bg-clip-text text-transparent">Contact Info</h3>
            <ul className="space-y-4">
              {contactInfo.map((item, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-[#3785CC]/10 border border-[#3785CC]/20">
                    <item.Icon className="w-5 h-5 text-white/80" />
                  </div>
                  <div>
                    {Array.isArray(item.text) ? (
                      item.text.map((line, i) => (
                        <p key={i} className="text-white/80">{line}</p>
                      ))
                    ) : (
                      <span className="text-white/80">{item.text}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative py-8 border-t border-white/20"
        >
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0">
            <p className="text-sm text-white/80">
              &copy; {new Date().getFullYear()} Information Consultancies & Installations (IC&I). All rights reserved.
            </p>
            {/* <div className="flex space-x-6">
              <Link href="/privacy" className="text-sm text-white/80 hover:text-white transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-white/80 hover:text-white transition-colors duration-300">
                Terms of Service
              </Link>
            </div> */}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;