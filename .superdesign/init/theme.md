# Theme & Design Tokens — Luscious Haute Catering

## Part 1 — Compact Token Summary

- **Brand Aesthetic**: Editorial Chinese Culinary & Haute Dim Sum Catering on warm alabaster/marble canvas with vibrant persimmon-orange accents and overhead studio food photography.
- **Colors**:
  - `--color-primary`: `#eb5722` (Persimmon Orange CTA & active indicators)
  - `--color-primary-hover`: `#d34411`
  - `--color-primary-light`: `#fff2ed`
  - `--color-primary-glow`: `rgba(235, 87, 34, 0.28)`
  - `--color-accent-gold`: `#c99a3e` (`#f59e0b` active avatar ring)
  - `--color-accent-basil`: `#2f6b38`
  - `--bg-canvas`: `#f7f5f2` / `#f9f7f4` (Warm Alabaster / Stone Canvas)
  - `--bg-surface`: `#ffffff`
  - `--text-main`: `#1a1a1a` / `#181716`
  - `--text-muted`: `#66625c` / `#646059`
  - `--text-light`: `#8c8984` / `#99958e`
- **Typography**:
  - `--font-serif`: `'Playfair Display', Georgia, 'Times New Roman', serif` (Headings, Dish Titles, Brand Logo `luscious` in bold italic)
  - `--font-sans`: `'Inter', system-ui, -apple-system, sans-serif` (Body copy, Nav links, Tabs, Buttons, Inputs)
  - **Type Scale**:
    - Hero H1: `56px` (`font-weight: 800`, `line-height: 1.12`, `letter-spacing: -0.025em`)
    - Hero H2: `28px` (`font-weight: 400`, `line-height: 1.3`)
    - Section H2: `38px – 42px` (`font-weight: 700`, `letter-spacing: -0.02em`)
    - Dish Card H3: `20px` (`font-weight: 700`)
    - Body / Quotes / Descriptions: `13px – 14px` (`line-height: 1.65 – 1.8`)
- **Spacing, Radius & Shadows**:
  - Container Max Width: `1200px – 1280px` (`padding: 0 32px` to `0 48px`)
  - Section Vertical Padding: `100px 0 120px`
  - Pill Radius: `50px` / `9999px` (Buttons, Login outline button, Newsletter input bar)
  - Card / Modal Radius: `16px – 24px`
  - Primary Button Shadow: `0 8px 24px rgba(235, 87, 34, 0.35)`
  - Food Cutout Drop Shadow: `drop-shadow(0 20px 40px rgba(0, 0, 0, 0.14))`
- **Breakpoints**:
  - Desktop: `> 1080px` (2-column Hero, 3-column Menu & Footer, 2-column Testimonials)
  - Tablet: `<= 900px` (Single-column centered stacks, mobile hamburger menu)
  - Mobile: `<= 640px` (Compact typography `38px` H1, stacked newsletter form)

---

## Part 2 — Raw Source Dumps

### `src/styles/variables.css`
```css
:root {
  /* Luscious Brand Palette inspired by Pinterest Culinary Reference */
  --color-primary: #eb5722;
  --color-primary-hover: #d34411;
  --color-primary-light: #fff2ed;
  --color-primary-glow: rgba(235, 87, 34, 0.28);

  --color-accent-gold: #c99a3e;
  --color-accent-gold-light: #fdf8ed;
  --color-accent-basil: #2f6b38;
  --color-accent-olive: #495e46;
  --color-accent-berry: #8c232c;

  /* Neutrals & Surfaces */
  --bg-canvas: #faf8f5;
  --bg-canvas-subtle: #f4f0e8;
  --bg-surface: #ffffff;
  --bg-surface-elevated: #ffffff;
  --bg-dark: #191817;
  --bg-dark-card: #22201e;

  /* Text Colors */
  --text-main: #181716;
  --text-muted: #646059;
  --text-light: #8e897f;
  --text-inverted: #faf8f5;

  /* Borders & Dividers */
  --border-subtle: rgba(30, 26, 20, 0.08);
  --border-medium: rgba(30, 26, 20, 0.16);
  --border-focus: var(--color-primary);

  /* Typography */
  --font-serif: 'Playfair Display', Georgia, 'Times New Roman', serif;
  --font-sans: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  /* Shadows */
  --shadow-sm: 0 2px 8px rgba(35, 25, 15, 0.04);
  --shadow-md: 0 8px 24px rgba(35, 25, 15, 0.08);
  --shadow-lg: 0 16px 48px rgba(35, 25, 15, 0.12);
  --shadow-float: 0 24px 60px rgba(35, 25, 15, 0.16);

  /* Radius */
  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --radius-full: 9999px;

  /* Container */
  --max-width: 1240px;
  --transition-smooth: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  --transition-spring: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### `src/app/globals.css`
```css
@import '../styles/variables.css';
@import '../styles/animations.css';

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body {
  max-width: 100vw;
  overflow-x: hidden;
  background-color: #f9f7f4;
  color: var(--text-main);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1.6;
  scroll-behavior: smooth;
}

a {
  color: inherit;
  text-decoration: none;
  transition: color 0.2s ease;
}

button {
  font-family: inherit;
  cursor: pointer;
  border: none;
  background: none;
  outline: none;
}

h1, h2, h3, h4, .serif-font {
  font-family: var(--font-serif);
  font-weight: 700;
  color: var(--text-main);
  letter-spacing: -0.015em;
  line-height: 1.15;
}

.container {
  width: 100%;
  max-width: var(--max-width);
  margin-left: auto;
  margin-right: auto;
  padding-left: 24px;
  padding-right: 24px;
}
```
