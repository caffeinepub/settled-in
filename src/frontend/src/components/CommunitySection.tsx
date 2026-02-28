import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  GraduationCap,
  Loader2,
  Lock,
  MapPin,
  MessageSquarePlus,
  Plus,
  Trash2,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { CommunityPost } from "../backend.d";
import { useAuth } from "../hooks/useAuth";
import { useMyProfile } from "../hooks/useQueries";
import {
  useAddCommunityPost,
  useAllCommunityPosts,
  useDeleteCommunityPost,
  useDistinctColleges,
} from "../hooks/useQueries";

const SEED_POSTS: CommunityPost[] = [
  {
    id: 1n,
    name: "Ananya Krishnan",
    college: "IISc Bangalore",
    city: "Bangalore",
    message:
      "Hey! Just moved from Chennai to Bangalore for my M.Tech. Looking for study partners and someone to explore Indiranagar with. Also learning Kannada — any tips?",
    timestamp: BigInt(Date.now() - 86400000),
  },
  {
    id: 2n,
    name: "Rohan Mehta",
    college: "IIT Bombay",
    city: "Mumbai",
    message:
      "First year CSE here! From Jaipur, missing the daal-bati. Anyone else from Rajasthan? Looking for a cricket gang on weekends and PG flatmates in Powai.",
    timestamp: BigInt(Date.now() - 172800000),
  },
  {
    id: 3n,
    name: "Priya Nair",
    college: "NIT Trichy",
    city: "Trichy",
    message:
      "Moved from Delhi, still getting used to the heat! My Tamil is zero 😅. Would love to join a language exchange group. Also great at cooking North Indian food — potluck anyone?",
    timestamp: BigInt(Date.now() - 259200000),
  },
  {
    id: 4n,
    name: "Karan Singh",
    college: "VIT Vellore",
    city: "Vellore",
    message:
      "Punjab to Vellore — what a journey! Looking for badminton players and a good dhaba nearby. Happy to help seniors with anything Punjab-related.",
    timestamp: BigInt(Date.now() - 345600000),
  },
  {
    id: 5n,
    name: "Deepika Rao",
    college: "BITS Pilani",
    city: "Pilani",
    message:
      "Hyderabad girl in the middle of Rajasthan! Missing biryani badly 😂. Anyone want to start a weekly cooking club at the hostel? Also looking for startup co-founders!",
    timestamp: BigInt(Date.now() - 432000000),
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function timeAgo(timestamp: bigint) {
  const diff = Date.now() - Number(timestamp);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor(diff / 3600000);
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  return "Just now";
}

const AVATAR_COLORS = [
  "bg-orange-200 text-orange-800",
  "bg-teal-200 text-teal-800",
  "bg-purple-200 text-purple-800",
  "bg-amber-200 text-amber-800",
  "bg-pink-200 text-pink-800",
];

function PostCard({
  post,
  index,
  isOwner,
}: {
  post: CommunityPost;
  index: number;
  isOwner: boolean;
}) {
  const avatarColor = AVATAR_COLORS[index % AVATAR_COLORS.length];
  const deletePost = useDeleteCommunityPost();

  async function handleDelete() {
    try {
      await deletePost.mutateAsync(post.id);
      toast.success("Post removed.");
    } catch {
      toast.error("Failed to delete post.");
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Card className="shadow-card hover:shadow-card-hover transition-shadow duration-200 rounded-2xl">
        <CardHeader className="pb-3">
          <div className="flex items-start gap-3">
            <Avatar className={`h-10 w-10 shrink-0 ${avatarColor}`}>
              <AvatarFallback className={`text-sm font-bold ${avatarColor}`}>
                {getInitials(post.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="font-semibold text-sm">{post.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    {timeAgo(post.timestamp)}
                  </span>
                  {isOwner && (
                    <button
                      type="button"
                      onClick={handleDelete}
                      disabled={deletePost.isPending}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive"
                      aria-label="Delete post"
                    >
                      {deletePost.isPending ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3 mt-1 flex-wrap">
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <GraduationCap className="w-3 h-3 text-brand-orange" />
                  {post.college}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3 text-brand-teal" />
                  {post.city}
                </span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-foreground/75 leading-relaxed">
            {post.message}
          </p>
          <div className="mt-3 flex items-center gap-2">
            <Badge
              variant="secondary"
              className="text-xs bg-brand-orange-light text-brand-orange border-0"
            >
              {post.city}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function PostForm({
  onSuccess,
  profileName,
  profileCollege,
  profileCity,
}: {
  onSuccess: () => void;
  profileName: string;
  profileCollege: string;
  profileCity: string;
}) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const addPost = useAddCommunityPost();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) {
      setError("Message is required");
      return;
    }
    if (message.length > 400) {
      setError("Message must be under 400 characters");
      return;
    }
    setError("");
    try {
      await addPost.mutateAsync({
        name: profileName,
        college: profileCollege,
        city: profileCity,
        message: message.trim(),
      });
      toast.success("Introduction posted! 🎉");
      onSuccess();
    } catch {
      toast.error("Failed to post. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* Profile info display */}
      <div className="px-3 py-2 bg-brand-teal/10 rounded-lg space-y-1">
        <p className="text-xs text-muted-foreground">Posting as:</p>
        <p className="text-sm font-semibold">{profileName}</p>
        <p className="text-xs text-muted-foreground">
          {profileCollege} · {profileCity}
        </p>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="post-message">
          Your Introduction *{" "}
          <span className="text-muted-foreground font-normal">
            ({message.length}/400)
          </span>
        </Label>
        <Textarea
          id="post-message"
          placeholder="Tell others where you're from, what you study, what you're looking for — a study group, food buddies, sports team..."
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          aria-describedby={error ? "post-message-error" : undefined}
          maxLength={400}
        />
        {error && (
          <p id="post-message-error" className="text-destructive text-xs">
            {error}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={addPost.isPending}
        className="w-full bg-brand-teal hover:opacity-90 text-white font-semibold"
      >
        {addPost.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {addPost.isPending ? "Posting..." : "Post Introduction"}
      </Button>
    </form>
  );
}

export default function CommunitySection() {
  const [selectedCollege, setSelectedCollege] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const { isAuthenticated, principal, login } = useAuth();
  const { data: profile } = useMyProfile(isAuthenticated);

  const { data: colleges } = useDistinctColleges();
  const { data: fetchedPosts, isLoading } = useAllCommunityPosts(
    selectedCollege === "all" ? undefined : selectedCollege,
  );

  const posts: CommunityPost[] =
    fetchedPosts && fetchedPosts.length > 0
      ? fetchedPosts
      : selectedCollege === "all"
        ? SEED_POSTS
        : SEED_POSTS.filter((p) => p.college === selectedCollege);

  const allColleges: string[] =
    colleges && colleges.length > 0
      ? colleges
      : Array.from(new Set(SEED_POSTS.map((p) => p.college)));

  return (
    <section
      id="community"
      className="py-20"
      style={{ background: "oklch(0.97 0.01 80)" }}
    >
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
        >
          <div>
            <span className="text-sm font-semibold text-brand-teal uppercase tracking-widest">
              Your tribe awaits
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold mt-1 flex items-center gap-3">
              Find Your People
              <Users className="w-8 h-8 text-brand-teal" />
            </h2>
            <p className="text-muted-foreground mt-2 max-w-lg">
              Post your introduction and connect with students from your college
              or city.
            </p>
          </div>

          {isAuthenticated && profile ? (
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-brand-teal hover:opacity-90 text-white font-semibold rounded-xl gap-2 shrink-0">
                  <Plus className="w-4 h-4" />
                  Post Introduction
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="font-display text-xl">
                    Introduce Yourself 👋
                  </DialogTitle>
                </DialogHeader>
                <PostForm
                  onSuccess={() => setDialogOpen(false)}
                  profileName={profile.name}
                  profileCollege={profile.college}
                  profileCity={profile.city}
                />
              </DialogContent>
            </Dialog>
          ) : (
            <Button
              variant="outline"
              onClick={login}
              className="gap-2 border-2 border-brand-teal text-brand-teal hover:bg-brand-teal hover:text-white font-semibold rounded-xl transition-all shrink-0"
            >
              <Lock className="w-4 h-4" />
              Login to Post
            </Button>
          )}
        </motion.div>

        {/* Login prompt */}
        {!isAuthenticated && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 px-4 py-3 rounded-xl bg-brand-teal/10 border border-brand-teal/20 flex items-center gap-3 text-sm"
          >
            <MessageSquarePlus className="w-4 h-4 text-brand-teal shrink-0" />
            <span className="text-foreground/75">
              <button
                type="button"
                onClick={login}
                className="font-semibold text-brand-teal hover:underline"
              >
                Login
              </button>{" "}
              to introduce yourself and connect with fellow students.
            </span>
          </motion.div>
        )}

        {/* College filter */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <span className="text-sm font-medium text-muted-foreground shrink-0">
            Filter by college:
          </span>
          <Select value={selectedCollege} onValueChange={setSelectedCollege}>
            <SelectTrigger className="w-56 rounded-xl border-2 border-border focus:border-brand-teal">
              <SelectValue placeholder="All Colleges" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Colleges</SelectItem>
              {allColleges.map((college) => (
                <SelectItem key={college} value={college}>
                  {college}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {["s1", "s2", "s3"].map((k) => (
              <Skeleton key={k} className="h-48 rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post, i) => (
              <PostCard
                key={String(post.id)}
                post={post}
                index={i}
                isOwner={
                  isAuthenticated &&
                  !!principal &&
                  !!post.ownerId &&
                  post.ownerId === principal
                }
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
