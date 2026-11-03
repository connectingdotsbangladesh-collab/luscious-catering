'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './NewsletterSection.module.css';
import { useMagnetic } from '../../lib/animations/useMagnetic';

gsap.registerPlugin(ScrollTrigger);

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const skilletRef = useRef<HTMLDivElement>(null);
  const pepperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const btnWrapRef = useRef<HTMLDivElement>(null);
  const subscribeBtnRef = useRef<HTMLButtonElement>(null);

  useMagnetic(subscribeBtnRef, { strength: 0.3 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail('');
      }, 4000);
    }
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const titleEl = contentRef.current?.querySelector('h2');
      const subtitleEl = contentRef.current?.querySelector('.news-subtitle');

      // Wait until Newsletter is scrolled into view (60% from top)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none none',
        },
        defaults: { ease: 'power2.out', force3D: true },
      });

      // 1. Round Cast-Iron Broccoli Skillet: Smooth Hover Glide In from Outside the Right of the Screen
      if (skilletRef.current) {
        tl.fromTo(
          skilletRef.current,
          { x: '50vw', y: -26, rotation: 32, scale: 0.86, opacity: 0 },
          {
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            opacity: 1,
            duration: 1.65,
            ease: 'power2.out',
          },
          0
        );
      }

      // 2. Non-Round Red Bell Pepper: Smooth Swipe In from Outside the Left Edge of the Screen
      if (pepperRef.current) {
        tl.fromTo(
          pepperRef.current,
          { x: '-50vw', opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.4,
          },
          0.05
        );
      }

      // 3. Non-Round Heading, Subtitle & Form: Smooth Horizontal Swipe In from Outside the Screen
      if (titleEl) {
        tl.fromTo(
          titleEl,
          { x: '-60vw', opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.35,
          },
          0.08
        );
      }

      if (subtitleEl) {
        tl.fromTo(
          subtitleEl,
          { x: '60vw', opacity: 0 },
          { x: 0, opacity: 1, duration: 1.35 },
          0.16
        );
      }

      if (formRef.current) {
        tl.fromTo(
          formRef.current,
          {
            x: '-60vw',
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 1.4,
          },
          0.24
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const titleWords = 'Taste The Ahlan Difference Today'.split(' ');

  return (
    <section ref={sectionRef} className={styles.section} id="newsletter">
      {/* Floating Elements from Photo 4 in Ultra-HD */}
      <div ref={skilletRef} className={styles.decorSkillet}>
        <div className={styles.skilletHoverLoop}>
          <Image
            src="/studio_4k_v3_skillet.png"
            alt="Black frying pan with fresh broccoli"
            width={800}
            height={800}
            quality={100}
            className={styles.decorImg}
          />
        </div>
      </div>

      <div ref={pepperRef} className={styles.decorPepper}>
        <Image
          src="/studio_4k_v3_pepper.png"
          alt="Fresh red bell pepper"
          width={500}
          height={440}
          quality={100}
          className={styles.decorImg}
        />
      </div>

      <div className={styles.container}>
        <div ref={contentRef} className={styles.content}>
          <h2 className={styles.title}>
            {titleWords.map((word, idx) => (
              <React.Fragment key={idx}>
                <span className="wordMask">
                  <span className="wordInner news-title-word">{word}</span>
                </span>
                {idx < titleWords.length - 1 ? ' ' : ''}
              </React.Fragment>
            ))}
          </h2>
          <p className={`${styles.subtitle} news-subtitle`}>
            Request a complimentary corporate office tasting box or schedule an event menu
            consultation with our Executive Chef.
          </p>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className={`${styles.subscribeForm} ${
              isFocused ? styles.formFocused : ''
            }`}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Enter corporate or personal email"
              required
              className={styles.emailInput}
            />
            <div ref={btnWrapRef} className="magneticWrap">
              <button
                ref={subscribeBtnRef}
                type="submit"
                className={`${styles.subscribeBtn} btnOverflow`}
              >
                <span data-magnetic-text style={{ display: 'inline-block' }}>
                  {submitted ? 'Inquiry Sent!' : 'Request Tasting'}
                </span>
              </button>
            </div>
          </form>

          {submitted && (
            <p className={styles.successMessage}>
              Thank you! Our concierge team will reach out promptly to coordinate your tasting box or event consultation.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
