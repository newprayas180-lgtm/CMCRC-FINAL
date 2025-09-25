import React, { useEffect, useMemo, useRef, useState } from 'react';
import PageWrapper from '../layout/PageWrapper';
import SectionHeader from '../ui/SectionHeader';
import { MOCK_ACHIEVEMENTS } from '../../constants';
import { Achievement } from '../../types';
import useOnScreen from '../hooks/useOnScreen';
import { sanityClient } from '../../lib/sanity.client';
import { ACHIEVEMENTS } from '../../lib/queries';
import { urlFor } from '../../lib/image';

const AchievementCard: React.FC<{ achievement: Achievement }> = ({ achievement }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition hover:shadow-xl">
      {achievement.imageUrl && (
        <img src={achievement.imageUrl} alt={achievement.title} className="w-full h-48 object-cover" />
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-slate-800">{achievement.title}</h3>
        <p className="text-blue-600 mt-1">{achievement.date}</p>
        {achievement.description && (
          <p className="text-slate-600 mt-3">{achievement.description}</p>
        )}
      </div>
    </div>
  );
};

const AchievementsPage: React.FC = () => {
  const [items, setItems] = useState<Achievement[] | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await sanityClient.fetch<any[]>(ACHIEVEMENTS);
        if (cancelled) return;
        const mapped: Achievement[] = (res || []).map((a, i) => ({
          id: i + 1,
          title: a.title || 'Achievement',
          description: a.description || '',
          imageUrl: a.image ? urlFor(a.image).width(800).height(480).fit('crop').url() : 'https://picsum.photos/800/480?random=77',
          date: a.date ? new Date(a.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long' }) : '',
        }));
        setItems(mapped);
      } catch {
        setItems(null);
      }
    })();
    return () => { cancelled = true };
  }, []);

  return (
    <PageWrapper>
      <SectionHeader title="Achievements" subtitle="Highlights of our milestones and recognitions" />
      <section ref={ref} className={`${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {(items || MOCK_ACHIEVEMENTS).map((a) => (
            <AchievementCard key={a.id} achievement={a} />
          ))}
        </div>
      </section>
    </PageWrapper>
  );
};

export default AchievementsPage;
