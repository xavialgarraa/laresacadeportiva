import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NotFound } from "./pages/NotFound";
import { LanguageProvider } from "./context/LanguageContext";
import { LaResacaDeportiva } from "./pages/LaResacaDeportiva";
import { Noticia } from "./pages/Noticia";
import { NoticiaForm } from "./pages/NoticiaForm";
import { PrimeraCatalana } from "./pages/Prediccion1Cat";

import Clasificaciones from './components/Clasificacion';
import DetallePartido from './components/DetallePartido';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LaResacaDeportiva />} />
          <Route path="/noticia/:id" element={<Noticia />} />
          <Route path="/nueva" element={<NoticiaForm />} />
          <Route path="/editar/:id" element={<NoticiaForm />} />
          <Route path="/primera-catalana" element={<PrimeraCatalana />} />
          <Route path="*" element={<NotFound />} />

          <Route path="/clasificaciones" element={<Clasificaciones />} />
          <Route path="/partido/:id" element={<DetallePartido />} />
          
        </Routes>
      </BrowserRouter>
    </LanguageProvider>

  );
}

export default App;
