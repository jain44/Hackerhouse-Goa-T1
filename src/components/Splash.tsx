import { motion } from 'framer-motion';

export default function Splash() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#fff8e9]">
      <div className="absolute inset-0 opacity-90" style={{ backgroundImage: 'linear-gradient(rgba(82,151,112,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(82,151,112,0.09) 1px, transparent 1px), radial-gradient(rgba(18,60,42,0.045) 1px, transparent 1px)', backgroundSize: '36px 36px, 36px 36px, 18px 18px' }} />
      <motion.div className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-[#ffd31a] border-[3px] border-[#123c2a]" animate={{ rotate: [0, 8, 0], scale: [0.95, 1, 0.97] }} transition={{ duration: 1.8 }} />
      <motion.div initial={{ opacity: 0, y: 18, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.65 }} className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        <div className="text-[10px] uppercase tracking-[0.35em] text-[#ff1683] font-black">4 DAYS · GOA · BUILD</div>
        <h1 className="mt-5 text-6xl sm:text-8xl font-black uppercase tracking-tight text-[#123c2a]">HACK<br/><span className="text-[#ff1683]">HOUSE</span></h1>
        <div className="mt-4 bg-[#ffd31a] border-2 border-[#123c2a] px-5 py-2 text-[#123c2a] font-black uppercase tracking-widest shadow-[4px_4px_0_#ff1683]">Your Builder Frame</div>
      </motion.div>
    </div>
  );
}
