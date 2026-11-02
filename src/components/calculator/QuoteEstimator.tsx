'use client';

import React, { useState, useMemo } from 'react';
import styles from './Quote.module.css';
import { calculateCateringQuote } from '../../services/quoteCalculator';
import { QuoteRequest, EventType } from '../../domain/types';

interface QuoteEstimatorProps {
  onProceedToBooking?: (quoteDetails: {
    guestCount: number;
    eventType: EventType;
    tier: string;
    total: number;
  }) => void;
}

export const QuoteEstimator: React.FC<QuoteEstimatorProps> = ({ onProceedToBooking }) => {
  const [guestCount, setGuestCount] = useState<number>(65);
  const [eventType, setEventType] = useState<EventType>('wedding');
  const [packageTier, setPackageTier] = useState<'essential' | 'signature' | 'imperial-lux'>('signature');
  const [courses, setCourses] = useState<number>(4);
  const [hasLiveStation, setHasLiveStation] = useState<boolean>(true);
  const [hasBarService, setHasBarService] = useState<boolean>(true);

  const quoteRequest: QuoteRequest = useMemo(
    () => ({
      guestCount,
      eventType,
      packageTier,
      courses,
      hasLiveStation,
      liveStationCount: 1,
      hasBarService,
      tablewareTier: 'fine-porcelain',
    }),
    [guestCount, eventType, packageTier, courses, hasLiveStation, hasBarService]
  );

  const result = useMemo(() => calculateCateringQuote(quoteRequest), [quoteRequest]);

  return (
    <section id="calculator" className={styles.quoteSection}>
      <div className="container">
        <div className={styles.headerArea}>
          <span className={styles.subHeading}>Transparent Instant Pricing</span>
          <h2 className={styles.sectionTitle}>Interactive Catering Estimator</h2>
          <p className={styles.sectionDesc}>
            Tailor your bespoke culinary event in real-time. Adjust guest count, dining tiers,
            and interactive live chef stations with full price transparency.
          </p>
        </div>

        <div className={styles.calculatorCard}>
          {/* Controls Column */}
          <div className={styles.controlsCol}>
            {/* Guest Slider */}
            <div className={styles.controlGroup}>
              <div className={styles.controlLabel}>
                <span>Expected Guest Count:</span>
                <span className={styles.counterVal}>{guestCount} Guests</span>
              </div>
              <input
                type="range"
                min="15"
                max="350"
                step="5"
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className={styles.slider}
              />
            </div>

            {/* Event Type */}
            <div className={styles.controlGroup}>
              <div className={styles.controlLabel}>
                <span>Occasion & Event Type:</span>
              </div>
              <div className={styles.pillGrid}>
                {[
                  { key: 'wedding', label: 'Wedding Gala' },
                  { key: 'corporate-gala', label: 'Corporate Gala' },
                  { key: 'private-dinner', label: 'Private Dining' },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setEventType(item.key as EventType)}
                    className={`${styles.pillBtn} ${
                      eventType === item.key ? styles.pillBtnActive : ''
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Culinary Tier */}
            <div className={styles.controlGroup}>
              <div className={styles.controlLabel}>
                <span>Menu Experience Tier:</span>
              </div>
              <div className={styles.pillGrid}>
                {(
                  [
                    { key: 'essential', label: 'Botanical ($45/p)' },
                    { key: 'signature', label: 'Signature ($75/p)' },
                    { key: 'imperial-lux', label: 'Imperial ($120/p)' },
                  ] as const
                ).map((tier) => (
                  <button
                    key={tier.key}
                    type="button"
                    onClick={() => setPackageTier(tier.key)}
                    className={`${styles.pillBtn} ${
                      packageTier === tier.key ? styles.pillBtnActive : ''
                    }`}
                  >
                    {tier.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Courses Count */}
            <div className={styles.controlGroup}>
              <div className={styles.controlLabel}>
                <span>Number of Dining Courses:</span>
                <span className={styles.counterVal}>{courses} Courses</span>
              </div>
              <input
                type="range"
                min="3"
                max="7"
                step="1"
                value={courses}
                onChange={(e) => setCourses(Number(e.target.value))}
                className={styles.slider}
              />
            </div>

            {/* Interactive Add-ons */}
            <div className={styles.controlGroup}>
              <div className={styles.controlLabel}>
                <span>Culinary Stations & Service Upgrades:</span>
              </div>

              {/* Live Dumpling Station Toggle */}
              <div
                className={styles.toggleRow}
                onClick={() => setHasLiveStation(!hasLiveStation)}
              >
                <div className={styles.toggleText}>
                  <span className={styles.toggleTitle}>Live Dim Sum & Dumpling Steam Theatre</span>
                  <span className={styles.toggleDesc}>+$350 setup & live master chef show</span>
                </div>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={hasLiveStation}
                    onChange={(e) => setHasLiveStation(e.target.checked)}
                  />
                  <span className={styles.sliderToggle}></span>
                </label>
              </div>

              {/* Bar Service Toggle */}
              <div
                className={styles.toggleRow}
                onClick={() => setHasBarService(!hasBarService)}
              >
                <div className={styles.toggleText}>
                  <span className={styles.toggleTitle}>Artisan Botanical Bar & Mocktails</span>
                  <span className={styles.toggleDesc}>+$14 per guest (dedicated mixologists)</span>
                </div>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={hasBarService}
                    onChange={(e) => setHasBarService(e.target.checked)}
                  />
                  <span className={styles.sliderToggle}></span>
                </label>
              </div>
            </div>
          </div>

          {/* Results Summary Column */}
          <div className={styles.resultsCol}>
            <div>
              <div className={styles.resultsHeader}>
                <span className={styles.resultsTag}>Instant Catering Estimate</span>
                <div className={styles.totalDisplay}>
                  <span className={styles.totalCurrency}>$</span>
                  <span className={styles.totalAmount}>{result.estimatedTotal.toLocaleString()}</span>
                </div>
                <p className={styles.perGuestNote}>
                  ≈ ${result.perPersonRate} per guest (all food, service & prep included)
                </p>
              </div>

              <ul className={styles.breakdownList}>
                {result.breakdown.map((item, idx) => (
                  <li key={idx} className={styles.breakdownItem}>
                    <span className={styles.itemLabel}>{item.label}</span>
                    <span className={styles.itemVal}>${item.amount.toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() =>
                onProceedToBooking?.({
                  guestCount,
                  eventType,
                  tier: packageTier,
                  total: result.estimatedTotal,
                })
              }
              className={styles.lockInBtn}
            >
              <span>Lock In This Quote & Reserve Date</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
