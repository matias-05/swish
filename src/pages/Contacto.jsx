import React from "react";

export default function Contacto() {
  const contacto = {
    email: "swishclub4@gmail.com",
    instagram: "swish.pna",
    whatsapp: import.meta.env.VITE_TELEFONO_DUENO,
  };

  return (
    <section
      id="contacto"
      className="min-h-[calc(90vh)] w-full bg-black flex flex-col pt-24"
    >
      <div className="flex-1 flex flex-col items-center justify-center px-4 text-center pb-20">
        <div className="w-24 h-24 mb-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center p-2 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
          <img
            src="/imagenes/otros/logo.jpeg"
            alt="SWISH Logo"
            className="w-full h-full object-contain rounded-full grayscale contrast-125"
          />
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-strasua text-white mb-6 tracking-widest drop-shadow-md">
          ¡Gracias por confiar!
        </h2>

        <p className="text-white/70 font-octosquares max-w-lg text-base md:text-lg mb-10 leading-relaxed">
          Cada jugada cuenta. Gracias por permitir que{" "}
          <span className="text-[#CAFC00] font-black drop-shadow-[0_0_5px_rgba(202,252,0,0.5)]">
            SWISH
          </span>{" "}
          te acompañe en la cancha y sea parte de tu historia.
        </p>

        <div className="w-16 h-1 bg-white/20 rounded-full mb-10"></div>

        <h3 className="text-4xl md:text-6xl font-strasua text-[#CAFC00] italic tracking-tighter drop-shadow-[0_0_12px_rgba(202,252,0,0.4)]">
          BE THE DIFFERENCE
        </h3>
      </div>

      <div className="w-full bg-[#111111] border-t border-white/10 py-12 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <a
            href={`https://wa.me/${contacto.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 group cursor-pointer w-fit mx-auto sm:mx-0"
          >
            <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center group-hover:bg-[#CAFC00]/10 group-hover:border-[#CAFC00]/50 group-hover:scale-110 transition-all duration-300">
              <svg
                className="w-5 h-5 text-white group-hover:text-[#CAFC00] transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[10px] text-white/50 font-octosquares uppercase tracking-wider group-hover:text-[#CAFC00] transition-colors">
                WhatsApp
              </span>
              <span className="text-sm text-white font-octosquares font-bold">
                Escribinos
              </span>
            </div>
          </a>

          <a
            href={`https://instagram.com/${contacto.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 group cursor-pointer w-fit mx-auto sm:mx-0"
          >
            <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center group-hover:bg-[#CAFC00]/10 group-hover:border-[#CAFC00]/50 group-hover:scale-110 transition-all duration-300">
              <svg
                className="w-5 h-5 text-white group-hover:text-[#CAFC00] transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[10px] text-white/50 font-octosquares uppercase tracking-wider group-hover:text-[#CAFC00] transition-colors">
                Instagram
              </span>
              <span className="text-sm text-white font-octosquares font-bold">
                @swish.pna
              </span>
            </div>
          </a>

          <a
            href={`mailto:${contacto.email}`}
            className="flex items-center gap-4 group cursor-pointer w-fit mx-auto sm:mx-0"
          >
            <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center group-hover:bg-[#CAFC00]/10 group-hover:border-[#CAFC00]/50 group-hover:scale-110 transition-all duration-300">
              <svg
                className="w-5 h-5 text-white group-hover:text-[#CAFC00] transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[10px] text-white/50 font-octosquares uppercase tracking-wider group-hover:text-[#CAFC00] transition-colors">
                Email
              </span>
              <span className="text-sm text-white font-octosquares font-bold">
                Enviar Mail
              </span>
            </div>
          </a>

          <div className="flex items-center gap-4 group cursor-default w-fit mx-auto sm:mx-0">
            <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center group-hover:bg-[#CAFC00]/10 group-hover:border-[#CAFC00]/50 transition-all duration-300">
              <svg
                className="w-5 h-5 text-white group-hover:text-[#CAFC00] transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[10px] text-white/50 font-octosquares uppercase tracking-wider group-hover:text-[#CAFC00] transition-colors">
                Ubicación
              </span>
              <span className="text-sm text-white font-octosquares font-bold">
                Paraná, ER
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
