import React from 'react';
import { motion } from 'framer-motion';

interface HeroProps { onStart: () => void; }
const itemVariants = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } } };

const Hero: React.FC<HeroProps> = ({ onStart }) => (
  <div className="min-h-screen flex items-center justify-center pt-[86px] pb-12 px-4 sm:px-6 lg:px-12 relative z-10">
    <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
      <motion.div className="flex-1 flex flex-col items-center text-center lg:items-start lg:text-left" initial="hidden" animate="visible">
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-[#ffd31a] border-2 border-[#123c2a] px-4 py-1.5 text-xs uppercase tracking-[0.18em] font-black text-[#123c2a] shadow-[4px_4px_0_#ff1683]">
          HACK HOUSE · GOA 2026
        </motion.div>
        <motion.h1 variants={itemVariants} className="mt-7 text-5xl sm:text-6xl md:text-7xl font-black uppercase text-[#123c2a] leading-[0.92] max-w-3xl">
          YOUR BUILDER ID.<br /><span className="text-[#ff1683]">YOUR GOA FRAME.</span>
        </motion.h1>
        <motion.p variants={itemVariants} className="mt-6 text-base sm:text-lg text-[#315f4a] max-w-xl font-medium">
          Turn one photo into a share-ready hackathon identity card inspired by Goa's sun, beach, signs and loud tropical poster energy.
        </motion.p>
        <motion.div variants={itemVariants} className="mt-6 text-[11px] sm:text-xs text-[#547364] tracking-[0.2em] uppercase font-bold">
          NO LOGIN · INSTANT · SHAREABLE
        </motion.div>
        <motion.button variants={itemVariants} whileHover={{ scale: 1.03, rotate: -1 }} whileTap={{ scale: 0.97 }} onClick={onStart} className="mt-7 bg-[#ff1683] text-white border-2 border-[#123c2a] shadow-[6px_6px_0_#123c2a] font-black px-8 py-4 text-base sm:text-lg uppercase tracking-wide">
          Create My ID →
        </motion.button>
        <motion.div variants={itemVariants} className="text-xs text-[#547364] mt-5 font-semibold">Built for builders. Made for Goa.</motion.div>
      </motion.div>

      <motion.div className="flex-1 flex justify-center lg:justify-end w-full" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.25 }}>
        <motion.div animate={{ y: [0, -8, 0], rotate: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }} className="relative w-full max-w-[330px] aspect-[4/5] bg-[#fffaf0] border-[3px] border-[#123c2a] shadow-[12px_12px_0_#ffd31a] overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(rgba(18,60,42,0.08)_1px,transparent_1px)] bg-[length:14px_14px]" />
          <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-[#ffd31a] border-4 border-[#123c2a]" />
          <div className="absolute top-5 left-5 font-black text-[#123c2a] text-sm tracking-widest">HH<br/>GOA<br/><span className="text-[#ff1683]">2026</span></div>
          <div className="absolute top-[21%] left-1/2 -translate-x-1/2 w-[55%] aspect-[4/5] rounded-t-[90px] overflow-hidden border-4 border-[#123c2a] bg-[#dff1e5]">
            <div className="absolute inset-0 bg-gradient-to-b from-[#5bb27b] to-[#dff1e5]" />
            <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[55%] h-[48%] bg-[#f0b7a7] rounded-t-full" />
            <div className="absolute left-1/2 bottom-[35%] -translate-x-1/2 w-16 h-16 rounded-full bg-[#f2c2b0]" />
          </div>
          <div className="absolute bottom-[19%] left-0 right-0 text-center text-[#123c2a] font-black text-xl uppercase">YOUR NAME</div>
          <div className="absolute bottom-[14%] left-0 right-0 text-center text-[#ff1683] text-xs font-black uppercase tracking-widest">FULL STACK</div>
          <div className="absolute bottom-[7%] left-1/2 -translate-x-1/2 bg-[#123c2a] text-[#ffd31a] px-4 py-1.5 text-[10px] font-black whitespace-nowrap">&lt; THE PRODUCT SHIPPER /&gt;</div>
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-[#ff1683]" />
        </motion.div>
      </motion.div>
    </div>
  </div>
);

export default Hero;
