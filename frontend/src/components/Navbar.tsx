"use client";

import React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    {
      title: "What We Offer",
      submenu: [
        {
          title: "Business Outsourcing",
          href: "/services/business-outsourcing",
          items: [
            { name: "Jobs.ici – Recruiting", href: "/services/business-outsourcing/jobs-ici" },
            { name: "HR & Recruitment Management", href: "/services/business-outsourcing/hr-recruitment" },
            { name: "HR Payroll & Performance Management", href: "/services/business-outsourcing/hr-payroll" }
          ]
        },
        {
          title: "ICT Solutions",
          href: "/services/ict-solutions",
          items: [
            { name: "Data Center Infrastructure", href: "/services/ict-solutions/data-center" },
            { name: "Solutions Integration", href: "/services/ict-solutions/solutions-integration" },
            { name: "Information Security", href: "/services/ict-solutions/information-security" },
            { name: "Software Development", href: "/services/ict-solutions/software-development" }
          ]
        }
      ]
    }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-gray-900/80 backdrop-blur-lg border-b border-white/10' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center">
            <Image 
              src="/logo_ow.webp"
              alt="IC&I Logo" 
              width={120}
              height={48}
              className="h-12 w-auto transition-all duration-300" 
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-white/90 hover:text-white transition-colors relative group"
            >
              <span>Home</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#181c52] group-hover:w-full transition-all duration-300"></span>
            </Link>
            
            <div className="relative group">
              <Link href="/services" className="flex items-center text-white/90 hover:text-white transition-colors">
                What We Offer
                <ChevronDown className="ml-1 h-4 w-4 transform group-hover:rotate-180 transition-transform duration-300" />
              </Link>
              <div className="absolute top-full left-1/2 -translate-x-1/2 hidden group-hover:block w-[600px] p-1">
                <div className="bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
                  <div className="grid grid-cols-2 gap-8">
                    {menuItems[0].submenu.map((section) => (
                      <div key={section.title} className="space-y-4">
                        <Link href={section.href} className="block">
                          <h3 className="text-white font-semibold mb-2 hover:text-[#3785CC] transition-colors">{section.title}</h3>
                        </Link>
                        <div className="space-y-2">
                          {section.items.map((item) => (
                            <Link 
                              key={item.name}
                              href={item.href}
                              className="group flex items-center text-white hover:text-[#3785CC] transition-colors py-2"
                            >
                              <ChevronRight className="w-4 h-4 mr-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Link 
              href="/about" 
              className="text-white/90 hover:text-white transition-colors relative group"
            >
              <span>About Us</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#181c52] group-hover:w-full transition-all duration-300"></span>
            </Link>

            <Link 
              href="/blogs" 
              className="text-white/90 hover:text-white transition-colors relative group"
            >
              <span>Blog</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#181c52] group-hover:w-full transition-all duration-300"></span>
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium rounded-full shadow-sm text-white bg-[#3785CC] hover:bg-[#3785CC]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3785CC]/50 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white focus:outline-none"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-gray-900/95 backdrop-blur-xl border-t border-white/10"
            >
              <div className="px-4 py-6 space-y-4">
                <Link 
                  href="/"
                  className="block text-white/90 hover:text-white transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                
                {menuItems[0].submenu.map((section) => (
                  <div key={section.title} className="space-y-2">
                    <Link href={section.href} className="block">
                      <h3 className="text-white font-semibold mb-2 hover:text-[#3785CC] transition-colors">{section.title}</h3>
                    </Link>
                    {section.items.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block text-white/70 hover:text-white transition-colors py-2 pl-4"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                ))}

                <Link 
                  href="/about"
                  className="block text-white/90 hover:text-white transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  About Us
                </Link>

                <Link 
                  href="/blogs"
                  className="block text-white/90 hover:text-white transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Blog
                </Link>

                <Link 
                  href="/contact"
                  className="block px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;