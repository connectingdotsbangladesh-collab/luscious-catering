export type DietaryPreference = 'vegan' | 'vegetarian' | 'halal' | 'gluten-free' | 'chef-special' | 'dairy-free';

export type MenuCategory = 
  | 'signature-dumplings' 
  | 'hors-doeuvres' 
  | 'gourmet-mains' 
  | 'live-stations' 
  | 'desserts' 
  | 'artisan-beverages';

export interface MenuItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: MenuCategory;
  pricePerPerson: number;
  image: string;
  dietary: DietaryPreference[];
  allergens?: string[];
  isFeatured?: boolean;
  servingStyle?: string;
  origin?: string;
}

export type EventType = 
  | 'wedding' 
  | 'corporate-gala' 
  | 'private-dinner' 
  | 'cocktail-reception' 
  | 'brand-launch' 
  | 'festive-celebration';

export interface CateringPackage {
  id: string;
  name: string;
  slug: string;
  tier: 'essential' | 'signature' | 'imperial-lux';
  tagline: string;
  pricePerPerson: number;
  minGuests: number;
  inclusions: string[];
  highlight: string;
  image: string;
  badge?: string;
  courseCount: number;
  chefStaffRatio: string;
}

export interface QuoteRequest {
  guestCount: number;
  eventType: EventType;
  packageTier: 'essential' | 'signature' | 'imperial-lux';
  courses: number;
  hasLiveStation: boolean;
  liveStationCount: number;
  hasBarService: boolean;
  tablewareTier: 'standard' | 'fine-porcelain' | 'royal-gold-rim';
  eventDate?: string;
}

export interface QuoteBreakdownItem {
  label: string;
  amount: number;
  description: string;
}

export interface QuoteResult {
  guestCount: number;
  perPersonRate: number;
  foodBaseTotal: number;
  liveStationFee: number;
  barServiceFee: number;
  tablewareFee: number;
  serviceCharge: number;
  estimatedTotal: number;
  breakdown: QuoteBreakdownItem[];
}

export interface BookingInquiry {
  id?: string;
  customerName: string;
  email: string;
  phone: string;
  eventType: EventType;
  eventDate: string;
  guestCount: number;
  packageId?: string;
  specialRequests?: string;
  venueLocation?: string;
  estimatedQuote?: number;
  status: 'new' | 'in-review' | 'confirmed' | 'archived';
  createdAt: string;
}

export interface UserSession {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}
