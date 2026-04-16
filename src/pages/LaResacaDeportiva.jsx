import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebaseConfig";

// --- ICONOS ---
import { 
  Linkedin, Instagram, Youtube, 
  ArrowUpCircle, ArrowLeftCircle, ArrowLeft, 
  PlayCircle, Calendar, Search, Trophy, Gamepad2 
} from "lucide-react";

// --- COMPONENTES IMPORTADOS ---
import { MatchCenter } from "../components/MatchCenter"; // Asegúrate de haber creado este archivo con el código anterior
import JuegoPartidos from "../components/JuegoPartidos";
import PiedraPapelTijera from "../components/PiedraPapelTijera.jsx";

// --- ASSETS Y DATOS ---
import preguntas from "../js/preguntas.js";
import LogoDark from "../assets/logo-blanco.png";
import triviaCover from "../assets/juegos/trivia-cover.png";
import partidosCover from "../assets/juegos/partidos-cover.png";
import fantasyCover from "../assets/juegos/fantasy-cover.png";
import pptCover from "../assets/juegos/ppt.png";

// --- DATOS MOCKUP (Respaldo) ---
const episodes = [
  { id: "NZ_uZo8E4OI", title: "La Resaca Deportiva | Resumen 27-28 Sept", date: "30/09/2025", duration: "45 min" },
  { id: "dXcZHsK9qeA", title: "La Resaca Deportiva | Resumen 20-21 Sept", date: "25/09/2025", duration: "38 min" },
  { id: "Vzay0bvSing", title: "MERCATO II (EDICIÓN CBU LLORET)", date: "28/07/2025", duration: "52 min" },
];

// --- COMPONENTES DE UI (Sistema de Diseño) ---

const GlassCard = ({ children, className = "", hoverEffect = false, onClick }) => (
  <motion.div
    whileHover={hoverEffect ? { y: -5, boxShadow: "0 10px 30px -10px rgba(163, 230, 53, 0.2)" } : {}}
    onClick={onClick}
    className={`bg-neutral-900/60 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden p-6 ${className} ${onClick ? 'cursor-pointer' : ''}`}
  >
    {children}
  </motion.div>
);

const SectionTitle = ({ title, subtitle }) => (
  <div className="mb-10 text-center relative z-10">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-lime-300 via-lime-400 to-emerald-400"
    >
      {title}
    </motion.h2>
    {subtitle && <p className="text-neutral-400 mt-2 text-lg font-light tracking-wide">{subtitle}</p>}
  </div>
);

const Badge = ({ children, icon: Icon }) => (
  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-lime-400/10 text-lime-400 border border-lime-400/20">
    {Icon && <Icon size={12} />}
    {children}
  </span>
);

// --- SECCIÓN: NOTICIAS ---
// --- SECCIÓN: PRIMERA CATALANA ---

function PrimeraCatalanaSection() {
  return (
    <section className="px-4 py-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <GlassCard className="relative overflow-hidden border-lime-500/20 p-0">
          {/* Glow de fondo */}
          <div className="absolute inset-0 bg-gradient-to-br from-lime-500/10 via-transparent to-emerald-500/5 pointer-events-none" />
          <div className="absolute top-[-40px] right-[-40px] w-64 h-64 bg-lime-500/15 blur-[80px] rounded-full pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 p-8 md:p-10">
            {/* Info */}
            <div className="flex flex-col gap-4 text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Badge icon={Trophy}>Primera Catalana · Grup 1</Badge>
                <Badge>Temporada 25/26</Badge>
              </div>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white leading-tight">
                Supercalculador <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-300 to-emerald-400">
                  Interactivo
                </span>
              </h2>
              <p className="text-neutral-400 max-w-md text-sm md:text-base leading-relaxed">
                Simula los resultados de las últimas 5 jornadas y descubre las probabilidades de ascenso y descenso de cada equipo con 10.000 simulaciones Monte Carlo.
              </p>
            </div>

            {/* Stats decorativos + CTA */}
            <div className="flex flex-col items-center gap-6 shrink-0">
              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  { label: "Equipos", value: "16" },
                  { label: "Jornadas", value: "5" },
                  { label: "Sims", value: "10K" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex flex-col">
                    <span className="text-2xl font-black text-white">{value}</span>
                    <span className="text-xs text-neutral-500 uppercase tracking-wider">{label}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/primera-catalana"
                className="inline-flex items-center gap-2 bg-lime-400 hover:bg-lime-300 text-black font-bold py-3 px-8 rounded-full shadow-[0_0_20px_rgba(163,230,53,0.35)] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(163,230,53,0.5)] whitespace-nowrap"
              >
                <Trophy size={18} />
                Abrir Supercalculador
              </Link>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </section>
  );
}

export function Noticias() {
  const [noticias, setNoticias] = useState([]);
  const [filtroTexto, setFiltroTexto] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const noticiasCol = collection(db, "noticias");
        let q = query(noticiasCol, orderBy("fecha", "desc"));
        const snapshot = await getDocs(q);
        setNoticias(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        console.error("Error cargando noticias:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNoticias();
  }, []);

  const noticiasFiltradas = noticias.filter((n) =>
    (n.Titulo?.toLowerCase() || "").includes(filtroTexto.toLowerCase()) ||
    (n.Resumen?.toLowerCase() || "").includes(filtroTexto.toLowerCase())
  );

  return (
    <section className="relative px-4 py-20 max-w-7xl mx-auto">
      <SectionTitle title="Última Hora" subtitle="Toda la actualidad deportiva de Lloret" />

      {/* Buscador */}
      <div className="flex justify-center mb-12">
        <div className="relative w-full max-w-md group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-neutral-500 group-focus-within:text-lime-400 transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Buscar noticias..."
            className="w-full pl-12 pr-4 py-4 bg-neutral-900/50 border border-white/10 rounded-full focus:ring-2 focus:ring-lime-500/50 focus:border-lime-500 text-white placeholder-neutral-500 transition-all outline-none backdrop-blur-sm"
            value={filtroTexto}
            onChange={(e) => setFiltroTexto(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
           {[1,2,3].map(i => <div key={i} className="h-64 bg-neutral-900 rounded-3xl opacity-50" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {noticiasFiltradas.map((n) => (
              <motion.div
                key={n.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <Link to={`noticia/${n.id}`} className="block h-full">
                  <GlassCard hoverEffect className="h-full flex flex-col relative group border-neutral-800">
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowUpCircle className="text-lime-400 rotate-45" />
                    </div>
                    {n.fecha && (
                      <div className="mb-4">
                        <Badge icon={Calendar}>
                          {n.fecha?.toDate 
                            ? n.fecha.toDate().toLocaleDateString("es-ES", { day: "2-digit", month: "long" })
                            : "Reciente"}
                        </Badge>
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-lime-300 transition-colors">
                      {n.Titulo}
                    </h3>
                    <p className="text-neutral-400 text-sm line-clamp-3 leading-relaxed">
                      {n.Resumen}
                    </p>
                  </GlassCard>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
      
      {!loading && noticiasFiltradas.length === 0 && (
        <p className="text-center text-neutral-500 py-10">No se encontraron noticias con ese criterio.</p>
      )}
    </section>
  );
}

// --- SECCIÓN: EPISODIOS ---

function Episodios({ episodes }) {
  if (!episodes || episodes.length === 0) return null;
  const featured = episodes[0];
  const others = episodes.slice(1);

  return (
    <section className="px-4 py-20 max-w-7xl mx-auto">
      <SectionTitle title="La Resaca TV" subtitle="No te pierdas ningún programa" />
      
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Featured Episode (Big) */}
        <div className="lg:col-span-2">
            <GlassCard className="p-0 border-0 overflow-hidden relative group">
                <div className="aspect-video w-full">
                    <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${featured.id}`}
                        title={featured.title}
                        allowFullScreen
                        frameBorder="0"
                    />
                </div>
                <div className="p-6 bg-neutral-900">
                    <div className="flex items-center gap-3 mb-2">
                        <Badge icon={PlayCircle}>Nuevo Episodio</Badge>
                        <span className="text-neutral-500 text-xs">{featured.date}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white">{featured.title}</h3>
                </div>
            </GlassCard>
        </div>

        {/* List of Previous Episodes */}
        <div className="flex flex-col gap-4 h-full overflow-y-auto max-h-[500px] pr-2 custom-scrollbar">
            <h3 className="text-lg font-semibold text-lime-400 uppercase tracking-widest mb-2 sticky top-0 bg-[#0f0f0f] z-10 py-2">Anteriores</h3>
            {others.map((ep) => (
                <motion.div key={ep.id} whileHover={{ x: 5 }} className="group cursor-pointer">
                    <div className="flex gap-4 p-3 rounded-2xl bg-neutral-900/40 border border-white/5 hover:border-lime-500/30 transition-all">
                        <img 
                            src={`https://img.youtube.com/vi/${ep.id}/mqdefault.jpg`} 
                            alt={ep.title} 
                            className="w-24 h-16 object-cover rounded-lg opacity-80 group-hover:opacity-100 transition"
                        />
                        <div className="flex flex-col justify-center">
                            <h4 className="text-sm font-semibold text-white leading-tight group-hover:text-lime-300 transition-colors line-clamp-2">{ep.title}</h4>
                            <span className="text-xs text-neutral-500 mt-1">{ep.date}</span>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}

// --- SECCIÓN: TRIVIA ---

function Trivia({ preguntas }) {
  const obtenerPreguntasAleatorias = (p, n=10) => [...p].sort(() => 0.5 - Math.random()).slice(0, n);
  
  // Estados
  const [preguntasJuego, setPreguntasJuego] = useState(() => obtenerPreguntasAleatorias(preguntas));
  const [indice, setIndice] = useState(0);
  const [puntos, setPuntos] = useState(0);
  const [timer, setTimer] = useState(15);
  const [estadoRespuesta, setEstadoRespuesta] = useState(null); 
  const [seleccion, setSeleccion] = useState(null);
  const [finalizado, setFinalizado] = useState(false);

  useEffect(() => {
    if (finalizado || estadoRespuesta) return;
    const interval = setInterval(() => {
        setTimer((prev) => {
            if (prev <= 1) {
                handleResponder(null); 
                return 0;
            }
            return prev - 1;
        });
    }, 1000);
    return () => clearInterval(interval);
  }, [finalizado, estadoRespuesta, indice]);

  const handleResponder = (opcion) => {
    if (estadoRespuesta) return;
    setSeleccion(opcion);
    const actual = preguntasJuego[indice];
    const esCorrecta = actual && opcion === actual.correcta;
    
    setEstadoRespuesta(esCorrecta ? 'correct' : 'wrong');
    if (esCorrecta) setPuntos(p => p + 1);

    setTimeout(() => {
        if (indice + 1 >= preguntasJuego.length) {
            setFinalizado(true);
        } else {
            setIndice(i => i + 1);
            setTimer(15);
            setEstadoRespuesta(null);
            setSeleccion(null);
        }
    }, 1500);
  };

  const reiniciar = () => {
      setPreguntasJuego(obtenerPreguntasAleatorias(preguntas));
      setIndice(0);
      setPuntos(0);
      setTimer(15);
      setFinalizado(false);
      setEstadoRespuesta(null);
      setSeleccion(null);
  };

  if (finalizado) {
      return (
          <div className="text-center py-10">
              <Trophy className="w-20 h-20 text-lime-400 mx-auto mb-6 animate-bounce" />
              <h3 className="text-3xl font-bold text-white mb-2">¡Juego Terminado!</h3>
              <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500 mb-8">
                  {puntos} <span className="text-2xl text-neutral-500">/ {preguntasJuego.length}</span>
              </div>
              <button onClick={reiniciar} className="bg-lime-400 hover:bg-lime-300 text-black font-bold py-3 px-8 rounded-full shadow-[0_0_20px_rgba(163,230,53,0.4)] transition-all hover:scale-105">
                  Jugar de Nuevo
              </button>
          </div>
      );
  }

  const actual = preguntasJuego[indice];
  if (!actual) return <div>Cargando...</div>;

  const progreso = ((indice) / preguntasJuego.length) * 100;
  const timerPercent = (timer / 15) * 100;

  return (
    <div className="max-w-2xl mx-auto">
        <div className="w-full bg-neutral-800 h-1.5 rounded-full mb-6 overflow-hidden">
            <motion.div 
                className="bg-lime-400 h-full" 
                initial={{ width: 0 }} 
                animate={{ width: `${progreso}%` }} 
            />
        </div>

        <GlassCard className="border-t-4 border-t-lime-400">
            <div className="flex justify-between items-center mb-6">
                <span className="text-sm font-bold text-lime-400 uppercase tracking-wider">{actual.equipo}</span>
                <div className="flex items-center gap-2 text-neutral-400">
                    <span className="font-mono text-xl text-white">{timer}s</span>
                    <div className="w-8 h-8 rounded-full border-2 border-neutral-700 relative flex items-center justify-center">
                        <svg className="absolute w-full h-full -rotate-90">
                           <circle cx="16" cy="16" r="14" fill="none" stroke="#333" strokeWidth="2" />
                           <motion.circle 
                              cx="16" cy="16" r="14" fill="none" stroke={timer < 5 ? "#ef4444" : "#a3e635"} strokeWidth="2"
                              strokeDasharray="88"
                              strokeDashoffset={88 - (88 * timerPercent) / 100}
                              className="transition-all duration-1000 ease-linear"
                           />
                        </svg>
                    </div>
                </div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-8 min-h-[4rem]">{actual.pregunta}</h3>

            <div className="grid gap-3">
                {actual.opciones.map((op) => {
                    let estilo = "bg-neutral-800 border-neutral-700 hover:bg-neutral-700 hover:border-neutral-500";
                    if (estadoRespuesta) {
                        if (op === actual.correcta) estilo = "bg-green-500/20 border-green-500 text-green-400";
                        else if (op === seleccion && op !== actual.correcta) estilo = "bg-red-500/20 border-red-500 text-red-400 opacity-50";
                        else estilo = "bg-neutral-900 border-transparent opacity-30";
                    }

                    return (
                        <button
                            key={op}
                            onClick={() => handleResponder(op)}
                            disabled={!!estadoRespuesta}
                            className={`w-full text-left p-4 rounded-xl border transition-all duration-200 font-medium ${estilo}`}
                        >
                            {op}
                        </button>
                    );
                })}
            </div>
        </GlassCard>
    </div>
  );
}

// --- SECCIÓN: JUEGOS DASHBOARD ---

export default function Juegos() {
  const [juegoActivo, setJuegoActivo] = useState(null);

  const GameCard = ({ id, title, img, proximamente }) => (
    <motion.div 
        whileHover={!proximamente ? { scale: 1.02 } : {}}
        onClick={() => !proximamente && setJuegoActivo(id)}
        className={`relative overflow-hidden rounded-3xl cursor-pointer group h-64 ${proximamente ? 'opacity-50 grayscale cursor-not-allowed' : ''}`}
    >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
        <img src={img} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        
        <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
            <div className="flex justify-between items-end">
                <div>
                    {proximamente && <span className="text-xs font-bold bg-neutral-800 text-white px-2 py-1 rounded mb-2 inline-block">COMING SOON</span>}
                    <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">{title}</h3>
                </div>
                {!proximamente && (
                    <div className="bg-lime-400 p-2 rounded-full text-black transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <Gamepad2 size={24} />
                    </div>
                )}
            </div>
        </div>
    </motion.div>
  );

  return (
    <section className="relative px-4 py-20 bg-[#0a0a0a]" id="juegos">
        <div className="max-w-7xl mx-auto">
            <SectionTitle title="Arcade Zone" subtitle="Compite y demuestra cuanto sabes" />

            <AnimatePresence mode="wait">
                {!juegoActivo ? (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        <div className="lg:col-span-2">
                             <GameCard id="trivia" title="Trivial Lloretenc" img={triviaCover} />
                        </div>
                        <GameCard id="partidos" title="Predicción Partidos" img={partidosCover} />
                        <GameCard id="ppt" title="Piedra Papel Tijera" img={pptCover} />
                        <GameCard id="fantasy" title="Lloret Fantasy" img={fantasyCover} proximamente />
                    </motion.div>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
                        className="w-full"
                    >
                        <button 
                            onClick={() => setJuegoActivo(null)}
                            className="mb-8 flex items-center gap-2 text-neutral-400 hover:text-white transition-colors group"
                        >
                            <div className="bg-neutral-800 p-2 rounded-full group-hover:bg-lime-400 group-hover:text-black transition-all">
                                <ArrowLeft size={20} />
                            </div>
                            <span className="font-medium">Volver al Arcade</span>
                        </button>

                        <div className="py-4">
                            {juegoActivo === "trivia" && <Trivia preguntas={preguntas} />}
                            {juegoActivo === "partidos" && <JuegoPartidos />}
                            {juegoActivo === "ppt" && <PiedraPapelTijera />}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    </section>
  );
}

// --- COMPONENTES GLOBALES Y LAYOUT ---

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black pt-16 pb-8 text-center relative overflow-hidden">
        {/* Glow Decorativo */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-lime-500/10 blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center gap-6">
            <img src={LogoDark} alt="Logo" className="w-12 h-12 opacity-80" />
            <div className="flex gap-6">
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="p-3 rounded-full bg-neutral-900 text-neutral-400 hover:text-lime-400 hover:bg-neutral-800 transition-all"><Youtube size={20} /></a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-3 rounded-full bg-neutral-900 text-neutral-400 hover:text-pink-500 hover:bg-neutral-800 transition-all"><Instagram size={20} /></a>
            </div>
            <p className="text-neutral-500 text-sm">
                &copy; 2026 La Resaca Deportiva · <span className="text-lime-400/60">Lloret de Mar</span>
            </p>
        </div>
    </footer>
  );
}

export function LaResacaDeportiva() {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#0f0f0f] min-h-screen font-sans selection:bg-lime-400 selection:text-black overflow-x-hidden text-neutral-200">
      
      {/* Navbar Minimalista Flotante */}
      <nav className="fixed top-0 w-full z-50 px-4 py-4 pointer-events-none">
        <div className="max-w-2xl mx-auto bg-black/60 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 flex justify-between items-center shadow-2xl pointer-events-auto">
            <Link to="/portfolio-react/axprod" className="text-white hover:text-lime-400 transition"><ArrowLeftCircle /></Link>
            
            <div className="flex gap-4 text-sm font-medium">
                <button onClick={() => window.scrollTo({top:0, behavior:'smooth'})} className="hover:text-lime-300 transition">Inicio</button>
                <button onClick={() => scrollToSection('resultados')} className="hover:text-lime-300 transition">Resultados</button>
                <button onClick={() => scrollToSection('juegos')} className="hover:text-lime-300 transition">Juegos</button>
            </div>
            
            <img src={LogoDark} className="w-8 h-8 rounded-full" alt="Logo" />
        </div>
      </nav>

      {/* Hero Section Moderno */}
      <header className="relative min-h-[60vh] flex flex-col items-center justify-center pt-20 px-4 overflow-hidden">
        <div className="absolute top-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="absolute top-[-10%] left-[20%] w-96 h-96 bg-lime-500/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[20%] w-72 h-72 bg-emerald-500/10 blur-[100px] rounded-full" />
        
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center z-10"
        >
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-lime-400/30 bg-lime-400/5 text-lime-300 text-xs font-bold tracking-widest uppercase">
                Temporada 2025/26
            </div>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white mb-6">
                La Resaca <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-300 to-emerald-400">Deportiva</span>
            </h1>
            <p className="max-w-xl mx-auto text-neutral-400 text-lg md:text-xl font-light leading-relaxed">
                El pulso del deporte en Lloret de Mar. Análisis, debate y entretenimiento.
            </p>
        </motion.div>
      </header>

      <PrimeraCatalanaSection />

      <div className="relative z-10 space-y-12 pb-20">
        <Episodios episodes={episodes} />
        <Noticias />
        <Juegos />
      </div>

      <Footer />
    </div>
  );
}