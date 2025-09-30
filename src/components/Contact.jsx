import { Send } from "lucide-react";
import { Linkedin, Instagram, Github, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { translationsContact } from "../translations/TranslationContact";


export const Contact = () => {
  const [mensaje, setMensaje] = useState("");
  const { language } = useLanguage();
  const t = translationsContact[language];

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.split("?")[1]);
    const mensajePredefinido = params.get("message");
    if (mensajePredefinido) {
      setMensaje(mensajePredefinido);
    }
  }, []);

  return (
    <section id="contact" className="py-24 px-4">
      <div className="container max-w-3xl mx-auto text-center space-y-10">
        {/* Título */}
        <h2 className="text-3xl sm:text-4xl font-bold animate-fade-in">
          {t.heading.split(" ")[0]} <span className="text-primary">{t.heading.split(" ").slice(1).join(" ")}</span>
        </h2>

        {/* Intro */}
        <p className="text-muted-foreground max-w-xl mx-auto animate-fade-in-delay-1">
          {t.intro}
        </p>

        {/* Formulario */}
        <form
          action="https://formspree.io/f/mrbkovvn"
          method="POST"
          className="space-y-6 text-left animate-fade-in-delay-2"
        >
          {/* Nombre */}
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-medium text-foreground">
              {t.form.name}
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder={t.form.namePlaceholder}
              className="w-full px-4 py-2 rounded-md bg-card border border-border text-foreground placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-medium text-foreground">
              {t.form.email}
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder={t.form.emailPlaceholder}
              className="w-full px-4 py-2 rounded-md bg-card border border-border text-foreground placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Mensaje */}
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="font-medium text-foreground">
              {t.form.message}
            </label>
            <textarea
              name="message"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              rows={5}
              required
              placeholder={t.form.messagePlaceholder}
              className="w-full px-4 py-2 rounded-md bg-card border border-border text-foreground placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>

          {/* Botón */}
          <div className="pt-4 text-center">
            <button type="submit" className="cosmic-button flex items-center gap-2 mx-auto">
              {t.form.submit} <Send className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Email directo */}
        <div className="pt-6 text-muted-foreground text-sm animate-fade-in-delay-3">
          {t.direct.text}{" "}
          <a
            href="mailto:xavialgarraperez@gmail.com"
            className="text-primary underline underline-offset-4"
          >
            xavialgarraperez@gmail.com
          </a>
        </div>

        {/* Redes sociales */}
        <div className="pt-6 flex justify-center gap-6 animate-fade-in-delay-4">
          <a
            href="https://www.linkedin.com/in/xavialgarra"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-primary hover:text-primary-foreground transition"
          >
            <Linkedin className="w-6 h-6" />
          </a>

          <a
            href="https://www.instagram.com/algarraxavi/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-primary hover:text-primary-foreground transition"
          >
            <Instagram className="w-6 h-6" />
          </a>

          <a
            href="https://github.com/xavialgarraa"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-primary hover:text-primary-foreground transition"
          >
            <Github className="w-6 h-6" />
          </a>

          <a
            href="https://wa.me/34627503320"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="text-primary hover:text-primary-foreground transition"
          >
            <MessageCircle className="w-6 h-6" />
          </a>
        </div>
      </div>
    </section>
  );
};