'use client';

import React, { useState } from 'react';
import { MenuItem } from '../../domain/types';
import { Navbar } from '../layout/Navbar';
import { Hero } from '../hero/Hero';
import { MenuSection } from '../menu/MenuSection';
import { TestimonialsSection } from '../testimonials/TestimonialsSection';
import { NewsletterSection } from '../newsletter/NewsletterSection';
import { Footer } from '../layout/Footer';
import { BookingModal } from '../booking/BookingModal';
import { AuthModal } from '../auth/AuthModal';

interface HomeClientViewProps {
  initialMenuItems?: MenuItem[];
  initialPackages?: unknown[];
}

export const HomeClientView: React.FC<HomeClientViewProps> = ({
  initialMenuItems,
}) => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingPrefill, setBookingPrefill] = useState<{
    dishName?: string;
  }>({});

  const handleSelectDish = (dish: MenuItem) => {
    setBookingPrefill({
      dishName: dish.name,
    });
    setIsBookingOpen(true);
  };

  const scrollToMenu = () => {
    const lenis = (
      window as Window & {
        __lenis?: {
          scrollTo: (
            target: HTMLElement | string,
            options?: { offset?: number; duration?: number }
          ) => void;
        };
      }
    ).__lenis;
    const menuEl = document.getElementById('menu');
    if (lenis && menuEl) {
      lenis.scrollTo(menuEl, { offset: -20, duration: 1.25 });
    } else {
      menuEl?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Navbar onOpenAuth={() => setIsAuthOpen(true)} />

      <main>
        {/* Section 1: Hero (Matches Photo 1) */}
        <Hero onExploreClick={scrollToMenu} />

        {/* Section 2: What's on our Plate (Matches Photo 2) */}
        <MenuSection
          items={initialMenuItems}
          onSelectDish={handleSelectDish}
        />

        {/* Section 3: Let's see what other says (Matches Photo 3) */}
        <TestimonialsSection />

        {/* Section 4: Newsletter (Matches Photo 4) */}
        <NewsletterSection />
      </main>

      {/* Footer (Matches Photo 4) */}
      <Footer />

      {/* Booking Concierge Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        prefill={bookingPrefill}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />
    </>
  );
};
