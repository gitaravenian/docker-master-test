"use client";

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import CenterLayout from './CenterLayout';

const slides = [
  {
    title: ["Information Consultancies", "& Installations"].join("\n"),
    subtitle: "WELCOME TO IC&I",
    description: "Our customized ICT solutions are designed to drive client growth, adapt to their evolving needs, and ensure success in a constantly changing world.",
    video: "/hero_section.webm",
    accent: "from-[#002060] to-[#B5C6F4]",
    buttons: {
      primary: { text: "Learn More", href: "/about" },
      secondary: { text: "Contact Us", href: "/contact" }
    }
  },
  {
    title: "Consultancy Services for SMEs",
    subtitle: "ACHIEVE YOUR BUSINESS GOALS",
    description: "Our consultancy services, ranging from market research to project management, are tailored to enhance your business strategy.",
    video: "/hero_section.webm",
    accent: "from-[#002060] to-[#B5C6F4]",
    buttons: {
      primary: { text: "Get a Consultation", href: "/contact" },
      secondary: { text: "What We Offer", href: "/services" }
    }
  },
  {
    title: ["Installation,", "Commissioning,", "and Beyond"].join("\n"),
    subtitle: "SUCCESS ALL THE WAY",
    description: "Our solutions go beyond implementation, offering strong after-sales support to ensure maximum performance.",
    video: "/hero_section.webm",
    accent: "from-[#002060] to-[#B5C6F4]",
    buttons: {
      primary: { text: "What We Offer", href: "/services" },
      secondary: { text: "Contact Us", href: "/contact" }
    }
  }
];

export default function Hero() {
  const swiperRef = useRef(null);

  return (

        <div className="relative h-[120vh]">
        <Swiper
          ref={swiperRef}
          effect="fade"
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={{
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next',
          }}
          modules={[Autoplay, EffectFade, Navigation, Pagination]}
          className="h-full w-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-full w-full">
                <div className="absolute inset-0">
                  <video
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    src={slide.video}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-600/70 mix-blend-multiply`} />
                  <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20" />
                </div>

                <div className="relative h-full flex items-center pt-15">
                  <div className="w-full lg:w-[1280px] mx-auto px-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      className="max-w-3xl"
                    >
                      <motion.span 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="inline-block text-lg font-medium mb-4 text-white/90 backdrop-blur-sm bg-white/10 px-4 py-1 rounded-full mt-8"
                      >
                        {slide.subtitle}
                      </motion.span>
                      <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-6xl md:text-7xl font-bold mb-6 pb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80 whitespace-pre-line"
                      >
                        {slide.title}
                      </motion.h1>
                      <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="text-xl mb-8 text-white/80 leading-relaxed max-w-2xl backdrop-blur-sm bg-black/10 p-4 rounded-lg"
                      >
                        {slide.description}
                      </motion.p>
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="flex flex-wrap gap-4"
                      >
                        <Link
                          href={slide.buttons.primary.href}
                          className="group relative bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 
                            text-white px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105
                            hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] overflow-hidden"
                        >
                          <span className="relative z-10">{slide.buttons.primary.text}</span>
                          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 
                            translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        </Link>
                        <Link
                          href={slide.buttons.secondary.href}
                          className="group relative bg-transparent border border-white/30 hover:border-white/50
                            text-white px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
                        >
                          <span className="relative z-10">{slide.buttons.secondary.text}</span>
                          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 
                            translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        </Link>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}

          <div className="swiper-button-prev !text-white hover:text-secondary transition-colors">
            <ChevronLeft className="w-8 h-8" />
          </div>
          <div className="swiper-button-next !text-white hover:text-secondary transition-colors">
            <ChevronRight className="w-8 h-8" />
          </div>
        </Swiper>
      </div>
  );
}