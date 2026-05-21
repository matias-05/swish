import React, { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { Trophy, Medal, Crown, Activity } from "lucide-react";
import { Link } from "react-router-dom";

export default function RankingNba() {
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRanking = async () => {
      setLoading(true);
      try {
        const configRef = doc(db, "configuracion", "nba_predictor");
        const configSnap = await getDoc(configRef);
        const resultadosOficiales = configSnap.exists()
          ? configSnap.data().resultados || {}
          : {};

        const participantesSnap = await getDocs(
          collection(db, "predicciones_nba"),
        );

        const listaRanking = participantesSnap.docs.map((doc) => {
          const data = doc.data();
          let puntaje = 0;
          let aciertosDetalle = [];

          Object.keys(resultadosOficiales).forEach((juego) => {
            if (
              data.predicciones &&
              data.predicciones[juego] === resultadosOficiales[juego]
            ) {
              puntaje += 1;
              aciertosDetalle.push(juego);
            }
          });

          return {
            id: doc.id,
            nombre: data.nombre,
            puntaje,
            aciertosDetalle,
          };
        });

        listaRanking.sort((a, b) => b.puntaje - a.puntaje);
        setRanking(listaRanking);
      } catch (error) {
        console.error("Error al cargar el ranking:", error);
      }
      setLoading(false);
    };

    fetchRanking();
  }, []);

  if (loading) {
    return (
      <section className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-[#CAFC00] font-strasua text-xl md:text-2xl animate-pulse flex items-center gap-3">
          <Activity size={30} /> CALCULANDO POSICIONES...
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen w-full bg-black flex flex-col items-center pt-[18vh] pb-12 md:pt-32 px-4 sm:px-6 md:px-8 overflow-hidden relative">
      <div className="absolute top-[10%] md:top-[15%] left-1/2 -translate-x-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[500px] bg-[#CAFC00]/5 blur-[80px] md:blur-[120px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-4xl z-10 animate-fade-in-up">
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 rounded-full bg-[#CAFC00]/10 border border-[#CAFC00]/30 text-[#CAFC00] mb-3 sm:mb-4">
            <Trophy size={14} className="sm:w-4 sm:h-4" />
            <span className="font-octosquares text-[10px] sm:text-xs tracking-widest uppercase font-bold">
              Leaderboard
            </span>
          </div>
          <h1 className="font-strasua text-3xl sm:text-4xl md:text-6xl text-white italic tracking-tighter uppercase drop-shadow-md">
            RANKING DE <br className="block sm:hidden" />
            <span className="text-[#CAFC00]">PREDICCIONES</span>
          </h1>
          <p className="text-white/50 font-octosquares mt-3 sm:mt-4 text-xs sm:text-sm md:text-base max-w-sm sm:max-w-none mx-auto">
            Gana 1 punto por cada partido de las Finales acertado.
          </p>
        </div>

        <div className="bg-[#111] rounded-[1.5rem] md:rounded-[2rem] border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.6)] md:shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden">
          <div className="grid grid-cols-12 gap-2 sm:gap-4 px-3 sm:px-6 py-3 sm:py-4 border-b border-white/10 bg-white/5 font-octosquares text-[10px] sm:text-xs uppercase tracking-widest text-white/50">
            <div className="col-span-2 md:col-span-1 text-center">Pos</div>
            <div className="col-span-7 md:col-span-8">Participante</div>
            <div className="col-span-3 md:col-span-3 text-center">Puntos</div>
          </div>

          <div className="flex flex-col">
            {ranking.length === 0 ? (
              <div className="p-8 md:p-10 text-center text-white/40 font-octosquares text-sm">
                Aún no hay puntos registrados. ¡Esperando que termine el Juego
                1!
              </div>
            ) : (
              ranking.map((user, index) => {
                const isTop1 = index === 0 && user.puntaje > 0;
                const isTop2 = index === 1 && user.puntaje > 0;
                const isTop3 = index === 2 && user.puntaje > 0;

                return (
                  <div
                    key={user.id}
                    className={`grid grid-cols-12 gap-2 sm:gap-4 px-3 sm:px-6 py-4 sm:py-5 items-center border-b border-white/5 transition-colors hover:bg-white/5 ${isTop1 ? "bg-[#CAFC00]/5" : ""}`}
                  >
                    <div className="col-span-2 md:col-span-1 flex justify-center">
                      {isTop1 ? (
                        <Crown className="text-[#CAFC00] drop-shadow-[0_0_10px_rgba(202,252,0,0.8)] w-6 h-6 sm:w-7 sm:h-7" />
                      ) : isTop2 ? (
                        <Medal className="text-gray-300 w-5 h-5 sm:w-6 sm:h-6" />
                      ) : isTop3 ? (
                        <Medal className="text-amber-600 w-5 h-5 sm:w-6 sm:h-6" />
                      ) : (
                        <span className="font-strasua text-lg sm:text-xl text-white/40">
                          {index + 1}°
                        </span>
                      )}
                    </div>

                    <div className="col-span-7 md:col-span-8 flex flex-col justify-center overflow-hidden">
                      <span
                        className={`font-octosquares font-bold truncate ${isTop1 ? "text-[#CAFC00] text-base sm:text-lg" : "text-white text-sm sm:text-base"}`}
                      >
                        {user.nombre}
                      </span>
                      {user.puntaje > 0 && (
                        <span className="text-[9px] sm:text-[10px] text-white/40 font-octosquares mt-0.5 sm:mt-1 truncate">
                          Acertó: Juego {user.aciertosDetalle.join(", ")}
                        </span>
                      )}
                    </div>

                    <div className="col-span-3 md:col-span-3 flex justify-center">
                      <div
                        className={`px-2 sm:px-4 py-1 rounded-md sm:rounded-lg font-strasua text-base sm:text-xl flex items-baseline gap-1 ${isTop1 ? "bg-[#CAFC00] text-black" : "bg-white/10 text-[#CAFC00]"}`}
                      >
                        <span>{user.puntaje}</span>
                        <span className="text-[9px] sm:text-xs font-octosquares">
                          pts
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
