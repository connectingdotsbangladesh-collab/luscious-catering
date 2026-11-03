'use client';

import React from 'react';
import styles from './Package.module.css';
import { CateringPackage } from '../../domain/types';

interface PackageSectionProps {
  packages: CateringPackage[];
  onSelectPackage?: (pkg: CateringPackage) => void;
}

export const PackageSection: React.FC<PackageSectionProps> = ({ packages, onSelectPackage }) => {
  return (
    <section id="packages" className={styles.packageSection}>
      <div className="container">
        <div className={styles.headerArea}>
          <span className={styles.subHeading}>Curated Menus & Subscriptions</span>
          <h2 className={styles.sectionTitle}>Turnkey Packages for Offices & Events</h2>
          <p className={styles.sectionDesc}>
            Transparent, all-inclusive culinary packages designed for effortless dining.
            Whether powering corporate office teams with hot daily meal plans or hosting 500+ guests
            at grand celebrations.
          </p>
        </div>

        <div className={styles.packageGrid}>
          {packages.map((pkg) => {
            const isFeatured = pkg.tier === 'signature';
            const isCorporate = pkg.id === 'pkg-corporate-lunch';
            return (
              <div
                key={pkg.id}
                className={`${styles.packageCard} ${isFeatured ? styles.featuredCard : ''}`}
              >
                {pkg.badge && (
                  <div className={styles.popularBadge}>{pkg.badge}</div>
                )}

                <h3 className={styles.packageName}>{pkg.name}</h3>
                <p className={styles.packageTagline}>{pkg.tagline}</p>

                <div className={styles.priceContainer}>
                  <span className={styles.currency}>$</span>
                  <span className={styles.priceAmount}>{pkg.pricePerPerson}</span>
                  <span className={styles.priceUnit}>
                    {isCorporate ? '/ meal' : '/ guest'}
                  </span>
                </div>

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
                      {isCorporate ? 'Hot Delivery' : 'Captains & Staff'}
                    </span>
                  </div>
                </div>

                <ul className={styles.inclusionsList}>
                  {pkg.inclusions.map((inc, idx) => (
                    <li key={idx} className={styles.inclusionItem}>
                      <svg className={styles.checkIcon} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => onSelectPackage?.(pkg)}
                  className={`${styles.selectPkgBtn} ${isFeatured ? styles.featuredBtn : ''}`}
                >
                  <span>Select {pkg.name}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
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
