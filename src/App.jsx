import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./componentes/Navbar";
import InicioPage from "./pages/InicioPage";
import Productos from "./pages/ProductosPage";
import CarritoPage from "./pages/CarritoPage";
import "./App.css";

const LandingPageCompleta = () => (
  <>
    <InicioPage />
    <Productos />
  </>
);

function App() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);

      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.pathname, location.hash]);

  return (
    <div className="bg-black min-h-screen font-sans text-gray-900 overflow-x-hidden">
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<LandingPageCompleta />} />
          <Route path="/carrito" element={<CarritoPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
