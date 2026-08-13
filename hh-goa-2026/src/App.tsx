import { useState, useCallback, useRef, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Background from './components/Background';
import Header from './components/Header';
import Hero from './components/Hero';
import UploadZone from './components/UploadZone';
import BuilderForm from './components/BuilderForm';
import FormatSwitcher from './components/FormatSwitcher';
import IDCard from './components/IDCard';
import PFPFrame from './components/PFPFrame';
import PreviewPanel from './components/PreviewPanel';
import ActionButtons from './components/ActionButtons';
import StepIndicator from './components/StepIndicator';

import { generateBuilderTitle, getAccentColor } from './lib/builderTitleGenerator';
import { generateCardImage, downloadImage, getFilename } from './lib/imageGenerator';
import { shareToX, copyCaption } from './lib/shareToX';
import { generateSerialNumber } from './lib/serialGenerator';

type AppView = 'hero' | 'create';
type Format = 'id-card' | 'pfp';

export default function App() {
  // View state
  const [view, setView] = useState<AppView>('hero');
  // User data
  const [photo, setPhoto] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [stack, setStack] = useState('');
  const [format, setFormat] = useState<Format>('id-card');

  // Generated values
  const [serialNumber] = useState(() => generateSerialNumber());
  const [isGenerating, setIsGenerating] = useState(false);

  // Refs
  const createSectionRef = useRef<HTMLDivElement>(null);
  const exportRef = useRef<HTMLDivElement>(null);

  // Derived state
  const builderTitle = useMemo(() => {
    return generateBuilderTitle(stack, name);
  }, [stack, name]);

  const accentColor = useMemo(() => {
    return getAccentColor(stack);
  }, [stack]);

  const isReady = Boolean(photo && name.trim() && stack.trim());

  const currentStep = !photo ? 1 : (!name.trim() || !stack.trim()) ? 2 : 3;

  // Handlers
  const handleStart = useCallback(() => {
    setView('create');
    setTimeout(() => {
      createSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, []);

  const handleImageUpload = useCallback((imageDataUrl: string) => {
    setPhoto(imageDataUrl);
  }, []);

  const handleDownload = useCallback(async () => {
    const exportEl = document.getElementById('card-export-container');
    if (!exportEl) return;

    setIsGenerating(true);
    try {
      // Brief delay for UI feedback
      await new Promise(r => setTimeout(r, 300));
      const dataUrl = await generateCardImage(exportEl, format);
      const filename = getFilename(name || 'builder', format);
      downloadImage(dataUrl, filename);
    } catch (err) {
      console.error('Generation failed:', err);
      alert('Something went wrong while framing your photo. Try again.');
    } finally {
      setIsGenerating(false);
    }
  }, [format, name]);

  const handleShare = useCallback(() => {
    shareToX(name, builderTitle);
  }, [name, builderTitle]);

  const handleCopyCaption = useCallback(async () => {
    await copyCaption(name, builderTitle);
  }, [name, builderTitle]);

  const handleReset = useCallback(() => {
    setPhoto(null);
    setName('');
    setStack('');
    setView('create');
    setTimeout(() => {
      createSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, []);

  const handleSeeExample = useCallback(() => {
    handleStart();
  }, [handleStart]);

  return (
    <div className="min-h-screen relative">
      <Background />
      <Header />

      {/* Hero Section */}
      <AnimatePresence>
        {view === 'hero' && (
          <motion.div
            key="hero"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.4 }}
          >
            <Hero onStart={handleStart} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create Section */}
      <AnimatePresence>
        {view === 'create' && (
          <motion.div
            key="create"
            ref={createSectionRef}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative z-10 min-h-screen pt-[76px] pb-16 sm:pb-20 px-4 sm:px-6"
          >
            {/* Mobile Step Indicator */}
            <StepIndicator currentStep={currentStep} />

            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-16">

                {/* Left Column - Controls */}
                <div className="w-full lg:w-[400px] flex-shrink-0 space-y-8">
                  {/* Step 1: Upload */}
                  <UploadZone
                    onImageUpload={handleImageUpload}
                    currentImage={photo}
                  />

                  {/* Step 2: Form */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: photo ? 1 : 0.3 }}
                    transition={{ duration: 0.3 }}
                  >
                    <BuilderForm
                      name={name}
                      stack={stack}
                      onNameChange={setName}
                      onStackChange={setStack}
                      builderTitle={builderTitle}
                      disabled={!photo}
                    />
                  </motion.div>

                  {/* Format Switcher */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: photo ? 1 : 0.3 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FormatSwitcher
                      format={format}
                      onFormatChange={setFormat}
                    />
                  </motion.div>

                  {/* Action Buttons (desktop) */}
                  <div className="hidden lg:block">
                    <ActionButtons
                      isReady={isReady}
                      onDownload={handleDownload}
                      onShare={handleShare}
                      onCopyCaption={handleCopyCaption}
                      onReset={handleReset}
                      isGenerating={isGenerating}
                    />
                  </div>
                </div>

                {/* Right Column - Preview */}
                <div className="flex-1 flex flex-col items-center justify-start lg:sticky lg:top-[80px] lg:self-start">
                  <PreviewPanel isReady={isReady} format={format}>
                    {format === 'id-card' ? (
                      <IDCard
                        photo={photo}
                        name={name}
                        stack={stack}
                        builderTitle={builderTitle}
                        serialNumber={serialNumber}
                        accentColor={accentColor}
                      />
                    ) : (
                      <PFPFrame
                        photo={photo}
                        name={name}
                        accentColor={accentColor}
                      />
                    )}
                  </PreviewPanel>

                  {/* Action Buttons (mobile) */}
                  <div className="lg:hidden w-full max-w-sm mx-auto mt-6">
                    <ActionButtons
                      isReady={isReady}
                      onDownload={handleDownload}
                      onShare={handleShare}
                      onCopyCaption={handleCopyCaption}
                      onReset={handleReset}
                      isGenerating={isGenerating}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
