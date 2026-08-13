interface PFPFrameProps {
  photo: string | null;
  name: string;
  accentColor: string;
  isExporting?: boolean;
}

export default function PFPFrame({
  photo,
  name,
  accentColor,
  isExporting = false,
}: PFPFrameProps) {
  return (
    <div
      className={`relative overflow-hidden bg-[#fffaf0] aspect-square w-full max-w-[360px] mx-auto flex items-center justify-center ${
        isExporting ? 'rounded-none' : 'rounded-2xl'
      }`}
      style={{
        width: isExporting ? '1080px' : '100%',
        maxWidth: isExporting ? '1080px' : '360px',
      }}
    >
      {/* Background gradient */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: `radial-gradient(circle at center, ${accentColor}0D 0%, transparent 70%)`
        }}
      />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Top branding */}
      <div className="absolute top-[6%] left-0 right-0 text-center z-10 pointer-events-none">
        <span className="text-[11px] uppercase tracking-[0.35em] text-[#123c2a]/60 font-bold">
          HH GOA 2026
        </span>
      </div>

      {/* Bottom branding */}
      <div className="absolute bottom-[6%] left-0 right-0 text-center z-10 pointer-events-none flex flex-col items-center gap-1">
        <span 
          className="text-[10px] font-bold tracking-wider"
          style={{ color: accentColor }}
        >
          #FrameInGoa
        </span>
      </div>

      {/* Corner accents — L-shaped brackets */}
      {/* Top-left */}
      <div className="absolute top-[4%] left-[4%] pointer-events-none z-10">
        <div className="w-4 h-4 border-t-2 border-l-2" style={{ borderColor: `${accentColor}40` }} />
      </div>
      {/* Top-right */}
      <div className="absolute top-[4%] right-[4%] pointer-events-none z-10">
        <div className="w-4 h-4 border-t-2 border-r-2" style={{ borderColor: `${accentColor}40` }} />
      </div>
      {/* Bottom-left */}
      <div className="absolute bottom-[4%] left-[4%] pointer-events-none z-10">
        <div className="w-4 h-4 border-b-2 border-l-2" style={{ borderColor: `${accentColor}40` }} />
      </div>
      {/* Bottom-right */}
      <div className="absolute bottom-[4%] right-[4%] pointer-events-none z-10">
        <div className="w-4 h-4 border-b-2 border-r-2" style={{ borderColor: `${accentColor}40` }} />
      </div>

      {/* Photo area */}
      <div className="relative w-[72%] aspect-square z-10">
        {/* Outer Ring */}
        <div 
          className="absolute -inset-[10px] rounded-full border-[1.5px] opacity-25"
          style={{ borderColor: accentColor }}
        />
        
        {/* Inner Ring */}
        <div 
          className="absolute inset-0 rounded-full border-[3px] z-20 pointer-events-none"
          style={{ borderColor: accentColor }}
        />
        
        {/* Photo */}
        <div className="w-full h-full rounded-full overflow-hidden relative">
          {photo ? (
            <img
              src={photo}
              alt={name || "Builder"}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#dff1e5] to-[#fffaf0] flex items-center justify-center">
              <span className="text-[#7a927f] text-sm font-bold tracking-widest">YOUR PHOTO</span>
            </div>
          )}
        </div>

        {/* Decorative dots around ring */}
        <div 
          className="absolute -top-[14px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: accentColor }}
        />
        <div 
          className="absolute -bottom-[14px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: accentColor }}
        />
        <div 
          className="absolute top-1/2 -left-[14px] -translate-y-1/2 w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: accentColor }}
        />
        <div 
          className="absolute top-1/2 -right-[14px] -translate-y-1/2 w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: accentColor }}
        />
      </div>
    </div>
  );
}
