import React, { useState, useContext } from "react";
import Nav from "../componentes/Navbar";
import ProdAgregados from "../componentes/CarritoPage/ProdAgregados";
import Resumen from "../componentes/CarritoPage/Resumen";
import { CartContext } from "../context/CartContext";

const CarritoPage = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart } =
    useContext(CartContext);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("Transferencia");

  const handlePaymentMethodSelection = (method) => {
    setSelectedPaymentMethod(method);
  };

  const totalProducts = cartItems.reduce(
    (sum, product) => sum + product.quantity,
    0,
  );
  const totalAmount = cartItems.reduce(
    (sum, product) => sum + product.quantity * product.precio,
    0,
  );

  const handleFinalizarCompra = () => {
    if (cartItems.length === 0) {
      alert("¡Tu carrito está vacío!");
      return;
    }

    const numeroWhatsApp = import.meta.env.VITE_TELEFONO_DUENO;

    let mensaje = `¡Hola *SWISH*! \nQuiero realizar el siguiente pedido:\n`;

    cartItems.forEach((item) => {
      mensaje += `- ${item.quantity}x *${item.nombre}*\n\n`;
      mensaje += `  Talle: ${item.selectedSize} | Color: ${item.selectedColor}\n`;
      mensaje += `  Precio: $${(item.precio * item.quantity).toLocaleString("es-AR")}\n\n`;
    });

    mensaje += `*Método de pago:* ${selectedPaymentMethod}\n`;
    mensaje += `*Total a pagar: $${totalAmount.toLocaleString("es-AR")}*\n\n`;
    mensaje += `Espero la confirmación de mi pedido. ¡Gracias!`;

    const mensajeCodificado = encodeURIComponent(mensaje);

    const url = `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`;
    window.open(url, "_blank");
    clearCart();
  };

  return (
    <div className="min-h-screen bg-black text-gray-50 font-sans pt-32 pb-16">
      <Nav />
      <main className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-8 items-start">
        <div className="bg-[#111111] p-6 rounded-[2rem] min-h-[500px]">
          <ProdAgregados
            products={cartItems}
            onQuantityChange={updateQuantity}
            onRemoveProduct={removeFromCart}
          />
        </div>

        <div className="sticky top-32">
          <Resumen
            totalProducts={totalProducts}
            totalAmount={totalAmount}
            paymentMethods={["Transferencia", "Efectivo"]}
            selectedPaymentMethod={selectedPaymentMethod}
            onPaymentMethodSelection={handlePaymentMethodSelection}
            onFinalizarCompra={handleFinalizarCompra}
          />
        </div>
      </main>
    </div>
  );
};

export default CarritoPage;
