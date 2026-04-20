import ArrowDownIcon from "../componentes/InicioPage/ArrowDownIcon";
export default function InicioPage() {
  return (
    <section
      id="inicio"
      className="relative flex flex-col items-center justify-center min-h-screen bg-black overflow-hidden"
    >
      <div className="flex flex-col items-center justify-center gap-8 w-full px-4 mt-16 md:mt-0">
        <div className="w-full max-w-[600px] z-10">
          <img
            src="/imagenes/otros/foto-inicio.png"
            alt="Jugador de baloncesto Swish"
            className="w-full h-auto object-contain grayscale"
          />
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-baseline gap-x-4 gap-y-2 z-10">
          <div className="flex items-baseline gap-3">
            <span className="font-fuggles text-4xl md:text-5xl text-white">
              Lo
            </span>
            <span className="text-6xl md:text-7xl font-strasua text-[#CAFC00] uppercase tracking-tighter italic">
              MEJOR
            </span>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-4xl md:text-5xl text-white font-fuggles">
              para los
            </span>
            <span className="text-6xl md:text-7xl font-strasua text-[#CAFC00] uppercase tracking-tighter italic">
              MEJORES
            </span>
          </div>
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
