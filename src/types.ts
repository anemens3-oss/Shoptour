export type ServiceCategory =
  | 'all'
  | 'maintenance'
  | 'diagnostics'
  | 'chassis'
  | 'tires'
  | 'detailing'
  | 'climate';

export interface VehicleClass {
  id: string;
  name: string;
  multiplier: number;
  description: string;
  example: string;
}

export interface ServiceItem {
  id: string;
  category: ServiceCategory;
  categoryName: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  basePrice: number;
  estimatedDuration: string;
  warrantyPeriod: string;
  badge?: string;
  features: string[];
  includedSteps: string[];
  equipmentUsed: string[];
  recommendedInterval?: string;
  symptoms?: string[];
}

export interface BookingFormData {
  fullName: string;
  phone: string;
  carBrand: string;
  carModel: string;
  carYear: string;
  vehicleClassId: string;
  selectedServiceIds: string[];
  date: string;
  timeSlot: string;
  comment: string;
  agreeToPolicy: boolean;
}

export interface BookingSummary {
  bookingId: string;
  timestamp: string;
  formData: BookingFormData;
  selectedServices: ServiceItem[];
  vehicleClass: VehicleClass;
  totalPrice: number;
  totalDuration: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface TeamMember {
  name: string;
  role: string;
  experience: string;
  specialization: string;
  certifications: string[];
}

export interface TestimonialDemo {
  id: string;
  clientName: string;
  vehicle: string;
  serviceDone: string;
  text: string;
  rating: number;
  date: string;
}
