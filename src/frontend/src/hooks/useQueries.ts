import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  CommunityPost,
  FoodSpot,
  LanguagePhrase,
  Listing,
  TransportTip,
  UserProfile,
} from "../backend.d";
import { useActor } from "./useActor";

// ── User Profile ──────────────────────────────────────────
export function useMyProfile(enabled = true) {
  const { actor, isFetching } = useActor();
  return useQuery<UserProfile | null>({
    queryKey: ["my-profile"],
    queryFn: async () => {
      if (!actor) return null;
      try {
        return await actor.getCallerUserProfile();
      } catch {
        return null;
      }
    },
    enabled: !!actor && !isFetching && enabled,
  });
}

export function useUpsertProfile() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      college: string;
      city: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.upsertProfile(data.name, data.college, data.city);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["my-profile"] });
    },
  });
}

// ── Listings ──────────────────────────────────────────────
export function useAllListings() {
  const { actor, isFetching } = useActor();
  return useQuery<Listing[]>({
    queryKey: ["listings"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllListings();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useListingsSortedByRent() {
  const { actor, isFetching } = useActor();
  return useQuery<Listing[]>({
    queryKey: ["listings-sorted"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllListingsSortedByRent();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddListing() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      title: string;
      location: string;
      rent: bigint;
      amenities: string;
      contact: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.addListing(
        data.title,
        data.location,
        data.rent,
        data.amenities,
        data.contact,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["listings"] });
      qc.invalidateQueries({ queryKey: ["listings-sorted"] });
    },
  });
}

export function useDeleteListing() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.deleteListing(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["listings"] });
      qc.invalidateQueries({ queryKey: ["listings-sorted"] });
    },
  });
}

// ── Food Spots ─────────────────────────────────────────────
export function useAllFoodSpots(type?: string) {
  const { actor, isFetching } = useActor();
  return useQuery<FoodSpot[]>({
    queryKey: ["food-spots", type ?? "all"],
    queryFn: async () => {
      if (!actor) return [];
      if (type && type !== "all") {
        return actor.getFoodSpotsByType(type);
      }
      return actor.getAllFoodSpots();
    },
    enabled: !!actor && !isFetching,
  });
}

// ── Transport Tips ─────────────────────────────────────────
export function useAllTransportTips(mode?: string) {
  const { actor, isFetching } = useActor();
  return useQuery<TransportTip[]>({
    queryKey: ["transport-tips", mode ?? "all"],
    queryFn: async () => {
      if (!actor) return [];
      if (mode && mode !== "all") {
        return actor.getTransportTipsByMode(mode);
      }
      return actor.getAllTransportTips();
    },
    enabled: !!actor && !isFetching,
  });
}

// ── Language Phrases ──────────────────────────────────────
export function useAllLanguagePhrases(language?: string) {
  const { actor, isFetching } = useActor();
  return useQuery<LanguagePhrase[]>({
    queryKey: ["language-phrases", language ?? "all"],
    queryFn: async () => {
      if (!actor) return [];
      if (language && language !== "all") {
        return actor.getLanguagePhrasesByLanguage(language);
      }
      return actor.getAllLanguagePhrases();
    },
    enabled: !!actor && !isFetching,
  });
}

// ── Community Posts ───────────────────────────────────────
export function useAllCommunityPosts(college?: string) {
  const { actor, isFetching } = useActor();
  return useQuery<CommunityPost[]>({
    queryKey: ["community-posts", college ?? "all"],
    queryFn: async () => {
      if (!actor) return [];
      if (college && college !== "all") {
        return actor.getCommunityPostsByCollege(college);
      }
      return actor.getAllCommunityPosts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useDistinctColleges() {
  const { actor, isFetching } = useActor();
  return useQuery<string[]>({
    queryKey: ["distinct-colleges"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getDistinctColleges();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddCommunityPost() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      college: string;
      city: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.addCommunityPost(
        data.name,
        data.college,
        data.city,
        data.message,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["community-posts"] });
      qc.invalidateQueries({ queryKey: ["distinct-colleges"] });
    },
  });
}

export function useDeleteCommunityPost() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.deleteCommunityPost(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["community-posts"] });
      qc.invalidateQueries({ queryKey: ["distinct-colleges"] });
    },
  });
}
