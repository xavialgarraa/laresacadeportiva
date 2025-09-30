import { Linkedin, Github, Instagram, MessageCircle } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-border bg-background px-6 py-8 text-sm text-muted-foreground">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        
        {/* Esquerra: crèdit */}
        <div className="text-center sm:text-left">
          © {new Date().getFullYear()} Xavi Algarra · Portfolio creat amb React & Tailwind
        </div>

        {/* Xarxes socials */}
        <div className="flex items-center gap-4">
          <a
            href="https://www.linkedin.com/in/xavialgarra"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-primary transition"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/xavialgarra"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-primary transition"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://www.instagram.com/xavialgarra"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-primary transition"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href="https://wa.me/34611223344"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="hover:text-primary transition"
          >
            <MessageCircle className="w-5 h-5" />
          </a>
        </div>

        {/* Toggle de tema */}
        <div className="hidden sm:block">
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
};
