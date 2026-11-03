'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './TestimonialsSection.module.css';

gsap.registerPlugin(ScrollTrigger);

interface TestimonialItem {
  id: number;
  avatar: string;
  name: string;
  role: string;
  phrases: string[];
}

export const TestimonialsSection: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(1); // 1 = middle avatar (Paula Abdul review from Photo 3)
  const [displayedIdx, setDisplayedIdx] = useState(1);
  const isFirstRender = useRef(true);

  const sectionRef = useRef<HTMLElement>(null);
  const starAniseRef = useRef<HTMLDivElement>(null);
  const bokchoyRef = useRef<HTMLDivElement>(null);
  const bowlScrollRef = useRef<HTMLDivElement>(null);
  const bowlEntranceRef = useRef<HTMLDivElement>(null);
  const contentColRef = useRef<HTMLDivElement>(null);
  const quoteMarkRef = useRef<HTMLSpanElement>(null);
  const quoteBlockRef = useRef<HTMLDivElement>(null);
  const avatarsRowRef = useRef<HTMLDivElement>(null);

  const testimonials: TestimonialItem[] = [
    {
      id: 0,
      avatar: '/studio_4k_v3_avatar1.png',
      name: 'Marcus Chen',
      role: 'Head of People & Culture, Apex Tech HQ',
      phrases: [
        'Ahlan Catering completely transformed our corporate lunch experience. ',
        'Every day at 12:45 PM sharp, over 180 team members receive piping-hot, healthy executive bento boxes. ',
        'The menu never gets repetitive, and our afternoon productivity has noticeably soared. ',
        'Unrivaled consistency and warmth! ”',
      ],
    },
    {
      id: 1,
      avatar: '/studio_4k_v3_avatar2.png',
      name: 'Sarah Jenkins',
      role: 'Wedding Host & Bride',
      phrases: [
        'For our 550-guest grand wedding reception, choosing Ahlan Catering was the best decision we made. ',
        'The live dumpling and BBQ stations were an absolute showstopper, OMG!!! ',
        'Every single guest raved about the flavors, the royal chafing presentation, and the courteous waitstaff. ',
        'They treated us truly like family from start to finish. ”',
      ],
    },
    {
      id: 2,
      avatar: '/studio_4k_v3_avatar3.png',
      name: 'David Laurent',
      role: 'Director of Global Summits',
      phrases: [
        'Ahlan orchestrated a flawless 3-day catering service for our 800-attendee leadership summit. ',
        'Their strict 100% Halal certification, hygienic ISO standards, and seamless VIP buffet coordination ',
        'earned praise from both our international delegates and keynote speakers. Absolute gold standard. ”',
      ],
    },
  ];

  const current = testimonials[displayedIdx];

  // ScrollTrigger Entrance & Scrub Parallax
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const titleEl = contentColRef.current?.querySelector('h2');
      const subtitleEl = contentColRef.current?.querySelector('.testi-subtitle');
      const avatarBtns = avatarsRowRef.current?.querySelectorAll('button');

      // Wait until Testimonials is scrolled into view (60% from top)
      const sectionTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none none',
        },
        defaults: { ease: 'power2.out', force3D: true },
      });

      // 1. Round Scalloped Noodle Bowl: Smooth Hover Glide In from Outside the Left of the Screen
      if (bowlEntranceRef.current) {
        sectionTl.fromTo(
          bowlEntranceRef.current,
          { x: '-54vw', y: -28, rotation: -32, scale: 0.86, opacity: 0 },
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

      // 2. Non-Round Side Cutouts (Star Anise & Bok Choy): Smooth Swipe In from Outside the Right Edge of the Screen
      if (starAniseRef.current) {
        sectionTl.fromTo(
          starAniseRef.current,
          { x: '50vw', opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.4,
          },
          0.05
        );
      }

      if (bokchoyRef.current) {
        sectionTl.fromTo(
          bokchoyRef.current,
          { x: '50vw', opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.4,
          },
          0.18
        );
      }

      // 3. Right Column: Non-Round Heading, Subtitle & Quote Block Swipe In from Outside the Right of the Screen
      if (titleEl) {
        sectionTl.fromTo(
          titleEl,
          { x: '55vw', opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.35,
          },
          0.08
        );
      }

      if (subtitleEl) {
        sectionTl.fromTo(
          subtitleEl,
          { x: '55vw', opacity: 0 },
          { x: 0, opacity: 1, duration: 1.35 },
          0.16
        );
      }

      if (quoteBlockRef.current) {
        sectionTl.fromTo(
          quoteBlockRef.current,
          { x: '55vw', opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.4,
          },
          0.24
        );
      }

      // 4. Round Avatars: Smooth Hover Glide In from Outside the Right of the Screen
      if (avatarBtns && avatarBtns.length > 0) {
        sectionTl.fromTo(
          avatarBtns,
          { x: '52vw', y: -16, rotation: 24, scale: 0.84, opacity: 0 },
          {
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            opacity: 1,
            duration: 1.4,
            stagger: 0.08,
            ease: 'power2.out',
          },
          0.32
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Two-Stage Out/In Quote Transition on Avatar Click (Non-blocking for rapid clicks)
  const handleSelectAvatar = (idx: number) => {
    if (idx === activeIdx) return;
    setActiveIdx(idx);

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion || !quoteBlockRef.current) {
      setDisplayedIdx(idx);
      return;
    }

    gsap.killTweensOf(quoteBlockRef.current);

    // Stage 1: Quick fade out current quote, then swap displayedIdx
    gsap.to(quoteBlockRef.current, {
      opacity: 0,
      x: -24,
      duration: 0.16,
      ease: 'power2.in',
      overwrite: 'auto',
      onComplete: () => {
        setDisplayedIdx(idx);
      },
    });
  };

  // Stage 2: Swipe new quote block in from outside the right of the screen when displayedIdx updates
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (!quoteBlockRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        quoteBlockRef.current,
        { x: '52vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power2.out',
          overwrite: 'auto',
        }
      );
    }, quoteBlockRef);

    return () => ctx.revert();
  }, [displayedIdx]);

  const handleBowlMouseMove = () => {};
  const handleBowlMouseLeave = () => {};

  const titleWords = "Words From Our Table".split(' ');

  return (
    <section ref={sectionRef} className={styles.section} id="testimonials">
      {/* Floating Star Anise & Disc in Ultra-HD (Top-Right) */}
      <div ref={starAniseRef} className={styles.decorStarAnise}>
        <Image
          src="/studio_4k_v3_star_anise.png"
          alt="Star anise spices and peppercorns"
          width={600}
          height={420}
          quality={100}
          className={styles.decorImg}
        />
      </div>

      {/* Floating Bok Choy & Onion in Ultra-HD (Bottom-Right) */}
      <div ref={bokchoyRef} className={styles.decorBokchoy}>
        <Image
          src="/studio_4k_v3_bokchoy.png"
          alt="Fresh bok choy and sliced purple onion"
          width={600}
          height={560}
          quality={100}
          className={styles.decorImg}
        />
      </div>

      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Left Column: Big Bowl of Noodles in Ultra-HD — 100% Play Button Free! */}
          <div
            ref={bowlScrollRef}
            className={styles.imageColumn}
            onMouseMove={handleBowlMouseMove}
            onMouseLeave={handleBowlMouseLeave}
          >
            <div ref={bowlEntranceRef} className={styles.noodleBowlWrapper}>
              <div className={styles.bowlHoverLoop}>
                <Image
                  src="/studio_4k_v3_noodle_bowl.png"
                  alt="Artisanal noodles in savory red sauce with basil and chopsticks"
                  width={1200}
                  height={1200}
                  quality={100}
                  className={styles.noodleBowlImg}
                  priority
                />
              </div>
            </div>
          </div>

          {/* Right Column: Title, Subtitle, Quote & Interactive Avatars */}
          <div ref={contentColRef} className={styles.contentColumn}>
            <h2 className={styles.title}>
              {titleWords.map((word, idx) => (
                <React.Fragment key={idx}>
                  <span className="wordMask">
                    <span className="wordInner testi-title-word">{word}</span>
                  </span>
                  {idx < titleWords.length - 1 ? ' ' : ''}
                </React.Fragment>
              ))}
            </h2>
            <p className={`${styles.subtitle} testi-subtitle`}>
              Trusted by Corporate Leaders, HR Directors & Wedding Hosts
            </p>

            {/* Testimonial Quote with Phrase-by-Phrase Storytelling */}
            <div ref={quoteBlockRef} className={styles.quoteBlock}>
              <span ref={quoteMarkRef} className={styles.quoteMark}>
                “
              </span>
              <p className={styles.quoteText}>
                {current.phrases.map((phrase, pIdx) => (
                  <span key={pIdx} className="phraseItem testi-phrase">
                    {phrase}
                  </span>
                ))}
              </p>
            </div>

            {/* 3 Interactive Avatars in Studio-HD matching Photo 3 */}
            <div ref={avatarsRowRef} className={styles.avatarsRow}>
              {testimonials.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => handleSelectAvatar(idx)}
                  className={`${styles.avatarBtn} ${
                    activeIdx === idx ? styles.avatarActive : ''
                  }`}
                  aria-label={`View review from ${item.name}`}
                >
                  <div className={styles.avatarCircle}>
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      width={240}
                      height={240}
                      quality={100}
                      className={styles.avatarImg}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
