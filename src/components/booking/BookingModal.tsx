'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './Booking.module.css';
import { EventType } from '../../domain/types';
import { submitCateringInquiry } from '../../lib/firebase/firestoreService';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefill?: {
    guestCount?: number;
    eventType?: EventType;
    packageId?: string;
    totalQuote?: number;
    dishName?: string;
  };
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, prefill }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [eventType, setEventType] = useState<EventType>(prefill?.eventType || 'wedding');
  const [eventDate, setEventDate] = useState('');
  const [guestCount, setGuestCount] = useState<number>(prefill?.guestCount || 50);
  const [venue, setVenue] = useState('');
  const [notes, setNotes] = useState(
    prefill?.dishName ? `Interested in featuring: ${prefill.dishName}` : ''
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successInfo, setSuccessInfo] = useState<{ id: string; message: string } | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const modalCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefill?.dishName) {
      setNotes(`Interested in featuring: ${prefill.dishName}`);
    }
  }, [prefill?.dishName]);

  useEffect(() => {
    if (!isOpen || !modalCardRef.current) return;
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        modalCardRef.current,
        { scale: 0.94, y: 18, opacity: 0 },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 0.45,
          ease: 'expo.out',
        }
      );
      const groups = modalCardRef.current?.querySelectorAll(`.${styles.formGroup}, .${styles.submitBtn}`);
      if (groups && groups.length > 0) {
        gsap.fromTo(
          groups,
          { y: 14, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            stagger: 0.035,
            ease: 'power3.out',
          }
        );
      }
    }, modalCardRef);

    return () => ctx.revert();
  }, [isOpen, successInfo]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !eventDate) {
      setErrorMsg('Please complete your name, email, and proposed event date.');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const res = await submitCateringInquiry({
        customerName: name,
        email,
        phone,
        eventType,
        eventDate,
        guestCount: Number(guestCount),
        packageId: prefill?.packageId,
        specialRequests: notes,
        venueLocation: venue,
        estimatedQuote: prefill?.totalQuote,
      });

      setSuccessInfo(res);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Submission failed. Please try again.';
      setErrorMsg(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div ref={modalCardRef} className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div>
            <h3 className={styles.modalTitle}>Ahlan Catering Concierge</h3>
            <p className={styles.modalSubtitle}>
              Request date reservation, corporate lunch trial or personalized catering proposal
            </p>
          </div>
          <button onClick={onClose} className={styles.closeBtn} aria-label="Close modal">
            ✕
          </button>
        </div>

        {successInfo ? (
          <div className={styles.successWrap}>
            <div className={styles.successIcon}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h4 className={styles.successTitle}>Inquiry Received!</h4>
            <p className={styles.successMsg}>{successInfo.message}</p>
            <div className={styles.refBadge}>Reference ID: #{successInfo.id}</div>
            <button onClick={onClose} className={styles.submitBtn}>
              Back to Ahlan Catering
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.formBody}>
            {prefill?.totalQuote && (
              <div className={styles.quoteBanner}>
                <span className={styles.quoteBannerText}>Estimated Quote Attached</span>
                <span className={styles.quoteBannerTotal}>
                  ${prefill.totalQuote.toLocaleString()}
                </span>
              </div>
            )}

            {errorMsg && (
              <div style={{ color: '#d32f2f', fontSize: '13px', marginBottom: '14px' }}>
                {errorMsg}
              </div>
            )}

            <div className={styles.inputGrid}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Elena Rostova"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="elena@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.formInput}
                />
              </div>
            </div>

            <div className={styles.inputGrid}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Phone / WhatsApp</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Proposed Event Date *</label>
                <input
                  type="date"
                  required
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className={styles.formInput}
                />
              </div>
            </div>

            <div className={styles.inputGrid}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Occasion</label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value as EventType)}
                  className={styles.formSelect}
                >
                  <option value="corporate-lunch">Corporate Office Lunch Subscription</option>
                  <option value="wedding">Wedding Gala & Reception</option>
                  <option value="corporate-gala">Corporate Executive Gala & Summit</option>
                  <option value="private-dinner">Private Chef Dinner & Celebration</option>
                  <option value="cocktail-reception">Cocktail & Canapés Reception</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Estimated Guests</label>
                <input
                  type="number"
                  min="10"
                  max="1000"
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className={styles.formInput}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Venue / City Location</label>
              <input
                type="text"
                placeholder="e.g. The Grand Botanical Atrium, New York"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Dietary Preferences & Notes</label>
              <textarea
                rows={3}
                placeholder="Mention allergies (Halal, Gluten-Free, Vegan, Shellfish), special requests, or timeline..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className={styles.formTextarea}
              ></textarea>
            </div>

            <button type="submit" disabled={isSubmitting} className={styles.submitBtn}>
              {isSubmitting ? 'Submitting to Firestore...' : 'Confirm Catering Reservation Request'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
