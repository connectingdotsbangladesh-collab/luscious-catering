# Routes & Page Mapping — Luscious Haute Catering

- **Routing Architecture**: Next.js 14 App Router (`src/app/`)

## UI Routes

### 1. `/` — Home Page
- **Route File**: `src/app/page.tsx` (Server Component with SSR `fetchMenuItems()` and `fetchCateringPackages()`)
- **Client View**: `src/components/home/HomeClientView.tsx`
- **Root Layout**: `src/app/layout.tsx` (`ClientProviders` -> `AuthProvider` + `SmoothScrollProvider`)
- **Sections Rendered in Order**:
  1. **Navbar (`src/components/layout/Navbar.tsx`)**: Brand logo `luscious`, nav links (`Dumplings`, `Recipes`, `Food Menu`, `Order Now`), and orange outline `Login` pill button.
  2. **Section 1 — Hero (`src/components/hero/Hero.tsx`)**: `"Take a taste / Come join us."` headline, `"Life is so endlessly delicious."` subheading, editorial dumpling description, orange `"Explore Now"` pill button, top-left floating spice spoons (`/clean_spoons_hd.png`), and right-column steamed dumpling platter (`/clean_hero_food_hd.png`) over textured white stone (`/hero_bg_textured.jpg`).
  3. **Section 2 — Menu (`src/components/menu/MenuSection.tsx`, `#menu`)**: `"What's on our Plate"` heading, category tabs (`Appetizers`, `Main Dish`, `Dessert`) with sliding orange underline indicator, 3 circular dish cards (`Stirred Egg`, `Kung Pao Chicken`, `Sweet Pork Chops`), and floating snowpeas, lobster, and garlic greens decor.
  4. **Section 3 — Testimonials (`src/components/testimonials/TestimonialsSection.tsx`, `#testimonials`)**: Left-column scalloped noodle bowl (`/decor_noodle_bowl_hd.png`), right-column `"Let's see what other says"` heading, customer review quote, 3 interactive circular customer avatars, and floating star anise and bok choy decor.
  5. **Section 4 — Newsletter (`src/components/newsletter/NewsletterSection.tsx`, `#newsletter`)**: `"Easy receipes will send to your inbox"` heading, rounded white pill email form with orange `subscribe` button, and floating red bell pepper and broccoli skillet decor.
  6. **Section 5 — Footer (`src/components/layout/Footer.tsx`)**: 3-column links (`Get Cooking`, `Infomation`, `Follow Us`) with floating pink garlic bulb and purple onion ring decor.
  7. **Interactive Modals**: `BookingModal` (`src/components/booking/BookingModal.tsx`) and `AuthModal` (`src/components/auth/AuthModal.tsx`).

---

## API Routes

### 2. `GET /api/menu`
- **Route File**: `src/app/api/menu/route.ts`
- **Description**: Returns catering menu items from Firebase Firestore (with fallback to curated culinary data).

### 3. `POST /api/bookings`
- **Route File**: `src/app/api/bookings/route.ts`
- **Description**: Validates and stores catering reservation inquiries in Firebase Firestore.
