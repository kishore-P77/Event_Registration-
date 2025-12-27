import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, Users } from 'lucide-react';
import Header from '@/components/Header';
import RegistrationForm from '@/components/RegistrationForm';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getEventById, getRegistrationsByEvent } from '@/lib/storage';
import { Event } from '@/lib/types';

const categoryColors = {
  seminar: 'bg-primary/10 text-primary',
  workshop: 'bg-accent/10 text-accent',
  hackathon: 'bg-destructive/10 text-destructive',
  conference: 'bg-muted text-muted-foreground',
};

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [registrationCount, setRegistrationCount] = useState(0);

  useEffect(() => {
    if (id) {
      const foundEvent = getEventById(id);
      setEvent(foundEvent || null);
      setRegistrationCount(getRegistrationsByEvent(id).length);
    }
  }, [id]);

  const refreshCount = () => {
    if (id) {
      setRegistrationCount(getRegistrationsByEvent(id).length);
    }
  };

  if (!event) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-semibold text-foreground">Event not found</h1>
          <p className="mt-2 text-muted-foreground">The event you're looking for doesn't exist.</p>
          <Link to="/">
            <Button variant="outline" className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Events
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const spotsLeft = event.maxParticipants 
    ? event.maxParticipants - registrationCount 
    : null;
  const isFull = spotsLeft !== null && spotsLeft <= 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to all events
        </Link>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Event Details */}
          <div className="lg:col-span-3 animate-fade-in">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <Badge className={categoryColors[event.category]}>
                {event.category}
              </Badge>
              {spotsLeft !== null && (
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  {spotsLeft > 0 ? `${spotsLeft} of ${event.maxParticipants} spots left` : 'Event is full'}
                </span>
              )}
            </div>

            <h1 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              {event.title}
            </h1>

            <div className="mb-6 space-y-3">
              <div className="flex items-center gap-3 text-foreground">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium">
                    {new Date(event.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-foreground">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Time</p>
                  <p className="font-medium">{event.time}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-foreground">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Venue</p>
                  <p className="font-medium">{event.venue}</p>
                </div>
              </div>
            </div>

            <div className="prose prose-gray max-w-none">
              <h3 className="text-lg font-semibold text-foreground">About this event</h3>
              <p className="text-muted-foreground leading-relaxed">{event.description}</p>
            </div>
          </div>

          {/* Registration Form */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 rounded-xl border border-border bg-card p-6 shadow-card animate-slide-up">
              <h2 className="mb-6 text-xl font-semibold text-foreground">
                {isFull ? 'Registration Closed' : 'Register for this event'}
              </h2>
              
              {isFull ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    This event has reached maximum capacity.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Please check back for future events.
                  </p>
                </div>
              ) : (
                <RegistrationForm 
                  eventId={event.id} 
                  eventTitle={event.title}
                  onSuccess={refreshCount}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
