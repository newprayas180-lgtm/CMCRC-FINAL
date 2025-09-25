import React, { useRef } from 'react';
import PageWrapper from '../layout/PageWrapper';
import SectionHeader from '../ui/SectionHeader';
import useOnScreen from '../hooks/useOnScreen';

const ContactPage: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const isContentVisible = useOnScreen(contentRef);

  return (
    <PageWrapper>
      <SectionHeader title="Get In Touch" subtitle="We'd love to hear from you" />

      <div ref={contentRef} className={`max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg ${isContentVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
        <h3 className="text-3xl font-bold text-slate-800 mb-6 text-center">Contact Information</h3>
        <div className="space-y-4 text-slate-700 text-center">
          <div className="flex items-center justify-center space-x-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              <span>contact@cmcrc.org</span>
          </div>
          <div className="flex items-center justify-center space-x-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <span>Chittagong Medical College, Chattogram, Bangladesh</span>
          </div>
        </div>
        <div className="mt-8 h-72 sm:h-80 md:h-96 rounded-lg overflow-hidden">
          <iframe
            title="Chittagong Medical College Map"
            src="https://www.google.com/maps?q=Chittagong%20Medical%20College%2C%20Chattogram%2C%20Bangladesh&output=embed"
            width="100%"
            height="100%"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full border-0"
            allowFullScreen
          />
        </div>
      </div>
    </PageWrapper>
  );
};

export default ContactPage;
