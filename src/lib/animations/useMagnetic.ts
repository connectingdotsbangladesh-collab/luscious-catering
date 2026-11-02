'use client';

import { useEffect, RefObject } from 'react';
import gsap from 'gsap';

interface MagneticOptions {
  strength?: number;
  textStrength?: number;
}

/**
 * Attaches an Awwwards-style magnetic cursor pull effect to a button or interactive element
 * on pointer-capable devices while respecting prefers-reduced-motion.
 */
export function useMagnetic<T extends HTMLElement>(
  ref: RefObject<T>,
  options: MagneticOptions = {}
) {
  const { strength = 0.32, textStrength } = options;
  const innerStrength = textStrength ?? strength * 0.45;

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === 'undefined') return;

    // Only activate on fine pointer devices & when reduced motion is not requested
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFinePointer || prefersReducedMotion) return;

    const innerText = el.querySelector('[data-magnetic-text]') as HTMLElement | null;

    const xTo = gsap.quickTo(el, 'x', {
      duration: 0.65,
      ease: 'elastic.out(1, 0.35)',
    });
    const yTo = gsap.quickTo(el, 'y', {
      duration: 0.65,
      ease: 'elastic.out(1, 0.35)',
    });

    const textXTo = innerText
      ? gsap.quickTo(innerText, 'x', {
          duration: 0.65,
          ease: 'elastic.out(1, 0.35)',
        })
      : null;
    const textYTo = innerText
      ? gsap.quickTo(innerText, 'y', {
          duration: 0.65,
          ease: 'elastic.out(1, 0.35)',
        })
      : null;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      xTo(relX * strength);
      yTo(relY * strength);
      if (textXTo && textYTo) {
        textXTo(relX * innerStrength);
        textYTo(relY * innerStrength);
      }
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
      if (textXTo && textYTo) {
        textXTo(0);
        textYTo(0);
      }
    };

    el.addEventListener('mousemove', handleMouseMove, { passive: true });
    el.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      gsap.set(el, { x: 0, y: 0 });
      if (innerText) {
        gsap.set(innerText, { x: 0, y: 0 });
      }
    };
  }, [ref, strength, innerStrength]);
}
