import { DoctorProfile, Service, ClinicLocation, Appointment, Testimonial, BlogPost } from '@/types';

export const INITIAL_DOCTOR_PROFILE: DoctorProfile = {
  name: "Dr. Rachit Raj",
  titles: "Consultant General, Laparoscopic & Laser Proctologist",
  degrees: ["MBBS (KGMU Lucknow)", "MS (General Surgery)", "FMAS (Minimal Access Surgery)"],
  regNumber: "UPMC-78412",
  experienceYears: 10,
  surgeriesCount: 5000,
  satisfactionRate: 99.4,
  heroBadge: "KGMU Lucknow Alumnus | 10+ Years Surgical Experience",
  bio: "Specialist in painless laser proctology (Piles, Fissure, Fistula) and laparoscopic keyhole surgeries in Gomti Nagar, Lucknow.",
  longBio: "Dr. Rachit Raj completed his MBBS from the prestigious King George's Medical University (KGMU), Lucknow, followed by MS in General Surgery and Fellowship in Minimal Access Surgery (FMAS). He specializes in modern daycare laser proctology and laparoscopic procedures, focusing on zero-pain recovery and same-day discharge.",
  phonePrimary: "+91 88558 65060",
  phoneSecondary: "+91 91400 00000",
  whatsappNumber: "+918855865060",
  email: "drrachitraj.surgery@gmail.com",
  emergencyContact: "+91 88558 65060",
  avatarUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop",
};

export const INITIAL_SERVICES: Service[] = [
  {
    id: "laser-proctology",
    slug: "laser-piles-fissure-fistula",
    title: "Laser Proctology (Piles, Fissure, Fistula)",
    category: "Laser Proctology",
    shortDesc: "Painless 30-minute laser treatment for Piles, Fissure, Fistula & Pilonidal Sinus with same-day discharge.",
    fullDesc: "Modern laser hemorrhoidoplasty and FiLaC laser closure offer zero cuts, minimal post-op pain, and quick resumption of work.",
    symptoms: ["Pain or bleeding during stool", "Anal swelling or discharge", "Chronic fissure pain"],
    benefits: ["No open cuts or stitches", "Same-day discharge", "Rapid 48-hour recovery"],
    procedureTime: "30 Mins",
    recoveryTime: "1-2 Days",
    iconName: "Zap",
    imageUrl: "/images/laser_surgery_tech.jpg",
    popular: true
  },
  {
    id: "laparoscopic-surgery",
    slug: "laparoscopic-gallbladder-hernia",
    title: "Laparoscopic Surgery (Gallbladder & Hernia)",
    category: "Laparoscopic Surgery",
    shortDesc: "Advanced keyhole surgery for Gallstones, Hernia repair (3D Mesh), and Appendectomy.",
    fullDesc: "Minimally invasive laparoscopic procedure using tiny 5mm cosmetic incisions under HD camera guidance.",
    symptoms: ["Upper abdominal pain after meals", "Groin or abdominal bulge", "Acute side stomach pain"],
    benefits: ["Tiny cosmetic scars", "Minimal hospital stay", "Tension-free mesh repair"],
    procedureTime: "45 Mins",
    recoveryTime: "3 Days",
    iconName: "Activity",
    imageUrl: "/images/doctor_consultation.jpg",
    popular: true
  },
  {
    id: "general-laser-surgery",
    slug: "varicose-veins-hydrocele",
    title: "General & Laser Surgery",
    category: "General Care",
    shortDesc: "Expert surgical treatment for Varicose Veins, Hydrocele, Lipoma, and Chronic Wound Care.",
    fullDesc: "Comprehensive surgical care following strict sterile protocols and personalized post-operative recovery.",
    symptoms: ["Swollen painful leg veins", "Abdominal swelling or lump", "Minor surgical needs"],
    benefits: ["KGMU surgical expertise", "Precise treatment", "24/7 Emergency response"],
    procedureTime: "30-60 Mins",
    recoveryTime: "2-4 Days",
    iconName: "HeartPulse",
    imageUrl: "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1200&auto=format&fit=crop"
  }
];

export const INITIAL_CLINICS: ClinicLocation[] = [
  {
    id: "healing-hands-gomtinagar",
    name: "Healing Hands Clinic",
    tagline: "Laser Piles & Proctology Center",
    address: "B-2/885, Vinay Khand 2, Husariya Chauraha, Gomti Nagar",
    area: "Gomti Nagar",
    city: "Lucknow, UP - 226010",
    timings: "10:00 AM - 2:00 PM | 5:00 PM - 8:00 PM",
    days: "Monday to Saturday",
    phone: "+91 88558 65060",
    whatsapp: "+918855865060",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.887640205166!2d81.00282137617578!3d26.84351336306509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be2c24ad1aaab%3A0x6b5c00e123456789!2sGomti%20Nagar%2C%20Lucknow!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    directionsUrl: "https://maps.google.com/?q=Healing+Hands+Clinic+Gomti+Nagar+Lucknow",
    imageUrl: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWk_8qTKRsvZJFrFim_GmcwNRFk7hSa4R-bthHg1f063Y6P87TsAVSOzCu7CvyrNaywOzt_kDdNIzMgXagSe9jmGgMf929vN3KUhW3WRXE-GCsaxBNzk5pVifO-q3ZOKRpRxdg3oFxwX7N4=w408-h306-k-no",
    isPrimary: true
  },
  {
    id: "kns-memorial-hospital",
    name: "Dr. KNS Memorial Hospital",
    tagline: "General & Laparoscopic Surgery Dept",
    address: "Sector 4, Gomti Nagar Extension",
    area: "Gomti Nagar Ext.",
    city: "Lucknow, UP - 226010",
    timings: "2:00 PM - 5:00 PM",
    days: "Monday to Saturday",
    phone: "+91 91400 00000",
    whatsapp: "+918855865060",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.123456789!2d81.01000000!3d26.84000000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be3a123456789!2sDr.%20KNS%20Memorial%20Hospital!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    directionsUrl: "https://maps.google.com/?q=Dr+KNS+Memorial+Hospital+Lucknow",
    imageUrl: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWnDlbX8cKOoImZQfa7ED94xyvTzshn2SNrA_lAUuwbqsMqg0jK5Gv8zYSJvNWzhxYssDynBnI4Lx6s0Ph4vPjSxFL6OWKzbhbD4tnueDtACpWULQ2Ys5U-JRgVlkn83aXiZuMad6KWu55M=s1360-w1360-h1020-rw",
    isPrimary: false
  }
];

// DEMO/PLACEHOLDER DATA — replace with real, consented patient reviews before launch.
export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    patientName: "Vikramaditya S.",
    procedure: "Laser Piles Treatment",
    rating: 5,
    comment: "Dr. Rachit Raj explained everything clearly. The 25-minute laser procedure was virtually painless, and I was back home the same evening.",
    date: "July 2026",
    verified: true
  },
  {
    id: "2",
    patientName: "Ananya Mishra",
    procedure: "Laparoscopic Gallbladder",
    rating: 5,
    comment: "Excellent surgeon. Keyhole gallbladder surgery went smooth and I resumed work in 3 days. Highly recommended in Lucknow!",
    date: "June 2026",
    verified: true
  },
  {
    id: "3",
    patientName: "Rajeev Kumar",
    procedure: "Laser Fistula Surgery",
    rating: 5,
    comment: "Was nervous about the surgery, but Dr. Rachit's team made it comfortable start to finish. No stitches, minimal pain, and healed faster than I expected.",
    date: "May 2026",
    verified: true
  },
  {
    id: "4",
    patientName: "Priya Srivastava",
    procedure: "Hernia Repair",
    rating: 4,
    comment: "Good experience overall. The mesh repair was done with tiny cuts and I was discharged the next day. Follow-up calls were helpful too.",
    date: "April 2026",
    verified: true
  },
  {
    id: "5",
    patientName: "Saurabh Tiwari",
    procedure: "Laser Piles Treatment",
    rating: 5,
    comment: "Been putting off treatment for years out of fear. The laser procedure at Healing Hands Clinic took half an hour and I had almost no downtime.",
    date: "March 2026",
    verified: true
  },
  {
    id: "6",
    patientName: "Kavita Awasthi",
    procedure: "Varicose Veins",
    rating: 5,
    comment: "Very professional consultation and the surgery itself was quick. Dr. Rachit answered all my questions patiently before and after the procedure.",
    date: "February 2026",
    verified: true
  },
  {
    id: "7",
    patientName: "Manish Bajpai",
    procedure: "Laparoscopic Gallbladder",
    rating: 5,
    comment: "Smooth keyhole surgery, clean recovery, and clear instructions for aftercare. Would recommend to anyone in Lucknow needing this procedure.",
    date: "January 2026",
    verified: true
  }
];

export const INITIAL_BLOGS: BlogPost[] = [];

// LocalStorage Store Manager
const STORAGE_KEY = 'dr_rachit_cms_store_v1';

export class CMSStore {
  static getProfile(): DoctorProfile {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(`${STORAGE_KEY}_profile`);
      if (stored) return JSON.parse(stored);
    }
    return INITIAL_DOCTOR_PROFILE;
  }

  static saveProfile(profile: DoctorProfile): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`${STORAGE_KEY}_profile`, JSON.stringify(profile));
    }
  }

  static getServices(): Service[] {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(`${STORAGE_KEY}_services`);
      if (stored) return JSON.parse(stored);
    }
    return INITIAL_SERVICES;
  }

  static saveServices(services: Service[]): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`${STORAGE_KEY}_services`, JSON.stringify(services));
    }
  }

  static getClinics(): ClinicLocation[] {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(`${STORAGE_KEY}_clinics`);
      if (stored) return JSON.parse(stored);
    }
    return INITIAL_CLINICS;
  }

  static saveClinics(clinics: ClinicLocation[]): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`${STORAGE_KEY}_clinics`, JSON.stringify(clinics));
    }
  }

  static getTestimonials(): Testimonial[] {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(`${STORAGE_KEY}_testimonials`);
      if (stored) return JSON.parse(stored);
    }
    return INITIAL_TESTIMONIALS;
  }

  static saveTestimonials(testimonials: Testimonial[]): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`${STORAGE_KEY}_testimonials`, JSON.stringify(testimonials));
    }
  }

  static getAppointments(): Appointment[] {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(`${STORAGE_KEY}_appointments`);
      if (stored) return JSON.parse(stored);
    }
    return [];
  }

  static addAppointment(apt: Omit<Appointment, 'id' | 'createdAt' | 'status'>): Appointment {
    const existing = this.getAppointments();
    const newApt: Appointment = {
      ...apt,
      id: `apt-${Date.now().toString().slice(-4)}`,
      status: 'Pending',
      createdAt: new Date().toISOString().split('T')[0]
    };
    const updated = [newApt, ...existing];
    if (typeof window !== 'undefined') {
      localStorage.setItem(`${STORAGE_KEY}_appointments`, JSON.stringify(updated));
    }
    return newApt;
  }

  static updateAppointmentStatus(id: string, status: Appointment['status']): void {
    const existing = this.getAppointments();
    const updated = existing.map(a => a.id === id ? { ...a, status } : a);
    if (typeof window !== 'undefined') {
      localStorage.setItem(`${STORAGE_KEY}_appointments`, JSON.stringify(updated));
    }
  }
}
