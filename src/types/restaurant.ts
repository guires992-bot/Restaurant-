export type MenuCategory = 
  | 'degustation'
  | 'entrees'
  | 'plats'
  | 'desserts'
  | 'cocktails-vins';

export type DietaryTag = 'vegetarien' | 'sans-gluten' | 'signature' | 'peche-durable';

export interface MenuItem {
  id: string;
  title: string;
  subtitle: string;
  category: MenuCategory;
  price: number;
  description: string;
  ingredientsOrigin?: string;
  winePairing?: string;
  dietary?: DietaryTag[];
  image?: string;
  highlight?: boolean;
}

export type DiningAreaId = 'banquette-sienne' | 'table-ambre' | 'comptoir-chef' | 'salon-prive';

export interface DiningArea {
  id: DiningAreaId;
  name: string;
  subtitle: string;
  description: string;
  idealFor: string;
  lightingVibe: string;
  image?: string;
}

export interface ReservationData {
  id: string;
  date: string;
  service: 'dejeuner' | 'diner';
  time: string;
  guests: number;
  area: DiningAreaId;
  customerName: string;
  email: string;
  phone: string;
  dietaryNotes?: string;
  specialOccasion?: string;
  status: 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface GiftVoucher {
  id: string;
  code: string;
  title: string;
  description: string;
  price: number;
  durationTemps: string;
  includesWine: boolean;
}
