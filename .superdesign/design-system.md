# Design System — Luscious Haute Catering

## 1. Product Context & Architecture
- **Brand Name**: `luscious` (Luscious Haute Catering — Artisanal Dim Sum, Banquets & Luxury Galas)
- **Stack**: Next.js 14 (App Router, SSR), React 18, Custom CSS Modules, GSAP + ScrollTrigger + Lenis Smooth Scroll, Firebase Authentication & Firestore.
- **Core User Journey**:
  1. **Hero (`Hero.tsx`)**: Editorial introduction (*"Take a taste / Come join us. / Life is so endlessly delicious."*) paired with overhead artisanal dumpling platter and floating spice spoons.
  2. **Interactive Plate Showcase (`MenuSection.tsx`)**: *"What's on our Plate"* with category tabs (`Appetizers`, `Main Dish`, `Dessert`) and 3 circular overhead dish plates (`Stirred Egg`, `Kung Pao Chicken`, `Sweet Pork Chops`). Clicking any dish opens the `BookingModal` prefilled with that dish.
  3. **Social Proof (`TestimonialsSection.tsx`)**: *"Let's see what other says"* paired with a scalloped noodle bowl and interactive customer avatar selector (`Marcus Chen`, `Sarah Jenkins`, `David Laurent`).
  4. **Newsletter (`NewsletterSection.tsx`)**: *"Easy receipes will send to your inbox"* with a rounded white pill input bar and persimmon-orange `subscribe` button, framed by floating culinary cutouts.
  5. **Footer (`Footer.tsx`)**: 3-column directory (`Get Cooking`, `Infomation`, `Follow Us`) with floating garlic bulb and onion ring cutouts.

## 2. Color Palette
- **Canvas Background**: `#f7f5f2` / `#f9f7f4` (Warm Alabaster / Textured White Stone)
- **Elevated Surface**: `#ffffff`
- **Primary Accent (Persimmon Orange)**: `#eb5722` (Hover: `#d34411`, Soft Fill: `#fff2ed`, Glow: `rgba(235, 87, 34, 0.35)`)
- **Secondary Accent (Warm Amber)**: `#f59e0b` / `#c99a3e` (Active testimonial avatar ring)
- **Primary Ink**: `#1a1a1a`
- **Secondary / Muted Copy**: `#66625c` / `#8c8984` / `#99958e`
- **Subtle Borders**: `rgba(0, 0, 0, 0.05)` to `rgba(30, 26, 20, 0.16)`

## 3. Typography
- **Display & Headings (`--font-serif`)**: `'Playfair Display', Georgia, serif`
  - Brand Wordmark (`luscious`): `26px`, `700` bold italic, `#1a1a1a`, `letter-spacing: -0.02em`
  - Hero Headline (`H1`): `56px`, `800` weight, `line-height: 1.12`, `letter-spacing: -0.025em`
  - Hero Subheading (`H2`): `28px`, `400` weight, `line-height: 1.3`
  - Section Headings (`H2`): `38px – 42px`, `700` weight, `letter-spacing: -0.02em`
  - Dish Card Titles (`H3`): `20px`, `700` weight
  - Footer Column Titles (`H4`): `17px`, `700` weight
- **UI & Body Copy (`--font-sans`)**: `'Inter', system-ui, sans-serif`
  - Nav Links: `14px`, `500` weight, `#333333` (hover `#eb5722`)
  - Body & Dish Descriptions: `13px – 14px`, `400` weight, `line-height: 1.65 – 1.8`, `#8c8984`
  - Pill Buttons (`Explore Now`, `subscribe`): `14px – 15px`, `600` weight, `#ffffff` on `#eb5722`, `border-radius: 50px`
  - Outline Pill Button (`Login`): `14px`, `600` weight, `#eb5722`, `1.5px solid #eb5722`, `border-radius: 50px`

## 4. Layout & Spatial Composition
- **Max Container Width**: `1200px – 1280px` centered with `32px – 48px` horizontal padding.
- **Overhead Culinary Cutouts**: Each section is framed by floating, drop-shadowed overhead studio photography of raw ingredients and plated dishes (`drop-shadow(0 16px 32px rgba(40, 25, 10, 0.12))`).
- **Motion Principles**:
  - `expo.out` entrance reveals (3D line masks, center-out character/word waves, rotational Lazy-Susan plate entrances).
  - Dual-layer `elastic.out(1, 0.35)` magnetic buttons.
  - Multi-plane `ScrollTrigger` scrub parallax on floating ingredients.
