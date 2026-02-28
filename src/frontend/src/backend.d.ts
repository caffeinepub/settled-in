import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
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
export interface Listing {
    id: bigint;
    title: string;
    postedBy: string;
    contact: string;
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
export interface CommunityPost {
    id: bigint;
    city: string;
    name: string;
    message: string;
    timestamp: bigint;
    college: string;
}
export interface backendInterface {
    addCommunityPost(name: string, college: string, city: string, message: string): Promise<bigint>;
    addListing(title: string, location: string, rent: bigint, amenities: string, contact: string, postedBy: string): Promise<bigint>;
    getAllCommunityPosts(): Promise<Array<CommunityPost>>;
    getAllFoodSpots(): Promise<Array<FoodSpot>>;
    getAllLanguagePhrases(): Promise<Array<LanguagePhrase>>;
    getAllListings(): Promise<Array<Listing>>;
    getAllListingsSortedByRent(): Promise<Array<Listing>>;
    getAllTransportTips(): Promise<Array<TransportTip>>;
    getCommunityPostsByCollege(college: string): Promise<Array<CommunityPost>>;
    getDistinctColleges(): Promise<Array<string>>;
    getFoodSpotsByType(spotType: string): Promise<Array<FoodSpot>>;
    getLanguagePhrasesByLanguage(language: string): Promise<Array<LanguagePhrase>>;
    getListingById(id: bigint): Promise<Listing>;
    getListingsByLocation(location: string): Promise<Array<Listing>>;
    getTransportTipsByMode(mode: string): Promise<Array<TransportTip>>;
}
