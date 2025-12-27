import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import EventCard from '@/components/EventCard';
import { getEvents } from '@/lib/storage';
import { Event } from '@/lib/types';

const Index = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    setEvents(getEvents());
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border bg-card">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="container relative py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center animate-fade-in">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              Department Events Portal
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Discover & Register for
              <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Amazing Events
              </span>
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Join seminars, workshops, hackathons, and more. 
              Expand your knowledge and connect with peers.
            </p>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="container py-12 md:py-16">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-foreground">Upcoming Events</h2>
          <span className="text-sm text-muted-foreground">{events.length} events</span>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>

        {events.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-lg text-muted-foreground">No upcoming events at the moment.</p>
            <p className="text-sm text-muted-foreground">Check back soon!</p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2025 EventHub. Department Event Registration Portal.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
