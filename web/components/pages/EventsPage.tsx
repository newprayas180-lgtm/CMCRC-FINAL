import React, { useRef } from 'react';
import PageWrapper from '../layout/PageWrapper';
import SectionHeader from '../ui/SectionHeader';
import EventCard from '../ui/EventCard';
import { MOCK_EVENTS } from '../../constants';
import { EventStatus } from '../../types';
import Button from '../ui/Button';
import useOnScreen from '../hooks/useOnScreen';

const EventsPage: React.FC = () => {
  const upcomingEvents = MOCK_EVENTS.filter(event => event.status === EventStatus.Upcoming);
  const pastEvents = MOCK_EVENTS.filter(event => event.status === EventStatus.Past);

  const contentRef = useRef<HTMLDivElement>(null);
  const isContentVisible = useOnScreen(contentRef);

  return (
    <PageWrapper>
      <SectionHeader title="Our Events" subtitle="Join us for our workshops, seminars, and more" />

      <div ref={contentRef} className={`${isContentVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">Upcoming Events</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map(event => <EventCard key={event.id} event={event} />)
            ) : (
              <p className="col-span-full text-center text-slate-500 text-xl">No upcoming events at this time.</p>
            )}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">Past Events</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
