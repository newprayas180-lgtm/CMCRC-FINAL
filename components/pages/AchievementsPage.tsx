import React, { useRef } from 'react';
import PageWrapper from '../layout/PageWrapper';
import SectionHeader from '../ui/SectionHeader';
import { MOCK_ACHIEVEMENTS } from '../../constants';
import AchievementCard from '../ui/AchievementCard';
import useOnScreen from '../hooks/useOnScreen';

const AchievementsPage: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const isGridVisible = useOnScreen(gridRef);
  return (
    <PageWrapper>
      <SectionHeader title="Our Achievements" subtitle="A record of our club's milestones and recognitions." />
      <div ref={gridRef} className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${isGridVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
        {MOCK_ACHIEVEMENTS.map(achievement => (
          <AchievementCard key={achievement.id} achievement={achievement} />
        ))}
      </div>
    </PageWrapper>
  );
};

export default AchievementsPage;
