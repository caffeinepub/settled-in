import { Button } from "@/components/ui/button";
import { ArrowRight, Users } from "lucide-react";
import { type Variants, motion } from "motion/react";

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] },
  },
};

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24"
      style={{
        background:
          "radial-gradient(ellipse 70% 60% at 0% 40%, oklch(0.92 0.08 60 / 0.35) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 100% 60%, oklch(0.92 0.06 195 / 0.3) 0%, transparent 55%), oklch(0.985 0.005 85)",
      }}
    >
      {/* Decorative blobs */}
      <div
        className="absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "oklch(0.62 0.22 38)" }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: "oklch(0.55 0.12 195)" }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Text */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-brand-orange-light text-brand-orange border border-brand-orange/20">
                <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
                For outstation college students
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight"
            >
              New City. <span className="text-brand-orange">Fresh Start.</span>
              <br />
              We've Got You.
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg text-foreground/65 max-w-lg leading-relaxed"
            >
              Everything a student needs to feel at home — PG, food, transport,
              language &amp; friends. One platform, zero overwhelm.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 pt-2"
            >
              <Button
                size="lg"
                onClick={() => scrollToSection("find-pg")}
                className="bg-brand-orange hover:opacity-90 text-white font-bold shadow-orange text-base px-7 rounded-xl"
              >
                Find a PG
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("community")}
                className="border-brand-teal text-brand-teal hover:bg-brand-teal-light font-semibold text-base px-7 rounded-xl"
              >
                <Users className="mr-2 w-4 h-4" />
                Join Community
              </Button>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-6 pt-2"
            >
              {[
                { value: "5,000+", label: "Students helped" },
                { value: "200+", label: "PG listings" },
                { value: "15+", label: "Cities" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-display text-2xl font-bold text-brand-orange">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="relative flex justify-center lg:justify-end"
          >
            <div
              className="absolute inset-0 rounded-3xl opacity-30 blur-2xl"
              style={{
                background:
                  "radial-gradient(ellipse at center, oklch(0.62 0.22 38 / 0.4) 0%, transparent 70%)",
              }}
              aria-hidden="true"
            />
            <img
              src="/assets/generated/hero-banner.dim_1200x500.jpg"
              alt="Students arriving in a new city, excited and ready to settle in"
              className="relative z-10 w-full max-w-lg lg:max-w-none rounded-2xl object-cover shadow-card-hover"
              loading="eager"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
