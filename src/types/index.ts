export interface DoctorProfile {
  name: string;
  titles: string;
  degrees: string[];
  regNumber: string;
  experienceYears: number;
  surgeriesCount: number;
  satisfactionRate: number;
  bio: string;
  longBio: string;
  phonePrimary: string;
  phoneSecondary: string;
  whatsappNumber: string;
  email: string;
  emergencyContact: string;
  avatarUrl: string;
  heroBadge: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  category: 'Laser Proctology' | 'Laparoscopic Surgery' | 'General Surgery' | 'General Care' | 'Emergency Care';
  shortDesc: string;
  fullDesc: string;
  symptoms: string[];
  benefits: string[];
  procedureTime: string;
  recoveryTime: string;
  iconName: string;
  imageUrl?: string;
  popular?: boolean;
}

export interface ClinicLocation {
  id: string;
  name: string;
  tagline: string;
  address: string;
  area: string;
  city: string;
  timings: string;
  days: string;
  phone: string;
  whatsapp: string;
  mapEmbedUrl: string;
  directionsUrl: string;
  imageUrl?: string;
  isPrimary?: boolean;
}

export interface Appointment {
  id: string;
  patientName: string;
  phone: string;
  email?: string;
  clinicId: string;
  serviceId?: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface Testimonial {
  id: string;
  patientName: string;
  procedure: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  readTime: string;
  publishedAt: string;
  author: string;
}
