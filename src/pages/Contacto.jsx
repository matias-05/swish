import React, { useEffect, useState, useRef } from "react";

export default function Contacto() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const contacto = {
    email: "swishclub4@gmail.com",
    instagram: "swish.pna",
    whatsapp: import.meta.env.VITE_TELEFONO_DUENO,
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
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

  return (
    <section
      id="contacto"
      ref={sectionRef}
      className="min-h-[90vh] w-full bg-black flex flex-col pt-20 md:pt-24 overflow-hidden"
    >
      <style>{`
        @keyframes fadeZoomIn {
          from { opacity: 0; transform: scale(0.9) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes slideInFromBottom {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .anim-hidden { opacity: 0; }
        .anim-fade-zoom { animation: fadeZoomIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .anim-slide-bottom { animation: slideInFromBottom 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>

      <div className="flex-1 flex flex-col items-center justify-center px-4 text-center pb-16 md:pb-20">
        <div
          className={`w-20 h-20 md:w-24 md:h-24 mb-6 md:mb-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center p-2 shadow-[0_0_15px_rgba(255,255,255,0.05)] anim-hidden ${isVisible ? "anim-fade-zoom" : ""}`}
        >
          <img
            src="/imagenes/otros/logo.jpeg"
            alt="SWISH Logo"
            className="w-full h-full object-contain rounded-full grayscale contrast-125"
          />
        </div>

        <h2
          className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-strasua text-white mb-4 md:mb-6 tracking-widest drop-shadow-md px-2 anim-hidden ${isVisible ? "anim-fade-zoom" : ""}`}
          style={{ animationDelay: "0.1s" }}
        >
          ¡Gracias por confiar!
        </h2>

        <p
          className={`text-white/70 font-octosquares max-w-lg text-sm sm:text-base md:text-lg mb-8 md:mb-10 leading-relaxed px-4 anim-hidden ${isVisible ? "anim-fade-zoom" : ""}`}
          style={{ animationDelay: "0.2s" }}
        >
          Cada jugada cuenta. Gracias por permitir que{" "}
          <span className="text-[#CAFC00] font-black drop-shadow-[0_0_5px_rgba(202,252,0,0.5)]">
            SWISH
          </span>{" "}
          te acompañe en la cancha y sea parte de tu historia.
        </p>

        <div
          className={`w-12 md:w-16 h-1 bg-white/20 rounded-full mb-8 md:mb-10 anim-hidden ${isVisible ? "anim-fade-zoom" : ""}`}
          style={{ animationDelay: "0.3s" }}
        ></div>

        <h3
          className={`text-3xl sm:text-4xl md:text-6xl font-strasua text-[#CAFC00] italic tracking-tighter drop-shadow-[0_0_12px_rgba(202,252,0,0.4)] px-2 anim-hidden ${isVisible ? "anim-fade-zoom" : ""}`}
          style={{ animationDelay: "0.4s" }}
        >
          BE THE DIFFERENCE
        </h3>
      </div>

      <div className="w-full bg-[#111111] border-t border-white/10 py-10 md:py-12 px-4 sm:px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 min-[500px]:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 justify-items-center min-[500px]:justify-items-start lg:justify-items-center">
          {[
            {
              href: `https://wa.me/${contacto.whatsapp}`,
              target: "_blank",
              title: "WhatsApp",
              subtitle: "Escribinos",
              svg: (
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              ),
            },
            {
              href: `https://instagram.com/${contacto.instagram}`,
              target: "_blank",
              title: "Instagram",
              subtitle: `@${contacto.instagram}`,
              svg: (
                <>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </>
              ),
            },
            {
              href: `mailto:${contacto.email}`,
              title: "Email",
              subtitle: "Enviar Mail",
              svg: (
                <>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </>
              ),
            },
            {
              isStatic: true,
              title: "Ubicación",
              subtitle: "Paraná, ER",
              svg: (
                <>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </>
              ),
            },
          ].map((item, index) => {
            const ContainerTag = item.isStatic ? "div" : "a";
            return (
              <ContainerTag
                key={item.title}
                href={item.href}
                target={item.target}
                rel={item.target ? "noopener noreferrer" : undefined}
                className={`flex items-center gap-4 group ${item.isStatic ? "cursor-default" : "cursor-pointer"} w-full max-w-[200px] anim-hidden ${isVisible ? "anim-slide-bottom" : ""}`}
                style={{ animationDelay: `${0.5 + index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-[#CAFC00]/10 group-hover:border-[#CAFC00]/50 group-hover:scale-110 transition-all duration-300">
                  <svg
                    className="w-5 h-5 text-white group-hover:text-[#CAFC00] transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {item.svg}
                  </svg>
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] text-white/50 font-octosquares uppercase tracking-wider group-hover:text-[#CAFC00] transition-colors">
                    {item.title}
                  </span>
                  <span className="text-sm text-white font-octosquares font-bold truncate">
                    {item.subtitle}
                  </span>
                </div>
              </ContainerTag>
            );
          })}
        </div>
      </div>
    </section>
  );
}
