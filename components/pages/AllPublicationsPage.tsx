import React, { useRef } from 'react';
import PageWrapper from '../layout/PageWrapper';
import SectionHeader from '../ui/SectionHeader';
import { MOCK_PUBLICATIONS } from '../../constants';
import PublicationCard from '../ui/PublicationCard';
import useOnScreen from '../hooks/useOnScreen';

const AllPublicationsPage: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const isContentVisible = useOnScreen(contentRef);
  return (
    <PageWrapper>
      <SectionHeader title="All Publications" subtitle="A comprehensive list of our research contributions." />
      <div ref={contentRef} className={`max-w-4xl mx-auto space-y-8 ${isContentVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
        {MOCK_PUBLICATIONS.map(publication => (
          <PublicationCard key={publication.id} publication={publication} />
        ))}
      </div>
    </PageWrapper>
  );
};

export default AllPublicationsPage;
