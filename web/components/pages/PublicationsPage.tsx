import React, { useRef } from 'react';
import PageWrapper from '../layout/PageWrapper';
import SectionHeader from '../ui/SectionHeader';
import Button from '../ui/Button';
import { MOCK_ACHIEVEMENTS, MOCK_PUBLICATIONS } from '../../constants';
import AchievementCard from '../ui/AchievementCard';
import PublicationCard from '../ui/PublicationCard';
import useOnScreen from '../hooks/useOnScreen';

const PublicationsPage: React.FC = () => {
    const recentAchievements = MOCK_ACHIEVEMENTS.slice(0, 3);
    const recentPublications = MOCK_PUBLICATIONS.slice(0, 2);

    const achievementsRef = useRef<HTMLDivElement>(null);
    const publicationsRef = useRef<HTMLDivElement>(null);
    const isAchievementsVisible = useOnScreen(achievementsRef);
    const isPublicationsVisible = useOnScreen(publicationsRef);


  return (
    <PageWrapper>
      <SectionHeader title="Publications & Achievements" subtitle="Celebrating Our Contributions to Medical Science" />
      
      <div>
        <section ref={achievementsRef} className={`mb-20 ${isAchievementsVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">Recent Achievements</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
