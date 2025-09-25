
// Fix: Populating file with HomePage component implementation.
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../layout/PageWrapper';
import Button from '../ui/Button';
import { MOCK_EVENTS } from '../../constants';
import EventCard from '../ui/EventCard';
import SectionHeader from '../ui/SectionHeader';
import { EventStatus } from '../../types';
import useOnScreen from '../hooks/useOnScreen';

const AnimatedSection: React.FC<{children: React.ReactNode, className?: string}> = ({ children, className }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(ref);

    return (
        <div ref={ref} className={`${className} ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
            {children}
        </div>
    );
};


const HomePage: React.FC = () => {
  const upcomingEvents = MOCK_EVENTS.filter(event => event.status === EventStatus.Upcoming).slice(0, 3);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const isHeroVisible = useOnScreen(heroRef);

  return (
    <>
      {/* Hero Section */}
      <div className="bg-white">
        <div ref={heroRef} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center ${isHeroVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
          <div className="mx-auto mb-8 w-40 h-40 md:w-48 md:h-48 bg-blue-600 rounded-full flex items-center justify-center shadow-2xl">
            <span className="text-white text-4xl md:text-5xl font-bold tracking-wider">CMCRC</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-800 mb-4">
            Welcome to our research club
          </h1>
          <p className="text-xl md:text-2xl text-slate-600">
            Fostering Medical Research and Innovation
          </p>
        </div>
      </div>
      
      <PageWrapper>
          {/* About Section */}
          <AnimatedSection className="mb-20">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                      <h2 className="text-4xl font-extrabold text-slate-800 mb-4">Who We Are</h2>
                      <p className="text-slate-600 text-lg leading-relaxed mb-6">
                          CMCRC is a community of passionate medical students and faculty advisors committed to advancing medical knowledge. We provide resources, mentorship, and a collaborative platform for students to engage in meaningful research projects that can make a difference.
                      </p>
                      <Button to="/about">Learn more about us</Button>
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-xl">
                      <img src="https://picsum.photos/600/400?random=about" alt="Team collaborating" />
                  </div>
              </div>
          </AnimatedSection>

          {/* Upcoming Events Section */}
          <AnimatedSection className="mb-20">
            <div className="mb-12 md:mb-16 text-left">
                 <h2 className="text-4xl font-extrabold text-slate-800 mb-4">Upcoming Events</h2>
                 <p className="text-lg md:text-xl text-slate-600 mb-6">Join us for our next workshop, seminar, or meeting.</p>
                 <Button to="/events">View All Events</Button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </AnimatedSection>

          {/* Call to Action Section */}
          <AnimatedSection>
            <div className="bg-blue-600 text-white rounded-2xl p-12 text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Ready to Start Your Research Journey?</h2>
              <p className="max-w-2xl mx-auto text-lg text-blue-100 mb-8">
                Become a member to gain access to exclusive resources, workshops, and a network of like-minded peers and mentors.
              </p>
              <Link to="/membership" className="inline-block bg-white text-blue-700 font-bold text-lg py-4 px-10 rounded-full shadow-md transition-transform transform hover:-translate-y-1 hover:shadow-xl hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white">Join CMCRC Today</Link>
            </div>
          </AnimatedSection>
      </PageWrapper>
    </>
  );
};

export default HomePage;
