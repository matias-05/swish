import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import CardProd from "../componentes/ProductosPage/CardProd";

export default function Productos() {
  const [productos, setProductos] = useState([]);

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
        console.log("Productos cargados desde Firebase:", productos);
      }
    };

    fetchProductos();
  }, []);

  return (
    <section className="min-h-[calc(100vh)] py-12 px-8" id="productos">
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
