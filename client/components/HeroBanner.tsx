import { Link } from "react-router-dom";

// Clothing icon image component with background removed
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
      filter: "grayscale(100%) brightness(6.5) contrast(1.5)",
    }}
  />
);

export default function HeroBanner() {
  // Image URLs for clothing icons (transparent background versions)
  const jacketUrl = "https://cdn.builder.io/api/v1/image/assets%2F23e3a26c44c946f88c17ad9d5e4942bc%2F0a174e660a8f43e3af37ede29c70057c?format=webp&width=800";
  const hoodieUrl = "https://cdn.builder.io/api/v1/image/assets%2F23e3a26c44c946f88c17ad9d5e4942bc%2F0ca611eda5484ea2af146dbca6167027?format=webp&width=800";
  const poloShirtUrl = "https://cdn.builder.io/api/v1/image/assets%2F23e3a26c44c946f88c17ad9d5e4942bc%2F48d11aacd2ce4635a43cd195761f7653?format=webp&width=800";
  const pantsUrl = "https://cdn.builder.io/api/v1/image/assets%2F23e3a26c44c946f88c17ad9d5e4942bc%2F97b5c58743064072833fb8d4275e8af3?format=webp&width=800";
  const tshirtUrl = "https://cdn.builder.io/api/v1/image/assets%2F23e3a26c44c946f88c17ad9d5e4942bc%2F8817c22a7ec243d4b3931b9de99dd13c?format=webp&width=800";

  // Generate scattered icon positions and variations
  const iconPositions = [
    // Top section
    { src: poloShirtUrl, top: "8%", left: "5%", size: 140, rotation: 15, opacity: 0.5 },
    { src: pantsUrl, top: "12%", left: "22%", size: 180, rotation: -25, opacity: 0.5 },
    { src: jacketUrl, top: "5%", left: "78%", size: 160, rotation: 35, opacity: 0.5 },
    { src: hoodieUrl, top: "15%", left: "88%", size: 150, rotation: -15, opacity: 0.5 },

    // Middle section
    { src: tshirtUrl, top: "35%", left: "3%", size: 170, rotation: 45, opacity: 0.5 },
    { src: jacketUrl, top: "38%", left: "85%", size: 155, rotation: -35, opacity: 0.5 },

    // Bottom section
    { src: hoodieUrl, top: "70%", left: "8%", size: 160, rotation: 20, opacity: 0.5 },
    { src: pantsUrl, top: "68%", left: "25%", size: 145, rotation: -40, opacity: 0.5 },
    { src: poloShirtUrl, top: "72%", left: "72%", size: 165, rotation: 60, opacity: 0.5 },
    { src: tshirtUrl, top: "65%", left: "88%", size: 155, rotation: -20, opacity: 0.5 },
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
            <ClothingImage src={item.src} size={item.size} rotation={item.rotation} opacity={item.opacity} />
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
