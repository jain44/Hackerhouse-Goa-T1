import React, { useCallback, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface UploadZoneProps {
  onImageUpload: (imageDataUrl: string) => void;
  currentImage: string | null;
}

const UploadZone: React.FC<UploadZoneProps> = ({ onImageUpload, currentImage }) => {
  const [isDragHover, setIsDragHover] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setError(null);
    if (file.size > 10 * 1024 * 1024) {
      setError('That photo is a little too large. Try another image.');
      return;
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/heic', 'image/heif'];
    const ext = file.name.toLowerCase().split('.').pop() || '';
    const validExts = ['jpg', 'jpeg', 'png', 'heic', 'heif'];
    if (!validTypes.includes(file.type) && !validExts.includes(ext)) {
      setError("That format isn't supported yet. Try JPG, PNG or HEIC.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        onImageUpload(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragHover(true);
  }, []);

  const onDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragHover(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragHover(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragHover(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full overflow-hidden"
    >
      <div className="absolute top-0 left-0 -mt-8 -ml-4 z-0 pointer-events-none">
        <span className="text-6xl font-black text-[#123c2a]/[0.06]">01</span>
      </div>
      
      <div className="relative z-10">
        <h2 className="text-sm uppercase tracking-widest text-[#547364] mb-4">
          UPLOAD YOUR PHOTO
        </h2>

        {currentImage ? (
          <div className="relative rounded-2xl overflow-hidden group">
            <img src={currentImage} alt="Preview" className="w-full h-auto max-h-64 object-cover" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                onClick={handleClick}
                className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-xl backdrop-blur-sm border border-white/20 transition-all font-medium"
              >
                Change Photo
              </button>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileInput}
              className="hidden"
              accept="image/jpeg,image/png,image/heic,image/heif,.jpg,.jpeg,.png,.heic,.heif"
            />
          </div>
        ) : (
          <motion.div
            onClick={handleClick}
            onDragOver={onDragOver}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            whileHover={{ scale: 1.01 }}
            animate={{
              scale: isDragHover ? 1.02 : 1,
              borderColor: isDragHover ? '#ff1683' : 'rgba(18, 60, 42, 0.35)',
              backgroundColor: isDragHover ? 'rgba(255, 22, 131, 0.06)' : 'transparent',
            }}
            className={`cursor-pointer rounded-2xl p-8 md:p-12 border-2 border-dashed bg-[#fffaf0] flex flex-col items-center justify-center text-center transition-colors
              ${isDragHover ? '' : 'hover:border-[#ff1683]/60 hover:bg-[#fffaf0]'}
            `}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileInput}
              className="hidden"
              accept="image/jpeg,image/png,image/heic,image/heif,.jpg,.jpeg,.png,.heic,.heif"
            />
            
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-[#315f4a] mb-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
            </svg>

            <p className="text-lg text-[#315f4a] font-medium">Drop your photo here</p>
            <p className="text-sm text-[#547364] mt-2">or click to browse · JPG, PNG, HEIC</p>
            
            <p className="text-xs text-[#7a927f] mt-4 max-w-xs mx-auto">
              Your photo stays yours. We only use it to create your frame.
            </p>
          </motion.div>
        )}

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 text-red-500 text-sm text-center"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default UploadZone;
