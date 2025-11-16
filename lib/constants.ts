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