# Settled IN

## Current State
- Full-stack app with Navbar, HeroSection, PGSection, FoodSection, TransportSection, LanguageSection, CommunitySection, Footer.
- Navbar has smooth-scroll links to all sections (Home, Find PG, Food, Transport, Language, Community) -- these already work via `scrollToSection`.
- A logo image already exists at `/assets/generated/settled-in-logo-transparent.dim_300x80.png` and is referenced in Navbar.
- PGSection has 3 rotating PG room photos (pg-room-1, pg-room-2, pg-room-3) but only 4 seed listings so the 4th reuses photo index 0.
- FoodSection has 4 food photos for 6 seed listings (last 2 reuse earlier photos).
- The logo image was generated in a previous round but may need visual improvement.

## Requested Changes (Diff)

### Add
- 3 more PG room photos (pg-room-4, pg-room-5, pg-room-6) so all 4+ seed listings have unique photos.
- A new, polished "Settled IN" logo image (wordmark with icon, transparent background).
- Wiring: Navbar section-scroll links should also close the mobile menu when tapped (already works -- no change needed).

### Modify
- Replace the existing logo image with the newly generated, higher-quality logo.
- Update PGSection's `PG_PHOTOS` array to include pg-room-4, pg-room-5, pg-room-6 so every listing gets a unique photo.
- Update FoodSection's `FOOD_PHOTOS_BY_INDEX` fallback array to include more photos so all 6 food cards have distinct images.

### Remove
- Nothing to remove.

## Implementation Plan
1. Generate a new Settled IN logo (transparent background, modern wordmark style).
2. Generate pg-room-4, pg-room-5, pg-room-6 PG room photos.
3. Generate 2 more food photos (food-cafe, food-dhaba) for the FoodSection fallback array.
4. Update PGSection to reference all 6 PG photos.
5. Update FoodSection to reference all 6 food photos (one per spot type).
6. Verify Navbar logo src matches the newly generated logo filename.
