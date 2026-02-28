# Settled IN

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Landing page introducing "Settled IN" — a platform helping outstation college students settle into a new city
- Five core solution sections addressing student pain points:
  1. **PG/Flat Finder** — Browse and post PG/flat listings with details (location, rent, amenities, photos)
  2. **Food Guide** — Discover nearby mess, canteens, tiffin services, and restaurants with student-friendly prices
  3. **Transport Tips** — Local commute guide: bus routes, metro, auto/cab tips, and bike rentals
  4. **Local Language** — Quick-learn common phrases in the local language to ease communication
  5. **Social Circle** — Community board where students can post introductions, find roommates, and join city-specific groups
- Navigation with smooth section scrolling
- Hero section with tagline and CTA
- Student-posted listings and community posts (backend-stored)
- Ability to add a PG/flat listing (form with title, location, rent, amenities, contact)
- Ability to post a community intro/message (form with name, college, message)
- Sample seed data for listings and community posts

### Modify
- None

### Remove
- None

## Implementation Plan
1. Backend: Define data types and APIs for:
   - PG/flat listings (create, list, get by id)
   - Food spots (list, seeded data)
   - Community posts (create, list)
   - Language phrases (seeded static data)
   - Transport tips (seeded static data)
2. Frontend: 
   - Navbar with "Settled IN" branding and section links
   - Hero section with bold tagline and CTA button
   - PG/Flat section: listing cards + "Add Listing" form
   - Food section: cards with mess/restaurant info
   - Transport section: tips cards
   - Language section: phrase cards (local phrase + meaning)
   - Community/Social section: post feed + "Post Introduction" form
   - Footer with branding
