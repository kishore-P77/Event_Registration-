import { useState, useEffect, useCallback } from 'react';
import { Download, Users, Calendar, FileText } from 'lucide-react';
import Header from '@/components/Header';
import RegistrationTable from '@/components/RegistrationTable';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { getEvents, getRegistrationsByEvent, getRegistrations, exportToCSV } from '@/lib/storage';
import { Event, Registration } from '@/lib/types';

const Admin = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string>('all');
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    setEvents(getEvents());
  }, []);

  useEffect(() => {
    if (selectedEventId === 'all') {
      setRegistrations(getRegistrations());
    } else {
      setRegistrations(getRegistrationsByEvent(selectedEventId));
    }
  }, [selectedEventId]);

  const handleExport = () => {
    if (registrations.length === 0) {
      toast({
        title: 'No data to export',
        description: 'There are no registrations to export.',
        variant: 'destructive',
      });
      return;
    }

    const eventTitle = selectedEventId === 'all' 
      ? 'All_Events' 
      : events.find(e => e.id === selectedEventId)?.title || 'Event';

    exportToCSV(registrations, eventTitle);
    toast({
      title: 'Export successful',
      description: 'Registrations have been exported to CSV.',
    });
  };

  const totalRegistrations = getRegistrations().length;
  const selectedEvent = events.find(e => e.id === selectedEventId);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="mt-2 text-muted-foreground">
            View and manage event registrations
          </p>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3 animate-slide-up">
          <div className="rounded-xl border border-border bg-card p-6 shadow-card">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg gradient-hero">
                <Calendar className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Events</p>
                <p className="text-2xl font-bold text-foreground">{events.length}</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-card">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg gradient-accent">
                <Users className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Registrations</p>
                <p className="text-2xl font-bold text-foreground">{totalRegistrations}</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-card">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                <FileText className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current View</p>
                <p className="text-2xl font-bold text-foreground">{registrations.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between animate-fade-in" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center gap-4">
            <Select value={selectedEventId} onValueChange={setSelectedEventId}>
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Filter by event" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                {events.map((event) => (
                  <SelectItem key={event.id} value={event.id}>
                    {event.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleExport} className="gap-2">
            <Download className="h-4 w-4" />
            Export to CSV
          </Button>
        </div>

        {/* Selected Event Info */}
        {selectedEvent && (
          <div className="mb-6 rounded-lg border border-border bg-muted/30 p-4">
            <p className="text-sm text-muted-foreground">
              Showing registrations for: <span className="font-medium text-foreground">{selectedEvent.title}</span>
              {' · '}
              <span>{new Date(selectedEvent.date).toLocaleDateString()}</span>
            </p>
          </div>
        )}

        {/* Registrations Table */}
        <div className="animate-fade-in" style={{ animationDelay: '300ms' }}>
          <RegistrationTable registrations={registrations} />
        </div>
      </div>
    </div>
  );
};

export default Admin;
