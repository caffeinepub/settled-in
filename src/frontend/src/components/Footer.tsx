import {
  Bus,
  Heart,
  Home,
  Languages,
  MapPin,
  Users,
  Utensils,
} from "lucide-react";
import { motion } from "motion/react";

const sections = [
  {
    label: "Find PG",
    href: "#find-pg",
    icon: <Home className="w-3.5 h-3.5" />,
  },
  {
    label: "Food Guide",
    href: "#food",
    icon: <Utensils className="w-3.5 h-3.5" />,
  },
  {
    label: "Transport",
    href: "#transport",
    icon: <Bus className="w-3.5 h-3.5" />,
  },
  {
    label: "Language",
    href: "#language",
    icon: <Languages className="w-3.5 h-3.5" />,
  },
  {
    label: "Community",
    href: "#community",
    icon: <Users className="w-3.5 h-3.5" />,
  },
];

function scrollToSection(href: string) {
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer
      className="relative overflow-hidden pt-16 pb-8"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.18 0.04 45) 0%, oklch(0.22 0.06 35) 100%)",
      }}
    >
      {/* Decorative elements */}
      <div
        className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "oklch(0.62 0.22 38)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "oklch(0.55 0.12 195)" }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-white/10">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <img
              src="/assets/generated/settled-in-logo-transparent.dim_300x80.png"
              alt="Settled IN"
              className="h-10 w-auto object-contain brightness-0 invert opacity-90"
            />
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Helping outstation students feel at home in a new city — from day
              one.
            </p>
            <div className="flex items-center gap-1.5 text-white/50 text-sm">
              <MapPin className="w-3.5 h-3.5" />
              <span>Across 15+ cities in India</span>
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="font-display text-white font-bold text-sm uppercase tracking-widest mb-4">
              Explore
            </h3>
            <ul className="space-y-2">
              {sections.map((section) => (
                <li key={section.href}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(section.href)}
                    className="flex items-center gap-2 text-sm text-white/60 hover:text-brand-orange transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-orange rounded"
                  >
                    <span className="text-brand-teal">{section.icon}</span>
                    {section.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="font-display text-white font-bold text-sm uppercase tracking-widest">
              Our Promise
            </h3>
            <div className="space-y-3 text-sm text-white/60">
              <p>🏠 Verified PG listings by real students</p>
              <p>🍛 Budget-friendly food spots near campus</p>
              <p>🚌 Smart commute guides for every city</p>
              <p>🗣️ Local language basics to break the ice</p>
              <p>🤝 A community that has your back</p>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p className="font-medium text-white/50 text-center sm:text-left">
            Made for students, by students. 🎓
          </p>
          <p className="flex items-center gap-1.5 text-center">
            © {year}. Built with{" "}
            <Heart className="w-3 h-3 text-brand-orange fill-brand-orange" />{" "}
            using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors underline underline-offset-2"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
