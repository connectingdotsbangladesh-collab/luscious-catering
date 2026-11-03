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

  // Magnetic effect on inner interactive elements (separated from entrance wrappers)
  useMagnetic(loginBtnRef, { strength: 0.3 });
  useMagnetic(brandRef, { strength: 0.2 });

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 40);
      if (currentY > 120 && currentY > lastScrollY.current + 4) {
        setHidden(true);
      } else if (currentY < lastScrollY.current - 4 || currentY <= 80) {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cinematic Entrance Animation (Zero conflict with magnetic refs)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power2.out', force3D: true },
      });

      if (brandWrapRef.current) {
        tl.fromTo(
          brandWrapRef.current,
          { x: '-38vw', opacity: 0 },
          { x: 0, opacity: 1, duration: 1.25 },
          0.08
        );
      }

      if (navLinksRef.current) {
        const items = navLinksRef.current.querySelectorAll('li');
        tl.fromTo(
          items,
          { x: '48vw', opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.25,
            stagger: 0.07,
          },
          0.12
        );
      }

      if (loginWrapRef.current) {
        tl.fromTo(
          loginWrapRef.current,
          { x: '48vw', opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.3,
          },
          0.26
        );
      }
    }, headerRef);

    return () => ctx.revert();
  }, []);

  // Mobile Menu Drawer Entrance Animation
  useEffect(() => {
    if (!mobileOpen || !mobileMenuRef.current) return;
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -14, clipPath: 'inset(0% 0% 100% 0%)' },
        {
          opacity: 1,
          y: 0,
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 0.45,
          ease: 'expo.out',
        }
      );
      const links = mobileMenuRef.current?.querySelectorAll('a, button');
      if (links && links.length > 0) {
        gsap.fromTo(
          links,
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.45,
            stagger: 0.055,
            ease: 'power3.out',
            delay: 0.08,
          }
        );
      }
    }, mobileMenuRef);

    return () => ctx.revert();
  }, [mobileOpen]);

  const navItems = [
    { label: 'Office Lunch', href: '/#services' },
    { label: 'Event Catering', href: '/#services' },
    { label: 'Our Menu', href: '/#menu' },
    { label: 'Packages', href: '/#packages' },
    { label: 'Instant Quote', href: '/#calculator' },
  ];

  return (
    <header
      ref={headerRef}
      className={`${styles.header} ${scrolled ? styles.scrolled : ''} ${
        hidden && !mobileOpen ? styles.headerHidden : ''
      }`}
    >
      <div className={styles.navContainer}>
        {/* Brand Logo — elegant italic serif "ahlan" with Catering badge */}
        <div ref={brandWrapRef} className="magneticWrap">
          <Link href="/" ref={brandRef} className={styles.brand}>
            <span className={styles.logoText}>ahlan</span>
            <span className={styles.logoBadge}>Catering</span>
          </Link>
        </div>

        {/* Right Nav Group: Links + Login Button */}
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

          {/* Login button: orange outline pill */}
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

            {/* Mobile hamburger */}
            <button
              className={styles.mobileToggle}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M3 12h18M3 6h18M3 18h18" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div ref={mobileMenuRef} className={styles.mobileMenu}>
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={styles.navLink}
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className={styles.mobileActions}>
            {!user && (
              <button
                onClick={() => {
                  setMobileOpen(false);
                  onOpenAuth?.();
                }}
                className={styles.loginBtn}
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
