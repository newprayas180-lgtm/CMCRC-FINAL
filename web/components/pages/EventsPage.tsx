import React, { useEffect, useMemo, useRef, useState } from 'react';
import PageWrapper from '../layout/PageWrapper';
import SectionHeader from '../ui/SectionHeader';
import EventCard from '../ui/EventCard';
import { MOCK_EVENTS } from '../../constants';
import { Event, EventStatus } from '../../types';
import Button from '../ui/Button';
import useOnScreen from '../hooks/useOnScreen';
import { sanityClient } from '../../lib/sanity.client';
import { EVENTS } from '../../lib/queries';
import { urlFor } from '../../lib/image';

const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await sanityClient.fetch<any[]>(EVENTS);
        if (cancelled) return;

        const mapped: Event[] = (data || []).map((e) => {
          const start = e.startDate ? new Date(e.startDate) : null;
          const isUpcoming = start ? start.getTime() >= Date.now() : false;
          const imageUrl = e.coverImage ? urlFor(e.coverImage).width(800).height(450).fit('crop').url() : 'https://picsum.photos/800/450?random=100';
          return {
            id: e._id ? Number.parseInt(String(Math.abs(hashCode(e._id))).slice(0, 9)) : Math.floor(Math.random() * 1e9),
            title: e.title || 'Untitled event',
            date: start ? start.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : 'TBA',
            location: [e.venue, e.city].filter(Boolean).join(', ') || 'TBA',
            description: e.description ? ' ' : 'Details coming soon.',
            imageUrl,
            status: isUpcoming ? EventStatus.Upcoming : EventStatus.Past,
          } as Event;
        });
        setEvents(mapped);
      } catch {
        setEvents(null);
      }
    })();
    return () => { cancelled = true };
  }, []);

  const upcomingEvents = useMemo(() => (events || MOCK_EVENTS).filter(e => e.status === EventStatus.Upcoming), [events]);
  const pastEvents = useMemo(() => (events || MOCK_EVENTS).filter(e => e.status === EventStatus.Past), [events]);
  const upcomingGridClass = useMemo(() => {
    const c = upcomingEvents.length;
    if (c <= 1) return 'grid grid-cols-1 place-items-center gap-10 max-w-md mx-auto';
    if (c === 2) return 'grid grid-cols-1 md:grid-cols-2 place-items-center gap-10 max-w-4xl mx-auto';
    return 'grid md:grid-cols-2 lg:grid-cols-3 place-items-center gap-10 max-w-6xl mx-auto';
  }, [upcomingEvents.length]);
  const pastGridClass = useMemo(() => {
    const c = pastEvents.length;
    if (c <= 1) return 'grid grid-cols-1 place-items-center gap-10 max-w-md mx-auto';
    if (c === 2) return 'grid grid-cols-1 md:grid-cols-2 place-items-center gap-10 max-w-4xl mx-auto';
    return 'grid md:grid-cols-2 lg:grid-cols-3 place-items-center gap-10 max-w-6xl mx-auto';
  }, [pastEvents.length]);

  const contentRef = useRef<HTMLDivElement>(null);
  const isContentVisible = useOnScreen(contentRef);

  return (
    <PageWrapper>
      <SectionHeader title="Our Events" subtitle="Join us for our workshops, seminars, and more" />

      <div ref={contentRef} className={`${isContentVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">Upcoming Events</h2>
          <div className={upcomingGridClass}>
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map(event => <EventCard key={event.id} event={event} />)
            ) : (
              <p className="col-span-full text-center text-slate-500 text-xl">No upcoming events at this time.</p>
            )}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">Past Events</h2>
          <div className={pastGridClass}>
            {pastEvents.length > 0 ? (
              pastEvents.slice(0, 3).map(event => <EventCard key={event.id} event={event} />)
            ) : (
              <p className="col-span-full text-center text-slate-500 text-xl">No past events to show.</p>
            )}
          </div>
          {pastEvents.length > 3 && (
            <div className="text-center mt-12">
              <Button to="/events/past">View All Past Events</Button>
            </div>
          )}
        </section>
      </div>
    </PageWrapper>
  );
};

export default EventsPage;

// Simple string hash for stable numeric IDs from Sanity _id (only for client keys)
function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}
