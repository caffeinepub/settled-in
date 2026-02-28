import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Languages } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { LanguagePhrase } from "../backend.d";
import { useAllLanguagePhrases } from "../hooks/useQueries";

const SEED_PHRASES: LanguagePhrase[] = [
  {
    id: 1n,
    language: "Kannada",
    phrase: "Namaskara",
    meaning: "Hello / Greetings",
  },
  {
    id: 2n,
    language: "Kannada",
    phrase: "Dhanyavadagalu",
    meaning: "Thank you",
  },
  {
    id: 3n,
    language: "Kannada",
    phrase: "Hege ideera?",
    meaning: "How are you?",
  },
  {
    id: 4n,
    language: "Kannada",
    phrase: "Bengaluru yelli ide?",
    meaning: "Where is Bengaluru?",
  },
  {
    id: 5n,
    language: "Telugu",
    phrase: "Namaste",
    meaning: "Hello / Greetings",
  },
  { id: 6n, language: "Telugu", phrase: "Dhanyavaadalu", meaning: "Thank you" },
  {
    id: 7n,
    language: "Telugu",
    phrase: "Meeru ela unnaru?",
    meaning: "How are you?",
  },
  {
    id: 8n,
    language: "Telugu",
    phrase: "Identi baaga undi",
    meaning: "This is really good",
  },
  {
    id: 9n,
    language: "Tamil",
    phrase: "Vanakkam",
    meaning: "Hello / Greetings",
  },
  { id: 10n, language: "Tamil", phrase: "Nandri", meaning: "Thank you" },
  {
    id: 11n,
    language: "Tamil",
    phrase: "Epdi irukeenga?",
    meaning: "How are you?",
  },
  {
    id: 12n,
    language: "Tamil",
    phrase: "Romba nalla irukku",
    meaning: "This is very good",
  },
  {
    id: 13n,
    language: "Marathi",
    phrase: "Namaskar",
    meaning: "Hello / Greetings",
  },
  { id: 14n, language: "Marathi", phrase: "Dhanyavaad", meaning: "Thank you" },
  {
    id: 15n,
    language: "Marathi",
    phrase: "Kasey aahat?",
    meaning: "How are you?",
  },
  {
    id: 16n,
    language: "Marathi",
    phrase: "Khoop chaan ahe",
    meaning: "This is very nice",
  },
];

const LANG_COLORS: Record<string, { bg: string; text: string; flip: string }> =
  {
    Kannada: {
      bg: "bg-orange-50 border-orange-200",
      text: "text-orange-800",
      flip: "bg-brand-orange text-white",
    },
    Telugu: {
      bg: "bg-teal-50 border-teal-200",
      text: "text-teal-800",
      flip: "bg-brand-teal text-white",
    },
    Tamil: {
      bg: "bg-purple-50 border-purple-200",
      text: "text-purple-800",
      flip: "bg-purple-600 text-white",
    },
    Marathi: {
      bg: "bg-amber-50 border-amber-200",
      text: "text-amber-800",
      flip: "bg-amber-500 text-white",
    },
  };

function PhraseCard({ phrase }: { phrase: LanguagePhrase }) {
  const colors = LANG_COLORS[phrase.language] ?? {
    bg: "bg-gray-50 border-gray-200",
    text: "text-gray-800",
    flip: "bg-gray-600 text-white",
  };

  return (
    <motion.div
      className="flip-card h-36 cursor-pointer"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      aria-label={`Phrase: ${phrase.phrase}. Meaning: ${phrase.meaning}`}
    >
      <div className="flip-card-inner relative w-full h-full">
        {/* Front */}
        <div
          className={`flip-card-front absolute inset-0 flex flex-col items-center justify-center p-4 rounded-2xl border-2 ${colors.bg}`}
        >
          <span className="text-xs font-bold uppercase tracking-widest opacity-60 mb-2">
            {phrase.language}
          </span>
          <span
            className={`font-display text-xl font-bold text-center ${colors.text}`}
          >
            {phrase.phrase}
          </span>
          <span className="text-xs text-muted-foreground mt-2 opacity-70">
            Hover to see meaning
          </span>
        </div>
        {/* Back */}
        <div
          className={`flip-card-back absolute inset-0 flex flex-col items-center justify-center p-4 rounded-2xl ${colors.flip}`}
        >
          <span className="text-xs font-bold uppercase tracking-widest opacity-80 mb-2">
            Meaning
          </span>
          <span className="font-display text-lg font-bold text-center leading-snug">
            {phrase.meaning}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function LanguageSection() {
  const [activeLanguage, setActiveLanguage] = useState("all");
  const { data: fetchedPhrases, isLoading } = useAllLanguagePhrases(
    activeLanguage === "all" ? undefined : activeLanguage,
  );

  const phrases: LanguagePhrase[] =
    fetchedPhrases && fetchedPhrases.length > 0
      ? fetchedPhrases
      : activeLanguage === "all"
        ? SEED_PHRASES
        : SEED_PHRASES.filter((p) => p.language === activeLanguage);

  const allLanguages = Array.from(new Set(SEED_PHRASES.map((p) => p.language)));

  return (
    <section
      id="language"
      className="py-20"
      style={{ background: "oklch(0.95 0.02 195 / 0.3) " }}
    >
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="flex justify-center mb-3">
            <div className="p-3 rounded-2xl bg-brand-teal-light">
              <Languages className="w-7 h-7 text-brand-teal" />
            </div>
          </div>
          <span className="text-sm font-semibold text-brand-teal uppercase tracking-widest">
            Break the ice
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-extrabold mt-1">
            Speak Like a Local
          </h2>
          <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
            Learn essential phrases in regional languages. Hover over a card to
            reveal the meaning.
          </p>
        </motion.div>

        {/* Language filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <Button
            size="sm"
            onClick={() => setActiveLanguage("all")}
            className={`rounded-full font-semibold transition-all ${
              activeLanguage === "all"
                ? "bg-brand-teal text-white hover:opacity-90 border-0"
                : "bg-white border-2 border-border text-foreground hover:border-brand-teal hover:text-brand-teal"
            }`}
          >
            All Languages
          </Button>
          {allLanguages.map((lang) => (
            <Button
              key={lang}
              size="sm"
              variant={activeLanguage === lang ? "default" : "outline"}
              onClick={() => setActiveLanguage(lang)}
              className={`rounded-full font-semibold transition-all ${
                activeLanguage === lang
                  ? "bg-brand-teal text-white hover:opacity-90 border-0"
                  : "border-2 border-border hover:border-brand-teal hover:text-brand-teal"
              }`}
            >
              {lang}
            </Button>
          ))}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"].map((k) => (
              <Skeleton key={k} className="h-36 rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {phrases.map((phrase) => (
              <PhraseCard key={String(phrase.id)} phrase={phrase} />
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10 text-sm text-muted-foreground"
        >
          💡 Tip: Even a simple "Namaskara" or "Vanakkam" can warm hearts and
          open doors!
        </motion.div>
      </div>
    </section>
  );
}
