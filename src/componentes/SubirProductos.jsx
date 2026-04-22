import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import productosLocal from "../data/productos";

const SubirProductos = () => {
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const handleSubir = async () => {
    setLoading(true);
    setMensaje("Subiendo productos...");

    try {
      const productosRef = collection(db, "productos");

      for (const producto of productosLocal) {
        await addDoc(productosRef, producto);
      }

      setMensaje("¡Todos los productos se subieron con éxito! 🚀");
    } catch (error) {
      console.error("Error subiendo productos:", error);
      setMensaje("Hubo un error al subir los productos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 bg-black text-center mt-32">
      <h2 className="text-white text-2xl font-bold mb-4">
        Panel de Admin Temporal
      </h2>

      <button
        onClick={handleSubir}
        disabled={loading}
        className="bg-[#CAFC00] text-black font-bold py-3 px-6 rounded-full hover:scale-105 transition-transform disabled:opacity-50 cursor-pointer"
      >
        {loading ? "Subiendo..." : "Subir Productos a Firebase"}
      </button>

      {mensaje && <p className="text-white mt-4">{mensaje}</p>}
    </div>
  );
};

export default SubirProductos;
