import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NotFound } from "./pages/NotFound";
import { LanguageProvider } from "./context/LanguageContext";
import { LaResacaDeportiva } from "./pages/LaResacaDeportiva";
import { Noticia } from "./pages/Noticia";
import { NoticiaForm } from "./pages/NoticiaForm";


function App() {
  return (
    <LanguageProvider>
      <BrowserRouter basename="/laresacadeportiva">
        <Routes>
          {/* Pàgina principal */}
          <Route path="/" element={<LaResacaDeportiva />} />

          <Route path="/laresacadeportiva" element={<LaResacaDeportiva />} />
          <Route path="noticia/:id" element={<Noticia />} />

          <Route path="/nueva" element={<NoticiaForm />} />
          <Route path="/editar/:id" element={<NoticiaForm />} />

          {/* Ruta per 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>

  );
}

export default App;
