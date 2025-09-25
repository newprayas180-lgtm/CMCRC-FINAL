import React, { useRef } from 'react';
import PageWrapper from '../layout/PageWrapper';
import SectionHeader from '../ui/SectionHeader';
import { MOCK_ACHIEVEMENTS } from '../../constants';
import { Achievement } from '../../types';
import useOnScreen from '../hooks/useOnScreen';

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
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref);

  return (
    <PageWrapper>
      <SectionHeader title="Achievements" subtitle="Highlights of our milestones and recognitions" />
      <section ref={ref} className={`${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_ACHIEVEMENTS.map((a) => (
            <AchievementCard key={a.id} achievement={a} />
          ))}
        </div>
      </section>
    </PageWrapper>
  );
};

export default AchievementsPage;
