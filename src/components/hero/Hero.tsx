'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Hero.module.css';
import { useMagnetic } from '../../lib/animations/useMagnetic';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onExploreClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const spoonsScrollRef = useRef<HTMLDivElement>(null);
  const spoonsInteractiveRef = useRef<HTMLDivElement>(null);
  const spoonsImgWrapRef = useRef<HTMLDivElement>(null);

  const textColRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaWrapRef = useRef<HTMLDivElement>(null);
  const exploreBtnRef = useRef<HTMLButtonElement>(null);

  const foodScrollRef = useRef<HTMLDivElement>(null);
  const foodPerspectiveRef = useRef<HTMLDivElement>(null);
  const foodEntranceRef = useRef<HTMLDivElement>(null);

  // Magnetic effect on the inner Explore Now button (isolated from ctaWrapRef entrance)
  useMagnetic(exploreBtnRef, { strength: 0.34 });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Cinematic Opening Sequence:
      // - Non-round elements (Spoons, Headings, Subheading, Description, CTA) SWIPE in smoothly from outside the screen
      // - Round Wooden Dumpling Platter HOVERS / GLIDES in smoothly from outside the screen
      const tl = gsap.timeline({
        defaults: { ease: 'power2.out', force3D: true },
      });

      if (bgRef.current) {
        tl.fromTo(
          bgRef.current,
          { scale: 1.06 },
          { scale: 1, duration: 2.0, ease: 'power2.out' },
          0
        );
      }

      // Non-round: Top-left wooden spoons swipe in smoothly from outside the left edge of the screen
      if (spoonsImgWrapRef.current) {
        tl.fromTo(
          spoonsImgWrapRef.current,
          { x: '-42vw', y: 0, opacity: 0 },
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 1.4,
            ease: 'power2.out',
          },
          0.1
        );
      }

      // Non-round: Main heading lines swipe in smoothly from left
      const headingLines = heroRef.current?.querySelectorAll('.hero-line-inner');
      if (headingLines && headingLines.length > 0) {
        tl.fromTo(
          headingLines,
          { x: -80, yPercent: 0, opacity: 0 },
          {
            x: 0,
            yPercent: 0,
            opacity: 1,
            duration: 1.1,
            stagger: 0.1,
            ease: 'power2.out',
          },
          0.14
        );
      }

      // Non-round: Subheading swipes in smoothly from left
      const subWords = heroRef.current?.querySelectorAll('.hero-sub-word');
      if (subWords && subWords.length > 0) {
        tl.fromTo(
          subWords,
          { x: -60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.0,
            stagger: 0.03,
            ease: 'power2.out',
          },
          0.26
        );
      }

      // Non-round: Description copy swipes in smoothly from left
      if (descRef.current) {
        tl.fromTo(
          descRef.current,
          { x: -60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.0,
            ease: 'power2.out',
          },
          0.38
        );
      }

      // Non-round: Explore Now CTA button swipes in smoothly from left
      if (ctaWrapRef.current) {
        tl.fromTo(
          ctaWrapRef.current,
          { x: -60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.0,
            ease: 'power2.out',
          },
          0.48
        );
      }

      // Round Product: Wooden Dumpling Platter glides in smoothly from outside the right of the screen
      if (foodEntranceRef.current) {
        tl.fromTo(
          foodEntranceRef.current,
          { x: '56vw', y: 0, rotation: 22, scale: 0.9, opacity: 0 },
          {
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            opacity: 1,
            duration: 1.5,
            ease: 'power2.out',
          },
          0.18
        );
      }
    }, heroRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const subHeadingWords = 'Life is so endlessly delicious.'.split(' ');
  const descriptionWords =
    'Dumpling is a broad classification for a dish that consists of pieces of dough made from a variety of starch sources wrapped around a filling, or of dough with no filling.'.split(
      ' '
    );

  return (
    <section className={styles.hero} ref={heroRef}>
      {/* Background with seamless bottom transition mask */}
      <div ref={bgRef} className={styles.heroBackground} />

      {/* Floating Spoons with Spices (Top-Left of Composition) */}
      <div ref={spoonsScrollRef} className={styles.spoonsContainer}>
        <div ref={spoonsInteractiveRef}>
          <div ref={spoonsImgWrapRef}>
            <Image
              src="/studio_4k_v3_spoons.png"
              alt="Artisanal Spices & Wooden Spoons"
              width={900}
              height={1050}
              quality={100}
              className={styles.spoonsImage}
              priority
            />
          </div>
        </div>
      </div>

      <div className={styles.heroContainer}>
        {/* Left Column: Pinterest Headline & Brand Story */}
        <div ref={textColRef} className={styles.textColumn}>
          <h1 className={styles.mainHeading}>
            <span className={`${styles.headingLine} lineMask`}>
              <span className="lineInner hero-line-inner">Take a taste</span>
            </span>
            <span className={`${styles.headingLine} lineMask`}>
              <span className="lineInner hero-line-inner">Come join us.</span>
            </span>
          </h1>

          <h2 className={styles.subHeading}>
            {subHeadingWords.map((word, idx) => (
              <React.Fragment key={idx}>
                <span className="wordMask">
                  <span className="wordInner hero-sub-word">{word}</span>
                </span>
                {idx < subHeadingWords.length - 1 ? ' ' : ''}
              </React.Fragment>
            ))}
          </h2>

          <p ref={descRef} className={styles.descriptionText}>
            {descriptionWords.map((word, idx) => (
              <React.Fragment key={idx}>
                <span className="wordMask">
                  <span className="wordInner hero-desc-word">{word}</span>
                </span>
                {idx < descriptionWords.length - 1 ? ' ' : ''}
              </React.Fragment>
            ))}
          </p>

          <div ref={ctaWrapRef} className={styles.ctaWrapper}>
            <button
              ref={exploreBtnRef}
              onClick={onExploreClick}
              className={`${styles.exploreBtn} btnOverflow`}
              aria-label="Explore menu"
            >
              <span data-magnetic-text style={{ display: 'inline-block' }}>
                Explore Now
              </span>
            </button>
          </div>
        </div>

        {/* Right Column: Master Food Composition with Off-Screen Hover Glide */}
        <div ref={foodScrollRef} className={styles.foodColumn}>
          <div ref={foodPerspectiveRef} className={styles.foodPerspectiveBox}>
            <div
              ref={foodEntranceRef}
              className={styles.foodImageWrapper}
            >
              <div className={styles.foodHoverLoop}>
                <Image
                  src="/studio_4k_v3_hero_food.png"
                  alt="Artisanal Steamed Dumplings with Chopsticks, Dipping Sauce, Tomatoes and Herbs"
                  width={1400}
                  height={1400}
                  quality={100}
                  className={styles.foodImage}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
