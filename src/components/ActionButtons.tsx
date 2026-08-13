import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ActionButtonsProps {
  isReady: boolean;
  onDownload: () => void;
  onShare: () => void;
  onCopyCaption: () => void;
  onReset: () => void;
  isGenerating: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  isReady,
  onDownload,
  onShare,
  onCopyCaption,
  onReset,
  isGenerating,
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    onCopyCaption();
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
  };

  return (
    <AnimatePresence>
      {isReady && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="flex flex-col space-y-3 w-full max-w-sm mx-auto"
        >
          <motion.button
            variants={itemVariants}
            onClick={onDownload}
            disabled={isGenerating}
            whileHover={!isGenerating ? { scale: 1.02, filter: 'brightness(1.1)' } : {}}
            whileTap={!isGenerating ? { scale: 0.98 } : {}}
            className="flex items-center justify-center w-full bg-[#ffd31a] text-[#123c2a] border-2 border-[#123c2a] shadow-[4px_4px_0_#ff1683] font-bold py-3.5 px-6 rounded-xl text-sm uppercase tracking-wider disabled:opacity-80"
          >
            {isGenerating ? (
              <span className="animate-pulse">FRAMING YOUR BUILDER ID...</span>
            ) : (
              <>
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download Card
              </>
            )}
          </motion.button>

          <motion.button
            variants={itemVariants}
            onClick={onShare}
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(55,65,81,1)' }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center w-full bg-[#fffaf0] border border-[#123c2a]/25 text-[#123c2a] font-medium py-3.5 px-6 rounded-xl text-sm uppercase tracking-wider transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Share to X
          </motion.button>

          <motion.button
            variants={itemVariants}
            onClick={handleCopy}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center w-full bg-transparent border border-[#123c2a]/20 text-[#547364] font-medium py-3 px-6 rounded-xl text-xs uppercase tracking-wider transition-colors hover:text-[#123c2a] hover:border-[#123c2a]/50"
          >
            {isCopied ? (
              <>
                <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-green-500">COPIED!</span>
              </>
            ) : (
              'Copy Caption'
            )}
          </motion.button>

          <motion.div variants={itemVariants} className="flex justify-center mt-4">
            <button
              onClick={onReset}
              className="text-[#547364] hover:text-[#123c2a] text-xs uppercase tracking-wider underline-offset-4 hover:underline transition-colors"
            >
              Create Another
            </button>
          </motion.div>

          <motion.p variants={itemVariants} className="text-[10px] text-[#7a927f] text-center mt-4 pt-2">
            Ready for #FrameInGoa
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ActionButtons;
