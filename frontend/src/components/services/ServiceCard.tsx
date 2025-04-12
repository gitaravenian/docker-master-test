"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  service: {
    icon: any;
    title: string;
    description: string;
    link: string;
  };
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      className="group bg-white rounded-xl shadow-lg hover:shadow-xl 
        transition-all duration-300 hover:-translate-y-2 overflow-hidden"
    >
      <div className="p-8">
        <service.icon className="w-12 h-12 text-primary mb-4" />
        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
          {service.title}
        </h3>
        <p className="text-gray-600 mb-6">{service.description}</p>
        
        <Link 
          href={service.link}
          className="inline-flex items-center text-primary font-medium 
            hover:text-secondary transition-colors group/link"
        >
          Read More 
          <ArrowRight className="ml-2 w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}