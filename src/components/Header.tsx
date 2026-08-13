import React, { useState, useEffect } from 'react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 h-[64px] flex items-center justify-between px-4 sm:px-7 transition-all duration-300 ${scrolled ? 'bg-[#fff8e9]/92 backdrop-blur-md shadow-sm' : 'bg-[#fff8e9]/80 backdrop-blur-sm'}`}>
      <div className="flex items-center gap-3 min-w-0">
        <span className="font-black uppercase tracking-[0.18em] text-sm text-[#123c2a]">HH GOA 2026</span>
        <span className="w-2 h-2 rounded-full bg-[#ff1683]" />
      </div>
      <div className="hidden min-[380px]:block text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#315f4a] font-semibold">#FrameInGoa</div>
    </header>
  );
};

export default Header;
