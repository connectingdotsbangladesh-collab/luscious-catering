# Luscious Haute Catering & Events 🥟✨

> A luxury catering web application built with **Next.js (SSR / Server-Side Rendering)**, **Custom CSS Modules & Variables (No Tailwind)**, and **Firebase (Firestore & Auth)**, structured with **Clean Domain-Driven Architecture**. Inspired by the high-end editorial catering Pinterest aesthetic.

---

## 🌟 Key Features

1. **Pinterest-Accurate Culinary Parallax Hero**:
   - Matches the Pinterest reference design (`luscious` brand identity, editorial serif typography, warm terracotta accent button, and floating organic food props).
   - Interactive 3D mouse parallax effect: Wooden spoons with turmeric & paprika, artisan dumpling platter with bamboo chopsticks, ceramic dipping sauce bowl with fresh basil, vine tomatoes, purple onions, and cracked peppercorn particles.
2. **Server-Side Rendered (SSR) Menus & Packages**:
   - Server Components (`src/app/page.tsx`) dynamically pre-render catering catalogues with Firestore data.
   - Built-in graceful fallback seed data ensures zero crashes whether Firebase keys are present or running offline.
3. **Interactive Catering Quote Calculator**:
   - Real-time guest slider (15 to 350+ guests).
   - Event types (Weddings, Corporate Galas, Private Dinners).
   - Live Chef Dim Sum Steaming Station & Craft Mixology Bar add-ons.
   - Instant cost breakdown per person and total with 1-click lock-in.
4. **Firebase Integration**:
   - **Firestore**: Catering inquiries and quote reservations stored in `catering_inquiries` collection.
   - **Firebase Auth**: User accounts for event planners, with instant guest sign-in fallback.
5. **Pure Custom CSS**:
   - Modular CSS variables (`variables.css`).
   - Component-scoped CSS modules (`*.module.css`).
   - Smooth cubic-bezier transitions, glassmorphism, and responsive breakpoints.

---

## 🏗️ Architecture Overview

```
src/
├── domain/                      # Enterprise Domain Layer (Pure TS Types & Rules)
│   └── types.ts                 # MenuItem, CateringPackage, QuoteRequest, BookingInquiry
├── services/                    # Business Logic Layer
│   └── quoteCalculator.ts       # Dynamic pricing formulas & breakdown generator
├── repositories/                # Data Access Layer
│   └── firebase/
│       ├── config.ts            # Resilient Firebase Client init (Graceful Fallback)
│       ├── firestoreService.ts  # Firestore CRUD operations for inquiries & menu
│       └── mockData.ts          # Curated Michelin-inspired seed catalog
├── components/                  # Presentation Layer (Custom CSS Modules)
│   ├── layout/                  # Navbar, Footer
│   ├── hero/                    # 3D Parallax Culinary Hero
│   ├── menu/                    # Filterable Catering Menu with Dietary Tabs
│   ├── packages/                # All-Inclusive Event Packages
│   ├── calculator/              # Dynamic Catering Quote Estimator
│   ├── booking/                 # Concierge Reservation Modal (Firestore connected)
│   ├── auth/                    # Firebase Authentication Modal
│   └── home/                    # Client View Orchestrator
└── app/                         # Next.js App Router (SSR)
    ├── layout.tsx               # Root Layout with Font & Meta Optimization
    ├── page.tsx                 # Server Component (SSR Data Fetcher)
    ├── globals.css              # Custom CSS Reset & Animations
    └── api/                     # Backend API Routes
        ├── bookings/route.ts    # POST /api/bookings
        └── menu/route.ts        # GET /api/menu
```

---

## 🚀 Getting Started

### 1. Run the Development Server

```bash
cd luscious-catering
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### 2. Configure Firebase (Optional but Recommended)

Copy `.env.example` to `.env.local` and add your Firebase credentials from the [Firebase Console](https://console.firebase.google.com/):

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-app.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef
```

*Note: The application includes an intelligent offline/mock fallback mechanism, meaning you can run and demonstrate every feature immediately even before setting up Firebase credentials!*
