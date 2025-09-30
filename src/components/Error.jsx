import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";

export const Error = () => {
  return (
    <section className="z-10 min-h-screen flex flex-col justify-center items-center text-center bg-background overflow-x-hidden">
      <h1 className="z-10 text-6xl font-bold text-primary animate-fade-in">404</h1>
      <p className="z-10 text-2xl font-semibold mt-4 text-foreground animate-fade-in-delay-1">
        Aquesta pàgina no existeix 🪐
      </p>
      <p className="z-10 text-foreground mt-2 max-w-md animate-fade-in-delay-2">
        Potser has escrit malament l’URL o estàs buscant alguna cosa que encara no he creat.
      </p>

      <div className="z-10 mt-6 animate-fade-in-delay-3 text-primary">
        <Link
          to="/"
          className="cosmic-button flex items-center gap-2 text-muted-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          Torna a l’inici
        </Link>
      </div>

      <div className="z-10 mt-6 animate-fade-in-delay-3">
        <ThemeToggle />
      </div>      
    </section>
  );
};
