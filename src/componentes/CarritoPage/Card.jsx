import React from "react";

const Card = ({ product, onQuantityChange, onRemoveProduct }) => {
  const { id, nombre, precio, imagen, quantity, selectedColor, selectedSize } =
    product;

  const totalPrice = quantity * precio;

  const getBgColor = (colorName) => {
    if (!colorName) return "bg-gray-500";
    if (colorName.toLowerCase() === "blanco") return "bg-white";
    return "bg-black";
  };

  return (
    <div className="p-3 rounded-[1.5rem] flex gap-5 w-full border border-white/20 bg-white/10 backdrop-filter backdrop-blur-md shadow-lg">
      <div className="w-28 h-28 md:w-32 md:h-32 rounded-xl overflow-hidden flex-shrink-0">
        <img src={imagen} alt={nombre} className="w-full h-full object-cover" />
      </div>

      <div className="flex flex-col justify-between flex-grow py-1">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-octosquares md:text-2xl font-black text-white tracking-wide">
            {nombre}
          </h3>
          <div className="text-xl font-octosquares md:text-2xl font-medium text-white tracking-wider">
            {totalPrice.toLocaleString("es-AR")} $
          </div>
        </div>

        <div className="flex items-center gap-2 mt-1 mb-2">
          <div
            className={`w-4 h-4 rounded-full ${getBgColor(selectedColor)}`}
          ></div>
          <span className="text-sm font-octosquares font-medium text-white capitalize">
            {selectedColor} | Talle: {selectedSize}{" "}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-2xl px-2 h-10 shadow-inner border border-white/20 bg-white/50 backdrop-filter backdrop-blur-md shadow-lg">
            <button
              onClick={() =>
                onQuantityChange(id, selectedSize, selectedColor, -1)
              }
              className="w-8 flex cursor-pointer items-center justify-center text-black text-2xl font-medium pb-1 hover:opacity-70 transition-opacity"
            >
              −
            </button>
            <span className="text-xl font-strasua font-black text-white px-2 drop-shadow-[0_0_6px_rgba(0,0,0,1)]">
              {quantity}
            </span>
            <button
              onClick={() =>
                onQuantityChange(id, selectedSize, selectedColor, 1)
              }
              className="w-8 cursor-pointer flex items-center justify-center text-black text-2xl font-medium pb-1 hover:opacity-70 transition-opacity"
            >
              +
            </button>
          </div>

          <button
            // Pasamos id, size y color para eliminar el producto exacto
            onClick={() => onRemoveProduct(id, selectedSize, selectedColor)}
            className="h-10 cursor-pointer w-10 flex items-center justify-center border border-white/20 bg-white/50 backdrop-filter backdrop-blur-md shadow-lg rounded-2xl hover:opacity-80 transition-opacity"
          >
            <svg
              className="w-6 h-6 text-black hover:text-red-600 transition-colors"
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
