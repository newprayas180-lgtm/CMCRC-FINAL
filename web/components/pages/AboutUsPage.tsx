import React, { useEffect, useMemo, useRef, useState } from 'react';
import PageWrapper from '../layout/PageWrapper';
import SectionHeader from '../ui/SectionHeader';
import { MOCK_TEAM_MEMBERS } from '../../constants';
import { TeamMember } from '../../types';
import Button from '../ui/Button';
import useOnScreen from '../hooks/useOnScreen';
import { sanityClient } from '../../lib/sanity.client';
import { SITE_SETTINGS, TEAM } from '../../lib/queries';
import { urlFor } from '../../lib/image';

const TeamMemberCard: React.FC<{ member: TeamMember }> = ({ member }) => (
    <div className="text-center">
        <img className="mx-auto h-40 w-40 rounded-full object-cover shadow-lg" src={member.imageUrl} alt={member.name} />
        <h3 className="mt-6 text-xl font-semibold text-slate-800">{member.name}</h3>
        <p className="text-blue-600 font-medium">{member.role}</p>
    </div>
);

const AboutUsPage: React.FC = () => {
    const [members, setMembers] = useState<TeamMember[] | null>(null);
    const [aboutImage, setAboutImage] = useState<string | null>(null);
    useEffect(() => {
      let cancelled = false;
      (async () => {
        try {
          const [data, settings] = await Promise.all([
            sanityClient.fetch<any[]>(TEAM),
            sanityClient.fetch<any>(SITE_SETTINGS),
          ]);
          if (cancelled) return;
          const mapped: TeamMember[] = (data || []).map((m, idx) => ({
            id: idx + 1,
            name: m.name || 'Unnamed',
            role: m.role || '',
            imageUrl: m.photo ? urlFor(m.photo).width(300).height(300).fit('crop').url() : 'https://picsum.photos/200/200?random=42',
            category: m.category || 'General',
          }));
          setMembers(mapped);
          const img = settings?.aboutWhoWeAreImage ? urlFor(settings.aboutWhoWeAreImage).width(800).height(800).fit('crop').url() : null;
          setAboutImage(img);
        } catch {
          setMembers(null);
        }
      })();
      return () => { cancelled = true };
    }, []);

    const coreTeam = useMemo(
      () => (members || MOCK_TEAM_MEMBERS).filter(member => member.category === 'Core Team').slice(0, 4),
      [members]
    );

    const whoWeAreRef = useRef<HTMLDivElement>(null);
    const visionMissionRef = useRef<HTMLDivElement>(null);
    const teamRef = useRef<HTMLDivElement>(null);

    const isWhoWeAreVisible = useOnScreen(whoWeAreRef);
    const isVisionMissionVisible = useOnScreen(visionMissionRef);
    const isTeamVisible = useOnScreen(teamRef);


  return (
    <PageWrapper>
        <div ref={whoWeAreRef} className={`grid md:grid-cols-2 gap-12 md:gap-20 items-center mb-24 ${isWhoWeAreVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
            <div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight">Who We Are</h1>
                <p className="mt-4 text-lg md:text-xl text-slate-600">Our Mission, Vision, and Values</p>
                <div className="mt-8 text-lg text-slate-700 leading-relaxed space-y-6">
                    <p>
                      The Chittagong Medical College Research Club (CMCRC) was founded with the vision to create a vibrant research ecosystem within the campus. We aim to inspire and equip medical students with the skills and knowledge necessary to conduct high-quality medical research.
                    </p>
                    <p>
                      Our mission is to foster a culture of critical thinking, scientific inquiry, and ethical research practices among students, ultimately contributing to the advancement of healthcare in Bangladesh and beyond.
                    </p>
                </div>
            </div>
      <div className="flex justify-center md:justify-end">
        <img src={aboutImage || 'https://picsum.photos/id/1040/500/500'} alt="A group of professionals in a discussion" className="rounded-full w-96 h-96 md:w-[480px] md:h-[480px] object-cover shadow-2xl border-8 border-white" />
            </div>
        </div>
      
      <div ref={visionMissionRef} className={`grid grid-cols-1 md:grid-cols-2 gap-10 mb-20 ${isVisionMissionVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
        <div className="bg-white p-10 rounded-xl shadow-lg border border-slate-100 transform hover:-translate-y-2 transition-all duration-300">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
            </div>
            <h3 className="text-3xl font-bold text-slate-800 mb-4">Our Vision</h3>
            <p className="text-slate-600 text-lg">To be a leading student-run research organization, recognized for its contribution to medical science and for developing the next generation of physician-scientists.</p>
        </div>
        <div className="bg-white p-10 rounded-xl shadow-lg border border-slate-100 transform hover:-translate-y-2 transition-all duration-300">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-teal-100 text-teal-600 mb-6">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6H8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                </svg>
            </div>
            <h3 className="text-3xl font-bold text-slate-800 mb-4">Our Mission</h3>
            <p className="text-slate-600 text-lg">To provide a platform for students to learn research methodologies, collaborate on projects, receive mentorship, and disseminate their findings through publications and presentations.</p>
        </div>
      </div>

      <div ref={teamRef} className={`text-center ${isTeamVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 max-w-5xl mx-auto">
            {coreTeam.map(member => (
                <TeamMemberCard key={member.id} member={member} />
            ))}
        </div>
        <div className="mt-16">
            <Button to="/about/our-team">Explore The Full Team</Button>
        </div>
      </div>
    </PageWrapper>
  );
};

export default AboutUsPage;
