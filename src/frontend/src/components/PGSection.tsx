import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowUpDown,
  IndianRupee,
  Loader2,
  Lock,
  MapPin,
  Phone,
  Plus,
  Star,
  Trash2,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { Listing } from "../backend.d";
import { useAuth } from "../hooks/useAuth";
import { useMyProfile } from "../hooks/useQueries";
import {
  useAddListing,
  useAllListings,
  useDeleteListing,
  useListingsSortedByRent,
} from "../hooks/useQueries";

const PG_PHOTOS = [
  "/assets/generated/pg-room-1.dim_400x260.jpg",
  "/assets/generated/pg-room-2.dim_400x260.jpg",
  "/assets/generated/pg-room-3.dim_400x260.jpg",
  "/assets/generated/pg-room-4.dim_400x260.jpg",
  "/assets/generated/pg-room-5.dim_400x260.jpg",
  "/assets/generated/pg-room-6.dim_400x260.jpg",
];

const SEED_LISTINGS: Listing[] = [
  {
    id: 1n,
    title: "Sunshine PG for Girls",
    location: "Koramangala, Bangalore",
    rent: 8500n,
    amenities: "WiFi, AC, Meals, Laundry",
    contact: "9876543210",
    postedBy: "Priya Sharma",
    timestamp: BigInt(Date.now()),
  },
  {
    id: 2n,
    title: "Boys Hostel near VTU",
    location: "Malleswaram, Bangalore",
    rent: 6000n,
    amenities: "WiFi, Meals, Parking",
    contact: "9123456789",
    postedBy: "Ravi Kumar",
    timestamp: BigInt(Date.now()),
  },
  {
    id: 3n,
    title: "Cozy Flat Share (2 BHK)",
    location: "Banjara Hills, Hyderabad",
    rent: 9000n,
    amenities: "WiFi, AC, Gym, Security",
    contact: "9988776655",
    postedBy: "Sneha Reddy",
    timestamp: BigInt(Date.now()),
  },
  {
    id: 4n,
    title: "Budget PG near BITS Pilani",
    location: "Pilani, Rajasthan",
    rent: 4500n,
    amenities: "Meals, Study Room, WiFi",
    contact: "9765432100",
    postedBy: "Amit Joshi",
    timestamp: BigInt(Date.now()),
  },
];

function ListingCard({
  listing,
  index,
  isOwner,
  onDelete,
}: {
  listing: Listing;
  index: number;
  isOwner: boolean;
  onDelete: (id: bigint) => void;
}) {
  const amenityList = listing.amenities
    .split(/[,;]/)
    .map((a) => a.trim())
    .filter(Boolean);
  const photo = PG_PHOTOS[index % PG_PHOTOS.length];
  const deleteListing = useDeleteListing();

  async function handleDelete() {
    try {
      await deleteListing.mutateAsync(listing.id);
      onDelete(listing.id);
      toast.success("Listing removed.");
    } catch {
      toast.error("Failed to delete listing.");
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Card className="h-full shadow-card hover:shadow-card-hover transition-shadow duration-200 rounded-2xl overflow-hidden group">
        {/* Photo */}
        <div className="relative overflow-hidden h-44">
          <img
            src={photo}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {/* Delete button for owner */}
          {isOwner && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleteListing.isPending}
              className="absolute top-2 right-2 w-8 h-8 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center text-destructive hover:bg-destructive hover:text-white transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive"
              aria-label="Delete listing"
            >
              {deleteListing.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
            </button>
          )}
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        <CardHeader className="pb-3">
          <CardTitle className="font-display text-lg leading-snug group-hover:text-brand-orange transition-colors">
            {listing.title}
          </CardTitle>
          <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
            <MapPin className="w-3.5 h-3.5 text-brand-orange" />
            <span>{listing.location}</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-baseline gap-1">
            <IndianRupee className="w-4 h-4 text-brand-orange" />
            <span className="font-display text-2xl font-bold text-brand-orange">
              {Number(listing.rent).toLocaleString("en-IN")}
            </span>
            <span className="text-sm text-muted-foreground">/month</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {amenityList.map((amenity) => (
              <Badge
                key={amenity}
                variant="secondary"
                className="text-xs bg-brand-orange-light text-brand-orange border-0 font-medium"
              >
                {amenity}
              </Badge>
            ))}
          </div>

          <div className="pt-2 border-t border-border flex items-center justify-between text-sm">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Star className="w-3.5 h-3.5" />
              <span>By {listing.postedBy}</span>
            </div>
            <a
              href={`tel:${listing.contact}`}
              className="flex items-center gap-1.5 text-brand-teal font-semibold hover:opacity-80 transition-opacity"
            >
              <Phone className="w-3.5 h-3.5" />
              {listing.contact}
            </a>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function AddListingForm({
  onSuccess,
  profileName,
}: { onSuccess: () => void; profileName: string }) {
  const [form, setForm] = useState({
    title: "",
    location: "",
    rent: "",
    amenities: "",
    contact: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const addListing = useAddListing();

  function validate() {
    const newErrors: Record<string, string> = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.location.trim()) newErrors.location = "Location is required";
    if (!form.rent || Number.isNaN(Number(form.rent)) || Number(form.rent) <= 0)
      newErrors.rent = "Valid rent amount is required";
    if (!form.amenities.trim()) newErrors.amenities = "Amenities are required";
    if (!form.contact.trim()) newErrors.contact = "Contact is required";
    return newErrors;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    try {
      await addListing.mutateAsync({
        title: form.title.trim(),
        location: form.location.trim(),
        rent: BigInt(Math.round(Number(form.rent))),
        amenities: form.amenities.trim(),
        contact: form.contact.trim(),
      });
      toast.success("Listing added successfully!");
      onSuccess();
    } catch {
      toast.error("Failed to add listing. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* Profile name display */}
      <div className="px-3 py-2 bg-brand-orange-light rounded-lg text-sm">
        <span className="text-muted-foreground">Posting as: </span>
        <span className="font-semibold text-brand-orange">{profileName}</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="pg-title">PG / Flat Title *</Label>
          <Input
            id="pg-title"
            placeholder="e.g. Sunshine PG for Boys"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            aria-describedby={errors.title ? "pg-title-error" : undefined}
          />
          {errors.title && (
            <p id="pg-title-error" className="text-destructive text-xs">
              {errors.title}
            </p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="pg-location">Location *</Label>
          <Input
            id="pg-location"
            placeholder="e.g. Koramangala, Bangalore"
            value={form.location}
            onChange={(e) =>
              setForm((f) => ({ ...f, location: e.target.value }))
            }
            aria-describedby={errors.location ? "pg-location-error" : undefined}
          />
          {errors.location && (
            <p id="pg-location-error" className="text-destructive text-xs">
              {errors.location}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="pg-rent">Monthly Rent (₹) *</Label>
          <Input
            id="pg-rent"
            type="number"
            placeholder="e.g. 7500"
            min="0"
            value={form.rent}
            onChange={(e) => setForm((f) => ({ ...f, rent: e.target.value }))}
            aria-describedby={errors.rent ? "pg-rent-error" : undefined}
          />
          {errors.rent && (
            <p id="pg-rent-error" className="text-destructive text-xs">
              {errors.rent}
            </p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="pg-contact">Contact Number *</Label>
          <Input
            id="pg-contact"
            placeholder="e.g. 9876543210"
            value={form.contact}
            onChange={(e) =>
              setForm((f) => ({ ...f, contact: e.target.value }))
            }
            aria-describedby={errors.contact ? "pg-contact-error" : undefined}
          />
          {errors.contact && (
            <p id="pg-contact-error" className="text-destructive text-xs">
              {errors.contact}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="pg-amenities">Amenities *</Label>
        <Input
          id="pg-amenities"
          placeholder="e.g. WiFi, AC, Meals, Laundry (comma separated)"
          value={form.amenities}
          onChange={(e) =>
            setForm((f) => ({ ...f, amenities: e.target.value }))
          }
          aria-describedby={errors.amenities ? "pg-amenities-error" : undefined}
        />
        {errors.amenities && (
          <p id="pg-amenities-error" className="text-destructive text-xs">
            {errors.amenities}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={addListing.isPending}
        className="w-full bg-brand-orange hover:opacity-90 text-white font-semibold"
      >
        {addListing.isPending && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        {addListing.isPending ? "Adding..." : "Add Listing"}
      </Button>
    </form>
  );
}

export default function PGSection() {
  const [sortByRent, setSortByRent] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { isAuthenticated, principal, login } = useAuth();
  const { data: profile } = useMyProfile(isAuthenticated);

  const allListings = useAllListings();
  const sortedListings = useListingsSortedByRent();

  const query = sortByRent ? sortedListings : allListings;
  const listings: Listing[] =
    query.data && query.data.length > 0 ? query.data : SEED_LISTINGS;

  function handleDelete(_id: bigint) {
    // Query already invalidated by mutation
  }

  return (
    <section id="find-pg" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
        >
          <div>
            <span className="text-sm font-semibold text-brand-orange uppercase tracking-widest">
              Accommodation
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold mt-1">
              Find Your Perfect PG or Flat
            </h2>
            <p className="text-muted-foreground mt-2 max-w-lg">
              Browse verified PG accommodations and flats posted by fellow
              students and landlords.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSortByRent((s) => !s)}
              className={`gap-2 font-medium rounded-xl border-2 transition-all ${
                sortByRent
                  ? "border-brand-orange text-brand-orange bg-brand-orange-light"
                  : "border-border"
              }`}
            >
              <ArrowUpDown className="w-4 h-4" />
              {sortByRent ? "Sorted by Rent" : "Sort by Rent"}
            </Button>

            {isAuthenticated && profile ? (
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-brand-orange hover:opacity-90 text-white font-semibold rounded-xl gap-2">
                    <Plus className="w-4 h-4" />
                    Add Listing
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="font-display text-xl">
                      Add a PG / Flat Listing
                    </DialogTitle>
                  </DialogHeader>
                  <AddListingForm
                    onSuccess={() => setDialogOpen(false)}
                    profileName={profile.name}
                  />
                </DialogContent>
              </Dialog>
            ) : (
              <Button
                variant="outline"
                onClick={login}
                className="gap-2 border-2 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white font-semibold rounded-xl transition-all"
              >
                <Lock className="w-4 h-4" />
                Login to Add
              </Button>
            )}
          </div>
        </motion.div>

        {/* Login prompt banner */}
        {!isAuthenticated && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 px-4 py-3 rounded-xl bg-brand-orange-light border border-brand-orange/20 flex items-center gap-3 text-sm"
          >
            <Lock className="w-4 h-4 text-brand-orange shrink-0" />
            <span className="text-foreground/75">
              <button
                type="button"
                onClick={login}
                className="font-semibold text-brand-orange hover:underline"
              >
                Login
              </button>{" "}
              to add your own PG listing and manage your posts.
            </span>
          </motion.div>
        )}

        {/* Grid */}
        {query.isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {["s1", "s2", "s3", "s4"].map((k) => (
              <Skeleton key={k} className="h-72 rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {listings.map((listing, i) => (
              <ListingCard
                key={String(listing.id)}
                listing={listing}
                index={i}
                isOwner={
                  isAuthenticated &&
                  !!principal &&
                  !!listing.ownerId &&
                  listing.ownerId === principal
                }
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
