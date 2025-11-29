import { Link } from "react-router-dom";

// Clothing icon image component
const ClothingImage = ({ src, size, rotation, opacity }: { src: string; size: number; rotation: number; opacity: number }) => (
  <img
    src={src}
    alt="clothing icon"
    className="absolute"
    style={{
      opacity,
      transform: `rotate(${rotation}deg)`,
      width: size,
      height: size,
      objectFit: "contain",
      filter: "brightness(0) saturate(100%) invert(70%) sepia(0%)",
    }}
  />
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
