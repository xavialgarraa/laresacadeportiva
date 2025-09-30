import { useState } from "react";

const opciones = ["🪨", "📄", "✂️"];

const obtenerResultado = (jugador, cpu) => {
  if (jugador === cpu) return "Empate 🤝";
  if (
    (jugador === "🪨" && cpu === "✂️") ||
    (jugador === "📄" && cpu === "🪨") ||
    (jugador === "✂️" && cpu === "📄")
  ) return "Nos ganaste! ";
  return "Perdiste";
};

export default function PiedraPapelTijera() {
  const [eleccionJugador, setEleccionJugador] = useState(null);
  const [eleccionCPU, setEleccionCPU] = useState(null);
  const [resultado, setResultado] = useState("");

  const jugar = (opcion) => {
    const cpu = opciones[Math.floor(Math.random() * 3)];
    setEleccionJugador(opcion);
    setEleccionCPU(cpu);
    setResultado(obtenerResultado(opcion, cpu));
  };

  const reiniciar = () => {
    setEleccionJugador(null);
    setEleccionCPU(null);
    setResultado("");
  };

  return (
    <section className="text-white text-center mt-10">
      <h2 className="text-3xl font-bold mb-4 text-lime-300 uppercase">Piedra Papel o Tijera</h2>

      <div className="flex justify-center gap-4 mb-6">
        {opciones.map((op) => (
          <button
            key={op}
            onClick={() => jugar(op)}
            className="text-4xl bg-[#1c1c1e] p-4 rounded-full border-2 border-lime-400 hover:bg-lime-700/30 transition"
          >
            {op}
          </button>
        ))}
      </div>

      {eleccionJugador && (
        <div className="text-lg mb-4">
          <p>Tu elección: <span className="text-lime-300">{eleccionJugador}</span></p>
          <p>ResacaDeportiva: <span className="text-red-400">{eleccionCPU}</span></p>
        </div>
      )}

      {resultado && (
        <div>
          <p className="text-xl font-bold mb-2 text-yellow-300">{resultado}</p>
          <button
            onClick={reiniciar}
            className="mt-2 bg-lime-400 text-black font-bold py-2 px-4 rounded-lg hover:bg-lime-300 transition"
          >
            Jugar otra vez
          </button>
        </div>
      )}
    </section>
  );
}
