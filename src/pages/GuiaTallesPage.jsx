import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function GuiaTallesPage() {
  const categorias = [
    {
      titulo: "REMERAS Y MUSCULOSAS",
      medida: "CONTORNO PECHO",
      talles: [
        { talle: "S", valor: "91-102" },
        { talle: "M", valor: "102-112" },
        { talle: "L", valor: "112-122" },
        { talle: "XL", valor: "122-132" },
        { talle: "XXL", valor: "132-142" },
      ],
    },
    {
      titulo: "CALZAS",
      medida: "CONTORNO CINTURA",
      talles: [
        { talle: "S", valor: "76-86" },
        { talle: "M", valor: "86-97" },
        { talle: "L", valor: "97-107" },
        { talle: "XL", valor: "107-117" },
        { talle: "2XL", valor: "117-127" },
      ],
    },
    {
      titulo: "RODILLERAS Y MANGAS DE PIERNA",
      medida: "CONTORNO DE RODILLA",
      talles: [
        { talle: "S", valor: "25-30" },
        { talle: "M", valor: "30-36" },
        { talle: "L", valor: "36-41" },
        { talle: "XL", valor: "41-45" },
        { talle: "XXL", valor: "45-55" },
      ],
    },
    {
      titulo: "GEMELERAS",
      medida: "CONTORNO GEMELO",
      talles: [
        { talle: "S", valor: "30-36" },
        { talle: "M", valor: "34-42" },
        { talle: "L", value: "39-47" },
        { talle: "XL", value: "40-50" },
      ],
    },
    {
      titulo: "MANGA PARA CODO",
      medida: "CONTORNO DEL CODO",
      talles: [
        { talle: "S", valor: "20-27" },
        { talle: "M", valor: "27-33" },
        { talle: "L", valor: "33-37" },
        { talle: "XL", valor: "37-41" },
        { talle: "XXL", valor: "41-45" },
      ],
    },
  ];

  return (
    <section className="min-h-screen w-full bg-black pt-28 pb-16 sm:pt-32 md:pt-36 md:pb-24 px-4 sm:px-8 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-[300px] bg-[#CAFC00]/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="text-center mb-10 md:mb-16 animate-fade-in-up">
          <h1 className="font-strasua text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-widest uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            GUÍA DE <span className="text-[#CAFC00]">TALLES</span>
          </h1>
          <p className="font-octosquares text-white/50 mt-3 md:mt-4 text-xs sm:text-sm md:text-base max-w-lg mx-auto">
            Encontrá tu medida ideal. Utilizá una cinta métrica para medir el
            contorno de la zona indicada.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 justify-items-center">
          {categorias.map((categoria, index) => (
            <div
              key={categoria.titulo}
              className="w-full max-w-sm flex flex-col items-center animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <h2 className="font-strasua text-lg sm:text-xl md:text-2xl text-white text-center mb-2 tracking-wide min-h-[3.5rem] flex items-center justify-center">
                {categoria.titulo}
              </h2>

              <h3 className="font-strasua text-xs sm:text-sm md:text-base text-white mb-5 md:mb-6 text-center tracking-widest">
                <span className="text-[#CAFC00]">TALLE</span> {categoria.medida}
              </h3>

              <div className="flex flex-col gap-3 w-full px-12 sm:px-4 md:px-8">
                {categoria.talles.map((item) => (
                  <div
                    key={item.talle}
                    className="bg-[#111111] border border-white/5 shadow-[0_8px_20px_rgba(0,0,0,0.4)] rounded-full py-2.5 sm:py-3 px-6 sm:px-8 flex items-center justify-center gap-4 sm:gap-6 hover:border-[#CAFC00]/30 hover:bg-[#1a1a1a] transition-all cursor-default"
                  >
                    <span className="font-strasua text-[#CAFC00] text-lg sm:text-xl md:text-2xl w-10 sm:w-12 text-right drop-shadow-[0_0_8px_rgba(202,252,0,0.3)]">
                      {item.talle}
                    </span>
                    <span className="font-octosquares font-bold text-white text-base sm:text-lg md:text-xl w-20 sm:w-24 text-left">
                      {item.valor || item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div
          className="mt-12 md:mt-16 flex justify-center animate-fade-in-up"
          style={{ animationDelay: "800ms" }}
        >
          <Link
            to="/"
            className="flex items-center gap-2 sm:gap-3 bg-transparent border-2 border-[#CAFC00] text-[#CAFC00] px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-strasua text-xs sm:text-sm md:text-base hover:bg-[#CAFC00] hover:text-black transition-all shadow-[0_0_15px_rgba(202,252,0,0.2)]"
          >
            <ArrowLeft size={18} className="w-4 h-4 sm:w-5 sm:h-5" />
            VOLVER AL INICIO
          </Link>
        </div>
      </div>
    </section>
  );
}
