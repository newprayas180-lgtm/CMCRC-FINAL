import React, { useEffect, useMemo, useState } from 'react';
import PageWrapper from '../layout/PageWrapper';
import SectionHeader from '../ui/SectionHeader';
import { MOCK_PUBLICATIONS } from '../../constants';
import PublicationCard from '../ui/PublicationCard';
import { sanityClient } from '../../lib/sanity.client';
import { PUBLICATIONS } from '../../lib/queries';
import { Publication } from '../../types';
import { urlFor } from '../../lib/image';

const AllPublicationsPage: React.FC = () => {
  const [pubs, setPubs] = useState<Publication[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await sanityClient.fetch<any[]>(PUBLICATIONS);
        if (cancelled) return;
        const mapped: Publication[] = (res || []).map((p, i) => ({
          id: i + 1,
          title: p.title || 'Untitled',
          authors: Array.isArray(p.authors) ? p.authors : [],
          journal: p.venue || '',
          year: p.publishedOn ? new Date(p.publishedOn).getFullYear() : new Date().getFullYear(),
          link: p.linkUrl || '#',
          imageUrl: p.coverImage ? urlFor(p.coverImage).width(300).height(400).fit('crop').url() : 'https://picsum.photos/300/400?random=12',
        }));
        setPubs(mapped);
      } catch {
        setPubs(null);
      }
    })();
    return () => { cancelled = true };
  }, []);

  const list = useMemo(() => pubs || MOCK_PUBLICATIONS, [pubs]);

  return (
    <PageWrapper>
      <SectionHeader title="All Publications" subtitle="Browse all of our published works" />
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {list.map((pub) => (
            <PublicationCard key={pub.id} publication={pub} />
          ))}
        </div>
      </section>
    </PageWrapper>
  );
};

export default AllPublicationsPage;
