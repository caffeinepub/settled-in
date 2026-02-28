import Map "mo:core/Map";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Set "mo:core/Set";
import Array "mo:core/Array";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";


actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
    college : Text;
    city : Text;
  };

  public type Listing = {
    id : Nat;
    title : Text;
    location : Text;
    rent : Nat;
    amenities : Text;
    contact : Text;
    ownerId : ?Text;
    postedBy : Text;
    timestamp : Int;
  };

  module Listing {
    public func compareByRent(listing1 : Listing, listing2 : Listing) : Order.Order {
      switch (Nat.compare(listing1.rent, listing2.rent)) {
        case (#equal) { Nat.compare(listing1.id, listing2.id) };
        case (order) { order };
      };
    };
  };

  public type CommunityPost = {
    id : Nat;
    name : Text;
    college : Text;
    city : Text;
    message : Text;
    ownerId : ?Text;
    timestamp : Int;
  };

  public type FoodSpot = {
    id : Nat;
    name : Text;
    spotType : Text;
    location : Text;
    priceRange : Text;
    description : Text;
  };

  public type TransportTip = {
    id : Nat;
    title : Text;
    description : Text;
    mode : Text;
  };

  public type LanguagePhrase = {
    id : Nat;
    phrase : Text;
    meaning : Text;
    language : Text;
  };

  var nextListingId = 1;
  var nextCommunityPostId = 1;

  let userProfileStore = Map.empty<Principal, UserProfile>();
  let listingStore = Map.empty<Nat, Listing>();
  let communityPostStore = Map.empty<Nat, CommunityPost>();

  let foodSpotsStore = List.fromArray<FoodSpot>([
    { id = 1; name = "Student Pride Mess"; spotType = "mess"; location = "M G Road"; priceRange = "₹70-120"; description = "Daily thali with homely meals. " },
    {
      id = 2;
      name = "Campus Canteen";
      spotType = "canteen";
      location = "University";
      priceRange = "₹30-100";
      description = "Affordable snacks, South Indian dishes, and beverages.";
    },
    {
      id = 3;
      name = "Youth Point";
      spotType = "restaurant";
      location = "Koregaon Park";
      priceRange = "₹150-300";
      description = "Popular hangout spot for fast food, burgers, and shakes.";
    },
    {
      id = 4;
      name = "North Indian Delight";
      spotType = "mess";
      location = "Baner";
      priceRange = "₹80-150";
      description = "North Indian cuisine with meal plans for students.";
    },
  ]);

  let transportTipsStore = List.fromArray<TransportTip>([
    { id = 1; title = "Local Bus Guide"; description = "Use Paytm or local transport app to check bus routes and schedules. Buy monthly passes for discounts."; mode = "bus" },
    { id = 2; title = "Metro Connectivity"; description = "Metro covers key areas; look for student season passes for cost savings. Peak hours are 8-10am and 6-8pm."; mode = "metro" },
    { id = 3; title = "Affordable Auto Fares"; description = "Negotiate fares or use fare calculator apps to avoid overcharging. Opt for shared autos when available."; mode = "auto" },
    { id = 4; title = "Bike Rentals"; description = "Affordable bike rental services available for daily/weekly use. Always wear helmets for safety."; mode = "bike" },
  ]);

  let languagePhrasesStore = List.fromArray<LanguagePhrase>([
    { id = 1; phrase = "Kaay mhantay?"; meaning = "What's up?"; language = "Marathi" },
    { id = 2; phrase = "Chalo bai"; meaning = "Let's go"; language = "Hindi" },
    { id = 3; phrase = "Kitne ka hai?"; meaning = "How much is this?"; language = "Hindi" },
    { id = 4; phrase = "Kasa aahes?"; meaning = "How are you?"; language = "Marathi" },
  ]);

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfileStore.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfileStore.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfileStore.add(caller, profile);
  };

  public shared ({ caller }) func upsertProfile(name : Text, college : Text, city : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };

    let profile : UserProfile = { name; college; city };
    userProfileStore.add(caller, profile);
  };

  public query ({ caller }) func getMyProfile() : async UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    switch (userProfileStore.get(caller)) {
      case (null) { Runtime.trap("No profile data exists for caller principal. Please log-in and create a profile.") };
      case (?profile) { profile };
    };
  };

  public shared ({ caller }) func addListing(title : Text, location : Text, rent : Nat, amenities : Text, contact : Text) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add listings");
    };

    let profile = switch (userProfileStore.get(caller)) {
      case (null) {
        Runtime.trap("Profile does not exist for caller. Please create a profile first.");
      };
      case (?profile) { profile };
    };

    let listing : Listing = {
      id = nextListingId;
      title;
      location;
      rent;
      amenities;
      contact;
      postedBy = profile.name;
      ownerId = null;
      timestamp = Time.now();
    };
    listingStore.add(nextListingId, listing);
    nextListingId += 1;
    listing.id;
  };

  public query ({ caller }) func getListingById(id : Nat) : async Listing {
    switch (listingStore.get(id)) {
      case (null) { Runtime.trap("Listing does not exist") };
      case (?listing) { listing };
    };
  };

  public query ({ caller }) func getAllListings() : async [Listing] {
    listingStore.values().toArray();
  };

  public query ({ caller }) func getAllListingsSortedByRent() : async [Listing] {
    listingStore.values().toArray().sort(Listing.compareByRent);
  };

  public shared ({ caller }) func deleteListing(id : Nat) : async () {
    let existing = switch (listingStore.get(id)) {
      case (null) {
        Runtime.trap("Listing does not exist");
      };
      case (?listing) { listing };
    };
    listingStore.remove(id);
  };

  public query ({ caller }) func getListingsByLocation(location : Text) : async [Listing] {
    let filteredList = listingStore.values().toList<Listing>().filter(
      func(l) { l.location == location }
    );
    filteredList.toArray();
  };

  public shared ({ caller }) func addCommunityPost(name : Text, college : Text, city : Text, message : Text) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add community posts");
    };

    let post : CommunityPost = {
      id = nextCommunityPostId;
      name;
      college;
      city;
      message;
      ownerId = null;
      timestamp = Time.now();
    };
    communityPostStore.add(nextCommunityPostId, post);
    nextCommunityPostId += 1;
    post.id;
  };

  public shared ({ caller }) func deleteCommunityPost(id : Nat) : async () {
    let _ = switch (communityPostStore.get(id)) {
      case (null) { Runtime.trap("Post does not exist") };
      case (?post) { post };
    };
    communityPostStore.remove(id);
  };

  public query ({ caller }) func getAllCommunityPosts() : async [CommunityPost] {
    communityPostStore.values().toArray();
  };

  public query ({ caller }) func getCommunityPostsByCollege(college : Text) : async [CommunityPost] {
    let filteredList = communityPostStore.values().toList<CommunityPost>().filter(
      func(p) { p.college == college }
    );
    filteredList.toArray();
  };

  public query ({ caller }) func getDistinctColleges() : async [Text] {
    let collegeSet = Set.empty<Text>();
    communityPostStore.values().forEach(
      func(post) { collegeSet.add(post.college) }
    );
    collegeSet.toArray();
  };

  public query ({ caller }) func getAllFoodSpots() : async [FoodSpot] {
    foodSpotsStore.toArray();
  };

  public query ({ caller }) func getFoodSpotsByType(spotType : Text) : async [FoodSpot] {
    let filteredList = foodSpotsStore.filter(
      func(f) { f.spotType == spotType }
    );
    filteredList.toArray();
  };

  public query ({ caller }) func getAllTransportTips() : async [TransportTip] {
    transportTipsStore.toArray();
  };

  public query ({ caller }) func getTransportTipsByMode(mode : Text) : async [TransportTip] {
    let filteredList = transportTipsStore.filter(
      func(t) { t.mode == mode }
    );
    filteredList.toArray();
  };

  public query ({ caller }) func getAllLanguagePhrases() : async [LanguagePhrase] {
    languagePhrasesStore.toArray();
  };

  public query ({ caller }) func getLanguagePhrasesByLanguage(language : Text) : async [LanguagePhrase] {
    let filteredList = languagePhrasesStore.filter(
      func(l) { l.language == language }
    );
    filteredList.toArray();
  };
};
