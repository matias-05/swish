import { useState } from "react";

export default function CardProd({ producto }) {
  const [talleSeleccionado, setTalleSeleccionado] = useState(
    producto.talles[0] || "",
  );
  const [colorSeleccionado, setColorSeleccionado] = useState(
    producto.colores[0] || "",
  );

  return (
    <div className="group w-full max-w-[380px] p-4 rounded-[2rem] font-sans mx-auto relative overflow-hidden z-0 border border-white/20 bg-white/10 shadow-lg backdrop-filter backdrop-blur-md">
      <div className="relative z-10">
        <div className="w-full h-[300px] overflow-hidden rounded-[1.5rem] bg-black/40 mb-6 relative flex items-center justify-center">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex justify-between items-center mb-6 px-2 min-h-[60px]">
          <h3 className="text-white font-octosquares text-lg font-black tracking-wider drop-shadow-sm leading-tight flex-1 mr-4">
            {producto.nombre}
          </h3>
          <span className="text-[#CAFC00] font-octosquares text-xl font-black drop-shadow-md whitespace-nowrap">
            ${producto.precio.toLocaleString()}{" "}
          </span>
        </div>

        <div className="flex items-center gap-4 mb-6 px-2 min-h-[40px]">
          <span className="text-white/90 font-octosquares text-lg font-black tracking-wide w-16 drop-shadow-sm">
            Talle:
          </span>
          <div className="flex flex-wrap gap-2">
            {producto.talles.map((talle) => (
              <button
                key={talle}
                onClick={() => setTalleSeleccionado(talle)}
                className={`cursor-pointer w-10 h-10 flex font-strasua items-center justify-center rounded-full font-black text-sm transition-all duration-300 backdrop-blur-sm ${
                  talleSeleccionado === talle
                    ? "bg-[#CAFC00] text-black  shadow-[0_0_15px_rgba(202,252,0,0.3)]"
                    : "bg-white/10 text-white  hover:bg-white/20 border border-white/5"
                }`}
              >
                {talle}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 mb-8 px-2 min-h-[32px]">
          <span className="text-white/90 text-lg font-octosquares font-black tracking-wide w-16 drop-shadow-sm">
            Color:
          </span>
          <div className="flex gap-3">
            {producto.colores.map((colorStr) => {
              let claseColor = "bg-gray-500";
              if (colorStr.toLowerCase() === "negro")
                claseColor = "bg-black border border-zinc-700";
              if (colorStr.toLowerCase() === "blanco")
                claseColor = "bg-white border border-gray-300";

              return (
                <button
                  key={colorStr}
                  onClick={() => setColorSeleccionado(colorStr)}
                  title={colorStr}
                  className={` cursor-pointer w-8 h-8 rounded-full transition-all duration-300 ${claseColor} ${
                    colorSeleccionado === colorStr
                      ? "ring-2 ring-offset-2 ring-offset-neutral-900 ring-white scale-110"
                      : "hover:scale-105"
                  }`}
                  aria-label={`Color ${colorStr}`}
                />
              );
            })}
          </div>
        </div>

        <div className="flex justify-center pb-2">
          <button className="font-octosquares cursor-pointer text-[#CAFC00] font-black text-base py-3 px-8 rounded-full transition-colors w-[85%] shadow-lg border border-white/20 bg-white/10 shadow-lg backdrop-filter backdrop-blur-md hover:bg-[#CAFC00]/20 hover:text-[#CAFC00]">
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}
