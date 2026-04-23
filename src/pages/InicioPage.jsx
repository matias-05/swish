import ArrowDownIcon from "../componentes/InicioPage/ArrowDownIcon";

export default function InicioPage() {
  return (
    <section
      id="inicio"
      className=" h-[calc(100vh)] w-full overflow-hidden relative flex flex-col items-center justify-center bg-black"
    >
      <div className="flex flex-col items-center justify-center gap-6 md:gap-8 w-full px-2 mt-16 md:mt-0">
        <div className="w-full max-w-[600px] z-10 px-4 md:px-0">
          <img
            src="/imagenes/otros/foto-inicio.png"
            alt="Jugador de baloncesto Swish"
            className="w-full h-auto object-contain grayscale"
          />
        </div>

        <div className="flex flex-row items-baseline justify-center gap-1.5 sm:gap-3 z-10 w-full whitespace-nowrap">
          <span className="font-fuggles text-xl min-[400px]:text-2xl sm:text-4xl md:text-5xl text-white">
            Lo
          </span>
          <span className="font-strasua text-2xl min-[400px]:text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-[#CAFC00] uppercase tracking-tighter italic">
            MEJOR
          </span>
          <span className="font-fuggles text-xl min-[400px]:text-2xl sm:text-4xl md:text-5xl text-white ml-1 sm:ml-2">
            para los
          </span>
          <span className="font-strasua text-2xl min-[400px]:text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-[#CAFC00] uppercase tracking-tighter italic">
            MEJORES
          </span>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-20">
        <a
          href="#productos"
          className="cursor-pointer transition-transform hover:scale-110 block"
        >
          <ArrowDownIcon />
        </a>
      </div>
    </section>
  );
}
