import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import CardProd from "../componentes/ProductosPage/CardProd";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "productos"));
        const docs = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setProductos(docs);
      } catch (error) {
        console.error("Error al cargar productos desde Firebase:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  if (loading) {
    return (
      <section
        className="py-12 px-4 md:px-8 bg-black flex justify-center items-center min-h-[400px]"
        id="productos"
      >
        <div className="text-[#CAFC00] text-2xl font-strasua animate-pulse tracking-widest">
          Cargando catálogo...
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4 md:px-8 bg-black" id="productos">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {productos.map((producto) => (
            <CardProd key={producto.id} producto={producto} />
          ))}
        </div>
      </div>
    </section>
  );
}
