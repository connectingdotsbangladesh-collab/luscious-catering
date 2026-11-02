# Shared Layout Components — Luscious Haute Catering

## 1. Root Layout (`src/app/layout.tsx`)
- **File Path**: `src/app/layout.tsx`
- **Description**: Next.js RootLayout configuring Google Fonts (`Inter` as `--font-sans` and `Playfair Display` as `--font-serif`), global styles, and `ClientProviders` (`AuthProvider` + `SmoothScrollProvider`).

```tsx
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { ClientProviders } from '../components/providers/ClientProviders';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Luscious Haute Catering | Artisanal Dim Sum, Banquets & Luxury Galas',
  description:
    'Life is so endlessly delicious. Luscious brings Michelin-caliber culinary craft, handmade artisanal dumplings, and bespoke banquet catering directly to your luxury events.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
```

---

## 2. Top Navigation Bar (`src/components/layout/Navbar.tsx` & `Navbar.module.css`)
- **File Path**: `src/components/layout/Navbar.tsx`
- **Description**: Top navigation bar featuring the lowercase italic serif `"luscious"` brand logo, navigation links (`Dumplings`, `Recipes`, `Food Menu`, `Order Now`), orange outline pill `Login` button (or authenticated user badge), and responsive mobile drawer.

```tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import styles from './Navbar.module.css';
import { useAuth } from '../../lib/firebase/authContext';
import { useMagnetic } from '../../lib/animations/useMagnetic';

interface NavbarProps {
  onOpenAuth?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth }) => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const lastScrollY = useRef(0);

  const headerRef = useRef<HTMLElement>(null);
  const brandWrapRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLAnchorElement>(null);
  const navLinksRef = useRef<HTMLUListElement>(null);
  const loginWrapRef = useRef<HTMLDivElement>(null);
  const loginBtnRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useMagnetic(loginBtnRef, { strength: 0.3 });
  useMagnetic(brandRef, { strength: 0.2 });

  const navItems = [
    { label: 'Dumplings', href: '/#menu' },
    { label: 'Recipes', href: '/#testimonials' },
    { label: 'Food Menu', href: '/#menu' },
    { label: 'Order Now', href: '/#newsletter' },
  ];

  return (
    <header
      ref={headerRef}
      className={`${styles.header} ${scrolled ? styles.scrolled : ''} ${
        hidden && !mobileOpen ? styles.headerHidden : ''
      }`}
    >
      <div className={styles.navContainer}>
        <div ref={brandWrapRef} className="magneticWrap">
          <Link href="/" ref={brandRef} className={styles.brand}>
            <span className={styles.logoText}>luscious</span>
          </Link>
        </div>

        <div className={styles.navRightGroup}>
          <nav className={styles.navCenter}>
            <ul ref={navLinksRef} className={styles.navLinks}>
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`${styles.navLink} hoverUnderline`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div ref={loginWrapRef} className={styles.actions}>
            {user ? (
              <div className={styles.userBadge}>
                <div className={styles.userAvatar}>
                  {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                </div>
                <span className={styles.userName}>{user.displayName || user.email}</span>
                <button onClick={() => logout()} className={styles.logoutBtn} title="Sign Out">
                  ✕
                </button>
              </div>
            ) : (
              <button
                ref={loginBtnRef}
                onClick={onOpenAuth}
                className={`${styles.loginBtn} btnOverflow`}
                aria-label="Login"
              >
                <span data-magnetic-text style={{ display: 'inline-block' }}>
                  Login
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
```

---

## 3. Footer (`src/components/layout/Footer.tsx` & `Footer.module.css`)
- **File Path**: `src/components/layout/Footer.tsx`
- **Description**: Three-column editorial footer (`Get Cooking`, `Infomation`, `Follow Us`) with floating pink garlic bulb (`/decor_garlic_hd.png`) and purple onion ring (`/decor_onion_ring_hd.png`) accents.

```tsx
'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const topLineRef = useRef<HTMLDivElement>(null);
  const garlicRef = useRef<HTMLDivElement>(null);
  const onionRef = useRef<HTMLDivElement>(null);
  const columnsGridRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);

  return (
    <footer ref={footerRef} className={styles.footer}>
      <div
        ref={topLineRef}
        className="dividerLine"
        style={{ position: 'absolute', top: 0, left: 0 }}
      />

      <div ref={garlicRef} className={styles.decorGarlic}>
        <Image
          src="/decor_garlic_hd.png"
          alt="Fresh pink garlic bulb with peppercorns"
          width={90}
          height={90}
          className={styles.decorImg}
        />
      </div>

      <div ref={onionRef} className={styles.decorOnionRing}>
        <Image
          src="/decor_onion_ring_hd.png"
          alt="Sliced purple onion ring with basil"
          width={100}
          height={100}
          className={styles.decorImg}
        />
      </div>

      <div className={styles.container}>
        <div ref={columnsGridRef} className={styles.columnsGrid}>
          {/* Column 1: Get Cooking */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>
              <span className="lineMask">
                <span className="lineInner footer-title-inner">Get Cooking</span>
              </span>
            </h4>
            <ul className={styles.linksList}>
              <li><Link href="/#menu" className={`${styles.link} hoverUnderline`}>Easy Asian Takeout</Link></li>
              <li><Link href="/#menu" className={`${styles.link} hoverUnderline`}>Recipe Gallery</Link></li>
              <li><Link href="/#menu" className={`${styles.link} hoverUnderline`}>Ingredients Guide</Link></li>
              <li><Link href="/#menu" className={`${styles.link} hoverUnderline`}>Weekly Meal Plans</Link></li>
              <li><Link href="/#menu" className={`${styles.link} hoverUnderline`}>Penang Tour</Link></li>
              <li><Link href="/#menu" className={`${styles.link} hoverUnderline`}>Conversion Tool</Link></li>
            </ul>
          </div>

          {/* Column 2: Infomation */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>
              <span className="lineMask">
                <span className="lineInner footer-title-inner">Infomation</span>
              </span>
            </h4>
            <ul className={styles.linksList}>
              <li><Link href="/#testimonials" className={`${styles.link} hoverUnderline`}>About</Link></li>
              <li><Link href="/#testimonials" className={`${styles.link} hoverUnderline`}>Disclosure</Link></li>
              <li><Link href="/#testimonials" className={`${styles.link} hoverUnderline`}>Privacy Policy</Link></li>
              <li><Link href="/#testimonials" className={`${styles.link} hoverUnderline`}>Giveaway Rules</Link></li>
              <li><Link href="/#testimonials" className={`${styles.link} hoverUnderline`}>Giveaway Winners</Link></li>
              <li><Link href="/#testimonials" className={`${styles.link} hoverUnderline`}>Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Follow Us */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>
              <span className="lineMask">
                <span className="lineInner footer-title-inner">Follow Us</span>
              </span>
            </h4>
            <ul className={styles.linksList}>
              <li><a href="https://rss.com" target="_blank" rel="noreferrer" className={`${styles.link} hoverUnderline`}>RSS Feeds</a></li>
              <li><a href="https://facebook.com" target="_blank" rel="noreferrer" className={`${styles.link} hoverUnderline`}>Facebook</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noreferrer" className={`${styles.link} hoverUnderline`}>Instagram</a></li>
              <li><a href="https://pinterest.com" target="_blank" rel="noreferrer" className={`${styles.link} hoverUnderline`}>Pinterest</a></li>
              <li><a href="https://youtube.com" target="_blank" rel="noreferrer" className={`${styles.link} hoverUnderline`}>Youtube</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noreferrer" className={`${styles.link} hoverUnderline`}>Twitter</a></li>
            </ul>
          </div>
        </div>

        <div ref={bottomBarRef} className={styles.bottomBar}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Luscious Dim Sum & Haute Banquet Catering. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
```
