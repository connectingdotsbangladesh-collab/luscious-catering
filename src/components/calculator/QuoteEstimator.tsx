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
  const [guestCount, setGuestCount] = useState<number>(45);
  const [eventType, setEventType] = useState<EventType>('corporate-lunch');
  const [packageTier, setPackageTier] = useState<'essential' | 'signature' | 'imperial-lux'>('essential');
  const [courses, setCourses] = useState<number>(3);
  const [hasLiveStation, setHasLiveStation] = useState<boolean>(false);
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
      tablewareTier: eventType === 'corporate-lunch' ? 'standard' : 'fine-porcelain',
    }),
    [guestCount, eventType, packageTier, courses, hasLiveStation, hasBarService]
  );

  const result = useMemo(() => calculateCateringQuote(quoteRequest), [quoteRequest]);
  const isCorporateLunch = eventType === 'corporate-lunch';

  return (
    <section id="calculator" className={styles.quoteSection}>
      <div className="container">
        <div className={styles.headerArea}>
          <span className={styles.subHeading}>Transparent Instant Pricing</span>
          <h2 className={styles.sectionTitle}>Interactive Catering Estimator</h2>
          <p className={styles.sectionDesc}>
            Calculate real-time estimates for corporate office lunch subscriptions or grand event
            banquets. Full price transparency, no hidden fees, and instant concierge reservation.
          </p>
        </div>

        <div className={styles.calculatorCard}>
          {/* Controls Column */}
          <div className={styles.controlsCol}>
            {/* Event Type */}
            <div className={styles.controlGroup}>
              <div className={styles.controlLabel}>
                <span>Occasion & Catering Scope:</span>
              </div>
              <div className={styles.pillGrid}>
                {[
                  { key: 'corporate-lunch', label: '🍱 Office Lunch Plan' },
                  { key: 'wedding', label: '💍 Wedding & Reception' },
                  { key: 'corporate-gala', label: '🏛️ Corporate Gala / Seminar' },
                  { key: 'private-dinner', label: '🎉 Private Celebration' },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => {
                      const newType = item.key as EventType;
                      setEventType(newType);
                      if (newType === 'corporate-lunch') {
                        setPackageTier('essential');
                        setHasLiveStation(false);
                      } else {
                        setPackageTier('signature');
                        setHasLiveStation(true);
                      }
                    }}
                    className={`${styles.pillBtn} ${
                      eventType === item.key ? styles.pillBtnActive : ''
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Guest Slider */}
            <div className={styles.controlGroup}>
              <div className={styles.controlLabel}>
                <span>
                  {isCorporateLunch ? 'Number of Staff / Meals Daily:' : 'Expected Guest Count:'}
                </span>
                <span className={styles.counterVal}>
                  {guestCount} {isCorporateLunch ? 'Meals' : 'Guests'}
                </span>
              </div>
              <input
                type="range"
                min="15"
                max={isCorporateLunch ? '250' : '500'}
                step="5"
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className={styles.slider}
              />
            </div>

            {/* Culinary Tier */}
            <div className={styles.controlGroup}>
              <div className={styles.controlLabel}>
                <span>Dining Experience Tier:</span>
              </div>
              <div className={styles.pillGrid}>
                {(isCorporateLunch
                  ? [
                      { key: 'essential', label: 'Executive Bento ($14)' },
                      { key: 'signature', label: 'Deluxe Thali ($18)' },
                      { key: 'imperial-lux', label: 'VIP Boardroom ($24)' },
                    ]
                  : [
                      { key: 'essential', label: 'Essential Feast ($45/p)' },
                      { key: 'signature', label: 'Signature Banquet ($75/p)' },
                      { key: 'imperial-lux', label: 'Imperial Gala ($120/p)' },
                    ]
                ).map((tier) => (
                  <button
                    key={tier.key}
                    type="button"
                    onClick={() =>
                      setPackageTier(tier.key as 'essential' | 'signature' | 'imperial-lux')
                    }
                    className={`${styles.pillBtn} ${
                      packageTier === tier.key ? styles.pillBtnActive : ''
                    }`}
                  >
                    {tier.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Courses Count (Only for Events) */}
            {!isCorporateLunch && (
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
            )}

            {/* Interactive Add-ons */}
            <div className={styles.controlGroup}>
              <div className={styles.controlLabel}>
                <span>Service Enhancements & Upgrades:</span>
              </div>

              {/* Live Station Toggle */}
              <div
                className={styles.toggleRow}
                onClick={() => setHasLiveStation(!hasLiveStation)}
              >
                <div className={styles.toggleText}>
                  <span className={styles.toggleTitle}>
                    {isCorporateLunch
                      ? 'Live Office Dim Sum Steaming Station'
                      : 'Interactive Live Chef Steam / Grill Station'}
                  </span>
                  <span className={styles.toggleDesc}>
                    +$350 setup & master chef on-site showmanship
                  </span>
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

              {/* Beverage / Mocktail Service Toggle */}
              <div
                className={styles.toggleRow}
                onClick={() => setHasBarService(!hasBarService)}
              >
                <div className={styles.toggleText}>
                  <span className={styles.toggleTitle}>
                    {isCorporateLunch
                      ? 'Fresh Cold-Pressed Botanical Juice Bar'
                      : 'Artisan Drink, Sharbat & Mocktail Bar'}
                  </span>
                  <span className={styles.toggleDesc}>
                    {isCorporateLunch ? '+$4 per meal' : '+$14 per guest (dedicated mixologists)'}
                  </span>
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
                <span className={styles.resultsTag}>
                  {isCorporateLunch ? 'Daily Lunch Estimate' : 'Event Catering Estimate'}
                </span>
                <div className={styles.totalDisplay}>
                  <span className={styles.totalCurrency}>$</span>
                  <span className={styles.totalAmount}>
                    {result.estimatedTotal.toLocaleString()}
                  </span>
                </div>
                <p className={styles.perGuestNote}>
                  ≈ ${result.perPersonRate}{' '}
                  {isCorporateLunch ? 'per meal (tax & thermal drop included)' : 'per guest (all food & service included)'}
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
              <span>{isCorporateLunch ? 'Book Complimentary Office Tasting' : 'Lock In Event Quote & Date'}</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
