export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  category: 'seminar' | 'workshop' | 'hackathon' | 'conference' | 'technical';
  maxParticipants?: number;
  image?: string;
}

export interface Registration {
  id: string;
  eventId: string;
  name: string;
  year: string;
  department: string;
  email: string;
  phone: string;
  registeredAt: string;
}

export const DEPARTMENTS = [
  'Computer Science',
  'Electronics',
  'Mechanical',
  'Civil',
  'Electrical',
  'Information Technology',
  'Chemical',
  'Other'
] as const;

export const YEARS = [
  '1st Year',
  '2nd Year',
  '3rd Year',
  '4th Year',
  'PG 1st Year',
  'PG 2nd Year',
  'Faculty'
] as const;
