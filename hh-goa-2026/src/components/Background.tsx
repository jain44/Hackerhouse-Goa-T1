import React from 'react';

const Background = () => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#fff8e9]">
    <div
      className="absolute inset-0 opacity-70"
      style={{
        backgroundImage: `
          linear-gradient(rgba(82, 151, 112, 0.075) 1px, transparent 1px),
          linear-gradient(90deg, rgba(82, 151, 112, 0.075) 1px, transparent 1px),
          radial-gradient(rgba(18,60,42,0.055) 1px, transparent 1px)
        `,
        backgroundSize: '36px 36px, 36px 36px, 18px 18px',
      }}
    />
    <div className="absolute -top-40 -right-24 w-[420px] h-[420px] rounded-full bg-[#ffd31a]/35 blur-3xl" />
    <div className="absolute top-[34%] -left-32 w-[380px] h-[380px] rounded-full bg-[#ff1683]/10 blur-3xl" />
    <div className="absolute bottom-[-140px] right-[18%] w-[500px] h-[300px] rounded-full bg-[#1f8a5b]/10 blur-3xl" />
    <div className="absolute inset-x-0 top-[72px] h-px bg-[#123c2a]/15" />
  </div>
);

export default Background;
