import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { IndianRupee, MapPin, UtensilsCrossed } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { FoodSpot } from "../backend.d";
import { useAllFoodSpots } from "../hooks/useQueries";

const FOOD_TYPES = ["all", "mess", "canteen", "restaurant", "cafe", "dhaba"];

const TYPE_COLORS: Record<string, string> = {
  mess: "bg-orange-100 text-orange-700 border-orange-200",
  canteen: "bg-teal-100 text-teal-700 border-teal-200",
  restaurant: "bg-purple-100 text-purple-700 border-purple-200",
  cafe: "bg-amber-100 text-amber-700 border-amber-200",
  dhaba: "bg-red-100 text-red-700 border-red-200",
};

const SEED_FOOD: FoodSpot[] = [
  {
    id: 1n,
    name: "Amma's Mess",
    spotType: "mess",
    location: "Near VTU, Bangalore",
    priceRange: "₹60–₹90 per meal",
    description:
      "Home-style South Indian meals served fresh three times a day. Full thali with rice, sambar, rasam, and dessert.",
  },
  {
    id: 2n,
    name: "IIT Canteen Block B",
    spotType: "canteen",
    location: "IIT Delhi Campus",
    priceRange: "₹40–₹80 per meal",
    description:
      "Subsidized student canteen with North Indian, South Indian, and Chinese options. Breakfast from 7 AM.",
  },
  {
    id: 3n,
    name: "Bunker Kitchen",
    spotType: "restaurant",
    location: "Koramangala, Bangalore",
    priceRange: "₹150–₹300 per person",
    description:
      "Trendy student haunt with wraps, burgers, and shakes. Great for birthdays and celebrations with the gang.",
  },
  {
    id: 4n,
    name: "Chai Wali Aunty",
    spotType: "cafe",
    location: "Bandra, Mumbai",
    priceRange: "₹15–₹60 per item",
    description:
      "The classic roadside chai and Maggi spot. Open late at night for those midnight study sessions.",
  },
  {
    id: 5n,
    name: "Punjab da Dhaba",
    spotType: "dhaba",
    location: "Sector 17, Chandigarh",
    priceRange: "₹80–₹180 per person",
    description:
      "Authentic Punjabi food — butter chicken, dal makhani, and fresh tandoori rotis. Great value, great taste.",
  },
  {
    id: 6n,
    name: "Campus Bites",
    spotType: "canteen",
    location: "Anna University, Chennai",
    priceRange: "₹35–₹70 per meal",
    description:
      "Quick service with South Indian staples — dosa, idli, vada, pongal. Perfect for between-class breaks.",
  },
];

function FoodCard({ spot }: { spot: FoodSpot }) {
  const typeColor =
    TYPE_COLORS[spot.spotType.toLowerCase()] ||
    "bg-gray-100 text-gray-700 border-gray-200";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Card className="h-full shadow-card hover:shadow-card-hover transition-shadow duration-200 rounded-2xl overflow-hidden group">
        <div
          className="h-24 flex items-center justify-center"
          style={{
            background:
              "radial-gradient(ellipse at center, oklch(0.92 0.06 195 / 0.3) 0%, oklch(0.96 0.03 80 / 0.6) 100%)",
          }}
        >
          <UtensilsCrossed className="w-10 h-10 text-brand-teal opacity-60" />
        </div>
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="font-display text-base leading-snug group-hover:text-brand-teal transition-colors">
              {spot.name}
            </CardTitle>
            <Badge
              className={`text-xs shrink-0 border ${typeColor} font-semibold capitalize`}
            >
              {spot.spotType}
            </Badge>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
            <MapPin className="w-3 h-3 text-brand-teal" />
            <span>{spot.location}</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-foreground/70 leading-relaxed line-clamp-2">
            {spot.description}
          </p>
          <div className="flex items-center gap-1.5 text-brand-teal font-semibold text-sm">
            <IndianRupee className="w-3.5 h-3.5" />
            <span>{spot.priceRange}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function FoodSection() {
  const [activeType, setActiveType] = useState("all");
  const { data: fetchedSpots, isLoading } = useAllFoodSpots(
    activeType === "all" ? undefined : activeType,
  );

  const spots: FoodSpot[] =
    fetchedSpots && fetchedSpots.length > 0
      ? fetchedSpots
      : activeType === "all"
        ? SEED_FOOD
        : SEED_FOOD.filter(
            (s) => s.spotType.toLowerCase() === activeType.toLowerCase(),
          );

  return (
    <section
      id="food"
      className="py-20"
      style={{ background: "oklch(0.97 0.01 80)" }}
    >
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="text-sm font-semibold text-brand-teal uppercase tracking-widest">
            Eat well, study better
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-extrabold mt-1">
            Student-Friendly Food Near You
          </h2>
          <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
            Discover messes, canteens, restaurants, and hidden gems that fit
            student budgets.
          </p>
        </motion.div>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {FOOD_TYPES.map((type) => (
            <Button
              key={type}
              variant={activeType === type ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveType(type)}
              className={`capitalize rounded-full font-medium transition-all ${
                activeType === type
                  ? "bg-brand-teal text-white hover:opacity-90 border-0"
                  : "border-2 border-border hover:border-brand-teal hover:text-brand-teal"
              }`}
            >
              {type === "all" ? "All" : type}
            </Button>
          ))}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {["s1", "s2", "s3", "s4", "s5", "s6"].map((k) => (
              <Skeleton key={k} className="h-56 rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {spots.map((spot) => (
              <FoodCard key={String(spot.id)} spot={spot} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
