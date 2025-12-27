import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { Event } from '@/lib/types';
import { getRegistrationsByEvent } from '@/lib/storage';
import { Badge } from './ui/badge';

interface EventCardProps {
  event: Event;
  index: number;
}

const categoryColors = {
  seminar: 'bg-primary/10 text-primary',
  workshop: 'bg-accent/10 text-accent',
  hackathon: 'bg-destructive/10 text-destructive',
  conference: 'bg-muted text-muted-foreground',
  technical: 'bg-primary/10 text-primary',
};

const EventCard = ({ event, index }: EventCardProps) => {
  const registrations = getRegistrationsByEvent(event.id);
  const spotsLeft = event.maxParticipants 
    ? event.maxParticipants - registrations.length 
    : null;

  return (
    <Link 
      to={`/event/${event.id}`}
      className="group block animate-slide-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <article className="h-full rounded-xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
        <div className="mb-4 flex items-start justify-between gap-4">
          <Badge className={`${categoryColors[event.category]} rounded-full px-2 py-0.5 uppercase text-xs font-medium`}>
            {event.category}
          </Badge>
          {spotsLeft !== null && (
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              {spotsLeft > 0 ? `${spotsLeft} spots left` : 'Full'}
            </span>
          )}
        </div>

        <h3 className="mb-2 text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
          {event.title}
        </h3>
        
        <p className="mb-4 line-clamp-2 text-muted-foreground">
          {event.description}
        </p>

        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            <span>{new Date(event.date).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{event.venue}</span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default EventCard;
