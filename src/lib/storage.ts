import { Event, Registration } from './types';

const EVENTS_KEY = 'event_portal_events';
const REGISTRATIONS_KEY = 'event_portal_registrations';

// Sample events for demo
const sampleEvents: Event[] = [
  {
    id: '1',
    title: 'AI & Machine Learning Workshop',
    description: 'Hands-on workshop covering fundamentals of machine learning, neural networks, and practical applications using Python and TensorFlow. Perfect for beginners and intermediate learners.',
    date: '2025-01-15',
    time: '10:00 AM - 4:00 PM',
    venue: 'Computer Science Building, Room 301',
    category: 'workshop',
    maxParticipants: 50,
  },
  {
    id: '2',
    title: 'Tech Innovators Hackathon 2025',
    description: '24-hour coding competition where teams build innovative solutions to real-world problems. Prizes worth ₹50,000! Open to all departments.',
    date: '2025-01-20',
    time: '9:00 AM (24 hours)',
    venue: 'Innovation Hub, Main Campus',
    category: 'hackathon',
    maxParticipants: 100,
  },
  {
    id: '3',
    title: 'Seminar: Future of Quantum Computing',
    description: 'Distinguished lecture by Dr. Priya Sharma from IIT Delhi on the latest advances in quantum computing and its potential applications in various industries.',
    date: '2025-01-25',
    time: '2:00 PM - 4:00 PM',
    venue: 'Auditorium A',
    category: 'seminar',
    maxParticipants: 200,
  },
  {
    id: '4',
    title: 'Web Development Bootcamp',
    description: 'Intensive 2-day bootcamp covering React, Node.js, and modern web development practices. Build a full-stack project by the end!',
    date: '2025-02-01',
    time: '9:00 AM - 5:00 PM',
    venue: 'IT Lab Complex, Block B',
    category: 'workshop',
    maxParticipants: 40,
  },
  {
    id: '5',
    title: 'Paper Presentation',
    description: 'Present your research paper',
    date: '2025-02-01',
    time: '9:00 AM - 5:00 PM',
    venue: 'Seminar hall block A',
  category: 'seminar',
    maxParticipants: 20,
  },
  {
    id: '6',
    title: 'Code Debugging Challenge',
    description: 'Test your debugging skills!',
    date: '2025-02-01',
    time: '9:00 AM - 5:00 PM',
    venue: 'Computer lab,Block C',
    category: 'technical',
    maxParticipants: 80,
  },
];

export const getEvents = (): Event[] => {
  const stored = localStorage.getItem(EVENTS_KEY);
  if (!stored) {
    localStorage.setItem(EVENTS_KEY, JSON.stringify(sampleEvents));
    return sampleEvents;
  }

  // If events already exist in localStorage, merge any new sample events
  // (useful during development so adding new sample events shows up)
  try {
    const parsed: Event[] = JSON.parse(stored);
    const existingIds = new Set(parsed.map(e => e.id));
    const merged = [...parsed];
    for (const se of sampleEvents) {
      if (!existingIds.has(se.id)) {
        merged.push(se);
      }
    }
    if (merged.length !== parsed.length) {
      localStorage.setItem(EVENTS_KEY, JSON.stringify(merged));
    }
    return merged;
  } catch (e) {
    // If parsing fails, reset to sample events
    localStorage.setItem(EVENTS_KEY, JSON.stringify(sampleEvents));
    return sampleEvents;
  }
};

export const getEventById = (id: string): Event | undefined => {
  const events = getEvents();
  return events.find(e => e.id === id);
};

export const getRegistrations = (): Registration[] => {
  const stored = localStorage.getItem(REGISTRATIONS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const getRegistrationsByEvent = (eventId: string): Registration[] => {
  const registrations = getRegistrations();
  return registrations.filter(r => r.eventId === eventId);
};

export const addRegistration = (registration: Omit<Registration, 'id' | 'registeredAt'>): Registration => {
  const registrations = getRegistrations();
  const newRegistration: Registration = {
    ...registration,
    id: crypto.randomUUID(),
    registeredAt: new Date().toISOString(),
  };
  registrations.push(newRegistration);
  localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(registrations));
  return newRegistration;
};

export const isAlreadyRegistered = (eventId: string, email: string): boolean => {
  const registrations = getRegistrationsByEvent(eventId);
  return registrations.some(r => r.email.toLowerCase() === email.toLowerCase());
};

export const exportToCSV = (registrations: Registration[], eventTitle: string): void => {
  const headers = ['Name', 'Year', 'Department', 'Email', 'Phone', 'Registered At'];
  const rows = registrations.map(r => [
    r.name,
    r.year,
    r.department,
    r.email,
    r.phone,
    new Date(r.registeredAt).toLocaleString()
  ]);
  
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${eventTitle.replace(/\s+/g, '_')}_registrations.csv`;
  link.click();
};
