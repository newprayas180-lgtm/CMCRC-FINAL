import React, { useEffect, useMemo, useRef, useState } from 'react';
import PageWrapper from '../layout/PageWrapper';
import SectionHeader from '../ui/SectionHeader';
import { MOCK_TEAM_MEMBERS } from '../../constants';
import { TeamMember } from '../../types';
import useOnScreen from '../hooks/useOnScreen';
import { sanityClient } from '../../lib/sanity.client';
import { TEAM } from '../../lib/queries';
import { urlFor } from '../../lib/image';

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
  const [members, setMembers] = useState<TeamMember[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await sanityClient.fetch<any[]>(TEAM);
        if (cancelled) return;
        const mapped: TeamMember[] = (data || []).map((m, idx) => ({
          id: idx + 1,
          name: m.name || 'Unnamed',
          role: m.role || '',
          imageUrl: m.photo ? urlFor(m.photo).width(300).height(300).fit('crop').url() : 'https://picsum.photos/200/200?random=42',
          category: m.category || 'General',
        }));
        setMembers(mapped);
      } catch {
        setMembers(null);
      }
    })();
    return () => { cancelled = true };
  }, []);

  const teams = useMemo(() => {
    const list = members || MOCK_TEAM_MEMBERS;
    return list.reduce((acc, member) => {
      const category = member.category || 'General';
      acc[category] = acc[category] || [];
      acc[category].push(member);
      return acc;
    }, {} as Record<string, TeamMember[]>);
  }, [members]);

  // Default order, then append any additional categories returned by CMS
  const defaultOrder = ['Core Team', 'Visibility Team', 'Social Media Team', 'Research Team', 'Operations Team'];
  const dynamicCategories = useMemo(() => Object.keys(teams), [teams]);
  const teamOrder = useMemo(() => {
    const extras = dynamicCategories.filter((c) => !defaultOrder.includes(c));
    return [...defaultOrder, ...extras];
  }, [dynamicCategories]);

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
