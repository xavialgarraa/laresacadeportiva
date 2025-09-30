const preguntas = [
  {
    pregunta: "¿En qué año surgió el Club Bàsquet Lloret?",
    opciones: ['1970', '1975', '1982', '1990'],
    correcta: "1970",
    equipo: "Club Bàsquet Lloret"
  },
  {
    pregunta: "¿Qué tipo de baloncesto promovía inicialmente el club?",
    opciones: ['Femenino', 'Masculino', 'Infantil', 'Profesional'],
    correcta: "Masculino",
    equipo: "Club Bàsquet Lloret"
  },
  {
    pregunta: "¿Qué frase inspiró la fusión del club en 2007?",
    opciones: ['"El baloncesto es vida"', '"Dedícate a lo que te haga ilusión"', '"Juntos somos más fuertes"', '"El éxito está en el equipo"'],
    correcta: '"Dedícate a lo que te haga ilusión"',
    equipo: "Club Bàsquet Lloret"
  },
  {
    pregunta: "¿Cuántos equipos federados tenía el club en sus inicios?",
    opciones: ['1', '2', '3', '4'],
    correcta: "2",
    equipo: "Club Bàsquet Lloret"
  },
  {
    pregunta: "¿Qué logro destacado tuvo el CB Lloret en los años 80?",
    opciones: ['Ascenso a 1ª División Nacional B', 'Campeonato absoluto provincial', 'Fusión con el CIB Lloret', 'Todos los anteriores'],
    correcta: "Todos los anteriores",
    equipo: "Club Bàsquet Lloret"
  },
  {
    pregunta: "¿En qué año fue fundado el CH Lloret?",
    opciones: ['1969', '1975', '1980', '1986'],
    correcta: "1969",
    equipo: "Hoquei Lloret"
  },
  {
    pregunta: "¿Qué deporte practica el CH Lloret?",
    opciones: ['Hockey sobre patines', 'Hockey sobre hielo', 'Fútbol sala', 'Balonmano'],
    correcta: "Hockey sobre patines",
    equipo: "Hoquei Lloret"
  },
  {
    pregunta: "¿Qué título internacional disputó en 2009-10?",
    opciones: ['Copa CERS', 'Copa de Europa', 'Liga Europea', 'Copa del Rey'],
    correcta: "Copa CERS",
    equipo: "Hoquei Lloret"
  },
  {
    pregunta: "¿Dónde se jugó la Copa del Rey de hockey patines en 2010?",
    opciones: ['Barcelona', 'Lloret de Mar', 'Vic', 'Reus'],
    correcta: "Lloret de Mar",
    equipo: "Hoquei Lloret"
  },
  {
    pregunta: "¿Qué equipo de la OK Liga 2009-10 representaba a Lloret?",
    opciones: ['Grup Lloret', 'CIB Lloret', 'CH Lloret', 'Basquet Lloret'],
    correcta: "Grup Lloret",
    equipo: "Hoquei Lloret"
  },
  {
    pregunta: "¿Cuántas pistas de tenis tiene el Club Tennis i Pàdel Lloret?",
    opciones: ['4', '3', '2', '6'],
    correcta: "4",
    equipo: "Club Tennis Lloret"
  },
  {
    pregunta: "¿Cuántas pistas de pádel tiene el Club Tennis i Pàdel Lloret?",
    opciones: ['6', '4', '2', '3'],
    correcta: "6",
    equipo: "Club Tennis Lloret"
  },
  {
    pregunta: "¿Qué superficie predomina en las pistas de tenis?",
    opciones: ['Tierra batida', 'Cemento', 'Hierba', 'Moqueta'],
    correcta: "Tierra batida",
    equipo: "Club Tennis Lloret"
  },
  {
    pregunta: "¿Qué valores promueve el Club Tennis i Pàdel Lloret?",
    opciones: ['Competitividad', 'Respeto y trabajo en equipo', 'Individualismo', 'Profesionalismo'],
    correcta: "Respeto y trabajo en equipo",
    equipo: "Club Tennis Lloret"
  },
  {
    pregunta: "¿Desde cuándo existe el Club Tennis i Pàdel Lloret?",
    opciones: ['Más de 25 años', '15 años', '10 años', '5 años'],
    correcta: "Más de 25 años",
    equipo: "Club Tennis Lloret"
  },
  {
    pregunta: "¿Qué carrera nocturna se celebra el 28 de junio en Lloret?",
    opciones: ['Lloretrail', 'Night Trail Lloret', 'Gran Fondo', 'Travesía Playas'],
    correcta: "Night Trail Lloret",
    equipo: "Eventos Deportivos"
  },
  {
    pregunta: "¿Cuándo es la Travesía Playas de Lloret?",
    opciones: ['6 de abril', '28 de junio', '28 de septiembre', '18 de noviembre'],
    correcta: "28 de septiembre",
    equipo: "Eventos Deportivos"
  },
  {
    pregunta: "¿Qué festival ilumina el cielo con drones en septiembre?",
    opciones: ['Fiesta de Santa Cristina', 'Lloret Drone Festival', 'Feria Medieval', 'PRIDE Costa Brava'],
    correcta: "Lloret Drone Festival",
    equipo: "Eventos Culturales"
  },
  {
    pregunta: "¿Qué evento rememora la huella indiana en junio?",
    opciones: ['Feria de los Americanos', 'Feria Medieval', 'Fenals de Música', 'Carnaval'],
    correcta: "Feria de los Americanos",
    equipo: "Eventos Culturales"
  },
  {
    pregunta: "¿Qué competición ciclista es en abril en Lloret?",
    opciones: ['Lloretrail', 'Gran Fondo Lloret', 'Night Trail', 'Travesía'],
    correcta: "Gran Fondo Lloret",
    equipo: "Eventos Deportivos"
  },
  {
    pregunta: "¿Qué equipo femenino se separó del CB Lloret en los 80?",
    opciones: ['CIB Lloret', 'CH Lloret', 'CF Lloret', 'Grup Lloret'],
    correcta: "CIB Lloret",
    equipo: "Club Bàsquet Lloret"
  },
  {
    pregunta: "¿Qué premio ganó el CF Lloret en 1968?",
    opciones: ['Trofeo Moscardó', 'Copa Generalitat', 'Liga Catalana', 'Copa del Rey'],
    correcta: "Trofeo Moscardó",
    equipo: "CF Lloret"
  },
  {
    pregunta: "¿En qué año se fusionaron CB Lloret y CIB Lloret?",
    opciones: ['2005', '2007', '2010', '2015'],
    correcta: "2007",
    equipo: "Club Bàsquet Lloret"
  },
  {
    pregunta: "¿Qué entrenador español inspiró la filosofía del Basquet Lloret?",
    opciones: ['Pep Guardiola', 'Aíto García Reneses', 'Juan Carlos Navarro', 'Pau Gasol'],
    correcta: "Aíto García Reneses",
    equipo: "Club Bàsquet Lloret"
  },
  {
    pregunta: "¿Qué instalación usaba el CB Lloret en sus inicios?",
    opciones: ['Escola Esteve Carles', 'Palau Blaugrana', 'Pavelló Municipal', 'Ciutat Esportiva'],
    correcta: "Escola Esteve Carles",
    equipo: "Club Bàsquet Lloret"
  },
  {
    pregunta: "¿En qué año fue fundado el CF Lloret?",
    opciones: ['1918', '1921', '1930', '1942'],
    correcta: "1921",
    equipo: "CF Lloret"
  },
  {
    pregunta: "¿Cuál es el color principal del uniforme del CF Lloret?",
    opciones: ['Azul', 'Rojo', 'Verde', 'Amarillo'],
    correcta: "Azul",
    equipo: "CF Lloret"
  },
  {
    pregunta: "¿En qué años ganó la Copa Generalitat el CF Lloret?",
    opciones: ['1987 y 1988', '1985 y 1986', '1980 y 1982', '1990 y 1991'],
    correcta: "1987 y 1988",
    equipo: "CF Lloret"
  },
  {
    pregunta: "¿Qué torneo de hockey organiza Lloret anualmente?",
    opciones: ['Torneo Internacional Lloret Cup', 'Copa Cataluña', 'Torneo Costa Brava', 'Copa CERS'],
    correcta: "Torneo Internacional Lloret Cup",
    equipo: "Hoquei Lloret"
  },
  // Continúa con las siguientes 70 preguntas en el mismo formato...
];

export default preguntas;