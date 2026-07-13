import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Trophy, CheckCircle2, Flame, Lock, ListOrdered } from "lucide-react";

export default function PredictPage() {
  const [config, setConfig] = useState(null);
  const [status, setStatus] = useState("loading_config");
  const [formError, setFormError] = useState("");

  const [formData, setForm] = useState({
    nombre: "",
    email: "",
    whatsapp: "",
    ganador: "",
    puntos: "",
  });

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    min: 0,
    sec: 0,
  });

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const docRef = doc(db, "configuracion", "nba_predictor");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setConfig(data);

          if (!data.habilitado) {
            setStatus("closed");
          } else if (
            localStorage.getItem(`swish_voted_juego_${data.juegoActivo}`)
          ) {
            setStatus("already_done");
          } else {
            setStatus("idle");

            const savedUser = localStorage.getItem("swish_user_data");
            if (savedUser) {
              const parsedUser = JSON.parse(savedUser);
              setForm((prev) => ({ ...prev, ...parsedUser }));
            }
          }
        }
      } catch (error) {
        console.error("Error cargando configuración:", error);
      }
    };
    fetchConfig();
  }, []);

  useEffect(() => {
    if (!config || !config.fechaLimite || status === "closed") return;

    const targetDate = new Date(config.fechaLimite).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, min: 0, sec: 0 });
        setStatus("closed");
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          min: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          sec: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [config, status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    const phoneRegex = /^[0-9]{8,15}$/;
    const cleanWhatsapp = formData.whatsapp.replace(/\D/g, "");

    if (!phoneRegex.test(cleanWhatsapp)) {
      setFormError(
        "Por favor, ingresá un número de WhatsApp válido (solo números, código de área incluido).",
      );
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailId = formData.email.toLowerCase().trim();

    if (!emailRegex.test(emailId)) {
      setFormError("El formato del correo electrónico no es válido.");
      return;
    }

    setStatus("loading");

    try {
      const userDocRef = doc(db, "predicciones_nba", emailId);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        if (
          userData.predicciones &&
          userData.predicciones[config.juegoActivo]
        ) {
          setStatus("already_done");
          localStorage.setItem(
            `swish_voted_juego_${config.juegoActivo}`,
            "true",
          );
          return;
        }
      }

      await setDoc(
        userDocRef,
        {
          nombre: formData.nombre,
          email: emailId,
          whatsapp: cleanWhatsapp,
          predicciones: {
            [config.juegoActivo]: formData.ganador,
          },
          desempates: {
            [config.juegoActivo]: formData.puntos,
          },
          fechas_registro: {
            [config.juegoActivo]: new Date().toISOString(),
          },
        },
        { merge: true },
      );

      localStorage.setItem(`swish_voted_juego_${config.juegoActivo}`, "true");
      localStorage.setItem(
        "swish_user_data",
        JSON.stringify({
          nombre: formData.nombre,
          email: emailId,
          whatsapp: cleanWhatsapp,
        }),
      );

      setStatus("success");
    } catch (error) {
      console.error(error);
      setFormError(
        "Hubo un error al guardar tu predicción. Intentá nuevamente.",
      );
      setStatus("error");
    }
  };

  if (status === "loading_config") {
    return (
      <section className="min-h-screen bg-black flex items-center justify-center text-[#CAFC00] font-strasua">
        CARGANDO...
      </section>
    );
  }

  if (status === "closed") {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 bg-black pt-[10vh]">
        <div className="flex flex-col items-center justify-center p-8 sm:p-10 md:p-12 bg-[#111] rounded-[2rem] border border-white/10 text-center animate-fade-in max-w-xl w-full">
          <Lock
            size={50}
            className="text-white/50 mb-4 sm:mb-6 md:w-16 md:h-16"
          />
          <h2 className="font-strasua text-2xl sm:text-3xl text-white mb-3 sm:mb-4">
            PREDICCIONES CERRADAS
          </h2>
          <p className="font-octosquares text-sm sm:text-base text-white/70 mb-6 sm:mb-8">
            El tiempo límite ha terminado o las predicciones están pausadas.
            ¡Disfruta el partido!
          </p>
          <Link
            to="/ranking"
            className="flex items-center justify-center gap-2 w-full sm:w-auto bg-transparent border-2 border-[#CAFC00] text-[#CAFC00] px-4 sm:px-6 py-3 rounded-xl font-strasua hover:bg-[#CAFC00] hover:text-black transition-all text-sm sm:text-base"
          >
            <ListOrdered size={18} /> VER TABLA DE POSICIONES
          </Link>
        </div>
      </section>
    );
  }

  if (status === "success" || status === "already_done") {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 bg-black pt-[10vh]">
        <div className="flex flex-col items-center justify-center p-8 sm:p-10 md:p-12 bg-[#111] rounded-[2rem] border border-[#CAFC00]/20 text-center animate-fade-in max-w-xl w-full">
          <CheckCircle2
            size={60}
            className="text-[#CAFC00] mb-4 sm:mb-6 md:w-20 md:h-20"
          />
          <h2 className="font-strasua text-2xl sm:text-3xl text-white mb-3 sm:mb-4 uppercase">
            ¡Juego {config.juegoActivo} Registrado!
          </h2>
          <p className="font-octosquares text-sm sm:text-base text-white/70 mb-6 sm:mb-8">
            {status === "success"
              ? "Tu predicción está en la base de datos. Si ganás, nos comunicaremos con vos por WhatsApp."
              : "Ya registramos tu jugada para este partido. ¡Volvé para el próximo juego!"}
          </p>
          <Link
            to="/ranking"
            className="flex items-center justify-center gap-2 w-full sm:w-auto bg-transparent border-2 border-[#CAFC00] text-[#CAFC00] px-4 sm:px-6 py-3 rounded-xl font-strasua hover:bg-[#CAFC00] hover:text-black transition-all shadow-[0_0_15px_rgba(202,252,0,0.2)] text-sm sm:text-base"
          >
            <ListOrdered size={18} /> VER TABLA DE POSICIONES
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section
      id="nba-prode"
      className="min-h-screen w-full bg-black flex flex-col items-center justify-start md:justify-center pt-[18vh] pb-12 md:pt-[10vh] md:pb-24 px-4 sm:px-6 overflow-y-auto"
    >
      <div className="text-center mb-8 sm:mb-10 animate-fade-in-up w-full">
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 rounded-full bg-[#CAFC00]/10 border border-[#CAFC00]/30 text-[#CAFC00] mb-4 sm:mb-6">
          <Flame size={14} className="sm:w-4 sm:h-4" />
          <span className="font-octosquares text-[10px] sm:text-xs tracking-tighter uppercase font-bold">
            NBA FINALS - JUEGO {config.juegoActivo}
          </span>
        </div>
        <h2 className="font-strasua text-3xl sm:text-4xl md:text-6xl text-white mb-6 sm:mb-8 italic tracking-tighter">
          HAZ TU <span className="text-[#CAFC00]">JUGADA</span>
        </h2>

        <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4 max-w-xs sm:max-w-sm md:max-w-md mx-auto font-octosquares">
          {[
            { label: "DÍAS", val: timeLeft.days },
            { label: "HRS", val: timeLeft.hours },
            { label: "MIN", val: timeLeft.min },
            { label: "SEG", val: timeLeft.sec },
          ].map((t) => (
            <div
              key={t.label}
              className="bg-[#111] p-2 sm:p-3 rounded-lg sm:rounded-xl border border-white/5 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
            >
              <div className="text-xl sm:text-2xl md:text-3xl font-black text-[#CAFC00]">
                {t.val < 10 ? `0${t.val}` : t.val}
              </div>
              <div className="text-[9px] sm:text-[10px] text-white/40 mt-1">
                {t.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-[#0a0a0a] p-5 sm:p-8 md:p-12 rounded-[2rem] sm:rounded-[2.5rem] border border-white/5 shadow-2xl space-y-5 sm:space-y-6 animate-fade-in-up flex-shrink-0"
        style={{ animationDelay: "200ms" }}
      >
        {formError && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 text-xs sm:text-sm font-octosquares p-3 rounded-xl text-center animate-shake">
            {formError}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-1 sm:space-y-2">
            <label className="text-[10px] font-octosquares text-white/50 uppercase ml-2">
              Nombre Completo
            </label>
            <input
              required
              type="text"
              value={formData.nombre}
              className="w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-white text-sm sm:text-base focus:outline-none focus:border-[#CAFC00] transition-all font-octosquares"
              onChange={(e) => setForm({ ...formData, nombre: e.target.value })}
            />
          </div>
          <div className="space-y-1 sm:space-y-2">
            <label className="text-[10px] font-octosquares text-white/50 uppercase ml-2">
              WhatsApp (Solo números)
            </label>
            <input
              required
              type="tel"
              inputMode="numeric"
              placeholder="Ej: 3431234567"
              value={formData.whatsapp}
              onChange={(e) => {
                const soloNumeros = e.target.value.replace(/[^0-9\s\-\+]/g, "");
                setForm({ ...formData, whatsapp: soloNumeros });
              }}
              className="w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-white text-sm sm:text-base focus:outline-none focus:border-[#CAFC00] transition-all font-octosquares"
            />
          </div>
        </div>

        <div className="space-y-1 sm:space-y-2">
          <label className="text-[10px] font-octosquares text-white/50 uppercase ml-2">
            Email
          </label>
          <input
            required
            type="email"
            placeholder="tu@correo.com"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            value={formData.email}
            readOnly={!!localStorage.getItem("swish_user_data")}
            className={`w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-white text-sm sm:text-base focus:outline-none focus:border-[#CAFC00] transition-all font-octosquares ${localStorage.getItem("swish_user_data") ? "opacity-50 cursor-not-allowed" : ""}`}
            onChange={(e) => setForm({ ...formData, email: e.target.value })}
          />
        </div>

        <div className="pt-5 sm:pt-6 border-t border-white/5 space-y-3 sm:space-y-4">
          <p className="font-strasua text-lg sm:text-xl text-[#CAFC00] text-center italic uppercase mb-1 sm:mb-2">
            ¿Quién gana el Juego {config.juegoActivo}?
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {[config.equipo1, config.equipo2].map((equipo) => (
              <button
                key={equipo}
                type="button"
                onClick={() => setForm({ ...formData, ganador: equipo })}
                className={`p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 font-strasua tracking-tighter text-sm sm:text-base transition-all ${
                  formData.ganador === equipo
                    ? "border-[#CAFC00] bg-[#CAFC00] text-black scale-[1.02] sm:scale-105 shadow-[0_0_15px_rgba(202,252,0,0.3)]"
                    : "border-white/10 bg-white/5 text-white hover:border-white/30"
                }`}
              >
                {equipo}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-5 sm:pt-6 border-t border-white/5 space-y-3 sm:space-y-4">
          <p className="font-strasua text-lg sm:text-xl text-[#CAFC00] text-center italic uppercase mb-1 sm:mb-2">
            DESEMPATE: PUNTOS TOTALES
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {["+ 210", "- 210"].map((opcion) => (
              <button
                key={opcion}
                type="button"
                onClick={() => setForm({ ...formData, puntos: opcion })}
                className={`p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 font-strasua tracking-tighter text-sm sm:text-base transition-all ${
                  formData.puntos === opcion
                    ? "border-[#CAFC00] bg-[#CAFC00] text-black scale-[1.02] sm:scale-105 shadow-[0_0_15px_rgba(202,252,0,0.3)]"
                    : "border-white/10 bg-white/5 text-white hover:border-white/30"
                }`}
              >
                {opcion}
              </button>
            ))}
          </div>
        </div>

        <button
          disabled={
            status === "loading" || !formData.ganador || !formData.puntos
          }
          type="submit"
          className="w-full bg-[#CAFC00] text-black font-strasua text-lg sm:text-xl mt-2 sm:mt-4 py-4 sm:py-5 rounded-xl sm:rounded-2xl flex items-center justify-center gap-2 sm:gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:grayscale disabled:hover:scale-100"
        >
          {status === "loading" ? (
            "ENVIANDO..."
          ) : (
            <>
              CONFIRMAR <span className="hidden sm:inline">JUGADA</span>{" "}
              <Trophy size={18} className="sm:w-5 sm:h-5" />
            </>
          )}
        </button>
      </form>

      <div
        className="mt-6 sm:mt-8 mb-8 animate-fade-in-up flex-shrink-0"
        style={{ animationDelay: "400ms" }}
      >
        <Link
          to="/ranking"
          className="flex items-center gap-2 text-white/50 hover:text-[#CAFC00] font-octosquares text-xs sm:text-sm transition-colors"
        >
          <ListOrdered size={14} className="sm:w-4 sm:h-4" /> Ver la Tabla de
          Posiciones
        </Link>
      </div>
    </section>
  );
}
