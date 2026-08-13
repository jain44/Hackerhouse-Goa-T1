import React from 'react';
import { motion } from 'framer-motion';

export interface FormatSwitcherProps {
  format: 'id-card' | 'pfp';
  onFormatChange: (format: 'id-card' | 'pfp') => void;
}

const FormatSwitcher: React.FC<FormatSwitcherProps> = ({ format, onFormatChange }) => {
  return (
    <div className="flex flex-col items-start w-full">
      <h3 className="text-xs uppercase tracking-wider text-[#547364] mb-2 pl-1">
        Choose Format
      </h3>
      <div className="inline-flex bg-[#fffaf0] rounded-xl p-1 border border-[#123c2a]/20 relative">
        {(['id-card', 'pfp'] as const).map((option) => {
          const isActive = format === option;
          return (
            <button
              key={option}
              onClick={() => onFormatChange(option)}
              className={`relative px-6 py-2.5 rounded-lg text-sm uppercase tracking-wider font-medium z-10 transition-colors duration-200 ${
                isActive ? 'text-black font-bold' : 'text-[#547364] hover:text-[#123c2a]'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="format-indicator"
                  className="absolute inset-0 bg-[#ffd31a] rounded-lg -z-10"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">
                {option === 'id-card' ? 'ID CARD' : 'PFP FRAME'}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FormatSwitcher;
