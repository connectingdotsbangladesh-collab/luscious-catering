'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './ServicePillars.module.css';

gsap.registerPlugin(ScrollTrigger);

export interface MealBoxCard {
  id: string;
  scriptLabel: string;
  title: string;
  price: string;
  originalPrice: string;
  currency: string;
  rating: string;
  description: string;
  theme: 'olive' | 'amber';
  image: string;
  alt: string;
  category: string;
  serviceAnchor: string;
}

const SIGNATURE_BOXES: MealBoxCard[] = [
  {
    id: 'box-jeera-chawal',
    scriptLabel: 'Jeera',
    title: 'Chawal',
    price: '180',
    originalPrice: '200',
    currency: '₹',
    rating: '4.5',
    description:
      'Aromatic, soft, and tender grains of aged basmati layered with royal cumin seeds, golden ghee, and fresh garden cilantro.',
    theme: 'olive',
    image: '/bento_jeera_rice.png',
    alt: 'Jeera Chawal Executive Lunch Box',
    category: 'Corporate Office Lunch',
    serviceAnchor: 'packages',
  },
  {
    id: 'box-kadai-chicken',
    scriptLabel: 'Kadai',
    title: 'Chicken',
    price: '220',
    originalPrice: '260',
    currency: '₹',
    rating: '4.5',
    description:
      'Succulent chicken simmered in a spiced tomato-onion wok reduction with roasted bell peppers, crushed coriander, and house garam masala.',
    theme: 'amber',
    image: '/bento_kadai_chicken.png',
    alt: 'Kadai Chicken Banquet Box',
    category: 'Weddings & Celebrations',
    serviceAnchor: 'menu',
  },
  {
    id: 'box-palak-paneer',
    scriptLabel: 'Palak',
    title: 'Paneer',
    price: '200',
    originalPrice: '220',
    currency: '₹',
    rating: '4.5',
    description:
      'Fresh artisanal cottage cheese cubes folded into velvety slow-simmered spiced spinach purée, crowned with whole dried red chilies.',
    theme: 'olive',
    image: '/bento_palak_paneer.png',
    alt: 'Palak Paneer Bespoke Box',
    category: 'Live Cooking & Bespoke',
    serviceAnchor: 'calculator',
  },
];

interface ServicePillarsProps {
  onOrderNow?: (dishName: string) => void;
}

export const ServicePillars: React.FC<ServicePillarsProps> = ({ onOrderNow }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const cards = carouselRef.current?.querySelectorAll(`.${styles.bentoCard}`);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
        defaults: { ease: 'power2.out', force3D: true },
      });

      if (headerRef.current) {
        tl.fromTo(
          headerRef.current,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          0
        );
      }

      if (cards && cards.length > 0) {
        cards.forEach((card, idx) => {
          const fromX = idx === 0 ? -40 : idx === 1 ? 0 : 40;
          tl.fromTo(
            card,
            { x: fromX, y: 30, opacity: 0 },
            {
              x: 0,
              y: 0,
              opacity: 1,
              duration: 1.0,
            },
            0.15 + idx * 0.12
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handlePrev = () => {
    setStartIndex((prev) => (prev > 0 ? prev - 1 : SIGNATURE_BOXES.length - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev < SIGNATURE_BOXES.length - 1 ? prev + 1 : 0));
  };

  const displayedBoxes = SIGNATURE_BOXES.map((_, i) => {
    const idx = (startIndex + i) % SIGNATURE_BOXES.length;
    return SIGNATURE_BOXES[idx];
  });

  const handleOrderClick = (box: MealBoxCard) => {
    if (onOrderNow) {
      onOrderNow(`${box.scriptLabel} ${box.title}`);
    } else {
      const el = document.getElementById(box.serviceAnchor);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" ref={sectionRef} className={styles.sectionWrapper}>
      {/* Top Wave Organic Transition */}
      <div className={styles.waveTop} aria-hidden="true">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path
            d="M0,0 C320,60 560,10 880,55 C1200,90 1340,30 1440,50 L1440,0 L0,0 Z"
            fill="#faf8f5"
          />
        </svg>
      </div>

      <div className="container">
        {/* Section Header */}
        <div ref={headerRef} className={styles.headerArea}>
          <span className={styles.subHeading}>Daily Office Meals & Event Feasts</span>
          <h2 className={styles.sectionTitle}>Signature Ahlan Catering Boxes</h2>
          <p className={styles.sectionDesc}>
            From piping-hot daily corporate desk bento boxes to royal celebrations and live theatre
            stations — every dish is crafted with fresh whole spices and 5-star precision.
          </p>
        </div>

        {/* Carousel / Cards Track with Navigation Arrows */}
        <div className={styles.showcaseContainer}>
          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            className={`${styles.navArrow} ${styles.navArrowLeft}`}
            aria-label="Previous meal box"
          >
            <ChevronLeft size={22} strokeWidth={2.5} />
          </button>

          {/* 3 Signature Cards */}
          <div ref={carouselRef} className={styles.cardsGrid}>
            {displayedBoxes.map((box) => {
              const cardThemeClass =
                box.theme === 'olive' ? styles.themeOlive : styles.themeAmber;

              return (
                <article
                  key={box.id}
                  className={`${styles.bentoCard} ${cardThemeClass}`}
                >
                  {/* Floating Tilted Bento Container */}
                  <div className={styles.bentoTray}>
                    <Image
                      src={box.image}
                      alt={box.alt}
                      width={380}
                      height={320}
                      className={styles.trayImage}
                      priority
                    />
                  </div>

                  {/* Circular Price Stamp Badge */}
                  <div className={styles.priceStamp}>
                    <span className={styles.stampPriceLabel}>PRICE</span>
                    <div className={styles.stampPriceValue}>
                      <span className={styles.stampCurrency}>{box.currency}</span>
                      <span className={styles.stampAmount}>{box.price}</span>
                    </div>
                    <span className={styles.stampStrikePrice}>
                      {box.currency}
                      {box.originalPrice}
                    </span>
                  </div>

                  {/* Category Pill Tag */}
                  <div className={styles.categoryPill}>
                    <span>{box.category}</span>
                  </div>

                  {/* Cursive Subtitle */}
                  <span className={styles.cursiveSubtitle}>{box.scriptLabel}</span>

                  {/* Big Bold Dish Title */}
                  <h3 className={styles.dishTitle}>{box.title}</h3>

                  {/* Rating Capsule */}
                  <div className={styles.ratingCapsule}>
                    <span className={styles.starIcons}>★★★★★</span>
                    <span className={styles.ratingNumber}>{box.rating}</span>
                  </div>

                  {/* Appetizing Description Copy */}
                  <p className={styles.dishDescription}>{box.description}</p>

                  {/* Order Now CTA Button */}
                  <button
                    onClick={() => handleOrderClick(box)}
                    className={styles.orderBtn}
                  >
                    ORDER NOW
                  </button>
                </article>
              );
            })}
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            className={`${styles.navArrow} ${styles.navArrowRight}`}
            aria-label="Next meal box"
          >
            <ChevronRight size={22} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Bottom Wave Transition */}
      <div className={styles.waveBottom} aria-hidden="true">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path
            d="M0,40 C340,80 620,10 980,60 C1220,90 1360,35 1440,45 L1440,80 L0,80 Z"
            fill="#faf8f5"
          />
        </svg>
      </div>
    </section>
  );
};
