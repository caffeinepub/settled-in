import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, Loader2, MapPin, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../hooks/useAuth";
import { useMyProfile, useUpsertProfile } from "../hooks/useQueries";

export default function ProfileSetupModal() {
  const { isAuthenticated } = useAuth();
  const { data: profile, isLoading: profileLoading } =
    useMyProfile(isAuthenticated);
  const upsertProfile = useUpsertProfile();
  const [form, setForm] = useState({ name: "", college: "", city: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Only show when authenticated and profile is null (not yet set up)
  const shouldShow = isAuthenticated && !profileLoading && profile === null;

  function validate() {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.college.trim()) errs.college = "College is required";
    if (!form.city.trim()) errs.city = "City is required";
    return errs;
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
      await upsertProfile.mutateAsync({
        name: form.name.trim(),
        college: form.college.trim(),
        city: form.city.trim(),
      });
      toast.success("Welcome to Settled IN! 🎉");
    } catch {
      toast.error("Failed to save profile. Please try again.");
    }
  }

  return (
    <Dialog open={shouldShow} onOpenChange={() => {}}>
      <DialogContent
        className="sm:max-w-md"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-brand-orange-light flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-brand-orange" />
            </div>
            <DialogTitle className="font-display text-xl">
              Welcome! Let's set you up
            </DialogTitle>
          </div>
          <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
            Tell us a bit about yourself so other students can find you and
            listings can show your name.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2" noValidate>
          <div className="space-y-1.5">
            <Label htmlFor="profile-name" className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-brand-orange" />
              Your Full Name *
            </Label>
            <Input
              id="profile-name"
              placeholder="e.g. Rahul Sharma"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              aria-describedby={errors.name ? "profile-name-error" : undefined}
            />
            {errors.name && (
              <p id="profile-name-error" className="text-destructive text-xs">
                {errors.name}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="profile-college"
              className="flex items-center gap-1.5"
            >
              <GraduationCap className="w-3.5 h-3.5 text-brand-orange" />
              College / University *
            </Label>
            <Input
              id="profile-college"
              placeholder="e.g. IIT Bombay"
              value={form.college}
              onChange={(e) =>
                setForm((f) => ({ ...f, college: e.target.value }))
              }
              aria-describedby={
                errors.college ? "profile-college-error" : undefined
              }
            />
            {errors.college && (
              <p
                id="profile-college-error"
                className="text-destructive text-xs"
              >
                {errors.college}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="profile-city" className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-brand-teal" />
              Current City *
            </Label>
            <Input
              id="profile-city"
              placeholder="e.g. Bangalore"
              value={form.city}
              onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
              aria-describedby={errors.city ? "profile-city-error" : undefined}
            />
            {errors.city && (
              <p id="profile-city-error" className="text-destructive text-xs">
                {errors.city}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={upsertProfile.isPending}
            className="w-full bg-brand-orange hover:opacity-90 text-white font-semibold mt-2"
          >
            {upsertProfile.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {upsertProfile.isPending ? "Saving..." : "Get Started →"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
