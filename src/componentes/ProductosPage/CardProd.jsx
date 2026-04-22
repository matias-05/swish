import { useState, useContext, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import toast from "react-hot-toast";

export default function CardProd({ producto }) {
  const [talleSeleccionado, setTalleSeleccionado] = useState("");
  const [colorSeleccionado, setColorSeleccionado] = useState(
    producto.colores ? producto.colores[0] : "",
  );

  const { addToCart } = useContext(CartContext);

  const obtenerStockDeTalle = (talle) => {
    if (producto.stockPorTalle && producto.stockPorTalle[talle] !== undefined) {
      return Number(producto.stockPorTalle[talle]);
    }
    return Number(producto.stock || 0);
  };

  useEffect(() => {
    if (producto.talles) {
      const primerTalleDisponible = producto.talles.find(
        (t) => obtenerStockDeTalle(t) > 0,
      );

      if (primerTalleDisponible) {
        setTalleSeleccionado(primerTalleDisponible);
      } else {
        setTalleSeleccionado("");
      }
    }
  }, [producto]);

  const handleAgregar = () => {
    if (!talleSeleccionado || !colorSeleccionado) {
      toast.error("Selecciona un talle y color", {
        className:
          "border border-white/20 bg-white/10 shadow-lg backdrop-filter backdrop-blur-md",
        style: {
          borderRadius: "10px",
          background: "transparent",
          color: "#fff",
        },
      });
      return;
    }

    addToCart(producto, talleSeleccionado, colorSeleccionado);
  };

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
            ${producto.precio?.toLocaleString()}{" "}
          </span>
        </div>

        <div className="flex items-center gap-4 mb-6 px-2 min-h-[40px]">
          <span className="text-white/90 font-octosquares text-lg font-black tracking-wide w-16 drop-shadow-sm">
            Talle:
          </span>
          <div className="flex flex-wrap gap-2">
            {producto.talles &&
              producto.talles.map((talle) => {
                const stockDeEsteTalle = obtenerStockDeTalle(talle);
                const sinStock = stockDeEsteTalle <= 0;

                return (
                  <button
                    key={talle}
                    disabled={sinStock}
                    onClick={() => setTalleSeleccionado(talle)}
                    className={`relative cursor-pointer w-10 h-10 flex font-strasua items-center justify-center rounded-full font-black text-sm transition-all duration-300 backdrop-blur-sm 
                    ${
                      sinStock
                        ? "opacity-30 cursor-not-allowed border border-red-500/50 bg-black/50"
                        : talleSeleccionado === talle
                          ? "bg-[#CAFC00] text-black shadow-[0_0_15px_rgba(202,252,0,0.3)]"
                          : "bg-white/10 text-white hover:bg-white/20 border border-white/5"
                    }`}
                  >
                    {talle}
                    {sinStock && (
                      <div className="absolute w-full h-[1px] bg-red-500 rotate-45 transform origin-center"></div>
                    )}
                  </button>
                );
              })}
          </div>
        </div>

        <div className="flex items-center gap-4 mb-8 px-2 min-h-[32px]">
          <span className="text-white/90 text-lg font-octosquares font-black tracking-wide w-16 drop-shadow-sm">
            Color:
          </span>
          <div className="flex gap-3">
            {producto.colores &&
              producto.colores.map((colorStr) => {
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
          <button
            onClick={handleAgregar}
            disabled={!talleSeleccionado}
            className={`font-octosquares font-black text-base py-3 px-8 rounded-full transition-all w-[85%] shadow-lg border border-white/20 bg-white/10 backdrop-filter backdrop-blur-md 
              ${
                !talleSeleccionado
                  ? "text-red-400 opacity-50 cursor-not-allowed"
                  : "text-[#CAFC00] cursor-pointer hover:bg-[#CAFC00]/20 hover:text-[#CAFC00]"
              }`}
          >
            {!talleSeleccionado ? "Agotado" : "Agregar"}
          </button>
        </div>
      </div>
    </div>
  );
}
