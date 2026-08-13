import { motion, AnimatePresence } from 'framer-motion';

interface IDCardProps {
  photo: string | null;
  name: string;
  stack: string;
  builderTitle: string;
  serialNumber: string;
  accentColor: string;
  isExporting?: boolean;
}

// Palm tree SVG paths
const PalmTreeLeft = () => (
  <svg
    viewBox="0 0 120 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ position: 'absolute', left: '0', bottom: '0', height: '85%', opacity: 0.15 }}
  >
    <path d="M55 200V100" stroke="#1a4a38" strokeWidth="5" />
    <path d="M55 110C40 90 10 85 5 70C20 78 40 80 55 100Z" fill="#1a4a38" />
    <path d="M55 105C50 80 30 60 15 50C30 60 50 70 55 95Z" fill="#1a4a38" />
    <path d="M55 100C70 80 90 75 105 65C90 75 70 80 55 95Z" fill="#1a4a38" />
    <path d="M55 108C65 85 85 70 100 55C85 70 68 82 55 100Z" fill="#1a4a38" />
    <path d="M55 112C45 95 20 90 5 85C25 90 45 95 55 108Z" fill="#1a4a38" />
    <path d="M55 106C72 90 95 85 115 80C95 88 72 90 55 100Z" fill="#1a4a38" />
  </svg>
);

const PalmTreeRight = () => (
  <svg
    viewBox="0 0 140 220"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ position: 'absolute', right: '10%', bottom: '5%', height: '90%', opacity: 0.2 }}
  >
    <path d="M70 220V95" stroke="#1a4a38" strokeWidth="5" />
    <path d="M70 105C55 80 25 70 10 55C30 65 55 72 70 98Z" fill="#1a4a38" />
    <path d="M70 100C60 70 35 50 15 35C38 52 60 65 70 92Z" fill="#1a4a38" />
    <path d="M70 95C85 70 110 60 130 50C110 62 88 70 70 90Z" fill="#1a4a38" />
    <path d="M70 102C82 78 105 65 125 50C105 65 85 75 70 95Z" fill="#1a4a38" />
    <path d="M70 108C55 90 30 85 10 80C35 88 55 92 70 105Z" fill="#1a4a38" />
    <path d="M70 100C88 82 115 78 135 75C115 82 90 85 70 96Z" fill="#1a4a38" />
  </svg>
);

// Simple QR-like pattern
const QRPattern = () => (
  <svg viewBox="0 0 50 50" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <rect width="50" height="50" fill="white" />
    {/* Corner squares */}
    <rect x="2" y="2" width="12" height="12" fill="black" />
    <rect x="4" y="4" width="8" height="8" fill="white" />
    <rect x="5.5" y="5.5" width="5" height="5" fill="black" />
    <rect x="36" y="2" width="12" height="12" fill="black" />
    <rect x="38" y="4" width="8" height="8" fill="white" />
    <rect x="39.5" y="5.5" width="5" height="5" fill="black" />
    <rect x="2" y="36" width="12" height="12" fill="black" />
    <rect x="4" y="38" width="8" height="8" fill="white" />
    <rect x="5.5" y="39.5" width="5" height="5" fill="black" />
    {/* Data pattern */}
    <rect x="16" y="2" width="2" height="2" fill="black" />
    <rect x="20" y="2" width="2" height="2" fill="black" />
    <rect x="24" y="4" width="2" height="2" fill="black" />
    <rect x="28" y="2" width="2" height="2" fill="black" />
    <rect x="32" y="6" width="2" height="2" fill="black" />
    <rect x="16" y="6" width="2" height="2" fill="black" />
    <rect x="22" y="8" width="2" height="2" fill="black" />
    <rect x="26" y="6" width="2" height="2" fill="black" />
    <rect x="30" y="10" width="2" height="2" fill="black" />
    <rect x="18" y="10" width="2" height="2" fill="black" />
    <rect x="16" y="16" width="2" height="2" fill="black" />
    <rect x="18" y="20" width="2" height="2" fill="black" />
    <rect x="20" y="18" width="2" height="2" fill="black" />
    <rect x="24" y="16" width="2" height="2" fill="black" />
    <rect x="28" y="20" width="2" height="2" fill="black" />
    <rect x="32" y="18" width="2" height="2" fill="black" />
    <rect x="36" y="16" width="2" height="2" fill="black" />
    <rect x="40" y="20" width="2" height="2" fill="black" />
    <rect x="44" y="18" width="2" height="2" fill="black" />
    <rect x="2" y="16" width="2" height="2" fill="black" />
    <rect x="6" y="18" width="2" height="2" fill="black" />
    <rect x="10" y="20" width="2" height="2" fill="black" />
    <rect x="4" y="22" width="2" height="2" fill="black" />
    <rect x="8" y="24" width="2" height="2" fill="black" />
    <rect x="12" y="22" width="2" height="2" fill="black" />
    <rect x="22" y="24" width="2" height="2" fill="black" />
    <rect x="26" y="22" width="2" height="2" fill="black" />
    <rect x="30" y="26" width="2" height="2" fill="black" />
    <rect x="34" y="24" width="2" height="2" fill="black" />
    <rect x="38" y="28" width="2" height="2" fill="black" />
    <rect x="42" y="26" width="2" height="2" fill="black" />
    <rect x="46" y="24" width="2" height="2" fill="black" />
    <rect x="16" y="28" width="2" height="2" fill="black" />
    <rect x="20" y="30" width="2" height="2" fill="black" />
    <rect x="24" y="28" width="2" height="2" fill="black" />
    <rect x="28" y="32" width="2" height="2" fill="black" />
    <rect x="32" y="30" width="2" height="2" fill="black" />
    <rect x="2" y="28" width="2" height="2" fill="black" />
    <rect x="6" y="30" width="2" height="2" fill="black" />
    <rect x="10" y="32" width="2" height="2" fill="black" />
    <rect x="36" y="36" width="2" height="2" fill="black" />
    <rect x="40" y="38" width="2" height="2" fill="black" />
    <rect x="44" y="36" width="2" height="2" fill="black" />
    <rect x="38" y="42" width="2" height="2" fill="black" />
    <rect x="42" y="40" width="2" height="2" fill="black" />
    <rect x="46" y="44" width="2" height="2" fill="black" />
    <rect x="36" y="46" width="2" height="2" fill="black" />
    <rect x="40" y="44" width="2" height="2" fill="black" />
    <rect x="44" y="42" width="2" height="2" fill="black" />
    <rect x="16" y="34" width="2" height="2" fill="black" />
    <rect x="20" y="36" width="2" height="2" fill="black" />
    <rect x="24" y="38" width="2" height="2" fill="black" />
    <rect x="28" y="40" width="2" height="2" fill="black" />
    <rect x="16" y="42" width="2" height="2" fill="black" />
    <rect x="20" y="44" width="2" height="2" fill="black" />
    <rect x="24" y="46" width="2" height="2" fill="black" />
    <rect x="30" y="44" width="2" height="2" fill="black" />
  </svg>
);

export default function IDCard({
  photo,
  name,
  stack,
  builderTitle,
  serialNumber,
  accentColor,
  isExporting = false,
}: IDCardProps) {
  const isReady = Boolean(photo && name.trim() && stack.trim());
  // Keep the Builder Class fixed for the selected role. It only changes when the role/stack changes.
  const displayTitle = builderTitle;

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#f8f0d8',
        aspectRatio: '340 / 580',
        width: isExporting ? '1080px' : '100%',
        maxWidth: isExporting ? '1080px' : '360px',
        margin: '0 auto',
        borderRadius: isExporting ? '0' : '20px',
        border: '3px solid #123c2a',
        boxShadow: '8px 10px 0 rgba(18, 60, 42, 0.14)',
        display: 'flex',
        flexDirection: 'column' as const,
        fontFamily: "'Courier New', Courier, monospace",
        backgroundImage:
          'linear-gradient(rgba(18, 60, 42, 0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(18, 60, 42, 0.10) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        userSelect: 'text' as const,
      }}
    >
      {/* ===== TOP SECTION ===== */}
      <div
        style={{
          position: 'relative',
          height: '50%',
          width: '100%',
        }}
      >
        {/* Yellow circle with halftone dots */}
        <div
          style={{
            position: 'absolute',
            top: '-15%',
            right: '-15%',
            width: '45%',
            aspectRatio: '1',
            backgroundColor: '#ffd31a',
            borderRadius: '50%',
            backgroundImage:
              "radial-gradient(circle, rgba(255, 22, 131, 0.20) 10%, transparent 11%), radial-gradient(circle, rgba(255, 22, 131, 0.20) 10%, transparent 11%)",
            backgroundSize: '10px 10px',
            backgroundPosition: '0 0, 5px 5px',
            zIndex: 1,
          }}
        />

        {/* Palm tree silhouettes */}
        <PalmTreeLeft />
        <PalmTreeRight />

        {/* HH GOA 2026 Logo */}
        <div
          style={{
            position: 'absolute',
            top: '10%',
            left: '8%',
            fontFamily: "Georgia, 'Times New Roman', serif",
            textTransform: 'uppercase' as const,
            zIndex: 3,
          }}
        >
          <div style={{ color: '#ffd31a', fontSize: 'clamp(20px, 7vw, 36px)', lineHeight: 1, fontWeight: 'bold' }}>
            HH
          </div>
          <div style={{ color: '#123c2a', fontSize: 'clamp(20px, 7vw, 36px)', lineHeight: 1, fontWeight: 'bold' }}>
            GOA
          </div>
          <div style={{ color: '#ff1683', fontSize: 'clamp(16px, 5vw, 28px)', lineHeight: 1.1, letterSpacing: '1px' }}>
            2026
          </div>
        </div>

        {/* Arch-shaped photo frame */}
        <div
          style={{
            position: 'absolute',
            top: '30%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '48%',
            height: '80%',
            borderRadius: '120px 120px 0 0',
            border: '3px solid #123c2a',
            overflow: 'hidden',
            backgroundColor: '#dff1e5',
            zIndex: 2,
            boxShadow: '5px 6px 0 rgba(18, 60, 42, 0.10)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {photo ? (
            <img
              src={photo}
              alt="Builder Photo"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover' as const,
                display: 'block',
              }}
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="200"
              height="240"
              viewBox="0 0 200 240"
              style={{ width: '100%', height: '100%' }}
            >
              <rect fill="#0a271d" width="200" height="240" />
              <circle cx="100" cy="90" r="40" fill="#1a4a38" />
              <path d="M40,240 Q100,160 160,240" stroke="#1a4a38" strokeWidth="40" strokeLinecap="round" fill="none" />
            </svg>
          )}
        </div>
      </div>

      {/* ===== STAMP OVERLAY ===== */}
      <div
        style={{
          position: 'absolute',
          top: '42%',
          right: '4%',
          width: '25%',
          aspectRatio: '1',
          border: '2px dashed #ff1683',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center' as const,
          color: '#ff1683',
          background: 'rgba(255, 22, 131, 0.10)',
          fontFamily: "'Arial Black', sans-serif",
          fontSize: '10px',
          lineHeight: 1.1,
          transform: isReady ? 'rotate(-20deg) scale(1)' : 'rotate(-20deg) scale(0)',
          opacity: isReady ? 1 : 0,
          zIndex: 10,
          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          textShadow: '0 1px 0 rgba(255,255,255,0.4)',
          pointerEvents: 'none' as const,
        }}
      >
        SYSTEM<br />VERIFIED
      </div>

      {/* ===== CREAM MIDDLE SECTION ===== */}
      <div
        style={{
          height: '38%',
          backgroundColor: '#fffaf0',
          borderRadius: '20px 20px 0 0',
          zIndex: 1,
          textAlign: 'center' as const,
          paddingTop: '14%',
          display: 'flex',
          flexDirection: 'column' as const,
          alignItems: 'center',
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' width='64' height='64' opacity='0.04'%3E%3Cpath d='M32 64c0-10 2-20 6-30-5 3-8 8-10 14-2-6-1-12 2-17-6 1-11 5-14 11 0-6 4-11 9-14-7-2-14 0-19 5 3-5 8-8 15-9-6-4-13-4-19-1 5-3 12-4 18-1-5-6-12-8-19-7 7-2 14 0 20 5-3-7-8-11-15-13 7 1 13 4 18 10-1-7-4-13-10-17 7 3 12 8 15 15 2-7 2-14-1-20 6 5 10 11 11 18 4-6 6-13 4-20 4 6 5 14 3 21 6-4 10-9 12-16 1 7-1 14-4 20 6-2 12-6 16-11-2 7-6 13-12 17 6 0 11-2 16-6-4 6-9 10-15 12 5 2 10 2 14-1-5 5-11 7-18 6 1 7 0 14-3 20-3-5-7-10-12-13 2 6 2 13 0 20z' fill='%23000'/%3E%3C/svg%3E\")",
          backgroundSize: '80px 80px',
        }}
      >
        {/* Name */}
        <div
          style={{
            color: '#123c2a',
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontWeight: 'bold',
            fontSize: 'clamp(16px, 5vw, 22px)',
            textTransform: 'uppercase' as const,
            lineHeight: 1.1,
            marginBottom: '2px',
          }}
        >
          {name || 'YOUR NAME'}
        </div>

        {/* Role */}
        <div
          style={{
            color: '#ff1683',
            fontFamily: 'Arial, sans-serif',
            fontSize: '10px',
            fontWeight: 'bold',
            letterSpacing: '1px',
            marginBottom: '6px',
            textTransform: 'uppercase' as const,
          }}
        >
          {stack ? stack.toUpperCase() : 'YOUR STACK'}
        </div>

        {/* Builder Class Pill */}
        <div
          style={{
            backgroundColor: '#123c2a',
            color: '#ffd31a',
            padding: '4px 12px',
            borderRadius: '20px',
            fontWeight: 'bold',
            fontSize: '9px',
            marginBottom: '8px',
            fontFamily: "'Courier New', monospace",
            position: 'relative' as const,
            overflow: 'hidden',
            minWidth: '90px',
            textAlign: 'center' as const,
          }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={displayTitle || 'empty'}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              style={{ display: 'inline-block' }}
            >
              &lt; {displayTitle || 'YOUR TITLE'} /&gt;
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Hackathon Description */}
        <div
          style={{
            fontFamily: "'Courier New', Courier, monospace",
            fontSize: '8px',
            color: '#547364',
            textAlign: 'center' as const,
            maxWidth: '75%',
            marginTop: '4px',
            lineHeight: 1.4,
            letterSpacing: '0.5px',
            textTransform: 'uppercase' as const,
            borderTop: '1px dashed rgba(84, 115, 100, 0.35)',
            paddingTop: '8px',
            fontWeight: 'bold',
          }}
        >
          4 DAYS. ONE COAST. COUNTLESS BUILDS. HACK, SHIP, CONNECT — AND LEAVE YOUR MARK ON GOA.
        </div>

        {/* Powered By Banner */}
        <div
          style={{
            width: '100%',
            height: '50px',
            marginTop: 'auto',
            borderTop: '1px solid rgba(18, 60, 42, 0.12)',
            background: 'linear-gradient(135deg, #0f6b46 0%, #2c9362 28%, #ffd31a 52%, #ff9f2f 73%, #ff1683 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            position: 'relative' as const,
            overflow: 'hidden',
          }}
        >
          {/* Tropical leaf decorations */}
          <div
            style={{
              position: 'absolute',
              left: '2%',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '20px',
              filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))',
            }}
          >
            🌴🥥
          </div>
          <div
            style={{
              position: 'absolute',
              right: '2%',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '20px',
              filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))',
            }}
          >
            🌺🌿
          </div>
          <div
            style={{
              fontFamily: "'Arial Black', Arial, sans-serif",
              fontSize: '9px',
              color: 'white',
              fontWeight: 'bold',
              letterSpacing: '1px',
              textShadow: '0 1px 3px rgba(0,0,0,0.4)',
              textTransform: 'uppercase' as const,
            }}
          >
            Powered By
          </div>
          <div
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: '14px',
              color: '#ffd31a',
              fontWeight: 'bold',
              fontStyle: 'italic',
              textShadow: '0 1px 3px rgba(0,0,0,0.5), 0 0 10px rgba(250,204,21,0.3)',
            }}
          >
            2:47 PM Studio
          </div>
        </div>
      </div>

      {/* ===== TICKET STUB FOOTER ===== */}
      <div
        style={{
          height: '12%',
          backgroundColor: '#123c2a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 15px',
          position: 'relative' as const,
          borderTop: '2px dashed rgba(255, 211, 26, 0.9)',
          zIndex: 2,
        }}
      >
        {/* Perforated edge effect */}
        <div
          style={{
            position: 'absolute',
            left: '-4px',
            top: 0,
            bottom: 0,
            width: '8px',
            backgroundImage: 'radial-gradient(circle, #123c2a 3px, transparent 4px)',
            backgroundSize: '10px 14px',
            backgroundPosition: 'center',
            pointerEvents: 'none' as const,
          }}
        />

        {/* QR code + info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* QR Code */}
          <div
            style={{
              width: '38px',
              height: '38px',
              border: '2px solid #ffd31a',
              padding: '2px',
              background: 'white',
            }}
          >
            <QRPattern />
          </div>

          {/* Ticket Info */}
          <div style={{ display: 'flex', flexDirection: 'column' as const, justifyContent: 'center' }}>
            <div
              style={{
                color: '#ffd31a',
                fontFamily: 'Arial, sans-serif',
                fontSize: '9px',
                fontWeight: 'bold',
                letterSpacing: '1px',
                textTransform: 'uppercase' as const,
              }}
            >
              BUILDER ID
            </div>
            <div
              style={{
                color: '#fffaf0',
                fontFamily: "'Courier New', monospace",
                fontSize: '11px',
                fontWeight: 'bold',
                marginTop: '2px',
              }}
            >
              #{serialNumber}
            </div>
          </div>
        </div>

        {/* Barcode */}
        <div
          style={{
            width: '40px',
            height: '24px',
            backgroundImage:
              'repeating-linear-gradient(to right, #fbf7ee 0, #fbf7ee 2px, transparent 2px, transparent 4px, #fbf7ee 4px, #fbf7ee 5px, transparent 5px, transparent 8px)',
            opacity: 0.8,
          }}
        />
      </div>
    </div>
  );
}
