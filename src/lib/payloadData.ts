import { DoctorProfile, Service, ClinicLocation, Appointment, Testimonial, BlogPost, GalleryImage } from '@/types';

export const INITIAL_DOCTOR_PROFILE: DoctorProfile = {
  name: "Dr. Rachit Raj",
  clinicName: "Dr. Rachit's Laser & Laparoscopy Clinic",
  titles: "Consultant General, Laparoscopic & Laser Proctologist",
  degrees: ["MBBS (KGMU)", "MS (Gold Medalist, Meerut University)", "ATLS Instructor", "FMAS", "MCLS"],
  regNumber: "UPMC-78412",
  experienceYears: 10,
  surgeriesCount: 5000,
  satisfactionRate: 99.4,
  heroBadge: "MBBS (KGMU) | MS (Gold Medalist) | FMAS, MCLS",
  bio: "Specialist in painless laser proctology (Piles, Fissure, Fistula) and robotic & laparoscopic keyhole surgeries at Dr. Rachit's Laser & Laparoscopy Clinic, Gomti Nagar, Lucknow.",
  longBio: "Dr. Rachit Raj completed his MBBS from the prestigious King George's Medical University (KGMU), followed by MS (Gold Medalist) from Meerut University. He is a certified ATLS Instructor with Fellowship in Minimal Access Surgery (FMAS) and MCLS training. At Dr. Rachit's Laser & Laparoscopy Clinic he specializes in robotic surgery, laparoscopic procedures and modern daycare laser proctology, focusing on zero-pain recovery and same-day discharge.",
  phonePrimary: "+91 90446 87625",
  phoneSecondary: "+91 90446 87625",
  whatsappNumber: "+919044687625",
  email: "drrachitraj.surgery@gmail.com",
  emergencyContact: "+91 90446 87625",
  avatarUrl: "https://media.licdn.com/dms/image/v2/D5603AQHxt5ew4TFmFw/profile-displayphoto-crop_800_800/B56Zwp0rBwGgAI-/0/1770228201011?e=1787788800&v=beta&t=WVmHyjAo5kpm8Sy9N6kwHfyTC-Ppn76bgh_r9XR0sjE",
  logoUrl: "https://res.cloudinary.com/dlv1uvt41/image/upload/c_crop,g_north_west,h_230,w_237,x_98,y_168/AHRPTWmqjJ4TLwDbMVqXKsqqlMCWe4NOcEAWNZ8W86zoT3u2ZaGxc95Ki5uTcYuH5fub34mruENx8HMQtC43bVNfahhWOIKiV_r7FgqdvBo9l_zBz71DCgqCLVAhHrYqUxwOyGweq6KLBhfEnb8_s1360-w1360-h1020-rw_ymu000.webp",
};

export const INITIAL_SERVICES: Service[] = [
  {
    id: "robotic-surgery",
    slug: "robotic-surgery",
    title: "Robotic Surgery",
    category: "Robotic Surgery",
    shortDesc: "High-precision robotic-assisted surgery for complex procedures with smaller incisions and faster recovery.",
    fullDesc: "Robotic-assisted surgical platforms provide 3D magnified vision and greater instrument precision, allowing complex procedures to be performed through minimal incisions with less blood loss and faster recovery.",
    symptoms: ["Complex abdominal conditions", "Cases needing high surgical precision", "Referred for advanced minimal-access surgery"],
    benefits: ["Greater surgical precision", "Smaller incisions", "Faster return to daily activity"],
    procedureTime: "Varies by procedure",
    recoveryTime: "2-4 Days",
    iconName: "Bot",
    imageUrl: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?q=80&w=1200&auto=format&fit=crop",
    popular: true
  },
  {
    id: "laparoscopic-surgery",
    slug: "laparoscopic-gallbladder-hernia",
    title: "Laparoscopic Surgery",
    category: "Laparoscopic Surgery",
    shortDesc: "Advanced keyhole surgery for Gallstones, Hernia repair (3D Mesh), and Appendectomy.",
    fullDesc: "Minimally invasive laparoscopic procedure using tiny 5mm cosmetic incisions under HD camera guidance.",
    symptoms: ["Upper abdominal pain after meals", "Groin or abdominal bulge", "Acute side stomach pain"],
    benefits: ["Tiny cosmetic scars", "Minimal hospital stay", "Tension-free mesh repair"],
    procedureTime: "45 Mins",
    recoveryTime: "3 Days",
    iconName: "Activity",
    imageUrl: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?q=80&w=1200&auto=format&fit=crop",
    popular: true
  },
  {
    id: "proctosurgery",
    slug: "laser-piles-fissure-fistula",
    title: "Proctosurgery (Laser – Piles, Fissure, Fistula)",
    category: "Laser Proctology",
    shortDesc: "Painless laser treatment for Piles, Fissure, Fistula & Pilonidal Sinus with same-day discharge.",
    fullDesc: "Modern laser hemorrhoidoplasty and FiLaC laser closure offer zero cuts, minimal post-op pain, and quick resumption of work.",
    symptoms: ["Pain or bleeding during stool", "Anal swelling or discharge", "Chronic fissure pain"],
    benefits: ["No open cuts or stitches", "Same-day discharge", "Rapid 48-hour recovery"],
    procedureTime: "30 Mins",
    recoveryTime: "1-2 Days",
    iconName: "Zap",
    imageUrl: "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=1200&auto=format&fit=crop",
    popular: true
  },
  {
    id: "general-surgery",
    slug: "general-surgery",
    title: "General Surgery",
    category: "General Surgery",
    shortDesc: "Expert surgical treatment for Varicose Veins, Hydrocele, Lipoma, and Chronic Wound Care.",
    fullDesc: "Comprehensive surgical care following strict sterile protocols and personalized post-operative recovery.",
    symptoms: ["Swollen painful leg veins", "Abdominal swelling or lump", "Minor surgical needs"],
    benefits: ["KGMU/ATLS-trained surgical expertise", "Precise treatment", "24/7 Emergency response"],
    procedureTime: "30-60 Mins",
    recoveryTime: "2-4 Days",
    iconName: "HeartPulse",
    imageUrl: "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1200&auto=format&fit=crop"
  }
];

export const INITIAL_CLINICS: ClinicLocation[] = [
  {
    id: "drrachits-laser-laparoscopy-clinic",
    name: "Dr. Rachit's Laser & Laparoscopy Clinic",
    tagline: "Robotic, Laparoscopic & Laser Proctology Center",
    address: "LGF-1, Galaxy Health Centre, Near Neelkanth Sweets, Vivek Khand-2, Gomti Nagar",
    area: "Gomti Nagar",
    city: "Lucknow, UP - 226010",
    timings: "10:00 AM - 2:00 PM | 5:00 PM - 8:00 PM",
    days: "Monday to Saturday",
    phone: "+91 90446 87625",
    whatsapp: "+919044687625",
    mapEmbedUrl: "https://www.google.com/maps?q=Dr.+Rachit%27s+Laser+%26+Laparoscopy+Clinic%2C+Galaxy+Health+Centre%2C+Near+Neelkanth+Sweets%2C+Vivek+Khand+2%2C+Gomti+Nagar%2C+Lucknow%2C+Uttar+Pradesh+226010&output=embed",
    directionsUrl: "https://maps.app.goo.gl/9E8qqbdNQaSCd5tH7",
    imageUrl: "https://res.cloudinary.com/dlv1uvt41/image/upload/v1786441905/WhatsApp_Image_2026-08-11_at_11.35.41_AM_nlfltd.jpg",
    isPrimary: true
  },
  {
    id: "healing-hands-gomtinagar",
    name: "Healing Hands Clinic",
    tagline: "Laser Piles & Proctology Center",
    address: "B-2/885, Vinay Khand 2, Husariya Chauraha, Gomti Nagar",
    area: "Gomti Nagar",
    city: "Lucknow, UP - 226010",
    timings: "10:00 AM - 2:00 PM | 5:00 PM - 8:00 PM",
    days: "Monday to Saturday",
    phone: "+91 90446 87625",
    whatsapp: "+919044687625",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.887640205166!2d81.00282137617578!3d26.84351336306509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be2c24ad1aaab%3A0x6b5c00e123456789!2sGomti%20Nagar%2C%20Lucknow!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    directionsUrl: "https://maps.google.com/?q=Healing+Hands+Clinic+Gomti+Nagar+Lucknow",
    imageUrl: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWk_8qTKRsvZJFrFim_GmcwNRFk7hSa4R-bthHg1f063Y6P87TsAVSOzCu7CvyrNaywOzt_kDdNIzMgXagSe9jmGgMf929vN3KUhW3WRXE-GCsaxBNzk5pVifO-q3ZOKRpRxdg3oFxwX7N4=w408-h306-k-no",
    isPrimary: false
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
    phone: "+91 90446 87625",
    whatsapp: "+919044687625",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.123456789!2d81.01000000!3d26.84000000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be3a123456789!2sDr.%20KNS%20Memorial%20Hospital!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    directionsUrl: "https://maps.google.com/?q=Dr+KNS+Memorial+Hospital+Lucknow",
    imageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1200&auto=format&fit=crop",
    isPrimary: false
  }
];

// DEMO/PLACEHOLDER DATA — replace with real, consented photos from the clinic before launch.
export const INITIAL_GALLERY: GalleryImage[] = [
  { id: "gallery-1", url: "https://res.cloudinary.com/dlv1uvt41/image/upload/v1786441905/WhatsApp_Image_2026-08-11_at_11.35.41_AM_nlfltd.jpg", caption: "Dr. Rachit's Laser & Laparoscopy Clinic" },
  { id: "gallery-2", url: "https://res.cloudinary.com/dlv1uvt41/image/upload/v1786441905/WhatsApp_Image_2026-08-11_at_11.35.40_AM_i5pf07.jpg", caption: "Dr. Rachit's Laser & Laparoscopy Clinic" },
  { id: "gallery-3", url: "https://res.cloudinary.com/dlv1uvt41/image/upload/v1786441923/Screenshot_2026-08-11_at_3.15.56_PM_rnm5ge.png", caption: "Dr. Rachit's Laser & Laparoscopy Clinic" },
  { id: "gallery-4", url: "https://res.cloudinary.com/dlv1uvt41/image/upload/v1786441926/Screenshot_2026-08-11_at_3.15.23_PM_xsmsvx.png", caption: "Dr. Rachit's Laser & Laparoscopy Clinic" },
  { id: "gallery-5", url: "https://res.cloudinary.com/dlv1uvt41/image/upload/v1786441930/Screenshot_2026-08-11_at_3.15.42_PM_t29oq1.png", caption: "Dr. Rachit's Laser & Laparoscopy Clinic" },
  { id: "gallery-6", url: "https://res.cloudinary.com/dlv1uvt41/image/upload/v1786441933/Screenshot_2026-08-11_at_3.14.52_PM_p74wci.png", caption: "Dr. Rachit's Laser & Laparoscopy Clinic" },
  { id: "gallery-7", url: "https://res.cloudinary.com/dlv1uvt41/image/upload/v1786441934/Screenshot_2026-08-11_at_3.14.27_PM_fm9soc.png", caption: "Dr. Rachit's Laser & Laparoscopy Clinic" }
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
    comment: "Been putting off treatment for years out of fear. The laser procedure at Dr. Rachit's Laser & Laparoscopy Clinic took half an hour and I had almost no downtime.",
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

export const GOOGLE_REVIEWS_URL = "https://share.google/gYm7CfMjyHjgGMHq3";
export const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/9E8qqbdNQaSCd5tH7";

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

  static getGallery(): GalleryImage[] {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(`${STORAGE_KEY}_gallery`);
      if (stored) return JSON.parse(stored);
    }
    return INITIAL_GALLERY;
  }

  static saveGallery(gallery: GalleryImage[]): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`${STORAGE_KEY}_gallery`, JSON.stringify(gallery));
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
