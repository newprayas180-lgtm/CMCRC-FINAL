import React, { useEffect, useMemo, useRef, useState } from 'react';
import PageWrapper from '../layout/PageWrapper';
import SectionHeader from '../ui/SectionHeader';
import Button from '../ui/Button';
import { MOCK_ACHIEVEMENTS, MOCK_PUBLICATIONS } from '../../constants';
import AchievementCard from '../ui/AchievementCard';
import PublicationCard from '../ui/PublicationCard';
import useOnScreen from '../hooks/useOnScreen';
import { sanityClient } from '../../lib/sanity.client';
import { PUBLICATIONS, ACHIEVEMENTS } from '../../lib/queries';
import { urlFor } from '../../lib/image';
import { Publication, Achievement } from '../../types';

const PublicationsPage: React.FC = () => {
    const [pubs, setPubs] = useState<Publication[] | null>(null);
    const [achs, setAchs] = useState<Achievement[] | null>(null);

    const achievementsRef = useRef<HTMLDivElement>(null);
    const publicationsRef = useRef<HTMLDivElement>(null);
    const isAchievementsVisible = useOnScreen(achievementsRef);
    const isPublicationsVisible = useOnScreen(publicationsRef);

    useEffect(() => {
      let cancelled = false;
      (async () => {
        try {
          const [pRes, aRes] = await Promise.all([
            sanityClient.fetch<any[]>(PUBLICATIONS),
            sanityClient.fetch<any[]>(ACHIEVEMENTS),
          ]);
          if (cancelled) return;
          const mappedP: Publication[] = (pRes || []).map((p, i) => ({
            id: i + 1,
            title: p.title || 'Untitled',
            authors: Array.isArray(p.authors) ? p.authors : [],
            journal: p.venue || '',
            year: p.publishedOn ? new Date(p.publishedOn).getFullYear() : new Date().getFullYear(),
            link: p.linkUrl || '#',
            imageUrl: p.coverImage ? urlFor(p.coverImage).width(300).height(400).fit('crop').url() : 'https://picsum.photos/300/400?random=12',
          }));
          const mappedA: Achievement[] = (aRes || []).slice(0, 9).map((a, i) => ({
            id: i + 1,
            title: a.title || 'Achievement',
            description: a.description || '',
            imageUrl: a.image ? urlFor(a.image).width(800).height(480).fit('crop').url() : 'https://picsum.photos/800/480?random=13',
            date: a.date ? new Date(a.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long' }) : '',
          }));
          setPubs(mappedP);
          setAchs(mappedA);
        } catch {
          setPubs(null);
          setAchs(null);
        }
      })();
      return () => { cancelled = true };
    }, []);

    const recentAchievements = useMemo(() => (achs || MOCK_ACHIEVEMENTS).slice(0, 3), [achs]);
    const recentPublications = useMemo(() => (pubs || MOCK_PUBLICATIONS).slice(0, 2), [pubs]);


  return (
    <PageWrapper>
      <SectionHeader title="Publications & Achievements" subtitle="Celebrating Our Contributions to Medical Science" />
      
      <div>
        <section ref={achievementsRef} className={`mb-20 ${isAchievementsVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">Recent Achievements</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              {recentAchievements.map(achievement => (
                <AchievementCard key={achievement.id} achievement={achievement} />
              ))}
          </div>
          <div className="text-center mt-12">
              <Button to="/achievements">View All Achievements</Button>
          </div>
        </section>

        <section ref={publicationsRef} className={`${isPublicationsVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">Recent Publications</h2>
          <div className="max-w-4xl mx-auto space-y-8">
              {recentPublications.map(publication => (
                  <PublicationCard key={publication.id} publication={publication} />
              ))}
          </div>
          <div className="text-center mt-12">
              <Button to="/publications/all">View All Publications</Button>
          </div>
        </section>
      </div>

    </PageWrapper>
  );
};

export default PublicationsPage;
