import { useState, useContext, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import toast from "react-hot-toast";

export default function CardProd({ producto }) {
  const [talleSeleccionado, setTalleSeleccionado] = useState(
    producto.talles ? producto.talles[0] : "",
  );
  const [colorSeleccionado, setColorSeleccionado] = useState(
    producto.colores ? producto.colores[0] : "",
  );

  const { addToCart } = useContext(CartContext);

  const obtenerStockCombinado = (talle, color) => {
    if (
      producto.stockDetallado &&
      producto.stockDetallado[`${talle}-${color}`] !== undefined
    ) {
      return Number(producto.stockDetallado[`${talle}-${color}`]);
    }
    if (producto.stockPorTalle && producto.stockPorTalle[talle] !== undefined) {
      return Number(producto.stockPorTalle[talle]);
    }
    return Number(producto.stock || 0);
  };

  useEffect(() => {
    if (producto.talles && producto.colores) {
      let encontroStock = false;
      for (const t of producto.talles) {
        for (const c of producto.colores) {
          if (obtenerStockCombinado(t, c) > 0) {
            setTalleSeleccionado(t);
            setColorSeleccionado(c);
            encontroStock = true;
            break;
          }
        }
        if (encontroStock) break;
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

  const stockActual = obtenerStockCombinado(
    talleSeleccionado,
    colorSeleccionado,
  );
  const sinStockTotal = stockActual <= 0;

  return (
    <div className="group w-full max-w-[320px] p-4 rounded-[2rem] font-sans mx-auto relative overflow-hidden z-0 border border-white/20 bg-white/10 shadow-lg backdrop-filter backdrop-blur-md flex flex-col h-full">
      <div className="relative z-10 flex flex-col h-full">
        <div className="w-full h-[240px] overflow-hidden rounded-[1.5rem] bg-black/40 mb-4 relative flex items-center justify-center shrink-0">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="w-full h-full object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="flex flex-col items-center justify-center text-center mb-5 px-1 gap-1">
          <h3 className="text-white font-octosquares text-base lg:text-lg font-black tracking-wider leading-tight">
            {producto.nombre}
          </h3>
          <span className="text-[#CAFC00] font-octosquares text-lg lg:text-xl font-black shrink-0 mt-1">
            ${producto.precio?.toLocaleString()}
          </span>
        </div>

        <div className="flex flex-row items-center gap-3 mb-4 px-1">
          <span className="text-white/90 font-octosquares text-sm lg:text-base font-black tracking-wide shrink-0">
            Talle:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {producto.talles &&
              producto.talles.map((talle) => (
                <button
                  key={talle}
                  onClick={() => setTalleSeleccionado(talle)}
                  className={`relative cursor-pointer w-8 h-8 flex font-strasua items-center justify-center rounded-full font-black text-xs transition-all duration-300 backdrop-blur-sm 
                ${talleSeleccionado === talle ? "bg-[#CAFC00] text-black shadow-[0_0_15px_rgba(202,252,0,0.3)]" : "bg-white/10 text-white hover:bg-white/20 border border-white/5"}`}
                >
                  {talle}
                </button>
              ))}
          </div>
        </div>

        <div className="flex flex-row items-center gap-3 mb-6 px-1">
          <span className="text-white/90 font-octosquares text-sm lg:text-base font-black tracking-wide shrink-0">
            Color:
          </span>
          <div className="flex flex-wrap gap-2">
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
                    className={`cursor-pointer w-7 h-7 rounded-full transition-all duration-300 ${claseColor} 
                  ${colorSeleccionado === colorStr ? "ring-2 ring-offset-2 ring-offset-neutral-900 ring-white scale-110" : "hover:scale-105"}`}
                    aria-label={`Color ${colorStr}`}
                  />
                );
              })}
          </div>
        </div>

        <div className="flex justify-center mt-auto pb-1">
          <button
            onClick={handleAgregar}
            disabled={sinStockTotal}
            className={`font-octosquares font-black text-sm lg:text-base py-2.5 px-6 rounded-full transition-all w-full shadow-lg border border-white/20 bg-white/10 backdrop-filter backdrop-blur-md 
              ${sinStockTotal ? "text-red-400 opacity-50 cursor-not-allowed" : "text-[#CAFC00] cursor-pointer hover:bg-[#CAFC00]/20 hover:text-[#CAFC00]"}`}
          >
            {sinStockTotal ? "Agotado" : "Agregar"}
          </button>
        </div>
      </div>
    </div>
  );
}
