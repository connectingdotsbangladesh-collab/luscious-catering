'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Footer.module.css';

gsap.registerPlugin(ScrollTrigger);

export const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const topLineRef = useRef<HTMLDivElement>(null);
  const garlicRef = useRef<HTMLDivElement>(null);
  const onionRef = useRef<HTMLDivElement>(null);
  const columnsGridRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const columns = columnsGridRef.current?.querySelectorAll(`.${styles.column}`);

      // Wait until Footer is scrolled into view (75% from top)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
        defaults: { ease: 'power2.out', force3D: true },
      });

      if (topLineRef.current) {
        tl.fromTo(
          topLineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.25,
          },
          0
        );
      }

      // Non-Round Side Cutouts (Garlic & Onion/Herb): Smooth Swipe In from Outside the Right Edge of the Screen
      if (garlicRef.current) {
        tl.fromTo(
          garlicRef.current,
          { x: '50vw', opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.4,
          },
          0.06
        );
      }

      if (onionRef.current) {
        tl.fromTo(
          onionRef.current,
          { x: '50vw', opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.4,
          },
          0.16
        );
      }

      // Non-Round Footer Columns: Smooth Horizontal Swipe In from Outside the Screen
      if (columns && columns.length > 0) {
        columns.forEach((col, idx) => {
          const fromX = idx === 0 ? '-55vw' : idx === 1 ? '-55vw' : '55vw';
          tl.fromTo(
            col,
            { x: fromX, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 1.35,
            },
            0.08 + idx * 0.1
          );
        });
      }

      if (bottomBarRef.current) {
        tl.fromTo(
          bottomBarRef.current,
          { x: '-60vw', opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.35,
          },
          0.28
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className={styles.footer}>
      <div
        ref={topLineRef}
        className="dividerLine"
        style={{ position: 'absolute', top: 0, left: 0 }}
      />

      {/* Floating Elements from Photo 4 in Ultra-HD */}
      <div ref={garlicRef} className={styles.decorGarlic}>
        <Image
          src="/studio_4k_v3_garlic.png"
          alt="Fresh pink garlic bulb with peppercorns"
          width={500}
          height={380}
          quality={100}
          className={styles.decorImg}
        />
      </div>

      <div ref={onionRef} className={styles.decorOnionRing}>
        <Image
          src="/studio_4k_v3_onion_ring.png"
          alt="Sliced purple onion with fresh herbs and peppercorns"
          width={500}
          height={360}
          quality={100}
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
              <li>
                <Link href="/#menu" className={`${styles.link} hoverUnderline`}>
                  Easy Asian Takeout
                </Link>
              </li>
              <li>
                <Link href="/#menu" className={`${styles.link} hoverUnderline`}>
                  Recipe Gallery
                </Link>
              </li>
              <li>
                <Link href="/#menu" className={`${styles.link} hoverUnderline`}>
                  Ingredients Guide
                </Link>
              </li>
              <li>
                <Link href="/#menu" className={`${styles.link} hoverUnderline`}>
                  Weekly Meal Plans
                </Link>
              </li>
              <li>
                <Link href="/#menu" className={`${styles.link} hoverUnderline`}>
                  Penang Tour
                </Link>
              </li>
              <li>
                <Link href="/#menu" className={`${styles.link} hoverUnderline`}>
                  Conversion Tool
                </Link>
              </li>
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
              <li>
                <Link href="/#testimonials" className={`${styles.link} hoverUnderline`}>
                  About
                </Link>
              </li>
              <li>
                <Link href="/#testimonials" className={`${styles.link} hoverUnderline`}>
                  Disclosure
                </Link>
              </li>
              <li>
                <Link href="/#testimonials" className={`${styles.link} hoverUnderline`}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/#testimonials" className={`${styles.link} hoverUnderline`}>
                  Giveaway Rules
                </Link>
              </li>
              <li>
                <Link href="/#testimonials" className={`${styles.link} hoverUnderline`}>
                  Giveaway Winners
                </Link>
              </li>
              <li>
                <Link href="/#testimonials" className={`${styles.link} hoverUnderline`}>
                  Contact
                </Link>
              </li>
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
              <li>
                <a
                  href="https://rss.com"
                  target="_blank"
                  rel="noreferrer"
                  className={`${styles.link} hoverUnderline`}
                >
                  RSS Feeds
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className={`${styles.link} hoverUnderline`}
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className={`${styles.link} hoverUnderline`}
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noreferrer"
                  className={`${styles.link} hoverUnderline`}
                >
                  Pinterest
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className={`${styles.link} hoverUnderline`}
                >
                  Youtube
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className={`${styles.link} hoverUnderline`}
                >
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright notice */}
        <div ref={bottomBarRef} className={styles.bottomBar}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Luscious Dim Sum & Haute Banquet Catering. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
