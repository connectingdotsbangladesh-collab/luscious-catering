'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './MenuSection.module.css';
import { MenuItem } from '../../domain/types';

gsap.registerPlugin(ScrollTrigger);

interface MenuSectionProps {
  items?: MenuItem[];
  onSelectDish?: (dish: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onSelectDish }) => {
  const [activeTab, setActiveTab] = useState<
    'Corporate Lunch' | 'Event Banquets' | 'Live Stations'
  >('Corporate Lunch');
  const isFirstRender = useRef(true);

  const sectionRef = useRef<HTMLElement>(null);
  const snowpeasRef = useRef<HTMLDivElement>(null);
  const lobsterRef = useRef<HTMLDivElement>(null);
  const garlicRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const tabsWrapRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const corporateDishes = [
    {
      id: 'corp-1',
      name: 'Executive Royal Bento',
      description:
        'Tender herb-marinated chicken or glazed cuts, aromatic basmati pilaf, wok-tossed farm greens, lentil soup & fresh sweet.',
      image: '/studio_4k_v3_stirred_egg.png',
      price: 14,
    },
    {
      id: 'corp-2',
      name: 'Artisan Protein & Grain Bowl',
      description:
        'Grilled lemon-herb chicken over organic quinoa, steamed edamame, crisp garden greens, and sweet sesame citrus vinaigrette.',
      image: '/studio_4k_v3_kung_pao.png',
      price: 15,
    },
    {
      id: 'corp-3',
      name: 'Grand Corporate Thali Box',
      description:
        'A comforting corporate feast: rich Cashew korma, ghee pilaf, tempered yellow dal, handmade paratha, and mint raita.',
      image: '/studio_4k_v3_pork_chops.png',
      price: 16,
    },
  ];

  const banquetDishes = [
    {
      id: 'banquet-1',
      name: 'Royal Steamed Dumpling Platter',
      description:
        'Handmade thin pastry pleated by dim sum masters, stuffed with savory tender filling, accompanied by aged chili garlic oil.',
      image: '/studio_4k_v3_hero_food.png',
      price: 18,
    },
    {
      id: 'banquet-2',
      name: 'Imperial Szechuan Wok Sizzle',
      description:
        'Crispy poultry tenders enveloped in a rich, glossy reduction of fermented chili, crushed ginger, sweet garlic, and roasted peanuts.',
      image: '/studio_4k_v3_kung_pao.png',
      price: 22,
    },
    {
      id: 'banquet-3',
      name: 'Slow-Braised Glazed Medallions',
      description:
        'Slow-cooked for over six hours until fork-tender, basted in spiced star anise reduction, caramelized ginger, and baby greens.',
      image: '/studio_4k_v3_pork_chops.png',
      price: 26,
    },
  ];

  const liveStationDishes = [
    {
      id: 'live-1',
      name: 'Interactive Dim Sum Theatre',
      description:
        'Master chefs rolling and steaming hot dumplings live before your guests with 6 artisan signature dipping sauces.',
      image: '/studio_4k_v3_hero_food.png',
      price: 35,
    },
    {
      id: 'live-2',
      name: 'Cast-Iron Skillet & Sizzle',
      description:
        'Live charred skewers, flame-kissed greens, and spiced artisan flatbreads straight off the sizzling griddle.',
      image: '/studio_4k_v3_skillet.png',
      price: 32,
    },
    {
      id: 'live-3',
      name: 'Imperial Crayfish Glaze',
      description:
        'Sweet red river crayfish simmered in aromatic star anise, citrus pearls, and Szechuan peppercorn glaze.',
      image: '/studio_4k_v3_lobster.png',
      price: 38,
    },
  ];

  const currentDishes =
    activeTab === 'Corporate Lunch'
      ? corporateDishes
      : activeTab === 'Event Banquets'
      ? banquetDishes
      : liveStationDishes;

  // Position & animate the sliding orange tab underline indicator
  useEffect(() => {
    const updateIndicator = (animate = true) => {
      if (!tabsWrapRef.current || !indicatorRef.current) return;
      const activeBtn = tabsWrapRef.current.querySelector(
        `[data-tab="${activeTab}"]`
      ) as HTMLElement | null;
      if (!activeBtn) return;

      const wrapRect = tabsWrapRef.current.getBoundingClientRect();
      const btnRect = activeBtn.getBoundingClientRect();
      const x = btnRect.left - wrapRect.left;
      const width = btnRect.width;

      if (animate) {
        gsap.to(indicatorRef.current, {
          x,
          width,
          duration: 0.55,
          ease: 'expo.out',
        });
      } else {
        gsap.set(indicatorRef.current, { x, width });
      }
    };

    updateIndicator(!isFirstRender.current);
    const settleTimer = window.setTimeout(() => updateIndicator(false), 250);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => updateIndicator(false));
    }
    const onResize = () => updateIndicator(false);
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      window.clearTimeout(settleTimer);
      window.removeEventListener('resize', onResize);
    };
  }, [activeTab]);

  // ScrollTrigger Section Entrance & Floating Ingredients Parallax
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Non-round Header Elements & Top Cutouts:
      //    Triggers ONLY when user scrolls down and header reaches 60% of viewport (well into view)
      const titleEl = headerRef.current?.querySelector('h2');
      const subtitleEl = headerRef.current?.querySelector('.menu-subtitle');

      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 60%',
          toggleActions: 'play none none none',
        },
        defaults: { ease: 'power2.out', force3D: true },
      });

      if (snowpeasRef.current) {
        headerTl.fromTo(
          snowpeasRef.current,
          { x: '-50vw', opacity: 0 },
          { x: 0, opacity: 1, duration: 1.4 },
          0
        );
      }

      if (lobsterRef.current) {
        headerTl.fromTo(
          lobsterRef.current,
          { x: '50vw', opacity: 0 },
          { x: 0, opacity: 1, duration: 1.4 },
          0.05
        );
      }

      if (titleEl) {
        headerTl.fromTo(
          titleEl,
          { x: '-60vw', opacity: 0 },
          { x: 0, opacity: 1, duration: 1.35 },
          0.08
        );
      }

      if (subtitleEl) {
        headerTl.fromTo(
          subtitleEl,
          { x: '60vw', opacity: 0 },
          { x: 0, opacity: 1, duration: 1.35 },
          0.16
        );
      }

      if (tabsWrapRef.current) {
        headerTl.fromTo(
          tabsWrapRef.current,
          { x: '-60vw', opacity: 0 },
          { x: 0, opacity: 1, duration: 1.35 },
          0.24
        );
      }

      // 2. Dishes Row (3 Round Dish Plates + Non-Round Names, Descriptions & Bottom Garlic):
      //    Triggers ONLY when the 3-dishes row is scrolled to 60% of viewport (directly in front of user)
      if (gridRef.current) {
        const plates = gridRef.current.querySelectorAll('.menu-plate-anim');
        const names = gridRef.current.querySelectorAll('.menu-name-anim');
        const descs = gridRef.current.querySelectorAll('.menu-desc-anim');

        const gridTl = gsap.timeline({
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 60%',
            toggleActions: 'play none none none',
          },
          defaults: { force3D: true, ease: 'power2.out' },
        });

        // Round Dish Plates: Smooth Hover Glide In from Outside the Screen
        plates.forEach((plate, idx) => {
          const fromX = idx === 0 ? '-52vw' : idx === 1 ? '52vw' : '56vw';
          const fromY = idx === 1 ? -30 : -22;
          const fromRot = idx === 0 ? -32 : idx === 1 ? 26 : 34;
          gridTl.fromTo(
            plate,
            { x: fromX, y: fromY, rotation: fromRot, scale: 0.86, opacity: 0 },
            {
              x: 0,
              y: 0,
              rotation: 0,
              scale: 1,
              opacity: 1,
              duration: 1.6,
              ease: 'power2.out',
            },
            idx * 0.12
          );
        });

        // Non-Round Dish Names: Smooth Horizontal Swipe In from Outside the Screen
        names.forEach((nameEl, idx) => {
          const fromX = idx === 0 ? '-55vw' : idx === 1 ? '-55vw' : '55vw';
          gridTl.fromTo(
            nameEl,
            { x: fromX, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 1.35,
              ease: 'power2.out',
            },
            0.18 + idx * 0.1
          );
        });

        // Non-Round Dish Descriptions: Smooth Horizontal Swipe In from Outside the Screen
        descs.forEach((descEl, idx) => {
          const fromX = idx === 0 ? '-55vw' : idx === 1 ? '55vw' : '55vw';
          gridTl.fromTo(
            descEl,
            { x: fromX, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 1.35,
              ease: 'power2.out',
            },
            0.26 + idx * 0.1
          );
        });

        // Non-Round Bottom-Left Garlic & Greens Cutout: Smooth Swipe In from Outside Left Edge
        if (garlicRef.current) {
          gridTl.fromTo(
            garlicRef.current,
            { x: '-50vw', opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 1.4,
              ease: 'power2.out',
            },
            0.2
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Tab Change Choreography
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion || !gridRef.current) return;

    const ctx = gsap.context(() => {
      const plates = gridRef.current?.querySelectorAll('.menu-plate-anim');
      const names = gridRef.current?.querySelectorAll('.menu-name-anim');
      const descs = gridRef.current?.querySelectorAll('.menu-desc-anim');

      if (plates && plates.length > 0) {
        plates.forEach((plate, idx) => {
          const fromX = idx === 0 ? '-48vw' : idx === 1 ? '62vw' : '48vw';
          const fromRot = idx === 0 ? -32 : idx === 1 ? 28 : 34;
          gsap.fromTo(
            plate,
            { x: fromX, y: -22, rotation: fromRot, scale: 0.86, opacity: 0 },
            {
              x: 0,
              y: 0,
              rotation: 0,
              scale: 1,
              opacity: 1,
              duration: 1.45,
              delay: idx * 0.1,
              ease: 'power2.out',
              force3D: true,
            }
          );
        });
      }

      if (names && names.length > 0) {
        names.forEach((nameEl, idx) => {
          const fromX = idx === 0 ? '-48vw' : idx === 1 ? '-62vw' : '48vw';
          gsap.fromTo(
            nameEl,
            { x: fromX, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 1.25,
              delay: 0.12 + idx * 0.08,
              ease: 'power2.out',
              force3D: true,
            }
          );
        });
      }

      if (descs && descs.length > 0) {
        descs.forEach((descEl, idx) => {
          const fromX = idx === 0 ? '-48vw' : idx === 1 ? '62vw' : '48vw';
          gsap.fromTo(
            descEl,
            { x: fromX, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 1.3,
              delay: 0.2 + idx * 0.08,
              ease: 'power2.out',
              force3D: true,
            }
          );
        });
      }
    }, gridRef);

    return () => ctx.revert();
  }, [activeTab]);

  // Clean non-jumping card hover handlers
  const handleCardMouseMove = () => {};
  const handleCardMouseLeave = () => {};

  const titleWords = "What's on our Plate".split(' ');

  return (
    <section ref={sectionRef} className={styles.section} id="menu">
      {/* Floating Decorative Elements matching Photo 2 in Ultra-HD */}
      <div ref={snowpeasRef} className={styles.decorSnowpeas}>
        <Image
          src="/studio_4k_v3_snowpeas.png"
          alt="Snow peas with chili and soy dipping sauce"
          width={600}
          height={580}
          quality={100}
          className={styles.decorImg}
        />
      </div>

      <div ref={lobsterRef} className={styles.decorLobster}>
        <Image
          src="/studio_4k_v3_lobster.png"
          alt="Artisanal chili dipping sauce with fresh herbs and peppercorns"
          width={600}
          height={360}
          quality={100}
          className={styles.decorImg}
        />
      </div>

      <div ref={garlicRef} className={styles.decorGarlic}>
        <Image
          src="/studio_4k_v3_garlic_greens.png"
          alt="Fresh garlic bulbs and spinach greens"
          width={600}
          height={360}
          quality={100}
          className={styles.decorImg}
        />
      </div>

      <div className={styles.container}>
        {/* Section Header */}
        <div ref={headerRef} className={styles.header}>
          <h2 className={styles.title} aria-label="What's on our Plate">
            {titleWords.map((word, wIdx) => (
              <React.Fragment key={wIdx}>
                <span className="wordMask" style={{ whiteSpace: 'nowrap' }}>
                  {word.split('').map((char, cIdx) => (
                    <span key={cIdx} className="charInner menu-title-char">
                      {char}
                    </span>
                  ))}
                </span>
                {wIdx < titleWords.length - 1 ? ' ' : ''}
              </React.Fragment>
            ))}
          </h2>
          <p className={`${styles.subtitle} menu-subtitle`}>
            100% Halal Certified • Prepared Fresh with Unconditional Hospitality
          </p>

          {/* Filter Tabs with Morphing Sliding Indicator */}
          <div ref={tabsWrapRef} className={styles.tabs}>
            {(
              [
                'Corporate Lunch',
                'Event Banquets',
                'Live Stations',
              ] as const
            ).map((tab) => (
              <button
                key={tab}
                data-tab={tab}
                onClick={() => setActiveTab(tab)}
                className={`${styles.tabBtn} menu-tab-btn ${
                  activeTab === tab ? styles.tabActive : ''
                }`}
              >
                {tab}
              </button>
            ))}
            <span ref={indicatorRef} className={styles.activeIndicator} />
          </div>
        </div>

        {/* 3 Dishes Row */}
        <div ref={gridRef} className={styles.dishesGrid}>
          {currentDishes.map((dish, idx) => (
            <div
              key={dish.id}
              className={styles.dishCard}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              onClick={() =>
                onSelectDish?.({
                  id: dish.id,
                  name: dish.name,
                  tagline: 'Artisanal Selection',
                  description: dish.description,
                  pricePerPerson: dish.price,
                  category:
                    activeTab === 'Corporate Lunch'
                      ? 'corporate-lunch'
                      : activeTab === 'Event Banquets'
                      ? 'gourmet-mains'
                      : 'live-stations',
                  dietary: dish.id === 'dish-1' ? ['vegetarian'] : ['chef-special'],
                  image: dish.image,
                })
              }
            >
              <div className={`${styles.plateWrapper} menu-plate-anim`}>
                <div
                  className={styles.plateHoverLoop}
                  style={{ animationDelay: `${idx * 0.55}s` }}
                >
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    width={900}
                    height={900}
                    quality={100}
                    className={styles.plateImage}
                    priority
                  />
                </div>
              </div>

              <h3 className={`${styles.dishName} menu-name-anim`}>{dish.name}</h3>
              <p className={`${styles.dishDescription} menu-desc-anim`}>
                {dish.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
