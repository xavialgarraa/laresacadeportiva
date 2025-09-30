import { useState } from "react";
import partidos from "../js/partidos";

export default function JuegoPartidos() {
  const [clubSeleccionado, setClubSeleccionado] = useState(null);
  const [partidosFiltrados, setPartidosFiltrados] = useState([]);
  const [partidoActual, setPartidoActual] = useState(0);
  const [fase, setFase] = useState(0);
  const [puntuacion, setPuntuacion] = useState(0);
  const [juegoTerminado, setJuegoTerminado] = useState(false);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState("");
  const [mostrarRespuesta, setMostrarRespuesta] = useState(false);

  const puntosDisponibles = [100, 75, 50, 25];

  if (!clubSeleccionado) {
    const clubsDisponibles = [...new Set(partidos.map(p => p.club))];

    const seleccionarClub = (club) => {
      setClubSeleccionado(club);
      if (club === "Aleatorio") {
        const partidosMezclados = [...partidos].sort(() => 0.5 - Math.random());
        setPartidosFiltrados(partidosMezclados);
      } else {
        const filtrados = partidos.filter(p => p.club === club);
        const partidosMezclados = filtrados.sort(() => 0.5 - Math.random());
        setPartidosFiltrados(partidosMezclados);
      }
    };

    return (
      <div className="flex items-center justify-center p-2">
        <div className="bg-white/10 backdrop-blur-md border border-green-400/30 rounded-2xl p-6 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-green-300 mb-4">Selecciona un club</h1>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {clubsDisponibles.map(club => (
              <button
                key={club}
                onClick={() => seleccionarClub(club)}
                className="bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-xl font-bold"
              >
                {club}
              </button>
            ))}
          </div>
          <button
            onClick={() => seleccionarClub("Aleatorio")}
            className="bg-yellow-700 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl font-bold"
          >
            🎲 Aleatorio
          </button>
        </div>
      </div>
    );
  }

  const partido = partidosFiltrados[partidoActual];

  const manejarRespuesta = () => {
    if (respuestaSeleccionada === partido.resultado) {
      const puntosGanados = puntosDisponibles[fase];
      setPuntuacion(prev => prev + puntosGanados);
      setMostrarRespuesta(true);
      setTimeout(() => siguientePartido(), 2000);
    } else {
      if (fase < 3) {
        setFase(prev => prev + 1);
        setRespuestaSeleccionada("");
      } else {
        setMostrarRespuesta(true);
        setTimeout(() => siguientePartido(), 2000);
      }
    }
  };

  const siguientePartido = () => {
    if (partidoActual < partidosFiltrados.length - 1) {
      setPartidoActual(prev => prev + 1);
      setFase(0);
      setMostrarRespuesta(false);
      setRespuestaSeleccionada("");
    } else {
      setJuegoTerminado(true);
    }
  };

  const reiniciarJuego = () => {
    setPartidoActual(0);
    setFase(0);
    setPuntuacion(0);
    setJuegoTerminado(false);
    setRespuestaSeleccionada("");
    setMostrarRespuesta(false);
    setClubSeleccionado(null);
  };

  const saltarPista = () => {
    if (fase < 3) {
      setFase(prev => prev + 1);
    }
  };

  if (juegoTerminado) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-md border border-green-400/30 rounded-2xl p-8 text-center max-w-md w-full">
          <h2 className="text-3xl font-bold text-green-300 mb-4">🏆 Joc Completat!</h2>
          <p className="text-xl text-white mb-2">Puntuació Final:</p>
          <p className="text-4xl font-bold text-green-300 mb-6">{puntuacion} punts</p>
          <button
            onClick={reiniciarJuego}
            className="bg-green-500 hover:bg-green-400 text-white px-8 py-3 rounded-xl font-bold transition-colors"
          >
            Tornar a Jugar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-md border border-green-400/30 rounded-2xl p-6 max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-green-300 mb-2">RECUERDOS DE PARTIDOS</h1>
          <p className="text-white">¿Recuerdas el partido? - Partido {partidoActual + 1}/{partidosFiltrados.length}</p>
          <p className="text-green-300 font-semibold">Puntuación: {puntuacion}</p>
        </div>

        {mostrarRespuesta ? (
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
                
              <img src={partido.escudoLocal} alt="Local" className="w-16 h-16 object-contain" />
              <span className="text-4xl font-bold text-white">{partido.resultado}</span>
              <img src={partido.escudoVisitante} alt="Visitante" className="w-16 h-16 object-contain" />
            </div>
            <p className="text-2xl text-green-300 font-bold mb-2">
              {respuestaSeleccionada === partido.resultado ? "¡Correcte!" : "Resposta correcta:"}
            </p>
            {partido.local ? (
              <>
                <p className="text-xl text-white">{partido.club} vs {partido.rival}</p>
                {respuestaSeleccionada === partido.resultado && (
                  <p className="text-lg text-green-300 mt-2">+{puntosDisponibles[fase]} punts!</p>
                )}
              </>
            ) : (
              <>
                <p className="text-xl text-white">{partido.rival} vs {partido.club}</p>
                {respuestaSeleccionada === partido.resultado && (
                  <p className="text-lg text-green-300 mt-2">+{puntosDisponibles[fase]} punts!</p>
                )}
              </>
            )}
          </div>
        ) : (
          <>
            {/* Escudos y VS */}
            <div className="flex justify-center items-center mb-6 gap-6">
              <img src={partido.escudoLocal} alt="Local" className="w-24 h-24 object-contain" />
              <span className="text-5xl text-white font-bold">VS</span>
              <img src={partido.escudoVisitante} alt="Visitante" className="w-24 h-24 object-contain" />
            </div>

            {/* Información progresiva */}
            <div className="bg-black/20 rounded-xl p-4 mb-6 min-h-[60px]">
              <div className="space-y-2 text-center">
                <p className="text-lg text-green-300 font-semibold">
                  📅 {partido.jornada} - {partido.temporada}
                </p>
                {fase >= 1 && (
                  <p className="text-lg text-yellow-300">
                    ⏱️ Resultado al descanso: {partido.resultadoDescanso}
                  </p>
                )}
                {fase >= 2 && (
                  <p className="text-lg text-blue-300">
                    ⚽ Goleadores {partido.club}: {partido.goleadores.join(", ")}
                  </p>
                )}
                {fase >= 3 && (
                  <p className="text-lg text-purple-300">
                    👨‍⚖️ Árbitro: {partido.arbitro}
                  </p>
                )}
              </div>
            </div>

            {/* Puntos disponibles */}
            <div className="text-center mb-4">
              <p className="text-green-300 font-semibold">
                💎 Puntos disponibles: {puntosDisponibles[fase]}
              </p>
            </div>

            {/* Input de respuesta */}
            <div className="mb-6">
              <p className="text-center text-white mb-4 font-semibold">Escribe el resultado (ex: 2-1):</p>
              <input
                type="text"
                value={respuestaSeleccionada}
                onChange={(e) => setRespuestaSeleccionada(e.target.value)}
                placeholder="0-0"
                className="w-full p-4 text-center text-2xl font-bold bg-white/20 border-2 border-gray-400 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-400"
              />
            </div>

            {/* Botones */}
            <div className="flex gap-3 justify-center">
              <button
                onClick={manejarRespuesta}
                disabled={!respuestaSeleccionada}
                className="bg-green-500 hover:bg-green-400 disabled:bg-gray-500 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-bold transition-colors"
              >
                Confirmar ({puntosDisponibles[fase]} punts)
              </button>
              {fase < 3 && (
                <button
                  onClick={saltarPista}
                  className="bg-yellow-500 hover:bg-yellow-400 text-white px-6 py-3 rounded-xl font-bold transition-colors"
                >
                  + Pista (-{puntosDisponibles[fase] - puntosDisponibles[fase + 1]} punts)
                </button>
              )}
            </div>

            {/* Volver */}
            <div className="mt-4 text-center">
              <button
                onClick={reiniciarJuego}
                className="text-sm text-red-200 hover:text-red-100"
              >
                ⬅ Volver a seleccionar club
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
