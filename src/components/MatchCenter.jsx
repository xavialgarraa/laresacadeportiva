import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Calendar, MapPin, ChevronRight, Activity, Flame, Medal } from "lucide-react";

// --- DATOS REALES DE LLORET (MOCKUP SEMANAL) ---
// Aquí es donde editarás cada semana. 
// He puesto rivales típicos de la zona para que parezca real.

const DATOS_JORNADA = [
  // --- FÚTBOL ---
  { 
    id: 1, 
    deporte: "Fútbol", 
    liga: "1a Catalana", 
    local: "CF Lloret", 
    visitante: "Juventus Lloret", 
    resultado: "2 - 1", 
    estado: "W", // W=Ganado, L=Perdido, D=Empate, P=Pendiente
    fecha: "Domingo 17:00",
    estadio: "Camp Municipal El Molí",
    escudoLocal: null, // Aquí podrías poner URLs de logos reales
  },
  { 
    id: 2, 
    deporte: "Fútbol", 
    liga: "1a Catalana", 
    local: "CE Banyoles", 
    visitante: "Juventus Lloret", 
    resultado: "1 - 1", 
    estado: "D",
    fecha: "Sábado 16:30",
    estadio: "Nou Estadi Banyoles"
  },
  { 
    id: 3, 
    deporte: "Fútbol", 
    liga: "4a Catalana", 
    local: "Atlètic Lloret", 
    visitante: "UE Tossa B", 
    resultado: "3 - 0", 
    estado: "W",
    fecha: "Sábado 18:00",
    estadio: "El Molí (Annex)"
  },

  // --- HOQUEI ---
  { 
    id: 4, 
    deporte: "Hoquei", 
    liga: "OK Liga Plata", 
    local: "CH Lloret", 
    visitante: "CP Vic", 
    resultado: "4 - 5", 
    estado: "L",
    fecha: "Sábado 20:00",
    estadio: "Pavelló Municipal"
  },

  // --- BASQUET ---
  { 
    id: 5, 
    deporte: "Basket", 
    liga: "SuperCopa", 
    local: "CB Lloret", 
    visitante: "CB Roser", 
    resultado: "82 - 78", 
    estado: "W",
    fecha: "Domingo 18:30",
    estadio: "Pavelló El Molí"
  },
  { 
    id: 6, 
    deporte: "Basket", 
    liga: "1a Categoria Fem", 
    local: "UE Mataró", 
    visitante: "CB Lloret Fem", 
    resultado: "50 - 62", 
    estado: "W",
    fecha: "Domingo 12:00",
    estadio: "Mataró"
  }
];

// Configuración de Filtros
const FILTROS = [
    { id: "Todos", label: "Todo" },
    { id: "Fútbol", label: "Fútbol" },
    { id: "Hoquei", label: "Hoquei" },
    { id: "Basket", label: "Basket" }
];

// --- COMPONENTES AUXILIARES ---

const StatusBadge = ({ estado }) => {
    if (estado === 'P') return <span className="text-neutral-500 font-mono text-xs bg-neutral-800 px-2 py-1 rounded">PEND</span>;
    
    const styles = {
        W: "text-lime-400 bg-lime-400/10 border-lime-400/20",
        L: "text-red-400 bg-red-400/10 border-red-400/20",
        D: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20"
    };
    
    return (
        <div className={`flex items-center justify-center w-8 h-8 rounded-full border ${styles[estado] || styles.D}`}>
            <span className="font-bold text-sm">{estado === 'D' ? '=' : estado}</span>
        </div>
    );
};

export function MatchCenter() {
  const [filtroActivo, setFiltroActivo] = useState("Todos");

  const partidos = filtroActivo === "Todos" 
    ? DATOS_JORNADA 
    : DATOS_JORNADA.filter(p => p.deporte === filtroActivo);

  // Lógica para detectar si es un derbi (dos equipos de Lloret)
  const esDerbi = (local, visitante) => 
    local.toLowerCase().includes("lloret") && visitante.toLowerCase().includes("lloret");

  return (
    <section className="px-4 py-16 max-w-7xl mx-auto" id="resultados">
      
      {/* Header Sección */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6 border-b border-white/10 pb-6">
        <div>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white flex items-center gap-3">
                Marcador <span className="text-lime-400">Jornada</span>
            </h2>
            <p className="text-neutral-400 mt-2 font-light">
                Resultados del fin de semana en Lloret de Mar
            </p>
        </div>

        {/* Filtros Estilo iOS */}
        <div className="bg-neutral-900 p-1 rounded-xl flex gap-1 overflow-x-auto max-w-full">
            {FILTROS.map(f => (
                <button
                    key={f.id}
                    onClick={() => setFiltroActivo(f.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
                        filtroActivo === f.id 
                        ? "bg-lime-400 text-black shadow-lg" 
                        : "text-neutral-400 hover:text-white hover:bg-white/5"
                    }`}
                >
                    {f.label}
                </button>
            ))}
        </div>
      </div>

      {/* Grid de Resultados */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
            {partidos.map((p) => {
                const isDerbiMatch = esDerbi(p.local, p.visitante);
                const localEsLloret = p.local.toLowerCase().includes("lloret");
                const visitEsLloret = p.visitante.toLowerCase().includes("lloret");

                return (
                    <motion.div
                        key={p.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="group relative bg-neutral-900/40 backdrop-blur-sm border border-white/5 hover:border-lime-500/30 rounded-2xl overflow-hidden transition-all hover:bg-neutral-900/80"
                    >
                        {/* Indicador lateral de victoria/derrota (solo si Lloret juega) */}
                        <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                            (localEsLloret && p.estado === 'W') || (visitEsLloret && p.estado === 'W') ? "bg-green-500 shadow-[0_0_15px_rgba(163,230,53,0.5)]" :
                            (localEsLloret && p.estado === 'L') || (visitEsLloret && p.estado === 'L') ? "bg-red-500" :
                            "bg-yellow-500"
                        }`} />

                        <div className="p-5 flex flex-col gap-4">
                            
                            {/* Cabecera Tarjeta: Liga y Estado */}
                            <div className="flex justify-between items-start">
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold text-lime-400 uppercase tracking-wider mb-1 flex items-center gap-2">
                                        {isDerbiMatch && <Flame size={12} className="text-orange-500 animate-pulse" />}
                                        {isDerbiMatch ? "GRAN DERBI" : p.liga}
                                    </span>
                                    <span className="text-xs text-neutral-500 flex items-center gap-1">
                                        <MapPin size={10} /> {p.estadio}
                                    </span>
                                </div>
                                <div className="text-xs text-neutral-400 bg-black/30 px-2 py-1 rounded border border-white/5">
                                    {p.fecha}
                                </div>
                            </div>

                            {/* Equipos y Resultado */}
                            <div className="flex items-center justify-between mt-1">
                                {/* Local */}
                                <div className={`flex-1 text-right ${localEsLloret ? "text-white font-bold text-lg" : "text-neutral-400 font-medium"}`}>
                                    {p.local}
                                </div>

                                {/* Score Box */}
                                <div className="mx-4 bg-black px-4 py-2 rounded-lg border border-white/10 shadow-inner flex flex-col items-center min-w-[80px]">
                                    <span className="text-2xl font-black text-white tracking-widest">{p.resultado}</span>
                                </div>

                                {/* Visitante */}
                                <div className={`flex-1 text-left ${visitEsLloret ? "text-white font-bold text-lg" : "text-neutral-400 font-medium"}`}>
                                    {p.visitante}
                                </div>
                            </div>

                            {/* Footer Tarjeta: Estado Visual */}
                            <div className="flex justify-center mt-2 opacity-50 group-hover:opacity-100 transition-opacity">
                                {isDerbiMatch ? (
                                    <span className="text-xs text-orange-400 font-bold uppercase tracking-widest">Partido de la jornada</span>
                                ) : (
                                    <div className="h-1 w-20 rounded-full bg-gradient-to-r from-transparent via-lime-500/20 to-transparent" />
                                )}
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </AnimatePresence>
      </div>

      {partidos.length === 0 && (
          <div className="py-12 text-center border-2 border-dashed border-neutral-800 rounded-xl bg-neutral-900/20">
              <p className="text-neutral-500">No hay partidos registrados en esta categoría.</p>
          </div>
      )}
      
      {/* Botón Call to Action */}
      <div className="mt-8 text-center">
          <button className="text-sm text-lime-400 hover:text-white transition flex items-center gap-1 mx-auto group">
              Ver clasificaciones completas 
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform"/>
          </button>
      </div>

    </section>
  );
}