import { Link } from "react-router-dom";

// SVG clothing icon components with thin grey line-art style
const ShirtIcon = ({ size, rotation, opacity }: { size: number; rotation: number; opacity: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className="absolute" style={{ opacity, transform: `rotate(${rotation}deg)` }}>
    <g fill="none" stroke="#888888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Shirt collar and shoulders */}
      <path d="M 30 20 L 50 35 L 70 20 M 30 20 L 35 50 M 70 20 L 65 50" />
      {/* Body */}
      <rect x="35" y="50" width="30" height="35" rx="2" />
      {/* Center button line */}
      <line x1="50" y1="55" x2="50" y2="80" />
      {/* Button points */}
      <circle cx="50" cy="60" r="1.5" fill="#888888" />
      <circle cx="50" cy="70" r="1.5" fill="#888888" />
    </g>
  </svg>
);

const PantsIcon = ({ size, rotation, opacity }: { size: number; rotation: number; opacity: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className="absolute" style={{ opacity, transform: `rotate(${rotation}deg)` }}>
    <g fill="none" stroke="#888888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Waistband */}
      <path d="M 30 20 L 70 20 Q 75 25 75 35 L 75 80 Q 75 85 70 85 L 50 85 M 25 35 L 25 80 Q 25 85 30 85 L 50 85" />
      {/* Zipper/center line */}
      <line x1="50" y1="20" x2="50" y2="85" />
    </g>
  </svg>
);

const TShirtIcon = ({ size, rotation, opacity }: { size: number; rotation: number; opacity: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className="absolute" style={{ opacity, transform: `rotate(${rotation}deg)` }}>
    <g fill="none" stroke="#888888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Neckline */}
      <path d="M 40 15 Q 50 10 60 15" />
      {/* Shoulders and sleeves */}
      <line x1="40" y1="15" x2="20" y2="35" />
      <line x1="60" y1="15" x2="80" y2="35" />
      {/* Body */}
      <path d="M 20 35 L 25 75 Q 25 80 30 80 L 70 80 Q 75 80 75 75 L 80 35" />
      {/* Center line */}
      <line x1="50" y1="20" x2="50" y2="80" />
    </g>
  </svg>
);

const HoodieIcon = ({ size, rotation, opacity }: { size: number; rotation: number; opacity: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className="absolute" style={{ opacity, transform: `rotate(${rotation}deg)` }}>
    <g fill="none" stroke="#888888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Hood */}
      <path d="M 35 15 Q 50 10 65 15 L 65 30 Q 65 35 60 38 L 40 38 Q 35 35 35 30 Z" />
      {/* Face opening in hood */}
      <path d="M 42 20 Q 50 25 58 20" />
      {/* Body */}
      <path d="M 30 30 L 25 80 Q 25 85 30 85 L 70 85 Q 75 85 75 80 L 70 30" />
      {/* Sleeves */}
      <line x1="30" y1="35" x2="15" y2="50" />
      <line x1="70" y1="35" x2="85" y2="50" />
      {/* Center zipper */}
      <line x1="50" y1="30" x2="50" y2="85" />
    </g>
  </svg>
);

const JacketIcon = ({ size, rotation, opacity }: { size: number; rotation: number; opacity: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className="absolute" style={{ opacity, transform: `rotate(${rotation}deg)` }}>
    <g fill="none" stroke="#888888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Collar */}
      <path d="M 35 20 L 50 30 L 65 20" />
      {/* Body outline */}
      <path d="M 35 20 L 30 50 L 25 85 Q 25 90 30 90 L 70 90 Q 75 90 75 85 L 70 50 L 65 20" />
      {/* Sleeves */}
      <path d="M 30 35 L 15 55 L 15 80" />
      <path d="M 70 35 L 85 55 L 85 80" />
      {/* Front zipper */}
      <line x1="50" y1="20" x2="50" y2="90" />
      {/* Pocket details */}
      <rect x="33" y="50" width="8" height="12" rx="1" />
      <rect x="59" y="50" width="8" height="12" rx="1" />
    </g>
  </svg>
);

export default function HeroBanner() {
  // Generate scattered icon positions and variations
  const iconPositions = [
    // Top section
    { Component: ShirtIcon, top: "8%", left: "5%", size: 80, rotation: 15, opacity: 0.3 },
    { Component: PantsIcon, top: "12%", left: "22%", size: 120, rotation: -25, opacity: 0.25 },
    { Component: JacketIcon, top: "5%", left: "78%", size: 100, rotation: 35, opacity: 0.3 },
    { Component: HoodieIcon, top: "15%", left: "88%", size: 90, rotation: -15, opacity: 0.28 },
    
    // Middle section
    { Component: TShirtIcon, top: "35%", left: "3%", size: 110, rotation: 45, opacity: 0.28 },
    { Component: JacketIcon, top: "38%", left: "85%", size: 95, rotation: -35, opacity: 0.32 },
    
    // Bottom section
    { Component: HoodieIcon, top: "70%", left: "8%", size: 100, rotation: 20, opacity: 0.27 },
    { Component: PantsIcon, top: "68%", left: "25%", size: 85, rotation: -40, opacity: 0.3 },
    { Component: ShirtIcon, top: "72%", left: "72%", size: 105, rotation: 60, opacity: 0.29 },
    { Component: TShirtIcon, top: "65%", left: "88%", size: 95, rotation: -20, opacity: 0.26 },
  ];

  return (
    <section className="relative w-full h-screen max-h-[800px] md:max-h-[900px] bg-black overflow-hidden flex items-center justify-center">
      {/* Matte black background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-slate-950 opacity-95" />

      {/* Scattered clothing icons background */}
      <div className="absolute inset-0 overflow-hidden">
        {iconPositions.map((item, index) => (
          <div
            key={index}
            className="absolute"
            style={{
              top: item.top,
              left: item.left,
              width: item.size,
              height: item.size,
            }}
          >
            <item.Component size={item.size} rotation={item.rotation} opacity={item.opacity} />
          </div>
        ))}
      </div>

      {/* Content overlay - centered foreground text and button */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 space-y-8">
        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-tight">
          MEN'S<br />
          <span className="block">COLLECTION</span>
        </h1>

        {/* Shop Now button with white outline */}
        <button className="mt-4 px-10 py-4 border-2 border-white text-white font-bold text-lg tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 ease-out transform hover:scale-105 active:scale-95">
          <Link to="/shop" className="block w-full h-full">
            Shop Now
          </Link>
        </button>
      </div>
    </section>
  );
}
