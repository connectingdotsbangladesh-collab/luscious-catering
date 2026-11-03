'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ServicePillars.module.css';

gsap.registerPlugin(ScrollTrigger);

export const ServicePillars: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll(`.${styles.pillarCard}`);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          toggleActions: 'play none none none',
        },
        defaults: { ease: 'power2.out', force3D: true },
      });

      if (headerRef.current) {
        tl.fromTo(
          headerRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.0 },
          0
        );
      }

      if (cards && cards.length > 0) {
        cards.forEach((card, idx) => {
          const fromX = idx === 0 ? -60 : idx === 1 ? 0 : 60;
          const fromY = idx === 1 ? 40 : 20;
          tl.fromTo(
            card,
            { x: fromX, y: fromY, opacity: 0 },
            {
              x: 0,
              y: 0,
              opacity: 1,
              duration: 1.1,
            },
            0.15 + idx * 0.12
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    const lenis = (
      window as Window & {
        __lenis?: {
          scrollTo: (
            target: HTMLElement | string,
            options?: { offset?: number; duration?: number }
          ) => void;
        };
      }
    ).__lenis;
    if (lenis && el) {
      lenis.scrollTo(el, { offset: -20, duration: 1.25 });
    } else {
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" ref={sectionRef} className={styles.pillarsSection}>
      <div className="container">
        <div ref={headerRef} className={styles.headerArea}>
          <span className={styles.subHeading}>Culinary Versatility & Hospitality</span>
          <h2 className={styles.sectionTitle}>Catering Solutions Tailored to Every Need</h2>
          <p className={styles.sectionDesc}>
            Whether energizing high-achieving corporate teams with daily hot lunches, orchestrating
            royal wedding banquets, or firing up theatrical live cooking stations — Ahlan Catering
            delivers seamless culinary perfection from start to finish.
          </p>
        </div>

        <div ref={cardsRef} className={styles.grid}>
          {/* Pillar 1: Office & Corporate Lunch */}
          <div className={styles.pillarCard}>
            <div className={styles.badge}>
              <span>🍱 Corporate Office Lunch</span>
            </div>
            <h3 className={styles.cardTitle}>Daily Executive Meals & Subscriptions</h3>
            <p className={styles.cardDesc}>
              Elevate workplace morale and productivity. Fresh, nutritionist-curated gourmet lunch
              boxes delivered piping hot to your office desks every single day.
            </p>
            <ul className={styles.featuresList}>
              <li className={styles.featureItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>Insulated thermal cambro delivery guaranteed by 12:45 PM</span>
              </li>
              <li className={styles.featureItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>4-week rotating chef menus (Never eat the same lunch twice)</span>
              </li>
              <li className={styles.featureItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>Individual eco-bento packaging with zero desk mess</span>
              </li>
              <li className={styles.featureItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>Consolidated monthly corporate billing & flexible headcount</span>
              </li>
            </ul>
            <button
              onClick={() => scrollToSection('packages')}
              className={styles.cardActionBtn}
            >
              Explore Office Lunch Plans →
            </button>
          </div>

          {/* Pillar 2: Banquets & Grand Events */}
          <div className={`${styles.pillarCard} ${styles.pillarCardHighlight}`}>
            <div className={styles.badge} style={{ background: '#eb5722', color: '#ffffff' }}>
              <span>🎪 Weddings & Grand Events</span>
            </div>
            <h3 className={styles.cardTitle}>Weddings, Galas, Seminars & Celebrations</h3>
            <p className={styles.cardDesc}>
              Cherished milestones demand extraordinary feasts. From 50-guest engagements to
              2,000+ attendee corporate summits, we orchestrate royal banquet dining.
            </p>
            <ul className={styles.featuresList}>
              <li className={styles.featureItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>Multi-course royal buffets with polished chafing dish setups</span>
              </li>
              <li className={styles.featureItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>Fine porcelain chinaware, crystal glassware & gold flatware</span>
              </li>
              <li className={styles.featureItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>Uniformed banquet floor captains & attentive table servers</span>
              </li>
              <li className={styles.featureItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>Complimentary pre-event food tasting session for hosts</span>
              </li>
            </ul>
            <button
              onClick={() => scrollToSection('menu')}
              className={`${styles.cardActionBtn} ${styles.cardActionBtnPrimary}`}
            >
              Discover Event Banquets →
            </button>
          </div>

          {/* Pillar 3: Live Chef Cooking & Full-Service */}
          <div className={styles.pillarCard}>
            <div className={styles.badge}>
              <span>👨‍🍳 Full-Service Turnkey Catering</span>
            </div>
            <h3 className={styles.cardTitle}>Live Cooking Theatres & Bespoke Catering</h3>
            <p className={styles.cardDesc}>
              Everything a world-class caterer does — executed with 5-star precision. We transform
              mealtime into an unforgettable interactive show for your guests.
            </p>
            <ul className={styles.featuresList}>
              <li className={styles.featureItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>Live bamboo dim sum & dumpling steaming theatre on-site</span>
              </li>
              <li className={styles.featureItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>Sizzling charcoal BBQ, open-flame grills & carving stations</span>
              </li>
              <li className={styles.featureItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>100% Halal certified, allergen-safe & custom dietary curation</span>
              </li>
              <li className={styles.featureItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>End-to-end logistics: kitchen setup, tablescaping & clean-up</span>
              </li>
            </ul>
            <button
              onClick={() => scrollToSection('calculator')}
              className={styles.cardActionBtn}
            >
              Get Instant Quote Now →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
