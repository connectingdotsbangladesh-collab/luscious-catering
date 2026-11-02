import { collection, addDoc, getDocs, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db, isFirebaseConfigured } from './config';
import { BookingInquiry, MenuItem, CateringPackage } from '../../domain/types';
import { INITIAL_MENU_ITEMS, CATERING_PACKAGES } from '../../repositories/firebase/mockData';

const INQUIRIES_COLLECTION = 'catering_inquiries';
const MENU_COLLECTION = 'catering_menu';
const PACKAGES_COLLECTION = 'catering_packages';

/**
 * Clean Repository Interface for Inquiries
 */
export async function submitCateringInquiry(
  inquiry: Omit<BookingInquiry, 'id' | 'createdAt' | 'status'>
): Promise<{ success: boolean; id: string; message: string }> {
  try {
    if (isFirebaseConfigured && db) {
      const docRef = await addDoc(collection(db, INQUIRIES_COLLECTION), {
        ...inquiry,
        status: 'new',
        createdAt: serverTimestamp(),
      });
      return {
        success: true,
        id: docRef.id,
        message: 'Your inquiry has been successfully submitted to Luscious Catering concierge.',
      };
    } else {
      // Local persistent simulated fallback (using localStorage if on client, or mock ID)
      const mockId = 'inq_' + Math.random().toString(36).substring(2, 9);
      if (typeof window !== 'undefined') {
        const stored = JSON.parse(localStorage.getItem('luscious_inquiries') || '[]');
        stored.push({
          ...inquiry,
          id: mockId,
          status: 'new',
          createdAt: new Date().toISOString(),
        });
        localStorage.setItem('luscious_inquiries', JSON.stringify(stored));
      }
      return {
        success: true,
        id: mockId,
        message: 'Your inquiry has been recorded. Our catering director will contact you within 24 hours.',
      };
    }
  } catch (error) {
    console.error('Failed to submit catering inquiry:', error);
    throw new Error('Failed to submit inquiry. Please try again or call our direct line.');
  }
}

/**
 * Fetch Menu Items - Server Component / SSR optimized
 */
export async function fetchMenuItems(): Promise<MenuItem[]> {
  try {
    if (isFirebaseConfigured && db) {
      const q = query(collection(db, MENU_COLLECTION), orderBy('name', 'asc'));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as MenuItem));
      }
    }
  } catch (error) {
    console.warn('[Firebase] Fallback to curated mock menu items', error);
  }
  return INITIAL_MENU_ITEMS;
}

/**
 * Fetch Catering Packages - Server Component / SSR optimized
 */
export async function fetchCateringPackages(): Promise<CateringPackage[]> {
  try {
    if (isFirebaseConfigured && db) {
      const q = query(collection(db, PACKAGES_COLLECTION));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as CateringPackage));
      }
    }
  } catch (error) {
    console.warn('[Firebase] Fallback to curated mock catering packages', error);
  }
  return CATERING_PACKAGES;
}
