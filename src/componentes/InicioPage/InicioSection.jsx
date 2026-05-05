import { useRef } from "react";
import { HashLink } from "react-router-hash-link";
import ArrowDownIcon from "../ArrowDownIcon";

export default function InicioSection() {
  const imageRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!imageRef.current) return;

    const { left, top, width, height } =
      imageRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    const tiltX = y * -25;
    const tiltY = x * 25;

    imageRef.current.style.transition = "transform 0.1s ease-out";
    imageRef.current.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.05)`;
  };

  const handleMouseLeave = () => {
    if (!imageRef.current) return;

    imageRef.current.style.transition = "transform 0.5s ease-out";
    imageRef.current.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <section
      id="inicio"
      className="relative flex flex-col items-center justify-center h-screen w-full bg-black overflow-hidden pt-[10vh]"
    >
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleFadeIn {
          from { opacity: 0; transform: scale(0.95); filter: blur(4px); }
          to { opacity: 1; transform: scale(1); filter: blur(0); }
        }
        .animate-fade-in-up {
          opacity: 0;
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-scale-fade-in {
          opacity: 0;
          animation: scaleFadeIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 md:gap-8 w-full px-4 z-10">
        <div
          className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-[600px] animate-scale-fade-in"
          style={{ perspective: "1000px" }}
        >
          <img
            ref={imageRef}
            src="/imagenes/otros/foto-inicio.png"
            alt="Jugador de baloncesto Swish"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full h-auto max-h-[45vh] md:max-h-[60vh] object-contain grayscale hover:grayscale-0 will-change-transform drop-shadow-[0_0_15px_rgba(202,252,0,0)] hover:drop-shadow-[0_0_25px_rgba(202,252,0,0.2)]"
          />
        </div>

        <div className="flex flex-row items-baseline justify-center gap-1.5 sm:gap-3 z-10 w-full whitespace-nowrap">
          <span
            className="font-fuggles text-2xl min-[400px]:text-3xl sm:text-4xl md:text-5xl text-white animate-fade-in-up"
            style={{ animationDelay: "200ms" }}
          >
            Lo
          </span>
          <span
            className="font-strasua text-3xl min-[400px]:text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#CAFC00] uppercase tracking-tighter italic animate-fade-in-up"
            style={{ animationDelay: "400ms" }}
          >
            MEJOR
          </span>
          <span
            className="font-fuggles text-2xl min-[400px]:text-3xl sm:text-4xl md:text-5xl text-white ml-1 sm:ml-2 animate-fade-in-up"
            style={{ animationDelay: "600ms" }}
          >
            para los
          </span>
          <span
            className="font-strasua text-3xl min-[400px]:text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#CAFC00] uppercase tracking-tighter italic animate-fade-in-up"
            style={{ animationDelay: "800ms" }}
          >
            MEJORES
          </span>
        </div>
      </div>

      <div
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-20 animate-fade-in-up"
        style={{ animationDelay: "1200ms" }}
      >
        <div className="animate-bounce">
          <HashLink
            smooth
            to="/#productos"
            className="cursor-pointer transition-transform hover:scale-110 block text-[#CAFC00] drop-shadow-[0_0_8px_rgba(202,252,0,0.4)]"
          >
            <ArrowDownIcon />
          </HashLink>
        </div>
      </div>
    </section>
  );
}
