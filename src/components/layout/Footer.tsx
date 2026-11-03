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
          {/* Column 1: Catering Services */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>
              <span className="lineMask">
                <span className="lineInner footer-title-inner">Catering Services</span>
              </span>
            </h4>
            <ul className={styles.linksList}>
              <li>
                <Link href="/#services" className={`${styles.link} hoverUnderline`}>
                  Daily Corporate Office Lunch
                </Link>
              </li>
              <li>
                <Link href="/#packages" className={`${styles.link} hoverUnderline`}>
                  Executive Bento Subscriptions
                </Link>
              </li>
              <li>
                <Link href="/#services" className={`${styles.link} hoverUnderline`}>
                  Wedding & Reception Banquets
                </Link>
              </li>
              <li>
                <Link href="/#services" className={`${styles.link} hoverUnderline`}>
                  Corporate Galas & Seminars
                </Link>
              </li>
              <li>
                <Link href="/#menu" className={`${styles.link} hoverUnderline`}>
                  Live Dumpling & Grill Theatres
                </Link>
              </li>
              <li>
                <Link href="/#calculator" className={`${styles.link} hoverUnderline`}>
                  Instant Catering Cost Estimator
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: The Ahlan Standard */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>
              <span className="lineMask">
                <span className="lineInner footer-title-inner">The Ahlan Standard</span>
              </span>
            </h4>
            <ul className={styles.linksList}>
              <li>
                <Link href="/#services" className={`${styles.link} hoverUnderline`}>
                  100% Halal Kitchen Certification
                </Link>
              </li>
              <li>
                <Link href="/#services" className={`${styles.link} hoverUnderline`}>
                  ISO Food Safety & Hygiene
                </Link>
              </li>
              <li>
                <Link href="/#services" className={`${styles.link} hoverUnderline`}>
                  Punctual Hot-Box Delivery Guarantee
                </Link>
              </li>
              <li>
                <Link href="/#newsletter" className={`${styles.link} hoverUnderline`}>
                  Complimentary Office Lunch Tasting
                </Link>
              </li>
              <li>
                <Link href="/#packages" className={`${styles.link} hoverUnderline`}>
                  Corporate Invoicing & Retainers
                </Link>
              </li>
              <li>
                <Link href="/#services" className={`${styles.link} hoverUnderline`}>
                  Full Tableware & Waitstaff Brigade
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Corporate Headquarters & Inquiries */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>
              <span className="lineMask">
                <span className="lineInner footer-title-inner">Corporate Inquiries</span>
              </span>
            </h4>
            <ul className={styles.linksList}>
              <li style={{ color: '#88837a', fontSize: '14px', lineHeight: '1.6', marginBottom: '8px' }}>
                Central Commissary & Hospitality Lounge
              </li>
              <li>
                <a
                  href="mailto:concierge@ahlancatering.com"
                  className={`${styles.link} hoverUnderline`}
                >
                  concierge@ahlancatering.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+8801700000000"
                  className={`${styles.link} hoverUnderline`}
                >
                  Hotline: +880 1700-000000
                </a>
              </li>
              <li style={{ color: '#88837a', fontSize: '13.5px', marginTop: '6px' }}>
                Corporate Hours: 8:00 AM - 10:00 PM
              </li>
              <li>
                <Link href="/#newsletter" className={`${styles.link} hoverUnderline`}>
                  Schedule Tasting Session →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright notice */}
        <div ref={bottomBarRef} className={styles.bottomBar}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Ahlan Catering & Events. Warm Hospitality • 100% Halal • Michelin-Inspired Culinary Mastery. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
