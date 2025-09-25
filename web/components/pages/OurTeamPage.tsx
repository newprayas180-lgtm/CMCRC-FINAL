import React, { useRef } from 'react';
import PageWrapper from '../layout/PageWrapper';
import SectionHeader from '../ui/SectionHeader';
import { MOCK_TEAM_MEMBERS } from '../../constants';
import { TeamMember } from '../../types';
import useOnScreen from '../hooks/useOnScreen';

interface TeamMemberCardProps {
  member: TeamMember;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-center group transition-all hover:shadow-xl hover:-translate-y-1">
      <img
        className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg"
        src={member.imageUrl}
        alt={`Portrait of ${member.name}`}
      />
      <h3 className="mt-4 text-xl font-bold text-slate-800">{member.name}</h3>
      <p className="mt-1 text-blue-600 font-medium">{member.role}</p>
    </div>
  );
};

const AnimatedTeamSection: React.FC<{teamName: string, members: TeamMember[]}> = ({ teamName, members}) => {
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(ref);

    return (
        <section ref={ref} className={`${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-12 border-b-2 border-blue-200 pb-4 max-w-md mx-auto">
            {teamName}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {members.map(member => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </section>
    )
}

const OurTeamPage: React.FC = () => {
  const teams = MOCK_TEAM_MEMBERS.reduce((acc, member) => {
    const category = member.category || 'General';
    acc[category] = acc[category] || [];
    acc[category].push(member);
    return acc;
  }, {} as Record<string, TeamMember[]>);

  const teamOrder = ['Core Team', 'Visibility Team', 'Social Media Team'];

  return (
    <PageWrapper>
      <SectionHeader 
        title="Our Team" 
        subtitle="Meet the dedicated individuals driving the mission of CMCRC forward." 
      />
      
      <div className="space-y-20">
        {teamOrder.map(teamName => {
          const members = teams[teamName];
          if (!members || members.length === 0) return null;
          return <AnimatedTeamSection key={teamName} teamName={teamName} members={members} />;
        })}
      </div>
    </PageWrapper>
  );
};

export default OurTeamPage;
