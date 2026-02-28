import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bike, Bus, Car, Navigation, Train } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { TransportTip } from "../backend.d";
import { useAllTransportTips } from "../hooks/useQueries";

const MODES = ["all", "bus", "metro", "auto", "bike", "cab"];

const MODE_ICONS: Record<string, React.ReactNode> = {
  bus: <Bus className="w-5 h-5" />,
  metro: <Train className="w-5 h-5" />,
  auto: <Car className="w-5 h-5" />,
  bike: <Bike className="w-5 h-5" />,
  cab: <Navigation className="w-5 h-5" />,
  all: <Navigation className="w-5 h-5" />,
};

const MODE_COLORS: Record<string, string> = {
  bus: "bg-orange-100 text-orange-700",
  metro: "bg-blue-100 text-blue-700",
  auto: "bg-yellow-100 text-yellow-700",
  bike: "bg-green-100 text-green-700",
  cab: "bg-purple-100 text-purple-700",
  all: "bg-gray-100 text-gray-700",
};

const SEED_TRANSPORT: TransportTip[] = [
  {
    id: 1n,
    title: "BMTC Pass for Students",
    mode: "bus",
    description:
      "Get a monthly BMTC student pass for ₹400 and ride unlimited across Bangalore. Show your college ID at Shivajinagar or Majestic bus stand.",
  },
  {
    id: 2n,
    title: "Namma Metro: Student Discount",
    mode: "metro",
    description:
      "Buy a Namma Metro student card with 50% off regular fares. Works across all metro lines. Recharge at any station or online via the app.",
  },
  {
    id: 3n,
    title: "Auto-Rickshaw Basics",
    mode: "auto",
    description:
      "Always insist on the meter. First 2 km costs ~₹30, ₹15 per km after. Use Rapido or Ola Auto for transparent pricing and tracking.",
  },
  {
    id: 4n,
    title: "Bounce & Yulu Bike Rentals",
    mode: "bike",
    description:
      "Download Bounce or Yulu for dockless bike and scooter rentals. ₹5–₹15 for short campus commutes. Helmets required — keep one in your PG.",
  },
  {
    id: 5n,
    title: "Cab Pools & InDrive",
    mode: "cab",
    description:
      "InDrive lets you negotiate cab fares directly. Share cabs via WhatsApp groups in your hostel. Great for airport trips at ₹300–₹600.",
  },
  {
    id: 6n,
    title: "Inter-City Bus (KSRTC)",
    mode: "bus",
    description:
      "Book KSRTC sleeper buses online for weekend trips. Student concession available at the counter. Book 3–4 days in advance for Friday-night slots.",
  },
];

function TipCard({ tip }: { tip: TransportTip }) {
  const mode = tip.mode.toLowerCase();
  const icon = MODE_ICONS[mode] ?? <Navigation className="w-5 h-5" />;
  const colorClass = MODE_COLORS[mode] ?? "bg-gray-100 text-gray-700";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Card className="h-full shadow-card hover:shadow-card-hover transition-shadow duration-200 rounded-2xl group">
        <CardHeader className="pb-3">
          <div className="flex items-start gap-3">
            <div className={`p-2.5 rounded-xl ${colorClass} shrink-0`}>
              {icon}
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="font-display text-base leading-snug group-hover:text-brand-orange transition-colors">
                {tip.title}
              </CardTitle>
              <Badge
                className={`mt-1.5 text-xs capitalize border-0 font-semibold ${colorClass}`}
              >
                {tip.mode}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-foreground/70 leading-relaxed">
            {tip.description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function TransportSection() {
  const [activeMode, setActiveMode] = useState("all");
  const { data: fetchedTips, isLoading } = useAllTransportTips(
    activeMode === "all" ? undefined : activeMode,
  );

  const tips: TransportTip[] =
    fetchedTips && fetchedTips.length > 0
      ? fetchedTips
      : activeMode === "all"
        ? SEED_TRANSPORT
        : SEED_TRANSPORT.filter(
            (t) => t.mode.toLowerCase() === activeMode.toLowerCase(),
          );

  return (
    <section id="transport" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="text-sm font-semibold text-brand-orange uppercase tracking-widest">
            Navigate with confidence
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-extrabold mt-1">
            Getting Around the City
          </h2>
          <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
            From daily commutes to weekend getaways — insider tips to move
            smartly and cheaply.
          </p>
        </motion.div>

        {/* Mode Tabs */}
        <Tabs
          value={activeMode}
          onValueChange={setActiveMode}
          className="w-full"
        >
          <TabsList className="flex flex-wrap h-auto gap-1 bg-muted/60 p-1 rounded-xl justify-start mb-8 w-fit mx-auto">
            {MODES.map((mode) => (
              <TabsTrigger
                key={mode}
                value={mode}
                className="capitalize data-[state=active]:bg-brand-orange data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg px-4 py-1.5 text-sm font-medium transition-all"
              >
                {mode === "all" ? "All Modes" : mode}
              </TabsTrigger>
            ))}
          </TabsList>

          {MODES.map((mode) => (
            <TabsContent key={mode} value={mode}>
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {["s1", "s2", "s3"].map((k) => (
                    <Skeleton key={k} className="h-44 rounded-2xl" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {tips.map((tip) => (
                    <TipCard key={String(tip.id)} tip={tip} />
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
