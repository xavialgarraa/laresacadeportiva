import { useState } from "react";
import { ArrowLeft, Clock, MapPin, User, Activity, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// --- MOCK DATA PARA UN PARTIDO ESPECÍFICO ---
const PARTIDO = {
    local: "CF Lloret",
    visitante: "UE Figueres",
    resultado: "2 - 1",
    estadio: "Camp Municipal El Molí",
    fecha: "29 Sept 2025 - 17:00h",
    cronica: "El Lloret remonta un partido épico en los últimos minutos gracias a la magia de Peke y la solidez defensiva en la segunda parte.",
    mvp: { nombre: "Albert 'Peke'", nota: 9.5, foto: null }, // Foto null usa placeholder
    goles: [
        { minuto: 23, jugador: "R. Revert (FIG)", tipo: "gol", equipo: "visitante" },
        { minuto: 78, jugador: "Peke (LLO)", tipo: "gol", equipo: "local" },
        { minuto: 89, jugador: "Expósito (LLO)", tipo: "gol", equipo: "local" },
    ],
    jugadores: [
        { nombre: "Teti", pos: "POR", nota: 8 },
        { nombre: "Jordi Valls", pos: "DEF", nota: 7 },
        { nombre: "King", pos: "MED", nota: 8.5 },
        { nombre: "Peke", pos: "DEL", nota: 9.5, highlight: true },
        { nombre: "Bily", pos: "DEL", nota: 6 },
    ]
};

export default function DetallePartido() {
  const [tab, setTab] = useState("cronica"); // cronica | notas | alineaciones

  return (
    <div className="bg-[#0f0f0f] min-h-screen text-white pt-6 pb-20 overflow-x-hidden">
        
        {/* HEADER HERO PARTIDO */}
        <div className="relative h-[400px] w-full flex flex-col items-center justify-center overflow-hidden">
            {/* Fondo con blur y gradiente */}
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-800 to-[#0f0f0f] z-0" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 z-0"></div>
            
            {/* Botón Volver */}
            <Link to="/" className="absolute top-6 left-6 z-20 flex items-center gap-2 text-neutral-400 hover:text-white transition">
                <ArrowLeft size={20} /> Volver
            </Link>

            <div className="z-10 text-center w-full max-w-4xl px-4 mt-10">
                <span className="inline-block py-1 px-3 border border-lime-400/30 rounded-full text-lime-400 text-xs font-bold uppercase tracking-widest mb-4 bg-lime-400/5">
                    1a Catalana · Jornada 4
                </span>
                
                <div className="flex items-center justify-center gap-4 md:gap-12">
                    <div className="text-center flex-1">
                        <div className="w-16 h-16 md:w-24 md:h-24 bg-white/10 rounded-full mx-auto mb-3 flex items-center justify-center">
                            <span className="font-bold text-2xl">LLO</span>
                        </div>
                        <h2 className="text-xl md:text-3xl font-black uppercase hidden md:block">CF Lloret</h2>
                    </div>

                    <div className="flex flex-col items-center">
                        <span className="text-5xl md:text-7xl font-black text-white tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                            {PARTIDO.resultado}
                        </span>
                        <span className="text-neutral-500 text-sm mt-2 bg-black/40 px-3 py-1 rounded-full border border-white/5">Finalizado</span>
                    </div>

                    <div className="text-center flex-1">
                        <div className="w-16 h-16 md:w-24 md:h-24 bg-white/10 rounded-full mx-auto mb-3 flex items-center justify-center grayscale opacity-70">
                            <span className="font-bold text-2xl">FIG</span>
                        </div>
                        <h2 className="text-xl md:text-3xl font-black uppercase text-neutral-400 hidden md:block">Figueres</h2>
                    </div>
                </div>
            </div>
        </div>

        {/* CONTENIDO PRINCIPAL */}
        <div className="max-w-3xl mx-auto px-4 -mt-10 relative z-20">
            
            {/* Tabs de Navegación */}
            <div className="flex p-1 bg-neutral-900/80 backdrop-blur-md rounded-xl border border-white/10 mb-8 sticky top-4 z-50 shadow-2xl">
                {["cronica", "notas", "stats"].map((t) => (
                    <button
                        key={t}
                        onClick={() => setTab(t)}
                        className={`flex-1 py-3 text-sm font-bold uppercase tracking-wider rounded-lg transition-all ${
                            tab === t 
                            ? "bg-lime-400 text-black shadow-lg" 
                            : "text-neutral-400 hover:text-white"
                        }`}
                    >
                        {t}
                    </button>
                ))}
            </div>

            <motion.div
                key={tab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
            >
                {/* VISTA: CRÓNICA */}
                {tab === "cronica" && (
                    <>
                        <div className="bg-neutral-900/50 border border-white/10 rounded-3xl p-6 md:p-8">
                            <h3 className="text-2xl font-bold text-white mb-4">Remontada de carácter en El Molí</h3>
                            <p className="text-neutral-300 leading-relaxed text-lg">
                                {PARTIDO.cronica}
                            </p>
                        </div>

                        {/* Línea de tiempo de Goles */}
                        <div className="space-y-3">
                            <h4 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-2 ml-2">Goleadores</h4>
                            {PARTIDO.goles.map((gol, i) => (
                                <div key={i} className={`flex items-center gap-4 p-4 rounded-xl border ${
                                    gol.equipo === "local" 
                                    ? "bg-lime-400/5 border-lime-400/20 flex-row" 
                                    : "bg-neutral-900 border-neutral-800 flex-row-reverse text-right"
                                }`}>
                                    <div className="font-mono font-bold text-lime-400 text-xl">{gol.minuto}'</div>
                                    <div className="flex-1">
                                        <p className="font-bold text-white">{gol.jugador}</p>
                                        <p className="text-xs text-neutral-500 uppercase">Gol</p>
                                    </div>
                                    <Activity size={16} className="text-neutral-600" />
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {/* VISTA: NOTAS (1x1) */}
                {tab === "notas" && (
                    <div className="grid gap-4">
                        {/* MVP Card */}
                        <div className="bg-gradient-to-r from-lime-900/40 to-emerald-900/40 border border-lime-400/30 p-6 rounded-3xl relative overflow-hidden">
                            <div className="absolute right-0 top-0 p-4 opacity-20">
                                <Star size={80} className="text-lime-400 fill-lime-400" />
                            </div>
                            <div className="relative z-10 flex items-center gap-6">
                                <div className="w-20 h-20 rounded-full bg-lime-400 border-4 border-black shadow-lg flex items-center justify-center overflow-hidden">
                                    <User size={40} className="text-black" />
                                </div>
                                <div>
                                    <p className="text-lime-400 font-bold text-xs uppercase tracking-widest mb-1">MVP del Partido</p>
                                    <h3 className="text-3xl font-black text-white">{PARTIDO.mvp.nombre}</h3>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="text-4xl font-black text-white">{PARTIDO.mvp.nota}</span>
                                        <div className="flex text-lime-400">
                                            {[1,2,3,4,5].map(s=><Star key={s} size={12} fill="currentColor" />)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Resto de Jugadores */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {PARTIDO.jugadores.map((jug, i) => (
                                <div key={i} className="bg-neutral-900 border border-white/5 p-4 rounded-xl flex items-center justify-between hover:border-lime-400/30 transition">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-xs font-bold text-neutral-500">
                                            {jug.pos}
                                        </div>
                                        <span className="font-bold text-neutral-200">{jug.nombre}</span>
                                    </div>
                                    <div className={`px-3 py-1 rounded-lg font-mono font-bold ${
                                        jug.nota >= 8 ? "bg-lime-400/20 text-lime-400" : 
                                        jug.nota >= 6 ? "bg-white/10 text-white" : "bg-red-500/20 text-red-500"
                                    }`}>
                                        {jug.nota}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                {/* VISTA: STATS (Placeholder) */}
                {tab === "stats" && (
                   <div className="text-center py-10 text-neutral-500">
                       <Activity className="mx-auto mb-4 opacity-50" size={48} />
                       <p>Estadísticas detalladas próximamente...</p>
                   </div>
                )}
            </motion.div>
        </div>
    </div>
  );
}