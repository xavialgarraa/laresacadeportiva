import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import LogoLight from "../assets/logo.png";
import LogoDark from "../assets/logo-blanco.png";
import { ThemeToggle } from "./ThemeToggle"; 
import { translations } from "../translations/TranslationNavbar";
import Spain from "../assets/Bandera_de_España.svg.webp"
import { useLanguage } from "../context/LanguageContext";



export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { language, changeLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    const checkStoredTheme = () => {
      const storedTheme = localStorage.getItem("theme");
      setIsDarkMode(storedTheme === "dark");
    };
    const storedLang = localStorage.getItem("lang");
    if (storedLang) changeLanguage(storedLang);

    handleScroll();
    checkStoredTheme();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("storage", checkStoredTheme);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("storage", checkStoredTheme);
    };
  }, []);

  const t = translations[language];

  const navItems = [
    { name: t.home, href: "#hero" },
    { name: t.about, href: "#about" },
    { name: t.projects, href: "#projects" },
    { name: t.axprod, href: "/portfolio-react/axprod" },
    { name: t.contact, href: "#contact" },
  ];

  const handleLangChange = (e) => {
    const newLang = e.target.value;
    changeLanguage(newLang);
  };

  return (
    <nav
      className={cn(
        "fixed w-full z-40 transition-all duration-300",
        isScrolled
          ? "py-3 bg-background/80 backdrop-blur-md shadow-xs"
          : "py-5"
      )}
    >
      <div className="container flex items-center justify-between">
        <a
          className="text-xl font-bold text-primary flex items-center space-x-2"
          href="/portfolio-react/#hero"
        >
          <img
            src={isDarkMode ? LogoDark : LogoLight}
            alt="Logo"
            className="w-8 h-8 transition-all duration-300"
          />
          <span className="relative z-10">
            <span className="text-glow text-foreground">Xavi Algarra</span> {t.portfolio}
          </span>
        </a>

        {/* Menú de escritorio */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-foreground/80 hover:text-primary transition-colors duration-300"
            >
              {item.name}
            </a>
          ))}

          <ThemeToggle />

          <select
            value={language}
            onChange={handleLangChange}
            className="bg-foreground/5 border border-border rounded px-2 py-1 text-sm text-primary hover:border-primary"
          >
            <option value="ca">CAT</option>
            <option value="es">ESP</option>
            <option value="en">ENG</option>
          </select>
        </div>

        {/* Botón desplegable */}
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="md:hidden p-2 text-foreground z-50"
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Menú móvil */}
        <div
          className={cn(
            "fixed inset-0 top-0 h-screen w-full z-40 bg-background/95 backdrop-blur-md",
            "flex flex-col items-center justify-center overflow-y-auto",
            "transition-all duration-300 md:hidden",
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          <div className="flex flex-col space-y-8 text-xl items-center">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-foreground/80 hover:text-primary transition-colors duration-300"
              >
                {item.name}
              </a>
            ))}
            <ThemeToggle onClickOutside={() => setIsMenuOpen(false)} />

            <select
              value={language}
              onChange={handleLangChange}
              className="bg-transparent border border-border rounded px-2 py-1 text-sm text-foreground hover:border-primary"
            >
              <option value="ca">CAT</option>
              <option value="es">🇪🇸 ESP</option>
              <option value="en">🇬🇧 ENG</option>
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
};
