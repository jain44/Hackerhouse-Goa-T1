import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface BuilderFormProps {
  name: string;
  stack: string;
  onNameChange: (name: string) => void;
  onStackChange: (stack: string) => void;
  builderTitle: string;
  disabled?: boolean;
}

const BuilderForm: React.FC<BuilderFormProps> = ({
  name,
  stack,
  onNameChange,
  onStackChange,
  builderTitle,
  disabled = false,
}) => {
  // Builder Class is deterministic: it changes only when the entered role/stack changes.
  const displayTitle = builderTitle;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ staggerChildren: 0.1 }}
      className={`relative w-full overflow-hidden ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
    >
      <div className="absolute top-0 left-0 -mt-8 -ml-4 z-0 pointer-events-none">
        <span className="text-6xl font-black text-[#123c2a]/[0.06]">02</span>
      </div>

      <div className="relative z-10">
        <h2 className="text-sm uppercase tracking-widest text-[#315f4a] mb-6">
          DEFINE YOUR BUILD
        </h2>

        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col space-y-1"
          >
            <label className="text-xs uppercase tracking-wider text-[#315f4a] pl-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder="Alok Jha"
              disabled={disabled}
              className="bg-[#fffaf0] border border-[#315f4a]/25 rounded-xl px-4 py-3 text-[#123c2a] text-lg placeholder:text-[#7a927f] focus:border-[#ff1683]/60 focus:ring-1 focus:ring-[#ff1683]/15 focus:outline-none transition-all"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col space-y-1"
          >
            <label className="text-xs uppercase tracking-wider text-[#315f4a] pl-1">Stack / Role</label>
            <input
              type="text"
              value={stack}
              onChange={(e) => onStackChange(e.target.value)}
              placeholder="AI / Full Stack"
              disabled={disabled}
              className="bg-[#fffaf0] border border-[#315f4a]/25 rounded-xl px-4 py-3 text-[#123c2a] text-lg placeholder:text-[#7a927f] focus:border-[#ff1683]/60 focus:ring-1 focus:ring-[#ff1683]/15 focus:outline-none transition-all"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <h3 className="text-xs uppercase tracking-wider text-[#315f4a] mb-2">Your Builder Title</h3>
          <div className="h-10 relative overflow-hidden flex items-center">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={displayTitle || 'empty'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="text-2xl font-black text-[#0f5a3b] uppercase tracking-wider truncate w-full"
              >
                {displayTitle || '-'}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BuilderForm;
