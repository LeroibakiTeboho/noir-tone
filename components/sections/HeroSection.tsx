// components/sections/HeroSection.tsx
'use client';

import { motion } from 'framer-motion';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  bgImage?: string;
}

export default function HeroSection({ 
  title, 
  subtitle, 
  ctaText,
  bgImage = '/images/hero-bg.png' 
}: HeroProps) {
  return (
    <section className="relative h-[600px] flex items-center justify-center mb-20">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-90"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center max-w-4xl px-4"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-gold mb-6">
          {title}
        </h1>
        <p className="text-xl text-silver mb-8">{subtitle}</p>
        <button className="btn btn-primary bg-gold hover:bg-gold-dark text-black">
          {ctaText}
        </button>
      </motion.div>
    </section>
  );
}