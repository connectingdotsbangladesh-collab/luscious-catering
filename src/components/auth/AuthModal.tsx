'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
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

  useEffect(() => {
    if (!isOpen || !modalCardRef.current) return;
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        modalCardRef.current,
        { scale: 0.94, y: 16, opacity: 0 },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 0.42,
          ease: 'expo.out',
        }
      );
      const els = modalCardRef.current?.querySelectorAll(
        `.${styles.formGroup}, .${styles.submitBtn}, .${styles.guestBtn}`
      );
      if (els && els.length > 0) {
        gsap.fromTo(
          els,
          { y: 12, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.45,
            stagger: 0.04,
            ease: 'power3.out',
          }
        );
      }
    }, modalCardRef);

    return () => ctx.revert();
  }, [isOpen, mode]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        await signIn(email, password);
      } else {
        await signUp(email, password, name);
      }
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Authentication error occurred';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGuest = async () => {
    setError('');
    setLoading(true);
    try {
      await signInGuest();
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Guest sign in failed';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

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

        <div className={styles.modalBody}>
          {error && <div className={styles.errorBanner}>{error}</div>}

          <form onSubmit={handleSubmit}>
            {mode === 'signup' && (
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Julian Sterling"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={styles.formInput}
                />
              </div>
            )}

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Email Address</label>
              <input
                type="email"
                required
                placeholder="julian@luxuryevents.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.formInput}
              />
            </div>

            <button type="submit" disabled={loading} className={styles.submitBtn}>
              {loading ? 'Authenticating...' : mode === 'login' ? 'Sign In' : 'Register Account'}
            </button>
          </form>

          <div className={styles.divider}>
            <span>or explore without password</span>
          </div>

          <button type="button" onClick={handleGuest} disabled={loading} className={styles.guestBtn}>
            Continue as Guest Connoisseur
          </button>
        </div>
      </div>
    </div>
  );
};
