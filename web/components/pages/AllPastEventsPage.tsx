import React from 'react';
import PageWrapper from '../layout/PageWrapper';
import SectionHeader from '../ui/SectionHeader';
import { MOCK_EVENTS } from '../../constants';
import { EventStatus } from '../../types';
import EventCard from '../ui/EventCard';

const AllPastEventsPage: React.FC = () => {
  const pastEvents = MOCK_EVENTS.filter(e => e.status === EventStatus.Past);
  return (
    <PageWrapper>
      <SectionHeader title="Past Events" subtitle="A look back at our previous events" />
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pastEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>
    </PageWrapper>
  );
};

export default AllPastEventsPage;
