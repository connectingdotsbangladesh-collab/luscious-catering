# Shared & Feature UI Components — Luscious Haute Catering

- **Framework**: React 18 + Next.js 14.2.35 (App Router, SSR)
- **Component Library**: Custom React Components (`src/components/`)
- **CSS Approach**: Custom CSS Modules (`*.module.css`) + Global CSS Variables (`src/styles/variables.css`, `src/styles/animations.css`)
- **Animation Engine**: GSAP 3 + ScrollTrigger + Lenis Smooth Scroll

---

## 1. `BookingModal`
- **File Path**: `src/components/booking/BookingModal.tsx`
- **CSS Module**: `src/components/booking/Booking.module.css`
- **Description**: Luxury catering inquiry and date reservation modal dialog connected to Firebase Firestore (`submitCateringInquiry`).
- **Key Props**: `isOpen: boolean`, `onClose: () => void`, `prefill?: { guestCount?: number; eventType?: EventType; packageId?: string; totalQuote?: number; dishName?: string }`

```tsx
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
            <h3 className={styles.modalTitle}>Luscious Banquet Concierge</h3>
            <p className={styles.modalSubtitle}>
              Request date reservation & personalized culinary proposal
            </p>
          </div>
          <button onClick={onClose} className={styles.closeBtn} aria-label="Close modal">
            ✕
          </button>
        </div>
        {/* Form & Success state rendered inside modalContent */}
      </div>
    </div>
  );
};
```

---

## 2. `AuthModal`
- **File Path**: `src/components/auth/AuthModal.tsx`
- **CSS Module**: `src/components/auth/Auth.module.css`
- **Description**: Firebase Authentication modal supporting Sign In, Create Account, and Guest Connoisseur login flows.
- **Key Props**: `isOpen: boolean`, `onClose: () => void`

```tsx
'use client';

import React, { useState, useRef } from 'react';
import styles from './Auth.module.css';
import { useAuth } from '../../lib/firebase/authContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const modalCardRef = useRef<HTMLDivElement>(null);

  const { signIn, signUp, signInGuest } = useAuth();

  if (!isOpen) return null;

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div ref={modalCardRef} className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <button onClick={onClose} className={styles.closeBtn} aria-label="Close">
            ✕
          </button>
          <span className={styles.brandLogo}>luscious</span>
          <p className={styles.modalSubtitle}>
            {mode === 'login'
              ? 'Welcome back to your catering profile'
              : 'Create an account to manage your event menu'}
          </p>
          <div className={styles.tabRow}>
            <button
              className={`${styles.tabBtn} ${mode === 'login' ? styles.tabBtnActive : ''}`}
              onClick={() => setMode('login')}
            >
              Sign In
            </button>
            <button
              className={`${styles.tabBtn} ${mode === 'signup' ? styles.tabBtnActive : ''}`}
              onClick={() => setMode('signup')}
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
```

---

## 3. `useMagnetic` Hook
- **File Path**: `src/lib/animations/useMagnetic.ts`
- **Description**: Dual-layer magnetic cursor pull hook for buttons (`Login`, `Explore Now`, `subscribe`) using `gsap.quickTo`.

```ts
'use client';

import { useEffect, RefObject } from 'react';
import gsap from 'gsap';

interface MagneticOptions {
  strength?: number;
  textStrength?: number;
}

export function useMagnetic<T extends HTMLElement>(
  ref: RefObject<T>,
  options: MagneticOptions = {}
) {
  const { strength = 0.32, textStrength } = options;
  const innerStrength = textStrength ?? strength * 0.45;
  // Attaches mousemove / mouseleave quickTo elastic pull on fine-pointer devices
}
```
