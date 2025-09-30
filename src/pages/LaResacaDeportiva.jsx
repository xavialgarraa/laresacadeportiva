import { useEffect, useRef, useState } from "react";
import { Linkedin, Instagram, Github, MessageCircle, Youtube, ArrowUpCircle, ArrowLeftCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import preguntas from "../js/preguntas.js";
import LogoDark from "../assets/logo-blanco.png";
import JuegoPartidos from "../components/JuegoPartidos";
import { Link } from "react-router-dom";
import PiedraPapelTijera from "../components/PiedraPapelTijera.jsx";


const episodes = [
  { id: "Vzay0bvSing", title: "Mercato II", date: "15/07/2025" },
  { id: "VZ7Zf7qQEAg", title: "Mercato – 1A Edición", date: "16/06/2025" },
  { id: "sabhcQm_n4g", title: "Episodio 12 – Semana 10-11 May", date: "14/05/2025" },
];

import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig"; 
import { query, orderBy } from "firebase/firestore";

export function Noticias() {
  const [noticias, setNoticias] = useState([]);
  const [filtroTexto, setFiltroTexto] = useState("");
  const [filtroFecha, setFiltroFecha] = useState("");

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const noticiasCol = collection(db, "noticias");
        let q = query(noticiasCol, orderBy("fecha", "desc")); // ordenar por fecha descendente

        const snapshot = await getDocs(q);
        const noticiasList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNoticias(noticiasList);
      } catch (err) {
        console.error("Error cargando noticias:", err);
      }
    };

    fetchNoticias();
  }, []);

  // Filtrado en el cliente
  const noticiasFiltradas = noticias.filter((n) => {
    const matchesTexto =
      n.Titulo?.toLowerCase().includes(filtroTexto.toLowerCase()) ||
      n.Resumen?.toLowerCase().includes(filtroTexto.toLowerCase());
    const matchesFecha = filtroFecha
      ? n.fecha?.toDate?.().toISOString().slice(0, 10) === filtroFecha
      : true;

    return matchesTexto && matchesFecha;
  });

  return (
    <section className="bg-[#111111] px-4 py-12">
      <h2 className="text-3xl font-bold mb-6 text-center tracking-wide uppercase text-lime-300">
        Noticias Deportivas
      </h2>

      {/* Buscador */}
      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Buscar por título o resumen..."
          className="flex-1 p-3 rounded-lg bg-[#1c1c1e] border border-lime-400 text-white"
          value={filtroTexto}
          onChange={(e) => setFiltroTexto(e.target.value)}
        />
        <input
          type="date"
          className="p-3 rounded-lg bg-[#1c1c1e] border border-lime-400 text-white"
          value={filtroFecha}
          onChange={(e) => setFiltroFecha(e.target.value)}
        />
      </div>

      <ul className="space-y-6 max-w-5xl mx-auto">
        {noticiasFiltradas.map((n) => (
          <li key={n.id}>
            <Link
              to={`noticia/${n.id}`}
              className="block bg-[#1c1c1e] border border-lime-400 p-6 rounded-xl hover:bg-lime-800/20 transition shadow-md"
            >
              <h3 className="text-xl font-semibold text-white">{n.Titulo}</h3>
              {n.fecha && (
                <p className="text-sm text-lime-400">
                  {n.fecha.toDate().toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </p>
              )}
              <p className="text-gray-200 mt-2">{n.Resumen}</p>
            </Link>
          </li>
        ))}
        {noticiasFiltradas.length === 0 && (
          <p className="text-center text-gray-400 mt-6">No se encontraron noticias.</p>
        )}
      </ul>
    </section>
  );
}


function Episodios({ episodes }) {
  return (
    <section className="px-4 py-12 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 border-b-2 border-lime-400 pb-2 tracking-wide uppercase text-white">
        Último Episodio
      </h2>
      <div className="relative w-full pb-[56.25%] mb-10">
      <iframe
        className="absolute top-0 left-0 w-full h-full rounded-xl border-2 border-lime-400 shadow-2xl"
        src={`https://www.youtube.com/embed/${episodes[0].id}`}
        title={episodes[0].title}
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>


      <h2 className="text-2xl font-semibold mb-4 border-b-2 border-lime-300 pb-1 uppercase text-white">
        Episodios Anteriores
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {episodes.slice(1).map((ep) => (
          <div key={ep.id} className="bg-[#1c1c1e] border border-lime-400 p-4 rounded-xl shadow-md hover:scale-105 transition">
            <h3 className="text-lg font-semibold text-white">{ep.title}</h3>
            <p className="text-lime-300 text-sm mb-2">{ep.date}</p>
            <iframe
              className="w-full h-48 rounded"
              src={`https://www.youtube.com/embed/${ep.id}`}
              title={ep.title}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </section>
  );
}



const obtenerPreguntasAleatorias = (preguntas, cantidad = 10) => {
  return preguntas.sort(() => 0.5 - Math.random()).slice(0, cantidad);
};

function Trivia({ preguntas }) {
  const [preguntasAleatorias, setPreguntasAleatorias] = useState(obtenerPreguntasAleatorias(preguntas));
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respuesta, setRespuesta] = useState(null);
  const [puntuacion, setPuntuacion] = useState(0);
  const [temporizador, setTemporizador] = useState(15);
  const [respondido, setRespondido] = useState(false);
  const respondidoRef = useRef(false);
  const pregunta = preguntasAleatorias[preguntaActual];
  const finalizado = preguntaActual >= preguntasAleatorias.length;

  useEffect(() => {
    if (finalizado || respondidoRef.current) return;
    const countdown = setInterval(() => {
      setTemporizador((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          handleRespuesta(null);
          return 15;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(countdown);
  }, [finalizado, preguntaActual]);

  const handleRespuesta = (opcion) => {
    if (respondidoRef.current || respuesta !== null) return;
    respondidoRef.current = true;
    setRespondido(true);
    setRespuesta(opcion);
    setTemporizador(15);
    if (opcion === pregunta.correcta) setPuntuacion((prev) => prev + 1);
    setTimeout(() => {
      setRespuesta(null);
      setPreguntaActual((prev) => prev + 1);
      setRespondido(false);
      respondidoRef.current = false;
    }, 1200);
  };

  const reiniciarTrivia = () => {
    setPreguntasAleatorias(obtenerPreguntasAleatorias(preguntas));
    setPreguntaActual(0);
    setRespuesta(null);
    setPuntuacion(0);
    setTemporizador(15);
    setRespondido(false);
    respondidoRef.current = false;
  };

  return (
    <section className="px-4 py-12 max-w-3xl mx-auto text-white">
      <h2 className="text-3xl font-bold mb-6 text-lime-300 uppercase text-center">
        Trivial Lloretenc
      </h2>
      {finalizado ? (
        <div className="bg-[#1c1c1e] border border-lime-400 p-8 rounded-2xl text-center shadow-xl">
          <p className="text-xl text-lime-300 mb-2">🎉 ¡Has completado el trivial!</p>
          <p className="text-lg">
            Puntuación final: <span className="text-lime-400 font-semibold">{puntuacion} / {preguntasAleatorias.length}</span>
          </p>
          <button
            onClick={reiniciarTrivia}
            className="mt-4 bg-lime-400 hover:bg-lime-300 text-black font-bold py-2 px-6 rounded-lg"
          >
            Reiniciar Trivial
          </button>
        </div>
      ) : (
        <>
          <div className="flex justify-between text-sm text-lime-200 mb-3">
            <p>Puntuación: {puntuacion}</p>
            <p>Pregunta {preguntaActual + 1} / {preguntasAleatorias.length}</p>
            <p className={`font-mono ${temporizador <= 5 ? "text-red-400" : "text-lime-300"}`}>⏱️ {temporizador}s</p>
          </div>

          <div className="bg-[#1c1c1e] border-2 border-lime-400 p-6 rounded-2xl shadow-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={preguntaActual}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-sm text-lime-300 mb-2">Equipo: {pregunta.equipo}</p>
                <p className="text-xl font-medium mb-4 text-white">{pregunta.pregunta}</p>
                <ul className="space-y-3">
                  {pregunta.opciones.map((op, i) => (
                    <li
                      key={i}
                      onClick={() => !respuesta && handleRespuesta(op)}
                      className={`cursor-pointer p-3 rounded-lg text-sm border border-lime-400 transition ${
                        respuesta
                          ? op === pregunta.correcta
                            ? "bg-green-500 text-black font-bold"
                            : op === respuesta
                            ? "bg-red-600 text-white"
                            : "bg-gray-700 text-white"
                          : "bg-gray-800 hover:bg-gray-600"
                      }`}
                    >
                      {op}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </>
      )}
    </section>
  );
}

function Footer() {
  return (
    <footer className="text-center text-sm text-lime-400 py-8 border-t border-lime-700 relative">
      <p>&copy; 2025 La Resaca Deportiva · Jorge & Xavi Algarra · Lloret de Mar</p>
      <div className="mt-3 flex justify-center gap-4">
        <a href="https://www.youtube.com/@laresacadeportiva" target="_blank"><Youtube className="w-5 h-5" /></a>
        <a href="https://www.instagram.com/laresacadeportiva_" target="_blank"><Instagram className="w-5 h-5" /></a>
      </div>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="absolute right-4 bottom-4 bg-lime-400 hover:bg-lime-300 text-black p-2 rounded-full shadow-lg"
        title="Volver arriba"
      >
        <ArrowUpCircle className="w-5 h-5" />
      </button>
    </footer>
  );
}

import triviaCover from "../assets/juegos/trivia-cover.png";
import partidosCover from "../assets/juegos/partidos-cover.png";
import fantasyCover from "../assets/juegos/fantasy-cover.png";
import pptCover from "../assets/juegos/ppt.png";
import { ArrowLeft } from "lucide-react";


export default function Juegos() {
  const [juegoActivo, setJuegoActivo] = useState(null);

  const iniciarJuego = (nombre) => {
    setJuegoActivo(nombre);
  };

  const volver = () => {
    setJuegoActivo(null);
  };

  return (
    <section className="px-4 py-12 max-w-5xl mx-auto text-white">
      <h2 className="text-3xl font-bold mb-10 text-center uppercase tracking-wider text-lime-300">
        Juegos de La Resaca Deportiva
      </h2>

      {!juegoActivo && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div onClick={() => iniciarJuego("trivia")} className="cursor-pointer hover:scale-105 transition">
            <img src={triviaCover} alt="Trivial Lloretenc" className="rounded-xl border border-lime-400 shadow-lg" />
            <p className="mt-2 text-center text-lime-300 font-semibold">Trivial Lloretenc</p>
          </div>
          <div onClick={() => iniciarJuego("partidos")} className="cursor-pointer hover:scale-105 transition">
            <img src={partidosCover} alt="Juego de Partidos" className="rounded-xl border border-lime-400 shadow-lg" />
            <p className="mt-2 text-center text-lime-300 font-semibold">Juego de Partidos</p>
          </div>
          <div onClick={() => iniciarJuego("ppt")} className="cursor-pointer hover:scale-105 transition">
            <img src={pptCover} alt="Piedra Papel Tijera" className="rounded-xl border border-lime-400 shadow-lg" />
            <p className="mt-2 text-center text-lime-300 font-semibold">Piedra Papel Tijera</p>
          </div>

          <div className="opacity-60">
            <img src={fantasyCover} alt="Lloret Fantasy" className="rounded-xl border border-dashed border-lime-400 shadow-lg" />
            <p className="mt-2 text-center text-lime-400 italic">Lloret Fantasy (Próximamente)</p>
          </div>
        </div>
      )}

      
    {juegoActivo === "trivia" && (
      <div>
        <div className="text-right mb-4">
          <button
            onClick={volver}
            className="inline-flex items-center gap-1 text-sm text-lime-300 hover:text-white hover:gap-2 transition-all duration-300"
          >
            <ArrowLeft size={16} />
            Volver
          </button>
        </div>
        <Trivia preguntas={preguntas} />
      </div>
    )}

    {juegoActivo === "partidos" && (
      <div>
        <div className="text-right mb-4">
          <button
            onClick={volver}
            className="inline-flex items-center gap-1 text-sm text-lime-300 hover:text-white hover:gap-2 transition-all duration-300"
          >
            <ArrowLeft size={16} />
            Volver
          </button>
        </div>
        <JuegoPartidos />
      </div>
    )}

    {juegoActivo === "ppt" && (
      <div>
        <div className="text-right mb-4">
          <button
            onClick={volver}
            className="inline-flex items-center gap-1 text-sm text-lime-300 hover:text-white hover:gap-2 transition-all duration-300"
          >
            <ArrowLeft size={16} />
            Volver
          </button>
        </div>
        <PiedraPapelTijera />
      </div>
    )}

    </section>
  );
}


export function LaResacaDeportiva() {
  return (
    <div className="bg-[#0f0f0f] text-lime-300 min-h-screen font-sans leading-relaxed">
      <header className="text-center py-12 bg-gradient-to-b from-black to-[#111111] border-b border-lime-400">
        <div className="flex items-center space-x-2 px-4">
          <a href="/portfolio-react/axprod" className="flex items-center gap-2 text-lime-300 hover:text-white transition">
            <ArrowLeftCircle className="w-6 h-6" />
            <img src={LogoDark} alt="AxProd Logo" className="w-8 h-8 rounded-full shadow-sm" />
          </a>
        </div>
        <h1 className="text-5xl font-extrabold uppercase tracking-wider mt-4">La Resaca Deportiva</h1>
        <p className="text-lime-400 text-lg mt-2">Resumen semanal del deporte en Lloret de Mar</p>
      </header>

      <Episodios episodes={episodes} />
      <Noticias />
      <Juegos />
      <Footer />
    </div>
  );
}