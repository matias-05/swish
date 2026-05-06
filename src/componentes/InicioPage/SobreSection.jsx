import React, { useEffect, useState, useRef } from "react";
import { HashLink } from "react-router-hash-link";
import ArrowDownIcon from "../ArrowDownIcon";

export default function SobreSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="sobre-nosotros"
      ref={sectionRef}
      className="relative w-full bg-black flex flex-col justify-center items-center md:min-h-[95vh] pb-24 md:py-24 px-4 sm:px-8 overflow-hidden"
    >
      <style>{`
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .anim-hidden { opacity: 0; }
        .anim-slide-left { animation: slideInLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .anim-slide-up { animation: slideInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .anim-slide-right { animation: slideInRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>

      <div className="w-full max-w-[1200px] h-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-y-0 md:gap-8 lg:gap-12">
        <div
          className={`flex flex-col items-center justify-center md:justify-start min-h-screen md:min-h-0 text-center group anim-hidden ${isVisible ? "anim-slide-left" : ""}`}
        >
          <h2 className="font-strasua text-3xl md:text-4xl text-[#CAFC00] tracking-widest mb-4 md:mb-6 drop-shadow-[0_0_8px_rgba(202,252,0,0.3)]">
            ENVIOS
          </h2>
          <img
            src="/imagenes/otros/logo-envio.png"
            alt="Envíos Gratis"
            className="w-24 md:w-28 mb-6 md:mb-8 text-white group-hover:scale-110 transition-transform duration-500"
          />
          <p className="font-octosquares text-white text-base sm:text-lg lg:text-xl tracking-wide leading-relaxed">
            Envíos <span className="text-[#CAFC00] font-black">Gratis</span> a
            todo <br />
            <span className="text-[#CAFC00] font-black">Paraná</span>
          </p>
          <p className="font-octosquares text-white/60 text-xs sm:text-sm mt-2">
            [Zonas fuera de la ciudad,
            <br /> a coordinar]
          </p>
        </div>

        <div
          className={`flex flex-col items-center justify-center md:justify-start min-h-screen md:min-h-0 text-center group anim-hidden ${isVisible ? "anim-slide-up" : ""}`}
          style={{ animationDelay: "0.2s" }}
        >
          <h2 className="font-strasua text-3xl md:text-4xl text-[#CAFC00] tracking-widest mb-4 md:mb-6 drop-shadow-[0_0_8px_rgba(202,252,0,0.3)]">
            TALLES
          </h2>
          <img
            src="/imagenes/otros/logo-talle.png"
            alt="Guía de Talles"
            className="w-24 md:w-28 mb-6 md:mb-8 text-white group-hover:scale-110 transition-transform duration-500"
          />
          <p className="font-octosquares text-white text-base sm:text-lg lg:text-xl tracking-wide leading-relaxed mb-6">
            Eligí el{" "}
            <span className="text-[#CAFC00] font-black">Talle Ideal</span>{" "}
            <br />
            para vos
          </p>
          <button className="bg-[#2A2A2A] hover:bg-[#333] text-[#CAFC00] font-octosquares font-black text-base md:text-lg py-3 px-6 sm:px-8 rounded-full transition-all duration-300 shadow-lg border border-white/5 cursor-pointer hover:shadow-[0_0_15px_rgba(202,252,0,0.2)]">
            Ver Guía de Talles
          </button>
        </div>

        <div
          className={`flex flex-col items-center justify-center md:justify-start min-h-screen md:min-h-0 text-center group anim-hidden ${isVisible ? "anim-slide-right" : ""}`}
          style={{ animationDelay: "0.4s" }}
        >
          <h2 className="font-strasua text-3xl md:text-4xl text-[#CAFC00] tracking-widest mb-4 md:mb-6 drop-shadow-[0_0_8px_rgba(202,252,0,0.3)]">
            MEDIOS DE PAGO
          </h2>
          <img
            src="/imagenes/otros/logo-medio-pago.png"
            alt="Medios de Pago"
            className="w-24 md:w-28 mb-6 md:mb-8 text-white group-hover:scale-110 transition-transform duration-500"
          />
          <p className="font-octosquares text-white text-base sm:text-lg lg:text-xl tracking-wide leading-relaxed">
            Aceptamos pago con <br />
            <span className="text-[#CAFC00] font-black">
              Transferencia
            </span> o{" "}
            <span className="text-[#CAFC00] font-black">Efectivo</span>
          </p>
        </div>
      </div>

      <div
        className={`absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 anim-hidden ${isVisible ? "anim-slide-up" : ""}`}
        style={{ animationDelay: "0.8s" }}
      >
        <div className="animate-bounce">
          <HashLink
            smooth
            to="/#contacto"
            scroll={scrollToBottom}
            className="cursor-pointer transition-transform hover:scale-125 block text-[#CAFC00] hover:drop-shadow-[0_0_8px_rgba(202,252,0,0.4)]"
          >
            <ArrowDownIcon />
          </HashLink>
        </div>
      </div>
    </section>
  );
}
