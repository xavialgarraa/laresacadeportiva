import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  updateDoc,
  increment,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { motion } from "framer-motion";
import { ArrowLeft, Text } from "lucide-react";
import { Link } from "react-router-dom";

export function Noticia() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [noticia, setNoticia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fontSize, setFontSize] = useState("base");
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState("");
  const [autorComentario, setAutorComentario] = useState("");

  // Cargar noticia
  useEffect(() => {
    const fetchNoticia = async () => {
      try {
        const docRef = doc(db, "noticias", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setNoticia(data);
          setLikes(data.likes || 0);
          setDislikes(data.dislikes || 0);
        } else {
          setNoticia({ error: true });
        }
      } catch {
        setNoticia({ error: true });
      } finally {
        setLoading(false);
      }
    };
    fetchNoticia();
  }, [id]);

  // Comentarios en tiempo real
  useEffect(() => {
    if (!id) return;
    const comentariosRef = collection(db, "noticias", id, "comentarios");
    const unsubscribe = onSnapshot(comentariosRef, (snapshot) => {
      setComentarios(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [id]);

  // Título del documento
  useEffect(() => {
    if (noticia?.Titulo) {
      document.title = `La Resaca Deportiva - ${noticia.Titulo}`;
    }
  }, [noticia]);

  const toggleFontSize = () => {
    setFontSize((prev) =>
      prev === "base" ? "xl" : prev === "xl" ? "2xl" : "base"
    );
  };

  const fontSizeClass =
    fontSize === "xl"
      ? "text-xl md:text-2xl lg:text-3xl"
      : fontSize === "2xl"
      ? "text-2xl md:text-3xl lg:text-4xl"
      : "text-lg md:text-xl lg:text-2xl"; // ahora base es más grande


  const formatDate = noticia?.fecha?.toDate?.().toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const parrafos = [
    noticia?.["1-parrafo"],
    noticia?.["2-parrafo"],
    noticia?.["3-parrafo"],
    noticia?.["4-parrafo"],
  ].filter(Boolean);

  const fotos = [
    noticia?.["foto-1"],
    noticia?.["foto-2"],
    noticia?.["foto-3"],
    noticia?.["foto-4"],
  ].filter(Boolean);

  // Likes/Dislikes limitados a 1 por sesión
  const handleLike = async () => {
    if (sessionStorage.getItem(`like-${id}`)) return;
    const docRef = doc(db, "noticias", id);
    await updateDoc(docRef, { likes: increment(1) });
    setLikes(likes + 1);
    sessionStorage.setItem(`like-${id}`, "true");
  };

  const handleDislike = async () => {
    if (sessionStorage.getItem(`dislike-${id}`)) return;
    const docRef = doc(db, "noticias", id);
    await updateDoc(docRef, { dislikes: increment(1) });
    setDislikes(dislikes + 1);
    sessionStorage.setItem(`dislike-${id}`, "true");
  };

  // Enviar comentario
  const enviarComentario = async (e) => {
    e.preventDefault();
    if (!nuevoComentario.trim()) return;

    const comentariosRef = collection(db, "noticias", id, "comentarios");
    await addDoc(comentariosRef, {
      texto: nuevoComentario,
      autor: autorComentario.trim() || "Anónimo",
      fecha: serverTimestamp(),
    });

    setNuevoComentario("");
    setAutorComentario("");
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-white">
        <p className="animate-pulse text-lime-400 text-xl">Cargando noticia...</p>
      </div>
    );

  if (noticia?.error)
    return (
      <div className="flex justify-center items-center h-screen text-red-400">
        <p className="text-xl">Noticia no encontrada</p>
      </div>
    );

  return (
    <main className="bg-gradient-to-br from-[#0f0f0f] to-[#1c1c1c] min-h-screen px-4 py-10 text-white">
      <motion.div
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Navegación */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <Link 
            to="/"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 hover:bg-gray-300"
          >
            <ArrowLeft size={20} />
            Volver
          </Link>
          <button
            onClick={toggleFontSize}
            className="text-lime-400 hover:text-white flex items-center gap-1 text-sm transition"
            title="Cambiar tamaño de texto"
          >
            <Text size={18} />
            A+
          </button>
        </div>

        {/* Título */}
        <h1 className="text-center sm:text-left text-4xl sm:text-5xl md:text-6xl font-bold text-lime-300 mb-6 leading-tight drop-shadow">
          {noticia.Titulo}
        </h1>

        {/* Metadatos */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm sm:text-base text-lime-400 mb-6 gap-2">
          {formatDate && <span>{formatDate}</span>}
          {noticia.autor && <span>Por {noticia.autor}</span>}
        </div>

        {/* Resumen + Imagen principal */}
        {(noticia.Resumen || fotos[0]) && (
          <div className="grid md:grid-cols-2 gap-6 items-center mb-10">
            {noticia.Resumen && (
              <p className="italic text-lime-400 text-xl text-center md:text-2xl">
                {noticia.Resumen}
              </p>

            )}
            {fotos[0] && (
              <motion.img
                src={fotos[0]}
                alt="Imagen destacada"
                className="rounded-xl border-2 border-lime-400 shadow-xl w-full object-cover max-h-72 md:max-h-96"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
            )}
          </div>
        )}

        {/* Cuerpo */}
        <article
          className={`prose prose-invert max-w-none text-gray-200 leading-relaxed ${fontSizeClass} md:prose-lg lg:prose-xl`}
        >
          {parrafos.map((parr, i) => (
            <div key={`parr${i}`} className="mb-12">
              <p className="whitespace-pre-line">{parr}</p>
              {fotos[i + 1] && (
                <motion.img
                  src={fotos[i + 1]}
                  alt={`Imagen secundaria ${i + 2}`}
                  className="rounded-xl border border-lime-400 shadow-lg mt-6 w-full object-cover max-h-[350px] md:max-h-[400px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
              )}
            </div>
          ))}

          {noticia.Cita && (
            <blockquote className="my-12 border-l-4 border-lime-400 pl-4 text-lime-300 text-xl font-semibold italic md:text-2xl lg:text-3xl">
              “{noticia.Cita}”
            </blockquote>
          )}
        </article>

        {/* Likes / Dislikes */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 my-8">
          <button
            onClick={handleLike}
            className="px-6 py-3 bg-lime-400 hover:bg-lime-300 rounded font-bold text-black transition"
          >
            👍 {likes}
          </button>
          <button
            onClick={handleDislike}
            className="px-6 py-3 bg-red-500 hover:bg-red-400 rounded font-bold text-white transition"
          >
            👎 {dislikes}
          </button>
        </div>

        {/* Comentarios */}
        <div className="mt-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-300 mb-4">Comentarios</h2>

          <form onSubmit={enviarComentario} className="flex flex-col gap-2 mb-4">
            <input
              type="text"
              value={autorComentario}
              onChange={(e) => setAutorComentario(e.target.value)}
              placeholder="Tu nombre (Opcional)"
              className="w-full p-2 rounded bg-[#2a2a2a] border border-gray-600 text-gray-200 placeholder-gray-400 text-sm"
            />
            <textarea
              value={nuevoComentario}
              onChange={(e) => setNuevoComentario(e.target.value)}
              placeholder="Escribe un comentario..."
              className="w-full p-2 rounded bg-[#2a2a2a] border border-gray-600 text-gray-200 placeholder-gray-400 text-sm"
              rows={3}
            />
            <button
              type="submit"
              className="self-end px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-200 text-sm rounded transition"
            >
              Enviar
            </button>
          </form>

          <div className="flex flex-col gap-2">
            {comentarios.map((c) => (
              <div
                key={c.id}
                className="bg-[#1f1f1f] p-2 rounded border border-gray-700 text-gray-300 text-sm"
              >
                <p className="font-medium">{c.autor || "Anónimo"}</p>
                <p className="mt-0.5">{c.texto}</p>
              </div>
            ))}
          </div>
        </div>

      </motion.div>
    </main>

  );
}
