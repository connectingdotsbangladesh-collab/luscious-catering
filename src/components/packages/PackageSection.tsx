'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Package.module.css';
import { CateringPackage } from '../../domain/types';

gsap.registerPlugin(ScrollTrigger);

interface PackageSectionProps {
  packages: CateringPackage[];
  onSelectPackage?: (pkg: CateringPackage) => void;
}

export const PackageSection: React.FC<PackageSectionProps> = ({
  packages,
  onSelectPackage,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // State to toggle seeing all inclusions without bloating default card height
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll(`.${styles.packageCard}`);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
        defaults: { ease: 'power2.out', force3D: true },
      });

      if (headerRef.current) {
        tl.fromTo(
          headerRef.current,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          0
        );
      }

      if (cards && cards.length > 0) {
        cards.forEach((card, idx) => {
          const fromX = idx === 0 ? -36 : idx === 1 ? 0 : 36;
          const fromY = idx === 1 ? 44 : 32;
          const fromScale = idx === 1 ? 0.96 : 1;

          tl.fromTo(
            card,
            { x: fromX, y: fromY, scale: fromScale, opacity: 0 },
            {
              x: 0,
              y: 0,
              scale: 1,
              opacity: 1,
              duration: 0.95,
            },
            0.12 + idx * 0.12
          );
        });

        // Micro-stagger checkmark icons for an appetizing tactile feel
        const checkIcons = gridRef.current?.querySelectorAll(`.${styles.checkIcon}`);
        if (checkIcons && checkIcons.length > 0) {
          tl.fromTo(
            checkIcons,
            { scale: 0.4, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, stagger: 0.02, ease: 'back.out(1.8)' },
            0.5
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="packages" ref={sectionRef} className={styles.packageSection}>
      <div className="container">
        {/* Section Header with crisp, compact spacing */}
        <div ref={headerRef} className={styles.headerArea}>
          <span className={styles.subHeading}>Curated Menus & Subscriptions</span>
          <h2 className={styles.sectionTitle}>Turnkey Packages for Offices & Events</h2>
          <p className={styles.sectionDesc}>
            Transparent, all-inclusive culinary packages designed for effortless dining — from daily
            hot office lunch drops to 5-star royal banquet feasts.
          </p>
        </div>

        {/* 3 Package Cards Grid — Balanced to fit perfectly inside the viewport */}
        <div ref={gridRef} className={styles.packageGrid}>
          {packages.map((pkg) => {
            const isFeatured = pkg.tier === 'signature';
            const isCorporate = pkg.id === 'pkg-corporate-lunch';
            const isExpanded = !!expandedCards[pkg.id];
            const visibleInclusions = isExpanded ? pkg.inclusions : pkg.inclusions.slice(0, 4);
            const hiddenCount = pkg.inclusions.length - 4;

            return (
              <div
                key={pkg.id}
                className={`${styles.packageCard} ${isFeatured ? styles.featuredCard : ''}`}
              >
                {/* Popular / Signature Badge */}
                {pkg.badge && (
                  <div className={styles.popularBadge}>
                    <span className={styles.badgePulseDot} />
                    <span>{pkg.badge}</span>
                  </div>
                )}

                {/* Package Title & Short Tagline */}
                <h3 className={styles.packageName}>{pkg.name}</h3>
                <p className={styles.packageTagline}>{pkg.tagline}</p>

                {/* Price Display */}
                <div className={styles.priceContainer}>
                  <div className={styles.priceGroup}>
                    <span className={styles.currency}>$</span>
                    <span className={styles.priceAmount}>{pkg.pricePerPerson}</span>
                    <span className={styles.priceUnit}>
                      {isCorporate ? '/ meal' : '/ guest'}
                    </span>
                  </div>
                  <span className={styles.taxNote}>All-inclusive setup</span>
                </div>

                {/* Compact Specs Row */}
                <div className={styles.specsRow}>
                  <div className={styles.specItem}>
                    <span className={styles.specLabel}>
                      {isCorporate ? 'Platter' : 'Courses'}
                    </span>
                    <span className={styles.specValue}>
                      {isCorporate ? 'Hot Bento' : `${pkg.courseCount} Courses`}
                    </span>
                  </div>
                  <div className={styles.specItem}>
                    <span className={styles.specLabel}>
                      {isCorporate ? 'Min Orders' : 'Min Guests'}
                    </span>
                    <span className={styles.specValue}>{pkg.minGuests}+</span>
                  </div>
                  <div className={styles.specItem}>
                    <span className={styles.specLabel}>Service</span>
                    <span className={styles.specValue}>
                      {isCorporate ? 'Hot Delivery' : 'Staff & Captains'}
                    </span>
                  </div>
                </div>

                {/* Inclusions List */}
                <ul className={styles.inclusionsList}>
                  {visibleInclusions.map((inc, idx) => (
                    <li key={idx} className={styles.inclusionItem}>
                      <svg className={styles.checkIcon} viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>

                {/* Expand / Collapse Inclusions Toggle */}
                {hiddenCount > 0 && (
                  <button
                    type="button"
                    onClick={() => toggleExpand(pkg.id)}
                    className={styles.expandToggleBtn}
                    aria-label={`Toggle all inclusions for ${pkg.name}`}
                  >
                    <span>
                      {isExpanded
                        ? 'Show fewer highlights ▴'
                        : `+ ${hiddenCount} more inclusions ▾`}
                    </span>
                  </button>
                )}

                {/* Primary Action Button */}
                <button
                  onClick={() => onSelectPackage?.(pkg)}
                  className={`${styles.selectPkgBtn} ${isFeatured ? styles.featuredBtn : ''}`}
                >
                  <span>Select {pkg.name}</span>
                  <svg
                    className={styles.btnArrow}
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
