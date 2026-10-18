export interface DoctorProfile {
  name: string;
  clinicName: string;
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
  logoUrl: string;
  heroBadge: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  category: 'Robotic Surgery' | 'Laser Proctology' | 'Laparoscopic Surgery' | 'General Surgery' | 'General Care' | 'Emergency Care';
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
  sundayTimings?: string;
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

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
}

export type Block =
  | { id: string; type: 'heading'; level: 2 | 3; text: string }
  | { id: string; type: 'paragraph'; text: string }
  | { id: string; type: 'bulletList'; items: string[] }
  | { id: string; type: 'todo'; items: { id: string; text: string; checked: boolean }[] }
  | { id: string; type: 'image'; url: string; caption?: string }
  | { id: string; type: 'quote'; text: string; attribution?: string }
  | { id: string; type: 'divider' };

export interface BlogUpdate {
  id: string;
  date: string; // ISO date, e.g. "2026-09-17"
  blocks: Block[];
}

export interface BlogContent {
  original: { blocks: Block[] };
  updates: BlogUpdate[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  coverUrl?: string;
  category: string;
  author: string;
  status: 'draft' | 'published';
  metaTitle?: string;
  metaDescription?: string;
  content: BlogContent;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

// Fields the client sends when creating/updating a post — server derives id/timestamps.
export type BlogPostInput = Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'publishedAt'>;
