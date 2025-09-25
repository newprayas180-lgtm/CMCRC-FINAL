import React from 'react';
import PageWrapper from '../layout/PageWrapper';
import SectionHeader from '../ui/SectionHeader';
import { MOCK_PUBLICATIONS } from '../../constants';
import PublicationCard from '../ui/PublicationCard';

const AllPublicationsPage: React.FC = () => {
  return (
    <PageWrapper>
      <SectionHeader title="All Publications" subtitle="Browse all of our published works" />
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOCK_PUBLICATIONS.map((pub) => (
            <PublicationCard key={pub.id} publication={pub} />
          ))}
        </div>
      </section>
    </PageWrapper>
  );
};

export default AllPublicationsPage;
