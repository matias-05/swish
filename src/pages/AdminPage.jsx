import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  getDoc,
  setDoc,
} from "firebase/firestore";
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
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("productos");

  const [productos, setProductos] = useState([]);
  const [productoEditando, setProductoEditando] = useState(null);
  const [mensajeForm, setMensajeForm] = useState("");

  const [nbaConfig, setNbaConfig] = useState({
    equipo1: "BOSTON CELTICS",
    equipo2: "DALLAS MAVERICKS",
    juegoActivo: 1,
    fechaLimite: "",
    habilitado: false,
    resultados: {},
  });
  const [guardandoNba, setGuardandoNba] = useState(false);
  const [mensajeNba, setMensajeNba] = useState("");

  const [participantes, setParticipantes] = useState([]);
  const [juegoFiltro, setJuegoFiltro] = useState(1);
  const [ganadorOficial, setGanadorOficial] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        cargarProductos();
        cargarConfigNba();
        cargarParticipantes();
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

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
    setParticipantes([]);
  };

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

  const handleSelectProduct = (prod) => {
    setProductoEditando({
      ...prod,
      tallesStr: prod.talles ? prod.talles.join(", ") : "",
      coloresStr: prod.colores ? prod.colores.join(", ") : "",
      stockDetallado: prod.stockDetallado || {},
      descuento: prod.descuento || 0, // <-- CARGAMOS EL DESCUENTO
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

  const handleStockChange = (talle, color, cantidad) => {
    const key = `${talle}-${color}`;
    setProductoEditando((prev) => ({
      ...prev,
      stockDetallado: {
        ...prev.stockDetallado,
        [key]: cantidad === "" ? "" : Number(cantidad),
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
        coloresArray.forEach((color) => {
          const key = `${talle}-${color}`;
          let valorActual = productoEditando.stockDetallado[key];
          stockLimpio[key] =
            valorActual === "" || valorActual === undefined
              ? 0
              : Number(valorActual);
        });
      });

      const productoActualizado = {
        nombre: productoEditando.nombre,
        precio: Number(productoEditando.precio),
        imagen: productoEditando.imagen,
        talles: tallesArray,
        colores: coloresArray,
        stockDetallado: stockLimpio,
        descuento: Number(productoEditando.descuento) || 0, // <-- GUARDAMOS EL DESCUENTO
      };

      await updateDoc(docRef, productoActualizado);
      setMensajeForm("¡Producto actualizado con éxito! ✅");
      cargarProductos();
      setTimeout(() => setMensajeForm(""), 3000);
    } catch (error) {
      console.error(error);
      setMensajeForm("Error al guardar los cambios ❌");
    }
  };

  const tallesActuales = productoEditando?.tallesStr
    ? productoEditando.tallesStr
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : [];
  const coloresActuales = productoEditando?.coloresStr
    ? productoEditando.coloresStr
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean)
    : [];

  const cargarConfigNba = async () => {
    try {
      const docRef = doc(db, "configuracion", "nba_predictor");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setNbaConfig({
          ...data,
          resultados: data.resultados || {},
        });
      }
    } catch (error) {
      console.error("Error al cargar config NBA:", error);
    }
  };

  const handleGuardarNba = async (e) => {
    e.preventDefault();
    setGuardandoNba(true);
    try {
      const docRef = doc(db, "configuracion", "nba_predictor");
      await setDoc(docRef, nbaConfig);
      setMensajeNba("¡Configuración NBA guardada! ✅");
      setTimeout(() => setMensajeNba(""), 3000);
    } catch (error) {
      console.error(error);
      setMensajeNba("Error al guardar ❌");
    }
    setGuardandoNba(false);
  };

  const cargarParticipantes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "predicciones_nba"));
      const docs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setParticipantes(docs);
    } catch (error) {
      console.error("Error cargando participantes:", error);
    }
  };

  const handleGuardarResultadoJuego = async () => {
    try {
      const nuevosResultados = {
        ...nbaConfig.resultados,
        [juegoFiltro]: ganadorOficial,
      };

      const configActualizada = { ...nbaConfig, resultados: nuevosResultados };
      setNbaConfig(configActualizada);

      const docRef = doc(db, "configuracion", "nba_predictor");
      await setDoc(docRef, configActualizada);
      alert(`Resultado del Juego ${juegoFiltro} guardado correctamente.`);
    } catch (error) {
      console.error(error);
      alert("Error al guardar el resultado.");
    }
  };

  const participantesFiltrados = participantes.filter(
    (p) => p.predicciones && p.predicciones[juegoFiltro],
  );

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
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-4 rounded-xl bg-white/5 border border-white/20 text-white focus:border-[#CAFC00]"
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-4 rounded-xl bg-white/5 border border-white/20 text-white focus:border-[#CAFC00]"
              required
            />
            {authError && (
              <p className="text-red-500 text-sm text-center font-octosquares">
                {authError}
              </p>
            )}
            <button
              type="submit"
              className="mt-4 bg-[#CAFC00] text-black font-black py-4 rounded-full"
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
        <div className="flex flex-col lg:flex-row justify-between items-center mb-6 md:mb-8 border-b border-white/10 pb-4 md:pb-6 gap-4 md:gap-6">
          <div className="flex justify-between items-center w-full lg:w-auto">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-strasua text-[#CAFC00]">
              Panel de Control
            </h1>
            <button
              onClick={handleLogout}
              className="lg:hidden border border-red-500/50 text-red-500 px-4 py-1.5 rounded-full font-octosquares text-xs hover:bg-red-500/10 transition-colors"
            >
              Salir
            </button>
          </div>

          <div className="w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="flex bg-white/5 rounded-full p-1 border border-white/10 whitespace-nowrap min-w-max mx-auto lg:mx-0">
              <button
                onClick={() => setActiveTab("productos")}
                className={`px-4 sm:px-6 py-2 rounded-full font-octosquares text-xs sm:text-sm font-bold transition-all ${
                  activeTab === "productos"
                    ? "bg-[#CAFC00] text-black shadow-md"
                    : "text-white/50 hover:text-white"
                }`}
              >
                Stock
              </button>
              <button
                onClick={() => setActiveTab("nba")}
                className={`px-4 sm:px-6 py-2 rounded-full font-octosquares text-xs sm:text-sm font-bold transition-all ${
                  activeTab === "nba"
                    ? "bg-[#CAFC00] text-black shadow-md"
                    : "text-white/50 hover:text-white"
                }`}
              >
                Configurar NBA
              </button>
              <button
                onClick={() => setActiveTab("resultados")}
                className={`px-4 sm:px-6 py-2 rounded-full font-octosquares text-xs sm:text-sm font-bold transition-all ${
                  activeTab === "resultados"
                    ? "bg-[#CAFC00] text-black shadow-md"
                    : "text-white/50 hover:text-white"
                }`}
              >
                Resultados
              </button>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="hidden lg:block border border-red-500/50 text-red-500 px-6 py-2 rounded-full font-octosquares text-sm hover:bg-red-500/10 transition-colors"
          >
            Salir
          </button>
        </div>

        {activeTab === "productos" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
            <div className="lg:col-span-1 bg-[#111111] border border-white/10 rounded-[2rem] p-6 h-[700px] overflow-y-auto custom-scrollbar">
              {productos.map((prod) => (
                <button
                  key={prod.id}
                  onClick={() => handleSelectProduct(prod)}
                  className={`w-full flex items-center gap-4 p-3 rounded-xl mb-3 ${productoEditando?.id === prod.id ? "bg-[#CAFC00]/20 border border-[#CAFC00]/50" : "bg-white/5 hover:bg-white/10"}`}
                >
                  <img
                    src={prod.imagen}
                    alt=""
                    className="w-12 h-12 rounded-lg object-cover bg-black"
                  />
                  <div className="text-left overflow-hidden w-full flex justify-between items-center pr-2">
                    <div>
                      <p className="text-white font-bold truncate font-octosquares">
                        {prod.nombre}
                      </p>
                      <p className="text-[#CAFC00] text-sm font-octosquares">
                        ${prod.precio.toLocaleString()}
                      </p>
                    </div>
                    {/* Indicador chiquito si el producto tiene descuento */}
                    {prod.descuento > 0 && (
                      <span className="bg-[#CAFC00] text-black text-[10px] font-bold px-2 py-0.5 rounded-md font-octosquares">
                        -{prod.descuento}%
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>

            <div className="lg:col-span-2">
              {!productoEditando ? (
                <div className="bg-[#111111] border border-white/10 rounded-[2rem] p-10 h-full flex flex-col items-center justify-center text-white/40">
                  <p className="text-xl font-octosquares">
                    Selecciona un producto para editarlo
                  </p>
                </div>
              ) : (
                <div className="bg-[#111111] border border-white/10 rounded-[2rem] p-8 shadow-2xl relative">
                  <form
                    onSubmit={handleGuardarCambios}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    <div className="col-span-1 md:col-span-2">
                      <label className="text-white/70 text-sm mb-2 font-octosquares block">
                        Nombre
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
                      <label className="text-white/70 text-sm mb-2 font-octosquares block">
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
                    {/* NUEVO INPUT PARA EL DESCUENTO */}
                    <div>
                      <label className="text-[#CAFC00] text-sm mb-2 font-octosquares font-bold block">
                        Descuento (%)
                      </label>
                      <input
                        type="number"
                        name="descuento"
                        min="0"
                        max="100"
                        placeholder="Ej: 20"
                        value={productoEditando.descuento || ""}
                        onChange={handleChange}
                        className="w-full p-4 rounded-xl bg-[#CAFC00]/10 border border-[#CAFC00]/30 text-white focus:outline-none focus:border-[#CAFC00] transition-colors"
                      />
                    </div>
                    <div className="col-span-1 md:col-span-2">
                      <label className="text-white/70 text-sm mb-2 font-octosquares block">
                        URL de Imagen
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
                    <div>
                      <label className="text-white/70 text-sm mb-2 font-octosquares block">
                        Talles (separados por coma)
                      </label>
                      <input
                        type="text"
                        name="tallesStr"
                        value={productoEditando.tallesStr}
                        onChange={handleChange}
                        className="w-full p-4 rounded-xl bg-white/5 border border-white/20 text-white focus:outline-none focus:border-[#CAFC00]"
                      />
                    </div>
                    <div>
                      <label className="text-white/70 text-sm mb-2 font-octosquares block">
                        Colores (separados por coma)
                      </label>
                      <input
                        type="text"
                        name="coloresStr"
                        value={productoEditando.coloresStr}
                        onChange={handleChange}
                        className="w-full p-4 rounded-xl bg-white/5 border border-white/20 text-white focus:outline-none focus:border-[#CAFC00]"
                      />
                    </div>

                    {tallesActuales.length > 0 &&
                      coloresActuales.length > 0 && (
                        <div className="col-span-1 md:col-span-2 bg-black/40 p-5 rounded-xl border border-white/10 mt-2">
                          <label className="block text-[#CAFC00] text-sm mb-4 font-bold font-octosquares">
                            Stock por variante:
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                            {tallesActuales.map((talle) =>
                              coloresActuales.map((color) => {
                                const key = `${talle}-${color}`;
                                return (
                                  <div
                                    key={key}
                                    className="flex flex-col bg-white/5 p-3 rounded-lg border border-white/10"
                                  >
                                    <label className="text-white/80 text-xs mb-2 text-center capitalize font-octosquares">
                                      {talle} | {color}
                                    </label>
                                    <input
                                      type="number"
                                      min="0"
                                      placeholder="0"
                                      required
                                      value={
                                        productoEditando.stockDetallado[key] ??
                                        ""
                                      }
                                      onChange={(e) =>
                                        handleStockChange(
                                          talle,
                                          color,
                                          e.target.value,
                                        )
                                      }
                                      className="w-full p-2 rounded bg-black/50 border border-white/20 text-white text-center focus:outline-none focus:border-[#CAFC00]"
                                    />
                                  </div>
                                );
                              }),
                            )}
                          </div>
                        </div>
                      )}

                    <div className="col-span-1 md:col-span-2 mt-4 flex items-center gap-6">
                      <button
                        type="submit"
                        className="flex-1 bg-[#CAFC00] text-black font-black font-octosquares py-4 rounded-xl text-lg hover:bg-[#b5e000] cursor-pointer"
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
        )}

        {/* CONTENIDO NBA ... */}
        {activeTab === "nba" && (
          <div className="bg-[#111111] border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-2xl max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-2xl font-strasua text-white mb-8 border-b border-white/10 pb-4">
              Configuración de{" "}
              <span className="text-[#CAFC00]">Finales NBA</span>
            </h2>
            <form
              onSubmit={handleGuardarNba}
              className="space-y-8 font-octosquares"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs text-white/50 block mb-2 uppercase">
                    Equipo Local (1)
                  </label>
                  <input
                    type="text"
                    value={nbaConfig.equipo1}
                    onChange={(e) =>
                      setNbaConfig({
                        ...nbaConfig,
                        equipo1: e.target.value.toUpperCase(),
                      })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#CAFC00] uppercase"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-white/50 block mb-2 uppercase">
                    Equipo Visitante (2)
                  </label>
                  <input
                    type="text"
                    value={nbaConfig.equipo2}
                    onChange={(e) =>
                      setNbaConfig({
                        ...nbaConfig,
                        equipo2: e.target.value.toUpperCase(),
                      })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#CAFC00] uppercase"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs text-white/50 block mb-2 uppercase">
                    Número de Juego
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="7"
                    value={nbaConfig.juegoActivo}
                    onChange={(e) =>
                      setNbaConfig({
                        ...nbaConfig,
                        juegoActivo: Number(e.target.value),
                      })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#CAFC00]"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-white/50 block mb-2 uppercase">
                    Fecha Límite (Hora del partido)
                  </label>
                  <input
                    type="datetime-local"
                    value={nbaConfig.fechaLimite}
                    onChange={(e) =>
                      setNbaConfig({
                        ...nbaConfig,
                        fechaLimite: e.target.value,
                      })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#CAFC00]"
                    required
                  />
                </div>
              </div>
              <div className="flex items-center gap-4 p-6 bg-white/5 rounded-xl border border-white/10">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={nbaConfig.habilitado}
                    onChange={(e) =>
                      setNbaConfig({
                        ...nbaConfig,
                        habilitado: e.target.checked,
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-14 h-7 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#CAFC00]"></div>
                </label>
                <div>
                  <span className="text-white font-bold block">
                    Habilitar Formulario Público
                  </span>
                  <span className="text-xs text-white/50 block">
                    Los clientes podrán entrar y hacer sus predicciones.
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-6 pt-4 border-t border-white/10">
                <button
                  type="submit"
                  disabled={guardandoNba}
                  className="bg-[#CAFC00] text-black font-black py-4 px-8 rounded-xl hover:bg-white transition-colors"
                >
                  {guardandoNba ? "GUARDANDO..." : "ACTUALIZAR EVENTO"}
                </button>
                {mensajeNba && (
                  <span className="text-[#CAFC00] font-bold animate-pulse">
                    {mensajeNba}
                  </span>
                )}
              </div>
            </form>
          </div>
        )}

        {/* CONTENIDO RESULTADOS ... */}
        {activeTab === "resultados" && (
          <div className="animate-fade-in space-y-6">
            <div className="bg-[#111111] border border-white/10 rounded-[2rem] p-8 flex flex-col md:flex-row gap-6 items-end justify-between font-octosquares">
              <div className="flex-1 w-full">
                <label className="text-xs text-white/50 block mb-2 uppercase">
                  Filtrar por Juego
                </label>
                <select
                  value={juegoFiltro}
                  onChange={(e) => {
                    const nuevoJuego = Number(e.target.value);
                    setJuegoFiltro(nuevoJuego);
                    setGanadorOficial(nbaConfig.resultados?.[nuevoJuego] || "");
                  }}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#CAFC00]"
                >
                  {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                    <option key={num} value={num} className="bg-black">
                      Juego {num}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex-1 w-full">
                <label className="text-xs text-white/50 block mb-2 uppercase">
                  Ganador Oficial (Juego {juegoFiltro})
                </label>
                <select
                  value={ganadorOficial}
                  onChange={(e) => setGanadorOficial(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#CAFC00]"
                >
                  <option value="" className="bg-black">
                    -- Seleccionar Ganador --
                  </option>
                  <option value={nbaConfig.equipo1} className="bg-black">
                    {nbaConfig.equipo1}
                  </option>
                  <option value={nbaConfig.equipo2} className="bg-black">
                    {nbaConfig.equipo2}
                  </option>
                </select>
              </div>

              <button
                onClick={handleGuardarResultadoJuego}
                className="bg-[#CAFC00] text-black font-black py-4 px-8 rounded-xl hover:bg-white transition-colors w-full md:w-auto"
              >
                Guardar Resultado
              </button>
            </div>

            <div className="bg-[#111111] border border-white/10 rounded-[2rem] p-8 overflow-hidden font-octosquares">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl text-white font-bold">
                  Participantes (Juego {juegoFiltro})
                </h3>
                <span className="text-[#CAFC00] bg-[#CAFC00]/10 px-4 py-1 rounded-full text-sm">
                  Total: {participantesFiltrados.length}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-white/50 text-sm uppercase">
                      <th className="py-4 px-4 font-normal">Nombre</th>
                      <th className="py-4 px-4 font-normal">WhatsApp</th>
                      <th className="py-4 px-4 font-normal">Predicción</th>
                      <th className="py-4 px-4 font-normal text-center">
                        Estado
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {participantesFiltrados.length === 0 ? (
                      <tr>
                        <td
                          colSpan="4"
                          className="py-8 text-center text-white/40"
                        >
                          Nadie participó en este juego aún.
                        </td>
                      </tr>
                    ) : (
                      participantesFiltrados.map((p) => {
                        const prediccionUsuario = p.predicciones[juegoFiltro];
                        const resultadoReal =
                          nbaConfig.resultados?.[juegoFiltro];

                        let estadoUi = (
                          <span className="text-yellow-500 bg-yellow-500/10 px-3 py-1 rounded-full text-xs">
                            Pendiente ⏳
                          </span>
                        );

                        if (resultadoReal) {
                          if (prediccionUsuario === resultadoReal) {
                            estadoUi = (
                              <span className="text-green-500 bg-green-500/10 px-3 py-1 rounded-full text-xs">
                                Acertó 🏆
                              </span>
                            );
                          } else {
                            estadoUi = (
                              <span className="text-red-500 bg-red-500/10 px-3 py-1 rounded-full text-xs">
                                Falló ❌
                              </span>
                            );
                          }
                        }

                        return (
                          <tr
                            key={p.id}
                            className="border-b border-white/5 hover:bg-white/5 transition-colors text-white text-sm"
                          >
                            <td className="py-4 px-4 font-bold">{p.nombre}</td>
                            <td className="py-4 px-4 text-white/70">
                              <a
                                href={`https://wa.me/${p.whatsapp}`}
                                target="_blank"
                                rel="noreferrer"
                                className="hover:text-[#CAFC00] underline decoration-transparent hover:decoration-[#CAFC00]"
                              >
                                {p.whatsapp}
                              </a>
                            </td>
                            <td className="py-4 px-4">{prediccionUsuario}</td>
                            <td className="py-4 px-4 text-center">
                              {estadoUi}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
