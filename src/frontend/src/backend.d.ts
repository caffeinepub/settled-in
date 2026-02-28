import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Listing {
    id: bigint;
    title: string;
    postedBy: string;
    contact: string;
    ownerId?: string;
    rent: bigint;
    amenities: string;
    timestamp: bigint;
    location: string;
}
export interface TransportTip {
    id: bigint;
    title: string;
    mode: string;
    description: string;
}
export interface LanguagePhrase {
    id: bigint;
    meaning: string;
    language: string;
    phrase: string;
}
export interface FoodSpot {
    id: bigint;
    spotType: string;
    name: string;
    description: string;
    priceRange: string;
    location: string;
}
export interface CommunityPost {
    id: bigint;
    ownerId?: string;
    city: string;
    name: string;
    message: string;
    timestamp: bigint;
    college: string;
}
export interface UserProfile {
    city: string;
    name: string;
    college: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addCommunityPost(name: string, college: string, city: string, message: string): Promise<bigint>;
    addListing(title: string, location: string, rent: bigint, amenities: string, contact: string): Promise<bigint>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteCommunityPost(id: bigint): Promise<void>;
    deleteListing(id: bigint): Promise<void>;
    getAllCommunityPosts(): Promise<Array<CommunityPost>>;
    getAllFoodSpots(): Promise<Array<FoodSpot>>;
    getAllLanguagePhrases(): Promise<Array<LanguagePhrase>>;
    getAllListings(): Promise<Array<Listing>>;
    getAllListingsSortedByRent(): Promise<Array<Listing>>;
    getAllTransportTips(): Promise<Array<TransportTip>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCommunityPostsByCollege(college: string): Promise<Array<CommunityPost>>;
    getDistinctColleges(): Promise<Array<string>>;
    getFoodSpotsByType(spotType: string): Promise<Array<FoodSpot>>;
    getLanguagePhrasesByLanguage(language: string): Promise<Array<LanguagePhrase>>;
    getListingById(id: bigint): Promise<Listing>;
    getListingsByLocation(location: string): Promise<Array<Listing>>;
    getMyProfile(): Promise<UserProfile>;
    getTransportTipsByMode(mode: string): Promise<Array<TransportTip>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    upsertProfile(name: string, college: string, city: string): Promise<void>;
}
