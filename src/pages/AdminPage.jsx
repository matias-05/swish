import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { db, auth } from "../config/firebase";

const AdminPage = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const [productos, setProductos] = useState([]);
  const [productoEditando, setProductoEditando] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mensajeForm, setMensajeForm] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        cargarProductos();
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const cargarProductos = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "productos"));
      const docs = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProductos(docs);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setAuthError("Credenciales incorrectas o usuario no encontrado.");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setProductos([]);
    setProductoEditando(null);
  };

  const handleSelectProduct = (prod) => {
    setProductoEditando({
      ...prod,
      tallesStr: prod.talles ? prod.talles.join(", ") : "",
      coloresStr: prod.colores ? prod.colores.join(", ") : "",
      stockPorTalle: prod.stockPorTalle || {},
    });
    setMensajeForm("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductoEditando((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStockChange = (talle, cantidad) => {
    setProductoEditando((prev) => ({
      ...prev,
      stockPorTalle: {
        ...prev.stockPorTalle,
        [talle]: Number(cantidad),
      },
    }));
  };

  const handleGuardarCambios = async (e) => {
    e.preventDefault();
    setMensajeForm("Guardando...");

    try {
      const docRef = doc(db, "productos", productoEditando.id);

      const tallesArray = productoEditando.tallesStr
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
      const coloresArray = productoEditando.coloresStr
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      const stockLimpio = {};
      tallesArray.forEach((talle) => {
        stockLimpio[talle] = productoEditando.stockPorTalle[talle] || 0;
      });

      const productoActualizado = {
        nombre: productoEditando.nombre,
        precio: Number(productoEditando.precio),
        imagen: productoEditando.imagen,
        talles: tallesArray,
        colores: coloresArray,
        stockPorTalle: stockLimpio,
      };

      await updateDoc(docRef, productoActualizado);

      setMensajeForm("¡Producto actualizado con éxito! ✅");
      cargarProductos();

      setTimeout(() => setMensajeForm(""), 3000);
    } catch (error) {
      console.error("Error al actualizar:", error);
      setMensajeForm("Error al guardar los cambios ❌");
    }
  };

  const tallesActuales = productoEditando?.tallesStr
    ? productoEditando.tallesStr
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-[#111111] p-8 rounded-[2rem] w-full max-w-md border border-white/10 shadow-2xl">
          <h2 className="text-3xl font-strasua text-[#CAFC00] text-center mb-8 tracking-widest">
            SWISH ADMIN
          </h2>
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <input
              type="email"
              placeholder="Email del administrador"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-4 rounded-xl bg-white/5 border border-white/20 text-white font-octosquares focus:outline-none focus:border-[#CAFC00] transition-colors"
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-4 rounded-xl bg-white/5 border border-white/20 text-white font-octosquares focus:outline-none focus:border-[#CAFC00] transition-colors"
              required
            />
            {authError && (
              <p className="text-red-500 text-sm text-center">{authError}</p>
            )}
            <button
              type="submit"
              className="mt-4 bg-[#CAFC00] text-black font-black font-octosquares py-4 rounded-full text-lg hover:scale-105 transition-transform shadow-[0_0_15px_rgba(202,252,0,0.3)] cursor-pointer"
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-12 px-4 md:px-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-4xl font-strasua text-[#CAFC00] tracking-widest">
              Panel de Control
            </h1>
            <p className="text-white/60 font-octosquares mt-2">
              Administración de catálogo SWISH
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white px-6 py-2 rounded-full font-bold transition-colors cursor-pointer"
          >
            Cerrar Sesión
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-[#111111] border border-white/10 rounded-[2rem] p-6 h-[700px] overflow-y-auto custom-scrollbar">
            <h3 className="text-xl font-octosquares text-white mb-6">
              Seleccionar Producto
            </h3>
            {loading ? (
              <p className="text-[#CAFC00] text-center">Cargando catálogo...</p>
            ) : (
              <div className="flex flex-col gap-3">
                {productos.map((prod) => (
                  <button
                    key={prod.id}
                    onClick={() => handleSelectProduct(prod)}
                    className={`flex items-center gap-4 p-3 rounded-xl transition-all cursor-pointer text-left ${
                      productoEditando?.id === prod.id
                        ? "bg-[#CAFC00]/20 border border-[#CAFC00]/50"
                        : "bg-white/5 border border-transparent hover:bg-white/10"
                    }`}
                  >
                    <img
                      src={prod.imagen}
                      alt={prod.nombre}
                      className="w-12 h-12 rounded-lg object-cover bg-black"
                    />
                    <div className="overflow-hidden">
                      <p className="text-white font-bold truncate">
                        {prod.nombre}
                      </p>
                      <p className="text-[#CAFC00] text-sm">
                        ${prod.precio.toLocaleString("es-AR")}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-2">
            {!productoEditando ? (
              <div className="bg-[#111111] border border-white/10 rounded-[2rem] p-10 h-full flex flex-col items-center justify-center text-white/40">
                <svg
                  className="w-20 h-20 mb-4 opacity-50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  ></path>
                </svg>
                <p className="text-xl font-octosquares">
                  Selecciona un producto de la lista para editarlo
                </p>
              </div>
            ) : (
              <div className="bg-[#111111] border border-white/10 rounded-[2rem] p-8 shadow-2xl relative">
                <h3 className="text-2xl font-octosquares text-[#CAFC00] mb-6 border-b border-white/10 pb-4">
                  Editando: {productoEditando.nombre}
                </h3>

                <form
                  onSubmit={handleGuardarCambios}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-white/70 text-sm mb-2 font-octosquares">
                      Nombre del Producto
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      value={productoEditando.nombre}
                      onChange={handleChange}
                      className="w-full p-4 rounded-xl bg-white/5 border border-white/20 text-white focus:outline-none focus:border-[#CAFC00]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 text-sm mb-2 font-octosquares">
                      Precio ($)
                    </label>
                    <input
                      type="number"
                      name="precio"
                      value={productoEditando.precio}
                      onChange={handleChange}
                      className="w-full p-4 rounded-xl bg-white/5 border border-white/20 text-white focus:outline-none focus:border-[#CAFC00]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 text-sm mb-2 font-octosquares">
                      Colores (separados por coma)
                    </label>
                    <input
                      type="text"
                      name="coloresStr"
                      value={productoEditando.coloresStr}
                      onChange={handleChange}
                      placeholder="Ej: negro, blanco"
                      className="w-full p-4 rounded-xl bg-white/5 border border-white/20 text-white focus:outline-none focus:border-[#CAFC00]"
                    />
                  </div>

                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-white/70 text-sm mb-2 font-octosquares">
                      Talles (separados por coma)
                    </label>
                    <input
                      type="text"
                      name="tallesStr"
                      value={productoEditando.tallesStr}
                      onChange={handleChange}
                      placeholder="Ej: S, M, L, XL"
                      className="w-full p-4 rounded-xl bg-white/5 border border-white/20 text-white focus:outline-none focus:border-[#CAFC00]"
                    />
                  </div>

                  {tallesActuales.length > 0 && (
                    <div className="col-span-1 md:col-span-2 bg-black/40 p-5 rounded-xl border border-white/10 mt-2">
                      <label className="block text-[#CAFC00] text-sm mb-4 font-octosquares font-bold">
                        Definir stock por cada talle:
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {tallesActuales.map((talle) => (
                          <div key={talle} className="flex flex-col">
                            <label className="text-white/80 text-xs mb-1 font-octosquares text-center">
                              Talle {talle}
                            </label>
                            <input
                              type="number"
                              min="0"
                              value={
                                productoEditando.stockPorTalle[talle] || ""
                              }
                              onChange={(e) =>
                                handleStockChange(talle, e.target.value)
                              }
                              className="w-full p-3 rounded-lg bg-white/5 border border-white/20 text-white text-center focus:outline-none focus:border-[#CAFC00]"
                              placeholder="0"
                              required
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-white/70 text-sm mb-2 font-octosquares">
                      URL de la Imagen (Ruta local o URL web)
                    </label>
                    <input
                      type="text"
                      name="imagen"
                      value={productoEditando.imagen}
                      onChange={handleChange}
                      className="w-full p-4 rounded-xl bg-white/5 border border-white/20 text-white focus:outline-none focus:border-[#CAFC00]"
                      required
                    />
                  </div>

                  <div className="col-span-1 md:col-span-2 mt-4 flex items-center gap-6">
                    <button
                      type="submit"
                      className="flex-1 bg-[#CAFC00] text-black font-black font-octosquares py-4 rounded-xl text-lg hover:bg-[#b5e000] transition-colors cursor-pointer"
                    >
                      Guardar Cambios
                    </button>
                    {mensajeForm && (
                      <span className="flex-1 text-[#CAFC00] font-bold font-octosquares animate-pulse">
                        {mensajeForm}
                      </span>
                    )}
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
