export const salonInfo = {
    name: "Atlanta Premier Hair Design",
    address: "123 Salon Street, Atlanta, GA 30301",
    phone: "(404) 555-0123",
    email: "info@atlantapremier.com",
    googleMapsUrl: "https://maps.google.com/?q=123+Salon+Street+Atlanta+GA+30301",
    
    // Operating Hours
    hours: {
      monday: { open: null, close: null }, // Closed
      tuesday: { open: 9, close: 17 },     // 9am-5pm
      wednesday: { open: 9, close: 17 },   // 9am-5pm
      thursday: { open: 9, close: 17 },    // 9am-5pm
      friday: { open: 9, close: 17 },      // 9am-5pm
      saturday: { open: 9, close: 17 },    // 9am-5pm
      sunday: { open: 11, close: 19 }      // 11am-7pm
    }
  } as const
  
export const openingHoursDisplay = [
  { day: 'Monday', hours: 'Closed', isOpen: false },
  { day: 'Tuesday', hours: '9:00 AM - 5:00 PM', isOpen: true },
  { day: 'Wednesday', hours: '9:00 AM - 5:00 PM', isOpen: true },
  { day: 'Thursday', hours: '9:00 AM - 5:00 PM', isOpen: true },
  { day: 'Friday', hours: '9:00 AM - 5:00 PM', isOpen: true },
  { day: 'Saturday', hours: '9:00 AM - 5:00 PM', isOpen: true },
  { day: 'Sunday', hours: '11:00 AM - 7:00 PM', isOpen: true }
] as const

// /lib/constants.ts
export const SERVICE_CATEGORIES = {
  WOMENS_HAIR: 'womens-hair',
  COLOR_SERVICES: 'color-services',
  TREATMENT_SERVICES: 'treatment-services',
  MENS_GROOMING: 'mens-grooming',
  SPECIALTY_SERVICES: 'specialty-services',
  TEXTURE_SERVICES: 'texture-services',
  KIDS_SERVICES: 'kids-services',
  ADDON_SERVICES: 'add-on-services'
} as const;

export const CATEGORY_DISPLAY_NAMES: { [key: string]: string } = {
  [SERVICE_CATEGORIES.WOMENS_HAIR]: "Women's Hair",
  [SERVICE_CATEGORIES.COLOR_SERVICES]: 'Color Services',
  [SERVICE_CATEGORIES.TREATMENT_SERVICES]: 'Treatment Services',
  [SERVICE_CATEGORIES.MENS_GROOMING]: "Men's Grooming",
  [SERVICE_CATEGORIES.SPECIALTY_SERVICES]: 'Specialty Services',
  [SERVICE_CATEGORIES.TEXTURE_SERVICES]: 'Texture Services',
  [SERVICE_CATEGORIES.KIDS_SERVICES]: 'Kids Services',
  [SERVICE_CATEGORIES.ADDON_SERVICES]: 'Add-on Services'
};

export const CATEGORY_SLUG_MAP: { [key: string]: string } = {
  'women': SERVICE_CATEGORIES.WOMENS_HAIR,
  'womens-hair': SERVICE_CATEGORIES.WOMENS_HAIR,
  'color': SERVICE_CATEGORIES.COLOR_SERVICES,
  'color-services': SERVICE_CATEGORIES.COLOR_SERVICES,
  'treatment': SERVICE_CATEGORIES.TREATMENT_SERVICES,
  'treatment-services': SERVICE_CATEGORIES.TREATMENT_SERVICES,
  'men': SERVICE_CATEGORIES.MENS_GROOMING,
  'mens-grooming': SERVICE_CATEGORIES.MENS_GROOMING,
  'special': SERVICE_CATEGORIES.SPECIALTY_SERVICES,
  'specialty-services': SERVICE_CATEGORIES.SPECIALTY_SERVICES,
  'texture': SERVICE_CATEGORIES.TEXTURE_SERVICES,
  'texture-services': SERVICE_CATEGORIES.TEXTURE_SERVICES,
  'kids': SERVICE_CATEGORIES.KIDS_SERVICES,
  'kids-services': SERVICE_CATEGORIES.KIDS_SERVICES,
  'addon': SERVICE_CATEGORIES.ADDON_SERVICES,
  'add-on-services': SERVICE_CATEGORIES.ADDON_SERVICES
};