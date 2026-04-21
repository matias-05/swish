import React from "react";

const Resumen = ({
  totalProducts,
  totalAmount,
  paymentMethods,
  selectedPaymentMethod,
  onPaymentMethodSelection,
  onFinalizarCompra,
}) => {
  return (
    <div className="bg-[#111111] p-6 md:p-8 rounded-[2rem] flex flex-col items-center shadow-lg sticky top-24 min-h-[500px]">
      <h2 className="text-3xl font-strasua text-[#CAFC00] md:text-4xl font-black text-center tracking-widest w-full">
        Resumen
      </h2>

      <hr className="w-full border-neutral-600 my-5" />

      <div className="w-full text-left">
        <span className="text-xl font-octosquares font-bold text-white tracking-wide">
          Productos: {totalProducts}
        </span>
      </div>

      <hr className="w-full border-neutral-600 my-5" />

      <div className="flex flex-col gap-4 w-full">
        <h4 className="text-lg font-octosquares md:text-xl font-bold text-white text-center tracking-wide">
          Seleccionar método de pago
        </h4>

        <div className="flex flex-row gap-3 w-full">
          {paymentMethods.map((method) => (
            <button
              key={method}
              onClick={() => onPaymentMethodSelection(method)}
              className={`flex-1 py-3 cursor-pointer font-octosquares text-shadow-[0px_0px_15px_rgba(0,0,0,1)] px-2 rounded-full font-black text-sm md:text-base transition-colors border border-white/20  backdrop-filter backdrop-blur-md shadow-lg ${
                selectedPaymentMethod === method
                  ? "bg-[#cafc00]/10 text-white"
                  : "bg-[#ffffff]/10 text-white hover:bg-gray-500"
              }`}
            >
              {method}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-grow"></div>

      <div className="mt-8 w-full flex flex-col gap-6">
        <h3 className="text-3xl font-octosquares md:text-3xl font-black text-white text-center tracking-widest">
          Total: {totalAmount.toLocaleString("es-AR")}$
        </h3>

        <button
          onClick={onFinalizarCompra}
          className="w-full py-4 rounded-full font-octosquares font-black text-black text-xl tracking-wider bg-[#CAFC00] hover:bg-[#b5e000] hover:scale-[1.02] transition-all duration-300 shadow-[0_0_20px_rgba(202,252,0,0.3)] cursor-pointer"
        >
          Finalizar Compra
        </button>
      </div>
    </div>
  );
};

export default Resumen;
