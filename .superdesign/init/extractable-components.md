# Extractable Reusable Components — Luscious Haute Catering

## Layout Components

### `Navbar`
- **Source**: `src/components/layout/Navbar.tsx` (`src/components/layout/Navbar.module.css`)
- **Category**: `layout`
- **Description**: Top navigation bar with italic serif `luscious` brand wordmark, 4 navigation links (`Dumplings`, `Recipes`, `Food Menu`, `Order Now`), and orange outline pill `Login` CTA button.
- **Extractable props**:
  - `activeItem` (`string`, default: `"dumplings"`)
  - `isLoggedIn` (`boolean`, default: `false`)
- **Hardcoded**: Brand text `"luscious"`, navigation link labels, orange outline pill styling (`#eb5722`), responsive mobile toggle icon.

### `Footer`
- **Source**: `src/components/layout/Footer.tsx` (`src/components/layout/Footer.module.css`)
- **Category**: `layout`
- **Description**: 3-column editorial footer (`Get Cooking`, `Infomation`, `Follow Us`) with floating garlic bulb and purple onion ring accents and copyright bar.
- **Extractable props**:
  - `year` (`number`, default: `2026`)
- **Hardcoded**: 3 column headers, 18 navigation/social links, decorative floating ingredient images, top divider line.

---

## Basic Components

### `DishCard` (inline within `MenuSection`)
- **Source**: `src/components/menu/MenuSection.tsx` (`src/components/menu/MenuSection.module.css`)
- **Category**: `basic`
- **Description**: Circular overhead plate image card with serif dish title and 3-line culinary description.
- **Extractable props**:
  - `activeTab` (`string`, default: `"Main Dish"`)
- **Hardcoded**: Circular `190px` plate frame, drop shadow, typography hierarchy.
