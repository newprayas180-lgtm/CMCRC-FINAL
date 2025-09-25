import React, { useRef } from 'react';
import PageWrapper from '../layout/PageWrapper';
import SectionHeader from '../ui/SectionHeader';
import { MOCK_EVENTS } from '../../constants';
import { EventStatus } from '../../types';
import EventCard from '../ui/EventCard';
import useOnScreen from '../hooks/useOnScreen';

const AllPastEventsPage: React.FC = () => {
  const pastEvents = MOCK_EVENTS.filter(event => event.status === EventStatus.Past);
  
  const gridRef = useRef<HTMLDivElement>(null);
  const isGridVisible = useOnScreen(gridRef);

  return (
    <PageWrapper>
      <SectionHeader title="All Past Events" subtitle="A look back at our memorable workshops, seminars, and meetings." />
      <div ref={gridRef} className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 ${isGridVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
        {pastEvents.length > 0 ? (
          pastEvents.map(event => <EventCard key={event.id} event={event} />)
        ) : (
          <p className="col-span-full text-center text-slate-500 text-xl">No past events to show.</p>
        )}
      </div>
    </PageWrapper>
  );
};

export default AllPastEventsPage;
