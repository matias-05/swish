import React from "react";

const Card = ({ product, onQuantityChange, onRemoveProduct }) => {
  const {
    id,
    nombre,
    precio, // Este ya es el precio con el descuento aplicado
    precioSinDescuento, // Este lo guardamos desde CardProd
    imagen,
    quantity,
    selectedColor,
    selectedSize,
  } = product;

  // Calculamos los totales según la cantidad
  const totalPrice = quantity * precio;
  const totalOriginal = precioSinDescuento
    ? quantity * precioSinDescuento
    : null;
  const tieneDescuento = precioSinDescuento && precioSinDescuento > precio;

  const getBgColor = (colorName) => {
    if (!colorName) return "bg-gray-500";
    if (colorName.toLowerCase() === "blanco") return "bg-white";
    return "bg-black";
  };

  return (
    <div className="p-3 sm:p-4 rounded-[1.5rem] flex flex-row gap-3 sm:gap-5 w-full border border-white/20 bg-white/5 hover:bg-white/10 transition-colors backdrop-filter backdrop-blur-md shadow-lg">
      {/* IMAGEN */}
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-xl overflow-hidden flex-shrink-0 bg-black/40">
        <img src={imagen} alt={nombre} className="w-full h-full object-cover" />
      </div>

      {/* CONTENIDO */}
      <div className="flex flex-col justify-between flex-grow min-w-0 py-1">
        {/* TÍTULO Y PRECIOS */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-4 mb-2 sm:mb-0">
          <h3 className="text-base sm:text-lg md:text-xl font-octosquares font-black text-white tracking-wide leading-tight line-clamp-2">
            {nombre}
          </h3>

          <div className="flex flex-col items-start sm:items-end shrink-0">
            {tieneDescuento ? (
              <>
                <span className="text-xs sm:text-sm font-octosquares font-black text-white/40 line-through decoration-red-500/80 decoration-2">
                  ${totalOriginal.toLocaleString("es-AR")}
                </span>
                <span className="text-base sm:text-lg md:text-xl font-octosquares font-black text-[#CAFC00] tracking-wider">
                  ${totalPrice.toLocaleString("es-AR")}
                </span>
              </>
            ) : (
              <span className="text-base sm:text-lg md:text-xl font-octosquares font-black text-[#CAFC00] tracking-wider">
                ${totalPrice.toLocaleString("es-AR")}
              </span>
            )}
          </div>
        </div>

        {/* VARIANTE (COLOR / TALLE) */}
        <div className="flex items-center gap-2 mb-3 sm:mb-0 mt-1 sm:mt-0">
          <div
            className={`w-4 h-4 rounded-full border border-white/30 ${getBgColor(selectedColor)}`}
          ></div>
          <span className="text-xs sm:text-sm font-octosquares font-medium text-white/80 capitalize truncate">
            {selectedColor} | Talle: {selectedSize}
          </span>
        </div>

        {/* CONTROLES: CANTIDAD Y ELIMINAR */}
        <div className="flex items-center justify-between sm:justify-start gap-3 sm:gap-6 mt-auto">
          <div className="flex items-center rounded-xl px-1 sm:px-2 h-9 sm:h-10 border border-white/20 bg-black/50 backdrop-filter backdrop-blur-md">
            <button
              onClick={() =>
                onQuantityChange(id, selectedSize, selectedColor, -1)
              }
              className="w-7 sm:w-8 h-full flex cursor-pointer items-center justify-center text-white/70 hover:text-[#CAFC00] text-xl font-medium transition-colors"
            >
              −
            </button>
            <span className="text-base sm:text-lg font-strasua font-black text-white px-2 sm:px-3">
              {quantity}
            </span>
            <button
              onClick={() =>
                onQuantityChange(id, selectedSize, selectedColor, 1)
              }
              className="w-7 sm:w-8 h-full flex cursor-pointer items-center justify-center text-white/70 hover:text-[#CAFC00] text-xl font-medium transition-colors"
            >
              +
            </button>
          </div>

          <button
            onClick={() => onRemoveProduct(id, selectedSize, selectedColor)}
            className="h-9 w-9 sm:h-10 sm:w-10 flex cursor-pointer items-center justify-center border border-red-500/30 bg-red-500/10 hover:bg-red-500/30 backdrop-filter backdrop-blur-md rounded-xl transition-colors shrink-0"
            aria-label="Eliminar producto"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
