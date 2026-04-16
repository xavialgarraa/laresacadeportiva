import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, TrendingUp, TrendingDown, Minus, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

// --- DATOS MOCKUP (Esto vendría de tu BD) ---
const LIGAS = {
  futbol1: {
    nombre: "1a Catalana (G.1)",
    datos: [
      { pos: 1, equipo: "FC L'Escala", pts: 45, pj: 20, pg: 14, pe: 3, pp: 3, zona: "ascenso" },
      { pos: 2, equipo: "CF Lloret", pts: 42, pj: 20, pg: 13, pe: 3, pp: 4, zona: "playoff" }, // Equipo Local
      { pos: 3, equipo: "UE Figueres", pts: 40, pj: 20, pg: 12, pe: 4, pp: 4, zona: "neutra" },
      { pos: 4, equipo: "Palamós CF", pts: 38, pj: 20, pg: 11, pe: 5, pp: 4, zona: "neutra" },
      { pos: 5, equipo: "Juventus Lloret", pts: 35, pj: 20, pg: 10, pe: 5, pp: 5, zona: "neutra" }, // Equipo Local
      { pos: 6, equipo: "Banyoles", pts: 30, pj: 20, pg: 8, pe: 6, pp: 6, zona: "neutra" },
      // ... más equipos
      { pos: 16, equipo: "Bescanó", pts: 12, pj: 20, pg: 2, pe: 6, pp: 12, zona: "descenso" },
    ]
  },
  hoquei: {
    nombre: "OK Liga Plata (Norte)",
    datos: [
      { pos: 1, equipo: "Vilafranca", pts: 30, pj: 12, zona: "ascenso" },
      { pos: 2, equipo: "CH Lloret", pts: 28, pj: 12, zona: "playoff" },
      { pos: 3, equipo: "CP Vic", pts: 25, pj: 12, zona: "neutra" },
    ]
  },
  basket: {
    nombre: "SuperCopa Masculina",
    datos: [
      { pos: 1, equipo: "Rosér", pts: 32, pj: 15, zona: "ascenso" },
      { pos: 2, equipo: "Jac Sants", pts: 30, pj: 15, zona: "playoff" },
      { pos: 5, equipo: "CB Lloret", pts: 26, pj: 15, zona: "neutra" },
    ]
  }
};

export default function Clasificaciones() {
  const [ligaActiva, setLigaActiva] = useState("futbol1");

  const renderZonaIcon = (zona) => {
    if (zona === "ascenso") return <TrendingUp size={14} className="text-lime-400" />;
    if (zona === "descenso") return <TrendingDown size={14} className="text-red-500" />;
    return <Minus size={14} className="text-neutral-600" />;
  };

  return (
    <div className="bg-[#0f0f0f] min-h-screen text-white pt-24 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Header con Navegación */}
        <div className="flex items-center gap-4 mb-8">
            <Link to="/" className="p-2 bg-neutral-900 rounded-full hover:bg-lime-400 hover:text-black transition">
                <ArrowLeft size={20} />
            </Link>
            <div>
                <h1 className="text-4xl font-black uppercase tracking-tighter">Clasificaciones</h1>
                <p className="text-neutral-400">Temporada 2025/26</p>
            </div>
        </div>

        {/* Selector de Ligas */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          {Object.entries(LIGAS).map(([key, info]) => (
            <button
              key={key}
              onClick={() => setLigaActiva(key)}
              className={`px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all border ${
                ligaActiva === key 
                  ? "bg-lime-400 text-black border-lime-400 shadow-[0_0_15px_rgba(163,230,53,0.3)]" 
                  : "bg-neutral-900 text-neutral-400 border-white/5 hover:border-white/20"
              }`}
            >
              {info.nombre}
            </button>
          ))}
        </div>

        {/* Tabla Glassmorphism */}
        <motion.div
            key={ligaActiva}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-neutral-900/40 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden relative"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-neutral-950/50 text-neutral-400 border-b border-white/5">
                <tr>
                  <th className="px-6 py-4 font-bold text-center w-12">Pos</th>
                  <th className="px-6 py-4 font-bold">Equipo</th>
                  <th className="px-6 py-4 font-bold text-center">PJ</th>
                  <th className="px-6 py-4 font-bold text-center text-white text-base">Pts</th>
                  <th className="px-6 py-4 font-bold text-center hidden md:table-cell">Forma</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {LIGAS[ligaActiva].datos.map((fila) => {
                    const esLloret = fila.equipo.toLowerCase().includes("lloret");
                    return (
                        <tr 
                            key={fila.equipo} 
                            className={`group transition-colors ${esLloret ? "bg-lime-400/5 hover:bg-lime-400/10" : "hover:bg-white/5"}`}
                        >
                            <td className="px-6 py-4 text-center">
                                <div className={`flex flex-col items-center justify-center font-mono font-bold ${
                                    fila.pos <= 2 ? "text-lime-400" : 
                                    fila.zona === "descenso" ? "text-red-500" : "text-neutral-500"
                                }`}>
                                    {fila.pos}
                                    <span className="opacity-50 mt-1">{renderZonaIcon(fila.zona)}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className={`text-base ${esLloret ? "font-black text-white tracking-wide" : "font-medium text-neutral-300"}`}>
                                    {fila.equipo}
                                </span>
                                {esLloret && <span className="ml-2 text-[10px] bg-lime-400 text-black px-1.5 py-0.5 rounded font-bold">LOCAL</span>}
                            </td>
                            <td className="px-6 py-4 text-center text-neutral-400">{fila.pj}</td>
                            <td className="px-6 py-4 text-center">
                                <span className={`font-black text-lg ${esLloret ? "text-lime-400" : "text-white"}`}>
                                    {fila.pts}
                                </span>
                            </td>
                            <td className="px-6 py-4 hidden md:table-cell text-center">
                                <div className="flex items-center justify-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <div key={i} className={`w-2 h-2 rounded-full ${Math.random() > 0.5 ? "bg-green-500" : "bg-neutral-700"}`} />
                                    ))}
                                </div>
                            </td>
                        </tr>
                    );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Leyenda */}
        <div className="mt-6 flex flex-wrap gap-4 text-xs text-neutral-500 justify-center">
            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-lime-400"></span> Ascenso Directo</div>
            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500"></span> Descenso</div>
        </div>

      </div>
    </div>
  );
}