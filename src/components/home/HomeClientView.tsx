'use client';

import React, { useState } from 'react';
import { MenuItem, CateringPackage, EventType } from '../../domain/types';
import { Navbar } from '../layout/Navbar';
import { Hero } from '../hero/Hero';
import { ServicePillars } from '../pillars/ServicePillars';
import { MenuSection } from '../menu/MenuSection';
import { ExperienceSection } from '../experience/ExperienceSection';
import { PackageSection } from '../packages/PackageSection';
import { QuoteEstimator } from '../calculator/QuoteEstimator';
import { TestimonialsSection } from '../testimonials/TestimonialsSection';
import { NewsletterSection } from '../newsletter/NewsletterSection';
import { Footer } from '../layout/Footer';
import { BookingModal } from '../booking/BookingModal';
import { AuthModal } from '../auth/AuthModal';
import { FloatingConcierge } from '../concierge/FloatingConcierge';
import { CATERING_PACKAGES } from '../../repositories/firebase/mockData';

interface HomeClientViewProps {
  initialMenuItems?: MenuItem[];
  initialPackages?: CateringPackage[];
}

export const HomeClientView: React.FC<HomeClientViewProps> = ({
  initialMenuItems,
  initialPackages = CATERING_PACKAGES,
}) => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingPrefill, setBookingPrefill] = useState<{
    dishName?: string;
    guestCount?: number;
    eventType?: EventType;
    totalQuote?: number;
  }>({});

  const handleSelectDish = (dish: MenuItem) => {
    setBookingPrefill({
      dishName: dish.name,
    });
    setIsBookingOpen(true);
  };

  const handleSelectPackage = (pkg: CateringPackage) => {
    setBookingPrefill({
      dishName: `Package: ${pkg.name}`,
    });
    setIsBookingOpen(true);
  };

  const handleProceedToBooking = (details: {
    guestCount: number;
    eventType: EventType;
    tier: string;
    total: number;
  }) => {
    setBookingPrefill({
      guestCount: details.guestCount,
      eventType: details.eventType,
      totalQuote: details.total,
      dishName: `${details.eventType.replace('-', ' ').toUpperCase()} (${details.tier.toUpperCase()}) - ${details.guestCount} Pax`,
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
        {/* Section 1: Hero */}
        <Hero onExploreClick={scrollToMenu} />

        {/* Section 2: Services Showcase (Corporate Lunch, Event Banquets, Live Theatres) */}
        <ServicePillars
          onOrderNow={(dishName) => {
            setBookingPrefill({ dishName });
            setIsBookingOpen(true);
          }}
        />

        {/* Section 3: Curated Menu Spreads */}
        <MenuSection
          items={initialMenuItems}
          onSelectDish={handleSelectDish}
        />

        {/* Section 4: The Ahlan Standard & Philosophy */}
        <ExperienceSection />

        {/* Section 5: Turnkey Curated Packages */}
        <PackageSection
          packages={initialPackages && initialPackages.length > 0 ? initialPackages : CATERING_PACKAGES}
          onSelectPackage={handleSelectPackage}
        />

        {/* Section 6: Real-Time Interactive Quote Calculator */}
        <QuoteEstimator
          onProceedToBooking={handleProceedToBooking}
        />

        {/* Section 7: Testimonials & Social Proof */}
        <TestimonialsSection />

        {/* Section 8: Tasting Box / Consultation Booking */}
        <NewsletterSection />
      </main>

      {/* Footer */}
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
      {/* Floating WhatsApp Concierge */}
      <FloatingConcierge />
    </>
  );
};
