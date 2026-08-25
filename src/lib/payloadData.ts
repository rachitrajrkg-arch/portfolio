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

// Real patient reviews, sourced from the clinic's official Google Business listing.
export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: "review-1",
    patientName: "shreyansh gupta",
    procedure: "Laparoscopic Surgery",
    rating: 5,
    comment: "When my family found out that I had a rare and complicated problem in the stomach area, we were terrified. We didn't know which doctor to trust for such a risky operation. Luckily, someone recommended Dr. Rachit Raj. From the very first day, Dr. Rachit Raj made us feel like we were in safe hands. He didn't use big medical words—he explained the whole rare abdominal surgery in plain, simple language so we knew exactly what was going to happen. Thanks to his skills as a laparoscopic surgeon, the operation went super smoothly through tiny keyhole cuts. My recovery was way faster and much less painful than I expected! Truly the best laparoscopic surgeon in Lucknow!",
    date: "July 2026",
    verified: true
  },
  {
    id: "review-2",
    patientName: "Dr. Anita Singh",
    procedure: "General Surgery",
    rating: 5,
    comment: "Very professional, approachable, and explains everything clearly. Had a smooth surgical experience and good post-operative care. Highly skilled doctor with compassionate behaviour. One of the best surgeons I have consulted.",
    date: "June 2026",
    verified: true
  },
  {
    id: "review-3",
    patientName: "Harikesh Upadhyay (Hari)",
    procedure: "Gynecomastia Surgery",
    rating: 5,
    comment: "I got my gynecomastia treatment done by Dr. Rachit Raj, and I am very happy with the results. Before this, I consulted many doctors and took several medicines, but nothing worked. I was very scared about the operation, but Dr. Rachit Raj explained everything clearly and made me feel comfortable and confident. The surgery was smooth, and I did not experience significant pain after the operation. I am writing this review 20 days after my surgery, and I am very satisfied with my results. I highly recommend them to anyone considering gynecomastia treatment.",
    date: "July 2026",
    verified: true
  },
  {
    id: "review-4",
    patientName: "Pankaj Chaurasiya",
    procedure: "Rectal Prolapse Surgery",
    rating: 5,
    comment: "Dr Rachit is an excellent surgeon. Have been there and had great experience, the way he explains about disease and treatment process is commendable. Got my rectal prolapse surgery done by him and post operative healing is very good.",
    date: "May 2026",
    verified: true
  },
  {
    id: "review-5",
    patientName: "SUBHASH Gupta",
    procedure: "General Consultation",
    rating: 5,
    comment: "I had a great experience with Dr Rachit Raj. I got appointment easily and the waiting time was very short. The doctor made an accurate diagnosis in a very short time. His nature is also very humble. Overall very good experience.",
    date: "May 2026",
    verified: true
  },
  {
    id: "review-6",
    patientName: "Labiya Mirza",
    procedure: "Laparoscopic Surgery",
    rating: 5,
    comment: "I had a great experience at Dr. Rachit's Laparoscopic Clinic and would highly recommend it to anyone considering minimally invasive surgery. From the very first consultation, Dr. Rachit was extremely professional, patient, and thorough in explaining the procedure, risks, and recovery process. This really helped build trust and reduced my anxiety.",
    date: "May 2026",
    verified: true
  },
  {
    id: "review-7",
    patientName: "Bhola",
    procedure: "Laparoscopic Hernia Repair",
    rating: 5,
    comment: "Excellent experience at Dr. Rachit's Laser & Laparoscopy Clinic. The doctor is highly skilled, and the staff is very supportive. Highly recommended for laser and laparoscopic procedures. I got my Laparoscopic Hernia Procedure done. My recovery was excellent.",
    date: "May 2026",
    verified: true
  },
  {
    id: "review-8",
    patientName: "Devanshi Gupta",
    procedure: "Laparoscopic Gallbladder Surgery",
    rating: 5,
    comment: "I underwent laparoscopic gallbladder surgery and had a great experience. Dr Rachit explained the procedure in detail, answered all my questions patiently, and ensured I was comfortable throughout. Recovery was faster than expected with minimal pain. Dr Rachit is a highly skilled surgeon with excellent hands.",
    date: "May 2026",
    verified: true
  },
  {
    id: "review-9",
    patientName: "Roli Srivastava",
    procedure: "General Surgery",
    rating: 5,
    comment: "The surgery was successful, and the care provided by the doctor and staff was excellent. The doctor explained everything clearly and made us feel comfortable throughout the process. Thank you so much.",
    date: "May 2026",
    verified: true
  },
  {
    id: "review-10",
    patientName: "Poonam Raj",
    procedure: "Hernia Surgery",
    rating: 5,
    comment: "I recently visited Dr Rachit Raj for consultation of my Hernia Surgery. He was very polite and humble. His explanation to my problem was very good and I am happy with his empathetic approach. My hernia surgery went very good.",
    date: "May 2026",
    verified: true
  },
  {
    id: "review-11",
    patientName: "Aisha Ahmad",
    procedure: "Laparoscopic Surgery",
    rating: 5,
    comment: "I had a great experience at Dr. Rachit's Laparoscopic Clinic and would highly recommend it to anyone considering minimally invasive surgery.",
    date: "May 2026",
    verified: true
  },
  {
    id: "review-12",
    patientName: "Bablu Chaurasiya",
    procedure: "Pilonidal Sinus Surgery",
    rating: 5,
    comment: "Dr Rachit Raj is a good surgeon for Pilonidal sinus, the doctor is highly skilled, and staff very supportive. First consultation with Dr Rachit Raj was extremely professional. Good experience.",
    date: "May 2026",
    verified: true
  },
  {
    id: "review-13",
    patientName: "Nafish Ali",
    procedure: "General Consultation",
    rating: 5,
    comment: "Best clinic, thank you so much, very happy and satisfied. Dr Rachit Raj sir.",
    date: "July 2026",
    verified: true
  },
  {
    id: "review-14",
    patientName: "Gulab Chand",
    procedure: "Laser Fistula Treatment",
    rating: 5,
    comment: "Excellent treatment of fistula. Thank you Dr Rachit.",
    date: "May 2026",
    verified: true
  },
  {
    id: "review-15",
    patientName: "Kaptan",
    procedure: "General Consultation",
    rating: 5,
    comment: "Dr. Rachit is a very experienced, skillful, talented and compassionate doctor. I recently visited his clinic for consultation and treatment of my patient and I am very impressed with his caring and compassionate behaviour. May he be successful and treat more patients.",
    date: "August 2026",
    verified: true
  },
  {
    id: "review-16",
    patientName: "Sonu Singh",
    procedure: "Laser Surgery",
    rating: 5,
    comment: "Very happy with my laser surgery. Thank you.",
    date: "August 2026",
    verified: true
  },
  {
    id: "review-17",
    patientName: "J.P Mishra",
    procedure: "General Consultation",
    rating: 5,
    comment: "Fantastic, very good and experienced doctor.",
    date: "August 2026",
    verified: true
  },
  {
    id: "review-18",
    patientName: "Piu Pal",
    procedure: "Laparoscopic Gallbladder Surgery",
    rating: 5,
    comment: "I recently underwent laparoscopic gallbladder surgery under the expert care of Dr. Rachit Raj. From my very first consultation, Dr. Rachit Raj explained my condition and the surgical procedure in a clear and reassuring manner. He patiently answered all my questions, which gave me confidence and helped ease my anxiety before the surgery. The surgery was performed successfully, and my recovery was much smoother than I had expected. I experienced minimal pain, very small scars, and was able to return to my normal routine much sooner. I strongly recommend Dr. Rachit Raj to anyone seeking a skilled, experienced, and caring laparoscopic surgeon.",
    date: "July 2026",
    verified: true
  },
  {
    id: "review-19",
    patientName: "Parthajit Pal",
    procedure: "Laparoscopic Gallbladder Surgery",
    rating: 5,
    comment: "My wife underwent laparoscopic gallbladder surgery under the care of Dr. Rachit Raj and had an excellent experience. From the very first consultation, Dr. Rachit Raj explained the entire procedure in detail, answered every question patiently, and ensured she felt comfortable and confident throughout the treatment. The surgery was successful, and her recovery was smooth, with minimal pain and discomfort. We are grateful for the excellent treatment and highly recommend Dr. Rachit to anyone seeking expert care for gallbladder or other laparoscopic surgeries.",
    date: "July 2026",
    verified: true
  },
  {
    id: "review-20",
    patientName: "veer vikram singh",
    procedure: "General Treatment",
    rating: 5,
    comment: "I have a very positive experience with Dr Rachit Raj. From the first consultation to the completion of my treatment they are very knowledgeable and caring.",
    date: "July 2026",
    verified: true
  },
  {
    id: "review-21",
    patientName: "Subhash Chandra",
    procedure: "General Treatment",
    rating: 5,
    comment: "He is a very skilled and able surgeon. Great respect for him. He treated my husband and now my husband is doing good. Thank you sir.",
    date: "June 2026",
    verified: true
  }
];

export const INITIAL_BLOGS: BlogPost[] = [];

export const GOOGLE_REVIEWS_URL = "https://share.google/gYm7CfMjyHjgGMHq3";
export const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/9E8qqbdNQaSCd5tH7";

// Server-backed CMS Store — reads/writes go through /api/cms and persist in Postgres,
// so admin edits show up for every visitor on every device.
async function apiGet<T>(key: string, fallback: T): Promise<T> {
  const res = await fetch(`/api/cms/${key}`, { cache: 'no-store' });
  if (!res.ok) return fallback;
  const data = await res.json();
  return data ?? fallback;
}

async function apiPut<T>(key: string, value: T): Promise<void> {
  await fetch(`/api/cms/${key}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(value),
  });
}

export class CMSStore {
  static getProfile(): Promise<DoctorProfile> {
    return apiGet('profile', INITIAL_DOCTOR_PROFILE);
  }

  static saveProfile(profile: DoctorProfile): Promise<void> {
    return apiPut('profile', profile);
  }

  static getServices(): Promise<Service[]> {
    return apiGet('services', INITIAL_SERVICES);
  }

  static saveServices(services: Service[]): Promise<void> {
    return apiPut('services', services);
  }

  static getClinics(): Promise<ClinicLocation[]> {
    return apiGet('clinics', INITIAL_CLINICS);
  }

  static saveClinics(clinics: ClinicLocation[]): Promise<void> {
    return apiPut('clinics', clinics);
  }

  static getTestimonials(): Promise<Testimonial[]> {
    return apiGet('testimonials', INITIAL_TESTIMONIALS);
  }

  static saveTestimonials(testimonials: Testimonial[]): Promise<void> {
    return apiPut('testimonials', testimonials);
  }

  static getGallery(): Promise<GalleryImage[]> {
    return apiGet('gallery', INITIAL_GALLERY);
  }

  static saveGallery(gallery: GalleryImage[]): Promise<void> {
    return apiPut('gallery', gallery);
  }

  static async getAppointments(): Promise<Appointment[]> {
    const res = await fetch('/api/cms/appointments', { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  }

  static async addAppointment(apt: Omit<Appointment, 'id' | 'createdAt' | 'status'>): Promise<Appointment> {
    const res = await fetch('/api/cms/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(apt),
    });
    return res.json();
  }

  static async updateAppointmentStatus(id: string, status: Appointment['status']): Promise<void> {
    await fetch(`/api/cms/appointments/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
  }
}
