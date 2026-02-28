import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Find PG", href: "#find-pg" },
  { label: "Food", href: "#food" },
  { label: "Transport", href: "#transport" },
  { label: "Language", href: "#language" },
  { label: "Community", href: "#community" },
];

function scrollToSection(href: string) {
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-card" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between h-16 px-4 md:px-8">
        {/* Logo */}
        <button
          type="button"
          onClick={() => scrollToSection("#home")}
          className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
          aria-label="Settled IN — go to home"
        >
          <img
            src="/assets/generated/settled-in-logo-transparent.dim_300x80.png"
            alt="Settled IN"
            className="h-10 w-auto object-contain"
          />
        </button>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                type="button"
                onClick={() => scrollToSection(link.href)}
                className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-brand-orange rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            onClick={() => scrollToSection("#find-pg")}
            className="bg-brand-orange text-white hover:opacity-90 shadow-orange font-semibold"
            size="sm"
          >
            Find PG
          </Button>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="md:hidden p-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-border overflow-hidden"
          >
            <ul className="flex flex-col px-4 py-3 gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    type="button"
                    onClick={() => {
                      scrollToSection(link.href);
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 text-sm font-medium text-foreground/80 hover:text-brand-orange hover:bg-brand-orange-light rounded-lg transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li className="pt-2">
                <Button
                  onClick={() => {
                    scrollToSection("#find-pg");
                    setMenuOpen(false);
                  }}
                  className="w-full bg-brand-orange text-white hover:opacity-90"
                  size="sm"
                >
                  Find PG
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
