import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import ArrowDownIcon from "../componentes/ArrowDownIcon";
import CardProd from "../componentes/ProductosPage/CardProd";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

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
      }
    };

    fetchProductos();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    const section = document.getElementById("productos");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section
      className="min-h-[calc(100vh)] py-12 px-8 flex flex-col relative bg-black overflow-hidden"
      id="productos"
    >
      <style>{`
        @keyframes fadeUpCards {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .card-animate {
          opacity: 0;
        }
        .card-animate.visible {
          animation: fadeUpCards 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
      <div className="max-w-[1400px] mx-auto w-full flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {productos.map((producto, index) => (
            <div
              key={producto.id}
              className={`card-animate ${isVisible ? "visible" : ""}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardProd producto={producto} />
            </div>
          ))}
        </div>
      </div>
      <div
        className={`w-full flex justify-center mt-36 pb-4 card-animate ${isVisible ? "visible" : ""}`}
        style={{ animationDelay: `${productos.length * 0.1 + 0.2}s` }}
      >
        <div className="animate-bounce">
          <a
            href="#sobre-nosotros"
            className="cursor-pointer transition-transform hover:scale-125 block text-[#CAFC00] hover:drop-shadow-[0_0_8px_rgba(202,252,0,0.4)]"
            aria-label="Ir a Sobre Nosotros"
          >
            <ArrowDownIcon />
          </a>
        </div>
      </div>
    </section>
  );
}
