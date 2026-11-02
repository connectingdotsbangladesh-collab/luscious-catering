# Page Component Dependency Trees — Luscious Haute Catering

## `/` (Home Page)
Entry: `src/app/page.tsx`
Layout: `src/app/layout.tsx`
  - `src/app/globals.css`
    - `src/styles/variables.css`
    - `src/styles/animations.css`
  - `src/components/providers/ClientProviders.tsx`
    - `src/lib/firebase/authContext.tsx`
      - `src/lib/firebase/config.ts`
    - `src/components/providers/SmoothScrollProvider.tsx`
Dependencies:
- `src/lib/firebase/firestoreService.ts`
  - `src/lib/firebase/config.ts`
  - `src/repositories/firebase/mockData.ts`
  - `src/domain/types.ts`
- `src/components/home/HomeClientView.tsx`
  - `src/domain/types.ts`
  - `src/components/layout/Navbar.tsx`
    - `src/components/layout/Navbar.module.css`
    - `src/lib/firebase/authContext.tsx`
    - `src/lib/animations/useMagnetic.ts`
  - `src/components/hero/Hero.tsx`
    - `src/components/hero/Hero.module.css`
    - `src/lib/animations/useMagnetic.ts`
  - `src/components/menu/MenuSection.tsx`
    - `src/components/menu/MenuSection.module.css`
    - `src/domain/types.ts`
  - `src/components/testimonials/TestimonialsSection.tsx`
    - `src/components/testimonials/TestimonialsSection.module.css`
  - `src/components/newsletter/NewsletterSection.tsx`
    - `src/components/newsletter/NewsletterSection.module.css`
    - `src/lib/animations/useMagnetic.ts`
  - `src/components/layout/Footer.tsx`
    - `src/components/layout/Footer.module.css`
  - `src/components/booking/BookingModal.tsx`
    - `src/components/booking/Booking.module.css`
    - `src/domain/types.ts`
    - `src/lib/firebase/firestoreService.ts`
  - `src/components/auth/AuthModal.tsx`
    - `src/components/auth/Auth.module.css`
    - `src/lib/firebase/authContext.tsx`
