import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogIn, LogOut, Menu, User, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useMyProfile } from "../hooks/useQueries";

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

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function AuthButton() {
  const { isAuthenticated, isLoggingIn, login, logout, isInitializing } =
    useAuth();
  const { data: profile } = useMyProfile(isAuthenticated);

  if (isInitializing) {
    return <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />;
  }

  if (isAuthenticated && profile) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full"
          >
            <Avatar className="h-8 w-8 bg-brand-orange-light">
              <AvatarFallback className="text-xs font-bold text-brand-orange bg-brand-orange-light">
                {getInitials(profile.name)}
              </AvatarFallback>
            </Avatar>
            <span className="hidden sm:block text-sm font-medium text-foreground/80 max-w-[120px] truncate">
              {profile.name}
            </span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <div className="px-3 py-2 border-b border-border mb-1">
            <p className="text-sm font-semibold truncate">{profile.name}</p>
            <p className="text-xs text-muted-foreground truncate">
              {profile.college}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {profile.city}
            </p>
          </div>
          <DropdownMenuItem
            onClick={logout}
            className="text-destructive focus:text-destructive focus:bg-destructive/10 gap-2 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  if (isAuthenticated) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full"
          >
            <Avatar className="h-8 w-8 bg-brand-orange-light">
              <AvatarFallback className="text-xs font-bold text-brand-orange bg-brand-orange-light">
                <User className="w-4 h-4" />
              </AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem
            onClick={logout}
            className="text-destructive focus:text-destructive focus:bg-destructive/10 gap-2 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button
      size="sm"
      variant="outline"
      onClick={login}
      disabled={isLoggingIn}
      className="gap-2 border-2 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white font-semibold transition-all"
    >
      <LogIn className="w-4 h-4" />
      {isLoggingIn ? "Logging in..." : "Login"}
    </Button>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, isLoggingIn, login, logout } = useAuth();
  const { data: profile } = useMyProfile(isAuthenticated);

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

        {/* Right side: CTA + Auth */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            onClick={() => scrollToSection("#find-pg")}
            className="bg-brand-orange text-white hover:opacity-90 shadow-orange font-semibold"
            size="sm"
          >
            Find PG
          </Button>
          <AuthButton />
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
              <li className="pt-2 flex flex-col gap-2">
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
                {isAuthenticated ? (
                  <div className="space-y-1">
                    {profile && (
                      <div className="px-3 py-2 bg-muted/50 rounded-lg">
                        <p className="text-sm font-semibold">{profile.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {profile.college}
                        </p>
                      </div>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        logout();
                        setMenuOpen(false);
                      }}
                      className="w-full gap-2 text-destructive border-destructive/30 hover:bg-destructive/10"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      login();
                      setMenuOpen(false);
                    }}
                    disabled={isLoggingIn}
                    className="w-full gap-2 border-2 border-brand-orange text-brand-orange"
                  >
                    <LogIn className="w-4 h-4" />
                    {isLoggingIn ? "Logging in..." : "Login"}
                  </Button>
                )}
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
