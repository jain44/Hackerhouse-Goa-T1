import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface PreviewPanelProps {
  children: React.ReactNode;
  isReady: boolean;
  format: 'id-card' | 'pfp';
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ children, isReady, format }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { damping: 30, stiffness: 200 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { damping: 30, stiffness: 200 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDesktop || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    if (!isDesktop) return;
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[400px] p-4 lg:p-8">
      <div className="mb-6 h-6 flex items-center justify-center">
        {!isReady ? (
          <span className="text-xs uppercase tracking-widest text-[#547364]">PREVIEW</span>
        ) : (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs uppercase tracking-widest text-[#ff1683] font-medium"
          >
            YOUR BUILDER ID IS READY
          </motion.span>
        )}
      </div>

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ perspective: isDesktop ? 1000 : 'none' }}
        className="relative w-full max-w-[400px] mx-auto flex justify-center items-center"
      >
        <motion.div
          style={{
            rotateX: isDesktop ? rotateX : 0,
            rotateY: isDesktop ? rotateY : 0,
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`relative z-10 transition-shadow duration-500 rounded-xl ${
            isReady ? 'shadow-[0_0_40px_rgba(250,204,21,0.3)]' : ''
          }`}
        >
          <div id="card-export-container">
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PreviewPanel;
