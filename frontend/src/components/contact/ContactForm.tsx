"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { Send, User, Mail, MessageSquare, AlertCircle, CheckCircle, Loader } from "lucide-react";
import { apiClient } from "@/lib/api";

// Define form data type
interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [submitStatus, setSubmitStatus] = useState<{ 
    type: 'success' | 'error' | 'loading' | null; 
    message: string;
    visible?: boolean;
  }>({ 
    type: null, 
    message: '' 
  });

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    subject: Yup.string()
      .min(5, "Subject must be at least 5 characters")
      .required("Subject is required"),
    message: Yup.string()
      .min(10, "Message must be at least 10 characters")
      .required("Message is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  // Form submission handler
  const onSubmit = async (data: FormData) => {
    setSubmitStatus({ type: null, message: '' });
    try {
      // Show loading state
      setSubmitStatus({
        visible: true,
        type: "loading",
        message: "Sending your message, please wait...",
      });
      
      // Send request using our API client
      const response = await apiClient.post('/api/contact', data);
      console.log('Form submission response:', response.data);
      
      // Show success notification
      setSubmitStatus({ 
        type: 'success', 
        message: 'Thank you! Your message has been sent successfully. We will get back to you soon.' 
      });
      reset();
      
      // Automatically hide the success message after 2 seconds
      setTimeout(() => {
        setSubmitStatus({ type: null, message: '' });
      }, 2000);
      
    } catch (error: any) {
      console.error("Form submission error:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      });
      
      // Show error notification
      setSubmitStatus({ 
        type: 'error', 
        message: error.response?.data?.message || 'Failed to send the message. Please try again.' 
      });
    }
  };

  // Animation variants
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
      className="space-y-6"
    >
      <motion.div variants={itemVariants} className="space-y-4">
        <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-[#002060]/5 text-[#002060] backdrop-blur-sm inline-block">
          Send us a message
        </span>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-[#002060] via-[#002060]/90 to-[#002060]/80 bg-clip-text text-transparent">
          Contact Us
        </h2>
        <p className="text-[#002060]/70 text-lg leading-relaxed max-w-lg">
          Fill out the form below and we'll get back to you as soon as possible.
        </p>
      </motion.div>

      {submitStatus.type && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`p-4 rounded-lg flex items-center gap-2 ${
            submitStatus.type === 'success' ? 'bg-green-50 text-green-700' :
            submitStatus.type === 'error' ? 'bg-red-50 text-red-700' :
            'bg-blue-50 text-blue-700'
          }`}
        >
          {submitStatus.type === 'success' && <CheckCircle className="w-5 h-5" />}
          {submitStatus.type === 'error' && <AlertCircle className="w-5 h-5" />}
          {submitStatus.type === 'loading' && <Loader className="w-5 h-5 animate-spin" />}
          <span>{submitStatus.message}</span>
        </motion.div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-[#002060]/70" />
            <label htmlFor="name" className="text-[#002060]/70">Name</label>
          </div>
          <input
            {...register("name")}
            type="text"
            id="name"
            className={`w-full p-3 rounded-lg border ${
              errors.name ? 'border-red-500' : 'border-[#002060]/20'
            } focus:outline-none focus:ring-2 focus:ring-[#002060]/20`}
            placeholder="Your name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-[#002060]/70" />
            <label htmlFor="email" className="text-[#002060]/70">Email</label>
          </div>
          <input
            {...register("email")}
            type="email"
            id="email"
            className={`w-full p-3 rounded-lg border ${
              errors.email ? 'border-red-500' : 'border-[#002060]/20'
            } focus:outline-none focus:ring-2 focus:ring-[#002060]/20`}
            placeholder="Your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#002060]/70" />
            <label htmlFor="subject" className="text-[#002060]/70">Subject</label>
          </div>
          <input
            {...register("subject")}
            type="text"
            id="subject"
            className={`w-full p-3 rounded-lg border ${
              errors.subject ? 'border-red-500' : 'border-[#002060]/20'
            } focus:outline-none focus:ring-2 focus:ring-[#002060]/20`}
            placeholder="Message subject"
          />
          {errors.subject && (
            <p className="text-red-500 text-sm">{errors.subject.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#002060]/70" />
            <label htmlFor="message" className="text-[#002060]/70">Message</label>
          </div>
          <textarea
            {...register("message")}
            id="message"
            rows={5}
            className={`w-full p-3 rounded-lg border ${
              errors.message ? 'border-red-500' : 'border-[#002060]/20'
            } focus:outline-none focus:ring-2 focus:ring-[#002060]/20`}
            placeholder="Your message"
          />
          {errors.message && (
            <p className="text-red-500 text-sm">{errors.message.message}</p>
          )}
        </div>

        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-3 px-6 rounded-lg bg-[#002060] text-white font-medium flex items-center justify-center gap-2 ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Send Message
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default ContactForm;