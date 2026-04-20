import Navbar from "./componentes/Navbar";
import InicioPage from "./pages/InicioPage";
import Productos from "./pages/ProductosPage";
import "./App.css";

function App() {
  return (
    <div className="bg-gray-50 font-sans text-gray-900">
      <Navbar />
      <main>
        {/* SECCIÓN: INICIO */}
        <InicioPage />

        {/* SECCIÓN: PRODUCTOS */}
        <Productos />

        {/* SECCIÓN: SOBRE NOSOTROS */}

        {/* SECCIÓN: CONTACTO */}
      </main>
    </div>
  );
}

export default App;
