import React from "react";
import ArrowDownIcon from "../componentes/ArrowDownIcon";

export default function SobreNosotros() {
  return (
    <section
      id="sobre-nosotros"
      className="relative min-h-[80vh] w-full bg-black flex flex-col justify-center items-center pt-20 pb-32 md:py-24 px-4 sm:px-8"
    >
      <div className="max-w-[1200px] w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-12">
        <div className="flex flex-col items-center text-center group">
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

        <div className="flex flex-col items-center text-center group">
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

          <button className="bg-[#2A2A2A] hover:bg-[#333] text-[#CAFC00] font-octosquares font-black text-base md:text-lg py-3 px-6 sm:px-8 rounded-full transition-all duration-300 shadow-lg border border-white/5 cursor-pointer">
            Ver Guía de Talles
          </button>
        </div>

        {/* COLUMNA 3: MEDIOS DE PAGO */}
        <div className="flex flex-col items-center text-center group">
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

      <div className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <a
          href="#contacto"
          className="cursor-pointer transition-transform hover:scale-125 block"
        >
          <ArrowDownIcon />
        </a>
      </div>
    </section>
  );
}
